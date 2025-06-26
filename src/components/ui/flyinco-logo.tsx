
import { motion } from "framer-motion";

interface FlyincoLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg";
}

const FlyincoLogo = ({ className = "", size = "md" }: FlyincoLogoProps) => {
  const sizeClasses = {
    sm: "text-lg md:text-xl",
    md: "text-xl md:text-2xl lg:text-3xl",
    lg: "text-2xl md:text-3xl lg:text-4xl"
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`relative ${className}`}
    >
      <div className="relative flex flex-col items-center">
        {/* Main logo */}
        <div className="relative z-10 flex items-center gap-2 mb-1">
          <div className={`text-white font-bold tracking-wide ${sizeClasses[size]}`}>
            <span className="bg-gradient-to-r from-white via-[#E6E6FA] to-[#9370DB] bg-clip-text text-transparent">
              FLYINCO
            </span>
          </div>
          
          {/* Wing element inspired by the logo */}
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
            <div className="w-6 h-1.5 bg-gradient-to-r from-[#9370DB] to-[#E6E6FA] rounded-full transform -skew-x-12"></div>
            <div className="absolute -top-0.5 -right-1 w-4 h-0.5 bg-gradient-to-r from-[#E6E6FA] to-transparent rounded-full transform -skew-x-12"></div>
          </motion.div>
        </div>
        
        {/* Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-white/80 text-xs md:text-sm tracking-[0.2em] text-center"
        >
          TRAVEL & TOURISM
        </motion.div>
      </div>
    </motion.div>
  );
};

export { FlyincoLogo };
