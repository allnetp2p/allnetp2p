import {
  CompactEncrypt,
  generateKeyPair
} from 'jose-browser-runtime'

/**
 * AnIdentity Algorithm Tuning.
 * If you're not sure what you're doing, just create a default config.
 */
export class AnIdentityConfig {
  constructor () {
    this.signatureKeyAlg = 'ES384'
    this.encryptionKeyAlg = 'ECDH-ES'
    this.encryptionSymAlg = 'A256GCM'
    this.passphraseAlg = 'PBKDF2'
    this.passphraseHashAlg = 'SHA-512'
    this.passphraseIterCount = 200000
    this.passphraseGetCb = async () => {
      const passphrase = window.prompt('Enter your passphrase - this is the default DEV password using window.prompt... there is no way to obscure the entered passphrase, you should NOT use this in PRODUCTION!', '')
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

/**
 * Provides allnet system JWK JWS JWE JWT functionality.
 */
export class AnIdentity {
  /**
   * Create a new identity. Use the async constructor createAnIdentity.
   */
  constructor (
    signPublicKey,
    signPrivateKey,
    encPublicKey,
    encPrivateKey
  ) {
    this.signPublicKey = signPublicKey
    this.signPrivateKey = signPrivateKey
    this.encPublicKey = encPublicKey
    this.encPrivateKey = encPrivateKey
  }

  /**
   * Async constructor - Create a new identity.
   *
   * @param {function} getPassphraseCb should return a promise that resolves
   *                   to a passphrase as a CryptoKey
   */
  static async createAnIdentity (config) {
    const passphrase = await config.passphraseGetCb()

    const {
      publicKey: signPublicKey,
      privateKey: signPrivateKey
    } = await generateKeyPair('ES384', { extractable: true })
    console.log('sign publicKey', signPublicKey)
    console.log('sign privateKey', signPrivateKey)

    const {
      publicKey: encPublicKey,
      privateKey: encPrivateKey
    } = await generateKeyPair('ECDH-ES', { extractable: true })
    console.log('enc publicKey', encPublicKey)
    console.log('enc privateKey', encPrivateKey)

    const pbkdf2Salt = crypto.getRandomValues(new Uint8Array(24))
    const pbkdf2HashAlgo = 'SHA-512'
    const pbkdf2Iterations = 200000
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
      ['encrypt', 'decrypt']
    )

    console.log('aes gcm 256 secret', secretKey)

    const dirJwe = await new CompactEncrypt(
      (new TextEncoder()).encode('test message')
    ).setProtectedHeader({ alg: 'dir', enc: 'A256GCM' }).encrypt(secretKey)

    console.log('dir/a256gcm jwe', dirJwe)

    const ecdhJwe = await new CompactEncrypt(
      (new TextEncoder()).encode('test message')
    ).setProtectedHeader({ alg: 'ECDH-ES', enc: 'A256GCM' }).encrypt(encPublicKey)

    console.log('ecdh-es/a256gcm jwe', ecdhJwe)

    return new AnIdentity(
      signPublicKey,
      signPrivateKey,
      encPublicKey,
      encPrivateKey
    )
  }
}
