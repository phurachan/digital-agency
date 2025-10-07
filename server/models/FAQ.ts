import mongoose, { Document, Schema } from 'mongoose'
import { MODEL_VALIDATION_MESSAGES } from './constants/validation'

export interface IFAQ extends Document {
  _id: mongoose.Types.ObjectId
  question: string // JSON string: {"th": "คำถามไทย", "en": "English Question"}
  answer: string // JSON string
  isActive: boolean
  order?: number
  createdAt: Date
  updatedAt: Date
}

const FAQSchema = new Schema<IFAQ>({
  question: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [500, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
  },
  answer: {
    type: String,
    required: [true, MODEL_VALIDATION_MESSAGES.FIELD_REQUIRED],
    trim: true,
    maxlength: [2000, MODEL_VALIDATION_MESSAGES.MAX_LENGTH_200]
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
      const { _id, __v, ...faqData } = ret
      return {
        id: _id,
        ...faqData
      }
    }
  },
  toObject: { virtuals: true }
})

// Create indexes for efficient queries
FAQSchema.index({ isActive: 1, order: 1 })
FAQSchema.index({ question: 'text', answer: 'text' })
FAQSchema.index({ updatedAt: -1 })

export default mongoose.models.FAQ || mongoose.model<IFAQ>('FAQ', FAQSchema)