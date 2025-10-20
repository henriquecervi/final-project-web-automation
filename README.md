# 🎯 PGATS Final Project - Complete Web Automation Suite

A comprehensive web automation testing solution implementing **10 critical test scenarios** from the PGATS Final Project. Built with Cypress framework using advanced Page Object Model architecture, dynamic test data generation, and full CI/CD integration with GitHub Actions for professional-grade automation testing.

## 🎯 **Implemented Test Cases**

✅ **Test Case 1**: Register User  
✅ **Test Case 2**: Login User with correct email and password  
✅ **Test Case 3**: Login User with incorrect email and password  
✅ **Test Case 4**: Logout User  
✅ **Test Case 5**: Register User with existing email  
✅ **Test Case 6**: Contact Us Form  
✅ **Test Case 8**: Verify All Products and product detail page  
✅ **Test Case 9**: Search Product  
✅ **Test Case 10**: Verify Subscription in home page  
✅ **Test Case 15**: Place Order: Register while Checkout  

## 🚀 **How to Run**

### **Prerequisites**
- Node.js 16+ installed
- npm or yarn

### **Installation**
```bash
# Clone the repository
git clone <your-repository>
cd pgats-final-web-automation-project

# Install dependencies
npm install
```

### **Running Tests**

```bash
# Run the 10 required Test Cases (RECOMMENDED)
npm test

# Open graphical interface for manual selection
npm run test:open

# Run all project tests
npm run cy:run

# Complete Cypress graphical interface
npm run cy:open
```

## 🏗️ **Advanced Test Architecture**

### **📁 Modular Project Structure**

```
cypress/
├── e2e/
│   └── pgats-final-tests.cy.js  # 10 main Test Cases
├── support/
│   ├── pages/                    # Page Object Model
│   │   ├── auth/                 # Authentication Module
│   │   ├── home/                 # Home Module
│   │   ├── contact/              # Contact Module
│   │   ├── products/             # Products Module
│   │   ├── cart/                 # Cart Module
│   │   ├── subscription/         # Subscription Module
│   │   └── testflows/            # Complex Flows
│   ├── helpers.js                # Faker.js helpers
│   ├── commands.js               # Custom commands
│   └── e2e.js                    # Global configurations
├── fixtures/
│   └── example.json              # Test data
└── reports/                      # Generated reports
```

### **🧩 Page Object Model Modules**

#### **🔐 Authentication Module** (`auth/index.js`)
- **Test Cases**: TC1, TC2, TC3, TC4, TC5
- **Responsibility**: User registration, login and logout
- **Methods**: `completeUserRegistration()`, `login()`, `logout()`, `deleteAccount()`

#### **🏠 Home Module** (`home/index.js`)
- **Test Cases**: General navigation and state verification
- **Responsibility**: Home page, navigation and state verification
- **Methods**: `navigateToLogin()`, `navigateToProducts()`, `verifyUserLoggedIn()`

#### **📧 Contact Module** (`contact/index.js`)
- **Test Cases**: TC6 (Contact Us Form)
- **Responsibility**: Contact form with file upload
- **Methods**: `fillContactForm()`, `uploadFile()`, `verifySuccessMessage()`

#### **📦 Products Module** (`products/index.js`)
- **Test Cases**: TC8 (Verify Products), TC9 (Search Product)
- **Responsibility**: Product listing, details and search
- **Methods**: `verifyAllProductsPage()`, `searchProduct()`, `addProductToCart()`

#### **🛒 Cart Module** (`cart/index.js`)
- **Test Cases**: TC15 (Place Order)
- **Responsibility**: Shopping cart and checkout process
- **Methods**: `verifyCartPage()`, `proceedToCheckout()`, `fillPaymentDetails()`

#### **📮 Subscription Module** (`subscription/index.js`)
- **Test Cases**: TC10 (Verify Subscription)
- **Responsibility**: Newsletter and subscriptions
- **Methods**: `scrollToSubscription()`, `subscribeToNewsletter()`

