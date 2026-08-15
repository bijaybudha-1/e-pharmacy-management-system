# Product Requirements Document (PRD)

## E-Pharmacy Management System

### 1. Product Overview

**Product Name:** E-Pharmacy Management System
**Version:** 1.0.0
**Product Type:** Full-Stack Web Application for Pharmacy Management and Online Medicine Ordering

The E-Pharmacy Management System is a web-based application designed to digitalize pharmacy operations and provide customers with an online platform for browsing and purchasing medicines.

The system enables customers to search medicines, view medicine information, manage their shopping cart, upload prescriptions, place orders, make payments, track deliveries, and provide reviews.

The system also provides pharmacy staff with tools for prescription verification, medicine management, inventory management, supplier management, order processing, delivery management, reporting, and system administration.

The system uses role-based access control to provide different levels of access to **Customers, Pharmacists, Inventory Managers, Delivery Staff, and Administrators**.

---

### 2. Target Users

- **Administrators:** Manage the complete system, users, medicines, orders, inventory, suppliers, payments, deliveries, reports, and system activities.
- **Pharmacists:** Review and verify prescriptions, manage pharmacy-related medicine information, and process prescription-based orders.
- **Inventory Managers:** Manage medicine stock, batches, suppliers, purchases, stock adjustments, and expiry information.
- **Delivery Staff:** View assigned deliveries, update delivery status, and confirm successful or failed deliveries.
- **Customers:** Browse medicines, upload prescriptions, manage carts, place orders, make payments, track deliveries, and submit reviews or complaints.

---

### 3. Core Features

#### 3.1 User Authentication & Authorization

- **User Registration:** Customer account creation with required personal information.
- **User Login:** Secure user authentication.
- **Logout:** Secure user logout.
- **Password Management:** Change password and forgot/reset password functionality.
- **Profile Management:** View and update personal information.
- **Role-Based Access Control:** Five-level permission system consisting of Admin, Pharmacist, Inventory Manager, Delivery Staff, and Customer.
- **Account Management:** Administrators can activate or deactivate user accounts.
- **Authorization:** Restrict system resources and operations based on user roles.

---

#### 3.2 Medicine Management

- **Medicine Creation:** Add medicines with name, generic name, category, manufacturer, description, price, image, and prescription requirement.
- **Medicine Listing:** View available medicines.
- **Medicine Details:** View complete medicine information.
- **Medicine Updates:** Modify medicine information.
- **Medicine Deactivation:** Deactivate medicines that are no longer available.
- **Medicine Search:** Search medicines by name or generic name.
- **Medicine Filtering:** Filter medicines by category, price, availability, manufacturer, and prescription requirement.
- **Category Management:** Create, update, view, and manage medicine categories.
- **Availability Tracking:** Display current medicine availability to customers.

---

#### 3.3 Prescription Management

- **Prescription Upload:** Customers can upload prescription documents.
- **Prescription Listing:** Authorized pharmacists can view pending prescriptions.
- **Prescription Details:** View prescription information and uploaded documents.
- **Prescription Verification:** Pharmacists can review submitted prescriptions.
- **Prescription Approval:** Pharmacists can approve valid prescriptions.
- **Prescription Rejection:** Pharmacists can reject invalid or unacceptable prescriptions.
- **Verification Remarks:** Pharmacists can provide remarks during prescription verification.
- **Prescription Status Tracking:** Track prescription status from submission to approval or rejection.
- **Prescription History:** Customers and authorized staff can view relevant prescription history.

---

#### 3.4 Shopping Cart Management

- **Cart Creation:** Create a shopping cart for customers.
- **Add Medicine:** Add available medicines to the cart.
- **Update Quantity:** Modify medicine quantities.
- **Remove Medicine:** Remove medicines from the cart.
- **Cart Listing:** View all medicines currently in the cart.
- **Price Calculation:** Calculate item subtotal and total amount.
- **Stock Validation:** Verify medicine availability before checkout.

---

#### 3.5 Order Management

- **Order Creation:** Customers can create orders from their shopping cart.
- **Order Listing:** Customers can view their own orders while authorized staff can view relevant orders.
- **Order Details:** View individual order information and order items.
- **Order Updates:** Authorized staff can update order processing status.
- **Order Cancellation:** Allow eligible orders to be cancelled.
- **Order History:** Customers can view previous orders.
- **Prescription-Based Orders:** Require prescription verification for medicines marked as prescription-required.
- **Order Status Tracking:** Track orders through the complete order lifecycle.
- **Invoice Generation:** Generate order invoices.
- **Stock Update:** Update medicine inventory after successful order processing.

