const BasePage = require('./BasePage');

/**
 * MyAccountPage
 * Page object representing the logged-in user dashboard / account page.
 */
class MyAccountPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.accountHeading = page.locator('#content h2:has-text("My Account"), h2:has-text("My Account")');
    this.logoutLink = page.locator('a:has-text("Logout")');
  }

  async isAccountPageVisible() {
    return await this.accountHeading.first().isVisible();
  }

  async clickLogout() {
    await this.logoutLink.first().click();
  }
}

module.exports = MyAccountPage;
