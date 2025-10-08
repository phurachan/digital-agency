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
        <div v-if="serviceData.image || serviceData.video" class="featured-media">
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
        </div>

        <!-- Article Body -->
        <div class="article-body">
          <!-- Description -->
          <div class="content-section">
            <p class="lead-text">{{ serviceData.description }}</p>
          </div>

          <!-- Features Section -->
          <div v-if="serviceData.features && serviceData.features.length > 0" class="content-section">
            <h2 class="section-heading">{{ t('services.features') }}</h2>
            <ul class="features-list">
              <li v-for="(feature, index) in serviceData.features" :key="index" class="feature-item">
                <span class="feature-number">{{ index + 1 }}</span>
                <span class="feature-text">{{ feature }}</span>
              </li>
            </ul>
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
  </div>
</template>

<script setup>
definePageMeta({
  layout: false
})

const route = useRoute()
const { t, locale } = useI18n()
const cmsStore = useCMSStore()
const { createLocalizedContent } = useMultiLanguage()

// Fetch services data
await cmsStore.fetchServices()
await cmsStore.fetchSiteSettings()

const siteSettings = computed(() => createLocalizedContent(cmsStore.siteSettings || {}))

// Get service by ID from route params
const serviceId = route.params.id
const service = computed(() => cmsStore.getServiceById(serviceId))

// If service not found, redirect to services page
if (!service.value) {
  navigateTo('/services')
}

// Create localized service data
const serviceData = computed(() => createLocalizedContent(service.value || {}))

// Get related services (other active services, limit to 3)
const relatedServices = computed(() => {
  const allServices = cmsStore.getActiveServices || []
  return allServices
    .filter(s => s.id !== serviceId)
    .slice(0, 3)
    .map(s => createLocalizedContent(s))
})

// Helper functions
const formatDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString(locale.value === 'th' ? 'th-TH' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

const truncateText = (text, maxLength) => {
  if (!text) return ''
  return text.length > maxLength ? text.substring(0, maxLength) + '...' : text
}

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

/* Features List */
.features-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 16px;
}

.feature-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 20px;
  background: #f7fafc;
  border-radius: 12px;
  border-left: 4px solid var(--primary-color);
  transition: all 0.3s;
}

.feature-item:hover {
  background: white;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transform: translateX(4px);
}

.feature-number {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}

.feature-text {
  font-size: 18px;
  color: #2d3748;
  line-height: 1.6;
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
</style>
