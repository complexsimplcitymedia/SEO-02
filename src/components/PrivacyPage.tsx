import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Shield, Lock, Mail, Phone } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <Helmet>
        <title>Privacy Policy | Kustom Auto Wrx</title>
        <meta name="description" content="Learn about how Kustom Auto Wrx protects your privacy and handles your personal information." />
        <link rel="canonical" href="https://kustomautowrx.com/privacy" />
      </Helmet>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-white mb-4">
            Privacy Policy & Legal Information
          </h1>
          <p className="text-xl text-gray-300">
            Last Updated: November 1, 2024
          </p>
        </div>

        <div className="space-y-12">
          <section className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Information We Collect</h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <h3 className="text-xl font-semibold text-white">Personal Information</h3>
              <p>
                We collect personal details such as your name, email, phone number, vehicle information, 
                and billing or payment details when you request services or make an inquiry.
              </p>
              
              <h3 className="text-xl font-semibold text-white">Non-Personal Information</h3>
              <p>
                We gather data such as your IP address, browser type, and site usage patterns for 
                analytics and service improvement.
              </p>

              <h3 className="text-xl font-semibold text-white">Cookies</h3>
              <p>
                We use cookies to enhance your experience on the Site. You can disable cookies in your 
                browser settings, but this may affect the Site's functionality.
              </p>
            </div>
          </section>

          <section className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Lock className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">How We Use Your Information</h2>
            </div>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <Shield className="w-4 h-4 text-blue-400 mt-1 mr-2" />
                <span>To schedule and provide auto body and paint services</span>
              </li>
              <li className="flex items-start">
                <Shield className="w-4 h-4 text-blue-400 mt-1 mr-2" />
                <span>To process payments and send invoices</span>
              </li>
              <li className="flex items-start">
                <Shield className="w-4 h-4 text-blue-400 mt-1 mr-2" />
                <span>To communicate with you regarding services, updates, or promotions (with your consent)</span>
              </li>
              <li className="flex items-start">
                <Shield className="w-4 h-4 text-blue-400 mt-1 mr-2" />
                <span>To improve our services and optimize the user experience on our Site</span>
              </li>
            </ul>
          </section>

          <section className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Shield className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Legal Disclaimer</h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>
                KUSTOMAUTOWRX operates under specific terms and conditions. Our services include:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <Shield className="w-4 h-4 text-blue-400 mt-1 mr-2" />
                  <span>High-end paint jobs include a one-year warranty on materials and application</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-4 h-4 text-blue-400 mt-1 mr-2" />
                  <span>Basic paint jobs include a six-month warranty on materials and application</span>
                </li>
                <li className="flex items-start">
                  <Shield className="w-4 h-4 text-blue-400 mt-1 mr-2" />
                  <span>Warranty exclusions apply for damages caused by accidents, misuse, environmental factors, or unauthorized modifications</span>
                </li>
              </ul>
            </div>
          </section>

          <section className="bg-white/10 rounded-xl p-8 backdrop-blur-sm">
            <div className="flex items-center space-x-3 mb-6">
              <Mail className="w-6 h-6 text-blue-400" />
              <h2 className="text-2xl font-bold text-white">Contact Us</h2>
            </div>
            <div className="space-y-4 text-gray-300">
              <p>For privacy-related concerns, reach us at:</p>
              <div className="flex items-center space-x-2">
                <Mail className="w-5 h-5 text-blue-400" />
                <span>info@kustomautowrx.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-blue-400" />
                <span>(470) 545-0570</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}