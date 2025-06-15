async function yukleOranlar() {
  const oranlarDiv = document.getElementById("oranlar");
  try {
    const response = await fetch("orandata.json");
    const data = await response.json();
    let html = "";
    data.forEach(m => {
      html += `<h3>${m.mac} (${m.lig})</h3><table border='1' style='width:100%'><tr><th>Site</th><th>1</th><th>X</th><th>2</th></tr>`;
      const enYuksek = { "1": Math.max(...m.oranlar.map(x=>x["1"])), "X": Math.max(...m.oranlar.map(x=>x["X"])), "2": Math.max(...m.oranlar.map(x=>x["2"])) };
      m.oranlar.forEach(o => {
        html += `<tr><td>${o.site}</td><td${o["1"]===enYuksek["1"]?" style='background:green'":""}>${o["1"]}</td><td${o["X"]===enYuksek["X"]?" style='background:green'":""}>${o["X"]}</td><td${o["2"]===enYuksek["2"]?" style='background:green'":""}>${o["2"]}</td></tr>`;
      });
      html += "</table>";
    });
    oranlarDiv.innerHTML = html;
  } catch (e) {
    oranlarDiv.innerHTML = `<p style='color:red'>Veri yüklenemedi</p>`;
  }
}
window.onload = yukleOranlar;