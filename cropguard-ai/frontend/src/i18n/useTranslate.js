import { useLanguage } from "../context/LanguageContext";
import { translations } from "./translations";

export function useTranslate() {
  const { language } = useLanguage();

  const t = (key) => {
    return translations[language]?.[key] || key;
  };

  return { t, language };
}
