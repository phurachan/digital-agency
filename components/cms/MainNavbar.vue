<template>
  <nav class="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100" style="top: 40px;">
    <div class="container">
      <div class="flex justify-between items-center py-4">
        <!-- Logo and/or Text based on navbarDisplayMode -->
        <component :is="linkComponent" :to="linkTo" class="flex items-center space-x-3">
          <img
            v-if="siteSettings.logo && (siteSettings.navbarDisplayMode === 'logo' || siteSettings.navbarDisplayMode === 'both')"
            :src="siteSettings.logo"
            :alt="siteSettings.siteName"
            class="h-10 w-auto object-contain"
          >
          <div
            v-if="siteSettings.navbarDisplayMode === 'text' || siteSettings.navbarDisplayMode === 'both' || !siteSettings.logo"
            class="text-2xl font-bold gradient-text"
          >
            {{ siteSettings.siteName }}
          </div>
        </component>

        <!-- Navigation Links -->
        <div class="hidden md:flex space-x-8">
          <slot name="nav-links"></slot>
        </div>

        <!-- Action Button -->
        <div class="hidden md:block">
          <slot name="action-button"></slot>
        </div>

        <!-- Mobile Menu Button -->
        <button class="md:hidden p-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>
  </nav>
</template>

<script setup>
const props = defineProps({
  linkTo: {
    type: String,
    default: '/digital-agency'
  },
  useLink: {
    type: Boolean,
    default: true
  }
})

const cmsStore = useCMSStore()
await cmsStore.fetchSiteSettings()
const siteSettingsRaw = cmsStore.siteSettings

const { createLocalizedContent, parseJsonField } = useMultiLanguage()

const siteSettings = computed(() => {
  const localized = createLocalizedContent(siteSettingsRaw)
  return {
    ...localized,
    logo: siteSettingsRaw?.logo,
    navbarDisplayMode: siteSettingsRaw?.navbarDisplayMode || 'both'
  }
})

const linkComponent = computed(() => props.useLink ? 'NuxtLink' : 'a')
</script>

<style scoped>
.gradient-text {
  background: linear-gradient(to right, var(--primary-color, #6495ed), var(--secondary-color, #9333ea));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

.container {
  max-width: 80rem;
  margin-left: auto;
  margin-right: auto;
  padding-left: 1rem;
  padding-right: 1rem;
}

@media (min-width: 640px) {
  .container {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }
}

@media (min-width: 1024px) {
  .container {
    padding-left: 2rem;
    padding-right: 2rem;
  }
}
</style>
