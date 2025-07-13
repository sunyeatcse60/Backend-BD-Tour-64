import dotenv from "dotenv";

dotenv.config();

interface EnvConfig {
    PORT: string;
    DB_URL: string;
    NODE_ENV: "development" | "production" | "test"; 
}

const loadEnvVariables = (): EnvConfig => {
    const requiredEnvVariable: string[] = ["PORT", "DB_URL", "NODE_ENV"];

    requiredEnvVariable.forEach(key => {
        if (!process.env[key]) {
            throw new Error(`Missing required environment variable: ${key}`);
        }
    });

    const nodeEnv = process.env.NODE_ENV as "development" | "production" | "test";

    return {
        PORT: process.env.PORT as string,
        DB_URL: process.env.DB_URL as string,
        NODE_ENV: nodeEnv
    };
};

export const envVars = loadEnvVariables();
