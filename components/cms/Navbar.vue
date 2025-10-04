<template>
  <header
    class="site-header"
    :class="{ 'scrolled': isScrolled }"
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

        <nav class="main-nav" :class="{ 'mobile-open': mobileMenuOpen }">
          <slot name="nav-links">
            <a href="/digital-agency#services" @click="closeMobileMenu">{{ t('index.ourService') }}</a>
            <a href="/digital-agency#projects" @click="closeMobileMenu">{{ t('index.projects') }}</a>
            <a href="/digital-agency#why-us" @click="closeMobileMenu">{{ t('index.whyUs') }}</a>
            <a href="/digital-agency#insights" @click="closeMobileMenu">{{ t('index.insights') }}</a>
            <a href="/digital-agency#contact" @click="closeMobileMenu">{{ t('common.contactUs') }}</a>
          </slot>
        </nav>

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

const isScrolled = ref(false)
const mobileMenuOpen = ref(false)

const siteSettings = computed(() => createLocalizedContent(cmsStore.siteSettings || {}))
const navbarTextColor = computed(() => cmsStore.siteSettings?.navbarTextColor || '#1a1a1a')
const navbarBgColor = computed(() => cmsStore.siteSettings?.navbarBgColor || 'rgba(255, 255, 255, 0.98)')

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value
}

const closeMobileMenu = () => {
  mobileMenuOpen.value = false
}

// Scroll event listener
onMounted(() => {
  const handleScroll = () => {
    isScrolled.value = window.scrollY > 50
  }
  window.addEventListener('scroll', handleScroll)

  onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
  })
})
</script>

<style scoped>
.site-header {
  position: fixed;
  top: 40px;
  left: 0;
  right: 0;
  z-index: 1000;
  background: var(--navbar-bg-color, rgba(255, 255, 255, 0.98));
  box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  padding: 15px 0;
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
}
</style>
