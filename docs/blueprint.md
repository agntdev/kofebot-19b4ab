# CoffeeBot — Bot specification

**Archetype:** commerce

**Voice:** friendly and professional — write every user-facing message, button label, error, and empty state in this voice.

Telegram bot for cafe customers to pre-order coffee and snacks for pickup. Users build orders in chat, receive QR codes, and pay in-person. Cafe staff get order notifications and status updates via Telegram.

> This is the complete contract for the bot. Implement EVERY entry point, flow, feature, integration, and edge case below. The completeness review checks the bot against this document after each build pass.

## Primary audience

- cafe customers preferring pickup orders

## Success criteria

- User receives order confirmation with QR code
- Cafe staff notified of new orders via Telegram
- Order status updates visible to both user and staff

## Entry points

Every feature must be reachable from the bot's command/button surface (button-first; only /start and /help are slash commands).

- **/start** (command, actor: user, command: /start) — Open main menu with View Menu, View Cart, My Orders, Help
- **View Menu** (button, actor: user, callback: menu:categories) — Browse categorized menu items with add-to-cart buttons
  - inputs: category selection
  - outputs: menu item list
- **View Cart** (button, actor: user, callback: cart:view) — Show current cart contents and subtotal
  - inputs: cart modification requests
  - outputs: cart summary
- **My Orders** (button, actor: user, callback: orders:list) — Display order history and current order status

## Flows

### Order Placement
_Trigger:_ /start or menu interaction

1. Browse menu items with modifiers
2. Add/remove items from cart
3. Confirm order with pickup code generation
4. Notify cafe staff

_Data touched:_ Menu, Order, User

### Order Status Update
_Trigger:_ Staff button press

1. Staff selects order status change
2. System updates order status
3. User receives status notification

_Data touched:_ Order

## Data entities

Durable data (must survive a restart) uses the toolkit's persistent store, never in-memory maps.

- **Menu Item** _(retention: persistent)_ — Available products with pricing and options
  - fields: id, name, price, category, modifiers
- **Order** _(retention: persistent (14 days))_ — User orders with status tracking
  - fields: id, items, total, status, pickup_code
- **User** _(retention: persistent)_ — Telegram user profile data
  - fields: telegram_id, display_name, phone
- **Pickup Token** _(retention: session)_ — Order identification for pickup
  - fields: numeric_code, qr_payload

## Integrations

- **Telegram** (required) — User messaging and staff notifications
- **Telegram Group** (required) — Cafe staff order notifications
Call external APIs against their real contract (correct endpoints, ids, params); credentials from env. Do not fake responses.

## Owner controls

- Menu item management
- Order status updates via staff chat
- Data retention policy configuration

## Notifications

- Order confirmation to user
- New order alert to staff chat
- Status updates to user (confirmed/ready/completed)

## Permissions & privacy

- Collect phone number only when needed for pickup resolution
- Retain orders for 14 days then delete
- No payment data stored

## Edge cases

- User modifies cart after order confirmation
- QR code scanning failures at pickup
- Order expiration during preparation

## Required tests

- End-to-end order flow with QR generation and staff notifications
- Status update propagation from staff to user
- Cart persistence across sessions

## Assumptions

- Menu is preloaded by owner/admin interface (not detailed)
- Staff uses Telegram group for notifications
- Russian is primary bot language
