class AuthPage {
  elements = {
    signupLoginLink: 'a[href="/login"]',
    signupName: '[data-qa="signup-name"]',
    signupEmail: '[data-qa="signup-email"]',
    signupButton: 'button[data-qa="signup-button"]',
    loginEmail: '[data-qa="login-email"]',
    loginPassword: '[data-qa="login-password"]',
    loginButton: 'button[data-qa="login-button"]',
    titleMr: 'input[value="Mr"]',
    titleMrs: 'input[value="Mrs"]',
    password: 'input[data-qa="password"]',
    days: '[data-qa="days"]',
    months: '[data-qa="months"]',
    years: '[data-qa="years"]',
    newsletter: 'input[name="newsletter"]',
    optin: 'input[name="optin"]',
    firstName: '[data-qa="first_name"]',
    lastName: '[data-qa="last_name"]',
    company: '[data-qa="company"]',
    address: '[data-qa="address"]',
    address2: '[data-qa="address2"]',
    country: '[data-qa="country"]',
    state: '[data-qa="state"]',
    city: '[data-qa="city"]',
    zipcode: '[data-qa="zipcode"]',
    mobileNumber: '[data-qa="mobile_number"]',
    createAccountButton: '[data-qa="create-account"]',
    accountCreatedMessage: 'b:contains("Account Created!")',
    continueButton: '[data-qa="continue-button"]',
    loggedInUser: 'a:contains("Logged in as")',
    logoutLink: 'a[href="/logout"]',
    loginErrorMessage: 'p:contains("Your email or password is incorrect!")',
    deleteAccountLink: 'a[href="/delete_account"]',
    accountDeletedMessage: 'b:contains("Account Deleted!")'
  };

  navigateToSignupLogin() {
    cy.get(this.elements.signupLoginLink).click();
    cy.url().should('include', '/login');
  }

  fillSignupForm(name, email) {
    cy.get(this.elements.signupName).type(name);
    cy.get(this.elements.signupEmail).type(email);
    cy.get(this.elements.signupButton).click();
  }

  fillRegistrationForm(userData) {
    if (userData.title === 'Mr') {
      cy.get(this.elements.titleMr).check();
    } else {
      cy.get(this.elements.titleMrs).check();
    }
    
    cy.get(this.elements.password).type(userData.password, { log: false });
    cy.get(this.elements.days).select(userData.day);
    cy.get(this.elements.months).select(userData.month);
    cy.get(this.elements.years).select(userData.year);
    cy.get(this.elements.newsletter).check();
    cy.get(this.elements.optin).check();
    cy.get(this.elements.firstName).type(userData.firstName);
    cy.get(this.elements.lastName).type(userData.lastName);
    cy.get(this.elements.company).type(userData.company);
    cy.get(this.elements.address).type(userData.address);
    cy.get(this.elements.address2).type(userData.address2);
    cy.get(this.elements.country).select(userData.country);
    cy.get(this.elements.state).type(userData.state);
    cy.get(this.elements.city).type(userData.city);
    cy.get(this.elements.zipcode).type(userData.zipcode);
    cy.get(this.elements.mobileNumber).type(userData.mobileNumber);
  }

  submitRegistration() {
    cy.get(this.elements.createAccountButton).click();
  }

  verifyAccountCreated() {
    cy.url().should('include', 'account_created');
    cy.get(this.elements.accountCreatedMessage).should('be.visible');
  }

  clickContinue() {
    cy.get(this.elements.continueButton).click();
  }

  login(email, password) {
    cy.get(this.elements.loginEmail).type(email);
    cy.get(this.elements.loginPassword).type(password, { log: false });
    cy.get(this.elements.loginButton).click();
  }

  verifyUserLoggedIn(username) {
    cy.get(this.elements.loggedInUser).should('contain', username);
  }

  verifyLoginError() {
    cy.get(this.elements.loginErrorMessage).should('be.visible');
  }

  logout() {
    cy.get('body').then(($body) => {
      if ($body.find(this.elements.logoutLink).length > 0) {
        cy.get(this.elements.logoutLink).should('be.visible').click();
        cy.url().should('include', '/login');
      }
    });
  }

  deleteAccount() {
    cy.get(this.elements.deleteAccountLink).click();
    cy.get(this.elements.accountDeletedMessage).should('be.visible');
    cy.get(this.elements.continueButton).click();
  }

  completeUserRegistration(userData) {
    this.navigateToSignupLogin();
    this.fillSignupForm(userData.name, userData.email);
    this.fillRegistrationForm(userData);
    this.submitRegistration();
    this.verifyAccountCreated();
    this.clickContinue();
    this.verifyUserLoggedIn(userData.name);
  }
}

module.exports = new AuthPage();