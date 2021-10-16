import { nanoid } from 'nanoid'
import semver from 'semver'

/**
 * Represents an allnet module specification identifier.
 * Canonically: [topCategory].[subCategory].[name]@[semver]
 */
export class AnModuleSpec {
  /**
   * Generate a new, anonymous module spec
   */
  static newAnon () {
    return new AnModuleSpec('anon.anon.' + nanoid() + '@0.0.1-alpha.1')
  }

  /**
   * Parse / validate an allnet module spec from a canonical string.
   */
  constructor (spec) {
    if (typeof spec !== 'string') {
      throw new Error('spec must be a string')
    }
    const topParts = spec.split('@')
    if (topParts.length !== 2) {
      throw new Error('spec must contain exactly 1 "@" symbol')
    }
    const nameParts = topParts[0].split('.')
    if (nameParts.length !== 3) {
      throw new Error('spec name (before "@") must contain exactly 2 "." symbols')
    }
    for (const namePart of nameParts) {
      if (!namePart.match(/^[A-Za-z0-9_-]+$/)) {
        throw new Error('spec name parts must match /^[A-Za-z0-9_-]+$/')
      }
    }
    if (!semver.valid(topParts[1])) {
      throw new Error('spec version (after "@") must be a valid semver string')
    }
    this.name = nameParts.join('.')
    this.version = semver.clean(topParts[1])
    this.canonical = this.name + '@' + this.version
    Object.freeze(this)
  }

  /**
   * Get the canonical string representation of this module spec.
   */
  toString () {
    return this.canonical
  }

  /**
   * Check if this module spec version satisfies the given semver requirement.
   * Note, you must check the module names match separate from this call.
   */
  satisfies (requirement) {
    return semver.satisfies(this.version, requirement)
  }
}
