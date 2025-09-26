export default defineNuxtRouteMiddleware(async (to) => {
  // Skip middleware for API routes, login page, and all public pages (anything NOT starting with /digital-agency/admin or /digital-agency/manage)
  if (to.path.startsWith('/api/') || to.path === '/digital-agency/login') {
    return
  }

  const isAdminPath = to.path.startsWith('/digital-agency/admin')
  const isManagePath = to.path.startsWith('/digital-agency/manage')

  // Only run permission checks for admin and manage pages
  if (!isAdminPath && !isManagePath) {
    return
  }

  // Only run on client-side after hydration to ensure Pinia is ready
  if (process.server) {
    return
  }

  // Check authentication using cookies first, before accessing Pinia
  const tokenCookie = useCookie('token', { default: () => null })
  const userCookie = useCookie('user', { default: () => null })

  // If no token, redirect to login immediately
  if (!tokenCookie.value) {
    return navigateTo(`/digital-agency/login?redirect=${encodeURIComponent(to.fullPath)}`)
  }

  // If no user data, allow access (will be handled by store initialization)
  if (!userCookie.value) {
    return
  }

  try {
    // Now try to access Pinia stores for permission checks
    const authStore = useAuthStore()
    const { hasPermission, canAccessModule, isAdmin } = usePermissions()

    // Wait for auth initialization to complete
    if (!authStore.hasInitialized) {
      await authStore.initializeAuth()
    }

    // Check if user is authenticated after initialization
    if (!authStore.isAuthenticated) {
      return navigateTo(`/digital-agency/login?redirect=${encodeURIComponent(to.fullPath)}`)
    }

    // If user is authenticated but user data isn't loaded yet, allow access
    if (!authStore.user) {
      return
    }

    // Define route permissions mapping
    const routePermissions: Record<string, string[]> = {
      '/digital-agency/admin': ['dashboard.access'],
      '/digital-agency/admin/components': ['components.access'],
      '/digital-agency/admin/demo': ['demo.access'],
      '/digital-agency/admin/user_management': ['user_management.access'],
    }

    // Get the base path (without query parameters)
    const basePath = to.path?.split('?')[0] ?? ''

    // Check if route requires specific permissions
    const requiredPermissions = routePermissions[basePath]

    if (requiredPermissions) {
      // Admin users bypass all permission checks
      if (isAdmin.value) {
        return
      }

      // Check if user has required permissions
      const hasRequiredPermission = requiredPermissions.some((permission: string) => {
        return hasPermission(permission)
      })

      if (!hasRequiredPermission) {
        // Redirect to dashboard if user doesn't have permission
        if (basePath !== '/digital-agency/admin') {
          return navigateTo('/digital-agency/admin')
        } else {
          // If user can't access dashboard, redirect to login
          return navigateTo(`/digital-agency/login?redirect=${encodeURIComponent(to.fullPath)}`)
        }
      }
    }

    // For dynamic routes, check module access
    if (basePath.startsWith('/digital-agency/admin/user_management/') && !canAccessModule('user_management')) {
      return navigateTo('/digital-agency/admin')
    }
  } catch (error) {
    console.warn('Error in permissions middleware:', error)
    // If there's an error, allow access for now to prevent app from breaking
    return
  }
})