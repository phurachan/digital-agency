<template>
  <div class="top-navbar">
    <div class="container mx-auto px-4 h-full flex items-center justify-end">
      <div class="flex items-center space-x-6">
        <!-- Contact Phone -->
        <div class="flex items-center space-x-2 text-gray-300" style="font-size: 16px;">
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
          </svg>
          <a :href="`tel:${contactPhone}`" class="hover:text-white transition-colors">
            {{ contactPhone }}
          </a>
        </div>

        <!-- Language Switcher -->
        <div class="cms-language-switcher">
          <BaseLanguageSwitcher />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Get contact phone from contact content
const cmsStore = useCMSStore()
await cmsStore.fetchContactContent()
const contactContentRaw = cmsStore.contactContent

const contactPhone = computed(() => contactContentRaw?.phone || '+1 (555) 123-4567')
</script>

<style scoped>
.top-navbar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 60;
  background-color: #2e364e;
  height: 40px;
}

/* Style for language switcher in top navbar */
.cms-language-switcher {
  /* Override DaisyUI dropdown styles for top navbar */
}

.cms-language-switcher :deep(.btn) {
  background-color: transparent;
  border: none;
  color: #d1d5db;
  min-height: auto;
  height: auto;
  padding: 0.25rem 0.5rem;
}

.cms-language-switcher :deep(.btn:hover) {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}

.cms-language-switcher :deep(.dropdown-content) {
  background-color: #2e364e;
  border: 1px solid rgba(255, 255, 255, 0.1);
  z-index: 9999 !important;
}

.cms-language-switcher :deep(.menu li > a) {
  color: #d1d5db;
}

.cms-language-switcher :deep(.menu li > a:hover),
.cms-language-switcher :deep(.menu li > a.active) {
  background-color: rgba(255, 255, 255, 0.1);
  color: #ffffff;
}
</style>