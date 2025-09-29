import Service from '~/server/digital-agency/models/Service'
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

    const id = getRouterParam(event, 'id')
    const body = await readBody(event)

    // Prepare update data (remove fields that shouldn't be updated)
    const { id: bodyId, createdAt, updatedAt, ...rawUpdateData } = body

    // Convert features array to JSON string if needed
    const updateData = {
      ...rawUpdateData,
      features: Array.isArray(rawUpdateData.features)
        ? JSON.stringify(rawUpdateData.features)
        : rawUpdateData.features
    }

    // Update service by ID
    const result = await Service.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).lean()

    if (!result) {
      throw createPredefinedError(API_RESPONSE_CODES.NOT_FOUND)
    }

    // Transform the result
    const transformedResult = {
      id: result._id.toString(),
      title: result.title,
      description: result.description,
      features: result.features,
      price: result.price,
      isActive: result.isActive,
      isDisplayInHome: result.isDisplayInHome ?? true,
      icon: result.icon,
      image: result.image,
      video: result.video,
      externalURL: result.externalURL,
      color: result.color,
      order: result.order,
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

    // Handle cast errors (invalid ObjectId)
    if (error.name === 'CastError') {
      throw createPredefinedError(API_RESPONSE_CODES.NOT_FOUND)
    }

    // Log unexpected errors
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})