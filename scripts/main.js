// function loadComponent(id, url) {
//   fetch(url)
//     .then(res => res.text())
//     .then(data => {
//       document.getElementById(id).innerHTML = data;
//     })
//     .catch(err => console.error(`Erro ao carregar ${id}:`, err));
// }

// document.addEventListener("DOMContentLoaded", () => {
//   loadComponent("navbar", "../components/navbar.html");
//   loadComponent("footer", "../components/footer.html");
// });

function loadComponent(id, url, callback) {
  fetch(url)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (callback) callback(); // Executa algo depois de carregar o HTML
    })
    .catch(err => console.error(`Erro ao carregar ${id}:`, err));
}

document.addEventListener("DOMContentLoaded", () => {
  loadComponent("navbar", "../components/navbar.html", iniciarMenu);
  loadComponent("footer", "../components/footer.html");
});

function iniciarMenu() {
  const toggle = document.getElementById("menuToggle");
  const navList = document.getElementById("navList");

  if (toggle) {
    toggle.addEventListener("click", () => {
      navList.classList.toggle("menu-open");
    });
  }
}
