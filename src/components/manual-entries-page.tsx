import React, { useState } from 'react';
import { ArrowLeft, Sliders, BarChart, Lightbulb } from 'lucide-react';
import { Language, Screen } from '../App';
import { SimpleButton } from './simple-button';
import { LanguageSelector } from './language-selector';
import { Slider } from './ui/slider';

interface ManualEntriesPageProps {
  selectedLanguage: Language | null;
  onNavigate: (screen: Screen) => void;
  onLanguageChange: (language: Language) => void;
}

const manualEntriesContent = {
  en: {
    title: "Manual Entries for Crop Recommendation",
    subtitle: "Adjust soil parameters to get personalized crop recommendations",
    nitrogen: "Nitrogen (N)",
    phosphorus: "Phosphorus (P)",
    potassium: "Potassium (K)",
    ph: "pH Level",
    soilMoisture: "Soil Moisture",
    getRecommendations: "Get Crop Recommendations",
    currentValues: "Current Values",
    optimalRange: "Optimal Range",
    recommendations: "Based on your soil parameters, we recommend:",
    tips: "Tips to improve soil quality:",
    nitrogenTip: "Add organic compost to increase nitrogen levels",
    phosphorusTip: "Use bone meal for phosphorus deficiency",
    potassiumTip: "Wood ash can help boost potassium levels",
    phTip: "Add lime to increase pH or sulfur to decrease pH",
    moistureTip: "Improve drainage or irrigation based on moisture levels"
  },
  hi: {
    title: "फसल सुझाव के लिए मैनुअल एंट्री",
    subtitle: "व्यक्तिगत फसल सुझाव पाने के लिए मिट्टी के पैरामीटर समायोजित करें",
    nitrogen: "नाइट्रोजन (एन)",
    phosphorus: "फास्फोरस (पी)",
    potassium: "पोटेशियम (के)",
    ph: "पीएच स्तर",
    soilMoisture: "मिट्टी की नमी",
    getRecommendations: "फसल सुझाव प्राप्त करें",
    currentValues: "वर्तमान मान",
    optimalRange: "इष्टतम सीमा",
    recommendations: "आपके मिट्टी के पैरामीटर के आधार पर, हम सुझाते हैं:",
    tips: "मिट्टी की गुणवत्ता सुधारने के सुझाव:",
    nitrogenTip: "नाइट्रोजन का स्तर बढ़ाने के लिए जैविक खाद डालें",
    phosphorusTip: "फास्फोरस की कमी के लिए हड्डी का चूर्ण इस्तेमाल करे��",
    potassiumTip: "पोटेशियम का स्तर बढ़ाने के लिए लकड़ी की राख मदद कर सकती है",
    phTip: "पीएच बढ़ाने के लिए चूना या घटाने के लिए सल्फर डालें",
    moistureTip: "नमी के स्तर के आधार पर जल निकासी या सिंचाई में सुधार करें"
  },
  ta: {
    title: "பயிர் பரிந்துரைக்கான கைமுறை பதிவுகள்",
    subtitle: "தனிப்பட்ட பயிர் பரிந்துரைகளைப் பெற மண் அளவுருக்களை சரிசெய்யுங்கள்",
    nitrogen: "நைட்ரஜன் (என்)",
    phosphorus: "பாஸ்பரஸ் (பி)",
    potassium: "பொட்டாசியம் (கே)",
    ph: "பிஎச் அளவு",
    soilMoisture: "மண் ஈரப்பதம்",
    getRecommendations: "பயிர் பரிந்துரைகளைப் பெறுங்கள்",
    currentValues: "தற்போதைய மதிப்புகள்",
    optimalRange: "உகந்த வரம்பு",
    recommendations: "உங்கள் மண் அளவுருக்களின் அடிப்படையில், நாங்கள் பரிந்துரைக்கிறோம்:",
    tips: "மண் தரத்தை மேம்படுத்த குறிப்புகள்:",
    nitrogenTip: "நைட்ரஜன் அளவை அதிகரிக்க இயற்கை உரம் சேர்க்கவும்",
    phosphorusTip: "பாஸ்பரஸ் குறைபாட்டுக்கு எலும்பு தூள் பயன்படுத்தவும்",
    potassiumTip: "பொட்டாசியம் அளவை அதிகரிக்க மர சாம்பல் உதவும்",
    phTip: "பிஎச் அதிகரிக்க சுண்ணாம்பு அல்லது குறைக்க கந்தகம் சேர்க்கவும்",
    moistureTip: "ஈரப்பத அளவின் அடிப்படையில் வடிகால் அல்லது நீர்ப்பாசனத்தை மேம்படுத்துங்கள்"
  }
};

