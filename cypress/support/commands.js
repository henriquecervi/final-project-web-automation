Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('.logo img').should('be.visible');
  cy.wait(1000);
});

Cypress.Commands.overwrite('visit', (originalFn, url, options) => {
  return originalFn(url, options);
});