import bindthis from './decorators/bindthis';

export type CallBackType = (...args: any[]) => any;

export default class MessageChannel {
  private readonly events: { [eventName: string]: CallBackType[] } = {};

  @bindthis public hasEvent(eventName: string) {
    return this.events[eventName] !== undefined && this.events[eventName].length > 0;
  }
  @bindthis public publish(eventName: string, ...args: any[]) {
    if (this.events[eventName] === undefined) return;
    this.events[eventName].forEach(c => {
      c(...args);
    });
  }

  @bindthis public subscribe(eventName: string, callback: CallBackType) {
    if (this.events[eventName] === undefined)
      this.events[eventName] = [];
    this.events[eventName].push(callback);
  }

  @bindthis public unsubscribe(eventName: string, callback: CallBackType) {
    if (this.events[eventName] === undefined) return;
    this.events[eventName] = this.events[eventName].filter(c => c !== callback);
  }
}
