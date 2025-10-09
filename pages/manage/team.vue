<template>
  <div class="min-h-screen bg-gray-50">

    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <BasePageHeader :title="t('manage.team.title')" code="INSIGHTS-001"
        :description="t('manage.team.description')" :breadcrumbs="[
          { label: t('manage.common.dashboard'), to: '/manage', icon: 'home' },
          { label: t('manage.team.title'), icon: 'user-group' }
        ]">
        <template v-slot:actions>
          <BaseButton @click="openAddModal" variant="primary" class="mt-4">
            {{ t('manage.team.addInsights') }}
          </BaseButton>
        </template>
      </BasePageHeader>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Insights List -->
      <div v-else class="space-y-6">
        <div v-for="member in localizedTeamMembers" :key="member.id" class="card p-6">
          <div class="flex items-start justify-between">
            <div class="flex items-start space-x-4 flex-1">
              <!-- Member Image -->
              <div class="flex-shrink-0">
                <div v-if="member.image" class="w-16 h-16 rounded-full overflow-hidden">
                  <img :src="member.image" :alt="member.name" class="w-full h-full object-cover">
                </div>
                <div v-else class="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                  <svg class="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
              </div>

              <div class="flex-1">
                <div class="flex items-center space-x-3 mb-2">
                  <h3 class="text-xl font-bold text-gray-900">{{ member.name }}</h3>
                  <span v-if="!member.isActive"
                    class="px-2 py-1 bg-gray-200 text-gray-600 text-xs rounded-full">{{ t('manage.team.inactive') }}</span>
                  <span v-if="member.isDisplayInHome"
                    class="px-2 py-1 bg-green-100 text-green-600 text-xs rounded-full">🏠
                    {{ t('manage.team.home') }}</span>
                  <span v-else class="px-2 py-1 bg-yellow-100 text-yellow-600 text-xs rounded-full">📋 {{ t('manage.team.listOnly') }}</span>
                </div>

                <p class="text-blue-600 font-medium mb-2">{{ member.position }}</p>
                <p class="text-gray-600 mb-4">{{ member.description }}</p>

                <!-- Social Links -->
                <div class="flex items-center space-x-4 mb-4">
                  <a v-if="member.email" :href="`mailto:${member.email}`" class="text-gray-500 hover:text-blue-600">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                      </path>
                    </svg>
                  </a>
                  <a v-if="member.linkedin" :href="member.linkedin" target="_blank"
                    class="text-gray-500 hover:text-blue-600">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                  <a v-if="member.twitter" :href="member.twitter" target="_blank"
                    class="text-gray-500 hover:text-blue-600">
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                    </svg>
                  </a>
                </div>

                <div class="flex items-center space-x-4 text-sm text-gray-500">
                  <span>{{ t('manage.team.order') }}: {{ member.order || '-' }}</span>
                  <span>•</span>
                  <span>{{ t('manage.team.updated') }}: {{ formatDate(member.updatedAt) }}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center space-x-2 ml-4">
              <button @click="editMember(member)" class="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z">
                  </path>
                </svg>
              </button>

              <button @click="toggleHomeDisplay(member)"
                :class="member.isDisplayInHome ? 'text-green-600 hover:bg-green-50' : 'text-gray-600 hover:bg-gray-50'"
                class="p-2 rounded-lg" :title="member.isDisplayInHome ? t('manage.team.removeFromHome') : t('manage.team.addToHome')">
                <svg v-if="member.isDisplayInHome" class="w-5 h-5" fill="none" stroke="currentColor"
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

              <button @click="deleteMember(member)" class="p-2 text-red-600 hover:bg-red-50 rounded-lg">
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
        <div v-if="localizedTeamMembers.length === 0" class="text-center py-12">
          <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
            </path>
          </svg>
          <h3 class="mt-2 text-sm font-medium text-gray-900">{{ t('manage.team.noInsights') }}</h3>
          <p class="mt-1 text-sm text-gray-500">{{ t('manage.team.getStarted') }}</p>
          <BaseButton @click="openAddModal" variant="primary" class="mt-4">
            {{ t('manage.team.addInsights') }}
          </BaseButton>
        </div>
      </div>
    </div>

    <!-- Insights Modal -->
    <div v-if="showModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div class="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div class="p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold text-gray-900">
              {{ editingMember ? t('manage.team.editInsights') : t('manage.team.addNewInsights') }}
            </h2>
            <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>
          </div>

          <form @submit.prevent="saveMember" class="space-y-6">
            <BaseInput v-model="memberForm.name" type="text" :label="t('manage.team.title')" required />

            <BaseInput v-model="memberForm.position" type="text" :label="t('manage.team.category')" required />

            <BaseTextarea v-model="memberForm.description" :label="t('manage.team.description')" :rows=3 required />

            <BaseFileUpload v-model="memberForm.image" :label="t('manage.team.profileImage')" accept="image/*"
              :max-size="5 * 1024 * 1024" :help-text="t('manage.team.profileImageHelp')"
              upload-endpoint="/api/upload/image" />

            <BaseInput v-model="memberForm.link" type="url" :label="t('manage.team.clickLinkURL')"
              :help-text="t('manage.team.clickLinkHelp')" />

            <BaseInput v-model="memberForm.email" type="email" :label="t('manage.team.emailAddress')" />

            <BaseInput v-model="memberForm.linkedin" type="url" :label="t('manage.team.linkedInURL')" />

            <BaseInput v-model="memberForm.twitter" type="url" :label="t('manage.team.twitterURL')" />

            <div class="grid grid-cols-3 gap-4">
              <BaseInput v-model.number="memberForm.order" type="number" :label="t('manage.team.displayOrder')" min="0" />

              <BaseCheckbox v-model="memberForm.isActive" :label="t('manage.team.active')" />

              <BaseCheckbox v-model="memberForm.isDisplayInHome" :label="t('manage.team.displayInHome')" />
            </div>

            <div class="flex justify-end space-x-4 pt-4 border-t">
              <BaseButton @click="closeModal" type="button" variant="secondary">
                {{ t('manage.common.cancel') }}
              </BaseButton>
              <BaseButton type="submit" :disabled="saving" variant="primary">
                {{ saving ? t('manage.team.saving') : t('manage.team.saveInsights') }}
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
const { locale, t } = useI18n()

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
const editingMember = ref(null)
const successMessage = ref('')
const errorMessage = ref('')

