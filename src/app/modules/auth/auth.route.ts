
// import { Router } from "express";
// import { AuthControllers } from "./auth.controller";

// const route = Router();

// route.post("/login", AuthControllers.credentialsLogin);

// export const AuthRoutes = route;




import { NextFunction, Request, Response, Router } from "express";
import { AuthControllers } from "./auth.controller";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "../user/user.interface";
import passport from "passport";

const route = Router();

route.post("/login", AuthControllers.credentialsLogin);
route.post("/refresh-token", AuthControllers.getNewAccessToken);
route.post("/logout", AuthControllers.logOut);
route.post("/reset-password", checkAuth(...Object.values(Role)) ,AuthControllers.resetPassword);



// /booking => /login -> successful google login -> /booking frontend
// /login -> successful login -> /frontend
route.get("/google", async (req: Request, res : Response, next : NextFunction) => {
    const redirect = req.query.redirect || "/" ;
    passport.authenticate("google",{scope : ["profile", "email"],state : redirect as string})(req,res,next)
});


// api/v1/auth/google/callback?state=/booking
route.get("/google/callback", passport.authenticate("google", {failureRedirect : "/login"}), 
AuthControllers.googleCallbackController);



export const AuthRoutes = route;
