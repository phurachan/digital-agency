import mongoose, { Document, Schema } from 'mongoose'
import { MODEL_VALIDATION_MESSAGES } from './constants/validation'

export interface ITeamContent extends Document {
  _id: mongoose.Types.ObjectId
  heroTitle: string // JSON string: {"th": "ทีมงานของเรา", "en": "Our Team"}
  heroSubtitle: string // JSON string
  heroImage?: string
  createdAt: Date
  updatedAt: Date
}

const TeamContentSchema = new Schema<ITeamContent>({
  heroTitle: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [200, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  heroSubtitle: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [500, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  heroImage: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      const { _id, __v, ...contentData } = ret
      return {
        id: _id,
        ...contentData
      }
    }
  },
  toObject: { virtuals: true }
})

// Create indexes for efficient queries
TeamContentSchema.index({ updatedAt: -1 })

export default mongoose.models.TeamContent || mongoose.model<ITeamContent>('TeamContent', TeamContentSchema)