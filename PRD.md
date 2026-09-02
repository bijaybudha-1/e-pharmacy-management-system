# Product Requirements Document (PRD)

## E-Pharmacy Management System

### 1. Product Overview

**Product Name:** E-Pharmacy Management System
**Version:** 1.0.0
**Product Type:** Backend API and platform for online pharmacy operations

The E-Pharmacy Management System is a platform that lets customers browse medicines, upload and get prescriptions verified by licensed pharmacists, place orders, pay online or on delivery, and track delivery to their door. On the operations side, it gives the pharmacy staff a single system to manage the medicine catalog, stock across batches and expiry dates, suppliers and purchase orders, deliveries, returns, and customer support — with every action controlled by role-based permissions.

This document defines the functional and non-functional requirements for the system. It is derived from the system's entity-relationship model and data dictionary (26 entities across five modules: User & Staff Management, Prescription Management, Order Management, Inventory Management, and Support & Others).

### 2. Target Users

- **Customers:** Browse medicines, upload prescriptions, place and track orders, make payments, request returns, leave reviews, and raise complaints.
- **Pharmacists:** Review and approve or reject uploaded prescriptions before an order containing prescription-only medicines can proceed.
- **Delivery Staff:** Receive delivery assignments, update delivery status, and capture proof of delivery.
- **Inventory Staff:** Manage suppliers, raise purchase orders, receive stock into batches, and monitor expiry and reorder levels.
- **Administrators:** Full system access — manage the medicine catalog, all users and roles, orders, returns, refunds, complaints, and reporting.

### 3. Core Features

#### 3.1 User Authentication & Authorization

- **User Registration:** Account creation with email verification, capturing name, email, phone, and password.
- **User Login:** Secure authentication with JWT access and refresh tokens.
- **Password Management:** Change password, forgot/reset password via emailed token.
- **Email Verification:** Account verification via a time-limited verification token.
- **Profile Management:** Maintain extended profile details (date of birth, gender, profile image, general address) separate from login credentials.
- **Role-Based Access Control:** Five-tier permission system — Admin, Pharmacist, Inventory Staff, Delivery Staff, and Customer — with a user's role determining which endpoints and actions they can access.
- **Account Status:** Accounts can be Active, Inactive, or Suspended; suspended accounts are blocked from logging in.

#### 3.2 Customer & Address Management

- **Customer Profile:** Each customer account tracks accumulated loyalty points alongside their core user record.
- **Saved Addresses:** Customers can save multiple delivery addresses (labelled, e.g. Home/Office), each with recipient name and phone, and mark one as the default.
- **Address Reuse:** A saved address is selected at checkout rather than re-entered per order.

#### 3.3 Medicine Catalog Management

- **Category Management:** Organize medicines into categories (Admin only), each with a name, description, and active/inactive status.
- **Medicine Catalog:** Maintain medicine records with brand name, generic name, description, form (tablet, syrup, injection, etc.), manufacturer, selling price, and optional discount price.
- **Prescription Flag:** Each medicine is flagged as requiring a prescription or not; this flag drives whether an order needs a verified prescription before it can be confirmed.
- **Stock Visibility:** Each medicine has a minimum stock (reorder) threshold used to trigger low-stock alerts, backed by real stock levels tracked at the batch level.
- **Catalog Browsing & Search:** Customers can browse and search medicines by name, category, and manufacturer, and view current price and availability.

#### 3.4 Prescription Management

- **Prescription Upload:** Customers upload a photo of a prescription along with optional notes; the upload is timestamped and starts in "Pending" status.
- **Pharmacist Verification Queue:** Pharmacists see a queue of pending prescriptions awaiting review.
- **Approve/Reject Workflow:** A pharmacist approves or rejects each prescription, with optional remarks, producing an auditable verification record (who verified it and when).
- **Order Gating:** An order containing a prescription-only medicine cannot move past "Confirmed" status until it is linked to an approved prescription.

#### 3.5 Order Management

