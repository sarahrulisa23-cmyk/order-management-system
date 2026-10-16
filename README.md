# Order Management System

A simple frontend web application for managing customer orders, built during my internship at UP SKILLS HUB.

## Features
- Login with roles (admin and staff)
- Add, edit and search customers
- Add, edit and search products
- Create orders with multiple products and automatic total calculation
- Unique order numbers (ORD-0001, ORD-0002, ...)
- Order details page
- Order statuses: New, Processing, Ready for Delivery, Delivered, Cancelled
- Search orders by order number or customer name, and filter by status
- Dashboard with order totals and a summary by status
- Data saved in the browser (localStorage), so it remains after a page refresh

## Technologies
HTML, CSS and JavaScript (no backend). Data is stored with the browser's localStorage.

## How to run
1. Install Visual Studio Code and the "Live Server" extension.
2. Download or clone this project and open the folder in VS Code.
3. Right-click `index.html` and choose "Open with Live Server".
4. Log in with one of the sample accounts below.

## Sample accounts
| Role  | Username | Password  |
|-------|----------|-----------|
| Admin | samira   | samira123 |
| narada | narada    | staff123  |

## Project structure
```
css/style.css        Styles
js/storage.js        Saving and loading data, sample data
js/auth.js           Login, logout and page protection
js/nav.js            Navigation bar
js/customers.js      Customers page
js/products.js       Products page
js/order-new.js      Create order page
js/orders.js         Order list, search and filter
js/order-details.js  Order details and status updates
js/dashboard.js      Dashboard summary
*.html               The pages
```

## Limitations
- Data is stored only in the browser, so it is not shared between computers.
- Login is simulated and not secure. A real system needs a backend.
- Only sample customer information is used.
- User management (admin only): add, edit and delete staff accounts
## Author
Samira, October 2026