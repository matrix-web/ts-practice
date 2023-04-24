export interface Flat {
  id: string;
  title: string;
  details: string;
  photos: string[];
  coordinates: number[];
  bookedDates: [];
  price: 12000;
}

export interface SearchParameters {
  city: string;
  checkInDate: Date;
  checkOutDate: Date;
  priceLimit: string;
}

export declare class FlatRentSdk {
  get(id: string): Promise<Flat | null>;
  search(parameters: SearchParameters): Flat[];
  book(flatId: string | number, checkInDate: Date, checkOutDate: Date): number;
}
