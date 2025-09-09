import { authMiddleware } from '@clerk/nextjs';
import createIntlMiddleware from 'next-intl/middleware';

const intlMiddleware = createIntlMiddleware({
  locales: ['en', 'pt'],
  defaultLocale: 'pt'
});

export default authMiddleware({
  beforeAuth: (req) => {
    return intlMiddleware(req);
  },
  publicRoutes: [
    '/',
    '/pt',
    '/en',
    '/pt/auth/(.*)',
    '/en/auth/(.*)',
    '/api/webhooks/(.*)',
    '/api/stripe/(.*)',
    '/embed.js',
    '/portal/(.*)',
    '/chatbot',
    '/chatbot-iframe',
    '/blogs/(.*)'
  ]
});

export const config = {
  matcher: ['/', '/(pt|en)/:path*', '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)', '/(api|trpc)(.*)']
};
