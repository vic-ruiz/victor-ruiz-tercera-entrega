import { Router } from "express";

//import productsRouter from "./productsRoutes";
//import cartRouter from "./cartRoutes";
import registerRouter from "./registerRoutes.js";
import loginRouter from "./loginRoutes.js";
import mainRouter from "./mainRoutes.js";
import productsRouter from "./productsRoutes.js";
import logoutRouter from "./logoutRouter.js";
import mailRouter from "./mailRoutes.js";


const router = Router();

router.use('/register', registerRouter);
router.use('/login', loginRouter);
router.use('/index', mainRouter );
router.use ('/products', productsRouter)
router.use('/logout', logoutRouter )
router.use('/mailConfirmation',mailRouter )

export default router;