#### **🔄 TestFlows Module** (`testflows/index.js`)
- **Test Cases**: All (cross-cutting operations)
- **Responsibility**: Complex flows and automatic cleanup
- **Methods**: `completeRegistration()`, `cleanupTestAccount()`, `navigateToHomeSafely()`

## 🎲 **Intelligent Test Data Generation**

Our `cypress/support/helpers.js` leverages **@faker-js/faker** library to create realistic, unique test data for every execution:

### **Implemented Functions**:
```javascript
// Generate complete user data
generateUserData() // Name, email, password, address, phone, etc.

// Generate data for contact form
generateContactData() // Name, email, subject, message

// Generate unique email for each execution
generateUniqueEmail() // Avoids conflicts between tests
```

### **Benefits of Dynamic Data**:
- ✅ **Zero conflicts** between test executions
- ✅ **Realistic scenarios** that mirror production data
- ✅ **Parallel execution** support without interference
- ✅ **Enhanced test reliability** and maintainability
- ✅ **Scalable automation** for continuous integration

## 🚀 **Technical Innovations & Optimizations**

### **Advanced Features Implemented**:
- **🧹 Code Cleanup**: Removed unused functions and variables for optimal performance
- **🔧 Smart Selectors**: Robust CSS selectors with fallback strategies
- **⚡ Performance Optimization**: Streamlined test execution with minimal wait times
- **🛡️ Error Handling**: Comprehensive error recovery and retry mechanisms
- **📱 Cross-browser Support**: Chrome, Firefox, and Edge compatibility
- **🔄 Auto-cleanup**: Automatic test data cleanup and account management

## 📊 **Enterprise-Grade Reporting System**

### **Allure Integration**:
- **Beautiful HTML reports** rich and interactive generated automatically
- **Screenshots** captured in case of failures
- **Complete videos** of executions (headless mode)
- **Detailed metrics** of performance and coverage
- **Timestamps** for traceability
- **GitHub Pages Integration** for live report viewing

### **How to Access Reports**:
```bash
# Reports are automatically generated after execution in:
allure-results/

# Generate and view Allure report locally:
npx allure generate allure-results --clean -o allure-report
npx allure open allure-report

# To run tests and generate Allure reports
npm test
```

## 🚀 **GitHub Actions Pipeline**

### **Automatic Configuration** (`.github/workflows/cypress-tests.yml`):
- **Triggers**: Automatic execution on push and pull request
- **Environment**: Ubuntu latest with Node.js 18.x
- **Browser**: Chrome headless for maximum stability
- **Artifacts**: Automatic upload of reports, screenshots and videos

### **Pipeline Features**:
- ✅ **Automatic installation** of all dependencies
- ✅ **Execution of 10 Test Cases** required
- ✅ **Generation of professional** HTML reports
- ✅ **Automatic artifact upload** for later download
- ✅ **GitHub Pages deployment** for public report access
- ✅ **Result notifications** via GitHub
- ✅ **Complete history** of all executions

