import TeamContent from '~/server/models/TeamContent'
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

    const contentData = {
      heroTitle: body.heroTitle,
      heroSubtitle: body.heroSubtitle,
      heroImage: body.heroImage || null
    }

    // Check if content exists
    const existingContent = await TeamContent.findOne()

    let result
    if (existingContent) {
      // Update existing content
      result = await TeamContent.findByIdAndUpdate(
        existingContent._id,
        contentData,
        { new: true, runValidators: true }
      ).lean()
    } else {
      // Create new content
      const newContent = new TeamContent(contentData)
      result = await newContent.save()
      result = result.toObject()
    }

    // Transform the result
    const transformedResult = {
      id: result._id.toString(),
      heroTitle: result.heroTitle,
      heroSubtitle: result.heroSubtitle,
      heroImage: result.heroImage,
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
    console.error('Update team content error:', error)

    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})