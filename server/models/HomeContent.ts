import mongoose, { Document, Schema } from 'mongoose'
import { MODEL_VALIDATION_MESSAGES } from './constants/validation'

export interface IHomeContent extends Document {
  _id: mongoose.Types.ObjectId
  heroTitle: string // JSON string: {"th": "หัวข้อภาษาไทย", "en": "English Title"}
  heroSubtitle: string // JSON string
  heroDisplayMode?: string // 'gradient' | 'image' | 'video' | 'minimal'
  ctaText: string // JSON string
  ctaButtonText: string // JSON string
  featureTitle: string // JSON string
  featureDescription: string // JSON string
  featureImage?: string
  aboutTitle: string // JSON string
  aboutDescription: string // JSON string
  heroImage?: string
  aboutImage?: string
  peopleTitle: string // JSON string
  peopleDescription: string // JSON string
  createdAt: Date
  updatedAt: Date
}

const HomeContentSchema = new Schema<IHomeContent>({
  heroTitle: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [500, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  heroSubtitle: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [1000, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  heroDisplayMode: {
    type: String,
    enum: ['gradient', 'image', 'video', 'minimal', 'cover'],
    default: 'gradient',
    trim: true
  },
  ctaText: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [200, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  ctaButtonText: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [100, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_100]
  },
  featureTitle: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [200, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  featureDescription: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [500, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  featureImage: {
    type: String,
    trim: true
  },
  aboutTitle: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [200, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  aboutDescription: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [1000, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  heroImage: {
    type: String,
    trim: true
  },
  aboutImage: {
    type: String,
    trim: true
  },
  peopleTitle: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [200, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  peopleDescription: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [500, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
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
HomeContentSchema.index({ updatedAt: -1 })

export default mongoose.models.HomeContent || mongoose.model<IHomeContent>('HomeContent', HomeContentSchema)