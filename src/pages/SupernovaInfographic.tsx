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

// ─── PDF SLIDE DECKS ──────────────────────────────────────────────────────────
const slideDecks = [
  {
    title: "Khalid Rind — Commander Profile",
    desc: "The complete profile slide deck — journey, achievements, AI empire and the Rind Standard.",
    url: "/pdfs/khalid-rind-profile-slides.pdf",
    pages: "Full Deck",
    accent: "#00d4ff",
    icon: "👑",
  },
  {
    title: "The AI Operator Revolution",
    desc: "How AI operators are replacing traditional roles — a deep dive into the shift redefining industries.",
    url: "/pdfs/the-ai-operator-revolution.pdf",
    pages: "Deep Dive",
    accent: "#a855f7",
    icon: "⚡",
  },
  {
    title: "Industrial Intelligence",
    desc: "From raw data to industrial-grade intelligence — transforming business operations with AI.",
    url: "/pdfs/industrial-intelligence.pdf",
    pages: "Strategy Doc",
    accent: "#22c55e",
    icon: "🏭",
  },
  {
    title: "Khalid Rind — Overview",
    desc: "Concise overview deck covering AI expertise, data intelligence work and the Melbourne empire.",
    url: "/pdfs/khalid-rind-overview.pdf",
    pages: "Overview",
    accent: "#f59e0b",
    icon: "🎯",
  },
  {
    title: "NeuraNest Empire Activation",
    desc: "The full empire activation plan — platforms, agents, revenue systems and global deployment.",
    url: "/pdfs/neuranest-empire-activation.pdf",
    pages: "Master Plan",
    accent: "#ef4444",
    icon: "🚀",
  },
  {
    title: "The Gift of Knowledge",
    desc: "Knowledge gifted to the next generation — NotebookLM, AI learning systems and the education mission.",
    url: "/pdfs/the-gift-of-knowledge.pdf",
    pages: "Mission Doc",
    accent: "#00d4ff",
    icon: "🎁",
  },
];

