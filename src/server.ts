import express from "express";
import { connectToDB } from "./database/database";
import { CustomerService } from "./customer/customer.service";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const PORT = 9000;

app.use(express.json());

async function launchServer() {
  try {
    await connectToDB();

    const customerService = new CustomerService();

    await customerService.watchCustomersChange();
    await customerService.customersIntervalGenerating();

    app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
}

launchServer();
