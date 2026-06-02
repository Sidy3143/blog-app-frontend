# User App Frontend

A modern blog application built with React and Vite, featuring user authentication, post management, and real-time comments.

## Tech Stack

- **React 19** - UI framework
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **ESLint** - Code linting

## Project Structure

```
src/
├── api/              # API client modules (auth, posts, comments)
├── components/       # Reusable UI components
├── pages/            # Page components (Home, Login, PostDetail, etc.)
├── utils/            # Utility functions
├── App.jsx           # Main app component
├── main.jsx          # Entry point
└── styles/           # CSS files
```

## Quick Start

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Starts the dev server at `http://localhost:5173`

### Build
```bash
npm run build
```
Produces optimized production build

### Linting
```bash
npm run lint
```

## Features

- User authentication (login/signup)
- Create, read, and manage blog posts
- Admin post actions
- Comment system
- Responsive UI

