import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Sprout, TrendingUp, CloudRain } from 'lucide-react';
import { Language } from '../App';
import { SimpleButton } from './simple-button';

interface OnboardingScreensProps {
  language: Language | null;
  onComplete: () => void;
}

const onboardingData = {
  en: {
    screens: [
      {
        icon: Sprout,
        title: "Smart Crop Recommendations",
        description: "Get AI-powered crop suggestions based on your soil and weather conditions for maximum yield."
      },
      {
        icon: TrendingUp,
        title: "Increase Your Profits",
        description: "Make informed decisions with data-driven insights to boost your farm's productivity and income."
      },
      {
        icon: CloudRain,
        title: "Weather & Climate Support",
        description: "Access real-time weather forecasts and climate data tailored for agricultural planning."
      }
    ],
    next: "Next",
    back: "Back",
    getStarted: "Get Started"
  },
  hi: {
    screens: [
      {
        icon: Sprout,
        title: "स्मार्ट फसल सुझाव",
        description: "अधिकतम उत्पादन के लिए अपनी मिट्टी और मौसम की स्थिति के आधार पर AI-संचालित फसल सुझाव प्राप्त करें।"
      },
      {
        icon: TrendingUp,
        title: "अपना मुनाफा बढ़ाएं",
        description: "अपने खेत की उत्पादकता और आय बढ़ाने के लिए डेटा-आधारित अंतर्दृष्टि के साथ सूचित निर्णय लें।"
      },
      {
        icon: CloudRain,
        title: "मौसम और जलवायु सहायता",
        description: "कृषि योजना के लिए तैयार रीयल-टाइम मौसम पूर्वानुमान और जलवायु डेटा तक पहुंच।"
      }
    ],
    next: "आगे",
    back: "वापस",
    getStarted: "शुरू करें"
  }
};

export function OnboardingScreens({ language, onComplete }: OnboardingScreensProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const langCode = language?.code || 'en';
  const content = onboardingData[langCode as keyof typeof onboardingData] || onboardingData.en;
  const screens = content.screens;

  const nextSlide = () => {
    if (currentSlide < screens.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onComplete();
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const currentScreen = screens[currentSlide];
  const IconComponent = currentScreen.icon;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Progress indicator */}
      <div className="flex justify-center pt-8 pb-4">
        <div className="flex space-x-2">
          {screens.map((_, index) => (
            <div
              key={index}
              className={`h-2 w-8 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-green-600' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
        <div className="w-32 h-32 bg-green-100 rounded-full flex items-center justify-center mb-8">
          <IconComponent className="w-16 h-16 text-green-600" />
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-6 leading-tight">
          {currentScreen.title}
        </h2>
        
        <p className="text-lg text-gray-600 leading-relaxed max-w-sm">
          {currentScreen.description}
        </p>
      </div>

      {/* Navigation */}
      <div className="p-6 flex justify-between items-center">
        <SimpleButton
          onClick={prevSlide}
          variant="ghost"
          className="flex items-center space-x-2 text-gray-500"
          disabled={currentSlide === 0}
        >
          <ChevronLeft className="w-5 h-5" />
          <span>{content.back}</span>
        </SimpleButton>

        <SimpleButton
          onClick={nextSlide}
          className="flex items-center space-x-2 px-8 py-3"
        >
          <span>
            {currentSlide === screens.length - 1 ? content.getStarted : content.next}
          </span>
          <ChevronRight className="w-5 h-5" />
        </SimpleButton>
      </div>
    </div>
  );
}