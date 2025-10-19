class CartPage {
  elements = {
    cartTable: '#cart_info_table',
    cartItems: '#cart_info_table tbody tr',
    productName: '.cart_description h4 a',
    productPrice: '.cart_price p',
    productQuantity: '.cart_quantity input',
    productTotal: '.cart_total_price p',
    proceedToCheckoutButton: '.btn.btn-default.check_out',
    registerLoginButton: 'a[href="/login"] u',
    deliveryAddress: '#address_delivery',
    billingAddress: '#address_invoice',
    commentTextarea: 'textarea[name="message"]',
    placeOrderButton: 'a[href="/payment"]',
    nameOnCard: 'input[data-qa="name-on-card"]',
    cardNumber: 'input[data-qa="card-number"]',
    cvc: 'input[data-qa="cvc"]',
    expirationMonth: 'input[data-qa="expiry-month"]',
    expirationYear: 'input[data-qa="expiry-year"]',
    payAndConfirmButton: 'button[data-qa="pay-button"]',
    orderConfirmation: 'h2[data-qa="order-placed"]',
    successMessage: 'p:contains("Congratulations! Your order has been confirmed!")',
    downloadInvoiceButton: 'a[href="/download_invoice"]',
    continueButton: '[data-qa="continue-button"]',
    emptyCartMessage: 'p:contains("Cart is empty!")'
  };

  verifyCartPage() {
    cy.url().should('include', '/view_cart');
    cy.get(this.elements.cartTable).should('be.visible');
  }

  verifyCartHasProducts() {
    cy.get(this.elements.cartTable).should('be.visible');
    cy.get(this.elements.cartItems).should('have.length.greaterThan', 0);
  }

  verifyProductInCart(productIndex = 0) {
    cy.get(this.elements.cartItems).eq(productIndex).should('be.visible').within(() => {
      cy.get(this.elements.productName).should('be.visible');
      cy.get(this.elements.productPrice).should('be.visible');
      cy.get(this.elements.productQuantity).should('be.visible');
      cy.get(this.elements.productTotal).should('be.visible');
    });
  }

  proceedToCheckout() {
    cy.get(this.elements.proceedToCheckoutButton).click();
  }

  verifyAddressDetails() {
    cy.get(this.elements.deliveryAddress).should('be.visible');
    cy.get(this.elements.billingAddress).should('be.visible');
  }

  addOrderComment(comment) {
    cy.get(this.elements.commentTextarea).type(comment);
  }

  placeOrder() {
    cy.get(this.elements.placeOrderButton).click();
    cy.url().should('include', '/payment');
  }

  fillPaymentDetails(paymentData) {
    cy.get(this.elements.nameOnCard).type(paymentData.nameOnCard);
    cy.get(this.elements.cardNumber).type(paymentData.cardNumber);
    cy.get(this.elements.cvc).type(paymentData.cvc);
    cy.get(this.elements.expirationMonth).type(paymentData.expirationMonth);
    cy.get(this.elements.expirationYear).type(paymentData.expirationYear);
  }

  confirmPayment() {
    cy.get(this.elements.payAndConfirmButton).click();
  }

  verifyOrderConfirmation() {
    cy.get(this.elements.orderConfirmation).should('be.visible');
    cy.get(this.elements.successMessage).should('be.visible');
    cy.contains('Order Placed!').should('be.visible');
  }

  downloadInvoice() {
    cy.get(this.elements.downloadInvoiceButton).click();
  }

  clickContinue() {
    cy.get(this.elements.continueButton).click();
  }

  verifyEmptyCart() {
    cy.get(this.elements.emptyCartMessage).should('be.visible');
  }

  completeCheckoutFlow(paymentData, orderComment = 'Test PGATS Final Exercise') {
    this.verifyCartPage();
    this.verifyCartHasProducts();
    this.proceedToCheckout();
    this.verifyAddressDetails();
    this.addOrderComment(orderComment);
    this.placeOrder();
    this.fillPaymentDetails(paymentData);
    this.confirmPayment();
    this.verifyOrderConfirmation();
    this.downloadInvoice();
    this.clickContinue();
  }
}

module.exports = new CartPage();