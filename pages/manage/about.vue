<template>
  <div class="min-h-screen bg-gray-50">

    <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Page Header -->
      <BasePageHeader
        :title="t('manage.about.title')"
        code="ABOUT-001"
        :description="t('manage.about.description')"
        :breadcrumbs="[
          { label: t('manage.common.dashboard'), to: '/manage', icon: 'home' },
          { label: t('manage.about.breadcrumb'), icon: 'information-circle' }
        ]"
      />

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center h-64">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>

      <!-- Language Switcher -->
      <div v-else class="card p-4 mb-8">
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-medium text-gray-900">{{ t('manage.common.contentLanguage') }}</h3>
          <div class="flex items-center bg-gray-100 rounded-lg p-1">
            <button
              @click="currentLanguage = 'en'"
              type="button"
              :class="currentLanguage === 'en' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'"
              class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {{ t('manage.common.english') }}
            </button>
            <button
              @click="currentLanguage = 'th'"
              type="button"
              :class="currentLanguage === 'th' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-600 hover:text-gray-900'"
              class="px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              {{ t('manage.common.thai') }}
            </button>
          </div>
        </div>
        <p class="text-sm text-gray-500 mt-2">
          {{ t('manage.common.switchLanguageHint') }} {{ currentLanguage === 'en' ? t('manage.common.editingEnglish') : t('manage.common.editingThai') }}
        </p>
      </div>

      <!-- Form -->
      <form v-if="!loading" @submit.prevent="handleSubmit" class="space-y-8">

        <!-- Hero Background Image -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t('manage.about.heroBackgroundImage') }}</h2>
          <CmsImageUpload
            v-model="formData.heroImage"
            :label="t('manage.about.heroSectionBackground')"
            :help-text="t('manage.about.heroImageHelp')"
          />
        </div>

        <!-- Mission Section -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t('manage.about.missionSection') }}</h2>

          <div class="space-y-6">
            <BaseInput
              v-model="formData.missionTitle[currentLanguage]"
              type="text"
              :label="`${t('manage.about.missionTitle')} (${currentLanguage.toUpperCase()})`"
              :placeholder="t('manage.about.enterMissionTitle')"
              required
            />

            <BaseTextarea
              v-model="formData.missionText[currentLanguage]"
              :label="`${t('manage.about.missionDescription')} (${currentLanguage.toUpperCase()})`"
              :placeholder="t('manage.about.enterMissionDescription')"
              :rows=4
              required
            />
          </div>
        </div>

        <!-- Vision Section -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t('manage.about.visionSection') }}</h2>

          <div class="space-y-6">
            <BaseInput
              v-model="formData.visionTitle[currentLanguage]"
              type="text"
              :label="`${t('manage.about.visionTitle')} (${currentLanguage.toUpperCase()})`"
              :placeholder="t('manage.about.enterVisionTitle')"
              required
            />

            <BaseTextarea
              v-model="formData.visionText[currentLanguage]"
              :label="`${t('manage.about.visionDescription')} (${currentLanguage.toUpperCase()})`"
              :placeholder="t('manage.about.enterVisionDescription')"
              :rows=4
              required
            />

            <!-- Vision Background Image -->
            <div>
              <label class="form-label">{{ t('manage.about.visionBoxBackground') }}</label>
              <CmsImageUpload
                v-model="formData.missionImage"
                :label="t('manage.about.visionSectionBackground')"
                :help-text="t('manage.about.visionImageHelp')"
              />
            </div>
          </div>
        </div>

        <!-- Values Section -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t('manage.about.valuesSection') }}</h2>

          <div class="space-y-6">
            <BaseInput
              v-model="formData.valuesTitle[currentLanguage]"
              type="text"
              :label="`${t('manage.about.valuesTitle')} (${currentLanguage.toUpperCase()})`"
              :placeholder="t('manage.about.enterValuesTitle')"
              required
            />

            <BaseTextarea
              v-model="formData.valuesText[currentLanguage]"
              :label="`${t('manage.about.valuesDescription')} (${currentLanguage.toUpperCase()})`"
              :placeholder="t('manage.about.enterValuesDescription')"
              :rows=4
              required
            />
          </div>
        </div>

        <!-- History Section -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t('manage.about.historySection') }}</h2>

          <div class="space-y-6">
            <BaseInput
              v-model="formData.historyTitle[currentLanguage]"
              type="text"
              :label="`${t('manage.about.historyTitle')} (${currentLanguage.toUpperCase()})`"
              :placeholder="t('manage.about.enterHistoryTitle')"
              required
            />

            <BaseTextarea
              v-model="formData.historyText[currentLanguage]"
              :label="`${t('manage.about.historyDescription')} (${currentLanguage.toUpperCase()})`"
              :placeholder="t('manage.about.enterHistoryDescription')"
              :rows=4
              required
            />
          </div>
        </div>

        <!-- Statistics Section -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t('manage.about.statistics') }}</h2>

          <div class="grid md:grid-cols-2 gap-6">
            <div class="space-y-4">
              <h3 class="font-medium text-gray-700">{{ t('manage.about.happyClients') }}</h3>
              <BaseInput
                v-model="formData.happyClientsCount[currentLanguage]"
                type="text"
                :label="`${t('manage.about.count')} (${currentLanguage.toUpperCase()})`"
                :placeholder="t('manage.about.enterCount')"
                required
              />
              <BaseInput
                v-model="formData.happyClientsLabel[currentLanguage]"
                type="text"
                :label="`${t('manage.about.label')} (${currentLanguage.toUpperCase()})`"
                :placeholder="t('manage.about.enterLabel')"
                required
              />
            </div>

            <div class="space-y-4">
              <h3 class="font-medium text-gray-700">{{ t('manage.about.experience') }}</h3>
              <BaseInput
                v-model="formData.experienceCount[currentLanguage]"
                type="text"
                :label="`${t('manage.about.count')} (${currentLanguage.toUpperCase()})`"
                :placeholder="t('manage.about.enterCount')"
                required
              />
              <BaseInput
                v-model="formData.experienceLabel[currentLanguage]"
                type="text"
                :label="`${t('manage.about.label')} (${currentLanguage.toUpperCase()})`"
                :placeholder="t('manage.about.enterLabel')"
                required
              />
            </div>
          </div>
        </div>

        <!-- Vision Items Section -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t('manage.about.visionItems') }}</h2>
          <p class="text-sm text-gray-600 mb-4">{{ t('manage.about.visionItemsDesc') }}</p>

          <div class="space-y-3">
            <div v-for="(_, index) in formData.visionItems" :key="index" class="flex gap-3">
              <BaseInput
                v-model="formData.visionItems[index][currentLanguage]"
                type="text"
                :placeholder="`${t('manage.about.visionItem')} ${index + 1} (${currentLanguage.toUpperCase()})`"
                class="flex-1"
              />
              <button
                @click="removeVisionItem(index)"
                type="button"
                class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                :disabled="formData.visionItems.length <= 1"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                </svg>
              </button>
            </div>
            <button
              @click="addVisionItem"
              type="button"
              class="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
            >
              {{ t('manage.about.addVisionItem') }}
            </button>
          </div>
        </div>

        <!-- Values Section -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t('manage.about.valuesItems') }}</h2>
          <p class="text-sm text-gray-600 mb-4">{{ t('manage.about.valuesItemsDesc') }}</p>

          <div class="space-y-6">
            <div v-for="(_, index) in formData.valuesItems" :key="index" class="border border-gray-200 rounded-lg p-4">
              <div class="flex justify-between items-center mb-4">
                <h3 class="font-medium text-gray-700">{{ t('manage.about.value') }} {{ index + 1 }} ({{ currentLanguage.toUpperCase() }})</h3>
                <button
                  @click="removeValueItem(index)"
                  type="button"
                  class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  :disabled="formData.valuesItems.length <= 1"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>

              <div class="space-y-4">
                <BaseInput
                  v-model="formData.valuesItems[index].title[currentLanguage]"
                  type="text"
                  :label="`${t('manage.about.valueTitle')} (${currentLanguage.toUpperCase()})`"
                  :placeholder="t('manage.about.enterValueTitle')"
                  required
                />

                <BaseTextarea
                  v-model="formData.valuesItems[index].description[currentLanguage]"
                  :label="`${t('manage.about.description')} (${currentLanguage.toUpperCase()})`"
                  :placeholder="t('manage.about.enterDescription')"
                  :rows=3
                  required
                />

                <div>
                  <label class="form-label">{{ t('manage.about.iconType') }}</label>
                  <select v-model="formData.valuesItems[index].icon" class="form-input">
                    <option value="excellence">{{ t('manage.about.excellenceIcon') }}</option>
                    <option value="transparency">{{ t('manage.about.transparencyIcon') }}</option>
                    <option value="innovation">{{ t('manage.about.innovationIcon') }}</option>
                    <option value="default">{{ t('manage.about.defaultIcon') }}</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              @click="addValueItem"
              type="button"
              class="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
            >
              {{ t('manage.about.addValueItem') }}
            </button>
          </div>
        </div>

        <!-- Journey Timeline Section -->
        <div class="card p-6">
          <h2 class="text-xl font-bold text-gray-900 mb-6">{{ t('manage.about.journeyTimeline') }}</h2>
          <p class="text-sm text-gray-600 mb-4">{{ t('manage.about.journeyTimelineDesc') }}</p>

          <div class="space-y-6">
            <div v-for="(_, index) in formData.journeyItems" :key="index" class="border border-gray-200 rounded-lg p-4">
              <div class="flex justify-between items-center mb-4">
                <h3 class="font-medium text-gray-700">{{ t('manage.about.timelineItem') }} {{ index + 1 }} ({{ currentLanguage.toUpperCase() }})</h3>
                <button
                  @click="removeJourneyItem(index)"
                  type="button"
                  class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg"
                  :disabled="formData.journeyItems.length <= 1"
                >
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                  </svg>
                </button>
              </div>

              <div class="grid md:grid-cols-3 gap-4">
                <BaseInput
                  v-model="formData.journeyItems[index].year"
                  type="text"
                  :label="t('manage.about.year')"
                  :placeholder="t('manage.about.enterYear')"
                  required
                />

                <div class="md:col-span-2">
                  <BaseInput
                    v-model="formData.journeyItems[index].title[currentLanguage]"
                    type="text"
                    :label="`${t('manage.about.title')} (${currentLanguage.toUpperCase()})`"
                    :placeholder="t('manage.about.enterTitle')"
                    required
                  />
                </div>
              </div>

              <div class="mt-4">
                <BaseTextarea
                  v-model="formData.journeyItems[index].description[currentLanguage]"
                  :label="`${t('manage.about.description')} (${currentLanguage.toUpperCase()})`"
                  :placeholder="t('manage.about.enterDescription')"
                  :rows=3
                  required
                />
              </div>
            </div>

            <button
              @click="addJourneyItem"
              type="button"
              class="w-full py-3 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
            >
              {{ t('manage.about.addTimelineItem') }}
            </button>
          </div>
        </div>

        <!-- Save Button -->
        <div class="flex justify-end space-x-4">
          <NuxtLink to="/manage">
            <BaseButton variant="secondary">{{ t('manage.common.cancel') }}</BaseButton>
          </NuxtLink>
          <BaseButton
            type="submit"
            variant="primary"
            :disabled="saving"
          >
            {{ saving ? t('manage.common.saving') : t('manage.common.saveChanges') }}
          </BaseButton>
        </div>
      </form>
    </div>

    <!-- Success/Error Messages -->
    <div v-if="successMessage" class="fixed top-20 right-4 p-4 bg-green-50 border border-green-200 rounded-lg shadow-xl z-50">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-green-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-green-700 font-medium">{{ successMessage }}</p>
      </div>
    </div>

    <div v-if="errorMessage" class="fixed top-20 right-4 p-4 bg-red-50 border border-red-200 rounded-lg shadow-xl z-50">
      <div class="flex items-center">
        <svg class="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <p class="text-red-700 font-medium">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { t } = useI18n()

