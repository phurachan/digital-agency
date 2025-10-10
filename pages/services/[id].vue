<template>
  <div class="article-page">
    <!-- Navigation -->
    <CmsNavbar>
      <template #nav-links>
        <NuxtLink :to="$localePath('/')">{{ t('nav.home') }}</NuxtLink>
        <NuxtLink :to="$localePath('/about')">{{ t('nav.about') }}</NuxtLink>
        <NuxtLink :to="$localePath('/services')">{{ t('index.projects') }}</NuxtLink>
        <NuxtLink :to="$localePath('/team')">{{ t('nav.team') }}</NuxtLink>
        <NuxtLink :to="$localePath('/contact')">{{ t('common.contactUs') }}</NuxtLink>
      </template>
    </CmsNavbar>

    <div class="article-container">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <NuxtLink :to="$localePath('/')">{{ t('nav.home') }}</NuxtLink>
        <span class="separator">›</span>
        <NuxtLink :to="$localePath('/services')">{{ t('index.ourService') }}</NuxtLink>
        <span class="separator">›</span>
        <span class="current">{{ serviceData.title }}</span>
      </nav>

      <!-- Article Header -->
      <article class="article-content">
        <header class="article-header">
          <h1 class="article-title">{{ serviceData.title }}</h1>

          <!-- Metadata -->
          <div class="article-meta">
            <div class="meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span>{{ siteSettings.siteName }}</span>
            </div>
            <div v-if="serviceData.createdAt" class="meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{{ formatDate(serviceData.createdAt) }}</span>
            </div>
            <div v-if="serviceData.price" class="meta-item price-tag">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              <span>฿{{ serviceData.price.toLocaleString() }}</span>
            </div>
            <a
              v-if="serviceData.externalURL"
              :href="serviceData.externalURL"
              target="_blank"
              rel="noopener noreferrer"
              class="meta-item meta-link"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              <span>{{ t('services.viewMore') }}</span>
            </a>
          </div>
        </header>

        <!-- Featured Image/Video -->
        <!-- <div v-if="serviceData.image || serviceData.video" class="featured-media">
          <img v-if="serviceData.image" :src="serviceData.image" :alt="serviceData.title" class="featured-image">
          <div v-else-if="serviceData.video" class="video-wrapper">
            <iframe
              :src="serviceData.video"
              class="responsive-iframe"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
        </div> -->

        <!-- Article Body -->
        <div class="article-body">
          <!-- Description (Rich Text) -->
          <div class="content-section">
            <div class="prose-content" v-html="serviceData.description"></div>
          </div>

          <!-- Album Gallery -->
          <div v-if="serviceData.album && serviceData.album.length > 0" class="content-section">
            <h2 class="section-heading">{{ t('services.gallery') || 'แกลเลอรี่' }}</h2>
            <div class="album-grid">
              <div
                v-for="(image, index) in serviceData.album"
                :key="index"
                class="album-item"
                @click="openLightbox(index)"
              >
                <img :src="image" :alt="`${serviceData.title} - Image ${index + 1}`" class="album-image">
                <div class="album-overlay">
                  <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <!-- Features Section -->
          <div v-if="serviceData.features && serviceData.features.length > 0" class="content-section">
            <h2 class="section-heading">{{ t('services.features') }}</h2>
            <div class="flex flex-wrap gap-3">
              <span v-for="feature in serviceData.features" :key="feature"
                class="px-4 py-2 text-base rounded-full text-white font-medium"
                :style="{ backgroundColor: serviceData.color || '#6495ed', opacity: 0.9 }">
                {{ feature }}
              </span>
            </div>
          </div>

          <!-- Contact CTA -->
          <div class="content-section">
            <div class="contact-card">
              <h3 class="contact-title">{{ t('services.interestedInService') }}</h3>
              <p class="contact-description">{{ t('services.contactUsToday') }}</p>
              <div class="contact-actions">
                <NuxtLink :to="$localePath('/contact')" class="btn-primary">
                  {{ t('common.contactUs') }}
                </NuxtLink>
                <NuxtLink :to="$localePath('/services')" class="btn-secondary">
                  {{ t('services.viewAllServices') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- Related Services Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-card">
          <h3 class="sidebar-title">{{ t('services.relatedServices') }}</h3>
          <div class="related-list">
            <NuxtLink
              v-for="relatedService in relatedServices"
              :key="relatedService.id"
              :to="$localePath(`/services/${relatedService.id}`)"
              class="related-item"
            >
              <div v-if="relatedService.image" class="related-image">
                <img :src="relatedService.image" :alt="relatedService.title">
              </div>
              <div class="related-content">
                <h4 class="related-title">{{ relatedService.title }}</h4>
                <p class="related-description">{{ truncateText(relatedService.description, 60) }}</p>
              </div>
            </NuxtLink>
          </div>
        </div>
      </aside>
    </div>

    <!-- Footer -->
    <CmsFooter />

    <!-- Lightbox Modal -->
    <div v-if="showLightbox" class="lightbox-modal" @click="closeLightbox">
      <button class="lightbox-close" @click.stop="closeLightbox">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>

      <button v-if="currentImageIndex > 0" class="lightbox-prev" @click.stop="prevImage">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
      </button>

      <div class="lightbox-content" @click.stop>
        <img :src="serviceData.album[currentImageIndex]" :alt="`${serviceData.title} - Image ${currentImageIndex + 1}`">
        <div class="lightbox-counter">{{ currentImageIndex + 1 }} / {{ serviceData.album.length }}</div>
      </div>

      <button v-if="currentImageIndex < serviceData.album.length - 1" class="lightbox-next" @click.stop="nextImage">
        <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: false
})