- **Cart & Checkout:** Customers add medicines to an order, choosing quantity and delivery address, and attach a prescription where required.
- **Order Line Items:** Each order stores the specific medicine, the exact stock batch it was fulfilled from, quantity, unit price, discount, and line subtotal — so historical orders retain the price and batch actually sold, even if the catalog changes later.
- **Order Status Lifecycle:** Pending → Confirmed → Packed → Shipped → Delivered, with Cancelled and Returned as terminal alternate states.
- **Payment Status Tracking:** Each order tracks payment status (Pending, Paid, Failed, Refunded) independently of order fulfillment status.
- **Order History:** Customers can view all past orders; staff can view orders relevant to their role.
- **Order Notes:** Customers or staff can attach a free-text remark to an order (e.g. delivery instructions).

#### 3.6 Payment Processing

- **Multiple Payment Methods:** Support Cash on Delivery (COD) and Online payment.
- **Transaction Recording:** Each payment records the amount, method, an external gateway transaction ID (for online payments), status (Success/Failed/Pending), and payment date.
- **Payment-Order Linkage:** An order can have more than one payment record (e.g. a failed attempt followed by a successful one), all traceable back to the order.

#### 3.7 Delivery Management

- **Delivery Assignment:** Orders ready for dispatch are assigned to an available delivery staff member.
- **Assignment Status Tracking:** Assigned → Picked Up → Out for Delivery → Delivered, with a Failed state for unsuccessful attempts.
- **Delivery Record:** Each completed assignment produces a delivery record capturing pickup time, delivery time, a snapshot of the delivery address, proof of delivery (photo/signature), and delivery remarks.
- **Delivery Staff Availability:** Delivery staff can toggle their own availability so new assignments are only routed to staff who are on duty.

#### 3.8 Returns & Refunds

- **Return Requests:** Customers can request a return on a delivered order, giving a reason.
- **Line-Level Returns:** A return can cover one or more specific order line items, each with its own quantity, reason, and status — supporting partial returns.
- **Return Workflow:** Requested → Approved/Rejected → Completed, with a refund amount recorded once processed.
- **Refund Linkage:** Approved returns feed back into the order's payment status (e.g. moving it to Refunded).

#### 3.9 Inventory & Supply Chain Management

- **Supplier Directory:** Maintain supplier records with contact person, phone, email, address, and active/inactive status.
- **Purchase Orders:** Raise purchase orders against a supplier, listing the medicines, quantities, unit cost, and expected batch/expiry details.
- **Batch-Level Stock:** Incoming stock is received into named batches per medicine, each with its own batch number, manufacture date, expiry date, purchase price, and running current stock.
- **Expiry Tracking:** Batches nearing or past their expiry date can be flagged and excluded from sale (batch status: Active, Expired, Depleted).
- **Stock Transaction Ledger:** Every stock movement (goods received, sold via an order, returned, or manually adjusted) is logged against a batch with a type (In/Out/Adjust), quantity, and a reference back to the source purchase, order, or return — giving a full audit trail of stock levels over time.
- **Low-Stock Alerts:** When a medicine's total available stock falls below its configured minimum, inventory staff are notified to reorder.

#### 3.10 Reviews & Ratings

- **Post-Delivery Reviews:** Customers can rate (1–5) and review a medicine after receiving an order containing it.
- **Public Ratings:** Reviews are visible on the medicine's catalog page to help other customers decide.

#### 3.11 Customer Support (Complaints)

- **Complaint Submission:** Customers can file a complaint with a subject and message, optionally linked to a specific order.
- **Complaint Handling:** Complaints move through Open → In Progress → Closed, handled by administrative staff, with a closed timestamp recorded on resolution.

#### 3.12 Notifications

- **In-App Notifications:** Users receive notifications for events such as order status changes, prescription verification results, delivery updates, and promotions.
- **Read Tracking:** Each notification tracks whether the user has read it, and users can mark notifications as read individually or in bulk.

#### 3.13 System Health

- **Health Check:** A lightweight endpoint reports system status for uptime monitoring and load balancer checks.

### 4. Technical Specifications

#### 4.1 API Endpoint Structure

**Authentication Routes** (`/api/v1/auth/`)

- `POST /register` — User registration
- `POST /login` — User authentication
- `POST /logout` — User logout (secured)
- `GET /current-user` — Get current user info (secured)
- `PUT /profile` — Update user profile (secured)
- `POST /change-password` — Change password (secured)
- `POST /forgot-password` — Request password reset
- `POST /reset-password/:resetToken` — Reset forgotten password
- `GET /verify-email/:verificationToken` — Email verification
- `POST /resend-email-verification` — Resend verification email (secured)
- `POST /refresh-token` — Refresh access token

