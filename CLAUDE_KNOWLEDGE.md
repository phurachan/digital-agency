# Claude Code Project Knowledge - Digital Agency

## Project Overview
This is a comprehensive Digital Agency CMS website built with Nuxt 4.1.2 featuring multi-language support (Thai/English), MongoDB backend, JWT authentication, and a complete content management system for managing digital marketing services, team members, and company information.

## Tech Stack & Current Setup
- **Framework**: Nuxt 4.1.2 (Vue 3, SSR enabled)
- **Styling**: TailwindCSS 3.4.17 + Custom CSS Variables
- **State Management**: Pinia 3.0.3 + @pinia/nuxt 0.11.2 + pinia-plugin-persistedstate 4.5.0
- **Database**: MongoDB + Mongoose 8.18.0
- **Authentication**: JWT with bcryptjs 3.0.2
- **Internationalization**: @nuxtjs/i18n (Thai/English support)
- **Package Manager**: **npm** (recommended for this project)
- **Node Version**: 22.19.0+ (Nuxt 4 requires Node 22+)

## Project Architecture

### Multi-language Configuration
```typescript
// nuxt.config.ts
i18n: {
  locales: [
    { code: 'th', iso: 'th-TH', name: 'ไทย', file: 'th.json' },
    { code: 'en', iso: 'en-US', name: 'English', file: 'en.json' }
  ],
  defaultLocale: 'th',
  strategy: 'prefix_except_default', // Thai = no prefix, English = /en prefix
  langDir: 'locales/',
  detectBrowserLanguage: {
    useCookie: true,
    cookieKey: 'i18n_redirected',
    redirectOn: 'root'
  }
}
```

### Directory Structure
```
/
├── components/
│   ├── cms/              # CMS-specific components
│   │   ├── TopNavbar.vue  # Language switcher & contact info
│   │   └── ...
│   └── showcase/         # Component showcase/demo pages
├── composables/
│   ├── constants/        # API endpoints and configurations
│   │   └── api.ts       # Centralized API endpoint definitions
│   ├── store_models/     # Pinia store definitions
│   │   └── cms.ts       # CMS content state management
│   ├── utilities/        # Utility composables
│   │   ├── useAlert.ts   # Toast notifications
│   │   ├── useErrorHandler.ts  # Global error handling
│   │   ├── useHttpClient.ts    # HTTP client with auth
│   │   ├── useMultiLanguage.ts # Multi-language content parsing
│   │   └── useManageTheme.ts   # Theme management
├── pages/
│   ├── index.vue         # Root redirect to /digital-agency
│   └── digital-agency/   # Main application
│       ├── index.vue     # Homepage with all sections
│       ├── about.vue     # About company page
│       ├── services.vue  # Services showcase
│       ├── team.vue      # Team members
│       ├── contact.vue   # Contact information
│       └── manage/       # CMS admin panel
│           ├── index.vue      # Dashboard
│           ├── home.vue       # Homepage content management
│           ├── services.vue   # Services management
│           ├── team.vue       # Team members management
│           ├── about.vue      # About content management
│           ├── contact.vue    # Contact info management
│           ├── settings.vue   # Site settings
│           └── ...
├── server/
│   ├── api/
│   │   └── digital-agency/    # API endpoints
│   │       ├── auth/          # Authentication APIs
│   │       ├── cms/           # Content management APIs
│   │       ├── permissions/   # Permission management
│   │       ├── roles/         # Role management
│   │       ├── users/         # User management
│   │       └── upload/        # File upload handling
│   └── digital-agency/        # Server utilities
│       ├── models/            # Mongoose schemas
│       │   ├── HomeContent.ts
│       │   ├── Service.ts
│       │   ├── TeamMember.ts
│       │   ├── AboutContent.ts
│       │   ├── ContactContent.ts
│       │   ├── SiteSettings.ts
│       │   └── ...
│       └── utils/             # Server utilities
│           ├── mongodb.ts     # Database connection
│           ├── responseHandler.ts  # API response formatting
│           └── ...
├── stores/                    # Pinia stores
│   └── cms.ts                # CMS content store
├── middleware/               # Route middleware
│   ├── auth.ts              # Authentication middleware
│   └── permissions.global.ts # Permission checking
├── locales/                 # i18n translations
│   ├── en.json             # English translations
│   └── th.json             # Thai translations
└── public/                  # Static assets
    ├── social_icons/        # Social media icons
    └── uploads/            # Uploaded content files
```

## Core Features

### 1. Multi-Language Content Management
- **JSON Storage**: All multi-language content stored as JSON strings in MongoDB
- **Dynamic Parsing**: `useMultiLanguage.ts` composable handles content parsing
- **Localized Navigation**: All routes use `$localePath()` for proper locale handling

```typescript
// Example multi-language content structure
{
  "title": "{\"th\": \"บริการของเรา\", \"en\": \"Our Services\"}",
  "description": "{\"th\": \"บริการครบวงจร\", \"en\": \"Complete Services\"}"
}
```

### 2. CMS Content Types
- **HomeContent**: Hero section, features, statistics
- **Services**: Digital marketing services (10 items, homepage shows 6)
- **TeamMembers**: Team profiles (6 members, homepage shows 3)
- **AboutContent**: Company mission, vision, values, history
- **ContactContent**: Contact information, business hours
- **SiteSettings**: Logo, colors, social links
- **FAQ**: Frequently asked questions

