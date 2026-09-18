const BasePage = require('./BasePage');

/**
 * LoginPage
 * Page object representing the OpenCart account login page.
 */
class LoginPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.emailInput = page.locator('#input-email');
    this.passwordInput = page.locator('#input-password');
    this.loginButton = page.locator('form button[type="submit"], form input[type="submit"], button:has-text("Login"), input[value="Login"]').first();
    this.warningAlert = page.locator('.alert-danger, .alert-dismissible, div.alert');
  }

  async navigate() {
    await this.navigateTo('/index.php?route=account/login');
  }

  async setEmail(email) {
    await this.emailInput.fill(email);
  }

  async setPassword(password) {
    await this.passwordInput.fill(password);
  }

  async clickLogin() {
    await this.loginButton.click();
  }

  async login(email, password) {
    await this.setEmail(email);
    await this.setPassword(password);
    await this.clickLogin();
  }

  async getWarningMessage() {
    return await this.warningAlert.first().textContent();
  }
}

module.exports = LoginPage;