// Team member form
const memberForm = reactive({
  name: '',
  position: '',
  description: '',
  image: '',
  link: '',
  email: '',
  linkedin: '',
  twitter: '',
  order: 0,
  isActive: true,
  isDisplayInHome: true
})

// Localized team members for display
const localizedTeamMembers = computed(() => {
  const teamMembers = cmsStore.teamMembers || []
  if (!Array.isArray(teamMembers)) {
    return []
  }
  return teamMembers.map(member => {
    const localized = createLocalizedContent(member)
    return {
      ...member,
      name: localized.name || member.name,
      position: localized.position || member.position,
      bio: localized.bio || member.bio || ''
    }
  })
})

// Methods
onMounted(async () => {
  await loadTeamMembers()
})

const loadTeamMembers = async () => {
  try {
    await cmsStore.fetchTeamMembers()
  } catch (error) {
    console.error('Failed to load insights items:', error)
    errorMessage.value = t('manage.team.failedToLoad')
  }
}

const openAddModal = () => {
  editingMember.value = null
  resetForm()
  showModal.value = true
}

const editMember = (localizedMember) => {
  // Find the original member data (not localized) for editing
  const originalMember = cmsStore.teamMembers?.find(m => m.id === localizedMember.id)
  editingMember.value = originalMember

  // Use the data directly (API already sends as objects)
  memberForm.name = (typeof originalMember.name === 'object' ? originalMember.name[locale.value] || originalMember.name.en || '' : originalMember.name) || ''
  memberForm.position = (typeof originalMember.position === 'object' ? originalMember.position[locale.value] || originalMember.position.en || '' : originalMember.position) || ''
  memberForm.description = (typeof originalMember.bio === 'object' ? originalMember.bio[locale.value] || originalMember.bio.en || '' : originalMember.bio) || ''
  memberForm.image = originalMember.image || ''
  memberForm.link = originalMember.link || ''
  memberForm.email = originalMember.email || ''
  memberForm.linkedin = originalMember.linkedin || ''
  memberForm.twitter = originalMember.twitter || ''
  memberForm.order = originalMember.order
  memberForm.isActive = originalMember.isActive
  memberForm.isDisplayInHome = originalMember.isDisplayInHome ?? true
  showModal.value = true
}

const closeModal = () => {
  showModal.value = false
  editingMember.value = null
  resetForm()
}

const resetForm = () => {
  memberForm.name = ''
  memberForm.position = ''
  memberForm.description = ''
  memberForm.image = ''
  memberForm.link = ''
  memberForm.email = ''
  memberForm.linkedin = ''
  memberForm.twitter = ''
  memberForm.order = 0
  memberForm.isActive = true
  memberForm.isDisplayInHome = true
}

const saveMember = async () => {
  saving.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    const memberData = {
      name: memberForm.name,
      position: memberForm.position,
      bio: memberForm.description,
      image: memberForm.image,
      link: memberForm.link,
      email: memberForm.email,
      linkedin: memberForm.linkedin,
      twitter: memberForm.twitter,
      order: memberForm.order,
      isActive: memberForm.isActive,
      isDisplayInHome: memberForm.isDisplayInHome
    }

    if (editingMember.value) {
      await cmsStore.updateTeamMember({
        body: {
          ...memberData,
          id: editingMember.value.id
        }
      })
      successMessage.value = t('manage.team.insightsUpdated')
    } else {
      await cmsStore.createTeamMember({ body: memberData })
      successMessage.value = t('manage.team.insightsCreated')
    }

    closeModal()
    await loadTeamMembers()
  } catch (error) {
    errorMessage.value = t('manage.team.failedToSave')
  } finally {
    saving.value = false
  }
}

const toggleHomeDisplay = async (member) => {
  try {
    await cmsStore.updateTeamMember({
      body: {
        ...member,
        socialLinks: "",
        id: member.id,
        isDisplayInHome: !member.isDisplayInHome
      }
    })

    successMessage.value = member.isDisplayInHome ? t('manage.team.removedFromHome') : t('manage.team.addedToHome')
    await loadTeamMembers()
  } catch (error) {
    errorMessage.value = t('manage.team.failedToUpdate')
  }
}

const deleteMember = async (member) => {
  if (confirm(t('manage.team.confirmDelete', { name: member.name }))) {
    try {
      await cmsStore.deleteTeamMember({ body: { id: member.id } })

      successMessage.value = t('manage.team.insightsDeleted')
      await loadTeamMembers()
    } catch (error) {
      errorMessage.value = t('manage.team.failedToDelete')
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
  title: `Manage Insights | ${siteSettings.siteName} CMS`,
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
