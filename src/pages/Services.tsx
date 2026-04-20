import { useState } from "react";
import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, MapPin, Loader2, Sparkles } from "lucide-react";
import { getGroundedInfo } from "@/lib/gemini";
import ReactMarkdown from "react-markdown";

export default function Services() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mapsQuery, setMapsQuery] = useState("");
  const [searchResult, setSearchResult] = useState("");
  const [mapsResult, setMapsResult] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [isMapping, setIsMapping] = useState(false);

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    setIsSearching(true);
    try {
      const res = await getGroundedInfo(searchQuery, "search");
      setSearchResult(res || "No results found.");
    } catch (error) {
      setSearchResult(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsSearching(false);
    }
  };

  const handleMaps = async () => {
    if (!mapsQuery.trim()) return;
    setIsMapping(true);
    try {
      const res = await getGroundedInfo(mapsQuery, "maps");
      setMapsResult(res || "No results found.");
    } catch (error) {
      setMapsResult(`Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setIsMapping(false);
    }
  };

  return (
    <div className="pt-32 pb-24">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6">INTELLIGENT SERVICES</h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Experience the power of Gemini's grounding capabilities. Real-time data, real-world context.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Search Grounding */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="glass border-white/10 h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4">
                  <Search className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl font-display">Google Search Grounding</CardTitle>
                <p className="text-sm text-white/50">Ask anything about current events or real-time data.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-2">
                  <Input 
                    placeholder="e.g. What is the current stock price of Google?" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="bg-white/5 border-white/10 rounded-full"
                  />
                  <Button onClick={handleSearch} disabled={isSearching} className="rounded-full px-6">
                    {isSearching ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
                  </Button>
                </div>
                {searchResult && (
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-4 text-blue-400">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">AI Response</span>
                    </div>
                    <div className="markdown-body prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown>
                        {searchResult}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Maps Grounding */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="glass border-white/10 h-full">
              <CardHeader>
                <div className="w-12 h-12 rounded-2xl bg-green-500/10 text-green-500 flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <CardTitle className="text-2xl font-display">Google Maps Grounding</CardTitle>
                <p className="text-sm text-white/50">Find locations, businesses, and geographical insights.</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex gap-2">
                  <Input 
                    placeholder="e.g. Find the best coffee shops in Tokyo." 
                    value={mapsQuery}
                    onChange={(e) => setMapsQuery(e.target.value)}
                    className="bg-white/5 border-white/10 rounded-full"
                  />
                  <Button onClick={handleMaps} disabled={isMapping} className="rounded-full px-6">
                    {isMapping ? <Loader2 className="w-4 h-4 animate-spin" /> : "Explore"}
                  </Button>
                </div>
                {mapsResult && (
                  <div className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-2 mb-4 text-green-400">
                      <Sparkles className="w-4 h-4" />
                      <span className="text-xs font-bold uppercase tracking-widest">AI Insights</span>
                    </div>
                    <div className="markdown-body prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown>
                        {mapsResult}
                      </ReactMarkdown>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
