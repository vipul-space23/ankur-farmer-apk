import React, { useState } from 'react';
import { ArrowLeft, Droplets, Calendar, TrendingUp, Package, MapPin, AlertCircle } from 'lucide-react';
import { Language, Screen } from '../App';
import { SimpleButton } from './simple-button';
import { AppHeader } from './app-header';

interface CropDetailsPageProps {
  selectedLanguage: Language | null;
  onNavigate: (screen: Screen) => void;
  onLanguageChange: (language: Language) => void;
}

const cropDetailsContent = {
  en: {
    title: "Crop Recommendations",
    subtitle: "Detailed crop information and guidance",
    recommended: "Recommended Crops",
    cropDetails: "Crop Details",
    sowingTime: "Sowing Time",
    harvestTime: "Harvest Time",
    waterRequirement: "Water Requirement",
    soilType: "Soil Type",
    fertilizers: "Recommended Fertilizers",
    pesticides: "Common Pesticides",
    expectedYield: "Expected Yield",
    nitrogen: "Nitrogen Requirement",
    phosphorus: "Phosphorus Requirement", 
    potassium: "Potassium Requirement",
    temperature: "Optimal Temperature",
    humidity: "Optimal Humidity",
    ph: "Soil pH Range",
    viewDetails: "View Details",
    backToList: "Back to List",
    tips: "Farming Tips",
    diseases: "Common Diseases"
  },
  hi: {
    title: "फसल सुझाव",
    subtitle: "विस्तृत फसल जानकारी और मार्गदर्शन",
    recommended: "सुझाई गई फसलें",
    cropDetails: "फसल विवरण",
    sowingTime: "बुआई का समय",
    harvestTime: "कटाई का समय",
    waterRequirement: "पानी की आवश्यकता",
    soilType: "मिट्टी का प्रकार",
    fertilizers: "सुझाए गए उर्वरक",
    pesticides: "सामान्य कीटनाशक",
    expectedYield: "अपेक्षित उपज",
    nitrogen: "नाइट्रोजन आवश्यकता",
    phosphorus: "फास्फोरस आवश्यकता",
    potassium: "पोटेशियम आवश्यकता", 
    temperature: "अनुकूल तापमान",
    humidity: "अनुकूल आर्द्रता",
    ph: "मिट्टी का pH स्तर",
    viewDetails: "विवरण देखें",
    backToList: "सूची पर वापस",
    tips: "कृषि सुझाव",
    diseases: "सामान्य रोग"
  }
};

