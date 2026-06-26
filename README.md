# Siwa Oasis Traveler Hub: Glassmorphic Tourism Client & AI Guide

<div align="center">
  <img src="https://capsule-render.vercel.app/api?type=waving&color=0:0d1117,100:059669&height=160&section=header&text=Siwa%20Traveler%20Hub&fontSize=42&fontColor=ffffff&fontFamily=Outfit" width="100%" />
</div>

<div align="center">
  ![HTML5](https://img.shields.io/badge/HTML5-Structure-orange?logo=html5&style=for-the-badge) ![CSS3](https://img.shields.io/badge/CSS3-Design-blue?logo=css3&style=for-the-badge) ![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript&style=for-the-badge) ![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
</div>

بوابة **عميل واحة سيوة السياحي** هي منصة تفاعلية تتميز بتصميم زجاجي عصري (Glassmorphism) تمكن السياح من حجز تذاكر باصات السفر وتخطيط مسارات الرحلة والتواصل الفوري مع مرشد سياحي ذكي يعتمد على الذكاء الاصطناعي.

This repository houses the high-fidelity responsive traveler frontend client for the **Siwa Oasis Ecosystem**. Built using semantic HTML5, custom HSL glassmorphic variables, and Vanilla JavaScript UI controllers.

---

## 🧬 System Interfaces & Layouts

The traveler client interface provides specialized panels:

1.  **Onboarding Gateway (`welcome.html`)**: Introductory page welcoming tourists with background media and portal links.
2.  **Home Hub (`index.html`)**: Main dashboard detailing tourist landmarks and search functions.
3.  **Auth Panel (`auth.html`, `auth.js`)**: Clean user login, register, and JWT cookie management structures.
4.  **Bus Booking Wizard (`bus-booking.html`, `bus-Booking.js`)**: Multi-step ticket reservation wizard.
5.  **Trip Planner Panel (`trip-planner.html`, `trip-planner.js`)**: Interactive scheduler allowing users to drag and build trip itineraries.
6.  **AI Travel Guide (`ai-guide.html`, `ai-guide.js`)**: Intelligent chat assistant query panel.
7.  **Interactive Map (`map.html`, `map.js`)**: Leaflet/SVG based map pointing to oasis hotels, hot springs, and temples.
8.  **Places Directory (`places.html`, `places.js`)**: Attraction lists detailing historic monuments and safari coordinates.

---

## 🧬 UI Navigation & Interaction Flow

The frontend coordinates multi-panel views and routes:

```mermaid
graph TD
    Welcome[welcome.html - Entry Gateway] -->|Enter Portal| Index[index.html - Main Hub]
    Index -->|Authentication| Auth[auth.html - Access Gate]
    Index -->|Book Tickets| Booking[bus-booking.html - Ticketing Wizard]
    Index -->|Build Itinerary| Planner[trip-planner.html - Scheduler]
    Index -->|Chat with Guide| AI[ai-guide.html - AI Chatbot]
    Index -->|Interactive Guides| Map[map.html - Landmark Map]
    
    AI -->|Fetch Chat Reply| ExpressAPI[Query Express Backend Server API]
    Booking -->|Post Ticket Transaction| ExpressAPI
```

---

## 🛠️ Technology Stack & Assets

*   **Structure**: Semantic HTML5 markup built for responsive UI.
*   **Design & Theme**: Premium HSL variables and CSS3 backdrop blurs (`backdrop-filter`) creating glassmorphic widgets.
*   **Logic Engine**: Asynchronous Vanilla JavaScript controllers (`fetch/async/await`) communicating with the REST backend api.
*   **Fonts**: Custom Outfit font integration for elegant styling.

---

## 📂 Repository Module Layout

```text
siwa-oasis-traveler-hub/
├── *.css                # Glassmorphic stylesheets per module (trip, map, guide)
├── *.js                 # Custom scripts for wizard logic and API fetching
├── photos/              # Oasis gallery and background graphics assets
├── index.html           # Main traveler dashboard
├── welcome.html         # Portal onboarding gate
├── auth.html            # Authentication layout
├── bus-booking.html     # Tickets wizard layout
├── trip-planner.html    # Trip schedule builder
├── ai-guide.html        # AI Chat assistant panel
├── map.html             # Interactive landmark coordinates map
└── places.html          # Scenic spots directory listing
```

---

## ⚡ Local Setup & Execution

Since the project consists of compiled static assets, it has no package build steps or dev runtime dependencies:

```bash
# 1. Clone the organization repository
git clone https://github.com/Siwa-Oasis-Org/siwa-oasis-traveler-hub.git
cd siwa-oasis-traveler-hub

# 2. Run a local server (e.g. using Python, Live Server, or Nginx)
# Python 3 example:
python -m http.server 8080

# 3. Open http://localhost:8080 in your browser
```

---

## 📄 License
Licensed under the **MIT License**.
