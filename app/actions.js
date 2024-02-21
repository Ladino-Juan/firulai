

import { i18n } from '@/i18n.config'
  
  const dictionaries = {
    en: import('@/locales/en.js').then((module) => module.default),
    es: import('@/locales/es.js').then((module) => module.default),
  };
  
  const getlocales = async (locale) => {
    try {
      const dictionary = await dictionaries[locale];
      if (!dictionary) {
        console.warn(
          `Dictionary not found for locale '${locale}', falling back to default locale '${i18n.defaultLocale}'`
        );
        return await dictionaries[i18n.defaultLocale];
      }
      return dictionary;
    } catch (error) {
      console.error(`Error loading dictionary for locale '${locale}': ${error}`);
      return await dictionaries[i18n.defaultLocale];
    }
  };
  
  export { i18n, getlocales };