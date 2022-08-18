import MongoClass from "../../containers/containerMongo.js";
import { UsersSchema } from "../../models/usersSchema.js";

export class MongoUsers extends MongoClass {
  constructor() {
    super("users", UsersSchema);
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
