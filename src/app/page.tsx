"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as const;

const PROPERTIES = [
  {
    slug: "23-viewland-drive-noosa-heads",
    address: "23 Viewland Drive",
    suburb: "Noosa Heads",
    price: "Contact Agent",
    beds: 5,
    baths: 4,
    cars: 3,
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=900&h=700&fit=crop&q=85",
  },
  {
    slug: "8-mossman-court-sunshine-beach",
    address: "8 Mossman Court",
    suburb: "Sunshine Beach",
    price: "$3,200,000",
    beds: 4,
    baths: 3,
    cars: 2,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=900&h=700&fit=crop&q=85",
  },
  {
    slug: "42-pacific-terrace-coolum-beach",
    address: "42 Pacific Terrace",
    suburb: "Coolum Beach",
    price: "$2,750,000",
    beds: 4,
    baths: 3,
    cars: 2,
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=900&h=700&fit=crop&q=85",
  },
  {
    slug: "15-burgess-street-mooloolaba",
    address: "15 Burgess Street",
    suburb: "Mooloolaba",
    price: "$1,950,000",
    beds: 3,
    baths: 2,
    cars: 2,
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=900&h=700&fit=crop&q=85",
  },
];

const TILES = [
  {
    label: "Buy",
    href: "/buy",
    image:
      "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?w=600&h=800&fit=crop&q=80",
  },
  {
    label: "Sell",
    href: "/sell",
    image:
      "https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=600&h=800&fit=crop&q=80",
  },
  {
    label: "Appraisal",
    href: "/appraisal",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=800&fit=crop&q=80",
  },
  {
    label: "Suburbs",
    href: "/suburbs",
    image:
      "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=600&h=800&fit=crop&q=80",
  },
];

/* ═══════════════════════════════════════════
   FADE IN ON SCROLL
   ═══════════════════════════════════════════ */

