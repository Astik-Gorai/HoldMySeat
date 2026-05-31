# Inventory / Seat Management Service

The **Inventory / Seat Management Service** acts as the single source of truth for all seat states. It is the core engine of the entire booking system, managing high-concurrency state transitions and ensuring data consistency.

## Core Responsibilities

- **Availability Tracking:** Maintaining real-time status of every seat for a given event/show.
- **Seat Locking (Holding):** Temporarily reserving seats to prevent double-booking during checkout.
- **Seat Release:** Automatically freeing up held seats if a timeout occurs or checkout is canceled.
- **Booking Finalization:** Permanently updating seat statuses upon successful payment.

---

## Seat Lifecycle & State Machine

Seats move through a strict, linear state progression to ensure data integrity:
[ AVAILABLE ] ──( Hold Seats )──> [ HELD ] ──( Confirm Booking )──> [ BOOKED ]
▲                                │
│─────────( Release Seats )──────┘

## API Specifications

### 0. Initialize Seats

Sets up the initial grid or inventory map for a specific show.

- **Endpoint:** `POST /inventory/initialize`
- **Description:** Provisions `AVAILABLE` seats in the system when a new show or event is created.

### 1. Get Seat Heatmap

Retrieves the current layout and real-time availability status of all seats for a specific show.

- **Endpoint:** `GET /inventory/show/:showId/seats`
- **Response:** Returns a map of seat IDs paired with their current status (`AVAILABLE`, `HELD`, `BOOKED`).

### 2. Hold Seats

Temporarily locks one or more seats for a user during the checkout window.

- **Endpoint:** `POST /inventory/hold`
- **Payload:** Includes `showId`, `seatIds[]`, and `userId`.
- **Behavior:** Transitions seats from `AVAILABLE` to `HELD`. Starts a TTL (Time-To-Live) countdown timer.

### 3. Release Seats

Explicitly unlocks seats if a user abandons their cart, or via an automated cron job if the hold timer expires.

- **Endpoint:** `POST /inventory/release`
- **Behavior:** Transitions seats from `HELD` back to `AVAILABLE`.

### 4. Confirm Booking

Permanently closes the inventory lock after successful payment confirmation.

- **Endpoint:** `POST /inventory/confirm`
- **Behavior:** Transitions seats from `HELD` to `BOOKED`



### APIS:

- POST /inventory/init-show
- GET  /inventory/show/:showId/seats
- POST /inventory/hold
- POST /inventory/release
- POST /inventory/book

