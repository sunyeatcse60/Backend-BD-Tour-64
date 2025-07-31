import express, { Request, Response } from "express";
import cors from "cors";
import { router } from "./app/routes";
import routeNotFound from "./app/middleware/RouteNotFound";
import { globalErrorHandler } from "./app/middleware/globalerrorhandelar";
import cookieParser from "cookie-parser";
import passport from "passport";
import expressSession from "express-session"
import "./app/config/passport"



const app = express();



app.use(expressSession({
  secret : "Your secret",
  resave : false,
  saveUninitialized : false
}));

app.use(passport.initialize());
app.use(passport.session())



app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use("/api/v1", router);

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Welcome to the BD tour management system home page",
  });
});

app.use(routeNotFound);

app.use(globalErrorHandler);

export default app;
