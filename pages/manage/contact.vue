<template>
  <div class="min-h-screen bg-gray-50">

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <BasePageHeader
        :title="t('manage.contact.title')"
        code="CONTACT-001"
        :description="t('manage.contact.description')"
        :breadcrumbs="[
          { label: t('manage.common.dashboard'), to: '/manage', icon: 'home' },
          { label: t('manage.contact.breadcrumb'), icon: 'mail' }
        ]"
      />

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Language Switcher -->
      <div v-else class="card p-4 mb-8">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">{{ t('manage.common.contentLanguage') }}</h3>
          <div class="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              @click="currentLanguage = 'en'"
              type="button"
              :class="currentLanguage === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'"
              class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {{ t('manage.common.english') }}
            </button>
            <button
              @click="currentLanguage = 'th'"
              type="button"
              :class="currentLanguage === 'th' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'"
              class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {{ t('manage.common.thai') }}
            </button>
          </div>
        </div>
        <p class="text-sm text-gray-500 mt-2">
          {{ t('manage.common.switchLanguageHint') }} {{ currentLanguage === 'en' ? t('manage.common.editingEnglish') : t('manage.common.editingThai') }}
        </p>
      </div>

      <!-- Form -->
      <form v-if="!loading" @submit.prevent="handleSubmit" class="space-y-8">
        <!-- Banner Image -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t('manage.contact.bannerImage') }}</h2>
          <CmsImageUpload
            v-model="formData.bannerImage"
            :label="t('manage.contact.bannerImageLabel')"
          />
        </div>

        <!-- Hero Background Image -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t('manage.contact.heroBackgroundImage') }}</h2>
          <CmsImageUpload
            v-model="formData.heroImage"
            :label="t('manage.contact.heroSectionBackground')"
            :help-text="t('manage.contact.heroImageHelp')"
          />
        </div>

        <!-- Page Content -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t('manage.contact.pageContent') }}</h2>

          <div class="space-y-6">
            <BaseInput
              v-model="formData.title[currentLanguage]"
              type="text"
              :label="`${t('manage.contact.pageTitle')} (${currentLanguage.toUpperCase()})`"
              :placeholder="t('manage.contact.enterPageTitle')"
              required
            />

            <BaseTextarea
              v-model="formData.subtitle[currentLanguage]"
              :label="`${t('manage.contact.pageSubtitle')} (${currentLanguage.toUpperCase()})`"
              :placeholder="t('manage.contact.enterPageSubtitle')"
              :rows=3
              required
            />
          </div>
        </div>

        <!-- Contact Information -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t('manage.contact.contactInformation') }}</h2>

          <div class="space-y-6">
            <BaseInput
              v-model="formData.phone"
              type="tel"
              :label="t('manage.contact.phoneNumber')"
              :placeholder="t('manage.contact.enterPhoneNumber')"
              required
            />

            <BaseInput
              v-model="formData.email"
              type="email"
              :label="t('manage.contact.emailAddress')"
              :placeholder="t('manage.contact.enterEmailAddress')"
              required
            />

            <BaseTextarea
              v-model="formData.address[currentLanguage]"
              :label="`${t('manage.contact.physicalAddress')} (${currentLanguage.toUpperCase()})`"
              :placeholder="t('manage.contact.enterPhysicalAddress')"
              :rows=3
              required
            />
          </div>
        </div>

        <!-- Business Hours -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t('manage.contact.businessHours') }}</h2>

          <div class="space-y-4">
            <div v-for="(hours, day) in businessHours" :key="day" class="flex items-center space-x-4">
              <div class="w-24">
                <label class="text-sm font-medium text-gray-700">{{ day }}</label>
              </div>
              <div class="flex-1">
                <input
                  v-model="businessHours[day]"
                  type="text"
                  :placeholder="t('manage.contact.hoursPlaceholder')"
                  class="form-input"
                >
              </div>
            </div>
          </div>
        </div>

        <!-- Map Embed -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t('manage.contact.mapIntegration') }}</h2>

          <div class="space-y-4">
            <BaseInput
              v-model="formData.mapEmbedUrl"
              type="url"
              :label="t('manage.contact.googleMapsEmbedUrl')"
              :placeholder="t('manage.contact.enterGoogleMapsUrl')"
            />
            <p class="text-sm text-gray-600">
              {{ t('manage.contact.mapInstructions') }}
            </p>
          </div>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end space-x-4">
          <NuxtLink to="/manage">
            <BaseButton variant="secondary">{{ t('manage.common.cancel') }}</BaseButton>
          </NuxtLink>
          <BaseButton
            type="submit"
            variant="primary"
            :disabled="saving"
          >
            {{ saving ? t('manage.common.saving') : t('manage.common.saveChanges') }}
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
const { t } = useI18n()

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
  title: { en: '', th: '' },
  subtitle: { en: '', th: '' },
  address: { en: '', th: '' },
  // Language-neutral fields
  phone: '',
  email: '',
  mapEmbedUrl: '',
  bannerImage: '',
  heroImage: ''
})

// Business hours (separate reactive object for easier management)
const businessHours = reactive({
  'Monday': '',
  'Tuesday': '',
  'Wednesday': '',
  'Thursday': '',
  'Friday': '',
  'Saturday': '',
  'Sunday': ''
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
    await cmsStore.fetchContactContent()
    const response = cmsStore.contactContent
    // console.log('Loaded contact content:', response)

    if (response) {
      // The API already transforms JSON strings to objects, so use them directly
      formData.title = response.title || { en: '', th: '' }
      formData.subtitle = response.subtitle || { en: '', th: '' }
      formData.address = response.address || { en: '', th: '' }
      
      // Language-neutral fields
      formData.phone = response.phone || ''
      formData.email = response.email || ''
      formData.mapEmbedUrl = response.mapEmbedUrl || ''
      formData.heroImage = response.heroImage || ''
      formData.bannerImage = response.bannerImage || ''
      
      // Handle business hours (may already be parsed by API)
      if (response.businessHours) {
        try {
          const hours = typeof response.businessHours === 'string'
            ? JSON.parse(response.businessHours)
            : response.businessHours
          Object.assign(businessHours, hours)
        } catch (e) {
          console.error('Failed to parse business hours:', e)
        }
      }
    }
  } catch (error) {
    errorMessage.value = t('manage.contact.failedToLoad')
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
    const payload = {
      // Multi-language fields as JSON strings
      title: JSON.stringify(formData.title),
      subtitle: JSON.stringify(formData.subtitle),
      address: JSON.stringify(formData.address),
      // Language-neutral fields
      phone: formData.phone,
      email: formData.email,
      mapEmbedUrl: formData.mapEmbedUrl,
      heroImage: formData.heroImage,
      bannerImage: formData.bannerImage,
      businessHours: JSON.stringify(businessHours)
    }

    await cmsStore.updateContactContent({ body: payload })

    successMessage.value = t('manage.contact.updateSuccess')
  } catch (error) {
    errorMessage.value = t('manage.contact.updateError')
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
  title: `Edit Contact Page | ${siteSettings.siteName} CMS`,
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
</style>
