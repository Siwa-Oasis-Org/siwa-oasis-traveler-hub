# ðŸŒ´ Siwa Oasis - Smart Tourism Platform (Frontend)

<div align="center">
  <img src="https://img.shields.io/badge/Frontend-HTML5%20%7C%20CSS3%20%7C%20JS-emerald?style=for-the-badge&logo=html5" alt="Tech Stack" />
  <img src="https://img.shields.io/badge/Aesthetics-Glassmorphic%20%7C%20Dynamic-violet?style=for-the-badge" alt="Design Style" />
  <img src="https://img.shields.io/badge/AI_Guide-Integrated-orange?style=for-the-badge" alt="AI Features" />
</div>

## ðŸ“Œ Overview (Description)
**Siwa Oasis Frontend** is a premium, highly responsive user interface designed for a smart tourism and travel platform focused on the unique Siwa Oasis experience. It provides interactive widgets for tourists to book bus tickets, plan detailed custom trips, explore historical destinations, and interact with a smart AI travel assistant.

---

## âœ¨ Key Features
*   **Interactive Booking System**: A fluid, multi-step booking wizard for transport tickets with client-side price calculation.
*   **AI Travel Guide Chatbot**: An elegant chat window interface featuring instant AI guidance for tourist locations.
*   **Destination Discovery Grid**: Responsive grid layout showcasing local spots, springs, and temples with hover micro-animations.
*   **Authentication Portal**: Sleek login/register screens with client validation.

---

## ðŸ› ï¸ Tech Stack & Styling Assets
*   **Structure**: Semantic HTML5 for modern SEO and structure.
*   **Styling**: Pure CSS3 with custom variables, utilizing dynamic blur backdrops (glassmorphism) and custom transitions.
*   **Interactions**: Vanilla JS DOM controller managing modals, booking parameters, tab states, and API requests.
*   **Font System**: Outfit and Playfair Display for premium typography.

---

## ðŸ“ Architecture
The client interfaces communicate directly with the Siwa Oasis REST API using async JavaScript fetch calls defined in pi.js:
`	ext
HTML/CSS UI <â”€â”€> DOM Listeners (auth.js, bus-Booking.js) <â”€â”€> API Helper (api.js) <â”€â”€> REST API
`

---

## ðŸ“‚ Repository Layout (Folder Structure)
`	ext
siwa-oasis-frontend/
â”œâ”€â”€ assets/                  # Media, logos, and illustrations
â”œâ”€â”€ index.html               # Main landing page
â”œâ”€â”€ about.html               # Informational overview
â”œâ”€â”€ auth.html                # Login and registration panel
â”œâ”€â”€ bus-booking.html         # Bus ticketing interface
â”œâ”€â”€ ai-guide.html            # AI Travel chatbot client
â”œâ”€â”€ contact.html             # Customer support form
â”œâ”€â”€ api.js                   # Main API wrapper for backend connectivity
â”œâ”€â”€ auth.js                  # Frontend auth routing logic
â”œâ”€â”€ bus-Booking.js           # Ticketing and calculation engine
â”œâ”€â”€ ai-guide.js              # Chat UI messaging events
â””â”€â”€ [css files]              # Specific component stylesheets (index.css, about.css, auth.css, etc.)
`

---

## ðŸš€ Installation & Local Setup
No build step or packaging tool is needed. Simply run a local development server to serve the static assets.

### ðŸ“‹ Prerequisites
*   A modern web browser.
*   Local server running on port 5500 or similar.

### âš™ï¸ Quick Start
1.  Clone the repository:
    `ash
    git clone https://github.com/Siwa-Oasis-Org/frontend.git
    cd frontend
    `
2.  Open pi.js and set the backend address:
    `javascript
    const API_BASE_URL = 'http://localhost:3000/api';
    `
3.  Launch a simple web server:
    `ash
    # Python 3 example
    python -m http.server 5500
    `
4.  Access the platform at http://localhost:5500.

---

## ðŸ”® Future Enhancements
*   [ ] Integration of interactive maps and GPS tracking.
*   [ ] Multi-currency online payment gateway (Stripe/PayPal).
*   [ ] Multi-language support (English/Arabic/French).

---

## ðŸ‘¥ Contributors
*   **Sayed Herzallah** - Lead Frontend Developer & UI/UX Designer.

---

## ðŸ“„ License
This project is licensed under the **MIT License**.
