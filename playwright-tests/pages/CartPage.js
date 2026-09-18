const BasePage = require('./BasePage');

/**
 * CartPage
 * Page object representing the shopping cart and add-to-cart operations.
 */
class CartPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.addToCartButton = page.locator('.product-thumb').first().locator('button[title="Add to Cart"], button[formaction*="cart.add"], button:has-text("Add to Cart")');
    this.successAlert = page.locator('.alert-success, div.alert-success');
    this.cartTableContent = page.locator('#content');
    this.removeButton = page.locator('button[data-original-title="Remove"], button[formaction*="cart.remove"], button[title="Remove"]').first();
    this.emptyCartMessage = page.getByText(/shopping cart is empty/i);
  }

  async addFirstProductToCart() {
    await this.addToCartButton.first().click();
  }

  async isSuccessAlertVisible() {
    return await this.successAlert.first().isVisible({ timeout: 10000 });
  }

  async navigateToCartPage() {
    await this.navigateTo('/index.php?route=checkout/cart');
  }

  async removeFirstItem() {
    await this.removeButton.click();
  }

  async isEmptyCartMessageVisible() {
    return await this.emptyCartMessage.first().isVisible();
  }
}

module.exports = CartPage;
