# Shopzy — E-commerce Storefront

A modern e-commerce storefront built with React, TypeScript, and Vite. It includes a product catalog, category browsing, product details, cart, and wishlist — styled with Tailwind CSS v4 and Radix UI primitives.

**Live demo:** [hamzatleiss.vercel.app](https://hamzatleiss.vercel.app/)

## Features

- **Home, Products & Categories** pages with grid layouts.
- **Product detail** view with variants and add-to-cart.
- **Cart drawer** with quantity controls and totals.
- **Wishlist** for saving favorite items.
- **Light / dark mode** toggle.
- **Accessible UI** built on Radix primitives (Dialog, Dropdown, Label, Separator).
- **Persistent cart & wishlist** via Zustand.
- **Client-side routing** with React Router v7.
- **Vercel-ready** (`vercel.json` included).

## Tech stack

- React 19 + TypeScript
- Vite
- Tailwind CSS 4 (`@tailwindcss/vite`)
- Radix UI primitives
- Zustand (state management)
- React Router DOM v7
- Lucide React (icons)
- `class-variance-authority`, `clsx`, `tailwind-merge`

## Project structure

```
src/
├── components/     # Navbar, Footer, Layout, ProductCard, ProductGrid,
│                   # CartDrawer, ThemeToggle, ui/
├── pages/          # Home, Products, Categories, CategoryPage,
│                   # ProductDetail, Cart, Wishlist, NotFound
├── store/          # Zustand stores (cart, wishlist, ...)
├── types/          # Shared TypeScript types
├── lib/            # Utilities & helpers
├── assets/
├── App.tsx
└── main.tsx
```

## Getting started

### Prerequisites

- Node.js 18+ and npm

### Install & run

```bash
npm install
npm run dev
```

Open the URL printed by Vite (defaults to `http://localhost:5173`).

### Scripts

| Command             | Description                          |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the Vite dev server with HMR.  |
| `npm run build`     | Type-check and build for production. |
| `npm run typecheck` | Run TypeScript without emitting.     |
| `npm run preview`   | Preview the production build.        |
| `npm run lint`      | Run ESLint over the project.         |

## Build & deploy

```bash
npm run build
```

The optimized output is emitted to `dist/`. The included `vercel.json` configures SPA rewrites for deployment on [Vercel](https://vercel.com/).

## Author

Built by [Hamza Tleiss](https://hamzatleiss.vercel.app/).
