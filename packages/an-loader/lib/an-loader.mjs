import brokerSource from '../node_modules/@allnetp2p/an-broker/dist/an-broker.js?raw'
import { AnIdentityConfig, AnIdentity } from '@allnetp2p/an-identity'

(async () => {
  const identityConfig = new AnIdentityConfig()
  const identity = await AnIdentity.createAnIdentity(identityConfig)
  console.log('@@-loader-@@ - identity: ', identity)

  const jwt = await identity.signCapability({
    capabilities: { 'test.zombie.what.is.this': true },
    subject: identity.fullIdentity.id
  })
  console.log('@@-loader-@@ - jwt: ', jwt)
  console.log('@@-loader-@@ - jwt-validate: ', await AnIdentity.validateJWT(jwt))

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

  setTimeout(() => {
    throw new Error('can debug?')
  }, 1000)
})().then(() => {}, err => {
  console.error(err)
})
