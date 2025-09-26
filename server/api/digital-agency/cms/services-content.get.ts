import ServicesContent from '~/server/digital-agency/models/ServicesContent'
import { connectMongoDB } from '~/server/digital-agency/utils/mongodb'
import { createSuccessResponse, createPredefinedError, API_RESPONSE_CODES } from '~/server/digital-agency/utils/responseHandler'
import { getDefaultServicesContent } from '~/composables/utilities/defaultContent'

export default defineEventHandler(async (event) => {
  await connectMongoDB()

  try {
    // Get the first (and should be only) services content document
    const content = await ServicesContent.findOne().lean()

    // If no content exists, return default content
    if (!content) {
      const defaultContent = getDefaultServicesContent()
      return createSuccessResponse(defaultContent)
    }

    // Transform the content
    const transformedContent = {
      id: content._id.toString(),
      heroTitle: JSON.parse(content.heroTitle || '{"th": "", "en": ""}'),
      heroSubtitle: JSON.parse(content.heroSubtitle || '{"th": "", "en": ""}'),
      heroImage: content.heroImage,
      createdAt: content.createdAt,
      updatedAt: content.updatedAt
    }

    return createSuccessResponse(transformedContent)
  } catch (error: any) {
    // Log unexpected errors
    console.error('Get services content error:', error)

    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})