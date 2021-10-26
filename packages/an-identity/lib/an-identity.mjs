import {
  base64url,
  calculateJwkThumbprint,
  exportJWK,
  GeneralSign,
  generateKeyPair,
  importJWK
} from 'jose-browser-runtime'
import * as idbKv from 'idb-keyval'

/**
 * AnIdentity Algorithm Tuning.
 * If you're not sure what you're doing, just create a default config.
 */
export class AnIdentityConfig {
  constructor () {
    // jws alg array
    this.signatureAlgList = ['ES384']

    // jwe alg:enc array
    this.encryptionAlgList = ['ECDH-ES:A256GCM']

    // crypto.subtle deriveKey alg + colon delimited config
    this.passphraseSecretAlg = 'PBKDF2:SHA-512:200000'

    // crypto.subtle wrapKey alg + colon delimited config
    this.passphraseSymAlg = 'AES-GCM:256'

    // microseconds in the future to set new identity expirations
    this.expireAfterCountMicros = Number.MAX_SAFE_INTEGER

    // function returning Promise<CryptoKey> marked with deriveKey
    this.passphraseGetCb = async () => {
      const passphrase = window.prompt('Enter your passphrase - this is the default DEV password fetcher using window.prompt... there is no way to obscure the entered passphrase, you should NOT use this in PRODUCTION! Once this is masked, we highly recommend using a password manager to manage this passphrase.', '')
      const passphraseRaw = (new TextEncoder()).encode(passphrase)
      const passphraseKey = await crypto.subtle.importKey(
        'raw',
        passphraseRaw.buffer,
        'PBKDF2',
        false,
        ['deriveKey']
      )
      return passphraseKey
    }
  }
}

async function _loadIdent (passphraseKey) {
  const activeId = await idbKv.get('anIdActive:')

  console.log('activeId', activeId)

  const saveIdentity = await idbKv.get('anIdPriv:' + activeId)

  console.log('loaded saveIdentity', saveIdentity)

  const decryptContext = {}

  for (const enc of saveIdentity.enc) {
    enc._priv = await _decryptPriv(enc, decryptContext, passphraseKey)
    delete enc.encryptedPrivateKey
  }

  for (const sig of saveIdentity.sig) {
    sig._priv = await _decryptPriv(sig, decryptContext, passphraseKey)
    delete sig.encryptedPrivateKey
  }

  const fullIdentity = saveIdentity

  console.log('loaded fullIdentity', fullIdentity)

  const pubIdentity = {
    expiresAtUtcMicros: fullIdentity.expiresAtUtcMicros,
    id: fullIdentity.id,
    jws: fullIdentity.jws,
    enc: [],
    sig: []
  }

  for (const enc of fullIdentity.enc) {
    pubIdentity.enc.push({
      alg: enc.alg,
      enc: enc.enc,
      id: enc.id,
      jwk: enc.jwk
    })
  }

  for (const sig of fullIdentity.sig) {
    pubIdentity.sig.push({
      alg: sig.alg,
      id: sig.id,
      jwk: sig.jwk
    })
  }

  console.log('loaded pubIdentity', pubIdentity)

  return new AnIdentity(fullIdentity, pubIdentity)
}

async function _decryptPriv (item, ctx, passphraseKey) {
  const outAlg = item.alg
  const enc = item.encryptedPrivateKey
  if (!enc.passphraseSecretAlg || !enc.passphraseSecretAlg.startsWith('PBKDF2:')) {
    throw new Error('bad secret alg')
  }
  if (!enc.passphraseSymAlg || !enc.passphraseSymAlg.startsWith('AES-GCM:')) {
    throw new Error('bad sym alg')
  }

  const algParts = enc.passphraseSecretAlg.split(':')
  const hash = algParts[1]
  const iters = parseInt(algParts[2], 10)
  const [alg, length] = enc.passphraseSymAlg.split(':')

  if (!ctx.salt || ctx.salt !== enc.passphraseSecretOpts.salt) {
    console.log('regenerate secret key...')

    ctx.salt = enc.passphraseSecretOpts.salt
    ctx.saltBytes = base64url.decode(ctx.salt)
    ctx.secretKey = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        hash,
        salt: ctx.saltBytes,
        iterations: iters
      },
      passphraseKey,
      {
        name: alg,
        length: parseInt(length, 10)
      },
      false,
      ['unwrapKey']
    )
  }

  console.log('ctx.secretKey', ctx.secretKey)

  let decKeyAlg = null
  let namedCurve = null
  let cap = null
  if (outAlg === 'ECDH-ES') {
    decKeyAlg = 'ECDH'
    namedCurve = 'P-256'
    cap = ['deriveKey', 'deriveBits']
  } else if (outAlg === 'ES384') {
    decKeyAlg = 'ECDSA'
    namedCurve = 'P-384'
    cap = ['sign']
  } else {
    throw new Error('unsupported priv key alg: "' + outAlg + '"')
  }

  const privateKey = await crypto.subtle.unwrapKey(
    'jwk',
    base64url.decode(enc.privateKey),
    ctx.secretKey,
    {
      name: 'AES-GCM',
      iv: base64url.decode(enc.passphraseSymOpts.iv),
      tagLength: 128
    },
    {
      name: decKeyAlg,
      namedCurve
    },
    true,
    cap
  )

  console.log('EXTRACTED PRIV KEY!!:', privateKey)

  const publicKey = await importJWK(item.jwk, item.alg)

  console.log('pub key: ', publicKey)

  return {
    encryptedPrivateKey: item.encryptedPrivateKey,
    privateKey,
    publicKey
  }
}

