import AboutContent from '~/server/digital-agency/models/AboutContent'
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
      missionTitle: body.missionTitle,
      missionText: body.missionText,
      visionTitle: body.visionTitle,
      visionText: body.visionText,
      valuesTitle: body.valuesTitle,
      valuesText: body.valuesText,
      historyTitle: body.historyTitle,
      historyText: body.historyText,
      missionImage: body.missionImage || null,
      heroImage: body.heroImage || null
    }

    // Check if content exists
    const existingContent = await AboutContent.findOne()

    let result
    if (existingContent) {
      // Update existing content
      result = await AboutContent.findByIdAndUpdate(
        existingContent._id,
        contentData,
        { new: true, runValidators: true }
      ).lean()
    } else {
      // Create new content
      const newContent = new AboutContent(contentData)
      result = await newContent.save()
      result = result.toObject()
    }

    // Transform the result
    const transformedResult = {
      id: result._id.toString(),
      missionTitle: result.missionTitle,
      missionText: result.missionText,
      visionTitle: result.visionTitle,
      visionText: result.visionText,
      valuesTitle: result.valuesTitle,
      valuesText: result.valuesText,
      historyTitle: result.historyTitle,
      historyText: result.historyText,
      missionImage: result.missionImage,
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
    console.error('Update about content error:', error)

    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})