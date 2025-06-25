import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  ChevronDown, 
  Phone, 
  Mail, 
  MapPin, 
  Users, 
  Star, 
  TrendingUp, 
  Shield, 
  Clock,
  Menu,
  X,
  Facebook,
  Instagram,
  Twitter,
  Linkedin
} from 'lucide-react';

// Testimonial Interface
interface Testimonial {
  id: number;
  name: string;
  title: string;
  comment: string;
  rating: number;
  image: string;
}

// Service Interface
interface Service {
  id: number;
  title: string;
  description: string;
  icon: React.ReactNode;
}

// Destination Interface
interface Destination {
  id: number;
  name: string;
  location: string;
  image: string;
  rating: number;
  description: string;
}

// Testimonials Data
const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Aisha Khan",
    title: "Travel Enthusiast",
    comment: "Flyinco made my dream vacation a reality! The service was exceptional, and the destinations were breathtaking.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b9efd5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
  },
  {
    id: 2,
    name: "Omar Al-Farsi",
    title: "Business Traveler",
    comment: "Reliable and efficient service. Flyinco always ensures my business trips are smooth and stress-free.",
    rating: 4,
    image: "https://images.unsplash.com/photo-1570295999919-56ceb7e80295?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80",
  },
  {
    id: 3,
    name: "Fatima Al-Balushi",
    title: "Family Holiday Planner",
    comment: "We had an unforgettable family vacation thanks to Flyinco. The team was attentive to our needs and provided excellent recommendations.",
    rating: 5,
    image: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=699&q=80",
  },
];

// Services Data
const services: Service[] = [
  {
    id: 1,
    title: "Flights Booking",
    description: "Find the best flight deals to your dream destinations with our easy-to-use booking platform.",
    icon: <TrendingUp size={48} />,
  },
  {
    id: 2,
    title: "Hotels & Resorts",
    description: "Discover luxurious accommodations and exclusive offers for your perfect getaway.",
    icon: <Star size={48} />,
  },
  {
    id: 3,
    title: "Tours & Activities",
    description: "Explore the world with our curated tours and activities, designed to create unforgettable memories.",
    icon: <MapPin size={48} />,
  },
  {
    id: 4,
    title: "Travel Insurance",
    description: "Protect your journey with our comprehensive travel insurance plans, ensuring peace of mind.",
    icon: <Shield size={48} />,
  },
  {
    id: 5,
    title: "24/7 Support",
    description: "Our dedicated support team is available around the clock to assist you with any travel-related queries.",
    icon: <Clock size={48} />,
  },
  {
    id: 6,
    title: "Group Travel",
    description: "Plan your group travel with ease, benefiting from our expertise and tailored solutions.",
    icon: <Users size={48} />,
  },
];

// Destinations Data
const destinations: Destination[] = [
  {
    id: 1,
    name: "Paris",
    location: "France",
    image: "https://images.unsplash.com/photo-1493571771870-57cb26cae531?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    rating: 4.8,
    description: "Experience the romance and charm of the City of Lights, with its iconic landmarks and exquisite cuisine.",
  },
  {
    id: 2,
    name: "Santorini",
    location: "Greece",
    image: "https://images.unsplash.com/photo-1568697177477-98495457899e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    rating: 4.9,
    description: "Discover the breathtaking beauty of Santorini, with its stunning sunsets and picturesque villages.",
  },
  {
    id: 3,
    name: "Kyoto",
    location: "Japan",
    image: "https://images.unsplash.com/photo-1535320903729-9304f4c10114?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    rating: 4.7,
    description: "Immerse yourself in the rich culture and history of Kyoto, with its ancient temples and serene gardens.",
  },
];

