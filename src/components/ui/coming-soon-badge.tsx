
import { motion } from "framer-motion";

const ComingSoonBadge = () => {
  return (
    <div className="flex flex-col items-center space-y-4 md:space-y-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative"
      >
        {/* Main badge container */}
        <div className="relative backdrop-blur-xl bg-white/[0.03] border border-white/[0.1] rounded-2xl md:rounded-3xl px-6 md:px-8 py-4 md:py-6 shadow-[0_8px_32px_0_rgba(122,92,250,0.2)]">
          {/* Animated gradient background */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#7A5CFA]/20 via-transparent to-[#12FCD4]/20 rounded-2xl md:rounded-3xl"></div>
          
          {/* Pulsing glow effect */}
          <motion.div
            animate={{ 
              opacity: [0.5, 1, 0.5],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute inset-0 bg-gradient-to-r from-[#7A5CFA] to-[#12FCD4] opacity-20 blur-xl rounded-2xl md:rounded-3xl"
          />
          
          <div className="relative z-10 text-center">
            <motion.div
              animate={{ 
                rotateY: [0, 360],
              }}
              transition={{ 
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
              className="inline-block mb-2"
            >
              <span className="text-2xl md:text-3xl">🚀</span>
            </motion.div>
            
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-white via-[#12FCD4] to-[#7A5CFA] bg-clip-text text-transparent mb-2"
            >
              COMING SOON
            </motion.h3>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-white/80 text-sm md:text-base tracking-wide"
            >
              Revolutionary Travel Experience
            </motion.p>
          </div>
          
          {/* Corner accents */}
          <div className="absolute top-2 md:top-3 right-2 md:right-3 w-2 h-2 bg-[#12FCD4] rounded-full opacity-60 animate-pulse"></div>
          <div className="absolute bottom-2 md:bottom-3 left-2 md:left-3 w-1.5 h-1.5 bg-[#7A5CFA] rounded-full opacity-80 animate-pulse"></div>
        </div>
      </motion.div>
      
      {/* Subtitle */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="text-center"
      >
        <p className="text-white/70 text-xs md:text-sm tracking-[0.2em] uppercase">
          The Future of Travel Technology
        </p>
      </motion.div>
    </div>
  );
};

export { ComingSoonBadge };
