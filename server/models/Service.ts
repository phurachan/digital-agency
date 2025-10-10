import mongoose, { Document, Schema } from 'mongoose'
import { MODEL_VALIDATION_MESSAGES } from './constants/validation'

export interface IService extends Document {
  _id: mongoose.Types.ObjectId
  title: string // JSON string: {"th": "ชื่อบริการไทย", "en": "Service Name"}
  description: string // JSON string: {"th": "รายละเอียด", "en": "Description"} - HTML content from rich text editor
  features: string[] // JSON string array of feature codes: ["photographer", "event_organizer", "marketing_staff"]
  album?: string[] // Array of image URLs for the service album
  price?: number
  isActive: boolean
  isDisplayInHome: boolean
  icon?: string
  image?: string
  video?: string
  externalURL?: string
  color?: string
  order?: number
  createdAt: Date
  updatedAt: Date
}

const ServiceSchema = new Schema<IService>({
  title: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [200, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  description: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [1000, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  features: {
    type: [String],
    required: true,
    default: []
  },
  album: {
    type: [String],
    default: []
  },
  price: {
    type: Number,
    min: [0, 'Price must be a positive number']
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isDisplayInHome: {
    type: Boolean,
    default: true
  },
  icon: {
    type: String,
    trim: true
  },
  image: {
    type: String,
    trim: true
  },
  video: {
    type: String,
    trim: true
  },
  externalURL: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    trim: true,
    default: '#6495ed'
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
      const { _id, __v, ...serviceData } = ret
      return {
        id: _id,
        ...serviceData
      }
    }
  },
  toObject: { virtuals: true }
})

// Create indexes for efficient queries
ServiceSchema.index({ isActive: 1, order: 1 })
ServiceSchema.index({ title: 'text', description: 'text' })
ServiceSchema.index({ updatedAt: -1 })

export default mongoose.models.Service || mongoose.model<IService>('Service', ServiceSchema)