**Address Routes** (`/api/v1/addresses/`)

- `GET /` — List own addresses (secured)
- `POST /` — Add address (secured)
- `PUT /:addressId` — Update address (secured, owner only)
- `DELETE /:addressId` — Delete address (secured, owner only)
- `PUT /:addressId/default` — Set as default address (secured, owner only)

**Catalog Routes** (`/api/v1/catalog/`)

- `GET /categories` — List categories
- `POST /categories` — Create category (Admin)
- `PUT /categories/:categoryId` — Update category (Admin)
- `DELETE /categories/:categoryId` — Delete category (Admin)
- `GET /medicines` — List/search medicines
- `GET /medicines/:medicineId` — Get medicine details
- `POST /medicines` — Create medicine (Admin)
- `PUT /medicines/:medicineId` — Update medicine (Admin)
- `DELETE /medicines/:medicineId` — Delete/discontinue medicine (Admin)

**Prescription Routes** (`/api/v1/prescriptions/`)

- `POST /` — Upload prescription (secured, Customer)
- `GET /` — List own prescriptions (secured, Customer)
- `GET /:prescriptionId` — Get prescription details (secured, role-based)
- `GET /pending` — List prescriptions awaiting review (secured, Pharmacist)
- `POST /:prescriptionId/verify` — Approve/reject prescription (secured, Pharmacist)

**Order Routes** (`/api/v1/orders/`)

- `POST /` — Place order (secured, Customer)
- `GET /` — List orders, scoped by role (secured)
- `GET /:orderId` — Get order details (secured, role-based)
- `GET /:orderId/items` — List order line items (secured, role-based)
- `PUT /:orderId/status` — Update order status (secured, Admin/Pharmacist/Delivery Staff)
- `POST /:orderId/cancel` — Cancel order (secured, Customer/Admin)

**Payment Routes** (`/api/v1/payments/`)

- `POST /:orderId` — Initiate payment for an order (secured, Customer)
- `GET /:orderId` — Get payment status/history (secured, role-based)
- `POST /webhook` — Payment gateway callback (signature-verified)

**Delivery Routes** (`/api/v1/deliveries/`)

- `GET /assignments` — List own assignments (secured, Delivery Staff)
- `PUT /assignments/:assignmentId/status` — Update assignment status (secured, Delivery Staff)
- `POST /assignments/:assignmentId/complete` — Complete delivery with proof of delivery (secured, Delivery Staff)
- `GET /:orderId` — Get delivery tracking info for an order (secured, role-based)

**Return Routes** (`/api/v1/returns/`)

- `POST /:orderId` — Request a return (secured, Customer)
- `GET /` — List all return requests (secured, Admin)
- `GET /:returnId` — Get return details (secured, role-based)
- `PUT /:returnId/status` — Approve/reject/complete return (secured, Admin)

**Inventory Routes** (`/api/v1/inventory/`)

- `GET /suppliers` — List suppliers (secured, Admin/Inventory Staff)
- `POST /suppliers` — Add supplier (secured, Admin)
- `PUT /suppliers/:supplierId` — Update supplier (secured, Admin)
- `GET /purchase-orders` — List purchase orders (secured, Admin/Inventory Staff)
- `POST /purchase-orders` — Create purchase order (secured, Admin/Inventory Staff)
- `PUT /purchase-orders/:purchaseId/receive` — Receive stock into batches (secured, Admin/Inventory Staff)
- `GET /batches/:medicineId` — List batches and stock for a medicine (secured, Admin/Inventory Staff/Pharmacist)
- `GET /stock-transactions` — View stock movement ledger (secured, Admin/Inventory Staff)
- `POST /stock-transactions/adjust` — Manually adjust stock, with reason (secured, Admin/Inventory Staff)

**Review Routes** (`/api/v1/reviews/`)

- `POST /:orderId` — Submit a review for a delivered order (secured, Customer)
- `GET /medicine/:medicineId` — List reviews for a medicine (public)
- `PUT /:reviewId` — Update own review (secured, Customer)
- `DELETE /:reviewId` — Delete review (secured, Customer/Admin)

**Complaint Routes** (`/api/v1/complaints/`)

