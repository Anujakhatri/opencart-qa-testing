const BasePage = require('./BasePage');

/**
 * SearchPage
 * Page object representing the product search results page.
 */
class SearchPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.productResults = page.locator('.product-thumb');
    this.noResultsMessage = page.getByText(/no product|not found/i);
  }

  async getProductCount() {
    return await this.productResults.count();
  }

  async getFirstProductTitle() {
    const firstItem = this.productResults.first();
    const titleLocator = firstItem.locator('h4 a, .caption a');
    return await titleLocator.first().innerText();
  }

  async isNoResultsMessageVisible() {
    return await this.noResultsMessage.first().isVisible();
  }
}

module.exports = SearchPage;
