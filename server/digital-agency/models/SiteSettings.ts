import mongoose, { Document, Schema } from 'mongoose'
import { MODEL_VALIDATION_MESSAGES } from './constants/validation'

export interface ISiteSettings extends Document {
  _id: mongoose.Types.ObjectId
  siteName: string // JSON string: {"th": "ชื่อเว็บไซต์", "en": "Site Name"}
  siteTagline: string // JSON string
  primaryColor: string
  secondaryColor: string
  socialLinks: string // JSON object: {"facebook": "url", "twitter": "url", etc.}
  logo?: string
  favicon?: string
  metaDescription?: string // JSON string: {"th": "", "en": ""}
  keywords?: string // JSON string: {"th": "", "en": ""}
  contactEmail?: string // JSON string: {"th": "", "en": ""}
  contactPhone?: string // JSON string: {"th": "", "en": ""}
  createdAt: Date
  updatedAt: Date
}

const SiteSettingsSchema = new Schema<ISiteSettings>({
  siteName: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [100, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_100]
  },
  siteTagline: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [200, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  primaryColor: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    default: '#6495ed'
  },
  secondaryColor: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    default: '#9333ea'
  },
  socialLinks: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    default: '{}'
  },
  logo: {
    type: String,
    trim: true
  },
  favicon: {
    type: String,
    trim: true
  },
  metaDescription: {
    type: String,
    trim: true,
    default: '{"th": "", "en": ""}'
  },
  keywords: {
    type: String,
    trim: true,
    default: '{"th": "", "en": ""}'
  },
  contactEmail: {
    type: String,
    trim: true,
    default: '{"th": "", "en": ""}'
  },
  contactPhone: {
    type: String,
    trim: true,
    default: '{"th": "", "en": ""}'
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: function(doc, ret) {
      const { _id, __v, ...settingsData } = ret
      return {
        id: _id,
        ...settingsData
      }
    }
  },
  toObject: { virtuals: true }
})

// Create indexes for efficient queries
SiteSettingsSchema.index({ updatedAt: -1 })

export default mongoose.models.SiteSettings || mongoose.model<ISiteSettings>('SiteSettings', SiteSettingsSchema)