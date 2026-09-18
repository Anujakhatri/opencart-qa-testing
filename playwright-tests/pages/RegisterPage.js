const BasePage = require('./BasePage');

/**
 * RegisterPage
 * Page object representing the OpenCart account registration page.
 */
class RegisterPage extends BasePage {
  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    super(page);
    this.firstNameInput = page.locator('#input-firstname');
    this.lastNameInput = page.locator('#input-lastname');
    this.emailInput = page.locator('#input-email');
    this.telephoneInput = page.locator('#input-telephone');
    this.passwordInput = page.locator('#input-password');
    this.confirmPasswordInput = page.locator('#input-confirm');
    this.privacyPolicyCheckbox = page.locator('input[name="agree"]');
    this.continueButton = page.locator('form button[type="submit"], form input[value="Continue"], button:has-text("Continue")').first();
    this.confirmationHeader = page.locator('#content h1');
    this.warningAlert = page.locator('.alert-danger, .alert-dismissible, div.alert');
  }

  async navigate() {
    await this.navigateTo('/index.php?route=account/register');
  }

  async fillRegistrationForm(data) {
    if (data.firstName) await this.firstNameInput.fill(data.firstName);
    if (data.lastName) await this.lastNameInput.fill(data.lastName);
    if (data.email) await this.emailInput.fill(data.email);
    if (data.telephone && await this.telephoneInput.isVisible().catch(() => false)) {
      await this.telephoneInput.fill(data.telephone);
    }
    if (data.password) await this.passwordInput.fill(data.password);
    if (data.confirmPassword && await this.confirmPasswordInput.isVisible().catch(() => false)) {
      await this.confirmPasswordInput.fill(data.confirmPassword);
    }
  }

  async acceptPrivacyPolicy() {
    if (await this.privacyPolicyCheckbox.isVisible().catch(() => false)) {
      const isChecked = await this.privacyPolicyCheckbox.isChecked().catch(() => false);
      if (!isChecked) {
        await this.privacyPolicyCheckbox.check({ force: true });
      }
    }
  }

  async clickContinue() {
    await this.continueButton.click();
  }

  async registerAccount(data) {
    await this.fillRegistrationForm(data);
    await this.acceptPrivacyPolicy();
    await this.clickContinue();
  }

  async getConfirmationMessage() {
    return await this.confirmationHeader.textContent();
  }

  async getWarningMessage() {
    return await this.warningAlert.first().textContent();
  }
}

module.exports = RegisterPage;
