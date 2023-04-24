import { Place } from "./place.js";
import { SearchFilter, BookParams } from "../../helpers/interfaces.js";

export interface Provider {
  find(filter: SearchFilter): Promise<Place[]>;
  book(params: BookParams): Promise<Place | number>;
}
