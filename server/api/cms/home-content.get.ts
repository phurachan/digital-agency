import HomeContent from '~/server/models/HomeContent'
import { connectMongoDB } from '~/server/utils/mongodb'
import { createSuccessResponse, createPredefinedError, API_RESPONSE_CODES } from '~/server/utils/responseHandler'
import { getDefaultHomeContent } from '~/composables/utilities/defaultContent'

export default defineEventHandler(async (event) => {
  await connectMongoDB()

  try {
    // Get the first (and should be only) home content document
    const content = await HomeContent.findOne().lean()

    // If no content exists, return default content
    if (!content) {
      const defaultContent = getDefaultHomeContent()
      return createSuccessResponse(defaultContent)
    }

    // Helper function to safely parse JSON
    const safeJsonParse = (field, defaultValue = '{"th": "", "en": ""}') => {
      if (!field) return JSON.parse(defaultValue)
      if (typeof field === 'object') return field

      try {
        return JSON.parse(field)
      } catch (e) {
        // If parsing fails, treat as plain string and create object structure
        return { th: field, en: field }
      }
    }

    // Transform the content
    const transformedContent = {
      id: content._id.toString(),
      heroTitle: safeJsonParse(content.heroTitle),
      heroSubtitle: safeJsonParse(content.heroSubtitle),
      heroDisplayMode: content.heroDisplayMode,
      ctaText: safeJsonParse(content.ctaText),
      ctaButtonText: safeJsonParse(content.ctaButtonText),
      featureTitle: safeJsonParse(content.featureTitle),
      featureDescription: safeJsonParse(content.featureDescription),
      featureImage: content.featureImage,
      aboutTitle: safeJsonParse(content.aboutTitle),
      aboutDescription: safeJsonParse(content.aboutDescription),
      heroImage: content.heroImage,
      aboutImage: content.aboutImage,
      peopleTitle: safeJsonParse(content.peopleTitle),
      peopleDescription: safeJsonParse(content.peopleDescription),
      createdAt: content.createdAt,
      updatedAt: content.updatedAt
    }

    return createSuccessResponse(transformedContent)
  } catch (error: any) {
    // Log unexpected errors
    console.error('Get home content error:', error)

    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})