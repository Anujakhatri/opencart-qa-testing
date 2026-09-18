# Test Scenarios — OpenCart QA Testing

High-level scenarios per flow. Each maps to detailed test cases in `test-cases/test-cases.csv`.

## Registration & Login
- Register a new account with valid details
- Register with an already-used email (negative)
- Register with missing required fields (negative)
- Login with valid credentials
- Login with incorrect password (negative)
- Login with unregistered email (negative)

## Product Search
- Search for an existing product by name
- Search for a non-existent product (negative)
- Search with special characters / empty query (edge case)
- Filter/sort search results (price, name)

## Cart
- Add a single product to cart
- Add multiple products to cart
- Update product quantity in cart
- Remove a product from cart
- Add a product with quantity exceeding available stock (negative/edge case)

## Checkout
- Complete checkout as a registered user
- Complete checkout as a guest
- Attempt checkout with an empty cart (negative)
- Attempt checkout with missing shipping/billing details (negative)

## Payment
- Complete order with valid payment details (demo/test mode)
- Attempt payment with invalid card details (negative)
- Verify order confirmation and order summary accuracy
