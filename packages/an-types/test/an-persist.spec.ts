import * as assert from 'assert'
import { AnAsPersist } from '../src/an-persist'

describe('an-persist test suite', () => {
  it('sanity', () => {
    assert(typeof AnAsPersist.getActiveIdentity === 'function')
  })
})
