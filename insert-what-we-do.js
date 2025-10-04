// Script to insert "What we do" content to replace team members
import mongoose from 'mongoose';

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://moonoi-test:MoonoiPassword@myapp-cluster.eng65pe.mongodb.net/digital_agency?retryWrites=true&w=majority';

const teamMemberSchema = new mongoose.Schema({
  name: String,
  position: String,
  bio: String,
  image: String,
  socialLinks: String,
  isActive: Boolean,
  isDisplayInHome: Boolean,
  order: Number
}, { timestamps: true });

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);

const whatWeDoData = [
  {
    name: '{"th": "คลิปสั้น (Short Video)", "en": "Short Video Production"}',
    position: '{"th": "ถ่ายทำ + ตัดต่อ", "en": "Shooting + Editing"}',
    bio: '{"th": "รับทำคลิปสั้น ถ่าย+ตัดต่อ ราคาเริ่มต้น 2,500 บาท รับประกันคุณภาพ พร้อม Video footage ทั้งหมด และ Video final ที่ตัดต่อเสร็จแล้ว ทั่วจ.ระยองและพื้นที่ใกล้เคียง", "en": "Short video production with shooting and editing services starting at 2,500 baht. Guaranteed quality with all video footage and final edited video included. Service available in Rayong and nearby areas."}',
    image: 'public/images/post_video.jpg',
    socialLinks: '{"drive": "https://drive.google.com"}',
    isActive: true,
    isDisplayInHome: true,
    order: 1
  },
  {
    name: '{"th": "การตลาดนวัตกรรม", "en": "Innovative Marketing Solutions"}',
    position: '{"th": "ยกระดับแบรนด์", "en": "Brand Elevation"}',
    bio: '{"th": "ยกระดับแบรนด์ผ่านโซลูชั่นการตลาดที่เป็นนวัตกรรม รับทำ branding กราฟฟิก ถ่าย+ตัดต่อทุกชนิด ให้คำปรึกษาด้านการตลาด สื่อสารประชาสัมพันธ์ งานออกแบบโฆษณาประชาสัมพันธ์ ผลิตป้าย งานพิมพ์ทุกชนิด และบริหารการจัดงานออร์กาไนซ์เซอร์ทุกชนิด", "en": "Elevate your brand through innovative marketing solutions. We offer branding, graphic design, video production, marketing consultancy, PR communications, advertising design, signage production, printing services, and full event organization."}',
    image: 'public/images/post_budget_profit.jpg',
    socialLinks: '{}',
    isActive: true,
    isDisplayInHome: true,
    order: 2
  },
  {
    name: '{"th": "คอนเทนต์สร้างสรรค์", "en": "Creative Content Production"}',
    position: '{"th": "คลิปสั้น & วิดีโอการตลาด", "en": "Short Clips & Marketing Videos"}',
    bio: '{"th": "ผลสำรวจจาก E-commerce Expo 2025 พบว่า 82% ของผู้บริโภคชอบดูคลิปสั้น วิดีโอสั้นๆ ย่อยง่าย กระชับรวดเร็ว เราพร้อมช่วยสร้างคอนเทนต์ที่ทำให้แบรนด์ของคุณโดดเด่นและจดจำได้ง่าย ไม่ให้คนลืมชื่อแบรนด์ของคุณ", "en": "E-commerce Expo 2025 survey reveals 82% of consumers prefer short video content that is easy to digest, concise and fast-paced. We help create content that makes your brand stand out and memorable, ensuring your brand stays top of mind."}',
    image: 'public/images/post_content_type.jpg',
    socialLinks: '{}',
    isActive: true,
    isDisplayInHome: true,
    order: 3
  }
];

async function insertWhatWeDo() {
  try {
    // Connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Delete existing team members
    const deleteResult = await TeamMember.deleteMany({});
    console.log(`🗑️  Deleted ${deleteResult.deletedCount} existing team members`);

    // Insert new "What we do" data
    const result = await TeamMember.insertMany(whatWeDoData);
    console.log(`✅ Inserted ${result.length} "What we do" items:`);

    result.forEach((item, index) => {
      const nameObj = JSON.parse(item.name);
      console.log(`   ${index + 1}. ${nameObj.th}`);
    });

    console.log('\n✨ Migration completed successfully!');

  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log('🔌 Database connection closed');
  }
}

// Run the script
insertWhatWeDo();
