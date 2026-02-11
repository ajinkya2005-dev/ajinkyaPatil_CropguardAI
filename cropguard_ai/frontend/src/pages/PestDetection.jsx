import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function PestDetection() {
  const navigate = useNavigate();
  const stored = JSON.parse(localStorage.getItem("lastAnalysis"));

  const [pests, setPests] = useState([]);
  const [loading, setLoading] = useState(true);

  const language = localStorage.getItem("appLanguage") || "en";

  const t = (key) => {
    const translations = {
      en: {
        heading: "Pest Detection & Control",
        analyzing: "Analyzing pest threats...",
        none: "No pest threats detected for current crop condition.",
        stableTitle: "🌿 Crop Health Looks Stable",
        stableText:
          "No immediate pest threats detected. Strengthen crop immunity using these AI suggestions.",
        risk: "Risk",
        reason: "Reason",
        control: "Recommended Control",
        buy: "Buy Control Product",
        suggested: "AI Suggested Products",
        back: "Back to Home",
      },
      hi: {
        heading: "कीट पहचान और नियंत्रण",
        analyzing: "कीट खतरे का विश्लेषण...",
        none: "वर्तमान फसल स्थिति के लिए कोई कीट खतरा नहीं मिला।",
        stableTitle: "🌿 फसल की स्थिति स्थिर है",
        stableText: "AI सुझावों से फसल की ताकत बढ़ाएँ।",
        risk: "जोखिम",
        reason: "कारण",
        control: "अनुशंसित नियंत्रण",
        buy: "उत्पाद खरीदें",
        suggested: "AI सुझाए गए उत्पाद",
        back: "होम पर वापस जाएं",
      },
      mr: {
        heading: "किड ओळख व नियंत्रण",
        analyzing: "किड धोका विश्लेषण चालू...",
        none: "सध्याच्या पिकासाठी किड धोका नाही.",
        stableTitle: "🌿 पीक स्थिती स्थिर आहे",
        stableText: "AI सुचनांमुळे पीक अधिक मजबूत करा.",
        risk: "जोखीम",
        reason: "कारण",
        control: "शिफारस केलेले नियंत्रण",
        buy: "उत्पादन खरेदी करा",
        suggested: "AI सुचवलेली उत्पादने",
        back: "होम वर जा",
      },
    };
    return translations[language]?.[key] || key;
  };

  /* ===============================
     AMAZON LINK BUILDER (UNCHANGED)
  ===============================*/
  const buildAmazonLink = (text) => {
    if (!text) return "#";
    const query = text.replace(/\s+/g, "+");
    return `https://www.amazon.in/s?k=${query}+for+plants`;
  };

  /* ===============================
     EXISTING SMART PRODUCTS ENGINE
  ===============================*/
  const getRelatedProducts = (control) => {
    if (!control) return [];

    const c = control.toLowerCase();

    if (c.includes("neem"))
      return [
        "Neem Oil Spray Organic",
        "Cold Pressed Neem Oil",
        "Aphid Control Neem Concentrate",
        "Neem Extract Plant Booster",
      ];

    if (c.includes("fungicide"))
      return [
        "Copper Fungicide Spray",
        "Organic Plant Fungicide",
        "Broad Spectrum Fungicide",
        "Bio Fungicide Solution",
      ];

    if (c.includes("pesticide"))
      return [
        "Bio Pesticide Spray",
        "Organic Pest Control Kit",
        "Plant Protection Insecticide",
        "Eco Friendly Pest Shield",
      ];

    return [
      "Plant Protection Spray",
      "Organic Crop Booster",
      "Multi Pest Control Solution",
      "Natural Plant Defense Kit",
    ];
  };

  /* ===============================
     🔥 ELITE ADDITION — FALLBACK PRODUCTS
  ===============================*/
  const getFallbackProducts = () => {
    return [
      "Organic Bio Fertilizer Liquid",
      "Seaweed Extract Growth Booster",
      "Plant Immunity Booster Spray",
      "Drip Irrigation Starter Kit",
      "Soil Micro Nutrient Mix",
      "Organic Compost Enhancer",
    ];
  };

  useEffect(() => {
    if (!stored) return;

    fetch("/api/pest-recommendations", {

      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        disease: stored.analysis.disease,
        severity: stored.analysis.severity,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setPests(data.detected_pests || []);
        setLoading(false);
      });
  }, []);

  return (
    <div style={styles.page}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} style={styles.logo} />
          <h2 style={styles.brandText}>CropGuard AI</h2>
        </div>
      </header>

      <div style={styles.container}>
        <h2 style={styles.heading}>{t("heading")}</h2>

        {loading && <p style={styles.info}>{t("analyzing")}</p>}

        {/* ===============================
           🔥 ELITE EMPTY STATE CARD
        ===============================*/}
        {!loading && pests.length === 0 && (
          <div style={styles.emptyCard}>
            <h3>{t("stableTitle")}</h3>
            <p style={styles.info}>{t("stableText")}</p>

            <div style={styles.productSection}>
              <strong>{t("suggested")}</strong>

              <div style={styles.productCarousel}>
                {getFallbackProducts().map((prod, i) => (
                  <a
                    key={i}
                    href={buildAmazonLink(prod)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.productChip}
                  >
                    🌱 {prod}
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* EXISTING PEST CARDS */}
        {pests.map((pest, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.row}>
              <h3>{pest.name}</h3>
              <span
                style={{
                  ...styles.badge,
                  backgroundColor:
                    pest.risk === "High"
                      ? "#DC2626"
                      : pest.risk === "Medium"
                      ? "#F59E0B"
                      : "#16A34A",
                }}
              >
                {pest.risk} {t("risk")}
              </span>
            </div>

            <p><strong>{t("reason")}:</strong> {pest.reason}</p>
            <p><strong>{t("control")}:</strong> {pest.control}</p>

            <a
              href={pest.buy_link || buildAmazonLink(pest.control)}
              target="_blank"
              rel="noopener noreferrer"
              style={styles.link}
            >
              {t("buy")}
            </a>

            <div style={styles.productSection}>
              <strong>{t("suggested")}</strong>

              <div style={styles.productCarousel}>
                {getRelatedProducts(pest.control).map((prod, i) => (
                  <a
                    key={i}
                    href={buildAmazonLink(prod)}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={styles.productChip}
                  >
                    🛒 {prod}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}

        <button style={styles.button} onClick={() => navigate("/home")}>
          {t("back")}
        </button>
      </div>
    </div>
  );
}

/* ===============================
   🎨 ELITE UI V2 STYLES
===============================*/
const styles = {
  page: { minHeight: "100vh", backgroundColor: "#f4f6f8" },
  header: { backgroundColor: "#142C52", padding: "14px 32px" },
  brand: { display: "flex", alignItems: "center", gap: "12px" },
  logo: { height: "36px", backgroundColor: "#ffffff", padding: "6px", borderRadius: "8px" },
  brandText: { color: "#1B9AAA", margin: 0 },

  container: {
    padding: "40px 20px",
    maxWidth: "1000px",
    margin: "0 auto",
  },

  heading: { color: "#142C52", marginBottom: "30px" },
  info: { color: "#16808D", fontSize: "16px" },

  /* EXISTING CARD */
  card: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "18px",
    marginBottom: "20px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
    color: "#142C52",
  },

  /* 🔥 NEW EMPTY CARD */
  emptyCard: {
    backgroundColor: "#ffffff",
    padding: "26px",
    borderRadius: "18px",
    marginBottom: "20px",
    boxShadow: "0 15px 35px rgba(0,0,0,0.08)",
    color: "#142C52",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
    flexWrap: "wrap",
    gap: "10px",
  },

  badge: {
    color: "#ffffff",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "13px",
    fontWeight: "600",
  },

  link: {
    display: "inline-block",
    marginTop: "10px",
    color: "#1B9AAA",
    fontWeight: "600",
    textDecoration: "none",
  },

  productSection: { marginTop: "16px" },

  productCarousel: {
    display: "flex",
    gap: "10px",
    overflowX: "auto",
    marginTop: "10px",
    paddingBottom: "6px",
  },

  productChip: {
    backgroundColor: "#E6F6F8",
    padding: "8px 14px",
    borderRadius: "20px",
    textDecoration: "none",
    color: "#16808D",
    fontSize: "13px",
    fontWeight: "600",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },

  button: {
    marginTop: "30px",
    padding: "14px 24px",
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
    width: "100%",
    maxWidth: "260px",
  },
};

export default PestDetection;
