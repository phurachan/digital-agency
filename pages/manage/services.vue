<template>
  <div class="min-h-screen bg-gray-50">

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <BasePageHeader :title="t('manage.services.title')" code="SRV-001"
        :description="t('manage.services.description')" :breadcrumbs="[
          { label: t('manage.common.dashboard'), to: '/manage', icon: 'home' },
          { label: t('nav.services'), icon: 'document' }
        ]">
        <template v-slot:actions>
          <BaseButton variant="primary" class="mt-4" @click="openAddModal">
            {{ t('manage.services.addService') }}
          </BaseButton>
        </template>
      </BasePageHeader>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Services List -->
      <div v-else class="space-y-6">
        <div v-for="service in localizedServices" :key="service.id" class="card p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-3">
                <div class="w-4 h-4 rounded-full border-2 border-white shadow"
                  :style="{ backgroundColor: service.color || '#6495ed' }"></div>
                <h3 class="text-xl font-bold text-gray-900">{{ service.title }}</h3>
                <span v-if="!service.isActive"
                  class="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">{{ t('manage.services.inactive') }}</span>
                <span v-if="service.isDisplayInHome"
                  class="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">🏠
                  {{ t('manage.services.home') }}</span>
                <span v-else class="px-2 py-1 bg-yellow-100 text-yellow-600 text-xs rounded-full">📋 {{ t('manage.services.listOnly') }}</span>
              </div>

              <p class="text-gray-600 mb-4">{{ service.description }}</p>

              <div v-if="service.features?.length" class="mb-4">
                <p class="text-sm font-medium text-gray-700 mb-2">{{ t('manage.services.features') }}:</p>
                <div class="flex flex-wrap gap-2">
                  <span v-for="feature in service.features" :key="feature"
                    class="px-3 py-1 text-sm rounded-full text-white"
                    :style="{ backgroundColor: service.color || '#6495ed', opacity: 0.9 }">
                    {{ feature }}
                  </span>
                </div>
              </div>

              <div class="flex items-center space-x-4 text-sm text-gray-500">
                <span>{{ t('manage.services.order') }}: {{ service.order || '-' }}</span>
                <span>•</span>
                <span>{{ t('manage.services.updated') }}: {{ formatDate(service.updatedAt) }}</span>
              </div>
            </div>

            <div class="flex items-center space-x-2 ml-4">
              <button @click="editService(service)" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                  </path>
                </svg>
              </button>

              <button @click="toggleHomeDisplay(service)"
                :class="service.isDisplayInHome ? 'text-green-600 hover:bg-green-50' : 'text-gray-600 hover:bg-gray-50'"
                class="p-2 rounded-lg" :title="service.isDisplayInHome ? t('manage.services.removeFromHome') : t('manage.services.addToHome')">
                <svg v-if="service.isDisplayInHome" class="w-5 h-5" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                  </path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </button>

              <button @click="deleteService(service)" class="p-2 text-red-600 hover:bg-red-50 rounded-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                  </path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-if="localizedServices.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
            </path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">{{ t('manage.services.noServices') }}</h3>
          <p class="mt-1 text-sm text-gray-500">{{ t('manage.services.getStarted') }}</p>
          <BaseButton variant="primary" class="mt-4" @click="openAddModal">
            {{ t('manage.services.addService') }}
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Service Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-900">
              {{ editingService ? t('manage.services.editService') : t('manage.services.addNewService') }}
            </h2>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <!-- Language Switcher -->
          <div class="bg-gray-50 p-4 rounded-lg mb-6">
            <div class="flex items-center justify-between">
              <h3 class="text-sm font-medium text-gray-900">{{ t('manage.services.contentLanguage') }}</h3>
              <div class="flex items-center bg-white rounded-lg p-1 border">
                <button @click="currentLanguage = 'en'" type="button"
                  :class="currentLanguage === 'en' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-900'"
                  class="px-3 py-1 rounded-md text-xs font-medium transition-colors">
                  🇺🇸 EN
                </button>
                <button @click="currentLanguage = 'th'" type="button"
                  :class="currentLanguage === 'th' ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:text-gray-900'"
                  class="px-3 py-1 rounded-md text-xs font-medium transition-colors">
                  🇹🇭 TH
                </button>
              </div>
            </div>
          </div>

          <form @submit.prevent="saveService" class="space-y-6">
            <BaseInput v-model="serviceFormData.title[currentLanguage]"
              :label="`${t('manage.services.serviceTitle')} (${currentLanguage.toUpperCase()})`" required />

            <BaseTextarea v-model="serviceFormData.description[currentLanguage]"
              :label="`${t('manage.services.description')} (${currentLanguage.toUpperCase()})`" :rows=3 required />

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                {{ t('manage.services.category') }} ({{ currentLanguage.toUpperCase() }})
              </label>
              <div class="space-y-2">
                <select
                  v-model="serviceFormData.category[currentLanguage]"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white"
                >
                  <option value="">{{ t('manage.services.selectExisting') }}</option>
                  <option v-for="cat in existingCategories" :key="cat" :value="cat">{{ cat }}</option>
                </select>
                <input
                  v-model="serviceFormData.category[currentLanguage]"
                  type="text"
                  class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  :placeholder="`${t('manage.services.typeNewCategory')} (${currentLanguage.toUpperCase()})`"
                />
              </div>
              <p class="text-xs text-gray-500 mt-1">{{ t('manage.services.selectFromDropdown') }}</p>
            </div>

            <BaseInput v-model="serviceFormData.icon" type="text" :label="t('manage.services.iconName')" />

            <div>
              <label class="form-label">{{ t('manage.services.serviceImage') }}</label>
              <CmsImageUpload v-model="serviceFormData.image" :label="t('manage.services.serviceImage')"
                :help-text="t('manage.services.serviceImageHelp')" />
            </div>

            <div>
              <label class="form-label">{{ t('manage.services.serviceVideo') }}</label>
              <CmsVideoUpload v-model="serviceFormData.video" :label="t('manage.services.serviceVideo')"
                :help-text="t('manage.services.serviceVideoHelp')" />
            </div>

            <BaseInput v-model="serviceFormData.externalURL" type="url" :label="t('manage.services.externalURL')"
              :placeholder="t('manage.services.externalURLPlaceholder')"
              :help="t('manage.services.externalURLHelp')" />

            <!-- Color Picker -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('manage.services.cardColor') }}</label>
              <div class="flex items-center space-x-4">
                <div class="relative">
                  <input v-model="serviceFormData.color" type="color"
                    class="w-16 h-16 border-2 border-gray-300 rounded-lg cursor-pointer">
                </div>
                <div class="flex-1">
                  <BaseInput v-model="serviceFormData.color" type="text" placeholder="#6495ed"
                    pattern="^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$" />
                  <p class="text-xs text-gray-500 mt-1">{{ t('manage.services.cardColorHelp') }}</p>
                </div>
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">{{ t('manage.services.features') }} ({{ currentLanguage.toUpperCase()
                }})</label>
              <div class="space-y-2">
                <div v-for="(feature, index) in serviceFormData.features" :key="index" class="flex space-x-2">
                  <BaseInput v-model="serviceFormData.features[index][currentLanguage]" type="text"
                    :placeholder="`${t('manage.services.feature')} ${index + 1} (${currentLanguage.toUpperCase()})`" class="flex-1" />
                  <button @click="removeFeature(index)" type="button"
                    class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
                      </path>
                    </svg>
                  </button>
                </div>
                <button @click="addFeature" type="button"
                  class="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600">
                  {{ t('manage.services.addFeature') }}
                </button>
              </div>
            </div>

            <div class="grid grid-cols-3 gap-4">
              <BaseInput v-model.number="serviceFormData.order" type="number" :label="t('manage.services.displayOrder')" min="0" />

              <BaseCheckbox v-model="serviceFormData.isActive" :label="t('manage.services.active')" />

              <BaseCheckbox v-model="serviceFormData.isDisplayInHome" :label="t('manage.services.displayInHome')" />
            </div>

            <div class="flex justify-end space-x-4 pt-4 border-t">
              <BaseButton variant="secondary" type="button" @click="closeModal">
                {{ t('manage.common.cancel') }}
              </BaseButton>
              <BaseButton variant="primary" type="submit" :disabled="saving" :loading="saving">
                {{ t('manage.services.saveService') }}
              </BaseButton>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Success/Error Messages -->
    <div v-if="successMessage"
      class="fixed top-20 right-4 p-4 bg-green-50 border border-green-200 rounded-lg shadow-xl z-50">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-green-700 font-medium">{{ successMessage }}</p>
      </div>
    </div>

    <div v-if="errorMessage" class="fixed top-20 right-4 p-4 bg-red-50 border border-red-200 rounded-lg shadow-xl z-50">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-red-700 font-medium">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

