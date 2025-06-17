
const altyapilar = ['Bookie', 'Digitain', 'XOX'];

function createMacColumn(name, mac) {
  const o = mac.oranlar;
  function row3(arr) {
    return `<tr><td class="odd">${arr[0]}</td><td class="odd">${arr[1]}</td><td class="odd">${arr[2]}</td></tr>`;
  }
  function auRows(obj) {
    return Object.entries(obj).map(([k,v]) => 
      `<tr><td>${k}</td><td class="odd">${v[0]}</td><td class="odd">${v[1]}</td></tr>`
    ).join('');
  }
  return `
    <div class="column">
      <h2 contenteditable="true">${name}</h2>
      <input type="text" placeholder="URL" value="https://example.com" />
      <div class="match-title">${mac.ev} - ${mac.dep}</div>

      <div class="hidden-block">
        <div class="section-title">1 - X - 2</div>
        <table><tr><td>1</td><td>X</td><td>2</td></tr>${row3(o["1X2"])}</table>

        <div class="section-title">1X - 12 - X2</div>
        <table><tr><td>1X</td><td>12</td><td>X2</td></tr>${row3(o["Çifte Şans"])}</table>

        <div class="section-title">Toplam</div>
        <table><tr><th>Seviye</th><th>Alt</th><th>Üst</th></tr>${auRows(o["Toplam"])}</table>

        <div class="section-title">${mac.ev}</div>
        <table><tr><th>Seviye</th><th>Alt</th><th>Üst</th></tr>${auRows(o["Ev"])}</table>

        <div class="section-title">${mac.dep}</div>
        <table><tr><th>Seviye</th><th>Alt</th><th>Üst</th></tr>${auRows(o["Dep"])}</table>
      </div>
    </div>`;
}

function createNoMatchColumn(name) {
  const zeroRow = (label) => `
    <div class="section-title">${label}</div>
    <table>
      <tr><th>Seviye</th><th>Alt</th><th>Üst</th></tr>
      <tr><td>0.5</td><td class="odd">0.00</td><td class="odd">0.00</td></tr>
      <tr><td>1.5</td><td class="odd">0.00</td><td class="odd">0.00</td></tr>
      <tr><td>2.5</td><td class="odd">0.00</td><td class="odd">0.00</td></tr>
    </table>`;

  return `
    <div class="column">
      <h2 contenteditable="true">${name}</h2>
      <input type="text" placeholder="URL" value="https://example.com" />
      <div class="match-title">Uygun maç bulunamadı</div>
      <div class="hidden-block">
        <div class="section-title">1 - X - 2</div>
        <table><tr><td>1</td><td>X</td><td>2</td></tr><tr><td class="odd">0.00</td><td class="odd">0.00</td><td class="odd">0.00</td></tr></table>
        <div class="section-title">1X - 12 - X2</div>
        <table><tr><td>1X</td><td>12</td><td>X2</td></tr><tr><td class="odd">0.00</td><td class="odd">0.00</td><td class="odd">0.00</td></tr></table>
        ${zeroRow("Toplam")}
        ${zeroRow("Ev Sahibi")}
        ${zeroRow("Deplasman")}
      </div>
    </div>`;
}

function highlightMaxOdds() {
  document.querySelectorAll("table").forEach(table => {
    const rows = table.querySelectorAll("tr");
    if (rows.length < 2) return;
    const cells = Array.from(rows[1].querySelectorAll("td.odd"));
    const values = cells.map(td => parseFloat(td.textContent) || 0);
    const max = Math.max(...values);
    cells.forEach(td => {
      td.classList.toggle("highlight", parseFloat(td.textContent) === max);
    });
  });
}

function storeInitialValues() {
  document.querySelectorAll("td.odd").forEach(td => {
    const val = parseFloat(td.textContent);
    if (!isNaN(val)) td.dataset.prev = val;
  });
}

function simulateChanges() {
  document.querySelectorAll("td.odd").forEach(td => {
    const prev = parseFloat(td.dataset.prev);
    if (isNaN(prev)) return;

    let newVal = prev;
    const r = Math.random();
    if (r < 0.33) newVal = +(prev + 0.05).toFixed(2);
    else if (r < 0.66) newVal = +(prev - 0.05).toFixed(2);

    const changed = newVal !== prev;
    td.dataset.prev = newVal;
    td.innerHTML = newVal + (changed ? (newVal > prev ? '<span class="change-indicator up">🔼</span>' : '<span class="change-indicator down">🔻</span>') : '');
  });
  highlightMaxOdds();
}

function initAkordeon() {
  document.querySelectorAll(".match-title").forEach(title => {
    title.addEventListener("click", () => {
      document.querySelectorAll(".column .hidden-block").forEach(block => {
        block.classList.toggle("hidden-block");
      });
    });
  });
}

document.getElementById("tara").addEventListener("click", () => {
  const tarih = document.getElementById("tarih").value;
  const container = document.getElementById("columns");
  container.innerHTML = "";
  const uygun = dummyMaclar.find(m => m.tarih === tarih && varsayilanLigler.includes(m.lig));
  altyapilar.forEach(name => {
    container.innerHTML += uygun ? createMacColumn(name, uygun) : createNoMatchColumn(name);
  });

  setTimeout(() => {
    storeInitialValues();
    highlightMaxOdds();
    initAkordeon();
  }, 100);
  setInterval(simulateChanges, 5000);
});
