"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";

/* ═══════════════════════════════════════════
   CONSTANTS & DATA
   ═══════════════════════════════════════════ */

const EXPO = [0.16, 1, 0.3, 1] as const;

const PROPERTIES = [
  {
    slug: "23-viewland-drive-noosa-heads",
    address: "23 Viewland Drive",
    suburb: "Noosa Heads",
    price: "Contact Agent",
    beds: 5,
    baths: 4,
    cars: 3,
    tagline: "Elevated living above Noosa's treetops",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=700&h=900&fit=crop&q=85",
    size: "large",
  },
  {
    slug: "8-mossman-court-sunshine-beach",
    address: "8 Mossman Court",
    suburb: "Sunshine Beach",
    price: "$3,200,000",
    beds: 4,
    baths: 3,
    cars: 2,
    tagline: "Wake to whitewater views from every room",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&h=900&fit=crop&q=85",
    size: "small",
  },
  {
    slug: "42-pacific-terrace-coolum-beach",
    address: "42 Pacific Terrace",
    suburb: "Coolum Beach",
    price: "$2,750,000",
    beds: 4,
    baths: 3,
    cars: 2,
    tagline: "Light-filled interiors meet coastal calm",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=700&h=900&fit=crop&q=85",
    size: "small",
  },
  {
    slug: "15-burgess-street-mooloolaba",
    address: "15 Burgess Street",
    suburb: "Mooloolaba",
    price: "$1,950,000",
    beds: 3,
    baths: 2,
    cars: 2,
    tagline: "Steps from the esplanade, village at your door",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=700&h=900&fit=crop&q=85",
    size: "large",
  },
];

const SUBURBS = [
  {
    name: "Noosa Heads",
    slug: "noosa-heads",
    tagline:
      "Riverside dining, national park trails, and the most sought-after addresses on the coast.",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=800&fit=crop&q=80",
  },
  {
    name: "Coolum Beach",
    slug: "coolum-beach",
    tagline:
      "Uncrowded surf, Mount Coolum, and a community that values space.",
    image:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&h=800&fit=crop&q=80",
  },
  {
    name: "Sunshine Beach",
    slug: "sunshine-beach",
    tagline: "The quiet confidence of the coast's best-kept postcode.",
    image:
      "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=600&h=800&fit=crop&q=80",
  },
];

const TESTIMONIALS = [
  {
    quote:
      "We interviewed four agents before choosing Clinton. Within the first meeting, it was clear he understood our home and our suburb better than we did. He found the right buyer within three weeks.",
    author: "James & Helen W.",
    suburb: "Sunshine Beach",
    year: "2025",
  },
  {
    quote:
      "What stood out wasn't the pitch — it was the preparation. Clinton arrived with a strategy specific to our street, not a generic template. The result exceeded every benchmark.",
    author: "David R.",
    suburb: "Noosa Heads",
    year: "2024",
  },
  {
    quote:
      "After a difficult sale with another agency, Clinton took over and had the property under contract in ten days. Calm, precise, professional throughout.",
    author: "Margaret L.",
    suburb: "Coolum Beach",
    year: "2025",
  },
];

/* ═══════════════════════════════════════════
   ANIMATION UTILITIES
   ═══════════════════════════════════════════ */

