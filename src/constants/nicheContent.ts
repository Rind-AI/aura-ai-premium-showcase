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
    heroBadge: "INDUSTRIAL INTELLIGENCE | AI + DATA CONSULTING",
    heroTitle: "I BUILD <span class='text-gradient'>AI & DATA INTELLIGENCE SYSTEMS</span>",
    heroDesc: "I help Australian businesses turn scattered tools, content, customer data, and daily operations into practical AI-powered systems. From client acquisition and local SEO to automation, reporting, and digital showcases, I build simple workflows that help owners make better decisions and win more work.",
    heroCta: "BOOK AI CONSULT",
    mediaSrc: "/videos/cli-engineer.mp4",
    tickerItems: ["AI Automation", "Data Intelligence", "Industrial Intelligence", "Content Systems", "Local SEO", "CRM Workflows", "Google Sheets", "Notion Systems", "Client Portals", "Digital Showcases", "Research Packs", "Business Growth"],
    features: [
      {
        title: "AI & Data Intelligence",
        desc: "Turn messy business data, documents, customer notes, and spreadsheets into clear insights, simple dashboards, and owner-friendly decisions.",
        icon: "🏥"
      },
      {
        title: "Industrial Intelligence Systems",
        desc: "Build practical AI workflows for service businesses, councils, health, food, education, trades, sport, and local operators who need clearer systems.",
        icon: "🎓"
      },
      {
        title: "Growth & Client Acquisition",
        desc: "Connect content, SEO, Meta Ads, email, CRM, Google Sheets, and client-ready assets into one weekly pipeline that helps you find and convert better opportunities.",
        icon: "🏅"
      }
    ],
    contactTitle: "START YOUR <span class='text-gradient'>AI INTELLIGENCE SYSTEM</span>",
    contactDesc: "Ready to turn scattered tools, files, content, and customer data into a simple AI-powered operating system? Book a practical consultation and I will show you the fastest path from confusion to clear action.",
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
  }
};
