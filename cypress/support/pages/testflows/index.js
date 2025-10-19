const authPage = require('../auth');
const homePage = require('../home');
const productsPage = require('../products');
const cartPage = require('../cart');
const contactPage = require('../contact');
const subscriptionPage = require('../subscription');

class TestFlowsPage {
  completeRegistration(userData) {
    homePage.visit();
    authPage.completeUserRegistration(userData);
    return userData;
  }

  performLogin(email, password, name) {
    homePage.visit();
    authPage.navigateToSignupLogin();
    authPage.login(email, password);
    authPage.verifyUserLoggedIn(name);
  }

  testIncorrectLogin(email, password) {
    homePage.visit();
    authPage.navigateToSignupLogin();
    authPage.login(email, password);
    authPage.verifyLoginError();
  }

  performLogout() {
    authPage.logout();
  }

  completeContactFlow(contactData, filePath = 'example.json') {
    homePage.visit();
    homePage.navigateToContactUs();
    contactPage.completeContactFlow(contactData, filePath);
  }

  verifyProductsFlow() {
    homePage.visit();
    homePage.navigateToProducts();
    productsPage.verifyAllProductsPage();
    productsPage.verifyProductsList();
    productsPage.viewFirstProduct();
    productsPage.verifyProductDetails();
  }

  searchProductFlow(searchTerm) {
    homePage.visit();
    homePage.navigateToProducts();
    productsPage.completeProductSearch(searchTerm);
  }

  subscriptionHomeFlow(email) {
    homePage.visit();
    subscriptionPage.subscribeFromHomePage(email);
  }

  completeOrderFlow(userData, paymentData) {
    homePage.visit();
    homePage.verifyHomePageLoaded();
    
    homePage.navigateToLogin();
    authPage.completeUserRegistration(userData);
    
    homePage.navigateToProducts();
    productsPage.verifyAllProductsPage();
    productsPage.addMultipleProductsToCart([0, 1]);
    
    homePage.navigateToCart();
    cartPage.verifyCartPage();
    cartPage.proceedToCheckout();
    
    cartPage.verifyAddressDetails();
    cartPage.addOrderComment('Testing PGATS Final Exercise');
    cartPage.placeOrder();
    cartPage.fillPaymentDetails(paymentData);
    cartPage.confirmPayment();
    cartPage.verifyOrderConfirmation();
    
    authPage.deleteAccount();
  }

  cleanupTestAccount(userData) {
    cy.visit('/');
    
    cy.get('body').then(($body) => {
      if ($body.find('a:contains("Logged in as")').length > 0) {
        authPage.logout();
      }
    });

    cy.get('body').then(($body) => {
      if ($body.find('a[href="/login"]').length > 0) {
        authPage.navigateToSignupLogin();
        authPage.login(userData.email, userData.password);
        
        cy.get('body').then(($bodyAfterLogin) => {
          if ($bodyAfterLogin.find('a:contains("Logged in as")').length > 0) {
            authPage.deleteAccount();
          }
        });
      }
    });
  }

  navigateToHomeSafely() {
    homePage.visit();
    homePage.verifyHomePageLoaded();
  }

  ensureLoggedOut() {
    cy.get('body').then(($body) => {
      if ($body.find('a[href="/logout"]').length > 0) {
        authPage.logout();
      }
    });
  }

  setupTest() {
    this.navigateToHomeSafely();
    this.ensureLoggedOut();
  }

  teardownTest(userData = null) {
    if (userData) {
      this.cleanupTestAccount(userData);
    }
    this.ensureLoggedOut();
  }
}

module.exports = new TestFlowsPage();