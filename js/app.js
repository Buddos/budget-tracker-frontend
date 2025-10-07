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
    console.error("Error fetching transactions:", err);
  }
}

// Add new transaction
async function addTransaction(desc, amount, type) {
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: desc, amount, type }),
    });
    await fetchTransactions();
  } catch (err) {
    console.error("Error adding transaction:", err);
  }
}

// Delete transaction
async function deleteTransaction(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    await fetchTransactions();
  } catch (err) {
    console.error("Error deleting transaction:", err);
  }
}

// Handle form submission
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const desc = document.getElementById("desc").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!desc || isNaN(amount)) return;
  addTransaction(desc, amount, type);
  form.reset();
});

fetchTransactions();
