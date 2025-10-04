<template>
  <div
    class="app-homepage"
    :style="{
      '--primary-color': siteColors.primary,
      '--secondary-color': siteColors.secondary,
      '--navbar-text-color': navbarColors.textColor,
      '--navbar-bg-color': navbarColors.bgColor
    }"
  >
    <!-- Header/Navigation -->
    <header class="site-header" :class="{ 'scrolled': isScrolled }">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <a href="#home">{{ siteSettings.siteName || '' }}</a>
          </div>

          <nav class="main-nav" :class="{ 'mobile-open': mobileMenuOpen }">
            <a href="#services" @click="closeMobileMenu">{{ t('index.ourService') }}</a>
            <a href="#projects" @click="closeMobileMenu">{{ t('index.projects') }}</a>
            <a href="#why-us" @click="closeMobileMenu">{{ t('index.whyUs') }}</a>
            <a href="#insights" @click="closeMobileMenu">{{ t('index.insights') }}</a>
            <a href="#contact" @click="closeMobileMenu">{{ t('common.contactUs') }}</a>
          </nav>

          <button class="mobile-menu-toggle" @click="toggleMobileMenu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section
      id="home"
      class="hero-section"
      :class="`hero-mode-${homeContent.heroDisplayMode || 'gradient'}`"
      :style="((homeContent.heroDisplayMode === 'image' || homeContent.heroDisplayMode === 'cover') && homeContent.heroImage) ? { backgroundImage: `url(${homeContent.heroImage})` } : {}"
    >
      <div v-if="homeContent.heroDisplayMode !== 'cover'" class="container">
        <div class="hero-content">
          <h1 class="hero-headline" v-html="homeContent.heroTitle || ''"></h1>
          <p class="hero-tagline">{{ homeContent.heroSubtitle || '' }}</p>
        </div>
      </div>

      <div v-if="homeContent.heroDisplayMode !== 'cover'" class="scroll-indicator">
        <div class="mouse"></div>
        <span>{{ t('index.scroll') }}</span>
      </div>
    </section>

    <!-- What Makes Us Different -->
    <section class="what-makes-different">
      <div class="container">
        <div class="content-wrapper">
          <div class="text-content">
            <h2 class="section-title">{{ homeContent.aboutTitle || '' }}</h2>
            <p class="section-description">
              {{ homeContent.aboutDescription || '' }}
            </p>
            <a href="/digital-agency/about" class="btn-outline">{{ t('index.getToKnowUs') }}</a>
          </div>
          <div class="image-content">
            <img v-if="homeContent.aboutImage" :src="homeContent.aboutImage" alt="About Us" class="mission-image">
            <div v-else class="placeholder-image">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Services Section -->
    <section id="services" class="services-section">
      <div class="container">
        <h2 class="section-title-center">{{ t('index.whatWeDo') }}</h2>

        <div class="service-tags">
          <div class="service-tag">{{ t('index.branding') }}</div>
          <div class="service-tag">{{ t('index.campaign') }}</div>
          <div class="service-tag">{{ t('index.socialContent') }}</div>
          <div class="service-tag">{{ t('index.website') }}</div>
          <div class="service-tag">{{ t('index.kolMedia') }}</div>
          <div class="service-tag">{{ t('index.event') }}</div>
        </div>

        <div class="cta-center">
          <a href="#services-detail" class="btn-primary">{{ t('index.seeOurServices') }}</a>
        </div>
      </div>
    </section>

    <!-- Projects Section / Services -->
    <section id="projects" class="projects-section">
      <div class="container-fluid">
        <h2 class="section-title-center">{{ t('index.whatWeveDone') }}</h2>

        <div class="projects-grid">
          <div
            class="project-card"
            v-for="service in services"
            :key="service.id"
            :class="{ 'clickable': service.externalURL }"
            @click="handleServiceClick(service)"
          >
            <div class="project-image">
              <img v-if="service.image" :src="service.image" :alt="service.title" class="service-image">
              <div v-else class="image-placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div class="project-overlay">
                <h3 class="project-title">{{ service.title }}</h3>
                <p class="project-category">{{ service.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="cta-center">
          <a href="/digital-agency/services" class="btn-outline">{{ t('index.seeAllServices') }}</a>
        </div>
      </div>
    </section>

    <!-- Why Us Section -->
    <section id="why-us" class="why-us-section">
      <div class="container">
        <h2 class="section-title-center">{{ t('index.whyChooseUs') }}</h2>

        <div class="why-us-grid">
          <div class="why-card">
            <div class="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3>{{ t('index.fullService') }}</h3>
            <p>{{ t('index.fullServiceDesc') }}</p>
          </div>

          <div class="why-card">
            <div class="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3>{{ t('index.strategicApproach') }}</h3>
            <p>{{ t('index.strategicApproachDesc') }}</p>
          </div>

          <div class="why-card">
            <div class="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3>{{ t('index.creativeSolution') }}</h3>
            <p>{{ t('index.creativeSolutionDesc') }}</p>
          </div>

          <div class="why-card">
            <div class="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3>{{ t('index.dataReport') }}</h3>
            <p>{{ t('index.dataReportDesc') }}</p>
          </div>

          <div class="why-card">
            <div class="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3>{{ t('index.decadesExp') }}</h3>
            <p>{{ t('index.decadesExpDesc') }}</p>
          </div>

          <div class="why-card">
            <div class="icon-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3>{{ t('index.expertTeam') }}</h3>
            <p>{{ t('index.expertTeamDesc') }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Client Logos Section -->
    <section class="clients-section">
      <div class="container">
        <h2 class="section-title-center">{{ t('index.ourHappyClients') }}</h2>

        <div class="clients-grid">
          <div class="client-logo" v-for="i in 6" :key="i">
            <div class="logo-placeholder">{{ t('index.logo') }} {{ i }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Insights Section / What We Do -->
    <section id="insights" class="insights-section">
      <div class="container">
        <h2 class="section-title-center">{{ t('index.readLatestInsights') }}</h2>

        <div class="insights-grid">
          <article
            class="insight-card"
            v-for="item in whatWeDoItems"
            :key="item.id"
            :class="{ 'clickable': item.link }"
            @click="handleItemClick(item)"
          >
            <div class="insight-image">
              <img v-if="item.image" :src="item.image" :alt="item.name" class="insight-img">
              <div v-else class="image-placeholder">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
            </div>
            <div class="insight-content">
              <h3>{{ item.name }}</h3>
              <p class="insight-position">{{ item.position }}</p>
              <p class="insight-excerpt">{{ item.bio }}</p>
              <a
                v-if="item.link"
                :href="item.link"
                target="_blank"
                @click.stop
                class="read-more"
              >
                {{ t('common.learnMore') }} →
              </a>
              <a
                v-else
                href="#contact"
                class="read-more"
              >
                {{ t('common.learnMore') }} →
              </a>
            </div>
          </article>
        </div>

        <div class="cta-center">
          <a href="#contact" class="btn-outline">{{ t('common.getStarted') }}</a>
        </div>
      </div>
    </section>

    <!-- Contact Form Section -->
    <section id="contact" class="contact-section">
      <div class="container">
        <div class="contact-wrapper">
          <h2 class="section-title-center">{{ t('index.haveAnIdea') }}</h2>
          <p class="section-subtitle">{{ t('index.makeItHappen') }}</p>

          <form class="contact-form">
            <div class="form-group">
              <select class="form-control">
                <option value="">{{ t('index.lookingFor') }}</option>
                <option value="branding">{{ t('index.branding') }}</option>
                <option value="campaign">{{ t('index.campaign') }}</option>
                <option value="social">{{ t('index.socialContent') }}</option>
                <option value="website">{{ t('index.website') }}</option>
                <option value="kol">{{ t('index.kolMedia') }}</option>
                <option value="event">{{ t('index.event') }}</option>
                <option value="other">{{ t('index.other') }}</option>
              </select>
            </div>

            <div class="form-row">
              <div class="form-group">
                <input type="text" class="form-control" :placeholder="t('index.yourName')" required>
              </div>
              <div class="form-group">
                <input type="email" class="form-control" :placeholder="t('index.emailAddress')" required>
              </div>
            </div>

            <div class="form-group">
              <input type="tel" class="form-control" :placeholder="t('index.phoneNumber')">
            </div>

            <div class="form-group">
              <textarea class="form-control" rows="5" :placeholder="t('index.tellUsProject')" required></textarea>
            </div>

            <button type="submit" class="btn-primary btn-large">{{ t('index.sendRequest') }}</button>
          </form>
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

const { t } = useI18n()
const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

// CMS Store
const cmsStore = useCMSStore()
const { createLocalizedContent } = useMultiLanguage()

// Fetch all CMS data
await cmsStore.fetchHomeContent()
await cmsStore.fetchServices()
await cmsStore.fetchTeamMembers()
await cmsStore.fetchContactContent()
await cmsStore.fetchSiteSettings()

// Computed properties for CMS content
const homeContent = computed(() => {
  const content = createLocalizedContent(cmsStore.homeContent || {})
  return {
    ...content,
    heroDisplayMode: cmsStore.homeContent?.heroDisplayMode || 'gradient'
  }
})
const siteSettings = computed(() => createLocalizedContent(cmsStore.siteSettings || {}))
const contactContent = computed(() => createLocalizedContent(cmsStore.contactContent || {}))

// Services (What we've done)
const services = computed(() => {
  const allServices = cmsStore.services || []
  return allServices
    .filter(service => service.isActive)
    .slice(0, 6)
    .map(service => {
      const localized = createLocalizedContent(service)
      return {
        ...localized,
        externalURL: service.externalURL,
        video: service.video
      }
    })
})

// Team Members (What we do)
const whatWeDoItems = computed(() => {
  const teamMembers = cmsStore.teamMembers || []
  return teamMembers
    .filter(member => member.isActive && member.isDisplayInHome)
    .map(member => {
      const localized = createLocalizedContent(member)
      return {
        ...localized,
        link: member.link
      }
    })
})

// Site colors
const siteColors = computed(() => ({
  primary: cmsStore.siteSettings?.primaryColor || '#4949e9',
  secondary: cmsStore.siteSettings?.secondaryColor || '#dbf142'
}))

// Navbar colors from SiteSettings
const navbarColors = computed(() => ({
  textColor: cmsStore.siteSettings?.navbarTextColor || '#1a1a1a',
  bgColor: cmsStore.siteSettings?.navbarBgColor || 'rgba(255, 255, 255, 0.98)'
}))

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

// Handle item click - redirect if link exists
const handleItemClick = (item) => {
  if (item.link) {
    window.open(item.link, '_blank')
  }
}

const handleServiceClick = (service) => {
  if (service.externalURL) {
    window.open(service.externalURL, '_blank')
  }
}

onMounted(() => {

  // Handle scroll for header
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50
  }

  window.addEventListener('scroll', handleScroll)

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        const headerOffset = 80
        const elementPosition = target.offsetTop
        const offsetPosition = elementPosition - headerOffset

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        })
      }
    })
  })
})

