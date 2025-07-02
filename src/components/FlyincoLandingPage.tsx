"use client"

import React, { useState, useRef, useEffect, useCallback, createContext, useContext, ReactNode, Children, useMemo } from 'react'
import { motion, useAnimationFrame, AnimatePresence, useMotionTemplate, useMotionValue, animate, useAnimate, Transition, AnimationSequence } from 'framer-motion'
import { RefObject } from 'react'
import { 
  Plane, 
  Hotel, 
  Car, 
  Mail, 
  CheckCircle, 
  ArrowRight,
  Sparkles,
  MapPin,
  Compass,
  Luggage,
  Phone,
  Globe,
  Calendar,
  Shield,
  CreditCard,
  Users,
  Star,
  Award,
  Clock,
  HeartHandshake
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'

// Generate unique ID without external dependency
const generateId = () => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36)
}

// Custom hook for mouse position
const useMousePositionRef = (containerRef?: RefObject<HTMLElement | SVGElement>) => {
  const positionRef = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef && containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect()
        const relativeX = x - rect.left
        const relativeY = y - rect.top
        positionRef.current = { x: relativeX, y: relativeY }
      } else {
        positionRef.current = { x, y }
      }
    }

    const handleMouseMove = (ev: MouseEvent) => {
      updatePosition(ev.clientX, ev.clientY)
    }

    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0]
      updatePosition(touch.clientX, touch.clientY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("touchmove", handleTouchMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [containerRef])

  return positionRef
}

// Mouse vector hook for image trail
const useMouseVector = (containerRef?: React.RefObject<HTMLElement>) => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [vector, setVector] = useState({ x: 0, y: 0 })
  const lastPosition = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const updatePosition = (clientX: number, clientY: number) => {
      let x = clientX
      let y = clientY

      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect()
        x = clientX - rect.left
        y = clientY - rect.top
      }

      const newVector = {
        x: x - lastPosition.current.x,
        y: y - lastPosition.current.y,
      }

      setPosition({ x, y })
      setVector(newVector)
      lastPosition.current = { x, y }
    }

    const handleMouseMove = (e: MouseEvent) => {
      updatePosition(e.clientX, e.clientY)
    }

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0]
      updatePosition(touch.clientX, touch.clientY)
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('touchmove', handleTouchMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('touchmove', handleTouchMove)
    }
  }, [containerRef])

  return { position, vector }
}

// Gradient Tracing Component
interface GradientTracingProps {
  width: number
  height: number
  baseColor?: string
  gradientColors?: [string, string, string]
  animationDuration?: number
  strokeWidth?: number
  path?: string
}

const GradientTracing: React.FC<GradientTracingProps> = ({
  width,
  height,
  baseColor = "rgba(255,255,255,0.1)",
  gradientColors = ["#2EB9DF", "#2EB9DF", "#9E00FF"],
  animationDuration = 3,
  strokeWidth = 2,
  path = `M0,${height / 2} L${width},${height / 2}`,
}) => {
  const gradientId = `pulse-${Math.random().toString(36).substr(2, 9)}`

  return (
    <div className="absolute" style={{ width, height }}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        fill="none"
        className="overflow-visible"
      >
        <path
          d={path}
          stroke={baseColor}
          strokeWidth={strokeWidth}
        />
        <path
          d={path}
          stroke={`url(#${gradientId})`}
          strokeLinecap="round"
          strokeWidth={strokeWidth}
        />
        <defs>
          <motion.linearGradient
            animate={{
              x1: [0, width * 2],
              x2: [0, width],
            }}
            transition={{
              duration: animationDuration,
              repeat: Infinity,
              ease: "linear",
            }}
            id={gradientId}
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor={gradientColors[0]} stopOpacity="0" />
            <stop stopColor={gradientColors[1]} />
            <stop offset="1" stopColor={gradientColors[2]} stopOpacity="0" />
          </motion.linearGradient>
        </defs>
      </svg>
    </div>
  )
}

// Image Trail Component
interface ImageTrailProps {
  children: React.ReactNode
  containerRef?: React.RefObject<HTMLElement>
  newOnTop?: boolean
  rotationRange?: number
  animationSequence?: Array<[any, Transition]>
  interval?: number
}

interface TrailItem {
  id: string
  x: number
  y: number
  rotation: number
  animationSequence: Array<[any, Transition]>
  child: React.ReactNode
}

