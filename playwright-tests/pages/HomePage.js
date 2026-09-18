const BasePage = require('./BasePage');

/**
 * HomePage
 * Page object representing the OpenCart store front / header section.
 */
class HomePage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.myAccountDropdown = page.locator('a:has-text("My Account"), span:has-text("My Account")');
    this.registerLink = page.locator('a:has-text("Register")');
    this.loginLink = page.locator('a:has-text("Login")');
    this.shoppingCartLink = page.locator('a[title="Shopping Cart"], a:has-text("Shopping Cart")');
    this.searchInput = page.getByPlaceholder('Search');
    this.searchButton = page.locator('#search button, button:has-text("Search")');
  }

  async navigateToHome() {
    await this.navigateTo('/');
  }

  async openMyAccountDropdown() {
    await this.myAccountDropdown.first().click();
  }

  async clickRegister() {
    await this.openMyAccountDropdown();
    await this.registerLink.first().click();
  }

  async clickLogin() {
    await this.openMyAccountDropdown();
    await this.loginLink.first().click();
  }

  async searchFor(term) {
    await this.searchInput.fill(term);
    await this.searchButton.first().click();
  }

  async navigateToCart() {
    await this.page.goto('/index.php?route=checkout/cart');
  }
}

module.exports = HomePage;
