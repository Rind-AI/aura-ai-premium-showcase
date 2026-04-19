import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, BookOpen, Zap, Star, Users, Cpu, Globe, Award, TrendingUp } from "lucide-react";

// ─── SLIDE DECK DATA — The Gift of Knowledge (NotebookLM) ───────────────────
const giftSlides = [
  {
    id: 1,
    tag: "NOTEBOOKLM SERIES · SLIDE 01",
    headline: "THE GIFT OF KNOWLEDGE",
    sub: "AI-Powered Learning for the Next Generation",
    body: "Khalid Rind's mission: take 1,300+ hours of hard-won AI mastery and compress it into tools that empower the young generation — for free.",
    accent: "#00d4ff",
    icon: "🎁",
    bg: "from-[#00d4ff]/10 via-transparent to-transparent"
  },
  {
    id: 2,
    tag: "NOTEBOOKLM SERIES · SLIDE 02",
    headline: "AI IS YOUR NEW TEACHER",
    sub: "NotebookLM: Upload, Ask, Learn",
    body: "Upload any document, video, or research paper. Ask anything. Get studio-quality audio overviews, deep explanations, and instant insights — powered by Google's most advanced AI.",
    accent: "#a855f7",
    icon: "🧠",
    bg: "from-[#a855f7]/10 via-transparent to-transparent"
  },
  {
    id: 3,
    tag: "NOTEBOOKLM SERIES · SLIDE 03",
    headline: "YOUR AI LEARNING ASSISTANT",
    sub: "Personalized. Instant. Unlimited.",
    body: "No more passive reading. Your AI Learning Assistant transforms any source material into interactive conversation — ask follow-up questions, get summaries, explore connections across topics.",
    accent: "#22c55e",
    icon: "⚡",
    bg: "from-[#22c55e]/10 via-transparent to-transparent"
  },
  {
    id: 4,
    tag: "NOTEBOOKLM SERIES · SLIDE 04",
    headline: "FROM CONFUSION TO CLARITY",
    sub: "3-Step AI Learning Framework",
    body: "Step 1 — Upload your sources. Step 2 — Let AI create your study guide. Step 3 — Have a real conversation with the material. Knowledge becomes yours in minutes, not months.",
    accent: "#f59e0b",
    icon: "🗺️",
    bg: "from-[#f59e0b]/10 via-transparent to-transparent"
  },
  {
    id: 5,
    tag: "NOTEBOOKLM SERIES · SLIDE 05",
    headline: "THE IMPACT",
    sub: "Real Results from Real Learning",
    body: "5 months of AI mastery. 6 live educational platforms. $1.5M+ app empire built with AI tools. This is proof that AI-powered learning doesn't just educate — it transforms lives.",
    accent: "#ef4444",
    icon: "🚀",
    bg: "from-[#ef4444]/10 via-transparent to-transparent"
  },
  {
    id: 6,
    tag: "NOTEBOOKLM SERIES · SLIDE 06",
    headline: "FOR THE YOUNG GENERATION",
    sub: "Khalid's Promise to the World",
    body: "Every tool built, every session recorded, every lesson learned — it's all gifted back. The knowledge that took Khalid years to master is now available to anyone with a browser and a dream.",
    accent: "#00d4ff",
    icon: "💎",
    bg: "from-[#00d4ff]/10 via-transparent to-transparent"
  }
];

// ─── SUPERNOVA STATS ─────────────────────────────────────────────────────────
const supernovaStats = [
  { value: "5", unit: "MONTHS", label: "Zero to AI Empire", icon: TrendingUp, color: "#00d4ff" },
  { value: "1,300+", unit: "HOURS", label: "Dedicated Learning", icon: Cpu, color: "#a855f7" },
  { value: "$2,020", unit: "INVESTED", label: "Tools & Knowledge", icon: Award, color: "#22c55e" },
  { value: "6+", unit: "PLATFORMS", label: "Live & Shipped", icon: Globe, color: "#f59e0b" },
  { value: "$1.5M+", unit: "APP EMPIRE", label: "Total Valuation", icon: Star, color: "#ef4444" },
  { value: "13", unit: "AI AGENTS", label: "Active in Team", icon: Users, color: "#00d4ff" },
];

const timeline = [
  { period: "NOV 2024", event: "First AI prompt. First spark.", color: "#00d4ff" },
  { period: "DEC 2024", event: "WhatsApp automation deployed live", color: "#a855f7" },
  { period: "JAN 2025", event: "Multi-agent AI AIR TEAM founded", color: "#22c55e" },
  { period: "FEB 2025", event: "NeuraNest platform launched", color: "#f59e0b" },
  { period: "MAR 2025", event: "6 live educational platforms shipped", color: "#ef4444" },
  { period: "APR 2025", event: "khalidrind.io — empire on display", color: "#00d4ff" },
];

