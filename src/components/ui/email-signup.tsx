
import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

const EmailSignup = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast.success("🚀 You're on the list! We'll notify you when we launch.");
    setEmail("");
    setIsSubmitting(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.8, duration: 0.8 }}
      className="w-full max-w-md mx-auto"
    >
      {/* Glassmorphism container */}
      <div className="relative backdrop-blur-xl bg-white/[0.03] border border-white/[0.1] rounded-2xl md:rounded-3xl p-4 md:p-6 lg:p-8 shadow-[0_8px_32px_0_rgba(122,92,250,0.15)]">
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#7A5CFA]/10 via-transparent to-[#12FCD4]/10 rounded-2xl md:rounded-3xl"></div>
        
        <div className="relative z-10">
          <motion.h4
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="text-white/95 text-lg md:text-xl font-semibold mb-2 text-center"
          >
            Be the First to Know
          </motion.h4>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="text-white/70 text-sm mb-4 md:mb-6 text-center"
          >
            Get notified when we launch and receive exclusive early access
          </motion.p>

          <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileFocus={{ scale: 1.02 }}
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/[0.05] border-white/[0.15] text-white placeholder:text-white/50 focus:border-[#12FCD4] focus:ring-[#12FCD4]/20 rounded-xl h-10 md:h-12 px-4 backdrop-blur-sm"
              />
            </motion.div>
            
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-10 md:h-12 bg-gradient-to-r from-[#5A35F2] to-[#C14DFF] hover:from-[#6B46FF] hover:to-[#D35EFF] text-white font-semibold rounded-xl shadow-[0_4px_20px_0_rgba(90,53,242,0.4)] hover:shadow-[0_8px_30px_0_rgba(90,53,242,0.6)] transition-all duration-300 border-0 text-sm md:text-base"
              >
                {isSubmitting ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    className="w-4 h-4 md:w-5 md:h-5 border-2 border-white/30 border-t-white rounded-full"
                  />
                ) : (
                  "Notify Me 🚀"
                )}
              </Button>
            </motion.div>
          </form>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-1 md:-top-2 -right-1 md:-right-2 w-3 md:w-4 h-3 md:h-4 bg-[#12FCD4] rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute -bottom-0.5 md:-bottom-1 -left-0.5 md:-left-1 w-2 h-2 bg-[#7A5CFA] rounded-full opacity-80 animate-pulse"></div>
      </div>
    </motion.div>
  );
};

export { EmailSignup };
