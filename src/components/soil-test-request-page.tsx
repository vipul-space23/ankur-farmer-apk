import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  CheckCircle, 
  Clock,
  FileText,
  Eye,
  Truck,
  Beaker,
} from 'lucide-react';
import { Language, Screen } from '../App';

// Placeholders for external components to ensure the file is runnable
const SimpleButton = ({ onClick, className, children, size, variant }: { onClick: () => void; className?: string; children: React.ReactNode; size?: string; variant?: string; }) => (
    <button onClick={onClick} className={`flex items-center justify-center p-2 rounded-md ${className}`}>
      {children}
    </button>
);
const LanguageSelector = ({ selectedLanguage, onLanguageChange, variant }: { selectedLanguage: Language | null, onLanguageChange: (lang: Language) => void, variant?: string }) => (
    <div className="text-sm">
        <select 
            className="bg-green-700 text-white rounded-md p-1"
            value={selectedLanguage?.code || 'en'} 
            onChange={(e) => onLanguageChange({ 
              code: e.target.value, 
              name: e.target.value === 'en' ? 'English' : 'Hindi',
              nativeName: e.target.value === 'en' ? 'English' : 'हिन्दी',
              flag: e.target.value === 'en' ? '🇬🇧' : '🇮🇳'
            })}
        >
            <option value="en">EN</option>
            <option value="hi">HI</option>
        </select>
    </div>
);

interface SoilTestRequestPageProps {
  selectedLanguage: Language | null;
  onNavigate: (screen: Screen, ...args: any[]) => void;
  onLanguageChange: (language: Language) => void;
}

const soilTestRequestContent = {
  en: {
    title: "Soil Test Request",
    subtitle: "Track your soil analysis status",
    currentStatus: "Current Status",
    requestDetails: "Request Details",
    timeline: "Timeline",
    viewAnalysis: "View Analysis",
    requestId: "Request ID: STR-2024-0315",
    requestDate: "Requested: March 15, 2024",
    sampleLocation: "Pune District, Maharashtra",
    soilType: "Loam Soil",
    intendedCrop: "Rice (Kharif)",
    estimatedCompletion: "Estimated Completion: March 20, 2024",
    statusSteps: {
      requested: "Sample Requested",
      collected: "Sample Collected", 
      lab: "Lab Analysis",
      ready: "Report Ready"
    },
    statusDescriptions: {
      requested: "Your soil test request has been received.",
      collected: "Soil sample has been collected from your field.",
      lab: "Sample is being analyzed at our certified laboratory.",
      ready: "Analysis complete! Your soil report is ready."
    },
    phLevel: "pH Level",
    nutrients: "NPK Levels",
    recommendations: "Recommendations",
  },
  hi: {
    title: "मिट्टी परीक्षण अनुरोध",
    subtitle: "अपनी मिट्टी विश्लेषण स्थिति ट्रैक करें",
    currentStatus: "वर्तमान स्थिति",
    requestDetails: "अनुरोध विवरण",
    timeline: "समयसीमा",
    viewAnalysis: "विश्लेषण देखें",
    requestId: "अनुरोध आईडी: STR-2024-0315",
    requestDate: "अनुरोधित: 15 मार्च, 2024",
    sampleLocation: "पुणे जिला, महाराष्ट्र",
    soilType: "दोमट मिट्टी",
    intendedCrop: "चावल (खरीफ)",
    estimatedCompletion: "अनुमानित पूर्णता: 20 मार्च, 2024",
    statusSteps: {
      requested: "नमूना अनुरोधित",
      collected: "नमूना एकत्रित",
      lab: "प्रयोगशाला विश्लेषण",
      ready: "रिपोर्ट तैयार"
    },
    statusDescriptions: {
      requested: "आपका मिट्टी परीक्षण अनुरोध प्राप्त हो गया है।",
      collected: "आपके खेत से मिट्टी का नमूना एकत्रित किया गया है।",
      lab: "नमूना हमारी प्रमाणित प्रयोगशाला में विश्लेषित हो रहा है।",
      ready: "विश्लेषण पूरा! आपकी मिट्टी रिपोर्ट देखने के लिए तैयार है।"
    },
    phLevel: "पीएच स्तर",
    nutrients: "NPK स्तर",
    recommendations: "सिफारिशें",
  }
};

