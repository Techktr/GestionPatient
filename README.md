# GestionPatient — Frontend Angular

Interface web du projet **MedicoAPI**, une application de gestion de patients,
praticiens et rendez-vous pour un cabinet de médecin du sport.

Développé avec Angular 19 (CLI 21.1.4) et TypeScript.

## Stack

- **Framework** : Angular 19
- **Langage** : TypeScript
- **Communication API** : HttpClient (REST)
- **Backend** : [MedicoAPI (.NET 8)](https://github.com/Techktr/MedicoAPI)

## Prérequis

- Node.js >= 18
- Angular CLI : `npm install -g @angular/cli`

## Installation

```bash
git clone https://github.com/Techktr/GestionPatient.git
cd GestionPatient
npm install
```

## Configuration

L'URL de l'API backend est définie dans `src/app/constants.ts` :

```typescript
export const API_BASE_URL = 'http://localhost:5274/api';
```

Assure-toi que **MedicoAPI** tourne en local avant de lancer le frontend.

## Lancer en développement

```bash
ng serve
```

Accès : `http://localhost:4200`

## Build production

```bash
ng build
```

Les artefacts sont générés dans `dist/`.

## Tests

```bash
ng test
```

*Tests unitaires en cours d'implémentation.*
