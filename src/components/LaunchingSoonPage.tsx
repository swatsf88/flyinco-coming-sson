
import { motion } from "framer-motion";
import { FlyincoLogo } from "@/components/ui/flyinco-logo";
import { CountdownTimer } from "@/components/ui/countdown-timer";
import { EmailSignup } from "@/components/ui/email-signup";
import { FloatingElements } from "@/components/ui/floating-elements";

const LaunchingSoonPage = () => {
  return (
    <div className="min-h-screen bg-[#0B0C10] relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            background: [
              "radial-gradient(circle at 20% 20%, #7A5CFA 0%, transparent 50%), radial-gradient(circle at 80% 80%, #12FCD4 0%, transparent 50%), radial-gradient(circle at 40% 60%, #5A35F2 0%, transparent 50%)",
              "radial-gradient(circle at 80% 20%, #12FCD4 0%, transparent 50%), radial-gradient(circle at 20% 80%, #7A5CFA 0%, transparent 50%), radial-gradient(circle at 60% 40%, #C14DFF 0%, transparent 50%)",
              "radial-gradient(circle at 20% 20%, #7A5CFA 0%, transparent 50%), radial-gradient(circle at 80% 80%, #12FCD4 0%, transparent 50%), radial-gradient(circle at 40% 60%, #5A35F2 0%, transparent 50%)"
            ]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute inset-0 opacity-20"
        />
        
        {/* Noise texture overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZGVmcz48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSBiYXNlRnJlcXVlbmN5PSIwLjkiIG51bU9jdGF2ZXM9IjEwIiAvPjwvZmlsdGVyPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIiBvcGFjaXR5PSIwLjA1IiAvPjwvc3ZnPg==')] opacity-30"></div>
      </div>

      {/* Floating 3D elements */}
      <FloatingElements />

      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-20 pt-8 px-6"
      >
        <div className="container mx-auto flex justify-between items-center">
          <FlyincoLogo size="md" />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden md:flex items-center gap-4 text-white/60 text-sm"
          >
            <span>KSA</span>
            <span>|</span>
            <span>BAHRAIN</span>
            <span>|</span>
            <span>UAE</span>
            <span>|</span>
            <span>INDIA</span>
          </motion.div>
        </div>
      </motion.header>

      {/* Main content */}
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 -mt-20">
        <div className="container mx-auto max-w-4xl text-center">
          
          {/* Hero section */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 1 }}
            className="mb-12"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/[0.1] mb-8 backdrop-blur-sm"
            >
              <div className="w-2 h-2 bg-[#12FCD4] rounded-full animate-pulse"></div>
              <span className="text-white/80 text-sm tracking-wide">
                The Future of Travel Technology
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
            >
              <span className="bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent">
                Something
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#7A5CFA] via-[#12FCD4] to-[#7A5CFA] bg-clip-text text-transparent">
                Amazing
              </span>
              <br />
              <span className="bg-gradient-to-b from-white via-white to-white/70 bg-clip-text text-transparent">
                is Coming
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              Experience the next generation of travel technology. 
              Flyinco is revolutionizing how you explore the world with cutting-edge innovation and seamless experiences.
            </motion.p>
          </motion.div>

          {/* Countdown Timer */}
          <div className="mb-12">
            <CountdownTimer />
          </div>

          {/* Email Signup */}
          <div className="mb-8">
            <EmailSignup />
          </div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.8 }}
            className="flex items-center justify-center gap-8 text-white/40 text-sm"
          >
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-[#12FCD4] rounded-full"></div>
              <span>Join 10,000+ Travel Enthusiasts</span>
            </div>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="relative z-20 pb-8 px-6"
      >
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-white/40 text-sm">
            <div className="flex items-center gap-4">
              <span>© 2024 Flyinco Travel & Tourism</span>
            </div>
            
            <div className="flex items-center gap-6">
              <span>www.flyinco.com</span>
              <span>sabith@flyinco.com</span>
            </div>
          </div>
        </div>
      </motion.footer>

      {/* Sticky CTA - Mobile */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="fixed bottom-6 left-6 right-6 md:hidden z-30"
      >
        <div className="backdrop-blur-xl bg-gradient-to-r from-[#5A35F2] to-[#C14DFF] rounded-2xl p-4 shadow-[0_8px_32px_0_rgba(90,53,242,0.4)]">
          <div className="text-center text-white font-semibold">
            🚀 Get Early Access - Notify Me!
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LaunchingSoonPage;
