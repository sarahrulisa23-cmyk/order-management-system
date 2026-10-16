requireLogin();
renderNav();

const form = document.getElementById("productForm");
const tableBody = document.getElementById("productTable");
const searchInput = document.getElementById("search");
const cancelBtn = document.getElementById("cancelBtn");

function renderProducts() {
  const term = searchInput.value.toLowerCase();
  const products = getData("products").filter(p =>
    p.name.toLowerCase().includes(term)
  );

  if (products.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="4">No products found.</td></tr>';
    return;
  }

  tableBody.innerHTML = products.map(p => `
    <tr>
      <td>${escapeHtml(p.name)}</td>
      <td>${escapeHtml(p.description)}</td>
      <td>${Number(p.price).toLocaleString()}</td>
      <td><button class="small" onclick="editProduct(${p.id})">Edit</button></td>
    </tr>`).join("");
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const products = getData("products");
  const id = document.getElementById("productId").value;
  const price = Number(document.getElementById("price").value);

  if (price <= 0) {
    alert("Price must be greater than zero.");
    return;
  }

  const data = {
    name: document.getElementById("name").value.trim(),
    description: document.getElementById("description").value.trim(),
    price: price
  };

  if (id) {
    const index = products.findIndex(p => p.id === Number(id));
    products[index] = { ...products[index], ...data };
  } else {
    const newId = products.length ? Math.max(...products.map(p => p.id)) + 1 : 1;
    products.push({ id: newId, ...data });
  }

  saveData("products", products);
  resetForm();
  renderProducts();
});

function editProduct(id) {
  const p = getData("products").find(p => p.id === id);
  document.getElementById("productId").value = p.id;
  document.getElementById("name").value = p.name;
  document.getElementById("description").value = p.description;
  document.getElementById("price").value = p.price;
  document.getElementById("formTitle").textContent = "Edit Product";
  cancelBtn.style.display = "inline-block";
  window.scrollTo(0, 0);
}

function resetForm() {
  form.reset();
  document.getElementById("productId").value = "";
  document.getElementById("formTitle").textContent = "Add Product";
  cancelBtn.style.display = "none";
}

cancelBtn.addEventListener("click", resetForm);
searchInput.addEventListener("input", renderProducts);

renderProducts();