# Campus Ideas - Angular Modular Project

Application Angular pour la gestion des suggestions du campus.

## Description

Cette application permet aux utilisateurs de :
- Consulter la liste des suggestions
- Rechercher des suggestions par titre ou catégorie
- Aimer des suggestions
- Ajouter des suggestions aux favoris
- Filtrer les suggestions par statut (acceptée, refusée, en attente)

## Technologies utilisées

- Angular 17+ (Architecture modulaire)
- TypeScript
- HTML/CSS
- FormsModule pour la liaison de données

## Structure du projet
```
src/
├── app/
│   ├── core/
│   │   ├── header/          # Composant header
│   │   ├── footer/          # Composant footer
│   │   └── list-suggestion/ # Composant liste des suggestions
│   ├── models/
│   │   └── suggestion.ts    # Modèle de données
│   ├── app.component.*      # Composant racine
│   └── app.module.ts        # Module principal
```

## Installation

1. Cloner le projet :
```bash
git clone [URL_DE_VOTRE_REPO]
cd angular-campus-ideas
```

2. Installer les dépendances :
```bash
npm install
```

3. Lancer l'application :
```bash
ng serve
```

4. Ouvrir le navigateur à l'adresse : `http://localhost:4200`

## Fonctionnalités

### Liste des suggestions
- Affichage de toutes les suggestions avec leurs détails
- Catégories colorées
- Statuts visuels (acceptée, refusée, en attente)

### Recherche
- Recherche en temps réel par titre ou catégorie

### Interactions
- Bouton "Like" pour augmenter le nombre de likes
- Bouton "Ajouter aux favoris" pour sauvegarder les suggestions préférées

### Favoris
- Section dédiée affichant toutes les suggestions favorites

## Auteur

[Votre Nom]
[Votre Email]

## Date

Janvier 2025