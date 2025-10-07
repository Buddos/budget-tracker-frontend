let barChart, pieChart;

function updateCharts(income, expense) {
  const ctxBar = document.getElementById("barChart").getContext("2d");
  const ctxPie = document.getElementById("pieChart").getContext("2d");

  // Destroy existing charts before recreating (avoids duplicates)
  if (barChart) barChart.destroy();
  if (pieChart) pieChart.destroy();

  // Bar Chart
  barChart = new Chart(ctxBar, {
    type: "bar",
    data: {
      labels: ["Income", "Expense"],
      datasets: [
        {
          label: "KES",
          data: [income, expense],
          backgroundColor: ["#28a745", "#dc3545"],
          borderRadius: 10,
        },
      ],
    },
    options: {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true } },
    },
  });

  // Pie Chart
  pieChart = new Chart(ctxPie, {
    type: "pie",
    data: {
      labels: ["Income", "Expense"],
      datasets: [
        {
          data: [income, expense],
          backgroundColor: ["#28a745", "#dc3545"],
        },
      ],
    },
    options: { responsive: true },
  });
}
