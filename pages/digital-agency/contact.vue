<template>
  <div class="min-h-screen">
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
      style="padding-top: 160px;"
      :class="contactContent.heroImage ? 'bg-cover bg-center bg-no-repeat' : 'bg-gradient-primary-to-secondary'"
      :style="contactContent.heroImage ? { backgroundImage: `url(${contactContent.heroImage})` } : {}"
    >
      <!-- Overlay for better text readability when using background image -->
      <div v-if="contactContent.heroImage" class="absolute inset-0 bg-black/40"></div>
      
      <div class="container text-center relative z-10">
        <h1 class="font-bold mb-6" style="font-size: clamp(40px, 5vw, 72px);">{{ contactContent.title }}</h1>
        <p class="text-blue-100 max-w-3xl mx-auto" style="font-size: clamp(24px, 2vw, 28px);">
          {{ contactContent.subtitle }}
        </p>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section class="section-padding">
      <div class="container">
        <div class="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          <!-- Contact Information -->
          <div>
            <h2 class="font-bold mb-8 text-gray-900" style="font-size: clamp(40px, 4vw, 56px);">{{ t('contact.letsStartConversation') }}</h2>
            <p class="text-gray-600 mb-8" style="font-size: 26px;">
              {{ t('contact.helpYouDescription') }}
            </p>
            
            <!-- Contact Info Cards -->
            <div class="space-y-6 mb-8">
              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 mb-1" style="font-size: 24px;">{{ t('contact.phoneLabel') }}</h4>
                  <p class="text-gray-600" style="font-size: 22px;">{{ contactContent.phone || '+1 (555) 123-4567' }}</p>
                  <p class="text-gray-500" style="font-size: 18px;">{{ t('contact.availableHours') }}</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 mb-1" style="font-size: 24px;">{{ t('contact.emailLabel') }}</h4>
                  <p class="text-gray-600" style="font-size: 22px;">{{ contactContent.email || 'hello@digitalflow.com' }}</p>
                  <p class="text-gray-500" style="font-size: 18px;">{{ t('contact.respondWithin24') }}</p>
                </div>
              </div>

              <div class="flex items-start space-x-4">
                <div class="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <h4 class="font-bold text-gray-900 mb-1" style="font-size: 24px;">{{ t('contact.officeLabel') }}</h4>
                  <p class="text-gray-600" style="font-size: 22px;">{{ contactContent.address || t('contact.officeAddress') }}</p>
                  <p class="text-gray-500" style="font-size: 18px;">{{ t('contact.visitInPerson') }}</p>
                </div>
              </div>
            </div>

            <!-- Business Hours -->
            <div class="card p-6">
              <h3 class="font-bold mb-4 text-gray-900" style="font-size: 24px;">{{ t('contact.businessHours') }}</h3>
              <div class="space-y-2">
                <div class="flex justify-between">
                  <span class="text-gray-600">{{ t('contact.mondayFriday') }}</span>
                  <span class="font-medium">{{ t('contact.mondayFridayHours') }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">{{ t('contact.saturday') }}</span>
                  <span class="font-medium">{{ t('contact.saturdayHours') }}</span>
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-600">{{ t('contact.sunday') }}</span>
                  <span class="font-medium">{{ t('contact.closed') }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Contact Form -->
          <div class="card p-8">
            <form @submit.prevent="submitForm" class="space-y-6">
              <div class="grid md:grid-cols-2 gap-6">
                <div class="relative">
                  <input
                    v-model="form.firstName"
                    type="text"
                    placeholder=" "
                    class="form-input peer"
                    required
                  >
                  <label class="floating-label">{{ t('contact.form.firstName') }}</label>
                </div>

                <div class="relative">
                  <input
                    v-model="form.lastName"
                    type="text"
                    placeholder=" "
                    class="form-input peer"
                    required
                  >
                  <label class="floating-label">{{ t('contact.form.lastName') }}</label>
                </div>
              </div>

              <div class="relative">
                <input
                  v-model="form.email"
                  type="email"
                  placeholder=" "
                  class="form-input peer"
                  required
                >
                <label class="floating-label">{{ t('contact.form.email') }}</label>
              </div>

              <div class="relative">
                <input
                  v-model="form.phone"
                  type="tel"
                  placeholder=" "
                  class="form-input peer"
                >
                <label class="floating-label">{{ t('contact.form.phone') }}</label>
              </div>

              <div class="relative">
                <input
                  v-model="form.company"
                  type="text"
                  placeholder=" "
                  class="form-input peer"
                >
                <label class="floating-label">{{ t('contact.form.company') }}</label>
              </div>

              <div class="relative">
                <select v-model="form.service" class="form-input peer" required>
                  <option value="">{{ t('contact.form.selectService') }}</option>
                  <option value="seo">{{ t('contact.form.services.seo') }}</option>
                  <option value="social-media">{{ t('contact.form.services.socialMedia') }}</option>
                  <option value="web-development">{{ t('contact.form.services.webDevelopment') }}</option>
                  <option value="ppc">{{ t('contact.form.services.ppc') }}</option>
                  <option value="email-marketing">{{ t('contact.form.services.emailMarketing') }}</option>
                  <option value="analytics">{{ t('contact.form.services.analytics') }}</option>
                  <option value="consultation">{{ t('contact.form.services.consultation') }}</option>
                  <option value="other">{{ t('contact.form.services.other') }}</option>
                </select>
                <label class="floating-label">{{ t('contact.form.serviceInterest') }}</label>
              </div>

              <div class="relative">
                <select v-model="form.budget" class="form-input peer">
                  <option value="">{{ t('contact.form.selectBudget') }}</option>
                  <option value="under-5k">{{ t('contact.form.budget.under5k') }}</option>
                  <option value="5k-10k">{{ t('contact.form.budget.5kTo10k') }}</option>
                  <option value="10k-25k">{{ t('contact.form.budget.10kTo25k') }}</option>
                  <option value="25k-50k">{{ t('contact.form.budget.25kTo50k') }}</option>
                  <option value="50k-plus">{{ t('contact.form.budget.50kPlus') }}</option>
                </select>
                <label class="floating-label">{{ t('contact.form.budgetRange') }}</label>
              </div>

              <div class="relative">
                <textarea
                  v-model="form.message"
                  placeholder=" "
                  rows="4"
                  class="form-input resize-none peer"
                  required
                ></textarea>
                <label class="floating-label">{{ t('contact.form.message') }}</label>
              </div>

              <!-- Checkbox -->
              <div class="flex items-start space-x-3">
                <input
                  v-model="form.newsletter"
                  type="checkbox"
                  id="newsletter"
                  class="mt-1 w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-500"
                >
                <label for="newsletter" class="text-gray-600" style="font-size: 18px;">
                  {{ t('contact.form.newsletter', { siteName: siteSettings.siteName }) }}
                </label>
              </div>

              <button
                type="submit"
                class="btn-primary w-full"
                :disabled="isSubmitting"
              >
                {{ isSubmitting ? t('contact.form.sending') : t('contact.form.sendMessage') }}
              </button>

              <p class="text-gray-500 text-center" style="font-size: 18px;">
                {{ t('contact.form.privacyNotice') }}
              </p>
            </form>
            
            <!-- Success Message -->
            <div v-if="showSuccessMessage" class="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
              <div class="flex items-center">
                <svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-green-700 font-medium">{{ t('contact.form.successMessage') }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="section-padding bg-gray-50">
      <div class="container max-w-4xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="font-bold mb-4 text-gray-900" style="font-size: clamp(40px, 4vw, 56px);">{{ t('contact.faqTitle') }}</h2>
          <p class="text-gray-600" style="font-size: 26px;">{{ t('contact.faqSubtitle') }}</p>
        </div>
        
        <div class="space-y-4">
          <div v-for="(faq, index) in faqs" :key="faq.id" class="card">
            <button 
              @click="toggleFaq(index)" 
              class="w-full p-6 text-left flex justify-between items-center"
            >
              <h3 class="font-bold text-gray-900" style="font-size: 24px;">{{ faq.question }}</h3>
              <svg class="w-5 h-5 text-gray-500 transform transition-transform" :class="{ 'rotate-180': openFaq === index }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </button>
            <div v-show="openFaq === index" class="px-6 pb-6">
              <p class="text-gray-600" style="font-size: 22px;">{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding gradient-bg text-white">
      <div class="container text-center">
        <h2 class="font-bold mb-6" style="font-size: clamp(40px, 4vw, 56px);">{{ t('home.readyToGetStarted') }}</h2>
        <p class="text-blue-100 mb-8 max-w-2xl mx-auto" style="font-size: 26px;">
          {{ t('contact.joinBusinesses', { siteName: siteSettings.siteName }) }}
        </p>
        <button class="btn-primary hover:bg-gray-100">{{ t('common.scheduleConsultation') }}</button>
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

// Load site settings, contact content and FAQs
const cmsStore = useCMSStore()
const { t, locale } = useI18n()
const { createLocalizedContent } = useMultiLanguage()

await cmsStore.fetchContactContent()
await cmsStore.fetchFAQs()
await cmsStore.fetchSiteSettings()

const contactContentRaw = cmsStore.contactContent
const faqsRaw = cmsStore.getActiveFAQs
const siteSettingsRaw = cmsStore.siteSettings


// Create reactive localized content
const siteSettings = computed(() => createLocalizedContent(siteSettingsRaw))
const contactContent = computed(() => createLocalizedContent(contactContentRaw))
const faqs = computed(() => {
  return faqsRaw.map(faq => createLocalizedContent(faq))
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

// Form data
const form = reactive({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  budget: '',
  message: '',
  newsletter: false
})

// Form state
const isSubmitting = ref(false)
const showSuccessMessage = ref(false)

// FAQ state
const openFaq = ref(-1)

// FAQs already loaded above via CMS composable

// Methods
const submitForm = async () => {
  isSubmitting.value = true
  
  // Simulate form submission
  try {
    await new Promise(resolve => setTimeout(resolve, 1000))
    showSuccessMessage.value = true
    // Reset form
    Object.keys(form).forEach(key => {
      if (typeof form[key] === 'boolean') {
        form[key] = false
      } else {
        form[key] = ''
      }
    })
  } catch (error) {
    console.error('Form submission error:', error)
  } finally {
    isSubmitting.value = false
  }
}

const toggleFaq = (index) => {
  openFaq.value = openFaq.value === index ? -1 : index
}

useSeoMeta({
  title: () => `Contact Us | ${siteSettings.value.siteName || 'Digital Marketing Agency'} - Get Your Free Consultation`,
  description: () => `Ready to transform your digital presence? Contact ${siteSettings.value.siteName || 'us'} today for a free consultation. Our digital marketing experts are ready to help grow your business.`,
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

/* Form Styles */
.form-input {
  @apply w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none transition-all duration-300 bg-white;
  font-size: 24px;
  line-height: 1.5;
}

.form-input:focus {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 3px var(--primary-rgba-20);
  transform: translateY(-1px);
}

.form-input:hover:not(:focus) {
  border-color: var(--primary-light);
}

.form-input::placeholder {
  color: #a0aec0;
}

/* Floating Label Styles */
.floating-label {
  @apply absolute left-4 top-3 text-gray-500 pointer-events-none transition-all duration-200;
  font-size: 24px;
  transform-origin: left top;
}

.form-input:focus ~ .floating-label,
.form-input:not(:placeholder-shown) ~ .floating-label {
  font-size: 18px;
  color: var(--primary-color);
  transform: translateY(-1.5rem) scale(0.85);
  background: white;
  padding: 0 4px;
}

/* Removed redundant .relative class and @apply peer to fix build errors */

/* Card Styles */
.card {
  @apply bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300;
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

/* Dynamic color-based background variations */
.bg-blue-100 {
  background-color: var(--primary-rgba-20);
}

.bg-green-100 {
  background-color: var(--secondary-rgba-20);
}

.bg-purple-100 {
  background-color: var(--primary-rgba-10);
}

.text-blue-500 {
  color: var(--primary-color);
}

.text-green-500 {
  color: var(--secondary-color);
}

.text-purple-500 {
  color: var(--primary-dark);
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

/* Success message styling */
.bg-green-50 {
  background-color: var(--secondary-rgba-10);
}

.border-green-200 {
  border-color: var(--secondary-rgba-30);
}

.text-green-500 {
  color: var(--secondary-color);
}

.text-green-700 {
  color: var(--secondary-dark);
}

/* Checkbox styling */
input[type="checkbox"]:checked {
  background-color: var(--primary-color);
  border-color: var(--primary-color);
}

input[type="checkbox"]:focus {
  box-shadow: 0 0 0 3px var(--primary-rgba-20);
}

/* Text contrast fixes for dark backgrounds */
.gradient-bg h1,
.gradient-bg h2,
.gradient-bg p,
.gradient-bg .text-blue-100 {
  color: white !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

/* Responsive Button Adjustments */
@media (max-width: 640px) {
  .btn-primary {
    @apply w-full py-4 text-base;
    min-width: unset;
  }
}
</style>