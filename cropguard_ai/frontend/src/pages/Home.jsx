import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/logo.png";

function Home() {
  const navigate = useNavigate();
  const farmerProfile = JSON.parse(localStorage.getItem("activeFarmer"));
  const [showProfile, setShowProfile] = useState(false);

  // ⭐ NEW — mobile menu state (PRO FIX)
  const [mobileMenu, setMobileMenu] = useState(false);

  const language = localStorage.getItem("appLanguage") || "en";

  const t = (key) => {
    const translations = {
      en: {
        history: "History",
        calendar: "Crop Calendar",
        dashboard: "Dashboard",
        contact: "Contact Us",
        logout: "Logout",
        title: "Smart Crop Disease Detection",
        subtitle:
          "Upload crop images and receive AI-powered disease detection, personalized treatment plans, and explainable insights.",
        upload: "Upload Crop Image",
        analysis: "Disease Analysis",
        pests: "Pest Detection",
      },
      hi: {
        history: "इतिहास",
        calendar: "फसल कैलेंडर",
        dashboard: "डैशबोर्ड",
        contact: "संपर्क करें",
        logout: "लॉगआउट",
        title: "स्मार्ट फसल रोग पहचान",
        subtitle:
          "फसल की तस्वीर अपलोड करें और एआई आधारित रोग पहचान और उपचार सुझाव प्राप्त करें।",
        upload: "फसल छवि अपलोड करें",
        analysis: "रोग विश्लेषण",
        pests: "कीट पहचान",
      },
      mr: {
        history: "इतिहास",
        calendar: "पीक कॅलेंडर",
        dashboard: "डॅशबोर्ड",
        contact: "संपर्क करा",
        logout: "लॉगआउट",
        title: "स्मार्ट पीक रोग शोध",
        subtitle:
          "पीक फोटो अपलोड करा आणि एआय आधारित रोग शोध व उपचार सल्ला मिळवा.",
        upload: "पीक फोटो अपलोड",
        analysis: "रोग विश्लेषण",
        pests: "कीड ओळख",
      },
    };
    return translations[language]?.[key] || key;
  };

  const isMobile = window.innerWidth < 768;

  return (
    <div style={styles.app}>
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} alt="CropGuard AI Logo" style={styles.logo} />
          <h2 style={styles.logoText}>CropGuard AI</h2>
        </div>

        {/* ⭐ PRO NAVBAR */}
        <nav style={styles.navWrapper}>
          {/* Desktop Menu */}
          {!isMobile && (
            <ul style={styles.navList}>
              <li style={styles.navItem} onClick={() => navigate("/history")}>
                {t("history")}
              </li>
              <li style={styles.navItem} onClick={() => navigate("/calendar")}>
                {t("calendar")}
              </li>
              <li style={styles.navItem} onClick={() => navigate("/dashboard")}>
                {t("dashboard")}
              </li>
              <li style={styles.navItem} onClick={() => navigate("/contact")}>
                {t("contact")}
              </li>
            </ul>
          )}

          {/* ⭐ MOBILE HAMBURGER */}
          {isMobile && (
            <button
              style={styles.menuBtn}
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              ☰
            </button>
          )}

          {/* ⭐ MOBILE DROPDOWN */}
          {mobileMenu && isMobile && (
            <div style={styles.mobileMenu}>
              <p onClick={() => navigate("/history")}>{t("history")}</p>
              <p onClick={() => navigate("/calendar")}>{t("calendar")}</p>
              <p onClick={() => navigate("/dashboard")}>{t("dashboard")}</p>
              <p onClick={() => navigate("/contact")}>{t("contact")}</p>
            </div>
          )}

          {/* PROFILE BUTTON (UNCHANGED) */}
          {farmerProfile && (
            <div style={{ position: "relative", marginLeft: "14px" }}>
              <button
                onClick={() => setShowProfile(!showProfile)}
                style={{
                  backgroundColor: "#1B9AAA",
                  color: "#fff",
                  border: "none",
                  borderRadius: "20px",
                  padding: "6px 14px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                {farmerProfile.fullName}
              </button>

              {showProfile && (
                <div
                  style={{
                    position: "absolute",
                    right: 0,
                    top: "44px",
                    backgroundColor: "#ffffff",
                    padding: "16px",
                    borderRadius: "14px",
                    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
                    width: "220px",
                    zIndex: 100,
                    color: "#142C52",
                  }}
                >
                  <p style={{ fontWeight: "600", marginBottom: "4px" }}>
                    {farmerProfile.fullName}
                  </p>
                  <p style={{ fontSize: "13px", marginBottom: "10px" }}>
                    {farmerProfile.cropType} • {farmerProfile.location}
                  </p>

                  <hr style={{ margin: "10px 0" }} />

                  <button
                    onClick={() => {
                      localStorage.removeItem("activeFarmer");
                      window.location.href = "/";
                    }}
                    style={{
                      width: "100%",
                      padding: "10px",
                      backgroundColor: "#DC2626",
                      color: "#ffffff",
                      border: "none",
                      borderRadius: "10px",
                      cursor: "pointer",
                      fontWeight: "600",
                    }}
                  >
                    {t("logout")}
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>
      </header>

      <main style={styles.main}>
        <div style={styles.card}>
          <h1 style={styles.heading}>{t("title")}</h1>
          <p style={styles.subText}>{t("subtitle")}</p>

          <div style={styles.actions}>
            <button style={styles.primaryBtn} onClick={() => navigate("/upload")}>
              {t("upload")}
            </button>

            <button style={styles.secondaryBtn} onClick={() => navigate("/analysis")}>
              {t("analysis")}
            </button>

            <button style={styles.tertiaryBtn} onClick={() => navigate("/pests")}>
              {t("pests")}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

const styles = {
  app:{minHeight:"100vh",display:"flex",flexDirection:"column",backgroundColor:"#f4f6f8"},
  header:{backgroundColor:"#142C52",color:"#ffffff",padding:"14px 20px",display:"flex",justifyContent:"space-between",alignItems:"center"},
  brand:{display:"flex",alignItems:"center",gap:"12px"},
  logo:{height:"40px",backgroundColor:"#ffffff",padding:"6px",borderRadius:"8px"},
  logoText:{color:"#1B9AAA",margin:0},

  navWrapper:{display:"flex",alignItems:"center",position:"relative"},
  navList:{display:"flex",listStyle:"none",gap:"22px",margin:0,padding:0},
  navItem:{cursor:"pointer",fontWeight:"500"},

  menuBtn:{
    background:"none",
    border:"none",
    fontSize:"26px",
    color:"#fff",
    cursor:"pointer"
  },

  mobileMenu:{
    position:"absolute",
    right:0,
    top:"50px",
    background:"#fff",
    borderRadius:"12px",
    boxShadow:"0 10px 25px rgba(0,0,0,0.15)",
    padding:"14px",
    color:"#142C52",
    zIndex:200
  },

  main:{flex:1,display:"flex",justifyContent:"center",alignItems:"center",padding:"60px 20px"},
  card:{backgroundColor:"#ffffff",borderRadius:"16px",padding:"40px",maxWidth:"800px",textAlign:"center",boxShadow:"0 15px 40px rgba(0,0,0,0.08)"},
  heading:{color:"#142C52",marginBottom:"14px"},
  subText:{color:"#16808D",marginBottom:"30px"},
  actions:{display:"flex",justifyContent:"center",gap:"16px",flexWrap:"wrap"},
  primaryBtn:{padding:"14px 28px",backgroundColor:"#1B9AAA",color:"#ffffff",border:"none",borderRadius:"12px",fontWeight:"600",cursor:"pointer"},
  secondaryBtn:{padding:"14px 28px",backgroundColor:"#16808D",color:"#ffffff",border:"none",borderRadius:"12px",fontWeight:"600",cursor:"pointer"},
  tertiaryBtn:{padding:"14px 28px",backgroundColor:"#142C52",color:"#ffffff",border:"none",borderRadius:"12px",fontWeight:"600",cursor:"pointer"},
};

export default Home;