### 3. Authentication System
- **JWT-based**: Secure token authentication
- **Role-based**: Admin, User roles with permissions
- **Route Protection**: Middleware protects `/manage/*` routes
- **Auto-logout**: Token expiration handling

### 4. API Structure

#### Content Management APIs
```
GET/POST /api/digital-agency/cms/home-content
GET/POST /api/digital-agency/cms/services
GET/POST /api/digital-agency/cms/team
GET/POST /api/digital-agency/cms/about
GET/POST /api/digital-agency/cms/contact
GET/POST /api/digital-agency/cms/site-settings
POST /api/digital-agency/cms/seed  # Populate with sample data
```

#### Authentication APIs
```
POST /api/digital-agency/auth/login
POST /api/digital-agency/auth/register
GET /api/digital-agency/auth/me
POST /api/digital-agency/auth/seed  # Create admin user
```

## Development Workflow

### Environment Setup
```bash
# Ensure Node.js 22+
nvm use 22

# Install dependencies
npm install

# Environment variables
cp .env.example .env
```

### Required Environment Variables
```env
JWT_SECRET=your-super-secret-jwt-key-here
MONGO_URI=mongodb://localhost:27017/digital_agency
NUXT_PUBLIC_API_BASE=/api
```

### Development Commands
```bash
# Start development server
npm run dev  # http://localhost:3000

# Build for production
npm run build

# Preview production build
npm run preview

# Database seeding (create sample content)
# POST to /api/digital-agency/cms/seed
# POST to /api/digital-agency/auth/seed
```

## Language & Routing

### URL Structure
- **Thai (Default)**: `/digital-agency`, `/digital-agency/services`
- **English**: `/en/digital-agency`, `/en/digital-agency/services`
- **Language Switching**: Preserves current page when switching languages
- **Root Redirect**: `/` → `/digital-agency` (Thai default)

### Multi-language Content Usage
```vue
<!-- In templates -->
<h1>{{ homeContent.title }}</h1>  <!-- Auto-localized -->

<!-- In composables -->
const { createLocalizedContent } = useMultiLanguage()
const localizedData = computed(() => createLocalizedContent(rawData))
```

## CMS Usage

### Content Structure
All CMS content supports multi-language through JSON storage:

```typescript
// Raw database content
const rawContent = {
  title: '{"th": "หน้าแรก", "en": "Homepage"}',
  description: '{"th": "คำอธิบาย", "en": "Description"}'
}

// Localized content (automatically parsed)
const content = createLocalizedContent(rawContent)
// Returns: { title: "หน้าแรก", description: "คำอธิบาย" } (for Thai locale)
```

### Admin Panel Features
- **Dashboard**: Content overview and quick actions
- **Content Management**: Edit all page content with live preview
- **Media Management**: Upload and manage images
- **User Management**: Admin user creation and management
- **Settings**: Site configuration, colors, social links
- **Internationalization**: Manage content in both Thai and English

## Styling System

### CSS Architecture
- **TailwindCSS**: Utility-first CSS framework
- **Custom Variables**: Dynamic color system
- **Component-scoped**: Each page has its own styling
- **Responsive**: Mobile-first design approach

### Dynamic Color System
```css
/* Automatic color calculation */
.min-h-screen {
  --primary-color: v-bind('dynamicColors.primary');
  --secondary-color: v-bind('dynamicColors.secondary');
  --primary-dark: v-bind('dynamicColors.primaryDark');
  /* ... auto-generated variants */
}
```

## Performance & SEO

### Optimizations
- **SSR**: Server-side rendering for better SEO
- **Image Handling**: All images set to `null` to avoid 404 errors
- **Code Splitting**: Automatic via Nuxt 4
- **Lazy Loading**: Components and routes
- **Bundle Size**: Configured limits and warnings

### SEO Features
- **Dynamic Meta Tags**: Based on CMS content
- **Multi-language SEO**: Proper hreflang implementation
- **Structured Data**: Ready for schema markup
- **Social Media**: Open Graph and Twitter cards

## Troubleshooting

### Common Issues
1. **Language switching**: Ensure all `NuxtLink` uses `$localePath()`
2. **JSON content display**: Check `useMultiLanguage` composable implementation
3. **Authentication**: Verify JWT secret and MongoDB connection
4. **404 on root**: Confirm `pages/index.vue` redirects properly
5. **Console logs**: All debug logs have been cleaned up

### Development Tips
- Use `npm run dev` for hot reloading
- Check browser console for any remaining errors
- Test language switching on all pages
- Verify CMS content displays correctly in both languages
- Test admin panel authentication flow

## Deployment Checklist

1. **Environment Variables**: Set production values
2. **Database**: Ensure MongoDB connection
3. **Content**: Seed database with initial content
4. **Admin User**: Create admin account via seed API
5. **Languages**: Test all locale routes
6. **Images**: Upload actual images to replace null placeholders
7. **SEO**: Configure meta tags and structured data
8. **Performance**: Run build and test loading speeds

---

This project represents a complete digital agency website with comprehensive CMS capabilities, multi-language support, and modern Vue 3/Nuxt 4 architecture.