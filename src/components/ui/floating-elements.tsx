
import { motion } from "framer-motion";

const FloatingElements = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating airplane */}
      <motion.div
        initial={{ x: -100, y: 200, rotate: 15 }}
        animate={{ 
          x: [0, window.innerWidth + 100],
          y: [200, 150, 200],
          rotate: [15, 25, 15]
        }}
        transition={{ 
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute text-[#7A5CFA]/30 text-4xl"
      >
        ✈️
      </motion.div>

      {/* Floating clouds */}
      <motion.div
        animate={{ 
          x: [-50, 100, -50],
          y: [0, -20, 0]
        }}
        transition={{ 
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 text-white/10 text-6xl"
      >
        ☁️
      </motion.div>

      <motion.div
        animate={{ 
          x: [0, -80, 0],
          y: [0, 30, 0]
        }}
        transition={{ 
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="absolute top-40 right-20 text-white/10 text-4xl"
      >
        ☁️
      </motion.div>

      {/* Radar grid lines */}
      <motion.div
        animate={{ rotate: [0, 360] }}
        transition={{ 
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-96 h-96 border border-[#7A5CFA]/10 rounded-full"></div>
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#7A5CFA]/20 to-transparent"></div>
        <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-[#7A5CFA]/20 to-transparent"></div>
      </motion.div>

      <motion.div
        animate={{ rotate: [360, 0] }}
        transition={{ 
          duration: 45,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-64 h-64 border border-[#12FCD4]/10 rounded-full"></div>
      </motion.div>

      {/* Particle effects */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            opacity: 0 
          }}
          animate={{ 
            y: [0, -100, 0],
            opacity: [0, 0.6, 0],
            scale: [0.5, 1, 0.5]
          }}
          transition={{ 
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
          className="absolute w-1 h-1 bg-[#12FCD4] rounded-full"
        />
      ))}

      {/* Motion lines */}
      <motion.div
        animate={{ 
          x: [-200, window.innerWidth + 200],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/3 left-0 w-40 h-px bg-gradient-to-r from-transparent via-[#7A5CFA]/50 to-transparent"
      />

      <motion.div
        animate={{ 
          x: [window.innerWidth + 200, -200],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3
        }}
        className="absolute top-2/3 right-0 w-32 h-px bg-gradient-to-r from-transparent via-[#12FCD4]/50 to-transparent"
      />
    </div>
  );
};

export { FloatingElements };
