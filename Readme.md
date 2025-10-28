# 🔐 Projet : Portfolio Chiffré

**Création :** Janvier 2025

Ce projet est un **portfolio web statique** présentant mes réalisations, avec une particularité :  
tout le contenu est **chiffré côté client**.  
Les données ne peuvent être **déchiffrées qu’avec le bon mot de passe**, garantissant une confidentialité totale.

---

## 🚀 Fonctionnalités clés

### 🔸 Chiffrement côté client
Le contenu du portfolio est envoyé **chiffré** au navigateur.

### 🔸 Site 100 % statique
L’ensemble du site et des données chiffrées est **chargé directement par le client**.  
Aucun back-end n’est nécessaire pour la consultation.

### 🔸 Double méthode d’accès
- **Accès par mot de passe :**  
  L’utilisateur saisit le mot de passe pour déchiffrer et afficher le contenu.
- **Accès par lien direct :**  
  Un lien spécial contenant la clé dans l’ancre (`#clé`) permet un **déchiffrement automatique** dès l’ouverture de la page.

---

## 🧠 Fonctionnement

Le déchiffrement est entièrement géré par le navigateur :

1. Le visiteur charge la page contenant les données du portfolio sous forme chiffrée.
2. Le script vérifie si une clé de déchiffrement est présente dans l’URL.
3. Si une clé est trouvée :  
   → le contenu est automatiquement déchiffré et affiché.
4. Sinon :  
   → une interface demande à l’utilisateur de **saisir le mot de passe**.
5. Une fois le bon mot de passe fourni, les données sont déchiffrées localement et le portfolio devient lisible.

💡 **Aucune donnée sensible n’est transmise au serveur** : tout le processus se déroule côté client.

---

## 🧰 Technologies utilisées

| Domaine | Outils |
|----------|--------|
| **Front-end** | TypeScript / JavaScript |
| **Style** | Tailwind CSS |
| **Structure HTML** | Twig (pour la génération statique du site) |
| **Chiffrement** | CryptoJS (AES côté client) |

---

## 🧩 Points techniques intéressants

- Déchiffrement en temps réel via l’API `CryptoJS.AES.decrypt`.
- Vérification automatique de clé via hash de contrôle.
- Gestion d’accès “zéro serveur” — tout repose sur le navigateur.
- Option d’accès par URL chiffrée (clé encodée dans `#hash`).

---

## 👤 Auteur

**Thomas S.**  
Projet personnel et démonstration technique de chiffrement côté client.

---

## ⚙️ Installation & Utilisation

### 1. Prérequis

* [Node.js](https://nodejs.org) (version LTS recommandée)
* [Git](https://git-scm.com/)

### 2. Installation

```bash
git clone https://github.com/S-TH0MAS/Portfolio
cd Portfolio

# Supprimer les references du repo actuel
rm -rf .git
git init

# Installer les dépendances
npm install
```

### 3. Ajout de vos Projets

Le contenu du portfolio est géré dans **`sources/project-info.js`**.

```js
// Exemple de projet
const project1 = {
    title: "Titre de votre projet",
    description: `
        <article>
            <p>Description de votre projet. Vous pouvez utiliser des balises <strong>HTML</strong>.</p>
            <div>
                <strong>Stack technique :</strong>
                <span>Techno 1, Techno 2, Techno 3.</span>
            </div>
        </article>
    `,
    github_url: "https://github.com/votre-lien" // ou null si aucun lien
};

const project2 = { /* ... */ };

const project_entreprise = [ project1 ];
const project_personnel = [ project2 ];

export const projectInfo = {
    "Projets Entreprise": project_entreprise,
    "Projets Personnels": project_personnel,
}

export const name = "MON NOM PRESENT EN PIED DE PAGE"

```

### 4. Génération du Contenu Chiffré

```bash
npm run gen <VOTRE_MOT_DE_PASSE_SECRET>
```

Cette commande :

* lit `sources/project-info.js`
* chiffre son contenu
* génère les données en clair dans `src/content/`
* génère les données chiffré dans `src/encrypted/`

### 5. Test en Local

```bash
npm run dev
```

Accédez à `http://localhost:5173/NOM_EN_BASE/` puis entrez votre mot de passe pour afficher les projets.

#### Etape suivante pour modifier la base

---

## 🚀 Déploiement sur GitHub Pages

### 1. Configuration de `vite.config.js`

Il faut modifier le parametre base par le nom de votre repo github

Exemple le repo est MonPortfolio, `base: "/MonPortfolio/"`

```js
export default defineConfig({
  base: '/NOM-DE-VOTRE-REPO/', // ⚠️ Modifiez ici
  plugins: []
})
```

### 2. Activer GitHub Pages

1. Rendez-vous dans **Settings > Pages** de votre dépôt GitHub.
2. Dans **Build and deployment**, choisissez **GitHub Actions**.

### 3. Push et Déploiement

## 🔒 Sécurité : Fichiers à Ignorer

Assurez-vous que votre fichier `.gitignore` contient :

```bash
# Fichiers sources sensibles
sources/project-info.js
src/content

```

Afin de ne pas dévoiler les fichiers chiffrés dans votre repos

```bash
git add *
git commit -m "Mise à jour du contenu chiffré"
git push origin main
```

Le workflow GitHub Actions se chargera automatiquement du build et du déploiement sur la branche **gh-pages**.

### 4. URL du Site

👉 Votre site sera accessible à :
`https://VOTRE-USERNAME.github.io/NOM-DE-VOTRE-REPO/`

ou pour un lien avec déchiffrement automatique

`https://VOTRE-USERNAME.github.io/NOM-DE-VOTRE-REPO/?password=VOTRE_MOT_DE_PASSE` 

---

