export const useMultiLanguage = () => {
  const { locale } = useI18n()

  /**
   * Get localized content from multi-language field
   * @param field - The field that could be a JSON string, object, or plain string
   * @param fallback - Fallback text if no content is found
   * @returns Localized content
   */
  const getLocalizedContent = (field: any, fallback: string = ''): string => {
    try {
      // Check if field is null or undefined
      if (!field) return fallback

      // If it's already an object, extract the language value first
      if (typeof field === 'object' && field !== null) {
        return field[locale.value] || field.en || field.th || fallback
      }

      // If it's already a string that doesn't look like JSON, return it
      if (typeof field === 'string' && (!field.startsWith('{') && !field.startsWith('['))) {
        return field
      }

      // If it's a string that looks like JSON, try to parse it
      if (typeof field === 'string') {
        try {
          const parsed = JSON.parse(field)
          if (typeof parsed === 'object' && parsed !== null) {
            return parsed[locale.value] || parsed.en || parsed.th || fallback
          }
          return parsed
        } catch {
          // If JSON parsing fails, return the original string
          return field
        }
      }

      return field || fallback
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
        return JSON.parse(field)
      } else if (typeof field === 'object' && field !== null) {
        return field
      }
      return {}
    } catch (error) {
      console.warn('Error parsing JSON field:', error, 'Field:', field)
      return {}
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

    // Standard text fields
    const textFields = [
      'heroTitle', 'heroSubtitle', 'ctaText', 'ctaButtonText',
      'featureTitle', 'featureDescription', 'aboutTitle', 'aboutDescription',
      'peopleTitle', 'peopleDescription', 'missionTitle', 'missionText',
      'visionTitle', 'visionText', 'valuesTitle', 'valuesText',
      'historyTitle', 'historyText', 'title', 'subtitle', 'description',
      'name', 'position', 'bio', 'question', 'answer', 'siteName', 'siteTagline'
    ]

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
      peopleTitle: 'Meet Our People',
      peopleDescription: 'Get to know the talented individuals who drive our success',
      siteName: 'Digital Agency',
      siteTagline: 'Your Creative Digital Partner',
      title: '',
      name: 'Team Member',
      position: 'Staff',
      question: 'Question',
      answer: 'Answer'
    }

    // Process text fields
    textFields.forEach(field => {
      if (rawContent[field] !== undefined) {
        content[field] = getLocalizedContent(rawContent[field], fallbacks[field] || '')
      } else if (fallbacks[field]) {
        content[field] = fallbacks[field]
      }
    })

    // Non-multilingual fields (pass through as is)
    const nonMultilingualFields = [
      'heroImage', 'featureImage', 'aboutImage', 'missionImage',
      'image', 'icon', 'color', 'price', 'order', 'isActive',
      'primaryColor', 'secondaryColor', 'logo', 'favicon',
      'phone', 'email', 'createdAt', 'updatedAt', 'id', '_id'
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
    getLocalizedContent,
    parseJsonField,
    getLocalizedFeatures,
    createLocalizedContent
  }
}