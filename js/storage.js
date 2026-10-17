function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function escapeHtml(text) {
  const div = document.createElement("div");
  div.textContent = text ?? "";
  return div.innerHTML;
}

function seedData() {
  if (localStorage.getItem("seeded_v2")) return;

  saveData("users", [
    { id: 1, name: "Admin", username: "Admin", password: "Admin1*", role: "admin" },
    { id: 2, name: "Staff User", username: "staff", password: "staff123", role: "staff" }
  ]);

  saveData("customers", [
    { id: 1, name: "Alice Mukamana", phone: "0780000001", email: "alice@example.com", address: "Kigali" },
    { id: 2, name: "Jean Habimana", phone: "0780000002", email: "jean@example.com", address: "Huye" },
    { id: 3, name: "Grace Uwase", phone: "0780000003", email: "grace@example.com", address: "Musanze" },
    { id: 4, name: "Eric Niyonzima", phone: "0780000004", email: "eric@example.com", address: "Rubavu" },
    { id: 5, name: "Diane Ingabire", phone: "0780000005", email: "diane@example.com", address: "Kigali" },
    { id: 6, name: "Patrick Nshuti", phone: "0780000006", email: "patrick@example.com", address: "Muhanga" },
    { id: 7, name: "Chantal Umutoni", phone: "0780000007", email: "chantal@example.com", address: "Kigali" },
    { id: 8, name: "David Mugisha", phone: "0780000008", email: "david@example.com", address: "Rwamagana" },
    { id: 9, name: "Sandrine Uwimana", phone: "0780000009", email: "sandrine@example.com", address: "Nyagatare" },
    { id: 10, name: "Olivier Kamanzi", phone: "0780000010", email: "olivier@example.com", address: "Kigali" }
  ]);

  saveData("products", [
    { id: 1, name: "Coffee", description: "Hot black coffee", price: 1500 },
    { id: 2, name: "Cake slice", description: "Chocolate cake", price: 2500 },
    { id: 3, name: "Cappuccino", description: "Espresso with steamed milk", price: 2000 },
    { id: 4, name: "Tea", description: "Hot tea with milk", price: 1000 },
    { id: 5, name: "Croissant", description: "Freshly baked butter croissant", price: 1800 },
    { id: 6, name: "Sandwich", description: "Chicken and vegetable sandwich", price: 3500 },
    { id: 7, name: "Fruit juice", description: "Fresh passion fruit juice", price: 2200 },
    { id: 8, name: "Samosa", description: "Beef samosa, 2 pieces", price: 1200 },
    { id: 9, name: "Chapati", description: "Soft chapati", price: 800 },
    { id: 10, name: "Milkshake", description: "Vanilla milkshake", price: 3000 }
  ]);

  saveData("orders", []);
  localStorage.setItem("seeded_v2", "true");
}

seedData();
function ensureAdminAccount() {
  if (localStorage.getItem("adminAccountSet")) return;
  const users = getData("users");
  const admin = users.find(u => u.id === 1);
  if (admin) {
    admin.name = "Admin";
    admin.username = "Admin";
    admin.password = "Admin1*";
    admin.role = "admin";
    saveData("users", users);
  }
  localStorage.setItem("adminAccountSet", "true");
}
ensureAdminAccount();