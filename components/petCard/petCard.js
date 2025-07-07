function createPetCard(pet, favorited = false) {
  const petCard = document.createElement("div");
  petCard.className = "pet-card";
  petCard.dataset.id = pet.id;

  petCard.innerHTML = `
    <img src="${pet.image}" alt="${pet.name}" class="pet-image">
    <div class="pet-header">
      <h3 class="pet-name">${pet.name}</h3>
      <i class="favorite-icon fa-heart ${
        favorited ? "fas favorited" : "far"
      }" data-id="${pet.id}" title="${
    favorited ? "Desfavoritar" : "Favoritar"
  }"></i>
    </div>
    <div class="pet-info">
      <p class="pet-breed">${pet.breed}</p>
      <p class="pet-description">${pet.description.substring(0, 100)}...</p>
      <div class="pet-card-footer">
        <span class="pet-age">${pet.age}</span>
        <button class="view-btn">Visitar <i class="fas fa-paw"></i></button>
      </div>
    </div>
  `;

  return petCard;
}
