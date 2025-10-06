<template>
  <div class="article-page">
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

    <div class="article-container">
      <!-- Breadcrumb -->
      <nav class="breadcrumb">
        <NuxtLink :to="$localePath('/digital-agency')">{{ t('nav.home') }}</NuxtLink>
        <span class="separator">›</span>
        <NuxtLink :to="$localePath('/digital-agency/team')">{{ t('nav.team') }}</NuxtLink>
        <span class="separator">›</span>
        <span class="current">{{ memberData.name }}</span>
      </nav>

      <!-- Article Header -->
      <article class="article-content">
        <header class="article-header">
          <h1 class="article-title">{{ memberData.name }}</h1>

          <!-- Metadata -->
          <div class="article-meta">
            <div class="meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{{ memberData.position }}</span>
            </div>
            <div v-if="memberData.createdAt" class="meta-item">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="icon">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <span>{{ formatDate(memberData.createdAt) }}</span>
            </div>
            <a
              v-if="memberData.link"
              :href="memberData.link"
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

        <!-- Featured Image -->
        <div v-if="memberData.image" class="featured-media">
          <img :src="memberData.image" :alt="memberData.name" class="featured-image">
        </div>

        <!-- Article Body -->
        <div class="article-body">
          <!-- Bio -->
          <div v-if="memberData.bio" class="content-section">
            <p class="lead-text">{{ memberData.bio }}</p>
          </div>

          <!-- Social Links -->
          <div v-if="parsedSocialLinks && parsedSocialLinks.length > 0" class="content-section">
            <h2 class="section-heading">{{ t('team.connectWith', { name: memberData.name.split(' ')[0] }) }}</h2>
            <div class="social-links-grid">
              <a
                v-for="(social, index) in parsedSocialLinks"
                :key="index"
                :href="social.url"
                target="_blank"
                rel="noopener noreferrer"
                class="social-link-item"
                :title="social.platform"
              >
                <div class="social-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-6 h-6">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/>
                  </svg>
                </div>
                <span class="social-name">{{ social.platform }}</span>
              </a>
            </div>
          </div>

          <!-- Contact CTA -->
          <div class="content-section">
            <div class="contact-card">
              <h3 class="contact-title">{{ t('team.interestedWorking') }}</h3>
              <p class="contact-description">{{ t('common.contactUs') }}</p>
              <div class="contact-actions">
                <NuxtLink :to="$localePath('/digital-agency/contact')" class="btn-primary">
                  {{ t('common.contactUs') }}
                </NuxtLink>
                <NuxtLink :to="$localePath('/digital-agency/team')" class="btn-secondary">
                  {{ t('team.viewAllMembers') }}
                </NuxtLink>
              </div>
            </div>
          </div>
        </div>
      </article>

      <!-- Related Team Members Sidebar -->
      <aside class="sidebar">
        <div class="sidebar-card">
          <h3 class="sidebar-title">{{ t('team.viewAllMembers') }}</h3>
          <div class="related-list">
            <NuxtLink
              v-for="relatedMember in relatedMembers"
              :key="relatedMember.id"
              :to="$localePath(`/digital-agency/team/${relatedMember.id}`)"
              class="related-item"
            >
              <div v-if="relatedMember.image" class="related-image">
                <img :src="relatedMember.image" :alt="relatedMember.name">
              </div>
              <div class="related-content">
                <h4 class="related-title">{{ relatedMember.name }}</h4>
                <p class="related-description">{{ relatedMember.position }}</p>
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

// Fetch team members data
await cmsStore.fetchTeamMembers()
await cmsStore.fetchSiteSettings()

const siteSettings = computed(() => createLocalizedContent(cmsStore.siteSettings || {}))

// Get team member by ID from route params
const memberId = route.params.id
const member = computed(() => cmsStore.getTeamMemberById(memberId))

// If member not found, redirect to team page
if (!member.value) {
  navigateTo('/digital-agency/team')
}

// Create localized member data
const memberData = computed(() => createLocalizedContent(member.value || {}))

// Get related team members (other active members, limit to 3)
const relatedMembers = computed(() => {
  const allMembers = cmsStore.getActiveTeamMembers || []
  return allMembers
    .filter(m => m.id !== memberId)
    .slice(0, 3)
    .map(m => createLocalizedContent(m))
})

// Parse social links
const parsedSocialLinks = computed(() => {
  if (!member.value?.socialLinks) return []
  try {
    const links = typeof member.value.socialLinks === 'string'
      ? JSON.parse(member.value.socialLinks)
      : member.value.socialLinks
    return Array.isArray(links) ? links : []
  } catch (e) {
    return []
  }
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
  title: `${memberData.value.name} - ${memberData.value.position} | ${siteSettings.value.siteName}`,
  description: memberData.value.bio || `${memberData.value.name} - ${memberData.value.position} at ${siteSettings.value.siteName}`,
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
  background: #f7fafc;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 400px;
}

.featured-image {
  width: 100%;
  height: auto;
  display: block;
  max-height: 600px;
  object-fit: contain;
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
  white-space: pre-line;
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

/* Social Links Grid */
.social-links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  gap: 16px;
}

.social-link-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
  padding: 20px;
  background: #f7fafc;
  border-radius: 12px;
  text-decoration: none;
  color: #2d3748;
  transition: all 0.3s;
  border: 2px solid transparent;
}

.social-link-item:hover {
  background: white;
  border-color: var(--primary-color);
  transform: translateY(-4px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.social-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary-color), var(--secondary-color));
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.social-name {
  font-size: 14px;
  font-weight: 600;
  text-align: center;
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
