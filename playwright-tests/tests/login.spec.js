const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const LoginPage = require('../pages/LoginPage');
const MyAccountPage = require('../pages/MyAccountPage');

// Maps to TC-003 / TC-004 in test-cases.csv
// NOTE: replace TEST_EMAIL / TEST_PASSWORD with a real demo account you register yourself
// before running these — do not commit real credentials, use environment variables instead.

const TEST_EMAIL = process.env.OPENCART_TEST_EMAIL || 'your-test-account@example.com';
const TEST_PASSWORD = process.env.OPENCART_TEST_PASSWORD || 'YourTestPassword123';

test.describe('Login', () => {
  let homePage;
  let loginPage;
  let myAccountPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    loginPage = new LoginPage(page);
    myAccountPage = new MyAccountPage(page);
  });

  test('TC-004: login with incorrect password shows an error', async () => {
    await loginPage.navigate();
    await loginPage.login(TEST_EMAIL, 'WrongPassword123');

    await expect(loginPage.warningAlert.first()).toBeVisible();
  });

  test('TC-003: login with valid credentials succeeds', async ({ page }) => {
    test.skip(TEST_EMAIL.includes('example.com'), 'Set OPENCART_TEST_EMAIL / OPENCART_TEST_PASSWORD env vars with a real registered demo account first.');

    await loginPage.navigate();
    await loginPage.login(TEST_EMAIL, TEST_PASSWORD);

    await expect(page).toHaveURL(/account/);
    await expect(myAccountPage.accountHeading.first()).toBeVisible();
  });
});
