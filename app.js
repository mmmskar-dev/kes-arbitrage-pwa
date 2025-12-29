
const API_URL = "https://fxageai-backend-1.onrender.com/opportunities";

const statusEl = document.getElementById("status");
const oppsEl = document.getElementById("opps");

async function loadOpportunities() {
  statusEl.textContent = "Fetching live P2P arbitrage…";

  try {
    const res = await fetch(API_URL, {
      cache: "no-store"
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      statusEl.textContent = "No arbitrage opportunities right now";
      oppsEl.innerHTML = "";
      return;
    }

    statusEl.textContent = `Top ${data.length} live opportunities`;
    oppsEl.innerHTML = "";

    data.slice(0, 10).forEach(o => {
      const div = document.createElement("div");
      div.className = "opp";

      const spread = Number(o.ksh || 0).toFixed(2);

      div.innerHTML = `
        <div class="route">
          ${o.source} • ${o.fiat} → KES
        </div>
        <div class="spread">
          ${spread} KES
        </div>
      `;

      oppsEl.appendChild(div);
    });

  } catch (err) {
    console.error("Fetch error:", err);
    statusEl.textContent =
      "⚠️ Backend waking up or unreachable. Retrying…";
  }
}

/* Initial load */
loadOpportunities();

/* Auto refresh every 15 seconds */
setInterval(loadOpportunities, 15000);
