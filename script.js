window.onload = function () {
  for (let i = 1; i <= 3; i++) {
    let name = localStorage.getItem("name" + i);
    let url = localStorage.getItem("url" + i);
    if (name) document.getElementById("name" + i).textContent = name;
    if (url) document.getElementById("url" + i).value = url;
  }

  document.getElementById("tara").addEventListener("click", () => {
    for (let i = 1; i <= 3; i++) {
      let input = document.getElementById("url" + i);
      let nameEl = document.getElementById("name" + i);
      let url = input.value;
      localStorage.setItem("url" + i, url);
      localStorage.setItem("name" + i, nameEl.textContent);
      fetch(url)
        .then((res) => {
          input.style.border = res.ok ? "2px solid lime" : "2px solid red";
        })
        .catch(() => {
          input.style.border = "2px solid red";
        });
    }
  });
};