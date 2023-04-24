import Store from "../store/store.js";

export abstract class ElementItem {
  abstract render(): void;
}

interface ComponentProps {
  store: Store;
  element: HTMLElement;
}

export default class Component {
  // public render: () => void;
  public store: Store;
  public element: HTMLElement;

  constructor(props: ComponentProps) {
    this.store = props.store;
    this.render = this.render || function () {};

    if (props.store instanceof Store) {
      props.store.events.subscribe("stateChange", () => this.render());
    }
    if (props.hasOwnProperty("element")) {
      this.element = props.element;
    }
  }
  render() {}
}
