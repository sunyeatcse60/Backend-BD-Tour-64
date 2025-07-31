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
  } 
  catch (error) {
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