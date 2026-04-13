/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Chatbot from "@/components/chat/Chatbot";
import Home from "@/pages/Home";
import Services from "@/pages/Services";
import Showcase from "@/pages/Showcase";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import { motion, AnimatePresence } from "motion/react";
import { AppProvider } from "@/context/AppContext";
import AdminControls from "@/components/admin/AdminControls";
import OmniCanvas from "@/components/layout/OmniCanvas";

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-background text-foreground selection:bg-white selection:text-black">
          <OmniCanvas />
          <Navbar />
          
          <main className="relative z-10">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<PageWrapper><Home /></PageWrapper>} />
                <Route path="/services" element={<PageWrapper><Services /></PageWrapper>} />
                <Route path="/showcase" element={<PageWrapper><Showcase /></PageWrapper>} />
                <Route path="/about" element={<PageWrapper><About /></PageWrapper>} />
                <Route path="/contact" element={<PageWrapper><Contact /></PageWrapper>} />
              </Routes>
            </AnimatePresence>
          </main>

          <Footer />
          <Chatbot />
          <AdminControls />
        </div>
      </Router>
    </AppProvider>
  );
}

function PageWrapper({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
