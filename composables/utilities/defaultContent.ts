import type {
  HomeContent,
  SiteSettings,
  ServicesContent,
  TeamContent,
  AboutContent,
  ContactContent
} from '~/composables/store_models/cms'

export const getDefaultHomeContent = (): HomeContent => ({
  heroTitle: 'Elevate Your Digital Presence',
  heroSubtitle: 'We craft innovative digital marketing solutions that drive growth, boost engagement, and transform your business for the digital age.',
  ctaText: 'Ready to Get Started?',
  ctaButtonText: 'Start Your Journey',
  featureTitle: 'Expert Management Solutions',
  featureDescription: 'Streamline your business operations and enhance productivity',
  featureImage: null,
  aboutTitle: 'Why Choose Us?',
  aboutDescription: 'With over a decade of experience in digital marketing, we\'ve helped hundreds of businesses transform their online presence and achieve remarkable growth.',
  heroImage: null,
  aboutImage: null,
  peopleTitle: 'Meet Our People',
  peopleDescription: 'Get to know the talented individuals who drive our success and make exceptional results possible'
})

export const getDefaultSiteSettings = (): SiteSettings => ({
  siteName: 'Digital Agency',
  siteTagline: 'Elevating brands through innovative digital marketing solutions',
  primaryColor: '#6495ed',
  secondaryColor: '#9333ea',
  socialLinks: JSON.stringify({
    twitter: '#',
    linkedin: '#',
    facebook: '#'
  }),
  logo: null,
  favicon: null,
  navbarDisplayMode: 'both',
  metaDescription: 'Elevating brands through innovative digital marketing solutions',
  keywords: 'digital marketing, web development, SEO, social media',
  contactEmail: 'hello@digitalagency.com',
  contactPhone: '+1 (555) 123-4567'
})

export const getDefaultServicesContent = (): ServicesContent => ({
  heroTitle: 'Digital Marketing Services',
  heroSubtitle: 'Transform your business with comprehensive digital marketing solutions that drive growth, increase visibility, and maximize your ROI.',
  heroImage: null
})

export const getDefaultTeamContent = (): TeamContent => ({
  heroTitle: 'Meet Our People',
  heroSubtitle: 'Get to know the talented individuals who drive our success and make exceptional results possible.',
  heroImage: null
})

export const getDefaultAboutContent = (): AboutContent => ({
  missionTitle: 'Our Mission',
  missionText: 'We believe every business deserves to succeed online.',
  visionTitle: 'Our Vision',
  visionText: 'To become the leading digital marketing agency that transforms businesses through innovative technology.',
  valuesTitle: 'Our Values',
  valuesText: 'Excellence, Transparency, Innovation - these core values guide everything we do.',
  historyTitle: 'Our Journey',
  historyText: 'From startup to industry leader, we\'ve been helping businesses grow since 2015.',
  missionImage: null,
  heroImage: null
})

export const getDefaultContactContent = (): ContactContent => ({
  title: 'Get In Touch',
  subtitle: 'Ready to transform your digital presence? Let\'s discuss how we can help accelerate your business growth.',
  phone: '+1 (555) 123-4567',
  email: 'hello@example.com',
  address: '123 Innovation Drive, Tech Valley, CA 94105',
  businessHours: JSON.stringify({
    'Monday - Friday': '9:00 AM - 6:00 PM',
    'Saturday': '10:00 AM - 4:00 PM',
    'Sunday': 'Closed'
  }),
  bannerImage: null,
  heroImage: null
})