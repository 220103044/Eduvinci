# EDUVINCI — Product Requirements (Living Doc)

## Original problem statement (summary)
Build a premium, production-ready, fully responsive marketing website for EDUVINCI,
an Italy-focused study-abroad consultancy that helps Turkish students
get admitted to Italian universities. Editorial-minimalist European feel (Oxbridge /
premium law firm). Turkish primary, EN/TR toggle. Real backend storage for leads,
dynamic MongoDB-backed blog. No fabricated stats/testimonials/prices.

## Architecture
- **Backend**: FastAPI + Motor (async MongoDB). Routes prefixed with `/api`.
- **Frontend**: React (CRA + craco), Tailwind, framer-motion, lucide-react, sonner.
- **DB collections**: `consultations`, `webinar_registrations`, `contacts`, `blog_posts`.
- **i18n**: in-memory TR/EN dictionary, language stored in `localStorage` (`ev-lang`).

## Personas
- Turkish high-school / early-uni student (15–22), mobile-first, wants quick info & social proof.
- Parents of student, want process transparency and trust.

## Core requirements (static)
- Turkish primary copy, professional / editorial tone (no slogans, no fabricated facts).
- EN/TR toggle on every page (header + footer).
- Pages: Home, Hakkımızda, Hizmetler, İtalya'da Eğitim, Başarı Hikayeleri, Webinar, Blog, İletişim.
- One consistent primary CTA "Ücretsiz Ön Görüşme" + secondary "Yaklaşan Webinar".
- Sticky mobile bottom CTA; hamburger menu on small screens.
- Forms with backend storage + toast feedback.
- Dynamic blog (TR + EN body) with category filter.
- Filterable universities list, DSU & process content on the Italy hub.

## What's been implemented (2026-12)
- Backend models + endpoints for consultations, webinar registrations, contacts, blog.
- Auto-seed of 4 SEO-grade blog posts (IMAT, TIL-I, DSU, Housing).
- Full Turkish copy + parallel English translation; language toggle; routing.
- Premium editorial design system (Cormorant Garamond + Inter, terracotta accent).
- Pages: Home (hero parallax, why, services, stats count-up, stories teaser, webinar
  teaser, final-CTA form), About, Services (Tetris grid), Italy hub (exams, filterable
  universities, DSU, 6-step process), Success Stories (placeholders), Webinar (past +
  upcoming + form), Blog index & detail, Contact (form + direct + FAQ).
- Mobile sticky CTA, hamburger nav, responsive layouts.
- All seed routes covered with pytest (8/8 pass). Frontend e2e tested via Playwright.

## Backlog / Next actions
### P0
- [ ] Real founder bios + photos (Emirhan, Sevilay).
- [ ] Genuine performance statistics for the stats strip.
### P1
- [ ] Real student success stories with consent (replace placeholders).
- [ ] Add a lightweight admin view to read submissions (currently `GET` endpoints exist but unprotected).
- [ ] OpenGraph / JSON-LD metadata per page; hreflang TR/EN.
- [ ] Email notifications for new leads (Resend / SendGrid playbook).
### P2
- [ ] Blog authoring UI (currently DB-seeded only).
- [ ] Sitemap.xml + robots.txt.
- [ ] Optional video webinar embed.

## Test credentials
N/A — site is public, no auth.
