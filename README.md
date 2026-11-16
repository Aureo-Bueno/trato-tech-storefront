# Trato Tech

Storefront demo built with React, TypeScript, Vite, and Redux Toolkit. It includes category browsing, debounced search with React transitions, cart management, and a mock JSON API.

## Tech Stack

- **React 19 + TypeScript**
- **Vite** (dev server/build) with `@vitejs/plugin-react` and `vite-plugin-svgr`
- **Redux Toolkit + React Redux** (typed hooks, memoized selectors, async thunks)
- **React Router**
- **SCSS Modules**
- **json-server** (mock API from `db.json`)
- **Nginx + Docker** (production-style static serving + `/api` proxy)

## Features

- Home with category listing
- Category page with search/filtering
- Shopping cart with quantity and total summary
- Debounced search input and deferred/transition-based filtering for responsive UI
- Memoized Redux selectors and memoized components to reduce unnecessary re-renders
- Security headers/CSP configured in Vite dev/preview and Nginx

## React 19 Features in Code

- **`useOptimistic`** (`src/components/Item/index.tsx`): optimistic UI for favorite toggling and add/remove cart state, updated inside a transition before the Redux dispatch for immediate feedback.
- **`useActionState`** (`src/pages/Cart/index.tsx`): async checkout handled as a form Action (`<form action={formAction}>`) with resulting state for success/error feedback and cart reset.
- **`useFormStatus`** (`src/pages/Cart/CheckoutButton.tsx`): submit button reads the parent form pending state to disable itself and show processing feedback without prop drilling.
- **`use` + `Suspense`** (`src/pages/Home/index.tsx`, `src/services/resources.ts`): categories are loaded via a cached Promise resource consumed with `use(...)` inside a `<Suspense>` boundary, then synced to the Redux store; items continue to be fetched on mount.
- **`ref` as a prop** (`src/components/Search/SearchInput.tsx`, `src/components/Search/index.tsx`): the search input accepts `ref` as a regular prop (no `forwardRef`) so the parent can focus it directly.
- **Concurrent rendering**: `useTransition` and `useDeferredValue` keep search/filter interactions responsive while derived lists update.

## Getting Started

### Prerequisites

- Node.js (project Docker image uses Node 26)
- npm, yarn, or pnpm

### Install

```bash
npm install
```

### Run locally

Start the mock API (port `3001`):

```bash
npm run db:watch
```

Start the Vite dev server (port `3000`, proxies `/api` to `http://localhost:3001`):

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Build and preview

```bash
npm run build
npm run preview
```

## Docker

Build and run with Docker Compose (web served by Nginx, API by json-server):

```bash
docker compose up -d --build
```

- App: [http://localhost:8080](http://localhost:8080)
- API: [http://localhost:3001](http://localhost:3001)

Nginx serves the built SPA from `dist`, applies security headers/CSP, and proxies `/api/` to the `api` service.

## Available Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — type-check (`tsc`) and build for production
- `npm run preview` — preview the production build
- `npm run db:watch` — run json-server watching `db.json` on port `3001`

## Project Structure

```text
.
├── db.json
├── docker-compose.yml
├── Dockerfile
├── index.html
├── nginx.conf
├── package.json
├── tsconfig.json
├── vite.config.ts
├── public/
│   └── assets/
│       ├── categorias/
│       │   ├── header/
│       │   └── thumbnail/
│       └── itens/
└── src/
    ├── assets/
    ├── components/
    │   ├── DefaultLayout/
    │   ├── Footer/
    │   ├── Header/
    │   │   ├── TitleWithImage/
    │   │   └── TitleWithoutImage/
    │   ├── Item/
    │   ├── Navbar/
    │   └── Search/
    │       ├── index.tsx
    │       ├── Search.module.scss
    │       └── SearchInput.tsx
    ├── hooks/
    │   └── useDebounce.ts
    ├── pages/
    │   ├── Cart/
    │   │   ├── Cart.module.scss
    │   │   ├── CheckoutButton.tsx
    │   │   └── index.tsx
    │   ├── Category/
    │   └── Home/
    ├── services/
    │   ├── index.ts
    │   ├── resources.ts
    │   ├── useGetCategories.ts
    │   └── useGetItems.ts
    ├── store/
    │   ├── hooks.ts
    │   ├── index.ts
    │   ├── selectors.ts
    │   └── slices/
    │       ├── cart.ts
    │       ├── categories.ts
    │       ├── items.ts
    │       └── search.ts
    ├── styles/
    │   └── _breakpoints.scss
    ├── index.css
    ├── main.tsx
    ├── routes.tsx
    └── vite-env.d.ts
```
