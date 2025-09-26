import { defineStore } from 'pinia'
import { API_ENDPOINTS } from '~/composables/constants/api'
import type { BaseRequestData } from '~/composables/store_models/base'
import { initState, loadingState, successState, errorState } from '~/composables/store_models/base'
import type {
  CMSState,
  HomeContent,
  HomeContentRequest,
  Service,
  ServiceRequest,
  AboutContent,
  AboutContentRequest,
  TeamMember,
  TeamMemberRequest,
  ContactContent,
  ContactContentRequest,
  FAQ,
  FAQRequest,
  SiteSettings,
  SiteSettingsRequest,
  ServicesContent,
  ServicesContentRequest,
  TeamContent,
  TeamContentRequest
} from '~/composables/store_models/cms'
import { useHttpClient } from '~/composables/utilities/useHttpClient'
import { BaseResponseError } from '~/composables/utility_models/http'
import {
  getDefaultHomeContent,
  getDefaultSiteSettings,
  getDefaultServicesContent,
  getDefaultTeamContent,
  getDefaultAboutContent,
  getDefaultContactContent
} from '~/composables/utilities/defaultContent'

export const useCMSStore = defineStore('cms', {
  state: (): CMSState => ({
    ...initState,
    homeContent: undefined,
    services: [],
    aboutContent: undefined,
    teamMembers: [],
    contactContent: undefined,
    faqs: [],
    siteSettings: undefined,
    servicesContent: undefined,
    teamContent: undefined
  }),

  getters: {
    getServiceById: (state) => (id: string) => state.services?.find((service: Service) => service.id === id),
    getActiveServices: (state) => state.services?.filter((service: Service) => service.isActive !== false) || [],
    getTeamMemberById: (state) => (id: string) => state.teamMembers?.find((member: TeamMember) => member.id === id),
    getActiveTeamMembers: (state) => state.teamMembers?.filter((member: TeamMember) => member.isActive !== false) || [],
    getFAQById: (state) => (id: string) => state.faqs?.find((faq: FAQ) => faq.id === id),
    getActiveFAQs: (state) => state.faqs?.filter((faq: FAQ) => faq.isActive !== false) || []
  },

  actions: {
    async fetchHomeContent(requestData: BaseRequestData = {}) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.get(API_ENDPOINTS.CMS.HOME_CONTENT.GET)

        this.$patch(successState(response))
        this.homeContent = response?.data || getDefaultHomeContent()

        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        this.homeContent = getDefaultHomeContent()
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async updateHomeContent(requestData: BaseRequestData<HomeContentRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.post(
          API_ENDPOINTS.CMS.HOME_CONTENT.POST,
          requestData.body
        )

        this.$patch(successState(response))
        this.homeContent = response?.data || this.homeContent

        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async fetchServices(requestData: BaseRequestData = {}) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.get(API_ENDPOINTS.CMS.SERVICES.GET)

        this.$patch(successState(response))
        const servicesWithParsedFeatures = response?.data?.map((service: Service) => ({
          ...service,
          features: typeof service.features === 'string'
            ? JSON.parse(service.features)
            : Array.isArray(service.features)
              ? service.features
              : []
        })) || []
        this.services = servicesWithParsedFeatures

        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        this.services = []
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async createService(requestData: BaseRequestData<ServiceRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.post(
          API_ENDPOINTS.CMS.SERVICES.POST,
          requestData.body
        )

        this.$patch(successState(response))
        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async updateService(requestData: BaseRequestData<ServiceRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.put(
          API_ENDPOINTS.CMS.SERVICES.PUT(requestData.body!.id!),
          requestData.body
        )

        this.$patch(successState(response))
        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async deleteService(requestData: BaseRequestData<{ id: string }>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.delete(
          API_ENDPOINTS.CMS.SERVICES.DELETE(requestData.body!.id)
        )

        this.$patch(successState(response))
        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async fetchAboutContent(requestData: BaseRequestData = {}) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.get(API_ENDPOINTS.CMS.ABOUT_CONTENT.GET)

        this.$patch(successState(response))
        this.aboutContent = response?.data || getDefaultAboutContent()

        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        this.aboutContent = getDefaultAboutContent()
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async updateAboutContent(requestData: BaseRequestData<AboutContentRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.post(
          API_ENDPOINTS.CMS.ABOUT_CONTENT.POST,
          requestData.body
        )

        this.$patch(successState(response))
        this.aboutContent = response?.data || this.aboutContent

        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async fetchTeamMembers(requestData: BaseRequestData = {}) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.get(API_ENDPOINTS.CMS.TEAM.GET)

        this.$patch(successState(response))
        this.teamMembers = response?.data || []

        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        this.teamMembers = []
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async createTeamMember(requestData: BaseRequestData<TeamMemberRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.post(
          API_ENDPOINTS.CMS.TEAM.POST,
          requestData.body
        )

        this.$patch(successState(response))
        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async updateTeamMember(requestData: BaseRequestData<TeamMemberRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.put(
          API_ENDPOINTS.CMS.TEAM.PUT(requestData.body!.id!),
          requestData.body
        )

        this.$patch(successState(response))
        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async deleteTeamMember(requestData: BaseRequestData<{ id: string }>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.delete(
          API_ENDPOINTS.CMS.TEAM.DELETE(requestData.body!.id)
        )

        this.$patch(successState(response))
        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async fetchContactContent(requestData: BaseRequestData = {}) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.get(API_ENDPOINTS.CMS.CONTACT_CONTENT.GET)

        this.$patch(successState(response))
        this.contactContent = response?.data || getDefaultContactContent()

        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        this.contactContent = getDefaultContactContent()
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async updateContactContent(requestData: BaseRequestData<ContactContentRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.post(
          API_ENDPOINTS.CMS.CONTACT_CONTENT.POST,
          requestData.body
        )

        this.$patch(successState(response))
        this.contactContent = response?.data || this.contactContent

        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async fetchFAQs(requestData: BaseRequestData = {}) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.get(API_ENDPOINTS.CMS.FAQS.GET)

        this.$patch(successState(response))
        this.faqs = response?.data || []

        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        this.faqs = []
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async createFAQ(requestData: BaseRequestData<FAQRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.post(
          API_ENDPOINTS.CMS.FAQS.POST,
          requestData.body
        )

        this.$patch(successState(response))
        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async updateFAQ(requestData: BaseRequestData<FAQRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.put(
          API_ENDPOINTS.CMS.FAQS.PUT(requestData.body!.id!),
          requestData.body
        )

        this.$patch(successState(response))
        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async deleteFAQ(requestData: BaseRequestData<{ id: string }>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.delete(
          API_ENDPOINTS.CMS.FAQS.DELETE(requestData.body!.id)
        )

        this.$patch(successState(response))
        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async fetchSiteSettings(requestData: BaseRequestData = {}) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.get(API_ENDPOINTS.CMS.SITE_SETTINGS.GET)

        this.$patch(successState(response))
        this.siteSettings = response?.data || getDefaultSiteSettings()

        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        this.siteSettings = getDefaultSiteSettings()
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async updateSiteSettings(requestData: BaseRequestData<SiteSettingsRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.post(
          API_ENDPOINTS.CMS.SITE_SETTINGS.POST,
          requestData.body
        )

        this.$patch(successState(response))
        this.siteSettings = response?.data || this.siteSettings

        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async fetchServicesContent(requestData: BaseRequestData = {}) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.get(API_ENDPOINTS.CMS.SERVICES_CONTENT.GET)

        this.$patch(successState(response))
        this.servicesContent = response?.data || getDefaultServicesContent()

        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        this.servicesContent = getDefaultServicesContent()
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async updateServicesContent(requestData: BaseRequestData<ServicesContentRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.post(
          API_ENDPOINTS.CMS.SERVICES_CONTENT.POST,
          requestData.body
        )

        this.$patch(successState(response))
        this.servicesContent = response?.data || this.servicesContent

        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async fetchTeamContent(requestData: BaseRequestData = {}) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.get(API_ENDPOINTS.CMS.TEAM_CONTENT.GET)

        this.$patch(successState(response))
        this.teamContent = response?.data || getDefaultTeamContent()

        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        this.teamContent = getDefaultTeamContent()
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    },

    async updateTeamContent(requestData: BaseRequestData<TeamContentRequest>) {
      try {
        this.$patch(loadingState(requestData))

        const httpClient = useHttpClient()
        const response = await httpClient.post(
          API_ENDPOINTS.CMS.TEAM_CONTENT.POST,
          requestData.body
        )

        this.$patch(successState(response))
        this.teamContent = response?.data || this.teamContent

        return response
      } catch (error: any) {
        this.$patch(errorState({ ...(error || {}) }))
        throw new BaseResponseError(error?.data || error)
      } finally {
        this.isLoading = false
      }
    }
  }
})