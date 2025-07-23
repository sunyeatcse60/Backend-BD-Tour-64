// import dotenv from "dotenv";

// dotenv.config();

// interface EnvConfig {
//   PORT: string;
//   DB_URL: string;
//   NODE_ENV: "development" | "production" | "test";
//   JWT_ACCESS_SECREAT: string;
//   JWT_ACCESS_EXPIRE: string;
//   BCRYPT_SALT_ROUND: string;
// }

// const loadEnvVariables = (): EnvConfig => {
//   const requiredEnvVariable: string[] = [
//     "PORT",
//     "DB_URL",
//     "NODE_ENV",
//     "JWT_ACCESS_SECREAT",
//     "JWT_ACCESS_EXPIRE",
//     "BCRYPT_SALT_ROUND",
//   ];

//   requiredEnvVariable.forEach((key) => {
//     if (!process.env[key]) {
//       throw new Error(`Missing required environment variable: ${key}`);
//     }
//   });

//   const nodeEnv = process.env.NODE_ENV as "development" | "production" | "test";

//   return {
//     PORT: process.env.PORT as string,
//     DB_URL: process.env.DB_URL as string,
//     NODE_ENV: nodeEnv,
//     JWT_ACCESS_SECREAT: process.env.JWT_ACCESS_SECREAT as string,
//     JWT_ACCESS_EXPIRE: process.env.JWT_ACCESS_EXPIRE as string,
//     BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
//   };
// };

// export const envVars = loadEnvVariables();





import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
  PORT: string;
  DB_URL: string;
  NODE_ENV: "development" | "production" | "test";
  JWT_ACCESS_SECRET: string;
  JWT_ACCESS_EXPIRE: string;
  BCRYPT_SALT_ROUND: string;
}

const loadEnvVariables = (): EnvConfig => {
  const requiredEnvVariable: string[] = [
    "PORT",
    "DB_URL",
    "NODE_ENV",
    "JWT_ACCESS_SECRET",
    "JWT_ACCESS_EXPIRE",
    "BCRYPT_SALT_ROUND",
  ];

  requiredEnvVariable.forEach((key) => {
    if (!process.env[key]) {
      throw new Error(`Missing required environment variable: ${key}`);
    }
  });

  const nodeEnv = process.env.NODE_ENV as "development" | "production" | "test";

  return {
    PORT: process.env.PORT as string,
    DB_URL: process.env.DB_URL as string,
    NODE_ENV: nodeEnv,
    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET as string,
    JWT_ACCESS_EXPIRE: process.env.JWT_ACCESS_EXPIRE as string,
    BCRYPT_SALT_ROUND: process.env.BCRYPT_SALT_ROUND as string,
  };
};

export const envVars = loadEnvVariables();
