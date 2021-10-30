/**
 * An allnetp2p public identity definition
 */
export interface AnPubId {
  ver: string
  signPubJWK: object
  signId: string
  selfSig: string
  id: string
}

/**
 * An encrypted private key
 */
export interface AnEncPrivSigKey {
  pbkdf2Salt: string
  pbkdf2Iter: number
  aesGcmIv: string
  cipherText: string
}

/**
 * A "serialized" (save-able) allnetp2p identity with encrypted private key
 */
export interface AnSerPrivId extends AnPubId {
  encryptedPrivKey: AnEncPrivSigKey
}

/**
 * Interface for an allnetp2p identity provider
 */
export class AnAsIdentity {}

/**
 * Interface for an allnetp2p identity provider factory
 */
export class AnAsIdentityFactory<T extends AnAsIdentity> {
  /**
   */
  async generateNew(
    /* eslint-disable @typescript-eslint/no-unused-vars */
    _passphrase: CryptoKey | Uint8Array
    /* eslint-enable @typescript-eslint/no-unused-vars */
  ): Promise<T> {
    throw new Error('unimplemented')
  }
}
