import TeamMember from '~/server/digital-agency/models/TeamMember'
import { connectMongoDB } from '~/server/digital-agency/utils/mongodb'
import { createSuccessResponse, createPredefinedError, API_RESPONSE_CODES } from '~/server/digital-agency/utils/responseHandler'

export default defineEventHandler(async (event) => {
  await connectMongoDB()

  try {
    // Get all active team members, sorted by order
    const teamMembers = await TeamMember.find({ isActive: true }).sort({ order: 1 }).lean()

    // Transform the team members
    const transformedTeamMembers = teamMembers.map(member => ({
      id: member._id.toString(),
      name: JSON.parse(member.name || '{"th": "", "en": ""}'),
      position: JSON.parse(member.position || '{"th": "", "en": ""}'),
      bio: member.bio ? JSON.parse(member.bio) : {"th": "", "en": ""},
      image: member.image,
      socialLinks: member.socialLinks ? JSON.parse(member.socialLinks) : {},
      isActive: member.isActive,
      order: member.order,
      createdAt: member.createdAt,
      updatedAt: member.updatedAt
    }))

    return createSuccessResponse(transformedTeamMembers)
  } catch (error: any) {
    // Log unexpected errors
    console.error('Get team members error:', error)

    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})