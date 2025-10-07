// ✅ Connect frontend to deployed backend API
const API_URL = "https://budget-tracker-backend.onrender.com/api/transactions";

const form = document.getElementById("transaction-form");
const list = document.getElementById("transaction-list");
const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");
const balance = document.getElementById("balance");

let transactions = [];

// Fetch all transactions
async function fetchTransactions() {
  try {
    const res = await fetch(API_URL);
    const data = await res.json();
    transactions = data;
    updateUI();
  } catch (err) {
    console.error("❌ Error fetching transactions:", err);
  }
}

// Add new transaction
async function addTransaction(description, amount, type) {
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description, amount, type }),
    });
    await fetchTransactions();
  } catch (err) {
    console.error("❌ Error adding transaction:", err);
  }
}

// Delete transaction
async function deleteTransaction(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    await fetchTransactions();
  } catch (err) {
    console.error("❌ Error deleting transaction:", err);
  }
}

// Update frontend display
function updateUI() {
  list.innerHTML = "";
  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    const item = document.createElement("li");
    item.className = t.type === "income" ? "income" : "expense";
    item.innerHTML = `
      ${t.description} — KES ${t.amount}
      <button onclick="deleteTransaction(${t.id})">❌</button>
    `;
    list.appendChild(item);

    if (t.type === "income") income += Number(t.amount);
    else expense += Number(t.amount);
  });

  totalIncome.textContent = `KES ${income}`;
  totalExpense.textContent = `KES ${expense}`;
  balance.textContent = `KES ${income - expense}`;
}

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const description = document.getElementById("desc").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!description || isNaN(amount)) return;
  addTransaction(description, amount, type);
  form.reset();
});

// Initial load
fetchTransactions();
