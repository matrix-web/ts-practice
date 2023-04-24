import { SearchResultHeader } from "./Header.js";
import { List } from "./List.js";

const searchResultInstance = new SearchResultHeader();
const listInstance = new List();

export class Result {
  render() {
    searchResultInstance.render();
    listInstance.render();
  }
}