const route = useRoute()
const { t, locale } = useI18n()
const cmsStore = useCMSStore()
const { createLocalizedContent } = useMultiLanguage()

// Import service categories
import { getCategoryLabels } from '~/composables/constants/serviceCategories'

// Fetch services data
await cmsStore.fetchServices()
await cmsStore.fetchSiteSettings()

const siteSettings = computed(() => createLocalizedContent(cmsStore.siteSettings || {}))

// Get service by ID from route params
const serviceId = typeof route.params.id === 'string' ? route.params.id : route.params.id[0]
const service = computed(() => cmsStore.getServiceById(serviceId))

// If service not found, redirect to services page
if (!service.value) {
  navigateTo('/services')
}

// Create localized service data
const serviceData = computed(() => {
  const currentService = service.value || {}

  // Parse multi-language fields manually to preserve HTML
  const parseField = (field: any): string => {
    if (typeof field === 'object' && field !== null) {
      return field[locale.value] || field.en || ''
    }
    if (typeof field === 'string' && field.trim()) {
      try {
        const parsed = JSON.parse(field)
        if (typeof parsed === 'object' && parsed !== null) {
          return parsed[locale.value] || parsed.en || ''
        }
        return field
      } catch (e) {
        return field
      }
    }
    return ''
  }

  // Features are already parsed by store as string[] of codes
  const featureCodes: string[] = Array.isArray(currentService.features) ? currentService.features : []

  // Get feature labels based on current locale
  const featureLabels = getCategoryLabels(featureCodes, locale.value as 'en' | 'th')

  // Album images
  const albumImages = currentService.album || []

  return {
    id: currentService.id,
    title: parseField(currentService.title),
    description: parseField(currentService.description), // Preserve HTML
    features: featureLabels, // Use localized feature labels
    color: currentService.color || '#6495ed', // Keep service color
    album: albumImages, // Album images array
    image: currentService.image,
    video: currentService.video,
    externalURL: currentService.externalURL,
    price: currentService.price,
    createdAt: currentService.createdAt,
    updatedAt: currentService.updatedAt,
    isActive: currentService.isActive,
    isDisplayInHome: currentService.isDisplayInHome
  }
})

// Lightbox state
const showLightbox = ref(false)
const currentImageIndex = ref(0)

// Lightbox functions
const openLightbox = (index: number) => {
  currentImageIndex.value = index
  showLightbox.value = true
  // Prevent body scroll when lightbox is open
  document.body.style.overflow = 'hidden'
}

const closeLightbox = () => {
  showLightbox.value = false
  // Restore body scroll
  document.body.style.overflow = ''
}

const nextImage = () => {
  if (currentImageIndex.value < (serviceData.value.album?.length || 0) - 1) {
    currentImageIndex.value++
  }
}

const prevImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  }
}

// Keyboard navigation for lightbox
onMounted(() => {
  const handleKeydown = (e: KeyboardEvent) => {
    if (!showLightbox.value) return

    if (e.key === 'Escape') {
      closeLightbox()
    } else if (e.key === 'ArrowRight') {
      nextImage()
    } else if (e.key === 'ArrowLeft') {
      prevImage()
    }
  }

  window.addEventListener('keydown', handleKeydown)

  onBeforeUnmount(() => {
    window.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = ''
  })
})

// Get related services (other active services, limit to 3)
const relatedServices = computed(() => {
  const allServices = cmsStore.getActiveServices || []
  return allServices
    .filter((s: any) => s.id !== serviceId)
    .slice(0, 3)
    .map((s: any) => createLocalizedContent(s))
})

