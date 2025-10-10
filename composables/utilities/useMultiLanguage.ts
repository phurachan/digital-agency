import { useI18n } from 'vue-i18n'

export const useMultiLanguage = () => {
  const { locale } = useI18n()

  /**
   * Strip HTML tags from a string
   * @param html - HTML string
   * @returns Plain text without HTML tags
   */
  const stripHtmlTags = (html: string): string => {
    if (!html || typeof html !== 'string') return ''

    // Remove HTML tags
    let text = html.replace(/<[^>]*>/g, '')

    // Decode common HTML entities
    text = text
      .replace(/&nbsp;/g, ' ')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .replace(/&#039;/g, "'")

    // Remove extra whitespace
    text = text.replace(/\s+/g, ' ').trim()

    return text
  }

  /**
   * Get localized content from multi-language field
   * @param field - The field that could be a JSON string, object, or plain string
   * @param fallback - Fallback text if no content is found
   * @param stripHtml - Whether to strip HTML tags (default: false)
   * @returns Localized content
   */
  const getLocalizedContent = (field: any, fallback: string = '', stripHtml: boolean = false): string => {
    try {
      // Check if field is null or undefined
      if (!field) return fallback

      let result = ''

      // If it's already an object, extract the language value first
      if (typeof field === 'object' && field !== null) {
        result = field[locale.value] || field.en || field.th || fallback
      }
      // If it's already a string that doesn't look like JSON, return it
      else if (typeof field === 'string' && (!field.startsWith('{') && !field.startsWith('['))) {
        result = field
      }
      // If it's a string that looks like JSON, try to parse it
      else if (typeof field === 'string') {
        try {
          const parsed = JSON.parse(field)
          if (typeof parsed === 'object' && parsed !== null) {
            result = parsed[locale.value] || parsed.en || parsed.th || fallback
          } else {
            result = parsed
          }
        } catch {
          // If JSON parsing fails, return the original string
          result = field
        }
      } else {
        result = field || fallback
      }

      // Strip HTML tags if requested
      if (stripHtml && result) {
        result = stripHtmlTags(result)
      }

      return result
    } catch (error) {
      console.warn('Error in getLocalizedContent:', error, 'Field:', field)
      return field || fallback
    }
  }

  /**
   * Parse JSON field safely
   * @param field - The field that could be a JSON string or object
   * @returns Parsed object or empty object
   */
  const parseJsonField = (field: any): any => {
    try {
      if (typeof field === 'string') {
        // Check if string looks like JSON (starts with { or [)
        const trimmed = field.trim()
        if (trimmed.startsWith('{') || trimmed.startsWith('[')) {
          return JSON.parse(field)
        } else {
          // Return the string as-is if it's not JSON
          return field
        }
      } else if (typeof field === 'object' && field !== null) {
        return field
      }
      return field || {}
    } catch (error) {
      // If JSON parsing fails, return the original field
      return field || {}
    }
  }

  /**
   * Get localized features array from service features
   * @param features - Features field from service
   * @returns Array of localized features
   */
  const getLocalizedFeatures = (features: any): string[] => {
    try {
      if (!features) return []

      if (Array.isArray(features)) {
        // If features is already an array
        return features.map(feature => getLocalizedContent(feature, feature))
      } else if (typeof features === 'object') {
        // If features is an object with language keys
        const featuresForLang = features[locale.value] || features.en || features.th || []
        return Array.isArray(featuresForLang) ? featuresForLang : []
      } else if (typeof features === 'string') {
        // If features is a JSON string
        const parsed = JSON.parse(features)
        if (typeof parsed === 'object' && parsed[locale.value]) {
          const langFeatures = parsed[locale.value]
          return Array.isArray(langFeatures) ? langFeatures : []
        } else if (Array.isArray(parsed)) {
          return parsed
        }
      }
      return []
    } catch (error) {
      console.warn('Error processing features:', error, features)
      return []
    }
  }

  /**
   * Create localized content object for common CMS content types
   */
  const createLocalizedContent = (rawContent: any) => {
    if (!rawContent) return {}

    const content: any = {}

    // Standard text fields (without HTML)
    const textFields = [
      'heroTitle', 'heroSubtitle', 'ctaText', 'ctaButtonText',
      'featureTitle', 'featureDescription', 'aboutTitle', 'aboutDescription',
      'peopleTitle', 'peopleDescription', 'missionTitle', 'missionText',
      'visionTitle', 'visionText', 'valuesTitle', 'valuesText',
      'historyTitle', 'historyText', 'title', 'subtitle',
      'name', 'position', 'bio', 'question', 'answer', 'siteName', 'siteTagline'
    ]

    // Fields that may contain HTML and should be stripped for list views
    const htmlFields = ['description']

    // Process text fields with fallbacks
    const fallbacks: { [key: string]: string } = {
      heroTitle: 'Elevate Your Digital Presence',
      heroSubtitle: 'Transform your business with our comprehensive digital marketing solutions',
      ctaText: 'Ready to start your next project with us',
      ctaButtonText: 'Get Started',
      featureTitle: 'Lightning Fast Results',
      featureDescription: 'Accelerate your digital transformation',
      aboutTitle: 'About Us',
      aboutDescription: 'We are passionate about helping businesses thrive in the digital landscape',
      peopleTitle: 'Meet Insights',
      peopleDescription: 'Get to know the talented individuals who drive our success',
      siteName: 'Digital Agency',
      siteTagline: 'Your Creative Digital Partner',
      title: '',
      name: 'Team Member',
      position: 'Staff',
      question: 'Question',
      answer: 'Answer',
      description: ''
    }

    // Process text fields (no HTML stripping)
    textFields.forEach(field => {
      if (rawContent[field] !== undefined) {
        content[field] = getLocalizedContent(rawContent[field], fallbacks[field] || '')
      } else if (fallbacks[field]) {
        content[field] = fallbacks[field]
      }
    })

    // Process HTML fields (strip HTML tags)
    htmlFields.forEach(field => {
      if (rawContent[field] !== undefined) {
        content[field] = getLocalizedContent(rawContent[field], fallbacks[field] || '', true)
      } else if (fallbacks[field]) {
        content[field] = fallbacks[field]
      }
    })

    // Non-multilingual fields (pass through as is)
    const nonMultilingualFields = [
      'heroImage', 'featureImage', 'aboutImage', 'missionImage',
      'image', 'icon', 'color', 'price', 'order', 'isActive',
      'primaryColor', 'secondaryColor', 'logo', 'favicon',
      'phone', 'email', 'createdAt', 'updatedAt', 'id', '_id',
      'externalURL', 'video', 'link'
    ]

    nonMultilingualFields.forEach(field => {
      if (rawContent[field] !== undefined) {
        content[field] = rawContent[field]
      }
    })

    // Special handling for JSON fields
    if (rawContent.socialLinks) {
      content.socialLinks = parseJsonField(rawContent.socialLinks)
    }

    if (rawContent.features) {
      content.features = getLocalizedFeatures(rawContent.features)
    }

    if (rawContent.businessHours) {
      content.businessHours = getLocalizedContent(rawContent.businessHours)
    }

    if (rawContent.address) {
      content.address = getLocalizedContent(rawContent.address)
    }

    return content
  }

  return {
    stripHtmlTags,
    getLocalizedContent,
    parseJsonField,
    getLocalizedFeatures,
    createLocalizedContent
  }
}