import { Router } from "express";
import passport from "passport";

const loginRouter = Router();

loginRouter.get("/", (req, res) => {
    res.render("login");
});

loginRouter.post("/",passport.authenticate('login',{
    failureRedirect:'/login/loginFailure',
    successRedirect:'/index'
})) 

loginRouter.get("/loginFailure", (req, res) => {
    res.render("loginFailure");
});

export default loginRouter;