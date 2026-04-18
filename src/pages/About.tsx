import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

const galleryImages = [
  "/gallery/IMG_E5395.JPG",
  "/gallery/wa1.jpeg",
  "/gallery/wa2.jpeg",
  "/gallery/wa3.jpeg",
  "/gallery/IMG_5102.JPG",
  "/gallery/IMG_5419.JPG",
  "/gallery/IMG_E1096.JPG",
  "/gallery/IMG_E5228.JPG",
  "/gallery/IMG_E5337.JPG",
];

export default function About() {
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openGallery = (index = 0) => {
    setActiveIndex(index);
    setGalleryOpen(true);
  };

  const closeGallery = () => setGalleryOpen(false);

  const prev = () => setActiveIndex((i) => (i - 1 + galleryImages.length) % galleryImages.length);
  const next = () => setActiveIndex((i) => (i + 1) % galleryImages.length);

  return (
    <div className="pt-32 pb-24">
      <div className="container px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <Badge className="mb-6">Our Story</Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
              WE BUILD <br />
              <span className="text-white/40 italic font-display">THE UNIMAGINABLE</span>
            </h1>
            <p className="text-white/50 text-lg leading-relaxed mb-6">
              NeuraNest AI was founded on the principle that technology should be as beautiful as it is powerful. We don't just build websites; we create digital ecosystems that breathe life into brands.
            </p>
            <p className="text-white/40 text-base leading-relaxed mb-8">
              Nature is the core of everything I do. I spent years reclaiming my time — stepping away from the noise, returning to what's real. The forests, the sky, the silence of open space — that's where clarity lives. Now I build from that place. NeuraNest AI exists so others can do the same: use technology as a tool, not a trap, and rise free.
            </p>
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h4 className="text-3xl font-bold mb-1">100+</h4>
                <p className="text-xs uppercase tracking-widest text-white/40">Projects Delivered</p>
              </div>
              <div>
                <h4 className="text-3xl font-bold mb-1">15+</h4>
                <p className="text-xs uppercase tracking-widest text-white/40">AI Patents</p>
              </div>
            </div>
          </motion.div>

          {/* Main cover photo — click to open gallery */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative aspect-square glass rounded-3xl overflow-hidden cursor-pointer group"
            onClick={() => openGallery(0)}
          >
            <img
              src="/gallery/IMG_4956.PNG"
              alt="NeuraNest AI — Universe"
              className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 flex items-end justify-center pb-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-white/80 text-sm uppercase tracking-widest bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
                View Gallery
              </span>
            </div>
          </motion.div>
        </div>

        <section className="py-24 border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">OUR PHILOSOPHY</h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              Three core pillars that drive every decision we make.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { title: "Human-Centric", desc: "AI should enhance the human experience, not replace it." },
              { title: "Radical Transparency", desc: "We believe in clear, honest communication at every step." },
              { title: "Infinite Iteration", desc: "The pursuit of perfection is a journey, not a destination." }
            ].map((p, i) => (
              <div key={i} className="text-center">
                <div className="text-5xl font-display italic text-white/10 mb-6">0{i+1}</div>
                <h3 className="text-xl font-bold mb-4">{p.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-24 border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">PREVIOUS WORK</h2>
            <p className="text-white/50 max-w-2xl mx-auto">
              A selection of work delivered before NeuraNest — real projects, real results.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-8 max-w-2xl mx-auto">
            <motion.a
              href="/Khalid-Rind.pdf"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass rounded-2xl p-8 flex flex-col gap-4 hover:border-white/20 border border-white/5 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between">
                <Badge>Portfolio</Badge>
                <span className="text-white/30 text-xs uppercase tracking-widest group-hover:text-white/60 transition-colors">View Live →</span>
              </div>
              <h3 className="text-2xl font-bold">Khalid Rind — Digital Portfolio</h3>
              <p className="text-white/40 text-sm leading-relaxed">
                Professional digital showcase covering AI consulting, data services, and digital strategy work. Built to demonstrate capability across technology, branding, and community engagement.
              </p>
              <p className="text-white/20 text-xs font-mono">khalidrind.io/Khalid-Rind.pdf</p>
            </motion.a>
          </div>
        </section>
      </div>

      {/* Gallery Lightbox */}
      <AnimatePresence>
        {galleryOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeGallery}
          >
            {/* Close */}
            <button
              className="absolute top-6 right-6 text-white/70 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all z-10"
              onClick={closeGallery}
            >
              <X size={24} />
            </button>

            {/* Prev */}
            <button
              className="absolute left-4 md:left-8 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-10"
              onClick={(e) => { e.stopPropagation(); prev(); }}
            >
              <ChevronLeft size={28} />
            </button>

            {/* Main image */}
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.25 }}
              className="max-w-5xl max-h-[85vh] mx-16 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[activeIndex]}
                alt={`Gallery ${activeIndex + 1}`}
                className="max-w-full max-h-[85vh] rounded-2xl object-contain shadow-2xl"
              />
            </motion.div>

            {/* Next */}
            <button
              className="absolute right-4 md:right-8 text-white/70 hover:text-white p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all z-10"
              onClick={(e) => { e.stopPropagation(); next(); }}
            >
              <ChevronRight size={28} />
            </button>

            {/* Thumbnails */}
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 px-4"
              onClick={(e) => e.stopPropagation()}
            >
              {galleryImages.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${
                    i === activeIndex ? "border-white scale-110" : "border-white/20 opacity-50 hover:opacity-80"
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Counter */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 text-white/50 text-sm tracking-widest">
              {activeIndex + 1} / {galleryImages.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
