import Service from '~/server/digital-agency/models/Service'
import TeamMember from '~/server/digital-agency/models/TeamMember'
import { connectMongoDB } from '~/server/digital-agency/utils/mongodb'
import { createSuccessResponse, createPredefinedError, API_RESPONSE_CODES } from '~/server/digital-agency/utils/responseHandler'

const translations = {
  // Service translations
  services: {
    '68e0ee413c3b9db261f3c5e0': {
      title: {
        en: 'Professional Video Production and Editing'
      },
      description: {
        en: 'Tell your story through professional video shooting and editing. Let us turn your ideas into reality. #Interviews #ShortClips - Contact us now!'
      }
    },
    '68e0e5fa85520fdf75440236': {
      title: {
        en: 'Special Celebration Documentation'
      },
      description: {
        en: 'Thank you for trusting us to document your special celebration. Wishing you happiness, love, and joy forever.'
      }
    },
    '68e0e5fa85520fdf75440237': {
      title: {
        en: 'Phatharavej Hospital Eye Spa Service Video'
      },
      description: {
        en: 'Short video introducing the eye spa service at Phatharavej Hospital by judhaijob.agency'
      }
    },
    '68e0ee413c3b9db261f3c5e2': {
      title: {
        en: 'Turning Vision into Reality'
      },
      description: {
        en: 'Tell your story through professional video shooting and editing. Let us turn your ideas into reality.'
      }
    }
  },

  // Team member translations
  teamMembers: {
    '68e072cac4de7d795e7bdcb9': {
      name: {
        en: 'Short Video'
      },
      position: {
        en: 'Shooting + Editing'
      }
    },
    '68e072cac4de7d795e7bdcba': {
      name: {
        en: 'Innovative Marketing'
      },
      position: {
        en: 'Brand Elevation'
      }
    },
    '68e072cac4de7d795e7bdcbb': {
      name: {
        en: 'Creative Content'
      },
      position: {
        en: 'Short Clips & Marketing Videos'
      }
    }
  }
}

export default defineEventHandler(async (event) => {
  await connectMongoDB()

  try {
    const results = {
      services: [] as any[],
      teamMembers: [] as any[]
    }

    // Update services
    for (const [id, data] of Object.entries(translations.services)) {
      try {
        const service = await Service.findById(id)
        if (service) {
          // Parse existing JSON strings, merge English translations, and stringify back
          if (data.title?.en) {
            const titleObj = JSON.parse(service.title)
            titleObj.en = data.title.en
            service.title = JSON.stringify(titleObj)
          }
          if (data.description?.en) {
            const descObj = JSON.parse(service.description)
            descObj.en = data.description.en
            service.description = JSON.stringify(descObj)
          }

          await service.save()
          results.services.push({ id, status: 'updated' })
        } else {
          results.services.push({ id, status: 'not found' })
        }
      } catch (error: any) {
        results.services.push({ id, status: 'error', message: error.message })
      }
    }

    // Update team members
    for (const [id, data] of Object.entries(translations.teamMembers)) {
      try {
        const teamMember = await TeamMember.findById(id)
        if (teamMember) {
          // Parse existing JSON strings, merge English translations, and stringify back
          if (data.name?.en) {
            let nameObj
            try {
              nameObj = JSON.parse(teamMember.name)
            } catch {
              // If it's not valid JSON, create a new object with current value as 'th'
              nameObj = { th: teamMember.name }
            }
            nameObj.en = data.name.en
            teamMember.name = JSON.stringify(nameObj)
          }
          if (data.position?.en) {
            let positionObj
            try {
              positionObj = JSON.parse(teamMember.position)
            } catch {
              // If it's not valid JSON, create a new object with current value as 'th'
              positionObj = { th: teamMember.position }
            }
            positionObj.en = data.position.en
            teamMember.position = JSON.stringify(positionObj)
          }

          await teamMember.save()
          results.teamMembers.push({ id, status: 'updated' })
        } else {
          results.teamMembers.push({ id, status: 'not found' })
        }
      } catch (error: any) {
        results.teamMembers.push({ id, status: 'error', message: error.message })
      }
    }

    return createSuccessResponse(results)
  } catch (error: any) {
    console.error('Translation migration error:', error)
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR)
  }
})
