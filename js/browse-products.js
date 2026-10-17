requireCustomer();
renderNav();

const tableBody = document.getElementById("productTable");
const searchInput = document.getElementById("search");

function renderProducts() {
  const term = searchInput.value.toLowerCase();
  const products = getData("products").filter(p =>
    p.name.toLowerCase().includes(term)
  );

  if (products.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="3">No products found.</td></tr>';
    return;
  }

  tableBody.innerHTML = products.map(p => `
    <tr>
      <td>${escapeHtml(p.name)}</td>
      <td>${escapeHtml(p.description)}</td>
      <td>${Number(p.price).toLocaleString()}</td>
    </tr>`).join("");
}

searchInput.addEventListener("input", renderProducts);
renderProducts();