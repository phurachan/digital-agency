import { commonFieldHandlers, type FilterConfig } from '../queryParser'

/**
 * Create filter config for Service model
 */
export const createServiceFilterConfig = (): FilterConfig => ({
  features: commonFieldHandlers.stringOrArray('features'),
})