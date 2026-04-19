import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronLeft, ChevronRight, Star, Zap, BookOpen, MapPin, Clock, Code2, ChevronDown, X } from "lucide-react";

// ─── SLIDE DECK ───────────────────────────────────────────────────────────────
const profileSlides = [
  {
    id: 1,
    tag: "KHALID RIND · COMMANDER PROFILE · 01",
    headline: "THE QUIET SUPERNOVA",
    sub: "From Government Officer to AI Expert",
    body: "Casual AI user since 2021. Quit NSW Government as Data Support Officer after 10 years in Sydney. Relocated to Melbourne. Went ALL IN — no shortcuts, no pretending, just real work.",
    accent: "#00d4ff",
    icon: "👑",
  },
  {
    id: 2,
    tag: "KHALID RIND · COMMANDER PROFILE · 02",
    headline: "5 MILLION LINES OF CODE",
    sub: "2,000 Hours. Zero CS Degree.",
    body: "Not a coder by training — a conductor by obsession. Ran 5 million lines of code across Claude, Gemini, Grok, DeepSeek and ChatGPT. Built the world's first documented multi-AI orchestration system.",
    accent: "#a855f7",
    icon: "⚡",
  },
  {
    id: 3,
    tag: "KHALID RIND · COMMANDER PROFILE · 03",
    headline: "YOUR BUSINESS DATA IS A GOLDMINE",
    sub: "Existing Data → Powerful Insights",
    body: "Khalid helps any business transform their existing data into powerful gems and insights — optimising entire operations, revealing hidden value, and driving decisions that actually move the needle.",
    accent: "#22c55e",
    icon: "🎯",
  },
  {
    id: 4,
    tag: "KHALID RIND · COMMANDER PROFILE · 04",
    headline: "THE RIND STANDARD",
    sub: "Zero Hallucination. Every Claim Verified.",
    body: "After discovering a 48% AI hallucination rate across the industry, Khalid built his own anti-hallucination protocol — Truth Check, Evidence Check, Capability Check. Real outputs only.",
    accent: "#f59e0b",
    icon: "🛡️",
  },
  {
    id: 5,
    tag: "KHALID RIND · COMMANDER PROFILE · 05",
    headline: "THE AI AIR TEAM",
    sub: "13 Agents. One Commander.",
    body: "Founded the AI AIR Team — 13 specialised agents coordinated from one hub. Claude, Gemini, Grok, GitHub, Supabase — all working as a unified intelligence force.",
    accent: "#ef4444",
    icon: "🤖",
  },
  {
    id: 6,
    tag: "KHALID RIND · COMMANDER PROFILE · 06",
    headline: "GIFT TO THE WORLD",
    sub: "Knowledge for the Next Generation",
    body: "Every tool built, every session documented, every insight earned — gifted back to the young generation. Pure, real, true intelligence in service of humanity.",
    accent: "#00d4ff",
    icon: "🎁",
  },
];

const stats = [
  { value: "2021", label: "AI journey began", icon: Star, color: "#00d4ff" },
  { value: "2,000+", label: "Hours of mastery", icon: Clock, color: "#a855f7" },
  { value: "5M", label: "Lines of code run", icon: Code2, color: "#22c55e" },
  { value: "6+", label: "Live platforms shipped", icon: Zap, color: "#f59e0b" },
];

