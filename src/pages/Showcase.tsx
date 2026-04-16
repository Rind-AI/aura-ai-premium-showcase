import { motion } from "motion/react";
import { ExternalLink, Github, Eye, Sparkles, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useApp } from "@/context/AppContext";

const projects = [
  {
    title: "NEURAL ARCHITECT",
    category: "AI GENERATIVE DESIGN",
    image: "https://picsum.photos/seed/neural/800/600",
    description: "Autonomous architectural design system using deep learning models.",
    tags: ["PyTorch", "React", "Three.js"]
  },
  {
    title: "QUANTUM ANALYTICS",
    category: "DATA INTELLIGENCE",
    image: "https://picsum.photos/seed/quantum/800/600",
    description: "Real-time quantum computing simulation for financial forecasting.",
    tags: ["Python", "D3.js", "Quantum"]
  },
  {
    title: "BIO-SYNTHESIS",
    category: "HEALTH TECH",
    image: "https://picsum.photos/seed/bio/800/600",
    description: "Synthetic biology platform for accelerated drug discovery.",
    tags: ["Genomics", "AI", "Cloud"]
  },
  {
    title: "CYBER SENTINEL",
    category: "SECURITY",
    image: "https://picsum.photos/seed/cyber/800/600",
    description: "Self-evolving cybersecurity mesh for decentralized networks.",
    tags: ["Rust", "Blockchain", "ML"]
  }
];

const showcaseVideos = [
  {
    title: "AI APP DEMO II",
    category: "PRODUCT DEMO",
    src: "/videos/KR-APP-2.mp4",
    description: "Live walkthrough of AI-powered app — interface, features, and real-world use."
  },
  {
    title: "AI APP DEMO III",
    category: "PRODUCT DEMO",
    src: "/videos/KR-APP-3.mp4",
    description: "Extended demo showcasing advanced AI workflows and automation pipelines."
  },
  {
    title: "FAMILY PLATFORM",
    category: "COMMUNITY TECH",
    src: "/videos/KR-FAMILY.mp4",
    description: "Digital platform connecting families through smart communication tools."
  },
  {
    title: "PORTFOLIO SHOWCASE",
    category: "PERSONAL BRAND",
    src: "/videos/KR-SHOWCASE.mp4",
    description: "Full portfolio showcase — projects, achievements, and the AI empire journey."
  },
  {
    title: "MELBOURNE WATER CAMPAIGN",
    category: "SOCIAL IMPACT",
    src: "/videos/MelbourneWaterCampain.mp4",
    description: "AI-assisted social campaign for Melbourne water conservation awareness."
  },
  {
    title: "ROAD SAFETY CAMPAIGN",
    category: "SOCIAL IMPACT",
    src: "/videos/ROAD-SAFETY-CAMPAIN.mp4",
    description: "Data-driven road safety awareness campaign built with AI tools."
  },
  {
    title: "SKY FALL",
    category: "CREATIVE PRODUCTION",
    src: "/videos/SKY-FALL.mp4",
    description: "Cinematic AI-generated creative production — pushing the edge of digital storytelling."
  }
];

export default function Showcase() {
  const { isAdmin, updateContent, content } = useApp();

  return (
    <div className="pt-32 pb-20 px-6">
      <div className="container">
        <div className="max-w-3xl mb-20">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 text-primary font-accent text-sm font-bold uppercase tracking-[0.3em] mb-4"
          >
            <Sparkles className="w-4 h-4" />
            INNOVATION GALLERY
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-6xl md:text-8xl font-display font-black tracking-tighter leading-none mb-8"
          >
            DIGITAL <span className="text-primary">SHOWCASE</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-white/60 leading-relaxed"
          >
            Explore our portfolio of high-performance AI solutions and digital products. 
            Each project represents a leap forward in technological capability.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl border border-white/5 bg-white/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Button variant="outline" className="rounded-full bg-white/10 backdrop-blur-md border-white/20 hover:bg-white hover:text-black">
                    <Eye className="w-4 h-4 mr-2" /> VIEW CASE
                  </Button>
                  <Button variant="outline" className="rounded-full bg-white/10 backdrop-blur-md border-white/20 hover:bg-white hover:text-black">
                    <Github className="w-4 h-4 mr-2" /> SOURCE
                  </Button>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-accent font-bold uppercase tracking-widest text-primary">
                    {project.category}
                  </span>
                  <div className="flex gap-2">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-[9px] text-white/30 uppercase tracking-widest px-2 py-1 rounded-md border border-white/5">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                <h3 className="text-2xl font-display font-bold tracking-tight mb-2 group-hover:text-primary transition-colors">
                  {project.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {project.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* VIDEO SHOWCASE SECTION */}
        <div className="mt-32">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-primary font-accent text-sm font-bold uppercase tracking-[0.3em] mb-4"
          >
            <Play className="w-4 h-4" />
            VIDEO SHOWCASE
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-display font-black tracking-tighter leading-none mb-4"
          >
            REAL WORK. <span className="text-primary">REAL IMPACT.</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-lg text-white/60 leading-relaxed mb-16 max-w-2xl"
          >
            Seven videos. Seven proof points. From AI apps to social campaigns — this is the empire in motion.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {showcaseVideos.map((video, index) => (
              <motion.div
                key={video.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="group relative"
              >
                <div className="relative aspect-video overflow-hidden rounded-2xl border border-white/5 bg-white/5">
                  <video
                    src={video.src}
                    controls
                    preload="metadata"
                    className="w-full h-full object-cover"
                    style={{ display: "block" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none opacity-60 group-hover:opacity-0 transition-opacity duration-300" />
                </div>
                <div className="mt-4">
                  <span className="text-[10px] font-accent font-bold uppercase tracking-widest text-primary">
                    {video.category}
                  </span>
                  <h3 className="text-xl font-display font-bold tracking-tight mt-1 mb-1 group-hover:text-primary transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {video.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 p-12 rounded-[3rem] glass border-primary/20 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent" />
          <h2 className="text-4xl md:text-6xl font-display font-black tracking-tighter mb-6">
            READY TO BUILD YOUR <span className="text-primary italic">LEGACY?</span>
          </h2>
          <p className="text-white/60 mb-10 max-w-2xl mx-auto">
            Join the elite group of innovators using Infinity OS to power their digital transformation.
          </p>
          <Button className="rounded-full px-12 h-16 bg-primary text-black font-black text-lg hover:scale-105 transition-transform shadow-[0_0_50px_rgba(var(--primary-rgb),0.3)]">
            START YOUR PROJECT <ExternalLink className="ml-2 w-5 h-5" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
}
