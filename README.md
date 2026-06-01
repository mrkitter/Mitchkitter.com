# Mitch Kitter — Personal Brand Website

Personal website for Mitch Kitter: Security Architect, Arctic Telecommunications Researcher, and Ph.D. Candidate at the University of Alaska Fairbanks.

## Project Structure

```
├── index.html              # Main single-page site (all sections)
├── blog.html               # Blog listing page
├── blog/
│   └── post-template.html  # Template for individual blog posts
├── css/
│   ├── style.css           # Main stylesheet (design system, all sections)
│   └── blog.css            # Blog-specific styles
├── js/
│   └── main.js             # Navigation, scroll, animations
├── assets/
│   ├── images/
│   │   ├── favicon.svg     # MK monogram favicon
│   │   └── ...             # Add headshot, hero image, etc. here
│   └── docs/
│       └── Kitter_CV.pdf   # PLACEHOLDER: Add CV PDF here
├── robots.txt
├── sitemap.xml
└── README.md
```

## Quick Start

This is a static HTML/CSS/JS site — no build step required.

**Local development:**
```bash
# Option 1: Python (built-in)
python3 -m http.server 8000
# then open http://localhost:8000

# Option 2: Node.js with npx
npx serve .

# Option 3: VS Code Live Server extension
```

## Deployment

### Vercel (Recommended)
1. Push this repository to GitHub
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click "Import Project" and select this repository
4. Vercel auto-detects the static site — click Deploy
5. Your site is live at `your-project.vercel.app`
6. Add custom domain (`mitchkitter.com`) in Project Settings → Domains

### Netlify
1. Push to GitHub
2. Go to [netlify.com](https://netlify.com), sign in, click "Add new site"
3. Connect to GitHub, select the repository
4. Set publish directory to `/` (root)
5. Click Deploy
6. Add custom domain in Site Settings → Domain Management

### GitHub Pages
1. Push to GitHub
2. Go to Settings → Pages → Source: Deploy from a branch
3. Select `main` branch, `/` (root)
4. Site is live at `username.github.io/repo-name`

## Assets Needed (Placeholders)

Replace these before launch:

| Placeholder | File Path | Notes |
|---|---|---|
| `[HEADSHOT]` | `assets/images/headshot.jpg` | Min 800×800px, professional photo |
| `[HERO_BG]` | `assets/images/hero-bg.jpg` | Min 1920px wide, Alaska landscape |
| `[RESEARCH_BG]` | `assets/images/research-bg.jpg` | Optional, Arctic/infrastructure imagery |
| `[EMAIL]` | `index.html` (contact section) | Search for `[EMAIL]` and replace |
| `[CV_PDF]` | `assets/docs/Kitter_CV.pdf` | Downloadable CV |

All placeholder image references in the HTML are marked with `<!-- PLACEHOLDER: ... -->` comments.

## Adding Blog Posts

1. Duplicate `blog/post-template.html` and rename it (e.g., `blog/llms-loose-lips-multipliers.html`)
2. Replace all `[PLACEHOLDER]` values in the new file with actual content
3. Add the post to `blog.html` by uncommenting the blog card template and filling it in
4. Add a preview card to the blog section in `index.html`
5. Update `sitemap.xml` with the new post URL

## Updating Content

- **Bio text**: `index.html` — search for the `about` section
- **Research questions**: `index.html` — `.rq-card` elements in the `research` section
- **CV timeline**: `index.html` — `.timeline-item` elements in the `cv` section
- **Contact email**: `index.html` — search for `[EMAIL]`
- **Social links**: `index.html` — LinkedIn URL in the contact section

## Design System

Colors, typography, and spacing are defined as CSS custom properties in `css/style.css`:

```css
:root {
  --color-bg-primary:    #0A1628;  /* Deep navy */
  --color-accent:        #00B4D8;  /* Electric cyan */
  --color-text-primary:  #F0F4F8;  /* Off-white */
  --font-heading:        'Space Grotesk', sans-serif;
  --font-body:           'Inter', sans-serif;
  --font-mono:           'JetBrains Mono', monospace;
}
```

## Future Migration to Static Site Generator

When Mitch wants to write blog posts more frequently, the site can be migrated to [Astro](https://astro.build) or [Hugo](https://gohugo.io) for markdown-based blog management. The current HTML structure is designed to map cleanly to a component-based architecture.

## License

All content © Mitch Kitter. All rights reserved.
