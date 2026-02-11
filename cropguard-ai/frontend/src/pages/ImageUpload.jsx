import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

function ImageUpload() {
  const navigate = useNavigate();

  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const [success, setSuccess] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [loading, setLoading] = useState(false);

  const language = localStorage.getItem("appLanguage") || "en";

  const t = (key) => {
    const translations = {
      en: {
        title: "Image-Based Detection",
        upload: "Upload Crop Image",
        camera: "Use Camera",
        capture: "Capture Image",
        analyzing: "Analyzing image…",
        success: "Image processed successfully. Redirecting…",
        steps: "How to Upload Proper Crop Image",
        step1: "📸 Capture clear leaf or crop area",
        step2: "🌞 Use natural lighting",
        step3: "🔍 Avoid blurry or far shots",
        multi: "You can select multiple images",
      },
      hi: {
        title: "छवि आधारित पहचान",
        upload: "फसल छवि अपलोड करें",
        camera: "कैमरा उपयोग करें",
        capture: "छवि कैप्चर करें",
        analyzing: "छवि का विश्लेषण हो रहा है…",
        success: "छवि सफलतापूर्वक प्रोसेस हुई।",
        steps: "सही फसल छवि कैसे अपलोड करें",
        step1: "📸 साफ पत्ती की फोटो लें",
        step2: "🌞 प्राकृतिक रोशनी उपयोग करें",
        step3: "🔍 धुंधली फोटो से बचें",
        multi: "एक से अधिक छवियां चुन सकते हैं",
      },
      mr: {
        title: "प्रतिमा आधारित शोध",
        upload: "पीक फोटो अपलोड करा",
        camera: "कॅमेरा वापरा",
        capture: "फोटो कॅप्चर करा",
        analyzing: "प्रतिमा विश्लेषण सुरू आहे…",
        success: "प्रतिमा प्रोसेस झाली.",
        steps: "योग्य पीक फोटो कसा अपलोड करावा",
        step1: "📸 स्पष्ट पानाचा फोटो घ्या",
        step2: "🌞 नैसर्गिक प्रकाश वापरा",
        step3: "🔍 ब्लर फोटो टाळा",
        multi: "अनेक फोटो निवडू शकता",
      },
    };
    return translations[language]?.[key] || key;
  };

  /* ================================
     CAMERA
  =================================*/
  const startCamera = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });
    videoRef.current.srcObject = stream;
    setCameraOn(true);
  };

  const stopCamera = () => {
    const stream = videoRef.current.srcObject;
    stream.getTracks().forEach((track) => track.stop());
    setCameraOn(false);
  };

  const captureImage = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    ctx.drawImage(video, 0, 0);
    stopCamera();

    canvas.toBlob(async (blob) => {
      sendToBackend(blob);
    }, "image/jpeg");
  };

  /* ================================
     MULTI IMAGE UPLOAD
  =================================*/
  const handleUpload = async (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    for (let file of files) {
      await sendToBackend(file);
    }
  };

  /* ================================
     BACKEND CALL
  =================================*/
  const sendToBackend = async (file) => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", file);

      const res = await fetch("http://127.0.0.1:5000/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      const preview = URL.createObjectURL(file);

      const analysisRecord = {
        id: Date.now(),
        date: new Date().toLocaleString(),
        imagePreview: preview,
        analysis: data.analysis,
      };

      localStorage.setItem("lastAnalysis", JSON.stringify(analysisRecord));

      const history =
        JSON.parse(localStorage.getItem("analysisHistory")) || [];
      history.push(analysisRecord);
      localStorage.setItem("analysisHistory", JSON.stringify(history));

      setSuccess(true);
      setTimeout(() => navigate("/home"), 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

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

          {/* ⭐ STEP GUIDE CARD */}
          <div style={styles.guide}>
            <strong>{t("steps")}</strong>
            <p>{t("step1")}</p>
            <p>{t("step2")}</p>
            <p>{t("step3")}</p>
          </div>

          {!cameraOn && (
            <>
              <label style={styles.uploadBox}>
                {t("upload")}
                <p style={styles.multi}>{t("multi")}</p>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleUpload}
                  style={{ display: "none" }}
                  disabled={loading}
                />
              </label>

              <button style={styles.cameraBtn} onClick={startCamera}>
                {t("camera")}
              </button>
            </>
          )}

          {cameraOn && (
            <>
              <video ref={videoRef} autoPlay style={styles.video} />
              <button style={styles.captureBtn} onClick={captureImage}>
                {t("capture")}
              </button>
            </>
          )}

          <canvas ref={canvasRef} style={{ display: "none" }} />

          {loading && <div style={styles.info}>{t("analyzing")}</div>}
          {success && <div style={styles.success}>{t("success")}</div>}
        </div>
      </div>
    </div>
  );
}

/* ================================
   ⭐ PREMIUM MOBILE STYLES
=================================*/
const styles = {
  page:{minHeight:"100vh",backgroundColor:"#f4f6f8"},
  header:{backgroundColor:"#142C52",padding:"14px 20px"},
  brand:{display:"flex",alignItems:"center",gap:"12px"},
  logo:{height:"36px",backgroundColor:"#fff",padding:"6px",borderRadius:"8px"},
  brandText:{color:"#1B9AAA",margin:0},

  center:{display:"flex",justifyContent:"center",padding:"40px 16px"},
  card:{
    backgroundColor:"#fff",
    padding:"28px",
    borderRadius:"18px",
    width:"100%",
    maxWidth:"420px",
    textAlign:"center",
    boxShadow:"0 20px 40px rgba(0,0,0,0.12)",
  },

  heading:{marginBottom:"18px",color:"#142C52"},

  guide:{
    backgroundColor:"#E6F6F8",
    padding:"14px",
    borderRadius:"12px",
    marginBottom:"18px",
    textAlign:"left",
    color:"#16808D",
    fontSize:"14px",
  },

  uploadBox:{
    display:"block",
    padding:"16px",
    borderRadius:"14px",
    border:"2px dashed #1B9AAA",
    color:"#16808D",
    cursor:"pointer",
    marginBottom:"14px",
  },

  multi:{fontSize:"12px",marginTop:"6px"},

  cameraBtn:{
    padding:"12px",
    backgroundColor:"#142C52",
    color:"#fff",
    border:"none",
    borderRadius:"12px",
    width:"100%",
    fontWeight:"600"
  },

  video:{width:"100%",borderRadius:"12px",marginBottom:"12px"},

  captureBtn:{
    padding:"12px",
    backgroundColor:"#1B9AAA",
    color:"#fff",
    border:"none",
    borderRadius:"12px",
    width:"100%",
    fontWeight:"600"
  },

  info:{marginTop:"16px",color:"#16808D",fontWeight:"600"},
  success:{
    marginTop:"16px",
    backgroundColor:"#E6F6F8",
    color:"#16808D",
    padding:"12px",
    borderRadius:"10px",
    fontWeight:"600",
  },
};

export default ImageUpload;
