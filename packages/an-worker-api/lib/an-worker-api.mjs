import { nanoid } from 'nanoid'

/**
 * When writing a new allnet worker module, construct an instance
 * of this class in order to communicate your module's capabilities
 * and make connections to other running modules.
 */
export class AnWorkerApi {
  /**
   * Create a new AnWorkerApi instance connects to webworker communication
   * channels, and exposes the standard allnet worker module api hooks.
   */
  constructor () {
    if (globalThis.onmessage) {
      throw new Error('globalThis.onmessage is already set. You should only initialize AnWorkerApi once per web worker.')
    }
    globalThis.onmessage = evt => {
      this._handleMessage(evt.data)
    }
    this._pending = new Map()
  }

  /**
   * Emit a raw allnet module api event.
   * You probably want to use a higher-level api.
   */
  rawEvent (type, data, transfer) {
    globalThis.postMessage({
      type,
      dir: 'evt',
      data
    }, transfer)
  }

  /**
   * Make a raw allnet module api request.
   * You probably want to use a higher-level api.
   */
  rawRequest (type, data, transfer) {
    const msgId = nanoid()
    globalThis.postMessage({
      type,
      dir: 'req',
      msgId,
      data
    }, transfer)
    return new Promise((resolve, reject) => {
      this._pending.set(msgId, [resolve, reject])
      setTimeout(() => {
        const res = this._pending.get(msgId)
        this._pending.delete(msgId)
        if (res) {
          res[1](new Error('timeout'))
        }
      }, 30000)
    })
  }

  /**
   */
  async registerModule (spec) {
    // don't care about response, just need it to not be an error
    await this.rawRequest(
      'registerModule',
      spec
    )
  }

  // -- private -- //

  _handleMessage (data) {
    if (data.dir === 'res') {
      const res = this._pending.get(data.msgId)
      this._pending.delete(data.msgId)
      if (res) {
        if (data.error) {
          res[1](data.error)
        } else {
          res[0](data.data)
        }
      }
    } else {
      throw new Error('dir ' + data.dir + ' not yet handled')
    }
  }
}
