export default defineNuxtPlugin(async () => {
  const { checkAuth } = useAuth()

  // Check authentication status only for CMS pages
  if (process.client) {
    const route = useRoute()
    // Only check auth for CMS management pages
    if (route.path.startsWith('/agency-cms/manage')) {
      await checkAuth()
    }
  }
})