function Fade({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   HEADER
   ═══════════════════════════════════════════ */

function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 flex items-center justify-between h-20 md:h-[88px]">
        <Link href="/" className="relative z-10">
          <span
            className={`font-display text-[13px] md:text-[15px] tracking-[0.12em] transition-colors duration-700 ${
              scrolled ? "text-brand-black" : "text-white"
            }`}
          >
            EASTELL & CO
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-12">
          {["Buy", "Sell", "About", "Team", "Contact"].map((item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase()}`}
              className={`relative font-serif text-[13px] tracking-[0.02em] transition-colors duration-500 after:absolute after:bottom-[-2px] after:left-0 after:h-px after:w-0 after:transition-all after:duration-500 hover:after:w-full ${
                scrolled
                  ? "text-brand-dark hover:text-brand-black after:bg-brand-black"
                  : "text-white/60 hover:text-white after:bg-white"
              }`}
            >
              {item}
            </Link>
          ))}
        </nav>

        <Link
          href="/appraisal"
          className={`hidden md:inline-block font-display text-[10px] tracking-[0.12em] px-6 py-3 transition-all duration-700 ${
            scrolled
              ? "bg-brand-black text-white hover:bg-brand-dark"
              : "border border-white/30 text-white hover:bg-white/10"
          }`}
        >
          APPRAISAL
        </Link>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════ */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[700px] overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <Image
          src="https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?w=1920&h=1080&fit=crop&q=90"
          alt="Sunshine Coast coastline"
          fill
          priority
          className="object-cover scale-[1.1]"
          sizes="100vw"
        />
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />

      <motion.div
        className="relative z-10 h-full flex flex-col justify-end"
        style={{ opacity: contentOpacity }}
      >
        <div className="mx-auto max-w-[1440px] w-full px-6 md:px-12 pb-16 md:pb-24">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 48 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            className="h-px bg-white/40 mb-8"
          />
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: EASE }}
            className="font-display text-[clamp(2rem,5vw,4rem)] tracking-[0.14em] text-white leading-none"
          >
            EASTELL & CO
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="mt-4 font-serif italic text-[15px] md:text-[17px] text-white/50 tracking-[0.02em]"
          >
            Sunshine Coast
          </motion.p>
        </div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   FEATURED PROPERTIES
   ═══════════════════════════════════════════ */

function Properties() {
  return (
    <section className="py-28 md:py-40 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <Fade>
          <div className="flex items-end justify-between mb-16 md:mb-20">
            <span className="font-display text-[10px] tracking-[0.15em] text-brand-grey">
              FEATURED
            </span>
            <Link
              href="/buy"
              className="font-serif text-[13px] text-brand-dark hover:text-brand-black transition-colors duration-500 border-b border-brand-grey/30 pb-0.5 hover:border-brand-black"
            >
              View all properties
            </Link>
          </div>
        </Fade>

        <div className="grid md:grid-cols-2 gap-x-8 gap-y-16 md:gap-y-20">
          {PROPERTIES.map((p, i) => (
            <Fade key={p.slug} delay={i * 0.1}>
              <Link href={`/property/${p.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden bg-brand-light">
                  <Image
                    src={p.image}
                    alt={p.address}
                    fill
                    className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="mt-5 md:mt-6">
                  <span className="font-display text-[9px] tracking-[0.15em] text-brand-grey">
                    {p.suburb.toUpperCase()}
                  </span>
                  <h3 className="mt-1 font-serif font-black text-[20px] md:text-[22px] text-brand-black group-hover:text-brand-dark transition-colors duration-500">
                    {p.address}
                  </h3>
                  <div className="mt-3 flex items-center gap-3 font-serif text-[13px] text-brand-grey">
                    <span>{p.beds}</span>
                    <span className="text-brand-grey/30">·</span>
                    <span>{p.baths}</span>
                    <span className="text-brand-grey/30">·</span>
                    <span>{p.cars}</span>
                  </div>
                  <p className="mt-2 font-serif text-[15px] text-brand-dark">
                    {p.price}
                  </p>
                </div>
              </Link>
            </Fade>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════ */

function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  return (
    <section ref={ref} className="py-28 md:py-40 bg-brand-cream overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8 items-center">
          <Fade className="md:col-span-7">
            <div className="relative aspect-[3/2] overflow-hidden">
              <motion.div className="absolute inset-0" style={{ y: imgY }}>
                <Image
                  src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1200&h=800&fit=crop&q=90"
                  alt="Sunshine Coast"
                  fill
                  className="object-cover scale-[1.15]"
                  sizes="(max-width: 768px) 100vw, 58vw"
                />
              </motion.div>
            </div>
          </Fade>

          <Fade delay={0.15} className="md:col-span-4 md:col-start-9">
            <span className="font-display text-[10px] tracking-[0.15em] text-brand-grey block mb-6">
              ABOUT
            </span>
            <div className="w-8 h-px bg-brand-grey/40 mb-8" />
            <h2 className="font-display text-[clamp(1.4rem,2.5vw,2rem)] tracking-[0.06em] text-brand-black leading-[1.2]">
              FIFTEEN YEARS.
              <br />
              ONE COAST.
            </h2>
            <p className="mt-6 font-serif text-[16px] leading-[1.8] text-brand-dark">
              Clinton Eastell has spent fifteen years learning every street,
              every view, and every story worth knowing on the Sunshine
              Coast. That local knowledge shapes everything we do.
            </p>
            <Link
              href="/about"
              className="inline-block mt-8 font-serif text-[13px] text-brand-black border-b border-brand-black pb-0.5 hover:text-brand-dark hover:border-brand-dark transition-colors duration-500"
            >
              Our story
            </Link>
          </Fade>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   NAVIGATION TILES
   ═══════════════════════════════════════════ */

function NavTiles() {
  return (
    <section className="grid grid-cols-2 lg:grid-cols-4">
      {TILES.map((tile, i) => (
        <Fade key={tile.label} delay={i * 0.08} className="relative">
          <Link href={tile.href} className="group relative block aspect-[3/4] overflow-hidden">
            <Image
              src={tile.image}
              alt={tile.label}
              fill
              className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.05]"
              sizes="(max-width: 1024px) 50vw, 25vw"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-700" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-[11px] md:text-[13px] tracking-[0.14em] text-white">
                {tile.label.toUpperCase()}
              </span>
            </div>
          </Link>
        </Fade>
      ))}
    </section>
  );
}

/* ═══════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="bg-brand-black">
      <div className="mx-auto max-w-[1440px] px-6 md:px-12 py-20 md:py-28">
        <div className="grid md:grid-cols-12 gap-12 md:gap-8">
          <div className="md:col-span-4">
            <span className="font-display text-[15px] tracking-[0.12em] text-brand-cream">
              EASTELL & CO
            </span>
            <div className="mt-8 space-y-2 font-serif text-[13px] text-white/30 leading-relaxed">
              <p>123 David Low Way</p>
              <p>Coolum Beach QLD 4573</p>
            </div>
            <div className="mt-6 space-y-2 font-serif text-[13px] text-white/30">
              <p>
                <a
                  href="tel:0754461234"
                  className="hover:text-brand-cream transition-colors duration-500"
                >
                  (07) 5446 1234
                </a>
              </p>
              <p>
                <a
                  href="mailto:hello@eastell.com.au"
                  className="hover:text-brand-cream transition-colors duration-500"
                >
                  hello@eastell.com.au
                </a>
              </p>
            </div>
          </div>

          <div className="md:col-span-2 md:col-start-7">
            <span className="font-display text-[9px] tracking-[0.15em] text-white/20 block mb-6">
              EXPLORE
            </span>
            {["Buy", "Sell", "Appraisal", "About", "Team"].map((l) => (
              <Link
                key={l}
                href={`/${l.toLowerCase()}`}
                className="block font-serif text-[13px] text-white/30 hover:text-brand-cream transition-colors duration-500 mb-3"
              >
                {l}
              </Link>
            ))}
          </div>

          <div className="md:col-span-2">
            <span className="font-display text-[9px] tracking-[0.15em] text-white/20 block mb-6">
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
                className="block font-serif text-[13px] text-white/30 hover:text-brand-cream transition-colors duration-500 mb-3"
              >
                {s}
              </Link>
            ))}
          </div>

          <div className="md:col-span-2">
            <span className="font-display text-[9px] tracking-[0.15em] text-white/20 block mb-6">
              CONNECT
            </span>
            {["Instagram", "Facebook", "LinkedIn"].map((s) => (
              <a
                key={s}
                href="#"
                className="block font-serif text-[13px] text-white/30 hover:text-brand-cream transition-colors duration-500 mb-3"
              >
                {s}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1440px] px-6 md:px-12 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-serif text-[11px] text-white/15">
            &copy; {new Date().getFullYear()} Eastell & Co. All rights reserved.
          </p>
          <div className="flex gap-8">
            <Link
              href="/privacy"
              className="font-serif text-[11px] text-white/15 hover:text-white/30 transition-colors duration-500"
            >
              Privacy
            </Link>
            <Link
              href="/terms"
              className="font-serif text-[11px] text-white/15 hover:text-white/30 transition-colors duration-500"
            >
              Terms
            </Link>
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
      <main>
        <Hero />
        <Properties />
        <About />
        <NavTiles />
      </main>
      <Footer />
    </>
  );
}
