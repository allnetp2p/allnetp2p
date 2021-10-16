import brokerSource from '../node_modules/@allnetp2p/an-broker/dist/an-broker.js?raw'

(() => {
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
    console.log('@@-loader-@@ - broker message: ', evt.data)
  }

  brokerWorker.postMessage('test-message-from-an-loader')
})()
