export default defineNuxtPlugin(async () => {
  const cmsStore = useCMSStore()

  // Fetch site settings if not already loaded
  if (!cmsStore.siteSettings) {
    await cmsStore.fetchSiteSettings()
  }

  // Set favicon using site settings
  // Use favicon if available, otherwise fallback to logo
  const faviconUrl = cmsStore.siteSettings?.favicon || cmsStore.siteSettings?.logo

  if (faviconUrl) {
    useHead({
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: faviconUrl
        },
        {
          rel: 'shortcut icon',
          type: 'image/x-icon',
          href: faviconUrl
        },
        {
          rel: 'apple-touch-icon',
          href: faviconUrl
        }
      ]
    })
  }
})
