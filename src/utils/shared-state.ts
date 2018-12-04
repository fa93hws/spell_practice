import { useState, useEffect } from "react";

import bindthis from './decorators/bindthis';
import MessageChannel from './message-channel';

export default class Store<StateType> {
  private channel = new MessageChannel();
  private state: Map<string, any> = new Map();

  @bindthis private toEventName(name: StateType) {
    return `set_${name}`;
  }

  @bindthis public createState<T>(name: StateType, initialVal: T): void {
    this.state.set(name.toString(), initialVal);
  }

  @bindthis public useState<T>(name: StateType): [T, (val: T) => void] {
    const eventName = this.toEventName(name);
    const [individualState, _setIndividualState] = useState(this.state.get(name.toString()));

    useEffect(() => {
      this.channel.subscribe(eventName, _setIndividualState);
      return () => {
        this.channel.unsubscribe(eventName, _setIndividualState);
      }
    }, []);

    const setIndividualState = (value: T) => {
      this.state.set(name.toString(), value);
      this.channel.publish(eventName, value);
    }

    return [individualState, setIndividualState];
  }
}
