# AMP CSR Portal

A Customer Service Representative portal for AMP memberships.

## Overview

The AMP CSR Portal is a fully client-side web application built as a response to the AMP take-home challenge. It gives Customer Service Representatives a single, unified interface to look up any registered AMP customer, view their complete account details, and take action on their behalf in real time (fronend only).

Built with **React 18** and **Vite 5** (no TypeScript), the app manages 25 mock customers spanning all four account states (active, paused, overdue, and canceled), each with associated vehicle subscriptions and a varied purchase history. The UI is styled using a custom AMP cobalt/navy design system (CSS custom properties, DM Sans typography, and inline styles throughout) with no external component or CSS libraries.

---

## Key Features

### Required Features

| # | Challenge Requirement | Implementation |
|---|---|---|
| 1 | **View a list of users** | Paginated customer table (10 per page) sortable by customer name, account ID, status, plan, or vehicle count |
| 2 | **Quickly find and view user details** | Full-text search (name, email, account ID) and status filter pills; one click opens a full profile showing account info, vehicle subscriptions, and purchase history |
| 3 | **Edit account information** | Inline edit form on the Account Information card (name, email, phone) with field-level validation; separate Payment Method card with a full card update modal |
| 4 | **View/Edit vehicle subscriptions** | Vehicle Subscriptions card lists all vehicles; CSRs can add, edit (plate, year, make, model, color), or remove any vehicle; all forms enforce required-field validation before saving |

### Beyond Requirements

- **Subscription management**:  Change Plan (with live proration preview), Change Status, Renew Subscription, and Cancel Subscription with a destructive-action confirmation modal
- **Status-aware UI**:  overdue accounts surface Cancel and Renew buttons in the hero; paused accounts hide Change Plan; canceled accounts surface Renew only
- **Purchase History**:  transaction list with type icons (subscription, wash, coupon, refund) and a running total that correctly subtracts credits and refunds, floored at $0.00
- **Form validation**:  red border and label highlighting on empty required fields, with an inline error prompt, across all edit and add forms (account, payment card, vehicle)
- **Toast notifications**:  slide-in confirmation from the top of the screen on every account or subscription change

---

## Quickstart

**Run locally:**

```bash
git clone https://github.com/ivanacha/amp-csr-portal.git
cd amp-csr-portal
npm install
npm run dev
# App available at http://localhost:5173
```

**Live demo:** https://ivanacha.github.io/amp-csr-portal/

---

## File Structure

```
amp-csr-portal/
├── index.html
├── vite.config.js
├── package.json
├── images/                              # Brand assets (imported via ES modules)
│   ├── AMP_Logo_CobaltNavy.png
│   └── AMP_Logo_White.png
└── src/
    ├── main.jsx                         # React entry point
    ├── App.jsx                          # Root: view routing, shared state, toast
    ├── styles/
    │   └── globals.css                  # CSS custom properties, reset, typography
    ├── constants/
    │   └── index.js                     # Plans, statuses, page size, column defs, toast messages
    ├── data/
    │   └── mockData.js                  # 25 customers, vehicle data, transaction history
    ├── services/
    │   └── customerService.js           # Async data layer (mock-backed), API-ready
    ├── utils/
    │   ├── formatters.js                # formatPhone, formatPlate, formatRenewDate
    │   └── helpers.js                   # initials, sortCustomers, calculateProration
    ├── hooks/
    │   ├── useCustomerList.js           # Search, filter, sort, pagination state
    │   └── useCustomerProfile.js        # Modal visibility, renewal eligibility
    ├── components/
    │   ├── Header.jsx                   # Logo, breadcrumb navigation, CSR avatar
    │   ├── Footer.jsx                   # Branding and links
    │   ├── Toast.jsx                    # Auto-dismissing top notification
    │   ├── StatusBadge.jsx              # Colored status dot + label
    │   ├── CustomerList.jsx             # Container: wires hook → CustomerListView
    │   ├── CustomerProfile.jsx          # Container: wires hook → CustomerProfileView
    │   └── ui/
    │       ├── Btn.jsx                  # Button: primary / secondary / ghost / danger variants
    │       ├── Card.jsx                 # Titled section wrapper (header + body)
    │       ├── Field.jsx                # Read/edit toggle input with validation error state
    │       ├── CustomerListView.jsx     # Pure UI: search bar, filters, sortable table, pagination
    │       ├── CustomerProfileView.jsx  # Pure UI: hero, action buttons, card grid
    │       ├── cards/
    │       │   ├── AccountCard.jsx          # Name / email / phone inline edit
    │       │   ├── PaymentCard.jsx          # Masked card display + update modal trigger
    │       │   ├── PlanCard.jsx             # Plan name, monthly charge, renewal date
    │       │   ├── VehicleCard.jsx          # Vehicle grid with add / edit / remove
    │       │   └── PurchaseHistoryCard.jsx  # Transaction list with running total
    │       └── modals/
    │           ├── ChangeStatusModal.jsx        # Active / Paused / Canceled selection
    │           ├── ChangePlanModal.jsx           # Plan selector + proration preview
    │           ├── RenewModal.jsx                # Renewal with charge calculation
    │           ├── CancelSubscriptionModal.jsx   # Destructive action confirmation
    │           ├── CardModal.jsx                 # Payment card form (all fields required)
    │           └── VehicleModal.jsx              # Add / edit vehicle form (all fields required)
    └── __tests__/
        ├── formatters.test.js
        └── customerService.test.js
```

