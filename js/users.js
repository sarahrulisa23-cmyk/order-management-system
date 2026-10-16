requireLogin();
requireAdmin();
renderNav();

const form = document.getElementById("userForm");
const tableBody = document.getElementById("userTable");
const cancelBtn = document.getElementById("cancelBtn");
const roleSelect = document.getElementById("role");
const hint = document.getElementById("formHint");

function renderUsers() {
  const me = getCurrentUser();
  const users = getData("users");

  tableBody.innerHTML = users.map(u => `
    <tr>
      <td>${escapeHtml(u.name)}${u.id === me.id ? " (you)" : ""}</td>
      <td>${escapeHtml(u.username)}</td>
      <td>${escapeHtml(u.role)}</td>
      <td>
        <button class="small" onclick="editUser(${u.id})">Edit</button>
        ${u.id === me.id ? "" : `<button class="small secondary" onclick="deleteUser(${u.id})">Delete</button>`}
      </td>
    </tr>`).join("");
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const users = getData("users");
  const me = getCurrentUser();
  const id = document.getElementById("userId").value;
  const name = document.getElementById("name").value.trim();
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;
  let role = roleSelect.value;

  const taken = users.some(u =>
    u.username.toLowerCase() === username.toLowerCase() && u.id !== Number(id)
  );
  if (taken) {
    alert("That username is already used. Please choose another one.");
    return;
  }

  if (!id && password.length < 6) {
    alert("The password must be at least 6 characters.");
    return;
  }
  if (id && password && password.length < 6) {
    alert("The password must be at least 6 characters.");
    return;
  }

  if (id) {
    const index = users.findIndex(u => u.id === Number(id));
    // An admin cannot change their own role (prevents locking everyone out)
    if (users[index].id === me.id) role = users[index].role;

    users[index] = {
      ...users[index],
      name: name,
      username: username,
      role: role,
      password: password ? password : users[index].password
    };

    if (users[index].id === me.id) {
      localStorage.setItem("currentUser", JSON.stringify(users[index]));
    }
  } else {
    const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
    users.push({ id: newId, name, username, password, role });
  }

  saveData("users", users);
  resetForm();
  renderUsers();
  renderNav();
});

function editUser(id) {
  const u = getData("users").find(u => u.id === id);
  document.getElementById("userId").value = u.id;
  document.getElementById("name").value = u.name;
  document.getElementById("username").value = u.username;
  document.getElementById("password").value = "";
  roleSelect.value = u.role;
  roleSelect.disabled = (u.id === getCurrentUser().id);
  document.getElementById("formTitle").textContent = "Edit User";
  cancelBtn.style.display = "inline-block";
  hint.style.display = "block";
  window.scrollTo(0, 0);
}

function deleteUser(id) {
  if (!confirm("Delete this user? This cannot be undone.")) return;
  const users = getData("users").filter(u => u.id !== id);
  saveData("users", users);
  renderUsers();
}

function resetForm() {
  form.reset();
  document.getElementById("userId").value = "";
  roleSelect.disabled = false;
  document.getElementById("formTitle").textContent = "Add User";
  cancelBtn.style.display = "none";
  hint.style.display = "none";
}

cancelBtn.addEventListener("click", resetForm);

renderUsers();