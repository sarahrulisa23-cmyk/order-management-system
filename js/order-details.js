requireLogin();
renderNav();

const params = new URLSearchParams(window.location.search);
const orderId = Number(params.get("id"));

function statusClass(status) {
  return status === "Ready for Delivery" ? "Ready" : status;
}

function showOrder() {
  const orders = getData("orders");
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    document.querySelector(".page").innerHTML =
      '<p><a href="orders.html">&larr; Back to orders</a></p><h1>Order not found</h1>';
    return;
  }

  const customer = getData("customers").find(c => c.id === order.customerId) || {};
  const products = getData("products");

  document.getElementById("orderTitle").textContent = "Order " + order.orderNumber;
  document.getElementById("custName").textContent = customer.name || "Unknown";
  document.getElementById("custPhone").textContent = customer.phone || "-";
  document.getElementById("custEmail").textContent = customer.email || "-";
  document.getElementById("custAddress").textContent = customer.address || "-";
  document.getElementById("orderDate").textContent = new Date(order.createdAt).toLocaleString();

  document.getElementById("itemsTable").innerHTML = order.items.map(i => {
    const product = products.find(p => p.id === i.productId);
    return `
      <tr>
        <td>${escapeHtml(product ? product.name : "Deleted product")}</td>
        <td>${Number(i.unitPrice).toLocaleString()}</td>
        <td>${i.quantity}</td>
        <td>${(i.quantity * i.unitPrice).toLocaleString()}</td>
      </tr>`;
  }).join("");

  document.getElementById("total").textContent = Number(order.total).toLocaleString();

  const badge = document.getElementById("currentStatus");
  badge.textContent = order.status;
  badge.className = "badge " + statusClass(order.status);

  const closed = order.status === "Delivered" || order.status === "Cancelled";
  document.getElementById("statusControls").style.display = closed ? "none" : "block";
  document.getElementById("lockedMessage").style.display = closed ? "block" : "none";
  document.getElementById("statusSelect").value = order.status;
}

document.getElementById("updateStatusBtn").addEventListener("click", function () {
  const newStatus = document.getElementById("statusSelect").value;
  const orders = getData("orders");
  const index = orders.findIndex(o => o.id === orderId);

  if (newStatus === "Cancelled" && !confirm("Cancel this order? This cannot be undone.")) {
    return;
  }

  orders[index].status = newStatus;
  saveData("orders", orders);
  showOrder();
});

showOrder();