---

## Application Architecture

**Pattern: Layered Container / Presentational**

The codebase is organized into five explicit layers, each with a single responsibility:

### 1. Constants & Pure Utilities

`constants/index.js` is the single source of truth for plan names, prices, status labels, filter options, pagination size (`PAGE_SIZE = 10`), and toast copy. `utils/formatters.js` provides phone (`(XXX) XXX-XXXX`), license plate (`LLL-DDDD`), and date formatting. `utils/helpers.js` provides `initials()`, `sortCustomers()` (handles string, numeric, and name-based sorts), and `calculateProration()` for plan change previews. None of these files import React.

### 2. Service Layer

`services/customerService.js` wraps all data access in async functions with a 150 ms simulated network delay. Every function (e.g. `fetchCustomers`, `fetchCustomerById`, `fetchVehicles`, `fetchTransactions`, `updateCustomer`, `updateVehicles`, `createTransaction`, and more) returns a Promise. Each function body can be swapped for a real `axios` call without touching any component.

### 3. Custom Hooks

`useCustomerList` encapsulates the full list-view state machine: search query, status filter, sort key and direction (with toggle logic), current page, and the memoized `filtered` result set plus its paginated slice and ellipsis page array. Page resets to 1 whenever the query, filter, or sort changes.

`useCustomerProfile` manages modal visibility flags (`showStatusModal`, `showRenewModal`) and derives `isRenewable` from the customer's current status.

### 4. Container Components

`CustomerList` and `CustomerProfile` are thin wiring components. Each consumes a hook and forwards its return values as props to a corresponding pure view. They own no visual markup.

### 5. Presentational Layer

- **Views** (`CustomerListView`, `CustomerProfileView`): full-page layouts that receive all data and handlers as props (no internal state beyond local hover tracking).
- **Cards** (`AccountCard`, `PaymentCard`, `PlanCard`, `VehicleCard`, `PurchaseHistoryCard`): section-level components that own their own local form and modal-open state, and emit changes via `onSave`-style callbacks.
- **Modals**: self-contained forms that validate on submit, call `onSave` on success, and close via `onClose`. All required fields are enforced with red highlighting before the save is allowed.
- **Primitives** (`Btn`, `Card`, `Field`, `StatusBadge`): zero-logic, zero-state building blocks reused throughout the app.

### Data Flow

State is strictly top-down. `App.jsx` owns the customer list, vehicle data, and transaction data, and passes `onUpdateCustomer`, `onUpdateVehicles`, and `onAddTransaction` callbacks down the tree. All mutations flow back up through these callbacks, keeping state changes predictable and traceable to a single source.

### Styling

The design system is defined entirely in `globals.css` via CSS custom properties for brand palette (cobalt, navy, sky blue), status colors (green, yellow, red), surface and border tokens, shadow definitions, and border radii. All component styles are applied as inline style objects. There are no CSS modules, styled-components, or third-party UI libraries.
