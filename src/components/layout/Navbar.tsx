import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useApp } from "@/context/AppContext";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { content, isAdmin, updateContent } = useApp();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Services", path: "/services" },
    { name: "Showcase", path: "/showcase" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
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
        isScrolled ? "bg-background/80 backdrop-blur-xl border-b border-white/5 py-4" : "bg-transparent"
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
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={cn(
                "text-sm font-bold uppercase tracking-[0.2em] transition-colors hover:text-primary",
                location.pathname === link.path ? "text-primary" : "text-white/60"
              )}
            >
              {link.name}
            </Link>
          ))}
          <Button className="rounded-full px-6 bg-white text-black hover:bg-white/90 font-bold font-accent tracking-widest">
            DEPLOY
            <ChevronRight className="ml-1 w-4 h-4" />
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background border-b border-white/5 p-6 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={cn(
                    "text-lg font-bold uppercase tracking-widest",
                    location.pathname === link.path ? "text-primary" : "text-white/60"
                  )}
                >
                  {link.name}
                </Link>
              ))}
              <Button className="w-full rounded-full bg-white text-black font-bold font-accent tracking-widest">
                DEPLOY NOW
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
