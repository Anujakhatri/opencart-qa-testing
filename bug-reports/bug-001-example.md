# BUG-001: Header Cart Widget Fails to Update Count and Total After Item Removal

**Reported by:** Anuja Khatri  
**Date:** September 18, 2026  
**Environment:** OpenCart Demo Store (`https://demo.opencart.com`), Google Chrome v128.0 (macOS Sonoma), Playwright v1.40.0  
**Severity:** Medium (Functional defect with UI state inconsistency)  
**Priority:** High (Directly affects shopping cart user experience prior to checkout)  
**Related Test Case:** [TC-008](file:///Users/anujakhatri/Desktop/workshop/opencart-qa-testing/test-cases/test-cases.csv#L9) (*Remove product from cart*)  

---

## Description
When a user removes an item from the main Shopping Cart page (`index.php?route=checkout/cart`), the table row is cleared, but the persistent top-right header cart button widget fails to update its item counter and subtotal dynamically. It continues to display the stale quantity until the page is manually refreshed.

---

## Steps to Reproduce
1. Navigate to the OpenCart storefront at `https://demo.opencart.com/`.
2. Search for `"MacBook"` and click **Add to Cart** from the search results.
3. Confirm the top header cart button updates to show `1 item(s) - $602.00`.
4. Navigate to the Shopping Cart page by clicking the cart link or navigating to `index.php?route=checkout/cart`.
5. Click the red **Remove** (`fa-times-circle` / trash icon) button next to the MacBook product line.
6. Observe the header cart widget in the upper-right corner of the viewport.

---

## Expected Result
- The item is removed from the cart table.
- The page renders the empty cart notification: *"Your shopping cart is empty!"*.
- The header cart button widget asynchronously refreshes to display `0 item(s) - $0.00` without requiring a manual page reload.

---

## Actual Result
- The product line item is removed from the table and the empty cart notice appears.
- **Defect:** The top header cart widget remains stuck displaying `1 item(s) - $602.00`. Clicking the header widget still shows the deleted item in the mini-cart dropdown until a hard browser refresh is triggered.

---

## Evidence & Diagnostic Artifacts
- **Screenshot:** `playwright-tests/test-results/cart-TC-008-remove-product/test-failed-1.png`
- **Playwright Trace:** `playwright-tests/test-results/cart-TC-008-remove-product/trace.zip`
- **Network Observation:** The `POST /index.php?route=checkout/cart.remove` request succeeds (`200 OK`), but the DOM mutation event fails to re-render the `#header-cart` component container.

---

## Status
**Open** (Assigned for Developer Triage)