// Simplified crop database 
const cropDatabase = {
  en: [
    {
      id: 1,
      name: "Wheat",
      nativeName: "गेहूं",
      confidence: 92,
      image: "https://images.unsplash.com/photo-1715289718087-66a61b7b4c0d?w=400",
      sowingTime: "November - December",
      harvestTime: "April - May",
      waterRequirement: "Medium",
      soilType: "Loamy, well-drained",
      fertilizers: ["Urea", "DAP", "MOP"],
      pesticides: ["Chlorpyrifos", "2,4-D"],
      expectedYield: "25-30 quintals",
      nitrogen: "120-150 kg/ha",
      phosphorus: "60-80 kg/ha",
      potassium: "40-60 kg/ha",
      temperature: "15-25°C",
      humidity: "50-70%",
      ph: "6.0-7.5",
      tips: ["Sow after first irrigation", "Apply nitrogen in splits"],
      diseases: ["Rust", "Bunt"]
    },
    {
      id: 2,
      name: "Rice",
      nativeName: "चावल",
      confidence: 87,
      image: "https://images.unsplash.com/photo-1670922757779-9472463fe234?w=400",
      sowingTime: "June - July",
      harvestTime: "October - November",
      waterRequirement: "High",
      soilType: "Clay, waterlogged",
      fertilizers: ["Urea", "DAP", "MOP"],
      pesticides: ["Cartap", "Imidacloprid"],
      expectedYield: "40-50 quintals",
      nitrogen: "100-120 kg/ha",
      phosphorus: "50-60 kg/ha",
      potassium: "40-50 kg/ha",
      temperature: "20-35°C",
      humidity: "80-90%",
      ph: "5.5-6.5",
      tips: ["Maintain 2-3 cm water level", "Control weeds early"],
      diseases: ["Blast", "Sheath blight"]
    },
    {
      id: 3,
      name: "Maize",
      nativeName: "मक्का",
      confidence: 84,
      image: "https://images.unsplash.com/photo-1649251037566-6881b4956615?w=400",
      sowingTime: "June - July",
      harvestTime: "October - November",
      waterRequirement: "Medium",
      soilType: "Well-drained loamy",
      fertilizers: ["Urea", "DAP", "MOP"],
      pesticides: ["Atrazine", "Chlorpyrifos"],
      expectedYield: "35-40 quintals",
      nitrogen: "150-200 kg/ha",
      phosphorus: "60-80 kg/ha",
      potassium: "40-60 kg/ha",
      temperature: "25-30°C",
      humidity: "60-80%",
      ph: "6.0-7.0",
      tips: ["Plant at proper spacing", "Side dress with nitrogen"],
      diseases: ["Leaf blight", "Stalk rot"]
    },
    {
      id: 4,
      name: "Cotton",
      nativeName: "कपास",
      confidence: 89,
      image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=400",
      sowingTime: "April - May",
      harvestTime: "October - January",
      waterRequirement: "Medium",
      soilType: "Black cotton soil",
      fertilizers: ["Urea", "DAP", "MOP"],
      pesticides: ["Imidacloprid", "Cypermethrin"],
      expectedYield: "15-20 quintals",
      nitrogen: "100-150 kg/ha",
      phosphorus: "50-75 kg/ha",
      potassium: "50-75 kg/ha",
      temperature: "25-35°C",
      humidity: "65-85%",
      ph: "6.5-8.0",
      tips: ["Maintain soil moisture", "Regular pest monitoring"],
      diseases: ["Wilt", "Leaf curl virus"]
    },
    {
      id: 5,
      name: "Soybean",
      nativeName: "सोयाबीन",
      confidence: 85,
      image: "https://images.unsplash.com/photo-1612528443702-f6741f70a049?w=400",
      sowingTime: "June - July",
      harvestTime: "October - November",
      waterRequirement: "Medium",
      soilType: "Well-drained black soil",
      fertilizers: ["DAP", "MOP", "Rhizobium"],
      pesticides: ["Imazethapyr", "Quinalphos"],
      expectedYield: "20-25 quintals",
      nitrogen: "20-30 kg/ha",
      phosphorus: "60-80 kg/ha",
      potassium: "30-40 kg/ha",
      temperature: "26-30°C",
      humidity: "70-85%",
      ph: "6.0-7.2",
      tips: ["Inoculate seeds with rhizobium", "Control weeds early"],
      diseases: ["Yellow mosaic virus", "Rust"]
    }
  ]
};

