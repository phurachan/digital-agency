<template>
  <div class="min-h-screen bg-gray-50">

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <BasePageHeader title="Manage FAQs" code="FAQ-001"
        description="Create and manage frequently asked questions for your website" :breadcrumbs="[
          { label: 'Dashboard', to: '/manage', icon: 'home' },
          { label: 'FAQs', icon: 'question-mark-circle' }
        ]">
        <template v-slot:actions>
          <BaseButton @click="openAddModal" variant="primary" class="mt-4">
            Add FAQ
          </BaseButton>
        </template>
      </BasePageHeader>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- FAQs List -->
      <div v-else class="space-y-6">
        <div v-for="faq in localizedFaqs" :key="faq.id" class="card p-6">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <div class="flex items-center space-x-3 mb-3">
                <h3 class="text-xl font-bold text-gray-900">{{ faq.question }}</h3>
                <span v-if="!faq.isActive"
                  class="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">Inactive</span>
              </div>

              <p class="text-gray-600 mb-4">{{ faq.answer }}</p>

              <div class="flex items-center space-x-4 text-sm text-gray-500">
                <span>Order: {{ faq.order || '-' }}</span>
                <span>•</span>
                <span>Updated: {{ formatDate(faq.updatedAt) }}</span>
              </div>
            </div>

            <div class="flex items-center space-x-2 ml-4">
              <button @click="editFaq(faq)" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                  </path>
                </svg>
              </button>

              <button @click="toggleFaqStatus(faq)"
                :class="faq.isActive ? 'text-yellow-600 hover:bg-yellow-50' : 'text-green-600 hover:bg-green-50'"
                class="p-2 rounded-lg">
                <svg v-if="faq.isActive" class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728L5.636 5.636m12.728 12.728L5.636 5.636"></path>
                </svg>
                <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </button>

              <button @click="deleteFaq(faq)" class="p-2 text-red-600 hover:bg-red-50 rounded-lg">
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
        <div v-if="localizedFaqs.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
            </path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">No FAQs</h3>
          <p class="mt-1 text-sm text-gray-500">Get started by creating your first FAQ.</p>
          <BaseButton @click="openAddModal" variant="primary" class="mt-4">
            Add FAQ
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- FAQ Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-900">
              {{ editingFaq ? 'Edit FAQ' : 'Add New FAQ' }}
            </h2>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <form @submit.prevent="saveFaq" class="space-y-6">
            <BaseInput v-model="faqForm.question" type="text" label="Question" required />

            <BaseTextarea v-model="faqForm.answer" label="Answer" :rows=4 required />

            <div class="grid grid-cols-2 gap-4">
              <BaseInput v-model.number="faqForm.order" type="number" label="Display Order" min="0" />

              <BaseCheckbox v-model="faqForm.isActive" label="Active" />
            </div>

            <div class="flex justify-end space-x-4 pt-4 border-t">
              <BaseButton @click="closeModal" type="button" variant="secondary">
                Cancel
              </BaseButton>
              <BaseButton type="submit" :disabled="saving" variant="primary">
                {{ saving ? 'Saving...' : 'Save FAQ' }}
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
const { createLocalizedContent, parseJsonField } = useMultiLanguage()
const { locale } = useI18n()

definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

const authStore = useAuthStore()
const cmsStore = useCMSStore()
await cmsStore.fetchSiteSettings()
const siteSettings = cmsStore.siteSettings

// Use computed properties from store
const loading = computed(() => cmsStore.isLoading)
const saving = ref(false)
const showModal = ref(false)
const editingFaq = ref(null)
const successMessage = ref('')
const errorMessage = ref('')

// FAQ form
const faqForm = reactive({
  question: '',
  answer: '',
  order: 0,
  isActive: true
})

// Localized FAQs for display
const localizedFaqs = computed(() => {
  const faqs = cmsStore.faqs || []
  if (!Array.isArray(faqs)) {
    return []
  }
  return faqs.map(faq => {
    const localized = createLocalizedContent(faq)
    return {
      ...faq,
      question: localized.question || faq.question,
      answer: localized.answer || faq.answer
    }
  })
})

