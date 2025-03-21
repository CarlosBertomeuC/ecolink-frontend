import { Ods } from "../../../core/models/Ods";
import { Product } from "./Product";
import { Proposal } from "./Proposal";

export interface StartupDetails {
  description: string;
  imageUrl: string;
  listLikePost: null;
  name: string;
  odsList: Ods[];
  products: Product[];
  proposals: Proposal[];
}
