import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/auth(.*)',
    '/portal(.*)',
    '/images(.*)',
    // Embed routes must be public
    '/api/embed',
    '/embed.js',
    '/chatbot',
  ],
  // Explicitly ignore embed routes from auth checks
  ignoredRoutes: ['/chatbot', '/api/embed', '/embed.js'],
})

export const config = {
  // Exclude all static assets with extensions and Next internals from middleware
  matcher: [
    // Everything except files with extensions and _next
    '/((?!_next/|_vercel|.*\\..*).*)',
    '/',
    // Apply to API and trpc routes, but embed routes will be ignored by ignoredRoutes
    '/(api|trpc)(.*)'
  ],
}
