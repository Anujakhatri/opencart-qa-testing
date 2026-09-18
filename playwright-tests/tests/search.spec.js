const { test, expect } = require('@playwright/test');
const HomePage = require('../pages/HomePage');
const SearchPage = require('../pages/SearchPage');

// Maps to TC-005 / TC-006 in test-cases.csv

test.describe('Product Search', () => {
  let homePage;
  let searchPage;

  test.beforeEach(async ({ page }) => {
    homePage = new HomePage(page);
    searchPage = new SearchPage(page);
    await homePage.navigateToHome();
  });

  test('TC-005: search for an existing product returns matching results', async () => {
    await homePage.searchFor('MacBook');

    const count = await searchPage.getProductCount();
    expect(count).toBeGreaterThan(0);

    await expect(searchPage.productResults.first()).toBeVisible();
    const firstTitle = await searchPage.getFirstProductTitle();
    expect(firstTitle.toLowerCase()).toContain('macbook');
  });

  test('TC-006: search for a non-existent product shows no results', async () => {
    await homePage.searchFor('zzzznotarealproductzzzz');

    await expect(searchPage.noResultsMessage.first()).toBeVisible();
  });
});
