
import { motion } from "framer-motion";

interface FlyincoLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const FlyincoLogo = ({ className = "", size = "md" }: FlyincoLogoProps) => {
  const sizeClasses = {
    sm: "h-8 w-auto",
    md: "h-12 w-auto",
    lg: "h-16 w-auto"
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative ${className}`}
    >
      <div className="relative">
        {/* Glow effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#7A5CFA] to-[#12FCD4] opacity-20 blur-xl rounded-full transform scale-150"></div>
        
        {/* Logo text with brand styling */}
        <div className="relative z-10 flex items-center gap-2">
          <div className="text-white font-bold tracking-wide text-xl md:text-2xl lg:text-3xl">
            <span className="bg-gradient-to-r from-white via-[#12FCD4] to-[#7A5CFA] bg-clip-text text-transparent">
              FLYINCO
            </span>
          </div>
          
          {/* Animated wing element */}
          <motion.div
            animate={{ 
              rotateY: [0, 15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="relative"
          >
            <div className="w-8 h-2 bg-gradient-to-r from-[#7A5CFA] to-[#12FCD4] rounded-full transform -skew-x-12"></div>
            <div className="absolute -top-1 -right-1 w-6 h-1 bg-gradient-to-r from-[#12FCD4] to-transparent rounded-full transform -skew-x-12"></div>
          </motion.div>
        </div>
        
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-white/60 text-xs md:text-sm tracking-[0.2em] mt-1 text-center"
        >
          TRAVEL & TOURISM
        </motion.div>
      </div>
    </motion.div>
  );
};

export { FlyincoLogo };
