# Playwright Automated Tests — OpenCart QA Testing

Automated end-to-end regression tests for the OpenCart demo store ([demo.opencart.com](https://demo.opencart.com)), built using **Playwright + JavaScript** and designed with the **Page Object Model (POM)** pattern.

These tests directly implement the test cases defined in `../docs/test-scenarios.md` and `../test-cases/test-cases.csv`.

---

## Setup & Installation

```bash
cd playwright-tests
npm install
npx playwright install chromium
```

---

## Running the Tests

```bash
npm test              # Run all tests headless (with console list reporting)
npm run test:headed   # Run with visible browser
npm run report        # Open interactive HTML test report
```

### Authentication Environment Variables
For tests requiring authenticated access (e.g. TC-003), register an account on `demo.opencart.com` and export credentials:

```bash
export OPENCART_TEST_EMAIL="your-test-account@example.com"
export OPENCART_TEST_PASSWORD="YourTestPassword123"
```
*(Do not commit credentials to source control)*

---

## Page Object Model (POM) Architecture

The automation framework follows the Page Object Model design pattern to separate test logic from UI locators and page interaction details. All page classes reside in the `pages/` directory:

| Page Object Class | File Path | Responsibilities & Locators |
|---|---|---|
| `BasePage` | `pages/BasePage.js` | Shared base class; handles navigation (`navigateTo`), title queries, and URL inspection. |
| `HomePage` | `pages/HomePage.js` | Top navbar, header actions, "My Account" dropdown, search bar trigger, and direct navigation links. |
| `LoginPage` | `pages/LoginPage.js` | Email/password input fields, submit button, login action flow, and warning alert verification. |
| `RegisterPage` | `pages/RegisterPage.js` | Registration form inputs (name, email, password), privacy policy acceptance, submission, and confirmation checks. |
| `MyAccountPage` | `pages/MyAccountPage.js` | Logged-in user dashboard verification ("My Account" heading) and logout action. |
| `SearchPage` | `pages/SearchPage.js` | Product results grid, first item title extractor, product count, and "no products found" empty state detection. |
| `CartPage` | `pages/CartPage.js` | Add-to-cart action, success alert banner verification, cart item table, item removal, and empty cart notice. |

---

## Failure Diagnostics & Reporting

The test suite is configured in `playwright.config.js` to simplify debugging and defect logging:

- **Automatic Failure Screenshots (`screenshot: 'only-on-failure'`)**: When an assertion or action fails, Playwright takes a full-resolution PNG screenshot and saves it under `test-results/<test-name>/test-failed-1.png`.
- **Execution Traces (`trace: 'retain-on-failure'`)**: Playwright records DOM snapshots, network requests, and console messages for failing tests (`trace.zip`). View with `npx playwright show-trace <path-to-trace.zip>`.
- **Informative Console Output (`['list']` reporter)**: Real-time terminal output displays the exact failing test, failure reason, and an `Expected vs Actual` diff.
- **HTML Report (`['html']` reporter)**: Complete visual report with step timelines and attached screenshots.

---

## Defect Logging Checklist (When a Test Fails)

When a test fails during execution:

1. **Check the Terminal Output**:
   Note the test name and the failure details from the list reporter output:
   - Failing Test: e.g., `TC-008: remove a product from cart updates total`
   - Failure Reason: e.g., `Expected locator to be visible`
2. **Collect Evidence**:
   Open `test-results/` and locate the generated screenshot:
   - Example: `playwright-tests/test-results/cart-Cart-TC-008-remove-a-product-from-cart-updates-total-chromium/test-failed-1.png`
3. **Log in `../bug-tracker/Bug-Tracker.xlsx`**:
   - Open `../bug-tracker/Bug-Tracker.xlsx` (`Bug Tracker` sheet).
   - Add a new row with the next sequential ID (`BUG-002`, `BUG-003`, etc.).
   - Fill in **Severity**, **Priority**, and **Related Test Case** (e.g. `TC-008`).
   - Copy the test steps into **Steps to Reproduce**.
   - Fill in **Expected Result** vs **Actual Result**.
   - Paste the relative screenshot path into the **Evidence (Screenshot / Trace)** column.
   - Refer to the **Legend** and **Production Workflow** sheets in the workbook for classification guidance and triage flow.

---

## Automated Test Coverage

| Test File | Flows Covered | Maps to Test Case | Status |
|---|---|---|---|
| `search.spec.js` | Positive search for existing product; negative search with empty result verification | TC-005, TC-006 | Automated (Passing) |
| `cart.spec.js` | Add product to cart with notification check; remove product from cart with empty cart check | TC-007, TC-008 | Automated (Passing) |
| `login.spec.js` | Invalid credentials error alert; valid credentials login to account dashboard | TC-003, TC-004 | Automated (Passing) |
| `register.spec.js` | New account registration flow; duplicate email warning validation | TC-001, TC-002 | Automated (Passing) |
