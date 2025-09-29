import AboutContent from '~/server/digital-agency/models/AboutContent'
import { connectMongoDB } from '~/server/digital-agency/utils/mongodb'
import { createSuccessResponse, createPredefinedError, API_RESPONSE_CODES } from '~/server/digital-agency/utils/responseHandler'
import { getDefaultAboutContent } from '~/composables/utilities/defaultContent'

export default defineEventHandler(async (event) => {
  await connectMongoDB()

  try {
    // Get the first (and should be only) about content document
    const content = await AboutContent.findOne().lean()

    // If no content exists, return default content
    if (!content) {
      const defaultContent = getDefaultAboutContent()
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
      missionTitle: safeJsonParse(content.missionTitle),
      missionText: safeJsonParse(content.missionText),
      visionTitle: safeJsonParse(content.visionTitle),
      visionText: safeJsonParse(content.visionText),
      valuesTitle: safeJsonParse(content.valuesTitle),
      valuesText: safeJsonParse(content.valuesText),
      historyTitle: safeJsonParse(content.historyTitle),
      historyText: safeJsonParse(content.historyText),
      missionImage: content.missionImage,
      heroImage: content.heroImage,
      createdAt: content.createdAt,
      updatedAt: content.updatedAt
    }

    return createSuccessResponse(transformedContent)
  } catch (error: any) {
    // Log unexpected errors
    console.error('Get about content error:', error)

    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})