async function _genIdent (config, passphraseKey) {
  if (config.passphraseSecretAlg.startsWith('PBKDF2:')) {
    const algParts = config.passphraseSecretAlg.split(':')
    const hash = algParts[1]
    const iters = parseInt(algParts[2], 10)

    let encryptPrivKey = null

    if (config.passphraseSymAlg.startsWith('AES-GCM:')) {
      const [alg, length] = config.passphraseSymAlg.split(':')

      const pbkdf2Salt = crypto.getRandomValues(new Uint8Array(24))
      const secretKey = await crypto.subtle.deriveKey(
        {
          name: 'PBKDF2',
          hash,
          salt: pbkdf2Salt,
          iterations: iters
        },
        passphraseKey,
        {
          name: alg,
          length: parseInt(length, 10)
        },
        false,
        ['wrapKey']
      )

      // jose/jw* tools don't have any support for password hashing
      // nor the ability to encrypt private keys without exposing
      // them to unsafe javascript runtime memory, so we'll
      // use crypto.subtle directly for persisting the private keys.
      encryptPrivKey = async privateKey => {
        const aesGcmIv = crypto.getRandomValues(new Uint8Array(24))
        const savePrivKey = await crypto.subtle.wrapKey(
          'jwk',
          privateKey,
          secretKey,
          {
            name: alg,
            iv: aesGcmIv,
            tagLength: 128
          }
        )
        return {
          passphraseSecretAlg: config.passphraseSecretAlg,
          passphraseSecretOpts: {
            salt: base64url.encode(pbkdf2Salt)
          },
          passphraseSymAlg: config.passphraseSymAlg,
          passphraseSymOpts: {
            iv: base64url.encode(aesGcmIv)
          },
          privateKey: base64url.encode(new Uint8Array(savePrivKey))
        }
      }
    } else {
      throw new Error('unsupported passphraseSymAlg: "' + config.passphraseSymAlg + '"')
    }

    let expiresAtUtcMicros = Date.now() * 1000 + config.expireAfterCountMicros
    if (expiresAtUtcMicros > Number.MAX_SAFE_INTEGER) {
      expiresAtUtcMicros = Number.MAX_SAFE_INTEGER
    }

    const fullIdentity = {
      expiresAtUtcMicros,
      enc: [],
      sig: []
    }

    const pubIdentity = {
      expiresAtUtcMicros,
      enc: [],
      sig: []
    }

    const saveIdentity = {
      expiresAtUtcMicros,
      enc: [],
      sig: []
    }

    for (const encDef of config.encryptionAlgList) {
      const [alg, enc] = encDef.split(':')
      const pair = await generateKeyPair(alg, { extractable: true })

      const publicKeyJwk = await exportJWK(pair.publicKey)
      const publicThumbprint = await calculateJwkThumbprint(publicKeyJwk, 'sha256')
      const encryptedPrivateKey = await encryptPrivKey(pair.privateKey)

      fullIdentity.enc.push({
        alg,
        enc,
        jwk: publicKeyJwk,
        id: publicThumbprint,
        _priv: {
          publicKey: pair.publicKey,
          privateKey: pair.privateKey,
          encryptedPrivateKey
        }
      })

      pubIdentity.enc.push({
        alg,
        enc,
        jwk: publicKeyJwk,
        id: publicThumbprint
      })

      saveIdentity.enc.push({
        alg,
        enc,
        jwk: publicKeyJwk,
        id: publicThumbprint,
        encryptedPrivateKey
      })
    }

    for (const sigAlg of config.signatureAlgList) {
      const pair = await generateKeyPair(sigAlg, { extractable: true })

      const publicKeyJwk = await exportJWK(pair.publicKey)
      const publicThumbprint = await calculateJwkThumbprint(publicKeyJwk, 'sha256')
      const encryptedPrivateKey = await encryptPrivKey(pair.privateKey)

      fullIdentity.sig.push({
        alg: sigAlg,
        jwk: publicKeyJwk,
        id: publicThumbprint,
        _priv: {
          publicKey: pair.publicKey,
          privateKey: pair.privateKey,
          encryptedPrivateKey
        }
      })

      pubIdentity.sig.push({
        alg: sigAlg,
        jwk: publicKeyJwk,
        id: publicThumbprint
      })

      saveIdentity.sig.push({
        alg: sigAlg,
        jwk: publicKeyJwk,
        id: publicThumbprint,
        encryptedPrivateKey
      })
    }

    // the payload for the signatures is:
    // - 8 bytes i64LE utc ms expiration
    // - [enc[N].id, ..]
    // - [sig[N].id, ..]
    const sigBytes = []

    const expiresAtBytes = new ArrayBuffer(8)
    const dv = new DataView(expiresAtBytes)
    dv.setBigInt64(0, BigInt(fullIdentity.expiresAtUtcMicros), true)
    sigBytes.push(new Uint8Array(expiresAtBytes))

    for (const enc of fullIdentity.enc) {
      sigBytes.push(base64url.decode(enc.id))
    }

    for (const sig of fullIdentity.sig) {
      sigBytes.push(base64url.decode(sig.id))
    }

    const sigBytesHash = await _concatHash(sigBytes)

    const sign = new GeneralSign(sigBytesHash)

    for (const sig of fullIdentity.sig) {
      sign
        .addSignature(sig._priv.privateKey)
        .setProtectedHeader({ alg: sig.alg })
    }

    fullIdentity.jws = await sign.sign()
    pubIdentity.jws = fullIdentity.jws
    saveIdentity.jws = fullIdentity.jws

    // unlike jwk thumbprints, there's no standard here...
    // using a sha-256 of: `payload + [protected + signature, ..]`
    const idBytes = []
    idBytes.push(base64url.decode(fullIdentity.jws.payload))
    for (const sig of fullIdentity.jws.signatures) {
      idBytes.push(base64url.decode(sig.protected))
      idBytes.push(base64url.decode(sig.signature))
    }

    fullIdentity.id = base64url.encode(await _concatHash(idBytes))
    pubIdentity.id = fullIdentity.id
    saveIdentity.id = fullIdentity.id

    console.log('full', fullIdentity)
    console.log('pub', pubIdentity)
    console.log('save', saveIdentity)

    await idbKv.set('anIdPub:' + pubIdentity.id, pubIdentity)
    await idbKv.set('anIdPriv:' + saveIdentity.id, saveIdentity)
    await idbKv.set('anIdActive:', saveIdentity.id)

    return new AnIdentity(fullIdentity, pubIdentity)
  } else {
    throw new Error('unsupported passphraseSecretAlg: "' + config.passphraseSecretAlg + '"')
  }
}

/**
 * Provides allnet system JWK JWS JWE JWT functionality.
 */
export class AnIdentity {
  /**
   * Create a new identity. Use the async constructor createAnIdentity.
   */
  constructor (fullIdentity, pubIdentity) {
    this.fullIdentity = fullIdentity
    this.pubIdentity = pubIdentity
  }

  /**
   * Async constructor - Create a new identity.
   *
   * @param {function} getPassphraseCb should return a promise that resolves
   *                   to a passphrase as a CryptoKey
   */
  static async createAnIdentity (config) {
    const passphraseKey = await config.passphraseGetCb()

    try {
      return await _loadIdent(passphraseKey)
    } catch (e) {
      console.error('faild to load identity, generating new...', e)
      return await _genIdent(config, passphraseKey)
    }
  }
}

// -- helpers -- //

async function _concatHash (bufs) {
  let len = 0
  for (const buf of bufs) {
    len += buf.byteLength
  }

  const out = new Uint8Array(len)
  let offset = 0

  for (const buf of bufs) {
    out.set(buf, offset)
    offset += buf.byteLength
  }

  const hash = await crypto.subtle.digest('SHA-256', out)

  return new Uint8Array(hash)
}
