# The Versatile Engine for Regex and Global Evaluation Search
## Projet Gutenberg Book Search Engine

Ce projet consiste en un moteur de recherche de livres utilisant la base de données du Projet Gutenberg. Il comprend une partie backend développée en Node.js avec Express.js pour la gestion des requêtes API, ainsi qu'une partie frontend développée en React Native avec Expo pour l'interface utilisateur web et mobile.

## Structure du projet

- **back/** : Contient le code source du backend.
- **front/** : Contient le code source du frontend.

## Backend

Le backend est développé en Node.js avec Express.js. Il s'agit de la partie serveur qui gère les requêtes de recherche et communique avec une base de données MongoDB peuplée avec des livres du Projet Gutenberg.

### Configuration

Assurez-vous d'installer toutes les dépendances Node.js en exécutant la commande suivante dans le répertoire **back/** :

`npm install`


### Exécution

Pour lancer le serveur backend, utilisez la commande suivante :

`npm run start`


Le serveur sera alors accessible à l'adresse : `http://localhost:3000`

## Frontend

Le frontend est développé en React Native avec Expo. Il fournit une interface utilisateur conviviale pour interagir avec le moteur de recherche de livres.

### Configuration

Assurez-vous d'installer toutes les dépendances npm en exécutant la commande suivante dans le répertoire **front/** :

`npm install`


### Exécution

Pour démarrer l'application frontend, utilisez la commande suivante :

`npm run start`


Cela lancera Expo, qui vous permettra de tester l'application sur un émulateur ou un appareil mobile physique.

## Fonctionnalités

- Recherche de livres par titre, auteur et regex.
- Affichage des détails des livres sélectionnés.
- Fonction de liseuse.
- Interface conviviale et réactive.

## Contribuer

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## Auteurs

Ce projet a été développé par Anil HADJELI et Leandre AKAKPO.

---

N'hésitez pas à ajouter d'autres sections pertinentes ou à personnaliser ce README selon les besoins spécifiques de votre projet.
