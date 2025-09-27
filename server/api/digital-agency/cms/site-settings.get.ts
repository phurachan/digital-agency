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

    // Helper function to safely parse JSON or return the value as-is
    const safeJsonParse = (field, defaultValue = '{"th": "", "en": ""}') => {
      if (!field) return JSON.parse(defaultValue)
      if (typeof field === 'object') return field

      try {
        return JSON.parse(field)
      } catch (e) {
        // If parsing fails, treat as plain string and create object structure
        return { en: field, th: field }
      }
    }

    // Transform the content
    const transformedContent = {
      id: content._id.toString(),
      siteName: safeJsonParse(content.siteName),
      siteTagline: safeJsonParse(content.siteTagline),
      primaryColor: content.primaryColor,
      secondaryColor: content.secondaryColor,
      socialLinks: content.socialLinks ? safeJsonParse(content.socialLinks, '{}') : null,
      logo: content.logo,
      favicon: content.favicon,
      metaDescription: safeJsonParse(content.metaDescription),
      keywords: safeJsonParse(content.keywords),
      contactEmail: safeJsonParse(content.contactEmail),
      contactPhone: safeJsonParse(content.contactPhone),
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