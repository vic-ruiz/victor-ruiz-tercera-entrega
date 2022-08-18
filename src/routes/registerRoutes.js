import { Router } from "express";
import passport from "passport";

const registerRouter = Router();

registerRouter.get("/", (req, res) => {
  res.render("register");
});

registerRouter.post(
  "/",
  passport.authenticate("register", {
    failureRedirect: "/register/registerFailure",
    successRedirect: "/index",
  })
);

registerRouter.get("/registerFailure", (req, res) => {
  res.render("registerFailure");
});

export default registerRouter;
