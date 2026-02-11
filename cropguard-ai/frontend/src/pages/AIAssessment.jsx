import { useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function AIAssessment() {
  const navigate = useNavigate();
  const storedAnalysis = JSON.parse(localStorage.getItem("lastAnalysis"));
  const farmProfile = JSON.parse(localStorage.getItem("farmerProfile"));

  const language = localStorage.getItem("appLanguage") || "en";

  const t = (key) => {
    const translations = {
      en: {
        title: "AI Crop Health Assessment",
        findings: "AI Findings",
        crop: "Crop",
        disease: "Disease / Pest",
        severity: "Severity",
        confidence: "Confidence",
        stage: "Growth Stage",
        location: "Location",
        explain: "Explainable AI",
        why: "Why?",
        action: "Personalized Action Plan",
        immediate: "Immediate Actions",
        short: "Short-Term Actions",
        preventive: "Preventive Strategy",
        general: "General Crop Care Guidelines (Non-AI)",
        back: "Back to Home",
      },
      hi: {
        title: "एआई फसल स्वास्थ्य मूल्यांकन",
        findings: "एआई निष्कर्ष",
        crop: "फसल",
        disease: "रोग / कीट",
        severity: "गंभीरता",
        confidence: "विश्वास स्तर",
        stage: "विकास चरण",
        location: "स्थान",
        explain: "व्याख्यात्मक एआई",
        why: "क्यों?",
        action: "व्यक्तिगत कार्य योजना",
        immediate: "तत्काल कार्य",
        short: "कम अवधि के कार्य",
        preventive: "रोकथाम रणनीति",
        general: "सामान्य फसल देखभाल दिशानिर्देश",
        back: "होम पर वापस जाएं",
      },
      mr: {
        title: "एआय पीक आरोग्य मूल्यांकन",
        findings: "एआय निष्कर्ष",
        crop: "पीक",
        disease: "रोग / कीड",
        severity: "तीव्रता",
        confidence: "विश्वास",
        stage: "वाढीचा टप्पा",
        location: "स्थान",
        explain: "स्पष्टीकरणीय एआय",
        why: "का?",
        action: "वैयक्तिक कृती योजना",
        immediate: "तत्काळ कृती",
        short: "लघुकालीन कृती",
        preventive: "प्रतिबंधात्मक रणनीती",
        general: "सामान्य पीक काळजी मार्गदर्शक",
        back: "होमवर जा",
      },
    };
    return translations[language]?.[key] || key;
  };

  const [showExplain, setShowExplain] = useState(false);

  if (!storedAnalysis || !farmProfile) {
    return null;
  }

  const { analysis } = storedAnalysis;
  const { cropType, location, growthStage } = farmProfile;

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} alt="CropGuard AI" style={styles.logo} />
          <h2 style={styles.brandText}>CropGuard AI</h2>
        </div>
      </header>

      <div style={styles.container}>
        <h2 style={styles.pageTitle}>{t("title")}</h2>

        <div style={styles.cardHighlight}>
          <h3 style={styles.sectionTitle}>{t("findings")}</h3>
          <p><strong>{t("crop")}:</strong> {cropType}</p>
          <p><strong>{t("disease")}:</strong> {analysis.disease}</p>
          <p><strong>{t("severity")}:</strong> {analysis.severity}</p>
          <p><strong>{t("confidence")}:</strong> {analysis.confidence * 100}%</p>
          <p><strong>{t("stage")}:</strong> {growthStage}</p>
          <p><strong>{t("location")}:</strong> {location}</p>
        </div>

        <div style={styles.card}>
          <div style={styles.rowBetween}>
            <h3 style={styles.sectionTitle}>{t("explain")}</h3>
            <button
              style={styles.linkButton}
              onClick={() => setShowExplain(!showExplain)}
            >
              {t("why")}
            </button>
          </div>

          {showExplain && (
            <div style={styles.explainBox}>
              <p>Visual patterns such as irregular spotting and discoloration were detected.</p>
              <p>Environmental conditions indicate high moisture retention.</p>
              <p>Crop growth stage shows increased susceptibility.</p>
              <p>Confidence is high due to strong pattern similarity.</p>
            </div>
          )}
        </div>

        <div style={styles.card}>
          <h3 style={styles.sectionTitle}>{t("action")}</h3>

          <div style={styles.actionGrid}>
            <div style={styles.actionCard}>
              <h4>{t("immediate")}</h4>
              <ul>
                <li>Apply crop-specific fungicide</li>
                <li>Reduce excess moisture</li>
                <li>Isolate affected plants</li>
              </ul>
            </div>

            <div style={styles.actionCard}>
              <h4>{t("short")}</h4>
              <ul>
                <li>Monitor crop every 3–4 days</li>
                <li>Maintain field sanitation</li>
              </ul>
            </div>

            <div style={styles.actionCard}>
              <h4>{t("preventive")}</h4>
              <ul>
                <li>Improve spacing and airflow</li>
                <li>Use resistant crop varieties</li>
              </ul>
            </div>
          </div>
        </div>

        <div style={styles.cardMuted}>
          <h3 style={styles.sectionTitle}>{t("general")}</h3>
          <p>Ensure proper irrigation management.</p>
          <p>Follow recommended fertilization schedules.</p>
          <p>Regularly inspect crops for early signs of stress.</p>
        </div>

        <div style={styles.footer}>
          <button style={styles.primaryBtn} onClick={() => navigate("/home")}>
            {t("back")}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f4f6f8",
  },
  header: {
    backgroundColor: "#142C52",
    padding: "14px 32px",
  },
  brand: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
  },
  logo: {
    height: "36px",
    backgroundColor: "#ffffff",
    padding: "6px",
    borderRadius: "8px",
  },
  brandText: {
    color: "#1B9AAA",
    margin: 0,
  },
  container: {
    maxWidth: "900px",
    margin: "0 auto",
    padding: "60px 20px",
  },
  pageTitle: {
    color: "#142C52",
    marginBottom: "30px",
  },
  sectionTitle: {
    color: "#142C52",
    marginBottom: "12px",
  },
  cardHighlight: {
    backgroundColor: "#E6F6F8",
    padding: "24px",
    borderRadius: "16px",
    marginBottom: "24px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "16px",
    marginBottom: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  cardMuted: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "16px",
    marginBottom: "24px",
    opacity: 0.9,
  },
  rowBetween: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  linkButton: {
    background: "none",
    border: "none",
    color: "#1B9AAA",
    fontWeight: "600",
    cursor: "pointer",
  },
  explainBox: {
    marginTop: "12px",
    color: "#142C52",
  },
  actionGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "16px",
  },
  actionCard: {
    backgroundColor: "#f8fafc",
    padding: "16px",
    borderRadius: "12px",
  },
  footer: {
    display: "flex",
    justifyContent: "flex-end",
  },
  primaryBtn: {
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    border: "none",
    padding: "12px 24px",
    borderRadius: "10px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default AIAssessment;
