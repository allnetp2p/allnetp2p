import * as assert from 'assert'
import { AnAsIdentity, AnAsIdentityFactory } from '../src/an-identity'

class TestId extends AnAsIdentity {
  bob: string

  constructor() {
    super()
    this.bob = 'yo'
  }
}

class TestIdFact extends AnAsIdentityFactory<TestId> {
  async generateNew(passphrase: CryptoKey | Uint8Array): Promise<TestId> {
    console.log(`TestIdFact::generateNew(${passphrase})`)
    return new TestId()
  }
}

describe('an-identity test suite', () => {
  it('sanity', async () => {
    const fact = new TestIdFact()
    const inst = await fact.generateNew(new Uint8Array(4))
    assert(inst instanceof AnAsIdentity)
    assert(inst instanceof TestId)
  })
})
