# St. Patrick's Catholic Church Website

> Official website for St. Patrick's Catholic Church, Igbogila, Ipaja, Lagos, Nigeria

[![Status](https://img.shields.io/badge/status-live-success)](https://stpatrickigbogilaipaja.com)
[![Last Updated](https://img.shields.io/badge/updated-January%202025-blue)]()

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Deployment](#deployment)
- [Recent Updates](#recent-updates)
- [Contributing](#contributing)
- [Contact](#contact)

## 🏛️ About

St. Patrick's Catholic Church website serves the vibrant Catholic community in Igbogila, Ipaja, Lagos. The site provides comprehensive information about our parish, including mass times, ministries, events, sacraments, and online services.

**History:** Serving God's people since 1932

**Location:** Igbogila, Ipaja, Lagos, Nigeria

**Website:** [stpatrickigbogilaipaja.com](https://stpatrickigbogilaipaja.com)

## ✨ Features

### 🎯 Core Features
- **Parish Information** - Complete history and information about the church
- **Mass Times & Schedules** - Weekly mass times and special liturgical programs
- **Online Parish Registration** - Digital registration for new parishioners
- **Mass Booking System** - Book masses for special intentions
- **Ministry & Organizations** - Complete list of parish societies and their activities
- **School Information** - Comprehensive history and details of St. Patrick's School (1949-2025)
- **Event Calendar** - Announcements, upcoming events, and parish news
- **Sacraments Information** - Baptism, Confirmation, Marriage, Holy Communion, Confession
- **Contact Forms** - Easy communication with parish office
- **Photo Gallery** - Parish life and events showcase
- **Donation System** - Secure online giving

### 🎨 Design Features
- Modern, responsive design
- Mobile-first approach
- Smooth animations and transitions
- Accessibility-compliant (WCAG 2.1)
- Fast loading times
- SEO optimized

### 📱 Mobile Features
- Fully responsive navigation
- Touch-optimized dropdowns
- Mobile-friendly forms
- Swipeable image galleries
- Progressive enhancement

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with CSS variables
- **JavaScript (ES6+)** - Interactive functionality
- **Responsive Design** - Mobile-first approach

### Backend
- **PHP** - Server-side processing
- **JSON** - Data storage
- **`.htaccess`** - Security and routing

### Features & Libraries
- Custom animation system
- Form validation
- Lazy loading images
- Smooth scrolling
- Intersection Observer API
- Fetch API for AJAX

### Security
- Input sanitization
- CSRF protection
- Honeypot spam prevention
- Secure file permissions
- Rate limiting

## 📁 Project Structure

```
ST_Patrick/
├── new-design/                    # Main website files
│   ├── index.html                # Homepage
│   ├── about.html                # About page with church & school history
│   ├── parish-register.html     # Parish registration form
│   ├── ministries.html          # Organizations and ministries
│   ├── our-parish.html          # Parish councils and committees
│   ├── mass-times.html          # Mass schedules
│   ├── contact.html             # Contact form
│   ├── donate.html              # Online giving
│   ├── school.html              # School information
│   │
│   ├── css/                     # Stylesheets
│   │   ├── modern-variables.css    # CSS variables and animations
│   │   └── modern-components.css   # Component styles
│   │
│   ├── js/                      # JavaScript files
│   │   └── main.js              # Main functionality
│   │
│   ├── images/                  # Image assets
│   │   ├── st-patricks-logo.jpeg
│   │   └── organisation/        # Ministry images
│   │
│   ├── data/                    # JSON data storage
│   │   ├── announcements.json
│   │   ├── parish-registrations.json
│   │   ├── contact-submissions.json
│   │   └── mass-bookings.json
│   │
│   ├── admin/                   # Admin dashboard
│   │   └── index.php
│   │
│   ├── *.php                    # Form handlers
│   ├── config.php               # Configuration
│   ├── .htaccess                # Security & routing
│   ├── robots.txt               # SEO
│   └── sitemap.xml              # SEO
│
└── README.md                    # This file
```

## 🚀 Installation

### Prerequisites
- Web server (Apache/Nginx)
- PHP 7.4 or higher
- SSL certificate (recommended)

### Local Development Setup

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/ST_Patrick.git
cd ST_Patrick
```

2. **Configure environment**
```bash
cd new-design
cp .env.example .env
# Edit .env with your settings
```

3. **Set permissions**
```bash
chmod 755 new-design/data
chmod 644 new-design/data/*.json
```

4. **Start local server**
```bash
# Using PHP built-in server
php -S localhost:8000 -t new-design

# Or configure Apache/Nginx to point to new-design/
```

5. **Access the site**
```
http://localhost:8000
```

## 📦 Deployment

### Production Deployment Steps

1. **Upload files to server**
```bash
# Upload new-design/ contents to public_html or www/
```

2. **Configure .htaccess**
- Ensure proper redirects
- Set security headers
- Enable compression

3. **Set proper permissions**
```bash
chmod 755 data/
chmod 644 data/*.json
chmod 644 *.php
```

4. **Clear cache**
- Browser cache
- Server cache (if applicable)
- CDN cache (if using)

5. **Test functionality**
- Forms submission
- Mobile navigation
- Responsive design
- Cross-browser compatibility

### Files NOT to Deploy
- `.env` (use `.env.example` as template)
- `*.backup` files
- `*-old.*` files
- Development/testing files
- `.git/` directory

## 🆕 Recent Updates

### January 2025 - Major Feature Release

#### ✨ New Features
- **Animation System**: Smooth fade-in, slide, and hover animations
- **School History**: Comprehensive 1949-2024 timeline on About page
- **Parish Societies**: Added 6 new societies to registration form
  - Men of Order And Discipline
  - Young Catholic Workers Movement
  - Missionary Childhood Association
  - Church Choir
  - Board of Lectors
  - Church Warden

#### 🐛 Bug Fixes
- Fixed mobile dropdown menus (Programmes, Parish News, Media & Resources, Facilities)
- Enhanced touch event handling
- Fixed timeline content visibility

#### ♿ Accessibility
- Added ARIA attributes for better screen reader support
- Implemented `prefers-reduced-motion` for motion-sensitive users
- Enhanced keyboard navigation

#### 🎨 UI/UX Improvements
- St. Patrick Society displays logo instead of emoji
- Removed phone columns from organization tables
- Enhanced button interactions with ripple effects
- Improved card hover animations

#### 📱 Mobile Optimizations
- Robust dropdown functionality
- Better touch event handling
- Improved navigation experience

## 🤝 Contributing

### Development Workflow

1. Create a new branch
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes
```bash
# Edit files
git add .
git commit -m "Description of changes"
```

3. Push to repository
```bash
git push origin feature/your-feature-name
```

4. Create Pull Request on GitHub

### Coding Standards
- Use semantic HTML5
- Follow CSS BEM methodology
- Write vanilla JavaScript (ES6+)
- Comment complex logic
- Test on multiple devices/browsers

### Testing Checklist
- [ ] Desktop browsers (Chrome, Firefox, Safari, Edge)
- [ ] Mobile devices (iOS, Android)
- [ ] Tablet responsiveness
- [ ] Form validation
- [ ] Accessibility (keyboard navigation, screen readers)
- [ ] Performance (page load speed)

## 📞 Contact

**St. Patrick's Catholic Church, Igbogila**

- **Address:** Igbogila, Ipaja, Lagos, Nigeria
- **P.O. Box:** 2189, Ipaja, Lagos
- **Phone:** +234 802 344 4069
- **Email:** Info@stpatrickigbogilaipaja.com
- **Website:** [stpatrickigbogilaipaja.com](https://stpatrickigbogilaipaja.com)

**Parish Priest:** Rev. Fr. Cyriacus Agbapajuru C.S.Sp

**Office Hours:**
- Monday, Tuesday, Friday: 9:00 AM - 4:00 PM
- Wednesday: 8:00 AM - 12:00 PM

---

## 📄 License

This project is maintained by St. Patrick's Catholic Church, Igbogila. All rights reserved.

---

## 🙏 Acknowledgments

- Parish Priests and Staff
- Web Development Team
- Parish Community
- All Contributors

---

<p align="center">
  <strong>"For where two or three gather in my name, there am I with them." - Matthew 18:20</strong>
</p>

<p align="center">
  Made with ❤️ for St. Patrick's Catholic Church Community
</p>

<p align="center">
  <sub>© 2025 St. Patrick's Catholic Church, Igbogila, Ipaja. All rights reserved.</sub>
</p>
