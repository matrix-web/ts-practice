import { FlatRentSdk } from "../../../sdk/typescript-flatrent-sdk/public/scripts/flat-rent-sdk.js";
import { Place } from "../../domain/place.js";
import { Provider } from "../../domain/provider.js";
import { FlatResponse, BookParams, SearchParameters } from "./response.js";

export default class FlatSdkProvider implements Provider {
  public static provider = "flat-sdk";
  private static flatSdk = new FlatRentSdk();

  public find(filter: SearchParameters): Promise<Place[]> {
    // @ts-ignore
    return FlatSdkProvider.flatSdk.search(filter).then((result) => {
      return this.convertPlaceListResponse(result);
    });
  }

  public book(params: BookParams): Promise<number> {
    return (
      FlatSdkProvider.flatSdk
        .book(params.flatId, params.checkInDate, params.checkOutDate)
        // @ts-ignore
        .then((result) => {
          return new Promise((resolve) => resolve(result));
        })
    );
  }

  /**
   * Проходимся по каждому объекту и конвертируем его в экземпляр Place
   */
  private convertPlaceListResponse(response: FlatResponse[]): Place[] {
    return response.map((item) => this.convertPlaceResponce(item));
  }

  /**
   * Преобразование объекта flat из источника
   * в экземпляр Place нашего приложения
   */
  private convertPlaceResponce(item: FlatResponse): Place {
    return new Place(
      FlatSdkProvider.provider,
      String(item.id),
      item.title,
      item.details,
      item.photos,
      item.coordinates,
      item.bookedDates,
      item.totalPrice
    );
  }
}