// Helper functions
const formatDate = (dateString: string) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString(locale.value === 'th' ? 'th-TH' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const truncateText = (text: string, maxLength: number) => {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

// Dynamic color calculation functions
function hexToRgba(hex: string, alpha = 1) {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

function adjustColorBrightness(hex: string, percent: number) {
  const num = parseInt(hex.slice(1), 16)
  const amt = Math.round(2.55 * percent)
  const R = (num >> 16) + amt
  const G = (num >> 8 & 0x00FF) + amt
  const B = (num & 0x0000FF) + amt
  return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
    (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
    (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)
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
    secondaryDark: adjustColorBrightness(secondary, -20),
    primaryRgba10: hexToRgba(primary, 0.1),
    primaryRgba20: hexToRgba(primary, 0.2),
    primaryRgba30: hexToRgba(primary, 0.3)
  }
})

useSeoMeta({
  title: () => `${serviceData.value.title || 'Service'} | ${siteSettings.value.siteName || 'Digital Marketing Agency'}`,
  description: () => serviceData.value.description || `${serviceData.value.title} - ${siteSettings.value.siteName}`,
  ogImage: () => serviceData.value.image || cmsStore.siteSettings?.logo,
  ogImageAlt: () => serviceData.value.title || 'Service',
  twitterCard: 'summary_large_image',
  twitterImage: () => serviceData.value.image || cmsStore.siteSettings?.logo,
  twitterImageAlt: () => serviceData.value.title || 'Service',
})
</script>

<style scoped>
@font-face {
  font-family: 'PG Stockholm';
  src: url('~/assets/fonts/02-TH-Krub/TH Krub.ttf') format('truetype');
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

.article-page {
  --primary-color: v-bind('dynamicColors.primary');
  --secondary-color: v-bind('dynamicColors.secondary');
  --primary-dark: v-bind('dynamicColors.primaryDark');
  --primary-light: v-bind('dynamicColors.primaryLight');
  --secondary-dark: v-bind('dynamicColors.secondaryDark');
  --primary-rgba-10: v-bind('dynamicColors.primaryRgba10');
  --primary-rgba-20: v-bind('dynamicColors.primaryRgba20');
  --primary-rgba-30: v-bind('dynamicColors.primaryRgba30');

  font-family: 'PG Stockholm', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.7;
  color: #2d3748;
  background-color: #f7fafc;
  min-height: 100vh;
}

.article-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 120px 20px 60px;
  display: grid;
  grid-template-columns: 1fr 350px;
  gap: 10px;
  align-items: start;
}

@media (max-width: 1024px) {
  .article-container {
    grid-template-columns: 1fr;
    padding-top: 100px;
  }
}

/* Breadcrumb */
.breadcrumb {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #718096;
  margin-bottom: 20px;
}

.breadcrumb a {
  color: #4a5568;
  text-decoration: none;
  transition: color 0.2s;
}

.breadcrumb a:hover {
  color: var(--primary-color);
}

.breadcrumb .separator {
  color: #cbd5e0;
}

.breadcrumb .current {
  color: #2d3748;
  font-weight: 500;
}

/* Article Content */
.article-content {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.article-header {
  padding: 40px 60px 30px;
  border-bottom: 1px solid #e2e8f0;
}

@media (max-width: 768px) {
  .article-header {
    padding: 30px 20px 20px;
  }
}

.article-title {
  font-size: 42px;
  font-weight: 700;
  line-height: 1.2;
  color: #1a202c;
  margin-bottom: 20px;
}

@media (max-width: 768px) {
  .article-title {
    font-size: 32px;
  }
}

.article-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 24px;
  font-size: 14px;
  color: #718096;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 6px;
}

.meta-item .icon {
  width: 18px;
  height: 18px;
}

.meta-item.price-tag {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 600;
}

.meta-item.meta-link {
  background: var(--primary-color);
  color: white;
  padding: 6px 14px;
  border-radius: 20px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  transition: all 0.3s;
}

.meta-item.meta-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--primary-rgba-30);
}

/* Featured Media */
.featured-media {
  width: 100%;
  background: #000;
}

.featured-image {
  width: 100%;
  height: auto;
  display: block;
  max-height: 600px;
  object-fit: cover;
}

.video-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
}

.responsive-iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* Article Body */
.article-body {
  padding: 40px 60px 60px;
}

@media (max-width: 768px) {
  .article-body {
    padding: 30px 20px 40px;
  }
}

.content-section {
  margin-bottom: 40px;
}

.content-section:last-child {
  margin-bottom: 0;
}

.lead-text {
  font-size: 20px;
  line-height: 1.8;
  color: #4a5568;
  margin-bottom: 0;
}

.section-heading {
  font-size: 28px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 24px;
  padding-bottom: 12px;
  border-bottom: 3px solid var(--primary-color);
  display: inline-block;
}

/* CTA Card */
.cta-card {
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  border-radius: 16px;
  padding: 40px;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 30px;
}

@media (max-width: 768px) {
  .cta-card {
    flex-direction: column;
    text-align: center;
    padding: 30px 20px;
  }
}

.cta-title {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
}

.cta-description {
  font-size: 16px;
  opacity: 0.9;
  margin: 0;
}

