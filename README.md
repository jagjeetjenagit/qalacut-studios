# QalaCut Studios — Website

A cinematic, high-end React website for **QalaCut Studios**, a post-production studio.
Dark, textured aesthetic with brushed-chrome typography and a signature red laser accent
(matching the logo). Inspired by the structure of high-end film-house sites.

## Stack

- **React 18** + **Vite 5**
- **React Router 6** — multi-page routing
- **Tailwind CSS 3** — design system (see `tailwind.config.js`)
- **Framer Motion** — page transitions, scroll reveals, parallax
- **Lenis** — buttery smooth scrolling

## Getting started

```bash
npm install      # already done
npm run dev      # start dev server (http://localhost:5173)
npm run build    # production build -> dist/
npm run preview  # preview the production build
```

## Pages

| Route          | Page         | Highlights                                             |
| -------------- | ------------ | ------------------------------------------------------ |
| `/`            | Home         | Parallax hero, marquee, stats, services, featured work |
| `/about`       | About        | Manifesto, values grid, studio timeline                |
| `/services`    | Services     | Six-craft breakdown + tech pipeline                    |
| `/work`        | Work         | Filterable portfolio grid                              |
| `/work/:slug`  | Work Detail  | Case study with parallax hero + gallery + next project |
| `/team`        | Team         | Crew grid with hover reveals                           |
| `/contact`     | Contact      | Interactive form (placeholder submit) + departments    |
| `*`            | 404          | Custom cinematic not-found                              |

## Where to add your real content

Everything is placeholder-driven so you can swap in real assets easily:

- **Logo** — `public/logo-wide.png`, `public/logo-square.png` (already your real logos)
- **Portfolio projects** — edit `src/data/projects.js`. Replace the `poster` / `thumb`
  Picsum URLs with paths to real images in `/public` (e.g. `/work/echoes-poster.jpg`),
  and add a `video` field when you have showreels.
- **Services** — `src/data/services.js`
- **Team** — the `team` array in `src/pages/Team.jsx`
- **Contact form** — `src/pages/Contact.jsx` currently fakes submit; wire it to a
  service like Formspree, Resend, or your own API in the `submit()` handler.
- **Copy / stats** — inline in each page component.

## Design tokens

Defined in `tailwind.config.js`:

- `ink` — near-black backgrounds
- `blood` — the signature red (`#e11123`) + light/dark/glow variants
- `chrome` — off-white brushed-metal text
- Fonts: **Anton** (display), **Oswald** (headings), **Inter** (body)

## Notes

- A custom cursor + smooth scroll are enabled on desktop and auto-disabled on touch /
  reduced-motion.
- `.text-chrome` gives text the brushed-metal gradient like the logo.
