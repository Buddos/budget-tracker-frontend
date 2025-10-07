const API_URL = "http://localhost:5000/api/transactions";

const form = document.getElementById("transaction-form");
const list = document.getElementById("transaction-list");
const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");
const balance = document.getElementById("balance");

let transactions = [];

// =============== Fetch Transactions ===============
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

// =============== Add Transaction ===============
async function addTransaction(desc, amount, type) {
  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ description: desc, amount, type }),
    });
    await fetchTransactions();
  } catch (err) {
    console.error("❌ Error adding transaction:", err);
  }
}

// =============== Delete Transaction ===============
async function deleteTransaction(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    await fetchTransactions();
  } catch (err) {
    console.error("❌ Error deleting transaction:", err);
  }
}

// =============== Form Submission ===============
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const desc = document.getElementById("desc").value.trim();
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;

  if (!desc || isNaN(amount)) return;

  addTransaction(desc, amount, type);
  form.reset();
});

// =============== Update UI ===============
function updateUI() {
  list.innerHTML = "";
  let income = 0;
  let expense = 0;

  transactions.forEach((t) => {
    const li = document.createElement("li");
    li.textContent = `${t.description}: ${t.amount}`;
    li.classList.add(t.type);

    // Add delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "❌";
    delBtn.classList.add("delete-btn");
    delBtn.addEventListener("click", () => deleteTransaction(t.id)); // ✅ PostgreSQL uses `id`
    li.appendChild(delBtn);

    list.appendChild(li);

    if (t.type === "income") income += Number(t.amount);
    else expense += Number(t.amount);
  });

  totalIncome.textContent = income.toFixed(2);
  totalExpense.textContent = expense.toFixed(2);
  balance.textContent = (income - expense).toFixed(2);

  // Only call this if your Chart.js code is included
  if (typeof updateCharts === "function") {
    updateCharts(income, expense);
  }
}

// =============== Initialize ===============
fetchTransactions();
