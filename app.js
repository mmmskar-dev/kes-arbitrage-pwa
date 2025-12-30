const API = "https://fxageai-backend-1.onrender.com/opportunities";

const status = document.getElementById("status");
const opps = document.getElementById("opps");

async function load() {
  status.textContent = "Ranking arbitrage routes…";
  opps.innerHTML = "";

  try {
    const res = await fetch(API, { cache: "no-store" });
    const routes = await res.json();

    if (!Array.isArray(routes) || routes.length === 0) {
      status.textContent = "No viable arbitrage routes";
      return;
    }

    status.textContent = "Top arbitrage routes (KES 10,000)";

    opps.innerHTML = `
      <div class="grid">
        ${routes.map((r, i) => `
          <div class="opp ${i === 0 ? "best" : "second"}">
            <strong>${i === 0 ? "BEST ROUTE" : "SECOND ROUTE"}</strong><br><br>

            <strong>BUY</strong><br>
            ${r.buy.exchange} • USDT/${r.buy.fiat}<br>
            ${r.buy.ksh} KES<br><br>

            <strong>SELL</strong><br>
            ${r.sell.exchange} • USDT/${r.sell.fiat}<br>
            ${r.sell.ksh} KES<br><br>

            <strong>SPREAD</strong><br>
            ${r.spreadKES} KES / USDT<br><br>

            <strong>PROFIT</strong><br>
            ${r.profitKES} KES
          </div>
        `).join("")}
      </div>
    `;
  } catch (e) {
    status.textContent = "Backend unreachable";
  }
}

load();
setInterval(load, 15000);
