requireLogin();
renderNav();

const orderTable = document.getElementById("orderTable");
const searchInput = document.getElementById("search");
const statusFilter = document.getElementById("statusFilter");

function statusClass(status) {
  return status === "Ready for Delivery" ? "Ready" : status;
}

function renderOrders() {
  const term = searchInput.value.trim().toLowerCase();
  const status = statusFilter.value;
  const customers = getData("customers");

  const orders = getData("orders").filter(o => {
    const customer = customers.find(c => c.id === o.customerId);
    const customerName = customer ? customer.name.toLowerCase() : "";

    const matchesText =
      o.orderNumber.toLowerCase().includes(term) ||
      customerName.includes(term);
    const matchesStatus = !status || o.status === status;

    return matchesText && matchesStatus;
  });

  if (orders.length === 0) {
    orderTable.innerHTML = '<tr><td colspan="6">No orders found.</td></tr>';
    return;
  }

  orderTable.innerHTML = orders.slice().reverse().map(o => {
    const customer = customers.find(c => c.id === o.customerId);
    return `
      <tr>
        <td>${escapeHtml(o.orderNumber)}</td>
        <td>${escapeHtml(customer ? customer.name : "Unknown")}</td>
        <td>${new Date(o.createdAt).toLocaleDateString()}</td>
        <td><span class="badge ${statusClass(o.status)}">${escapeHtml(o.status)}</span></td>
        <td>${Number(o.total).toLocaleString()}</td>
        <td><a class="button" href="order-details.html?id=${o.id}">View</a></td>
      </tr>`;
  }).join("");
}

searchInput.addEventListener("input", renderOrders);
statusFilter.addEventListener("change", renderOrders);

renderOrders();