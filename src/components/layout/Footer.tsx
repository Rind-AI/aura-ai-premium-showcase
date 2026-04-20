import { useApp } from "@/context/AppContext";

export default function Footer() {
  return (
    <footer className="relative z-10 py-20 border-t border-white/5 bg-background">
      <div className="container px-6 text-center">
        <p className="font-accent text-sm font-bold text-muted-foreground uppercase tracking-[0.3em] mb-12">
          © 2026 DIGITAL SHOWCASE ENGINE. ALL SYSTEMS NOMINAL.
        </p>
        
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          <a 
            href="https://x.com/TheCyberSonicX" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full border border-white/10 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 font-accent font-bold uppercase tracking-widest text-sm"
          >
            X / Twitter
          </a>
          <a 
            href="https://www.tiktok.com/@nnaiksr?is_from_webapp=1&sender_device=pc" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full border border-white/10 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 font-accent font-bold uppercase tracking-widest text-sm"
          >
            TikTok
          </a>
          <a 
            href="https://www.facebook.com/KRIND.NNAI/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full border border-white/10 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 font-accent font-bold uppercase tracking-widest text-sm"
          >
            Facebook
          </a>
          <a 
            href="https://www.instagram.com/neuranestleap/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full border border-white/10 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 font-accent font-bold uppercase tracking-widest text-sm"
          >
            Instagram
          </a>
          <a 
            href="https://www.reddit.com/user/Wild_Blacksmith6682/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full border border-white/10 hover:bg-primary hover:text-black hover:border-primary transition-all duration-300 font-accent font-bold uppercase tracking-widest text-sm"
          >
            Reddit
          </a>
        </div>

        <button 
          onClick={() => {
            const userPin = prompt("SYSTEM LOCKED.\n\nENTER MASTER PIN:");
            if (userPin === "1106") { // Note: This is a fallback, ideally should use context
              window.dispatchEvent(new CustomEvent('toggle-admin', { detail: userPin }));
            }
          }}
          className="text-[10px] font-accent font-bold text-white/20 hover:text-primary transition-colors uppercase tracking-[0.4em]"
        >
          — Admin Access —
        </button>
      </div>
    </footer>
  );
}
