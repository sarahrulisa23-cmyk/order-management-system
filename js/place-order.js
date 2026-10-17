requireCustomer();
renderNav();

const user = getCurrentUser();
let items = [];

const productSelect = document.getElementById("productSelect");
const quantityInput = document.getElementById("quantity");
const itemsTable = document.getElementById("itemsTable");
const totalEl = document.getElementById("total");

document.getElementById("whoAmI").textContent = user.name;

function loadProducts() {
  productSelect.innerHTML = '<option value="">-- Select a product --</option>' +
    getData("products").map(p =>
      `<option value="${p.id}">${escapeHtml(p.name)} - ${Number(p.price).toLocaleString()}</option>`
    ).join("");
}

function addItem() {
  const productId = Number(productSelect.value);
  const quantity = Number(quantityInput.value);

  if (!productId) {
    alert("Please select a product.");
    return;
  }
  if (!Number.isInteger(quantity) || quantity <= 0) {
    alert("Quantity must be a whole number greater than zero.");
    return;
  }

  const product = getData("products").find(p => p.id === productId);
  const existing = items.find(i => i.productId === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    items.push({
      productId: product.id,
      name: product.name,
      quantity: quantity,
      unitPrice: product.price
    });
  }

  productSelect.value = "";
  quantityInput.value = 1;
  renderItems();
}

function removeItem(productId) {
  items = items.filter(i => i.productId !== productId);
  renderItems();
}

function calculateTotal() {
  return items.reduce((sum, i) => sum + i.quantity * i.unitPrice, 0);
}

function renderItems() {
  if (items.length === 0) {
    itemsTable.innerHTML = '<tr><td colspan="5">No products added yet.</td></tr>';
  } else {
    itemsTable.innerHTML = items.map(i => `
      <tr>
        <td>${escapeHtml(i.name)}</td>
        <td>${Number(i.unitPrice).toLocaleString()}</td>
        <td>${i.quantity}</td>
        <td>${(i.quantity * i.unitPrice).toLocaleString()}</td>
        <td><button class="small secondary" onclick="removeItem(${i.productId})">Remove</button></td>
      </tr>`).join("");
  }
  totalEl.textContent = calculateTotal().toLocaleString();
}

function placeOrder() {
  if (items.length === 0) {
    alert("Please add at least one product to your order.");
    return;
  }

  const orders = getData("orders");
  const nextId = orders.length ? Math.max(...orders.map(o => o.id)) + 1 : 1;
  const orderNumber = "ORD-" + String(nextId).padStart(4, "0");

  orders.push({
    id: nextId,
    orderNumber: orderNumber,
    customerId: user.customerId,
    status: "New",
    total: calculateTotal(),
    createdAt: new Date().toISOString(),
    items: items.map(i => ({
      productId: i.productId,
      quantity: i.quantity,
      unitPrice: i.unitPrice
    }))
  });

  saveData("orders", orders);
  alert("Your order has been placed. Order number: " + orderNumber);
  window.location.href = "my-orders.html";
}

document.getElementById("addItemBtn").addEventListener("click", addItem);
document.getElementById("placeOrderBtn").addEventListener("click", placeOrder);

loadProducts();
renderItems();