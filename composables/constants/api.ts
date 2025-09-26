// Get API Base URL from environment variables
export const getApiBaseUrl = (): string => {
  const runtimeConfig = useRuntimeConfig()
  
  // Check if external API URL is configured
  const externalApiUrl = runtimeConfig.public.apiBaseUrl?.toString() || 
                        process.env.API_BASE_URL || 
                        process.env.NUXT_PUBLIC_API_BASE_URL
  
  if (externalApiUrl) {
    // Use external API server
    return externalApiUrl
  }
  
  // Fallback to SSR API (same domain)
  if (typeof window === 'undefined') {
    // Server-side - use relative path for SSR
    return '/api/digital-agency'
  } else {
    // Client-side - use current domain for SSR
    const protocol = window.location.protocol
    const host = window.location.host
    return `${protocol}//${host}/api/digital-agency`
  }
}

// API Endpoints
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
    VERIFY_EMAIL: '/auth/verify-email',
    RESEND_VERIFICATION: '/auth/resend-verification'
  },

  // User Management
  USERS: {
    LIST: '/users',
    SHOW: (id: string) => `/users/${id}`,
    CREATE: '/users',
    UPDATE: (id: string) => `/users/${id}`,
    DELETE: (id: string) => `/users/${id}`,
    CHANGE_PASSWORD: (id: string) => `/users/${id}/change-password`,
    UPLOAD_AVATAR: (id: string) => `/users/${id}/avatar`
  },

  // Roles & Permissions
  ROLES: {
    LIST: '/roles',
    SHOW: (id: string) => `/roles/${id}`,
    CREATE: '/roles',
    UPDATE: (id: string) => `/roles/${id}`,
    DELETE: (id: string) => `/roles/${id}`
  },

  PERMISSIONS: {
    LIST: '/permissions',
    SHOW: (id: string) => `/permissions/${id}`,
    CREATE: '/permissions',
    UPDATE: (id: string) => `/permissions/${id}`,
    DELETE: (id: string) => `/permissions/${id}`,
    MODULES: '/permissions/modules'
  },

  // Dashboard
  DASHBOARD: {
    STATS: '/dashboard/stats',
    ANALYTICS: '/dashboard/analytics',
    ACTIVITIES: '/dashboard/activities'
  },

  // File Management
  FILES: {
    UPLOAD: '/files/upload',
    DOWNLOAD: (id: string) => `/files/${id}/download`,
    DELETE: (id: string) => `/files/${id}`
  },

  // Settings
  SETTINGS: {
    GENERAL: '/settings/general',
    SECURITY: '/settings/security',
    NOTIFICATIONS: '/settings/notifications',
    UPDATE: '/settings'
  },

  // CMS Content Management endpoints
  CMS: {
    // Home page content
    HOME_CONTENT: {
      GET: '/cms/home-content',
      POST: '/cms/home-content'
    },

    // Services management
    SERVICES: {
      GET: '/cms/services',
      POST: '/cms/services',
      PUT: (id: string) => `/cms/services/${id}`,
      DELETE: (id: string) => `/cms/services/${id}`
    },

    // Services page content
    SERVICES_CONTENT: {
      GET: '/cms/services-content',
      POST: '/cms/services-content'
    },

    // About page content
    ABOUT_CONTENT: {
      GET: '/cms/about-content',
      POST: '/cms/about-content'
    },

    // Team management
    TEAM: {
      GET: '/cms/team',
      POST: '/cms/team',
      PUT: (id: string) => `/cms/team/${id}`,
      DELETE: (id: string) => `/cms/team/${id}`
    },

    // Team page content
    TEAM_CONTENT: {
      GET: '/cms/team-content',
      POST: '/cms/team-content'
    },

    // Contact page content
    CONTACT_CONTENT: {
      GET: '/cms/contact-content',
      POST: '/cms/contact-content'
    },

    // FAQ management
    FAQS: {
      GET: '/cms/faqs',
      POST: '/cms/faqs',
      PUT: (id: string) => `/cms/faqs/${id}`,
      DELETE: (id: string) => `/cms/faqs/${id}`
    },

    // Site settings
    SITE_SETTINGS: {
      GET: '/cms/site-settings',
      POST: '/cms/site-settings'
    }
  },

  // File upload endpoints
  UPLOAD: {
    IMAGE: '/upload/image',
    FILE: '/upload/file',
    AVATAR: '/upload/avatar'
  },

  // Analytics endpoints (for future use)
  ANALYTICS: {
    DASHBOARD: '/analytics/dashboard',
    TRAFFIC: '/analytics/traffic',
    CONVERSIONS: '/analytics/conversions'
  }
} as const

// HTTP Status Codes
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503
} as const

// Request Timeouts (in milliseconds)
export const API_TIMEOUTS = {
  DEFAULT: 10000,    // 10 seconds
  UPLOAD: 60000,     // 1 minute
  DOWNLOAD: 30000,   // 30 seconds
  AUTH: 15000        // 15 seconds
} as const

// Pagination
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PER_PAGE: 20,
  MAX_PER_PAGE: 100
} as const

// Build full API URL
export const buildApiUrl = (endpoint: string): string => {
  const baseUrl = getApiBaseUrl()
  return `${baseUrl}${endpoint}`
}