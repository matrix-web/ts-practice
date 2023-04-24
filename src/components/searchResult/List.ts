import Component, { ElementItem } from "../../lib/component.js";
import store from "../../store/index.js";
import { LocalStore, formatPrice } from "../../helpers/utils.js";
import { IFavoriteItem, CustomEvent } from "../../helpers/interfaces.js";
import HomyApiProvider from "../../api/providers/homy-api/index.js";
import FlatSdkProvider from "../../api/providers/flat-sdk/index.js";
import { Place } from "../../api/domain/place.js";
import { Toast } from "../Toast.js";
import { Statuses } from "../../helpers/interfaces.js";

const homyProvider = new HomyApiProvider();
const flatSdkProvider = new FlatSdkProvider();

const toastInstance = new Toast();

export class List extends Component {
  public favoriteList: IFavoriteItem[];

  constructor() {
    super({
      store,
      element: <HTMLElement>document.querySelector("#search-results-block"),
    });
    this.favoriteList = LocalStore.getItem("favoriteItems");

    this.store.commit("setFavoriteAmount", this.favoriteList.length);
  }
  async handleBookPlace(event: CustomEvent) {
    const target = event.target;
    const itemId =
      target.tagName.toLowerCase() === "button" ? target.dataset.id : "";

    if (itemId) {
      const item: Place = this.store.state.places.find(
        (place: Place) => place.id === itemId
      );

      try {
        const checkInDate = new Date(this.store.state.checkInDate);
        const checkOutDate = new Date(this.store.state.checkOutDate);

        if (itemId.includes(FlatSdkProvider.provider)) {
          const data = await flatSdkProvider.book({
            flatId: item.originalId,
            checkInDate,
            checkOutDate,
          });

          toastInstance.render({
            type: Statuses.SUCCESS,
            text: `Место ${data} успешно забронировано!`,
          });
        } else {
          const data = await homyProvider.book({
            placeId: +item.originalId,
            checkInDate: checkInDate.getTime(),
            checkOutDate: checkOutDate.getTime(),
          });

          toastInstance.render({
            type: Statuses.SUCCESS,
            text: `Место ${data.name} успешно забронировано`,
          });
        }
      } catch (err) {
        toastInstance.render({
          type: Statuses.ERROR,
          text: `Ошибка бронирования! Пожалуйста попробуйте снова.`,
        });
        console.error(err);
      }
    }
  }
  handleAddFavoriteItem(event: CustomEvent) {
    const target = event.target;
    if (target.classList.contains("favorites")) {
      const itemId = target.closest("li").dataset.id;
      const itemIndex: number = this.favoriteList?.findIndex(
        (item) => item.id === itemId
      );

      const item = this.store.state.places.find((item) => item.id === itemId);

      if (itemIndex !== -1) {
        this.favoriteList.splice(itemIndex, 1);
        LocalStore.setItem("favoriteItems", this.favoriteList);
      } else {
        if (item) {
          this.favoriteList.push({
            id: item.id,
            name: item.name,
            image: Array.isArray(item.image) ? item.image[0] : item.image,
          });

          LocalStore.setItem("favoriteItems", this.favoriteList);
        }
      }

      this.store.commit("setFavoriteAmount", this.favoriteList.length);
    }
  }
  handleEvents() {
    const list = document.querySelector("#result-list");

    list.addEventListener("click", (event: CustomEvent) => {
      this.handleAddFavoriteItem(event);
      this.handleBookPlace(event);
    });
  }
  render() {
    const items: IFavoriteItem[] = LocalStore.getItem("favoriteItems");

    const markupItems = this.store.state.places
      .map((item) => {
        const isFavorite = items.some((favItem) => favItem.id === item.id);

        return `
        <li data-id="${item.id}" class="result">
        <div class="result-container">
          <div class="result-img-container">
            <div class="favorites ${isFavorite ? "active" : ""}"></div>
            <img class="result-img" src="${
              Array.isArray(item.image) ? item.image[0] : item.image
            }" alt="${item.name}">
          </div>	
          <div class="result-info">
            <div class="result-info--header">
              <p>${item.name}</p>
              <p class="price">${formatPrice(item.price)}</p>
            </div>
            <div style="display: ${
              typeof item.remoteness !== "string" ? "none" : "block"
            };" class="result-info--map"><i class="map-icon"></i> ${
          item.remoteness
        }км от вас</div>
            <div class="result-info--descr">${item.description}</div>
            <div class="result-info--footer">
              <button data-id="${item.id}">Забронировать</button>
            </div>
          </div>
        </div>
      </li>
    `;
      })
      .join("");

    this.element.insertAdjacentHTML(
      "beforeend",
      `
      <ul id="result-list" class="results-list">
        ${markupItems}
      </ul>
    `
    );
    this.handleEvents();
  }
}
