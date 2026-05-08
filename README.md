# GetCommand

GetCommand est une application React qui centralise des commandes utiles pour les developpeurs. Elle classe les commandes par technologies et par usages afin de retrouver rapidement la bonne commande pour installer, lancer, builder, debugger ou deployer un projet.

## Fonctionnalites

- Recherche globale sur les technologies, tags, descriptions, commandes et exemples.
- Navigation par categories : Web, Mobile, DevOps et Database.
- Fiches detaillees par technologie avec commandes groupees par section.
- Interface responsive avec sidebar desktop et selection horizontale sur mobile.
- Design sombre construit avec Tailwind CSS et icones Heroicons.

## Stack technique

- React 19
- Vite 8
- Tailwind CSS 4
- Heroicons
- ESLint

## Installation

Clone le projet, puis installe les dependances :

```bash
npm install
```

Lance l'application en developpement :

```bash
npm run dev
```

Vite affichera ensuite l'URL locale, generalement :

```text
http://localhost:5173
```

## Scripts disponibles

```bash
npm run dev
```

Demarre le serveur de developpement avec hot reload.

```bash
npm run build
```

Genere la version de production dans le dossier `dist`.

```bash
npm run preview
```

Sert localement le build de production pour le verifier avant publication.

```bash
npm run lint
```

Analyse le code avec ESLint.

## Structure du projet

```text
getcommand/
├── src/
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   ├── main.jsx
│   └── data/
│       ├── commandDocs.js
│       ├── domains.js
│       └── technologies.js
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

Les donnees actuellement affichees par l'application sont principalement dans `src/data/commandDocs.js`.

## Ajouter une technologie

Ajoute une entree dans `docsCategories` dans `src/data/commandDocs.js` :

```js
{
  id: 'node',
  name: 'Node.js',
  description: 'Runtime JavaScript pour backend, CLI et scripts.',
  tags: ['backend', 'javascript', 'api'],
  commands: [
    {
      section: 'Installation',
      title: 'Initialiser un projet',
      command: 'npm init -y',
      explanation: 'Cree rapidement un package.json avec les valeurs par defaut.',
      examples: ['npm install express'],
    },
  ],
}
```

Les sections reconnues sont definies dans `commandSections` :

```js
['Installation', 'Run/Dev', 'Build', 'Debug', 'Git Workflow', 'Deploy']
```

Si une commande utilise une nouvelle section, pense aussi a l'ajouter dans `commandSections` pour qu'elle soit affichee dans le bon ordre.

## Build et publication

Pour preparer une version deployable :

```bash
npm run build
```

Le dossier `dist` peut ensuite etre publie sur un hebergeur statique comme Vercel, Netlify, GitHub Pages ou un serveur web classique.

## Notes

Le projet est encore une application front-end statique : les commandes sont chargees depuis des fichiers JavaScript locaux. Une prochaine evolution logique serait d'ajouter une source de donnees externe, un bouton de copie pour chaque commande ou un systeme de favoris.