const cmsStore = useCMSStore()
await cmsStore.fetchSiteSettings()
const siteSettings = cmsStore.siteSettings

// Import multi-language composable
const { createLocalizedContent, getLocalizedFeatures } = useMultiLanguage()
const { locale, t } = useI18n()

// Use computed properties from store like in UsersTab.vue
const loading = computed(() => cmsStore.isLoading)
const saving = ref(false)
const showModal = ref(false)
const editingService = ref(null)
const successMessage = ref('')
const errorMessage = ref('')

// Language state for modal
const currentLanguage = ref('en')

// Multi-language service form
const serviceFormData = reactive({
  // Text fields as JSON {en: "English", th: "Thai"}
  title: { en: '', th: '' },
  description: { en: '', th: '' },
  category: { en: '', th: '' },
  // Features array with multi-language support
  features: [{ en: '', th: '' }],
  // Language-neutral fields
  icon: '',
  image: '',
  video: '',
  externalURL: '',
  color: '#6495ed',
  order: 0,
  isActive: true,
  isDisplayInHome: true
})

// Computed property to get localized services for display
const localizedServices = computed(() => {
  const services = cmsStore.services || []
  if (!Array.isArray(services)) {
    return []
  }
  return services.map(service => {
    const localized = createLocalizedContent(service)

    // Parse category separately if needed
    let categoryDisplay = localized.category || service.category
    if (typeof categoryDisplay === 'string' && categoryDisplay.trim()) {
      try {
        const parsed = JSON.parse(categoryDisplay)
        categoryDisplay = parsed[locale.value] || parsed.en || parsed.th || categoryDisplay
      } catch (e) {
        // Keep as is if parsing fails
      }
    }

    return {
      ...service,
      title: localized.title || service.title,
      description: localized.description || service.description,
      category: categoryDisplay,
      features: getLocalizedFeatures(service.features) || []
    }
  })
})

