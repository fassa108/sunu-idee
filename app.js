const inputTitre       = document.querySelector("#titre");
const inputCategorie   = document.querySelector("#categorie");
const inputDescription = document.querySelector("#description");
const btnSoumettre     = document.querySelector("#btn-soumettre");
const btnReset         = document.querySelector("#btn-reset");
const messageForm      = document.querySelector("#message-form");
const mur              = document.querySelector("#mur");
const messageVide      = document.querySelector("#message-vide");
const compteur         = document.querySelector("#compteur");

// Modale 
const editTitre        = document.querySelector("#edit-titre");
const editCategorie    = document.querySelector("#edit-categorie");
const editDescription  = document.querySelector("#edit-description");
const btnSauvegarder   = document.querySelector("#btn-sauvegarder");
const modalEditer      = new bootstrap.Modal(document.querySelector("#modalEditer"));


let idees = JSON.parse(localStorage.getItem("sunu-idees")) || [];
let idEnCoursEdition = null;

function sauvegarder() {
    localStorage.setItem("sunu-idees", JSON.stringify(idees));
}


function genererID() {
    if (idees.length === 0) return 1;
    return Math.max(...idees.map(i => i.id)) + 1;
}

function afficherMessage(texte, type = "success") {
    messageForm.textContent = texte;
    messageForm.className = `mt-2 mb-0 small text-${type}`;
    setTimeout(() => { messageForm.textContent = ""; }, 3000);
}


function reinitialiserFormulaire() {
    inputTitre.value       = "";
    inputCategorie.value   = "";
    inputDescription.value = "";
}

btnReset.addEventListener("click", reinitialiserFormulaire);

btnSoumettre.addEventListener("click", () => {
    const titre       = inputTitre.value.trim();
    const categorie   = inputCategorie.value;
    const description = inputDescription.value.trim();
    
    
    if (!titre || !categorie || !description) {
        afficherMessage("Veuillez remplir tous les champs.", "danger");
        return;
    }
    
    const nouvelleIdee = {
        id:          genererID(),
        titre,
        categorie,
        description
    };
    
    idees.unshift(nouvelleIdee); 
    sauvegarder();
    afficherTout();
    reinitialiserFormulaire();
    afficherMessage("Idée publiée avec succès !", "success");
});

const couleurs = {
    "Pédagogie": "#0d6efd",
    "Événement": "#198754",
    "Vie de campus": "#fd7e14",
    "Amélioration technique": "#dc3545",
};
function afficherTout() {
    mur.innerHTML = ""; // on vide avant de ré-injecter

    if (idees.length === 0) {
        messageVide.classList.remove("d-none");
        compteur.textContent = "0 idée(s)";
        return;
    }

    messageVide.classList.add("d-none");
    compteur.textContent = `${idees.length} idée(s)`;

    idees.forEach(idee => {
        const col = document.createElement("div");
        col.classList.add("col-md-6", "col-xl-4");

        col.innerHTML = `
            <div class="card h-100 shadow-sm border-0 carte-idee">
                <div class="card-body d-flex flex-column">
                    <div class="d-flex justify-content-between align-items-start mb-2">
                        <span class="badge px-2 py-1" style="background-color: ${couleurs[idee.categorie] || '#6f2da8'}"> ${idee.categorie} </span>
                    </div>
                    <h5 class="card-title fw-bold mb-2">${idee.titre}</h5>
                    <p class="card-text text-muted flex-grow-1">${idee.description}</p>
                    <div class="d-flex gap-2 mt-3">
                        <button class="btn btn-sm btn-outline-warning flex-grow-1" onclick="ouvrirEdition('${idee.id}')">
                        <i class="bi bi-pencil me-1"></i>Modifier
                        </button>
                        <button class="btn btn-sm btn-outline-danger flex-grow-1" onclick="supprimerIdee('${idee.id}')">
                            <i class="bi bi-trash me-1"></i>Supprimer
                        </button>
                    </div>
                </div>
            </div>
        `;

        mur.appendChild(col);
    });
}

function ouvrirEdition(id) {
    const idee = idees.find(i => i.id === parseInt(id));
    if (!idee) return;

    idEnCoursEdition = id;

    editTitre.value       = idee.titre;
    editCategorie.value   = idee.categorie;
    editDescription.value = idee.description;

    modalEditer.show();
}

btnSauvegarder.addEventListener("click", () => {
    const titre       = editTitre.value.trim();
    const categorie   = editCategorie.value;
    const description = editDescription.value.trim();

    if (!titre || !categorie || !description) return;

    const index = idees.findIndex(i => i.id === idEnCoursEdition);
    if (index === -1) return;

    idees[index].titre       = titre;
    idees[index].categorie   = categorie;
    idees[index].description = description;

    sauvegarder();
    afficherTout();
    modalEditer.hide();
    idEnCoursEdition = null;
});



afficherTout();
