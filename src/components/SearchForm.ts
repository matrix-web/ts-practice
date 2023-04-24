import Component, { ElementItem } from "../lib/component.js";
import store from "../store/index.js";
import { formatDate } from "../helpers/utils.js";
import HomyApiProvider from "../api/providers/homy-api/index.js";
import FlatSdkProvider from "../api/providers/flat-sdk/index.js";
import { Place } from "../api/domain/place.js";
// import { Result } from "./searchResult/result.js";
// import EmptyOrError from "./searchResult/EmptyOrError.js";
import { SearchResultHeader } from "./searchResult/Header.js";

// const emptyOrErrorInstance = new EmptyOrError();
const searchResultInstance = new SearchResultHeader();
const homyProvider = new HomyApiProvider();
const flatSdkProvider = new FlatSdkProvider();

export default class SearchForm extends Component {
  private currentDate: Date;
  private dateOfEntry: Date;
  private dateOfDeparture: Date;
  private minDate: string;
  private maxDate: string;

  constructor() {
    super({
      store,
      element: <HTMLElement>document.querySelector("#search-form-block"),
    });

    this.currentDate = new Date();
    const firstDayMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth(),
      1
    );
    const lastDayMonth = new Date(
      this.currentDate.getFullYear(),
      this.currentDate.getMonth() + 1,
      0
    );

    this.dateOfEntry = new Date(
      this.currentDate.getTime() + 24 * 60 * 60 * 1000
    );
    this.dateOfDeparture = new Date(
      this.dateOfEntry.getTime() + 48 * 60 * 60 * 1000
    );

    this.minDate = formatDate(firstDayMonth);
    this.maxDate = formatDate(lastDayMonth);
  }
  private handleSearchForm() {
    const form = document["search-form"];

    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      const elements = event.currentTarget.elements;
      const city = elements.city.value;
      const coordinates = elements.coordinates.value;
      const maxPrice = elements["max-price"].value;
      const checkInDate = elements["checkin"].value;
      const checkOutDate = elements["checkout"].value;

      this.store.commit("setCheckInDate", checkInDate);
      this.store.commit("setCheckOutDate", checkOutDate);

      const homyAPIParams = {
        coordinates,
        checkInDate,
        checkOutDate,
        maxPrice,
      };

      const flatSdkParams = {
        city: city,
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
        priceLimit: +maxPrice,
      };

      const result: Place[][] = await Promise.all([
        homyProvider.find(homyAPIParams),
        flatSdkProvider.find(flatSdkParams),
      ]);

      const transformedResult = result.reduce(
        (prev, current) => prev.concat(current),
        []
      );

      this.store.commit("setPlaces", transformedResult);
    });
  }
  render() {
    this.element.innerHTML = `
        <form name="search-form">
          <fieldset class="search-filedset">
            <div class="row">
              <div>
                <label for="city">Город</label>
                <input id="city" type="text" disabled value="Санкт-Петербург" />
                <input id="coordinates" type="hidden" disabled value="59.9386,30.3141" />
              </div>
              <!--<div class="providers">
                <label><input type="checkbox" name="provider" value="homy" checked /> Homy</label>
                <label><input type="checkbox" name="provider" value="flat-rent" checked /> FlatRent</label>
              </div>--!>
            </div>
            <div class="row">
              <div>
                <label for="check-in-date">Дата заезда</label>
                <input id="check-in-date" type="date" value="${formatDate(
                  this.dateOfEntry
                )}" min="${this.minDate}" max="${
      this.maxDate
    }" name="checkin" />
              </div>
              <div>
                <label for="check-out-date">Дата выезда</label>
                <input id="check-out-date" type="date" value="${formatDate(
                  this.dateOfDeparture
                )}" min="${this.minDate}" max="${
      this.maxDate
    }" name="checkout" />
              </div>
              <div>
                <label for="max-price">Макс. цена суток</label>
                <input id="max-price" type="text" value="10000" name="price" class="max-price" />
              </div>
              <div>
                <div><button>Найти</button></div>
              </div>
            </div>
          </fieldset>
        </form>
    `;
    searchResultInstance.render();
    this.handleSearchForm();
  }
}
