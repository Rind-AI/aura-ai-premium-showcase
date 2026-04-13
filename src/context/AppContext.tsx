import React, { createContext, useContext, useState, useEffect } from "react";
import { nicheContent, NicheContent } from "@/constants/nicheContent";

type Theme = "cyan" | "emerald" | "magenta" | "amber" | "pastel" | "crimson" | "violet" | "gold" | "lime" | "sky" | "rose" | "orange";
type Niche = "tech" | "creative" | "community";
type Font = "sans" | "serif" | "mono" | "display" | "accent" | "artistic" | "luxury" | "futuristic" | "wide" | "playful";

interface AppContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  bgColor: string;
  setBgColor: (color: string) => void;
  fontFamily: Font;
  setFontFamily: (font: Font) => void;
  niche: Niche;
  setNiche: (niche: Niche) => void;
  isAdmin: boolean;
  setIsAdmin: (isAdmin: boolean) => void;
  pin: string;
  setPin: (pin: string) => void;
  content: NicheContent;
  updateContent: (updates: Partial<NicheContent>) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const themes = {
  cyan: { p: "#00d4ff", rgb: "0, 212, 255" },
  emerald: { p: "#00ff88", rgb: "0, 255, 136" },
  magenta: { p: "#ff00ff", rgb: "255, 0, 255" },
  amber: { p: "#f59e0b", rgb: "245, 158, 11" },
  pastel: { p: "#ffb7b2", rgb: "255, 183, 178" },
  crimson: { p: "#dc2626", rgb: "220, 38, 38" },
  violet: { p: "#8b5cf6", rgb: "139, 92, 246" },
  gold: { p: "#fbbf24", rgb: "251, 191, 36" },
  lime: { p: "#a3e635", rgb: "163, 230, 53" },
  sky: { p: "#38bdf8", rgb: "56, 189, 248" },
  rose: { p: "#fb7185", rgb: "251, 113, 133" },
  orange: { p: "#fb923c", rgb: "251, 146, 60" },
};

const fonts = {
  sans: "'Inter', sans-serif",
  serif: "'Playfair Display', serif",
  mono: "'JetBrains Mono', monospace",
  display: "'Orbitron', sans-serif",
  accent: "'Rajdhani', sans-serif",
  artistic: "'Syne', sans-serif",
  luxury: "'Cormorant Garamond', serif",
  futuristic: "'Syncopate', sans-serif",
  wide: "'Unbounded', sans-serif",
  playful: "'Bricolage Grotesque', sans-serif",
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("cyan");
  const [bgColor, setBgColor] = useState("#010205");
  const [fontFamily, setFontFamily] = useState<Font>("sans");
  const [niche, setNiche] = useState<Niche>("tech");
  const [isAdmin, setIsAdmin] = useState(false);
  const [pin, setPin] = useState("1106");
  const [allContent, setAllContent] = useState(nicheContent);

  useEffect(() => {
    const t = themes[theme];
    document.documentElement.style.setProperty("--primary-color", t.p);
    document.documentElement.style.setProperty("--primary-rgb", t.rgb);
  }, [theme]);

  useEffect(() => {
    document.documentElement.style.setProperty("--background-color", bgColor);
  }, [bgColor]);

  useEffect(() => {
    document.documentElement.style.setProperty("--font-main", fonts[fontFamily]);
  }, [fontFamily]);

  const content = allContent[niche];

  const updateContent = (updates: Partial<NicheContent>) => {
    setAllContent(prev => ({
      ...prev,
      [niche]: { ...prev[niche], ...updates }
    }));
  };

  return (
    <AppContext.Provider value={{ 
      theme, setTheme, 
      bgColor, setBgColor,
      fontFamily, setFontFamily,
      niche, setNiche, 
      isAdmin, setIsAdmin, 
      pin, setPin,
      content, updateContent
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};
