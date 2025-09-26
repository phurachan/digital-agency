import ContactContent from '~/server/digital-agency/models/ContactContent'
import { connectMongoDB } from '~/server/digital-agency/utils/mongodb'
import { createSuccessResponse, createPredefinedError, API_RESPONSE_CODES } from '~/server/digital-agency/utils/responseHandler'
import { getDefaultContactContent } from '~/composables/utilities/defaultContent'

export default defineEventHandler(async (event) => {
  await connectMongoDB()

  try {
    // Get the first (and should be only) contact content document
    const content = await ContactContent.findOne().lean()

    // If no content exists, return default content
    if (!content) {
      const defaultContent = getDefaultContactContent()
      return createSuccessResponse(defaultContent)
    }

    // Transform the content
    const transformedContent = {
      id: content._id.toString(),
      title: JSON.parse(content.title || '{"th": "", "en": ""}'),
      subtitle: JSON.parse(content.subtitle || '{"th": "", "en": ""}'),
      phone: content.phone,
      email: content.email,
      address: JSON.parse(content.address || '{"th": "", "en": ""}'),
      businessHours: JSON.parse(content.businessHours || '{"th": "", "en": ""}'),
      bannerImage: content.bannerImage,
      heroImage: content.heroImage,
      createdAt: content.createdAt,
      updatedAt: content.updatedAt
    }

    return createSuccessResponse(transformedContent)
  } catch (error: any) {
    // Log unexpected errors
    console.error('Get contact content error:', error)

    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})