const ImageTrail = ({
  children,
  newOnTop = true,
  rotationRange = 15,
  containerRef,
  animationSequence = [
    [{ opacity: 1 }, { duration: 0.1, ease: "circOut" }],
    [{ opacity: 0 }, { duration: 0.8, ease: "circIn" }],
  ],
  interval = 150,
}: ImageTrailProps) => {
  const trailRef = useRef<TrailItem[]>([])
  const lastAddedTimeRef = useRef<number>(0)
  const { position: mousePosition } = useMouseVector(containerRef)
  const lastMousePosRef = useRef(mousePosition)
  const currentIndexRef = useRef(0)
  
  const childrenArray = useMemo(() => Children.toArray(children), [children])

  const addToTrail = useCallback(
    (mousePos: { x: number; y: number }) => {
      const newItem: TrailItem = {
        id: generateId(),
        x: mousePos.x,
        y: mousePos.y,
        rotation: (Math.random() - 0.5) * rotationRange * 2,
        animationSequence,
        child: childrenArray[currentIndexRef.current],
      }

      currentIndexRef.current = (currentIndexRef.current + 1) % childrenArray.length

      if (newOnTop) {
        trailRef.current.push(newItem)
      } else {
        trailRef.current.unshift(newItem)
      }
    },
    [childrenArray, rotationRange, animationSequence, newOnTop]
  )

  const removeFromTrail = useCallback((itemId: string) => {
    const index = trailRef.current.findIndex((item) => item.id === itemId)
    if (index !== -1) {
      trailRef.current.splice(index, 1)
    }
  }, [])

  useAnimationFrame((time) => {
    if (
      lastMousePosRef.current.x === mousePosition.x &&
      lastMousePosRef.current.y === mousePosition.y
    ) {
      return
    }
    lastMousePosRef.current = mousePosition

    const currentTime = time

    if (currentTime - lastAddedTimeRef.current < interval) {
      return
    }

    lastAddedTimeRef.current = currentTime
    addToTrail(mousePosition)
  })

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {trailRef.current.map((item) => (
        <TrailItem key={item.id} item={item} onComplete={removeFromTrail} />
      ))}
    </div>
  )
}

interface TrailItemProps {
  item: TrailItem
  onComplete: (id: string) => void
}

const TrailItem = ({ item, onComplete }: TrailItemProps) => {
  const [scope, animate] = useAnimate()

  useEffect(() => {
    const sequence = item.animationSequence.map((segment) => [
      scope.current,
      ...segment,
    ])

    animate(sequence as AnimationSequence).then(() => {
      onComplete(item.id)
    })
  }, [])

  return (
    <motion.div
      ref={scope}
      key={item.id}
      className="absolute z-10"
      style={{
        left: item.x - 12,
        top: item.y - 12,
        rotate: item.rotation,
      }}
    >
      {item.child}
    </motion.div>
  )
}

// Floating Context
interface FloatingContextType {
  registerElement: (id: string, element: HTMLDivElement, depth: number) => void
  unregisterElement: (id: string) => void
}

const FloatingContext = createContext<FloatingContextType | null>(null)

interface FloatingProps {
  children: ReactNode
  className?: string
  sensitivity?: number
  easingFactor?: number
}

const Floating = ({
  children,
  className,
  sensitivity = 1,
  easingFactor = 0.05,
  ...props
}: FloatingProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const elementsMap = useRef(
    new Map<
      string,
      {
        element: HTMLDivElement
        depth: number
        currentPosition: { x: number; y: number }
      }
    >()
  )
  const mousePositionRef = useMousePositionRef(containerRef)

  const registerElement = useCallback(
    (id: string, element: HTMLDivElement, depth: number) => {
      elementsMap.current.set(id, {
        element,
        depth,
        currentPosition: { x: 0, y: 0 },
      })
    },
    []
  )

  const unregisterElement = useCallback((id: string) => {
    elementsMap.current.delete(id)
  }, [])

  useAnimationFrame(() => {
    if (!containerRef.current) return

    elementsMap.current.forEach((data) => {
      const strength = (data.depth * sensitivity) / 20
      const newTargetX = mousePositionRef.current.x * strength
      const newTargetY = mousePositionRef.current.y * strength
      const dx = newTargetX - data.currentPosition.x
      const dy = newTargetY - data.currentPosition.y

      data.currentPosition.x += dx * easingFactor
      data.currentPosition.y += dy * easingFactor

      data.element.style.transform = `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, 0)`
    })
  })

  return (
    <FloatingContext.Provider value={{ registerElement, unregisterElement }}>
      <div
        ref={containerRef}
        className={`absolute top-0 left-0 w-full h-full ${className || ''}`}
        {...props}
      >
        {children}
      </div>
    </FloatingContext.Provider>
  )
}

