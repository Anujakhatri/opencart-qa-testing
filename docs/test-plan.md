# Test Plan — OpenCart QA Testing

## 1. Objective

Verify that core shopping flows on the OpenCart demo store (demo.opencart.com) work correctly, and document any defects found using a professional QA process.

## 2. Scope

### In scope
- User registration and login
- Product search and filtering
- Cart operations (add, update quantity, remove)
- Checkout flow (guest and registered)
- Payment and order confirmation (using test/demo data only)

### Out of scope
- Admin panel functionality
- Third-party payment gateway internals
- Performance/load testing

## 3. Test Approach

- Manual functional testing of each core flow
- Exploratory testing around edge cases (empty cart checkout, invalid inputs)
- Regression testing after any environment changes
- API-level checks with Postman where endpoints are accessible

## 4. Entry Criteria

- Demo store is accessible and in a stable state
- Test scenarios and test cases are documented before execution begins

## 5. Exit Criteria

- All planned test cases have been executed
- All identified defects are logged with reproduction steps
- No open critical/blocker defects remain undocumented

## 6. Test Environment

- Application under test: OpenCart demo store (https://demo.opencart.com)
- Browser(s): [fill in — e.g. Chrome, latest version]
- Tools: Postman (API checks), manual browser testing

## 7. Risks & Assumptions

- Demo store data may reset periodically, which can affect test data continuity
- No access to backend/admin panel limits some verification (e.g. confirming order records server-side)
