# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.


src/
├── assets/              → Imágenes, íconos, fuentes, videos, etc.
├── components/          → Componentes reutilizables
│   ├── admin/           → Componentes específicos del panel de administrador
│   ├── auth/            → Login, Logout, protección de rutas
│   ├── client/          → Vista de cliente personalizada
│   └── shared/          → Navbar, Footer, botones, formularios reutilizables
├── context/             → AuthContext (manejo de token, login, usuario)
├── hooks/               → Custom Hooks (como useIsotope, etc)
├── pages/               → Vistas de página completas (Home, Login, Dashboard)
├── router.jsx           → Definición de rutas protegidas/públicas
├── App.jsx              → Enrutador y layout general
└── main.jsx             → Punto de entrada, context y router

