import { Place } from "../../domain/place.js";
import { Provider } from "../../domain/provider.js";
import { SearchFilter, BookParams } from "../../../helpers/interfaces.js";
import { HttpHelper } from "../../domain/http-helper.js";
import { dateToUnixStamp } from "../../../helpers/utils.js";
import { PlaceResponse } from "./response.js";

export default class HomyApiProvider implements Provider {
  public static provider = "homy-api";
  private static apiURL = `http://localhost:3030`;

  public find(filter: SearchFilter): Promise<Place[]> {
    return HttpHelper.fetchAsJson<PlaceResponse[]>(
      `${HomyApiProvider.apiURL}/places?${this.convertToQueryString(filter)}`
    ).then((response) => {
      return this.convertPlaceListResponse(response);
    });
  }

  public book(params: BookParams): Promise<Place> {
    return HttpHelper.fetchAsJson<PlaceResponse>(
      `${HomyApiProvider.apiURL}/places/${
        params.placeId
      }?${this.convertToQueryString({
        checkInDate: params.checkInDate,
        checkOutDate: params.checkOutDate,
      })}`,
      {
        method: "PATCH",
      }
    ).then((response) => {
      return this.convertPlaceResponce(response);
    });
  }
  /**
   * Проходимся по каждому объекту и конвертируем его в экземпляр Place
   */
  private convertPlaceListResponse(response: PlaceResponse[]): Place[] {
    return response.map((item) => this.convertPlaceResponce(item));
  }
  /**
   * Преобразование объекта place из источника
   * в экземпляр Place нашего приложения
   */
  private convertPlaceResponce(item: PlaceResponse): Place {
    return new Place(
      HomyApiProvider.provider,
      String(item.id),
      item.name,
      item.description,
      item.image,
      item.remoteness,
      item.bookedDates,
      item.price
    );
  }

  /**
   * Преобразование общего фильтра
   * в get-параметры текущего источника
   */
  private convertToQueryString<T>(filter: T): string {
    const keys = Object.getOwnPropertyNames(filter);
    const searchString = keys
      .filter((key) => filter[key])
      .map(
        (key) =>
          `${key}=${
            key === "checkInDate" || key === "checkOutDate"
              ? dateToUnixStamp(new Date(filter[key]))
              : filter[key]
          }`
      )
      .join("&");

    return searchString;
  }
}
