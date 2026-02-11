import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const safeParse = (key, fallback) => {
  try {
    const data = JSON.parse(localStorage.getItem(key));
    return data ?? fallback;
  } catch {
    return fallback;
  }
};

function DiseaseAnalysis() {
  const navigate = useNavigate();

  const language = localStorage.getItem("appLanguage") || "en";

  const t = (key) => {
    const translations = {
      en: {
        noAnalysisTitle: "No Analysis Available",
        noAnalysisText: "Please upload a crop image to view AI analysis.",
        backHome: "Back to Home",
        title: "Disease Analysis",
        overlayTitle: "AI Vision Overlay",
        hideOverlay: "Hide AI Overlay",
        showOverlay: "Show AI Overlay",
        risk: "Risk Level",
        severity: "Severity",
        confidence: "AI Confidence",
        farmContext: "Farm Context Used by AI",
        location: "Location",
        crop: "Crop",
        stage: "Growth Stage",
        age: "Crop Age",
        cultivation: "Cultivation",
        disease: "Disease",
        priority: "Action Priority",
        learning: "AI Learning Insight",
        whyText: "Why was this disease detected?",
        planner: "Smart Treatment & Action Planner",
        explainTitle: "Explainable AI – Decision Reasoning",
        keyFactors: "Key Risk Factors",
        decisionExplain: "Decision Explanation",
        close: "Close",
      },
      hi: {
        noAnalysisTitle: "कोई विश्लेषण उपलब्ध नहीं",
        noAnalysisText: "AI विश्लेषण देखने के लिए कृपया फसल छवि अपलोड करें।",
        backHome: "होम पर वापस जाएं",
        title: "रोग विश्लेषण",
        overlayTitle: "AI विज़न ओवरले",
        hideOverlay: "AI ओवरले छुपाएँ",
        showOverlay: "AI ओवरले दिखाएँ",
        risk: "जोखिम स्तर",
        severity: "गंभीरता",
        confidence: "AI विश्वास",
        farmContext: "AI द्वारा उपयोग किया गया फार्म संदर्भ",
        location: "स्थान",
        crop: "फसल",
        stage: "विकास चरण",
        age: "फसल आयु",
        cultivation: "खेती प्रकार",
        disease: "रोग",
        priority: "कार्य प्राथमिकता",
        learning: "AI लर्निंग इनसाइट",
        whyText: "यह रोग क्यों पाया गया?",
        planner: "स्मार्ट उपचार योजना",
        explainTitle: "Explainable AI – निर्णय कारण",
        keyFactors: "मुख्य जोखिम कारक",
        decisionExplain: "निर्णय व्याख्या",
        close: "बंद करें",
      },
      mr: {
        noAnalysisTitle: "विश्लेषण उपलब्ध नाही",
        noAnalysisText: "AI विश्लेषण पाहण्यासाठी कृपया पीक फोटो अपलोड करा.",
        backHome: "होम वर जा",
        title: "रोग विश्लेषण",
        overlayTitle: "AI व्हिजन ओव्हरले",
        hideOverlay: "AI ओव्हरले लपवा",
        showOverlay: "AI ओव्हरले दाखवा",
        risk: "जोखीम स्तर",
        severity: "तीव्रता",
        confidence: "AI विश्वास",
        farmContext: "AI ने वापरलेला शेत संदर्भ",
        location: "स्थान",
        crop: "पीक",
        stage: "वाढ अवस्था",
        age: "पीक वय",
        cultivation: "शेती प्रकार",
        disease: "रोग",
        priority: "कार्य प्राधान्य",
        learning: "AI लर्निंग इनसाइट",
        whyText: "हा रोग का ओळखला गेला?",
        planner: "स्मार्ट उपचार योजना",
        explainTitle: "Explainable AI – निर्णय कारण",
        keyFactors: "मुख्य जोखीम घटक",
        decisionExplain: "निर्णय स्पष्टीकरण",
        close: "बंद करा",
      },
    };
    return translations[language]?.[key] || key;
  };

  const stored = safeParse("lastAnalysis", null);
  const history = safeParse("analysisHistory", []);
  const farmerProfile = safeParse("farmerProfile", null);

  const [showActions, setShowActions] = useState(true);
  const [showExplain, setShowExplain] = useState(false);
  const [heatmap, setHeatmap] = useState(null);
  const [showHeatmap, setShowHeatmap] = useState(false);
  const [opacity, setOpacity] = useState(0.4);

  if (!stored || !stored.analysis) {
    return (
      <div style={{ padding: "80px", textAlign: "center", color: "#142C52" }}>
        <h2>{t("noAnalysisTitle")}</h2>
        <p>{t("noAnalysisText")}</p>
        <button
          style={{
            marginTop: "20px",
            padding: "12px 24px",
            backgroundColor: "#1B9AAA",
            color: "#fff",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
          }}
          onClick={() => navigate("/home")}
        >
          {t("backHome")}
        </button>
      </div>
    );
  }

  const { imagePreview, analysis } = stored;

  const {
    disease,
    severity,
    confidence,
    recommendation,
    risk_level,
    action_priority,
    key_risk_factors = [],
    decision_explanation = [],
  } = analysis;

  
  const riskColor =
    risk_level === "High"
      ? "#DC2626"
      : risk_level === "Medium"
      ? "#F59E0B"
      : "#16A34A";

  const severityColor =
    severity === "High"
      ? "#DC2626"
      : severity === "Medium"
      ? "#F59E0B"
      : "#16A34A";

  
  let forecastRisk = "Low";
  let forecastColor = "#16A34A";
  let forecastMessage =
    "Disease risk is expected to remain low over the next 14 days.";

  if (severity === "High" && confidence >= 0.75) {
    forecastRisk = "High";
    forecastColor = "#DC2626";
    forecastMessage =
      "High probability of disease progression in the next 7–14 days without immediate intervention.";
  } else if (severity === "Medium") {
    forecastRisk = "Moderate";
    forecastColor = "#F59E0B";
    forecastMessage =
      "Moderate risk detected. Close monitoring and preventive actions are advised.";
  }

  return (
    <div style={styles.page}>
      
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} alt="CropGuard AI" style={styles.logo} />
          <h2 style={styles.brandText}>CropGuard AI</h2>
        </div>
      </header>

    
      <div style={styles.center}>
        <div style={styles.card}>
          <h2 style={styles.heading}>{t("title")}</h2>

          {heatmap && (
            <div style={styles.heatmapBox}>
              <h4 style={styles.heatmapTitle}>{t("overlayTitle")}</h4>

              <div style={styles.toggleRow}>
                <button
                  style={styles.toggleBtn}
                  onClick={() => setShowHeatmap(!showHeatmap)}
                >
                  {showHeatmap ? t("hideOverlay") : t("showOverlay")}
                </button>

                <input
                  type="range"
                  min="0.1"
                  max="0.7"
                  step="0.05"
                  value={opacity}
                  onChange={(e) => setOpacity(Number(e.target.value))}
                />
              </div>

          
          <div style={styles.badgeRow}>
            <span style={{ ...styles.riskBadge, backgroundColor: riskColor }}>
              {t("risk")}: {risk_level}
            </span>
            <span style={{ ...styles.severityText, color: severityColor }}>
              {t("severity")}: {severity}
            </span>
          </div>

          <div style={styles.confidenceWrapper}>
            <div style={styles.confidenceLabel}>
              {t("confidence")}: {Math.round(confidence * 100)}%
            </div>
            <div style={styles.confidenceTrack}>
              <div
                style={{
                  ...styles.confidenceFill,
                  width: `${confidence * 100}%`,
                  backgroundColor: severityColor,
                }}
              />
            </div>
          </div>

          
          <div style={styles.details}>
            <p><strong>{t("disease")}:</strong> {disease}</p>
            <p><strong>{t("priority")}:</strong> {action_priority}</p>
          </div>

          <div style={styles.recommendation}>{recommendation}</div>

          <div
            style={{
              ...styles.learningBox,
              borderLeft: `6px solid ${learningColor}`,
            }}
          >
            <strong>{t("learning")}</strong>
            <p style={{ marginTop: "6px" }}>{learningMessage}</p>
          </div>

          
          <div
            style={{
              backgroundColor: "#ffffff",
              padding: "16px",
              borderRadius: "14px",
              marginBottom: "20px",
              boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
              borderLeft: `6px solid ${forecastColor}`,
            }}
          >
            <h4 style={{ color: "#142C52", marginBottom: "6px" }}>
              Risk Forecast (Next 14 Days)
            </h4>

            <p style={{ fontWeight: "600", color: forecastColor }}>
              Forecasted Risk Level: {forecastRisk}
            </p>

            <p style={{ color: "#142C52", marginTop: "6px" }}>
              {forecastMessage}
            </p>
          </div>

          
          <div style={styles.whyRow}>
            <span>{t("whyText")}</span>
            <button
              style={styles.whyButton}
              onClick={() => setShowExplain(true)}
            >
              Why?
            </button>
          </div>

        
          <div style={styles.actionSection}>
            <h3
              style={styles.actionHeading}
              onClick={() => setShowActions(!showActions)}
            >
              {t("planner")}
            </h3>

            {showActions && (
              <div style={styles.actionBlock}>
                <ul>
                  <li>{recommendation}</li>
                </ul>
              </div>
            )}
          </div>

          <button style={styles.button} onClick={() => navigate("/home")}>
            {t("backHome")}
          </button>
        </div>
      </div>

      
      {showExplain && (
        <div style={styles.overlay}>
          <div style={styles.explainCard}>
            <h3>{t("explainTitle")}</h3>

            <h4>{t("keyFactors")}</h4>
            <ul>
              {Array.isArray(key_risk_factors) && key_risk_factors.length > 0
                ? key_risk_factors.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))
                : <li>Environmental and visual stress indicators detected</li>}
            </ul>

            <h4>{t("decisionExplain")}</h4>
            <ul>
              {Array.isArray(decision_explanation) && decision_explanation.length > 0
                ? decision_explanation.map((item, i) => (
                    <li key={i}>{item}</li>
                  ))
                : <li>Model confidence and learned disease patterns exceeded threshold</li>}
            </ul>

            <button
              style={styles.closeButton}
              onClick={() => setShowExplain(false)}
            >
              {t("close")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}



const styles = {
  page: { minHeight: "100vh", backgroundColor: "#f4f6f8" },
  header: { backgroundColor: "#142C52", padding: "14px 32px" },
  brand: { display: "flex", alignItems: "center", gap: "12px" },
  logo: { height: "36px", backgroundColor: "#fff", padding: "6px", borderRadius: "8px" },
  brandText: { color: "#1B9AAA", margin: 0 },
  center: { display: "flex", justifyContent: "center", paddingTop: "80px" },
  card: {
    backgroundColor: "#ffffff",
    padding: "40px",
    borderRadius: "18px",
    width: "520px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.12)",
  },
  heading: {
    textAlign: "center",
    color: "#142C52",
    marginBottom: "20px",
  },
  image: {
    width: "100%",
    borderRadius: "12px",
    marginBottom: "18px",
  },

  badgeRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "14px",
  },
  riskBadge: {
    color: "#ffffff",
    padding: "6px 12px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
  },
  severityText: { fontWeight: "600" },

  confidenceWrapper: { marginBottom: "16px" },
  confidenceLabel: { fontSize: "13px", marginBottom: "6px" },
  confidenceTrack: {
    height: "8px",
    backgroundColor: "#e5e7eb",
    borderRadius: "6px",
    overflow: "hidden",
  },
  confidenceFill: { height: "100%" },

  details: { color: "#142C52", marginBottom: "12px" },
  recommendation: {
    backgroundColor: "#E6F6F8",
    color: "#16808D",
    padding: "14px",
    borderRadius: "12px",
    marginBottom: "16px",
  },

  whyRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  whyText: { fontWeight: "500", color: "#142C52" },
  whyButton: {
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    border: "none",
    borderRadius: "8px",
    padding: "6px 14px",
    cursor: "pointer",
  },

  actionHeading: { color: "#1B9AAA", cursor: "pointer" },
  actionBlock: { color: "#142C52" },

  button: {
    marginTop: "20px",
    width: "100%",
    padding: "14px",
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
  },

  overlay: {
    position: "fixed",
    inset: 0,
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  explainCard: {
    backgroundColor: "#ffffff",
    padding: "36px",
    borderRadius: "18px",
    width: "480px",
  },
  explainHeading: { color: "#142C52" },
  closeButton: {
    marginTop: "20px",
    width: "100%",
    padding: "12px",
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
  },
};

export default DiseaseAnalysis;
