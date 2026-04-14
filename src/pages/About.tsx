import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";

export default function About() {
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
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              Aura AI was founded on the principle that technology should be as beautiful as it is powerful. We don't just build websites; we create digital ecosystems that breathe life into brands.
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
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative aspect-square glass rounded-3xl overflow-hidden"
          >
            <img 
              src="https://picsum.photos/seed/office/800/800" 
              alt="Our Office" 
              className="w-full h-full object-cover opacity-60 grayscale hover:grayscale-0 transition-all duration-700"
              referrerPolicy="no-referrer"
            />
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
    </div>
  );
}
