import React, { useState, useEffect } from 'react';
import { Sprout, Leaf } from 'lucide-react';
import ankurLogo from '../assets/ankur.png';
import farmerBackground from '../assets/farmer.png';

export function SplashScreen() {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  
  const welcomeTexts = [
    "Welcome", // English
    "स्वागत है", // Hindi
    "வரவேற்கிறோம்", // Tamil
    "স্বাগতম", // Bengali
    "स्वागत", // Marathi
    "સ્વાગત", // Gujarati
    "ಸ್ವಾಗತ", // Kannada
    "സ്വാഗതം", // Malayalam
    "ਸਵਾਗਤ", // Punjabi
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prevIndex) => 
        (prevIndex + 1) % welcomeTexts.length
      );
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    // Main container set to relative to position children against it
    <div className="relative h-screen overflow-hidden">
      
      {/* Step 2: Add a div for the background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${farmerBackground})` }}
      ></div>

      {/* Step 3: Add a semi-transparent overlay for text readability */}
      <div className="absolute inset-0 bg-green-900 opacity-80"></div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 opacity-20">
            <Leaf className="w-24 h-24 text-green-200 animate-pulse" />
          </div>
          <div className="absolute bottom-20 right-10 opacity-20">
            <Sprout className="w-32 h-32 text-green-200 animate-bounce" />
          </div>
          <div className="absolute top-1/3 right-20 opacity-10">
            <Leaf className="w-16 h-16 text-green-300 transform rotate-45" />
          </div>
        </div>

        {/* Logo */}
        <img
          src={ankurLogo}
          alt="Ankur App Logo"
          style={{ transform: "scale(1.2)" }}
          className="w-32 h-32 rounded-full shadow-2xl mb-8 relative z-10"
        />

        {/* App name */}
        <h1 className="text-3xl font-bold mb-2 text-center relative z-10 ">
          Ankur
        </h1>
        <p className="text-lg opacity-90 mb-8 text-center relative z-10">
        Empoweing Farmer
        </p>

        {/* Rotating welcome text */}
        <div className="h-16 flex items-center justify-center relative z-10">
          <p className="text-2xl font-medium text-center transition-all duration-300 ease-in-out">
            {welcomeTexts[currentTextIndex]}
          </p>
        </div>

        {/* Loading indicator */}
        <div className="flex space-x-2 mt-8 relative z-10">
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-3 h-3 bg-white rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
}