// Get distinct categories for autocomplete - filtered by current language
const existingCategories = computed(() => {
  const services = cmsStore.services || []
  const categoriesSet = new Set()

  services.forEach(service => {
    if (service.category) {
      try {
        const categoryObj = typeof service.category === 'string'
          ? JSON.parse(service.category)
          : service.category

        // แสดงเฉพาะภาษาที่กำลังเลือกอยู่
        const categoryValue = categoryObj[currentLanguage.value]
        if (categoryValue) {
          categoriesSet.add(categoryValue)
        }
      } catch (e) {
        // If parsing fails, treat as plain string
        categoriesSet.add(service.category)
      }
    }
  })

  return Array.from(categoriesSet).sort()
})

// Methods
onMounted(async () => {
  await loadServices()
})

const loadServices = async () => {
  try {
    await cmsStore.fetchServices()
  } catch (error) {
    console.error('Failed to load services:', error)
    errorMessage.value = t('manage.services.failedToLoad') + ': ' + (error.message || 'Unknown error')
  }
}

const openAddModal = () => {
  editingService.value = null
  resetForm()
  showModal.value = true
}

const editService = (service) => {
  console.log('Editing service:', service)
  editingService.value = service

  // Helper function to parse JSON fields
  const parseField = (field) => {
    if (typeof field === 'object' && field !== null) {
      return field
    }
    if (typeof field === 'string' && field.trim()) {
      try {
        const parsed = JSON.parse(field)
        if (typeof parsed === 'object' && parsed !== null) {
          return parsed
        }
      } catch (e) {
        // If parsing fails, treat as plain string
      }
      return { en: field, th: field }
    }
    return { en: '', th: '' }
  }

  // Handle multi-language fields
  serviceFormData.title = parseField(service.title)
  serviceFormData.description = parseField(service.description)
  serviceFormData.category = parseField(service.category)

  // Handle features array
  if (service.features && Array.isArray(service.features)) {
    // Check if features are objects with th/en or simple strings
    serviceFormData.features = service.features.length > 0
      ? service.features.map(feature => {
        if (typeof feature === 'object' && feature.th && feature.en) {
          return feature
        } else {
          // If feature is a string, use it for current locale
          return { en: feature || '', th: feature || '' }
        }
      })
      : [{ en: '', th: '' }]
  } else {
    serviceFormData.features = [{ en: '', th: '' }]
  }

  // Language-neutral fields
  serviceFormData.icon = service.icon || ''
  serviceFormData.image = service.image || ''
  serviceFormData.video = service.video || ''
  serviceFormData.externalURL = service.externalURL || ''
  serviceFormData.color = service.color || '#6495ed'
  serviceFormData.order = service.order || 0
  serviceFormData.isActive = service.isActive
  serviceFormData.isDisplayInHome = service.isDisplayInHome ?? true

  currentLanguage.value = 'en'
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingService.value = null
  resetForm()
}