// ─── PREVIOUS PROJECTS ────────────────────────────────────────────────────────
const previousProjects = [
  {
    client: "APM Branding",
    tagline: "11 Countries, One Purpose",
    industry: "Human Services · Global",
    desc: "Full brand strategy & enterprise dashboard for the world's leading purpose-driven human services provider across 11 countries.",
    preview: "/gallery/projects/apm.png",
    url: "/previous-projects/apm/index.html",
    accent: "#00d4ff",
    tag: "ENTERPRISE DASHBOARD",
  },
  {
    client: "OZ Cheap Deal",
    tagline: "From Generic to Six-Figure Authority",
    industry: "E-Commerce · Australia",
    desc: "90-day brand metamorphosis — digital audit, rebranding strategy and trust-building roadmap to transform a budget e-commerce brand.",
    preview: "/gallery/projects/oz-cheap-deal.png",
    url: "/previous-projects/oz-cheap-deal.html",
    accent: "#f59e0b",
    tag: "DIGITAL AUDIT",
  },
  {
    client: "VOCUS",
    tagline: "Rise of an Infrastructure Giant",
    industry: "Telecommunications · ASX",
    desc: "Strategic rebranding audit for a $3.5B ASX-listed telco — 50,000km+ fibre network, positioning and brand transformation.",
    preview: "/gallery/projects/vocus.png",
    url: "/previous-projects/vocus.html",
    accent: "#22c55e",
    tag: "BRAND AUDIT",
  },
  {
    client: "The Agent",
    tagline: "Achieve Your Property Goals",
    industry: "Real Estate · Melbourne West",
    desc: "Complete AI brand OS for real estate — digital audit, SEO strategy, rebranding and campaign assets for the Tarneit market.",
    preview: "/gallery/projects/the-agent.png",
    url: "/previous-projects/the-agent.html",
    accent: "#a855f7",
    tag: "BRAND AUDIT",
  },
  {
    client: "EDventure",
    tagline: "Homeschooling, Reimagined",
    industry: "Education · Australia",
    desc: "Digital audit and initial strategy report for a homeschooling platform — 3-pillar framework for flexible, high-quality education.",
    preview: "/gallery/projects/edventure.png",
    url: "/previous-projects/edventure.html",
    accent: "#ef4444",
    tag: "DIGITAL AUDIT",
  },
  {
    client: "Towelling Stories",
    tagline: "From Cute to Essential",
    industry: "Baby Products · E-Commerce",
    desc: "Full rebranding blueprint — repositioning a hand-stitched baby towel as premium safety gear with 12-month marketing roadmap.",
    preview: "/gallery/projects/towelling.png",
    url: "/previous-projects/towelling-stories.html",
    accent: "#00d4ff",
    tag: "REBRAND REPORT",
  },
  {
    client: "Copy with Haliya",
    tagline: "2026: Time to Connect",
    industry: "Food & Hospitality · Sydney",
    desc: "Brand strategy, copywriting and social media full report — shifting from transactional to authentic customer connection.",
    preview: "/gallery/projects/haliya.png",
    url: "/previous-projects/haliya.html",
    accent: "#f59e0b",
    tag: "BRAND REPORT",
  },
  {
    client: "Cleaning Rebranding",
    tagline: "Full Optimisation Report",
    industry: "Home Services · Australia",
    desc: "AI-powered digital audit and complete brand optimisation report — Google Business Profile, growth engine and 30-day ecosystem.",
    preview: null,
    url: "/previous-projects/cleaning.html",
    accent: "#22c55e",
    tag: "DIGITAL AUDIT",
  },
  {
    client: "Piza Restaurant",
    tagline: "Fusion Flavour, Digital Future",
    industry: "Food & Beverage · Melbourne",
    desc: "Digital presence audit and brand strategy dashboard for a fusion restaurant entering the online ordering market.",
    preview: null,
    url: "/previous-projects/piza.html",
    accent: "#a855f7",
    tag: "BRAND AUDIT",
  },
];

// ─── TEMPLATES ────────────────────────────────────────────────────────────────
const templates = [
  {
    name: "NeuraNest Catalyst",
    desc: "Premium AI subscription landing page — Melbourne edition",
    category: "LANDING PAGE",
    preview: "/gallery/templates/TEMPL-1.png",
    url: "/templates/neuranest-catalyst.html",
    accent: "#00d4ff",
  },
  {
    name: "Emperor Master Dashboard",
    desc: "Full empire operations dashboard — live platforms, revenue, MCP servers",
    category: "DASHBOARD",
    preview: "/gallery/templates/TEMPL-2.png",
    url: "/templates/emperor-dashboard.html",
    accent: "#a855f7",
  },
  {
    name: "World's Best AI Dashboard",
    desc: "Claude Code CLI + Custom GPT Desktop challenge dashboard",
    category: "DASHBOARD",
    preview: "/gallery/templates/dashboard.png",
    url: "/templates/worlds-best-ai-dashboard.html",
    accent: "#22c55e",
  },
  {
    name: "AI Agency Launch",
    desc: "One-page AI agency launch command centre",
    category: "DASHBOARD",
    preview: null,
    url: "/templates/ai-agency-dashboard.html",
    accent: "#f59e0b",
  },
  {
    name: "Comprehensive Empire",
    desc: "Full meeting-ready empire overview with all systems",
    category: "DASHBOARD",
    preview: null,
    url: "/templates/empire-dashboard.html",
    accent: "#ef4444",
  },
  {
    name: "Melbourne Landing",
    desc: "NeuraNest Melbourne-focused client acquisition page",
    category: "LANDING PAGE",
    preview: null,
    url: "/templates/melbourne-landing.html",
    accent: "#00d4ff",
  },
  {
    name: "Great Single Page Tool",
    desc: "Powerful single-page operational tool layout",
    category: "TOOL",
    preview: null,
    url: "/templates/great-single-page.html",
    accent: "#a855f7",
  },
  {
    name: "Ultimate Empire Dashboard",
    desc: "Upgraded empire dashboard — all KPIs and deployments",
    category: "DASHBOARD",
    preview: null,
    url: "/templates/ultimate-empire-dashboard.html",
    accent: "#22c55e",
  },
  {
    name: "OneDrive Dashboard",
    desc: "Working OneDrive-integrated operations dashboard",
    category: "DASHBOARD",
    preview: null,
    url: "/templates/onedrive-dashboard.html",
    accent: "#f59e0b",
  },
  {
    name: "AI Consultant Dashboard",
    desc: "Professional AI consultant client-facing dashboard",
    category: "DASHBOARD",
    preview: null,
    url: "/templates/ai-consultant-dashboard.html",
    accent: "#ef4444",
  },
];

