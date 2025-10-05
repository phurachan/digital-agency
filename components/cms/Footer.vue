<template>
  <footer class="site-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-col">
          <h4>{{ t('footer.quickLinks') }}</h4>
          <ul>
            <li><a href="/digital-agency#services">{{ t('index.ourService') }}</a></li>
            <li><a href="/digital-agency#projects">{{ t('index.projects') }}</a></li>
            <li><a href="/digital-agency#why-us">{{ t('index.whyUs') }}</a></li>
            <li><a href="/digital-agency#insights">{{ t('index.insights') }}</a></li>
            <li><a href="/digital-agency#contact">{{ t('common.contactUs') }}</a></li>
          </ul>
        </div>

        <div class="footer-col">
          <h4>{{ t('footer.contact') }}</h4>
          <address>
            <p v-html="contactContent.address || ''"></p>
            <p v-if="contactContent.phone"><a :href="`tel:${contactContent.phone}`">{{ contactContent.phone }}</a></p>
            <p v-if="contactContent.email"><a :href="`mailto:${contactContent.email}`">{{ contactContent.email }}</a></p>
            <p v-if="contactContent.businessHours">{{ contactContent.businessHours }}</p>
          </address>
        </div>

        <div class="footer-col">
          <h4>{{ t('footer.followUs') }}</h4>
          <div class="social-links" v-if="socialLinks">
            <a v-if="socialLinks.linkedin" :href="socialLinks.linkedin" target="_blank" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
            </a>
            <a v-if="socialLinks.facebook" :href="socialLinks.facebook" target="_blank" aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
              </svg>
            </a>
            <a v-if="socialLinks.twitter" :href="socialLinks.twitter" target="_blank" aria-label="Twitter">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.627 0-12 4.975-12 11.111 0 3.497 1.745 6.616 4.472 8.652v4.237l4.086-2.242c1.09.301 2.246.464 3.442.464 6.627 0 12-4.974 12-11.111 0-6.136-5.373-11.111-12-11.111zm1.193 14.963l-3.056-3.259-5.963 3.259 6.559-6.963 3.13 3.259 5.889-3.259-6.559 6.963z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2025 {{ siteSettings.siteName || '' }}. {{ t('common.allRightsReserved') }}.</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
const { t } = useI18n()
const cmsStore = useCMSStore()
const { createLocalizedContent } = useMultiLanguage()

// Computed properties for CMS content
const siteSettings = computed(() => createLocalizedContent(cmsStore.siteSettings || {}))
const contactContent = computed(() => createLocalizedContent(cmsStore.contactContent || {}))

// Social links from site settings
const socialLinks = computed(() => {
  try {
    const links = cmsStore.siteSettings?.socialLinks
    return typeof links === 'string' ? JSON.parse(links) : (links || {})
  } catch {
    return {}
  }
})
</script>

<style scoped>
.site-footer {
  background: #1a202c;
  color: #cbd5e0;
  padding: 60px 0 30px;
  display: flex;
  justify-content: center;
}

.footer-content {
  display: flex;
  justify-content: center;
  gap: 200px;
  margin-bottom: 40px;
}

.footer-col h4 {
  color: white;
  font-size: 26px;
  font-weight: 700;
  margin-bottom: 20px;
}

.footer-col ul {
  list-style: none;
}

.footer-col ul li {
  margin-bottom: 12px;
}

.footer-col a {
  color: #cbd5e0;
  text-decoration: none;
  transition: color 0.3s ease;
  font-size: 18px;
}

.footer-col a:hover {
  color: white;
}

address {
  font-style: normal;
  line-height: 1.8;
  font-size: 18px;
}

address p {
  margin-bottom: 8px;
}

.social-links {
  display: flex;
  gap: 15px;
}

.social-links a {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  transition: all 0.3s ease;
}

.social-links a:hover {
  background: var(--primary-color, #4949e9);
  transform: translateY(-3px);
}

.footer-bottom {
  text-align: center;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 22px;
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    gap: 30px;
    align-items: center;
    text-align: center;
  }
}
</style>
