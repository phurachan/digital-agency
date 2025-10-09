import Service from '~/server/models/Service'
import { connectMongoDB } from '~/server/utils/mongodb'
import { createSuccessResponse, createPredefinedError, API_RESPONSE_CODES } from '~/server/utils/responseHandler'

export default defineEventHandler(async (event) => {
  await connectMongoDB()

  try {
    // Get all services (both active and inactive for management), sorted by order
    const services = await Service.find({}).sort({ order: 1 }).lean()

    // Transform the services
    const transformedServices = services.map(service => {
      // Safely parse title
      let title
      try {
        title = typeof service.title === 'string' ? JSON.parse(service.title) : service.title
      } catch (e) {
        title = { th: service.title || '', en: service.title || '' }
      }

      // Safely parse description
      let description
      try {
        description = typeof service.description === 'string' ? JSON.parse(service.description) : service.description
      } catch (e) {
        description = { th: service.description || '', en: service.description || '' }
      }

      // Safely parse category
      let category
      try {
        category = service.category ? (typeof service.category === 'string' ? JSON.parse(service.category) : service.category) : { th: '', en: '' }
      } catch (e) {
        category = { th: service.category || '', en: service.category || '' }
      }

      // Safely parse features
      let features
      try {
        features = service.features ? (typeof service.features === 'string' ? JSON.parse(service.features) : service.features) : []
      } catch (e) {
        features = []
      }

      return {
        id: service._id.toString(),
        title: title || { th: '', en: '' },
        description: description || { th: '', en: '' },
        category: category || { th: '', en: '' },
        features: features || [],
        price: service.price,
        isActive: service.isActive,
        isDisplayInHome: service.isDisplayInHome ?? true,
        icon: service.icon,
        image: service.image,
        video: service.video,
        externalURL: service.externalURL,
        color: service.color,
        order: service.order,
        createdAt: service.createdAt,
        updatedAt: service.updatedAt
      }
    })

    return createSuccessResponse(transformedServices)
  } catch (error: any) {
    // Log unexpected errors
    console.error('Get services error:', error)

    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})