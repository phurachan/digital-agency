<template>
  <div class="space-y-4">
    <div class="flex items-center justify-between">
      <label class="block text-sm font-medium text-gray-700">{{ label }}</label>
      <button
        v-if="modelValue"
        @click="removeVideo"
        type="button"
        class="text-sm text-red-600 hover:text-red-500"
      >
        Remove
      </button>
    </div>

    <!-- Upload Area -->
    <div
      v-if="!modelValue"
      @click="triggerUpload"
      @dragover.prevent
      @drop.prevent="handleDrop"
      class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 cursor-pointer transition-colors"
      :class="{ 'border-blue-400 bg-blue-50': isDragging }"
    >
      <svg class="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
        <path d="M15 12V6.75a.75.75 0 01.75-.75h14.5a.75.75 0 01.75.75V12m-16 0h16m-16 0v10.25A1.75 1.75 0 0016.75 24h12.5A1.75 1.75 0 0031 22.25V12M9 12h28m-2 4v6.25A1.75 1.75 0 0133.25 24H32m-16 0h16" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M20 18l4-4 4 4m-4-4v12" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
      </svg>
      <div class="mt-2">
        <p class="text-sm text-gray-600">
          <span class="font-medium text-blue-600">Click to upload</span> or drag and drop
        </p>
        <p class="text-xs text-gray-500">MP4, WebM, MOV up to 50MB</p>
      </div>
    </div>

    <!-- Video Preview -->
    <div v-else class="relative">
      <video
        :src="modelValue"
        controls
        class="w-full h-48 object-cover rounded-lg border"
        @error="handleVideoError"
      >
        Your browser does not support the video tag.
      </video>
      <div class="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
        <button
          @click="triggerUpload"
          class="bg-white text-gray-900 px-4 py-2 rounded-lg text-sm font-medium"
        >
          Change Video
        </button>
      </div>
    </div>

    <!-- URL Input Alternative -->
    <BaseInput
      :model-value="modelValue"
      @update:model-value="$emit('update:modelValue', $event)"
      type="text"
      placeholder="Or enter video URL"
      label="Video URL"
      :required="false"
      help="Optional: Enter video URL (YouTube, Vimeo, or direct video file URL)"
    />

    <!-- Hidden file input -->
    <input
      ref="fileInput"
      type="file"
      accept="video/*"
      @change="handleFileSelect"
      class="hidden"
    >

    <!-- Upload Progress -->
    <div v-if="uploading" class="flex items-center space-x-2">
      <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
      <span class="text-sm text-gray-600">Uploading...</span>
    </div>

    <!-- Error Message -->
    <div v-if="error" class="p-3 bg-red-50 border border-red-200 rounded-lg">
      <p class="text-red-700 text-sm">{{ error }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { API_ENDPOINTS, buildApiUrl } from '~/composables/constants/api'

interface Props {
  modelValue?: string
  label?: string
}

interface Emits {
  (e: 'update:modelValue', value: string): void
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Video'
})

const emit = defineEmits<Emits>()

const fileInput = ref<HTMLInputElement>()
const uploading = ref(false)
const error = ref('')
const isDragging = ref(false)

const triggerUpload = () => {
  fileInput.value?.click()
}

const handleFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  if (target.files && target.files[0]) {
    uploadFile(target.files[0])
  }
}

const handleDrop = (event: DragEvent) => {
  isDragging.value = false

  if (event.dataTransfer?.files && event.dataTransfer.files[0]) {
    uploadFile(event.dataTransfer.files[0])
  }
}

const uploadFile = async (file: File) => {
  error.value = ''
  uploading.value = true

  try {
    // Validate file
    if (!file.type.startsWith('video/')) {
      throw new Error('Please select a video file')
    }

    if (file.size > 50 * 1024 * 1024) { // 50MB limit
      throw new Error('File too large. Maximum size is 50MB')
    }

    // Create form data
    const formData = new FormData()
    formData.append('file', file)

    // Upload file with authentication
    const authStore = useAuthStore()
    const response = await $fetch(buildApiUrl(API_ENDPOINTS.UPLOAD.FILE), {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${authStore.token}`
      }
    })

    // Handle API response structure
    const data = response.data || response
    if (response.success || data.url) {
      // Emit the new URL
      emit('update:modelValue', data.url)
    } else {
      throw new Error('Upload failed')
    }
  } catch (err: any) {
    error.value = err.message || 'Upload failed'
  } finally {
    uploading.value = false
  }
}

const removeVideo = () => {
  emit('update:modelValue', '')
}

const handleVideoError = (event: Event) => {
  const target = event.target as HTMLVideoElement
  target.src = 'https://via.placeholder.com/400x200/f3f4f6/9ca3af?text=Invalid+Video'
}

// Drag and drop handlers
const handleDragOver = () => {
  isDragging.value = true
}

const handleDragLeave = () => {
  isDragging.value = false
}
</script>