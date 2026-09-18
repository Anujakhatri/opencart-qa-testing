const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const CartPage = require('../pages/CartPage');

// Maps to TC-007 / TC-008 in test-cases.csv

test.describe('Cart', () => {
  let homePage;
  let cartPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    cartPage = new CartPage(page);
    await homePage.navigateToHome();
  });

  test('TC-007: add a product to cart', async () => {
    await homePage.searchFor('MacBook');
    await cartPage.addFirstProductToCart();

    await expect(cartPage.successAlert.first()).toBeVisible({ timeout: 10000 });

    await cartPage.navigateToCartPage();
    await expect(cartPage.cartTableContent).toContainText(/macbook/i);
  });

  test('TC-008: remove a product from cart updates total', async () => {
    await homePage.searchFor('MacBook');
    await cartPage.addFirstProductToCart();
    await expect(cartPage.successAlert.first()).toBeVisible({ timeout: 10000 });

    await cartPage.navigateToCartPage();
    await cartPage.removeFirstItem();

    await expect(cartPage.emptyCartMessage.first()).toBeVisible();
  });
});
