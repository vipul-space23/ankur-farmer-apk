import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Beaker, 
  MapPin, 
  Clock, 
  CheckCircle, 
  Download,
  Sprout,
  TrendingUp,
  ChevronRight
} from 'lucide-react';
import { Language, Screen } from '../App';
import { SimpleButton } from './simple-button';
import { LanguageSelector } from './language-selector';

interface SoilTestPageProps {
  selectedLanguage: Language | null;
  onNavigate: (screen: Screen, ...args: any[]) => void;
  onLanguageChange: (language: Language) => void;
}

const soilTestContent = {
  en: {
    title: "Soil Test Request",
    subtitle: "Get accurate soil analysis for better farming",
    requestTest: "Request Soil Test",
    selectSoilType: "Select Soil Type",
    intendedCrop: "Intended Crop",
    farmLocation: "Farm Location",
    expectedTimeline: "Expected Timeline",
    currentStatus: "Current Status",
    reportReady: "Soil Report Ready",
    downloadReport: "Download PDF Report",
    viewRecommendations: "View Recommendations",
    estimatedReport: "Estimated Report in: 3 days",
    soilTypes: {
      clay: "Clay Soil",
      sandy: "Sandy Soil", 
      loam: "Loam Soil",
      silt: "Silt Soil",
      peat: "Peat Soil",
      chalk: "Chalk Soil"
    },
    crops: {
      rice: "Rice",
      wheat: "Wheat",
      cotton: "Cotton",
      sugarcane: "Sugarcane",
      soybean: "Soybean",
      maize: "Maize"
    },
    statusSteps: {
      requested: "Sample Requested",
      collected: "Collected",
      lab: "Sent to Lab",
      ready: "Report Ready"
    },
    soilReport: {
      title: "Soil Analysis Report",
      phLevel: "pH Level",
      nitrogen: "Nitrogen (N)",
      phosphorus: "Phosphorus (P)",
      potassium: "Potassium (K)",
      organicMatter: "Organic Matter",
      moisture: "Moisture Content",
      optimal: "Optimal",
      low: "Low",
      high: "High",
      recommendations: "Recommendations",
      suggestedCrops: "Suggested Crops with Yield Prediction",
      nextActions: "Next Action Suggestions"
    },
    recommendations: {
      fertilizer: "Apply Urea: 20kg/acre for nitrogen boost",
      pesticide: "Monitor for pests during early growth stage",
      irrigation: "Irrigate every 7 days for optimal growth",
      organic: "Add compost to improve soil structure"
    },
    cropSuggestions: [
      { crop: "Rice", yield: "20 quintals/acre", profit: "High" },
      { crop: "Wheat", yield: "15 quintals/acre", profit: "Medium" },
      { crop: "Soybean", yield: "12 quintals/acre", profit: "Medium" }
    ]
  },
  hi: {
    title: "मिट्टी परीक्षण अनुरोध",
    subtitle: "बेहतर खेती के लिए सटीक मिट्टी विश्लेषण प्राप्त करें",
    requestTest: "मिट्टी परीक्षण का अनुरोध",
    selectSoilType: "मिट्टी का प्रकार चुनें",
    intendedCrop: "इच्छित फसल",
    farmLocation: "खेत का स्थान",
    expectedTimeline: "अपेक्षित समयसीमा",
    currentStatus: "वर्तमान स्थिति",
    reportReady: "मिट्टी रिपोर्ट तैयार",
    downloadReport: "पीडीएफ रिपोर्ट डाउनलोड करें",
    viewRecommendations: "सिफारिशें देखें",
    estimatedReport: "अनुमानित रिपोर्ट: 3 दिनों में",
    soilTypes: {
      clay: "चिकनी मिट्टी",
      sandy: "रेतीली मिट्टी",
      loam: "दोमट मिट्टी",
      silt: "गाद मिट्टी",
      peat: "पीट मिट्टी",
      chalk: "चॉक मिट्टी"
    },
    crops: {
      rice: "चावल",
      wheat: "गेहूं",
      cotton: "कपास",
      sugarcane: "गन्ना",
      soybean: "सोयाबीन",
      maize: "मक्का"
    },
    statusSteps: {
      requested: "नमूना अनुरोधित",
      collected: "एकत्रित",
      lab: "लैब भेजा गया",
      ready: "रिपोर्ट तैयार"
    },
    soilReport: {
      title: "मिट्टी विश्लेषण रिपोर्ट",
      phLevel: "पीएच स्तर",
      nitrogen: "नाइट्रोजन (एन)",
      phosphorus: "फास्फोरस (पी)",
      potassium: "पोटेशियम (के)",
      organicMatter: "जैविक पदार्थ",
      moisture: "नमी सामग्री",
      optimal: "उत्तम",
      low: "कम",
      high: "अधिक",
      recommendations: "सिफारिशें",
      suggestedCrops: "उपज पूर्वानुमान के साथ सुझाई गई फसलें",
      nextActions: "अगली कार्रवाई सुझाव"
    },
    recommendations: {
      fertilizer: "नाइट्रोजन बूस्ट के लिए यूरिया: 20 किलो/एकड़ लगाएं",
      pesticide: "शुरुआती विकास चरण में कीटों की निगरानी करें",
      irrigation: "इष्टतम विकास के लिए हर 7 दिन सिंचाई करें",
      organic: "मिट्टी की संरचना सुधारने के लिए खाद डालें"
    },
    cropSuggestions: [
      { crop: "चावल", yield: "20 क्विंटल/एकड़", profit: "अधिक" },
      { crop: "गेहूं", yield: "15 क्विंटल/एकड़", profit: "मध्यम" },
      { crop: "सोयाबीन", yield: "12 क्विंटल/एकड़", profit: "मध्यम" }
    ]
  }
};

