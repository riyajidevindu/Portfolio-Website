# Riyaji Devindu — Portfolio Website

A modern, responsive, SEO-optimized portfolio website for a Software & AI/ML Engineer. Built with **Next.js 14**, **Tailwind CSS**, and **Framer Motion**.

## Features

- **Dark Theme** with cyan/purple gradient accents and glassmorphism
- **Animated Hero** with typewriter effect and floating particles
- **Bento Grid Skills** layout with categorized tech stack
- **Timeline Experience** section with alternating layout
- **Project Showcase** with featured filtering
- **Blog System** with admin CRUD
- **Admin Panel** — manage posts, settings, and view analytics
- **Traffic Tracking** — built-in visitor analytics dashboard
- **SEO Optimized** — sitemap, robots.txt, Open Graph, structured metadata
- **Fully Responsive** — mobile-first design
- **Lightweight** — static generation, optimized images, minimal JS

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 14 (App Router) | Framework, SSG, API routes |
| Tailwind CSS | Styling, responsive design |
| Framer Motion | Animations, scroll reveals |
| Lucide React | Icons |
| TypeScript | Type safety |

## Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Admin Panel

Access the admin panel at `/admin`. Default password: `admin123`

**Change the password** by setting the `ADMIN_PASSWORD` environment variable:

```bash
ADMIN_PASSWORD=your_secure_password
```

### Admin Features:
- **Dashboard** — view traffic analytics (today, 7-day, 30-day, total)
- **Posts** — create, edit, delete blog posts
- **Settings** — update site title, description, social links, visibility

## Deployment (Free)

### Vercel (Recommended)

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and import the repository
3. Set environment variables:
   - `ADMIN_PASSWORD` — your admin password
   - `NEXT_PUBLIC_SITE_URL` — your domain (e.g., `https://riyajidevindu.vercel.app`)
4. Deploy!

### Alternative Free Hosts
- **Netlify** — supports Next.js with `@netlify/plugin-nextjs`
- **Cloudflare Pages** — static export with `next export`
- **Railway** — full server-side support

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Home page (all sections)
│   ├── blog/             # Blog listing & posts
│   ├── admin/            # Admin panel (dashboard, posts, settings)
│   ├── api/              # API routes (auth, posts, settings, analytics)
│   ├── sitemap.ts        # SEO sitemap
│   ├── robots.ts         # SEO robots.txt
│   └── manifest.ts       # PWA manifest
├── components/           # React components
├── data/                 # JSON data (profile, posts, settings)
└── styles/               # Global CSS
```

## Customization

Edit `src/data/profile.json` to update your information. The website will automatically reflect the changes.

## License

MIT
