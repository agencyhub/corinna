import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async ({ locale }) => {
  try {
    const messages = (await import(`../messages/${locale}.json`)).default;
    return {
      locale,
      messages
    };
  } catch (error) {
    console.error('Error loading messages for locale:', locale, error);
    // Fallback to Portuguese messages
    const messages = (await import(`../messages/pt.json`)).default;
    return {
      locale: 'pt',
      messages
    };
  }
});
