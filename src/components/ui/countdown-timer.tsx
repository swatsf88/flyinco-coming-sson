
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownTimerProps {
  targetDate?: Date;
}

const CountdownTimer = ({ targetDate = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  const TimeBlock = ({ value, label }: { value: number; label: string }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.05 }}
      className="relative group"
    >
      {/* Glassmorphism container */}
      <div className="relative backdrop-blur-xl bg-white/[0.02] border border-white/[0.08] rounded-2xl p-4 md:p-6 shadow-[0_8px_32px_0_rgba(122,92,250,0.1)]">
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#7A5CFA]/20 to-[#12FCD4]/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl"></div>
        
        <div className="relative z-10 text-center">
          <motion.div
            key={value}
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-2xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-b from-white to-white/70 bg-clip-text text-transparent mb-2"
          >
            {value.toString().padStart(2, '0')}
          </motion.div>
          <div className="text-white/60 text-xs md:text-sm tracking-wider uppercase">
            {label}
          </div>
        </div>
        
        {/* Corner accents */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-[#12FCD4] rounded-full opacity-60"></div>
        <div className="absolute bottom-2 left-2 w-1 h-1 bg-[#7A5CFA] rounded-full opacity-80"></div>
      </div>
    </motion.div>
  );

  return (
    <div className="flex flex-col items-center space-y-6">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-white/80 text-sm md:text-base tracking-[0.3em] uppercase"
      >
        Launching In
      </motion.h3>
      
      <div className="grid grid-cols-4 gap-3 md:gap-6">
        <TimeBlock value={timeLeft.days} label="Days" />
        <TimeBlock value={timeLeft.hours} label="Hours" />
        <TimeBlock value={timeLeft.minutes} label="Minutes" />
        <TimeBlock value={timeLeft.seconds} label="Seconds" />
      </div>
    </div>
  );
};

export { CountdownTimer };
