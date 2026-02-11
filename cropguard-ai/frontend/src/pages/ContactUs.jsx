import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function ContactUs() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.brand}>
          <img src={logo} alt="CropGuard AI" style={styles.logo} />
          <h2 style={styles.brandText}>CropGuard AI</h2>
        </div>
      </header>

      {/* CONTENT */}
      <div style={styles.container}>
        <div style={styles.wrapper}>
          {/* CONTACT CARD */}
          <div style={styles.glassCard}>
            <div style={styles.gradientBar} />
            <h2 style={styles.title}>Contact Us</h2>

            <div style={styles.infoRow}>
              <span style={styles.icon}>✉️</span>
              <p>internships@civoranexus.com</p>
            </div>

            <div style={styles.infoRow}>
              <span style={styles.icon}>📞</span>
              <p>+91 7350 675192</p>
            </div>

            <div style={styles.infoRow}>
              <span style={styles.icon}>📍</span>
              <p>Sangamner, Maharashtra, India</p>
            </div>
          </div>

          {/* ABOUT CARD */}
          <div style={styles.glassCard}>
            <div style={styles.gradientBar} />
            <h2 style={styles.title}>About CropGuard AI</h2>

            <p style={styles.text}>
              CropGuard AI is a smart agriculture platform designed to help
              farmers detect diseases early, understand crop risks, and take
              AI-driven preventive actions for better yield and sustainability.
            </p>

            <div style={styles.featureGrid}>
              <div style={styles.feature}>🌱 AI Disease Detection</div>
              <div style={styles.feature}>🧠 Explainable Insights</div>
              <div style={styles.feature}>📊 Smart Dashboard</div>
              <div style={styles.feature}>📅 Crop Calendar</div>
              <div style={styles.feature}>🛡️ Pest Detection</div>
              <div style={styles.feature}>📈 Risk Forecasting</div>
            </div>

            <p style={styles.partnerText}>
              Collaborating with industry leaders to deliver intelligent
              digital farming experiences.
            </p>

            {/* 🔥 ADDED LINE — YOUR DEVELOPER CREDIT */}
            <div style={styles.devBox}>
              Developed by <strong>Ajinkya Patil</strong> — 
              <span style={{ opacity: 0.6 }}>
                {" "}ajinkyapatil2005@gmail.com | Pune, India
              </span>
            </div>
          </div>
        </div>

        <button style={styles.button} onClick={() => navigate("/home")}>
          Back to Home
        </button>
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
    padding: "70px 80px",
  },

  wrapper: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))",
    gap: "30px",
    marginBottom: "30px",
  },

  glassCard: {
    position: "relative",
    background:
      "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(255,255,255,0.7))",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "32px",
    boxShadow: "0 20px 45px rgba(0,0,0,0.08)",
    color: "#142C52",
    transition: "all 0.3s ease",
  },

  gradientBar: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "4px",
    width: "100%",
    borderRadius: "20px 20px 0 0",
    background:
      "linear-gradient(90deg,#1B9AAA,#16808D,#142C52)",
  },

  title: {
    marginBottom: "20px",
  },

  infoRow: {
    display: "flex",
    alignItems: "center",
    gap: "14px",
    marginBottom: "16px",
    fontSize: "17px",
  },

  icon: {
    fontSize: "20px",
    color: "#1B9AAA",
  },

  text: {
    lineHeight: "1.7",
    marginBottom: "18px",
  },

  featureGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2,1fr)",
    gap: "12px",
    marginBottom: "16px",
  },

  feature: {
    backgroundColor: "#E6F6F8",
    padding: "10px 14px",
    borderRadius: "12px",
    fontWeight: "600",
    color: "#16808D",
    fontSize: "14px",
  },

  partnerText: {
    color: "#16808D",
    fontWeight: "500",
  },

  /* 🔥 NEW STYLE FOR YOUR NAME */
  devBox: {
    marginTop: "20px",
    paddingTop: "14px",
    borderTop: "1px solid #e5e7eb",
    fontSize: "14px",
    color: "#142C52",
  },

  button: {
    padding: "14px 24px",
    backgroundColor: "#1B9AAA",
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "600",
  },
};

export default ContactUs;