useSeoMeta({
  title: 'Digital Marketing Agency',
  description: 'We are a digital agency who turn the sense of creativity into innovative marketing',
})
</script>

<style scoped>
/* Custom Font */
@font-face {
  font-family: 'PG Stockholm';
  src: url('~/assets/fonts/02-TH-Krub/TH Krub.ttf') format('truetype');
  /* src: url('assets/fonts/12-TH-KoHo/TH KoHo.ttf') format('truetype'); */
  font-weight: normal;
  font-style: normal;
  font-display: swap;
}

/* Reset & Base */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app-homepage {
  font-family: 'PG Stockholm', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif;
  color: #1a1a1a;
  line-height: 1.6;
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.container-fluid {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 20px;
}

/* Header */
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: transparent;
  transition: all 0.3s ease;
  padding: 20px 0;
}

.site-header.scrolled {
  background: var(--navbar-bg-color, rgba(255, 255, 255, 0.98));
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  padding: 15px 0;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo a {
  font-size: 32px;
  font-weight: 800;
  color: var(--navbar-text-color, #1a1a1a);
  text-decoration: none;
  letter-spacing: -0.5px;
}

.main-nav {
  display: flex;
  gap: 40px;
  align-items: center;
}

.main-nav a {
  color: var(--navbar-text-color, #1a1a1a);
  text-decoration: none;
  font-weight: 500;
  font-size: 23px;
  transition: all 0.3s ease;
  position: relative;
}

.main-nav a:hover {
  color: color-mix(in srgb, var(--navbar-text-color, #1a1a1a) 80%, black 20%);
}

.main-nav a.highlight {
  color: var(--primary-color, #4949e9);
  font-weight: 600;
}

.mobile-menu-toggle {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 5px;
}

.mobile-menu-toggle span {
  width: 25px;
  height: 2px;
  background: var(--navbar-text-color, #1a1a1a);
  transition: all 0.3s ease;
}

/* Hero Section */
.hero-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  position: relative;
  padding: 120px 20px 80px;
}

/* Gradient Mode (default) */
.hero-mode-gradient {
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.hero-mode-gradient::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(255, 255, 255, 0.85);
  z-index: 0;
}

/* Image Mode */
.hero-mode-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 0;
}

.hero-mode-image .hero-headline,
.hero-mode-image .hero-tagline {
  color: #ffffff;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

/* Minimal Mode */
.hero-mode-minimal {
  background: #ffffff;
}

.hero-mode-minimal .hero-headline {
  color: #1a1a1a;
}

.hero-mode-minimal .hero-tagline {
  color: #666666;
}

/* Cover Mode - Full image without text or overlay */
.hero-mode-cover {
  background: #000000;
}

/* No overlay for cover mode */

/* Video Mode (placeholder for future) */
.hero-mode-video {
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
}

.hero-mode-video::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 0;
}

.hero-mode-video .hero-headline,
.hero-mode-video .hero-tagline {
  color: #ffffff;
}

.hero-section .container {
  position: relative;
  z-index: 1;
}

.hero-content {
  text-align: center;
  max-width: 900px;
  margin: 0 auto;
}

.hero-headline {
  font-size: clamp(40px, 5vw, 72px);
  font-weight: 800;
  line-height: 1.2;
  margin-bottom: 24px;
  color: #1a1a1a;
}

.gradient-text {
  background: linear-gradient(135deg, var(--primary-color, #4949e9) 0%, var(--secondary-color, #dbf142) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.hero-tagline {
  font-size: clamp(24px, 2vw, 28px);
  color: #4a5568;
  margin-top: 20px;
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  color: #718096;
  font-size: 20px;
  text-transform: uppercase;
  letter-spacing: 2px;
  z-index: 1;
}

.mouse {
  width: 24px;
  height: 40px;
  border: 2px solid #718096;
  border-radius: 12px;
  position: relative;
}

.mouse::before {
  content: '';
  width: 4px;
  height: 8px;
  background: #718096;
  border-radius: 2px;
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  animation: scroll 2s infinite;
}

@keyframes scroll {
  0%, 100% { opacity: 0; top: 8px; }
  50% { opacity: 1; top: 16px; }
}

/* Sections */
section {
  padding: 100px 0;
}

.section-title {
  font-size: clamp(40px, 4vw, 56px);
  font-weight: 700;
  margin-bottom: 20px;
  color: #1a1a1a;
}

.section-title-center {
  font-size: clamp(40px, 4vw, 56px);
  font-weight: 700;
  text-align: center;
  /* margin-bottom: 60px; */
  color: #1a1a1a;
}

.section-description {
  font-size: 26px;
  color: #4a5568;
  line-height: 1.8;
  margin-bottom: 30px;
}

.section-subtitle {
  text-align: center;
  font-size: 26px;
  color: #718096;
  margin-bottom: 50px;
}

/* What Makes Different */
.what-makes-different {
  background: #fff;
}

.content-wrapper {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
}

.mission-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 20px;
}

.placeholder-image {
  width: 100%;
  aspect-ratio: 4/3;
  background: linear-gradient(135deg, var(--primary-color, #4949e9) 0%, var(--secondary-color, #dbf142) 100%);
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.placeholder-image svg {
  width: 80px;
  height: 80px;
  opacity: 0.5;
}

/* Services Section */
.services-section {
  background: #f7fafc;
}

.service-tags {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 50px;
}

.service-tag {
  padding: 16px 32px;
  background: white;
  border: 2px solid #e2e8f0;
  border-radius: 50px;
  font-weight: 600;
  font-size: 24px;
  color: #2d3748;
  cursor: pointer;
  transition: all 0.3s ease;
}

.service-tag:hover {
  border-color: var(--primary-color, #4949e9);
  color: var(--primary-color, #4949e9);
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(73, 73, 233, 0.1);
}

/* Projects Section */
.projects-section {
  background: #fff;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
}

.project-card {
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.project-card.clickable {
  cursor: pointer;
}

.project-card.clickable:hover {
  transform: translateY(-10px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
}

.project-image {
  position: relative;
  aspect-ratio: 4/3;
  overflow: hidden;
}

.service-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  background: linear-gradient(135deg, #e2e8f0 0%, #cbd5e0 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #a0aec0;
}

.image-placeholder svg {
  width: 60px;
  height: 60px;
}

.project-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.8), transparent);
  color: white;
  padding: 30px 20px 20px;
  transform: translateY(100%);
  transition: transform 0.3s ease;
}

.project-card:hover .project-overlay {
  transform: translateY(0);
}

.project-title {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 5px;
}

.project-category {
  font-size: 22px;
  opacity: 0.9;
}

/* Why Us Section */
.why-us-section {
  background: #f7fafc;
}

.why-us-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
}

.why-card {
  text-align: center;
  padding: 40px 30px;
  background: white;
  border-radius: 16px;
  transition: all 0.3s ease;
}

.why-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.icon-wrapper {
  width: 80px;
  height: 80px;
  margin: 0 auto 20px;
  background: linear-gradient(135deg, var(--primary-color, #4949e9) 0%, var(--secondary-color, #dbf142) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
}

.icon-wrapper svg {
  width: 40px;
  height: 40px;
}

.why-card h3 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
  color: #1a1a1a;
  letter-spacing: 0.5px;
}

.why-card p {
  font-size: 22px;
  color: #718096;
  line-height: 1.6;
}

/* Clients Section */
.clients-section {
  background: #fff;
}

.clients-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 30px;
  align-items: center;
}

.client-logo {
  aspect-ratio: 3/2;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #f7fafc;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.client-logo:hover {
  background: #edf2f7;
  transform: scale(1.05);
}

.logo-placeholder {
  color: #cbd5e0;
  font-size: 22px;
  font-weight: 600;
}

/* Insights Section */
.insights-section {
  background: #f7fafc;
}

.insights-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 40px;
  margin-bottom: 60px;
}

.insight-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
}

.insight-card.clickable {
  cursor: pointer;
}

.insight-card.clickable:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.15);
}

.insight-card:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.08);
}

.insight-image {
  aspect-ratio: 16/9;
  overflow: hidden;
  background: #f7fafc;
}

.insight-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.insight-card:hover .insight-img {
  transform: scale(1.05);
}

.insight-content {
  padding: 30px;
}

.insight-content h3 {
  font-size: 30px;
  font-weight: 700;
  margin-bottom: 8px;
  color: #1a1a1a;
}

.insight-position {
  font-size: 22px;
  color: var(--primary-color, #4949e9);
  font-weight: 600;
  margin-bottom: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.insight-excerpt {
  font-size: 23px;
  color: #718096;
  line-height: 1.7;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.read-more {
  color: var(--primary-color, #4949e9);
  font-weight: 600;
  text-decoration: none;
  transition: all 0.3s ease;
}

.read-more:hover {
  color: #3636d6;
}

/* Contact Section */
.contact-section {
  background: linear-gradient(135deg, var(--primary-color, #4949e9) 0%, var(--secondary-color, #dbf142) 100%);
  color: white;
}

.contact-wrapper {
  max-width: 700px;
  margin: 0 auto;
}

.contact-section .section-title-center,
.contact-section .section-subtitle {
  color: white;
}

.contact-form {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 50px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.form-group {
  margin-bottom: 25px;
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-control {
  width: 100%;
  padding: 15px 20px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  font-size: 24px;
  transition: all 0.3s ease;
}

.form-control::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.form-control:focus {
  outline: none;
  border-color: white;
  background: rgba(255, 255, 255, 0.15);
}

select.form-control {
  cursor: pointer;
}

textarea.form-control {
  resize: vertical;
  min-height: 120px;
}

/* Buttons */
.btn-primary,
.btn-outline {
  display: inline-block;
  padding: 16px 40px;
  font-weight: 600;
  font-size: 24px;
  text-decoration: none;
  border-radius: 50px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: 2px solid transparent;
}

.btn-primary {
  background: linear-gradient(135deg, var(--primary-color, #4949e9) 0%, var(--secondary-color, #dbf142) 100%);
  color: white;
  border: none;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 20px rgba(73, 73, 233, 0.3);
}

.btn-outline {
  background: transparent;
  border: 2px solid #1a1a1a;
  color: #1a1a1a;
}

.btn-outline:hover {
  background: #1a1a1a;
  color: white;
}

.contact-section .btn-primary {
  background: white;
  color: var(--primary-color, #4949e9);
}

.btn-large {
  width: 100%;
  padding: 18px 40px;
  font-size: 26px;
}

.cta-center {
  text-align: center;
  margin-top: 40px;
}

/* Footer */
/* Responsive */
@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: flex;
  }

  .main-nav {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: white;
    flex-direction: column;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transform: translateY(-150%);
    transition: transform 0.3s ease;
  }

  .main-nav.mobile-open {
    transform: translateY(0);
  }

  .content-wrapper {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .form-row {
    grid-template-columns: 1fr;
  }

  .contact-form {
    padding: 30px 20px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }
}

@media (max-width: 480px) {
  .service-tags {
    flex-direction: column;
    align-items: stretch;
  }

  .service-tag {
    text-align: center;
  }
}
</style>