// ─── PROJECTS ─────────────────────────────────────────────────────────────────
const liveProjects = [
  { name: "NeuraNest AI World", desc: "Main AI platform & flagship hub", url: "https://www.neuranestai.world/", accent: "#00d4ff", tag: "FLAGSHIP" },
  { name: "Cosmos Learning Universe", desc: "AI-powered education cosmos", url: "https://neuranest-cosmos-learning-universe.vercel.app/", accent: "#a855f7", tag: "EDUCATION" },
  { name: "Education Rebirth", desc: "Next-gen learning platform v197", url: "https://neuranest-education-rebirth-v197.vercel.app/", accent: "#22c55e", tag: "EDUCATION" },
  { name: "Digital Campus", desc: "Virtual campus experience v31", url: "https://neuranest-digital-campus-v31.vercel.app/", accent: "#f59e0b", tag: "CAMPUS" },
  { name: "Launch Kit Generator", desc: "AI launch kit builder v157", url: "https://neuranest-launch-kit-generator-v157.vercel.app/", accent: "#ef4444", tag: "TOOLS" },
  { name: "Cognitas Mind Forge", desc: "Intelligence forging platform", url: "https://cognitas-the-mind-forge.vercel.app/", accent: "#00d4ff", tag: "AI PLATFORM" },
  { name: "NeuraNest Agency", desc: "AI agency & consulting services", url: "https://www.neuranestai.agency/", accent: "#a855f7", tag: "AGENCY" },
  { name: "PainTrack App", desc: "Health data tracking solution", url: "https://paintrack-app-91780598-a966a.web.app/", accent: "#22c55e", tag: "HEALTH TECH" },
  { name: "AI Studio", desc: "Creative AI production studio", url: "https://studio-2817764142-bd3c3.web.app/", accent: "#f59e0b", tag: "STUDIO" },
  { name: "MiniMax Space", desc: "Interactive AI space experience", url: "https://3m2folmk7vgb.space.minimax.io/", accent: "#ef4444", tag: "INTERACTIVE" },
  { name: "NeuraNest AI Catalyst", desc: "AI catalyst platform for business growth", url: "https://neuranest-ai-catalyst.vercel.app/", accent: "#00d4ff", tag: "AI PLATFORM" },
  { name: "ProjectFlow Hybrid", desc: "Hybrid project management powered by AI", url: "https://projectflowhybrid.vercel.app/", accent: "#a855f7", tag: "PRODUCTIVITY" },
  { name: "MiniMax Space 2", desc: "Next-gen AI interactive experience", url: "https://oihf0qthqhfe.space.minimax.io/", accent: "#22c55e", tag: "INTERACTIVE" },
  { name: "ViralVault", desc: "Viral content strategy & vault system", url: "https://neuranest-enterprise.github.io/ViralVault/", accent: "#f59e0b", tag: "CONTENT" },
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

// ─── INFOGRAPHIC GALLERY ──────────────────────────────────────────────────────
const infographics = [
  { src: "/gallery/KHALID-RIND-INFOGRAPHIC.png", alt: "The Architect of the AI Empire" },
  { src: "/gallery/infographics/unnamed (14).png", alt: "Infographic 14" },
  { src: "/gallery/infographics/unnamed (15).png", alt: "Infographic 15" },
  { src: "/gallery/infographics/unnamed (16).png", alt: "Infographic 16" },
  { src: "/gallery/infographics/unnamed (17).png", alt: "Infographic 17" },
  { src: "/gallery/infographics/unnamed (18).png", alt: "Infographic 18" },
  { src: "/gallery/infographics/unnamed (19).png", alt: "Infographic 19" },
  { src: "/gallery/infographics/unnamed (20).png", alt: "Infographic 20" },
  { src: "/gallery/infographics/unnamed (21).png", alt: "Infographic 21" },
  { src: "/gallery/infographics/unnamed (22).png", alt: "Infographic 22" },
  { src: "/gallery/infographics/unnamed (23).png", alt: "Infographic 23" },
  { src: "/gallery/infographics/unnamed (26).png", alt: "Infographic 26" },
  { src: "/gallery/infographics/unnamed (27).png", alt: "Infographic 27" },
  { src: "/gallery/infographics/unnamed (28).png", alt: "Infographic 28" },
  { src: "/gallery/infographics/unnamed (29).png", alt: "Infographic 29" },
  { src: "/gallery/infographics/unnamed (30).png", alt: "Infographic 30" },
  { src: "/gallery/infographics/unnamed (31).png", alt: "Infographic 31" },
  { src: "/gallery/infographics/unnamed (32).png", alt: "Infographic 32" },
];

function InfographicGallery() {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState(0);
  const prev = (e: React.MouseEvent) => { e.stopPropagation(); setCurrent(p => (p - 1 + infographics.length) % infographics.length); };
  const next = (e: React.MouseEvent) => { e.stopPropagation(); setCurrent(p => (p + 1) % infographics.length); };
  const openAt = (i: number) => { setCurrent(i); setOpen(true); };

  return (
    <>
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }} className="mb-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <p className="text-[9px] font-accent font-bold uppercase tracking-[0.35em] text-primary flex items-center gap-2">
            <Star className="w-3 h-3" /> INFOGRAPHIC GALLERY — 4 / {infographics.length}
          </p>
          <button
            onClick={() => openAt(0)}
            className="flex items-center gap-2 text-[9px] font-accent font-bold uppercase tracking-widest px-4 py-2 rounded-full border border-primary/40 text-primary hover:bg-primary hover:text-black transition-all duration-200"
          >
            VIEW GALLERY <ChevronRight className="w-3 h-3" />
          </button>
        </div>

        {/* 4-thumbnail grid */}
        <div className="grid grid-cols-2 gap-3">
          {infographics.slice(0, 4).map((img, i) => (
            <motion.button
              key={i}
              onClick={() => openAt(i)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-2xl overflow-hidden border border-primary/20 group cursor-pointer"
            >
              <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-primary to-transparent z-10" />
              <img src={img.src} alt={img.alt} className="w-full block" />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center">
                <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-[9px] font-accent font-bold uppercase tracking-widest text-white bg-black/60 px-3 py-1.5 rounded-full backdrop-blur-sm">
                  EXPAND
                </span>
              </div>
              <div className="absolute bottom-2 right-2 text-[7px] font-accent font-bold text-primary/60 z-10">{i + 1}/{infographics.length}</div>
            </motion.button>
          ))}
        </div>

        {/* Show remaining count */}
        <div className="mt-3 text-center">
          <button onClick={() => openAt(4)} className="text-[9px] font-accent text-white/30 hover:text-primary transition-colors uppercase tracking-widest">
            + {infographics.length - 4} MORE INFOGRAPHICS — VIEW ALL →
          </button>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/97 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          >
            {/* Close */}
            <button
              className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center z-20 transition-all"
              onClick={() => setOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>

            {/* Counter */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 text-[10px] font-accent font-bold uppercase tracking-[0.35em] z-20" style={{ color: "#00d4ff" }}>
              INFOGRAPHIC GALLERY — {current + 1} / {infographics.length}
            </div>

            {/* Prev */}
            <button
              className="absolute left-4 md:left-8 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/10 hover:border-primary/50 flex items-center justify-center z-20 transition-all"
              onClick={prev}
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Image */}
            <motion.div
              key={current}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="mx-20 max-w-4xl max-h-[85vh] flex items-center justify-center"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={infographics[current].src}
                alt={infographics[current].alt}
                className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
                style={{ boxShadow: "0 0 60px rgba(0,212,255,0.12)" }}
              />
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 md:right-8 w-12 h-12 rounded-full flex items-center justify-center z-20 transition-all"
              style={{ background: "#00d4ff" }}
              onClick={next}
            >
              <ChevronRight className="w-6 h-6 text-black" />
            </button>

            {/* Dot strip */}
            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-1.5 flex-wrap justify-center max-w-xs px-4" onClick={e => e.stopPropagation()}>
              {infographics.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)}
                  className="w-1.5 h-1.5 rounded-full transition-all duration-300"
                  style={{ background: i === current ? "#00d4ff" : "rgba(255,255,255,0.2)", transform: i === current ? "scale(1.6)" : "scale(1)" }}
                />
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
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

      {/* ── PDF SLIDE DECKS ── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.42 }} className="mb-10">
        <p className="text-[9px] font-accent font-bold uppercase tracking-[0.35em] text-primary mb-2 flex items-center gap-2">
          <BookOpen className="w-3 h-3" /> PDF SLIDE DECKS — CLICK TO OPEN
        </p>
        <p className="text-white/30 text-xs mb-5">Strategy documents, deep dives and mission decks. Opens full PDF in new tab.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {slideDecks.map((deck, i) => (
            <motion.a
              key={i}
              href={deck.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44 + i * 0.05 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-2xl border overflow-hidden p-5 bg-black cursor-pointer group"
              style={{ borderColor: `${deck.accent}25` }}
            >
              <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: `linear-gradient(90deg,transparent,${deck.accent},transparent)` }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `radial-gradient(circle at top left,${deck.accent}08 0%,transparent 60%)` }} />
              <div className="relative z-10">
                <div className="flex items-start justify-between mb-3">
                  <span className="text-2xl">{deck.icon}</span>
                  <span className="text-[7px] font-accent font-black uppercase tracking-widest px-2 py-1 rounded-full" style={{ background: `${deck.accent}15`, color: deck.accent }}>{deck.pages}</span>
                </div>
                <h4 className="text-sm font-display font-black tracking-tight mb-2 leading-tight">{deck.title}</h4>
                <p className="text-white/40 text-[10px] leading-relaxed mb-3">{deck.desc}</p>
                <div className="flex items-center gap-1.5 opacity-40 group-hover:opacity-90 transition-opacity" style={{ color: deck.accent }}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="text-[8px] font-accent font-bold uppercase tracking-widest">Open PDF</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* ── INFOGRAPHIC GALLERY ── */}
      <InfographicGallery />

      {/* ── PREVIOUS PROJECTS ── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.46 }} className="mb-4 mt-10">
        <p className="text-[9px] font-accent font-bold uppercase tracking-[0.35em] text-primary mb-2 flex items-center gap-2">
          <Star className="w-3 h-3" /> PREVIOUS PROJECTS — CLIENT AUDIT DASHBOARDS
        </p>
        <p className="text-white/30 text-xs mb-6">Real client work by NeuraNest AI. Click any card to open the full audit dashboard.</p>

        {/* Featured 3 with screenshot previews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {previousProjects.filter(p => p.preview).slice(0, 3).map((p, i) => (
            <motion.a
              key={i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.48 + i * 0.06 }}
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-2xl border overflow-hidden cursor-pointer group"
              style={{ borderColor: `${p.accent}30` }}
            >
              <div className="relative overflow-hidden h-52">
                <img src={p.preview!} alt={p.client}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm border flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderColor: `${p.accent}50` }}>
                  <svg className="w-3.5 h-3.5" style={{ color: p.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
                <div className="absolute bottom-0 left-0 p-4 z-10">
                  <span className="text-[8px] font-accent font-black uppercase tracking-[0.3em] block mb-1" style={{ color: p.accent }}>{p.tag}</span>
                  <h4 className="text-sm font-display font-black tracking-tight leading-tight">{p.client}</h4>
                  <p className="text-white/50 text-[9px] mt-0.5">{p.industry}</p>
                </div>
              </div>
              <div className="p-3 bg-black border-t" style={{ borderColor: `${p.accent}20` }}>
                <p className="text-white/40 text-[10px] leading-relaxed line-clamp-2">{p.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Remaining 4 with previews — 2 col */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          {previousProjects.filter(p => p.preview).slice(3).map((p, i) => (
            <motion.a
              key={i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + i * 0.05 }}
              whileHover={{ scale: 1.01, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-2xl border overflow-hidden cursor-pointer group flex"
              style={{ borderColor: `${p.accent}25` }}
            >
              <div className="relative w-28 shrink-0 overflow-hidden">
                <img src={p.preview!} alt={p.client}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-black/60" />
              </div>
              <div className="p-4 bg-black flex flex-col justify-between flex-1">
                <div>
                  <span className="text-[7px] font-accent font-black uppercase tracking-[0.3em] block mb-1" style={{ color: p.accent }}>{p.tag} · {p.industry}</span>
                  <h4 className="text-sm font-display font-bold tracking-tight mb-1">{p.client}</h4>
                  <p className="text-white/35 text-[9px] leading-relaxed line-clamp-2">{p.desc}</p>
                </div>
                <div className="flex items-center gap-1 mt-2 opacity-40 group-hover:opacity-80 transition-opacity" style={{ color: p.accent }}>
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span className="text-[8px] font-accent font-bold uppercase tracking-widest">Open Dashboard</span>
                </div>
              </div>
            </motion.a>
          ))}
        </div>

        {/* No-preview cards — compact */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {previousProjects.filter(p => !p.preview).map((p, i) => (
            <motion.a
              key={i}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.72 + i * 0.04 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-xl border overflow-hidden p-4 bg-black cursor-pointer group flex items-start gap-3"
              style={{ borderColor: `${p.accent}20` }}
            >
              <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: `linear-gradient(90deg,transparent,${p.accent}50,transparent)` }} />
              <div className="w-9 h-9 rounded-xl shrink-0 flex items-center justify-center" style={{ background: `${p.accent}15`, border: `1px solid ${p.accent}30` }}>
                <BookOpen className="w-4 h-4" style={{ color: p.accent }} />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[7px] font-accent font-black uppercase tracking-[0.3em] block mb-0.5" style={{ color: p.accent }}>{p.tag}</span>
                <h4 className="text-xs font-display font-bold tracking-tight mb-1">{p.client} <span className="text-white/30 font-normal">· {p.industry}</span></h4>
                <p className="text-white/35 text-[9px] leading-relaxed line-clamp-2">{p.desc}</p>
              </div>
              <svg className="w-3 h-3 shrink-0 mt-1 opacity-30 group-hover:opacity-80 transition-opacity" style={{ color: p.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* ── TEMPLATE GALLERY ── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.48 }} className="mb-4 mt-10">
        <p className="text-[9px] font-accent font-bold uppercase tracking-[0.35em] text-primary mb-2 flex items-center gap-2">
          <Code2 className="w-3 h-3" /> TEMPLATE GALLERY — WEBSITES &amp; DASHBOARDS
        </p>
        <p className="text-white/30 text-xs mb-6">Click any template to open it live in a new tab.</p>

        {/* Featured 3 with screenshot previews */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          {templates.filter(t => t.preview).map((t, i) => (
            <motion.a
              key={i}
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.06 }}
              whileHover={{ scale: 1.02, y: -3 }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-2xl border overflow-hidden cursor-pointer group"
              style={{ borderColor: `${t.accent}30` }}
            >
              {/* Screenshot preview */}
              <div className="relative overflow-hidden h-48">
                <img src={t.preview!} alt={t.name}
                  className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                {/* Open icon */}
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ borderColor: `${t.accent}50`, border: '1px solid' }}>
                  <svg className="w-3.5 h-3.5" style={{ color: t.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>
              {/* Info */}
              <div className="p-4 bg-black relative">
                <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: `linear-gradient(90deg,transparent,${t.accent}60,transparent)` }} />
                <span className="text-[8px] font-accent font-black uppercase tracking-[0.3em] mb-1 block" style={{ color: t.accent }}>{t.category}</span>
                <h4 className="text-sm font-display font-black tracking-tight mb-1">{t.name}</h4>
                <p className="text-white/40 text-[10px] leading-relaxed">{t.desc}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Remaining templates — compact list cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {templates.filter(t => !t.preview).map((t, i) => (
            <motion.a
              key={i}
              href={t.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.62 + i * 0.04 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-xl border overflow-hidden p-4 bg-black cursor-pointer group flex items-start gap-3"
              style={{ borderColor: `${t.accent}20` }}
            >
              <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: `linear-gradient(90deg,transparent,${t.accent}50,transparent)` }} />
              <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center mt-0.5"
                style={{ background: `${t.accent}15`, border: `1px solid ${t.accent}30` }}>
                <svg className="w-3.5 h-3.5" style={{ color: t.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M3 9h18M9 21V9" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[7px] font-accent font-black uppercase tracking-[0.3em] block mb-0.5" style={{ color: t.accent }}>{t.category}</span>
                <h4 className="text-xs font-display font-bold tracking-tight mb-1 truncate">{t.name}</h4>
                <p className="text-white/35 text-[9px] leading-relaxed line-clamp-2">{t.desc}</p>
              </div>
              <svg className="w-3 h-3 shrink-0 mt-1 opacity-30 group-hover:opacity-80 transition-opacity" style={{ color: t.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* ── LIVE PROJECTS ── */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="mb-4 mt-10">
        <p className="text-[9px] font-accent font-bold uppercase tracking-[0.35em] text-primary mb-6 flex items-center gap-2">
          <Zap className="w-3 h-3" /> LIVE PROJECTS — CLICK TO VISIT
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {liveProjects.map((project, i) => (
            <motion.a
              key={i}
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.05 }}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="relative rounded-2xl border overflow-hidden p-5 flex flex-col justify-between bg-black cursor-pointer group"
              style={{ borderColor: `${project.accent}25` }}
            >
              <div className="absolute top-0 left-0 w-full h-[1px]" style={{ background: `linear-gradient(90deg,transparent,${project.accent},transparent)` }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" style={{ background: `radial-gradient(circle at top left,${project.accent}10 0%,transparent 60%)` }} />
              <div className="relative z-10">
                <span className="text-[8px] font-accent font-black uppercase tracking-[0.3em] mb-3 block" style={{ color: project.accent }}>{project.tag}</span>
                <h4 className="text-base font-display font-black tracking-tight mb-1 leading-tight">{project.name}</h4>
                <p className="text-white/40 text-xs leading-relaxed">{project.desc}</p>
              </div>
              <div className="relative z-10 flex items-center justify-between mt-4">
                <span className="text-[8px] text-white/20 font-accent uppercase tracking-widest truncate mr-2">{project.url.replace(/https?:\/\/(www\.)?/, '').replace(/\/$/, '')}</span>
                <svg className="w-3.5 h-3.5 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity" style={{ color: project.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
            </motion.a>
          ))}
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
                      {["VIDEO · 3 MIN", "AUDIO OVERVIEW", "SLIDE DECK · 6", "INFOGRAPHIC", "14 LIVE PROJECTS", "10 TEMPLATES", "9 CLIENT AUDITS", "6 PDF DECKS"].map((item) => (
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
