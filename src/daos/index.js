import dotenv from "dotenv";
dotenv.config();

let productsDao;
let cartDao;
let usersDao;

switch (process.env.DB_SELECTED) {
  case "mongoDB":
    import("./products/productsMongo.js").then(({ MongoProducts }) => {
      productsDao = new MongoProducts();
    });
    import("./cart/cartMongo.js").then(({ MongoCart }) => {
      cartDao = new MongoCart();
    });
    import("./users/usersMongo.js").then(({ MongoUsers }) => {
      usersDao = new MongoUsers();
    });
    break;

  default:
    console.log("Esta en default");
    break;
}

export { productsDao, cartDao, usersDao };