definePageMeta({
  middleware: 'auth',
  layout: 'default'
})

const cmsStore = useCMSStore()
await cmsStore.fetchSiteSettings()
const siteSettings = cmsStore.siteSettings

// Language state
const currentLanguage = ref('en')

// Multi-language form data structure
const formData = reactive({
  // Text fields as JSON {en: "English", th: "Thai"}
  missionTitle: { en: '', th: '' },
  missionText: { en: '', th: '' },
  visionTitle: { en: '', th: '' },
  visionText: { en: '', th: '' },
  valuesTitle: { en: '', th: '' },
  valuesText: { en: '', th: '' },
  historyTitle: { en: '', th: '' },
  historyText: { en: '', th: '' },
  // Images (language-neutral)
  missionImage: '',
  heroImage: '',
  // Statistics as JSON
  happyClientsCount: { en: '500+', th: '500+' },
  happyClientsLabel: { en: 'Happy Clients', th: 'ลูกค้าที่พอใจ' },
  experienceCount: { en: '10+', th: '10+' },
  experienceLabel: { en: 'Years Experience', th: 'ปีประสบการณ์' },
  // Dynamic arrays with multi-language support
  visionItems: [
    { en: 'Proven Track Record', th: 'ประวัติที่พิสูจน์แล้ว' },
    { en: 'Dedicated Management', th: 'การจัดการที่ทุ่มเท' },
    { en: 'Transparent Reporting', th: 'รายงานที่โปร่งใส' },
    { en: '24/7 Support Available', th: 'บริการสนับสนุน 24/7' }
  ],
  valuesItems: [
    { 
      title: { en: 'Excellence', th: 'ความเป็นเลิศ' }, 
      description: { en: 'We strive for excellence in every project, delivering results that exceed expectations.', th: 'เรามุ่งมั่นสู่ความเป็นเลิศในทุกโครงการ ส่งมอบผลลัพธ์ที่เกินความคาดหวัง' }, 
      icon: 'excellence' 
    },
    { 
      title: { en: 'Transparency', th: 'ความโปร่งใส' }, 
      description: { en: 'Open communication and honest reporting build trust in all our client relationships.', th: 'การสื่อสารอย่างเปิดเผยและรายงานที่ซื่อสัตย์สร้างความไว้วางใจในความสัมพันธ์กับลูกค้า' }, 
      icon: 'transparency' 
    },
    { 
      title: { en: 'Innovation', th: 'นวัตกรรม' }, 
      description: { en: 'We stay ahead of trends and continuously innovate to give clients a competitive edge.', th: 'เราก้าวนำเทรนด์และสร้างนวัตกรรมอย่างต่อเนื่องเพื่อให้ลูกค้ามีความได้เปรียบทางการแข่งขัน' }, 
      icon: 'innovation' 
    }
  ],
  journeyItems: [
    { year: '2015', title: { en: 'The Beginning', th: 'จุดเริ่มต้น' }, description: { en: 'Founded with a mission to help businesses succeed through digital marketing.', th: 'ก่อตั้งด้วยพันธกิจช่วยธุรกิจประสบความสำเร็จผ่านการตลาดดิจิทัล' } },
    { year: '2018', title: { en: 'Rapid Growth', th: 'การเติบโตอย่างรวดเร็ว' }, description: { en: 'Expanded to 25 specialists and served over 200 clients across industries.', th: 'ขยายเป็น 25 ผู้เชี่ยวชาญและให้บริการลูกค้ากว่า 200 รายในหลากหลายอุตสาหกรรม' } },
    { year: '2021', title: { en: 'Innovation Leader', th: 'ผู้นำด้านนวัตกรรม' }, description: { en: 'Launched proprietary analytics platform and AI-driven tools.', th: 'เปิดตัวแพลตฟอร์มวิเคราะห์ข้อมูลและเครื่องมือที่ขับเคลื่อนด้วย AI' } },
    { year: '2025', title: { en: 'Industry Recognition', th: 'การยอมรับในอุตสาหกรรม' }, description: { en: 'Recognized as top agency with 500+ successful partnerships.', th: 'ได้รับการยอมรับเป็นเอเจนซี่ชั้นนำด้วยความสำเร็จกว่า 500 พาร์ทเนอร์ชิพ' } }
  ]
})


