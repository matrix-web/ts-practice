import Component, { ElementItem } from "../../lib/component.js";
import store from "../../store/index.js";

export class SearchResultHeader extends Component {
  constructor() {
    super({
      store,
      element: <HTMLElement>document.querySelector("#search-results-block"),
    });
  }
  eventsHandler() {
    const sortList = <HTMLSelectElement>document.querySelector("#sort-list");

    sortList.addEventListener("change", () => {
      console.log(sortList.options[sortList.selectedIndex]);
    });
  }
  render() {
    this.element.innerHTML = "";

    this.element.insertAdjacentHTML(
      "beforeend",
      `
      <div class="search-results-header">
        <p>Результаты поиска</p>
        <div class="search-results-filter">
            <span><i class="icon icon-filter"></i> Сортировать:</span>
            <select id="sort-list">
              <option selected value="cheap">Сначала дешёвые</option>
              <option value="expensive">Сначала дорогие</option>
              <option value="closer">Сначала ближе</option>
              <option value="far">Сначала дальше</option>
            </select>
        </div>
      </div>
    `
    );
  }
}
