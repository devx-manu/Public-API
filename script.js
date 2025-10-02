const userContainer = document.getElementById('user-container');
const errorDiv = document.getElementById('error');
const reloadBtn = document.getElementById('reload-btn');

// Function to fetch and display users
async function fetchUsers() {
  userContainer.innerHTML = "";
  errorDiv.textContent = "";

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    if (!response.ok) {
      throw new Error("Failed to fetch data. Status: " + response.status);
    }

    const users = await response.json();

    users.forEach(user => {
      const card = document.createElement('div');
      card.classList.add('user-card');

      card.innerHTML = `
        <h3>${user.name}</h3>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>Address:</strong> ${user.address.street}, ${user.address.city}</p>
      `;

      userContainer.appendChild(card);
    });
  } catch (error) {
    errorDiv.textContent = "⚠️ Error: " + error.message;
  }
}

// Load users on first page load
fetchUsers();

// Reload button click event
reloadBtn.addEventListener('click', fetchUsers);
