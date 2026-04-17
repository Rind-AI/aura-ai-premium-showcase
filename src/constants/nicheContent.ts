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
    heroBadge: "DATA SCIENTIST | TRUE AI INTELLIGENCE",
    heroTitle: "I EXTRACT <span class='text-gradient'>KEY INSIGHTS</span>",
    heroDesc: "It is surprisingly easy for any brand or industry to extract powerful insights from available real data. I deploy pure, true AI to find your winning formula and bring instant optimization to your workflow.",
    heroCta: "HIRE KHALID",
    mediaSrc: "/videos/cli-engineer.mp4",
    tickerItems: ["Health", "Education", "Sport", "Food", "Writer", "Artist", "Teacher", "School", "Council", "Road Safety", "Outdoor Activities"],
    features: [
      {
        title: "Health, Food & Safety",
        desc: "Sorting complex data is effortless. We identify trends in healthcare, optimize food distribution, and extract real intelligence for road safety ad campaigns.",
        icon: "🏥"
      },
      {
        title: "Education & Creatives",
        desc: "Empowering schools, teachers, writers, and artists by making it simple to analyze learning metrics and track the vast benefits of outdoor activities.",
        icon: "🎓"
      },
      {
        title: "Sports & Councils",
        desc: "Extracting key points from available databases to find the winning formula for sports teams, and seamlessly optimizing local council initiatives.",
        icon: "🏅"
      }
    ],
    contactTitle: "INITIATE <span class='text-gradient'>COMMS</span>",
    contactDesc: "Ready to extract real intelligence from your data or deploy a premium Digital Showcase? It is easier than you think. Secure your slot today.",
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
