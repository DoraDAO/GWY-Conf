# Girls Who Yap - Landing Page

A premium, scroll-driven landing page for the Girls Who Yap conference. Built with React, Vite, and Framer Motion, featuring sophisticated animations inspired by modern art marketplace aesthetics.

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Open PowerShell in the project directory (`c:/Users/nihar/Downloads/ConfGWY`)

2. Install dependencies:
```powershell
npm install
```

3. Start the development server:
```powershell
npm run dev
```

4. Open your browser to the URL shown in the terminal (usually `http://localhost:5173`)

## 🎨 Features

- **Responsive Navbar** with animated dropdowns
- **Multi-Frame Hero Animation** - Scroll-linked card explosion
- **Editorial Sections** with word-by-word text reveals
- **Floating Cards** with background text animations
- **Featured Speaker Grid** with center spotlight
- **Avatar Community Grid** with continuous floating motion
- **Pricing Tiers** - 3-tier registration system
- **Marquee Section** with scrolling text and floating icons
- **Programs Carousel** - Interactive program showcase
- **Premium Footer** with newsletter signup

## 🎯 Design Philosophy

This site replicates the exact aesthetic of Pallet Ross:
- Light gray background (#F5F5F5)
- Bold black typography with muted gray accents
- Rounded cards with soft shadows
- Vibrant accent colors (Pink, Purple, Teal, Orange)
- Smooth scroll-linked animations
- Premium, calm motion with no aggressive effects

## 📁 Project Structure

```
ConfGWY/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx
│   │   ├── HeroSection.jsx
│   │   ├── EditorialSection.jsx
│   │   ├── PartnersSection.jsx
│   │   ├── FloatingCardsSection.jsx
│   │   ├── SequentialCardsSection.jsx
│   │   ├── VisionSection.jsx
│   │   ├── FeaturedSpeakerSection.jsx
│   │   ├── AvatarGridSection.jsx
│   │   ├── PricingSection.jsx
│   │   ├── MarqueeSection.jsx
│   │   ├── MarketplaceSection.jsx
│   │   └── Footer.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
└── vite.config.js
```

## 🛠️ Technologies

- **React 18** - Component framework
- **Vite** - Build tool and dev server
- **Framer Motion** - Animation library
- **CSS Custom Properties** - Design system

## 🎭 Animation Highlights

### Scroll-Based Animations
- Hero card explosion uses `useScroll` and `useTransform`
- Smooth transitions tied to scroll position
- Reversible animations (work both directions)

### Viewport Triggers
- Components animate when scrolled into view
- Staggered timing for sequential reveals
- `useInView` hook for performance

### Continuous Animations
- Avatar floating motion (infinite loop)
- Marquee text scrolling
- Icon floating effects

## 📱 Responsive Design

- **Desktop** (1440px+): Full complexity with all animations
- **Tablet** (768-1024px): Simplified grids, adjusted spacing
- **Mobile** (<768px): Single-column layouts, touch-optimized

## 🎨 Color Palette

- **Primary Pink**: #FF006E
- **Purple**: #9333EA
- **Teal**: #06B6D4
- **Orange**: #F97316
- **Yellow**: #FDE047

## 📝 Content Customization

All text content follows the Girls Who Yap branding:
- Replace placeholder images with actual conference photos
- Update speaker names and details
- Add real partner logos
- Customize pricing tiers

## 🚨 Troubleshooting

If you encounter PowerShell execution policy errors:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

Or run commands with bypass:
```powershell
powershell -ExecutionPolicy Bypass -Command "npm install"
powershell -ExecutionPolicy Bypass -Command "npm run dev"
```

## 📄 License

Built for Girls Who Yap • Powered by Doradao
