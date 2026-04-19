import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star, Zap, BookOpen, ExternalLink, Users, Cpu, Globe, Award, TrendingUp } from "lucide-react";

// ─── KHALID RIND PROFILE SLIDES (from Commander Profile notebook) ─────────────
const profileSlides = [
  {
    id: 1,
    tag: "KHALID RIND — COMMANDER PROFILE · 01",
    headline: "THE QUIET SUPERNOVA",
    sub: "From Government Officer to AI Empire Builder",
    body: "Casual AI user since 2021. Quit NSW Government as Data Support Officer. Relocated from Sydney (10 years) to Melbourne. Went ALL IN on AI upskilling — no shortcuts, no pretending.",
    accent: "#00d4ff",
    icon: "👑",
  },
  {
    id: 2,
    tag: "KHALID RIND — COMMANDER PROFILE · 02",
    headline: "5 MILLION LINES OF CODE",
    sub: "2,000 Hours. Zero CS Degree.",
    body: "Not a coder by training — a conductor by obsession. Ran 5 million lines of code across Claude, Gemini, Grok, DeepSeek and ChatGPT. Built the world's first documented multi-AI orchestration system.",
    accent: "#a855f7",
    icon: "⚡",
  },
  {
    id: 3,
    tag: "KHALID RIND — COMMANDER PROFILE · 03",
    headline: "THE DATA MISSION",
    sub: "Turning Existing Business Data into Power",
    body: "Khalid helps any business transform their existing data into powerful gems and insights — optimising entire operations, revealing hidden value, and making decisions that actually move the needle.",
    accent: "#22c55e",
    icon: "🎯",
  },
  {
    id: 4,
    tag: "KHALID RIND — COMMANDER PROFILE · 04",
    headline: "THE RIND STANDARD",
    sub: "Zero Hallucination. Zero Placeholder.",
    body: "After discovering a 48% AI hallucination rate across the industry, Khalid built his own anti-hallucination protocol — Truth Check, Evidence Check, Capability Check. Every output verified. Every claim real.",
    accent: "#f59e0b",
    icon: "🛡️",
  },
  {
    id: 5,
    tag: "KHALID RIND — COMMANDER PROFILE · 05",
    headline: "THE AI AIR TEAM",
    sub: "13 Agents. One Commander.",
    body: "Founded the AI AIR Team — 13 specialised agents coordinated from one hub. Claude, Gemini, Grok, GitHub, Supabase — all working as a unified intelligence force for clients and the empire.",
    accent: "#ef4444",
    icon: "🤖",
  },
  {
    id: 6,
    tag: "KHALID RIND — COMMANDER PROFILE · 06",
    headline: "GIFT TO THE WORLD",
    sub: "Knowledge for the Next Generation",
    body: "Every tool built, every session documented, every insight earned — gifted back to the young generation. This is not an AI bubble. This is pure, real, true intelligence in service of humanity.",
    accent: "#00d4ff",
    icon: "🎁",
  },
];

// ─── NOTEBOOKS (live from NotebookLM account) ────────────────────────────────
const notebooks = [
  { id: "4f88b73f-1028-4718-878d-17a576091fce", title: "K RIND COMMANDOR PROFILE", sources: 229, updated: "2026-04-19", featured: true },
  { id: "4879c72c-0f51-4975-a24f-ef5884a2519b", title: "The Super Nova King: Engineering Digital Empires in 2026", sources: 295, updated: "2026-02-17", featured: true },
  { id: "fda0cb0e-6a5b-48d0-8c18-29697df9ab5c", title: "Antigravity: The Sovereign Offline Digital Audit System", sources: 300, updated: "2026-01-24", featured: true },
  { id: "9e9256b5-cdba-4eed-ae2b-d1156a2c0dc7", title: "The Blueprint for Strategic Brand and Website Growth", sources: 257, updated: "2026-01-28", featured: true },
  { id: "f56838fa-7544-4b52-9c10-08b140aa79aa", title: "Antigravity AI: The Digital Empire and Autonomous Profit Blueprint", sources: 137, updated: "2026-04-09", featured: false },
  { id: "25a46f18-f689-4c8b-aa2b-21917b010733", title: "Digital Assets Champion: Scaling 5M LOC into an Empire", sources: 114, updated: "2026-04-09", featured: false },
  { id: "adffd252-a1b9-4c88-b3f5-861aedd2d90a", title: "APM 2026: The Human Operating System Strategic Vision", sources: 144, updated: "2026-02-16", featured: false },
  { id: "052e22bd-2c15-4217-b0f3-12781ddf0e7b", title: "NeuraNest AI Year 1 Strategy: Marketing and Operations Plan", sources: 135, updated: "2026-01-15", featured: false },
  { id: "500ced6b-9699-49a6-b114-84464b18e0a9", title: "Digital Empire: Strategic Framework for OpenClaw and Antigravity", sources: 144, updated: "2026-02-01", featured: false },
  { id: "e81e72b9-813b-4723-914a-5e4a5bcf7a8c", title: "NeuraNest AI Architecture and Client Launch Systems", sources: 63, updated: "2026-02-07", featured: false },
  { id: "c00e5652-6593-460a-ba8f-af235bd9de20", title: "The Gift of Knowledge: Strategic Launch of NotebookLM", sources: 1, updated: "2026-04-19", featured: false },
  { id: "9cd5d87f-7559-48ea-ad07-aab98485a7e4", title: "Integrating Gemini Gems and NotebookLM into Openclaw Architecture", sources: 1, updated: "2026-04-19", featured: false },
];

