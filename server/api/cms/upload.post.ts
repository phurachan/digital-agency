import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

export default defineEventHandler(async (event) => {
  try {
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

    // Create upload directory if it doesn't exist
    const uploadDir = join(process.cwd(), 'public', 'uploads', category)
    if (!existsSync(uploadDir)) {
      await mkdir(uploadDir, { recursive: true })
    }

    const uploadedUrls: string[] = []

    // Process each file
    for (const file of files) {
      if (!file.filename || !file.data) continue

      // Generate unique filename
      const timestamp = Date.now()
      const randomStr = Math.random().toString(36).substring(2, 8)
      const ext = file.filename.split('.').pop()
      const filename = `${timestamp}-${randomStr}.${ext}`
      const filepath = join(uploadDir, filename)

      // Write file
      await writeFile(filepath, file.data)

      // Generate URL
      const url = `/uploads/${category}/${filename}`
      uploadedUrls.push(url)
    }

    return {
      success: true,
      urls: uploadedUrls,
      count: uploadedUrls.length
    }

  } catch (error: any) {
    console.error('Upload error:', error)
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to upload files'
    })
  }
})
