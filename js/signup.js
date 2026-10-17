document.getElementById("signupForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const email = document.getElementById("email").value.trim();
  const address = document.getElementById("address").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  const confirm = document.getElementById("confirm").value;

  const users = getData("users");
  const customers = getData("customers");

  if (users.some(u => u.username.toLowerCase() === username.toLowerCase())) {
    alert("That username is already taken. Please choose another one.");
    return;
  }
  if (password.length < 6) {
    alert("The password must be at least 6 characters.");
    return;
  }
  if (password !== confirm) {
    alert("The two passwords do not match.");
    return;
  }

  const customerId = customers.length ? Math.max(...customers.map(c => c.id)) + 1 : 1;
  customers.push({ id: customerId, name, phone, email, address });

  const userId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newUser = { id: userId, name, username, password, role: "customer", customerId };
  users.push(newUser);

  saveData("customers", customers);
  saveData("users", users);

  localStorage.setItem("currentUser", JSON.stringify(newUser));
  window.location.href = "my-orders.html";
});