import { faker } from "@faker-js/faker";

export const anonymizeString = (str: string): string => {
  return faker.string.alphanumeric(8);
};
