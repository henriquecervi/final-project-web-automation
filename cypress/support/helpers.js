const { faker } = require('@faker-js/faker');

function generateUserData() {
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const timestamp = Date.now();
  
  return {
    name: `${firstName} ${lastName}`,
    email: `qa-test-${timestamp}@test.com`,
    password: faker.internet.password({ length: 8, memorable: true }),
    title: faker.helpers.arrayElement(['Mr', 'Mrs']),
    firstName: firstName,
    lastName: lastName,
    company: faker.company.name(),
    address: faker.location.streetAddress(),
    address2: faker.location.secondaryAddress(),
    country: 'United States',
    state: faker.location.state(),
    city: faker.location.city(),
    zipcode: faker.location.zipCode(),
    mobileNumber: faker.phone.number('##########'),
    day: faker.number.int({ min: 1, max: 28 }).toString(),
    month: faker.date.month(),
    year: faker.number.int({ min: 1950, max: 2000 }).toString()
  };
}

function generateContactData() {
  return {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    subject: faker.lorem.sentence({ min: 3, max: 6 }),
    message: faker.lorem.paragraphs(2, '\n\n')
  };
}

function generateUniqueEmail() {
  const timestamp = Date.now();
  return `qa-test-${timestamp}@test.com`;
}

function generateProductSearchData() {
  const products = ['Blue Top', 'Men Tshirt', 'Dress', 'Jeans', 'Shirt'];
  return {
    searchTerm: faker.helpers.arrayElement(products),
    quantity: faker.number.int({ min: 1, max: 5 }).toString()
  };
}

function generatePaymentData() {
  return {
    nameOnCard: faker.person.fullName(),
    cardNumber: faker.finance.creditCardNumber('####-####-####-####'),
    cvc: faker.finance.creditCardCVV(),
    expirationMonth: faker.number.int({ min: 1, max: 12 }).toString().padStart(2, '0'),
    expirationYear: faker.number.int({ min: 2024, max: 2030 }).toString()
  };
}

function generateSubscriptionData() {
  return {
    email: faker.internet.email()
  };
}

module.exports = {
  generateUserData,
  generateContactData,
  generateUniqueEmail,
  generateProductSearchData,
  generatePaymentData,
  generateSubscriptionData
};
