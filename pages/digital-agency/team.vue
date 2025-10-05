<template>
  <div class="min-h-screen">
    <!-- Top Navbar -->
    <CmsTopNavbar />

    <!-- Navigation -->
    <CmsNavbar>
      <template #nav-links>
        <NuxtLink :to="$localePath('/digital-agency')">{{ t('nav.home') }}</NuxtLink>
        <NuxtLink :to="$localePath('/digital-agency/services')">{{ t('index.ourService') }}</NuxtLink>
        <NuxtLink :to="$localePath('/digital-agency/team')">{{ t('nav.team') }}</NuxtLink>
        <NuxtLink :to="$localePath('/digital-agency/about')">{{ t('nav.about') }}</NuxtLink>
        <NuxtLink :to="$localePath('/digital-agency/contact')">{{ t('common.contactUs') }}</NuxtLink>
      </template>
    </CmsNavbar>

    <!-- Hero Section -->
    <section 
      class="section-padding text-white relative overflow-hidden" 
      style="padding-top: 240px;"
      :class="teamContent.heroImage ? 'bg-cover bg-center bg-no-repeat' : 'bg-gradient-primary-to-secondary'"
      :style="teamContent.heroImage ? { backgroundImage: `url(${teamContent.heroImage})` } : {}"
    >
      <!-- Overlay for better text readability when using background image -->
      <div v-if="teamContent.heroImage" class="absolute inset-0 bg-black/40"></div>
      
      <div class="container text-center relative z-10">
        <h1 class="font-bold mb-6" style="font-size: clamp(40px, 5vw, 72px);">{{ teamContent.heroTitle }}</h1>
        <p class="text-blue-100 max-w-3xl mx-auto" style="font-size: clamp(24px, 2vw, 28px);">
          {{ teamContent.heroSubtitle }}
        </p>
      </div>
    </section>

    <!-- Team Section -->
    <section class="section-padding">
      <div class="container">
        <!-- Loading State -->
        <div v-if="loading" class="flex justify-center items-center h-64">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>

        <!-- People Grid -->
        <div v-else-if="teamMembers.length > 0" class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div v-for="member in teamMembers" :key="member.id" class="card group hover:shadow-xl transition-all duration-300">
            <!-- Member Image -->
            <div class="relative overflow-hidden rounded-t-xl">
              <div v-if="member.image" class="aspect-square">
                <img 
                  :src="member.image" 
                  :alt="member.name"
                  class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                >
              </div>
              <div v-else class="aspect-square bg-gradient-to-br from-primary-very-light to-primary-light flex items-center justify-center">
                <svg class="w-24 h-24 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                </svg>
              </div>
            </div>

            <!-- Member Info -->
            <div class="p-6">
              <h3 class="font-bold text-gray-900 mb-1" style="font-size: 30px;">{{ member.name }}</h3>
              <p class="text-blue-600 font-medium mb-3" style="font-size: 22px;">{{ member.position }}</p>
              <p class="text-gray-600 mb-4 line-clamp-3" style="font-size: 23px;">{{ member.description }}</p>

              <!-- Social Links -->
              <div class="flex space-x-3">
                <a 
                  v-if="member.email" 
                  :href="`mailto:${member.email}`" 
                  class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </a>
                <a 
                  v-if="member.linkedin" 
                  :href="member.linkedin" 
                  target="_blank"
                  class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <a 
                  v-if="member.twitter" 
                  :href="member.twitter" 
                  target="_blank"
                  class="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-blue-100 hover:text-blue-600 transition-colors"
                >
                  <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty State -->
        <div v-else class="text-center py-16">
          <svg class="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
          </svg>
          <h3 class="text-2xl font-bold text-gray-900 mb-2">{{ t('team.comingSoon') }}</h3>
          <p class="text-gray-600">{{ t('team.buildingShowcase') }}</p>
        </div>
      </div>
    </section>

    <!-- Values Section -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="font-bold mb-4 text-gray-900" style="font-size: clamp(40px, 4vw, 56px);">{{ t('team.ourValues') }}</h2>
          <p class="text-gray-600 max-w-2xl mx-auto" style="font-size: 26px;">
            {{ t('team.principlesGuide') }}
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"></path>
              </svg>
            </div>
            <h3 class="font-bold text-gray-900 mb-3" style="font-size: 24px;">{{ t('team.innovation') }}</h3>
            <p class="text-gray-600" style="font-size: 22px;">{{ t('team.innovationDesc') }}</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
              </svg>
            </div>
            <h3 class="font-bold text-gray-900 mb-3" style="font-size: 24px;">{{ t('team.excellence') }}</h3>
            <p class="text-gray-600" style="font-size: 22px;">{{ t('team.excellenceDesc') }}</p>
          </div>

          <div class="text-center">
            <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg class="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
              </svg>
            </div>
            <h3 class="font-bold text-gray-900 mb-3" style="font-size: 24px;">{{ t('team.collaboration') }}</h3>
            <p class="text-gray-600" style="font-size: 22px;">{{ t('team.collaborationDesc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding gradient-bg text-white">
      <div class="container text-center">
        <h2 class="font-bold mb-6" style="font-size: clamp(40px, 4vw, 56px);">{{ t('team.readyToWork') }}</h2>
        <p class="text-blue-100 mb-8 max-w-2xl mx-auto" style="font-size: 26px;">
          {{ t('team.letTalentedPeople') }}
        </p>
        <NuxtLink :to="$localePath('/digital-agency/contact')" class="btn-primary hover:bg-gray-100">{{ t('common.getInTouch') }}</NuxtLink>
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

// Fetch team members and site settings from API
const cmsStore = useCMSStore()
const { t, locale } = useI18n()
const { createLocalizedContent, parseJsonField } = useMultiLanguage()

await cmsStore.fetchTeamMembers()
await cmsStore.fetchSiteSettings()
await cmsStore.fetchTeamContent()

const teamMembersRaw = cmsStore.getActiveTeamMembers
const siteSettingsRaw = cmsStore.siteSettings
const teamContentRaw = cmsStore.teamContent
const loading = ref(false)

// Create reactive localized content
const siteSettings = computed(() => createLocalizedContent(siteSettingsRaw))
const teamContent = computed(() => createLocalizedContent(teamContentRaw))
const teamMembers = computed(() => {
  return teamMembersRaw.map(member => {
    const localized = createLocalizedContent(member)
    const socialLinks = parseJsonField(member.socialLinks)

    return {
      ...localized,
      socialLinks,
      description: localized.bio, // Using bio as description
      // Extract individual social links for easier template access
      email: socialLinks.email,
      linkedin: socialLinks.linkedin,
      twitter: socialLinks.twitter,
      facebook: socialLinks.facebook,
      instagram: socialLinks.instagram,
      github: socialLinks.github,
      behance: socialLinks.behance,
      medium: socialLinks.medium,
      youtube: socialLinks.youtube
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
  title: `Our People | ${siteSettings.siteName} - Meet Our Talented Team`,
  description: `Meet the talented people at ${siteSettings.siteName}. Our experienced professionals are dedicated to helping you achieve success and drive exceptional results.`,
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

/* Card Styles */
.card {
  @apply bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform;
}

.card:hover {
  transform: translateY(-8px);
  box-shadow: 0 25px 50px var(--primary-rgba-20);
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

/* Dynamic color variations */
.text-blue-500 {
  color: var(--primary-color);
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

.hover\:text-blue-600:hover {
  color: var(--primary-dark);
  transition: color 0.2s ease;
}

.hover\:bg-blue-600:hover {
  background-color: var(--primary-dark);
  transition: background-color 0.2s ease;
}

/* Loading spinner */
.border-blue-600 {
  border-color: var(--primary-color);
}

/* Team member card enhancements */
.text-blue-600 {
  color: var(--primary-color);
}

.hover\:bg-blue-100:hover {
  background-color: var(--primary-rgba-10);
  transition: background-color 0.2s ease;
}

.hover\:text-blue-600:hover {
  color: var(--primary-color);
  transition: color 0.2s ease;
}

/* Value section icon backgrounds */
.bg-blue-100 {
  background-color: var(--primary-rgba-20);
}

.bg-green-100 {
  background-color: var(--secondary-rgba-20);
}

.bg-purple-100 {
  background: linear-gradient(135deg, var(--primary-rgba-10), var(--secondary-rgba-10));
}

/* Value section icon colors */
.text-blue-600 {
  color: var(--primary-color);
}

.text-green-600 {
  color: var(--secondary-color);
}

.text-purple-600 {
  color: var(--primary-dark);
}

/* Placeholder image background */
.from-primary-very-light {
  --tw-gradient-from: var(--primary-very-light);
}

.to-primary-light {
  --tw-gradient-to: var(--primary-light);
}

/* Text utilities */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Enhanced hover effects for team cards */
.group:hover .group-hover\:scale-105 {
  transform: scale(1.05);
}

/* Social link hover effects */
a[href^="mailto:"] {
  transition: all 0.3s ease;
}

a[href^="mailto:"]:hover {
  background-color: var(--primary-rgba-10) !important;
  color: var(--primary-color) !important;
  transform: translateY(-2px);
}

a[href*="linkedin"]:hover {
  background-color: var(--primary-rgba-10) !important;
  color: var(--primary-color) !important;
  transform: translateY(-2px);
}

a[href*="twitter"]:hover {
  background-color: var(--secondary-rgba-10) !important;
  color: var(--secondary-color) !important;
  transform: translateY(-2px);
}

/* Text contrast fixes for dark backgrounds */
.gradient-bg h1,
.gradient-bg h2,
.gradient-bg p,
.gradient-bg .text-blue-100 {
  color: white !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Value cards hover effects */
.value-card {
  transition: all 0.3s ease;
}

.value-card:hover {
  transform: translateY(-4px);
}

.value-card:hover .w-16 {
  transform: scale(1.1);
  transition: transform 0.3s ease;
}

/* Responsive adjustments */
@media (max-width: 640px) {
  .btn-primary {
    @apply w-full py-4 text-base;
    min-width: unset;
  }
}
</style>