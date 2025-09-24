# Claude Code Project Knowledge - Digital Agency

## Project Overview
This is a Digital Agency website built with Nuxt 4.1.2 using TailwindCSS 3.x and DaisyUI 5.1.12, featuring a comprehensive CMS system with authentication and multi-language support.

## Tech Stack & Current Setup
- **Framework**: Nuxt 4.1.2 (Vue 3, SSR enabled)
- **Styling**: TailwindCSS 3.4.17 + DaisyUI 5.1.12 + @nuxtjs/tailwindcss 6.12.4
- **Icons**: @heroicons/vue 2.2.0
- **Date Picker**: @vuepic/vue-datepicker 11.0.2 (Vue 3 Datepicker library)
- **State Management**: Pinia 3.0.3 + @pinia/nuxt 0.11.2 + pinia-plugin-persistedstate 4.5.0
- **Database**: MongoDB + Mongoose 8.18.0
- **Authentication**: JWT with bcryptjs 3.0.2
- **Languages**: TypeScript 5.9.2, i18n (Thai/English)
- **Package Manager**: **npm** (recommended for this project)
- **Node Version**: 22.19.0+ (Nuxt 4 requires Node 22+)

### Package Manager Choice
- **Both Projects**: Use **npm** - Consistent across all projects, works perfectly with Nuxt 4.x

### State Persistence Setup
Since `@pinia-plugin-persistedstate/nuxt` is deprecated, we use modern setup:

```typescript
// plugins/pinia.client.ts
import { createPersistedState } from 'pinia-plugin-persistedstate'

export default defineNuxtPlugin(nuxtApp => {
  const pinia = nuxtApp.$pinia as any
  pinia.use(createPersistedState({
    storage: localStorage
  }))
})
```

## Project Structure

### Core Features
- **Multi-language Support**: Thai (default) and English
- **CMS Management**: Content management system with admin authentication
- **API Structure**: RESTful APIs under `/api/digital-agency/`
- **Authentication**: JWT-based auth system
- **Database**: MongoDB integration with Mongoose ORM

### Directory Structure
```
/
├── components/          # Vue components
├── composables/         # Composable functions
│   ├── constants/       # API constants and configurations
│   └── useCMS.ts        # CMS data management
├── pages/
│   └── digital-agency/  # Main site pages
│       ├── index.vue    # Homepage
│       ├── login.vue    # Admin login
│       └── manage/      # CMS management pages
├── server/
│   └── api/
│       └── digital-agency/  # API endpoints
│           ├── auth/        # Authentication APIs
│           └── cms/         # CMS APIs
├── middleware/          # Route middleware
├── plugins/             # Nuxt plugins
├── locales/             # i18n translations
├── lib/                 # Shared utilities
└── public/              # Static assets
```

### Component Organization
- **Base Components**: `/components/base/`
  - Auto-imported as `<BaseIcon />`, `<BaseBreadcrumbs />`, etc.
  - Use DaisyUI components as foundation
- **Feature Components**: `/components/` (feature-specific)
- **Page Components**: Co-located with pages when needed

## API Structure

### Authentication Endpoints
- `POST /api/digital-agency/auth/login` - Admin login
- `POST /api/digital-agency/auth/logout` - Admin logout
- `GET /api/digital-agency/auth/me` - Get current user

### CMS Endpoints
- `GET/POST /api/digital-agency/cms/home-content` - Homepage content
- `GET/POST /api/digital-agency/cms/services` - Services content
- `GET/POST /api/digital-agency/cms/about` - About page content
- `GET/POST /api/digital-agency/cms/contact` - Contact information
- And more...

### Database Connection
```typescript
// server/digital-agency/lib/mongodb.ts
export async function connectToMongoDB() {
  const mongoUri = useRuntimeConfig().mongoUri
  return await mongoose.connect(mongoUri)
}
```

## Development Commands

### Environment Setup
```bash
nvm use 22
npm install
```

