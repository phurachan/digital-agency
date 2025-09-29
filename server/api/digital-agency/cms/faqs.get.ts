import FAQ from '~/server/digital-agency/models/FAQ'
import { connectMongoDB } from '~/server/digital-agency/utils/mongodb'
import { createSuccessResponse, createPredefinedError, API_RESPONSE_CODES } from '~/server/digital-agency/utils/responseHandler'

export default defineEventHandler(async (event) => {
  await connectMongoDB()

  try {
    // Get all FAQs (both active and inactive for management), sorted by order
    const faqs = await FAQ.find({}).sort({ order: 1 }).lean()

    // Transform the FAQs
    const transformedFAQs = faqs.map(faq => {
      // Safely parse question - handle both JSON strings and plain strings
      let question
      try {
        question = typeof faq.question === 'string' ? JSON.parse(faq.question) : faq.question
      } catch (e) {
        // If parsing fails, treat as plain text and create proper structure
        question = { th: faq.question || '', en: faq.question || '' }
      }

      // Safely parse answer - handle both JSON strings and plain strings
      let answer
      try {
        answer = typeof faq.answer === 'string' ? JSON.parse(faq.answer) : faq.answer
      } catch (e) {
        // If parsing fails, treat as plain text and create proper structure
        answer = { th: faq.answer || '', en: faq.answer || '' }
      }

      return {
        id: faq._id.toString(),
        question: question || { th: '', en: '' },
        answer: answer || { th: '', en: '' },
        isActive: faq.isActive,
        order: faq.order,
        createdAt: faq.createdAt,
        updatedAt: faq.updatedAt
      }
    })

    return createSuccessResponse(transformedFAQs)
  } catch (error: any) {
    // Log unexpected errors
    console.error('Get FAQs error:', error)

    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})