import { faker } from '@faker-js/faker';

export function generateBillPayData(logger = null) {
  const data = {
    payeeName: faker.company.name(),
    address: faker.location.streetAddress(),
    city: faker.location.city(),
    state: faker.location.state(),
    zipCode: faker.location.zipCode(),
    phone: faker.phone.number().toString(),
    accountNumber: faker.string.numeric(5),
    amount: faker.number.int({ min: 10, max: 500 }),
  };

  if (logger) {
    logger.debug(`Generated bill pay data: ${JSON.stringify(data)}`);
  }
  return data;
}