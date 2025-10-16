# Melissa Audio Website - Site Structure Documentation

## Overview

This is a Vue 3 portfolio website showcasing music production and audio utility applications. The site is statically generated using vite-ssg and deployed on GitHub Pages.

**Live URL**: https://mosynthkey.github.io/

## Tech Stack

- **Framework**: Vue 3.5.18 with Composition API
- **Build Tool**: Vite 7.0.6
- **UI Framework**: Vuetify 3.10.3
- **SSG**: vite-ssg 28.2.1 (Static Site Generation)
- **Router**: Vue Router 4.5.1
- **Icons**: @mdi/font 7.4.47 (Material Design Icons)
- **Head Management**: @unhead/vue 2.0.19 (for SEO meta tags)
- **I18n**: vue-i18n 9.14.5 (Internationalization)
- **Node Version**: ^20.19.0 || >=22.12.0

## Project Structure

```
mosynthkey.github.io/
├── src/
│   ├── main.js                 # Application entry point with vite-ssg
│   ├── App.vue                 # Root component with header/footer/social share
│   ├── router/
│   │   └── index.js           # Route definitions
│   ├── views/
│   │   ├── HomeView.vue       # Product grid homepage
│   │   ├── ProductView.vue    # Generic product detail page
│   │   └── WavyProductView.vue # Specialized Wavy app page
│   ├── components/
│   │   └── SocialShare.vue    # Social media share buttons component
│   ├── data/
│   │   └── products.js        # Product data with image imports
│   ├── plugins/
│   │   ├── vuetify.js         # Vuetify configuration
│   │   └── i18n.js            # Vue I18n configuration
│   ├── locales/
│   │   ├── ja.js              # Japanese translations
│   │   └── en.js              # English translations
│   └── assets/
│       └── images/
│           ├── wavy.png
│           ├── melissa.png
│           ├── fa-studioset-editor.png
│           ├── volcafm2-utility.png
│           ├── modx-liveset-utility.png
│           └── Wavy/           # Wavy-specific images
│               ├── wavy_top.png
│               ├── musician.png
│               ├── podcast.png
│               ├── 1_select.png
│               ├── 2_layout.png
│               ├── 3_background.png
│               ├── 4_waveform.png
│               ├── 5_text.png
│               ├── 5_text_album.png
│               └── 6_font.png
├── docs/                       # Build output directory (for GitHub Pages)
│   ├── index.html
│   ├── sitemap.xml
│   ├── app-ads.txt
│   └── products/
│       ├── wavy.html
│       ├── melissa.html
│       ├── fa-studioset-editor.html
│       ├── volcafm2-utility.html
│       └── modx-liveset-utility.html
├── vite.config.js              # Vite and SSG configuration
└── package.json

```

## Routing Configuration

Located in: `src/router/index.js`

```javascript
{
  path: '/',
  name: 'home',
  component: HomeView
}
```
Displays a grid of all products with cards linking to detail pages or external sites.

```javascript
{
  path: '/products/wavy',
  name: 'wavy-product',
  component: WavyProductView
}
```
Specialized product page for Wavy app with:
- YouTube video embed
- Recommendation cards with background images
- Step-by-step usage instructions with screenshots
- SEO optimizations including structured data

```javascript
{
  path: '/products/:id',
  name: 'product',
  component: ProductView
}
```
Generic product detail page for other apps (melissa, fa-studioset-editor, volcafm2-utility, modx-liveset-utility).

## Products Data

Located in: `src/data/products.js`

All product information is centralized here with proper ES6 image imports:

```javascript
import melissaScreenshot from '@/assets/images/melissa.png';
import wavyScreenshot from '@/assets/images/wavy.png';
// ... other imports

export const products = [
  {
    id: 'wavy',
    name: 'Wavy',
    description: 'An iOS app to create cool videos from album art and music.',
    appStore: 'https://apps.apple.com/jp/app/wavy-music-video-studio/id6753092962',
    screenshot: wavyScreenshot,
    detailImage: wavyTopImage
  },
  // ... other products
];
```

**Key Products**:
1. **Wavy** - iOS music video creation app (App Store)
2. **Melissa** - Audio browser (GitHub)
3. **FA StudioSet Editor** - Roland FA series editor (GitHub)
4. **volcafm2 Utility** - Korg volcafm2 patch librarian (GitHub)
5. **MODX Liveset Utility** - Yamaha MODX liveset manager (GitHub)

## Asset Management Pattern

### ✅ Correct Pattern (used in products.js and WavyProductView.vue)

```javascript
// Import images in script section
import image from '@/assets/images/example.png';

// Use imported reference in template
<v-img :src="image" />
```

**Why this works**:
- Vite processes imported assets through its asset pipeline
- Images are hashed and copied to the dist/docs directory
- Works correctly in both development and production

