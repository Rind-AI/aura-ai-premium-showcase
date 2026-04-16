import { motion } from "motion/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="pt-32 pb-24">
      <div className="container px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-6xl font-bold mb-6 tracking-tighter">GET IN TOUCH</h1>
          <p className="text-white/50 max-w-2xl mx-auto text-lg">
            Ready to start your next project? Let's build something extraordinary together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-1 space-y-8">
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-1">Email</h4>
                <p className="text-lg">info@khalidrind.io</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-1">Phone</h4>
                <p className="text-lg">+61-493348617</p>
              </div>
            </div>
            <div className="flex items-start gap-6">
              <div className="w-12 h-12 rounded-2xl glass flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-white/40 mb-1">Office</h4>
                <p className="text-lg">Melbourne, Australia</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <Card className="glass border-white/10 p-8">
              <CardContent className="p-0 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Full Name</label>
                    <Input placeholder="John Doe" className="bg-white/5 border-white/10 rounded-xl h-12" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Email Address</label>
                    <Input placeholder="john@example.com" className="bg-white/5 border-white/10 rounded-xl h-12" />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Subject</label>
                  <Input placeholder="Project Inquiry" className="bg-white/5 border-white/10 rounded-xl h-12" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40 font-bold">Message</label>
                  <textarea 
                    placeholder="Tell us about your project..." 
                    className="w-full min-h-[150px] bg-white/5 border border-white/10 rounded-xl p-4 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all"
                  />
                </div>
                <Button className="w-full h-14 rounded-xl text-lg font-bold group">
                  Send Message
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
