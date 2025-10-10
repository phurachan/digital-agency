<template>
  <div class="multi-select">
    <label v-if="label" class="block text-sm font-medium text-gray-700 mb-2">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>

    <!-- Selected items as tags -->
    <div class="relative">
      <div
        class="min-h-[42px] w-full px-3 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500 bg-white cursor-text"
        @click="toggleDropdown"
      >
        <div class="flex flex-wrap gap-2">
          <!-- Selected tags -->
          <span
            v-for="code in modelValue"
            :key="code"
            class="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-700 text-sm rounded"
          >
            {{ getOptionLabel(code) }}
            <button
              type="button"
              @click.stop="removeItem(code)"
              class="hover:text-blue-900"
            >
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </span>

          <!-- Placeholder -->
          <input
            v-if="modelValue.length === 0"
            type="text"
            :placeholder="placeholder"
            class="flex-1 outline-none bg-transparent"
            readonly
          />
        </div>
      </div>

      <!-- Dropdown -->
      <div
        v-if="isOpen"
        class="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto"
      >
        <div
          v-for="option in options"
          :key="option.code"
          @click="toggleItem(option.code)"
          class="px-3 py-2 hover:bg-gray-100 cursor-pointer flex items-center gap-2"
          :class="{ 'bg-blue-50': isSelected(option.code) }"
        >
          <input
            type="checkbox"
            :checked="isSelected(option.code)"
            class="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            @click.stop
          />
          <span class="text-sm text-gray-700">{{ option[locale] }}</span>
        </div>
      </div>
    </div>

    <p v-if="help" class="text-xs text-gray-500 mt-1">{{ help }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import type { ServiceCategory } from '~/composables/constants/serviceCategories'

interface Props {
  modelValue: string[]
  options: ServiceCategory[]
  label?: string
  placeholder?: string
  help?: string
  required?: boolean
  locale?: 'en' | 'th'
}

const props = withDefaults(defineProps<Props>(), {
  placeholder: 'Select options...',
  locale: 'en'
})

const emit = defineEmits<{
  'update:modelValue': [value: string[]]
}>()

const isOpen = ref(false)

const toggleDropdown = () => {
  isOpen.value = !isOpen.value
}

const isSelected = (code: string) => {
  return props.modelValue.includes(code)
}

const toggleItem = (code: string) => {
  const newValue = isSelected(code)
    ? props.modelValue.filter(item => item !== code)
    : [...props.modelValue, code]

  emit('update:modelValue', newValue)
}

const removeItem = (code: string) => {
  const newValue = props.modelValue.filter(item => item !== code)
  emit('update:modelValue', newValue)
}

const getOptionLabel = (code: string) => {
  const option = props.options.find(opt => opt.code === code)
  return option ? option[props.locale] : code
}

// Close dropdown when clicking outside
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement
  if (!target.closest('.multi-select')) {
    isOpen.value = false
  }
}

onMounted(() => {
  document.addEventListener('click', handleClickOutside)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
})
</script>

<style scoped>
.multi-select {
  position: relative;
}

[data-theme="dark"] .multi-select input,
[data-theme="dark"] .multi-select .bg-white {
  background: rgb(55 65 81);
  border-color: rgb(75 85 99);
  color: rgb(243 244 246);
}

/* Selected tags in dark mode */
[data-theme="dark"] .multi-select .bg-blue-100 {
  background: rgba(59, 130, 246, 0.3);
  color: rgb(191 219 254);
  border: 1px solid rgba(59, 130, 246, 0.4);
}

/* Dropdown item hover in dark mode */
[data-theme="dark"] .multi-select .hover\:bg-gray-100:hover {
  background: rgba(75, 85, 99, 0.6);
}

/* Selected dropdown item background */
[data-theme="dark"] .multi-select .bg-blue-50 {
  background: rgba(30, 58, 138, 0.4);
  color: rgb(243 244 246);
}

[data-theme="dark"] .multi-select .text-gray-700 {
  color: rgb(229 231 235);
}

/* Checkbox in dark mode */
[data-theme="dark"] .multi-select input[type="checkbox"] {
  background: rgb(55 65 81);
  border-color: rgb(107 114 128);
}

[data-theme="dark"] .multi-select input[type="checkbox"]:checked {
  background: rgb(59 130 246);
  border-color: rgb(59 130 246);
}
</style>
