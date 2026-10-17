function renderNav() {
  const user = getCurrentUser();
  let links;

  if (user.role === "customer") {
  links = `
  <a href="browse-products.html">Products</a>
  <a href="place-order.html">Place Order</a>
  <a href="my-orders.html">My Orders</a>`;
  } else {
    const usersLink = user.role === "admin" ? '<a href="users.html">Users</a>' : "";
    links = `
      <a href="dashboard.html">Dashboard</a>
      <a href="customers.html">Customers</a>
      <a href="products.html">Products</a>
      <a href="orders.html">Orders</a>
      ${usersLink}`;
  }

  document.getElementById("nav").innerHTML = `
    <nav class="navbar">
      <strong>OMS</strong>
      ${links}
      <span class="spacer"></span>
      <span>${escapeHtml(user.name)} (${user.role})</span>
      <button onclick="logout()">Logout</button>
    </nav>`;
}