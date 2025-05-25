function loadNavbar() {
  fetch("../components/navbar.html")
    .then((response) => response.text())
    .then((data) => {
      console.log(data);
      document.getElementById("navbar").innerHTML = data;
    })
    .catch((error) => console.error("Error loading navbar:", error));
}

document.addEventListener("DOMContentLoaded", loadNavbar);
