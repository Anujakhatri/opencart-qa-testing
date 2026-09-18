# OpenCart QA Testing

QA testing project on OpenCart's e-commerce platform: test scenarios, test case design, automated Playwright test suite with Page Object Model (POM), and defect management for core shopping flows (registration, login, cart, checkout, search).

## About

This project applies structured QA testing practices to [OpenCart](https://www.opencart.com/), an open-source e-commerce platform, using its public demo store ([demo.opencart.com](https://demo.opencart.com/)). It includes a test plan, test scenarios and test cases covering core user flows, an automated Playwright regression suite, and a comprehensive defect tracking system designed to reflect real-world QA engineering workflows.

## Scope

- User registration and account management
- User authentication and login security
- Product search and catalog browsing
- Cart operations (add, update, remove items)
- Checkout and guest flow validation
- Payment validation (positive and negative cases)

## Repository Structure

```
opencart-qa-testing/
├── README.md
├── docs/
│   ├── test-plan.md            # Scope, strategy, entry/exit criteria, and risks
│   ├── test-scenarios.md       # High-level business scenarios per user flow
│   └── rtm.md                  # Requirement Traceability Matrix (RTM)
├── test-cases/
│   └── test-cases.csv          # Detailed test cases (steps, expected, actual, priority)
├── bug-reports/
│   └── bug-001-example.md      # Sample markdown defect report (Anuja Khatri)
├── bug-tracker/
│   └── Bug-Tracker.xlsx        # Excel workbook for defect lifecycle management
│       ├── "Bug Tracker"       # Defect log with severity, priority, steps, & evidence
│       ├── "Legend"            # Definitions of Severity, Priority, Status, and Fields
│       └── "Production Workflow" # Real-world defect triage, SLAs, and release gating
└── playwright-tests/
    ├── playwright.config.js    # Playwright configuration (reporters, failure artifacts)
    ├── package.json
    ├── pages/                  # Page Object Model (POM) classes
    │   ├── BasePage.js
    │   ├── HomePage.js
    │   ├── LoginPage.js
    │   ├── RegisterPage.js
    │   ├── MyAccountPage.js
    │   ├── SearchPage.js
    │   └── CartPage.js
    └── tests/                  # Automated test specifications
        ├── search.spec.js      # TC-005, TC-006
        ├── cart.spec.js        # TC-007, TC-008
        ├── login.spec.js       # TC-003, TC-004
        └── register.spec.js    # TC-001, TC-002
```

## Automated Testing (Playwright + POM)

Automated tests are built with [Playwright](https://playwright.dev/) using JavaScript and structured according to the Page Object Model (POM) pattern:

- **Page Objects (`pages/`)**: Encapsulate element locators and interaction methods for clean, maintainable test scripts.
- **Test Specs (`tests/`)**: High-level test assertions mapping directly to manual test cases in `test-cases/test-cases.csv`.
- **Diagnostic Artifacts on Failure**:
  - `screenshot: 'only-on-failure'` automatically captures page screenshots under `test-results/`.
  - `trace: 'retain-on-failure'` saves a full execution trace (`trace.zip`).
  - `reporter: [['list'], ['html', ...]]` outputs clear terminal logs (test name, step failure, expected vs. actual values) and generates an interactive HTML report.

To run the automated tests:
```bash
cd playwright-tests
npm install
npx playwright test
```

## Bug Tracking & Defect Management

All defects discovered during manual exploratory testing and automated Playwright test execution are formally logged in `bug-tracker/Bug-Tracker.xlsx`.

### Workbook Organization
1. **Bug Tracker**: The central defect repository tracking Bug ID, Title, Severity, Priority, Related Test Case, Status, Environment, Steps to Reproduce, Expected vs. Actual results, and Evidence file paths.
2. **Legend**: Formal classifications for:
   - **Severity**: *Critical* (blocker/data loss), *High* (major feature broken), *Medium* (non-critical flaw with workaround), *Low* (minor cosmetic).
   - **Priority**: *High* (immediate fix required), *Medium* (scheduled release fix), *Low* (backlog/minor polish).
   - **Status**: *New*, *Open*, *In Progress*, *Resolved*, *Retested*, *Closed*, *Deferred*.
3. **Production Workflow**: Documentation demonstrating how defect triage, developer assignment, retesting, SLAs, and release gating operate in enterprise QA teams (e.g. zero open Critical/High defects required for production deployment).

### Defect Logging Checklist (When an Automated Test Fails)

When a Playwright test fails:
1. **Identify the Failure**: Note the failing spec and test name from the terminal console output (e.g., `Cart › TC-008: remove a product from cart updates total`).
2. **Locate Evidence**: Retrieve the automatically generated failure screenshot and trace from `playwright-tests/test-results/<test-folder>/test-failed-1.png`.
3. **Log in Bug-Tracker.xlsx**:
   - Assign the next sequential Bug ID (e.g., `BUG-002`).
   - Enter the descriptive title, Severity, and Priority.
   - Reference the failing Test Case ID (e.g., `TC-008`).
   - Set Status to `Open`.
   - Copy reproduction steps from the test flow.
   - Paste the expected result vs actual error message.
   - Add the relative screenshot path under the **Evidence (Screenshot / Trace)** column.
4. **Retest & Verify**: After the defect is fixed, rerun `npx playwright test` to verify the fix and update the status to `Retested` -> `Closed`.

## Tools & Technologies

- **Test Automation**: Playwright, JavaScript (Node.js), Page Object Model (POM)
- **Manual QA & Strategy**: Markdown Test Plan, Scenarios, Requirement Traceability Matrix (RTM), CSV Test Cases
- **Defect Tracking**: Excel (`Bug-Tracker.xlsx`), Markdown Bug Reports