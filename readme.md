# EventManagerApi

API Node.js/Express pour la gestion d'événements, d'inscriptions, de notifications et d'utilisateurs.

## 🚀 Fonctionnalités

- Authentification JWT (organisateur, participant)
- Création, modification, suppression d'événements (avec upload d'image Cloudinary)
- Gestion des inscriptions aux événements
- Statistiques organisateur (ventes, participants, etc.)
- Notifications automatiques (email + in-app) pour les événements à venir
- Pagination, recherche, favoris

## ⚙️ Installation

1. **Cloner le repo**
   ```bash
   git clone <repo-url>
   cd EventManager/EventManagerApi
   ```

2. **Installer les dépendances**
   ```bash
   npm install
   ```

3. **Configurer les variables d'environnement**
   Crée un fichier `.env` à la racine avec :
   ```
   MONGO_URI=...
   JWT_SECRET=...
   CLOUDINARY_CLOUD_NAME=...
   CLOUDINARY_API_KEY=...
   CLOUDINARY_API_SECRET=...
   ```

4. **Lancer le serveur**
   ```bash
   npm run dev
   ```
   Le serveur tourne sur [http://localhost:5000](http://localhost:5000)

## 📚 Structure

- `controllers/` : logique métier (event, user, registration, notification, etc.)
- `models/` : schémas Mongoose (Event, User, Registration, Notification, etc.)
- `routes/` : routes Express
- `middlewares/` : middlewares (auth, upload, rate-limiter)
- `utils/` : utilitaires (envoi d'email, notifications, etc.)
- `config/` : configuration (Cloudinary, DB)

## 🔔 Notifications automatiques

Un cron job envoie chaque matin un rappel aux participants pour les événements du lendemain (email + notification in-app).

## 📦 Endpoints principaux

- `/api/auth` : Authentification
- `/api/user` : Utilisateurs
- `/api/event` : Événements
- `/api/registration` : Inscriptions
- `/api/notification` : Notifications
- `/api/stat` : Statistiques

## 🖼️ Upload d'image

Les images sont stockées sur Cloudinary via multer.

## 🛡️ Sécurité

- JWT pour l'authentification
- Rate limiter sur les routes sensibles

