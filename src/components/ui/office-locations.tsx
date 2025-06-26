
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";

const OfficeLocations = () => {
  const locations = [
    {
      country: "Saudi Arabia",
      city: "Riyadh",
      phone: "+966 55 618 2021",
      flag: "🇸🇦"
    },
    {
      country: "Bahrain",
      city: "Manama", 
      phone: "+973 33 37 2021",
      flag: "🇧🇭"
    },
    {
      country: "UAE",
      city: "Dubai",
      phone: "Coming Soon",
      flag: "🇦🇪"
    },
    {
      country: "India",
      city: "Mumbai",
      phone: "Coming Soon", 
      flag: "🇮🇳"
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.3, duration: 0.8 }}
      className="relative z-10 py-16 md:py-24 px-4 md:px-6"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12 md:mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.6 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-4"
          >
            <span className="bg-gradient-to-r from-white via-[#12FCD4] to-[#7A5CFA] bg-clip-text text-transparent">
              Global Presence
            </span>
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.7, duration: 0.6 }}
            className="text-white/70 text-sm md:text-base max-w-2xl mx-auto"
          >
            Connecting travelers across the Middle East and beyond
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {locations.map((location, index) => (
            <motion.div
              key={location.country}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 1.8 + index * 0.1, 
                duration: 0.6,
                ease: "easeOut"
              }}
              className="group"
            >
              <div className="relative backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 hover:bg-white/[0.05] transition-all duration-300 hover:scale-105 hover:border-white/[0.15]">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#7A5CFA]/10 via-transparent to-[#12FCD4]/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl">{location.flag}</span>
                    <MapPin className="w-4 h-4 text-[#12FCD4] opacity-60" />
                  </div>
                  
                  <h3 className="text-white font-semibold text-lg mb-1">
                    {location.country}
                  </h3>
                  
                  <p className="text-white/60 text-sm mb-3">
                    {location.city}
                  </p>
                  
                  <p className="text-[#12FCD4] text-xs font-mono">
                    {location.phone}
                  </p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-3 right-3 w-1 h-1 bg-[#7A5CFA] rounded-full opacity-40 group-hover:opacity-80 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.6 }}
          className="text-center mt-12 md:mt-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-sm">
            <div className="w-2 h-2 bg-[#12FCD4] rounded-full animate-pulse"></div>
            <span className="text-white/80 text-sm">
              info@flyinco.com
            </span>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export { OfficeLocations };
