
const USDT_KES_RATE = 128.5; // update manually or automate later
const REFRESH_MS = 5000;

const list = document.getElementById("list");

async function fetchBinance() {
  const res = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=USDTKES");
  const data = await res.json();
  return parseFloat(data.price);
}

async function fetchOKX() {
  const res = await fetch("https://www.okx.com/api/v5/market/ticker?instId=USDT-KES");
  const data = await res.json();
  return parseFloat(data.data[0].last);
}

async function update() {
  try {
    const binance = await fetchBinance();
    const okx = await fetchOKX();

    const opportunities = [];

    if (okx > binance) {
      opportunities.push({
        buy: "Binance",
        sell: "OKX",
        spread: (okx - binance)
      });
    }

    if (binance > okx) {
      opportunities.push({
        buy: "OKX",
        sell: "Binance",
        spread: (binance - okx)
      });
    }

    list.innerHTML = "";

    opportunities.forEach(o => {
      const kes = o.spread.toFixed(2);
      list.innerHTML += `
        <div class="card">
          ${o.buy} → ${o.sell}<br>
          USDT / KES<br>
          <span class="profit">+${kes} KES</span>
        </div>
      `;
    });

  } catch (e) {
    list.innerHTML = "<div class='card'>Loading prices…</div>";
  }
}

update();
setInterval(update, REFRESH_MS);