const mockSoilData = {
  ph: 6.5,
  nitrogen: 2.1,
  phosphorus: 18.5,
  potassium: 145,
  organicMatter: 3.2,
  moisture: 22.5
};

export function SoilTestPage({ selectedLanguage, onNavigate, onLanguageChange }: SoilTestPageProps) {
  const [selectedSoilType, setSelectedSoilType] = useState('');
  const [selectedCrop, setSelectedCrop] = useState('');
  const [currentStep, setCurrentStep] = useState(0);


  const langCode = selectedLanguage?.code || 'en';
  const content = soilTestContent[langCode as keyof typeof soilTestContent] || soilTestContent.en;

  const statusSteps = [
    { key: 'requested', icon: '📋', completed: true },
    { key: 'collected', icon: '🚚', completed: true },
    { key: 'lab', icon: '🔬', completed: true },
    { key: 'ready', icon: '✅', completed: true }
  ];

  const handleRequestTest = () => {
    if (selectedSoilType && selectedCrop) {
      // Navigate to soil test request page to show status
      onNavigate('soil-test-request');
    }
  };

  const getSoilValue = (value: number, optimal: [number, number]) => {
    if (value < optimal[0]) return content.soilReport.low;
    if (value > optimal[1]) return content.soilReport.high;
    return content.soilReport.optimal;
  };

  const getSoilValueColor = (value: number, optimal: [number, number]) => {
    if (value < optimal[0]) return 'text-red-600';
    if (value > optimal[1]) return 'text-orange-600';
    return 'text-green-600';
  };



  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-green-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <SimpleButton
              onClick={() => onNavigate('new-dashboard')}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-green-700"
            >
              <ArrowLeft className="w-6 h-6" />
            </SimpleButton>
            <div>
              <h1 className="text-xl font-bold">{content.title}</h1>
              <p className="text-green-100">{content.subtitle}</p>
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
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Status Tracker */}
        {currentStep > 0 && (
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">{content.currentStatus}</h2>
            <div className="flex items-center justify-between">
              {statusSteps.map((step, index) => (
                <div key={step.key} className="flex flex-col items-center space-y-2">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl ${
                    step.completed ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.icon}
                  </div>
                  <span className={`text-xs text-center ${
                    step.completed ? 'text-green-600' : 'text-gray-500'
                  }`}>
                    {content.statusSteps[step.key as keyof typeof content.statusSteps]}
                  </span>
                  {index < statusSteps.length - 1 && (
                    <div className={`w-16 h-1 ${
                      step.completed ? 'bg-green-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            {currentStep === 4 && (
              <div className="mt-6 p-4 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-6 h-6 text-green-600" />
                  <div>
                    <div className="font-semibold text-green-800">{content.reportReady} ✅</div>
                    <div className="text-sm text-green-600">pH: 6.5, NPK levels, Moisture analyzed</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Request Form */}
        {currentStep === 0 && (
          <div className="space-y-6">
            {/* Soil Type Selection */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">{content.selectSoilType}</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(content.soilTypes).map(([key, label]) => (
                  <SimpleButton
                    key={key}
                    onClick={() => setSelectedSoilType(key)}
                    variant={selectedSoilType === key ? "default" : "outline"}
                    className={`h-12 ${
                      selectedSoilType === key 
                        ? "bg-green-600 text-white" 
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {label}
                  </SimpleButton>
                ))}
              </div>
            </div>

            {/* Intended Crop */}
            <div className="bg-white rounded-xl shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">{content.intendedCrop}</h3>
              <div className="grid grid-cols-2 gap-3">
                {Object.entries(content.crops).map(([key, label]) => (
                  <SimpleButton
                    key={key}
                    onClick={() => setSelectedCrop(key)}
                    variant={selectedCrop === key ? "default" : "outline"}
                    className={`h-12 ${
                      selectedCrop === key 
                        ? "bg-green-600 text-white" 
                        : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {label}
                  </SimpleButton>
                ))}
              </div>
            </div>

            {/* Location & Timeline */}
            <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-gray-600" />
                <div>
                  <div className="text-sm text-gray-600">{content.farmLocation}</div>
                  <div className="font-medium">Pune District, Maharashtra</div>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Clock className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-sm text-blue-600">{content.expectedTimeline}</div>
                  <div className="font-medium text-blue-800">⏳ {content.estimatedReport}</div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <SimpleButton
              onClick={handleRequestTest}
              disabled={!selectedSoilType || !selectedCrop}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-4 disabled:opacity-50"
            >
              <Beaker className="w-5 h-5 mr-2" />
              {content.requestTest}
            </SimpleButton>
          </div>
        )}
      </div>
    </div>
  );
}