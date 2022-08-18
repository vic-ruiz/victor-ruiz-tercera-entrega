import express from "express";
import session from "express-session";
import MongoStore from "connect-mongo";
import passport from "passport";
import morgan from "morgan";
import "./passport/local.js";
import "dotenv/config";
import indexRouter from "./routes/indexRoutes.js";
import cluster from "cluster";
import os from "os";

const MONGO_USER = process.env.MONGO_USER;
const MONGO_PASS = process.env.MONGO_PASS;
const DB_NAME = process.env.DB_NAME;


const PORT = process.env.PORT || 8080;
const MODO = process.env.MODO || "fork";
const nroCPUs = os.cpus().length;

if (cluster.isPrimary && MODO === "cluster") {
  console.log(
    `🧮 Primary PID ${process.pid} is running. On port ${PORT}. 🧑‍💻 MODO: ${MODO}.`
  );
  for (let i = 0; i < nroCPUs; i++) {
    cluster.fork();
  }
  cluster.on("exit", (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
  const app = express();
  app.use(morgan("dev"));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      secret: "secret",
      resave: true,
      saveUninitialized: true,
      store: MongoStore.create({
        mongoUrl: `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@cluster0.lcwk4.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`,
        ttl: 60 * 10,
      }),
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  app.set("views", "./src/views");
  app.set("view engine", "ejs");

  app.use("/", indexRouter);
  app.get("/", (req, res) => {
    res.redirect("/register");
  });

  const server = app.listen(PORT, () => {
    console.log(` 🚀 Server started at http://localhost:${PORT}
                  🧑‍🔧 Worker PID: ${process.pid}. 
                  🧑‍💻 MODO: ${MODO}.`);
  });

  server.on("error", (err) => console.log(err));
}
