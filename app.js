const API_URL = "https://fxageai-backend-1.onrender.com/opportunities";

const statusEl = document.getElementById("status");
const oppsEl = document.getElementById("opps");

async function loadOpportunities() {
  statusEl.textContent = "Fetching live P2P prices…";

  try {
    const res = await fetch(API_URL, { cache: "no-store" });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      statusEl.textContent = "No P2P data available";
      oppsEl.innerHTML = "";
      return;
    }

    statusEl.textContent = `Top ${data.length} live corridors`;
    oppsEl.innerHTML = "";

    data.slice(0, 10).forEach(o => {
      const div = document.createElement("div");
      div.className = "opp";

      const kshValue = Number(o.ksh);

      div.innerHTML = `
        <div class="route">
          ${o.source} • USDT/${o.fiat}
        </div>
        <div class="spread">
          ${isNaN(kshValue) ? "—" : kshValue.toFixed(2)} KES
        </div>
      `;

      oppsEl.appendChild(div);
    });

  } catch (err) {
    console.error(err);
    statusEl.textContent =
      "⚠️ Backend waking up or unreachable. Retrying…";
  }
}

loadOpportunities();
setInterval(loadOpportunities, 15000);
