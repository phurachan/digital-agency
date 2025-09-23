import { API_ENDPOINTS, buildApiUrl } from '~/constants/api'

export default defineNuxtRouteMiddleware(async (to, from) => {
  // Only protect /agency-cms/manage routes, skip auth check for login page
  if (!to.path.startsWith('/agency-cms/manage') && to.path !== '/agency-cms/login.vue') {
    return
  }

  // Skip middleware on server side during SSR
  if (import.meta.server) return

  // Add a small delay to ensure cookies are properly set after login
  if (from?.path === '/agency-cms/login') {
    console.log('Coming from login page, adding delay for cookie propagation')
    await new Promise(resolve => setTimeout(resolve, 100))
  }

  try {
    // const { $fetch } = useNuxtApp()
    console.log('Auth middleware: Checking authentication for path:', to.path)
    
    const response = await $fetch(buildApiUrl(API_ENDPOINTS.AUTH.ME))
    
    if (!response?.user) {
      console.log('Auth middleware: No user found, redirecting to login')
      return navigateTo('/agency-cms/login', { replace: true })
    }

    console.log('Auth middleware: User authenticated:', response.user.email)
    
    // Update the global auth state
    const authState = useState('auth')
    if (authState.value) {
      authState.value.user = response.user
      authState.value.isAuthenticated = true
      authState.value.isLoading = false
    }
  } catch (error: any) {
    console.log('Auth middleware: Auth check failed:', error.data?.message || error.message || error)
    return navigateTo('/agency-cms/login', { replace: true })
  }
})