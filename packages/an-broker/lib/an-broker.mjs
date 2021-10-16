class AnBroker {
  constructor () {
    this.prefix = 'test-prefix'
  }

  handle (msg) {
    postMessage({
      prefix: this.prefix,
      gotMessage: msg
    })
  }
}

(() => {
  const broker = new AnBroker()
  onmessage = evt => {
    broker.handle(evt.data)
  }
})()