// Logo Component - Updated to use white logo
const FlyincoLogo = ({ className = "", size = "lg" }: { className?: string, size?: "sm" | "md" | "lg" }) => {
  const sizeClasses = {
    sm: "h-6",
    md: "h-8", 
    lg: "h-10"
  };

  return (
    <div className={`flex items-center ${className}`}>
      <img 
        src="/lovable-uploads/21d9d19e-707e-408e-9bc9-e37e8d1a1bdd.png" 
        alt="Flyinco Travel & Tourism" 
        className={`${sizeClasses[size]} w-auto object-contain`}
      />
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="shrink-0 flex items-center">
              <FlyincoLogo size="md" />
            </div>
            <div className="hidden md:ml-6 md:flex space-x-8">
              <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Home
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Destinations
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Services
              </a>
              <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Contact
              </a>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="outline">Login</Button>
            <Button>Sign Up</Button>
          </div>
          <div className="-mr-2 flex items-center md:hidden">
            <button onClick={toggleMenu} className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? <X className="block h-6 w-6" aria-hidden="true" /> : <Menu className="block h-6 w-6" aria-hidden="true" />}
            </button>
          </div>
        </div>
      </div>
      {/* Mobile menu, show/hide based on menu state. */}
      <div className={isMenuOpen ? "md:hidden" : "hidden"}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          <a href="#" className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">Home</a>
          <a href="#" className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">Destinations</a>
          <a href="#" className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">Services</a>
          <a href="#" className="text-gray-500 hover:bg-gray-100 hover:text-gray-700 block px-3 py-2 rounded-md text-base font-medium">Contact</a>
        </div>
        <div className="pt-4 pb-3 border-t border-gray-200">
          <div className="px-5 space-y-1">
            <Button variant="outline" className="w-full">Login</Button>
            <Button className="w-full">Sign Up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Hero Section Component
const HeroSection = () => {
  return (
    <div className="bg-gray-100 py-20">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4">
          Discover Your Next Adventure with Flyinco
        </h1>
        <p className="text-lg text-gray-700 mb-8">
          Your trusted partner for unforgettable travel experiences.
        </p>
        <Button size="lg">Explore Destinations</Button>
      </div>
    </div>
  );
};

// Services Section Component
const ServicesSection = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <Card key={service.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="text-blue-500 mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Destinations Section Component
const DestinationsSection = () => {
  return (
    <div className="py-16 bg-gray-50">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Popular Destinations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <Card key={destination.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <img
                src={destination.image}
                alt={destination.name}
                className="w-full h-56 object-cover rounded-t-md"
              />
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xl font-semibold">{destination.name}</h3>
                  <Badge variant="secondary">{destination.rating} Rating</Badge>
                </div>
                <p className="text-gray-600 mb-4">{destination.description}</p>
                <Button variant="outline">Explore {destination.location}</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Testimonials Section Component
const TestimonialsSection = () => {
  return (
    <div className="py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">What Our Clients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="shadow-md hover:shadow-lg transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                    <p className="text-gray-500">{testimonial.title}</p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4">{testimonial.comment}</p>
                <div className="flex items-center justify-center">
                  {[...Array(testimonial.rating)].map((_, index) => (
                    <Star key={index} className="text-yellow-500" size={20} />
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

// Contact Section Component
const ContactSection = () => {
  return (
    <div className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Phone className="text-blue-500 mx-auto mb-2" size={32} />
            <p className="text-gray-700">Call us at +968 1234 5678</p>
          </div>
          <div>
            <Mail className="text-blue-500 mx-auto mb-2" size={32} />
            <p className="text-gray-700">Email us at info@flyinco.com</p>
          </div>
          <div>
            <MapPin className="text-blue-500 mx-auto mb-2" size={32} />
            <p className="text-gray-700">Visit us at Muscat, Oman</p>
          </div>
        </div>
        <Button className="mt-8">Get in Touch</Button>
      </div>
    </div>
  );
};

// Footer Component
const Footer = () => {
  return (
    <footer className="bg-gray-800 py-8 text-white">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-4 mb-4">
          <a href="#" className="hover:text-gray-300"><Facebook size={24} /></a>
          <a href="#" className="hover:text-gray-300"><Instagram size={24} /></a>
          <a href="#" className="hover:text-gray-300"><Twitter size={24} /></a>
          <a href="#" className="hover:text-gray-300"><Linkedin size={24} /></a>
        </div>
        <p>&copy; {new Date().getFullYear()} Flyinco Travel & Tourism. All rights reserved.</p>
      </div>
    </footer>
  );
};

// Main Landing Page Component
const FlyincoLandingPage = () => {
  return (
    <div>
      <Navigation />
      <HeroSection />
      <ServicesSection />
      <DestinationsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default FlyincoLandingPage;
