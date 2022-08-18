import MongoClass from "../../containers/containerMongo.js";
import { usersSchema } from "../../models/usersSchema.js";

export class MongoUsers extends MongoClass {
  constructor() {
    super("users", usersSchema);
  }
  async findByEmail(email) {
    try {
      const user = await this.collection.findOne({ email: email });
      return user;
    } catch (err) {
      throw new Error(err);
    }
  }
}
