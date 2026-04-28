export interface NicheContent {
  navText: string;
  logoSrc: string;
  heroBadge: string;
  heroTitle: string;
  heroDesc: string;
  heroCta: string;
  mediaSrc: string;
  tickerItems: string[];
  features: {
    title: string;
    desc: string;
    icon: string;
  }[];
  contactTitle: string;
  contactDesc: string;
  contactEmail?: string;
  contactPhone?: string;
  contactLocation?: string;
}

export const nicheContent: Record<string, NicheContent> = {
  tech: {
    navText: "KHALID RIND",
    logoSrc: "",
    heroBadge: "AI + DATA INTELLIGENCE | BRAND OPTIMISATION | MELBOURNE, AUSTRALIA",
    heroTitle: "DATA EXTRACTION. AI SYSTEMS. <span class='text-gradient'>YOUR BRAND OPTIMISED</span>",
    heroDesc: "I provide AI and Data Intelligence consultancy for Australian businesses. We extract your raw business data, identify the patterns and gaps, then build AI-powered systems that optimise your entire brand — from operations and client acquisition to digital showcases and automated pipelines. Not just marketing. Everything.",
    heroCta: "START WITH DATA",
    mediaSrc: "/videos/cli-engineer.mp4",
    tickerItems: ["Data Extraction", "AI Systems", "Brand Optimisation", "Process Automation", "Business Intelligence", "Digital Showcase", "Client Pipelines", "Operations AI", "NeuraNest AI", "Melbourne", "Australia", "AI Consulting"],
    features: [
      {
        title: "Data Extraction & Intelligence",
        desc: "We extract raw business data from your tools, documents, customer records, and operations — then turn it into actionable intelligence that drives real decisions.",
        icon: "🔬"
      },
      {
        title: "AI Brand Optimisation",
        desc: "Deploy AI systems that optimise your entire brand process — from the first client touchpoint through operations, delivery, reporting, and retention.",
        icon: "⚡"
      },
      {
        title: "Digital Showcase Engine",
        desc: "Build your brand's digital presence as a high-performance showcase — content, SEO, ads, CRM, and AI automation wired into one weekly growth pipeline.",
        icon: "🌐"
      }
    ],
    contactTitle: "START WITH YOUR <span class='text-gradient'>DATA</span>",
    contactDesc: "Every optimisation starts with understanding your data. Let's extract what your business already knows, identify the gaps, and build the AI system that closes them.",
    contactEmail: "Info@khalidrind.io",
    contactPhone: "+61-493348617",
    contactLocation: "Melbourne, Australia"
  },
  creative: {
    navText: "AURA CREATIVE",
    logoSrc: "",
    heroBadge: "PREMIUM BRANDING | VISUAL STORYTELLING",
    heroTitle: "ELEVATE YOUR <span class='text-gradient'>BRAND</span>",
    heroDesc: "We transform vision into cinematic reality. Our creative engine combines high-end aesthetics with strategic intelligence to position your brand at the pinnacle of your industry.",
    heroCta: "START PROJECT",
    mediaSrc: "/videos/NNAI-BRAND-1.mp4",
    tickerItems: ["Fashion", "Luxury", "Design", "Architecture", "Cinema", "Art", "Music", "Lifestyle", "Elegance", "Innovation"],
    features: [
      {
        title: "Visual Identity",
        desc: "Crafting iconic brands that command attention. We define the visual language of the future through meticulous design and artistic direction.",
        icon: "✨"
      },
      {
        title: "Cinematic Content",
        desc: "High-fidelity storytelling that resonates. Our production team creates immersive media that captures the essence of your brand's soul.",
        icon: "🎬"
      },
      {
        title: "Digital Experience",
        desc: "Websites that feel like art galleries. We build interactive showcases that provide a premium journey for your most discerning clients.",
        icon: "🏛️"
      }
    ],
    contactTitle: "SECURE THE <span class='text-gradient'>VISION</span>",
    contactDesc: "Your brand deserves to be seen in its best light. Let's collaborate to create a digital masterpiece that defines your legacy.",
    contactEmail: "Creative@aurashowcase.io",
    contactPhone: "+1-888-AURA-ART",
    contactLocation: "Los Angeles, CA"
  },
  community: {
    navText: "LOCAL CONNECT",
    logoSrc: "",
    heroBadge: "COMMUNITY FIRST | LOCAL GROWTH",
    heroTitle: "CONNECT THE <span class='text-gradient'>COMMUNITY</span>",
    heroDesc: "Bringing people together through shared experiences and local initiatives. We empower small businesses and community leaders to thrive in a connected digital world.",
    heroCta: "JOIN US",
    mediaSrc: "/videos/local-community.mp4",
    tickerItems: ["Local", "Events", "Markets", "Schools", "Charity", "Parks", "Groups", "Support", "Growth", "Unity"],
    features: [
      {
        title: "Local Initiatives",
        desc: "Supporting the heartbeat of our neighborhoods. We provide the tools for local councils and groups to organize and inspire action.",
        icon: "🌍"
      },
      {
        title: "Small Business",
        desc: "Empowering the shops and services that make our towns unique. Digital growth strategies tailored for the local scale.",
        icon: "🏪"
      },
      {
        title: "Event Hub",
        desc: "The central point for everything happening nearby. From farmers markets to school plays, we keep the community informed.",
        icon: "📅"
      }
    ],
    contactTitle: "REACH <span class='text-gradient'>OUT</span>",
    contactDesc: "Have a community project or a local business that needs a boost? We're here to help you make a real impact where it matters most.",
    contactEmail: "Hello@localconnect.org",
    contactPhone: "+44-20-7946-0000",
    contactLocation: "London, UK"
  },
  "claude-design": {
    navText: "KHALID RIND",
    logoSrc: "",
    heroBadge: "AI ARCHITECT | NEURANEST | MELBOURNE, AUSTRALIA",
    heroTitle: "<span class='text-gradient'>AI SYSTEMS</span> THAT RESHAPE BUSINESS",
    heroDesc: "I build enterprise AI solutions that Australian businesses actually use. NeuraNest deployments, automation pipelines, and digital transformation — delivered in weeks, not months.",
    heroCta: "START YOUR AI JOURNEY",
    mediaSrc: "/videos/SKY-FALL.mp4",
    tickerItems: ["NeuraNest AI", "Automation", "Firebase", "Enterprise AI", "Digital Strategy", "Melbourne", "Australia", "AI Consulting", "Machine Learning", "Innovation"],
    features: [
      {
        title: "AI Agency Systems",
        desc: "Full NeuraNest AI deployments built and live. From APM to Vocus — enterprise AI that integrates with your existing workflow seamlessly.",
        icon: "🤖"
      },
      {
        title: "Automation Pipelines",
        desc: "WhatsApp bots, Gemini integrations, custom AI workflows running 24/7. Your business generating value while you sleep.",
        icon: "⚡"
      },
      {
        title: "1,300+ Hours of Mastery",
        desc: "Non-coder to multi-AI orchestrator in 5 months. Delivered as turnkey AI solutions for growth-focused Australian businesses.",
        icon: "🌐"
      }
    ],
    contactTitle: "BUILD YOUR <span class='text-gradient'>AI FUTURE</span>",
    contactDesc: "Every day without AI automation is revenue left on the table. Let's build a system designed specifically for your business.",
    contactEmail: "neuranest@neuranestai.world",
    contactPhone: "+61-493348617",
    contactLocation: "Melbourne, Australia"
  }
};