const resetForm = () => {
  serviceFormData.title = { en: '', th: '' }
  serviceFormData.description = { en: '', th: '' }
  serviceFormData.category = { en: '', th: '' }
  serviceFormData.features = [{ en: '', th: '' }]
  serviceFormData.icon = ''
  serviceFormData.image = ''
  serviceFormData.video = ''
  serviceFormData.externalURL = ''
  serviceFormData.color = '#6495ed'
  serviceFormData.order = 0
  serviceFormData.isActive = true
  serviceFormData.isDisplayInHome = true
  currentLanguage.value = 'en'
}

const addFeature = () => {
  serviceFormData.features.push({ en: '', th: '' })
}

const removeFeature = (index) => {
  if (serviceFormData.features.length > 1) {
    serviceFormData.features.splice(index, 1)
  }
}

const saveService = async () => {
  saving.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    // Filter out empty features and prepare multi-language data
    const filteredFeatures = serviceFormData.features.filter(feature =>
      feature.en.trim() || feature.th.trim()
    )

    const serviceData = {
      // Multi-language fields as JSON strings
      title: JSON.stringify(serviceFormData.title),
      description: JSON.stringify(serviceFormData.description),
      category: JSON.stringify(serviceFormData.category),
      features: JSON.stringify(filteredFeatures),
      // Language-neutral fields
      icon: serviceFormData.icon,
      image: serviceFormData.image,
      video: serviceFormData.video,
      externalURL: serviceFormData.externalURL,
      color: serviceFormData.color,
      order: serviceFormData.order,
      isActive: serviceFormData.isActive,
      isDisplayInHome: serviceFormData.isDisplayInHome
    }

    if (editingService.value) {
      await cmsStore.updateService({
        body: {
          ...serviceData,
          id: editingService.value.id
        }
      })
      successMessage.value = t('manage.services.serviceUpdated')
    } else {
      await cmsStore.createService({ body: serviceData })
      successMessage.value = t('manage.services.serviceCreated')
    }

    closeModal()
    await loadServices()
  } catch (error) {
    errorMessage.value = t('manage.services.failedToSave')
  } finally {
    saving.value = false
  }
}

const toggleHomeDisplay = async (service) => {
  try {
    await cmsStore.updateService({
      body: {
        ...service,
        id: service.id,
        features: service.features,
        isDisplayInHome: !service.isDisplayInHome
      }
    })

    successMessage.value = service.isDisplayInHome ? t('manage.services.removedFromHome') : t('manage.services.addedToHome')
    await loadServices()
  } catch (error) {
    errorMessage.value = t('manage.services.failedToUpdate')
  }
}

const deleteService = async (service) => {
  if (confirm(t('manage.services.confirmDelete', { title: service.title }))) {
    try {
      await cmsStore.deleteService({ body: { id: service.id } })

      successMessage.value = t('manage.services.serviceDeleted')
      await loadServices()
    } catch (error) {
      errorMessage.value = t('manage.services.failedToDelete')
    }
  }
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString()
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
  title: `Manage Services | ${siteSettings.siteName} CMS`,
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

[data-theme="dark"] .text-gray-400 {
  color: rgb(107 114 128);
}

[data-theme="dark"] .bg-gray-50 {
  background: rgb(17 24 39);
}

[data-theme="dark"] .bg-gray-200 {
  background: rgb(55 65 81);
}

[data-theme="dark"] .bg-white {
  background: rgb(31 41 55);
}

[data-theme="dark"] .border-t {
  border-color: rgb(75 85 99);
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

[data-theme="dark"] .form-input:focus~.floating-label,
[data-theme="dark"] .form-input:not(:placeholder-shown)~.floating-label {
  color: rgb(96 165 250);
}

[data-theme="dark"] button:hover .hover\:bg-blue-50 {
  background: rgba(30, 58, 138, 0.2);
}

[data-theme="dark"] button:hover .hover\:bg-yellow-50 {
  background: rgba(133, 77, 14, 0.2);
}

[data-theme="dark"] button:hover .hover\:bg-green-50 {
  background: rgba(20, 83, 45, 0.2);
}

[data-theme="dark"] button:hover .hover\:bg-red-50 {
  background: rgba(153, 27, 27, 0.2);
}
</style>
