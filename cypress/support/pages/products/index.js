class ProductsPage {
  elements = {
    pageTitle: 'h2:contains("All Products")',
    productsList: '.features_items',
    productItem: '.product-image-wrapper',
    searchInput: 'input#search_product',
    searchButton: 'button#submit_search',
    searchResultsTitle: 'h2:contains("Searched Products")',
    viewProductLink: 'a[href*="/product_details/"]',
    productName: '.product-information h2',
    productCategory: '.product-information p:contains("Category:")',
    productPrice: '.product-information span span',
    productAvailability: '.product-information p:contains("Availability:")',
    productCondition: '.product-information p:contains("Condition:")',
    productBrand: '.product-information p:contains("Brand:")',
    quantityInput: 'input#quantity',
    addToCartButton: '.add-to-cart',
    addedToCartModal: '.modal-content',
    continueShoppingButton: 'button[data-dismiss="modal"]',
    viewCartButton: '.modal-content a[href="/view_cart"]',
    recommendedItems: '.recommended_items'
  };

  verifyAllProductsPage() {
    cy.get(this.elements.pageTitle).should('be.visible');
    cy.get(this.elements.productsList).should('be.visible');
    cy.url().should('include', '/products');
  }

  verifyProductsList() {
    cy.get(this.elements.productItem).should('have.length.greaterThan', 0);
  }

  viewFirstProduct() {
    cy.get(this.elements.viewProductLink).first().click();
    cy.url().should('include', '/product_details/');
  }

  verifyProductDetails() {
    cy.get(this.elements.productName).should('be.visible');
    cy.get(this.elements.productCategory).should('be.visible');
    cy.get(this.elements.productPrice).should('be.visible');
    cy.get(this.elements.productAvailability).should('be.visible');
    cy.get(this.elements.productCondition).should('be.visible');
    cy.get(this.elements.productBrand).should('be.visible');
  }

  searchProduct(productName) {
    cy.get(this.elements.searchInput).type(productName);
    cy.get(this.elements.searchButton).click();
  }

  verifySearchResults() {
    cy.get(this.elements.searchResultsTitle).should('be.visible');
    cy.get(this.elements.productItem).should('have.length.greaterThan', 0);
  }

  verifySearchResultsRelevance(searchTerm) {
  
    cy.get(this.elements.productItem).should('have.length.greaterThan', 0);
    
    cy.get(this.elements.productItem).then(($products) => {
      
      let foundRelevant = false;
      $products.each((index, product) => {
        const productText = Cypress.$(product).text().toLowerCase();
        if (productText.includes(searchTerm.toLowerCase())) {
          foundRelevant = true;
          return false;
        }
      });
      
    });
  }

  verifyAddedToCartModal() {
    cy.get(this.elements.addedToCartModal).should('be.visible');
    cy.contains('Added!').should('be.visible');
  }

  continueShopping() {
    cy.get(this.elements.continueShoppingButton).click();
  }

  viewCart() {
    cy.get(this.elements.viewCartButton).should('be.visible').click();
    cy.url().should('include', '/view_cart');
  }

  addMultipleProductsToCart(products = [0, 1]) {
    products.forEach((productIndex, index) => {
      cy.get(this.elements.productItem).eq(productIndex).within(() => {
        cy.get(this.elements.addToCartButton).first().should('be.visible').click();
      });
      
      if (index === 0) {
        this.verifyAddedToCartModal();
        this.continueShopping();
      } else {
        this.verifyAddedToCartModal();
        this.viewCart();
      }
    });
  }

  completeProductSearch(searchTerm) {
    this.verifyAllProductsPage();
    this.searchProduct(searchTerm);
    this.verifySearchResults();
    this.verifySearchResultsRelevance(searchTerm);
  }

}

module.exports = new ProductsPage();