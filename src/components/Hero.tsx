import React from 'react';
import { ArrowRight, Shield } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface HeroProps {
  onOpenAppointment: () => void;
}

export default function Hero({ onOpenAppointment }: HeroProps) {
  return (
    <main role="main" className="relative overflow-hidden min-h-screen">
      <Helmet>
        <title>Kustom Auto Wrx | Gainesville Auto Customization Experts</title>
        <meta name="description" content="Transform your vehicle with Gainesville's premier auto customization studio. Specializing in wraps, paint, and expert bodywork." />
        <meta property="og:title" content="Kustom Auto Wrx | Gainesville Auto Customization Experts" />
        <meta property="og:description" content="Transform your vehicle with Gainesville's premier auto customization studio. Expert vehicle wraps, custom paint, and professional modifications." />
        <meta property="og:image" content="https://laexoticcarrentalsandsales.com/cdn/shop/files/0FDA0ADD-ADB7-4188-B9A2-CE9D4E8CDBF1.jpg?v=1716627018&width=2048" />
        <meta property="og:url" content="https://kustomautowrx.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Kustom Auto Wrx | Gainesville Auto Customization" />
        <meta name="twitter:description" content="Transform your vehicle with Gainesville's premier auto customization studio." />
        <meta name="twitter:image" content="https://laexoticcarrentalsandsales.com/cdn/shop/files/0FDA0ADD-ADB7-4188-B9A2-CE9D4E8CDBF1.jpg?v=1716627018&width=2048" />
        <meta name="keywords" content="car restoration, auto restoration, vehicle restoration, car customization, auto customization, vehicle customization, car paint job, auto paint job, vehicle paint job, car wrap, auto wrap, vehicle wrap, custom paint job, custom car paint, custom vehicle paint, Gainesville car restoration, Gainesville auto customization, luxury car restoration" />
        <link rel="canonical" href="https://kustomautowrx.com" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="google-site-verification" content="google5685fa3817afba10" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black" />
        <meta name="apple-mobile-web-app-title" content="Kustom Auto Wrx" />
      </Helmet>
      
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/95 via-gray-900/80 to-gray-900/70 z-10" />
      
      <div className="absolute inset-0">
        <img
          src="https://laexoticcarrentalsandsales.com/cdn/shop/files/0FDA0ADD-ADB7-4188-B9A2-CE9D4E8CDBF1.jpg?v=1716627018&width=2048"
          alt="Luxury Vehicle Customization at Kustom Auto Wrx"
          className="w-full h-full object-cover object-center"
          loading="eager"
          fetchpriority="high"
        />
      </div>

      {/* Hidden SEO content for bots */}
      <div className="sr-only">
        <h1>Kustom Auto Wrx - Gainesville's Premier Auto Customization Studio</h1>
        <h2>Expert Vehicle Wraps, Custom Paint, and Professional Modifications</h2>
        <p>
          Located in Gainesville, GA, Kustom Auto Wrx is your trusted destination for high-end vehicle customization. 
          Our services include professional vehicle wraps, custom paint jobs, paint protection, and expert auto body work.
        </p>
        <address>
          2445 Hilton Dr, Ste 125W, Gainesville, GA 30501
          Phone: (470) 545-0570
          Email: info@kustomautowrx.com
        </address>
        <ul>
          <li>Premium Vehicle Wraps</li>
          <li>Custom Paint Jobs</li>
          <li>Paint Protection Films</li>
          <li>Ceramic Coating</li>
          <li>Auto Body Work</li>
          <li>Professional Detailing</li>
        </ul>
      </div>

      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-24 min-h-screen flex items-center justify-between">
        <article className="max-w-2xl">
          <div className="space-y-2 mb-6">
            <h2 className="text-6xl font-bold text-white leading-tight">
              Gainesville's Premiere Auto Customization Shop
            </h2>
          </div>
          
          <div className="space-y-6 text-xl text-gray-300">
            <p>
              Experience unparalleled high-end car restoration and auto body services at Gainesville's leading vehicle customization studio. Our expert craftsmen specialize in premium vehicle wraps, custom paint jobs, and professional modifications for luxury and exotic vehicles. With state-of-the-art facilities and industry-leading techniques, we transform ordinary vehicles into extraordinary masterpieces.
            </p>
            <p>
              From classic car restoration to modern vehicle customization, we deliver exceptional results using industry-leading materials and techniques. Our certified professionals ensure every detail meets the highest standards of automotive excellence, backed by our comprehensive quality guarantee and extensive industry expertise. We take pride in our ability to bring your automotive dreams to life with precision, passion, and unmatched attention to detail.
            </p>
            <p className="font-semibold">
              Trust the blueprint for automotive excellence.
            </p>
          </div>
          
          <div className="mt-8">
            <button 
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-colors"
              aria-label="Schedule a consultation for your vehicle customization"
              onClick={onOpenAppointment}
            >
              Book Now
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-6 mt-12">
            <div className="flex items-center space-x-3 text-blue-400">
              <Shield className="w-5 h-5" />
              <span>Premium Materials</span>
            </div>
            <div className="flex items-center space-x-3 text-blue-400">
              <Shield className="w-5 h-5" />
              <span>Expert Craftsmanship</span>
            </div>
          </div>
        </article>

        <aside className="hidden lg:block bg-black/40 backdrop-blur-sm rounded-xl p-8 max-w-md">
          <h3 className="text-2xl font-bold text-white mb-4">Schedule Now</h3>
          <p className="text-gray-300 mb-6">
            Don't wait! Schedule your appointment today to secure your preferred time slot and avoid extended wait times.
          </p>
          <button
            onClick={onOpenAppointment}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-xl font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            Reserve Your Spot
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </aside>
      </div>
    </main>
  );
}