export function CropDetailsPage({ selectedLanguage, onNavigate, onLanguageChange }: CropDetailsPageProps) {
  const [selectedCrop, setSelectedCrop] = useState<typeof cropDatabase.en[0] | null>(null);
  
  const langCode = selectedLanguage?.code || 'en';
  const content = cropDetailsContent[langCode as keyof typeof cropDetailsContent] || cropDetailsContent.en;
  const crops = cropDatabase.en;

  if (selectedCrop) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Header */}
        <AppHeader
          title={`${selectedCrop.name} (${selectedCrop.nativeName})`}
          selectedLanguage={selectedLanguage}
          onLanguageChange={onLanguageChange}
          onBack={() => setSelectedCrop(null)}
        />

        {/* Crop Details Content */}
        <div className="flex-1 p-4 overflow-y-auto space-y-6">
          {/* Crop Image */}
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <img
              src={selectedCrop.image}
              alt={selectedCrop.name}
              className="w-full h-48 object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400';
              }}
            />
            <div className="p-4">
              <div className="bg-green-500 px-3 py-1 rounded-full inline-block">
                <span className="text-sm font-medium text-white">{selectedCrop.confidence}% Match</span>
              </div>
            </div>
          </div>

          {/* Basic Information */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Basic Information</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-sm text-gray-600">{content.sowingTime}</div>
                  <div className="font-medium">{selectedCrop.sowingTime}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Calendar className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-sm text-gray-600">{content.harvestTime}</div>
                  <div className="font-medium">{selectedCrop.harvestTime}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <Droplets className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-600">{content.waterRequirement}</div>
                  <div className="font-medium">{selectedCrop.waterRequirement}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                <MapPin className="w-5 h-5 text-orange-600" />
                <div>
                  <div className="text-sm text-gray-600">{content.soilType}</div>
                  <div className="font-medium">{selectedCrop.soilType}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Technical Parameters */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Technical Requirements</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
                <div>
                  <div className="text-sm text-gray-600">{content.nitrogen}</div>
                  <div className="font-medium">{selectedCrop.nitrogen}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Package className="w-5 h-5 text-blue-600" />
                <div>
                  <div className="text-sm text-gray-600">{content.phosphorus}</div>
                  <div className="font-medium">{selectedCrop.phosphorus}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-yellow-50 rounded-lg">
                <TrendingUp className="w-5 h-5 text-yellow-600" />
                <div>
                  <div className="text-sm text-gray-600">{content.potassium}</div>
                  <div className="font-medium">{selectedCrop.potassium}</div>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg">
                <Droplets className="w-5 h-5 text-red-600" />
                <div>
                  <div className="text-sm text-gray-600">{content.temperature}</div>
                  <div className="font-medium">{selectedCrop.temperature}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Fertilizers & Pesticides */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Inputs Required</h2>
            
            <div className="mb-6">
              <h3 className="font-medium text-gray-800 mb-3">{content.fertilizers}</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCrop.fertilizers.map((fertilizer, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {fertilizer}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-medium text-gray-800 mb-3">{content.pesticides}</h3>
              <div className="flex flex-wrap gap-2">
                {selectedCrop.pesticides.map((pesticide, index) => (
                  <span key={index} className="px-3 py-1 bg-orange-100 text-orange-800 rounded-full text-sm">
                    {pesticide}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Farming Tips */}
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
            <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
              <AlertCircle className="w-6 h-6 mr-2" />
              {content.tips}
            </h2>
            <div className="space-y-3">
              {selectedCrop.tips.map((tip, index) => (
                <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-blue-100">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                  <p className="text-gray-700">{tip}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Disease Management */}
          <div className="bg-red-50 rounded-lg border border-red-200 p-6">
            <h2 className="text-xl font-bold text-red-800 mb-4">{content.diseases}</h2>
            <div className="flex flex-wrap gap-2">
              {selectedCrop.diseases.map((disease, index) => (
                <span key={index} className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm">
                  {disease}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <AppHeader
        title={content.title}
        selectedLanguage={selectedLanguage}
        onLanguageChange={onLanguageChange}
        onBack={() => onNavigate('home')}
      />
      <div className="bg-green-600 text-white px-6 pb-2">
        <p className="text-green-100">{content.subtitle}</p>
      </div>

      {/* Crops List */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{content.recommended}</h2>
        
        <div className="space-y-3">
          {crops.map((crop) => (
            <div key={crop.id} className="bg-white rounded-lg border border-green-100 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <img
                    src={crop.image}
                    alt={crop.name}
                    className="w-16 h-16 rounded-lg object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=400';
                    }}
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">{crop.name}</h3>
                    <p className="text-sm text-gray-500">{crop.nativeName}</p>
                    <div className="flex items-center mt-2">
                      <div className="bg-green-100 px-2 py-1 rounded-full">
                        <span className="text-xs font-medium text-green-800">{crop.confidence}% Match</span>
                      </div>
                    </div>
                  </div>
                </div>
                <SimpleButton
                  onClick={() => setSelectedCrop(crop)}
                  size="sm"
                  className="text-sm"
                >
                  {content.viewDetails}
                </SimpleButton>
              </div>
              
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium">{content.sowingTime}:</span> {crop.sowingTime}
                </div>
                <div>
                  <span className="font-medium">{content.expectedYield}:</span> {crop.expectedYield}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}