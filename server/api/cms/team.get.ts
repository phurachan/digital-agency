import TeamMember from '~/server/models/TeamMember'
import { connectMongoDB } from '~/server/utils/mongodb'
import { createSuccessResponse, createPredefinedError, API_RESPONSE_CODES } from '~/server/utils/responseHandler'

export default defineEventHandler(async (event) => {
  await connectMongoDB()

  try {
    // Get all team members (both active and inactive for management), sorted by order
    const teamMembers = await TeamMember.find({}).sort({ order: 1 }).lean()

    // Transform the team members
    const transformedTeamMembers = teamMembers.map(member => {
      // Safely parse name
      let name
      try {
        name = typeof member.name === 'string' ? JSON.parse(member.name) : member.name
      } catch (e) {
        name = { th: member.name || '', en: member.name || '' }
      }

      // Safely parse position
      let position
      try {
        position = typeof member.position === 'string' ? JSON.parse(member.position) : member.position
      } catch (e) {
        position = { th: member.position || '', en: member.position || '' }
      }

      // Safely parse bio
      let bio
      try {
        bio = member.bio ? (typeof member.bio === 'string' ? JSON.parse(member.bio) : member.bio) : { th: '', en: '' }
      } catch (e) {
        bio = { th: member.bio || '', en: member.bio || '' }
      }

      // Safely parse socialLinks
      let socialLinks
      try {
        socialLinks = member.socialLinks ? (typeof member.socialLinks === 'string' ? JSON.parse(member.socialLinks) : member.socialLinks) : {}
      } catch (e) {
        socialLinks = {}
      }

      return {
        id: member._id.toString(),
        name: name || { th: '', en: '' },
        position: position || { th: '', en: '' },
        bio: bio || { th: '', en: '' },
        image: member.image,
        link: member.link,
        socialLinks: socialLinks || {},
        isActive: member.isActive,
        isDisplayInHome: member.isDisplayInHome ?? true,
        order: member.order,
        createdAt: member.createdAt,
        updatedAt: member.updatedAt
      }
    })

    return createSuccessResponse(transformedTeamMembers)
  } catch (error: any) {
    // Log unexpected errors
    console.error('Get team members error:', error)

    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})