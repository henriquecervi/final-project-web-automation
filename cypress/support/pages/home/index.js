class HomePage {
  elements = {
    homeLink: 'a[href="/"]',
    productsLink: 'a[href="/products"]',
    cartLink: 'a[href="/view_cart"]',
    signupLoginLink: 'a[href="/login"]',
    contactUsLink: 'a[href="/contact_us"]',
    logo: '.logo img',
    userInfo: 'a:contains("Logged in as")',
    logoutLink: 'a[href="/logout"]',
    footer: 'footer',
    subscriptionText: 'h2:contains("Subscription")',
    subscriptionEmail: 'input[type="email"]#susbscribe_email',
    subscriptionButton: 'button#subscribe',
    subscriptionSuccess: '.alert-success',
    carousel: '.carousel-inner',
    featuresItems: '.features_items'
  };

  visit() {
    cy.visit('/');
    cy.waitForPageLoad();
  }

  navigateToLogin() {
    cy.get(this.elements.signupLoginLink).click();
    cy.url().should('include', '/login');
  }

  navigateToProducts() {
    cy.get(this.elements.productsLink).click();
    cy.url().should('include', '/products');
  }

  navigateToCart() {
    cy.get(this.elements.cartLink).click();
    cy.url().should('include', '/view_cart');
  }

  navigateToContactUs() {
    cy.get(this.elements.contactUsLink).click();
    cy.url().should('include', '/contact_us');
  }

  verifyUserLoggedIn(username) {
    cy.get(this.elements.userInfo).should('contain', username);
  }

  verifyHomePageLoaded() {
    cy.get(this.elements.logo).should('be.visible');
    cy.get(this.elements.carousel).should('be.visible');
    cy.get(this.elements.featuresItems).should('be.visible');
  }

  scrollToSubscription() {
    cy.get(this.elements.footer).scrollIntoView();
    cy.get(this.elements.subscriptionText).should('be.visible');
  }

  subscribeToNewsletter(email) {
    this.scrollToSubscription();
    cy.get(this.elements.subscriptionEmail).type(email);
    cy.get(this.elements.subscriptionButton).click();
  }

  verifySubscriptionSuccess() {
    cy.get(this.elements.subscriptionSuccess)
      .should('be.visible')
      .and('contain', 'You have been successfully subscribed!');
  }

  logoutIfLoggedIn() {
    cy.get('body').then(($body) => {
      if ($body.find(this.elements.logoutLink).length > 0) {
        cy.get(this.elements.logoutLink).click();
      }
    });
  }

  navigateToHomeSafely() {
    cy.get(this.elements.homeLink).click();
    this.verifyHomePageLoaded();
  }
}

module.exports = new HomePage();