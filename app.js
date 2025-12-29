const API = "https://fxageai-backend-1.onrender.com/opportunities";

async function loadOpps() {
  const status = document.getElementById("status");
  status.innerText = "Fetching live P2P arbitrage...";

  try {
    const res = await fetch(API);

    if (!res.ok) {
      throw new Error("HTTP " + res.status);
    }

    const data = await res.json();

    status.innerText = `Top ${data.length} live opportunities`;

    const container = document.getElementById("opps");
    container.innerHTML = "";

    data.slice(0, 10).forEach(o => {
      const div = document.createElement("div");
      div.style.padding = "8px";
      div.style.borderBottom = "1px solid #ddd";

      div.innerHTML = `
        <strong>${o.route}</strong><br>
        Spread: <strong>${Number(o.spread_ksh).toFixed(2)} KES</strong>
      `;
      container.appendChild(div);
    });

  } catch (err) {
    console.error(err);
    status.innerText = "❌ Backend not reachable";
  }
}

loadOpps();
setInterval(loadOpps, 15000);
