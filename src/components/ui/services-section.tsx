
import { motion } from "framer-motion";
import { Plane, MapPin, Calendar, Shield } from "lucide-react";

const ServicesSection = () => {
  const services = [
    {
      icon: Plane,
      title: "Flight Booking",
      description: "Book flights to destinations worldwide with our advanced booking system",
      gradient: "from-[#7A5CFA] to-[#12FCD4]"
    },
    {
      icon: MapPin,
      title: "Travel Planning",
      description: "Personalized travel itineraries crafted by our AI-powered platform",
      gradient: "from-[#12FCD4] to-[#7A5CFA]"
    },
    {
      icon: Calendar,
      title: "Trip Management",
      description: "Seamlessly manage your entire travel experience in one place",
      gradient: "from-[#5A35F2] to-[#C14DFF]"
    },
    {
      icon: Shield,
      title: "Travel Insurance",
      description: "Comprehensive coverage for worry-free travel experiences",
      gradient: "from-[#C14DFF] to-[#5A35F2]"
    }
  ];

  return (
    <section className="py-16 md:py-24 px-6 relative">
      <div className="container mx-auto max-w-6xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.h2
            className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-white via-[#12FCD4] to-[#7A5CFA] bg-clip-text text-transparent">
              Our Services
            </span>
          </motion.h2>
          <motion.p
            className="text-white/70 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed"
          >
            Revolutionary travel technology solutions designed for the modern explorer
          </motion.p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ 
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group relative"
            >
              {/* Glassmorphism card */}
              <div className="relative backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] rounded-2xl p-6 md:p-8 shadow-[0_8px_32px_0_rgba(122,92,250,0.1)] h-full">
                {/* Hover gradient background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300`}></div>
                
                {/* Floating 3D icon */}
                <motion.div
                  animate={{ 
                    rotateY: [0, 10, 0],
                    y: [0, -5, 0]
                  }}
                  transition={{ 
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.5
                  }}
                  className="relative mb-6"
                >
                  <div className={`w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br ${service.gradient} rounded-xl flex items-center justify-center shadow-[0_8px_24px_0_rgba(122,92,250,0.3)] group-hover:shadow-[0_12px_32px_0_rgba(122,92,250,0.5)] transition-shadow duration-300`}>
                    <service.icon className="w-6 h-6 md:w-8 md:h-8 text-white" />
                  </div>
                  
                  {/* Glow effect */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-50 blur-xl rounded-xl scale-150 group-hover:opacity-70 transition-opacity duration-300`}></div>
                </motion.div>

                <div className="relative z-10">
                  <h3 className="text-white text-lg md:text-xl font-semibold mb-3 group-hover:text-[#12FCD4] transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-white/60 text-sm md:text-base leading-relaxed group-hover:text-white/80 transition-colors duration-300">
                    {service.description}
                  </p>
                </div>

                {/* Corner accents */}
                <div className="absolute top-3 right-3 w-2 h-2 bg-[#12FCD4] rounded-full opacity-40 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute bottom-3 left-3 w-1 h-1 bg-[#7A5CFA] rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export { ServicesSection };