// ─── SLIDE DECK COMPONENT ────────────────────────────────────────────────────
function SlideDeck({ slides }: { slides: typeof giftSlides }) {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];

  return (
    <div className="flex flex-col gap-4">
      {/* Slide Frame */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.35 }}
          className={`relative rounded-2xl border border-white/10 overflow-hidden bg-gradient-to-br ${slide.bg} p-8 min-h-[280px] flex flex-col justify-between`}
          style={{ borderColor: `${slide.accent}30` }}
        >
          <div className="absolute inset-0 bg-black/60" />
          <div className="absolute top-0 left-0 w-full h-1" style={{ background: `linear-gradient(90deg, transparent, ${slide.accent}, transparent)` }} />
          <div className="relative z-10">
            <span className="text-[9px] font-accent font-bold uppercase tracking-[0.35em] mb-4 block" style={{ color: slide.accent }}>
              {slide.tag}
            </span>
            <div className="flex items-start gap-4 mb-4">
              <span className="text-4xl">{slide.icon}</span>
              <div>
                <h3 className="text-2xl md:text-3xl font-display font-black tracking-tighter leading-none mb-2">
                  {slide.headline}
                </h3>
                <p className="text-xs font-accent font-bold uppercase tracking-widest" style={{ color: slide.accent }}>
                  {slide.sub}
                </p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-lg">
              {slide.body}
            </p>
          </div>
          <div className="relative z-10 flex items-center justify-between mt-6">
            <span className="text-[9px] text-white/20 font-accent uppercase tracking-widest">
              THE GIFT OF KNOWLEDGE — KHALID RIND
            </span>
            <span className="text-[9px] font-bold" style={{ color: slide.accent }}>
              {slide.id} / {slides.length}
            </span>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{ background: i === current ? slide.accent : "rgba(255,255,255,0.15)", transform: i === current ? "scale(1.4)" : "scale(1)" }}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setCurrent(p => (p - 1 + slides.length) % slides.length)}
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setCurrent(p => (p + 1) % slides.length)}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{ background: slide.accent }}
          >
            <ChevronRight className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE ────────────────────────────────────────────────────────────────────
