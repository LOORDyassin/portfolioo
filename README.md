<div align="center">

# ✦ LOORD.Y! — Personal Portfolio

### Yassine Souissi · Product Designer & Digital Creative Director

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-Visit_Portfolio-7c3aed?style=for-the-badge)](https://loordyassin.github.io/portfolioo/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Deploy](https://img.shields.io/github/actions/workflow/status/LOORDyassin/portfolioo/deploy.yml?style=for-the-badge&label=Deploy&logo=github-actions)](https://github.com/LOORDyassin/portfolioo/actions)

<br/>

A modern, fully responsive personal portfolio built with React 19 and Vite — featuring smooth animations, a working contact form, and a clean dark aesthetic.

</div>

---

## ✨ Features

- **Smooth Animations** — Powered by Framer Motion with scroll-triggered reveals and micro-interactions
- **Fully Responsive** — Pixel-perfect on mobile, tablet, and desktop
- **Working Contact Form** — EmailJS integration sends real emails from any device
- **Project Showcase** — Filterable project grid with custom SVG banners
- **Skills & Stats** — Animated progress bars and live counters
- **Dark Aesthetic** — Custom glass-morphism cards, gradient text, and glowing orbs
- **Fast Deployment** — GitHub Actions CI/CD pipeline to GitHub Pages

---

## 🛠️ Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 19 + Vite 8 |
| Styling | Tailwind CSS v4 |
| Animations | Framer Motion |
| Icons | React Icons (Font Awesome) |
| Contact | EmailJS Browser SDK |
| Deployment | GitHub Pages via GitHub Actions |
| Design | Figma + Custom SVG Artwork |

---

## 🗂️ Project Structure

```
my-portfolio/
├── public/
│   ├── images/                    # Profile photos
│   ├── web-my-chat-banner.svg
│   ├── clothes-banner.svg
│   ├── login-challenge-banner.svg
│   ├── free-palestine.svg
│   ├── ieee-smc-banner.svg
│   └── coming-soon-banner.svg
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Projects.jsx
│   │   ├── Services.jsx
│   │   ├── Contact.jsx
│   │   └── Footer.jsx
│   ├── data/
│   │   └── portfolio.js           # All content in one place
│   └── main.jsx
├── .github/workflows/
│   └── deploy.yml                 # CI/CD pipeline
└── vite.config.js
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/LOORDyassin/portfolioo.git
cd portfolioo

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Variables

Create a `.env.local` file in the root:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

> Get your keys at [emailjs.com](https://emailjs.com)

### Build & Deploy

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Deployment is automatic on every push to `main` via GitHub Actions.

---

## 📁 Sections

| # | Section | Description |
|---|---------|-------------|
| 01 | **Hero** | Name, tagline, photo, stats, and social links |
| 02 | **About** | Bio, skills, education, and services |
| 03 | **Services** | Graphic Design, Web Development, Video Design |
| 04 | **Projects** | Filterable showcase of real projects |
| 05 | **Contact** | Working email form + social links |

---

## 📬 Contact

**Yassine Souissi**

[![Email](https://img.shields.io/badge/Email-yassinesouissi619@gmail.com-EA4335?style=flat-square&logo=gmail)](mailto:yassinesouissi619@gmail.com)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Yassine_Souissi-0A66C2?style=flat-square&logo=linkedin)](https://www.linkedin.com/in/yassine-souissi-34a8482a7/)
[![GitHub](https://img.shields.io/badge/GitHub-LOORDyassin-181717?style=flat-square&logo=github)](https://github.com/LOORDyassin)
[![Instagram](https://img.shields.io/badge/Instagram-loord.y19-E4405F?style=flat-square&logo=instagram)](https://www.instagram.com/loord.y19/)

---

<div align="center">

Made with ❤️ by **Yassine Souissi** — Tunisia 🇹🇳

</div>