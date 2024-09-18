import { MongoClient } from "mongodb";
import { databaseConfig } from "./database-config";

let client: MongoClient;

export const connectToDB = async () => {
  client = new MongoClient(databaseConfig.dbUri);
  await client.connect();
};

export const databaseDataSource = () => client.db();
