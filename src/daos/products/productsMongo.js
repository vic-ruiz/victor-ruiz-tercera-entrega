import MongoClass from "../../containers/containerMongo.js";
import { productsSchema } from "../../models/productsSchema.js";

export class MongoProducts extends MongoClass {
  constructor() {
    super("products", productsSchema);
  }
}
