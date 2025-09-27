<template>
  <div class="min-h-screen bg-gray-50">

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <BasePageHeader
        title="Team Page Content"
        code="TEAM-CONTENT-001"
        description="Manage team page hero section and introductory content"
        :breadcrumbs="[
          { label: 'Dashboard', to: '/digital-agency/manage', icon: 'home' },
          { label: 'Team Content', icon: 'user-group' }
        ]"
      />

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Language Switcher -->
      <div v-else class="card p-4 mb-8">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">Content Language</h3>
          <div class="flex items-center bg-gray-100 rounded-lg p-1">
            <button 
              @click="currentLanguage = 'en'"
              type="button"
              :class="currentLanguage === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'"
              class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              🇺🇸 English
            </button>
            <button 
              @click="currentLanguage = 'th'"
              type="button"
              :class="currentLanguage === 'th' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'"
              class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              🇹🇭 ไทย
            </button>
          </div>
        </div>
        <p class="text-sm text-gray-500 mt-2">
          Switch between languages to edit content. {{ currentLanguage === 'en' ? 'Editing English content' : 'กำลังแก้ไขเนื้อหาภาษาไทย' }}
        </p>
      </div>

      <!-- Form -->
      <form v-if="!loading" @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Hero Section -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">Hero Section</h2>
          
          <div class="space-y-6">
            <BaseInput
              v-model="formData.heroTitle[currentLanguage]"
              type="text"
              :label="`Hero Title (${currentLanguage.toUpperCase()})`"
              placeholder="Enter hero title..."
              required
            />

            <BaseTextarea
              v-model="formData.heroSubtitle[currentLanguage]"
              :label="`Hero Subtitle (${currentLanguage.toUpperCase()})`"
              placeholder="Enter hero subtitle..."
              :rows=3
              required
            />
            
            <!-- Hero Background Image -->
            <div>
              <label class="form-label">Hero Background Image</label>
              <CmsImageUpload
                v-model="formData.heroImage"
                label="Hero Section Background (optional)"
                help-text="Recommended: High-quality image, 1920x1080px or larger. Will be used as background for the hero section."
              />
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end space-x-4">
          <NuxtLink to="/digital-agency/manage">
            <BaseButton variant="secondary">Cancel</BaseButton>
          </NuxtLink>
          <BaseButton
            type="submit"
            variant="primary"
            :disabled="saving"
          >
            {{ saving ? 'Saving...' : 'Save Changes' }}
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

const authStore = useAuthStore()
const cmsStore = useCMSStore()
await cmsStore.fetchSiteSettings()
const siteSettings = cmsStore.siteSettings

// Language state
const currentLanguage = ref('en')

// Multi-language form data
const formData = reactive({
  // Text fields as JSON {en: "English", th: "Thai"}
  heroTitle: { en: '', th: '' },
  heroSubtitle: { en: '', th: '' },
  // Images (language-neutral)
  heroImage: ''
})

// Component state
const loading = ref(true)
const saving = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Load existing content
onMounted(async () => {
  await loadContent()
})

// Helper function to parse JSON with fallback
const parseJsonField = (jsonString, fallback) => {
  try {
    const parsed = JSON.parse(jsonString || '{}')
    return typeof parsed === 'object' && parsed !== null ? parsed : fallback
  } catch {
    return fallback
  }
}

const loadContent = async () => {
  try {
    await cmsStore.fetchTeamContent()
    const response = cmsStore.teamContent
    console.log('Loaded team content:', response)

    if (response) {
      // The API already transforms JSON strings to objects, so use them directly
      formData.heroTitle = response.heroTitle || { en: '', th: '' }
      formData.heroSubtitle = response.heroSubtitle || { en: '', th: '' }

      // Images (language-neutral)
      formData.heroImage = response.heroImage || ''
    }
  } catch (error) {
    errorMessage.value = 'Failed to load content'
    console.error('Failed to load content:', error)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  saving.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    // Prepare form data with JSON stringified multi-language fields
    const submitData = {
      // Text fields as JSON strings
      heroTitle: JSON.stringify(formData.heroTitle),
      heroSubtitle: JSON.stringify(formData.heroSubtitle),
      // Images (language-neutral)
      heroImage: formData.heroImage
    }

    await cmsStore.updateTeamContent({ body: submitData })

    successMessage.value = 'Team page content updated successfully!'
  } catch (error) {
    errorMessage.value = 'Failed to update content. Please try again.'
    console.error('Failed to update content:', error)
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
  title: `Edit Team Content | ${siteSettings.siteName} CMS`,
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
