import mongoose, { Document, Schema } from 'mongoose'
import { MODEL_VALIDATION_MESSAGES } from './constants/validation'

export interface IContactContent extends Document {
  _id: mongoose.Types.ObjectId
  title: string // JSON string: {"th": "ติดต่อเรา", "en": "Contact Us"}
  subtitle: string // JSON string
  phone: string
  email: string
  address: string // JSON string for multilingual address
  businessHours: string // JSON string: {"th": "เวลาทำการ", "en": "Business Hours"}
  bannerImage?: string
  heroImage?: string
  createdAt: Date
  updatedAt: Date
}

const ContactContentSchema = new Schema<IContactContent>({
  title: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [200, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  subtitle: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [500, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  phone: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [20, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_20]
  },
  email: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, MODEL_VALIDATION_MESSAGES.EMAIL_INVALID_FORMAT]
  },
  address: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [500, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  businessHours: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    default: '{}'
  },
  bannerImage: {
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
ContactContentSchema.index({ updatedAt: -1 })

export default mongoose.models.ContactContent || mongoose.model<IContactContent>('ContactContent', ContactContentSchema)