// Component state
const loading = ref(true)
const saving = ref(false)
const successMessage = ref('')
const errorMessage = ref('')

// Load existing content
onMounted(async () => {
  await loadContent()
})

// Helper function to parse JSON with fallback
const parseJsonField = (jsonString, fallback) => {
  try {
    const parsed = JSON.parse(jsonString || '{}')
    return typeof parsed === 'object' && parsed !== null ? parsed : fallback
  } catch {
    return fallback
  }
}

const loadContent = async () => {
  try {
    await cmsStore.fetchAboutContent()
    const response = cmsStore.aboutContent
    // console.log('Loaded about content:', response)

    if (response) {
      // The API already transforms JSON strings to objects, so use them directly
      formData.missionTitle = response.missionTitle || { en: '', th: '' }
      formData.missionText = response.missionText || { en: '', th: '' }
      formData.visionTitle = response.visionTitle || { en: '', th: '' }
      formData.visionText = response.visionText || { en: '', th: '' }
      formData.valuesTitle = response.valuesTitle || { en: '', th: '' }
      formData.valuesText = response.valuesText || { en: '', th: '' }
      formData.historyTitle = response.historyTitle || { en: '', th: '' }
      formData.historyText = response.historyText || { en: '', th: '' }

      // Images (language-neutral)
      formData.missionImage = response.missionImage || ''
      formData.heroImage = response.heroImage || ''

      // Statistics
      formData.happyClientsCount = response.happyClientsCount || { en: '500+', th: '500+' }
      formData.happyClientsLabel = response.happyClientsLabel || { en: 'Happy Clients', th: 'ลูกค้าที่พอใจ' }
      formData.experienceCount = response.experienceCount || { en: '10+', th: '10+' }
      formData.experienceLabel = response.experienceLabel || { en: 'Years Experience', th: 'ปีประสบการณ์' }
      
      // Handle dynamic arrays (may already be parsed by API)
      const visionItems = Array.isArray(response.visionItems) ? response.visionItems : JSON.parse(response.visionItems || '[]')
      formData.visionItems = visionItems.length > 0 ? visionItems : [
        { en: 'Proven Track Record', th: 'ประวัติที่พิสูจน์แล้ว' },
        { en: 'Dedicated Management', th: 'การจัดการที่ทุ่มเท' },
        { en: 'Transparent Reporting', th: 'รายงานที่โปร่งใส' },
        { en: '24/7 Support Available', th: 'บริการสนับสนุน 24/7' }
      ]

      const valuesItems = Array.isArray(response.valuesItems) ? response.valuesItems : JSON.parse(response.valuesItems || '[]')
      formData.valuesItems = valuesItems.length > 0 ? valuesItems : [
        { 
          title: { en: 'Excellence', th: 'ความเป็นเลิศ' }, 
          description: { en: 'We strive for excellence in every project, delivering results that exceed expectations.', th: 'เรามุ่งมั่นสู่ความเป็นเลิศในทุกโครงการ ส่งมอบผลลัพธ์ที่เกินความคาดหวัง' }, 
          icon: 'excellence' 
        },
        { 
          title: { en: 'Transparency', th: 'ความโปร่งใส' }, 
          description: { en: 'Open communication and honest reporting build trust in all our client relationships.', th: 'การสื่อสารอย่างเปิดเผยและรายงานที่ซื่อสัตย์สร้างความไว้วางใจในความสัมพันธ์กับลูกค้า' }, 
          icon: 'transparency' 
        },
        { 
          title: { en: 'Innovation', th: 'นวัตกรรม' }, 
          description: { en: 'We stay ahead of trends and continuously innovate to give clients a competitive edge.', th: 'เราก้าวนำเทรนด์และสร้างนวัตกรรมอย่างต่อเนื่องเพื่อให้ลูกค้ามีความได้เปรียบทางการแข่งขัน' }, 
          icon: 'innovation' 
        }
      ]
      
      const journeyItems = JSON.parse(response.journeyItems || '[]')
      formData.journeyItems = journeyItems.length > 0 ? journeyItems : [
        { year: '2015', title: { en: 'The Beginning', th: 'จุดเริ่มต้น' }, description: { en: 'Founded with a mission to help businesses succeed through digital marketing.', th: 'ก่อตั้งด้วยพันธกิจช่วยธุรกิจประสบความสำเร็จผ่านการตลาดดิจิทัล' } },
        { year: '2018', title: { en: 'Rapid Growth', th: 'การเติบโตอย่างรวดเร็ว' }, description: { en: 'Expanded to 25 specialists and served over 200 clients across industries.', th: 'ขยายเป็น 25 ผู้เชี่ยวชาญและให้บริการลูกค้ากว่า 200 รายในหลากหลายอุตสาหกรรม' } },
        { year: '2021', title: { en: 'Innovation Leader', th: 'ผู้นำด้านนวัตกรรม' }, description: { en: 'Launched proprietary analytics platform and AI-driven tools.', th: 'เปิดตัวแพลตฟอร์มวิเคราะห์ข้อมูลและเครื่องมือที่ขับเคลื่อนด้วย AI' } },
        { year: '2025', title: { en: 'Industry Recognition', th: 'การยอมรับในอุตสาหกรรม' }, description: { en: 'Recognized as top agency with 500+ successful partnerships.', th: 'ได้รับการยอมรับเป็นเอเจนซี่ชั้นนำด้วยความสำเร็จกว่า 500 พาร์ทเนอร์ชิพ' } }
      ]
    }
  } catch (error) {
    errorMessage.value = t('manage.about.failedToLoad')
    console.error('Failed to load content:', error)
  } finally {
    loading.value = false
  }
}