export function ManualEntriesPage({ selectedLanguage, onNavigate, onLanguageChange }: ManualEntriesPageProps) {
  const [soilParams, setSoilParams] = useState({
    nitrogen: [40],
    phosphorus: [30], 
    potassium: [35],
    ph: [6.5],
    soilMoisture: [50]
  });

  const [showRecommendations, setShowRecommendations] = useState(false);

  const langCode = selectedLanguage?.code || 'en';
  const content = manualEntriesContent[langCode as keyof typeof manualEntriesContent] || manualEntriesContent.en;

  const handleSliderChange = (param: string, value: number[]) => {
    setSoilParams(prev => ({
      ...prev,
      [param]: value
    }));
  };

  const handleGetRecommendations = () => {
    setShowRecommendations(true);
  };

  const getRecommendedCrops = () => {
    // Simple logic based on soil parameters
    const crops = [];
    if (soilParams.nitrogen[0] > 60 && soilParams.ph[0] >= 6.0 && soilParams.ph[0] <= 7.5) {
      crops.push("Rice", "Wheat", "Corn");
    } else if (soilParams.phosphorus[0] > 40 && soilParams.ph[0] >= 5.5 && soilParams.ph[0] <= 7.0) {
      crops.push("Tomatoes", "Beans", "Peas");
    } else {
      crops.push("Potatoes", "Carrots", "Onions");
    }
    return crops;
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-green-600 text-white p-6 sticky top-0 z-10 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <SimpleButton
              onClick={() => onNavigate('home')}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-green-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </SimpleButton>
            <div>
              <h1 className="text-xl font-bold">{content.title}</h1>
              <p className="text-green-100 text-sm">{content.subtitle}</p>
            </div>
          </div>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
            variant="header"
          />
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-6 pb-8">
          {/* Parameter Adjustments */}
          <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-6">
            <div className="flex items-center space-x-2 mb-6">
              <Sliders className="w-5 h-5 text-green-600" />
              <h2 className="text-lg font-semibold text-gray-800">{content.currentValues}</h2>
            </div>
            
            <div className="space-y-6">
              {/* Nitrogen */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-700">{content.nitrogen}</label>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-900">{soilParams.nitrogen[0]} mg/kg</span>
                    <p className="text-xs text-gray-500">{content.optimalRange}: 20-80 mg/kg</p>
                  </div>
                </div>
                <Slider
                  value={soilParams.nitrogen}
                  onValueChange={(value) => handleSliderChange('nitrogen', value)}
                  max={100}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Phosphorus */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-700">{content.phosphorus}</label>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-900">{soilParams.phosphorus[0]} mg/kg</span>
                    <p className="text-xs text-gray-500">{content.optimalRange}: 15-60 mg/kg</p>
                  </div>
                </div>
                <Slider
                  value={soilParams.phosphorus}
                  onValueChange={(value) => handleSliderChange('phosphorus', value)}
                  max={80}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Potassium */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-700">{content.potassium}</label>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-900">{soilParams.potassium[0]} mg/kg</span>
                    <p className="text-xs text-gray-500">{content.optimalRange}: 25-100 mg/kg</p>
                  </div>
                </div>
                <Slider
                  value={soilParams.potassium}
                  onValueChange={(value) => handleSliderChange('potassium', value)}
                  max={120}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* pH Level */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-700">{content.ph}</label>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-900">{soilParams.ph[0].toFixed(1)}</span>
                    <p className="text-xs text-gray-500">{content.optimalRange}: 6.0-7.5</p>
                  </div>
                </div>
                <Slider
                  value={soilParams.ph}
                  onValueChange={(value) => handleSliderChange('ph', value)}
                  max={14}
                  min={0}
                  step={0.1}
                  className="w-full"
                />
              </div>

              {/* Soil Moisture */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <label className="text-sm font-medium text-gray-700">{content.soilMoisture}</label>
                  <div className="text-right">
                    <span className="text-sm font-semibold text-gray-900">{soilParams.soilMoisture[0]}%</span>
                    <p className="text-xs text-gray-500">{content.optimalRange}: 40-70%</p>
                  </div>
                </div>
                <Slider
                  value={soilParams.soilMoisture}
                  onValueChange={(value) => handleSliderChange('soilMoisture', value)}
                  max={100}
                  min={0}
                  step={1}
                  className="w-full"
                />
              </div>
            </div>

            <SimpleButton
              onClick={handleGetRecommendations}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white"
            >
              <BarChart className="w-4 h-4 mr-2" />
              {content.getRecommendations}
            </SimpleButton>
          </div>

          {/* Recommendations */}
          {showRecommendations && (
            <div className="bg-white rounded-lg border border-gray-200 shadow-lg p-6">
              <div className="flex items-center space-x-2 mb-4">
                <BarChart className="w-5 h-5 text-green-600" />
                <h2 className="text-lg font-semibold text-gray-800">{content.recommendations}</h2>
              </div>
              
              <div className="grid grid-cols-1 gap-3 mb-6">
                {getRecommendedCrops().map((crop, index) => (
                  <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    <span className="text-green-800 font-medium">{crop}</span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex items-center space-x-2 mb-3">
                  <Lightbulb className="w-4 h-4 text-amber-500" />
                  <h3 className="text-sm font-semibold text-gray-800">{content.tips}</h3>
                </div>
                <div className="space-y-2 text-xs text-gray-600">
                  <p>• {content.nitrogenTip}</p>
                  <p>• {content.phosphorusTip}</p>
                  <p>• {content.potassiumTip}</p>
                  <p>• {content.phTip}</p>
                  <p>• {content.moistureTip}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}