- `POST /` — File a complaint (secured, Customer)
- `GET /` — List complaints, scoped by role (secured)
- `GET /:complaintId` — Get complaint details (secured, role-based)
- `PUT /:complaintId/status` — Update complaint status (secured, Admin)

**Notification Routes** (`/api/v1/notifications/`)

- `GET /` — List own notifications (secured)
- `PUT /:notificationId/read` — Mark a notification as read (secured)
- `PUT /read-all` — Mark all notifications as read (secured)

**Health Check** (`/api/v1/healthcheck/`)

- `GET /` — System health status

#### 4.2 Permission Matrix

| Feature                            | Admin | Pharmacist | Inventory Staff | Delivery Staff | Customer |
| ---------------------------------- | :---: | :--------: | :-------------: | :------------: | :------: |
| Manage Categories & Medicines      |   ✓   |     ✗      |        ✗        |       ✗        |    ✗     |
| Browse Catalog                     |   ✓   |     ✓      |        ✓        |       ✗        |    ✓     |
| Upload Prescription                |   ✗   |     ✗      |        ✗        |       ✗        |    ✓     |
| Review/Verify Prescription         |   ✓   |     ✓      |        ✗        |       ✗        |    ✗     |
| Place Order                        |   ✗   |     ✗      |        ✗        |       ✗        |    ✓     |
| View Own Orders                    |   ✓   |     ✗      |        ✗        |       ✗        |    ✓     |
| View/Update All Orders             |   ✓   |    ✓\*     |        ✗        |      ✓\*       |    ✗     |
| Cancel Order                       |   ✓   |     ✗      |        ✗        |       ✗        |    ✓     |
| Process Payment                    |   ✗   |     ✗      |        ✗        |       ✗        |    ✓     |
| View Payment Records               |   ✓   |     ✗      |        ✗        |       ✗        |    ✓†    |
| Manage Delivery Assignments        |   ✓   |     ✗      |        ✗        |       ✓†       |    ✗     |
| Request Return                     |   ✗   |     ✗      |        ✗        |       ✗        |    ✓     |
| Approve/Reject Return              |   ✓   |     ✗      |        ✗        |       ✗        |    ✗     |
| Manage Suppliers & Purchase Orders |   ✓   |     ✗      |        ✓        |       ✗        |    ✗     |
| Receive Stock / Manage Batches     |   ✓   |     ✗      |        ✓        |       ✗        |    ✗     |
| View Stock Ledger                  |   ✓   |     ✗      |        ✓        |       ✗        |    ✗     |
| Submit Review                      |   ✗   |     ✗      |        ✗        |       ✗        |    ✓     |
| File Complaint                     |   ✗   |     ✗      |        ✗        |       ✗        |    ✓     |
| Manage Complaints                  |   ✓   |     ✗      |        ✗        |       ✗        |    ✗     |

\* Scoped to orders containing a prescription pending that pharmacist's review, or assigned to that delivery staff member, respectively.
† Scoped to the customer's own record, or the delivery staff member's own assignments.

#### 4.3 Data Models

The full column-level schema (26 entities, data types, and nullability) is defined separately in the system's **Data Dictionary** and **ER Diagram**. At a summary level, the data model is organized into five modules:

- **User & Staff Management:** Users, Roles, User Profiles, Pharmacists, Delivery Staff
- **Prescription Management:** Prescriptions, Prescription Verifications
- **Order Management:** Customers, Addresses, Orders, Order Items, Delivery Assignments, Deliveries, Payments, Order Returns, Return Items
- **Inventory Management:** Categories, Medicines, Suppliers, Purchase Orders, Purchase Order Items, Medicine Batches, Stock Transactions
- **Support & Others:** Reviews, Complaints, Notifications

**Key Enumerations:**

- **User Status:** `Active`, `Inactive`, `Suspended`
- **Prescription Status:** `Pending`, `Approved`, `Rejected`
- **Order Status:** `Pending`, `Confirmed`, `Packed`, `Shipped`, `Delivered`, `Cancelled`, `Returned`
- **Payment Status:** `Pending`, `Paid`, `Failed`, `Refunded`
- **Payment Method:** `COD`, `Online`
- **Delivery Assignment Status:** `Assigned`, `Picked Up`, `Out for Delivery`, `Delivered`, `Failed`
- **Return Status:** `Requested`, `Approved`, `Rejected`, `Completed`
- **Stock Transaction Type:** `In`, `Out`, `Adjust`
- **Complaint Status:** `Open`, `In Progress`, `Closed`