// ─── SLIDE DECK COMPONENT ─────────────────────────────────────────────────────
function SlideDeck() {
  const [current, setCurrent] = useState(0);
  const slide = profileSlides[current];
  return (
    <div className="flex flex-col gap-4">
      <AnimatePresence mode="wait">
        <motion.div key={slide.id}
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
          transition={{ duration: 0.3 }}
          className="relative rounded-2xl border overflow-hidden p-6 md:p-8 min-h-[260px] flex flex-col justify-between bg-black"
          style={{ borderColor: `${slide.accent}30` }}
        >
          <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: `linear-gradient(90deg,transparent,${slide.accent},transparent)` }} />
          <div className="absolute inset-0" style={{ background: `radial-gradient(circle at top left,${slide.accent}08 0%,transparent 60%)` }} />
          <div className="relative z-10">
            <span className="text-[9px] font-accent font-black uppercase tracking-[0.3em] mb-3 block" style={{ color: slide.accent }}>{slide.tag}</span>
            <div className="flex items-start gap-3 mb-4">
              <span className="text-3xl">{slide.icon}</span>
              <div>
                <h3 className="text-xl md:text-2xl font-display font-black tracking-tighter leading-none mb-1">{slide.headline}</h3>
                <p className="text-[10px] font-accent font-bold uppercase tracking-widest" style={{ color: slide.accent }}>{slide.sub}</p>
              </div>
            </div>
            <p className="text-white/60 text-sm leading-relaxed">{slide.body}</p>
          </div>
          <div className="relative z-10 flex items-center justify-between mt-4">
            <span className="text-[8px] text-white/20 font-accent uppercase tracking-widest">KHALID RIND — COMMANDER PROFILE</span>
            <span className="text-[9px] font-bold" style={{ color: slide.accent }}>{slide.id} / {profileSlides.length}</span>
          </div>
        </motion.div>
      </AnimatePresence>
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {profileSlides.map((_, i) => (
            <button key={i} onClick={() => setCurrent(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{ background: i === current ? slide.accent : "rgba(255,255,255,0.15)", transform: i === current ? "scale(1.4)" : "scale(1)" }}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setCurrent(p => (p - 1 + profileSlides.length) % profileSlides.length)}
            className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center hover:border-white/30 transition-colors">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button onClick={() => setCurrent(p => (p + 1) % profileSlides.length)}
            className="w-9 h-9 rounded-full flex items-center justify-center transition-colors"
            style={{ background: slide.accent }}>
            <ChevronRight className="w-4 h-4 text-black" />
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── EXPANDED PROFILE LAYOUT ──────────────────────────────────────────────────
function KhalidProfile({ onClose }: { onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative"
    >
      {/* Close button */}
      <div className="flex justify-end mb-6">
        <button onClick={onClose}
          className="flex items-center gap-2 text-white/40 hover:text-white text-xs font-accent font-bold uppercase tracking-widest transition-colors">
          <X className="w-4 h-4" /> COLLAPSE
        </button>
      </div>

      {/* ── HERO ROW: Photo + Identity ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12 items-center">
        {/* Profile photo */}
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.1 }}
          className="relative rounded-3xl overflow-hidden border border-primary/20 shadow-[0_0_60px_rgba(0,212,255,0.15)]">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent z-10" />
          <img src="/gallery/khalid-rind-profile.png" alt="Khalid Rind"
            className="w-full aspect-[4/5] object-cover object-top" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 z-10">
            <p className="text-[9px] font-accent font-bold uppercase tracking-[0.35em] text-primary mb-1">COMMANDER PROFILE</p>
            <h2 className="text-3xl font-display font-black tracking-tighter">KHALID RIND</h2>
            <p className="text-white/60 text-sm font-bold mt-1">AI & Data Intelligence · Melbourne</p>
          </div>
        </motion.div>

        {/* Identity + stats */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <span className="text-[9px] font-accent font-bold uppercase tracking-[0.35em] text-primary mb-4 block">WHO IS KHALID RIND</span>
          <h3 className="text-3xl md:text-4xl font-display font-black tracking-tighter leading-tight mb-6">
            THE ARCHITECT OF<br /><span className="text-primary">THE AI EMPIRE</span>
          </h3>
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <MapPin className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-white/70 text-sm leading-relaxed">Relocated from Sydney (10 years) to Melbourne. Former NSW Government Data Support Officer — quit to go ALL IN on AI.</p>
            </div>
            <div className="flex items-start gap-3">
              <Zap className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-white/70 text-sm leading-relaxed">Casual AI user since 2021. Now transforms any business's existing data into powerful gems and insights that optimise entire operations.</p>
            </div>
            <div className="flex items-start gap-3">
              <BookOpen className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              <p className="text-white/70 text-sm leading-relaxed">Built the world's first documented multi-AI orchestration system. 13 agents. Zero hallucination standard.</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((s) => {
              const Icon = s.icon;
              return (
                <div key={s.label} className="rounded-2xl border border-white/5 p-4 relative overflow-hidden"
                  style={{ background: `radial-gradient(circle at top left,${s.color}08 0%,transparent 60%)` }}>
                  <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: `linear-gradient(90deg,transparent,${s.color}50,transparent)` }} />
                  <Icon className="w-4 h-4 mb-2 opacity-50" style={{ color: s.color }} />
                  <div className="text-2xl font-display font-black" style={{ color: s.color }}>{s.value}</div>
                  <div className="text-[9px] text-white/40 font-accent uppercase tracking-widest mt-0.5">{s.label}</div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>

      {/* ── VIDEO ── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mb-10">
        <p className="text-[9px] font-accent font-bold uppercase tracking-[0.35em] text-primary mb-4 flex items-center gap-2">
          <Zap className="w-3 h-3" /> COMMANDER PROFILE VIDEO · 3 MINUTES
        </p>
        <div className="relative rounded-2xl overflow-hidden border border-primary/20">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent z-10" />
          <video src="/videos/KHALID-RIND-PROFILE-VIDEO-3MIN.mp4" controls preload="metadata"
            className="w-full aspect-video object-cover block" />
        </div>
      </motion.div>

      {/* ── AUDIO ── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }} className="mb-10">
        <p className="text-[9px] font-accent font-bold uppercase tracking-[0.35em] text-white/30 mb-3">AUDIO OVERVIEW — DEEP DIVE NARRATION</p>
        <div className="rounded-2xl border border-white/5 bg-white/3 p-4">
          <audio src="/videos/KHALID-RIND-PROFILE-AUDIO.m4a" controls className="w-full" />
        </div>
      </motion.div>

      {/* ── SLIDE DECK ── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="mb-10">
        <p className="text-[9px] font-accent font-bold uppercase tracking-[0.35em] text-primary mb-4 flex items-center gap-2">
          <BookOpen className="w-3 h-3" /> COMMANDER PROFILE — SLIDE DECK
        </p>
        <SlideDeck />
      </motion.div>

      {/* ── INFOGRAPHIC ── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mb-4">
        <p className="text-[9px] font-accent font-bold uppercase tracking-[0.35em] text-primary mb-4 flex items-center gap-2">
          <Star className="w-3 h-3" /> INFOGRAPHIC — THE ARCHITECT OF THE AI EMPIRE
        </p>
        <div className="relative rounded-2xl overflow-hidden border border-primary/20">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent z-10" />
          <img src="/gallery/KHALID-RIND-INFOGRAPHIC.png" alt="Khalid Rind Infographic"
            className="w-full rounded-2xl" />
        </div>
      </motion.div>

      {/* Collapse button bottom */}
      <div className="flex justify-center mt-10">
        <button onClick={onClose}
          className="flex items-center gap-2 px-8 h-12 rounded-full border border-white/10 text-white/40 hover:border-primary/40 hover:text-primary text-xs font-accent font-bold uppercase tracking-widest transition-all duration-300">
          <ChevronDown className="w-4 h-4 rotate-180" /> COLLAPSE PROFILE
        </button>
      </div>
    </motion.div>
  );
}

// ─── PAGE ─────────────────────────────────────────────────────────────────────
export default function SupernovaInfographic() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container max-w-5xl">

        {/* ── PAGE HEADER ──────────────────────────────────────────── */}
        <div className="mb-16">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-primary font-accent text-sm font-bold uppercase tracking-[0.3em] mb-4">
            <Star className="w-4 h-4" />
            SUPERNOVA INFOGRAPHIC
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-display font-black tracking-tighter leading-none mb-4">
            KNOWLEDGE <span className="text-primary">VAULT</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="text-white/50 text-lg max-w-xl">
            Every profile built one by one. Click to expand. Each one a living notebook, video, slide deck and infographic.
          </motion.p>
        </div>

        {/* ── KHALID RIND PROFILE CARD ─────────────────────────────── */}
        <AnimatePresence mode="wait">
          {!expanded ? (
            <motion.div key="card"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.4 }}
            >
              {/* THE CARD — click to expand */}
              <motion.button
                onClick={() => setExpanded(true)}
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="w-full text-left group relative rounded-3xl border border-primary/20 overflow-hidden bg-black cursor-pointer"
                style={{ background: "radial-gradient(circle at top left, rgba(0,212,255,0.06) 0%, transparent 50%)" }}
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  {/* Photo side */}
                  <div className="relative overflow-hidden min-h-[300px] md:min-h-[420px]">
                    <img src="/gallery/khalid-rind-profile.png" alt="Khalid Rind"
                      className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-black/80 hidden md:block" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
                  </div>

                  {/* Info side */}
                  <div className="p-8 md:p-10 flex flex-col justify-center">
                    <span className="text-[9px] font-accent font-bold uppercase tracking-[0.4em] text-primary mb-4 block">
                      NOTEBOOKLM · 229 SOURCES · COMMANDER PROFILE
                    </span>

                    <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter leading-none mb-2">
                      KHALID RIND
                    </h2>
                    <p className="text-primary font-accent font-bold text-sm uppercase tracking-widest mb-6">
                      COMMANDER — AI & DATA INTELLIGENCE
                    </p>

                    <div className="space-y-3 mb-8">
                      <p className="text-white/60 text-sm flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-primary shrink-0" />
                        Melbourne, Australia · Former NSW Government
                      </p>
                      <p className="text-white/60 text-sm flex items-center gap-2">
                        <Zap className="w-3.5 h-3.5 text-primary shrink-0" />
                        AI user since 2021 · 5M lines of code · 2,000 hours
                      </p>
                      <p className="text-white/60 text-sm flex items-center gap-2">
                        <BookOpen className="w-3.5 h-3.5 text-primary shrink-0" />
                        Transforms business data into powerful insights
                      </p>
                    </div>

                    {/* What's inside */}
                    <div className="grid grid-cols-2 gap-2 mb-8">
                      {["VIDEO · 3 MIN", "AUDIO OVERVIEW", "SLIDE DECK · 6", "INFOGRAPHIC"].map((item) => (
                        <div key={item} className="text-[9px] font-accent font-bold uppercase tracking-widest text-white/30 border border-white/5 rounded-xl px-3 py-2 text-center">
                          {item}
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center gap-3 text-primary font-accent font-bold text-sm uppercase tracking-widest group-hover:gap-4 transition-all duration-300">
                      <ChevronDown className="w-5 h-5 animate-bounce" />
                      CLICK TO EXPAND FULL PROFILE
                    </div>
                  </div>
                </div>

                {/* Bottom glow */}
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
              </motion.button>

              {/* Coming soon placeholder */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                className="mt-6 rounded-2xl border border-white/5 p-6 text-center">
                <p className="text-[10px] font-accent font-bold uppercase tracking-[0.35em] text-white/20">
                  MORE PROFILES COMING · ADDED ONE BY ONE AS CREATED
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <KhalidProfile onClose={() => setExpanded(false)} />
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
