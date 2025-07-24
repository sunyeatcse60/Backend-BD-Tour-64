// import { Server } from "http";
// import mongoose from "mongoose";
// import app from "./app";
// import { envVars } from "./app/config/env";


// // const port = 5000;
// let server: Server;



// const startServer = async () => {

//     try {
//         // console.log(envVars.NODE_ENV);
//         //  await mongoose.connect("mongodb+srv://MongoDB:mongodb@cluster0.yfxr21u.mongodb.net/bdTour?retryWrites=true&w=majority&appName=Cluster0")
//         await mongoose.connect(envVars.DB_URL);
//         console.log("Connected to Database!!");


//          server = app.listen(envVars.PORT, () => {
//             console.log(`Connetion successfully to the port ${envVars.PORT}`);
//          })  
//     } 
    
//     catch (error) {
//         console.log(error);
        
//     }

// };

// startServer();



// // unhendel rejection error

// process.on("unhandledRejection", (err) => {
//     console.log("Unhandel rejection detected....server shut down!!!",err);

//     if(server){
//         server.close( () => {
//             process.exit(1);
//         });
//     }
//     process.exit(1);
// })
// // Promise.reject( new Error("i forgot to catch this promise"));





// // uncaught exception error

// process.on("uncaughtException", (err) => {
//     console.log("Uncaught exception detected....server shut down!!!",err);

//     if(server){
//         server.close( () => {
//             process.exit(1);
//         });
//     }
//     process.exit(1);
// })

// // throw new Error("i forgot to the handel local error");




// //   signal termination error handel

// process.on("SIGTERM", () => {
//     console.log("Sigterm signal detected....server shut down!!");

//     if(server){
//         server.close(()=>{
//             process.exit(1);
//         })
//     }
//     process.exit(1);
// })






import { Server } from "http";
import mongoose from "mongoose";
import app from "./app";
import { envVars } from "./app/config/env";
import { seedSuperAdmin } from "./app/utils/seedSuperAdmin";


let server: Server;

process.on("uncaughtException", (err) => {
  console.error("Uncaught exception detected, shutting down...", err);
  process.exit(1);
});

const startServer = async () => {
  try {
    await mongoose.connect(envVars.DB_URL);
    console.log("Connected to Database!!");

    server = app.listen(envVars.PORT, () => {
      console.log(`Server running on port ${envVars.PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

// startServer();
// seedSuperAdmin();

//  ife function 
(async () => {
  await startServer()
  await seedSuperAdmin()
})()


process.on("unhandledRejection", (err) => {
  console.error("Unhandled rejection detected, shutting down...", err);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  } 
});