"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";

const EXPO = [0.16, 1, 0.3, 1] as const;

const SUBURBS = [
  {
    name: "Noosa Heads",
    tagline: "Where the river meets the national park.",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&h=1100&fit=crop&q=80",
  },
  {
    name: "Coolum Beach",
    tagline: "Uncrowded surf. Mount Coolum at your back.",
    image: "https://images.unsplash.com/photo-1506929562872-bb421503ef21?w=800&h=1100&fit=crop&q=80",
  },
  {
    name: "Sunshine Beach",
    tagline: "The coast's best-kept postcode.",
    image: "https://images.unsplash.com/photo-1505142468610-359e7d316be0?w=800&h=1100&fit=crop&q=80",
  },
];

/* ═══════════════════════════════════════════
   CUSTOM CURSOR
   ═══════════════════════════════════════════ */

function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const target = useRef({ x: -100, y: -100 });
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("");
  const [isTouch, setIsTouch] = useState(true);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    if (isTouch) return;

    const onMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    let raf: number;
    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      if (dot.current) {
        dot.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(animate);
    };

    const onOver = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-cursor]");
      if (el) {
        setHovering(true);
        setLabel(el.getAttribute("data-cursor") || "");
      }
    };
    const onOut = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest("[data-cursor]");
      if (el) {
        setHovering(false);
        setLabel("");
      }
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      ref={dot}
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
    >
      <div
        className={`rounded-full bg-e-cream flex items-center justify-center transition-all duration-300 ease-out ${
          hovering ? "w-20 h-20" : "w-3 h-3"
        }`}
      >
        {hovering && label && (
          <span className="font-display text-[7px] tracking-[0.15em] text-e-black">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   HORIZONTAL WIPE — SIGNATURE REVEAL
   ═══════════════════════════════════════════ */

function Wipe({
  children,
  from = "left",
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  from?: "left" | "right" | "bottom";
  delay?: number;
  className?: string;
}) {
  const clips = {
    left: ["inset(0 100% 0 0)", "inset(0 0% 0 0)"],
    right: ["inset(0 0 0 100%)", "inset(0 0 0 0%)"],
    bottom: ["inset(100% 0 0 0)", "inset(0% 0 0 0)"],
  };
  return (
    <motion.div
      initial={{ clipPath: clips[from][0] }}
      whileInView={{ clipPath: clips[from][1] }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 1.4, delay, ease: EXPO }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════
   MENU OVERLAY
   ═══════════════════════════════════════════ */

function MenuOverlay({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = ["Buy", "Sell", "About", "Team", "Suburbs", "Contact"];

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ clipPath: "inset(0 0 0 100%)" }}
          animate={{ clipPath: "inset(0 0 0 0%)" }}
          exit={{ clipPath: "inset(0 0 0 100%)" }}
          transition={{ duration: 0.8, ease: EXPO }}
          className="fixed inset-0 z-[100] bg-e-black flex flex-col"
        >
          <div className="flex items-center justify-between px-6 md:px-16 h-20">
            <span className="font-display text-[10px] tracking-[0.2em] text-e-cream/30">
              EASTELL & CO
            </span>
            <button
              onClick={onClose}
              className="font-display text-[10px] tracking-[0.2em] text-e-mid hover:text-e-cream transition-colors duration-500"
              data-cursor="CLOSE"
            >
              CLOSE
            </button>
          </div>
          <nav className="flex-1 flex flex-col justify-center px-6 md:px-16 gap-2">
            {links.map((item, i) => (
              <motion.div
                key={item}
                initial={{ opacity: 0, x: 60 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: 0.3 + i * 0.06,
                  duration: 0.7,
                  ease: EXPO,
                }}
              >
                <Link
                  href={`/${item.toLowerCase()}`}
                  onClick={onClose}
                  className="block py-3 font-display text-[clamp(2rem,8vw,6rem)] tracking-[0.05em] text-e-cream/80 hover:text-e-cream transition-colors duration-500 leading-[1]"
                  data-cursor="GO"
                >
                  {item.toUpperCase()}
                </Link>
              </motion.div>
            ))}
          </nav>
          <div className="px-6 md:px-16 pb-8 flex justify-between items-end">
            <p className="font-serif text-[12px] text-e-mid/40">
              (07) 5446 1234
            </p>
            <p className="font-serif text-[12px] text-e-mid/40">
              hello@eastell.com.au
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════
   BEAT 1 — THE OPENING
   Dark. Atmospheric. Withholding.
   ═══════════════════════════════════════════ */

function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handle = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 12,
        y: (e.clientY / window.innerHeight - 0.5) * 8,
      });
    };
    window.addEventListener("mousemove", handle);
    return () => window.removeEventListener("mousemove", handle);
  }, []);

  const letters = "EASTELL".split("");

  return (
    <section className="relative h-[100svh] min-h-[700px] bg-e-black overflow-hidden">
      {/* Image — right side, bleeds off edge, desktop only */}
      <motion.div
        className="absolute top-0 right-0 w-[55%] h-full hidden md:block"
        animate={{ x: mouse.x, y: mouse.y }}
        transition={{ type: "tween", duration: 0.8, ease: "easeOut" }}
      >
        <div className="absolute inset-0 -right-[10%]">
          <Image
            src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1400&h=1000&fit=crop&q=90"
            alt="Architectural luxury home at twilight"
            fill
            priority
            className="object-cover"
            sizes="60vw"
          />
        </div>
        <div className="absolute inset-y-0 left-0 w-48 bg-gradient-to-r from-e-black to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-e-black to-transparent" />
      </motion.div>

      {/* Mobile: image as bg */}
      <div className="absolute inset-0 md:hidden">
        <Image
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=1200&fit=crop&q=80"
          alt="Architectural luxury home at twilight"
          fill
          priority
          className="object-cover opacity-25"
          sizes="100vw"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end px-6 md:px-16 pb-12 md:pb-20">
        <h1 className="font-display text-[clamp(3.5rem,15vw,14rem)] text-e-cream leading-[0.85] tracking-[0.02em]">
          {letters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                delay: 0.4 + i * 0.06,
                duration: 0.9,
                ease: EXPO,
              }}
              className="inline-block"
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        {/* Line wipe */}
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "clamp(3rem, 8vw, 8rem)" }}
          transition={{ delay: 1, duration: 1, ease: EXPO }}
          className="h-px bg-e-cream/20 mt-4"
        />

        {/* & CO */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mt-4 flex items-baseline gap-3"
        >
          <span className="font-serif italic text-[clamp(1.2rem,3.5vw,3.5rem)] text-e-cream/30">
            &amp;
          </span>
          <span className="font-display text-[clamp(1rem,4vw,4rem)] text-e-cream/70 tracking-[0.06em]">
            CO
          </span>
        </motion.div>

        {/* Location */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="mt-8 font-display text-[8px] tracking-[0.3em] text-e-mid/50"
        >
          SUNSHINE COAST
        </motion.p>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   BEAT 2 — THE WHISPER
   Quiet authority. 70%+ empty space.
   ═══════════════════════════════════════════ */

function Whisper() {
  return (
    <section className="bg-e-light" style={{ padding: "clamp(8rem, 22vh, 22rem) 0" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <Wipe from="left">
          <h2 className="font-serif font-black text-[clamp(1.6rem,5vw,5rem)] text-e-black leading-[1.1]">
            We don&apos;t list homes.
          </h2>
        </Wipe>
        <Wipe from="left" delay={0.15}>
          <h2 className="font-serif font-black text-[clamp(1.6rem,5vw,5rem)] text-e-grey leading-[1.1] mt-1">
            We position legacies.
          </h2>
        </Wipe>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   BEAT 3 — THE REVEAL
   Warmth enters. Overlapping planes.
   ═══════════════════════════════════════════ */

function Reveal() {
  return (
    <section className="bg-e-light overflow-hidden" style={{ padding: "clamp(4rem, 8vh, 8rem) 0" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <div className="grid md:grid-cols-12 gap-0 items-center">
          {/* Image — bleeds left beyond container */}
          <Wipe from="left" className="md:col-span-7 md:-ml-16">
            <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1519046904884-53103b34b206?w=1000&h=1300&fit=crop&q=85"
                alt="Sunshine Coast golden hour"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 58vw"
              />
            </div>
          </Wipe>

          {/* Text — overlaps image as separate plane */}
          <div className="md:col-span-5 md:-ml-24 relative z-10 mt-[-3rem] md:mt-0">
            <div className="bg-e-light p-8 md:p-14">
              <Wipe from="right" delay={0.2}>
                <span className="font-display text-[7px] tracking-[0.3em] text-e-mid block mb-6">
                  THE PRINCIPAL
                </span>
                <h3 className="font-display text-[clamp(1.1rem,2.2vw,1.8rem)] tracking-[0.08em] text-e-black leading-[1.2]">
                  CLINTON EASTELL
                </h3>
                <p className="mt-6 font-serif text-[15px] text-e-grey leading-[1.85]">
                  Fifteen years on this coast. Not visiting — living. Selling.
                  Building a name that carries weight in every suburb from Noosa
                  to Caloundra. The relationships are real. The results follow.
                </p>
                <Link
                  href="/about"
                  data-cursor="VIEW"
                  className="inline-block mt-8 font-display text-[8px] tracking-[0.2em] text-e-black border-b border-e-black/30 pb-1 hover:border-e-black transition-colors duration-700"
                >
                  FULL STORY
                </Link>
              </Wipe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   BEAT 4 — THE PIVOT
   Space IS the design. One invitation.
   ═══════════════════════════════════════════ */

function Pivot() {
  return (
    <section className="bg-e-light" style={{ padding: "clamp(6rem, 14vh, 14rem) 0" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 text-center">
        <Wipe from="bottom">
          <p className="font-serif italic text-[clamp(1.3rem,2.8vw,2.5rem)] text-e-grey/80 leading-[1.4]">
            Your home deserves this.
          </p>
          <div className="mt-12">
            <Link
              href="/appraisal"
              data-cursor="ENTER"
              className="inline-block bg-e-black text-e-cream font-display text-[8px] tracking-[0.2em] px-12 py-5 hover:bg-e-grey transition-colors duration-700"
            >
              REQUEST AN APPRAISAL
            </Link>
          </div>
        </Wipe>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   BEAT 5 — THE PROOF
   Sledgehammer. Massive numbers on dark.
   ═══════════════════════════════════════════ */

function Proof() {
  const stats = [
    { number: "$47.2M", label: "SETTLED" },
    { number: "96%", label: "AUCTION CLEARANCE" },
    { number: "14", label: "AVERAGE DAYS ON MARKET" },
  ];

  return (
    <section className="bg-e-black" style={{ padding: "clamp(6rem, 14vh, 14rem) 0" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <Wipe from="left">
          <span className="font-display text-[7px] tracking-[0.3em] text-e-mid/40 block mb-20">
            2024 RESULTS
          </span>
        </Wipe>

        <div className="space-y-16 md:space-y-28">
          {stats.map((stat, i) => (
            <Wipe key={stat.label} from="left" delay={i * 0.12}>
              <div className="flex items-end gap-4 md:gap-10">
                <span className="font-display text-[clamp(3rem,13vw,13rem)] text-e-cream leading-[0.8] tracking-[-0.02em]">
                  {stat.number}
                </span>
                <span className="font-display text-[7px] md:text-[9px] tracking-[0.2em] text-e-mid/50 pb-3 md:pb-6">
                  {stat.label}
                </span>
              </div>
            </Wipe>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   BEAT 6 — THE WORLD
   Immersive. Horizontal. Full-bleed.
   ═══════════════════════════════════════════ */

function World() {
  return (
    <section className="bg-e-light overflow-hidden" style={{ padding: "clamp(6rem, 12vh, 12rem) 0" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-16 mb-12">
        <Wipe from="left">
          <span className="font-display text-[7px] tracking-[0.3em] text-e-mid">
            THE COAST
          </span>
        </Wipe>
      </div>

      {/* Horizontal scroll — breaks container */}
      <div className="flex gap-5 md:gap-7 overflow-x-auto scrollbar-hide px-6 md:px-16 pb-4">
        {SUBURBS.map((s, i) => (
          <Wipe key={s.name} from="right" delay={i * 0.1}>
            <Link
              href={`/suburbs/${s.name.toLowerCase().replace(/\s/g, "-")}`}
              data-cursor="EXPLORE"
              className="flex-shrink-0 w-[78vw] md:w-[38vw] relative group block"
            >
              <div className="aspect-[3/4] relative overflow-hidden">
                <Image
                  src={s.image}
                  alt={s.name}
                  fill
                  className="object-cover transition-transform duration-[800ms] ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 768px) 78vw, 38vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 p-6 md:p-10">
                  <h3 className="font-display text-[clamp(0.9rem,2vw,1.5rem)] tracking-[0.12em] text-white">
                    {s.name.toUpperCase()}
                  </h3>
                  <p className="mt-2 font-serif text-[13px] text-white/45 leading-relaxed">
                    {s.tagline}
                  </p>
                </div>
              </div>
            </Link>
          </Wipe>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   BEAT 7 — THE CRAFT
   Editorial gallery. Overlapping collage.
   ═══════════════════════════════════════════ */

function Craft() {
  return (
    <section className="bg-e-light overflow-hidden" style={{ padding: "clamp(4rem, 8vh, 8rem) 0 clamp(6rem, 12vh, 12rem)" }}>
      <div className="max-w-[1400px] mx-auto px-6 md:px-16">
        <Wipe from="left">
          <span className="font-display text-[7px] tracking-[0.3em] text-e-mid block mb-4">
            THE PRESENTATION
          </span>
          <p className="font-serif text-[15px] text-e-grey max-w-md leading-[1.8]">
            Every campaign is built to the same standard. Editorial photography.
            Considered copy. A digital presence that matches the home.
          </p>
        </Wipe>

        {/* Staggered collage — different sizes, offsets */}
        <div className="mt-16 grid md:grid-cols-12 gap-4 items-start">
          <Wipe from="bottom" className="md:col-span-5">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=700&h=900&fit=crop&q=85"
                alt="Property exterior"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 42vw"
              />
            </div>
          </Wipe>
          <Wipe from="bottom" delay={0.15} className="md:col-span-4 md:mt-28">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=600&h=750&fit=crop&q=85"
                alt="Interior living space"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
            </div>
          </Wipe>
          <Wipe from="bottom" delay={0.3} className="md:col-span-3 md:-mt-16">
            <div className="relative aspect-[3/4] overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500&h=650&fit=crop&q=85"
                alt="Modern kitchen"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 25vw"
              />
            </div>
          </Wipe>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   BEAT 8 — THE CLOSE
   Confident. Warm. Inevitable.
   ═══════════════════════════════════════════ */

function Close() {
  return (
    <>
      <section className="bg-e-black" style={{ padding: "clamp(8rem, 18vh, 18rem) 0" }}>
        <div className="max-w-[1400px] mx-auto px-6 md:px-16">
          <Wipe from="left">
            <h2 className="font-display text-[clamp(2.5rem,10vw,10rem)] text-e-cream leading-[0.85] tracking-[0.01em]">
              LET&apos;S
            </h2>
            <h2 className="font-display text-[clamp(2.5rem,10vw,10rem)] text-e-mid/40 leading-[0.85] tracking-[0.01em]">
              BEGIN.
            </h2>
          </Wipe>

          <Wipe from="left" delay={0.2}>
            <div className="mt-14 flex flex-col md:flex-row items-start gap-6 md:gap-12">
              <Link
                href="/appraisal"
                data-cursor="ENTER"
                className="inline-block bg-e-cream text-e-black font-display text-[8px] tracking-[0.2em] px-12 py-5 hover:bg-e-mid transition-colors duration-700"
              >
                REQUEST AN APPRAISAL
              </Link>
              <a
                href="tel:0754461234"
                className="font-serif text-[clamp(1rem,1.5vw,1.3rem)] text-e-mid/50 hover:text-e-cream transition-colors duration-500"
              >
                (07) 5446 1234
              </a>
            </div>
          </Wipe>
        </div>
      </section>

      {/* Footer — seamless dark */}
      <footer className="bg-e-black border-t border-white/[0.04]">
        <div className="max-w-[1400px] mx-auto px-6 md:px-16 py-10">
          <div className="flex flex-col md:flex-row justify-between gap-6 items-start md:items-end">
            <div>
              <span className="font-display text-[10px] tracking-[0.15em] text-e-cream/20">
                EASTELL & CO
              </span>
              <p className="mt-2 font-serif text-[11px] text-white/15">
                123 David Low Way, Coolum Beach QLD 4573
              </p>
            </div>
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
          <p className="mt-6 font-serif text-[10px] text-white/8">
            &copy; {new Date().getFullYear()} Eastell & Co
          </p>
        </div>
      </footer>
    </>
  );
}

/* ═══════════════════════════════════════════
   PAGE
   ═══════════════════════════════════════════ */

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);

  // Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <>
      <Cursor />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />

      {/* Top bar — not a nav, just two anchors */}
      <div className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-6 md:px-16 h-16 md:h-20">
        <Link href="/" className="font-display text-[9px] tracking-[0.2em] text-e-cream/30 hover:text-e-cream/60 transition-colors duration-500">
          EASTELL & CO
        </Link>
        <button
          onClick={() => setMenuOpen(true)}
          className="font-display text-[9px] tracking-[0.2em] text-e-cream/30 hover:text-e-cream/60 transition-colors duration-500"
          data-cursor="OPEN"
        >
          MENU
        </button>
      </div>

      <main>
        <Hero />
        <Whisper />
        <Reveal />
        <Pivot />
        <Proof />
        <World />
        <Craft />
        <Close />
      </main>
    </>
  );
}
