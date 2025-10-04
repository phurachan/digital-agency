import type { BaseState } from './base'

export interface HomeContent {
  id?: string
  heroTitle: string
  heroSubtitle: string
  heroDisplayMode?: string
  ctaText: string
  ctaButtonText: string
  featureTitle: string
  featureDescription: string
  featureImage: string | null
  aboutTitle: string
  aboutDescription: string
  heroImage: string | null
  aboutImage: string | null
  peopleTitle: string
  peopleDescription: string
  createdAt?: string
  updatedAt?: string
}

export interface Service {
  id?: string
  title: string
  description: string
  features: string[] | string
  price?: number
  isActive: boolean
  icon?: string
  image?: string | null
  video?: string | null
  externalURL?: string | null
  color?: string
  order?: number
  createdAt?: string
  updatedAt?: string
}

export interface AboutContent {
  id?: string
  missionTitle: string
  missionText: string
  visionTitle: string
  visionText: string
  valuesTitle: string
  valuesText: string
  historyTitle: string
  historyText: string
  missionImage: string | null
  heroImage: string | null
  createdAt?: string
  updatedAt?: string
}

export interface TeamMember {
  id?: string
  name: string
  position: string
  bio?: string
  image: string | null
  link?: string
  socialLinks?: string
  isActive: boolean
  order?: number
  createdAt?: string
  updatedAt?: string
}

export interface ContactContent {
  id?: string
  title: string
  subtitle: string
  phone: string
  email: string
  address: string
  businessHours: string
  bannerImage: string | null
  heroImage: string | null
  createdAt?: string
  updatedAt?: string
}

export interface FAQ {
  id?: string
  question: string
  answer: string
  isActive: boolean
  order?: number
  createdAt?: string
  updatedAt?: string
}

export interface SiteSettings {
  id?: string
  siteName: string
  siteTagline: string
  primaryColor: string
  secondaryColor: string
  socialLinks: string
  logo: string | null
  favicon: string | null
  navbarDisplayMode?: string
  navbarTextColor?: string
  navbarBgColor?: string
  metaDescription?: string
  keywords?: string
  contactEmail?: string
  contactPhone?: string
  createdAt?: string
  updatedAt?: string
}

export interface ServicesContent {
  id?: string
  heroTitle: string
  heroSubtitle: string
  heroImage: string | null
  createdAt?: string
  updatedAt?: string
}

export interface TeamContent {
  id?: string
  heroTitle: string
  heroSubtitle: string
  heroImage: string | null
  createdAt?: string
  updatedAt?: string
}

export interface HomeContentRequest {
  heroTitle?: string
  heroSubtitle?: string
  heroDisplayMode?: string
  ctaText?: string
  ctaButtonText?: string
  featureTitle?: string
  featureDescription?: string
  featureImage?: string | null
  aboutTitle?: string
  aboutDescription?: string
  heroImage?: string | null
  aboutImage?: string | null
  peopleTitle?: string
  peopleDescription?: string
}

export interface ServiceRequest {
  id?: string
  title?: string
  description?: string
  features?: string[]
  price?: number
  isActive?: boolean
  icon?: string
  image?: string | null
  video?: string | null
  externalURL?: string | null
  color?: string
  order?: number
}

export interface AboutContentRequest {
  missionTitle?: string
  missionText?: string
  visionTitle?: string
  visionText?: string
  valuesTitle?: string
  valuesText?: string
  historyTitle?: string
  historyText?: string
  missionImage?: string | null
  heroImage?: string | null
}

export interface TeamMemberRequest {
  id?: string
  name?: string
  position?: string
  bio?: string
  image?: string | null
  link?: string
  socialLinks?: string
  isActive?: boolean
  order?: number
}

export interface ContactContentRequest {
  title?: string
  subtitle?: string
  phone?: string
  email?: string
  address?: string
  businessHours?: string
  bannerImage?: string | null
  heroImage?: string | null
}

export interface FAQRequest {
  id?: string
  question?: string
  answer?: string
  isActive?: boolean
  order?: number
}

export interface SiteSettingsRequest {
  siteName?: string
  siteTagline?: string
  primaryColor?: string
  secondaryColor?: string
  socialLinks?: string
  logo?: string | null
  favicon?: string | null
  navbarDisplayMode?: string
  navbarTextColor?: string
  navbarBgColor?: string
  metaDescription?: string
  keywords?: string
  contactEmail?: string
  contactPhone?: string
}

export interface ServicesContentRequest {
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: string | null
}

export interface TeamContentRequest {
  heroTitle?: string
  heroSubtitle?: string
  heroImage?: string | null
}

export interface CMSState extends BaseState {
  homeContent?: HomeContent
  services?: Service[]
  aboutContent?: AboutContent
  teamMembers?: TeamMember[]
  contactContent?: ContactContent
  faqs?: FAQ[]
  siteSettings?: SiteSettings
  servicesContent?: ServicesContent
  teamContent?: TeamContent
}