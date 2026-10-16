requireLogin();
renderNav();

const form = document.getElementById("customerForm");
const tableBody = document.getElementById("customerTable");
const searchInput = document.getElementById("search");
const cancelBtn = document.getElementById("cancelBtn");

function renderCustomers() {
  const term = searchInput.value.toLowerCase();
  const customers = getData("customers").filter(c =>
    c.name.toLowerCase().includes(term) ||
    c.phone.includes(term) ||
    (c.email || "").toLowerCase().includes(term)
  );

  if (customers.length === 0) {
    tableBody.innerHTML = '<tr><td colspan="5">No customers found.</td></tr>';
    return;
  }

  tableBody.innerHTML = customers.map(c => `
    <tr>
      <td>${escapeHtml(c.name)}</td>
      <td>${escapeHtml(c.phone)}</td>
      <td>${escapeHtml(c.email)}</td>
      <td>${escapeHtml(c.address)}</td>
      <td><button class="small" onclick="editCustomer(${c.id})">Edit</button></td>
    </tr>`).join("");
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const customers = getData("customers");
  const id = document.getElementById("customerId").value;

  const data = {
    name: document.getElementById("name").value.trim(),
    phone: document.getElementById("phone").value.trim(),
    email: document.getElementById("email").value.trim(),
    address: document.getElementById("address").value.trim()
  };

  if (id) {
    const index = customers.findIndex(c => c.id === Number(id));
    customers[index] = { ...customers[index], ...data };
  } else {
    const newId = customers.length ? Math.max(...customers.map(c => c.id)) + 1 : 1;
    customers.push({ id: newId, ...data });
  }

  saveData("customers", customers);
  resetForm();
  renderCustomers();
});

function editCustomer(id) {
  const c = getData("customers").find(c => c.id === id);
  document.getElementById("customerId").value = c.id;
  document.getElementById("name").value = c.name;
  document.getElementById("phone").value = c.phone;
  document.getElementById("email").value = c.email;
  document.getElementById("address").value = c.address;
  document.getElementById("formTitle").textContent = "Edit Customer";
  cancelBtn.style.display = "inline-block";
  window.scrollTo(0, 0);
}

function resetForm() {
  form.reset();
  document.getElementById("customerId").value = "";
  document.getElementById("formTitle").textContent = "Add Customer";
  cancelBtn.style.display = "none";
}

cancelBtn.addEventListener("click", resetForm);
searchInput.addEventListener("input", renderCustomers);

renderCustomers();