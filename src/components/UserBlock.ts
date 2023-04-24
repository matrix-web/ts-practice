import Component, { ElementItem } from "../lib/component.js";
import store from "../store/index.js";

export default class UserBlock extends Component {
  constructor() {
    super({
      store,
      element: <HTMLElement>document.querySelector("#user-block"),
    });
  }
  render() {
    const favoritesCaption: string | number = this.store.state.user
      .favoriteAmount
      ? this.store.state.user.favoriteAmount
      : "ничего нет";

    const hasFavoriteItems = !!this.store.state.user.favoriteAmount;

    this.element.innerHTML = `
      <div class="header-container">
        <img class="avatar" src="${this.store.state.user.avatarPath}" alt="${
      this.store.state.user.avatarPath
    }" />
        <div class="info">
          <p class="name">${this.store.state.user.name}</p>
          <p class="fav">
            <i class="heart-icon${
              hasFavoriteItems ? " active" : ""
            }"></i>${favoritesCaption}
          </p>
        </div>
      </div>
    `;
  }
}
