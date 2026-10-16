requireLogin();
renderNav();

const STATUSES = ["New", "Processing", "Ready for Delivery", "Delivered", "Cancelled"];

function statusClass(status) {
  return status === "Ready for Delivery" ? "Ready" : status;
}

const orders = getData("orders");
const customers = getData("customers");
const products = getData("products");

const revenue = orders
  .filter(o => o.status !== "Cancelled")
  .reduce((sum, o) => sum + o.total, 0);

document.getElementById("stats").innerHTML = `
  <div class="stat"><div class="number">${orders.length}</div><div class="label">Total orders</div></div>
  <div class="stat"><div class="number">${customers.length}</div><div class="label">Customers</div></div>
  <div class="stat"><div class="number">${products.length}</div><div class="label">Products</div></div>
  <div class="stat"><div class="number">${revenue.toLocaleString()}</div><div class="label">Revenue (excl. cancelled)</div></div>
`;

document.getElementById("statusTable").innerHTML = STATUSES.map(s => {
  const count = orders.filter(o => o.status === s).length;
  return `
    <tr>
      <td><span class="badge ${statusClass(s)}">${s}</span></td>
      <td>${count}</td>
    </tr>`;
}).join("");