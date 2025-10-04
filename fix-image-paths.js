import mongoose from 'mongoose'
import dotenv from 'dotenv'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// Load environment variables
dotenv.config({ path: join(__dirname, '.env') })

// Service Schema
const ServiceSchema = new mongoose.Schema({
  title: String,
  description: String,
  features: String,
  price: Number,
  isActive: Boolean,
  isDisplayInHome: Boolean,
  icon: String,
  image: String,
  video: String,
  externalURL: String,
  color: String,
  order: Number
}, {
  timestamps: true
})

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema)

async function fixImagePaths() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in .env file')
    }

    await mongoose.connect(mongoUri)
    console.log('✅ Connected to MongoDB')

    // Find all services with image paths starting with "public/"
    const services = await Service.find({ image: /^public\// })
    console.log(`📝 Found ${services.length} services to update`)

    // Update each service
    for (const service of services) {
      const oldPath = service.image
      const newPath = oldPath.replace('public/', '/')

      await Service.updateOne(
        { _id: service._id },
        { $set: { image: newPath } }
      )

      console.log(`✅ Updated: ${oldPath} → ${newPath}`)
    }

    console.log(`\n✅ Successfully updated ${services.length} image paths`)

    // Close connection
    await mongoose.connection.close()
    console.log('✅ Database connection closed')
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

// Run the script
fixImagePaths()
