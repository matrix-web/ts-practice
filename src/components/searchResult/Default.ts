import Component, { ElementItem } from "../../lib/component.js";
import store from "../../store/index.js";

export default class DefaultComponent extends Component {
  constructor() {
    super({
      store,
      element: <HTMLElement>document.querySelector("#search-results-block"),
    });
  }
  render(): void {
    this.element.innerHTML = `
      <div class="before-results-block">
        <img src="img/start-search.png" />
        <p>Чтобы начать поиск, заполните форму и&nbsp;нажмите "Найти"</p>
      </div>
    `;
  }
}
