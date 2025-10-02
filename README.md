# Reap Construction

A modern, high-performance website for Reap Construction - a premier commercial and residential construction company. A subsidiary of Reap Capital, delivering quality, craftsmanship, and excellence.

## 🏗️ Overview

This website showcases Reap Construction's portfolio, services, and expertise through a modern, accessible, and performant web experience. Built with Astro for optimal performance and React for interactive components.

## ✨ Features

### Design & UX
- **Masonry Hero Section** - Dynamic animated carousel with depth-based opacity effects
- **Transparent Header** - Smooth scroll navigation with active section highlighting
- **Animated Logo** - Custom sequential animation with hover effects
- **Interactive Service Cards** - Group hover effects with inline numbered features
- **Portfolio Gallery** - Modal lightbox with keyboard navigation and focus trap
- **Contact Section** - Integrated footer with company information

### Accessibility
- WCAG 2.1 AA compliant
- Keyboard navigation support
- Focus management and focus traps for modals
- ARIA attributes for screen readers
- `prefers-reduced-motion` support
- Skip-to-content links

### Performance
- Static site generation with Astro
- Optimized image loading with lazy loading
- Minimal JavaScript bundle size
- Lighthouse score optimized

### Technical Features
- TypeScript strict mode
- SCSS with BEM naming convention
- Framer Motion animations
- Memory leak prevention and proper cleanup
- ResizeObserver for responsive measurements
- Semantic HTML5 structure

## 🛠️ Technology Stack

- **Framework:** [Astro](https://astro.build) (Static Site Generator)
- **UI Components:** React 18
- **Animations:** Framer Motion
- **Styling:** SCSS with custom design system
- **Icons:** Font Awesome
- **Fonts:** Google Fonts (DM Sans, Playfair Display)
- **Deployment:** Vercel (Static)
- **Type Safety:** TypeScript

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The development server will start at `http://localhost:4321`

## 📁 Project Structure

```
reap-site/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── AnimatedLogo.tsx
│   │   ├── Header.astro
│   │   ├── HeaderTransparent.astro
│   │   ├── Footer.astro
│   │   └── MasonryCarousel.tsx
│   ├── layouts/          # Page layouts
│   │   ├── MainLayout.astro
│   │   └── ModernLayout.astro
│   ├── sections/         # Page sections
│   │   ├── About.astro
│   │   ├── Services.astro
│   │   ├── Portfolio.astro
│   │   ├── Process.astro
│   │   ├── Contact.astro
│   │   └── HeroModern.astro
│   ├── styles/           # Global styles and SCSS modules
│   │   ├── global.scss
│   │   ├── variables.scss
│   │   └── mixins.scss
│   ├── data/             # Content and data files
│   │   └── projects.ts
│   └── pages/            # Astro pages (routes)
│       └── index.astro
├── public/               # Static assets
│   └── assets/
│       └── projects/     # Project images
├── astro.config.mjs      # Astro configuration
├── tsconfig.json         # TypeScript configuration
└── package.json
```

## 🎨 Design System

### Colors
- **Heritage Green** (`#2D5F3F`) - Primary brand color
- **Prestige Gold** (`#D4AF37`) - Accent color
- **White** (`#FFFFFF`) - Background
- **Text colors** - Various shades for hierarchy

### Typography
- **Display Font:** Playfair Display (headings)
- **Body Font:** DM Sans (content)
- **Font Scales:** Responsive typography system

### Spacing
- Consistent spacing scale using SCSS variables
- Responsive spacing adjustments

## 🧪 Development

### Key Scripts
```bash
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
npm run astro        # Run Astro CLI commands
```

### Code Style
- BEM (Block Element Modifier) naming for CSS
- TypeScript strict mode enabled
- ESLint for code quality (if configured)
- Consistent file organization

### Component Patterns
- Astro components for static content
- React components for interactive features
- Proper cleanup in useEffect hooks
- Accessibility-first approach

## 🚢 Deployment

The site is configured for deployment on Vercel using the static adapter.

```bash
# Build command
npm run build

# Output directory
dist/
```

### Environment Variables
- `SITE_URL` - Production site URL (https://www.reapconstruction.com)

## ♿ Accessibility Features

- **Keyboard Navigation** - Full keyboard support throughout the site
- **Focus Management** - Proper focus handling for modals and interactive elements
- **Screen Readers** - Semantic HTML and ARIA labels
- **Motion Preferences** - Respects `prefers-reduced-motion` setting
- **Color Contrast** - WCAG AA compliant color ratios
- **Skip Links** - Quick navigation to main content

## 📄 License

© 2024 Reap Construction. All rights reserved.

## 🤝 Contributing

This is a private project. For internal development guidelines, please contact the development team.

---

Built with ❤️ by Southwell Media Dev
