import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Download,
  Sprout,
  TrendingUp,
  ChevronRight,
  BarChart3,
  Beaker,
  Droplets,
  Leaf
} from 'lucide-react';
import { Language, Screen } from '../App';
import { SimpleButton } from './simple-button';
import { LanguageSelector } from './language-selector';

interface SoilAnalysisPageProps {
  selectedLanguage: Language | null;
  onNavigate: (screen: Screen, ...args: any[]) => void;
  onLanguageChange: (language: Language) => void;
}

const soilAnalysisContent = {
  en: {
    title: "Soil Analysis Report",
    subtitle: "Complete Field Analysis Results",
    downloadReport: "Download PDF Report",
    viewRecommendations: "View Detailed Recommendations",
    shareReport: "Share Report",
    soilHealth: "Soil Health Score",
    parameters: "Soil Parameters",
    recommendations: "Key Recommendations",
    cropSuggestions: "Recommended Crops",
    nextActions: "Next Action Steps",
    phLevel: "pH Level",
    nitrogen: "Nitrogen (N)",
    phosphorus: "Phosphorus (P)",
    potassium: "Potassium (K)",
    organicMatter: "Organic Matter",
    moisture: "Moisture Content",
    optimal: "Optimal",
    low: "Low",
    high: "High",
    moderate: "Moderate",
    excellent: "Excellent",
    good: "Good",
    poor: "Poor",
    healthScore: "85/100",
    healthStatus: "Good Soil Health",
    reportDate: "Report Generated: March 15, 2024",
    sampleLocation: "Sample Location: Field A, Pune District",
    labInfo: "Tested at: Agricultural Lab, Maharashtra",
    cropRecommendations: [
      { 
        crop: "Rice", 
        yield: "22-25 quintals/acre", 
        profit: "High",
        suitability: 92,
        season: "Kharif"
      },
      { 
        crop: "Wheat", 
        yield: "18-20 quintals/acre", 
        profit: "Medium",
        suitability: 78,
        season: "Rabi"
      },
      { 
        crop: "Soybean", 
        yield: "15-18 quintals/acre", 
        profit: "Medium",
        suitability: 85,
        season: "Kharif"
      }
    ],
    actionItems: [
      {
        title: "Apply Organic Fertilizer",
        description: "Add 500kg compost per acre to improve soil structure",
        priority: "High",
        timeline: "Before next sowing"
      },
      {
        title: "Phosphorus Enhancement",
        description: "Apply DAP fertilizer 20kg per acre",
        priority: "Medium", 
        timeline: "During land preparation"
      },
      {
        title: "Water Management",
        description: "Install drip irrigation to optimize water usage",
        priority: "Medium",
        timeline: "Next 2 months"
      },
      {
        title: "Soil Testing Schedule",
        description: "Re-test soil after 6 months",
        priority: "Low",
        timeline: "September 2024"
      }
    ]
  },
  hi: {
    title: "मिट्टी विश्लेषण रिपोर्ट",
    subtitle: "पूर्ण क्षेत्र विश्लेषण परिणाम",
    downloadReport: "पीडीएफ रिपोर्ट डाउनलोड करें",
    viewRecommendations: "विस्तृत सिफारिशें देखें",
    shareReport: "रिपोर्ट साझा करें",
    soilHealth: "मिट्टी स्वास्थ्य स्कोर",
    parameters: "मिट्टी के मापदंड",
    recommendations: "मुख्य सिफारिशें",
    cropSuggestions: "अनुशंसित फसलें",
    nextActions: "अगले कार्य चरण",
    phLevel: "पीएच स्तर",
    nitrogen: "नाइट्रोजन (एन)",
    phosphorus: "फास्फोरस (पी)",
    potassium: "पोटेशियम (के)",
    organicMatter: "जैविक पदार्थ",
    moisture: "नमी सामग्री",
    optimal: "उत्तम",
    low: "कम",
    high: "अधिक",
    moderate: "मध्यम",
    excellent: "उत्कृष्ट",
    good: "अच्छा",
    poor: "खराब",
    healthScore: "85/100",
    healthStatus: "अच्छा मिट्टी स्वास्थ्य",
    reportDate: "रिपोर्ट जेनरेटेड: 15 मार्च, 2024",
    sampleLocation: "नमूना स्थान: खेत ए, पुणे जिला",
    labInfo: "परीक्षण स्थान: कृषि प्रयोगशाला, महाराष्ट्र",
    cropRecommendations: [
      { 
        crop: "चावल", 
        yield: "22-25 क्विंटल/एकड़", 
        profit: "अधिक",
        suitability: 92,
        season: "खरीफ"
      },
      { 
        crop: "गेहूं", 
        yield: "18-20 क्विंटल/एकड़", 
        profit: "मध्यम",
        suitability: 78,
        season: "रबी"
      },
      { 
        crop: "सोयाबीन", 
        yield: "15-18 क्विंटल/एकड़", 
        profit: "मध्यम",
        suitability: 85,
        season: "खरीफ"
      }
    ],
    actionItems: [
      {
        title: "जैविक उर्वरक लगाएं",
        description: "मिट्टी की संरचना सुधारने के लिए 500 किलो खाद प्रति एकड़ डालें",
        priority: "उच्च",
        timeline: "अगली बुवाई से पहले"
      },
      {
        title: "फास्फोरस वृद्धि",
        description: "DAP उर्वरक 20 किलो प्रति एकड़ लगाएं",
        priority: "मध्यम",
        timeline: "भूमि तैयारी के दौरान"
      },
      {
        title: "जल प्रबंधन",
        description: "पानी के उपयोग को अनुकूलित करने के लिए ड्रिप सिंचाई स्थापित करें",
        priority: "मध्यम",
        timeline: "अगले 2 महीने"
      },
      {
        title: "मिट्टी परीक्षण कार्यक्रम",
        description: "6 महीने बाद मिट्टी का पुन: परीक्षण करें",
        priority: "कम",
        timeline: "सितंबर 2024"
      }
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

export function SoilAnalysisPage({ selectedLanguage, onNavigate, onLanguageChange }: SoilAnalysisPageProps) {
  const langCode = selectedLanguage?.code || 'en';
  const content = soilAnalysisContent[langCode as keyof typeof soilAnalysisContent] || soilAnalysisContent.en;

  const getSoilValue = (value: number, optimal: [number, number]) => {
    if (value < optimal[0]) return content.low;
    if (value > optimal[1]) return content.high;
    return content.optimal;
  };

  const getSoilValueColor = (value: number, optimal: [number, number]) => {
    if (value < optimal[0]) return 'text-red-600';
    if (value > optimal[1]) return 'text-orange-600';
    return 'text-green-600';
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High':
      case 'उच्च':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium':
      case 'मध्यम':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'Low':
      case 'कम':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 shadow-md">
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
        {/* Report Info */}
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="text-center space-y-2">
            <div className="text-sm text-gray-600">{content.reportDate}</div>
            <div className="text-sm text-gray-600">{content.sampleLocation}</div>
            <div className="text-xs text-gray-500">{content.labInfo}</div>
          </div>
        </div>

        {/* Soil Health Score */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-3">
              <BarChart3 className="w-8 h-8 text-green-600" />
              <div>
                <h2 className="text-lg font-semibold text-gray-800">{content.soilHealth}</h2>
                <p className="text-sm text-gray-600">{content.healthStatus}</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="w-32 h-32 mx-auto relative">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#e5e7eb"
                    strokeWidth="8"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#16a34a"
                    strokeWidth="8"
                    fill="none"
                    strokeDasharray={`${85 * 3.14} ${100 * 3.14}`}
                    strokeLinecap="round"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{content.healthScore}</div>
                    <div className="text-xs text-gray-600">{content.good}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Soil Parameters */}
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Beaker className="w-5 h-5 mr-2 text-green-600" />
            {content.parameters}
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600">{content.phLevel}</span>
                <span className={`text-xs font-medium ${getSoilValueColor(mockSoilData.ph, [6.0, 7.0])}`}>
                  {getSoilValue(mockSoilData.ph, [6.0, 7.0])}
                </span>
              </div>
              <div className="text-lg font-bold text-gray-800">{mockSoilData.ph}</div>
            </div>

            <div className="p-3 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600">{content.nitrogen}</span>
                <span className={`text-xs font-medium ${getSoilValueColor(mockSoilData.nitrogen, [1.5, 3.0])}`}>
                  {getSoilValue(mockSoilData.nitrogen, [1.5, 3.0])}
                </span>
              </div>
              <div className="text-lg font-bold text-gray-800">{mockSoilData.nitrogen}%</div>
            </div>

            <div className="p-3 bg-orange-50 rounded-lg border border-orange-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600">{content.phosphorus}</span>
                <span className={`text-xs font-medium ${getSoilValueColor(mockSoilData.phosphorus, [15, 25])}`}>
                  {getSoilValue(mockSoilData.phosphorus, [15, 25])}
                </span>
              </div>
              <div className="text-lg font-bold text-gray-800">{mockSoilData.phosphorus} ppm</div>
            </div>

            <div className="p-3 bg-purple-50 rounded-lg border border-purple-200">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600">{content.potassium}</span>
                <span className={`text-xs font-medium ${getSoilValueColor(mockSoilData.potassium, [120, 180])}`}>
                  {getSoilValue(mockSoilData.potassium, [120, 180])}
                </span>
              </div>
              <div className="text-lg font-bold text-gray-800">{mockSoilData.potassium} ppm</div>
            </div>
          </div>
        </div>

        {/* Crop Recommendations */}
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Sprout className="w-5 h-5 mr-2 text-green-600" />
            {content.cropSuggestions}
          </h3>
          <div className="space-y-3">
            {content.cropRecommendations.map((crop, index) => (
              <div key={index} className="p-3 bg-green-50 rounded-lg border border-green-200">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-gray-800">{crop.crop}</span>
                      <span className="text-xs px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                        {crop.season}
                      </span>
                    </div>
                    <div className="text-sm text-gray-600">Expected: {crop.yield}</div>
                    <div className="text-xs text-gray-500">Suitability: {crop.suitability}%</div>
                  </div>
                  <div className="flex items-center space-x-1">
                    <TrendingUp className={`w-4 h-4 ${
                      crop.profit === 'High' || crop.profit === 'अधिक' ? 'text-green-600' : 'text-orange-600'
                    }`} />
                    <span className={`text-sm font-medium ${
                      crop.profit === 'High' || crop.profit === 'अधिक' ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {crop.profit}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Action Items */}
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <h3 className="text-lg font-semibold mb-4 flex items-center">
            <Leaf className="w-5 h-5 mr-2 text-green-600" />
            {content.nextActions}
          </h3>
          <div className="space-y-3">
            {content.actionItems.map((item, index) => (
              <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-start justify-between mb-2">
                  <h4 className="font-medium text-gray-800">{item.title}</h4>
                  <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(item.priority)}`}>
                    {item.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                <div className="flex items-center text-xs text-gray-500">
                  <span>{item.timeline}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white border-t border-gray-200 p-4 space-y-3">
        <SimpleButton
          onClick={() => console.log('Download PDF')}
          className="w-full bg-green-600 hover:bg-green-700 text-white py-3"
        >
          <Download className="w-5 h-5 mr-2" />
          {content.downloadReport}
        </SimpleButton>
        
        <SimpleButton
          onClick={() => onNavigate('crop-guidance')}
          variant="outline"
          className="w-full border-green-200 text-green-600 hover:bg-green-50 py-3"
        >
          {content.viewRecommendations}
          <ChevronRight className="w-5 h-5 ml-2" />
        </SimpleButton>
      </div>
    </div>
  );
}