// Theme management for Manage pages only
import { useCMSStore } from '~/stores/cms'
export function useManageTheme() {
  const cmsStore = useCMSStore()

  const initializeTheme = async () => {
    try {
      await cmsStore.fetchSiteSettings()
      const siteSettings = cmsStore.siteSettings
      if (siteSettings?.primaryColor) {
        applyThemeColors(siteSettings)
      }
    } catch (error) {
      console.error('Failed to load site settings for theme:', error)
    }
  }

  const applyThemeColors = (siteSettings: any) => {
    const root = document.documentElement
    const primaryColor = siteSettings.primaryColor

    // Set the main primary color
    root.style.setProperty('--primary-color', primaryColor)

    // Generate darker shade for hover states (reduce lightness by ~10%)
    const primaryDark = adjustColorBrightness(primaryColor, -0.1)
    root.style.setProperty('--primary-dark', primaryDark)

    // Generate lighter shade for backgrounds (increase lightness by ~10%)
    const primaryLight = adjustColorBrightness(primaryColor, 0.1)
    root.style.setProperty('--primary-light', primaryLight)

    // Generate very light shade for backgrounds (increase lightness by ~40%)
    const primaryVeryLight = adjustColorBrightness(primaryColor, 0.4)
    root.style.setProperty('--primary-very-light', primaryVeryLight)

    // Generate shadow color with opacity
    const primaryShadow = hexToRgba(primaryColor, 0.2)
    root.style.setProperty('--primary-shadow', primaryShadow)

    // Set secondary color
    if (siteSettings.secondaryColor) {
      root.style.setProperty('--secondary-color', siteSettings.secondaryColor)
    }
  }

  // Helper function to convert hex to rgba
  const hexToRgba = (hex: string, alpha: number): string => {
    hex = hex.replace('#', '')
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  // Helper function to adjust color brightness
  const adjustColorBrightness = (hex: string, factor: number): string => {
    // Remove # if present
    hex = hex.replace('#', '')

    // Parse RGB
    const r = parseInt(hex.substring(0, 2), 16)
    const g = parseInt(hex.substring(2, 4), 16)
    const b = parseInt(hex.substring(4, 6), 16)

    // Convert to HSL for better brightness control
    const hsl = rgbToHsl(r, g, b)

    // Adjust lightness
    hsl[2] = Math.max(0, Math.min(1, hsl[2] + factor))

    // Convert back to RGB
    const rgb = hslToRgb(hsl[0], hsl[1], hsl[2])

    // Convert to hex
    return '#' + rgb.map(x => {
      const hex = Math.round(x).toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join('')
  }

  const rgbToHsl = (r: number, g: number, b: number): [number, number, number] => {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h: number, s: number, l: number = (max + min) / 2

    if (max === min) {
      h = s = 0 // achromatic
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
        default: h = 0
      }

      h /= 6
    }

    return [h, s, l]
  }

  const hslToRgb = (h: number, s: number, l: number): [number, number, number] => {
    let r: number, g: number, b: number

    if (s === 0) {
      r = g = b = l // achromatic
    } else {
      const hue2rgb = (p: number, q: number, t: number) => {
        if (t < 0) t += 1
        if (t > 1) t -= 1
        if (t < 1/6) return p + (q - p) * 6 * t
        if (t < 1/2) return q
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6
        return p
      }

      const q = l < 0.5 ? l * (1 + s) : l + s - l * s
      const p = 2 * l - q

      r = hue2rgb(p, q, h + 1/3)
      g = hue2rgb(p, q, h)
      b = hue2rgb(p, q, h - 1/3)
    }

    return [r * 255, g * 255, b * 255]
  }

  return {
    initializeTheme,
    applyThemeColors
  }
}