### Development Server
```bash
npm run dev  # Runs on http://localhost:3000
```

### Build Commands
```bash
npm run build
npm run preview
```

### Port Management
- **Default Port**: 3000
- **Alternative**: 3001 if 3000 is occupied
- **Environment Variable**: Set PORT=3001 if needed

## Multi-language Support

### Configuration
```typescript
// nuxt.config.ts
i18n: {
  locales: [
    { code: 'th', iso: 'th-TH', name: 'ไทย', file: 'th.json' },
    { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' }
  ],
  defaultLocale: 'th',
  strategy: 'prefix_except_default',
  langDir: 'locales/',
}
```

### Usage in Components
```vue
<template>
  <h1>{{ $t('welcome') }}</h1>
  <NuxtLink :to="localePath('/about')">{{ $t('about') }}</NuxtLink>
</template>
```

## Authentication & Security

### JWT Configuration
```typescript
// nuxt.config.ts
runtimeConfig: {
  jwtSecret: process.env.JWT_SECRET || 'fallback-secret-key',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/digital_agency',
  public: {
    apiBase: '/api/digital-agency',
    siteName: 'Digital Agency',
    siteUrl: 'http://localhost:3000'
  }
}
```

### Route Protection
- **Middleware**: `auth-cms.ts` protects `/digital-agency/manage/*` routes
- **Client Plugin**: `auth.client.ts` checks authentication status
- **Server Validation**: All CMS APIs verify JWT tokens

## CMS Usage

### Content Management
```typescript
// composables/useCMS.ts
const { getHomeContent, updateHomeContent } = useCMS()

// Get content with fallback
const homeData = await getHomeContent()

// Update content (requires auth)
await updateHomeContent(newData)
```

### Default Content Structure
All CMS endpoints provide Thai-language defaults if no content exists in database.

## Styling Guidelines

### TailwindCSS + DaisyUI
- Use DaisyUI components as foundation: `btn`, `card`, `modal`, etc.
- Custom CSS variables in `/assets/css/main.css`:
```css
:root {
  --primary-color: #6495ed;
  --primary-dark: #4169e1;
  --primary-light: #87ceeb;
}
```

### Component Styling
- Prefer DaisyUI classes over custom CSS
- Use Tailwind utilities for spacing, colors, responsive design
- Consistent color scheme with CSS variables

## Deployment Notes

### Environment Variables
```env
JWT_SECRET=your-secret-key
MONGO_URI=mongodb://localhost:27017/digital_agency
NUXT_PUBLIC_API_BASE_URL=/api/digital-agency
NUXT_PUBLIC_SITE_NAME=Digital Agency
NUXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### Build Preparation
1. Set production environment variables
2. Test all CMS functionality
3. Verify authentication flows
4. Check multi-language routing
5. Validate API endpoints

## Troubleshooting

### Common Issues
1. **npm install fails**: Ensure Node.js 22+ (`nvm use 22`)
2. **State persistence not working**: Check `plugins/pinia.client.ts` is correct
3. **Authentication issues**: Verify JWT secret and MongoDB connection
4. **i18n routing**: Check `strategy: 'prefix_except_default'` in config
5. **API endpoints**: Ensure correct base URL `/api/digital-agency`

### Performance
- **Bundle Size**: Configured `chunkSizeWarningLimit: 1000` in vite config
- **SSR**: Enabled for SEO benefits
- **Code Splitting**: Automatic via Nuxt 4
- **Image Optimization**: Use Nuxt Image for better performance

## Migration Notes

This project was migrated from `local-spot` with the following changes:
- Renamed all API routes from `/api/local-spot/` to `/api/digital-agency/`
- Updated project name and branding
- Integrated comprehensive CMS functionality
- Added JWT authentication system
- Implemented multi-language support
- Updated to modern Pinia persistence setup
- Switched from yarn to npm for better Nuxt 4 compatibility