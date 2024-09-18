import dotenv from "dotenv";
dotenv.config();

export const databaseConfig = {
  dbUri: String(process.env.DB_URI),
};
