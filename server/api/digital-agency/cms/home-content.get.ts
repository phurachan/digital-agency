import HomeContent from '~/server/digital-agency/models/HomeContent'
import { connectMongoDB } from '~/server/digital-agency/utils/mongodb'
import { createSuccessResponse, createPredefinedError, API_RESPONSE_CODES } from '~/server/digital-agency/utils/responseHandler'
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

    // Transform the content
    const transformedContent = {
      id: content._id.toString(),
      heroTitle: JSON.parse(content.heroTitle || '{"th": "", "en": ""}'),
      heroSubtitle: JSON.parse(content.heroSubtitle || '{"th": "", "en": ""}'),
      ctaText: JSON.parse(content.ctaText || '{"th": "", "en": ""}'),
      ctaButtonText: JSON.parse(content.ctaButtonText || '{"th": "", "en": ""}'),
      featureTitle: JSON.parse(content.featureTitle || '{"th": "", "en": ""}'),
      featureDescription: JSON.parse(content.featureDescription || '{"th": "", "en": ""}'),
      featureImage: content.featureImage,
      aboutTitle: JSON.parse(content.aboutTitle || '{"th": "", "en": ""}'),
      aboutDescription: JSON.parse(content.aboutDescription || '{"th": "", "en": ""}'),
      heroImage: content.heroImage,
      aboutImage: content.aboutImage,
      peopleTitle: JSON.parse(content.peopleTitle || '{"th": "", "en": ""}'),
      peopleDescription: JSON.parse(content.peopleDescription || '{"th": "", "en": ""}'),
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