const API = "https://fxageai-backend-1.onrender.com/opportunities";

async function load() {
  const res = await fetch(API);
  const data = await res.json();

  const grid = document.getElementById("grid");
  grid.innerHTML = "";

  if (!data.corridors || !data.corridors.length) {
    grid.innerHTML = "<p>No retail signals right now.</p>";
    return;
  }

  data.corridors.forEach((c, i) => {
    const div = document.createElement("div");
    div.className = `opp ${i === 0 ? "best" : "second"}`;

    div.innerHTML = `
      <strong>${c.route}</strong><br/>
      Buy USDT: ${c.buyKES} KES<br/>
      Sell USDT: ${c.sellFiat}<br/>
      Implied FX: ${c.impliedFX}<br/>
      Market FX: ${c.marketFX}<br/>
      Deviation: ${c.deviation}%<br/>
      Profit (10k): ${c.profitKES} KES<br/>
      <b>Status: ${c.status}</b>
    `;
    grid.appendChild(div);
  });
}

load();
setInterval(load, 30000); // refresh every 30s
