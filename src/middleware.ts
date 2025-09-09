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
    '/chatbot-iframe',
  ],
  // Explicitly ignore embed routes from auth checks
  ignoredRoutes: ['/chatbot', '/chatbot-iframe', '/api/embed', '/embed.js'],
  // Add debug mode to help with clock skew issues
  debug: true,
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
