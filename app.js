const API_URL = "https://fxageai-backend-1.onrender.com/opportunities";

const statusEl = document.getElementById("status");
const oppsEl = document.getElementById("opps");

async function loadOpportunities() {
  statusEl.textContent = "Fetching live P2P opportunities…";

  try {
    const res = await fetch(API_URL, { cache: "no-store" });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const data = await res.json();

    if (!Array.isArray(data) || data.length === 0) {
      statusEl.textContent = "No P2P opportunities available";
      oppsEl.innerHTML = "";
      return;
    }

    statusEl.textContent = `Top ${data.length} live opportunities`;
    oppsEl.innerHTML = "";

    data.forEach(o => {
      const div = document.createElement("div");
      div.className = "opp";

      // Safe KES display
      let kshDisplay = "—";
      if (o.ksh && !isNaN(o.ksh)) {
        kshDisplay = o.ksh.toFixed(2);
      }

      div.innerHTML = `
        <div class="route">
          ${o.source} • USDT/${o.fiat}
        </div>
        <div class="spread">
          ${kshDisplay} KES
        </div>
      `;

      oppsEl.appendChild(div);
    });

  } catch (err) {
    console.error(err);
    statusEl.textContent = "⚠️ Backend unreachable. Retrying…";
  }
}

/* Initial load */
loadOpportunities();

/* Auto refresh every 15 seconds */
setInterval(loadOpportunities, 15000);
