import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { content, isAdmin, updateContent } = useApp();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/", external: false },
    { name: "Services", path: "/services", external: false },
    { name: "Showcase", path: "/showcase", external: false },
    { name: "Showroom", path: "/showroom", external: false },
    { name: "AR-VR REBIRTH", path: "https://www.neuranestai.world", external: true },
    { name: "About", path: "/about", external: false },
    { name: "Contact", path: "/contact", external: false },
  ];

  const handleTextEdit = (e: React.FormEvent<HTMLElement>) => {
    if (!isAdmin) return;
    updateContent({ navText: e.currentTarget.innerHTML });
  };

  const logoInputRef = useRef<HTMLInputElement>(null);

  const handleLogoClick = () => {
    if (isAdmin) logoInputRef.current?.click();
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => updateContent({ logoSrc: event.target?.result as string });
      reader.readAsDataURL(file);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-[100] transition-all duration-500 py-6",
        isScrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-[#00d4ff]/40 py-4 shadow-[0_2px_30px_rgba(0,212,255,0.15)]"
          : "bg-black/60 backdrop-blur-md border-b border-[#00d4ff]/20 shadow-[0_2px_20px_rgba(0,212,255,0.08)]"
      )}
    >
      <div className="container px-6 flex items-center justify-between">
        <div className="flex items-center gap-3 group cursor-pointer" onClick={handleLogoClick}>
          <input type="file" ref={logoInputRef} className="hidden" onChange={handleLogoUpload} accept="image/*" />
          {content.logoSrc ? (
            <img src={content.logoSrc} alt="Logo" className="w-10 h-10 object-contain rounded-xl" />
          ) : (
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(var(--primary-rgb),0.5)] group-hover:scale-110 transition-transform">
              <div className="w-4 h-4 rounded-full bg-white animate-pulse" />
            </div>
          )}
          <span 
            className={cn("text-xl font-display font-black tracking-tighter", isAdmin && "editable-active")}
            contentEditable={isAdmin}
            suppressContentEditableWarning
            onBlur={handleTextEdit}
            dangerouslySetInnerHTML={{ __html: content.navText }}
          />
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.path}
                href={link.path}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold uppercase tracking-[0.2em] transition-colors text-[#00d4ff]/80 hover:text-[#00d4ff] hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]"
              >
                {link.name}
              </a>
            ) : (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "text-sm font-bold uppercase tracking-[0.2em] transition-all",
                  location.pathname === link.path
                    ? "text-[#00d4ff] drop-shadow-[0_0_10px_rgba(0,212,255,1)]"
                    : "text-[#00d4ff]/70 hover:text-[#00d4ff] hover:drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]"
                )}
              >
                {link.name}
              </Link>
            )
          )}
          <Button className="rounded-full px-6 bg-white text-black hover:bg-white/90 font-bold font-accent tracking-widest">
            DEPLOY
            <ChevronRight className="ml-1 w-4 h-4" />
          </Button>
        </div>

      </div>

      {/* Mobile Horizontal Nav — always visible, scrollable */}
      <div className="md:hidden border-t border-[#00d4ff]/30 bg-black/95 backdrop-blur-xl shadow-[0_4px_20px_rgba(0,212,255,0.12)]">
        <div className="overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-1 px-3 py-2" style={{ minWidth: "max-content" }}>
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.path}
                  href={link.path}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-[#00d4ff]/70 hover:text-[#00d4ff] hover:drop-shadow-[0_0_6px_rgba(0,212,255,0.8)] whitespace-nowrap transition-all"
                >
                  {link.name}
                </a>
              ) : (
                <Link
                  key={link.path}
                  to={link.path}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-widest whitespace-nowrap transition-colors",
                    location.pathname === link.path
                      ? "bg-[#00d4ff]/10 text-[#00d4ff] border border-[#00d4ff]/40 drop-shadow-[0_0_8px_rgba(0,212,255,0.8)]"
                      : "text-[#00d4ff]/70 hover:text-[#00d4ff] hover:drop-shadow-[0_0_6px_rgba(0,212,255,0.8)]"
                  )}
                >
                  {link.name}
                </Link>
              )
            )}
            <Button className="ml-2 rounded-full px-4 h-7 text-[10px] bg-white text-black font-bold font-accent tracking-widest shrink-0">
              DEPLOY
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
