import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

// List of public paths that don't require authentication
const publicPaths = [
  '/auth/login',
  '/auth/signup',
  '/auth/forgot-password',
  '/auth/reset-password',
  '/auth/confirm',
  '/auth/callback',
  '/error',
  '/api',
  '/_next',
  '/favicon.ico',
  '/assets',
]

// List of shared paths accessible by both roles
const sharedPaths = [
  '/profile',
  '/saved',
  '/messages',
  '/orders',
]

export async function middleware(request: NextRequest) {
  // Create response object
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  // Create Supabase client
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          })
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          })
        },
      },
    }
  )

  // Get the current path
  const path = request.nextUrl.pathname

  // Check if the path is public
  const isPublicPath = publicPaths.some(publicPath => path.startsWith(publicPath))
  if (isPublicPath) {
    return response
  }

  // Get user session
  const { data: { user }, error } = await supabase.auth.getUser()

  // If no valid user or error occurred, redirect to login
  if (!user || error) {
    const loginUrl = new URL('/auth/login', request.url)
    loginUrl.searchParams.set('redirectTo', path)
    return NextResponse.redirect(loginUrl)
  }

  // Get user role from metadata
  const role = user.user_metadata.role || 'STUDENT'

  // Check if the path is shared
  const isSharedPath = sharedPaths.some(sharedPath => path.startsWith(sharedPath))
  if (isSharedPath) {
    return response
  }

  // Handle role-based routing
  if (role === 'TUTOR') {
    // If tutor tries to access student routes, redirect to tutor dashboard
    if (path === '/' || path.startsWith('/(student)')) {
      return NextResponse.redirect(new URL('/tutor', request.url))
    }
  } else {
    // If student tries to access tutor routes, redirect to student dashboard
    if (path.startsWith('/tutor')) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}