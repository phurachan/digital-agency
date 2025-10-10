export interface ServiceCategory {
  code: string
  en: string
  th: string
}

export const SERVICE_CATEGORIES: ServiceCategory[] = [
  { code: 'event_organizer', en: 'Event Organizer', th: 'จัดงานอีเวนท์' },
  { code: 'photographer', en: 'Photographer', th: 'ช่างภาพ' },
  { code: 'marketing_staff', en: 'Marketing Staff', th: 'ทีมการตลาด' },
  { code: 'key_visual', en: 'Key Visual', th: 'ภาพลักษณ์' },
  { code: 'poster', en: 'Poster', th: 'โปสเตอร์' },
  { code: 'map_event_layout', en: 'MAP / Event Layout', th: 'แผนผังงาน' },
  { code: 'tiktok_content', en: 'Tiktok Content', th: 'คอนเทนต์ TikTok' },
  { code: 'youtube_content', en: 'Youtube Content', th: 'คอนเทนต์ YouTube' },
  { code: 'short_vdo', en: 'Short VDO', th: 'วิดีโอสั้น' },
  { code: 'short_film', en: 'Short Film', th: 'หนังสั้น' },
  { code: 'interview', en: 'Interview', th: 'สัมภาษณ์' },
  { code: 'documentary', en: 'Documentary', th: 'สารคดี' },
  { code: 'music_vdo', en: 'Music VDO', th: 'มิวสิควิดีโอ' },
  { code: 'presentation', en: 'Presentation', th: 'งานนำเสนอ' },
  { code: 'visual_content', en: 'Visual Content', th: 'คอนเทนต์ภาพ' },
  { code: 'wedding', en: 'Wedding', th: 'งานแต่งงาน' },
  { code: 'contact_us', en: 'Contact Us', th: 'ติดต่อเรา' }
]

/**
 * Get category label by code and locale
 */
export const getCategoryLabel = (code: string, locale: 'en' | 'th' = 'en'): string => {
  const category = SERVICE_CATEGORIES.find(cat => cat.code === code)
  return category ? category[locale] : code
}

/**
 * Get multiple category labels
 */
export const getCategoryLabels = (codes: string[], locale: 'en' | 'th' = 'en'): string[] => {
  return codes.map(code => getCategoryLabel(code, locale))
}
