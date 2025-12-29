const API = "https://fxageai-backend-1.onrender.com/opportunities";

const status = document.getElementById("status");
const opps = document.getElementById("opps");

async function load() {
  status.textContent = "Scanning live P2P arbitrage…";
  opps.innerHTML = "";

  try {
    const res = await fetch(API, { cache: "no-store" });
    const data = await res.json();

    if (data.error) {
      status.textContent = data.error;
      return;
    }

    status.textContent = "Best arbitrage found";

    opps.innerHTML = `
      <div class="opp">
        <strong>BUY</strong><br>
        ${data.buy.exchange} • USDT/${data.buy.fiat}<br>
        ${data.buy.ksh} KES
      </div>

      <div class="opp">
        <strong>SELL</strong><br>
        ${data.sell.exchange} • USDT/${data.sell.fiat}<br>
        ${data.sell.ksh} KES
      </div>

      <div class="opp highlight">
        <strong>SPREAD</strong><br>
        ${data.spreadKES} KES / USDT
      </div>

      <div class="opp profit">
        <strong>PROFIT on 10,000 KES</strong><br>
        ${data.profitKES} KES
      </div>
    `;
  } catch (e) {
    status.textContent = "Backend unreachable";
  }
}

load();
setInterval(load, 15000);
