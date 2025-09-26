import User from '~/server/digital-agency/models/User'
import { extractTokenFromHeader, verifyToken } from '~/server/digital-agency/utils/jwt'
import { connectMongoDB } from '~/server/digital-agency/utils/mongodb'
import { createSuccessResponse, createPredefinedError, API_RESPONSE_CODES } from '~/server/digital-agency/utils/responseHandler'
import { promises as fs } from 'fs'
import { join } from 'path'

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

    // Check if user has permission to upload files (admin)
    if (currentUser.role !== 'admin') {
      throw createPredefinedError(API_RESPONSE_CODES.FORBIDDEN)
    }

    const form = await readMultipartFormData(event)

    if (!form || form.length === 0) {
      throw createPredefinedError(API_RESPONSE_CODES.MISSING_REQUIRED_FIELDS, {
        message: 'No file provided'
      })
    }

    const file = form[0]

    if (!file.filename || !file.data) {
      throw createPredefinedError(API_RESPONSE_CODES.INVALID_INPUT, {
        message: 'Invalid file'
      })
    }

    // Check if file is an image
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
    if (!allowedTypes.includes(file.type || '')) {
      throw createPredefinedError(API_RESPONSE_CODES.INVALID_INPUT, {
        message: 'Only image files are allowed (JPEG, PNG, GIF, WebP)'
      })
    }

    // Check file size (max 5MB)
    const maxSize = 5 * 1024 * 1024
    if (file.data.length > maxSize) {
      throw createPredefinedError(API_RESPONSE_CODES.INVALID_INPUT, {
        message: 'File too large. Maximum size is 5MB'
      })
    }

    // Generate unique filename
    const timestamp = Date.now()
    const randomString = Math.random().toString(36).substring(2, 15)
    const extension = file.filename.split('.').pop()
    const filename = `${timestamp}_${randomString}.${extension}`

    // Ensure uploads directory exists
    const uploadsDir = join(process.cwd(), 'public', 'uploads')
    try {
      await fs.access(uploadsDir)
    } catch {
      await fs.mkdir(uploadsDir, { recursive: true })
    }

    // Save file
    const filePath = join(uploadsDir, filename)
    await fs.writeFile(filePath, file.data)

    // Return public URL
    const publicUrl = `/uploads/${filename}`

    const responseData = {
      url: publicUrl,
      filename: file.filename,
      savedFilename: filename,
      size: file.data.length,
      type: file.type,
      uploadedAt: new Date().toISOString()
    }

    return createSuccessResponse(responseData)
  } catch (error: any) {
    // If it's already a createError, throw it as is
    if (error.statusCode) {
      throw error
    }

    // Handle JWT errors
    if (error.message === API_RESPONSE_CODES.INVALID_OR_EXPIRED_TOKEN) {
      throw createPredefinedError(API_RESPONSE_CODES.TOKEN_EXPIRED)
    }

    // Handle file system errors
    if (error.code === 'ENOSPC') {
      throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR, {
        message: 'Server storage full'
      })
    }

    if (error.code === 'EACCES') {
      throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR, {
        message: 'Server permission error'
      })
    }

    // Log unexpected errors
    console.error('Upload image error:', error)

    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})