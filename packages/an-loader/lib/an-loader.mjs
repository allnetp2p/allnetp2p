import * as base64 from 'base64-js'
import * as idbKv from 'idb-keyval'
import brokerSource from '../node_modules/@allnetp2p/an-broker/dist/an-broker.js?raw'

(async () => {
  console.log('@@-loader-@@ - broker source: ', brokerSource)

  const brokerBlob = new Blob(
    [brokerSource],
    { type: 'application/javascript' }
  )

  console.log('@@-loader-@@ - broker blob: ', brokerBlob)

  const brokerUrl = URL.createObjectURL(brokerBlob)

  console.log('@@-loader-@@ - broker url: ', brokerUrl)

  const brokerWorker = new Worker(brokerUrl)

  URL.revokeObjectURL(brokerUrl)

  console.log('@@-loader-@@ - broker worker: ', brokerWorker)

  brokerWorker.onmessage = evt => {
    const data = evt.data
    if (data.type === 'registerModule') {
      brokerWorker.postMessage({
        dir: 'res',
        msgId: data.msgId
      })
    } else {
      brokerWorker.postMessage({
        dir: 'res',
        msgId: data.msgId,
        error: 'unhandled req type: ' + data.type
      })
    }
    // console.log('@@-loader-@@ - broker message: ', evt.data)
  }

  // brokerWorker.postMessage('test-message-from-an-loader')

  const passphrase = await getUserPassphrase()
  const signKeypair = await loadOrGenerateSignatureKeypair(passphrase)

  console.log('SIGN KEYPAIR IDENTITY', signKeypair)

  setTimeout(() => {
    throw new Error('can debug?')
  }, 1000)
})().then(() => {}, err => {
  console.error(err)
})

/**
 * This is a stub right now that just returns the passphrase
 * 'passphrase' : )
 */
async function getUserPassphrase () {
  const passphraseRaw = (new TextEncoder()).encode('passphrase')

  console.log('@@-loader-@@ - passphraseRaw: ', passphraseRaw)

  const passphrase = await crypto.subtle.importKey(
    'raw',
    passphraseRaw.buffer,
    'PBKDF2',
    false,
    ['deriveKey']
  )

  console.log('@@-loader-@@ - passphrase: ', passphrase)

  return passphrase
}

/**
 * Generate, encrypt, store, and return a new signature keypair.
 */
async function generateNewSignatureKeypair (passphrase) {
  const signCurve = 'P-384'
  const pbkdf2HashAlgo = 'SHA-512'
  const pbkdf2Iterations = 200000

  const signKeypair = await crypto.subtle.generateKey(
    {
      name: 'ECDSA',
      namedCurve: signCurve
    },
    true,
    ['sign', 'verify']
  )

  console.log('@@-loader-@@ - signKeypair: ', signKeypair)

  const pbkdf2Salt = crypto.getRandomValues(new Uint8Array(24))

  const pbkdf2start = Date.now()
  const secretKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      hash: pbkdf2HashAlgo,
      salt: pbkdf2Salt,
      iterations: pbkdf2Iterations
    },
    passphrase,
    {
      name: 'AES-GCM',
      length: 8 * 32
    },
    false,
    ['wrapKey', 'unwrapKey']
  )
  const pbkdf2end = Date.now()

  console.log(
    '@@-loader-@@ - secretKey (in',
    pbkdf2end - pbkdf2start,
    'ms): ',
    secretKey
  )

  const aesGcmIv = crypto.getRandomValues(new Uint8Array(24))

  const savePrivKey = await crypto.subtle.wrapKey(
    'jwk',
    signKeypair.privateKey,
    secretKey,
    {
      name: 'AES-GCM',
      iv: aesGcmIv,
      tagLength: 128
    }
  )

  console.log('@@-loader-@@ - savePrivKey: ', savePrivKey)

  const savePubKey = await crypto.subtle.exportKey(
    'jwk',
    signKeypair.publicKey
  )

  console.log('@@-loader-@@ - savePubKey: ', savePubKey)

  const signKeypairEnc = {
    pbkdf2HashAlgo,
    pbkdf2Iterations,
    pbkdf2Salt: base64.fromByteArray(pbkdf2Salt),
    aesGcmIv: base64.fromByteArray(aesGcmIv),
    privateKey: base64.fromByteArray(new Uint8Array(savePrivKey)),
    publicKey: savePubKey
  }

  console.log('@@-loader-@@ - signKeypairEnc: ', signKeypairEnc)

  await idbKv.set('signKeypair', signKeypairEnc)

  return {
    privateKey: signKeypair.privateKey,
    publicKey: signKeypair.publicKey,
    publicKeyJwk: signKeypairEnc.publicKey
  }
}

/**
 * Load or generate a new signature keypair.
 */
async function loadOrGenerateSignatureKeypair (passphrase) {
  const signCurve = 'P-384'

  const signKeypairEnc = await (async () => {
    try {
      return await idbKv.get('signKeypair')
    } catch {
      return null
    }
  })()

  if (!signKeypairEnc) {
    console.log('@@-loader-@@ - no keypair in db, GENERATING NEW')
    return await generateNewSignatureKeypair(passphrase)
  }

  console.log('@@-loader-@@ - loaded stored keypair: ', signKeypairEnc)

  const pbkdf2Salt = base64.toByteArray(signKeypairEnc.pbkdf2Salt)

  const pbkdf2start = Date.now()
  const secretKey = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      hash: signKeypairEnc.pbkdf2HashAlgo,
      salt: pbkdf2Salt,
      iterations: signKeypairEnc.pbkdf2Iterations
    },
    passphrase,
    {
      name: 'AES-GCM',
      length: 8 * 32
    },
    false,
    ['wrapKey', 'unwrapKey']
  )

  const pbkdf2end = Date.now()

  console.log(
    '@@-loader-@@ - secretKey (in',
    pbkdf2end - pbkdf2start,
    'ms): ',
    secretKey
  )

  const aesGcmIv = base64.toByteArray(signKeypairEnc.aesGcmIv)

  const signPrivKey = await crypto.subtle.unwrapKey(
    'jwk',
    base64.toByteArray(signKeypairEnc.privateKey),
    secretKey,
    {
      name: 'AES-GCM',
      iv: aesGcmIv,
      tagLength: 128
    },
    {
      name: 'ECDSA',
      namedCurve: signCurve
    },
    true,
    ['sign']
  )

  console.log('@@-loader-@@ - signPrivKey: ', signPrivKey)

  const signPubKey = await crypto.subtle.importKey(
    'jwk',
    signKeypairEnc.publicKey,
    {
      name: 'ECDSA',
      namedCurve: signCurve
    },
    true,
    ['verify']
  )

  return {
    privateKey: signPrivKey,
    publicKey: signPubKey,
    publicKeyJwk: signKeypairEnc.publicKey
  }
}
