import { Customer, customersCollection } from "./models/customer.model";
import {
  AnonymizedCustomer,
  anonymizedCustomersCollection,
} from "./models/anonymized-customer.model";
import { anonymizeString } from "../utils/anonymize-string";
import { faker } from "@faker-js/faker";
import { ObjectId, UpdateFilter } from "mongodb";

export class CustomerService {

  async watchCustomersChange(): Promise<void> {
    const collectionChangeStream = customersCollection().watch([], {
      fullDocument: "updateLookup",
    });

    collectionChangeStream.on("change", async (change) => {
      if (
        change.operationType === "insert" ||
        change.operationType === "update"
      ) {
        const customer = change.fullDocument;

        if (customer) {
          const anonymizedCustomer: UpdateFilter<AnonymizedCustomer> =
            this.anonymizeCustomers(customer);

          await anonymizedCustomersCollection().updateOne(
            { _id: customer._id },
            { $set: anonymizedCustomer },
            { upsert: true }
          );
        }
      }
    });
  }

  private anonymizeCustomers(customer: Customer): Customer {
    const anonymizedCustomer: Customer = {
      ...customer,
      firstname: anonymizeString(customer.firstname),
      lastname: anonymizeString(customer.lastname),
      email:
        anonymizeString(customer.email.split("@")[0]) +
        "@" +
        customer.email.split("@")[1],
      address: {
        ...customer.address,
        line1: anonymizeString(customer.address.line1),
        line2: anonymizeString(customer.address.line2),
        postcode: anonymizeString(customer.address.postcode),
      },
    };

    return anonymizedCustomer;
  }

  async customersIntervalGenerating(): Promise<void> {
    setInterval(async () => {
      const customersStack = Array.from(
        { length: faker.number.int({ min: 1, max: 10 }) },
        () => ({})
      );

      const customers = customersStack.map(() => {
        const customer = new AnonymizedCustomer(
          new ObjectId(),
          faker.person.firstName(),
          faker.person.lastName(),
          faker.internet.email(),
          {
            line1: faker.location.streetAddress(),
            line2: faker.location.secondaryAddress(),
            postcode: faker.location.zipCode(),
            city: faker.location.city(),
            state: faker.location.state(),
            country: faker.location.countryCode(),
          },
          new Date().toISOString()
        );

        return { ...customer };
      });

      await customersCollection().insertMany(customers);
    }, 200);
  }
}
