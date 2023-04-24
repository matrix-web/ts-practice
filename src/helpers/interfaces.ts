export interface SearchFilter {
  checkInDate: Date;
  checkOutDate: Date;
  priceLimit?: number;
  maxPrice?: number;
  coordinates?: string;
  city?: string;
}

export interface BookParams {
  checkInDate: Date | number;
  checkOutDate: Date | number;
  placeId?: number;
  flatid?: number | string;
}

export interface IFavoriteItem {
  id: string;
  name: string;
  image: string;
}

export enum Statuses {
  SUCCESS = "success",
  ERROR = "error",
}

export interface CustomEvent<
  T extends EventTarget | null | HTMLElement = HTMLElement
> extends Event {
  currentTarget: T;
  target: T;
}