---

#### 3.6 Payment Management

- **Payment Creation:** Create payment records for orders.
- **Cash on Delivery:** Support cash-on-delivery payments.
- **Online Payment:** Support online payment through integrated payment gateways.
- **Payment Verification:** Verify payment transactions.
- **Payment Status Tracking:** Track pending, successful, failed, and refunded payments.
- **Payment History:** Customers can view their payment history.
- **Refund Management:** Authorized administrators can process eligible refunds.

---

#### 3.7 Inventory Management

- **Stock Listing:** View current medicine inventory.
- **Stock Addition:** Add new medicine stock.
- **Stock Adjustment:** Adjust stock quantities when required.
- **Batch Management:** Maintain medicine batch information.
- **Batch Tracking:** Track batch number, manufacture date, expiry date, and quantity.
- **Low Stock Monitoring:** Identify medicines below their minimum stock level.
- **Low Stock Alerts:** Notify inventory managers when stock is low.
- **Expiry Monitoring:** Monitor medicine expiry dates.
- **Expiry Alerts:** Notify inventory managers about medicines approaching expiry.
- **Expired Medicine Management:** Identify and manage expired medicines.
- **Automatic Stock Update:** Update stock based on completed orders and applicable cancellations/returns.

---

#### 3.8 Supplier & Purchase Management

- **Supplier Creation:** Add supplier information.
- **Supplier Listing:** View registered suppliers.
- **Supplier Details:** View supplier information.
- **Supplier Updates:** Modify supplier information.
- **Supplier Deactivation:** Deactivate suppliers where required.
- **Purchase Recording:** Record medicine purchases from suppliers.
- **Purchase History:** View previous medicine purchases.
- **Stock Integration:** Update inventory based on recorded purchases.

---

#### 3.9 Delivery Management

- **Delivery Assignment:** Administrators can assign orders to delivery staff.
- **Delivery Listing:** Delivery staff can view assigned deliveries.
- **Delivery Details:** View order and delivery information.
- **Delivery Status Updates:** Update delivery progress.
- **Order Pickup:** Record when a delivery staff member picks up an order.
- **Out for Delivery:** Mark orders as out for delivery.
- **Delivery Confirmation:** Confirm successful delivery.
- **Failed Delivery:** Record unsuccessful deliveries.
- **Delivery History:** View completed and failed delivery records.
- **Proof of Delivery:** Support OTP, signature, or other delivery confirmation methods where implemented.

---

#### 3.10 Reviews & Ratings

- **Review Creation:** Customers can submit reviews for eligible medicines.
- **Rating Submission:** Customers can provide medicine ratings.
- **Review Listing:** Display approved medicine reviews.
- **Review Moderation:** Administrators can moderate inappropriate reviews.
- **Review Management:** Administrators can remove or manage inappropriate reviews.

---

#### 3.11 Complaint Management

- **Complaint Creation:** Customers can submit complaints.
- **Complaint Listing:** Authorized staff can view complaints.
- **Complaint Details:** View individual complaint information.
- **Complaint Status:** Track complaint status.
- **Complaint Response:** Authorized staff can respond to complaints.
- **Complaint Resolution:** Administrators can manage and close complaints.

---

#### 3.12 Notification Management

- **Order Notifications:** Notify customers about important order status changes.
- **Payment Notifications:** Notify customers about payment success or failure.
- **Prescription Notifications:** Notify customers when prescriptions are approved or rejected.
- **Delivery Notifications:** Notify customers about delivery status.
- **Inventory Alerts:** Notify inventory managers about low stock and expiring medicines.
- **System Notifications:** Provide important system-related notifications.
- **Notification History:** Store user notification records.

---

#### 3.13 Reports & Analytics

- **Sales Reports:** View sales information.
- **Revenue Reports:** View revenue information.
- **Order Reports:** View order statistics.
- **Inventory Reports:** View current inventory information.
- **Expiry Reports:** View medicines approaching or past expiry.
- **Low Stock Reports:** View medicines requiring restocking.
- **Best-Selling Medicines:** Identify medicines with high sales.
- **Customer Reports:** View customer-related statistics.
- **Delivery Reports:** View delivery performance.
- **Dashboard Statistics:** Display important system statistics to authorized users.

