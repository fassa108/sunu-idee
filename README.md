# Sunu-Idées

> Tableau blanc numérique, anonyme et collaboratif de la **Promo P9 · Simplon**

🔗 **[Voir le projet en ligne](https://github.com/fassa108/sunu-idee.git)**

---

## Présentation

Sunu-Idées est une application web d'une seule page **(SPA)** permettant à chaque apprenant de soumettre, modifier, afficher et supprimer des idées ou suggestions de façon anonyme et en temps réel.

Aucune authentification n'est requise. Le projet repose sur la manipulation dynamique du DOM et utilise le **LocalStorage** pour que les propositions restent sauvegardées même après fermeture du navigateur.

---

##  Fonctionnalités

**CREATE** : Soumettre une idée avec un titre, une catégorie et une description 
**READ** : Afficher toutes les idées sous forme de cartes sur le mur 
**UPDATE** : Modifier une idée existante via une modale d'édition 
**DELETE** : Supprimer définitivement une idée du tableau et du stockage 

---

## 🛠️ Technologies utilisées

- **HTML5** — Structure de la page
- **CSS3** — Styles personnalisés
- **JavaScript ES6** — Logique CRUD et manipulation du DOM
- **Bootstrap 5** — Interface responsive et composants UI
- **Bootstrap Icons** — Icônes
- **LocalStorage** — Persistance des données côté navigateur

---

## Architecture du projet

```
sunu-idees/
├── index.html      # Structure de la page
├── app.js          # Logique JavaScript (CRUD + LocalStorage)
└── README.md       # Documentation du projet
```

---

## Lancer le projet en local

1. Clonez le dépôt :
```bash
git clone https://github.com/fassa108/sunu-idee.git
```

2. Ouvrez le dossier dans **VS Code**

3. Lancez avec l'extension **Live Server** (clic droit sur `index.html` → *Open with Live Server*)


---

## Fonctionnement du LocalStorage

Les idées sont sauvegardées dans le navigateur sous la clé `sunu-idees` au format JSON :

```json
[
  {
    "id": 1,
    "titre": "Organiser un hackathon",
    "categorie": "Pédagogie",
    "description": "Un hackathon de 48h inter-promos Simplon."
  }
]
```

Chaque action CRUD synchronise automatiquement le stockage via `JSON.stringify` et `JSON.parse`.

---

## Développeur 

| [Ndeye Fassa SAMB](https://github.com/fassa108) 


---



Projet réalisé dans le cadre de la formation **Développeur Web/Web-Mobile + IA · Simplon Promo P9**.