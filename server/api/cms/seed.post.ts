import HomeContent from '~/server/models/HomeContent'
import Service from '~/server/models/Service'
import TeamMember from '~/server/models/TeamMember'
import AboutContent from '~/server/models/AboutContent'
import ContactContent from '~/server/models/ContactContent'
import ServicesContent from '~/server/models/ServicesContent'
import TeamContent from '~/server/models/TeamContent'
import FAQ from '~/server/models/FAQ'
import SiteSettings from '~/server/models/SiteSettings'
import { connectMongoDB } from '~/server/utils/mongodb'
import { createSuccessResponse, createPredefinedError, API_RESPONSE_CODES } from '~/server/utils/responseHandler'

export default defineEventHandler(async (event) => {
  await connectMongoDB()

  try {
    // Clear existing CMS data
    await Promise.all([
      HomeContent.deleteMany({}),
      Service.deleteMany({}),
      TeamMember.deleteMany({}),
      AboutContent.deleteMany({}),
      ContactContent.deleteMany({}),
      ServicesContent.deleteMany({}),
      TeamContent.deleteMany({}),
      FAQ.deleteMany({}),
      SiteSettings.deleteMany({})
    ])

    // Create Home Content
    await HomeContent.create({
      heroTitle: JSON.stringify({
        "th": "เอเจนซี่ดิจิทัลสร้างสรรค์ของคุณ",
        "en": "Your Creative Digital Agency"
      }),
      heroSubtitle: JSON.stringify({
        "th": "เราสร้างสรรค์เนื้อหาดิจิทัล วิดีโอ โปสเตอร์ และแคมเปญที่น่าประทับใจเพื่อยกระดับแบรนด์ของคุณ",
        "en": "We create stunning digital content, videos, posters, and campaigns to elevate your brand"
      }),
      ctaText: JSON.stringify({
        "th": "พร้อมเริ่มต้นโปรเจคใหม่กับเรา",
        "en": "Ready to start your next project with us"
      }),
      ctaButtonText: JSON.stringify({
        "th": "เริ่มต้นเลย",
        "en": "Get Started"
      }),
      featureTitle: JSON.stringify({
        "th": "บริการครบวงจร",
        "en": "Complete Digital Solutions"
      }),
      featureDescription: JSON.stringify({
        "th": "ตั้งแต่การออกแบบโปสเตอร์ การผลิตวิดีโอ ไปจนถึงการตลาดดิจิทัล เรามีทีมผู้เชี่ยวชาญพร้อมดูแลทุกขั้นตอน",
        "en": "From poster design and video production to digital marketing, we have expert teams ready to handle every step"
      }),
      aboutTitle: JSON.stringify({
        "th": "เกี่ยวกับเรา",
        "en": "About Us"
      }),
      aboutDescription: JSON.stringify({
        "th": "เรามีประสบการณ์กว่า 10 ปีในการสร้างสรรค์เนื้อหาดิจิทัลที่โดดเด่น ด้วยทีมงานมืออาชีพและเทคโนโลยีล้ำสมัย",
        "en": "We have over 10 years of experience creating outstanding digital content with professional teams and cutting-edge technology"
      }),
      peopleTitle: JSON.stringify({
        "th": "ทีมงานมืออาชีพ",
        "en": "Professional Team"
      }),
      peopleDescription: JSON.stringify({
        "th": "ทีมงานที่มีความเชี่ยวชาญในทุกสาขา พร้อมสร้างสรรค์ผลงานที่ตอบโจทย์ทุกความต้องการ",
        "en": "Expert team in every field, ready to create works that meet all your needs"
      }),
      heroImage: null,
      aboutImage: null,
      featureImage: null
    })

    // Create Services
    const servicesData = [
      {
        title: JSON.stringify({
          "th": "การผลิตวิดีโอ",
          "en": "Video Production"
        }),
        description: JSON.stringify({
          "th": "ผลิตวิดีโอคุณภาพสูงสำหรับโฆษณา การตลาด และเนื้อหาโซเชียลมีเดีย",
          "en": "High-quality video production for advertising, marketing, and social media content"
        }),
        features: JSON.stringify({
          "th": ["วิดีโอโฆษณา", "วิดีโอแนะนำผลิตภัณฑ์", "วิดีโอสำหรับโซเชียลมีเดีย", "การตัดต่อแบบมืออาชีพ"],
          "en": ["Commercial Videos", "Product Showcase Videos", "Social Media Videos", "Professional Editing"]
        }),
        price: 15000,
        icon: "🎬",
        image: null,
        color: "#e74c3c",
        order: 1,
        isActive: true
      },
      {
        title: JSON.stringify({
          "th": "การออกแบบโปสเตอร์",
          "en": "Poster Design"
        }),
        description: JSON.stringify({
          "th": "ออกแบบโปสเตอร์และกราฟิกที่สวยงามและดึงดูดสำหรับการโฆษณาและการตลาด",
          "en": "Beautiful and attractive poster and graphic design for advertising and marketing"
        }),
        features: JSON.stringify({
          "th": ["โปสเตอร์โฆษณา", "กราฟิกโซเชียลมีเดีย", "แบนเนอร์ออนไลน์", "บรรจุภัณฑ์"],
          "en": ["Advertising Posters", "Social Media Graphics", "Online Banners", "Packaging Design"]
        }),
        price: 5000,
        icon: "🎨",
        image: null,
        color: "#9b59b6",
        order: 2,
        isActive: true
      },
      {
        title: JSON.stringify({
          "th": "เนื้อหาโซเชียลมีเดีย",
          "en": "Social Media Content"
        }),
        description: JSON.stringify({
          "th": "สร้างเนื้อหาที่น่าสนใจสำหรับแพลตฟอร์มโซเชียลมีเดียทุกประเภท",
          "en": "Create engaging content for all social media platforms"
        }),
        features: JSON.stringify({
          "th": ["โพสต์ Facebook/Instagram", "เนื้อหา TikTok", "การวางแผนเนื้อหา", "การจัดการชุมชน"],
          "en": ["Facebook/Instagram Posts", "TikTok Content", "Content Planning", "Community Management"]
        }),
        price: 8000,
        icon: "📱",
        image: null,
        color: "#3498db",
        order: 3,
        isActive: true
      },
      {
        title: JSON.stringify({
          "th": "แพ็คเกจแบรนดิ้ง",
          "en": "Branding Package"
        }),
        description: JSON.stringify({
          "th": "บริการออกแบบและพัฒนาแบรนด์ครบวงจร ตั้งแต่โลโก้ไปจนถึงไกด์ไลน์แบรนด์",
          "en": "Complete brand design and development from logo to brand guidelines"
        }),
        features: JSON.stringify({
          "th": ["การออกแบบโลโก้", "ระบบสีแบรนด์", "ฟอนต์แบรนด์", "ไกด์ไลน์การใช้งาน"],
          "en": ["Logo Design", "Brand Color System", "Brand Typography", "Usage Guidelines"]
        }),
        price: 25000,
        icon: "🏷️",
        image: null,
        color: "#f39c12",
        order: 4,
        isActive: true
      },
      {
        title: JSON.stringify({
          "th": "การตลาดดิจิทัล",
          "en": "Digital Marketing"
        }),
        description: JSON.stringify({
          "th": "วางกลยุทธ์และบริหารจัดการการตลาดออนไลน์ให้ได้ผลลัพธ์สูงสุด",
          "en": "Strategic planning and management of online marketing for maximum results"
        }),
        features: JSON.stringify({
          "th": ["Google Ads", "Facebook Ads", "SEO", "Email Marketing"],
          "en": ["Google Ads", "Facebook Ads", "SEO", "Email Marketing"]
        }),
        price: 12000,
        icon: "📈",
        image: null,
        color: "#27ae60",
        order: 5,
        isActive: true
      },
      {
        title: JSON.stringify({
          "th": "การพัฒนาเว็บไซต์",
          "en": "Website Development"
        }),
        description: JSON.stringify({
          "th": "พัฒนาเว็บไซต์ที่ทันสมัยและใช้งานง่าย รองรับทุกอุปกรณ์",
          "en": "Develop modern and user-friendly websites that work on all devices"
        }),
        features: JSON.stringify({
          "th": ["Responsive Design", "E-commerce", "CMS", "SEO-Friendly"],
          "en": ["Responsive Design", "E-commerce", "CMS", "SEO-Friendly"]
        }),
        price: 35000,
        icon: "💻",
        image: null,
        color: "#2c3e50",
        order: 6,
        isActive: true
      },
      {
        title: JSON.stringify({
          "th": "การถ่ายภาพผลิตภัณฑ์",
          "en": "Product Photography"
        }),
        description: JSON.stringify({
          "th": "บริการถ่ายภาพผลิตภัณฑ์คุณภาพสูงสำหรับการตลาดและอีคอมเมิร์ซ",
          "en": "High-quality product photography services for marketing and e-commerce"
        }),
        features: JSON.stringify({
          "th": ["Studio Photography", "Lifestyle Shots", "360° Photography", "Image Editing"],
          "en": ["Studio Photography", "Lifestyle Shots", "360° Photography", "Image Editing"]
        }),
        price: 7500,
        icon: "📸",
        image: null,
        color: "#34495e",
        order: 7,
        isActive: true
      },
      {
        title: JSON.stringify({
          "th": "การจัดการแคมเปญโฆษณา",
          "en": "Ad Campaign Management"
        }),
        description: JSON.stringify({
          "th": "จัดการแคมเปญโฆษณาออนไลน์บนแพลตฟอร์มต่างๆ เพื่อผลลัพธ์สูงสุด",
          "en": "Manage online advertising campaigns across platforms for maximum results"
        }),
        features: JSON.stringify({
          "th": ["Campaign Strategy", "A/B Testing", "Performance Tracking", "Budget Optimization"],
          "en": ["Campaign Strategy", "A/B Testing", "Performance Tracking", "Budget Optimization"]
        }),
        price: 18000,
        icon: "🎯",
        image: null,
        color: "#e67e22",
        order: 8,
        isActive: true
      },
      {
        title: JSON.stringify({
          "th": "การออกแบบ UX/UI",
          "en": "UX/UI Design"
        }),
        description: JSON.stringify({
          "th": "ออกแบบประสบการณ์ผู้ใช้และส่วนติดต่อผู้ใช้ที่สวยงามและใช้งานง่าย",
          "en": "Design beautiful and user-friendly user experience and user interface"
        }),
        features: JSON.stringify({
          "th": ["User Research", "Wireframing", "Prototyping", "Usability Testing"],
          "en": ["User Research", "Wireframing", "Prototyping", "Usability Testing"]
        }),
        price: 22000,
        icon: "🎨",
        image: null,
        color: "#8e44ad",
        order: 9,
        isActive: true
      },
      {
        title: JSON.stringify({
          "th": "การวิเคราะห์ข้อมูล",
          "en": "Data Analytics"
        }),
        description: JSON.stringify({
          "th": "วิเคราะห์ข้อมูลการตลาดและพฤติกรรมผู้ใช้เพื่อปรับปรุงกลยุทธ์",
          "en": "Analyze marketing data and user behavior to improve strategies"
        }),
        features: JSON.stringify({
          "th": ["Google Analytics", "Heat Maps", "User Journey", "Performance Reports"],
          "en": ["Google Analytics", "Heat Maps", "User Journey", "Performance Reports"]
        }),
        price: 13500,
        icon: "📊",
        image: null,
        color: "#16a085",
        order: 10,
        isActive: true
      }
    ]

    await Service.insertMany(servicesData)

    // Create Team Members
    const teamData = [
      {
        name: JSON.stringify({
          "th": "สมชาย วิทยากร",
          "en": "Somchai Wittayakon"
        }),
        position: JSON.stringify({
          "th": "ผู้อำนวยการสร้างสรรค์",
          "en": "Creative Director"
        }),
        bio: JSON.stringify({
          "th": "มีประสบการณ์กว่า 15 ปีในด้านการสร้างสรรค์และการออกแบบ เชี่ยวชาญในการผลิตวิดีโอและการตลาดดิจิทัล",
          "en": "Over 15 years of experience in creativity and design, specializing in video production and digital marketing"
        }),
        image: null,
        socialLinks: JSON.stringify({
          "facebook": "https://facebook.com/somchai",
          "instagram": "https://instagram.com/somchai",
          "linkedin": "https://linkedin.com/in/somchai"
        }),
        order: 1,
        isActive: true
      },
      {
        name: JSON.stringify({
          "th": "สุดา นักออกแบบ",
          "en": "Suda Nakaukbaeb"
        }),
        position: JSON.stringify({
          "th": "หัวหน้านักออกแบบ",
          "en": "Lead Designer"
        }),
        bio: JSON.stringify({
          "th": "ผู้เชี่ยวชาญด้านการออกแบบกราฟิกและโปสเตอร์ มีผลงานที่ได้รับรางวัลมากมาย",
          "en": "Expert in graphic and poster design with many award-winning works"
        }),
        image: null,
        socialLinks: JSON.stringify({
          "instagram": "https://instagram.com/suda.design",
          "behance": "https://behance.net/suda"
        }),
        order: 2,
        isActive: true
      },
      {
        name: JSON.stringify({
          "th": "ธีรพงษ์ โปรดิวเซอร์",
          "en": "Terapong Producer"
        }),
        position: JSON.stringify({
          "th": "โปรดิวเซอร์วิดีโอ",
          "en": "Video Producer"
        }),
        bio: JSON.stringify({
          "th": "ผู้เชี่ยวชาญด้านการผลิตวิดีโอและการถ่ายทำ มีประสบการณ์ในการทำงานกับแบรนด์ชั้นนำ",
          "en": "Expert in video production and filming with experience working with leading brands"
        }),
        image: null,
        socialLinks: JSON.stringify({
          "youtube": "https://youtube.com/terapong",
          "instagram": "https://instagram.com/terapong.video"
        }),
        order: 3,
        isActive: true
      },
      {
        name: JSON.stringify({
          "th": "นิภา มาร์เก็ตเตอร์",
          "en": "Nipa Marketer"
        }),
        position: JSON.stringify({
          "th": "ผู้จัดการการตลาดดิจิทัล",
          "en": "Digital Marketing Manager"
        }),
        bio: JSON.stringify({
          "th": "เชี่ยวชาญด้านการตลาดออนไลน์และโซเชียลมีเดีย ช่วยให้แบรนด์เติบโตอย่างยั่งยืน",
          "en": "Expert in online marketing and social media, helping brands grow sustainably"
        }),
        image: null,
        socialLinks: JSON.stringify({
          "facebook": "https://facebook.com/nipa.marketing",
          "linkedin": "https://linkedin.com/in/nipa"
        }),
        order: 4,
        isActive: true
      },
      {
        name: JSON.stringify({
          "th": "อานนท์ เทคโนโลยี",
          "en": "Anon Technology"
        }),
        position: JSON.stringify({
          "th": "หัวหน้านักพัฒนา",
          "en": "Lead Developer"
        }),
        bio: JSON.stringify({
          "th": "ผู้เชี่ยวชาญด้านเทคโนโลยีและการพัฒนาเว็บไซต์ ผลักดันนวัตกรรมใหม่ๆ ให้กับทีม",
          "en": "Expert in technology and website development, driving new innovations for the team"
        }),
        image: null,
        socialLinks: JSON.stringify({
          "github": "https://github.com/anon",
          "linkedin": "https://linkedin.com/in/anon"
        }),
        order: 5,
        isActive: true
      },
      {
        name: JSON.stringify({
          "th": "พิมพ์ใจ คอนเทนต์",
          "en": "Pimjai Content"
        }),
        position: JSON.stringify({
          "th": "ผู้เชี่ยวชาญเนื้อหา",
          "en": "Content Specialist"
        }),
        bio: JSON.stringify({
          "th": "นักเขียนและผู้สร้างเนื้อหาที่มีประสบการณ์ ช่วยสร้างสรรค์เนื้อหาที่น่าสนใจและมีประสิทธิภาพ",
          "en": "Experienced writer and content creator, helping create engaging and effective content"
        }),
        image: null,
        socialLinks: JSON.stringify({
          "twitter": "https://twitter.com/pimjai",
          "medium": "https://medium.com/@pimjai"
        }),
        order: 6,
        isActive: true
      }
    ]

    await TeamMember.insertMany(teamData)

    // Create About Content
    await AboutContent.create({
      missionTitle: JSON.stringify({
        "th": "พันธกิจของเรา",
        "en": "Our Mission"
      }),
      missionText: JSON.stringify({
        "th": "เรามุ่งมั่นที่จะสร้างสรรค์เนื้อหาดิจิทัลที่มีคุณภาพและสร้างสรรค์ เพื่อช่วยให้ธุรกิจของลูกค้าเติบโตและประสบความสำเร็จในยุคดิจิทัล",
        "en": "We are committed to creating high-quality and innovative digital content to help our clients' businesses grow and succeed in the digital age"
      }),
      visionTitle: JSON.stringify({
        "th": "วิสัยทัศน์",
        "en": "Our Vision"
      }),
      visionText: JSON.stringify({
        "th": "เป็นเอเจนซี่ดิจิทัลชั้นนำที่เป็นที่ยอมรับในระดับสากล ด้วยการนำเสนอผลงานที่สร้างสรรค์และมีคุณภาพสูง",
        "en": "To be a leading globally recognized digital agency through creative and high-quality work presentations"
      }),
      valuesTitle: JSON.stringify({
        "th": "ค่านิยมของเรา",
        "en": "Our Values"
      }),
      valuesText: JSON.stringify({
        "th": "ความสร้างสรรค์ คุณภาพ ความซื่อสัตย์ และการทำงานเป็นทีม เป็นหัวใจหลักในการทำงานของเรา",
        "en": "Creativity, Quality, Integrity, and Teamwork are the core values of our work"
      }),
      historyTitle: JSON.stringify({
        "th": "ประวัติของเรา",
        "en": "Our History"
      }),
      historyText: JSON.stringify({
        "th": "ก่อตั้งขึ้นในปี 2014 ด้วยความมุ่งมั่นที่จะสร้างสรรค์เนื้อหาดิจิทัลที่มีคุณภาพ เราได้เติบโตจากทีมเล็กๆ มาเป็นเอเจนซี่ที่มีชื่อเสียง",
        "en": "Founded in 2014 with a commitment to creating quality digital content, we have grown from a small team to a renowned agency"
      }),
      missionImage: null,
      heroImage: null
    })

    // Create Contact Content
    await ContactContent.create({
      title: JSON.stringify({
        "th": "ติดต่อเรา",
        "en": "Contact Us"
      }),
      subtitle: JSON.stringify({
        "th": "พร้อมรับฟังและช่วยเหลือคุณในทุกโปรเจค",
        "en": "Ready to listen and help you with every project"
      }),
      phone: "02-123-4567",
      email: "contact@digitalagency.co.th",
      address: JSON.stringify({
        "th": "123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
        "en": "123 Sukhumvit Road, Khlong Toei, Bangkok 10110"
      }),
      businessHours: JSON.stringify({
        "th": "จันทร์-ศุกร์: 9:00-18:00 น.\nเสาร์: 9:00-16:00 น.\nอาทิตย์: ปิด",
        "en": "Monday-Friday: 9:00-18:00\nSaturday: 9:00-16:00\nSunday: Closed"
      }),
      heroImage: null
    })

    // Create Services Content
    await ServicesContent.create({
      heroTitle: JSON.stringify({
        "th": "บริการของเรา",
        "en": "Our Services"
      }),
      heroSubtitle: JSON.stringify({
        "th": "บริการครบวงจรด้านการสร้างสรรค์เนื้อหาดิจิทัล",
        "en": "Complete digital content creation services"
      }),
      heroImage: null
    })

    // Create Team Content
    await TeamContent.create({
      heroTitle: JSON.stringify({
        "th": "ทีมงานของเรา",
        "en": "Our Team"
      }),
      heroSubtitle: JSON.stringify({
        "th": "ทีมผู้เชี่ยวชาญที่พร้อมสร้างสรรค์ผลงานให้คุณ",
        "en": "Expert team ready to create amazing work for you"
      }),
      heroImage: null
    })

    // Create FAQs
    const faqData = [
      {
        question: JSON.stringify({
          "th": "ใช้เวลาในการผลิตวิดีโอนานแค่ไหน?",
          "en": "How long does video production take?"
        }),
        answer: JSON.stringify({
          "th": "ขึ้นอยู่กับความซับซ้อนของโปรเจค โดยทั่วไปใช้เวลา 1-4 สัปดาห์ ตั้งแต่การวางแผนจนถึงการส่งมอบผลงาน",
          "en": "Depends on project complexity, typically takes 1-4 weeks from planning to delivery"
        }),
        order: 1,
        isActive: true
      },
      {
        question: JSON.stringify({
          "th": "มีบริการแก้ไขผลงานหรือไม่?",
          "en": "Do you provide revision services?"
        }),
        answer: JSON.stringify({
          "th": "ใช่ เรามีบริการแก้ไขผลงานฟรี 2-3 ครั้ง และสามารถแก้ไขเพิ่มเติมได้ตามความต้องการ",
          "en": "Yes, we provide 2-3 free revisions and additional revisions as needed"
        }),
        order: 2,
        isActive: true
      },
      {
        question: JSON.stringify({
          "th": "ราคาบริการคิดอย่างไร?",
          "en": "How do you calculate service prices?"
        }),
        answer: JSON.stringify({
          "th": "ราคาขึ้นอยู่กับขอบเขตงาน ความซับซ้อน และระยะเวลาในการทำงาน เราจะให้ใบเสนอราคาที่ชัดเจนก่อนเริ่มงาน",
          "en": "Prices depend on scope, complexity, and timeline. We provide clear quotations before starting work"
        }),
        order: 3,
        isActive: true
      },
      {
        question: JSON.stringify({
          "th": "สามารถดูผลงานตัวอย่างได้หรือไม่?",
          "en": "Can I see examples of your work?"
        }),
        answer: JSON.stringify({
          "th": "แน่นอน เรามีพอร์ตโฟลิโอที่หลากหลายให้ชม และสามารถขอดูผลงานที่เกี่ยวข้องกับโปรเจคของคุณได้",
          "en": "Absolutely! We have a diverse portfolio to show and can provide relevant examples for your project"
        }),
        order: 4,
        isActive: true
      },
      {
        question: JSON.stringify({
          "th": "มีบริการหลังการขายหรือไม่?",
          "en": "Do you provide after-sales service?"
        }),
        answer: JSON.stringify({
          "th": "ใช่ เรามีบริการดูแลและซัพพอร์ตหลังส่งมอบงาน รวมถึงการแก้ไขปัญหาเฉพาะหน้า",
          "en": "Yes, we provide post-delivery support and maintenance, including urgent issue fixes"
        }),
        order: 5,
        isActive: true
      }
    ]

    await FAQ.insertMany(faqData)

    // Create Site Settings
    await SiteSettings.create({
      siteName: JSON.stringify({
        "th": "Creative Digital Agency",
        "en": "Creative Digital Agency"
      }),
      siteTagline: JSON.stringify({
        "th": "เอเจนซี่ดิจิทัลสร้างสรรค์",
        "en": "Your Creative Digital Partner"
      }),
      primaryColor: "#6495ed",
      secondaryColor: "#9333ea",
      socialLinks: JSON.stringify({
        "facebook": "https://facebook.com/creativedigitalagency",
        "instagram": "https://instagram.com/creativedigitalagency",
        "twitter": "https://twitter.com/creativedigital",
        "linkedin": "https://linkedin.com/company/creative-digital-agency",
        "youtube": "https://youtube.com/creativedigitalagency"
      }),
      logo: null,
      favicon: null
    })

    return createSuccessResponse({
      message: "CMS data seeded successfully",
      summary: {
        homeContent: 1,
        services: servicesData.length,
        teamMembers: teamData.length,
        aboutContent: 1,
        contactContent: 1,
        servicesContent: 1,
        teamContent: 1,
        faqs: faqData.length,
        siteSettings: 1
      }
    })

  } catch (error: any) {
    console.error('CMS seed error:', error)
    throw createPredefinedError(API_RESPONSE_CODES.INTERNAL_ERROR, `Seed failed: ${error.message}`)
  }
})