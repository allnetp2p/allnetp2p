import * as assert from 'assert'
import { AnModuleSpec } from './an-spec'

describe('an-spec test suite', () => {
  it('newAnon', () => {
    const spec = AnModuleSpec.newAnon()
    console.log(spec)

    assert(spec.satisfies('0.0.1-alpha.1'))
    assert(!spec.satisfies('0.0.1'))
  })
})
