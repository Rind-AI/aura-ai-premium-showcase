import { motion, AnimatePresence } from "motion/react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Palette, Type, ChevronRight } from "lucide-react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

export default function Hero() {
  const { theme, setTheme, bgColor, setBgColor, fontFamily, setFontFamily, niche, setNiche, isAdmin, content, updateContent } = useApp();
  const mediaInputRef = useRef<HTMLInputElement>(null);
  const [isCustomizerMinimized, setIsCustomizerMinimized] = useState(false);
  const [showDocks, setShowDocks] = useState(true);

  const handleMediaClick = () => {
    if (!isAdmin) return;
    if (confirm("Upload new media?")) {
      mediaInputRef.current?.click();
    } else {
      const url = prompt("Enter URL:", content.mediaSrc);
      if (url) updateContent({ mediaSrc: url });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => updateContent({ mediaSrc: event.target?.result as string });
      reader.readAsDataURL(file);
    }
  };

  const handleTextEdit = (key: keyof typeof content) => (e: React.FormEvent<HTMLElement>) => {
    if (!isAdmin) return;
    updateContent({ [key]: e.currentTarget.innerHTML });
  };

  return (
    <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
      <input type="file" ref={mediaInputRef} className="hidden" onChange={handleFileChange} accept="image/*,video/*" />
      
      <div className={cn(
        "container relative z-10 px-6 transition-all duration-500",
        niche === "creative" ? "flex flex-col items-center text-center" : 
        niche === "community" ? "grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-16 items-center" :
        "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
      )}>
        
        <div className={cn(
          "hero-content transition-all duration-500",
          niche === "community" && "order-2 text-right flex flex-col items-end"
        )}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass mb-8 border-primary/20",
              isAdmin && "editable-active"
            )}
            contentEditable={isAdmin}
            suppressContentEditableWarning
            onBlur={handleTextEdit("heroBadge")}
            dangerouslySetInnerHTML={{ __html: content.heroBadge }}
          />

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className={cn(
              "text-5xl md:text-7xl lg:text-8xl font-display font-black leading-[1.1] tracking-tighter mb-8",
              isAdmin && "editable-active"
            )}
            contentEditable={isAdmin}
            suppressContentEditableWarning
            onBlur={handleTextEdit("heroTitle")}
            dangerouslySetInnerHTML={{ __html: content.heroTitle }}
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className={cn(
              "max-w-2xl text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed",
              isAdmin && "editable-active",
              niche === "community" && "text-right"
            )}
            contentEditable={isAdmin}
            suppressContentEditableWarning
            onBlur={handleTextEdit("heroDesc")}
            dangerouslySetInnerHTML={{ __html: content.heroDesc }}
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap items-center gap-4"
          >
            <div className="flex flex-wrap items-center gap-4">
              <Button size="lg" className="rounded-xl px-8 py-6 text-lg bg-primary text-black hover:bg-primary/90 group font-bold font-accent tracking-widest">
                <span 
                  contentEditable={isAdmin} 
                  suppressContentEditableWarning 
                  onBlur={handleTextEdit("heroCta")}
                  dangerouslySetInnerHTML={{ __html: content.heroCta }}
                />
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                onClick={() => setShowDocks(!showDocks)}
                className={cn(
                  "rounded-xl px-8 py-6 text-lg border-white/10 hover:bg-white/5 font-bold font-accent tracking-widest transition-all",
                  showDocks && "bg-white/10 border-primary text-primary"
                )}
              >
                {showDocks ? "HIDE TOOLS" : "CUSTOMIZE MASTERPIECE"}
              </Button>
            </div>

            {/* In-Hero Customization Bars - Visible to Clients */}
            <AnimatePresence>
              {showDocks && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex flex-col gap-4 mt-8 w-full max-w-4xl overflow-hidden"
                >
                  {/* Niche Profiles */}
                  <div className="flex flex-wrap gap-3 p-2 glass rounded-2xl border-white/5">
                    {(["tech", "creative", "community"] as const).map((n) => (
                      <button
                        key={n}
                        onClick={() => setNiche(n)}
                        className={cn(
                          "flex-1 min-w-[100px] h-12 flex items-center justify-center gap-2 rounded-xl transition-all font-accent text-[10px] font-bold uppercase tracking-widest",
                          niche === n ? "bg-primary/20 border border-primary text-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.2)]" : "text-white/40 hover:bg-white/5"
                        )}
                      >
                        <span>{n === "tech" ? "💻" : n === "creative" ? "✨" : "🌍"}</span>
                        {n === "tech" ? "TECH" : n === "creative" ? "BRAND" : "LOCAL"}
                      </button>
                    ))}
                  </div>

                  {/* Customization Dock */}
                  <div className={cn(
                    "relative flex flex-col md:flex-row items-center gap-6 p-4 glass rounded-2xl border-white/5 transition-all duration-500",
                    isCustomizerMinimized && "h-12 overflow-hidden opacity-60"
                  )}>
                    <button 
                      onClick={() => setIsCustomizerMinimized(!isCustomizerMinimized)}
                      className="absolute top-2 right-2 w-8 h-8 rounded-full glass border-primary/30 flex items-center justify-center hover:border-primary transition-all z-10"
                    >
                      <ChevronRight className={cn("w-3 h-3 transition-transform", isCustomizerMinimized ? "rotate-90" : "-rotate-90")} />
                    </button>

                    <div className="flex items-center gap-4">
                      <Palette className="w-4 h-4 text-white/40" />
                      <div className="flex flex-wrap gap-2">
                        {(["cyan", "emerald", "magenta", "amber", "pastel", "crimson", "violet", "gold", "lime", "sky", "rose", "orange"] as const).map((t) => (
                          <button
                            key={t}
                            onClick={() => setTheme(t)}
                            className={cn(
                              "w-5 h-5 rounded-full border border-white/20 transition-all hover:scale-125",
                              theme === t && "scale-125 border-white shadow-[0_0_10px_currentColor]"
                            )}
                            style={{ 
                              backgroundColor: t === "cyan" ? "#00d4ff" : t === "emerald" ? "#00ff88" : t === "magenta" ? "#ff00ff" : t === "amber" ? "#f59e0b" : t === "crimson" ? "#dc2626" : t === "violet" ? "#8b5cf6" : t === "gold" ? "#fbbf24" : t === "lime" ? "#a3e635" : t === "sky" ? "#38bdf8" : t === "rose" ? "#fb7185" : t === "orange" ? "#fb923c" : "#ffb7b2"
                            }}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <div className="hidden md:block w-[1px] h-8 bg-white/10" />

                    <div className="flex items-center gap-4">
                      <Type className="w-4 h-4 text-white/40" />
                      <div className="flex flex-wrap gap-2">
                        {(["sans", "serif", "mono", "display", "accent", "artistic", "luxury", "futuristic", "wide", "playful"] as const).map((f) => (
                          <button
                            key={f}
                            onClick={() => setFontFamily(f)}
                            className={cn(
                              "w-7 h-7 rounded-lg border border-white/10 flex items-center justify-center text-[8px] font-bold uppercase transition-all hover:bg-white/10",
                              fontFamily === f && "bg-primary text-black border-primary"
                            )}
                          >
                            {f.substring(0, 2)}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="hidden md:block w-[1px] h-8 bg-white/10" />

                    <div className="flex items-center gap-4">
                      <div className="w-4 h-4 rounded-full border border-white/40" />
                      <div className="flex flex-wrap gap-2">
                        {(["#010205", "#0a0a0a", "#1a1a1a", "#050505", "#101010", "#0f172a", "#1e1b4b", "#18181b", "#020617", "#0c0a09"] as const).map((c) => (
                          <button
                            key={c}
                            onClick={() => setBgColor(c)}
                            className={cn(
                              "w-5 h-5 rounded-full border border-white/10 transition-all hover:scale-125",
                              bgColor === c && "scale-125 border-white"
                            )}
                            style={{ backgroundColor: c }}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className={cn(
            "media-wrapper relative flex justify-center items-center perspective-1000",
            niche === "community" && "order-1"
          )}
        >
          <div 
            className={cn(
              "media-container relative w-full max-w-[500px] aspect-[4/5] overflow-hidden border-2 border-white/10 shadow-2xl transition-all duration-500 group",
              niche === "creative" ? "max-w-[1000px] aspect-[21/9] rounded-[3rem]" : 
              niche === "community" ? "aspect-square rounded-full border-primary" : 
              "rounded-2xl"
            )}
            onClick={handleMediaClick}
          >
            {content.mediaSrc.includes("video") || content.mediaSrc.startsWith("data:video") ? (
              <video 
                src={content.mediaSrc} 
                autoPlay 
                loop 
                controls 
                playsInline 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
              />
            ) : (
              <img 
                src={content.mediaSrc} 
                alt="Hero" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700" 
                referrerPolicy="no-referrer" 
              />
            )}
            {isAdmin && (
              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <span className="bg-black/80 text-white px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest">Click to Change Media</span>
              </div>
            )}
          </div>
          
          {/* Holographic Glow */}
          <div className={cn(
            "absolute inset-0 -z-10 bg-conic-gradient from-transparent via-primary to-transparent opacity-30 blur-[40px] animate-spin-slow",
            niche === "creative" ? "max-w-[1050px] aspect-[21/9] rounded-[3rem]" : 
            niche === "community" ? "aspect-square rounded-full" : 
            "max-w-[530px] aspect-[4/5] rounded-2xl"
          )} />
        </motion.div>
      </div>
    </section>
  );
}
