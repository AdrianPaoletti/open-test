import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import formsEs from "./locales/es/forms.json";
import regionsEs from "./locales/es/regions.json";
import formsEn from "./locales/en/forms.json";
import regionsEn from "./locales/en/regions.json";

const resources = {
  es: {
    forms: formsEs,
    regions: regionsEs,
  },
  en: {
    forms: formsEn,
    regions: regionsEn,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init(
    {
      resources,
      defaultNS: "common",
      keySeparator: false,
      fallbackLng: "es",
      interpolation: {
        escapeValue: false,
      },
      load: "languageOnly",
      detection: { order: ["localStorage", "navigator"] },
    },
    (error: any) => {
      if (error) {
        // Log error here
      } else {
        // i18n succesfully initiated
      }
    }
  );

export default i18n;