const supernovaStats = [
  { value: "5", unit: "MONTHS", label: "Zero to AI Empire", icon: TrendingUp, color: "#00d4ff" },
  { value: "2,000+", unit: "HOURS", label: "Dedicated Mastery", icon: Cpu, color: "#a855f7" },
  { value: "5M", unit: "LINES OF CODE", label: "Executed & Verified", icon: Award, color: "#22c55e" },
  { value: "6+", unit: "PLATFORMS", label: "Live & Shipped", icon: Globe, color: "#f59e0b" },
  { value: "$1.5M+", unit: "APP EMPIRE", label: "Total Valuation", icon: Star, color: "#ef4444" },
  { value: "98", unit: "NOTEBOOKS", label: "Knowledge Archive", icon: BookOpen, color: "#00d4ff" },
];

const timeline = [
  { period: "2021", event: "First AI prompt — casual user, eyes wide open", color: "#00d4ff" },
  { period: "NOV 2024", event: "Quit NSW Government Data Support Officer role", color: "#a855f7" },
  { period: "DEC 2024", event: "Relocated Sydney → Melbourne. All in.", color: "#22c55e" },
  { period: "JAN 2025", event: "AI AIR Team founded — 13 agents active", color: "#f59e0b" },
  { period: "MAR 2025", event: "6 live platforms shipped. Empire growing.", color: "#ef4444" },
  { period: "APR 2025", event: "khalidrind.io — empire on display for the world", color: "#00d4ff" },
];

