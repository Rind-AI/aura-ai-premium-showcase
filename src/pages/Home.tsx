import Hero from "@/components/sections/Hero";
import { motion } from "motion/react";
import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

export default function Home() {
  const { content, isAdmin, updateContent } = useApp();
  const [isNnaiActive, setIsNnaiActive] = useState(false);
  const nnaiTouchTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleFeatureEdit = (index: number, key: "title" | "desc") => (e: React.FormEvent<HTMLElement>) => {
    if (!isAdmin) return;
    const newFeatures = [...content.features];
    newFeatures[index] = { ...newFeatures[index], [key]: e.currentTarget.innerHTML };
    updateContent({ features: newFeatures });
  };

  return (
    <div className="relative">
      <Hero />

      {/* NNAI Featured Video */}
      <section className="container px-6 relative z-10 mb-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-6"
        >
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">NEURANEST AI</span>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter mt-2">
            THE EMPIRE <span className="text-primary">IN MOTION</span>
          </h2>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-3xl border border-white/5 shadow-2xl aspect-video cursor-pointer"
          onMouseEnter={() => setIsNnaiActive(true)}
          onMouseLeave={() => setIsNnaiActive(false)}
          onTouchStart={() => {
            if (nnaiTouchTimer.current) clearTimeout(nnaiTouchTimer.current);
            setIsNnaiActive(true);
          }}
          onTouchEnd={() => {
            nnaiTouchTimer.current = setTimeout(() => setIsNnaiActive(false), 2000);
          }}
        >
          <video
            src="/videos/NNAI-MAIN-VIDEO.mp4"
            autoPlay
            loop
            muted
            playsInline
            className={cn(
              "w-full h-full object-cover transition-all duration-700",
              isNnaiActive ? "grayscale-0" : "grayscale"
            )}
          />
          <div className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none transition-opacity duration-700",
            isNnaiActive ? "opacity-0" : "opacity-100"
          )} />
          <div className={cn(
            "absolute bottom-6 left-6 pointer-events-none transition-opacity duration-500",
            isNnaiActive ? "opacity-0" : "opacity-100"
          )}>
            <p className="text-white/40 text-xs uppercase tracking-widest font-bold">Hover or touch to reveal colors</p>
          </div>
        </motion.div>
      </section>

      {/* Infinite Ticker */}
      <div className="relative z-10 w-full overflow-hidden bg-primary/5 border-y border-primary/20 py-6 mb-20">
        <div className="flex whitespace-nowrap animate-ticker">
          {[...content.tickerItems, ...content.tickerItems].map((item, i) => (
            <div key={i} className="flex items-center px-8">
              <span className="text-2xl font-display font-bold text-primary uppercase tracking-widest">{item}</span>
              <div className="w-3 h-3 rounded-full bg-white mx-8 shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
            </div>
          ))}
        </div>
      </div>

      {/* Features Grid */}
      <section className="container px-6 py-20 relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-6xl font-display font-black text-center mb-20"
          dangerouslySetInnerHTML={{ __html: content.contactTitle }}
        />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="glass p-10 rounded-3xl group hover:border-primary/50 transition-all duration-500"
            >
              <div className="text-5xl mb-6 group-hover:scale-125 transition-transform duration-500">{feature.icon}</div>
              <h3 
                className={cn("text-2xl font-display font-bold mb-4", isAdmin && "editable-active")}
                contentEditable={isAdmin}
                suppressContentEditableWarning
                onBlur={handleFeatureEdit(i, "title")}
                dangerouslySetInnerHTML={{ __html: feature.title }}
              />
              <p 
                className={cn("text-muted-foreground leading-relaxed", isAdmin && "editable-active")}
                contentEditable={isAdmin}
                suppressContentEditableWarning
                onBlur={handleFeatureEdit(i, "desc")}
                dangerouslySetInnerHTML={{ __html: feature.desc }}
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="container px-6 py-40 relative z-10">
        <div className="glass p-12 md:p-24 rounded-[3rem] border-primary/30 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
          
          <div className="relative z-10">
            <h2 
              className="text-5xl md:text-7xl font-display font-black mb-8"
              dangerouslySetInnerHTML={{ __html: content.contactTitle }}
            />
            <p 
              className="text-xl text-muted-foreground max-w-2xl mb-16 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: content.contactDesc }}
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="border-l-4 border-primary pl-8">
                <h4 className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-4">Direct Signal</h4>
                <p 
                  className={cn("text-2xl font-bold", isAdmin && "editable-active")}
                  contentEditable={isAdmin}
                  suppressContentEditableWarning
                  onBlur={(e) => updateContent({ contactEmail: e.currentTarget.innerHTML })}
                  dangerouslySetInnerHTML={{ __html: content.contactEmail || "Info@khalidrind.io" }}
                />
              </div>
              <div className="border-l-4 border-primary pl-8">
                <h4 className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-4">Encrypted Voice</h4>
                <p 
                  className={cn("text-2xl font-bold", isAdmin && "editable-active")}
                  contentEditable={isAdmin}
                  suppressContentEditableWarning
                  onBlur={(e) => updateContent({ contactPhone: e.currentTarget.innerHTML })}
                  dangerouslySetInnerHTML={{ __html: content.contactPhone || "+61-493348617" }}
                />
              </div>
              <div className="border-l-4 border-primary pl-8">
                <h4 className="text-xs font-bold tracking-[0.3em] text-primary uppercase mb-4">Base of Ops</h4>
                <p 
                  className={cn("text-2xl font-bold", isAdmin && "editable-active")}
                  contentEditable={isAdmin}
                  suppressContentEditableWarning
                  onBlur={(e) => updateContent({ contactLocation: e.currentTarget.innerHTML })}
                  dangerouslySetInnerHTML={{ __html: content.contactLocation || "Melbourne, Australia" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
