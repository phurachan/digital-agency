import FAQ from '~/server/digital-agency/models/FAQ'
import { connectMongoDB } from '~/server/digital-agency/utils/mongodb'
import { createSuccessResponse, createPredefinedError, API_RESPONSE_CODES } from '~/server/digital-agency/utils/responseHandler'

export default defineEventHandler(async (event) => {
  await connectMongoDB()

  try {
    // Get all FAQs (both active and inactive for management), sorted by order
    const faqs = await FAQ.find({}).sort({ order: 1 }).lean()

    // Transform the FAQs
    const transformedFAQs = faqs.map(faq => ({
      id: faq._id.toString(),
      question: JSON.parse(faq.question || '{"th": "", "en": ""}'),
      answer: JSON.parse(faq.answer || '{"th": "", "en": ""}'),
      isActive: faq.isActive,
      order: faq.order,
      createdAt: faq.createdAt,
      updatedAt: faq.updatedAt
    }))

    return createSuccessResponse(transformedFAQs)
  } catch (error: any) {
    // Log unexpected errors
    console.error('Get FAQs error:', error)

    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})