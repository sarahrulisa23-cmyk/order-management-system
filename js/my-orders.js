requireLogin(true);

const user = getCurrentUser();
if (user.role !== "customer") {
  window.location.href = "dashboard.html";
}

renderNav();

function statusClass(status) {
  return status === "Ready for Delivery" ? "Ready" : status;
}

const customer = getData("customers").find(c => c.id === user.customerId) || {};
const products = getData("products");

document.getElementById("welcome").textContent = "Welcome, " + user.name;
document.getElementById("myPhone").textContent = customer.phone || "-";
document.getElementById("myEmail").textContent = customer.email || "-";
document.getElementById("myAddress").textContent = customer.address || "-";

const orders = getData("orders")
  .filter(o => o.customerId === user.customerId)
  .reverse();

const tableBody = document.getElementById("orderTable");

if (orders.length === 0) {
  tableBody.innerHTML = '<tr><td colspan="5">You have no orders yet.</td></tr>';
} else {
  tableBody.innerHTML = orders.map(o => {
    const items = o.items.map(i => {
      const p = products.find(p => p.id === i.productId);
      return (p ? p.name : "Deleted product") + " x" + i.quantity;
    }).join(", ");

    return `
      <tr>
        <td>${escapeHtml(o.orderNumber)}</td>
        <td>${new Date(o.createdAt).toLocaleDateString()}</td>
        <td>${escapeHtml(items)}</td>
        <td><span class="badge ${statusClass(o.status)}">${escapeHtml(o.status)}</span></td>
        <td>${Number(o.total).toLocaleString()}</td>
      </tr>`;
  }).join("");
}