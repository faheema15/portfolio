import { clsx } from "clsx"

export function cn(...inputs) {
  return clsx(inputs)
}

// Email validation
export function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Phone validation
export function validatePhone(phone) {
  const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
  return phoneRegex.test(phone.replace(/[-.\s()]/g, ''))
}

// Sanitize input text
export function sanitizeText(text) {
  return text.trim().replace(/[<>]/g, '')
}

// Format date
export function formatDate(date) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Truncate text
export function truncateText(text, maxLength) {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength) + '...'
}

// Debounce function
export function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function - Fixed version
export function throttle(func, limit) {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Smooth scroll to element
export function scrollToElement(elementId, offset = 0) {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top
    const offsetPosition = elementPosition + window.pageYOffset - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

// Check if element is in viewport
export function isInViewport(element) {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

// Generate random ID
export function generateId() {
  return Math.random().toString(36).substr(2, 9)
}

// Local storage helpers
export const storage = {
  get(key, defaultValue = null) {
    if (typeof window !== 'undefined') {
      try {
        const item = window.localStorage.getItem(key)
        return item ? JSON.parse(item) : defaultValue
      } catch (error) {
        console.error('Error getting from localStorage:', error)
        return defaultValue
      }
    }
    return defaultValue
  },

  set(key, value) {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(key, JSON.stringify(value))
      } catch (error) {
        console.error('Error setting to localStorage:', error)
      }
    }
  },

  remove(key) {
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(key)
      } catch (error) {
        console.error('Error removing from localStorage:', error)
      }
    }
  }
}

// Theme helpers
export const theme = {
  get() {
    return storage.get('theme', 'light')
  },

  set(newTheme) {
    storage.set('theme', newTheme)
    if (typeof window !== 'undefined') {
      document.documentElement.classList.toggle('dark', newTheme === 'dark')
    }
  },

  toggle() {
    const currentTheme = this.get()
    const newTheme = currentTheme === 'light' ? 'dark' : 'light'
    this.set(newTheme)
    return newTheme
  }
}

// Performance helpers
export function preloadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = resolve
    img.onerror = reject
    img.src = src
  })
}

// URL helpers
export function getBaseUrl() {
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  return process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'
}

// Animation helpers
export function fadeIn(element, duration = 300) {
  element.style.opacity = 0
  element.style.display = 'block'

  let start = null
  function animate(timestamp) {
    if (!start) start = timestamp
    const progress = timestamp - start
    element.style.opacity = Math.min(progress / duration, 1)

    if (progress < duration) {
      requestAnimationFrame(animate)
    }
  }
  requestAnimationFrame(animate)
}

export function fadeOut(element, duration = 300) {
  let start = null
  function animate(timestamp) {
    if (!start) start = timestamp
    const progress = timestamp - start
    element.style.opacity = Math.max(1 - progress / duration, 0)

    if (progress < duration) {
      requestAnimationFrame(animate)
    } else {
      element.style.display = 'none'
    }
  }
  requestAnimationFrame(animate)
}