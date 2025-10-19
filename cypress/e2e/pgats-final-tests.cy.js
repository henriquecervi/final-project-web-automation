const { 
  generateUserData, 
  generateContactData, 
  generateUniqueEmail,
  generateProductSearchData,
  generatePaymentData,
  generateSubscriptionData
} = require('../support/helpers');

const authPage = require('../support/pages/auth');
const homePage = require('../support/pages/home');
const contactPage = require('../support/pages/contact');
const productsPage = require('../support/pages/products');
const cartPage = require('../support/pages/cart');
const subscriptionPage = require('../support/pages/subscription');
const testFlows = require('../support/pages/testflows');

describe('PGATS - Final Project - Automation Exercise', () => {
  let testData = {};

  beforeEach(() => {
    testFlows.setupTest();
  });

  afterEach(() => {
    if (testData.userData) {
      testFlows.teardownTest(testData.userData);
    }
  });

  it('TC1 - Register User', () => {
    testData.userData = generateUserData();
    
    testFlows.completeRegistration(testData.userData);
    authPage.verifyUserLoggedIn(testData.userData.name);
    authPage.deleteAccount();
  });

  it('TC2 - Login User with correct email and password', () => {
    testData.userData = generateUserData();
    
    testFlows.completeRegistration(testData.userData);
    authPage.logout();
    testFlows.performLogin(
      testData.userData.email, 
      testData.userData.password, 
      testData.userData.name
    );
    authPage.verifyUserLoggedIn(testData.userData.name);
    authPage.deleteAccount();
  });

  it('TC3 - Login User with incorrect email and password', () => {
    const incorrectEmail = 'incorrect@test.com';
    const incorrectPassword = 'wrongpassword';
    
    testFlows.testIncorrectLogin(incorrectEmail, incorrectPassword);
  });

  it('TC4 - Logout User', () => {
    testData.userData = generateUserData();
    
    testFlows.completeRegistration(testData.userData);
    authPage.verifyUserLoggedIn(testData.userData.name);
    testFlows.performLogout();
    cy.url().should('include', '/login');
  });

  it('TC5 - Register User with existing email', () => {
    testData.userData = generateUserData();
    const duplicateUserData = generateUserData();
    duplicateUserData.email = testData.userData.email;
    
    testFlows.completeRegistration(testData.userData);
    authPage.logout();
    homePage.navigateToLogin();
    authPage.fillSignupForm(duplicateUserData.name, duplicateUserData.email);
    cy.contains('Email Address already exist!').should('be.visible');
    authPage.navigateToSignupLogin();
    authPage.login(testData.userData.email, testData.userData.password);
    authPage.deleteAccount();
  });

  it('TC6 - Contact Us Form', () => {
    const contactData = generateContactData();
    
    testFlows.completeContactFlow(contactData);
  });

  it('TC8 - Verify All Products and product detail page', () => {
    testFlows.verifyProductsFlow();
  });

  it('TC9 - Search Product', () => {
    const searchData = generateProductSearchData();
    
    testFlows.searchProductFlow(searchData.searchTerm);
  });

  it('TC10 - Verify Subscription in home page', () => {
    const subscriptionData = generateSubscriptionData();
    
    testFlows.subscriptionHomeFlow(subscriptionData.email);
  });

  it('TC15 - Place Order: Register while Checkout', () => {
    testData.userData = generateUserData();
    const paymentData = generatePaymentData();
    
    testFlows.completeOrderFlow(testData.userData, paymentData);
  });
});