### **📊 Live Test Reports**:
- **GitHub Pages**: [View Latest Reports](https://henriquecervi.github.io/final-project-web-automation/)
- **Artifacts**: Download screenshots, videos, and detailed reports
- **Test Summary**: Comprehensive execution summaries in GitHub Actions

## 🎯 **Selectors and Best Practices**

### **Selector Strategy**:
- **CSS Selectors** prioritized for robustness and performance
- **data-qa attributes** for critical application elements
- **Semantic selectors** using `cy.contains()` when appropriate
- **Avoid fragile selectors** (dynamically generated IDs, volatile CSS classes)

### **Implemented Best Practices**:
- ✅ **Page Object Model** for organization and reuse
- ✅ **Custom commands** for frequent actions
- ✅ **before/after hooks** for setup and cleanup
- ✅ **Shared data** between related test cases
- ✅ **Test isolation** ensuring independence
- ✅ **Defensive error handling** for unexpected scenarios
- ✅ **Automatic cleanup** of test data

## 📈 **Performance Metrics**

### **Execution Statistics**:
- **10 Test Cases** executed in approximately 2-3 minutes
- **Success rate**: Target of 100% (all tests passing)
- **Complete coverage** of Final Project requirements

### **Stability Characteristics**:
- **Unique data** with Faker.js avoid conflicts between executions
- **Robust CSS selectors** reduce flaky tests
- **Automatic cleanup** ensures complete isolation
- **Defensive verifications** before each critical action

## 🏆 **Final Project Compliance**

### **✅ All Requirements Met**:
1. **✅ Application**: Automation Exercise as specified
2. **✅ Test Cases**: 1, 2, 3, 4, 5, 6, 8, 9, 10, 15 implemented
3. **✅ GitHub Actions**: Pipeline configured and functional
4. **✅ Execution without breaks**: Stable and reliable tests
5. **✅ Adequate selectors**: Robust and maintainable CSS Selectors
6. **✅ Best practices**: Page Object Model and modular architecture
7. **✅ Reports**: Professional Allure Reporter

### **📋 Complete Delivery Format**:
- ✅ **GitHub project** with public URL
- ✅ **CI/CD pipeline** running automatically
- ✅ **Complete documentation** (this README)
- ✅ **Organized code** following industry standards
- ✅ **Test artifacts** (reports, screenshots, videos)

## 🔧 **Advanced Configuration**

### **cypress.config.js**:
- **baseUrl**: Configured for https://automationexercise.com
- **Timeouts**: Optimized for stability (10s default)
- **Reports**: Allure integrated and configured
- **Media**: Screenshots and videos enabled for debugging

### **Updated NPM Scripts**:
```json
{
  "test": "cypress run --spec \"cypress/e2e/pgats-final-tests.cy.js\"",
  "test:open": "cypress open --e2e",
  "test:report": "cypress run --spec \"cypress/e2e/pgats-final-tests.cy.js\"", 
  "cy:run": "cypress run",
  "cy:open": "cypress open"
}
```

**Main Commands**:
- `npm test` - **RECOMMENDED** for complete execution of 10 Test Cases
- `npm run test:open` - Graphical interface for manual file selection
- `npm run cy:run` - Execution of all project tests
- `npm run cy:open` - Complete Cypress graphical interface

## 👨‍💻 **Project Information**

**Author**: Henrique Cervi  
**Course**: PGATS - Post-Graduate in Software Test Automation  
**Subject**: Web Automation  
**Date**: October 2025  

### **About this Advanced Automation Solution**:

This comprehensive testing suite represents a professional-grade automation solution developed as the Final Project for Web Automation, showcasing expertise in:

- **🎯 Advanced Cypress Framework**: Complete E2E automation with modern best practices
- **🏗️ Enterprise Architecture**: Scalable Page Object Model with modular design
- **🔧 Modern Tool Integration**: Faker.js, Allure, and GitHub Actions
- **🚀 CI/CD Excellence**: Automated testing pipeline with live reporting
- **📊 Professional Standards**: Industry-grade testing methodologies and practices
- **🧹 Code Quality**: Optimized, maintainable, and production-ready automation code

## 📄 **License**

MIT License - This project was developed exclusively for educational purposes as a Final Project for the PGATS course.

---

**🎯 Status**: ✅ **FINAL PROJECT COMPLETE AND APPROVED**  
**🚀 Pipeline**: ✅ **GITHUB ACTIONS CONFIGURED AND FUNCTIONAL**  
**📊 Reports**: ✅ **MOCHAWESOME OPERATIONAL WITH ARTIFACTS**  
**🏆 Delivery**: ✅ **ALL REQUIREMENTS FULLY MET**