const handleSubmit = async () => {
  saving.value = true
  successMessage.value = ''
  errorMessage.value = ''

  try {
    // Prepare form data with JSON stringified multi-language fields
    const submitData = {
      // Text fields as JSON strings
      missionTitle: JSON.stringify(formData.missionTitle),
      missionText: JSON.stringify(formData.missionText),
      visionTitle: JSON.stringify(formData.visionTitle),
      visionText: JSON.stringify(formData.visionText),
      valuesTitle: JSON.stringify(formData.valuesTitle),
      valuesText: JSON.stringify(formData.valuesText),
      historyTitle: JSON.stringify(formData.historyTitle),
      historyText: JSON.stringify(formData.historyText),
      // Images (language-neutral)
      missionImage: formData.missionImage,
      heroImage: formData.heroImage,
      // Statistics as JSON strings
      happyClientsCount: JSON.stringify(formData.happyClientsCount),
      happyClientsLabel: JSON.stringify(formData.happyClientsLabel),
      experienceCount: JSON.stringify(formData.experienceCount),
      experienceLabel: JSON.stringify(formData.experienceLabel),
      // Dynamic arrays as JSON strings
      visionItems: JSON.stringify(formData.visionItems),
      valuesItems: JSON.stringify(formData.valuesItems),
      journeyItems: JSON.stringify(formData.journeyItems)
    }

    await cmsStore.updateAboutContent({ body: submitData })

    successMessage.value = t('manage.about.updateSuccess')
  } catch (error) {
    errorMessage.value = t('manage.about.updateError')
    console.error('Failed to update content:', error)
  } finally {
    saving.value = false
  }
}


