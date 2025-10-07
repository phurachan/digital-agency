import User from '~/server/models/User'
import { extractTokenFromHeader, verifyToken } from '~/server/utils/jwt'
import { connectMongoDB } from '~/server/utils/mongodb'
import { createSuccessResponse, createPredefinedError, API_RESPONSE_CODES } from '~/server/utils/responseHandler'
import { uploadToS3, generateUniqueFilename, isS3Enabled } from '~/server/utils/s3'
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
    const filename = generateUniqueFilename(file.filename)

    let publicUrl: string
    let storageType: 'local' | 's3'
    let s3Key: string | undefined

    // Check if S3 is enabled and configured
    if (isS3Enabled()) {
      // Upload to AWS S3
      try {
        const s3Result = await uploadToS3({
          fileName: filename,
          fileData: file.data,
          contentType: file.type || 'application/octet-stream',
          folder: 'images' // Store images in 'images' folder
        })

        publicUrl = s3Result.url
        storageType = 's3'
        s3Key = s3Result.key
      } catch (s3Error) {
        console.error('S3 upload failed, falling back to local storage:', s3Error)

        // Fallback to local storage if S3 fails
        const uploadsDir = join(process.cwd(), 'public', 'uploads')
        try {
          await fs.access(uploadsDir)
        } catch {
          await fs.mkdir(uploadsDir, { recursive: true })
        }

        const filePath = join(uploadsDir, filename)
        await fs.writeFile(filePath, file.data)
        publicUrl = `/uploads/${filename}`
        storageType = 'local'
      }
    } else {
      // Upload to local storage (default behavior)
      const uploadsDir = join(process.cwd(), 'public', 'uploads')
      try {
        await fs.access(uploadsDir)
      } catch {
        await fs.mkdir(uploadsDir, { recursive: true })
      }

      const filePath = join(uploadsDir, filename)
      await fs.writeFile(filePath, file.data)
      publicUrl = `/uploads/${filename}`
      storageType = 'local'
    }

    const responseData = {
      url: publicUrl,
      filename: file.filename,
      savedFilename: filename,
      size: file.data.length,
      type: file.type,
      storageType,
      s3Key,
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