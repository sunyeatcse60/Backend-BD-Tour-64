// import httpStatus  from 'http-status-codes';
import express, { Request, Response } from "express";
import cors from "cors"
import { router } from "./app/routes";
import { globalErrorHandelar } from "./app/middleware/globalerrorhandelar";
import { routeNotFound } from './app/middleware/RouteNotFound';
// import { envVars } from "./app/config/env";


const app = express();



app.use(express.json());
app.use(cors());
// app.use("/api/v1/user", UserRoutes);
app.use("/api/v1", router); //index.ts jabe




app.get("/", (req : Request, res : Response) => {
    res.status(200).json({
        message : "welcome to the home page"
    })
})



// global error handelar
// app.use((error: any, req: Request, res : Response, next : NextFunction) => {
//     res.status(500).json({
//         success : false,
//         message : `Something went rong ${error.message} from global error!!`,
//         error,
//         stack : envVars.NODE_ENV === "development" ? error.stack : null
//     })
// })

app.use(globalErrorHandelar); // from middleware folder




// not found route handel
// app.use((req : Request, res : Response) => {
//     res.status(httpStatus.NOT_FOUND).json({
//         success : false,
//         message : "Route not found"
//     })
// })

app.use(routeNotFound)




export default app;