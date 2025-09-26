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

    // Transform the content
    const transformedContent = {
      id: content._id.toString(),
      missionTitle: JSON.parse(content.missionTitle || '{"th": "", "en": ""}'),
      missionText: JSON.parse(content.missionText || '{"th": "", "en": ""}'),
      visionTitle: JSON.parse(content.visionTitle || '{"th": "", "en": ""}'),
      visionText: JSON.parse(content.visionText || '{"th": "", "en": ""}'),
      valuesTitle: JSON.parse(content.valuesTitle || '{"th": "", "en": ""}'),
      valuesText: JSON.parse(content.valuesText || '{"th": "", "en": ""}'),
      historyTitle: JSON.parse(content.historyTitle || '{"th": "", "en": ""}'),
      historyText: JSON.parse(content.historyText || '{"th": "", "en": ""}'),
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