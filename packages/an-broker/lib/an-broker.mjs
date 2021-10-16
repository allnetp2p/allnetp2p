import { AnWorkerApi } from '@allnetp2p/an-worker-api'

(async () => {
  console.log(AnWorkerApi, typeof AnWorkerApi, Object.keys(AnWorkerApi))
  const workerApi = new AnWorkerApi()
  // TODO pull version from package.json
  await workerApi.registerModule('system.allnetp2p.broker@0.0.1')
  console.log('BROKER WORKER REGISTER SUCCESS')
})().then(() => {}, err => {
  console.error(err)
})