export function SoilTestRequestPage({ selectedLanguage, onNavigate, onLanguageChange }: SoilTestRequestPageProps) {
  const finalStep = 4;
  const [animatedStep, setAnimatedStep] = useState(0);

  useEffect(() => {
    if (animatedStep < finalStep) {
      const timer = setTimeout(() => {
        setAnimatedStep(animatedStep + 1);
      }, 500); // Animation delay between steps
      return () => clearTimeout(timer);
    }
  }, [animatedStep, finalStep]);

  const langCode = selectedLanguage?.code || 'en';
  const content = soilTestRequestContent[langCode as keyof typeof soilTestRequestContent] || soilTestRequestContent.en;

  const statusSteps = [
    { key: 'requested', icon: <FileText className="w-6 h-6" />, date: "Mar 15, 09:30 AM" },
    { key: 'collected', icon: <Truck className="w-6 h-6" />, date: "Mar 16, 02:15 PM" },
    { key: 'lab', icon: <Beaker className="w-6 h-6" />, date: "Mar 17, 10:00 AM" },
    { key: 'ready', icon: <CheckCircle className="w-6 h-6" />, date: "Mar 18, 04:30 PM" }
  ];

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 shadow-md sticky top-0 z-10">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <SimpleButton
              onClick={() => onNavigate('new-dashboard')}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-green-700 rounded-full"
            >
              <ArrowLeft className="w-6 h-6" />
            </SimpleButton>
            <div>
              <h1 className="text-lg font-semibold">{content.title}</h1>
              <p className="text-green-200 text-sm">{content.subtitle}</p>
            </div>
          </div>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
            variant="header"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Request Details */}
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <h3 className="font-semibold text-gray-800 mb-3">{content.requestDetails}</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-gray-600">{content.requestId.split(':')[0]}:</span><span className="font-mono text-gray-700">STR-2024-0315</span></div>
            <div className="flex justify-between"><span className="text-gray-600">{content.requestDate.split(':')[0]}:</span><span className="font-medium">March 15, 2024</span></div>
            <div className="flex justify-between"><span className="text-gray-600">Location:</span><span className="font-medium">{content.sampleLocation}</span></div>
          </div>
        </div>

        {/* Animated Current Status */}
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <h3 className="font-semibold text-gray-800 mb-4">{content.currentStatus}</h3>
          <div className="relative pl-5">
            {statusSteps.map((step, index) => {
              const isCompleted = index + 1 <= animatedStep;
              const isCurrent = index + 1 === animatedStep;

              return (
                <div key={step.key} className="flex items-start mb-6 last:mb-0">
                  {/* Vertical line */}
                  {index < statusSteps.length - 1 && (
                     <div className="absolute left-5 top-1 bottom-0 w-0.5 bg-gray-200" style={{top: '2.75rem', left: '1.25rem', height: 'calc(100% - 2.75rem)'}}>
                          <div
                            className="absolute w-full bg-green-500 transition-all duration-500 ease-in-out"
                            style={{ height: isCompleted ? '100%' : '0%' }}
                          ></div>
                       </div>
                  )}

                  <div className={`relative z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isCompleted ? 'bg-green-500 text-white scale-110' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.icon}
                  </div>
                  <div className="ml-4 flex-1 min-w-0 pt-1">
                    <div className={`transition-opacity duration-500 ${isCompleted ? 'opacity-100' : 'opacity-50'}`}>
                        <div className="flex items-center justify-between">
                            <p className={`font-semibold ${isCompleted ? 'text-gray-800' : 'text-gray-500'}`}>
                                {content.statusSteps[step.key as keyof typeof content.statusSteps]}
                            </p>
                            {isCompleted && (
                                <span className="text-xs text-green-600 font-medium">{step.date}</span>
                            )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">
                            {content.statusDescriptions[step.key as keyof typeof content.statusDescriptions]}
                        </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
            
      {/* Footer Button - appears when analysis is complete */}
      {animatedStep === finalStep && (
          <div className="p-4 bg-white border-t border-gray-200 shadow-inner animate-fade-in-up">
              <SimpleButton
                onClick={() => onNavigate('soil-analysis')}
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
                variant="default"
              >
                <Eye className="w-5 h-5 mr-2" />
                {content.viewAnalysis}
              </SimpleButton>
          </div>
      )}

      <style>{`
        .animate-fade-in-up {
            animation: fadeInUp 0.5s ease-out;
        }
        @keyframes fadeInUp {
            from { 
                opacity: 0; 
                transform: translateY(20px); 
            }
            to { 
                opacity: 1; 
                transform: translateY(0); 
            }
        }
      `}</style>
    </div>
  );
}