import SiteSettings from '~/server/models/SiteSettings'
import User from '~/server/models/User'
import { extractTokenFromHeader, verifyToken } from '~/server/utils/jwt'
import { connectMongoDB } from '~/server/utils/mongodb'
import { createSuccessResponse, createPredefinedError, API_RESPONSE_CODES } from '~/server/utils/responseHandler'

export default defineEventHandler(async (event) => {
  await connectMongoDB()

  try {
    // Get token from Authorization header
    const authHeader = getHeader(event, 'authorization')
    const token = extractTokenFromHeader(authHeader)

    if (!token) {
      throw createPredefinedError(API_RESPONSE_CODES.UNAUTHORIZED)
    }

    // Verify and decode token
    const decoded = verifyToken(token)

    // Find current user to check permissions
    const currentUser = await User.findById(decoded.userId)

    if (!currentUser || !currentUser.isActive) {
      throw createPredefinedError(API_RESPONSE_CODES.UNAUTHORIZED)
    }

    // Check if user has permission to manage content (admin)
    if (currentUser.role !== 'admin') {
      throw createPredefinedError(API_RESPONSE_CODES.FORBIDDEN)
    }

    const body = await readBody(event)

    const settingsData = {
      siteName: body.siteName,
      siteTagline: body.siteTagline,
      primaryColor: body.primaryColor,
      secondaryColor: body.secondaryColor,
      socialLinks: body.socialLinks,
      logo: body.logo || null,
      favicon: body.favicon || null,
      navbarDisplayMode: body.navbarDisplayMode || 'both',
      navbarTextColor: body.navbarTextColor,
      navbarBgColor: body.navbarBgColor,
      metaDescription: body.metaDescription,
      keywords: body.keywords,
      contactEmail: body.contactEmail,
      contactPhone: body.contactPhone
    }

    // Check if content exists
    const existingSettings = await SiteSettings.findOne()

    let result
    if (existingSettings) {
      // Update existing content
      result = await SiteSettings.findByIdAndUpdate(
        existingSettings._id,
        settingsData,
        { new: true, runValidators: true }
      ).lean()
    } else {
      // Create new content
      const newSettings = new SiteSettings(settingsData)
      result = await newSettings.save()
      result = result.toObject()
    }

    // Transform the result
    const transformedResult = {
      id: result._id.toString(),
      siteName: result.siteName,
      siteTagline: result.siteTagline,
      primaryColor: result.primaryColor,
      secondaryColor: result.secondaryColor,
      socialLinks: result.socialLinks,
      logo: result.logo,
      favicon: result.favicon,
      navbarDisplayMode: result.navbarDisplayMode,
      navbarTextColor: result.navbarTextColor,
      navbarBgColor: result.navbarBgColor,
      metaDescription: result.metaDescription,
      keywords: result.keywords,
      contactEmail: result.contactEmail,
      contactPhone: result.contactPhone,
      createdAt: result.createdAt,
      updatedAt: result.updatedAt
    }

    return createSuccessResponse(transformedResult)
  } catch (error: any) {
    // If it's already a createError, throw it as is
    if (error.statusCode) {
      throw error
    }

    // Handle JWT errors
    if (error.message === API_RESPONSE_CODES.INVALID_OR_EXPIRED_TOKEN) {
      throw createPredefinedError(API_RESPONSE_CODES.TOKEN_EXPIRED)
    }

    // Handle validation errors
    if (error.name === 'ValidationError') {
      const validationErrors: Record<string, string[]> = {}
      Object.keys(error.errors).forEach(field => {
        validationErrors[field] = [error.errors[field].message]
      })
      throw createPredefinedError(API_RESPONSE_CODES.VALIDATION_ERROR, { errors: validationErrors })
    }

    // Log unexpected errors
    console.error('Update site settings error:', error)

    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})