
const REFRESH_MS = 5000;
const USDT_KES = 128.5; // manual rate for now

const list = document.getElementById("list");

async function fetchBinance() {
  const r = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=USDTUSD");
  const j = await r.json();
  return parseFloat(j.price);
}

async function fetchOKX() {
  const r = await fetch("https://www.okx.com/api/v5/market/ticker?instId=USDT-USD");
  const j = await r.json();
  return parseFloat(j.data[0].last);
}

async function update() {
  list.innerHTML = "<div class='card'>Loading live prices…</div>";

  try {
    const binance = await fetchBinance();
    const okx = await fetchOKX();

    const spreadUSD = Math.abs(okx - binance);
    const spreadKES = (spreadUSD * USDT_KES).toFixed(2);

    list.innerHTML = `
      <div class="card">
        Binance ↔ OKX<br>
        USDT (USD proxy)<br>
        <span class="profit">+${spreadKES} KES</span>
      </div>
    `;
  } catch (e) {
    list.innerHTML = "<div class='card'>Price fetch blocked — retrying…</div>";
  }
}

update();
setInterval(update, REFRESH_MS);