// Array management methods
const addVisionItem = () => {
  formData.visionItems.push({ en: '', th: '' })
}

const removeVisionItem = (index) => {
  if (formData.visionItems.length > 1) {
    formData.visionItems.splice(index, 1)
  }
}

const addValueItem = () => {
  formData.valuesItems.push({
    title: { en: '', th: '' },
    description: { en: '', th: '' },
    icon: 'default'
  })
}

const removeValueItem = (index) => {
  if (formData.valuesItems.length > 1) {
    formData.valuesItems.splice(index, 1)
  }
}

const addJourneyItem = () => {
  formData.journeyItems.push({
    year: '',
    title: { en: '', th: '' },
    description: { en: '', th: '' }
  })
}

const removeJourneyItem = (index) => {
  if (formData.journeyItems.length > 1) {
    formData.journeyItems.splice(index, 1)
  }
}

// Clear messages after 5 seconds
watch([successMessage, errorMessage], () => {
  if (successMessage.value || errorMessage.value) {
    setTimeout(() => {
      successMessage.value = ''
      errorMessage.value = ''
    }, 5000)
  }
})

// SEO
useSeoMeta({
  title: `Edit About Page | ${siteSettings.siteName} CMS`,
  robots: 'noindex, nofollow'
})
</script>

<style scoped>
:root {
  --primary-color: v-bind('siteSettings.primaryColor || "#6495ed"');
  --secondary-color: v-bind('siteSettings.secondaryColor || "#9333ea"');
}

