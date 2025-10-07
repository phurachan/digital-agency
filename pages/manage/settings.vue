<template>
  <div class="min-h-screen bg-gray-50">

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <BasePageHeader
        title="Site Settings"
        code="SET-001"
        description="Configure site identity, colors, social media, and global settings"
        :breadcrumbs="[
          { label: 'Dashboard', to: '/manage', icon: 'home' },
          { label: 'Settings', icon: 'cog' }
        ]"
      />

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Form -->
      <form v-else @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Site Identity -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Site Identity</h2>
          
          <div class="space-y-6">
            <BaseInput
              v-model="form.siteName"
              type="text"
              label="Site Name"
              placeholder="Enter site name..."
              required
            />

            <BaseInput
              v-model="form.siteTagline"
              type="text"
              label="Site Tagline"
              placeholder="Enter site tagline..."
              required
            />

            <CmsImageUpload
              v-model="form.logo"
              label="Site Logo (optional)"
            />

            <CmsImageUpload
              v-model="form.favicon"
              label="Site Favicon (optional)"
            />
          </div>
        </div>

        <!-- Brand Colors -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Brand Colors</h2>
          
          <div class="space-y-4">
            <div class="flex items-center space-x-4">
              <div class="relative">
                <input 
                  v-model="form.primaryColor" 
                  type="color" 
                  class="w-16 h-16 border-2 border-gray-300 rounded-lg cursor-pointer"
                >
              </div>
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-2">Primary Color</label>
                <BaseInput
                  v-model="form.primaryColor"
                  type="text"
                  placeholder="#6495ed"
                  pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                />
              </div>
            </div>
            
            <div class="flex items-center space-x-4">
              <div class="relative">
                <input 
                  v-model="form.secondaryColor" 
                  type="color" 
                  class="w-16 h-16 border-2 border-gray-300 rounded-lg cursor-pointer"
                >
              </div>
              <div class="flex-1">
                <label class="block text-sm font-medium text-gray-700 mb-2">Secondary Color</label>
                <BaseInput
                  v-model="form.secondaryColor"
                  type="text"
                  placeholder="#9333ea"
                  pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$"
                />
              </div>
            </div>
            
            <p class="text-sm text-gray-600">
              <strong>Primary:</strong> Used for buttons, links, and main brand elements.<br>
              <strong>Secondary:</strong> Used for gradients and accent elements to create visual variety.
            </p>
          </div>
        </div>

        <!-- Navbar Settings -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Navbar Settings</h2>

          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Navbar Display Mode</label>
              <div class="space-y-2">
                <label
                  class="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors navbar-mode-option"
                  :class="form.navbarDisplayMode === 'logo' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'"
                >
                  <input type="radio" v-model="form.navbarDisplayMode" value="logo" class="text-blue-600 focus:ring-blue-500">
                  <div>
                    <div class="font-medium text-gray-900 dark:text-gray-100">Logo Only</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">Display only the logo image</div>
                  </div>
                </label>
                <label
                  class="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors navbar-mode-option"
                  :class="form.navbarDisplayMode === 'text' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'"
                >
                  <input type="radio" v-model="form.navbarDisplayMode" value="text" class="text-blue-600 focus:ring-blue-500">
                  <div>
                    <div class="font-medium text-gray-900 dark:text-gray-100">Text Only</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">Display only the site name text</div>
                  </div>
                </label>
                <label
                  class="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer transition-colors navbar-mode-option"
                  :class="form.navbarDisplayMode === 'both' ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-400' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'"
                >
                  <input type="radio" v-model="form.navbarDisplayMode" value="both" class="text-blue-600 focus:ring-blue-500">
                  <div>
                    <div class="font-medium text-gray-900 dark:text-gray-100">Logo and Text</div>
                    <div class="text-sm text-gray-500 dark:text-gray-400">Display both logo and site name</div>
                  </div>
                </label>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Navbar Text Color</label>
              <div class="flex items-center space-x-4">
                <input
                  v-model="form.navbarTextColor"
                  type="color"
                  class="w-16 h-16 border-2 border-gray-300 rounded-lg cursor-pointer"
                >
                <BaseInput
                  v-model="form.navbarTextColor"
                  type="text"
                  placeholder="#1a1a1a"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">Navbar Background Color</label>
              <div class="flex items-center space-x-4">
                <input
                  v-model="form.navbarBgColor"
                  type="color"
                  class="w-16 h-16 border-2 border-gray-300 rounded-lg cursor-pointer"
                >
                <BaseInput
                  v-model="form.navbarBgColor"
                  type="text"
                  placeholder="#ffffff"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Social Media Links -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Social Media Links</h2>
          
          <div class="space-y-4">
            <div v-for="(_, platform) in socialLinks" :key="platform" class="space-y-1">
              <BaseInput
                v-model="socialLinks[platform]"
                type="url"
                :label="`${platform.charAt(0).toUpperCase() + platform.slice(1)} URL`"
                :placeholder="`Enter ${platform} URL...`"
              />
              <p class="text-xs text-gray-500 mt-1">e.g., https://{{ platform }}.com/yourcompany</p>
            </div>
          </div>
        </div>

        <!-- SEO Settings -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">SEO Settings</h2>
          
          <div class="space-y-6">
            <div>
              <BaseTextarea
                v-model="form.metaDescription"
                label="Meta Description (160 chars max)"
                placeholder="Enter meta description..."
                :rows=3
                :maxlength=160
              />
              <p class="text-sm text-gray-500 mt-1">{{ (form.metaDescription || '').length }}/160 characters</p>
            </div>

            <BaseInput
              v-model="form.keywords"
              type="text"
              label="Keywords (comma separated)"
              placeholder="Enter keywords, separated by commas..."
            />
          </div>
        </div>

        <!-- Contact Settings -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Global Contact Settings</h2>
          
          <div class="space-y-6">
            <BaseInput
              v-model="form.contactEmail"
              type="email"
              label="Main Contact Email"
              placeholder="Enter contact email..."
            />

            <BaseInput
              v-model="form.contactPhone"
              type="tel"
              label="Main Contact Phone"
              placeholder="Enter contact phone..."
            />
          </div>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end space-x-4">
          <NuxtLink to="/manage">
            <BaseButton variant="secondary">Cancel</BaseButton>
          </NuxtLink>
          <BaseButton
            type="submit"
            variant="primary"
            :disabled="saving"
          >
            {{ saving ? 'Saving...' : 'Save Settings' }}
          </BaseButton>
        </div>
      </form>
    </div>

    <!-- Success/Error Messages -->
    <div v-if="successMessage" class="fixed top-20 right-4 p-4 bg-green-50 border border-green-200 rounded-lg shadow-xl z-50">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-green-700 font-medium">{{ successMessage }}</p>
      </div>
    </div>

    <div v-if="errorMessage" class="fixed top-20 right-4 p-4 bg-red-50 border border-red-200 rounded-lg shadow-xl z-50">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-red-700 font-medium">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