### ❌ Incorrect Pattern (DO NOT USE)

```vue
<!-- String paths don't work in production -->
<v-img src="/src/assets/images/example.png" />
```

**Why this fails**:
- String paths are not processed by Vite's build system
- Images won't be copied to the output directory
- Results in 404 errors in production (GitHub Pages)

## Build Configuration

Located in: `vite.config.js`

```javascript
{
  base: '/',
  build: {
    outDir: 'docs',  // GitHub Pages serves from /docs
  },
  ssgOptions: {
    script: 'async',
    formatting: 'minify',
    includedRoutes: [
      '/',
      '/products/wavy',
      '/products/melissa',
      '/products/volcafm2-utility',
      '/products/modx-liveset-utility',
      '/products/fa-studioset-editor',
    ]
  }
}
```

**Key Points**:
- Output directory is `docs/` for GitHub Pages compatibility
- Static routes are pre-rendered during build
- All product pages are explicitly included in SSG

## SEO Implementation

### Sitemap (docs/sitemap.xml)

Contains all pages with:
- Homepage: priority 1.0, weekly updates
- Wavy product page: priority 0.9, weekly updates
- Other product pages: priority 0.7-0.8, monthly updates

### WavyProductView.vue SEO Features

```javascript
useHead({
  title: 'Wavy - Music Video Studio | 音楽動画作成アプリ',
  meta: [
    { name: 'description', content: '...' },
    { name: 'keywords', content: '...' },
    { property: 'og:*', ... },      // Open Graph tags
    { name: 'twitter:*', ... },      // Twitter Card tags
    { name: 'apple-itunes-app', ... }, // Smart App Banner
  ],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        // ... structured data
      })
    }
  ]
})
```

**SEO Features**:
- Meta descriptions and keywords (Japanese)
- Open Graph tags for social sharing
- Twitter Card tags
- Structured data (Schema.org SoftwareApplication)
- Apple Smart App Banner
- Canonical URLs
- Google site verification

### App.vue Header Logic

```javascript
const isProductPage = computed(() =>
  route.name === 'product' || route.name === 'wavy-product'
)
```

Main header is hidden on product pages (they have their own app bars).

## Development Workflow

### Scripts

```bash
npm run dev      # Start dev server
npm run build    # Build for production (output to docs/)
npm run preview  # Preview production build
npm run lint     # Run ESLint with auto-fix
```

### Git Workflow

- **Main branch**: `main`
- **Deployment**: GitHub Pages serves from `/docs` directory
- **Recent commits**:
  - Changed URL configuration
  - Updated website content
  - Created app-ads.txt

## Internationalization (i18n)

### Implementation

The site supports multiple languages using Vue I18n 9:

**Supported Languages**:
- 🇯🇵 Japanese (ja) - Default
- 🇬🇧 English (en)

**Key Features**:
- Language selector ComboBox in header (all pages) and Wavy product page
- Translations stored in `src/locales/ja.js` and `src/locales/en.js`
- LocalStorage persistence for language preference
- SEO meta tags localized per language
- Dynamic page titles and descriptions

**Translation Structure**:
```javascript
{
  common: { siteName, copyright, backButton, details },
  home: { viewOnGitHub, appStore, description },
  products: {
    wavy: { name, description, heroTitle, shareTitle, ... },
    melissa: { name, description },
    faStudioSetEditor: { name, description },
    volcafm2Utility: { name, description },
    modxLivesetUtility: { name, description }
  }
}
```

**Adding New Languages**:
1. Create new locale file in `src/locales/` (e.g., `fr.js`)
2. Import and register in `src/plugins/i18n.js`
3. Add to `availableLocales` array in `App.vue` and `WavyProductView.vue`

### Product ID to Translation Key Mapping

Product IDs use kebab-case (e.g., `fa-studioset-editor`), while translation keys use camelCase (e.g., `faStudioSetEditor`). The conversion is handled automatically in `HomeView.vue`:

```javascript
// fa-studioset-editor → faStudioSetEditor
// volcafm2-utility → volcafm2Utility
// modx-liveset-utility → modxLivesetUtility
```

Special handling for `fa-studioset-editor` → `faStudioSetEditor` (capital S in Set).

## Social Sharing

### SocialShare Component

Located in: `src/components/SocialShare.vue`

**Supported Platforms (2025)**:
- **X (Twitter)** - Black icon, supports hashtags
- **Facebook** - Blue icon
- **LINE** - Green icon (popular in Japan)
- **LinkedIn** - Blue icon
- **Reddit** - Orange icon
- **Email** - Gray icon

**Features**:
- Uses Material Design Icons (@mdi/font)
- Official brand colors for each platform
- Opens in new tab with `rel="noopener noreferrer"`
- URL encoding for special characters
- Tracking function placeholder for analytics

