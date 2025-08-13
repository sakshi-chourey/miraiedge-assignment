# miraiedge-assignment

## 🏗️ Architecture Overview

This project is a modern React admin dashboard built with Vite, Tailwind CSS, and TypeScript. It features:

- **Component-based structure**: All UI elements are modular React components (see `client/components`).
- **Context Providers**: Global and feature-specific contexts for theme and user management (see `client/contexts`).
- **Routing**: Uses React Router for page navigation (`client/App.tsx`).
- **API Integration**: Fetches user data from a mock API service (`client/services/api.ts`).
- **Styling**: Tailwind CSS with custom theming and dark mode support.
- **Pages**: Dashboard, Users, and Reports, each in their own file under `client/pages`.

## ⚡ Setup Instructions

1. **Install dependencies**:
	```bash
	npm install
	```

2. **Start the development server**:
	```bash
	npm run dev
	```

3. **Build for production**:
	```bash
	npm run build
	```

4. **Preview production build**:
	```bash
	npm run preview
	```

## 🌐 Live Demo

If deployed, the live demo is available at:

```
[YOUR_DEPLOYMENT_URL_HERE]
```

Replace with your actual deployment link if available (e.g., Vercel, Netlify, etc.).