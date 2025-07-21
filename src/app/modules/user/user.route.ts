/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response, Router } from "express";
import { UserControllers } from "./user.controller";
import { createUserZotSchema } from "./user.validation";
import { validationRequest } from "../../middleware/validationRequest";



const router = Router();


router.post("/register", validationRequest(createUserZotSchema) , UserControllers.createUser);
router.get("/all-users", UserControllers.getAllUsers);

export const UserRoutes = router 