import Service from '~/server/models/Service'
import { createServiceFilterConfig } from '~/server/utils/filter_config/serviceManagement'
import { connectMongoDB } from '~/server/utils/mongodb'
import { createSuccessResponse, createPredefinedError, API_RESPONSE_CODES } from '~/server/utils/responseHandler'

export default defineEventHandler(async (event) => {
  await connectMongoDB()

  try {
    const query = getQuery(event);
    // Parse query and build MongoDB filter using global utilities
    const { parsedQuery, mongoFilter } = parseQueryAndBuildFilter(
      query,
      createServiceFilterConfig()
    )

    const { page, limit } = parsedQuery.pagination
    let filter = mongoFilter

    // Handle ObjectId conversion for features field
    if (filter.features && typeof filter.features === 'string') {
      try {
        filter.features = filter.features
      } catch (error) {
        console.warn('Invalid features filter:', filter.features)
        delete filter.features
      }
    } else if (filter.features && filter.features.$in && Array.isArray(filter.features.$in)) {
      try {
        filter.features.$in = filter.features.$in.map((id: string) => id)
      } catch (error) {
        console.warn('Invalid features filter array:', filter.features.$in)
        delete filter.features
      }
    }
    
    // Get all services (both active and inactive for management), sorted by order
    const services = await Service.find(filter)
      .sort({ order: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean()

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

      return {
        id: service._id.toString(),
        title: title || { th: '', en: '' },
        description: description || { th: '', en: '' },
        features: service.features || [],
        album: service.album || [],
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