---

#### 3.14 System Administration

- **User Management:** Administrators can manage system users.
- **Role Management:** Assign and manage user roles.
- **Medicine Management:** Manage the complete medicine catalog.
- **Category Management:** Manage medicine categories.
- **Order Management:** Monitor and manage all orders.
- **Payment Management:** Monitor payments and refunds.
- **Inventory Management:** Monitor pharmacy inventory.
- **Delivery Management:** Assign and monitor deliveries.
- **Complaint Management:** Manage customer complaints.
- **Audit Logs:** Track important administrative activities.
- **System Settings:** Manage configurable system settings.

---

#### 3.15 System Health

- **Health Check:** API endpoint for checking system availability and service status.
- **Database Status:** Verify database connectivity.
- **Service Monitoring:** Monitor important backend services.

---

### 4. Technical Specifications

#### 4.1 API Endpoints Structure

**Authentication Routes** (`/api/v1/auth/`)

- `POST /register` - Customer registration
- `POST /login` - User authentication
- `POST /logout` - User logout (secured)
- `GET /current-user` - Get current authenticated user (secured)
- `PUT /profile` - Update user profile (secured)
- `POST /change-password` - Change password (secured)
- `POST /forgot-password` - Request password reset
- `POST /reset-password/:resetToken` - Reset forgotten password

---

**User Routes** (`/api/v1/users/`)

- `GET /` - List users (secured, Admin only)
- `GET /:userId` - Get user details (secured, role-based)
- `PUT /:userId` - Update user (secured, Admin or authorized user)
- `DELETE /:userId` - Deactivate user (secured, Admin only)
- `PUT /:userId/role` - Update user role (secured, Admin only)

---

**Medicine Routes** (`/api/v1/medicines/`)

- `GET /` - List medicines
- `POST /` - Create medicine (secured, Admin/Pharmacist)
- `GET /:medicineId` - Get medicine details
- `PUT /:medicineId` - Update medicine (secured, Admin/Pharmacist)
- `DELETE /:medicineId` - Deactivate medicine (secured, Admin)
- `GET /search` - Search and filter medicines

---

**Category Routes** (`/api/v1/categories/`)

- `GET /` - List medicine categories
- `POST /` - Create category (secured, Admin)
- `GET /:categoryId` - Get category details
- `PUT /:categoryId` - Update category (secured, Admin)
- `DELETE /:categoryId` - Deactivate category (secured, Admin)

---

**Prescription Routes** (`/api/v1/prescriptions/`)

- `GET /` - List prescriptions (secured, role-based)
- `POST /` - Upload prescription (secured, Customer)
- `GET /:prescriptionId` - Get prescription details (secured, role-based)
- `PUT /:prescriptionId/verify` - Verify prescription (secured, Pharmacist)
- `PUT /:prescriptionId/approve` - Approve prescription (secured, Pharmacist)
- `PUT /:prescriptionId/reject` - Reject prescription (secured, Pharmacist)
- `GET /my-prescriptions` - Get customer's prescriptions (secured)

---

**Cart Routes** (`/api/v1/cart/`)

- `GET /` - Get current customer's cart (secured)
- `POST /items` - Add medicine to cart (secured)
- `PUT /items/:itemId` - Update cart item quantity (secured)
- `DELETE /items/:itemId` - Remove cart item (secured)
- `DELETE /clear` - Clear cart (secured)

---

**Order Routes** (`/api/v1/orders/`)

- `GET /` - List orders (secured, role-based)
- `POST /` - Create order (secured, Customer)
- `GET /:orderId` - Get order details (secured, role-based)
- `PUT /:orderId/status` - Update order status (secured, authorized staff)
- `POST /:orderId/cancel` - Cancel order (secured)
- `GET /my-orders` - Get customer's orders (secured)
- `GET /:orderId/invoice` - Get order invoice (secured)

---

**Payment Routes** (`/api/v1/payments/`)

- `POST /` - Create payment (secured)
- `GET /:paymentId` - Get payment details (secured, role-based)
- `POST /verify` - Verify payment transaction (secured)
- `GET /order/:orderId` - Get order payment information (secured)
- `POST /:paymentId/refund` - Process refund (secured, Admin)

---

**Inventory Routes** (`/api/v1/inventory/`)

