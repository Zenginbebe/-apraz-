const altyapilar = ['Bookie', 'Digitain', 'XOX'];

function createMacColumn(name, mac) {
  const o = mac.oranlar;
  function row3(arr) {
    return `<tr><td>${arr[0]}</td><td>${arr[1]}</td><td>${arr[2]}</td></tr>`;
  }
  function auRows(obj) {
    return Object.entries(obj).map(([k,v]) => `<tr><td>${k}</td><td>${v[0]}</td><td>${v[1]}</td></tr>`).join('');
  }
  return `
    <div class="column">
      <h2 contenteditable="true">${name}</h2>
      <input type="text" placeholder="URL" />
      <div class="match-title">${mac.ev} - ${mac.dep}</div>

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
    </div>`;
}

function createNoMatchColumn(name) {
  const zeroRow = (label) => `
    <div class="section-title">${label}</div>
    <table>
      <tr><th>Seviye</th><th>Alt</th><th>Üst</th></tr>
      <tr><td>0.5</td><td>0.00</td><td>0.00</td></tr>
      <tr><td>1.5</td><td>0.00</td><td>0.00</td></tr>
      <tr><td>2.5</td><td>0.00</td><td>0.00</td></tr>
    </table>`;

  return `
    <div class="column">
      <h2 contenteditable="true">${name}</h2>
      <input type="text" placeholder="URL" />
      <div class="match-title">Uygun maç bulunamadı</div>
      <div class="section-title">1 - X - 2</div>
      <table><tr><td>1</td><td>X</td><td>2</td></tr><tr><td>0.00</td><td>0.00</td><td>0.00</td></tr></table>
      <div class="section-title">1X - 12 - X2</div>
      <table><tr><td>1X</td><td>12</td><td>X2</td></tr><tr><td>0.00</td><td>0.00</td><td>0.00</td></tr></table>
      ${zeroRow("Toplam")}
      ${zeroRow("Ev Sahibi")}
      ${zeroRow("Deplasman")}
    </div>`;
}

document.getElementById("tara").addEventListener("click", () => {
  const tarih = document.getElementById("tarih").value;
  const container = document.getElementById("columns");
  container.innerHTML = "";
  const uygun = dummyMaclar.find(m => m.tarih === tarih && varsayilanLigler.includes(m.lig));
  altyapilar.forEach(name => {
    container.innerHTML += uygun ? createMacColumn(name, uygun) : createNoMatchColumn(name);
  });
});
