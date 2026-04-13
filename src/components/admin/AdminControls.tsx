import { useApp } from "@/context/AppContext";
import { cn } from "@/lib/utils";
import { Lock, Unlock, Download, Key, HelpCircle, Palette, Type, Image as ImageIcon, BrainCircuit, Search, Loader2, X, Github, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion, AnimatePresence } from "motion/react";
import { useState, useRef, useEffect } from "react";
import { researchWithGrounding } from "@/lib/gemini";
import ReactMarkdown from "react-markdown";

export default function AdminControls() {
  const { 
    theme, setTheme, 
    bgColor, setBgColor, 
    fontFamily, setFontFamily, 
    niche, setNiche, 
    isAdmin, setIsAdmin, 
    pin, setPin,
    updateContent, content
  } = useApp();

  const [isResearchOpen, setIsResearchOpen] = useState(false);
  const [researchQuery, setResearchQuery] = useState("");
  const [researchResult, setResearchResult] = useState("");
  const [isResearching, setIsResearching] = useState(false);
  const [githubToken, setGithubToken] = useState<string | null>(localStorage.getItem("gh_token"));
  const [isCreatingRepo, setIsCreatingRepo] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [isPanelMinimized, setIsPanelMinimized] = useState(false);
  const [lastCreatedRepo, setLastCreatedRepo] = useState<string | null>(localStorage.getItem("last_repo"));
  const logoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'GITHUB_AUTH_SUCCESS') {
        const token = event.data.token;
        setGithubToken(token);
        localStorage.setItem("gh_token", token);
        alert("GITHUB CONNECTED SUCCESSFULLY! 🚀");
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  const connectGithub = async () => {
    try {
      const response = await fetch('/api/auth/github/url');
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.details || data.error || "Server configuration error");
      }
      
      if (!data.url) {
        throw new Error("No authorization URL received");
      }

      window.open(data.url, 'github_oauth', 'width=600,height=700');
    } catch (error: any) {
      console.error(error);
      alert(`GITHUB ERROR: ${error.message}\n\nCheck your AI Studio Secrets for VITE_GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET.`);
    }
  };

  const logoutGithub = () => {
    setGithubToken(null);
    localStorage.removeItem("gh_token");
  };

  const createRepository = async () => {
    if (!githubToken) return;
    
    const repoName = prompt("Enter repository name:", "KR-NNAI-Showcase");
    if (!repoName) return;

    setIsCreatingRepo(true);
    try {
      const response = await fetch('/api/github/create-repo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: githubToken,
          name: repoName,
          description: "Premium AI Showcase created with Infinity OS",
          isPrivate: true
        })
      });

      const data = await response.json();
      if (response.ok) {
        const repoNameFromUrl = data.name;
        setLastCreatedRepo(repoNameFromUrl);
        localStorage.setItem("last_repo", repoNameFromUrl);
        alert(`SUCCESS! Repository created: ${data.html_url} 🚀`);
      } else {
        throw new Error(data.message || "Failed to create repository");
      }
    } catch (error: any) {
      console.error(error);
      alert(`ERROR: ${error.message}`);
    } finally {
      setIsCreatingRepo(false);
    }
  };

  const getFullHTML = () => {
    // Collect all styles
    let styles = "";
    const styleTags = document.querySelectorAll("style");
    styleTags.forEach(tag => {
      styles += tag.innerHTML;
    });

    // Get the root content
    const rootContent = document.getElementById("root")?.innerHTML || "";
    
    // Create a standalone HTML structure
    return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Infinity OS Showcase</title>
    <style>
        ${styles}
        /* Ensure background is visible */
        body { margin: 0; background: ${bgColor}; color: white; font-family: sans-serif; overflow-x: hidden; }
        #root { min-height: 100vh; }
    </style>
</head>
<body>
    <div id="root">${rootContent}</div>
    <script>
        // Simple script to handle basic interactions if needed
        console.log("Infinity OS Showcase Loaded");
    </script>
</body>
</html>`;
  };

  const syncToGithub = async () => {
    if (!githubToken) return;
    
    let repoName = lastCreatedRepo;
    if (!repoName) {
      repoName = prompt("Enter repository name to sync to:", "KR-NNAI-Showcase");
    }
    if (!repoName) return;

    setIsSyncing(true);
    try {
      const htmlContent = getFullHTML();
      
      const response = await fetch('/api/github/push-file', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token: githubToken,
          repo: repoName,
          path: "docs/index.html",
          content: htmlContent,
          message: `Update Showcase: ${new Date().toLocaleString()}`
        })
      });

      const data = await response.json();
      if (response.ok) {
        alert("SYNC COMPLETE! Your changes are now on GitHub. 🚀\n\nIf GitHub Pages is enabled, your site will update in a few minutes.");
      } else {
        throw new Error(data.message || "Failed to sync to GitHub");
      }
    } catch (error: any) {
      console.error(error);
      alert(`SYNC ERROR: ${error.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    const handleToggle = (e: any) => {
      if (e.detail === pin) setIsAdmin(true);
    };
    window.addEventListener('toggle-admin', handleToggle);
    return () => window.removeEventListener('toggle-admin', handleToggle);
  }, [pin, setIsAdmin]);

  const toggleAdmin = () => {
    if (!isAdmin) {
      const userPin = prompt("SYSTEM LOCKED.\n\nENTER MASTER PIN:");
      if (userPin === pin) {
        setIsAdmin(true);
      } else if (userPin !== null) {
        alert("ACCESS DENIED. INCORRECT PIN.");
      }
    } else {
      setIsAdmin(false);
    }
  };

  const changePin = () => {
    const oldPin = prompt("ENTER CURRENT PIN TO VERIFY:");
    if (oldPin === pin) {
      const newPin = prompt("ENTER NEW MASTER PIN:");
      if (newPin?.trim()) {
        setPin(newPin.trim());
        alert("PIN CHANGED SUCCESSFULLY!");
      }
    } else if (oldPin !== null) {
      alert("VERIFICATION FAILED.");
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => updateContent({ logoSrc: event.target?.result as string });
      reader.readAsDataURL(file);
    }
  };

  const runResearch = async () => {
    if (!researchQuery.trim()) return;
    setIsResearching(true);
    setResearchResult("");
    try {
      const result = await researchWithGrounding(researchQuery);
      setResearchResult(result || "No data found.");
    } catch (error) {
      console.error(error);
      setResearchResult("Error performing research. Please check your API key.");
    } finally {
      setIsResearching(false);
    }
  };

  const downloadHTML = () => {
    if (!isAdmin) return;
    setIsAdmin(false);
    setTimeout(() => {
      const htmlContent = getFullHTML();
      const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      let fileName = prompt("Name your new Showcase file:", "Infinity_Showcase");
      if (!fileName) fileName = "Infinity_Showcase";
      a.download = fileName + ".html";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      setIsAdmin(true);
      alert("SUCCESS! 🎉\n\nYour fully customized SaaS Showcase has been downloaded.");
    }, 100);
  };

  return (
    <>
      {/* SaaS Dashboard */}
      <AnimatePresence>
        {isAdmin && (
          <motion.div
            initial={{ y: -100, x: "-50%", opacity: 0 }}
            animate={{ 
              y: isPanelMinimized ? -80 : 0, 
              x: "-50%", 
              opacity: 1,
              scale: isPanelMinimized ? 0.95 : 1
            }}
            exit={{ y: -100, x: "-50%", opacity: 0 }}
            className={cn(
              "fixed top-5 left-1/2 z-[1000] w-[95%] max-w-6xl glass rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4 border-primary/50 shadow-[0_0_30px_rgba(var(--primary-rgb),0.3)] transition-all duration-500",
              isPanelMinimized && "opacity-40 hover:opacity-100"
            )}
          >
            <div className="flex items-center gap-3 font-display font-bold text-sm tracking-widest">
              <span className="text-primary animate-pulse">●</span> INFINITY OS MASTER HUB
              <button 
                onClick={() => setIsPanelMinimized(!isPanelMinimized)}
                className="ml-4 p-1 hover:bg-white/10 rounded-md transition-colors"
              >
                {isPanelMinimized ? <ChevronRight className="w-4 h-4 rotate-90" /> : <X className="w-4 h-4" />}
              </button>
            </div>
            {!isPanelMinimized && (
              <div className="flex flex-wrap items-center justify-center gap-2">
                {githubToken ? (
                  <>
                    <Button variant="ghost" size="sm" onClick={syncToGithub} disabled={isSyncing} className="text-[10px] font-accent uppercase tracking-widest h-10 px-4 text-emerald-400">
                      {isSyncing ? <Loader2 className="w-3 h-3 animate-spin mr-2" /> : <Github className="w-3 h-3 mr-2" />} 
                      Sync to GitHub
                    </Button>
                    <Button variant="ghost" size="sm" onClick={createRepository} disabled={isCreatingRepo} className="text-[10px] font-accent uppercase tracking-widest h-10 px-4 text-white/50 hover:text-white">
                      New Repo
                    </Button>
                    <Button variant="ghost" size="sm" onClick={logoutGithub} className="text-[10px] font-accent uppercase tracking-widest h-10 px-4 text-white/30 hover:text-white/50">
                      Disconnect
                    </Button>
                  </>
                ) : (
                  <Button variant="ghost" size="sm" onClick={connectGithub} className="text-[10px] font-accent uppercase tracking-widest h-10 px-4 text-white/50 hover:text-white">
                    <Github className="w-3 h-3 mr-2" /> Connect GitHub
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={() => setIsResearchOpen(true)} className="text-[10px] font-accent uppercase tracking-widest h-10 px-4 text-primary">
                  <BrainCircuit className="w-3 h-3 mr-2" /> Gemini Data Science
                </Button>
                <Button variant="ghost" size="sm" onClick={() => logoInputRef.current?.click()} className="text-[10px] font-accent uppercase tracking-widest h-10 px-4">
                  <ImageIcon className="w-3 h-3 mr-2" /> Upload Logo
                </Button>
                <Button variant="ghost" size="sm" onClick={changePin} className="text-[10px] font-accent uppercase tracking-widest h-10 px-4">
                  <Key className="w-3 h-3 mr-2" /> Set Pin
                </Button>
                <Button variant="outline" size="sm" onClick={downloadHTML} className="text-[10px] font-accent uppercase tracking-widest h-10 px-4 border-primary text-primary hover:bg-primary hover:text-black">
                  <Download className="w-3 h-3 mr-2" /> Export Product
                </Button>
                <Button variant="destructive" size="sm" onClick={() => setIsAdmin(false)} className="text-[10px] font-accent uppercase tracking-widest h-10 px-4">
                  <Lock className="w-3 h-3 mr-2" /> Lock
                </Button>
              </div>
            )}
            <input type="file" ref={logoInputRef} className="hidden" onChange={handleLogoUpload} accept="image/*" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gemini Research Modal */}
      <AnimatePresence>
        {isResearchOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[2000] bg-black/90 backdrop-blur-md flex items-center justify-center p-6"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-4xl glass rounded-3xl p-8 max-h-[80vh] flex flex-col gap-6 overflow-hidden"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <BrainCircuit className="w-6 h-6 text-primary" />
                  <h2 className="text-2xl font-display font-bold tracking-tighter">GEMINI DATA SCIENCE</h2>
                </div>
                <button onClick={() => setIsResearchOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Ask about any topic, brand, or industry..."
                  className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 py-4 outline-none focus:border-primary transition-colors"
                  value={researchQuery}
                  onChange={(e) => setResearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && runResearch()}
                />
                <Button onClick={runResearch} disabled={isResearching} className="rounded-xl px-8 h-14 bg-primary text-black font-bold">
                  {isResearching ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto pr-4 custom-scrollbar">
                {isResearching ? (
                  <div className="flex flex-col items-center justify-center h-full gap-4 py-20">
                    <Loader2 className="w-12 h-12 text-primary animate-spin" />
                    <p className="font-accent text-sm uppercase tracking-widest animate-pulse">Analyzing Global Data Sources...</p>
                  </div>
                ) : researchResult ? (
                  <div className="markdown-body prose prose-invert max-w-none">
                    <ReactMarkdown>{researchResult}</ReactMarkdown>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full opacity-30 py-20">
                    <BrainCircuit className="w-16 h-16 mb-4" />
                    <p className="font-accent text-sm uppercase tracking-widest">Ready for Deep Intelligence Research</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Toggle Button (Lock) */}
      <div className="fixed bottom-8 left-8 z-[999] flex items-center gap-4 group">
        <button
          onClick={toggleAdmin}
          className={cn(
            "w-16 h-16 rounded-full glass flex items-center justify-center transition-all duration-500 shadow-2xl",
            "hover:border-primary hover:scale-110 active:scale-95",
            isAdmin ? "border-primary shadow-[0_0_30px_rgba(var(--primary-rgb),0.4)]" : "border-white/10"
          )}
        >
          {isAdmin ? (
            <Unlock className="w-7 h-7 text-primary animate-pulse" />
          ) : (
            <div className="relative">
              <Lock className="w-7 h-7 text-white/80 group-hover:text-primary transition-colors" />
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          )}
        </button>
        
        <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-[-10px] group-hover:translate-x-0 pointer-events-none">
          <div className="glass px-4 py-2 rounded-xl border-primary/30">
            <p className="text-[10px] font-accent font-bold uppercase tracking-[0.2em] text-primary">
              {isAdmin ? "Admin Active" : "System Lock"}
            </p>
            <p className="text-[9px] text-white/50 uppercase tracking-widest">
              {isAdmin ? "Click to Lock" : "Click to Edit"}
            </p>
          </div>
        </div>
      </div>

    </>
  );
}
