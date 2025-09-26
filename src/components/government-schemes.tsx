import React, { useState } from 'react';
import { ArrowLeft, Award, Calendar, IndianRupee, Users, CheckCircle, ExternalLink } from 'lucide-react';
import { Language, Screen } from '../App';
import { SimpleButton } from './simple-button';
import { LanguageSelector } from './language-selector';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface GovernmentSchemesProps {
  selectedLanguage: Language | null;
  onNavigate: (screen: Screen, ...args: any[]) => void;
  onLanguageChange: (language: Language) => void;
}

const schemesContent = {
  en: {
    title: "Government Schemes",
    subtitle: "Available benefits for farmers",
    allSchemes: "All Schemes",
    eligibleForYou: "Eligible for You",
    applied: "Applied",
    eligibility: "Eligibility",
    benefits: "Benefits",
    howToApply: "How to Apply",
    applyNow: "Apply Now",
    viewDetails: "View Details",
    deadline: "Deadline",
    amount: "Amount",
    beneficiaries: "Beneficiaries",
    status: "Status",
    active: "Active",
    expired: "Expired",
    upcoming: "Upcoming",
    applicationProcess: "Application Process",
    documentsRequired: "Documents Required",
    contactInfo: "Contact Information"
  },
  hi: {
    title: "सरकारी योजनाएं",
    subtitle: "किसानों के लिए उपलब्ध लाभ",
    allSchemes: "सभी योजनाएं",
    eligibleForYou: "आपके लिए योग्य",
    applied: "आवेदन किया गया",
    eligibility: "पात्रता",
    benefits: "लाभ",
    howToApply: "आवेदन कैसे करें",
    applyNow: "अभी आवेदन करें",
    viewDetails: "विवरण देखें",
    deadline: "अंतिम तिथि",
    amount: "राशि",
    beneficiaries: "लाभार्थी",
    status: "स्थिति",
    active: "सक्रिय",
    expired: "समाप्त",
    upcoming: "आगामी",
    applicationProcess: "आवेदन प्रक्रिया",
    documentsRequired: "आवश्यक दस्तावेज",
    contactInfo: "संपर्क जानकारी"
  }
};

const mockSchemes = [
  {
    id: '1',
    name: 'PM-KISAN Scheme',
    nameHi: 'पीएम-किसान योजना',
    description: 'Direct income support of ₹6,000 per year to farmer families',
    descriptionHi: 'किसान परिवारों को प्रति वर्ष ₹6,000 की प्रत्यक्ष आय सहायता',
    amount: '₹6,000/year',
    deadline: '31 Dec 2024',
    status: 'active',
    eligibility: 'Small and marginal farmers with cultivable land',
    eligibilityHi: 'खेती योग्य भूमि वाले छोटे और सीमांत किसान',
    benefits: [
      '₹2,000 every 4 months',
      'Direct bank transfer',
      'No collateral required'
    ],
    benefitsHi: [
      'हर 4 महीने में ₹2,000',
      'सीधा बैंक ट्रांसफर',
      'कोई गारंटी आवश्यक नहीं'
    ],
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=400',
    isEligible: true,
    isApplied: false
  },
  {
    id: '2',
    name: 'Soil Health Card Scheme',
    nameHi: 'मृदा स्वास्थ्य कार्ड योजना',
    description: 'Free soil testing and health cards for better crop planning',
    descriptionHi: 'बेहतर फसल योजना के लिए मुफ्त मिट्टी परीक्षण और स्वास्थ्य कार्ड',
    amount: 'Free',
    deadline: 'Ongoing',
    status: 'active',
    eligibility: 'All farmers with agricultural land',
    eligibilityHi: 'कृषि भूमि वाले सभी किसान',
    benefits: [
      'Free soil testing',
      'Customized fertilizer recommendations',
      'Digital soil health card'
    ],
    benefitsHi: [
      'मुफ्त मिट्टी परीक्षण',
      'अनुकूलित उर्वरक सिफारिशें',
      'डिजिटल मृदा स्वास्थ्य कार्ड'
    ],
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=400',
    isEligible: true,
    isApplied: true
  },
  {
    id: '3',
    name: 'Crop Insurance Scheme',
    nameHi: 'फसल बीमा योजना',
    description: 'Protection against crop loss due to natural calamities',
    descriptionHi: 'प्राकृतिक आपदाओं के कारण फसल हानि से सुरक्षा',
    amount: 'Up to ₹2,00,000',
    deadline: '15 Jan 2025',
    status: 'active',
    eligibility: 'Farmers with Kharif/Rabi crops',
    eligibilityHi: 'खरीफ/रबी फसल वाले किसान',
    benefits: [
      'Crop loss compensation',
      'Low premium rates',
      'Quick claim settlement'
    ],
    benefitsHi: [
      'फसल नुकसान की भरपाई',
      'कम प्रीमियम दरें',
      'त्वरित दावा निपटान'
    ],
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=400',
    isEligible: true,
    isApplied: false
  },
  {
    id: '4',
    name: 'Drip Irrigation Subsidy',
    nameHi: 'ड्रिप सिंचाई सब्सिडी',
    description: 'Subsidy for installing drip irrigation systems',
    descriptionHi: 'ड्रिप सिंचाई प्रणाली स्थापित करने के लिए सब्सिडी',
    amount: '50% subsidy',
    deadline: '30 Nov 2024',
    status: 'active',
    eligibility: 'Farmers with minimum 1 acre land',
    eligibilityHi: 'कम से कम 1 एकड़ भूमि वाले किसान',
    benefits: [
      '50% cost subsidy',
      'Water conservation',
      'Increased crop yield'
    ],
    benefitsHi: [
      '50% लागत सब्सिडी',
      'जल संरक्षण',
      'बढ़ी हुई फसल उपज'
    ],
    image: 'https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=400',
    isEligible: false,
    isApplied: false
  }
];