export default function Showroom() {
  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container">

        {/* ── SHOWROOM HERO ────────────────────────────────────────────── */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-primary font-accent text-sm font-bold uppercase tracking-[0.3em] mb-4"
          >
            <BookOpen className="w-4 h-4" />
            NOTEBOOKLM SHOWROOM
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-display font-black tracking-tighter leading-none mb-4"
          >
            THE <span className="text-primary">SHOWROOM</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60 leading-relaxed max-w-2xl"
          >
            Knowledge compressed into motion. Every video backed by a slide deck. Every idea proven by execution. This is the NotebookLM Division — AI learning, made real.
          </motion.p>
        </div>

        {/* ── VIDEO 1 + SLIDES: THE GIFT OF KNOWLEDGE ─────────────────── */}
        <div className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-primary font-accent text-xs font-bold uppercase tracking-[0.3em] mb-8"
          >
            <Zap className="w-3.5 h-3.5" />
            NOTEBOOKLM · GIFT 001
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Video */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <video
                src="/videos/The_Gift_of_Knowledge.mp4"
                controls
                preload="metadata"
                poster="/gallery/notebooklm-gift-preview.png"
                className="w-full aspect-video object-cover block"
              />
              <div className="p-6">
                <span className="text-[9px] font-accent font-bold uppercase tracking-widest text-primary">NOTEBOOKLM · AI LEARNING</span>
                <h2 className="text-2xl font-display font-black tracking-tight mt-1 mb-2">THE GIFT OF KNOWLEDGE</h2>
                <p className="text-white/50 text-sm leading-relaxed">
                  Khalid's NotebookLM masterclass — how AI transforms any document into an interactive learning experience. Built for the next generation.
                </p>
              </div>
            </motion.div>

            {/* Slide Deck */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <p className="text-[10px] font-accent font-bold uppercase tracking-[0.3em] text-white/30 mb-4">SLIDE DECK — NAVIGATE THE CONTENT</p>
              <SlideDeck slides={giftSlides} />
            </motion.div>
          </div>
        </div>

        {/* ── VIDEO 2: YOUR AI LEARNING ASSISTANT ──────────────────────── */}
        <div className="mb-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-[#a855f7] font-accent text-xs font-bold uppercase tracking-[0.3em] mb-8"
          >
            <Cpu className="w-3.5 h-3.5" />
            NOTEBOOKLM · GIFT 002
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Slide Deck first on desktop right side */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <p className="text-[10px] font-accent font-bold uppercase tracking-[0.3em] text-white/30 mb-4">SLIDE DECK — NAVIGATE THE CONTENT</p>
              <SlideDeck slides={[...giftSlides].reverse()} />
            </motion.div>

            {/* Video */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative rounded-2xl overflow-hidden border border-[#a855f7]/20 bg-white/5 order-1 lg:order-2"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#a855f7] to-transparent" />
              <video
                src="/videos/Your_AI_Learning_Assistant.mp4"
                controls
                preload="metadata"
                className="w-full aspect-video object-cover block"
              />
              <div className="p-6">
                <span className="text-[9px] font-accent font-bold uppercase tracking-widest text-[#a855f7]">NOTEBOOKLM · DEEP DIVE</span>
                <h2 className="text-2xl font-display font-black tracking-tight mt-1 mb-2">YOUR AI LEARNING ASSISTANT</h2>
                <p className="text-white/50 text-sm leading-relaxed">
                  A complete walkthrough of building your personal AI tutor — upload, converse, master any subject. This is education, reimagined.
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ══════════════════════════════════════════════════════════════ */}
        {/* SUPERNOVA INFOGRAPHIC                                          */}
        {/* ══════════════════════════════════════════════════════════════ */}
        <div id="supernova" className="mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-primary font-accent text-sm font-bold uppercase tracking-[0.3em] mb-4"
          >
            <Star className="w-4 h-4" />
            SUPERNOVA INFOGRAPHIC
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-display font-black tracking-tighter leading-none mb-4"
          >
            THE NUMBERS <span className="text-primary">DON'T LIE.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="text-white/50 text-lg max-w-2xl mb-16"
          >
            5 months. No CS degree. No team. Just AI, obsession, and an unbreakable mission to empower the next generation.
          </motion.p>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-20">
            {supernovaStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.07 }}
                  className="relative rounded-2xl border border-white/5 bg-white/3 p-7 overflow-hidden group hover:border-white/15 transition-all duration-500"
                  style={{ background: `radial-gradient(circle at top left, ${stat.color}08 0%, transparent 60%)` }}
                >
                  <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: `linear-gradient(90deg, transparent, ${stat.color}60, transparent)` }} />
                  <Icon className="w-5 h-5 mb-4 opacity-60" style={{ color: stat.color }} />
                  <div className="font-display font-black text-4xl md:text-5xl tracking-tighter leading-none mb-1" style={{ color: stat.color }}>
                    {stat.value}
                  </div>
                  <div className="text-[9px] font-accent font-bold uppercase tracking-[0.35em] text-white/30 mb-1">{stat.unit}</div>
                  <div className="text-sm text-white/60 font-bold">{stat.label}</div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ background: stat.color }} />
                </motion.div>
              );
            })}
          </div>

          {/* Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <p className="text-[10px] font-accent font-bold uppercase tracking-[0.35em] text-white/30 mb-10">MISSION TIMELINE — 5-MONTH SUPERNOVA</p>

            {/* Horizontal line */}
            <div className="relative">
              <div className="absolute top-3 left-0 right-0 h-px bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20 hidden md:block" />
              <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                {timeline.map((item, i) => (
                  <motion.div
                    key={item.period}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative flex flex-col items-start md:items-center"
                  >
                    {/* Node */}
                    <div
                      className="w-6 h-6 rounded-full border-2 flex items-center justify-center mb-4 relative z-10 md:self-center"
                      style={{ borderColor: item.color, background: `${item.color}20`, boxShadow: `0 0 12px ${item.color}60` }}
                    >
                      <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                    </div>
                    <span className="text-[8px] font-accent font-black uppercase tracking-[0.3em] mb-2" style={{ color: item.color }}>
                      {item.period}
                    </span>
                    <p className="text-xs text-white/50 leading-snug md:text-center font-bold">
                      {item.event}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── BOTTOM CTA ────────────────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="p-12 rounded-[3rem] glass border-primary/20 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none" />
          <div className="relative z-10">
            <span className="text-[10px] font-accent font-bold uppercase tracking-[0.4em] text-primary mb-4 block">NOTEBOOKLM DIVISION</span>
            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-6">
              KNOWLEDGE IS THE <span className="text-primary italic">GREATEST GIFT.</span>
            </h2>
            <p className="text-white/60 mb-4 max-w-xl mx-auto text-lg">
              Every lesson learned by Khalid Rind is archived, presented, and gifted back to the world — free, forever.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
