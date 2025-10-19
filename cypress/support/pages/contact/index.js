class ContactPage {
  elements = {
    pageTitle: 'h2:contains("Get In Touch")',
    nameField: 'input[data-qa="name"]',
    emailField: 'input[data-qa="email"]',
    subjectField: 'input[data-qa="subject"]',
    messageField: 'textarea[data-qa="message"]',
    fileUpload: 'input[name="upload_file"]',
    submitButton: 'input[data-qa="submit-button"]',
    successMessage: '.status.alert.alert-success',
    homeButton: '.btn.btn-success'
  };

  verifyContactUsPage() {
    cy.get(this.elements.pageTitle).should('be.visible');
    cy.url().should('include', '/contact_us');
  }

  fillContactForm(contactData) {
    cy.get(this.elements.nameField).type(contactData.name);
    cy.get(this.elements.emailField).type(contactData.email);
    cy.get(this.elements.subjectField).type(contactData.subject);
    cy.get(this.elements.messageField).type(contactData.message);
  }

  uploadFile(filePath = 'example.json') {
    cy.get(this.elements.fileUpload).selectFile(`cypress/fixtures/${filePath}`);
  }

  submitForm() {
    cy.get(this.elements.submitButton).click();
  }

  verifySuccessMessage() {
    cy.get(this.elements.successMessage)
      .should('be.visible')
      .and('contain', 'Success! Your details have been submitted successfully.');
  }

  clickHomeButton() {
    cy.get(this.elements.homeButton).click();
    cy.url().should('eq', Cypress.config().baseUrl + '/');
  }

  completeContactFlow(contactData, filePath = 'example.json') {
    this.verifyContactUsPage();
    this.fillContactForm(contactData);
    this.uploadFile(filePath);
    this.submitForm();
    
    cy.on('window:alert', (alertText) => {
      expect(alertText).to.equal('Press OK to proceed!');
    });
    
    this.verifySuccessMessage();
    this.clickHomeButton();
  }
}

module.exports = new ContactPage();