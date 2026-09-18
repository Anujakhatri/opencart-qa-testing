# OpenCart QA Testing

QA testing project on OpenCart's e-commerce platform: test scenarios, test case design, and defect reports for core shopping flows (login, cart, checkout, search).

## About

This project applies structured QA testing practices to [OpenCart](https://www.opencart.com/), an open-source e-commerce platform, using its public demo store ([demo.opencart.com](https://demo.opencart.com/)). It includes a test plan, test scenarios and test cases covering core user flows, and bug reports for any defects found, written to reflect how testing is documented in a real QA workflow.

## Scope

- User registration and login
- Product search and browsing
- Cart (add, update, remove items)
- Checkout flow
- Payment validation (positive and negative cases)

## Structure

```
opencart-qa-testing/
├── README.md
├── docs/
│   ├── test-plan.md        # scope, approach, entry/exit criteria
│   ├── test-scenarios.md   # high-level scenarios per flow
│   └── rtm.md               # requirement traceability matrix
├── test-cases/
│   └── test-cases.csv      # detailed test cases: steps, expected, actual, status
└── bug-reports/
    └── bug-001-example.md  # one file per defect
```
## Tools

- Manual functional, regression, and exploratory testing
- Postman (API-level checks where applicable)

## Status

In progress — test cases and bug reports are being added as testing continues.