- `GET /` - List inventory (secured, Inventory Manager/Admin)
- `GET /:medicineId` - Get medicine stock information
- `POST /stock` - Add stock (secured, Inventory Manager/Admin)
- `PUT /stock/:batchId` - Update stock (secured, Inventory Manager/Admin)
- `GET /low-stock` - Get low-stock medicines
- `GET /expiring` - Get medicines approaching expiry
- `GET /expired` - Get expired medicines

---

**Supplier Routes** (`/api/v1/suppliers/`)

- `GET /` - List suppliers (secured, Inventory Manager/Admin)
- `POST /` - Create supplier (secured, Inventory Manager/Admin)
- `GET /:supplierId` - Get supplier details
- `PUT /:supplierId` - Update supplier (secured, Inventory Manager/Admin)
- `DELETE /:supplierId` - Deactivate supplier (secured, Admin)

---

**Purchase Routes** (`/api/v1/purchases/`)

- `GET /` - List purchases (secured, Inventory Manager/Admin)
- `POST /` - Record medicine purchase (secured, Inventory Manager)
- `GET /:purchaseId` - Get purchase details
- `PUT /:purchaseId` - Update purchase (secured, Inventory Manager/Admin)

---

**Delivery Routes** (`/api/v1/deliveries/`)

- `GET /` - List deliveries (secured, role-based)
- `GET /assigned` - Get deliveries assigned to current delivery staff (secured)
- `POST /assign` - Assign order to delivery staff (secured, Admin)
- `GET /:deliveryId` - Get delivery details (secured, role-based)
- `PUT /:deliveryId/status` - Update delivery status (secured, Delivery Staff/Admin)
- `POST /:deliveryId/confirm` - Confirm successful delivery (secured, Delivery Staff)

---

**Review Routes** (`/api/v1/reviews/`)

- `GET /medicine/:medicineId` - List medicine reviews
- `POST /` - Create medicine review (secured, Customer)
- `PUT /:reviewId` - Update own review (secured)
- `DELETE /:reviewId` - Delete review (secured, owner/Admin)
- `PUT /:reviewId/moderate` - Moderate review (secured, Admin)

---

**Complaint Routes** (`/api/v1/complaints/`)

- `GET /` - List complaints (secured, role-based)
- `POST /` - Create complaint (secured, Customer)
- `GET /:complaintId` - Get complaint details (secured)
- `PUT /:complaintId/status` - Update complaint status (secured, authorized staff)
- `POST /:complaintId/respond` - Respond to complaint (secured, Admin/authorized staff)

---

**Notification Routes** (`/api/v1/notifications/`)

- `GET /` - List current user notifications (secured)
- `PUT /:notificationId/read` - Mark notification as read (secured)
- `PUT /read-all` - Mark all notifications as read (secured)

---

**Report Routes** (`/api/v1/reports/`)

- `GET /sales` - Sales report (secured, Admin)
- `GET /revenue` - Revenue report (secured, Admin)
- `GET /orders` - Order report (secured, Admin)
- `GET /inventory` - Inventory report (secured, Inventory Manager/Admin)
- `GET /expiry` - Expiry report (secured, Inventory Manager/Admin)
- `GET /delivery` - Delivery report (secured, Admin)
- `GET /dashboard` - Dashboard statistics (secured, Admin)

---

**Health Check** (`/api/v1/healthcheck/`)

- `GET /` - System health status

---

### 4.2 Permission Matrix

