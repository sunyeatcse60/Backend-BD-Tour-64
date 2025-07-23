// import { Router } from "express";
// import { UserRoutes } from "../modules/user/user.route";
// import { AuthRoutes } from "../modules/auth/auth.route";


// export const router = Router();

// const moduleRoutes = [
//     {
//         path : "/user",
//         router : UserRoutes //user.route.ts a jabe
//     },
//     {
//         path : "/auth",
//         router : AuthRoutes
//     }
// ]



// moduleRoutes.forEach((route) => {
//     router.use(route.path, route.router)
// })





// // router.use("/user",UserRoutes)
// // router.use("/tour",UserRoutes)





import { Router } from "express";
import { UserRoutes } from "../modules/user/user.route";
import { AuthRoutes } from "../modules/auth/auth.route";

export const router = Router();

const moduleRoutes = [
  {
    path: "/user",
    router: UserRoutes,
  },
  {
    path: "/auth",
    router: AuthRoutes,
  },
];

moduleRoutes.forEach(({ path, router: routeRouter }) => {
  router.use(path, routeRouter);
});

// Optional health check
router.get("/", (req, res) => {
  res.send("API is running");
});
