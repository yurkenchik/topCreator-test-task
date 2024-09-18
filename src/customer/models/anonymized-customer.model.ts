import { ObjectId } from "mongodb";
import { databaseDataSource } from "../../database/database";

export class AnonymizedCustomer {
  constructor(
    public _id: ObjectId,
    public firstname: string,
    public lastname: string,
    public email: string,
    public address: {
      line1: string;
      line2: string;
      postcode: string;
      city: string;
      state: string;
      country: string;
    },
    public createdAt: string
  ) {}
}

export const anonymizedCustomersCollection = () =>
  databaseDataSource().collection<AnonymizedCustomer>("anonymized_customer");
