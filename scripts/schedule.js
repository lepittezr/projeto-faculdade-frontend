document.addEventListener("DOMContentLoaded", function () {
    const petSelect = document.getElementById("petSelect");
    const petDetails = document.getElementById("petDetails");

    const petImage = document.getElementById("petImage");
    const petName = document.getElementById("petName");
    const petBreed = document.getElementById("petBreed");
    const petAge = document.getElementById("petAge");
    const petGender = document.getElementById("petGender");
    const petLocation = document.getElementById("petLocation");
    const petDescription = document.getElementById("petDescription");

    const params = new URLSearchParams(window.location.search);
    const selectedPetId = params.get("petId");

    let petsData = [];

    fetch('/pets.json')
        .then(res => res.json())
        .then(data => {
            petsData = data;
            populatePetSelect();

            // Se veio petId na URL, exibe os detalhes já selecionados
            if (selectedPetId) {
                petSelect.value = selectedPetId;
                showPetDetails(parseInt(selectedPetId));
            }
        })
        .catch(err => console.error("Erro ao carregar pets:", err));

    function populatePetSelect() {
        petsData.forEach(pet => {
        const option = document.createElement("option");
        option.value = pet.id;
        option.textContent = `${pet.name} (${pet.breed})`;
        petSelect.appendChild(option);
        });
    }

    function showPetDetails(petId) {
        const selectedPet = petsData.find(p => p.id === petId);
        if (selectedPet) {
        petDetails.style.display = "block";
        petImage.src = selectedPet.image;
        petName.textContent = selectedPet.name;
        petBreed.textContent = selectedPet.breed;
        petAge.textContent = selectedPet.age;
        petGender.textContent = selectedPet.gender;
        petLocation.textContent = selectedPet.location;
        petDescription.textContent = selectedPet.description;
        } else {
        petDetails.style.display = "none";
        }
    }

    petSelect.addEventListener("change", function () {
        const selectedId = parseInt(this.value);
        showPetDetails(selectedId);
    });

    document.getElementById("visitForm").addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrors();

        const nome = document.getElementById("nome");
        const cpf = document.getElementById("cpf");
        const telefone = document.getElementById("telefone");
        const dataVisita = document.getElementById("dataVisita");
        const horaVisita = document.getElementById("horaVisita");
        const petSelect = document.getElementById("petSelect");

        let hasError = false;

        if (!/^[A-Za-zÀ-ÿ\s]{3,}$/.test(nome.value.trim())) {
            setError(nome, "Informe um nome completo válido.");
            hasError = true;
        }

        if (!/^\d{11}$/.test(cpf.value.trim())) {
            setError(cpf, "CPF inválido. Digite exatamente 11 números.");
            hasError = true;
        }

        if (!/^\d{11}$/.test(telefone.value.trim())) {
            setError(telefone, "Telefone inválido. Digite exatamente 11 números.");
            hasError = true;
        }

        const hoje = new Date();
        const dataSelecionada = new Date(dataVisita.value);
        if (!dataVisita.value || dataSelecionada < hoje.setHours(0, 0, 0, 0)) {
            setError(dataVisita, "Selecione uma data válida.");
            hasError = true;
        }

        if (!horaVisita.value) {
            setError(horaVisita, "Informe o horário da visita.");
            hasError = true;
        }

        if (!petSelect.value) {
            setError(petSelect, "Selecione um pet para a visita.");
            hasError = true;
        }

        if (hasError) return;

        alert("Visita agendada com sucesso!");
        this.reset();
        document.getElementById("petDetails").style.display = "none";
    });

    function setError(element, message) {
        element.classList.add("error");
        const errorSpan = element.nextElementSibling;
        errorSpan.textContent = message;
        if (document.querySelectorAll(".error").length === 1) {
            element.focus();
        }
    }

    function clearErrors() {
        document.querySelectorAll(".error").forEach(el => el.classList.remove("error"));
        document.querySelectorAll(".error-message").forEach(span => span.textContent = "");
    }

    document.querySelectorAll("#visitForm input, #visitForm select").forEach(field => {
        field.addEventListener("input", () => {
            removeError(field);
        });
        field.addEventListener("change", () => {
            removeError(field);
        });
    });

    function removeError(element) {
        element.classList.remove("error");
        const errorSpan = element.nextElementSibling;
        errorSpan.textContent = "";
    }
});
