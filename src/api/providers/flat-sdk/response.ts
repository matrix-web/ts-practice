export interface FlatResponse {
  id: string;
  title: string;
  details: string;
  photos: string[];
  coordinates: number[];
  bookedDates: number[];
  totalPrice: number;
}

export interface BookParams {
  flatId: string;
  checkInDate: Date;
  checkOutDate: Date;
}
// * @param {string}parameters.city City name
// * @param {Date} parameters.checkInDate Check-in date
// * @param {Date} parameters.checkOutDate Check-out date
// * @param {number} [parameters.priceLimit] Max price for a night
// * @returns {Object[]} List of suitable flats.

export interface SearchParameters {
  city: string;
  checkInDate: Date;
  checkOutDate: Date;
  priceLimit: number;
}
