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
import { Reveal } from "@/components/ui/Reveal";
import { properties, agents, testimonials, suburbs } from "@/data/mock";

/* ═══════════════════════════════════════════════
   HEADER
   ═══════════════════════════════════════════════ */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-brand-cream"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 flex items-center justify-between h-20 md:h-24">
        <Link href="/">
          <span
            className={`font-display text-base md:text-lg tracking-[0.08em] transition-colors duration-500 ${
              scrolled ? "text-brand-black" : "text-white"
            }`}
          >
            EASTELL & CO
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-10">
          {["Buy", "Sell", "About", "Team", "Contact"].map((item) => (
            <span
              key={item}
              className={`font-serif text-[13px] tracking-wide cursor-pointer transition-colors duration-300 ${
                scrolled
                  ? "text-brand-dark hover:text-brand-black"
                  : "text-white/70 hover:text-white"
              }`}
            >
              {item}
            </span>
          ))}
        </nav>

        <Link
          href="#"
          className={`hidden md:inline-block font-serif text-[13px] tracking-wide px-6 py-2.5 transition-all duration-500 ${
            scrolled
              ? "bg-brand-black text-brand-cream hover:bg-brand-dark"
              : "border border-white/30 text-white hover:bg-white/10"
          }`}
        >
          Free Appraisal
        </Link>
      </div>
    </header>
  );
}

/* ═══════════════════════════════════════════════
   HERO — full-bleed cinematic
   ═══════════════════════════════════════════════ */

