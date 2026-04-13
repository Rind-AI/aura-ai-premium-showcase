import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { chatWithGemini, Message } from "@/lib/gemini";
import ReactMarkdown from "react-markdown";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", text: "Hello! I'm Aura. How can I assist you today?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: "user", text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await chatWithGemini([...messages, userMessage]);
      setMessages(prev => [...prev, { role: "model", text: response || "I'm sorry, I couldn't process that." }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: "model", text: "Something went wrong. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-8 right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass w-[350px] h-[500px] rounded-3xl overflow-hidden flex flex-col mb-4 shadow-2xl border-white/20"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 flex items-center justify-between bg-white/5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-black" />
                </div>
                <div>
                  <h3 className="text-sm font-bold">Aura AI</h3>
                  <p className="text-[10px] text-white/50">Online & Ready</p>
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="rounded-full hover:bg-white/10">
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4" ref={scrollRef}>
              <div className="flex flex-col gap-4">
                {messages.map((m, i) => (
                  <div key={i} className={cn(
                    "max-w-[80%] p-3 rounded-2xl text-sm",
                    m.role === "user" 
                      ? "bg-white text-black self-end rounded-tr-none" 
                      : "glass self-start rounded-tl-none"
                  )}>
                    <div className="markdown-body prose prose-invert prose-sm">
                      <ReactMarkdown>
                        {m.text}
                      </ReactMarkdown>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="glass self-start p-3 rounded-2xl rounded-tl-none">
                    <Loader2 className="w-4 h-4 animate-spin" />
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="p-4 border-t border-white/10 bg-white/5">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-2"
              >
                <Input 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Aura anything..."
                  className="bg-white/5 border-white/10 rounded-full focus-visible:ring-white/20"
                />
                <Button type="submit" size="icon" className="rounded-full shrink-0" disabled={isLoading}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Button 
        onClick={() => setIsOpen(!isOpen)}
        size="icon" 
        className="w-14 h-14 rounded-full shadow-2xl bg-white text-black hover:bg-white/90 transition-all"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </Button>
    </div>
  );
}

function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
