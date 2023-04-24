import PubSub from "../lib/pubsub.js";

type StringOrSymbol = string | symbol;

export default class Store {
  public actions: any;
  public mutations: any;
  public state: any;
  public status: string;
  public events: PubSub;

  constructor(params: { actions: any; mutations: any; state: any }) {
    let self = this;
    self.actions = Object.create(null);
    self.mutations = Object.create(null);
    self.state = Object.create(null);
    self.status = "default state";
    self.events = new PubSub();

    if (params.hasOwnProperty("actions")) {
      self.actions = params.actions;
    }

    if (params.hasOwnProperty("mutations")) {
      self.mutations = params.mutations;
    }

    const settings = {
      set: function <S, V>(state: S, key: StringOrSymbol, value: V) {
        state[key] = value;
        console.log(`stateChange: ${String(key)}: ${value}`);
        self.events.publish("stateChange", self.state);
        if (self.status !== "mutation") {
          console.warn(`You should use a mutaion to set ${String(key)}`);
        }
        self.status = "resting";
        return true;
      },
      get<S>(state: S, key: StringOrSymbol) {
        if (typeof state[key] === "object" && state[key] !== null) {
          return new Proxy(state[key], settings);
        } else {
          return state[key];
        }
      },
    };

    self.state = new Proxy(params.state || {}, settings);
  }
  dispatch<T>(actionKey: string, payload?: T) {
    let self = this;
    if (typeof self.actions[actionKey] !== "function") {
      console.error(`Action "${actionKey}" doesn't exist.`);
      return false;
    }
    console.groupCollapsed(`ACTION: ${actionKey}`);
    self.status = "action";
    self.actions[actionKey](self, payload);
    return true;
  }
  commit<T>(mutationKey: string, payload?: T) {
    let self = this;
    if (typeof self.mutations[mutationKey] !== "function") {
      console.log(`Mutation "${mutationKey}" doesn't exist.`);
      return false;
    }
    self.status = "mutation";
    const newState = self.mutations[mutationKey](self.state, payload);
    self.state = Object.assign(self.state, newState);
    return true;
  }
}
