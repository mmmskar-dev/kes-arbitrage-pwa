const USDT_KES = 128.5;

const data = [
  {pair:"USDT/KES", buy:"Binance", sell:"OKX", spread:0.62},
  {pair:"USDT/UGX", buy:"OKX", sell:"Binance", spread:0.48},
  {pair:"USDT/EUR", buy:"Binance", sell:"OKX", spread:0.41}
];

const list = document.getElementById("list");

data.sort((a,b)=>b.spread-a.spread).forEach(d=>{
  const kes = (d.spread * USDT_KES).toFixed(2);
  list.innerHTML += `
    <div class="card">
      ${d.buy} → ${d.sell}<br>
      ${d.pair}<br>
      <span class="profit">+${kes} KES</span>
    </div>
  `;
});