// Methods
onMounted(async () => {
  await loadFaqs()
})

const loadFaqs = async () => {
  try {
    await cmsStore.fetchFAQs()
  } catch (error) {
    console.error('Failed to load FAQs:', error)
    errorMessage.value = 'Failed to load FAQs'
  }
}

const openAddModal = () => {
  editingFaq.value = null
  resetForm()
  showModal.value = true
}

const editFaq = (localizedFaq) => {
  // Find the original FAQ data (not localized) for editing
  const originalFaq = cmsStore.faqs?.find(f => f.id === localizedFaq.id)
  editingFaq.value = originalFaq

  // Use the data directly (API already sends as objects)
  faqForm.question = (typeof originalFaq.question === 'object' ? originalFaq.question[locale.value] || originalFaq.question.en || '' : originalFaq.question) || ''
  faqForm.answer = (typeof originalFaq.answer === 'object' ? originalFaq.answer[locale.value] || originalFaq.answer.en || '' : originalFaq.answer) || ''
  faqForm.order = originalFaq.order
  faqForm.isActive = originalFaq.isActive
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingFaq.value = null
  resetForm()
}

const resetForm = () => {
  faqForm.question = ''
  faqForm.answer = ''
  faqForm.order = 0
  faqForm.isActive = true
}

const saveFaq = async () => {
  saving.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const faqData = {
      question: faqForm.question,
      answer: faqForm.answer,
      order: faqForm.order,
      isActive: faqForm.isActive
    }

    if (editingFaq.value) {
      await cmsStore.updateFAQ({
        body: {
          ...faqData,
          id: editingFaq.value.id
        }
      })
      successMessage.value = 'FAQ updated successfully!'
    } else {
      await cmsStore.createFAQ({ body: faqData })
      successMessage.value = 'FAQ created successfully!'
    }

    closeModal()
    await loadFaqs()
  } catch (error) {
    errorMessage.value = 'Failed to save FAQ'
  } finally {
    saving.value = false
  }
}

const toggleFaqStatus = async (faq) => {
  try {
    await cmsStore.updateFAQ({
      body: {
        ...faq,
        id: faq.id,
        isActive: !faq.isActive
      }
    })

    successMessage.value = `FAQ ${faq.isActive ? 'deactivated' : 'activated'} successfully!`
    await loadFaqs()
  } catch (error) {
    errorMessage.value = 'Failed to update FAQ status'
  }
}

const deleteFaq = async (faq) => {
  if (confirm(`Are you sure you want to delete this FAQ: "${faq.question}"?`)) {
    try {
      await cmsStore.deleteFAQ({ body: { id: faq.id } })

      successMessage.value = 'FAQ deleted successfully!'
      await loadFaqs()
    } catch (error) {
      errorMessage.value = 'Failed to delete FAQ'
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
  title: `Manage FAQs | ${siteSettings.siteName} CMS`,
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

[data-theme="dark"] {
  .card {
    background: rgb(31 41 55);
    border-color: rgb(55 65 81);
  }

  .text-gray-900 {
    color: rgb(243 244 246);
  }

  .text-gray-700 {
    color: rgb(229 231 235);
  }

  .text-gray-500 {
    color: rgb(156 163 175);
  }

  .text-gray-600 {
    color: rgb(209 213 219);
  }

  .text-gray-400 {
    color: rgb(156 163 175);
  }

  .bg-gray-50 {
    background: rgb(17 24 39);
  }

  .bg-white {
    background: rgb(31 41 55);
  }

  .border-t {
    border-color: rgb(75 85 99);
  }

  .form-input {
    background: rgb(55 65 81);
    border-color: rgb(75 85 99);
    color: rgb(243 244 246);
  }

  .form-input::placeholder {
    color: rgb(156 163 175);
  }

  .form-input:focus {
    border-color: rgb(59 130 246);
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .floating-label {
    color: rgb(156 163 175);
  }

  .form-input:focus~.floating-label,
  .form-input:not(:placeholder-shown)~.floating-label {
    color: rgb(96 165 250);
  }
}
</style>
