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
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 200
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  features: {
    type: String,
    required: true,
    trim: true
  },
  price: Number,
  isActive: {
    type: Boolean,
    default: true
  },
  isDisplayInHome: {
    type: Boolean,
    default: true
  },
  icon: String,
  image: String,
  video: String,
  externalURL: String,
  color: {
    type: String,
    default: '#6495ed'
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
})

const Service = mongoose.models.Service || mongoose.model('Service', ServiceSchema)

// Service data from content_2.txt
const servicesData = [
  {
    title: JSON.stringify({
      th: 'CHILLING HAUS MARKET',
      en: 'CHILLING HAUS MARKET'
    }),
    description: JSON.stringify({
      th: 'จบไปแล้วอย่างสมบูรณ์แบบกับงาน CHILLING HAUS MARKET ครั้งที่ 1 ที่พวกเราได้เป็นส่วนนึงในการจัดเตรียมงานและประสานงานในส่วนต่างๆ ให้ออกมาได้สมบูรณ์แบบมากที่สุด // ขอบคุณผู้มีส่วนร่วมทุกท่านที่ทำให้งานนี้ออกมาเรียบง่าย อบอุ่น เป็นกันเอง',
      en: 'Successfully completed the 1st CHILLING HAUS MARKET event where we were part of the preparation and coordination to deliver the perfect outcome. Thank you to all participants who made this event simple, warm, and friendly.'
    }),
    features: JSON.stringify({
      th: ['งานอีเว้นท์', 'การประสานงาน', 'การจัดงาน'],
      en: ['Event Management', 'Coordination', 'Event Planning']
    }),
    image: 'public/images/post_1.jpg',
    externalURL: 'https://www.facebook.com/permalink.php?story_fbid=pfbid02hQXTo7ntcCfrWva6boXteaRp8tA24wUHY9hVr4TW5GzRRJj3gsfxHfXx2R1vQxxdl&id=61578844755986',
    isActive: true,
    isDisplayInHome: true,
    color: '#FF6B6B',
    order: 1
  },
  {
    title: JSON.stringify({
      th: 'World Cup Beach Woodball Championship 2025',
      en: 'World Cup Beach Woodball Championship 2025'
    }),
    description: JSON.stringify({
      th: 'การแข่งขัน The 4th World Cup Beach Woodball Championship 2025 ระหว่างวันที่ 7-12 กันยายน 2568 ณ สนามกีฬาวู้ดบอลชั่วคราว ชายหาดแหลมเจริญ ถ.เลียบชายฝั่ง ต.ปากน้ำ อ.เมืองระยอง จ.ระยอง มีการแข่งขันทั้งหมด 14 เหรียญทอง และในรุ่นเยาวชน 7 เหรียญทอง',
      en: 'The 4th World Cup Beach Woodball Championship 2025, September 7-12, 2025 at the temporary Woodball Stadium, Laem Charoen Beach, Rayong Province. Featuring 14 gold medals in total and 7 gold medals in youth categories.'
    }),
    features: JSON.stringify({
      th: ['การถ่ายทำกีฬา', 'การแข่งขันระดับโลก', 'วิดีโอสด'],
      en: ['Sports Videography', 'World Championship', 'Live Video']
    }),
    image: 'public/images/post_2.png',
    video: 'https://www.facebook.com/61578844755986/videos/2265113093994866',
    externalURL: 'https://www.facebook.com/61578844755986/videos/2265113093994866',
    isActive: true,
    isDisplayInHome: true,
    color: '#4ECDC4',
    order: 2
  },
  {
    title: JSON.stringify({
      th: '27th Asia Pacific Dance Competition',
      en: '27th Asia Pacific Dance Competition'
    }),
    description: JSON.stringify({
      th: 'ขอบคุณ Bangkok Dance Academy | สถาบันบางกอกแดนซ์ และ Roadfun Production ที่ให้โอกาสและไว้ใจในงานนี้ครับ #27AsiaPacificDanceCompetition 🇹🇭✈️🇸🇬',
      en: 'Thank you Bangkok Dance Academy and Roadfun Production for the opportunity and trust in this project. #27AsiaPacificDanceCompetition 🇹🇭✈️🇸🇬'
    }),
    features: JSON.stringify({
      th: ['การถ่ายทำการเต้น', 'การแข่งขันนานาชาติ', 'โปรดักชันวิดีโอ'],
      en: ['Dance Videography', 'International Competition', 'Video Production']
    }),
    image: 'public/images/post_3.png',
    video: 'https://www.facebook.com/61578844755986/videos/1564022431262531/',
    externalURL: 'https://www.facebook.com/61578844755986/videos/1564022431262531/',
    isActive: true,
    isDisplayInHome: true,
    color: '#FFE66D',
    order: 3
  },
  {
    title: JSON.stringify({
      th: 'การผลิตและตัดต่อวิดีโออย่างมืออาชีพ',
      en: 'Professional Video Production & Editing'
    }),
    description: JSON.stringify({
      th: 'สร้างเรื่องราวผ่านการถ่ายทำและตัดต่อวิดีโออย่างมืออาชีพ ให้เราเนรมิตไอเดียของคุณให้กลายเป็นจริง #คลิปสัมภาษณ์ #คลิปสั้นก็รับทำนะครับ ติดต่อเข้ามาได้เลยครับ',
      en: 'Crafting stories through professional video production & editing — let us bring your vision to life. #InterviewVideos #ShortClips Contact us now!'
    }),
    features: JSON.stringify({
      th: ['การถ่ายทำวิดีโอ', 'การตัดต่อวิดีโอ', 'คลิปสัมภาษณ์', 'คลิปสั้น'],
      en: ['Video Production', 'Video Editing', 'Interview Clips', 'Short Clips']
    }),
    image: 'public/images/post_4.png',
    video: 'https://www.facebook.com/61578844755986/videos/1487592265894381/',
    externalURL: 'https://www.facebook.com/61578844755986/videos/1487592265894381/',
    isActive: true,
    isDisplayInHome: true,
    color: '#95E1D3',
    order: 4
  },
  {
    title: JSON.stringify({
      th: 'บันทึกความทรงจำอันสวยงาม',
      en: 'Beautiful Memories Documentation'
    }),
    description: JSON.stringify({
      th: 'ขอบคุณที่ไว้วางใจให้เราบันทึกความทรงจำอันสวยงามของคุณ ทุกภาพถ่ายเล่าเรื่องราว!',
      en: 'Grateful for the trust you\'ve placed in us to document your beautiful memories. Every shot tells a story!'
    }),
    features: JSON.stringify({
      th: ['การถ่ายภาพงานอีเว้นท์', 'การบันทึกภาพ', 'ภาพเล่าเรื่อง'],
      en: ['Event Photography', 'Photo Documentation', 'Storytelling Photography']
    }),
    image: 'public/images/post_5.png',
    externalURL: 'https://www.facebook.com/permalink.php?story_fbid=pfbid02vbm5fyabrRsgpH5Er58EekgdADxG6xbxZcBcGB22ALicriVPe7sUTnWPSc28Z3Jrl&id=61578844755986',
    isActive: true,
    isDisplayInHome: true,
    color: '#F38181',
    order: 5
  },
  {
    title: JSON.stringify({
      th: 'เนรมิตวิสัยทัศน์ให้เป็นจริง',
      en: 'Bring Your Vision to Life'
    }),
    description: JSON.stringify({
      th: 'สร้างเรื่องราวผ่านการถ่ายทำและตัดต่อวิดีโออย่างมืออาชีพ ให้เราเนรมิตไอเดียของคุณให้กลายเป็นจริง',
      en: 'Crafting stories through professional video production & editing — let us bring your vision to life.'
    }),
    features: JSON.stringify({
      th: ['โปรดักชันวิดีโอ', 'การเล่าเรื่อง', 'เนื้อหาสร้างสรรค์'],
      en: ['Video Production', 'Storytelling', 'Creative Content']
    }),
    image: 'public/images/post_6.png',
    video: 'https://www.facebook.com/61578844755986/videos/1889944251572117/',
    externalURL: 'https://www.facebook.com/61578844755986/videos/1889944251572117/',
    isActive: true,
    isDisplayInHome: true,
    color: '#A8E6CF',
    order: 6
  },
  {
    title: JSON.stringify({
      th: 'บันทึกงานเฉลิมฉลองพิเศษ',
      en: 'Special Celebration Documentation'
    }),
    description: JSON.stringify({
      th: 'ขอบคุณที่ไว้วางใจให้เราบันทึกงานเฉลิมฉลองพิเศษ ขอให้มีแต่ความสุข ความรัก และความสุขตลอดไป',
      en: 'Thank you for trusting us to capture such a special celebration. Wishing you joy, love, and happiness today and always.'
    }),
    features: JSON.stringify({
      th: ['การถ่ายภาพงานเฉลิมฉลอง', 'บันทึกช่วงเวลาพิเศษ', 'ภาพงานพิเศษ'],
      en: ['Celebration Photography', 'Special Moments', 'Event Photography']
    }),
    image: 'public/images/post_7.png',
    externalURL: 'https://www.facebook.com/permalink.php?story_fbid=pfbid02NEDmvwpKAGs47gaNDiCc5Wpb2Q45XdwQyvxWSRMzrrsg6WV7e7XnKCJSz7Kx9VPZl&id=61578844755986',
    isActive: true,
    isDisplayInHome: true,
    color: '#FFD3B6',
    order: 7
  },
  {
    title: JSON.stringify({
      th: 'วิดีโอแนะนำบริการโรงพยาบาลภัทรเวช',
      en: 'Pattaravej Hospital Service Introduction Video'
    }),
    description: JSON.stringify({
      th: 'Short VDO แนะนำบริการสปาตาของทางโรงพยาบาลภัทรเวช by judhaijob.agency',
      en: 'Short video introducing eye spa services at Pattaravej Hospital by judhaijob.agency'
    }),
    features: JSON.stringify({
      th: ['วิดีโอโฆษณา', 'วิดีโอแนะนำบริการ', 'คอนเทนต์การตลาด'],
      en: ['Promotional Video', 'Service Introduction', 'Marketing Content']
    }),
    image: 'public/images/post_8.png',
    video: 'https://www.facebook.com/61578844755986/videos/1464875938232969/',
    externalURL: 'https://www.facebook.com/61578844755986/videos/1464875938232969/',
    isActive: true,
    isDisplayInHome: true,
    color: '#AADAFF',
    order: 8
  }
]

async function insertServices() {
  try {
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI
    if (!mongoUri) {
      throw new Error('MONGO_URI is not defined in .env file')
    }

    await mongoose.connect(mongoUri)
    console.log('✅ Connected to MongoDB')

    // Delete existing services (optional - comment out if you want to keep existing data)
    // await Service.deleteMany({})
    // console.log('🗑️  Cleared existing services')

    // Insert new services
    const result = await Service.insertMany(servicesData)
    console.log(`✅ Successfully inserted ${result.length} services`)

    // Display inserted services
    result.forEach((service, index) => {
      console.log(`\n${index + 1}. ${JSON.parse(service.title).en}`)
      console.log(`   Image: ${service.image}`)
      console.log(`   Link: ${service.externalURL}`)
    })

    // Close connection
    await mongoose.connection.close()
    console.log('\n✅ Database connection closed')
  } catch (error) {
    console.error('❌ Error:', error.message)
    process.exit(1)
  }
}

// Run the script
insertServices()