### 5. Non-Functional Requirements

- **Performance:** Catalog browsing and order placement endpoints should respond within 300 ms under normal load; heavier reporting/ledger queries within 2 seconds.
- **Scalability:** The system should support horizontal scaling of the API layer, with database indexes on all foreign keys and frequently filtered columns (e.g. `order_status`, `expiry_date`).
- **Availability:** Target 99.5% uptime for customer-facing endpoints; the health-check endpoint supports load balancer and monitoring integration.
- **Data Integrity:** Stock levels must always reconcile with the stock transaction ledger; order totals must reconcile with their line items.
- **Auditability:** All prescription verifications, stock adjustments, and order status changes must be traceable to the user who performed them and when.
- **Observability:** Centralized logging and error tracking across all services, with alerting on failed payments and delivery assignment failures.
- **Backup & Recovery:** Automated daily database backups with a defined recovery point objective (RPO) and recovery time objective (RTO).

### 6. Security Features

- JWT-based authentication with short-lived access tokens and longer-lived refresh tokens.
- Role-based authorization middleware enforced on every secured route.
- Passwords stored using a strong one-way hash (e.g. bcrypt/argon2), never in plain text.
- Input validation and sanitization on all endpoints to prevent injection attacks.
- Email verification required before an account can place orders.
- Secure, time-limited tokens for password reset and email verification.
- File upload validation (type, size) for prescription images and proof-of-delivery photos.
- HTTPS enforced in all environments; CORS restricted to approved frontend origins.
- Rate limiting on authentication and payment endpoints to reduce abuse.
- Payment data handled in compliance with PCI-DSS; card details are never stored directly by this system and are delegated to a certified payment gateway.
- Prescription images and personal health-adjacent data are treated as sensitive and access-restricted to the customer, the reviewing pharmacist, and administrators.

### 7. File Management

- **Prescription Images:** Uploaded by customers, stored in secure cloud/object storage, accessible only to the owning customer, verifying pharmacists, and administrators.
- **Proof of Delivery:** Photo or signature captured by delivery staff on completion, linked to the delivery record.
- **Medicine Images:** Product images for catalog display, publicly accessible.
- **File Metadata:** Every stored file tracks its URL, MIME type, and file size.
- **Upload Constraints:** Image uploads limited to common formats (JPEG, PNG, PDF for prescriptions) and a maximum file size (e.g. 5 MB).

### 8. Assumptions & Constraints

- The platform operates within a single country/region's pharmacy regulations at launch; multi-region regulatory variation is out of scope for v1.0.
- Payment processing relies on a third-party payment gateway integration rather than a custom payment engine.
- Delivery is fulfilled by the pharmacy's own delivery staff rather than third-party courier integrations in v1.0.
- Controlled or restricted medicines still route through the same prescription verification workflow; no separate controlled-substance workflow is defined in this version.

### 9. Out of Scope (v1.0)

- Real-time chat between customers and pharmacists/support staff.
- Third-party courier/logistics marketplace integration.
- Multi-currency and cross-border shipping.
- Native mobile applications (this PRD covers the backend API only; clients consume it over REST).
- Integration with external electronic health record (EHR) systems.

### 10. Success Criteria

- Secure, role-based authentication and authorization across all five user roles.
- End-to-end order lifecycle from cart to delivery, including prescription gating for restricted medicines.
- Accurate, auditable stock tracking at the batch level, tied to purchases, sales, and returns.
- Return and refund workflow that reconciles back to order payment status.
- Customer engagement features (reviews, notifications, complaints) functioning end-to-end.
- All API endpoints documented and covered by the permission matrix in Section 4.2.

### 11. Key Performance Indicators (KPIs)

- Average prescription verification turnaround time.
- Order fulfillment time (order placed → delivered).
- On-time delivery rate.
- Stock-out incidents per month (medicines unavailable due to zero batch stock).
- Return/refund rate as a percentage of total orders.
- Customer satisfaction, measured via average medicine rating and complaint resolution time.
