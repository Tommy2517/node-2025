import dotenv from "dotenv";

dotenv.config();
interface IConfig {
  PORT: string;
  MONGO_URI: string;

  ACCESS_SECRET: string;
  REFRESH_SECRET: string;
  ACCESS_LIFETIME: any;
  REFRESH_LIFETIME: any;

  ACTIVATE_SECRET: string;
  RECOVERY_SECRET: string;
  ACTIVATE_LIFETIME: any;
  RECOVERY_LIFETIME: any;

  USER_EMAIL: string;
  USER_PASS: string;

  FRONTEND_URL: string;
}

export const config: IConfig = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,

  USER_EMAIL: process.env.USER_EMAIL,
  USER_PASS: process.env.USER_PASS,

  ACCESS_SECRET: process.env.ACCESS_SECRET,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
  ACCESS_LIFETIME: process.env.ACCESS_LIFETIME,
  REFRESH_LIFETIME: process.env.REFRESH_LIFETIME,

  ACTIVATE_SECRET: process.env.ACTIVATE_SECRET,
  RECOVERY_SECRET: process.env.RECOVERY_SECRET,
  ACTIVATE_LIFETIME: process.env.ACTIVATE_LIFETIME,
  RECOVERY_LIFETIME: process.env.RECOVERY_LIFETIME,

  FRONTEND_URL: process.env.FRONTEND_URL,
};
