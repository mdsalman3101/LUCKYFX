# Lucky FX Studio — 3D Website Foundation

This is the first working foundation for the Lucky FX Studio redesign.

## Stack
- React + Vite
- Three.js / React Three Fiber / Drei for the 3D hero
- GSAP for hero entrance animation
- Framer Motion for interactive cards and modal transitions
- Lucide React icons

## Run
1. Install Node.js 20+.
2. Open this folder in VS Code.
3. Run:
   npm install
   npm run dev
4. Open the local URL printed by Vite.

## Current phase
The site already includes:
- Cinematic 3D hero
- Responsive navigation
- About section
- 10 services
- Filterable portfolio
- Portfolio project modal
- Why choose us
- 6-step process
- Testimonials
- FAQ accordion
- Contact / quote form UI
- Final CTA
- Responsive footer

## Real media
Put the real showreel and project videos inside:
public/media/

Suggested future files:
- public/media/showreel.mp4
- public/media/real-estate.mp4
- public/media/motion-graphics.mp4
- public/media/wedding.mp4

Then we will wire them into the portfolio and hero.

## Important
The contact form is currently front-end only. In Phase 3 we can connect it to a real email/form backend and add spam protection.

## Next build phases
1. Foundation + 3D hero (this package)
2. Real media + premium portfolio interactions
3. Working quote/contact backend
4. SEO, performance, accessibility and mobile polish
5. Production deploy + custom domain
# Lucky FX Studio

The public design remains the original Lucky FX React/Vite experience. Portfolio content and contact enquiries are backed by Supabase.

## Setup

1. Create a Supabase project and run `supabase/schema.sql` in its SQL Editor.
2. In Supabase Authentication, create the client's admin user. No password is stored in this repository.
3. Copy `.env.example` to `.env` and add the project URL and anon key.
4. Set `VITE_BASE_PATH` to the GitHub Pages repository path, for example `/LuckyFX/`. Use `/` for a custom domain.
5. Run `npm install`, then `npm run dev`. Admin is available at the base path plus `admin`.

The large original `video-reel.mp4` is deliberately ignored and excluded from production. The existing optimized `video-reel-web.mp4` is used by the showreel. Client uploads go to the `portfolio-media` Supabase Storage bucket and never require a GitHub redeploy.

Social profile placeholders are intentionally not linked because no verified Instagram, YouTube, or LinkedIn URLs were provided. WhatsApp uses the existing verified business number.
