interface Event {
  [key: string]: ((args: any) => void)[];
}

export default class PubSub {
  public events: Event;

  constructor() {
    this.events = {};
  }
  subscribe(event: string, callback: () => void) {
    if (!this.events.hasOwnProperty(event)) {
      return (this.events[event] = []);
    }

    return this.events[event].push(callback);
  }
  publish(event: string, data: any = {}) {
    if (!this.events.hasOwnProperty(event)) {
      return [];
    }

    return this.events[event].map((callback) => callback(data));
  }
}
