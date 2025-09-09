import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  // Ensure locale is defined, fallback to 'pt' if undefined
  const validLocale = locale || 'pt';

  try {
    const messages = (await import(`../messages/${validLocale}.json`)).default;
    return {
      locale: validLocale,
      messages
    };
  } catch (error) {
    console.error('Error loading messages for locale:', validLocale, error);
    // Fallback to Portuguese messages
    const messages = (await import(`../messages/pt.json`)).default;
    return {
      locale: 'pt',
      messages
    };
  }
});
