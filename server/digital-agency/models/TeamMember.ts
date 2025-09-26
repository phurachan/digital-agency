import mongoose, { Document, Schema } from 'mongoose'
import { MODEL_VALIDATION_MESSAGES } from './constants/validation'

export interface ITeamMember extends Document {
  _id: mongoose.Types.ObjectId
  name: string // JSON string: {"th": "ชื่อภาษาไทย", "en": "English Name"}
  position: string // JSON string
  bio?: string // JSON string
  image?: string
  socialLinks?: string // JSON object: {"facebook": "url", "twitter": "url", etc.}
  isActive: boolean
  order?: number
  createdAt: Date
  updatedAt: Date
}

const TeamMemberSchema = new Schema<ITeamMember>({
  name: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [100, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_100]
  },
  position: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [100, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_100]
  },
  bio: {
    type: String,
    trim: true,
    maxlength: [1000, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  image: {
    type: String,
    trim: true
  },
  socialLinks: {
    type: String,
    trim: true,
    default: '{}'
  },
  isActive: {
    type: Boolean,
    default: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      const { _id, __v, ...memberData } = ret
      return {
        id: _id,
        ...memberData
      }
    }
  },
  toObject: { virtuals: true }
})

// Create indexes for efficient queries
TeamMemberSchema.index({ isActive: 1, order: 1 })
TeamMemberSchema.index({ name: 'text', position: 'text' })
TeamMemberSchema.index({ updatedAt: -1 })

export default mongoose.models.TeamMember || mongoose.model<ITeamMember>('TeamMember', TeamMemberSchema)