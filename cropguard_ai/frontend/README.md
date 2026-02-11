# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) (or [oxc](https://oxc.rs) when used in [rolldown-vite](https://vite.dev/guide/rolldown)) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



# Intership Start 

---

### Day 1 – Initial Setup and Project Structure
The project is initialized by creating a structured folder layout for backend, frontend and documentation. Basic placeholder files were added to both backend and frontend to verify the initial setup and establish entry points for further development.


### Day 2 - React setup and Initial frontend screen
On  Day-2  react was setup on my machine with appropriate requirements and modules and then a basic Home page was designed containint the dashboard home button alerts etc.

### Day 3 - Register Page and Home page further development 
Two seperate pages were made according to the project structure inside the src/pages/ folder that helped me in customizing the pages. A full fledged register page with a progress bar and necessary information is made with proper company guidlines

The Home page then was modified by adding a profile section that would show the farmers profile and info about their crops , location , date of planting etc. This day was more interesting as i got real time development guidance. Bckend has not yet been integrated but I plan to do it within day 5 or day 6 .

### Day 4 - Image Survey Upload
focus was on extending the frontend UI while maintaining the established design system and integrating the first AI-facing workflow of the application.End-to-end image submission pipeline, establishing a strong foundation for AI-driven crop disease analysis in upcoming phases.

### Day 5 -  Disease Analysis Page 
A disease analytics page was initialized with image upload interface and proper UI . After uploading an image ..it redirects to home page so that we can see the analytics . The analytical fields are now kept limited and quite few but as we progress more fields will be applied to determine in depth disease effect

### Day 6 - Early Alerts and Risk Analysis Page
introduced Early Alerts summary view displaying:
Crop overview
Possible causes of disease
Preventive measures
Weekly trend-based analysis (mocked data).

### Day -7 Dashboard Implementation


Implemented the Dashboard module with overview summary cards and interactive data visualizations using Recharts. Added safe chart rendering with lifecycle guards to prevent hook errors and ensure stable UI loading. The dashboard now presents total analyses, high risk crops, active alerts, disease severity distribution, and weekly risk trends.

### day-8 History and reports page added with AI Assessment

The upload page now sends crop images to the AI analysis endpoint, stores real analysis results locally, displays a clear success confirmation, and automatically redirects users back to the Home page. Each upload is persisted into an analysis history for reporting and review, while the latest analysis is made instantly available for Disease Analysis and Explainable AI modules

### Day-9 History and Downloadable Option (pdf format)
Extended the Dashboard module by adding a PDF download option for the latest crop disease analysis while preserving all existing overview cards and data visualizations.
his ensures quick access to actionable insights in a portable format and strengthens reporting capabilities alongside real-time monitoring features.

### day -10 History Page UI changes with changes in explainable AI
some changes were made to UI in history page and also to the mindful logic for explainable AI 

### day-11 Visual Indicators
added visual indicators to the history as well as the dashboard pages to understand severity level and level of effect.

### day-12 Repetitive Image Analysis
whenever we upload a image more than one or similar type of disease affected image more than once ..then in diseaseanalysis section an AI Insight box is added that showcases repetitve diseases detected.

### day-13 AI learning analytics and severity trend learnings added
inside dashboard page a learning analytics and severity trend learning added

### day-14 Risk Forecast based on severity trending
This shows likelihood of disease warnings and its further risk in 7 to 14 days. This option added in disease analysis

### day-15 Risk Forecast by whether mapping added 
A new Risk Forecast page was introduced to predict future crop disease risk based on historical disease severity trends stored in user interaction data. The forecast logic dynamically analyzes recent analyses, derives an average severity score, and classifies upcoming risk as Low, Medium, or High without using static or hardcoded values.

### day-16 Pest detection 
added pest detection option on home page 

### day-17 product buy option 
products can be buyed directly from pest detection stores

### day-18 Treatment Planner and Crop Calendar 
an effective treatment planner section added in diseaseAnalysis page for formaers to show effectiveness and Crop calendar added to track down all the dates and what all things done on those dates.


### day-19  Real AI Model Implemented
the project transitioned from a mock AI system to a real neural network–powered backend. A pretrained MobileNet model was integrated into the FastAPI server to perform actual image classification instead of random or simulated outputs. The backend now loads a deep learning model using PyTorch, preprocesses uploaded crop images, performs inference, and returns real confidence scores and predictions. The AI pipeline includes image transformation, neural inference, severity mapping, and explainable metadata returned to the frontend. The UI successfully consumes real model outputs with no structural changes required. This establishes the foundation for replacing placeholder logic with a fully trainable agriculture-specific model in the next phase.

### day -20 Heat map AI Evaluation 
integrated Grad-CAM heatmap generation to visually highlight infected crop regions, allowing users to see exactly where the AI is focusing during analysis. A new AI vision overlay interface was introduced with adjustable heatmap opacity so farmers can compare original images and AI attention layers in real time. The system now includes a learning insight module that tracks recurring disease patterns from historical analyses and classifies them into informational, warning, or critical recurrence levels. Visual confidence indicators such as severity badges, risk coloring, and dynamic confidence bars were enhanced to improve interpretability.

### day-21 Weather Map and Forecast Reports
integrating a smart Crop Calendar system enhanced with weather and environmental risk fusion. The Crop Calendar now combines crop growth stages with pest and disease risk insights, an irrigation planner, and a 7-day weather-based risk outlook using real weather data. This allows farmers to visually understand how upcoming temperature, humidity, and rainfall conditions may impact disease spread and pest pressure, and to plan irrigation accordingly. The UI was carefully integrated into the existing Crop Calendar page to keep the experience simple, farmer-friendly, and actionable, while maintaining consistency with the rest of the application.

### day-22 AI Strengthening
Today’s development focused on strengthening core AI explainability, farm-context awareness, and system stability across the CropGuard AI platform. The Farmer Registration module was enhanced to capture richer farm metadata including farm size, cultivation type, plantation date, and automatically derived crop age and growth stage.The AI Vision Heatmap UI was stabilized by defaulting overlays to hidden, controlling opacity bounds, and preventing visual noise. Critical UI crashes (white screen on “Why?”) were fixed by guarding AI explanation arrays, ensuring fail-safe rendering even when backend data is missing.

### day-23 Camera Module Integrated
Uploading images by using devices camera image can now be done from the upload image option in home page.

### day-24 Enhancements
Some enhencements done to the dashboard page which now shows predictable causes of the disease.

### day-25 Final Check and Improvals
Today’s work focused on completing user lifecycle handling, usability, and deployment readiness for the CropGuard AI project. A persistent farmer access system was finalized by introducing an “Already Registered” login flow, allowing farmers to re-access their account using their name after logout. The application now maintains a clear distinction between stored farmer profiles and the active logged-in farmer, ensuring correct session restoration. A profile dropdown was added to the Home page with farmer details and a logout option, improving account visibility and control. The Home UI was refined by removing unused options to keep the interface focused. Camera-based image capture was verified for mobile compatibility, ensuring the project works consistently across desktop and mobile browsers when deployed. Overall, today’s changes strengthened authentication logic, improved UX clarity, and finalized the app for real-world usage and evaluation.