interface FloatingElementProps {
  children: ReactNode
  className?: string
  depth?: number
}

const FloatingElement = ({
  children,
  className,
  depth = 1,
}: FloatingElementProps) => {
  const elementRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(Math.random().toString(36).substring(7))
  const context = useContext(FloatingContext)

  useEffect(() => {
    if (!elementRef.current || !context) return

    const nonNullDepth = depth ?? 0.01
    context.registerElement(idRef.current, elementRef.current, nonNullDepth)
    return () => context.unregisterElement(idRef.current)
  }, [depth, context])

  return (
    <div
      ref={elementRef}
      className={`absolute will-change-transform ${className || ''}`}
    >
      {children}
    </div>
  )
}

// Concierge Icon Component (since it wasn't in lucide-react)
const Concierge = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L12 1L3 7V9C3 10.1 3.9 11 5 11V17C5 18.1 5.9 19 7 19H10V17H14V19H17C18.1 19 19 18.1 19 17V11C20.1 11 21 10.1 21 9ZM11 11.5H13V12.5H11V11.5ZM11 13.5H13V14.5H11V13.5Z"/>
  </svg>
)

// Logo Component - Updated to use new white logo
const FlyincoLogo = ({ className = "", size = "lg" }: { className?: string, size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "h-8",
    md: "h-10", 
    lg: "h-16"
  }
  
  return (
   <div className={`flex items-center ${className}`}>
  <img 
    src="/flyinco-logo.png"  // <-- update with your actual logo file in the /public folder
    alt="Flyinco Travel & Tourism" 
    className={`${sizeClasses[size]} w-auto object-contain`}
  />
</div>
    </div>
  )
}

// Header Component - Reduced padding
const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/90 backdrop-blur-lg border-b border-white/10">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <FlyincoLogo size="md" className="flex-shrink-0" />
          <nav className="hidden md:flex items-center gap-6">
            <a 
              href="#about" 
              className="text-white/70 hover:text-white transition-colors text-sm font-medium"
              aria-label="Learn about Flyinco"
            >
              About
            </a>
            <a 
              href="#services" 
              className="text-white/70 hover:text-white transition-colors text-sm font-medium"
              aria-label="View our services"
            >
              Services
            </a>
            <a 
              href="#waitlist" 
              className="text-white/70 hover:text-white transition-colors text-sm font-medium"
              aria-label="Join our waitlist"
            >
              Join Waitlist
            </a>
          </nav>
          <div className="flex items-center text-xs text-white/60">
            <span className="hidden lg:block">www.flyinco.com</span>
          </div>
        </div>
      </div>
    </header>
  )
}

