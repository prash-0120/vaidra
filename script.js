const cityRates = {
  "mumbai": 9500,
  "delhi": 8000,
  "bangalore": 7800,
  "hyderabad": 6800,
  "pune": 6000,
  "navi mumbai": 8500,
  "thane": 7200,
  "panvel": 6200,
  "ahmedabad": 5600,
  "surat": 5000,
  "nagpur": 4500,
  "jaipur": 4700,
  "lucknow": 4200,
  "chennai": 7400,
  "kolkata": 6000,
  "kochi": 5100,
  "bhopal": 3900,
  "indore": 4600,
  "patna": 4100,
  "ranchi": 3800,
  "guwahati": 4300,
  "other": 4800
};

document.getElementById("priceForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const inputs = document.querySelectorAll("#priceForm input");
  const city = inputs[0].value.toLowerCase().trim();
  const sizeInput = inputs[2].value;
  const priceInput = inputs[3].value;
  const age = parseInt(inputs[4].value);

  const size = parseNumber(sizeInput);
  const userPrice = parseNumber(priceInput);

  let ratePerSqft = cityRates[city] || cityRates["other"];
  let basePrice = size * ratePerSqft;
  let depreciation = age * 4000;
  let estimatedPrice = basePrice - depreciation;

  let chance = "";
  let indicatorClass = "";

  if (userPrice <= estimatedPrice * 1.05) {
    chance = "HIGH";
    indicatorClass = "green";
  } else if (userPrice <= estimatedPrice * 1.2) {
    chance = "MEDIUM";
    indicatorClass = "yellow";
  } else {
    chance = "LOW";
    indicatorClass = "red";
  }

  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = `
    <h3>Estimated Price: ₹${estimatedPrice.toLocaleString()}</h3>
    <div class="indicator ${indicatorClass}">Sell Chance: ${chance}</div>
    <p style="margin-top: 8px; font-size: 0.95rem; color: #555;">
      Based on location trends and property condition.
    </p>
  `;
  resultDiv.classList.remove("hidden");
  resultDiv.classList.add("fade-in");
});

function parseNumber(input) {
  input = input.toLowerCase().replace(/,/g, '').trim();

  if (input.includes("crore")) {
    return parseFloat(input) * 10000000;
  }
  if (input.includes("lakh")) {
    return parseFloat(input) * 100000;
  }

  return parseFloat(input);
}

function submitComment() {
  const comment = document.getElementById("commentBox").value.trim();
  if (comment) {
    const li = document.createElement("li");
    li.textContent = comment;
    document.getElementById("commentList").appendChild(li);
    document.getElementById("commentBox").value = "";
  }
}