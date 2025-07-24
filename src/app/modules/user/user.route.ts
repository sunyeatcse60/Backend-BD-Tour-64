// import { JwtPayload } from 'jsonwebtoken';
// import { NextFunction, Request, Response, Router } from "express";
// import { UserControllers } from "./user.controller";
// import { createUserZotSchema } from "./user.validation";
// import { validationRequest } from "../../middleware/validationRequest";
// import { verifyToken } from '../../utils/jwt';
// import { envVars } from '../../config/env';



// const router = Router();

// const checkAuth = (...authRoles : string[]) => async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const accessToken = req.headers.authorization;

//         // if (!accessToken) {
//         //     throw new AppError(403, "No token recieved");
            
//         // }

//         // const varifiedToken = jwt.verify(accessToken as string, "secret");
//         const varifiedToken = verifyToken(accessToken as string, envVars.JWT_ACCESS_SECREAT) as JwtPayload


//         // if (!varifiedToken) {
//         //     throw new AppError(403, "you are not authorised");
//         // }


//         // if ((varifiedToken as JwtPayload).role !== Role.Admin) {

//         if (!authRoles.includes(varifiedToken.Role)) {
//             // throw new Error(403,"You are not permited to view this route");
//             alert("You are not permited to view this route");

//         }
//         console.log(varifiedToken);
//         next()

//     } catch (error) {
//         next(error)

//     }
// }



// router.post("/register", validationRequest(createUserZotSchema), UserControllers.createUser);

// // token varification 

// router.get("/all-users", checkAuth("Admin","Super_Admin") ,UserControllers.getAllUsers);



// export const UserRoutes = router;






import { Router } from "express";
import { UserControllers } from "./user.controller";
import { createUserZotSchema, updateUserZotSchema } from "./user.validation";
import { validationRequest } from "../../middleware/validationRequest";
import { checkAuth } from "../../middleware/checkAuth";
import { Role } from "./user.interface";


const router = Router();


router.post("/register", validationRequest(createUserZotSchema), UserControllers.createUser);

router.get("/all-users", checkAuth("User","Admin", "Super_Admin"), UserControllers.getAllUsers);

// update api - /api/v1/user/:id
router.patch("/:id", validationRequest(updateUserZotSchema) ,checkAuth(...Object.values(Role)), UserControllers.updateUser);

export const UserRoutes = router;
