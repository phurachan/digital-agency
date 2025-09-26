import Service from '~/server/digital-agency/models/Service'
import { connectMongoDB } from '~/server/digital-agency/utils/mongodb'
import { createSuccessResponse, createPredefinedError, API_RESPONSE_CODES } from '~/server/digital-agency/utils/responseHandler'

export default defineEventHandler(async (event) => {
  await connectMongoDB()

  try {
    // Get all active services, sorted by order
    const services = await Service.find({ isActive: true }).sort({ order: 1 }).lean()

    // Transform the services
    const transformedServices = services.map(service => {
      try {
        const parsedFeatures = JSON.parse(service.features || '[]')
        const parsedTitle = JSON.parse(service.title || '{"th": "", "en": ""}')
        const parsedDescription = JSON.parse(service.description || '{"th": "", "en": ""}')
        return {
          id: service._id.toString(),
          title: parsedTitle,
          description: parsedDescription,
          features: parsedFeatures,
          price: service.price,
          isActive: service.isActive,
          icon: service.icon,
          image: service.image,
          color: service.color,
          order: service.order,
          createdAt: service.createdAt,
          updatedAt: service.updatedAt
        }
      } catch (error) {
        console.error('Failed to parse JSON fields for service:', service._id.toString(), error)
        return {
          id: service._id.toString(),
          title: service.title,
          description: service.description,
          features: [],
          price: service.price,
          isActive: service.isActive,
          icon: service.icon,
          image: service.image,
          color: service.color,
          order: service.order,
          createdAt: service.createdAt,
          updatedAt: service.updatedAt
        }
      }
    })

    return createSuccessResponse(transformedServices)
  } catch (error: any) {
    // Log unexpected errors
    console.error('Get services error:', error)

    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})