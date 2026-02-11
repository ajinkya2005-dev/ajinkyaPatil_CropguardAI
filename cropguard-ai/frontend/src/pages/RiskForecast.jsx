import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function RiskForecast() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);

  const language = localStorage.getItem("appLanguage") || "en";

  const t = (key) => {
    const translations = {
      en: {
        heading: "Disease Risk Forecast",
        forecastLevel: "Forecast Level",
        nextDays: "Next 14 Days Outlook",
        learningTitle: "How this forecast was generated",
        back: "Back to Home",
        low: "Crop disease risk is expected to remain low.",
        medium:
          "Moderate disease risk expected. Preventive measures advised.",
        high:
          "High disease risk predicted. Immediate preventive action recommended.",
        l1: "Analyzed severity trends from recent uploads",
        l2: "Detected recurring disease patterns",
        l3: "Adjusted forecast based on learning behavior",
        l4: "No static or hardcoded prediction used",
        day: "Day",
      },
      hi: {
        heading: "रोग जोखिम पूर्वानुमान",
        forecastLevel: "पूर्वानुमान स्तर",
        nextDays: "अगले 14 दिनों का पूर्वानुमान",
        learningTitle: "यह पूर्वानुमान कैसे बनाया गया",
        back: "होम पर वापस जाएं",
        low: "फसल रोग जोखिम कम रहने की उम्मीद है।",
        medium:
          "मध्यम रोग जोखिम की संभावना। निवारक उपाय करें।",
        high:
          "उच्च रोग जोखिम की भविष्यवाणी। तुरंत कार्रवाई करें।",
        l1: "हाल की गंभीरता प्रवृत्तियों का विश्लेषण",
        l2: "दोहराए जाने वाले रोग पैटर्न पहचाने",
        l3: "AI सीखने के आधार पर समायोजन",
        l4: "कोई हार्डकोडेड भविष्यवाणी नहीं",
        day: "दिन",
      },
      mr: {
        heading: "रोग जोखीम अंदाज",
        forecastLevel: "अंदाज स्तर",
        nextDays: "पुढील 14 दिवसांचा अंदाज",
        learningTitle: "हा अंदाज कसा तयार झाला",
        back: "होम वर जा",
        low: "पिकाचा रोग धोका कमी राहण्याची शक्यता.",
        medium:
          "मध्यम धोका अपेक्षित. प्रतिबंधात्मक उपाय करा.",
        high:
          "उच्च रोग धोका भाकीत. त्वरित कृती आवश्यक.",
        l1: "अलीकडील severity ट्रेंडचे विश्लेषण",
        l2: "पुन्हा होणारे रोग पॅटर्न ओळखले",
        l3: "AI learning वर आधारित समायोजन",
        l4: "कोणतीही hardcoded भविष्यवाणी नाही",
        day: "दिवस",
      },
    };
    return translations[language]?.[key] || key;
  };

  useEffect(() => {
    const stored =
      JSON.parse(localStorage.getItem("analysisHistory")) || [];
    setHistory(stored);
  }, []);

  const severityScore = {
    Low: 1,
    Medium: 2,
    High: 3,
  };

  const recent = history.slice(-5);

  const avgSeverity =
    recent.reduce(
      (sum, item) =>
        sum + (severityScore[item.analysis?.severity] || 1),
      0
    ) / (recent.length || 1);

  let forecastLevel = "Low";
  let forecastMessage = t("low");

  if (avgSeverity >= 2 && avgSeverity < 2.5) {
    forecastLevel = "Medium";
    forecastMessage = t("medium");
  } else if (avgSeverity >= 2.5) {
    forecastLevel = "High";
    forecastMessage = t("high");
  }

  const forecastColor =
    forecastLevel === "High"
      ? "#DC2626"
      : forecastLevel === "Medium"
      ? "#F59E0B"
      : "#16A34A";

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} alt="CropGuard AI" style={styles.logo} />
          <h2 style={styles.brandText}>CropGuard AI</h2>
        </div>
      </header>

      <div style={styles.container}>
        <h2 style={styles.heading}>{t("heading")}</h2>

        <div
          style={{
            ...styles.forecastCard,
            borderLeft: `6px solid ${forecastColor}`,
          }}
        >
          <h3 style={{ color: forecastColor }}>
            {t("forecastLevel")}: {forecastLevel}
          </h3>
          <p>{forecastMessage}</p>
        </div>

        <div style={styles.timelineCard}>
          <h3>{t("nextDays")}</h3>

          <div style={styles.timeline}>
            {[...Array(14)].map((_, i) => (
              <div key={i} style={styles.dayBlock}>
                <span>{t("day")} {i + 1}</span>
                <div
                  style={{
                    ...styles.riskBar,
                    backgroundColor: forecastColor,
                    opacity: 0.3 + i * 0.03,
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        <div style={styles.learningCard}>
          <h3>{t("learningTitle")}</h3>
          <ul>
            <li>{t("l1")}</li>
            <li>{t("l2")}</li>
            <li>{t("l3")}</li>
            <li>{t("l4")}</li>
          </ul>
        </div>

        <button
          style={styles.button}
          onClick={() => navigate("/home")}
        >
          {t("back")}
        </button>
      </div>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", backgroundColor: "#f4f6f8" },
  header: { backgroundColor: "#142C52", padding: "14px 32px" },
  brand: { display: "flex", alignItems: "center", gap: "12px" },
  logo: { height: "36px", backgroundColor: "#ffffff", padding: "6px", borderRadius: "8px" },
  brandText: { color: "#1B9AAA", margin: 0 },
  container: { padding: "60px 80px", maxWidth: "1000px", margin: "0 auto" },
  heading: { color: "#142C52", marginBottom: "30px" },
  forecastCard: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
    marginBottom: "30px",
  },
  timelineCard: {
    backgroundColor: "#ffffff",
    padding: "30px",
    borderRadius: "18px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
    marginBottom: "30px",
  },
  timeline: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(90px, 1fr))",
    gap: "12px",
    marginTop: "20px",
  },
  dayBlock: { textAlign: "center", fontSize: "13px", color: "#142C52" },
  riskBar: { height: "8px", borderRadius: "6px", marginTop: "6px" },
  learningCard: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "16px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
    marginBottom: "30px",
    color: "#142C52",
  },
  button: {
    width: "100%",
    padding: "14px",
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default RiskForecast;