| Feature                     | Admin | Pharmacist | Inventory Manager | Delivery Staff | Customer |
| --------------------------- | ----- | ---------- | ----------------- | -------------- | -------- |
| Manage Users                | ✓     | ✗          | ✗                 | ✗              | ✗        |
| Manage Roles                | ✓     | ✗          | ✗                 | ✗              | ✗        |
| View Medicines              | ✓     | ✓          | ✓                 | ✗              | ✓        |
| Create/Update Medicines     | ✓     | ✓          | ✗                 | ✗              | ✗        |
| Manage Categories           | ✓     | ✓          | ✗                 | ✗              | ✗        |
| Upload Prescription         | ✓     | ✗          | ✗                 | ✗              | ✓        |
| Verify Prescription         | ✓     | ✓          | ✗                 | ✗              | ✗        |
| Approve/Reject Prescription | ✓     | ✓          | ✗                 | ✗              | ✗        |
| Manage Cart                 | ✗     | ✗          | ✗                 | ✗              | ✓        |
| Create Order                | ✓     | ✗          | ✗                 | ✗              | ✓        |
| View Own Orders             | ✓     | ✗          | ✗                 | ✓              | ✓        |
| Manage Orders               | ✓     | ✓          | ✓                 | ✗              | ✗        |
| Manage Inventory            | ✓     | View       | ✓                 | ✗              | ✗        |
| Manage Suppliers            | ✓     | ✗          | ✓                 | ✗              | ✗        |
| Manage Purchases            | ✓     | ✗          | ✓                 | ✗              | ✗        |
| Manage Payments             | ✓     | View       | ✗                 | ✗              | Own      |
| Assign Deliveries           | ✓     | ✗          | ✗                 | ✗              | ✗        |
| Update Delivery Status      | ✓     | ✗          | ✗                 | ✓              | ✗        |
| Confirm Delivery            | ✓     | ✗          | ✗                 | ✓              | ✗        |
| Create Reviews              | ✓     | ✗          | ✗                 | ✗              | ✓        |
| Moderate Reviews            | ✓     | ✗          | ✗                 | ✗              | ✗        |
| Create Complaints           | ✓     | ✗          | ✗                 | ✗              | ✓        |
| Manage Complaints           | ✓     | ✓          | ✗                 | ✗              | ✗        |
| View Reports                | ✓     | ✓          | ✓                 | ✓              | Own      |
| System Administration       | ✓     | ✗          | ✗                 | ✗              | ✗        |
| Audit Logs                  | ✓     | ✗          | ✗                 | ✗              | ✗        |

---

### 4.3 Data Models

#### User Roles

- `admin` - Full system access
- `pharmacist` - Prescription verification and pharmacy-level access
- `inventory_manager` - Inventory, supplier, batch, and purchase management
- `delivery_staff` - Assigned delivery management
- `customer` - Medicine browsing, ordering, payment, and customer services

---

#### Order Status

- `pending` - Order created and awaiting processing
- `prescription_verification` - Prescription is being reviewed
- `confirmed` - Order has been confirmed
- `preparing` - Pharmacy is preparing the order
- `ready_for_delivery` - Order is ready for delivery
- `assigned` - Delivery staff has been assigned
- `picked_up` - Delivery staff has collected the order
- `out_for_delivery` - Order is currently being delivered
- `delivered` - Order successfully delivered
- `cancelled` - Order cancelled
- `delivery_failed` - Delivery attempt failed
- `returned` - Order returned

---

#### Prescription Status

- `uploaded` - Prescription has been uploaded
- `pending_review` - Waiting for pharmacist review
- `under_review` - Pharmacist is reviewing prescription
- `approved` - Prescription approved
- `rejected` - Prescription rejected

---

#### Payment Status

- `pending` - Payment has not been completed
- `processing` - Payment is being processed
- `success` - Payment successfully completed
- `failed` - Payment failed
- `refunded` - Payment refunded

---

#### Delivery Status

- `pending` - Delivery awaiting assignment
- `assigned` - Delivery staff assigned
- `picked_up` - Order picked up
- `out_for_delivery` - Order being delivered
- `delivered` - Successfully delivered
- `failed` - Delivery failed
- `returned` - Order returned

---

#### Complaint Status

- `open` - Complaint submitted
- `in_progress` - Complaint is being handled
- `resolved` - Complaint resolved
- `closed` - Complaint closed

---

### 5. Security Features

- JWT-based authentication
- Secure password hashing
- Role-based authorization middleware
- Input validation on all API endpoints
- Request authentication for protected resources
- Secure password reset functionality
- Protected prescription access
- File upload validation
- File type and file size restrictions
- CORS configuration
- API rate limiting
- Secure HTTP/HTTPS communication
- Database constraints and validation
- Audit logging for sensitive operations
- Protection against unauthorized role-based access

---

### 6. File Management

The system shall support secure file management primarily for prescription documents and medicine-related images.

- **Prescription Upload:** Customers can upload prescription documents.
- **Medicine Images:** Authorized users can upload medicine images.
- **Proof of Delivery:** Delivery staff may upload proof of delivery where implemented.
- **File Metadata:** Track file URL/path, MIME type, file size, uploader, and upload date.
- **File Validation:** Validate supported file formats and file sizes.
- **Secure Storage:** Files should be stored using secure local or cloud storage.
- **Access Control:** Prescription files must only be accessible to authorized users.
- **File Management:** Administrators can manage uploaded files where required.

