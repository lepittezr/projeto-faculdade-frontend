document.addEventListener("DOMContentLoaded", function () {

  let petsData = [];
  const petsContainer = document.querySelector(".pets-container");
  // const modalOverlay = document.getElementById("modalOverlay");
  const petFilters = document.querySelectorAll(".pet-filters button");
  let favorites = JSON.parse(localStorage.getItem("favoritePets")) ?? [];

  // Carrega os dados do JSON externo
  fetch('/pets.json')
    .then(response => response.json())
    .then(data => {
      petsData = data;
      renderPets();
    })
    .catch(error => console.error('Erro ao carregar pets:', error));

  // Função para renderizar os pets
  function renderPets(filter = "all") {
    petsContainer.innerHTML = "";

    const filteredPets =
      filter === "all"
        ? petsData
        : petsData.filter((pet) => pet.type === filter);


    filteredPets.forEach((pet) => {
      const isFavorited = favorites.includes(pet.id);
      const petCard = createPetCard(pet, isFavorited);
      $(petCard).css({
        position: 'relative',
        top: '150%',
        opacity: '0',
      });

      petsContainer.appendChild(petCard);

      $(petCard).animate({ top: '0', opacity: 1 }, 800);
    });

    // Adiciona eventos aos botões
    addPetCardEvents();
  }

  function open(petId) {
    window.location.href = `/pages/schedule.html?petId=${petId}`;
  }

  // Função para adicionar eventos aos cards
  function addPetCardEvents() {
    document.querySelectorAll(".view-btn").forEach((btn) => {
      btn.addEventListener("click", function () {
        const petId = parseInt(this.closest(".pet-card").dataset.id);
        open(petId);
      });
    });

    document.querySelectorAll(".favorite-icon").forEach((icon) => {
      icon.addEventListener("click", function (e) {
        e.stopPropagation();
        const petId = parseInt(this.dataset.id); 
        toggleFavorite(petId, this);
      });
    });
  }

  // Função para favoritar/desfavoritar
  function toggleFavorite(petId, element) {
    const index = favorites.indexOf(petId);

    if (index === -1) {
      favorites.push(petId);
      if (element) {
        element.classList.add("fas", "favorited");
        element.classList.remove("far");
      }
    } else {
      favorites.splice(index, 1);
      if (element) {
        element.classList.add("far");
        element.classList.remove("fas", "favorited");
      }
    }

    localStorage.setItem("favoritePets", JSON.stringify(favorites));

    // Atualiza o botão no modal se estiver aberto
    const modalFavoriteBtn = document.querySelector(".favorite-btn");
    if (modalFavoriteBtn && parseInt(modalFavoriteBtn.dataset.id) === petId) {
      const isFavorited = favorites.includes(petId);
      modalFavoriteBtn.innerHTML = `<i class="${
        isFavorited ? "fas" : "far"
      } fa-heart"></i> ${isFavorited ? "Favoritado!" : "Favoritar"}`;
      modalFavoriteBtn.classList.toggle("favorited", isFavorited);
    }
  }

  // // Evento para fechar o modal
  // document.querySelector(".close-modal").addEventListener("click", function () {
  //   modalOverlay.classList.remove("active");
  // });

  // // Evento para favoritar no modal
  // document
  //   .querySelector(".favorite-btn")
  //   .addEventListener("click", function () {
  //     const petId = parseInt(this.dataset.id);
  //     toggleFavorite(petId);

  //     // Atualiza o ícone no card correspondente
  //     const cardIcon = document.querySelector(
  //       `.favorite-icon[data-id="${petId}"]`
  //     );
  //     if (cardIcon) {
  //       const isFavorited = favorites.includes(petId);
  //       cardIcon.classList.toggle("fas", isFavorited);
  //       cardIcon.classList.toggle("far", !isFavorited);
  //       cardIcon.classList.toggle("favorited", isFavorited);
  //     }
  //   });

  // Filtros
  petFilters.forEach((button) => {
    button.addEventListener("click", function () {
      petFilters.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");
      renderPets(this.dataset.filter);
    });
  });

  // Inicializa a página
  renderPets();
});
