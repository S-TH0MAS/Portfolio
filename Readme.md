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

