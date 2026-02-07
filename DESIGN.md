# Eastell & Co — Design Specification

## Brand Tokens (Eastell)

- Black: `#010101`
- Dark Grey: `#58585b`
- Grey: `#a7a9ac`
- Cream: `#f4e5d8`
- Light: `#faf6f2`
- Accent (warm bronze): `#8B7355`
- Display font: Engravers Gothic (all caps, wide tracking)
- Body font: Hoefler Text (classic serif, warm)
- Tone: "Premium without being cold. Confident without being arrogant."

## CSS Custom Properties

Map Eastell brand into the full design system:
- --color-bg-primary: #faf6f2 (Light)
- --color-bg-secondary: #f4e5d8 (Cream)
- --color-bg-dark: #010101 (Black)
- --color-bg-dark-secondary: #1a1a18
- --color-text-primary: #010101
- --color-text-secondary: #58585b
- --color-text-inverse: #faf6f2
- --color-text-muted: #a7a9ac
- --color-accent: #8B7355 (warm bronze)
- --color-accent-hover: #A6896A

## Homepage Blueprint (9 Sections)

1. HERO (100vh) — cinematic image, headline lower-left, primary CTA, scroll indicator
2. POSITIONING STATEMENT — overline + bold statement + 3 optional stats
3. FEATURED PROPERTIES — 3-4 cards in editorial asymmetric grid, portrait ratio
4. ABOUT/STORY — asymmetric 60/40 split, personal copy
5. TESTIMONIALS — dark bg, large serif italic quote
6. SUBURB EXPERTISE — 3-4 suburbs with lifestyle imagery
7. MARKET INSIGHTS — lead magnet form (max 4 fields, border-bottom style)
8. FINAL CTA — full-bleed image + dark overlay + CTA
9. FOOTER — minimal, dark, max 3 columns

## Animation Choreography

Reveal sequence per section:
1. Overline: fade up 20px, 0ms
2. Headline: fade up 30px, 100ms
3. Body: fade up 20px, 200ms
4. CTA: fade up 15px, 300ms
5. Image: clip-reveal or scale 1.05→1.0, 100ms

All: 1s duration, cubic-bezier(0.16, 1, 0.3, 1)
Hover: cards image scale(1.03)/0.6s, buttons translateY(-2px), links underline width 0→100%
Parallax: max 40-60px translateY, bg images only
Page load: stagger header→hero→scroll indicator, under 1.5s
Wrap in @media (prefers-reduced-motion: no-preference)

## CTA Hierarchy

- Primary (1 per viewport): "Book a Private Appraisal" — accent bg, white text
- Secondary: ghost button or text link with arrow
- Passive: sticky header CTA + footer form

## Anti-Patterns

- No bright blue/red, no stock handshake photos, no carousel heroes with dots
- No heavy shadows, no border-radius >8px, no gradients (except subtle overlays)
- No more than 2 font families, no icon libraries as decoration
- No star ratings, no "Click Here"/"Learn More", no hamburger on desktop
- No parallax on mobile, no autoplay video with sound, no pop-ups
- No centered body text >3 lines, no 50/50 splits, no generic footer with 40 links
