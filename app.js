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

