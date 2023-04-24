import store from "./store/index.js";
import UserBlock from "./components/UserBlock.js";
import SearchForm from "./components/SearchForm.js";
import DefaultComponent from "./components/searchResult/Default.js";
import { SearchResultHeader } from "./components/searchResult/Header.js";
import { List } from "./components/searchResult/List.js";

const userBlockInstance = new UserBlock();
const searchFormInstance = new SearchForm();
const defaultComponentInstance = new DefaultComponent();
const searchResultInstance = new SearchResultHeader();
const listInstance = new List();

document.addEventListener("DOMContentLoaded", () => {
  userBlockInstance.render();
  searchFormInstance.render();

  if (!store.state.places.length) {
    defaultComponentInstance.render();
  } else {
    searchResultInstance.render();
    listInstance.render();
  }
});
