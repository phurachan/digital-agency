import mongoose, { Document, Schema } from 'mongoose'
import { MODEL_VALIDATION_MESSAGES } from './constants/validation'

export interface IAboutContent extends Document {
  _id: mongoose.Types.ObjectId
  missionTitle: string // JSON string: {"th": "หัวข้อไทย", "en": "English Title"}
  missionText: string // JSON string
  visionTitle: string // JSON string
  visionText: string // JSON string
  valuesTitle: string // JSON string
  valuesText: string // JSON string
  historyTitle: string // JSON string
  historyText: string // JSON string
  missionImage?: string
  heroImage?: string
  createdAt: Date
  updatedAt: Date
}

const AboutContentSchema = new Schema<IAboutContent>({
  missionTitle: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [200, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  missionText: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [1000, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  visionTitle: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [200, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  visionText: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [1000, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  valuesTitle: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [200, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  valuesText: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [1000, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  historyTitle: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [200, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  historyText: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [1000, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  missionImage: {
    type: String,
    trim: true
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
AboutContentSchema.index({ updatedAt: -1 })

export default mongoose.models.AboutContent || mongoose.model<IAboutContent>('AboutContent', AboutContentSchema)