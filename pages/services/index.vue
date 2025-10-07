<template>
  <div class="min-h-screen">
    <!-- Navigation -->
    <CmsNavbar>
      <template #nav-links>
        <NuxtLink :to="$localePath('/')">{{ t('nav.home') }}</NuxtLink>
        <NuxtLink :to="$localePath('/services')">{{ t('index.ourService') }}</NuxtLink>
        <NuxtLink :to="$localePath('/team')">{{ t('nav.team') }}</NuxtLink>
        <NuxtLink :to="$localePath('/about')">{{ t('nav.about') }}</NuxtLink>
        <NuxtLink :to="$localePath('/contact')">{{ t('common.contactUs') }}</NuxtLink>
      </template>
    </CmsNavbar>

    <!-- Hero Section -->
    <section
      class="section-padding text-white relative overflow-hidden"
      style="padding-top: 160px;"
      :class="servicesContent.heroImage ? 'bg-cover bg-center bg-no-repeat' : 'bg-gradient-primary-to-secondary'"
      :style="servicesContent.heroImage ? { backgroundImage: `url(${servicesContent.heroImage})` } : {}"
    >
      <!-- Overlay for better text readability when using background image -->
      <div v-if="servicesContent.heroImage" class="absolute inset-0 bg-black/40"></div>
      
      <div class="container text-center relative z-10">
        <h1 class="font-bold mb-6" style="font-size: clamp(40px, 5vw, 72px);">{{ servicesContent.heroTitle }}</h1>
        <p class="text-blue-100 max-w-3xl mx-auto" style="font-size: clamp(24px, 2vw, 28px);">
          {{ servicesContent.heroSubtitle }}
        </p>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="section-padding">
      <div class="container">
        <div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <div
            v-for="service in services"
            :key="service.id"
            class="card p-8 cursor-pointer group transform transition-all duration-300 hover:scale-105 hover:shadow-xl"
            @click="handleServiceClick(service)"
          >
            <!-- Color accent bar -->
            <div
              class="absolute top-0 left-0 w-full h-1"
              :style="{ backgroundColor: service.color || '#6495ed' }"
            ></div>

            <!-- Service Media (Priority: Image > Video > Icon) -->
            <div class="w-full h-48 mb-6 rounded-2xl overflow-hidden relative">
              <!-- Image Display (First Priority) -->
              <img
                v-if="service.image"
                :src="service.image"
                :alt="service.title"
                class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              >

              <!-- Video Display (Second Priority) -->
              <video
                v-else-if="service.video"
                :src="service.video"
                class="w-full h-full object-cover"
                muted
                loop
                autoplay
                playsinline
                @mouseenter="$event.target.play()"
                @mouseleave="$event.target.pause()"
              ></video>

              <!-- Icon Fallback (Third Priority) -->
              <div
                v-else
                class="w-full h-full rounded-2xl flex items-center justify-center text-white"
                :style="{ backgroundColor: service.color || '#6495ed' }"
              >
                <svg class="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="service.icon === 'search'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                  <path v-else-if="service.icon === 'social'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2M7 4h10M7 4L5.5 20h13L17 4M9 9v6M15 9v6"></path>
                  <path v-else-if="service.icon === 'code'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  <path v-else-if="service.icon === 'ads'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-5 5v-5zM4 19h9a2 2 0 002-2V7a2 2 0 00-2-2H4a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  <path v-else-if="service.icon === 'email'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  <path v-else-if="service.icon === 'analytics'" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
            </div>

            <div class="flex items-center justify-between mb-4">
              <h3 class="font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300" style="font-size: 28px;">{{ service.title }}</h3>
              <div v-if="service.price" class="font-semibold text-primary" style="font-size: 26px;">
                ฿{{ service.price.toLocaleString() }}
              </div>
            </div>

            <p class="text-gray-600 mb-6 line-clamp-3" style="font-size: 22px;">{{ service.description }}</p>

            <!-- Features list -->
            <ul v-if="service.features && service.features.length" class="space-y-2 mb-6">
              <li v-for="feature in service.features.slice(0, 4)" :key="feature" class="flex items-center text-gray-700">
                <svg class="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-sm">{{ feature }}</span>
              </li>
            </ul>

            <button
              class="btn-primary w-full group-hover:scale-105 transition-transform duration-300"
              @click.stop="handleServiceClick(service)"
            >
              {{ t('services.viewMore') }}
            </button>
          </div>

          <!-- Show message if no services -->
          <div v-if="services.length === 0" class="col-span-full text-center py-12">
            <p class="text-gray-500">{{ t('home.servicesWillAppear') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Process Section -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="font-bold mb-4 text-gray-900" style="font-size: clamp(40px, 4vw, 56px);">{{ t('services.ourProcess') }}</h2>
          <p class="text-gray-600" style="font-size: 26px;">{{ t('services.provenMethodology') }}</p>
        </div>

        <div class="grid md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
            <h3 class="font-bold mb-2 text-gray-900" style="font-size: 24px;">{{ t('services.discovery') }}</h3>
            <p class="text-gray-600" style="font-size: 22px;">{{ t('services.discoveryDesc') }}</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
            <h3 class="font-bold mb-2 text-gray-900" style="font-size: 24px;">{{ t('services.strategy') }}</h3>
            <p class="text-gray-600" style="font-size: 22px;">{{ t('services.strategyDesc') }}</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
            <h3 class="font-bold mb-2 text-gray-900" style="font-size: 24px;">{{ t('services.execute') }}</h3>
            <p class="text-gray-600" style="font-size: 22px;">{{ t('services.executeDesc') }}</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">4</div>
            <h3 class="font-bold mb-2 text-gray-900" style="font-size: 24px;">{{ t('services.optimize') }}</h3>
            <p class="text-gray-600" style="font-size: 22px;">{{ t('services.optimizeDesc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding gradient-bg text-white">
      <div class="container text-center">
        <h2 class="font-bold mb-6" style="font-size: clamp(40px, 4vw, 56px);">{{ t('services.readyToTransform') }}</h2>
        <p class="text-blue-100 mb-8 max-w-2xl mx-auto" style="font-size: 26px;">
          {{ t('services.discussServices') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink :to="$localePath('/contact')" class="btn-primary hover:bg-gray-100">{{ t('common.getFreeConsultation') }}</NuxtLink>
          <button class="btn-secondary !border-white !text-white hover:bg-white hover:text-blue-600">{{ t('common.viewCaseStudies') }}</button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <CmsFooter />
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

// Dynamic color calculation functions
function hexToRgba(hex, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function adjustColorBrightness(hex, percent) {
  const num = parseInt(hex.slice(1), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = (num >> 8 & 0x00FF) + amt
  const B = (num & 0x0000FF) + amt
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
}

// Load site settings, services content, and services from CMS
const cmsStore = useCMSStore()
const { t, locale } = useI18n()
const { createLocalizedContent, parseJsonField, getLocalizedFeatures } = useMultiLanguage()

await cmsStore.fetchSiteSettings()
await cmsStore.fetchServicesContent()
await cmsStore.fetchServices()

const siteSettingsRaw = cmsStore.siteSettings
const servicesContentRaw = cmsStore.servicesContent
const servicesRaw = cmsStore.getActiveServices

// Create reactive localized content
const siteSettings = computed(() => createLocalizedContent(siteSettingsRaw))
const servicesContent = computed(() => createLocalizedContent(servicesContentRaw))
const services = computed(() => {
  return servicesRaw.map(service => {
    const localized = createLocalizedContent(service)
    return {
      ...service, // Keep all original service data including externalURL
      ...localized, // Override with localized content
      features: getLocalizedFeatures(service.features)
    }
  })
})

// Handle service click - navigate to detail page
const { $localePath } = useNuxtApp()

const handleServiceClick = (service) => {
  // Navigate to service detail page
  navigateTo($localePath(`/services/${service.id}`))
}

// Dynamic color calculations
const dynamicColors = computed(() => {
  const primary = siteSettings.value.primaryColor || '#6495ed'
  const secondary = siteSettings.value.secondaryColor || '#9333ea'

  return {
    primary,
    secondary,
    primaryDark: adjustColorBrightness(primary, -20),
    primaryLight: adjustColorBrightness(primary, 30),
    primaryVeryLight: adjustColorBrightness(primary, 60),
    secondaryDark: adjustColorBrightness(secondary, -20),
    secondaryLight: adjustColorBrightness(secondary, 30),
    primaryRgba10: hexToRgba(primary, 0.1),
    primaryRgba20: hexToRgba(primary, 0.2),
    primaryRgba30: hexToRgba(primary, 0.3),
    primaryRgba50: hexToRgba(primary, 0.5),
    secondaryRgba10: hexToRgba(secondary, 0.1),
    secondaryRgba20: hexToRgba(secondary, 0.2),
    secondaryRgba30: hexToRgba(secondary, 0.3),
    secondaryRgba50: hexToRgba(secondary, 0.5),
  }
})

useSeoMeta({
  title: () => `${servicesContent.value.heroTitle || 'Our Services'} | ${siteSettings.value.siteName || 'Digital Marketing Agency'}`,
  description: () => servicesContent.value.heroSubtitle || 'Comprehensive digital marketing services including video production, poster design, social media content, branding, and digital marketing to grow your business.',
  ogImage: () => cmsStore.siteSettings?.logo,
  ogImageAlt: () => siteSettings.value.siteName || 'Site Logo',
  twitterCard: 'summary_large_image',
  twitterImage: () => cmsStore.siteSettings?.logo,
  twitterImageAlt: () => siteSettings.value.siteName || 'Site Logo',
})
</script>

<style scoped>
/* Dynamic CSS Variables for this page only */
.min-h-screen {
  --primary-color: v-bind('dynamicColors.primary');
  --secondary-color: v-bind('dynamicColors.secondary');
  --primary-dark: v-bind('dynamicColors.primaryDark');
  --primary-light: v-bind('dynamicColors.primaryLight');
  --primary-very-light: v-bind('dynamicColors.primaryVeryLight');
  --secondary-dark: v-bind('dynamicColors.secondaryDark');
  --secondary-light: v-bind('dynamicColors.secondaryLight');
  --primary-rgba-10: v-bind('dynamicColors.primaryRgba10');
  --primary-rgba-20: v-bind('dynamicColors.primaryRgba20');
  --primary-rgba-30: v-bind('dynamicColors.primaryRgba30');
  --primary-rgba-50: v-bind('dynamicColors.primaryRgba50');
  --secondary-rgba-10: v-bind('dynamicColors.secondaryRgba10');
  --secondary-rgba-20: v-bind('dynamicColors.secondaryRgba20');
  --secondary-rgba-30: v-bind('dynamicColors.secondaryRgba30');
  --secondary-rgba-50: v-bind('dynamicColors.secondaryRgba50');
  --text-dark: #2d3748;
  --text-light: #718096;
  --bg-light: #f7fafc;

  /* Override root background for this page */
  --root-bg: white;
  --color-base-100: white;

  /* Page-specific font and text styling */
  font-family: 'PG Stockholm', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: var(--text-dark);
  box-sizing: border-box;
  background-color: white;
}

@font-face {
  font-family: 'PG Stockholm';
  src: url('~/assets/fonts/02-TH-Krub/TH Krub.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.min-h-screen *,
.min-h-screen *::before,
.min-h-screen *::after {
  box-sizing: border-box;
}

/* Button Styles */
.btn-primary {
  @apply text-white font-semibold py-3 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl inline-block text-center cursor-pointer;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
  border: none;
  min-width: 140px;
  position: relative;
  overflow: hidden;
}

.btn-primary::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
  transition: left 0.5s;
}

.btn-primary:hover::before {
  left: 100%;
}

.btn-primary:hover {
  background: linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-color) 100%);
  box-shadow: 0 8px 25px var(--primary-rgba-30);
  transform: scale(1.05) translateY(-2px);
}

.btn-primary:active {
  transform: scale(1.02) translateY(0);
  box-shadow: 0 4px 15px var(--primary-rgba-20);
}

.btn-secondary {
  @apply bg-transparent border-2 font-semibold py-3 px-8 rounded-lg transition-all duration-300 inline-block text-center cursor-pointer;
  border-color: var(--primary-color);
  color: var(--primary-color);
  min-width: 140px;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: end;
  justify-content: center;
}

.btn-secondary::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 100%;
  background-color: var(--primary-color);
  transition: width 0.3s ease;
  z-index: -1;
}

.btn-secondary:hover::before {
  width: 100%;
}

.btn-secondary:hover {
  @apply text-white;
  border-color: var(--primary-color);
  transform: scale(1.02);
  box-shadow: 0 4px 15px var(--primary-rgba-20);
}

/* Card Styles */
.card {
  @apply bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden;
}

/* Text utilities */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Layout Utilities */
.section-padding {
  @apply py-16 lg:py-24;
}

.container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

/* Gradient backgrounds */
.gradient-bg {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%);
}

.gradient-text {
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent;
}

/* Custom gradient utilities */
.bg-gradient-primary-to-secondary {
  background: linear-gradient(to bottom right, var(--primary-color), var(--secondary-color));
}

/* Primary color utilities */
.text-primary {
  color: var(--primary-color);
  display: flex;
  align-items: end;
}

.bg-primary {
  background-color: var(--primary-color);
}

.border-primary {
  border-color: var(--primary-color);
}

.hover\:text-primary:hover {
  color: var(--primary-color);
  transition: color 0.2s ease;
}

.hover\:bg-primary:hover {
  background-color: var(--primary-color);
  transition: background-color 0.2s ease;
}

/* Service card icon backgrounds - dynamic colors */
.bg-blue-100 {
  background-color: var(--primary-rgba-20);
}

.bg-green-100 {
  background-color: var(--secondary-rgba-20);
}

.bg-purple-100 {
  background: linear-gradient(135deg, var(--primary-rgba-10), var(--secondary-rgba-10));
}

.bg-red-100 {
  background-color: var(--primary-rgba-30);
}

/* Service card icon colors */
.text-blue-500 {
  color: var(--primary-color);
}

.text-green-500 {
  color: var(--secondary-color);
}

.text-purple-500 {
  color: var(--primary-dark);
}

.text-red-500 {
  color: var(--secondary-dark);
}

.text-blue-600 {
  color: var(--primary-dark);
}

.text-blue-100 {
  color: rgba(255, 255, 255, 0.8);
}

.hover\:text-blue-500:hover {
  color: var(--primary-color);
  transition: color 0.2s ease;
}

.hover\:bg-blue-600:hover {
  background-color: var(--primary-dark);
  transition: background-color 0.2s ease;
}

/* Process step circles */
.bg-blue-500 {
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-dark) 100%);
}

/* Enhanced card hover effects */
.card:hover {
  box-shadow: 0 20px 40px var(--primary-rgba-20);
}

/* Service icons hover effects */
.card:hover .text-blue-500,
.card:hover .text-green-500,
.card:hover .text-purple-500,
.card:hover .text-red-500 {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

/* Text contrast fixes for dark backgrounds */
.gradient-bg h1,
.gradient-bg h2,
.gradient-bg p,
.gradient-bg .text-blue-100 {
  color: white !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Process section enhancements */
.process-step {
  position: relative;
}

.process-step::after {
  content: '';
  position: absolute;
  top: 32px;
  right: -50%;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  opacity: 0.3;
}

.process-step:last-child::after {
  display: none;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .process-step::after {
    display: none;
  }

  .btn-primary,
  .btn-secondary {
    @apply w-full py-4 text-base;
    min-width: unset;
  }

  .btn-primary + .btn-secondary,
  .btn-secondary + .btn-primary {
    @apply ml-0 mt-3;
  }
}
</style>