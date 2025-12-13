import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Menu, 
  X,
  ShieldCheck,
  CreditCard
} from 'lucide-react';

// --- CONFIGURATION ---
const STRIPE_LINK = "https://buy.stripe.com/4gM6oIeqsabr5SYfEy7Re01"; 

// --- Animation Hook ---
const useIntersectionObserver = (options = {}) => {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.unobserve(entry.target);
      }
    }, { threshold: 0.1, ...options });

    const currentElement = elementRef.current;
    if (currentElement) {
      observer.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [options]);

  return [elementRef, isVisible];
};

// --- Components ---

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-slate-900/80 backdrop-blur-md z-50 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl text-white">Select Pump</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#how-it-works" className="text-slate-300 hover:text-indigo-400 font-medium transition-colors">How It Works</a>
            <a 
              href={STRIPE_LINK} 
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg font-medium hover:bg-indigo-400 transition-all shadow-sm hover:shadow-md"
            >
              Get Early Access
            </a>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-300 hover:text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 absolute w-full">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a href="#how-it-works" className="block px-3 py-2 text-slate-300 hover:text-indigo-400 font-medium">How It Works</a>
            <a href={STRIPE_LINK} className="block px-3 py-2 text-indigo-400 font-bold">Join Founder's Club</a>
          </div>
        </div>
      )}
    </nav>
  );
};

const JoinButton = () => {
  return (
    <div className="w-full max-w-md mx-auto flex flex-col items-center">
      <a
        href={STRIPE_LINK}
        className="group relative w-full sm:w-auto bg-indigo-500 text-white px-8 py-4 rounded-lg font-bold text-lg hover:bg-indigo-400 transition-all shadow-lg hover:shadow-indigo-500/25 flex items-center justify-center gap-3 overflow-hidden"
      >
        <span className="relative z-10 flex items-center gap-2">
          Join Founder's Club <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </span>
        {/* Shine effect */}
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-0" />
      </a>
      
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-slate-400">
        <div className="flex items-center gap-1.5">
          <ShieldCheck className="w-4 h-4 text-green-400" />
          <span>Risk-free. Cancel anytime.</span>
        </div>
        <div className="hidden sm:block w-1 h-1 bg-slate-700 rounded-full" />
        <div className="flex items-center gap-1.5">
          <CreditCard className="w-4 h-4 text-slate-400" />
          <span>$8.99/mo (Billed monthly)</span>
        </div>
      </div>
    </div>
  );
};

const AnimatedStep = ({ imageSrc, title, description, delay }) => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <div 
      ref={ref}
      className={`flex flex-col items-center text-center transition-all duration-1000 ease-out transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <div className="relative mb-6 group w-full max-w-xs aspect-[4/3]">
        <div className="absolute inset-0 bg-indigo-900/30 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform"></div>
        <img 
          src={imageSrc} 
          alt={title}
          className="relative rounded-2xl shadow-lg w-full h-full object-cover bg-slate-800 border border-slate-700"
        />
      </div>
      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-slate-300 leading-relaxed max-w-xs">{description}</p>
    </div>
  );
};

const HowItWorks = () => (
  <section id="how-it-works" className="py-24 bg-slate-800/50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-base text-indigo-400 font-semibold tracking-wide uppercase">Simple & Transparent</h2>
        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
          How Select Pump works
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
        <AnimatedStep 
          imageSrc="https://placehold.co/400x300/1e293b/4f46e5?text=Step+1:+Sign+Up"
          title="1. Join the Club"
          description="Sign up for our monthly subscription. It costs less than a single bad fill-up."
          delay={0}
        />
        <AnimatedStep 
          imageSrc="https://placehold.co/400x300/1e293b/4f46e5?text=Step+2:+Pump+Gas"
          title="2. Pump Anywhere"
          description="Don't worry about finding the 'right' station. Fill up wherever is convenient for you."
          delay={200}
        />
        <AnimatedStep 
          imageSrc="https://placehold.co/400x300/1e293b/4f46e5?text=Step+3:+Get+Paid"
          title="3. Get Paid Back"
          description="We automatically calculate the difference between what you paid and the lowest price in town."
          delay={400}
        />
      </div>
    </div>
  </section>
);

const Hero = () => (
  <section id="waitlist" className="pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
      <div className="flex justify-center items-center">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-900/30 border border-indigo-800 text-indigo-300 text-sm font-medium mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-400"></span>
            </span>
            Beta Access Now Open
          </div>
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
            <span className="block xl:inline">Never overpay for</span>{' '}
            <span className="block text-indigo-400 xl:inline">gas again.</span>
          </h1>
          <p className="mt-3 text-base text-slate-300 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl">
            Select Pump is the private membership that pays you back the difference between what you paid and the cheapest gas in your area.
          </p>
          <div className="mt-8 sm:max-w-lg sm:mx-auto text-center">
            <JoinButton />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-slate-900 text-slate-300 py-12 border-t border-slate-800">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-1">
          <span className="font-bold text-xl text-white">Select Pump</span>
          <p className="mt-4 text-sm text-slate-400">
            Automated gas price protection for the modern driver.
          </p>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
            <li><a href={STRIPE_LINK} className="hover:text-white transition-colors">Join Beta</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Support</h4>
          <ul className="space-y-2 text-sm">
            {/* Replace with your email */}
            <li><a href="mailto:jameslongnyli@gmail.com" className="hover:text-white transition-colors">Contact Us</a></li>
          </ul>
        </div>
        <div>
          <h4 className="text-white font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-slate-800 text-center text-sm text-slate-400">
        &copy; {new Date().getFullYear()} Select Pump. All rights reserved.
      </div>
    </div>
  </footer>
);

export default function App() {
  return (
    <div className="min-h-screen bg-slate-900 font-sans text-white selection:bg-indigo-500/30 selection:text-indigo-200">
      <Navigation />
      <main>
        <Hero />
        <HowItWorks />
      </main>
      <Footer />
    </div>
  );
}