const cmsStore = useCMSStore()
await cmsStore.fetchSiteSettings()
const siteSettings = cmsStore.siteSettings


// Form data
const form = reactive({
  siteName: '',
  siteTagline: '',
  logo: '',
  favicon: '',
  navbarDisplayMode: 'both',
  primaryColor: '#6495ed',
  secondaryColor: '#9333ea',
  navbarTextColor: '#1a1a1a',
  navbarBgColor: '#ffffff',
  metaDescription: '',
  keywords: '',
  contactEmail: '',
  contactPhone: ''
})

// Social links (separate reactive object)
const socialLinks = reactive({
  facebook: '',
  twitter: '',
  instagram: '',
  linkedin: '',
  youtube: ''
})

// Use computed properties from store
const loading = computed(() => cmsStore.isLoading)
const saving = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Load existing content
onMounted(async () => {
  await loadContent()
})

const loadContent = async () => {
  try {
    // Force fresh fetch using store
    await cmsStore.fetchSiteSettings()
    const settings = cmsStore.siteSettings
    console.log('Store settings:', settings)

    if (settings) {
      // Handle potentially nested object fields - extract values safely
      const extractValue = (field) => {
        console.log('Extracting field:', field, 'Type:', typeof field)
        if (!field) return ''
        if (typeof field === 'string') return field
        if (typeof field === 'object') {
          // Try to get en value first, then th, but handle empty strings
          const enValue = field.en && field.en.trim() !== '' ? field.en : null
          const thValue = field.th && field.th.trim() !== '' ? field.th : null
          return enValue || thValue || ''
        }
        return String(field)
      }

      form.siteName = extractValue(settings.siteName)
      form.siteTagline = extractValue(settings.siteTagline)
      form.logo = extractValue(settings.logo)
      form.favicon = extractValue(settings.favicon)
      form.navbarDisplayMode = extractValue(settings.navbarDisplayMode) || 'both'
      form.primaryColor = extractValue(settings.primaryColor) || '#6495ed'
      form.secondaryColor = extractValue(settings.secondaryColor) || '#9333ea'
      form.navbarTextColor = extractValue(settings.navbarTextColor) || '#1a1a1a'
      form.navbarBgColor = extractValue(settings.navbarBgColor) || '#ffffff'
      form.metaDescription = extractValue(settings.metaDescription)
      form.keywords = extractValue(settings.keywords)
      form.contactEmail = extractValue(settings.contactEmail)
      form.contactPhone = extractValue(settings.contactPhone)

      // Handle social links (may already be parsed by API)
      if (settings.socialLinks) {
        try {
          const links = typeof settings.socialLinks === 'string'
            ? JSON.parse(settings.socialLinks)
            : settings.socialLinks
          Object.assign(socialLinks, links)
        } catch (e) {
          console.error('Failed to parse social links:', e)
        }
      }
    }
  } catch (error) {
    errorMessage.value = 'Failed to load settings'
    console.error('Failed to load settings:', error)
  }
}

