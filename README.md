# Order Management System

A frontend web application for managing customer orders, built during my training at UP SKILLS HUB.

- Live website: [paste your Netlify link here]
- Source code: https://github.com/sarahrulisa23-cmyk/order-management-system

## Features

**Administrator and staff**
- Login with roles (administrator, staff and customer)
- Add, edit and search customers
- Add, edit and search products, with prices and descriptions
- Create orders with several products and an automatic total
- Unique order numbers (ORD-0001, ORD-0002, ...)
- Order details page
- Order statuses: New, Processing, Ready for Delivery, Delivered, Cancelled
- Search orders by order number or customer name, and filter by status
- Dashboard with totals and a summary of orders by status
- User management for staff accounts (administrator only)

**Customers**
- Sign up for an account from the login page
- Browse the product list (read only)
- Place their own orders
- See their own orders and the status of each one

Data is saved in the browser (localStorage), so it remains after a page refresh.

## Technologies

HTML, CSS and JavaScript (no backend). Data is stored with the browser's localStorage.

## How to run

1. Install Visual Studio Code and the "Live Server" extension.
2. Download or clone this project and open the folder in VS Code.
3. Right-click `index.html` and choose "Open with Live Server".
4. Log in with an account below, or sign up as a customer.

## Accounts

| Role          | Username                    | Password               |
|---------------|-----------------------------|------------------------|
| Administrator | Admin                       | Admin1*                |
| Staff         | staff                       | staff123               |
| Customer      | Sign up on the login page   | Chosen when signing up |

## Project structure

```
index.html            Login page
signup.html           Customer sign-up page
dashboard.html        Dashboard
customers.html        Customers page
products.html         Products page
order-new.html        Create an order (staff)
orders.html           Order list, search and filter
order-details.html    Order details and status update
users.html            User management (administrator)
my-orders.html        Customer's own orders and status
browse-products.html  Customer product list (read only)
place-order.html      Customer places an order
css/style.css         Styles

js/storage.js         Saving and loading data, sample data
js/auth.js            Login, logout and page protection
js/nav.js             Navigation bar
js/customers.js       Customers page
js/products.js        Products page
js/order-new.js       Create order page (staff)
js/orders.js          Order list, search and filter
js/order-details.js   Order details and status updates
js/dashboard.js       Dashboard summary
js/users.js           Admin user management
js/signup.js          Customer sign up
js/my-orders.js       Customer's own orders
js/browse-products.js Customer product list and search
js/place-order.js     Customer order creation
```

## Limitations

- Data is stored only in the browser, so it is not shared between computers.
- Login is simulated and passwords are stored as plain text. A real system needs a backend and hashed passwords.
- Customers cannot cancel an order after placing it.
- Only sample information should be used.

## Author

SAMIRA, UP SKILLS HUB,0ctober 2026