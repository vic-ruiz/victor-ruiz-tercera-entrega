import MongoClass from "../../containers/containerMongo.js";
import { ProductsSchema } from "../../models/productsSchema.js";

export class MongoProducts extends MongoClass {
  constructor() {
    super("products", ProductsSchema);
  }
}
