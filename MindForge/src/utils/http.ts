import axios from 'axios'
import { createClient as createBrowserClient } from './supabase/client'
import { createClient as createServerClient } from './supabase/server'

// Create axios instance with base configuration
const http = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Helper to get the appropriate Supabase client
const getSupabaseClient = async () => {
  // Check if we're in a browser environment
  if (typeof window !== 'undefined') {
    return createBrowserClient()
  }
  // Server environment
  return await createServerClient()
}

// Helper to get the session token
const getSessionToken = async () => {
  try {
    const supabase = await getSupabaseClient()
    const { data: { session }, error } = await supabase.auth.getSession()
    
    if (error) {
      console.error('Error getting session:', error)
      return null
    }
    
    if (!session?.access_token) {
      console.warn('No access token found in session')
      return null
    }
    
    return session.access_token
  } catch (error) {
    console.error('Error in getSessionToken:', error)
    return null
  }
}

// Request interceptor for adding auth token
http.interceptors.request.use(
  async (config: any) => {
    try {
      // Get the session token
      const token = await getSessionToken()
      
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      } else {
        console.warn('No auth token available for request:', config.url)
      }
      
      return config
    } catch (error) {
      console.error('Error in request interceptor:', error)
      return Promise.reject(error)
    }
  },
  (error: any) => {
    console.error('Request interceptor error:', error)
    return Promise.reject(error)
  }
)

// Response interceptor for handling common errors
http.interceptors.response.use(
  (response: any) => response,
  async (error: any) => {
    const originalRequest = error.config as any & { _retry?: boolean }

    // Log the error details
    console.error('Response error:', {
      status: error.response?.status,
      url: originalRequest?.url,
      method: originalRequest?.method,
      headers: originalRequest?.headers,
      error: error.message
    })

    // Handle 401 Unauthorized errors
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true

      try {
        const supabase = await getSupabaseClient()
        
        // Try to refresh the session
        const { data: { session }, error: refreshError } = await supabase.auth.refreshSession()
        
        if (refreshError) {
          console.error('Session refresh error:', refreshError)
          throw refreshError
        }
        
        if (session?.access_token) {
          // Update the authorization header
          originalRequest.headers.Authorization = `Bearer ${session.access_token}`
          // Retry the original request
          return http(originalRequest)
        } else {
          console.warn('No access token after session refresh')
          // If refresh fails, redirect to login
          if (typeof window !== 'undefined') {
            window.location.href = '/auth/login'
          }
          return Promise.reject(new Error('No access token after refresh'))
        }
      } catch (refreshError) {
        console.error('Error in refresh flow:', refreshError)
        // If refresh fails, redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = '/auth/login'
        }
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default http 