import dotenv from "dotenv";

dotenv.config();
interface IConfig {
  PORT: string;
  MONGO_URI: string;
  ACCESS_SECRET: string;
  REFRESH_SECRET: string;
  ACCESS_LIFETIME: any;
  REFRESH_LIFETIME: any;
}

export const config: IConfig = {
  PORT: process.env.PORT,
  MONGO_URI: process.env.MONGO_URI,
  ACCESS_SECRET: process.env.ACCESS_SECRET,
  REFRESH_SECRET: process.env.REFRESH_SECRET,
  ACCESS_LIFETIME: process.env.ACCESS_LIFETIME,
  REFRESH_LIFETIME: process.env.REFRESH_LIFETIME,
};
