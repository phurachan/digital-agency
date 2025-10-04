import HomeContent from '~/server/digital-agency/models/HomeContent'
import User from '~/server/digital-agency/models/User'
import { extractTokenFromHeader, verifyToken } from '~/server/digital-agency/utils/jwt'
import { connectMongoDB } from '~/server/digital-agency/utils/mongodb'
import { createSuccessResponse, createPredefinedError, API_RESPONSE_CODES } from '~/server/digital-agency/utils/responseHandler'

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

    const contentData = {
      heroTitle: body.heroTitle,
      heroSubtitle: body.heroSubtitle,
      heroDisplayMode: body.heroDisplayMode,
      heroImage: body.heroImage || null,
      featureTitle: body.featureTitle,
      featureDescription: body.featureDescription,
      featureImage: body.featureImage || null,
      ctaText: body.ctaText,
      ctaButtonText: body.ctaButtonText,
      aboutTitle: body.aboutTitle,
      aboutDescription: body.aboutDescription,
      aboutImage: body.aboutImage || null,
      peopleTitle: body.peopleTitle,
      peopleDescription: body.peopleDescription
    }

    // Check if content exists
    const existingContent = await HomeContent.findOne()

    let result
    if (existingContent) {
      // Update existing content
      result = await HomeContent.findByIdAndUpdate(
        existingContent._id,
        contentData,
        { new: true, runValidators: true }
      ).lean()
    } else {
      // Create new content
      const newContent = new HomeContent(contentData)
      result = await newContent.save()
      result = result.toObject()
    }

    // Transform the result
    const transformedResult = {
      id: result._id.toString(),
      heroTitle: result.heroTitle,
      heroSubtitle: result.heroSubtitle,
      heroDisplayMode: result.heroDisplayMode,
      ctaText: result.ctaText,
      ctaButtonText: result.ctaButtonText,
      featureTitle: result.featureTitle,
      featureDescription: result.featureDescription,
      featureImage: result.featureImage,
      aboutTitle: result.aboutTitle,
      aboutDescription: result.aboutDescription,
      heroImage: result.heroImage,
      aboutImage: result.aboutImage,
      peopleTitle: result.peopleTitle,
      peopleDescription: result.peopleDescription,
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
    console.error('Update home content error:', error)

    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})