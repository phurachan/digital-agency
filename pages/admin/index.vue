<template>
  <div class="space-y-6 p-8 card" :style="{
    '--primary-color': siteColors.primary,
    '--secondary-color': siteColors.secondary
  }">
    <!-- Page Header -->
    <BasePageHeader title="Admin Dashboard" code="DASH-001" description="ยินดีต้อนรับสู่ระบบจัดการเนื้อหา"
      :breadcrumbs="breadcrumbItems" />

    <img v-if="siteLogo" :src="siteLogo" alt="Logo" class="h-[60vh] mx-auto my-12 rounded-full" />
    <!-- Hero Section -->
    <section v-else class="bg-gradient-primary-to-secondary text-white relative overflow-hidden">
      <div class="container text-center relative z-10">
        <h1 class="font-bold mb-6" style="font-size: clamp(40px, 5vw, 72px);">Dashboard</h1>
        <p class="text-blue-100 max-w-3xl mx-auto" style="font-size: clamp(24px, 2vw, 28px);">
          ยินดีต้อนรับสู่ระบบจัดการเนื้อหา
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'default',
  middleware: 'auth'
})

const cmsStore = useCMSStore()

// Site colors from settings
const siteColors = computed(() => ({
  primary: cmsStore.siteSettings?.primaryColor || '#4949e9',
  secondary: cmsStore.siteSettings?.secondaryColor || '#dbf142'
}))

const siteLogo = computed(() => cmsStore.siteSettings.logo || '')

// Breadcrumb configuration
const breadcrumbItems = [
  {
    label: 'Admin',
    to: '/admin',
    icon: 'home'
  },
  {
    label: 'Welcome',
  }
]

</script>

<style scoped>
/* Custom gradient utilities */
.bg-gradient-primary-to-secondary {
  background: linear-gradient(to bottom right, var(--primary-color), var(--secondary-color));
}

.container {
  padding: 160px 15px;
  @apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8;
}
</style>