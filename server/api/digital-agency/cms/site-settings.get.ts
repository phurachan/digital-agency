import SiteSettings from '~/server/digital-agency/models/SiteSettings'
import { connectMongoDB } from '~/server/digital-agency/utils/mongodb'
import { createSuccessResponse, createPredefinedError, API_RESPONSE_CODES } from '~/server/digital-agency/utils/responseHandler'
import { getDefaultSiteSettings } from '~/composables/utilities/defaultContent'

export default defineEventHandler(async (event) => {
  await connectMongoDB()

  try {
    // Get the first (and should be only) site settings document
    const content = await SiteSettings.findOne().lean()

    // If no content exists, return default content
    if (!content) {
      const defaultContent = getDefaultSiteSettings()
      return createSuccessResponse(defaultContent)
    }

    // Transform the content
    const transformedContent = {
      id: content._id.toString(),
      siteName: JSON.parse(content.siteName || '{"th": "", "en": ""}'),
      siteTagline: JSON.parse(content.siteTagline || '{"th": "", "en": ""}'),
      primaryColor: content.primaryColor,
      secondaryColor: content.secondaryColor,
      socialLinks: content.socialLinks ? JSON.parse(content.socialLinks) : null,
      logo: content.logo,
      favicon: content.favicon,
      createdAt: content.createdAt,
      updatedAt: content.updatedAt
    }

    return createSuccessResponse(transformedContent)
  } catch (error: any) {
    // Log unexpected errors
    console.error('Get site settings error:', error)

    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})