Supported prescription formats may include:

- PDF
- JPG/JPEG
- PNG

---

### 7. Non-Functional Requirements

#### 7.1 Performance

- Normal API requests should respond within approximately 3 seconds under normal system load.
- Medicine search should provide results without unnecessary delay.
- Database queries should be optimized for frequently accessed resources.

#### 7.2 Reliability

- The system should maintain consistent order, payment, and inventory data.
- Failed transactions should not result in inconsistent stock or payment records.
- The system should provide proper error handling.

#### 7.3 Availability

- The system should be available continuously except during planned maintenance.
- The application should recover gracefully from service failures.

#### 7.4 Scalability

- The system should support increasing numbers of users, medicines, orders, prescriptions, and transactions.
- The backend should use a modular architecture that allows future feature expansion.

#### 7.5 Usability

- The user interface should be simple and understandable.
- The application should be responsive on desktop, tablet, and mobile devices.
- Important customer functions should be accessible with minimal navigation.

#### 7.6 Maintainability

- The source code should follow consistent naming and coding conventions.
- Backend modules should be separated into controllers, services, routes, middleware, and data-access components.
- API documentation should be maintained as the system evolves.

#### 7.7 Data Privacy

- Customer information should only be accessible to authorized users.
- Prescription documents must be treated as confidential information.
- Sensitive information must not be unnecessarily exposed through APIs.

#### 7.8 Backup and Recovery

- Database backups should be performed regularly.
- The system should support restoration from available backups.
- Important uploaded files should also be backed up.

---

### 8. Database Entities

The primary database entities include:

- `users`
- `roles`
- `customers`
- `pharmacists`
- `inventory_managers`
- `delivery_staff`
- `addresses`
- `categories`
- `medicines`
- `medicine_batches`
- `suppliers`
- `purchases`
- `purchase_items`
- `prescriptions`
- `prescription_verifications`
- `carts`
- `cart_items`
- `orders`
- `order_items`
- `payments`
- `delivery_assignments`
- `deliveries`
- `reviews`
- `complaints`
- `notifications`
- `audit_logs`

---

### 9. Main System Workflow

```text
Customer
   │
   ▼
Browse Medicines
   │
   ▼
Search / Filter
   │
   ▼
View Medicine Details
   │
   ▼
Add to Cart
   │
   ▼
Checkout
   │
   ├───────────────┐
   │               │
   ▼               ▼
Normal Medicine   Prescription Medicine
   │               │
   │               ▼
   │          Upload Prescription
   │               │
   │               ▼
   │        Pharmacist Verification
   │               │
   │          ┌────┴────┐
   │          ▼         ▼
   │       Approved   Rejected
   │          │         │
   └──────────┘         ▼
             Continue   Customer Notified
                │
                ▼
             Payment
                │
                ▼
          Order Confirmation
                │
                ▼
        Pharmacy Preparation
                │
                ▼
        Inventory Stock Update
                │
                ▼
       Delivery Staff Assignment
                │
                ▼
          Out for Delivery
                │
                ▼
             Delivered
                │
                ▼
          Review / Rating
```

---

### 10. Success Criteria

The E-Pharmacy Management System will be considered successful when:

- Secure user authentication and authorization are implemented.
- Five role-based access levels are correctly enforced.
- Customers can browse and search medicines.
- Customers can add medicines to their cart.
- Customers can successfully place orders.
- Prescription-required medicines cannot be processed without appropriate prescription verification.
- Pharmacists can review, approve, and reject prescriptions.
- Inventory stock is accurately maintained.
- Low-stock and expiry monitoring works correctly.
- Suppliers and medicine purchases can be managed.
- Customers can make supported payment methods.
- Administrators can monitor and manage orders.
- Delivery staff can manage assigned deliveries.
- Customers can track their order status.
- Reviews and complaints can be submitted and managed.
- Notifications are generated for important system events.
- Administrators can view relevant reports and dashboard statistics.
- Protected resources cannot be accessed by unauthorized roles.
- Prescription files are securely managed.
- The system maintains consistent database records.
- The API provides a structured and maintainable endpoint architecture.
- The application can be extended with future features such as mobile applications, GPS delivery tracking, AI-assisted prescription processing, and multi-pharmacy support.
