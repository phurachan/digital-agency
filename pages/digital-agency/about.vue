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
      :class="aboutContent.heroImage ? 'bg-cover bg-center bg-no-repeat' : 'bg-gradient-primary-to-secondary'"
      :style="aboutContent.heroImage ? { backgroundImage: `url(${aboutContent.heroImage})` } : {}"
    >
      <!-- Overlay for better text readability when using background image -->
      <div v-if="aboutContent.heroImage" class="absolute inset-0 bg-black/40"></div>
      
      <div class="container text-center relative z-10">
        <h1 class="font-bold mb-6" style="font-size: clamp(40px, 5vw, 72px);">{{ t('about.aboutCompany', { siteName: siteSettings.siteName }) }}</h1>
        <p class="text-blue-100 max-w-3xl mx-auto" style="font-size: clamp(24px, 2vw, 28px);">
          {{ t('about.passionateHelping') }}
        </p>
      </div>
    </section>

    <!-- Mission Section -->
    <section class="section-padding">
      <div class="container">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="font-bold mb-6 text-gray-900" style="font-size: clamp(40px, 4vw, 56px);">{{ aboutContent.missionTitle }}</h2>
            <p class="text-gray-600 mb-6" style="font-size: 26px;">
              {{ aboutContent.missionText }}
            </p>
            <div class="grid grid-cols-2 gap-6">
              <div class="text-center p-4 bg-blue-50 rounded-lg">
                <div class="text-3xl font-bold text-blue-600 mb-2">500+</div>
                <div class="text-gray-700">Happy Clients</div>
              </div>
              <div class="text-center p-4 bg-green-50 rounded-lg">
                <div class="text-3xl font-bold text-green-600 mb-2">10+</div>
                <div class="text-gray-700">Years Experience</div>
              </div>
            </div>
          </div>
          <div class="relative">
            <div 
              class="rounded-2xl p-8 text-white relative overflow-hidden"
              :class="aboutContent.missionImage ? 'bg-cover bg-center bg-no-repeat' : 'bg-gradient-primary-to-secondary'"
              :style="aboutContent.missionImage ? { backgroundImage: `url(${aboutContent.missionImage})` } : {}"
            >
              <!-- Overlay for better text readability when using background image -->
              <div v-if="aboutContent.missionImage" class="absolute inset-0 bg-black/60"></div>
              
              <div class="relative z-10">
                <h3 class="font-bold mb-4" style="font-size: 30px;">{{ aboutContent.visionTitle }}</h3>
                <p class="text-gray-100 mb-6" style="font-size: 26px;">{{ aboutContent.visionText }}</p>
                <ul class="space-y-4">
                  <li 
                    v-for="item in parsedVisionItems" 
                    :key="item"
                    class="flex items-center"
                  >
                    <svg class="w-6 h-6 text-green-400 mr-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {{ item }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>


    <!-- Values Section -->
    <section class="section-padding">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="font-bold mb-4 text-gray-900" style="font-size: clamp(40px, 4vw, 56px);">{{ aboutContent.valuesTitle }}</h2>
          <p class="text-gray-600" style="font-size: 26px;">{{ aboutContent.valuesText }}</p>
        </div>
        
        <div class="grid md:grid-cols-3 gap-8">
          <div 
            v-for="(value, index) in parsedValuesItems" 
            :key="value.title"
            class="text-center"
          >
            <div class="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" :class="getValueIconClass(index)">
              <div v-html="getValueIcon(value.icon || 'default')"></div>
            </div>
            <h3 class="font-bold mb-4 text-gray-900" style="font-size: 24px;">{{ value.title }}</h3>
            <p class="text-gray-600" style="font-size: 22px;">{{ value.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- History Timeline -->
    <section class="section-padding bg-gray-50">
      <div class="container">
        <div class="text-center mb-16">
          <h2 class="font-bold mb-4 text-gray-900" style="font-size: clamp(40px, 4vw, 56px);">{{ aboutContent.historyTitle }}</h2>
          <p class="text-gray-600" style="font-size: 26px;">{{ aboutContent.historyText }}</p>
        </div>
        
        <div class="max-w-4xl mx-auto">
          <div class="space-y-12">
            <div 
              v-for="(journey, index) in parsedJourneyItems" 
              :key="journey.year"
              class="flex items-center space-x-6"
            >
              <div class="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0" :class="getJourneyColor(index)">{{ journey.year }}</div>
              <div class="card p-6 flex-grow">
                <h3 class="font-bold mb-2 text-gray-900" style="font-size: 24px;">{{ journey.title }}</h3>
                <p class="text-gray-600" style="font-size: 22px;">{{ journey.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="section-padding gradient-bg text-white">
      <div class="container text-center">
        <h2 class="font-bold mb-6" style="font-size: clamp(40px, 4vw, 56px);">{{ t('common.workTogether') }}</h2>
        <p class="text-blue-100 mb-8 max-w-2xl mx-auto" style="font-size: 26px;">
          {{ t('about.joinBusinesses', { siteName: siteSettings.siteName }) }}
        </p>
        <NuxtLink :to="$localePath('/digital-agency/contact')" class="btn-primary hover:bg-gray-100">{{ t('common.startJourney') }}</NuxtLink>
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

const cmsStore = useCMSStore()
const { t, locale } = useI18n()
const { createLocalizedContent, parseJsonField } = useMultiLanguage()
const currentLanguage = computed(() => locale.value)

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

await cmsStore.fetchSiteSettings()
await cmsStore.fetchAboutContent()
const siteSettingsRaw = cmsStore.siteSettings
const aboutContentRaw = cmsStore.aboutContent

// Create reactive localized content
const siteSettings = computed(() => createLocalizedContent(siteSettingsRaw))

// Create reactive localized content using the composable
const aboutContent = computed(() => createLocalizedContent(aboutContentRaw))

// Parse dynamic arrays with multi-language support - using fallback since there's no visionItems in seed
const parsedVisionItems = computed(() => {
  const fallbackItems = [
    { en: 'Proven Track Record', th: 'ประวัติที่พิสูจน์แล้ว' },
    { en: 'Dedicated Management', th: 'การจัดการที่ทุ่มเท' },
    { en: 'Transparent Reporting', th: 'รายงานที่โปร่งใส' },
    { en: '24/7 Support Available', th: 'บริการสนับสนุน 24/7' }
  ]
  return fallbackItems.map(item => item[currentLanguage.value] || item.en)
})

// Parse values items - using fallback since there's no valuesItems in seed
const parsedValuesItems = computed(() => {
  const fallbackItems = [
    {
      title: { en: 'Excellence', th: 'ความเป็นเลิศ' },
      description: { en: 'We strive for excellence in every project, delivering results that exceed expectations.', th: 'เรามุ่งมั่นสู่ความเป็นเลิศในทุกโครงการ ส่งมอบผลลัพธ์ที่เกินความคาดหวัง' },
      icon: 'excellence'
    },
    {
      title: { en: 'Transparency', th: 'ความโปร่งใส' },
      description: { en: 'Open communication and honest reporting build trust in all our client relationships.', th: 'การสื่อสารอย่างเปิดเผยและรายงานที่ซื่อสัตย์สร้างความไว้วางใจ' },
      icon: 'transparency'
    },
    {
      title: { en: 'Innovation', th: 'นวัตกรรม' },
      description: { en: 'We stay ahead of trends and continuously innovate to give clients a competitive edge.', th: 'เราก้าวนำเทรนด์และสร้างนวัตกรรมเพื่อให้ลูกค้ามีความได้เปรียบ' },
      icon: 'innovation'
    }
  ]
  return fallbackItems.map(item => ({
    title: item.title[currentLanguage.value] || item.title.en,
    description: item.description[currentLanguage.value] || item.description.en,
    icon: item.icon
  }))
})

// Parse journey items - using fallback since there's no journeyItems in seed
const parsedJourneyItems = computed(() => {
  const fallbackItems = [
    {
      year: '2015',
      title: { en: 'The Beginning', th: 'จุดเริ่มต้น' },
      description: { en: `Founded ${siteSettings.value.siteName} with a mission to help businesses succeed through digital marketing.`, th: `ก่อตั้ง ${siteSettings.value.siteName} ด้วยพันธกิจช่วยธุรกิจประสบความสำเร็จผ่านการตลาดดิจิทัล` }
    },
    {
      year: '2018',
      title: { en: 'Rapid Growth', th: 'การเติบโตอย่างรวดเร็ว' },
      description: { en: 'Expanded to 25 specialists and served over 200 clients across industries.', th: 'ขยายเป็น 25 ผู้เชี่ยวชาญและให้บริการลูกค้ากว่า 200 รายในหลากหลายอุตสาหกรรม' }
    },
    {
      year: '2021',
      title: { en: 'Innovation Leader', th: 'ผู้นำด้านนวัตกรรม' },
      description: { en: 'Launched proprietary analytics platform and AI-driven tools.', th: 'เปิดตัวแพลตฟอร์มวิเคราะห์ข้อมูลและเครื่องมือที่ขับเคลื่อนด้วย AI' }
    },
    {
      year: '2025',
      title: { en: 'Industry Recognition', th: 'การยอมรับในอุตสาหกรรม' },
      description: { en: 'Recognized as top agency with over 500 successful partnerships.', th: 'ได้รับการยอมรับเป็นเอเจนซี่ชั้นนำด้วยความสำเร็จกว่า 500 พาร์ทเนอร์ชิพ' }
    }
  ]
  return fallbackItems.map(item => ({
    year: item.year,
    title: item.title[currentLanguage.value] || item.title.en,
    description: item.description[currentLanguage.value] || item.description.en
  }))
})

// Helper functions
const getValueIconClass = (index) => {
  const classes = ['bg-blue-100', 'bg-green-100', 'bg-purple-100']
  return classes[index % classes.length]
}

const getValueIcon = (iconType) => {
  const icons = {
    excellence: '<svg class="w-10 h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path></svg>',
    transparency: '<svg class="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>',
    innovation: '<svg class="w-10 h-10 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"></path></svg>',
    default: '<svg class="w-10 h-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>'
  }
  return icons[iconType] || icons.default
}

const getJourneyColor = (index) => {
  const colors = ['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500']
  return colors[index % colors.length]
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
  title: `About Us | ${siteSettings.siteName} - Digital Marketing Agency`,
  description: `Learn about ${siteSettings.siteName}'s mission, values, and expert team. Discover why we're the trusted digital marketing partner for businesses.`,
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
  @apply bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1;
}

/* Layout Utilities */
.section-padding {
  @apply py-16 lg:py-24;
}

.container {
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
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

/* Secondary color utilities */
.text-secondary {
  color: var(--secondary-color);
}

.bg-secondary {
  background-color: var(--secondary-color);
  display: flex;
  align-items: end;
}

.border-secondary {
  border-color: var(--secondary-color);
}

/* Dynamic color-based background variations */
.bg-blue-50 {
  background-color: var(--primary-rgba-10);
}

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

.hover\:bg-blue-600:hover {
  background-color: var(--primary-dark);
  transition: background-color 0.2s ease;
}

/* Value icon backgrounds with dynamic colors */
.bg-blue-100 {
  background-color: var(--primary-rgba-20);
}

.bg-green-100 {
  background-color: var(--secondary-rgba-20);
}

.bg-purple-100 {
  background-color: var(--primary-rgba-10);
}

/* Journey timeline colors */
.bg-blue-500 {
  background-color: var(--primary-color);
}

.bg-green-500 {
  background-color: var(--secondary-color);
}

.bg-purple-500 {
  background-color: var(--primary-dark);
}

.bg-orange-500 {
  background-color: var(--secondary-dark);
}

/* Hover effects with dynamic colors */
.hover-lift:hover {
  transform: translateY(-4px);
  box-shadow: 0 10px 25px var(--primary-rgba-20);
  transition: all 0.3s ease;
}

.hover-glow:hover {
  box-shadow: 0 0 20px var(--primary-rgba-30);
  transition: box-shadow 0.3s ease;
}

/* Text contrast fixes for dark backgrounds */
.gradient-bg h1,
.gradient-bg h2,
.gradient-bg p,
.gradient-bg .text-blue-100 {
  color: white !important;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}


</style>