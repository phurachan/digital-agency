<template>
  <div class="min-h-screen">
    <!-- Top Navbar -->
    <CmsTopNavbar />
    
    <!-- Navigation -->
    <nav class="fixed w-full z-50 bg-white/95 backdrop-blur-md border-b border-gray-100" style="top: 40px;">
      <div class="container">
        <div class="flex justify-between items-center py-4">
          <NuxtLink :to="$localePath('/digital-agency')" class="text-2xl font-bold gradient-text">{{ siteSettings.siteName }}</NuxtLink>
          <div class="hidden md:flex space-x-8">
            <NuxtLink :to="$localePath('/digital-agency')" class="text-gray-700 hover:text-blue-500 transition-colors">{{ t('nav.home') }}</NuxtLink>
            <NuxtLink :to="$localePath('/digital-agency/services')" class="text-blue-500 font-medium">{{ t('nav.services') }}</NuxtLink>
            <NuxtLink :to="$localePath('/digital-agency/about')" class="text-gray-700 hover:text-blue-500 transition-colors">{{ t('nav.about') }}</NuxtLink>
            <NuxtLink :to="$localePath('/digital-agency/team')" class="text-gray-700 hover:text-blue-500 transition-colors">{{ t('nav.team') }}</NuxtLink>
            <NuxtLink :to="$localePath('/digital-agency/contact')" class="text-gray-700 hover:text-blue-500 transition-colors">{{ t('nav.contact') }}</NuxtLink>
          </div>
          <button class="btn-primary hidden md:block">{{ t('common.getStarted') }}</button>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <section 
      class="section-padding text-white relative overflow-hidden" 
      style="padding-top: 240px;"
      :class="servicesContent.heroImage ? 'bg-cover bg-center bg-no-repeat' : 'bg-gradient-primary-to-secondary'"
      :style="servicesContent.heroImage ? { backgroundImage: `url(${servicesContent.heroImage})` } : {}"
    >
      <!-- Overlay for better text readability when using background image -->
      <div v-if="servicesContent.heroImage" class="absolute inset-0 bg-black/40"></div>
      
      <div class="container text-center relative z-10">
        <h1 class="text-4xl lg:text-5xl font-bold mb-6">{{ servicesContent.heroTitle }}</h1>
        <p class="text-xl text-blue-100 max-w-3xl mx-auto">
          {{ servicesContent.heroSubtitle }}
        </p>
      </div>
    </section>

    <!-- Services Grid -->
    <section class="section-padding">
      <div class="container">
        <div class="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <div v-for="service in services" :key="service.id" class="card p-8">
            <!-- Color accent bar -->
            <div
              class="absolute top-0 left-0 w-full h-1"
              :style="{ backgroundColor: service.color || '#6495ed' }"
            ></div>

            <div class="flex items-center mb-6">
              <!-- Service icon with dynamic color background -->
              <div
                class="w-16 h-16 rounded-full flex items-center justify-center mr-4 text-3xl"
                :style="{
                  backgroundColor: service.color ? service.color + '20' : 'rgba(100, 149, 237, 0.2)',
                  color: service.color || '#6495ed'
                }"
              >
                {{ service.icon || '🎯' }}
              </div>
              <div>
                <h3 class="text-xl font-bold text-gray-900 mb-1">{{ service.title }}</h3>
                <div v-if="service.price" class="text-lg font-semibold text-primary">
                  ฿{{ service.price.toLocaleString() }}
                </div>
              </div>
            </div>

            <p class="text-gray-600 mb-6 line-clamp-3">{{ service.description }}</p>

            <!-- Features list -->
            <ul v-if="service.features && service.features.length" class="space-y-2 mb-6">
              <li v-for="feature in service.features.slice(0, 4)" :key="feature" class="flex items-center text-gray-700">
                <svg class="w-4 h-4 text-green-500 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-sm">{{ feature }}</span>
              </li>
            </ul>

            <button class="btn-primary w-full">{{ t('common.learnMore') }}</button>
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
          <h2 class="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">Our Process</h2>
          <p class="text-xl text-gray-600">A proven methodology that delivers consistent results</p>
        </div>
        
        <div class="grid md:grid-cols-4 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">1</div>
            <h3 class="text-xl font-bold mb-2 text-gray-900">Discovery</h3>
            <p class="text-gray-600">We analyze your business, audience, and competition to create a tailored strategy.</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">2</div>
            <h3 class="text-xl font-bold mb-2 text-gray-900">Strategy</h3>
            <p class="text-gray-600">Develop comprehensive digital marketing strategies aligned with your goals.</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">3</div>
            <h3 class="text-xl font-bold mb-2 text-gray-900">Execute</h3>
            <p class="text-gray-600">Implement campaigns with precision using cutting-edge tools and techniques.</p>
          </div>
          
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-500 text-white rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">4</div>
            <h3 class="text-xl font-bold mb-2 text-gray-900">Optimize</h3>
            <p class="text-gray-600">Continuously monitor and refine strategies for maximum performance.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding gradient-bg text-white">
      <div class="container text-center">
        <h2 class="text-3xl lg:text-4xl font-bold mb-6">{{ t('services.readyToTransform') }}</h2>
        <p class="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
          {{ t('services.discussServices') }}
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <NuxtLink :to="$localePath('/digital-agency/contact')" class="btn-primary hover:bg-gray-100">{{ t('common.getFreeConsultation') }}</NuxtLink>
          <button class="btn-secondary !border-white !text-white hover:bg-white hover:text-blue-600">{{ t('common.viewCaseStudies') }}</button>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-12">
      <div class="container">
        <div class="grid md:grid-cols-4 gap-8">
          <div>
            <div class="text-2xl font-bold mb-4">{{ siteSettings.siteName }}</div>
            <p class="text-gray-400 mb-4">{{ t('footer.elevatingBrands') }}</p>
            <div class="grid grid-cols-3 gap-3 max-w-[156px]">
              <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                <img src="/social_icons/icons8-facebook-50.png" alt="Facebook" class="w-7 h-7 object-contain">
              </a>
              <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-pink-500 transition-colors">
                <img src="/social_icons/icons8-instagram-50.png" alt="Instagram" class="w-7 h-7 object-contain">
              </a>
              <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors">
                <img src="/social_icons/icons8-line-50.png" alt="Line" class="w-7 h-7 object-contain">
              </a>
              <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-black transition-colors">
                <img src="/social_icons/icons8-tiktok-50.png" alt="TikTok" class="w-7 h-7 object-contain">
              </a>
              <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors">
                <img src="/social_icons/icons8-youtube-50.png" alt="YouTube" class="w-7 h-7 object-contain">
              </a>
              <a href="#" class="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                <img src="/social_icons/icons8-linkedin-circled-50.png" alt="LinkedIn" class="w-7 h-7 object-contain">
              </a>
            </div>
          </div>
          
          <div>
            <h4 class="text-lg font-bold mb-4">{{ t('footer.services') }}</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition-colors">{{ t('footer.seoOptimization') }}</a></li>
              <li><a href="#" class="hover:text-white transition-colors">{{ t('footer.socialMediaMarketing') }}</a></li>
              <li><a href="#" class="hover:text-white transition-colors">{{ t('footer.webDevelopment') }}</a></li>
              <li><a href="#" class="hover:text-white transition-colors">{{ t('footer.ppcAdvertising') }}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-lg font-bold mb-4">{{ t('footer.company') }}</h4>
            <ul class="space-y-2 text-gray-400">
              <li><NuxtLink :to="$localePath('/digital-agency/about')" class="hover:text-white transition-colors">{{ t('footer.aboutUs') }}</NuxtLink></li>
              <li><a href="#" class="hover:text-white transition-colors">{{ t('footer.ourPeople') }}</a></li>
              <li><a href="#" class="hover:text-white transition-colors">{{ t('footer.careers') }}</a></li>
              <li><a href="#" class="hover:text-white transition-colors">{{ t('footer.blog') }}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 class="text-lg font-bold mb-4">{{ t('footer.contact') }}</h4>
            <ul class="space-y-2 text-gray-400">
              <li>+1 (555) 123-4567</li>
              <li>hello@digitalflow.com</li>
              <li>123 Innovation Drive<br>Tech Valley, CA 94105</li>
            </ul>
          </div>
        </div>
        
        <div class="border-t border-gray-800 pt-8 mt-8 text-center text-gray-400">
          <p>&copy; 2025 {{ siteSettings.siteName }}. All rights reserved.</p>
        </div>
      </div>
    </footer>
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
      ...localized,
      features: getLocalizedFeatures(service.features)
    }
  })
})

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
  title: `${servicesContent.value.heroTitle} | ${siteSettings.value.siteName}`,
  description: () => servicesContent.value.heroSubtitle || 'Comprehensive digital marketing services including video production, poster design, social media content, branding, and digital marketing to grow your business.',
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
  font-family: 'Inter', 'Segoe UI', 'Roboto', sans-serif;
  line-height: 1.6;
  color: var(--text-dark);
  box-sizing: border-box;
  background-color: white;
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