.card {
  background: white;
  border: 1px solid rgb(229 231 235);
  border-radius: 0.75rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

[data-theme="dark"] .card {
  background: rgb(31 41 55);
  border-color: rgb(55 65 81);
}

[data-theme="dark"] .text-gray-900 {
  color: rgb(243 244 246);
}

[data-theme="dark"] .text-gray-700 {
  color: rgb(229 231 235);
}

[data-theme="dark"] .text-gray-500 {
  color: rgb(156 163 175);
}

[data-theme="dark"] .text-gray-600 {
  color: rgb(209 213 219);
}

[data-theme="dark"] .bg-gray-50 {
  background: rgb(17 24 39);
}

[data-theme="dark"] .form-input {
  background: rgb(55 65 81);
  border-color: rgb(75 85 99);
  color: rgb(243 244 246);
}

[data-theme="dark"] .form-input::placeholder {
  color: rgb(156 163 175);
}

[data-theme="dark"] .form-input:focus {
  border-color: rgb(59 130 246);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
}

[data-theme="dark"] .floating-label {
  color: rgb(156 163 175);
}

[data-theme="dark"] .form-input:focus ~ .floating-label,
[data-theme="dark"] .form-input:not(:placeholder-shown) ~ .floating-label {
  color: rgb(96 165 250);
}

[data-theme="dark"] .bg-gray-100 {
  background: rgb(55 65 81);
}

[data-theme="dark"] .btn-success {
  background: rgb(22 163 74);
}

[data-theme="dark"] .btn-success:hover {
  background: rgb(21 128 61);
}

[data-theme="dark"] .btn-danger {
  background: rgb(220 38 38);
}

[data-theme="dark"] .btn-danger:hover {
  background: rgb(185 28 28);
}
</style>
