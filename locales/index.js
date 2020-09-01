import i18next from "i18next";
import detector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

// Internal
import translationNL from "./nl";

const resources = {
  nl: { translation: translationNL }
};

i18next
  .use(detector)
  .use(initReactI18next)
  .init({
    detection: {
      order: [
        "querystring",
        "navigator",
        "localStorage",
        "cookie",
        "htmlTag",
        "path",
        "subdomain"
      ],

      // keys or params to lookup language from
      lookupQuerystring: "lng",
      caches: ["localStorage", "cookie"]
    },
    interpolation: {
      // React already does escaping to prevent xss attacks
      escapeValue: false
    },
    fallbackLng: "nl",
    debug: false,
    resources
  })
  .then(t => console.log("i18next is initialized, translations ready..."));

export default i18next;