// ─── SLIDE DECK ───────────────────────────────────────────────────────────────
function SlideDeck({ slides }: { slides: typeof profileSlides }) {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];
  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-2xl border overflow-hidden p-8 min-h-[280px] flex flex-col justify-between bg-black"
          style={{ borderColor: `${slide.accent}30` }}
        >
          <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: `linear-gradient(90deg,transparent,${slide.accent},transparent)` }} />
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle at top left, ${slide.accent}08 0%, transparent 60%)` }} />
          <div className="relative z-10">
            <span className="text-[9px] font-accent font-black uppercase tracking-[0.35em] mb-4 block" style={{ color: slide.accent }}>{slide.tag}</span>
            <div className="flex items-start gap-4 mb-4">
              <span className="text-4xl">{slide.icon}</span>
              <div>
                <h3 className="text-2xl md:text-3xl font-display font-black tracking-tighter leading-none mb-1">{slide.headline}</h3>
                <p className="text-xs font-accent font-bold uppercase tracking-widest" style={{ color: slide.accent }}>{slide.sub}</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed max-w-lg">{slide.body}</p>
          </div>
          <div className="relative z-10 flex items-center justify-between mt-6">
            <span className="text-[9px] text-white/20 font-accent uppercase tracking-widest">KHALID RIND — COMMANDER PROFILE</span>
            <span className="text-[9px] font-bold" style={{ color: slide.accent }}>{slide.id} / {slides.length}</span>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{ background: i === current ? slide.accent : "rgba(255,255,255,0.15)", transform: i === current ? "scale(1.4)" : "scale(1)" }}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setCurrent(p => (p - 1 + slides.length) % slides.length)} className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => setCurrent(p => (p + 1) % slides.length)} className="w-9 h-9 rounded-full flex items-center justify-center" style={{ background: slide.accent }}>
            <ChevronRight className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function SupernovaInfographic() {
  const [showAll, setShowAll] = useState(false);
  const visibleNotebooks = showAll ? notebooks : notebooks.slice(0, 6);

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container">

        {/* ── HERO ──────────────────────────────────────────────────── */}
        <div className="mb-24">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-primary font-accent text-sm font-bold uppercase tracking-[0.3em] mb-4">
            <Star className="w-4 h-4" />
            SUPERNOVA INFOGRAPHIC
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-6xl md:text-9xl font-display font-black tracking-tighter leading-none mb-4">
            KHALID RIND <span className="text-primary">PROFILE</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-lg text-white/60 leading-relaxed max-w-2xl">
            NSW Government Data Officer → Melbourne → All-in on AI since 2021. 5M lines of code. 2,000 hours. Now turning any business's existing data into powerful insights that optimise entire operations.
          </motion.p>
        </div>

        {/* ── KHALID RIND COMMANDER PROFILE VIDEO + SLIDES ──────────── */}
        <div className="mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex items-center gap-3 text-primary font-accent text-xs font-bold uppercase tracking-[0.3em] mb-8">
            <Zap className="w-3.5 h-3.5" />
            KHALID RIND — COMMANDER PROFILE
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
            {/* Video */}
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="relative rounded-2xl overflow-hidden border border-primary/20 bg-white/5">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
              <video src="/videos/KHALID-RIND-PROFILE-VIDEO.mp4" controls preload="metadata"
                className="w-full aspect-video object-cover block" />
              <div className="p-6">
                <span className="text-[9px] font-accent font-black uppercase tracking-widest text-primary">K RIND COMMANDOR PROFILE · 229 SOURCES</span>
                <h2 className="text-2xl font-display font-black tracking-tight mt-1 mb-2">KHALID RIND — COMMANDER PROFILE</h2>
                <p className="text-white/50 text-sm leading-relaxed">
                  The full story — from NSW Government Data Support Officer to Melbourne AI empire builder. 5M lines of code. 2,000 hours. Built for the next generation.
                </p>
                {/* Audio player */}
                <div className="mt-4">
                  <p className="text-[9px] font-accent font-bold uppercase tracking-widest text-white/30 mb-2">AUDIO OVERVIEW — DEEP DIVE NARRATION</p>
                  <audio src="/videos/KHALID-RIND-PROFILE-AUDIO.m4a" controls className="w-full h-10 rounded-xl" />
                </div>
              </div>
            </motion.div>

            {/* Slide Deck */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <p className="text-[10px] font-accent font-bold uppercase tracking-[0.3em] text-white/30 mb-4">COMMANDER PROFILE — SLIDE DECK</p>
              <SlideDeck slides={profileSlides} />
            </motion.div>
          </div>
        </div>

        {/* ── SUPERNOVA STATS ────────────────────────────────────────── */}
        <div className="mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex items-center gap-3 text-primary font-accent text-sm font-bold uppercase tracking-[0.3em] mb-4">
            <TrendingUp className="w-4 h-4" />
            THE NUMBERS
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-none mb-16">
            DON'T <span className="text-primary">LIE.</span>
          </motion.h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-20">
            {supernovaStats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div key={stat.label} initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.07 }}
                  className="relative rounded-2xl border border-white/5 p-7 overflow-hidden group hover:border-white/15 transition-all duration-500"
                  style={{ background: `radial-gradient(circle at top left, ${stat.color}08 0%, transparent 60%)` }}>
                  <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: `linear-gradient(90deg,transparent,${stat.color}60,transparent)` }} />
                  <Icon className="w-5 h-5 mb-4 opacity-60" style={{ color: stat.color }} />
                  <div className="font-display font-black text-4xl md:text-5xl tracking-tighter leading-none mb-1" style={{ color: stat.color }}>{stat.value}</div>
                  <div className="text-[9px] font-accent font-bold uppercase tracking-[0.35em] text-white/30 mb-1">{stat.unit}</div>
                  <div className="text-sm text-white/60 font-bold">{stat.label}</div>
                  <div className="absolute bottom-0 right-0 w-24 h-24 rounded-full blur-[40px] opacity-0 group-hover:opacity-20 transition-opacity duration-500" style={{ background: stat.color }} />
                </motion.div>
              );
            })}
          </div>

          {/* Timeline */}
          <p className="text-[10px] font-accent font-bold uppercase tracking-[0.35em] text-white/30 mb-10">MISSION TIMELINE</p>
          <div className="relative">
            <div className="absolute top-3 left-0 right-0 h-px bg-gradient-to-r from-primary/20 via-primary/60 to-primary/20 hidden md:block" />
            <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
              {timeline.map((item, i) => (
                <motion.div key={item.period} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="relative flex flex-col items-start md:items-center">
                  <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center mb-4 relative z-10 md:self-center"
                    style={{ borderColor: item.color, background: `${item.color}20`, boxShadow: `0 0 12px ${item.color}60` }}>
                    <div className="w-2 h-2 rounded-full" style={{ background: item.color }} />
                  </div>
                  <span className="text-[8px] font-accent font-black uppercase tracking-[0.3em] mb-2" style={{ color: item.color }}>{item.period}</span>
                  <p className="text-xs text-white/50 leading-snug md:text-center font-bold">{item.event}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* ── NOTEBOOKLM KNOWLEDGE VAULT ────────────────────────────── */}
        <div className="mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="flex items-center gap-3 text-primary font-accent text-sm font-bold uppercase tracking-[0.3em] mb-4">
            <BookOpen className="w-4 h-4" />
            NOTEBOOKLM KNOWLEDGE VAULT
          </motion.div>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-black tracking-tighter leading-none mb-4">
            98 NOTEBOOKS. <span className="text-primary">ALL LIVE.</span>
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="text-white/50 text-lg max-w-2xl mb-12">
            Every notebook is a knowledge engine. Click any to open it directly in NotebookLM.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {visibleNotebooks.map((nb, i) => (
              <motion.a
                key={nb.id}
                href={`https://notebooklm.google.com/notebook/${nb.id}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group relative rounded-2xl border border-white/5 bg-white/3 p-6 hover:border-primary/30 transition-all duration-300 cursor-pointer block"
                style={{ background: nb.featured ? "radial-gradient(circle at top left, rgba(0,212,255,0.06) 0%, transparent 60%)" : undefined }}
              >
                {nb.featured && (
                  <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
                )}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="text-[9px] font-accent font-bold uppercase tracking-widest text-primary opacity-60">
                    {nb.sources} SOURCES · {nb.updated}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-white/20 group-hover:text-primary transition-colors shrink-0 mt-0.5" />
                </div>
                <h3 className="text-sm font-display font-bold tracking-tight group-hover:text-primary transition-colors leading-snug">
                  {nb.title}
                </h3>
                {nb.featured && (
                  <span className="inline-block mt-3 text-[8px] font-accent font-black uppercase tracking-[0.3em] text-primary bg-primary/10 px-2 py-1 rounded-md">
                    FEATURED
                  </span>
                )}
              </motion.a>
            ))}
          </div>

          {!showAll && (
            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="text-center mt-8">
              <button onClick={() => setShowAll(true)}
                className="px-8 h-12 rounded-full border border-primary/30 text-primary font-accent font-bold text-sm uppercase tracking-widest hover:bg-primary/10 transition-all duration-300">
                SHOW ALL 98 NOTEBOOKS
              </button>
            </motion.div>
          )}
        </div>

        {/* ── CTA ───────────────────────────────────────────────────── */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="p-12 rounded-[3rem] glass border-primary/20 text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <div className="relative z-10">
            <span className="text-[10px] font-accent font-bold uppercase tracking-[0.4em] text-primary mb-4 block">KHALID RIND · MELBOURNE · AI EMPIRE</span>
            <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-6">
              YOUR BUSINESS DATA IS A <span className="text-primary italic">GOLDMINE.</span>
            </h2>
            <p className="text-white/60 mb-4 max-w-xl mx-auto text-lg">
              Khalid turns your existing data into powerful insights that optimise your entire operation. No fluff. No AI bubble. Real results.
            </p>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
