import {
  base64url,
  calculateJwkThumbprint,
  GeneralSign,
  exportJWK,
  generateKeyPair
} from 'jose-browser-runtime'

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

    // milliseconds in the future to set new identity expirations
    this.expireAfterCountMs = Number.MAX_SAFE_INTEGER

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
  throw new Error('unimplemented')
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

    let expiresAtUtcMs = Date.now() + config.expireAfterCountMs
    if (expiresAtUtcMs > Number.MAX_SAFE_INTEGER) {
      expiresAtUtcMs = Number.MAX_SAFE_INTEGER
    }

    const fullIdentity = {
      expiresAtUtcMs,
      enc: [],
      sig: [],
      sigBytes: ''
    }

    for (const encDef of config.encryptionAlgList) {
      const [alg, enc] = encDef.split(':')
      const pair = await generateKeyPair(alg, { extractable: true })

      const publicKeyJwk = await exportJWK(pair.publicKey)
      const publicThumbprint = await calculateJwkThumbprint(publicKeyJwk)
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
    }

    for (const sigAlg of config.signatureAlgList) {
      const pair = await generateKeyPair(sigAlg, { extractable: true })

      const publicKeyJwk = await exportJWK(pair.publicKey)
      const publicThumbprint = await calculateJwkThumbprint(publicKeyJwk)
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
    }

    const sigBytes = []
    let sigBytesCount = 0

    const expiresAtBytes = new ArrayBuffer(8)
    const dv = new DataView(expiresAtBytes)
    dv.setFloat64(0, fullIdentity.expiresAtUtcMs, true)
    sigBytes.push(new Uint8Array(expiresAtBytes))
    sigBytesCount += 8

    for (const enc of fullIdentity.enc) {
      const bytes = base64url.decode(enc.id)
      sigBytes.push(bytes)
      sigBytesCount += bytes.byteLength
    }

    for (const sig of fullIdentity.sig) {
      const bytes = base64url.decode(sig.id)
      sigBytes.push(bytes)
      sigBytesCount += bytes.byteLength
    }

    const sigBytesAll = new Uint8Array(sigBytesCount)
    let offset = 0

    for (const bytes of sigBytes) {
      sigBytesAll.set(bytes, offset)
      offset += bytes.byteLength
    }

    const sign = new GeneralSign(sigBytesAll)

    for (const sig of fullIdentity.sig) {
      sign
        .addSignature(sig._priv.privateKey)
        .setProtectedHeader({ alg: sig.alg })
    }

    fullIdentity.jws = await sign.sign()

    console.log('full', fullIdentity)

    throw new Error('unimplemented')
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
  // constructor () {
  // }

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
    } catch {
      return await _genIdent(config, passphraseKey)
    }
  }
}
