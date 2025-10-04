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

async function checkServices() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in .env file')
    }

    await mongoose.connect(mongoUri)
    console.log('✅ Connected to MongoDB\n')

    // Get all services
    const services = await Service.find({}).sort({ order: 1 })
    console.log(`📊 Total Services: ${services.length}\n`)

    if (services.length === 0) {
      console.log('⚠️  No services found in database!')
      console.log('💡 You may need to run: node insert-services.js')
    } else {
      services.forEach((service, index) => {
        const title = JSON.parse(service.title)
        console.log(`${index + 1}. ${title.en}`)
        console.log(`   Title (TH): ${title.th}`)
        console.log(`   Image: ${service.image || 'No image'}`)
        console.log(`   Video: ${service.video || 'No video'}`)
        console.log(`   Link: ${service.externalURL || 'No link'}`)
        console.log(`   Active: ${service.isActive ? '✅' : '❌'}`)
        console.log(`   Display in Home: ${service.isDisplayInHome ? '✅' : '❌'}`)
        console.log(`   Order: ${service.order}`)
        console.log(`   Color: ${service.color}`)
        console.log('')
      })
    }

    // Close connection
    await mongoose.connection.close()
    console.log('✅ Database connection closed')
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

// Run the script
checkServices()
