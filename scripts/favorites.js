document.addEventListener("DOMContentLoaded", function () {

  let petsData = [];
  const petsContainer = document.querySelector(".pets-container");
  const containerEmpty = document.querySelector(".containerEmpty");
  let favorites = JSON.parse(localStorage.getItem("favoritePets")) ?? [];
  const listEmpty = `
        <div> 
          <p>Você ainda não favoritou nenhum pet 😢</p>
        </div>
      `;

  fetch('/pets.json')
    .then(response => response.json())
    .then(data => {
      petsData = data;
      renderFavoritePets();
    })
    .catch(error => console.error('Erro ao carregar pets:', error));

function renderFavoritePets() {
  petsContainer.innerHTML = "";

  const favoritePets = petsData.filter((pet) => favorites.includes(pet.id));

  if (favoritePets.length === 0) {
    containerEmpty.innerHTML = listEmpty
    return;
  }

  favoritePets.forEach((pet) => {
    const petCard = createPetCard(pet, true);
    $(petCard).css({
      position: 'relative',
      top: '150%',
      opacity: '0',
    });

    petsContainer.appendChild(petCard);

    $(petCard).animate({ top: '0', opacity: 1 }, 800);
  });

  enablePetCardEvents();
}

function toggleFavorite(petId, element) {
  favorites = favorites.filter((id) => id !== petId);
  localStorage.setItem("favoritePets", JSON.stringify(favorites));

  if (element) {
    $(element.closest(".pet-card")).fadeOut(1500, function() {
      $(this).remove();
      if (favorites.length === 0) {
        containerEmpty.innerHTML = listEmpty
      }
    });
  }
}

  function open(petId) {
    window.location.href = `/pages/schedule.html?petId=${petId}`;
  }

  function enablePetCardEvents() {
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
});
