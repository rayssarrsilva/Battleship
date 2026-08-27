# Battleship

A classic Battleship game built with **Test Driven Development (Jest)**, ES Modules, and a layered **MVC-style architecture** (models / views / controllers), bundled with **Webpack** and deployable to **GitHub Pages**.

🇬🇧 [English](#english) · 🇧🇷 [Português](#português)

---

## English

### 1. Architecture
The project follows a layered architecture, separating pure domain logic from the DOM — the same separation of concerns pattern commonly required in job listings:

```
src/
├── models/       # Ship, Gameboard, Player — pure logic, no DOM, fully unit tested
├── views/        # DOM rendering only (boardView, uiView)
├── controllers/  # gameController — wires models + views + event listeners
├── utils/        # Shared helpers (coordinates)
├── styles/       # CSS
└── index.js      # App entry point
tests/            # Jest test suites (mirrors src/models)
```

### 2. Getting started
```bash
npm install
npm start      # dev server at http://localhost:8080
npm run build  # production build into /dist
```

### 3. Testing (TDD)
```bash
npm test        # run all Jest suites
npm run test:watch
```
19 unit tests cover the public interface of `Ship`, `Gameboard` and `Player` — the DOM is intentionally not tested here.

### 4. Deploying to GitHub Pages
Two options, pick one:
- **Automatic (recommended):** push to `main` — the included GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and publishes `/dist` to GitHub Pages automatically. Enable Pages in your repo settings with source "GitHub Actions".
- **Manual:** update `homepage` in `package.json` with your GitHub username/repo, then run `npm run deploy` (uses `gh-pages`).

### 5. Stack
Vanilla JavaScript (ES2020+), Jest + jsdom, Babel, Webpack 5, gh-pages, GitHub Actions.

---

## Português

### 1. Arquitetura
O projeto segue uma arquitetura em camadas, separando a lógica de domínio pura da manipulação do DOM — o mesmo padrão de separação de responsabilidades muito exigido em vagas de emprego:

```
src/
├── models/       # Ship, Gameboard, Player — lógica pura, sem DOM, 100% testada
├── views/        # Apenas renderização no DOM (boardView, uiView)
├── controllers/  # gameController — conecta models + views + eventos
├── utils/        # Funções auxiliares (coordinates)
├── styles/       # CSS
└── index.js      # Ponto de entrada da aplicação
tests/            # Suítes de teste do Jest (espelha src/models)
```

### 2. Como rodar
```bash
npm install
npm start      # servidor de desenvolvimento em http://localhost:8080
npm run build  # build de produção em /dist
```

### 3. Testes (TDD)
```bash
npm test        # roda todas as suítes do Jest
npm run test:watch
```
19 testes unitários cobrem a interface pública de `Ship`, `Gameboard` e `Player` — o DOM propositalmente não é testado aqui.

### 4. Deploy no GitHub Pages
Duas opções, escolha uma:
- **Automático (recomendado):** dê push na branch `main` — o workflow do GitHub Actions incluído (`.github/workflows/deploy.yml`) builda e publica a pasta `/dist` automaticamente. Ative o Pages nas configurações do repositório com origem "GitHub Actions".
- **Manual:** atualize o campo `homepage` no `package.json` com seu usuário/repositório do GitHub e rode `npm run deploy` (usa `gh-pages`).

### 5. Stack
JavaScript puro (ES2020+), Jest + jsdom, Babel, Webpack 5, gh-pages, GitHub Actions.