export function GovernmentSchemes({ selectedLanguage, onNavigate, onLanguageChange }: GovernmentSchemesProps) {
  const [selectedTab, setSelectedTab] = useState<'all' | 'eligible' | 'applied'>('eligible');
  const [selectedScheme, setSelectedScheme] = useState<typeof mockSchemes[0] | null>(null);

  const langCode = selectedLanguage?.code || 'en';
  const content = schemesContent[langCode as keyof typeof schemesContent] || schemesContent.en;

  const filteredSchemes = mockSchemes.filter(scheme => {
    switch (selectedTab) {
      case 'eligible':
        return scheme.isEligible && !scheme.isApplied;
      case 'applied':
        return scheme.isApplied;
      default:
        return true;
    }
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'expired': return 'bg-red-100 text-red-800';
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApplyScheme = (schemeId: string) => {
    console.log('Apply for scheme:', schemeId);
    // Update scheme application status
    const schemeIndex = mockSchemes.findIndex(s => s.id === schemeId);
    if (schemeIndex !== -1) {
      mockSchemes[schemeIndex].isApplied = true;
      setSelectedScheme(null);
      setSelectedTab('applied');
    }
  };

  if (selectedScheme) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-white">
        {/* Header */}
        <div className="bg-blue-600 text-white p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <SimpleButton
                onClick={() => setSelectedScheme(null)}
                variant="ghost"
                size="icon"
                className="text-white hover:bg-blue-700"
              >
                <ArrowLeft className="w-6 h-6" />
              </SimpleButton>
              <div>
                <h1 className="text-xl font-bold">
                  {langCode === 'hi' ? selectedScheme.nameHi : selectedScheme.name}
                </h1>
                <p className="text-blue-100">Scheme Details</p>
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
          {/* Scheme Image and Basic Info */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-start space-x-4 mb-4">
              <div className="w-20 h-20 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={selectedScheme.image}
                  alt={selectedScheme.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">
                  {langCode === 'hi' ? selectedScheme.nameHi : selectedScheme.name}
                </h2>
                <p className="text-gray-600 text-sm mb-3">
                  {langCode === 'hi' ? selectedScheme.descriptionHi : selectedScheme.description}
                </p>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1">
                    <IndianRupee className="w-4 h-4 text-green-600" />
                    <span className="font-semibold text-green-600">{selectedScheme.amount}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4 text-orange-600" />
                    <span className="text-sm text-orange-600">{selectedScheme.deadline}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Eligibility */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Users className="w-5 h-5 mr-2 text-blue-600" />
              {content.eligibility}
            </h3>
            <p className="text-gray-700">
              {langCode === 'hi' ? selectedScheme.eligibilityHi : selectedScheme.eligibility}
            </p>
          </div>

          {/* Benefits */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-3 flex items-center">
              <Award className="w-5 h-5 mr-2 text-green-600" />
              {content.benefits}
            </h3>
            <div className="space-y-2">
              {(langCode === 'hi' ? selectedScheme.benefitsHi : selectedScheme.benefits).map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Application Process */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-3">{content.applicationProcess}</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
                <div>
                  <p className="font-medium text-gray-800">Visit nearest Common Service Center</p>
                  <p className="text-sm text-gray-600">या निकटतम कॉमन सर्विस सेंटर पर जाएं</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
                <div>
                  <p className="font-medium text-gray-800">Submit required documents</p>
                  <p className="text-sm text-gray-600">आवश्यक दस्तावेज जमा करें</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
                <div>
                  <p className="font-medium text-gray-800">Complete application form</p>
                  <p className="text-sm text-gray-600">आवेदन पत्र भरें</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
                <div>
                  <p className="font-medium text-gray-800">Receive confirmation</p>
                  <p className="text-sm text-gray-600">पुष्टि प्राप्त करें</p>
                </div>
              </div>
            </div>
          </div>

          {/* Documents Required */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-3">{content.documentsRequired}</h3>
            <div className="grid grid-cols-2 gap-3">
              {['Aadhaar Card', 'Land Records', 'Bank Passbook', 'Income Certificate'].map((doc, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg border">
                  <p className="text-sm font-medium text-gray-800">{doc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Apply Button */}
          {selectedScheme.isEligible && !selectedScheme.isApplied && (
            <SimpleButton
              onClick={() => handleApplyScheme(selectedScheme.id)}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4"
            >
              {content.applyNow}
            </SimpleButton>
          )}

          {selectedScheme.isApplied && (
            <div className="p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-6 h-6 text-green-600" />
                <div>
                  <p className="font-medium text-green-800">Application Submitted</p>
                  <p className="text-sm text-green-600">आवेदन जमा कर दिया गया</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-blue-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <SimpleButton
              onClick={() => onNavigate('new-dashboard')}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-blue-700"
            >
              <ArrowLeft className="w-6 h-6" />
            </SimpleButton>
            <div>
              <h1 className="text-xl font-bold">{content.title}</h1>
              <p className="text-blue-100">{content.subtitle}</p>
            </div>
          </div>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
            variant="header"
          />
        </div>

        {/* Tabs */}
        <div className="flex space-x-1 bg-blue-500 rounded-lg p-1">
          {[
            { key: 'eligible', label: content.eligibleForYou },
            { key: 'all', label: content.allSchemes },
            { key: 'applied', label: content.applied }
          ].map((tab) => (
            <SimpleButton
              key={tab.key}
              onClick={() => setSelectedTab(tab.key as any)}
              variant="ghost"
              className={`flex-1 py-2 rounded-md transition-colors ${
                selectedTab === tab.key 
                  ? 'bg-white text-blue-600' 
                  : 'text-white hover:bg-blue-400'
              }`}
            >
              {tab.label}
            </SimpleButton>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4">
        {filteredSchemes.length === 0 ? (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500">No schemes found in this category</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredSchemes.map((scheme) => (
              <div key={scheme.id} className="bg-white rounded-xl shadow-sm border p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={scheme.image}
                      alt={scheme.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800">
                        {langCode === 'hi' ? scheme.nameHi : scheme.name}
                      </h3>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(scheme.status)}`}>
                        {content[scheme.status as keyof typeof content]}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3">
                      {langCode === 'hi' ? scheme.descriptionHi : scheme.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <IndianRupee className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-600">{scheme.amount}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4 text-orange-600" />
                          <span className="text-xs text-orange-600">{scheme.deadline}</span>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {scheme.isEligible && (
                          <CheckCircle className="w-4 h-4 text-green-600" />
                        )}
                        <SimpleButton
                          onClick={() => setSelectedScheme(scheme)}
                          variant="outline"
                          size="sm"
                          className="border-blue-200 text-blue-600 hover:bg-blue-50"
                        >
                          {content.viewDetails}
                          <ExternalLink className="w-3 h-3 ml-1" />
                        </SimpleButton>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}