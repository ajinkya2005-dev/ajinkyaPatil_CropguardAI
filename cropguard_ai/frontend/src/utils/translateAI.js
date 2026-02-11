export function translateAIText(text, language) {
  if (!text) return text;

  if (language === "hi") {
    return text
      .replace("High Risk", "उच्च जोखिम")
      .replace("Medium Risk", "मध्यम जोखिम")
      .replace("Low Risk", "कम जोखिम");
  }

  if (language === "mr") {
    return text
      .replace("High Risk", "उच्च धोका")
      .replace("Medium Risk", "मध्यम धोका")
      .replace("Low Risk", "कमी धोका");
  }

  return text;
}
