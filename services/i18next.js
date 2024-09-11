import i18next from 'i18next';
import english from '../locals/english.json';
import hindi from '../locals/hindi.json';
import tamil from '../locals/tamil.json';
import {initReactI18next} from 'react-i18next';
export const languageResources = {
  en: {translation: english},
  hi: {translation: hindi},
  ta: {translation: tamil},
};

i18next.use(initReactI18next).init({
  compatibilityJSON: 'v3',
  lng: 'english',
  fallbackLng: 'english',
  resources: languageResources,
});

export default i18next;