function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[700px] overflow-hidden">
      {/* Parallax image */}
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <div className="absolute inset-0 animate-ken-burns">
          <Image
            src="https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&h=1080&fit=crop&q=90"
            alt="Luxury Sunshine Coast residence"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      </motion.div>

      {/* Gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-end"
        style={{ opacity }}
      >
        <div className="mx-auto max-w-[1440px] w-full px-6 md:px-10 pb-24 md:pb-32">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
            className="h-px bg-brand-cream/50 mb-8"
          />
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="font-display text-[clamp(2.5rem,8vw,7rem)] leading-[0.95] tracking-[0.04em] text-white"
          >
            THE COAST
            <br />
            IS OURS
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="mt-6 font-serif italic text-lg md:text-xl text-white/50 max-w-md"
          >
            Sunshine Coast&apos;s premier real estate agency
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-10 flex gap-4"
          >
            <Link
              href="#properties"
              className="px-8 py-4 bg-brand-cream text-brand-black font-serif text-[13px] tracking-wide hover:bg-white transition-colors duration-300"
            >
              View Properties
            </Link>
            <Link
              href="#contact"
              className="px-8 py-4 border border-white/25 text-white font-serif text-[13px] tracking-wide hover:bg-white/10 transition-colors duration-300"
            >
              Free Appraisal
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="w-px h-14 origin-top bg-white/25 animate-pulse-line" />
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   STATS
   ═══════════════════════════════════════════════ */

function Stats() {
  const items = [
    { value: "$180M+", label: "Settled 2025" },
    { value: "200+", label: "5-Star Reviews" },
    { value: "15+", label: "Years Experience" },
    { value: "60+", label: "Suburbs Served" },
  ];

  return (
    <section className="bg-brand-black">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 py-20 md:py-24">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-0 md:divide-x md:divide-white/[0.08]">
          {items.map((item, i) => (
            <Reveal key={item.label} delay={i * 0.1}>
              <div className="text-center px-4">
                <span className="font-display text-4xl sm:text-5xl lg:text-6xl tracking-[0.04em] text-white block">
                  {item.value}
                </span>
                <span className="mt-4 block font-serif text-[11px] uppercase tracking-[0.15em] text-white/30">
                  {item.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FEATURED PROPERTIES
   ═══════════════════════════════════════════════ */

function FeaturedProperties() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section id="properties" className="py-24 md:py-36 bg-white">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="font-display text-[11px] tracking-[0.15em] text-brand-grey block mb-4">
                CURRENTLY LISTED
              </span>
              <div className="w-10 h-px bg-brand-grey/30 mb-8" />
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-[0.04em] text-brand-black">
                FEATURED
                <br />
                PROPERTIES
              </h2>
            </div>
            <span className="font-serif text-[13px] text-brand-dark border-b border-brand-grey/30 pb-1 cursor-pointer hover:text-brand-black hover:border-brand-black transition-colors">
              View All Properties →
            </span>
          </div>
        </Reveal>

        <div
          ref={scrollRef}
          className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide pb-6 -mx-6 px-6 md:-mx-10 md:px-10 snap-x snap-mandatory"
        >
          {properties.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.08} className="flex-shrink-0 w-[85vw] sm:w-[420px] snap-start">
              <article className="group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={p.image}
                    alt={p.address}
                    fill
                    className="object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-110"
                    sizes="(max-width: 640px) 85vw, 420px"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-700" />
                </div>
                <div className="mt-5">
                  <span className="font-display text-[10px] tracking-[0.15em] text-brand-grey">
                    {p.suburb.toUpperCase()}
                  </span>
                  <h3 className="mt-1.5 font-serif font-black text-lg md:text-xl text-brand-black group-hover:text-brand-dark transition-colors duration-300">
                    {p.address}
                  </h3>
                  <p className="mt-2 font-serif text-brand-dark">{p.price}</p>
                  <div className="mt-3 pt-3 border-t border-brand-cream flex gap-5 font-serif text-[13px] text-brand-grey">
                    <span>{p.beds} Bed</span>
                    <span>{p.baths} Bath</span>
                    <span>{p.cars} Car</span>
                    <span>{p.land}</span>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   ABOUT — editorial split
   ═══════════════════════════════════════════════ */

function About() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} className="py-24 md:py-36 bg-brand-cream overflow-hidden">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <div className="grid md:grid-cols-12 gap-10 md:gap-0 items-center">
          {/* Image — offset left */}
          <Reveal variant="fadeLeft" className="md:col-span-5 md:-ml-10">
            <div className="relative aspect-[3/4] overflow-hidden">
              <motion.div className="absolute inset-0" style={{ y: imgY }}>
                <Image
                  src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&h=1067&fit=crop&q=90"
                  alt="Sunshine Coast aerial"
                  fill
                  className="object-cover scale-110"
                  sizes="(max-width: 768px) 100vw, 42vw"
                />
              </motion.div>
            </div>
          </Reveal>

          {/* Text */}
          <div className="md:col-span-6 md:col-start-7">
            <Reveal variant="fadeRight" delay={0.15}>
              <span className="font-display text-[11px] tracking-[0.15em] text-brand-grey block mb-4">
                THE EASTELL APPROACH
              </span>
              <div className="w-10 h-px bg-brand-grey/30 mb-8" />
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-[0.04em] text-brand-black leading-[1.1]">
                BORN ON THE
                <br />
                SUNSHINE COAST
              </h2>
              <div className="mt-8 space-y-5 font-serif text-brand-dark leading-relaxed text-[17px]">
                <p>
                  We don&apos;t just sell property here — we live here, raise our families
                  here, and are deeply invested in the community we serve.
                </p>
                <p>
                  This local knowledge gives us an unmatched understanding of what
                  makes each suburb special, what buyers are looking for, and how
                  to position your property for the best possible result.
                </p>
                <p>
                  From Noosa to Caloundra and the hinterland, Eastell & Co has the
                  experience and relationships to deliver outcomes that exceed
                  expectations.
                </p>
              </div>
              <span className="inline-block mt-10 font-serif text-[13px] text-brand-black border-b border-brand-black pb-1 cursor-pointer hover:text-brand-dark hover:border-brand-dark transition-colors">
                Our Story →
              </span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   TEAM
   ═══════════════════════════════════════════════ */

function Team() {
  return (
    <section className="py-24 md:py-36 bg-brand-black">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10">
        <Reveal>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="font-display text-[11px] tracking-[0.15em] text-brand-grey block mb-4">
                OUR PEOPLE
              </span>
              <div className="w-10 h-px bg-white/15 mb-8" />
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl tracking-[0.04em] text-white">
                MEET YOUR
                <br />
                LOCAL EXPERTS
              </h2>
            </div>
            <span className="font-serif text-[13px] text-brand-grey border-b border-white/15 pb-1 cursor-pointer hover:text-brand-cream hover:border-brand-cream transition-colors">
              Full Team →
            </span>
          </div>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {agents.map((agent, i) => (
            <Reveal key={agent.name} delay={i * 0.1}>
              <div className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={agent.photo}
                    alt={agent.name}
                    fill
                    className="object-cover grayscale group-hover:grayscale-0 transition-all duration-[1s] ease-out group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-700" />
                </div>
                <div className="mt-5">
                  <h3 className="font-serif font-black text-lg text-white group-hover:text-brand-cream transition-colors duration-300">
                    {agent.name}
                  </h3>
                  <p className="font-serif text-[13px] text-brand-grey mt-0.5">{agent.title}</p>
                  <p className="font-serif text-[13px] text-white/25 mt-2">{agent.phone}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   SUBURB TICKER
   ═══════════════════════════════════════════════ */

function SuburbTicker() {
  const doubled = [...suburbs, ...suburbs];
  return (
    <section className="py-10 md:py-14 bg-white border-y border-brand-cream/60 overflow-hidden">
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-32 md:w-56 bg-gradient-to-r from-white to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 md:w-56 bg-gradient-to-l from-white to-transparent z-10" />
        <div className="flex animate-ticker whitespace-nowrap">
          {doubled.map((s, i) => (
            <span
              key={`${s}-${i}`}
              className="inline-flex items-center gap-10 md:gap-14 px-5 md:px-7 font-display text-lg md:text-2xl tracking-[0.06em] text-brand-grey/15 hover:text-brand-black transition-colors duration-700 cursor-pointer"
            >
              <span>{s.toUpperCase()}</span>
              <span className="text-brand-grey/10 text-xs">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   TESTIMONIALS
   ═══════════════════════════════════════════════ */

function Testimonials() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setIdx((p) => (p + 1) % testimonials.length), 8000);
    return () => clearInterval(t);
  }, []);

  const t = testimonials[idx];

  return (
    <section className="py-28 md:py-40 bg-brand-cream">
      <div className="mx-auto max-w-[900px] px-6 md:px-10 text-center">
        <Reveal>
          <span className="font-display text-[11px] tracking-[0.15em] text-brand-grey block mb-4">
            TESTIMONIALS
          </span>
          <div className="w-10 h-px bg-brand-grey/30 mx-auto mb-14" />
        </Reveal>

        <div className="min-h-[250px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote className="font-serif italic text-2xl md:text-3xl lg:text-[2.5rem] text-brand-black leading-snug">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <div className="mt-10">
                <p className="font-serif font-black text-brand-dark">— {t.author}</p>
                <p className="font-serif text-[13px] text-brand-grey mt-1">{t.suburb}</p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-16 flex justify-center gap-3">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIdx(i)}
              className={`transition-all duration-500 h-px ${
                i === idx ? "bg-brand-black w-12" : "bg-brand-grey/25 w-4 hover:bg-brand-grey/50"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   CTA
   ═══════════════════════════════════════════════ */

function CTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);

  return (
    <section id="contact" ref={ref} className="relative py-36 md:py-48 overflow-hidden">
      <motion.div className="absolute inset-0" style={{ y: imgY }}>
        <Image
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop&q=90"
          alt="Sunshine Coast beach"
          fill
          className="object-cover scale-125"
          sizes="100vw"
        />
      </motion.div>
      <div className="absolute inset-0 bg-brand-black/70" />

      <div className="relative z-10 mx-auto max-w-[900px] px-6 md:px-10 text-center">
        <Reveal>
          <div className="w-10 h-px bg-white/20 mx-auto mb-10" />
          <h2 className="font-display text-3xl md:text-4xl lg:text-[3.5rem] tracking-[0.04em] text-white leading-[1.1]">
            READY TO MAKE
            <br />
            YOUR MOVE?
          </h2>
          <p className="mt-6 font-serif text-lg text-white/40 max-w-md mx-auto">
            Whether buying or selling, let&apos;s start the conversation.
          </p>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#"
              className="px-10 py-5 bg-brand-cream text-brand-black font-serif text-[13px] tracking-wide hover:bg-white transition-colors duration-300"
            >
              Get a Free Appraisal
            </Link>
            <Link
              href="#properties"
              className="px-10 py-5 border border-white/25 text-white font-serif text-[13px] tracking-wide hover:bg-white/10 transition-colors duration-300"
            >
              Browse Properties
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="bg-brand-black text-white">
      <div className="mx-auto max-w-[1440px] px-6 md:px-10 py-20 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-4">
            <span className="font-display text-lg tracking-[0.08em] text-brand-cream">
              EASTELL & CO
            </span>
            <p className="mt-2 font-display text-[10px] tracking-[0.15em] text-brand-grey">
              THE COAST IS OURS
            </p>
            <div className="mt-8 space-y-2 font-serif text-[13px] text-white/40">
              <p>123 David Low Way</p>
              <p>Coolum Beach QLD 4573</p>
              <p className="pt-3">
                <a href="tel:0754461234" className="hover:text-brand-cream transition-colors">(07) 5446 1234</a>
              </p>
              <p>
                <a href="mailto:hello@eastell.com.au" className="hover:text-brand-cream transition-colors">hello@eastell.com.au</a>
              </p>
            </div>
          </div>

          {/* Links */}
          <div className="md:col-span-2 md:col-start-6">
            <span className="font-display text-[10px] tracking-[0.15em] text-brand-cream block mb-5">EXPLORE</span>
            {["Buy", "Sell", "Appraisal", "About", "Team", "Contact"].map((l) => (
              <p key={l} className="font-serif text-[13px] text-white/40 hover:text-brand-cream transition-colors cursor-pointer mb-3">
                {l}
              </p>
            ))}
          </div>

          {/* Suburbs */}
          <div className="md:col-span-2">
            <span className="font-display text-[10px] tracking-[0.15em] text-brand-cream block mb-5">SUBURBS</span>
            {suburbs.slice(0, 6).map((s) => (
              <p key={s} className="font-serif text-[13px] text-white/40 hover:text-brand-cream transition-colors cursor-pointer mb-3">
                {s}
              </p>
            ))}
          </div>

          {/* Connect */}
          <div className="md:col-span-2">
            <span className="font-display text-[10px] tracking-[0.15em] text-brand-cream block mb-5">CONNECT</span>
            {["Instagram", "Facebook", "LinkedIn"].map((s) => (
              <p key={s} className="font-serif text-[13px] text-white/40 hover:text-brand-cream transition-colors cursor-pointer mb-3">
                {s}
              </p>
            ))}
            <div className="mt-8 font-serif text-[13px] text-white/25 space-y-1">
              <p>Mon – Fri: 9am – 5pm</p>
              <p>Sat: 9am – 4pm</p>
              <p>Sun: By appointment</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-[1440px] px-6 md:px-10 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-serif text-[12px] text-white/20">
            © {new Date().getFullYear()} Eastell & Co. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="font-serif text-[12px] text-white/20 hover:text-white/40 transition-colors cursor-pointer">Privacy</span>
            <span className="font-serif text-[12px] text-white/20 hover:text-white/40 transition-colors cursor-pointer">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════════ */

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Stats />
        <FeaturedProperties />
        <About />
        <Team />
        <SuburbTicker />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
