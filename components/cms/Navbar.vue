<template>
  <header
    class="site-header flex justify-center"
    :class="{ 'nav-hidden': navbarHidden }"
    :style="{
      '--navbar-text-color': navbarTextColor,
      '--navbar-bg-color': navbarBgColor
    }"
  >
    <div class="container">
      <div class="header-content">
        <div class="logo">
          <a :href="logoLink">{{ siteSettings.siteName || '' }}</a>
        </div>

        <div class="nav-wrapper">
          <nav class="main-nav" :class="{ 'mobile-open': mobileMenuOpen }">
            <slot name="nav-links">
              <a href="/digital-agency#services" @click="closeMobileMenu">{{ t('index.ourService') }}</a>
              <a href="/digital-agency#projects" @click="closeMobileMenu">{{ t('index.projects') }}</a>
              <a href="/digital-agency#why-us" @click="closeMobileMenu">{{ t('index.whyUs') }}</a>
              <a href="/digital-agency#insights" @click="closeMobileMenu">{{ t('index.insights') }}</a>
              <a href="/digital-agency#contact" @click="closeMobileMenu">{{ t('common.contactUs') }}</a>
            </slot>
          </nav>

          <!-- Language Switcher -->
          <div class="language-switcher">
            <BaseLanguageSwitcher />
          </div>
        </div>

        <button class="mobile-menu-toggle" @click="toggleMobileMenu">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>
  </header>
</template>

<script setup>
const props = defineProps({
  logoLink: {
    type: String,
    default: '/digital-agency'
  }
})

const { t } = useI18n()
const cmsStore = useCMSStore()
const { createLocalizedContent } = useMultiLanguage()

const mobileMenuOpen = ref(false)
const navbarHidden = ref(false)
let lastScrollY = 0
let ticking = false

const siteSettings = computed(() => createLocalizedContent(cmsStore.siteSettings || {}))
const navbarTextColor = computed(() => cmsStore.siteSettings?.navbarTextColor || '#1a1a1a')
const navbarBgColor = computed(() => cmsStore.siteSettings?.navbarBgColor || 'rgba(255, 255, 255, 0.98)')

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

// Handle scroll for navbar hide/show
onMounted(() => {
  const handleScroll = () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        const currentScrollY = window.scrollY

        // ต้องเลื่อนมากกว่า 50px จากตำแหน่งเดิม
        if (Math.abs(currentScrollY - lastScrollY) < 50) {
          ticking = false
          return
        }

        // เลื่อนลงและเลื่อนเกิน 150px = ซ่อน navbar
        if (currentScrollY > lastScrollY && currentScrollY > 150) {
          navbarHidden.value = true
        }
        // เลื่อนขึ้น = แสดง navbar
        else if (currentScrollY < lastScrollY) {
          navbarHidden.value = false
        }

        lastScrollY = currentScrollY
        ticking = false
      })
      ticking = true
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })
})
</script>

<style scoped>
.site-header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--navbar-bg-color, rgba(255, 255, 255, 0.98));
  padding: 20px 0;
  transition: transform 0.3s ease;
}

.site-header.nav-hidden {
  transform: translateY(-100%);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-wrapper {
  display: flex;
  align-items: center;
  gap: 20px;
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

.main-nav :deep(a) {
  color: var(--navbar-text-color, #1a1a1a);
  text-decoration: none;
  font-weight: 500;
  font-size: 23px;
  transition: all 0.3s ease;
  position: relative;
}

.main-nav :deep(a:hover) {
  color: color-mix(in srgb, var(--navbar-text-color, #1a1a1a) 80%, black 20%);
}

.main-nav :deep(a.highlight) {
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

/* Language Switcher */
.language-switcher {
  display: flex;
  align-items: center;
  position: relative;
  z-index: 10;
}

/* Light mode styling for language switcher */
.language-switcher :deep(.btn) {
  color: var(--navbar-text-color, #1a1a1a);
  background-color: transparent;
}

.language-switcher :deep(.btn:hover) {
  background-color: rgba(0, 0, 0, 0.05);
  color: var(--navbar-text-color, #1a1a1a);
}

.language-switcher :deep(.dropdown-content) {
  z-index: 9999 !important;
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
}

.language-switcher :deep(.menu li > a) {
  color: #1f2937;
}

.language-switcher :deep(.menu li > a:hover) {
  background-color: #f3f4f6;
  color: #1f2937;
}

.language-switcher :deep(.menu li > a.active) {
  background-color: #eff6ff;
  color: #1f2937;
}

@media (max-width: 768px) {
  .mobile-menu-toggle {
    display: flex;
  }

  .main-nav {
    position: fixed;
    top: 70px;
    left: 0;
    right: 0;
    background: var(--navbar-bg-color, rgba(255, 255, 255, 0.98));
    flex-direction: column;
    padding: 30px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
    transform: translateY(-150%);
    transition: transform 0.3s ease;
  }

  .main-nav.mobile-open {
    transform: translateY(0);
  }
}
</style>
