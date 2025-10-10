import { uploadToS3, generateUniqueFilename, isS3Enabled } from '~/server/utils/s3'

export default defineEventHandler(async (event) => {
  try {
    // Check if S3 is configured
    if (!isS3Enabled()) {
      throw createError({
        statusCode: 500,
        message: 'S3 is not configured. Please set AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, and AWS_S3_BUCKET environment variables.'
      })
    }

    const form = await readMultipartFormData(event)

    if (!form) {
      throw createError({
        statusCode: 400,
        message: 'No files uploaded'
      })
    }

    const category = form.find(item => item.name === 'category')?.data.toString() || 'general'
    const files = form.filter(item => item.name === 'files' && item.filename)

    if (files.length === 0) {
      throw createError({
        statusCode: 400,
        message: 'No files found'
      })
    }

    const uploadedUrls: string[] = []

    // Process each file and upload to S3
    for (const file of files) {
      if (!file.filename || !file.data) continue

      // Generate unique filename
      const uniqueFilename = generateUniqueFilename(file.filename)

      // Determine content type
      const contentType = file.type || 'application/octet-stream'

      // Upload to S3
      const result = await uploadToS3({
        fileName: uniqueFilename,
        fileData: file.data,
        contentType,
        folder: `uploads/${category}`
      })

      uploadedUrls.push(result.url)
    }

    return {
      success: true,
      urls: uploadedUrls,
      count: uploadedUrls.length,
      storage: 'S3'
    }

  } catch (error: any) {
    console.error('Upload error:', error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'Failed to upload files'
    })
  }
})
