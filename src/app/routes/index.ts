import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";


export const router = Router();

const moduleRoutes = [
    {
        path : "/user",
        router : UserRoutes //user.route.ts a jabe
    }
]



moduleRoutes.forEach((route) => {
    router.use(route.path, route.router)
})





// router.use("/user",UserRoutes)
// router.use("/tour",UserRoutes)