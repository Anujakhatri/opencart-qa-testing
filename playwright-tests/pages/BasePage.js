/**
 * BasePage
 * Represents the shared base page object providing common page operations and accessors.
 */
class BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
  }

  /**
   * Navigate to a relative path or absolute URL
   * @param {string} path
   */
  async navigateTo(path = '/') {
    await this.page.goto(path, { waitUntil: 'domcontentloaded' });
  }

  /**
   * Get current page title
   */
  async getTitle() {
    return await this.page.title();
  }

  /**
   * Get current page URL
   */
  getUrl() {
    return this.page.url();
  }
}

module.exports = BasePage;
