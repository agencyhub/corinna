import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

const locales = ['en', 'pt'];

export default getRequestConfig(async ({ locale }) => {
  console.log('i18n request.ts - locale received:', locale);

  // Validate that the incoming `locale` parameter is valid
  if (!locale || !locales.includes(locale as any)) {
    console.log('i18n request.ts - invalid locale, calling notFound()');
    notFound();
  }

  // Use a fallback locale if none is provided
  const effectiveLocale = locale || 'pt';
  console.log('i18n request.ts - using locale:', effectiveLocale);

  try {
    const messages = (await import(`../messages/${effectiveLocale}.json`)).default;
    console.log('i18n request.ts - messages loaded successfully');
    return { messages };
  } catch (error) {
    console.error('i18n request.ts - error loading messages:', error);
    // Fallback to empty messages
    return { messages: {} };
  }
});