**Implementation**:
- Displayed in footer (right side) on all pages
- Props: `url`, `title`, `description`, `hashtags`
- No external dependencies or tracking scripts
- Lightweight and privacy-friendly

## Known Issues

### ✅ Previously Resolved Issues

**Image Loading Issue** (Resolved 2025-10-13):
- Fixed: Renamed `musician.png.png` → `musician.png`
- Fixed: Renamed `podcast.png.png` → `podcast.png`
- Fixed: Updated imports in WavyProductView.vue
- All images now properly loaded in production

No current known issues.

## Component Architecture

### App.vue (Root Component)
- Compact header with language selector (hidden on product pages)
- Site name "Melissa Audio" in h6 font size
- Router-view for page content
- Footer with copyright (left) and social share buttons (right)
- Manages language switching and persistence

### HomeView.vue (Homepage)
- Responsive grid layout (12 cols mobile, 6 tablet, 4 desktop)
- Product cards with fixed height (380px) for uniformity
- Card structure: image (200px) → title → description (flex-grow) → actions (bottom)
- GitHub icon-only button, App Store text button, Details arrow button
- Multi-language support with dynamic translation key conversion

### SocialShare.vue (Reusable Component)
- Six social platform buttons (X, Facebook, LINE, LinkedIn, Reddit, Email)
- Small circular icon buttons with brand colors
- Accepts props: url, title, description, hashtags
- Click tracking ready for analytics integration

### WavyProductView.vue (Featured Product Page)
- Custom app bar with back button, language selector (rightmost), and download link
- Hero image section (400px height)
- Promotional text with YouTube video embed (16:9 responsive)
- Recommendation cards (musician, podcaster) with overlay effects
- Step-by-step usage instructions (7 steps) with screenshots
- Fully localized content (Japanese/English)
- SEO-optimized with structured data and dynamic meta tags

### ProductView.vue (Generic Product Page)
- Used for melissa, fa-studioset-editor, volcafm2-utility, modx-liveset-utility
- Standard layout with product information
- GitHub links when available
- Could be enhanced with i18n in the future

## Styling Approach

- **Framework**: Vuetify 3 (Material Design)
- **Global styles**: Defined in App.vue
- **Background color**: #F5F5F5 (Vuetify default)
- **Component styles**: Scoped styles in each .vue file
- **Icons**: Material Design Icons via @mdi/font

### Key Style Classes

```css
/* Responsive video container (16:9 aspect ratio) */
.video-container {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
}

/* Recommendation card overlay effect */
.recommendation-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
```

## Best Practices for This Project

1. **Always import images** - Never use string paths in templates
2. **Use computed properties** for dynamic values
3. **Leverage Vuetify components** - Consistent UI with v-card, v-img, v-btn, etc.
4. **SEO-first approach** - Include meta tags, structured data, and semantic HTML
5. **Responsive design** - Use Vuetify's grid system (cols, sm, md attributes)
6. **Static route generation** - Add new product routes to vite.config.js ssgOptions
7. **Centralized data** - Keep product information in src/data/products.js
8. **I18n everywhere** - All user-facing text should use t() translation function
9. **Consistent card heights** - Use fixed heights with flex-grow for uniform layouts
10. **Social sharing** - Use SocialShare component for consistent sharing across pages

## Recent Updates (2025-10-13)

### Internationalization
- ✅ Implemented Vue I18n 9 with Japanese/English support
- ✅ Language selector in header and product pages
- ✅ LocalStorage persistence for language preference
- ✅ All Wavy product content fully localized
- ✅ Dynamic SEO meta tags per language

### Social Sharing
- ✅ Created custom SocialShare component
- ✅ Supports 6 major platforms (X, Facebook, LINE, LinkedIn, Reddit, Email)
- ✅ Integrated in footer on all pages
- ✅ Uses official brand colors and MDI icons

### UI/UX Improvements
- ✅ Compact header with smaller font size
- ✅ Fixed-height product cards (380px) for visual consistency
- ✅ GitHub buttons changed to icon-only
- ✅ Description text area expanded for better readability
- ✅ Flex layout ensures buttons always at bottom of cards

## Future Considerations

- Add more product detail pages with specialized layouts like Wavy
- Extend i18n to other product pages (melissa, fa-studioset-editor, etc.)
- Add analytics tracking for social shares and page views
- Consider lazy-loading images for better performance
- Add unit tests with Vitest
- Implement a CMS for easier content management
- Add more languages (French, Spanish, Chinese, etc.)
- Consider Open Graph image generation for better social previews

## Contact & Attribution

**Copyright**: © 2025 Melissa Audio
**GitHub Repository**: https://github.com/mosynthkey/mosynthkey.github.io (inferred)
**Website**: https://mosynthkey.github.io/

---

Last Updated: 2025-10-13
Generated by: Claude Code