// Main Component
const FlyincoLandingPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: ''
  })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const heroRef = useRef<HTMLDivElement>(null)

  // Aurora colors
  const COLORS_TOP = ["#1e3a8a", "#7c3aed", "#b91c1c", "#059669"]
  const color = useMotionValue(COLORS_TOP[0])

  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    })
  }, [color])

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, #0f172a 50%, ${color})`
  const border = useMotionTemplate`1px solid ${color}`
  const boxShadow = useMotionTemplate`0px 4px 24px ${color}`

  // Travel icons for image trail
  const travelIcons = [
    <div key="plane" className="w-6 h-6 p-1 bg-blue-500/20 rounded-lg backdrop-blur-sm border border-blue-400/30">
      <Plane className="w-4 h-4 text-blue-300" />
    </div>,
    <div key="hotel" className="w-6 h-6 p-1 bg-purple-500/20 rounded-lg backdrop-blur-sm border border-purple-400/30">
      <Hotel className="w-4 h-4 text-purple-300" />
    </div>,
    <div key="car" className="w-6 h-6 p-1 bg-green-500/20 rounded-lg backdrop-blur-sm border border-green-400/30">
      <Car className="w-4 h-4 text-green-300" />
    </div>,
    <div key="map" className="w-6 h-6 p-1 bg-yellow-500/20 rounded-lg backdrop-blur-sm border border-yellow-400/30">
      <MapPin className="w-4 h-4 text-yellow-300" />
    </div>,
    <div key="compass" className="w-6 h-6 p-1 bg-cyan-500/20 rounded-lg backdrop-blur-sm border border-cyan-400/30">
      <Compass className="w-4 h-4 text-cyan-300" />
    </div>,
    <div key="luggage" className="w-6 h-6 p-1 bg-orange-500/20 rounded-lg backdrop-blur-sm border border-orange-400/30">
      <Luggage className="w-4 h-4 text-orange-300" />
    </div>,
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email) return
    
    setIsSubmitting(true)
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  const scrollToWaitlist = () => {
    document.getElementById('waitlist')?.scrollIntoView({ behavior: 'smooth' })
  }

  const services = [
    { icon: Plane, title: "Flights", description: "Premium flight booking with competitive rates" },
    { icon: Hotel, title: "Hotels", description: "Luxury accommodations worldwide" },
    { icon: Car, title: "Car Booking", description: "Executive transportation solutions" },
    { icon: Concierge, title: "Concierge Services", description: "24/7 premium support team" },
    { icon: Calendar, title: "Trip Planning", description: "Complete itinerary management" },
    { icon: Shield, title: "Travel Insurance", description: "Comprehensive coverage plans" },
    { icon: CreditCard, title: "Expense Management", description: "Corporate billing solutions" },
    { icon: Users, title: "Group Travel", description: "Team and event coordination" }
  ]

  const features = [
    { icon: Clock, title: "24/7 Support", description: "Round-the-clock assistance" },
    { icon: Award, title: "Premium Quality", description: "Curated travel experiences" },
    { icon: HeartHandshake, title: "Personalized Service", description: "Tailored to your needs" },
    { icon: Star, title: "Trusted Partner", description: "Reliable and professional" }
  ]

  return (
    <div className="min-h-screen bg-slate-900 text-white overflow-hidden">
      {/* Header */}
      <Header />

      {/* Hero Section - Reduced padding */}
      <motion.section
        ref={heroRef}
        style={{ backgroundImage }}
        className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden pt-16"
      >
        {/* Image Trail Effect */}
        <ImageTrail containerRef={heroRef}>
          {travelIcons}
        </ImageTrail>

        {/* Floating Background Elements */}
        <Floating sensitivity={-0.5} className="overflow-hidden">
          <FloatingElement depth={0.5} className="top-[10%] left-[15%]">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-xl" />
          </FloatingElement>
          <FloatingElement depth={1} className="top-[20%] right-[20%]">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-yellow-500/20 to-orange-500/20 blur-lg" />
          </FloatingElement>
          <FloatingElement depth={2} className="bottom-[30%] left-[10%]">
            <div className="w-40 h-40 rounded-full bg-gradient-to-br from-indigo-500/20 to-cyan-500/20 blur-2xl" />
          </FloatingElement>
          <FloatingElement depth={1.5} className="bottom-[20%] right-[15%]">
            <div className="w-28 h-28 rounded-full bg-gradient-to-br from-rose-500/20 to-pink-500/20 blur-lg" />
          </FloatingElement>
        </Floating>

        {/* Gradient Tracing Lines */}
        <div className="absolute inset-0 pointer-events-none">
          <GradientTracing
            width={400}
            height={200}
            path="M50,100 Q200,50 350,100"
            gradientColors={["#3b82f6", "#8b5cf6", "#06b6d4"]}
            animationDuration={4}
          />
          <div className="absolute top-1/3 right-0">
            <GradientTracing
              width={300}
              height={150}
              path="M0,75 Q150,25 300,75"
              gradientColors={["#f59e0b", "#ef4444", "#8b5cf6"]}
              animationDuration={3.5}
            />
          </div>
          <div className="absolute bottom-1/4 left-0">
            <GradientTracing
              width={350}
              height={180}
              path="M0,90 Q175,140 350,90"
              gradientColors={["#10b981", "#3b82f6", "#f59e0b"]}
              animationDuration={4.5}
            />
          </div>
        </div>

        {/* Animated grid lines */}
        <div className="absolute inset-0 opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-px h-full bg-gradient-to-b from-transparent via-white/30 to-transparent"
              style={{ left: `${i * 5}%` }}
              animate={{
                opacity: [0.1, 0.3, 0.1],
                scaleY: [1, 1.2, 1],
              }}
              transition={{
                duration: 3 + i * 0.2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm text-sm font-medium">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 text-yellow-400" />
              </motion.div>
              Coming Soon
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Flyinco is
            </span>
            <br />
            <motion.span
              className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-purple-400 to-yellow-400"
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              style={{
                backgroundSize: '200% 200%'
              }}
            >
              Launching Soon
            </motion.span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl lg:text-2xl text-white/70 mb-8 max-w-4xl mx-auto leading-relaxed"
          >
            Premium corporate travel & booking experience redefined for modern businesses across the Middle East and India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12"
          >
            <motion.button
              onClick={scrollToWaitlist}
              style={{ border, boxShadow }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="group relative px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full text-lg font-semibold text-white hover:bg-white/20 transition-all"
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-full"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5 }}
              />
              <span className="relative flex items-center gap-2">
                Join the Waitlist
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </motion.button>
          </motion.div>

          {/* Key Features Grid - Reduced spacing */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 max-w-4xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="text-center p-3 lg:p-4 bg-white/5 rounded-2xl backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all"
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <feature.icon className="w-6 h-6 lg:w-8 lg:h-8 text-blue-400 mx-auto mb-2" />
                <h3 className="text-sm lg:text-base font-semibold text-white mb-1">{feature.title}</h3>
                <p className="text-xs lg:text-sm text-white/60">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Floating particles */}
        {[...Array(30)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-white/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          />
        ))}
      </motion.section>

      {/* About Section - Reduced padding */}
      <section id="about" className="relative py-12 lg:py-16 px-4 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Redefining Corporate Travel
            </h2>
            <p className="text-lg lg:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              Flyinco transforms the way businesses handle travel. Our premium platform combines cutting-edge technology 
              with personalized service to deliver an unparalleled corporate travel experience across KSA, Bahrain, UAE, and India.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Section - Reduced padding and spacing */}
      <section id="services" className="relative py-12 lg:py-16 px-4 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-10"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Our Services
            </h2>
            <p className="text-lg lg:text-xl text-white/70 max-w-4xl mx-auto leading-relaxed">
              Comprehensive travel solutions designed for the modern business traveler.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6"
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
                className="group p-4 lg:p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:bg-white/10 transition-all relative overflow-hidden"
                whileHover={{ scale: 1.05, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {/* Gradient tracing effect on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <GradientTracing
                    width={300}
                    height={200}
                    path="M0,0 L300,0 L300,200 L0,200 Z"
                    gradientColors={["#3b82f6", "#8b5cf6", "#06b6d4"]}
                    animationDuration={2}
                    strokeWidth={1}
                  />
                </div>
                
                <motion.div
                  className="w-12 h-12 lg:w-14 lg:h-14 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-white/20 flex items-center justify-center mx-auto mb-4 relative z-10"
                  whileHover={{ rotateY: 180, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                >
                  <service.icon className="w-6 h-6 lg:w-7 lg:h-7 text-blue-300" />
                </motion.div>
                <h3 className="text-lg lg:text-xl font-semibold text-white mb-2 relative z-10">{service.title}</h3>
                <p className="text-sm lg:text-base text-white/60 relative z-10">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Waitlist Section - Reduced padding */}
      <section id="waitlist" className="relative py-12 lg:py-16 px-4 bg-gradient-to-b from-slate-800 to-slate-900">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-10"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-white/80">
              Be the First to Experience
            </h2>
            <p className="text-lg lg:text-xl text-white/70 max-w-2xl mx-auto">
              Join our exclusive waitlist and get early access to the future of corporate travel.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="p-4 lg:p-6 bg-white/5 backdrop-blur-xl border-white/10 relative overflow-hidden">
              {/* Animated border effect */}
              <div className="absolute inset-0">
                <GradientTracing
                  width={600}
                  height={400}
                  path="M0,0 L600,0 L600,400 L0,400 Z"
                  gradientColors={["#3b82f6", "#8b5cf6", "#f59e0b"]}
                  animationDuration={6}
                  strokeWidth={1}
                />
              </div>
              
              <div className="relative z-10">
                <AnimatePresence mode="wait">
                  {!isSubmitted ? (
                    <motion.form
                      key="form"
                      onSubmit={handleSubmit}
                      className="space-y-4"
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="relative">
                        <Input
                          type="text"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) => handleInputChange('name', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-blue-400 h-11"
                          required
                          aria-label="Your name"
                        />
                      </div>
                      <div className="relative">
                        <Input
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={(e) => handleInputChange('email', e.target.value)}
                          className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-blue-400 h-11"
                          required
                          aria-label="Email address"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="Company Name (Optional)"
                        value={formData.company}
                        onChange={(e) => handleInputChange('company', e.target.value)}
                        className="bg-white/10 border-white/20 text-white placeholder-white/50 focus:border-blue-400 h-11"
                        aria-label="Company name"
                      />
                    </div>

                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold py-3 text-lg relative overflow-hidden h-12"
                      >
                        {isSubmitting ? (
                          <motion.div
                            className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                        ) : (
                          <>
                            <span className="relative z-10">Notify Me When We Launch</span>
                            <motion.div
                              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                              initial={{ x: "-100%" }}
                              whileHover={{ x: "100%" }}
                              transition={{ duration: 0.6 }}
                            />
                          </>
                        )}
                      </Button>
                    </motion.div>
                    </motion.form>
                  ) : (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-8"
                    >
                      <motion.div
                        className="w-16 h-16 rounded-full bg-green-500/20 border border-green-400/30 flex items-center justify-center mx-auto mb-4 relative"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                      >
                        <CheckCircle className="w-8 h-8 text-green-400" />
                        <motion.div
                          className="absolute inset-0 rounded-full border-2 border-green-400/50"
                          animate={{ scale: [1, 1.5], opacity: [1, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      </motion.div>
                      <h3 className="text-xl lg:text-2xl font-bold text-white mb-3">You're on the list!</h3>
                      <p className="text-white/70 text-base">
                        Thank you for joining our waitlist. We'll notify you as soon as Flyinco launches.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Footer - Reduced padding */}
      <footer className="relative bg-slate-900 border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-8 lg:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <FlyincoLogo size="lg" />
              <p className="text-white/60 leading-relaxed text-sm lg:text-base">
                Premium corporate travel & booking experience redefined. 
                Serving businesses across KSA, Bahrain, UAE, and India.
              </p>
              <div className="flex items-center gap-3">
                <Globe className="w-4 h-4 text-purple-400 flex-shrink-0" />
                <span className="text-white/70 text-sm lg:text-base">www.flyinco.com</span>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg lg:text-xl font-semibold text-white">Contact Information</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                  <div className="space-y-1">
                    <p className="text-white/70 text-sm lg:text-base">+966 55 618 2021</p>
                    <p className="text-white/70 text-sm lg:text-base">+973 33 37 2021</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-purple-400 mt-1 flex-shrink-0" />
                  <p className="text-white/70 text-sm lg:text-base">info@flyinco.com</p>
                </div>
              </div>
            </div>

            {/* Office Locations */}
            <div className="space-y-4">
              <h3 className="text-lg lg:text-xl font-semibold text-white">Office Locations</h3>
              <div className="space-y-4">
                <div className="space-y-1">
                  <h4 className="text-white/90 font-medium text-sm">Saudi Arabia</h4>
                  <div className="text-xs text-white/60 leading-relaxed">
                    <p>Al Mousa Center, Tower #4, Floor #5</p>
                    <p>Office #454B, Olaya Main St.</p>
                    <p>Olaya, Riyadh, KSA</p>
                    <p className="text-purple-400">Metro: King Fahad Library (#22, Blue Line)</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <h4 className="text-white/90 font-medium text-sm">Bahrain</h4>
                  <div className="text-xs text-white/60 leading-relaxed">
                    <p>A0227, Zubara Avenue, Awal Street</p>
                    <p>Al Qudaybiyah, Manama, Bahrain</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10 mt-8 pt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-3">
              <div className="text-white/50 text-xs">
                © 2024 Flyinco Travel & Tourism. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating CTA Button */}
      <motion.div
        className="fixed bottom-4 right-4 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.button
          onClick={scrollToWaitlist}
          className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full shadow-2xl backdrop-blur-sm border border-white/20 relative overflow-hidden"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [0, -8, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          aria-label="Join waitlist"
        >
          <Mail className="w-5 h-5 relative z-10" />
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          />
        </motion.button>
      </motion.div>
    </div>
  )
}

export default FlyincoLandingPage