const handleSubmit = async () => {
  saving.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const payload = {
      ...form,
      socialLinks: JSON.stringify(socialLinks)
    }

    await cmsStore.updateSiteSettings({ body: payload })

    successMessage.value = 'Site settings updated successfully!'
  } catch (error) {
    errorMessage.value = 'Failed to update settings. Please try again.'
    console.error('Failed to update settings:', error)
  } finally {
    saving.value = false
  }
}


// Clear messages after 5 seconds
watch([successMessage, errorMessage], () => {
  if (successMessage.value || errorMessage.value) {
    setTimeout(() => {
      successMessage.value = ''
      errorMessage.value = ''
    }, 5000)
  }
})

// SEO
useSeoMeta({
  title: `Site Settings | ${siteSettings.siteName} CMS`,
  robots: 'noindex, nofollow'
})
</script>

<style scoped>
:root {
  --primary-color: v-bind('siteSettings.primaryColor || "#6495ed"');
  --secondary-color: v-bind('siteSettings.secondaryColor || "#9333ea"');
}

.card {
  background: white;
  border: 1px solid rgb(229 231 235);
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] .card {
  background: rgb(31 41 55);
  border-color: rgb(55 65 81);
}

[data-theme="dark"] .text-gray-900 {
  color: rgb(243 244 246);
}

[data-theme="dark"] .text-gray-700 {
  color: rgb(229 231 235);
}

[data-theme="dark"] .text-gray-500 {
  color: rgb(156 163 175);
}

[data-theme="dark"] .text-gray-600 {
  color: rgb(209 213 219);
}

[data-theme="dark"] .bg-gray-50 {
  background: rgb(17 24 39);
}

[data-theme="dark"] .form-input {
  background: rgb(55 65 81);
  border-color: rgb(75 85 99);
  color: rgb(243 244 246);
}

[data-theme="dark"] .form-input::placeholder {
  color: rgb(156 163 175);
}

[data-theme="dark"] .form-input:focus {
  border-color: rgb(59 130 246);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

[data-theme="dark"] .floating-label {
  color: rgb(156 163 175);
}

[data-theme="dark"] .form-input:focus ~ .floating-label,
[data-theme="dark"] .form-input:not(:placeholder-shown) ~ .floating-label {
  color: rgb(96 165 250);
}

[data-theme="dark"] .bg-gray-100 {
  background: rgb(55 65 81);
}
</style>