function Reveal({
  children,
  delay = 0,
  y = 20,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1, delay, ease: EXPO }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ImageReveal({
  children,
  delay = 0.1,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      whileInView={{ clipPath: "inset(0% 0 0 0)" }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 1.2, delay, ease: EXPO }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   1. HEADER
   ═══════════════════════════════════════════ */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const navItems = ["Buy", "Sell", "About", "Team", "Contact"];

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
          scrolled
            ? "bg-bg-primary/95 backdrop-blur-md shadow-[0_1px_0_var(--color-border)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 flex items-center justify-between h-[72px] md:h-[88px]">
          <Link href="/" className="relative z-10">
            <span
              className={`font-display text-[12px] md:text-[14px] tracking-[0.14em] transition-colors duration-700 ${
                scrolled ? "text-text-primary" : "text-white"
              }`}
            >
              EASTELL & CO
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-10">
            {navItems.map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase()}`}
                className={`relative font-serif text-[13px] tracking-[0.02em] transition-colors duration-500 after:absolute after:bottom-[-3px] after:left-0 after:h-px after:w-0 after:transition-all after:duration-500 hover:after:w-full ${
                  scrolled
                    ? "text-text-secondary hover:text-text-primary after:bg-text-primary"
                    : "text-white/60 hover:text-white after:bg-white"
                }`}
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <Link
              href="/appraisal"
              className={`hidden md:inline-block font-display text-[9px] tracking-[0.14em] px-5 py-2.5 transition-all duration-500 hover:-translate-y-px ${
                scrolled
                  ? "bg-accent text-white hover:bg-accent-hover"
                  : "border border-white/30 text-white hover:bg-white/10"
              }`}
            >
              BOOK APPRAISAL
            </Link>

            <button
              onClick={() => setMenuOpen(true)}
              className={`lg:hidden flex flex-col gap-[5px] p-2 transition-colors ${
                scrolled ? "text-text-primary" : "text-white"
              }`}
              aria-label="Open menu"
            >
              <span className="block w-5 h-px bg-current" />
              <span className="block w-3.5 h-px bg-current" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: EXPO }}
            className="fixed inset-0 z-[60] bg-bg-dark flex flex-col"
          >
            <div className="flex items-center justify-between px-6 md:px-12 h-[72px]">
              <span className="font-display text-[12px] tracking-[0.14em] text-text-inverse">
                EASTELL & CO
              </span>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 text-text-inverse"
                aria-label="Close menu"
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                  <line x1="1" y1="1" x2="17" y2="17" stroke="currentColor" strokeWidth="1" />
                  <line x1="17" y1="1" x2="1" y2="17" stroke="currentColor" strokeWidth="1" />
                </svg>
              </button>
            </div>
            <nav className="flex-1 flex flex-col justify-center px-6 md:px-12 gap-6">
              {navItems.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.06, duration: 0.6, ease: EXPO }}
                >
                  <Link
                    href={`/${item.toLowerCase()}`}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-[clamp(1.5rem,5vw,2.5rem)] tracking-[0.1em] text-text-inverse hover:text-accent transition-colors duration-500"
                  >
                    {item.toUpperCase()}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <div className="px-6 md:px-12 pb-10">
              <p className="font-serif text-[13px] text-text-muted">
                (07) 5446 1234 — hello@eastell.com.au
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ═══════════════════════════════════════════
   2. HERO (100vh)
   ═══════════════════════════════════════════ */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section
      ref={ref}
      className="relative h-[100svh] min-h-[700px] overflow-hidden"
    >
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <Image
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1920&h=1080&fit=crop&q=90"
          alt="Modern luxury home at twilight on the Sunshine Coast"
          fill
          priority
          className="object-cover img-editorial"
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/25 to-black/10" />

      <motion.div
        className="relative z-10 h-full flex flex-col justify-end"
        style={{ opacity: contentOpacity }}
      >
        <div className="mx-auto max-w-[1400px] w-full px-6 md:px-12 pb-16 md:pb-24">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="h-px bg-white/40 mb-6"
          />
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: EXPO }}
            className="font-display text-[clamp(2rem,4vw+1rem,4rem)] tracking-[0.1em] text-white leading-[1.1]"
          >
            THE COAST, ELEVATED.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: EXPO }}
            className="mt-4 font-serif text-[clamp(0.9rem,1.1vw,1.1rem)] text-white/50 max-w-md leading-relaxed"
          >
            Selling the Sunshine Coast&apos;s finest homes since 2011.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9, ease: EXPO }}
            className="mt-8"
          >
            <Link
              href="/appraisal"
              className="inline-block bg-accent text-white font-display text-[9px] tracking-[0.14em] px-7 py-3.5 hover:bg-accent-hover hover:-translate-y-px transition-all duration-500"
            >
              BOOK A PRIVATE APPRAISAL
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="font-display text-[8px] tracking-[0.2em] text-white/30">
            SCROLL
          </span>
          <div className="w-px h-10 bg-white/20 origin-top animate-pulse" />
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   3. POSITIONING STATEMENT
   ═══════════════════════════════════════════ */

function Positioning() {
  return (
    <section
      className="bg-bg-primary"
      style={{ padding: "var(--space-section) 0" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="max-w-3xl">
          <Reveal delay={0}>
            <span className="font-display text-[9px] tracking-[0.2em] text-text-muted block mb-6">
              THE DIFFERENCE
            </span>
          </Reveal>
          <Reveal delay={0.1} y={30}>
            <h2 className="font-serif font-black text-[clamp(1.5rem,3vw+0.5rem,2.75rem)] text-text-primary leading-[1.25]">
              We don&apos;t list properties. We position them.
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-6 font-serif text-[clamp(1rem,1.1vw,1.125rem)] text-text-secondary leading-[1.7] max-w-xl">
              Every campaign is crafted with the precision of a private sale and
              the reach of a national launch. No shortcuts. No templates. Just
              local knowledge applied with intent.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.3}>
          <div className="mt-16 pt-10 border-t border-border grid grid-cols-3 gap-8 max-w-2xl">
            {[
              { value: "$420M+", label: "In Settled Sales" },
              { value: "15 Years", label: "Sunshine Coast" },
              { value: "96%", label: "Auction Clearance" },
            ].map((stat) => (
              <div key={stat.label}>
                <span className="font-display text-[clamp(1rem,2vw,1.5rem)] tracking-[0.06em] text-text-primary block">
                  {stat.value}
                </span>
                <span className="font-serif text-[clamp(0.7rem,0.9vw,0.8rem)] text-text-muted mt-1 block">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   4. FEATURED PROPERTIES
   ═══════════════════════════════════════════ */

function FeaturedProperties() {
  return (
    <section
      className="bg-bg-primary"
      style={{ paddingBottom: "var(--space-section)" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal>
          <div className="flex items-end justify-between mb-14">
            <span className="font-display text-[9px] tracking-[0.2em] text-text-muted">
              FEATURED PROPERTIES
            </span>
            <Link
              href="/buy"
              className="font-serif text-[13px] text-text-secondary hover:text-text-primary transition-colors duration-500 group"
            >
              View all
              <span className="inline-block ml-1.5 transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-12 gap-6 md:gap-8">
          {PROPERTIES.map((p, i) => {
            const isLarge = p.size === "large";
            const colSpan = isLarge ? "md:col-span-7" : "md:col-span-5";
            const offset = i === 1 ? "md:mt-20" : i === 2 ? "md:-mt-10" : "";

            return (
              <div key={p.slug} className={`${colSpan} ${offset}`}>
                <ImageReveal delay={i * 0.1}>
                  <Link href={`/property/${p.slug}`} className="group block">
                    <div className="relative aspect-[3/4] overflow-hidden bg-bg-secondary">
                      <Image
                        src={p.image}
                        alt={`${p.address}, ${p.suburb}`}
                        fill
                        className="object-cover img-editorial transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                        sizes={
                          isLarge
                            ? "(max-width: 768px) 100vw, 58vw"
                            : "(max-width: 768px) 100vw, 42vw"
                        }
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                      <div className="absolute inset-0 flex items-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span className="font-display text-[9px] tracking-[0.14em] text-white">
                          VIEW PROPERTY
                        </span>
                      </div>
                    </div>
                    <div className="mt-5">
                      <span className="font-display text-[8px] tracking-[0.2em] text-text-muted">
                        {p.suburb.toUpperCase()}
                      </span>
                      <h3 className="mt-1.5 font-serif font-black text-[clamp(1.1rem,1.5vw,1.35rem)] text-text-primary group-hover:text-text-secondary transition-colors duration-500">
                        {p.address}
                      </h3>
                      <p className="mt-1 font-serif italic text-[13px] text-text-muted">
                        {p.tagline}
                      </p>
                      <div className="mt-3 flex items-center gap-2.5 font-serif text-[13px] text-text-muted">
                        <span>{p.beds} bed</span>
                        <span className="text-border-hover">·</span>
                        <span>{p.baths} bath</span>
                        <span className="text-border-hover">·</span>
                        <span>{p.cars} car</span>
                        <span className="ml-auto font-serif text-[15px] text-text-primary">
                          {p.price}
                        </span>
                      </div>
                    </div>
                  </Link>
                </ImageReveal>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   5. ABOUT / STORY
   ═══════════════════════════════════════════ */

function AboutStory() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  return (
    <section
      ref={ref}
      className="bg-bg-secondary overflow-hidden"
      style={{ padding: "var(--space-section) 0" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-10 md:gap-6 items-center">
          <ImageReveal className="md:col-span-7">
            <div className="relative aspect-[3/2] overflow-hidden">
              <motion.div
                className="absolute inset-0"
                style={{ y: imgY }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&h=800&fit=crop&q=90"
                  alt="Sunshine Coast beach at golden hour"
                  fill
                  className="object-cover img-editorial scale-110"
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
              </motion.div>
            </div>
          </ImageReveal>

          <div className="md:col-span-4 md:col-start-9">
            <Reveal delay={0}>
              <span className="font-display text-[9px] tracking-[0.2em] text-text-muted block mb-5">
                OUR STORY
              </span>
            </Reveal>
            <Reveal delay={0.1} y={30}>
              <h2 className="font-display text-[clamp(1.2rem,2vw,1.6rem)] tracking-[0.08em] text-text-primary leading-[1.3]">
                LOCAL KNOWLEDGE
                <br />
                ISN&apos;T A TALKING POINT.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 font-serif text-[clamp(0.95rem,1.1vw,1.05rem)] text-text-secondary leading-[1.7]">
                Clinton Eastell has spent fifteen years on the Sunshine
                Coast — not as a visitor, but as a local. That time has
                built something no marketing spend can buy: genuine
                relationships across every suburb from Noosa to Caloundra.
              </p>
              <p className="mt-4 font-serif text-[clamp(0.95rem,1.1vw,1.05rem)] text-text-secondary leading-[1.7]">
                It&apos;s the reason clients return. And the reason their
                referrals do too.
              </p>
            </Reveal>
            <Reveal delay={0.3} y={15}>
              <Link
                href="/about"
                className="inline-block mt-8 font-serif text-[13px] text-text-primary group"
              >
                <span className="border-b border-text-primary pb-0.5 group-hover:border-accent group-hover:text-accent transition-colors duration-500">
                  Meet the team
                </span>
                <span className="inline-block ml-1.5 transition-transform duration-500 group-hover:translate-x-1">
                  →
                </span>
              </Link>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   6. TESTIMONIALS
   ═══════════════════════════════════════════ */

function TestimonialSection() {
  const [idx, setIdx] = useState(0);

  return (
    <section
      className="bg-bg-dark"
      style={{ padding: "var(--space-section) 0" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal>
          <span className="font-display text-[9px] tracking-[0.2em] text-text-muted block mb-12">
            CLIENT EXPERIENCE
          </span>
        </Reveal>

        <div className="max-w-3xl min-h-[200px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.6, ease: EXPO }}
            >
              <blockquote className="font-serif italic text-[clamp(1.25rem,2.5vw,2rem)] text-text-inverse leading-[1.5]">
                &ldquo;{TESTIMONIALS[idx].quote}&rdquo;
              </blockquote>
              <div className="mt-8 flex items-center gap-3">
                <span className="font-serif text-[14px] text-text-inverse">
                  {TESTIMONIALS[idx].author}
                </span>
                <span className="text-text-muted text-[13px]">·</span>
                <span className="font-serif text-[13px] text-text-muted">
                  {TESTIMONIALS[idx].suburb}, {TESTIMONIALS[idx].year}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-14 flex gap-3">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              aria-label={`Testimonial ${i + 1}`}
              className={`transition-all duration-500 h-px ${
                i === idx
                  ? "bg-accent w-10"
                  : "bg-text-muted/20 w-4 hover:bg-text-muted/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   7. SUBURB EXPERTISE
   ═══════════════════════════════════════════ */

function SuburbExpertise() {
  return (
    <section
      className="bg-bg-primary"
      style={{ padding: "var(--space-section) 0" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <Reveal>
          <div className="flex items-end justify-between mb-14">
            <div>
              <span className="font-display text-[9px] tracking-[0.2em] text-text-muted block mb-5">
                LOCAL EXPERTISE
              </span>
              <h2 className="font-serif font-black text-[clamp(1.5rem,2.5vw,2.25rem)] text-text-primary leading-[1.2]">
                Areas we know best.
              </h2>
            </div>
            <Link
              href="/suburbs"
              className="hidden md:inline-block font-serif text-[13px] text-text-secondary hover:text-text-primary transition-colors duration-500 group"
            >
              All suburbs
              <span className="inline-block ml-1.5 transition-transform duration-500 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {SUBURBS.map((s, i) => (
            <ImageReveal key={s.slug} delay={i * 0.1}>
              <Link
                href={`/suburbs/${s.slug}`}
                className="group block"
              >
                <div className="relative aspect-[4/5] overflow-hidden bg-bg-secondary">
                  <Image
                    src={s.image}
                    alt={`${s.name} coastline`}
                    fill
                    className="object-cover img-editorial transition-transform duration-[600ms] ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="font-display text-[11px] tracking-[0.14em] text-white">
                      {s.name.toUpperCase()}
                    </h3>
                    <p className="mt-2 font-serif text-[13px] text-white/60 leading-relaxed">
                      {s.tagline}
                    </p>
                  </div>
                </div>
              </Link>
            </ImageReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   8. MARKET INSIGHTS / LEAD FORM
   ═══════════════════════════════════════════ */

function MarketInsights() {
  return (
    <section
      className="bg-bg-secondary"
      style={{ padding: "var(--space-section) 0" }}
    >
      <div className="mx-auto max-w-[1400px] px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8 items-start">
          <div className="md:col-span-5">
            <Reveal delay={0}>
              <span className="font-display text-[9px] tracking-[0.2em] text-text-muted block mb-5">
                PROPERTY APPRAISAL
              </span>
            </Reveal>
            <Reveal delay={0.1} y={30}>
              <h2 className="font-serif font-black text-[clamp(1.5rem,3vw+0.5rem,2.75rem)] text-text-primary leading-[1.25]">
                What&apos;s your home worth today?
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-5 font-serif text-[clamp(0.95rem,1.1vw,1.05rem)] text-text-secondary leading-[1.7]">
                Get a confidential appraisal from someone who actually
                knows your street. No obligation, no pressure — just an
                honest assessment backed by fifteen years of local data.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.3} className="md:col-span-6 md:col-start-7">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="space-y-8"
            >
              <div>
                <label
                  htmlFor="name"
                  className="font-display text-[8px] tracking-[0.2em] text-text-muted block mb-1"
                >
                  NAME
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your full name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="font-display text-[8px] tracking-[0.2em] text-text-muted block mb-1"
                >
                  EMAIL
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="phone"
                  className="font-display text-[8px] tracking-[0.2em] text-text-muted block mb-1"
                >
                  PHONE
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  placeholder="04XX XXX XXX"
                />
              </div>
              <div>
                <label
                  htmlFor="suburb"
                  className="font-display text-[8px] tracking-[0.2em] text-text-muted block mb-1"
                >
                  SUBURB
                </label>
                <select id="suburb" name="suburb" defaultValue="">
                  <option value="" disabled>
                    Select your suburb
                  </option>
                  <option>Noosa Heads</option>
                  <option>Coolum Beach</option>
                  <option>Sunshine Beach</option>
                  <option>Mooloolaba</option>
                  <option>Maroochydore</option>
                  <option>Buderim</option>
                  <option>Other</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-accent text-white font-display text-[9px] tracking-[0.14em] px-7 py-3.5 hover:bg-accent-hover hover:-translate-y-px transition-all duration-500 w-full md:w-auto"
              >
                GET YOUR FREE APPRAISAL
              </button>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   9. FINAL CTA
   ═══════════════════════════════════════════ */

function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={ref} className="relative overflow-hidden" style={{ padding: "var(--space-section) 0" }}>
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <Image
          src="https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1920&h=1080&fit=crop&q=85"
          alt="Aerial view of Sunshine Coast turquoise waters"
          fill
          className="object-cover img-editorial scale-125"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-bg-dark/70" />

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 md:px-12 text-center py-12">
        <Reveal y={30}>
          <h2 className="font-display text-[clamp(1.5rem,3vw+0.5rem,2.75rem)] tracking-[0.08em] text-text-inverse leading-[1.2]">
            READY TO MAKE YOUR MOVE?
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-5 font-serif text-[clamp(0.95rem,1.1vw,1.1rem)] text-white/50 max-w-md mx-auto">
            Whether buying or selling, the conversation starts here.
          </p>
        </Reveal>
        <Reveal delay={0.3} y={15}>
          <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/appraisal"
              className="inline-block bg-accent text-white font-display text-[9px] tracking-[0.14em] px-7 py-3.5 hover:bg-accent-hover hover:-translate-y-px transition-all duration-500"
            >
              BOOK A PRIVATE APPRAISAL
            </Link>
            <Link
              href="/buy"
              className="inline-block border border-white/20 text-white font-display text-[9px] tracking-[0.14em] px-7 py-3.5 hover:bg-white/10 transition-all duration-500"
            >
              BROWSE PROPERTIES
            </Link>
          </div>
        </Reveal>
        <Reveal delay={0.4}>
          <a
            href="tel:0754461234"
            className="inline-block mt-8 font-serif text-[15px] text-white/40 hover:text-white/70 transition-colors duration-500"
          >
            (07) 5446 1234
          </a>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   10. FOOTER
   ═══════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="bg-bg-dark">
      <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-16 md:py-24">
        <div className="grid md:grid-cols-12 gap-10 md:gap-8">
          <div className="md:col-span-5">
            <span className="font-display text-[14px] tracking-[0.14em] text-bg-secondary">
              EASTELL & CO
            </span>
            <div className="mt-8 space-y-1.5 font-serif text-[13px] text-white/30 leading-relaxed">
              <p>123 David Low Way, Coolum Beach QLD 4573</p>
              <p className="pt-2">
                <a
                  href="tel:0754461234"
                  className="hover:text-bg-secondary transition-colors duration-500"
                >
                  (07) 5446 1234
                </a>
              </p>
              <p>
                <a
                  href="mailto:hello@eastell.com.au"
                  className="hover:text-bg-secondary transition-colors duration-500"
                >
                  hello@eastell.com.au
                </a>
              </p>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-8">
            <span className="font-display text-[8px] tracking-[0.2em] text-white/20 block mb-5">
              EXPLORE
            </span>
            {["Buy", "Sell", "Appraisal", "About", "Team", "Contact"].map(
              (l) => (
                <Link
                  key={l}
                  href={`/${l.toLowerCase()}`}
                  className="block font-serif text-[13px] text-white/30 hover:text-bg-secondary transition-colors duration-500 mb-2.5"
                >
                  {l}
                </Link>
              )
            )}
          </div>

          <div className="md:col-span-2">
            <span className="font-display text-[8px] tracking-[0.2em] text-white/20 block mb-5">
              AREAS
            </span>
            {[
              "Noosa Heads",
              "Coolum Beach",
              "Sunshine Beach",
              "Mooloolaba",
              "Maroochydore",
              "Buderim",
            ].map((s) => (
              <Link
                key={s}
                href={`/suburbs/${s.toLowerCase().replace(/\s/g, "-")}`}
                className="block font-serif text-[13px] text-white/30 hover:text-bg-secondary transition-colors duration-500 mb-2.5"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.05]">
        <div className="mx-auto max-w-[1400px] px-6 md:px-12 py-5 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="font-serif text-[11px] text-white/15">
            &copy; {new Date().getFullYear()} Eastell & Co. All rights
            reserved.
          </p>
          <div className="flex gap-6">
            {["Instagram", "Facebook", "LinkedIn"].map((s) => (
              <a
                key={s}
                href="#"
                className="font-serif text-[11px] text-white/15 hover:text-white/30 transition-colors duration-500"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <Positioning />
        <FeaturedProperties />
        <AboutStory />
        <TestimonialSection />
        <SuburbExpertise />
        <MarketInsights />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
