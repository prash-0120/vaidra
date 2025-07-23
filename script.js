// script.js

// ---------------------- PRICE ESTIMATOR ---------------------
document.getElementById("priceForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const city = document.getElementById("city").value;
  const size = parseInt(document.getElementById("size").value);
  const age = parseInt(document.getElementById("age").value);
  const userPrice = parseInt(document.getElementById("userPrice").value);

  const estimatedPrice = (size * 4800) - (age * 5000);
  const resultDiv = document.getElementById("result");

  let chance = "";
  let color = "";

  if (userPrice <= estimatedPrice * 1.05) {
    chance = "HIGH";
    color = "green";
  } else if (userPrice <= estimatedPrice * 1.2) {
    chance = "MEDIUM";
    color = "orange";
  } else {
    chance = "LOW";
    color = "red";
  }

  resultDiv.innerHTML = `
    <h3>Estimated Price: ₹${estimatedPrice.toLocaleString()}</h3>
    <p style="color:${color}; font-weight: bold;">Sell Chance: ${chance}</p>
    <p>Try pricing near ₹${(estimatedPrice * 1.05).toLocaleString()} for better chance to sell.</p>
  `;
  resultDiv.classList.remove("hidden");
});

// ---------------------- EMI CALCULATOR ---------------------
document.getElementById("emiForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const loan = parseFloat(document.getElementById("loan").value);
  const rate = parseFloat(document.getElementById("rate").value) / 1200;
  const months = parseFloat(document.getElementById("years").value) * 12;

  const emi = loan * rate * (Math.pow(1 + rate, months)) / (Math.pow(1 + rate, months) - 1);
  const result = document.getElementById("emiResult");
  result.innerHTML = `<h3>Monthly EMI: ₹${Math.round(emi).toLocaleString()}</h3>`;
  result.classList.remove("hidden");
});

// ---------------------- PRICE TREND DROPDOWN ---------------------
const cityTrends = {
  "Mumbai": [6800, 7100, 7400, 7700, 8000],
  "Delhi": [5500, 5800, 6000, 6300, 6500],
  "Bangalore": [5200, 5400, 5700, 6000, 6300],
  "Pune": [4700, 5000, 5300, 5600, 5900],
  "Hyderabad": [4800, 5100, 5400, 5700, 6000]
};

const trendSelect = document.getElementById("cityTrendSelect");
const trendChartCanvas = document.getElementById("trendChart").getContext("2d");

let trendChart = new Chart(trendChartCanvas, {
  type: "line",
  data: {
    labels: ["2021", "2022", "2023", "2024", "2025"],
    datasets: []
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom"
      }
    }
  }
});

trendSelect.addEventListener("change", function () {
  const city = trendSelect.value;
  const data = cityTrends[city];

  trendChart.data.datasets = [{
    label: `${city} Avg Price (₹/sq.ft)`,
    data: data,
    borderColor: "#101820",
    fill: false
  }];
  trendChart.update();
});
