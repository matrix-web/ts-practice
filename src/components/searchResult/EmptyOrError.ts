import Component, { ElementItem } from "../../lib/component.js";
import store from "../../store/index.js";

export default class EmptyOrError extends Component {
  constructor() {
    super({
      store,
      element: <HTMLElement>document.querySelector("#search-results-block"),
    });
  }
  render(message?: string): void {
    this.element.innerHTML = `
      <div class="no-results-block">
        <img src="img/no-results.png" />
        <p>${message}</p>
      </div>
    `;
  }
}
