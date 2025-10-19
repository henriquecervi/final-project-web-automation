class SubscriptionPage {
  elements = {
    footer: 'footer',
    subscriptionSection: '.single-widget',
    subscriptionTitle: 'h2:contains("Subscription")',
    subscriptionEmail: 'input[type="email"]#susbscribe_email',
    subscriptionButton: 'button#subscribe',
    successAlert: '.alert-success',
    successMessage: 'div:contains("You have been successfully subscribed!")',
    cartSubscriptionEmail: 'input[type="email"]#susbscribe_email',
    cartSubscriptionButton: 'button#subscribe'
  };

  scrollToSubscription() {
    cy.get(this.elements.footer).scrollIntoView();
    cy.get(this.elements.subscriptionTitle).should('be.visible');
  }

  verifySubscriptionSection() {
    cy.get(this.elements.subscriptionTitle).should('be.visible');
    cy.get(this.elements.subscriptionEmail).should('be.visible');
    cy.get(this.elements.subscriptionButton).should('be.visible');
  }

  enterSubscriptionEmail(email) {
    cy.get(this.elements.subscriptionEmail).type(email);
  }

  clickSubscribe() {
    cy.get(this.elements.subscriptionButton).click();
  }

  verifySubscriptionSuccess() {
    cy.get(this.elements.successAlert)
      .should('be.visible')
      .and('contain', 'You have been successfully subscribed!');
  }

  subscribeFromHomePage(email) {
    this.scrollToSubscription();
    this.verifySubscriptionSection();
    this.enterSubscriptionEmail(email);
    this.clickSubscribe();
    this.verifySubscriptionSuccess();
  }

  subscribeFromCartPage(email) {
    cy.url().should('include', '/view_cart');
    this.scrollToSubscription();
    this.verifySubscriptionSection();
    cy.get(this.elements.cartSubscriptionEmail).type(email);
    cy.get(this.elements.cartSubscriptionButton).click();
    this.verifySubscriptionSuccess();
  }

  verifyAlreadySubscribed() {
    cy.get('.alert-danger')
      .should('be.visible')
      .and('contain', 'already subscribed');
  }

  clearEmailField() {
    cy.get(this.elements.subscriptionEmail).clear();
  }

  verifyEmptyEmailField() {
    cy.get(this.elements.subscriptionEmail).should('have.value', '');
  }

  testInvalidEmailSubscription(invalidEmail) {
    this.scrollToSubscription();
    this.enterSubscriptionEmail(invalidEmail);
    this.clickSubscribe();
    
    cy.get(this.elements.subscriptionEmail).then(($input) => {
      expect($input[0].validationMessage).to.not.be.empty;
    });
  }
}

module.exports = new SubscriptionPage();