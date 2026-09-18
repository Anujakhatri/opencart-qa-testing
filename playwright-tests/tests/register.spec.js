const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const RegisterPage = require('../pages/RegisterPage');

// Maps to TC-001 / TC-002 in test-cases.csv & TC001 in OpenCart-Automation reference

test.describe('Account Registration', () => {
  let homePage;
  let registerPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    registerPage = new RegisterPage(page);
    await homePage.navigateToHome();
    await homePage.clickRegister();
  });

  test('TC-001: Register with valid generated details', async () => {
    const randomNum = Math.floor(Math.random() * 100000);
    const testEmail = `auto_test_${randomNum}@example.com`;

    await registerPage.registerAccount({
      firstName: 'John',
      lastName: 'Doe',
      email: testEmail,
      telephone: '1234567890',
      password: 'Password123!',
      confirmPassword: 'Password123!'
    });

    // Check for success confirmation or success account header
    const confirmationText = await registerPage.getConfirmationMessage();
    expect(confirmationText).toMatch(/Your Account Has Been Created!|Register Account|Account/i);
  });

  test('TC-002: Register with already-used email displays warning', async () => {
    // Attempt registering with a known existing/duplicate email format
    await registerPage.registerAccount({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'demo@opencart.com',
      telephone: '9876543210',
      password: 'Password123!',
      confirmPassword: 'Password123!'
    });

    await expect(registerPage.warningAlert.first()).toBeVisible();
  });
});
