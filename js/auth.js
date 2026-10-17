function login(username, password) {
  const user = getData("users").find(
    u => u.username.toLowerCase() === username.toLowerCase() && u.password === password
  );
  if (!user) return false;
  localStorage.setItem("currentUser", JSON.stringify(user));
  return true;
}

function getCurrentUser() {
  return JSON.parse(localStorage.getItem("currentUser"));
}

function requireLogin(allowCustomer = false) {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "index.html";
    return;
  }
  if (user.role === "customer" && !allowCustomer) {
    window.location.href = "my-orders.html";
  }
}

function logout() {
  localStorage.removeItem("currentUser");
  window.location.href = "index.html";
}

function requireAdmin() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "index.html";
    return;
  }
  if (user.role === "customer") {
    window.location.href = "my-orders.html";
    return;
  }
  if (user.role !== "admin") {
    alert("Only administrators can open this page.");
    window.location.href = "dashboard.html";
  }
}
function requireCustomer() {
  const user = getCurrentUser();
  if (!user) {
    window.location.href = "index.html";
    return;
  }
  if (user.role !== "customer") {
    window.location.href = "dashboard.html";
  }
}