<template>
  <div class="min-h-screen bg-gray-50">

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <BasePageHeader
        :title="t('manage.dashboard.title')"
        code="CMS-001"
        :description="t('manage.dashboard.description')"
        :breadcrumbs="[
          { label: t('manage.common.dashboard'), icon: 'home' }
        ]"
      />

      <!-- Quick Stats -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="card p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2 2v6zM21 7L9 7l-6 0"></path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">{{ t('manage.dashboard.totalPages') }}</p>
              <p class="text-2xl font-bold text-gray-900">4</p>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                </path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">{{ t('nav.services') }}</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.services }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                </path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">{{ t('nav.team') }}</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.teamMembers }}</p>
            </div>
          </div>
        </div>

        <div class="card p-6">
          <div class="flex items-center">
            <div class="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <svg class="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                </path>
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-600">{{ t('manage.index.faqs') }}</p>
              <p class="text-2xl font-bold text-gray-900">{{ stats.faqs }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Content Management Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Home Page -->
        <div class="card p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6">
                </path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">{{ t('manage.index.homePage') }}</h3>
          </div>
          <p class="text-gray-600 mb-4">{{ t('manage.index.homePageDescription') }}</p>
          <NuxtLink to="/manage/home">
            <BaseButton variant="primary">
              {{ t('manage.index.editContent') }}
            </BaseButton>
          </NuxtLink>
        </div>

        <!-- Services -->
        <div class="card p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                </path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">{{ t('manage.index.services') }}</h3>
          </div>
          <p class="text-gray-600 mb-4">{{ t('manage.index.servicesDescription') }}</p>
          <div class="flex gap-2">
            <NuxtLink to="/manage/services-content">
              <BaseButton variant="primary">
                {{ t('manage.index.editContent') }}
              </BaseButton>
            </NuxtLink>
            <NuxtLink to="/manage/services">
              <BaseButton variant="primary">
                {{ t('manage.index.manageServices') }}
              </BaseButton>
            </NuxtLink>
          </div>
        </div>

        <!-- About Page -->
        <div class="card p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">{{ t('manage.index.aboutPage') }}</h3>
          </div>
          <p class="text-gray-600 mb-4">{{ t('manage.index.aboutPageDescription') }}</p>
          <NuxtLink to="/manage/about">
            <BaseButton variant="primary">
              {{ t('manage.index.editContent') }}
            </BaseButton>
          </NuxtLink>
        </div>

        <!-- Insights -->
        <div class="card p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-indigo-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z">
                </path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">{{ t('manage.index.insights') }}</h3>
          </div>
          <p class="text-gray-600 mb-4">{{ t('manage.index.insightsDescription') }}</p>
          <div class="flex gap-2">
            <NuxtLink to="/manage/team-content">
              <BaseButton variant="primary">
                {{ t('manage.index.editContent') }}
              </BaseButton>
            </NuxtLink>
            <NuxtLink to="/manage/team">
              <BaseButton variant="primary">
                {{ t('manage.index.manageInsights') }}
              </BaseButton>
            </NuxtLink>
          </div>
        </div>

        <!-- Contact Page -->
        <div class="card p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                </path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">{{ t('manage.index.contactPage') }}</h3>
          </div>
          <p class="text-gray-600 mb-4">{{ t('manage.index.contactPageDescription') }}</p>
          <NuxtLink to="/manage/contact">
            <BaseButton variant="primary">
              {{ t('manage.index.editContact') }}
            </BaseButton>
          </NuxtLink>
        </div>

        <!-- FAQs -->
        <div class="card p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z">
                </path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">{{ t('manage.index.faqs') }}</h3>
          </div>
          <p class="text-gray-600 mb-4">{{ t('manage.index.faqsDescription') }}</p>
          <NuxtLink to="/manage/faqs">
            <BaseButton variant="primary">
              {{ t('manage.index.manageFAQs') }}
            </BaseButton>
          </NuxtLink>
        </div>

        <!-- Site Settings -->
        <div class="card p-6 hover:shadow-lg transition-shadow">
          <div class="flex items-center mb-4">
            <div class="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
              <svg class="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z">
                </path>
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-gray-900">{{ t('manage.index.siteSettings') }}</h3>
          </div>
          <p class="text-gray-600 mb-4">{{ t('manage.index.siteSettingsDescription') }}</p>
          <NuxtLink to="/manage/settings">
            <BaseButton variant="primary">
              {{ t('manage.index.siteSettings') }}
            </BaseButton>
          </NuxtLink>
        </div>
      </div>

      <!-- Page Links -->
      <div class="mt-8 grid md:grid-cols-2 gap-6">
        <!-- Direct Page Links -->
        <div class="card p-6">
          <h3 class="text-lg font-semibold text-gray-900 mb-4">{{ t('manage.dashboard.visitPages') }}</h3>
          <div class="grid grid-cols-2 gap-3">
            <NuxtLink to="/" target="_blank">
              <BaseButton
                variant="secondary"
                class="flex items-center justify-center w-full"
                icon-left="home"
              >
                {{ t('nav.home') }}
              </BaseButton>
            </NuxtLink>

            <NuxtLink to="/services" target="_blank">
              <BaseButton
                variant="secondary"
                class="flex items-center justify-center w-full"
                icon-left="document"
              >
                {{ t('nav.services') }}
              </BaseButton>
            </NuxtLink>

            <NuxtLink to="/about" target="_blank">
              <BaseButton
                variant="secondary"
                class="flex items-center justify-center w-full"
                icon-left="information-circle"
              >
                {{ t('nav.about') }}
              </BaseButton>
            </NuxtLink>

            <NuxtLink to="/contact" target="_blank">
              <BaseButton
                variant="secondary"
                class="flex items-center justify-center w-full"
                icon-left="mail"
              >
                {{ t('nav.contact') }}
              </BaseButton>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>

definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

const { t } = useI18n()

const cmsStore = useCMSStore()
await cmsStore.fetchSiteSettings()
const siteSettings = cmsStore.siteSettings

// Stats data
const stats = ref({
  services: 0,
  teamMembers: 0,
  faqs: 0
})


// Load stats on mount
onMounted(async () => {
  await loadStats()
})

const loadStats = async () => {
  try {
    // Use store methods instead of direct $fetch calls
    await Promise.all([
      cmsStore.fetchServices(),
      cmsStore.fetchTeamMembers(),
      cmsStore.fetchFAQs()
    ])

    stats.value = {
      services: (cmsStore.services || []).length,
      teamMembers: (cmsStore.teamMembers || []).length,
      faqs: (cmsStore.faqs || []).length
    }
  } catch (error) {
    console.error('Failed to load stats:', error)
    // Set default values if API calls fail
    stats.value = {
      services: 0,
      teamMembers: 0,
      faqs: 0
    }
  }
}

// Initialize theme for this page
const { initializeTheme } = useManageTheme()

onMounted(async () => {
  await initializeTheme()
})


// SEO
useSeoMeta({
  title: `CMS Dashboard | ${siteSettings.siteName}`,
  description: `Content Management System dashboard for ${siteSettings.siteName}`,
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
  transition: all 0.3s ease;
  transform: translateY(0);
}

.card:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.gradient-text {
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

[data-theme="dark"] .card {
  background: rgb(31 41 55) !important;
  border: 1px solid rgb(55 65 81) !important;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.3);
}

[data-theme="dark"] .card:hover {
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.4);
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

[data-theme="dark"] .bg-blue-100 {
  background: rgba(30, 58, 138, 0.2);
}

[data-theme="dark"] .bg-green-100 {
  background: rgba(20, 83, 45, 0.2);
}

[data-theme="dark"] .bg-purple-100 {
  background: rgba(88, 28, 135, 0.2);
}

[data-theme="dark"] .bg-indigo-100 {
  background: rgba(67, 56, 202, 0.2);
}

[data-theme="dark"] .bg-red-100 {
  background: rgba(153, 27, 27, 0.2);
}

[data-theme="dark"] .bg-orange-100 {
  background: rgba(154, 52, 18, 0.2);
}

[data-theme="dark"] .bg-gray-100 {
  background: rgb(55 65 81);
}

</style>