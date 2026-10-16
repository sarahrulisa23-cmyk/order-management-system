function renderNav() {
  const user = getCurrentUser();
  const usersLink = user.role === "admin" ? '<a href="users.html">Users</a>' : "";

  document.getElementById("nav").innerHTML = `
    <nav class="navbar">
      <strong>OMS</strong>
      <a href="dashboard.html">Dashboard</a>
      <a href="customers.html">Customers</a>
      <a href="products.html">Products</a>
      <a href="orders.html">Orders</a>
      ${usersLink}
      <span class="spacer"></span>
      <span>${escapeHtml(user.name)} (${user.role})</span>
      <button onclick="logout()">Logout</button>
    </nav>`;
}