.cta-button {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 14px 32px;
  background: white;
  color: var(--primary-color);
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s;
}

.cta-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.cta-icon {
  width: 18px;
  height: 18px;
}

/* Contact Card */
.contact-card {
  background: #f7fafc;
  border-radius: 16px;
  padding: 40px;
  text-align: center;
  border: 2px solid #e2e8f0;
}

.contact-title {
  font-size: 28px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 12px;
}

.contact-description {
  font-size: 16px;
  color: #718096;
  margin-bottom: 24px;
}

.contact-actions {
  display: flex;
  gap: 16px;
  justify-content: center;
  flex-wrap: wrap;
}

.btn-primary {
  display: inline-block;
  padding: 14px 32px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--primary-rgba-30);
}

.btn-secondary {
  display: inline-block;
  padding: 14px 32px;
  background: transparent;
  border: 2px solid var(--primary-color);
  color: var(--primary-color);
  border-radius: 50px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
  transition: all 0.3s;
}

.btn-secondary:hover {
  background: var(--primary-color);
  color: white;
}

/* Sidebar */
.sidebar {
  position: sticky;
  top: 120px;
}

@media (max-width: 1024px) {
  .sidebar {
    position: relative;
    top: 0;
  }
}

.sidebar-card {
  background: white;
  border-radius: 16px;
  padding: 30px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.sidebar-title {
  font-size: 20px;
  font-weight: 700;
  color: #1a202c;
  margin-bottom: 20px;
  padding-bottom: 12px;
  border-bottom: 2px solid #e2e8f0;
}

.related-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.related-item {
  display: flex;
  gap: 12px;
  padding: 12px;
  border-radius: 12px;
  text-decoration: none;
  transition: all 0.3s;
  border: 1px solid #e2e8f0;
}

.related-item:hover {
  background: #f7fafc;
  border-color: var(--primary-color);
  transform: translateX(4px);
}

.related-image {
  flex-shrink: 0;
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  background: #e2e8f0;
}

.related-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.related-content {
  flex: 1;
  min-width: 0;
}

.related-title {
  font-size: 16px;
  font-weight: 600;
  color: #2d3748;
  margin-bottom: 4px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.related-description {
  font-size: 14px;
  color: #718096;
  margin: 0;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Prose Content (Rich Text) */
.prose-content {
  font-size: 18px;
  line-height: 1.8;
  color: #4a5568;
}

.prose-content :deep(h1) {
  font-size: 2em;
  font-weight: bold;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  color: #1a202c;
}

.prose-content :deep(h2) {
  font-size: 1.5em;
  font-weight: bold;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  color: #1a202c;
}

.prose-content :deep(h3) {
  font-size: 1.25em;
  font-weight: bold;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  color: #1a202c;
}

.prose-content :deep(p) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.prose-content :deep(ul),
.prose-content :deep(ol) {
  padding-left: 1.5em;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}

.prose-content :deep(li) {
  margin-top: 0.25em;
  margin-bottom: 0.25em;
}

.prose-content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 12px;
  margin: 1em 0;
}

.prose-content :deep(a) {
  color: var(--primary-color);
  text-decoration: underline;
}

.prose-content :deep(blockquote) {
  border-left: 3px solid #e5e7eb;
  padding-left: 1em;
  font-style: italic;
  color: #6b7280;
  margin: 0.5em 0;
}

/* Album Gallery */
.album-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 16px;
}

@media (max-width: 768px) {
  .album-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
  }
}

.album-item {
  position: relative;
  aspect-ratio: 4/3;
  border-radius: 12px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s;
}

.album-item:hover {
  transform: scale(1.05);
}

.album-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.album-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.album-item:hover .album-overlay {
  opacity: 1;
}

/* Lightbox Modal */
.lightbox-modal {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.95);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.lightbox-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s;
  z-index: 10001;
}

.lightbox-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

.lightbox-prev,
.lightbox-next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: white;
  padding: 16px;
  border-radius: 50%;
  cursor: pointer;
  transition: background 0.3s;
  z-index: 10001;
}

.lightbox-prev {
  left: 20px;
}

.lightbox-next {
  right: 20px;
}

.lightbox-prev:hover,
.lightbox-next:hover {
  background: rgba(255, 255, 255, 0.2);
}

.lightbox-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 85vh;
  object-fit: contain;
  border-radius: 8px;
}

.lightbox-counter {
  color: white;
  font-size: 16px;
  font-weight: 600;
  margin-top: 16px;
  background: rgba(0, 0, 0, 0.5);
  padding: 8px 16px;
  border-radius: 20px;
}

@media (max-width: 768px) {
  .lightbox-prev,
  .lightbox-next {
    padding: 12px;
  }

  .lightbox-prev {
    left: 10px;
  }

  .lightbox-next {
    right: 10px;
  }
}
</style>
