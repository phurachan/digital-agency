<template>
  <div>
    <!-- Selected Images Preview -->
    <div v-if="selectedImages.length > 0" class="mb-4">
      <label class="label">
        <span class="label-text">รูปภาพที่เลือก</span>
      </label>
      <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
        <div
          v-for="(image, index) in selectedImages"
          :key="image"
          class="relative group"
        >
          <img
            :src="image"
            class="w-full aspect-square object-cover rounded-lg"
          />
          <button
            @click="removeImage(index)"
            class="btn btn-xs btn-circle btn-error absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity"
            type="button"
          >
            ✕
          </button>
        </div>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="flex gap-2">
      <button
        v-if="albumImages && albumImages.length > 0"
        @click="openAlbumModal"
        type="button"
        class="btn btn-outline btn-sm"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
        </svg>
        เลือกจากอัลบั้ม
      </button>

      <button
        @click="openUploadModal"
        type="button"
        class="btn btn-primary btn-sm"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
        </svg>
        อัปโหลดใหม่
      </button>
    </div>

    <!-- Album Images Modal -->
    <dialog ref="albumModal" class="modal">
      <div class="modal-box max-w-4xl">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <h3 class="font-bold text-lg mb-4">เลือกรูปภาพจากอัลบั้ม</h3>

        <!-- Images Grid -->
        <div class="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 max-h-96 overflow-y-auto">
          <div
            v-for="(image, idx) in albumImages"
            :key="idx"
            @click="toggleSelectImage(image)"
            class="cursor-pointer relative group"
            :class="{ 'ring-4 ring-primary': isSelected(image) }"
          >
            <img
              :src="image"
              class="w-full aspect-square object-cover rounded-lg"
            />
            <div
              v-if="isSelected(image)"
              class="absolute inset-0 bg-primary/20 rounded-lg flex items-center justify-center"
            >
              <svg class="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="modal-action">
          <form method="dialog">
            <button class="btn btn-ghost">ยกเลิก</button>
          </form>
          <button @click="confirmSelection" class="btn btn-primary" type="button">
            เลือก ({{ tempSelected.length }})
          </button>
        </div>
      </div>
    </dialog>

    <!-- Upload Modal -->
    <dialog ref="uploadModal" class="modal">
      <div class="modal-box">
        <form method="dialog">
          <button class="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
        </form>

        <h3 class="font-bold text-lg mb-4">อัปโหลดรูปภาพใหม่</h3>

        <div class="form-control mb-4">
          <label class="label">
            <span class="label-text">เลือกไฟล์</span>
          </label>
          <input
            ref="fileInput"
            type="file"
            accept="image/*"
            :multiple="multiple"
            @change="handleFileSelect"
            class="file-input file-input-bordered"
          />
          <label class="label">
            <span class="label-text-alt">{{ multiple ? `เลือกได้สูงสุด ${maxImages} รูป` : 'เลือกได้ 1 รูป' }}</span>
          </label>
        </div>

        <!-- Preview selected files -->
        <div v-if="selectedFiles.length > 0" class="mb-4">
          <label class="label">
            <span class="label-text">ไฟล์ที่เลือก</span>
          </label>
          <div class="space-y-1">
            <div v-for="(file, idx) in selectedFiles" :key="idx" class="text-sm flex items-center justify-between bg-base-200 p-2 rounded">
              <span>{{ file.name }}</span>
              <button @click="removeFile(idx)" class="btn btn-xs btn-ghost" type="button">✕</button>
            </div>
          </div>
        </div>

        <div class="modal-action">
          <form method="dialog">
            <button class="btn btn-ghost">ยกเลิก</button>
          </form>
          <button
            @click="handleUpload"
            class="btn btn-primary"
            :disabled="selectedFiles.length === 0 || uploading"
            type="button"
          >
            <span v-if="uploading" class="loading loading-spinner loading-sm"></span>
            <span v-else>อัปโหลด</span>
          </button>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
interface Props {
  modelValue: string[]
  category?: string
  albumImages?: string[]
  multiple?: boolean
  maxImages?: number
}

const props = withDefaults(defineProps<Props>(), {
  category: 'service',
  albumImages: () => [],
  multiple: true,
  maxImages: 10
})

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

// State
const selectedImages = ref<string[]>([...props.modelValue])
const tempSelected = ref<string[]>([])
const selectedFiles = ref<File[]>([])
const uploading = ref(false)

// Modal refs
const albumModal = ref<HTMLDialogElement>()
const uploadModal = ref<HTMLDialogElement>()
const fileInput = ref<HTMLInputElement>()

// Methods
function openAlbumModal() {
  tempSelected.value = [...selectedImages.value]
  albumModal.value?.showModal()
}

function openUploadModal() {
  selectedFiles.value = []
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  uploadModal.value?.showModal()
}

function isSelected(imageUrl: string): boolean {
  return tempSelected.value.includes(imageUrl)
}

function toggleSelectImage(imageUrl: string) {
  if (!props.multiple) {
    tempSelected.value = [imageUrl]
    return
  }

  const index = tempSelected.value.indexOf(imageUrl)
  if (index > -1) {
    tempSelected.value.splice(index, 1)
  } else {
    if (tempSelected.value.length < props.maxImages) {
      tempSelected.value.push(imageUrl)
    } else {
      alert(`เลือกได้สูงสุด ${props.maxImages} รูป`)
    }
  }
}

function confirmSelection() {
  selectedImages.value = [...tempSelected.value]
  emit('update:modelValue', selectedImages.value)
  albumModal.value?.close()
}

function removeImage(index: number) {
  selectedImages.value.splice(index, 1)
  emit('update:modelValue', selectedImages.value)
}

function handleFileSelect(event: Event) {
  const target = event.target as HTMLInputElement
  if (target.files) {
    const files = Array.from(target.files)
    if (!props.multiple && files.length > 1) {
      selectedFiles.value = [files[0]]
    } else if (files.length > props.maxImages) {
      alert(`เลือกได้สูงสุด ${props.maxImages} รูป`)
      selectedFiles.value = files.slice(0, props.maxImages)
    } else {
      selectedFiles.value = files
    }
  }
}

function removeFile(index: number) {
  selectedFiles.value.splice(index, 1)
}

async function handleUpload() {
  if (selectedFiles.value.length === 0) return

  uploading.value = true

  try {
    const formData = new FormData()

    // Append all files
    selectedFiles.value.forEach((file) => {
      formData.append('files', file)
    })

    formData.append('category', props.category)

    const response = await $fetch('/api/cms/upload', {
      method: 'POST',
      body: formData
    })

    if (response && Array.isArray(response.urls)) {
      // Add uploaded images to selected
      const newImages = [...selectedImages.value, ...response.urls]
      selectedImages.value = newImages
      emit('update:modelValue', newImages)

      alert(`อัปโหลด ${response.urls.length} รูปเรียบร้อยแล้ว`)
      uploadModal.value?.close()
    }

  } catch (error) {
    console.error('Upload failed:', error)
    alert('เกิดข้อผิดพลาดในการอัปโหลด')
  } finally {
    uploading.value = false
  }
}

// Watch props changes
watch(() => props.modelValue, (newValue) => {
  selectedImages.value = [...newValue]
})
</script>
