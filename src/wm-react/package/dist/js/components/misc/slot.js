/* @copyright Stadt Wien - Wiener Melange 200 */
class SlotController {
  host;

  constructor(host) {
    (this.host = host).addController(this);
  }
  hostConnected() {
    // console.log('SlotController connected')
  }
  hostDisconnected() {
    // console.log('SlotController disconnected')
  }

  hasNamedSlot(slotName) {
    return this.host.querySelector(`:scope > [slot="${slotName}"]`) !== null;
  }
}

export { SlotController };
