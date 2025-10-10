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
        "th": "AGENCY THAT GETS YOU",
        "en": "AGENCY THAT GETS YOU"
      }),
      heroSubtitle: JSON.stringify({
        "th": "ชิลล์ไปกับบริการที่หลากหลาย จัดงานอีเวนท์ ถ่ายภาพ ถ่ายวิดีโอ และอีกมากมาย",
        "en": "Chill with a variety of services: event planning, photography, videography, and much more"
      }),
      heroDisplayMode: 'gradient',
      ctaText: JSON.stringify({
        "th": "พร้อมที่จะร่วมงานกันหรือยัง?",
        "en": "Ready to work together?"
      }),
      ctaButtonText: JSON.stringify({
        "th": "เริ่มต้นเลย",
        "en": "Get Started"
      }),
      featureTitle: JSON.stringify({
        "th": "บริการครบวงจร",
        "en": "Complete Services"
      }),
      featureDescription: JSON.stringify({
        "th": "ตั้งแต่การจัดงานอีเวนท์ การถ่ายภาพ วิดีโอ ไปจนถึงการตลาดดิจิทัล เรามีทีมผู้เชี่ยวชาญพร้อมดูแลทุกขั้นตอน",
        "en": "From event planning, photography, videography to digital marketing, we have expert teams ready to handle every step"
      }),
      aboutTitle: JSON.stringify({
        "th": "ทำความรู้จักเรา",
        "en": "Get to Know Us"
      }),
      aboutDescription: JSON.stringify({
        "th": "เราคือทีมงานที่รวมตัวกันด้วยความหลงใหลในการสร้างสรรค์งานที่มีคุณภาพ พร้อมมอบประสบการณ์ที่แตกต่างให้กับทุกโปรเจกต์",
        "en": "We are a team united by passion for creating quality work, ready to deliver unique experiences for every project"
      }),
      peopleTitle: JSON.stringify({
        "th": "ข้อมูลเชิงลึก",
        "en": "Insights"
      }),
      peopleDescription: JSON.stringify({
        "th": "อ่านเรื่องราวและประสบการณ์จากทีมงานของเรา",
        "en": "Read stories and experiences from our team"
      }),
      heroImage: null,
      aboutImage: null,
      featureImage: null
    })

    // Create Services with new structure
    const servicesData = [
      {
        title: JSON.stringify({
          "th": "ช่างภาพมืออาชีพ",
          "en": "Professional Photographer"
        }),
        description: JSON.stringify({
          "th": "<h2>บริการถ่ายภาพมืออาชีพ</h2><p>ทีมช่างภาพมืออาชีพพร้อมบันทึกทุกช่วงเวลาสำคัญของคุณด้วยเทคนิคและอุปกรณ์ที่ทันสมัย ไม่ว่าจะเป็นงานอีเวนต์ งานแต่งงาน หรือถ่ายภาพผลิตภัณฑ์</p><p>เราให้ความสำคัญกับทุกรายละเอียด เพื่อสร้างภาพที่สวยงามและประทับใจที่สุด</p>",
          "en": "<h2>Professional Photography Service</h2><p>Professional photography team ready to capture every important moment with modern techniques and equipment. Whether it's events, weddings, or product photography.</p><p>We pay attention to every detail to create the most beautiful and impressive images.</p>"
        }),
        features: ["photographer", "event_organizer"],
        album: [],
        price: 8000,
        icon: "camera",
        image: null,
        video: null,
        externalURL: null,
        color: "#e74c3c",
        order: 1,
        isActive: true,
        isDisplayInHome: true
      },
      {
        title: JSON.stringify({
          "th": "จัดงานอีเวนต์",
          "en": "Event Organizer"
        }),
        description: JSON.stringify({
          "th": "<h2>บริการจัดงานอีเวนต์ครบวงจร</h2><p>จัดงานอีเวนต์ทุกประเภท ตั้งแต่การวางแผน ออกแบบคอนเซ็ปต์ จัดหาสถานที่ ประสานงานผู้ให้บริการ ไปจนถึงการดำเนินงานในวันจัดงาน</p><ul><li>งานเปิดตัวผลิตภัณฑ์</li><li>งานสัมมนา Workshop</li><li>งานเลี้ยงบริษัท</li><li>งานแต่งงาน</li></ul>",
          "en": "<h2>Complete Event Organization Service</h2><p>Organize all types of events from planning, concept design, venue sourcing, vendor coordination, to event day execution.</p><ul><li>Product Launches</li><li>Seminars & Workshops</li><li>Corporate Events</li><li>Weddings</li></ul>"
        }),
        features: ["event_organizer", "marketing_staff"],
        album: [],
        price: 25000,
        icon: "event",
        image: null,
        video: null,
        externalURL: null,
        color: "#9b59b6",
        order: 2,
        isActive: true,
        isDisplayInHome: true
      },
      {
        title: JSON.stringify({
          "th": "ผลิตคอนเทนต์โซเชียล",
          "en": "Social Content Production"
        }),
        description: JSON.stringify({
          "th": "<h2>สร้างคอนเทนต์โซเชียลมีเดีย</h2><p>ผลิตคอนเทนต์ที่น่าสนใจสำหรับโซเชียลมีเดียทุกแพลตฟอร์ม</p><p><strong>บริการของเรารวมถึง:</strong></p><ul><li>วางแผนและกำหนดกลยุทธ์คอนเทนต์</li><li>ถ่ายภาพและวิดีโอ</li><li>ตัดต่อและออกแบบกราฟิก</li><li>โพสต์และจัดการ Social Media</li></ul>",
          "en": "<h2>Social Media Content Creation</h2><p>Create engaging content for all social media platforms.</p><p><strong>Our services include:</strong></p><ul><li>Content planning and strategy</li><li>Photography and videography</li><li>Editing and graphic design</li><li>Social media posting and management</li></ul>"
        }),
        features: ["content_creator", "graphic_designer", "video_editor"],
        album: [],
        price: 15000,
        icon: "social",
        image: null,
        video: null,
        externalURL: null,
        color: "#3498db",
        order: 3,
        isActive: true,
        isDisplayInHome: true
      },
      {
        title: JSON.stringify({
          "th": "ผลิตวิดีโอโฆษณา",
          "en": "Commercial Video Production"
        }),
        description: JSON.stringify({
          "th": "<h2>ผลิตวิดีโอโฆษณาคุณภาพสูง</h2><p>สร้างวิดีโอโฆษณาที่น่าสนใจและมีประสิทธิภาพ ตั้งแต่การเขียนบท การถ่ายทำ จนถึงการตัดต่อขั้นสุดท้าย</p><h3>ประเภทวิดีโอ</h3><ul><li>วิดีโอโฆษณาทีวี และออนไลน์</li><li>วิดีโอแนะนำผลิตภัณฑ์</li><li>วิดีโอ Corporate</li><li>วิดีโอสั้นสำหรับ Social Media</li></ul>",
          "en": "<h2>High-Quality Commercial Video Production</h2><p>Create engaging and effective commercial videos from scriptwriting, filming, to final editing.</p><h3>Video Types</h3><ul><li>TV & Online Commercials</li><li>Product Showcase Videos</li><li>Corporate Videos</li><li>Short-form Social Media Videos</li></ul>"
        }),
        features: ["video_editor", "photographer", "content_creator"],
        album: [],
        price: 35000,
        icon: "video",
        image: null,
        video: null,
        externalURL: null,
        color: "#f39c12",
        order: 4,
        isActive: true,
        isDisplayInHome: true
      },
      {
        title: JSON.stringify({
          "th": "ออกแบบกราฟิก",
          "en": "Graphic Design"
        }),
        description: JSON.stringify({
          "th": "<h2>บริการออกแบบกราฟิก</h2><p>ออกแบบกราฟิกที่สวยงามและตรงใจสำหรับทุกความต้องการ</p><p>🎨 <strong>บริการของเรา</strong></p><ul><li>ออกแบบโลโก้และ Corporate Identity</li><li>ออกแบบโปสเตอร์และแบนเนอร์</li><li>ออกแบบบรรจุภัณฑ์</li><li>ออกแบบสื่อสิ่งพิมพ์</li><li>กราฟิกสำหรับ Social Media</li></ul>",
          "en": "<h2>Graphic Design Service</h2><p>Beautiful and compelling graphic design for all your needs.</p><p>🎨 <strong>Our Services</strong></p><ul><li>Logo & Corporate Identity Design</li><li>Poster & Banner Design</li><li>Packaging Design</li><li>Print Media Design</li><li>Social Media Graphics</li></ul>"
        }),
        features: ["graphic_designer", "brand_designer"],
        album: [],
        price: 8000,
        icon: "design",
        image: null,
        video: null,
        externalURL: null,
        color: "#27ae60",
        order: 5,
        isActive: true,
        isDisplayInHome: true
      },
      {
        title: JSON.stringify({
          "th": "ทีมการตลาด",
          "en": "Marketing Team"
        }),
        description: JSON.stringify({
          "th": "<h2>ทีมการตลาดมืออาชีพ</h2><p>วางแผนและดำเนินการแคมเปญการตลาดที่มีประสิทธิภาพเพื่อเพิ่มยอดขายและการรับรู้แบรนด์</p><blockquote>\"การตลาดที่ดีคือการเข้าใจลูกค้าและสร้างคุณค่าที่แท้จริงให้กับพวกเขา\"</blockquote><h3>บริการการตลาด</h3><ul><li>วางกลยุทธ์การตลาด</li><li>Digital Marketing</li><li>Social Media Marketing</li><li>Content Marketing</li><li>Influencer Marketing</li></ul>",
          "en": "<h2>Professional Marketing Team</h2><p>Plan and execute effective marketing campaigns to increase sales and brand awareness.</p><blockquote>\"Good marketing is about understanding customers and creating real value for them\"</blockquote><h3>Marketing Services</h3><ul><li>Marketing Strategy</li><li>Digital Marketing</li><li>Social Media Marketing</li><li>Content Marketing</li><li>Influencer Marketing</li></ul>"
        }),
        features: ["marketing_staff", "content_creator"],
        album: [],
        price: 20000,
        icon: "marketing",
        image: null,
        video: null,
        externalURL: null,
        color: "#2c3e50",
        order: 6,
        isActive: true,
        isDisplayInHome: true
      },
      {
        title: JSON.stringify({
          "th": "จัดทีมงานสตาฟ",
          "en": "Staff Outsourcing"
        }),
        description: JSON.stringify({
          "th": "<h2>บริการจัดหาทีมงาน</h2><p>จัดหาทีมงานมืออาชีพสำหรับโปรเจกต์ของคุณ ไม่ว่าจะเป็นงานระยะสั้นหรือระยะยาว</p><p><strong>ประเภททีมงาน:</strong></p><ul><li>ทีมงานอีเวนต์</li><li>ทีมงานการตลาด</li><li>ช่างภาพ / ช่างวิดีโอ</li><li>นักออกแบบ / Content Creator</li><li>พนักงานขาย / Promoter</li></ul><p>ทีมงานของเราผ่านการคัดสรรและฝึกอบรมอย่างดี</p>",
          "en": "<h2>Staff Outsourcing Service</h2><p>Professional team outsourcing for your projects, whether short-term or long-term.</p><p><strong>Team Types:</strong></p><ul><li>Event Staff</li><li>Marketing Team</li><li>Photographers / Videographers</li><li>Designers / Content Creators</li><li>Sales Staff / Promoters</li></ul><p>Our staff are carefully selected and well-trained.</p>"
        }),
        features: ["event_organizer", "marketing_staff"],
        album: [],
        price: 12000,
        icon: "people",
        image: null,
        video: null,
        externalURL: null,
        color: "#34495e",
        order: 7,
        isActive: true,
        isDisplayInHome: true
      },
      {
        title: JSON.stringify({
          "th": "Brand Identity Design",
          "en": "Brand Identity Design"
        }),
        description: JSON.stringify({
          "th": "<h2>ออกแบบ Brand Identity ครบวงจร</h2><p>สร้างเอกลักษณ์ของแบรนด์ที่โดดเด่นและจดจำได้ง่าย</p><h3>✨ บริการออกแบบแบรนด์</h3><ul><li>Logo Design & Branding</li><li>Brand Guideline</li><li>Color Palette & Typography</li><li>Visual Identity System</li><li>Brand Application Design</li></ul><p>เราจะช่วยสร้างเอกลักษณ์ที่สะท้อนตัวตนของแบรนด์คุณ</p>",
          "en": "<h2>Complete Brand Identity Design</h2><p>Create distinctive and memorable brand identity.</p><h3>✨ Branding Services</h3><ul><li>Logo Design & Branding</li><li>Brand Guidelines</li><li>Color Palette & Typography</li><li>Visual Identity System</li><li>Brand Application Design</li></ul><p>We help create an identity that reflects your brand's essence.</p>"
        }),
        features: ["brand_designer", "graphic_designer"],
        album: [],
        price: 30000,
        icon: "brand",
        image: null,
        video: null,
        externalURL: null,
        color: "#e67e22",
        order: 8,
        isActive: true,
        isDisplayInHome: true
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
          "th": "มีประสบการณ์กว่า 15 ปีในด้านการสร้างสรรค์และการออกแบบ เชี่ยวชาญในการผลิตวิดีโอและการจัดงานอีเวนต์",
          "en": "Over 15 years of experience in creativity and design, specializing in video production and event management"
        }),
        image: null,
        link: null,
        socialLinks: JSON.stringify({
          "facebook": "https://facebook.com/somchai",
          "instagram": "https://instagram.com/somchai",
          "linkedin": "https://linkedin.com/in/somchai"
        }),
        order: 1,
        isActive: true,
        isDisplayInHome: true
      },
      {
        name: JSON.stringify({
          "th": "สุดา นักออกแบบ",
          "en": "Suda Designer"
        }),
        position: JSON.stringify({
          "th": "หัวหน้านักออกแบบ",
          "en": "Lead Designer"
        }),
        bio: JSON.stringify({
          "th": "ผู้เชี่ยวชาญด้านการออกแบบกราฟิกและแบรนด์ มีผลงานที่ได้รับรางวัลมากมาย",
          "en": "Expert in graphic and brand design with many award-winning works"
        }),
        image: null,
        link: null,
        socialLinks: JSON.stringify({
          "instagram": "https://instagram.com/suda.design",
          "behance": "https://behance.net/suda"
        }),
        order: 2,
        isActive: true,
        isDisplayInHome: true
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
        link: null,
        socialLinks: JSON.stringify({
          "youtube": "https://youtube.com/terapong",
          "instagram": "https://instagram.com/terapong.video"
        }),
        order: 3,
        isActive: true,
        isDisplayInHome: true
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
        link: null,
        socialLinks: JSON.stringify({
          "facebook": "https://facebook.com/nipa.marketing",
          "linkedin": "https://linkedin.com/in/nipa"
        }),
        order: 4,
        isActive: true,
        isDisplayInHome: true
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
        "th": "เรามุ่งมั่นที่จะสร้างสรรค์บริการที่มีคุณภาพและประทับใจ เพื่อช่วยให้แบรนด์และธุรกิจของลูกค้าเติบโตอย่างยั่งยืน ด้วยทีมงานมืออาชีพและประสบการณ์ที่หลากหลาย",
        "en": "We are committed to creating quality and impressive services to help our clients' brands and businesses grow sustainably with professional teams and diverse experience"
      }),
      visionTitle: JSON.stringify({
        "th": "วิสัยทัศน์",
        "en": "Our Vision"
      }),
      visionText: JSON.stringify({
        "th": "เป็นเอเจนซี่บริการครบวงจรที่เป็นที่ยอมรับและได้รับความไว้วางใจจากลูกค้า ด้วยการนำเสนอผลงานที่สร้างสรรค์และมีคุณภาพสูง",
        "en": "To be a trusted full-service agency recognized and trusted by clients through creative and high-quality work delivery"
      }),
      valuesTitle: JSON.stringify({
        "th": "ค่านิยมของเรา",
        "en": "Our Values"
      }),
      valuesText: JSON.stringify({
        "th": "ความสร้างสรรค์ คุณภาพ ความซื่อสัตย์ และการทำงานเป็นทีม คือหัวใจหลักในการทำงานของเรา เพื่อมอบประสบการณ์ที่ดีที่สุดให้กับลูกค้า",
        "en": "Creativity, Quality, Integrity, and Teamwork are the core values of our work to provide the best experience for clients"
      }),
      historyTitle: JSON.stringify({
        "th": "ประวัติของเรา",
        "en": "Our History"
      }),
      historyText: JSON.stringify({
        "th": "ก่อตั้งขึ้นด้วยความมุ่งมั่นที่จะสร้างสรรค์บริการที่มีคุณภาพ เราได้เติบโตจากทีมเล็กๆ มาเป็นเอเจนซี่ที่มีชื่อเสียงและได้รับความไว้วางใจจากลูกค้าหลายราย",
        "en": "Founded with a commitment to creating quality services, we have grown from a small team to a renowned agency trusted by many clients"
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
      email: "contact@agency.co.th",
      address: JSON.stringify({
        "th": "123 ถนนสุขุมวิท แขวงคลองเตย เขตคลองเตย กรุงเทพฯ 10110",
        "en": "123 Sukhumvit Road, Khlong Toei, Bangkok 10110"
      }),
      businessHours: JSON.stringify({
        "th": "จันทร์-ศุกร์: 9:00-18:00 น.\nเสาร์: 9:00-16:00 น.\nอาทิตย์: ปิด",
        "en": "Monday-Friday: 9:00-18:00\nSaturday: 9:00-16:00\nSunday: Closed"
      }),
      bannerImage: null,
      heroImage: null
    })

    // Create Services Content
    await ServicesContent.create({
      heroTitle: JSON.stringify({
        "th": "สิ่งที่เราทำ",
        "en": "What We Do"
      }),
      heroSubtitle: JSON.stringify({
        "th": "บริการครบวงจรสำหรับทุกความต้องการของคุณ",
        "en": "Complete services for all your needs"
      }),
      heroImage: null
    })

    // Create Team Content
    await TeamContent.create({
      heroTitle: JSON.stringify({
        "th": "ข้อมูลเชิงลึก",
        "en": "Insights"
      }),
      heroSubtitle: JSON.stringify({
        "th": "อ่านเรื่องราวและประสบการณ์จากทีมงานของเรา",
        "en": "Read stories and experiences from our team"
      }),
      heroImage: null
    })

    // Create FAQs
    const faqData = [
      {
        question: JSON.stringify({
          "th": "บริการของคุณครอบคลุมอะไรบ้าง?",
          "en": "What services do you offer?"
        }),
        answer: JSON.stringify({
          "th": "เรามีบริการครบวงจร ตั้งแต่การจัดงานอีเวนต์ การถ่ายภาพและวิดีโอ การออกแบบกราฟิก ไปจนถึงการตลาดดิจิทัล และการจัดหาทีมงาน",
          "en": "We offer complete services from event organization, photography and videography, graphic design, to digital marketing and staff outsourcing"
        }),
        order: 1,
        isActive: true
      },
      {
        question: JSON.stringify({
          "th": "ใช้เวลาในการทำงานนานแค่ไหน?",
          "en": "How long does it take to complete a project?"
        }),
        answer: JSON.stringify({
          "th": "ขึ้นอยู่กับประเภทและขอบเขตของโปรเจค โดยทั่วไปใช้เวลา 1-4 สัปดาห์ เราจะแจ้งไทม์ไลน์ที่ชัดเจนก่อนเริ่มงาน",
          "en": "Depends on project type and scope, typically 1-4 weeks. We provide clear timeline before starting work"
        }),
        order: 2,
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
        order: 3,
        isActive: true
      },
      {
        question: JSON.stringify({
          "th": "ราคาบริการคิดอย่างไร?",
          "en": "How do you calculate service prices?"
        }),
        answer: JSON.stringify({
          "th": "ราคาขึ้นอยู่กับขอบเขตงาน ความซับซ้อน และระยะเวลาในการทำงาน เราจะให้ใบเสนอราคาที่ชัดเจนหลังจากรับฟังความต้องการของคุณ",
          "en": "Prices depend on scope, complexity, and timeline. We provide clear quotations after understanding your requirements"
        }),
        order: 4,
        isActive: true
      },
      {
        question: JSON.stringify({
          "th": "สามารถดูผลงานตัวอย่างได้หรือไม่?",
          "en": "Can I see examples of your work?"
        }),
        answer: JSON.stringify({
          "th": "แน่นอน เรามีพอร์ตโฟลิโอให้ชม และสามารถขอดูผลงานที่เกี่ยวข้องกับโปรเจคของคุณได้",
          "en": "Absolutely! We have portfolio to show and can provide relevant examples for your project"
        }),
        order: 5,
        isActive: true
      }
    ]

    await FAQ.insertMany(faqData)

    // Create Site Settings
    await SiteSettings.create({
      siteName: JSON.stringify({
        "th": "CHILLING HAUS",
        "en": "CHILLING HAUS"
      }),
      siteTagline: JSON.stringify({
        "th": "Agency That Gets You",
        "en": "Agency That Gets You"
      }),
      primaryColor: "#4949e9",
      secondaryColor: "#9333ea",
      socialLinks: JSON.stringify({
        "facebook": "https://facebook.com/chillinghaus",
        "instagram": "https://instagram.com/chillinghaus",
        "twitter": "https://twitter.com/chillinghaus",
        "linkedin": "https://linkedin.com/company/chillinghaus",
        "youtube": "https://youtube.com/chillinghaus"
      }),
      metaDescription: JSON.stringify({
        "th": "เอเจนซี่บริการครบวงจร ตั้งแต่จัดงานอีเวนต์ ถ่ายภาพ วิดีโอ ออกแบบกราฟิก ไปจนถึงการตลาดดิจิทัล",
        "en": "Full-service agency from event organization, photography, videography, graphic design to digital marketing"
      }),
      keywords: JSON.stringify({
        "th": "จัดงานอีเวนต์, ช่างภาพ, วิดีโอ, กราฟิกดีไซน์, การตลาด, digital agency, event organizer",
        "en": "event organization, photographer, video, graphic design, marketing, digital agency, event organizer"
      }),
      contactEmail: JSON.stringify({
        "th": "contact@agency.co.th",
        "en": "contact@agency.co.th"
      }),
      contactPhone: JSON.stringify({
        "th": "02-123-4567",
        "en": "02-123-4567"
      }),
      navbarDisplayMode: "both",
      navbarTextColor: "#1a1a1a",
      navbarBgColor: "rgba(255, 255, 255, 0.98)",
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
