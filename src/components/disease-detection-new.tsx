import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowLeft, 
  Camera, 
  Upload, 
  Bug, 
  CheckCircle, 
  AlertTriangle,
  Sprout,
  Beaker,
  Shield,
  ChevronDown
} from 'lucide-react';

// --- Self-Contained Component Definitions ---
// To ensure this component works independently, the necessary types and
// helper components are defined directly within this file.

/**
 * Defines the structure for a language object.
 */
interface Language {
  code: string;
  name: string;
}

/**
 * Defines the possible screen names for navigation.
 */
type Screen = 'new-dashboard' | 'some-other-screen' | 'community-post-page';

/**
 * A reusable, styled button component that supports different visual variants.
 */
const SimpleButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'outline' | 'ghost' | 'default'; size?: 'icon' | 'default' }
>(({ className, variant = 'default', size = 'default', ...props }, ref) => {
  const baseClasses = `inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none`;
  
  const variantClasses = {
    default: 'bg-green-600 text-white hover:bg-green-700',
    outline: 'border border-gray-200 bg-transparent hover:bg-gray-50 text-gray-800',
    ghost: 'hover:bg-green-700 hover:text-white',
  };

  const sizeClasses = {
    default: 'h-10 py-2 px-4',
    icon: 'h-10 w-10',
  };
  
  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      ref={ref}
      {...props}
    />
  );
});
SimpleButton.displayName = 'SimpleButton';

/**
 * A dropdown language selector component.
 */
const LanguageSelector = ({ selectedLanguage, onLanguageChange, variant }: { selectedLanguage: Language | null; onLanguageChange: (language: Language) => void; variant?: string; }) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const languages: Language[] = [
        { code: 'en', name: 'English' },
        { code: 'hi', name: 'हिन्दी' },
    ];

    const handleSelect = (language: Language) => {
        onLanguageChange(language);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [dropdownRef]);

    const isHeader = variant === 'header';
    const buttonClasses = isHeader ? "text-white bg-white/20 hover:bg-white/30" : "text-gray-700 bg-gray-100 hover:bg-gray-200 border border-gray-200";
    const menuClasses = isHeader ? "bg-green-800 border-green-700 text-white" : "bg-white border-gray-200 text-gray-800";
    const menuItemClasses = isHeader ? "hover:bg-green-700" : "hover:bg-gray-100";

    return (
        <div className="relative" ref={dropdownRef}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${buttonClasses}`}
            >
                <span>{selectedLanguage?.name || 'English'}</span>
                <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            {isOpen && (
                <div className={`absolute right-0 mt-2 w-32 origin-top-right rounded-md shadow-lg border z-20 ${menuClasses}`}>
                    <div className="py-1">
                        {languages.map((lang) => (
                            <button key={lang.code} onClick={() => handleSelect(lang)} className={`w-full text-left px-4 py-2 text-sm ${menuItemClasses}`}>
                                {lang.name}
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

/**
 * An image component that shows a placeholder if the original image fails to load.
 */
const ImageWithFallback = ({ src, alt, className }: { src: string; alt: string; className: string; }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const handleError = () => setImgSrc(`https://placehold.co/100x100/e2e8f0/4a5568?text=Image`);
    
    useEffect(() => {
        setImgSrc(src);
    }, [src]);

    return <img src={imgSrc} alt={alt} className={className} onError={handleError} />;
};

/**
 * A reusable collapsible section component for the results page.
 */
const CollapsibleSection = ({ title, icon, color, children, isOpen, onClick }: { title: string; icon: React.ReactNode; color: string; children: React.ReactNode; isOpen: boolean; onClick: () => void; }) => {
  const colorClasses = {
    red: { border: 'border-red-500', text: 'text-red-600', bg: 'bg-red-50', hoverBg: 'hover:bg-red-100' },
    green: { border: 'border-green-500', text: 'text-green-600', bg: 'bg-green-50', hoverBg: 'hover:bg-green-100' },
    blue: { border: 'border-blue-500', text: 'text-blue-600', bg: 'bg-blue-50', hoverBg: 'hover:bg-blue-100' },
    orange: { border: 'border-orange-500', text: 'text-orange-600', bg: 'bg-orange-50', hoverBg: 'hover:bg-orange-100' },
  };
  const colors = colorClasses[color as keyof typeof colorClasses] || colorClasses.green;

  return (
    <div className={`border ${isOpen ? colors.border : 'border-gray-200'} rounded-xl overflow-hidden transition-all duration-300`}>
      <button
        onClick={onClick}
        className={`w-full flex items-center justify-between p-4 text-left font-semibold ${colors.text} ${isOpen ? colors.bg : 'bg-white'} ${colors.hoverBg} transition-colors duration-200`}
      >
        <div className="flex items-center space-x-3">
          {icon}
          <span className="text-gray-800">{title}</span>
        </div>
        <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <div className={`transition-all duration-500 ease-in-out grid ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className={`p-4 border-t ${colors.border} ${colors.bg}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};


// --- Main Component ---

interface DiseaseDetectionNewProps {
  selectedLanguage: Language | null;
  onNavigate: (screen: Screen, ...args: any[]) => void;
  onLanguageChange: (language: Language) => void;
}

const diseaseContent = {
  en: {
    title: "Disease Detection",
    subtitle: "Identify and treat crop diseases",
    takePicture: "Take a Picture",
    seeDiagnosis: "See Diagnosis", 
    uploadPhoto: "Upload Photo from Gallery",
    capturePhoto: "Capture New Photo",
    analyzing: "Analyzing your crop image...",
    diseaseFound: "Disease Detected",
    confidence: "Confidence",
    severity: "Severity",
    treatment: "Treatment Recommendations",
    postToCommunity: "Ask the Community for Help",
    commonDiseases: "Common Crop Diseases",
    prevention: "Prevention Tips",
    organicTreatment: "Organic Treatment",
    chemicalTreatment: "Chemical Treatment",
    immediateActions: "Immediate Actions Required",
  },
  hi: {
    title: "रोग निदान",
    subtitle: "फसल के रोगों की पहचान और इलाज",
    takePicture: "फोटो लें",
    seeDiagnosis: "निदान देखें",
    uploadPhoto: "गैलरी से फोटो अपलोड करें",
    capturePhoto: "नई फोटो लें",
    analyzing: "आपकी फसल की छवि का विश्लेषण हो रहा है...",
    diseaseFound: "रोग का पता चला",
    confidence: "विश्वसनीयता",
    severity: "गंभीरता",
    treatment: "उपचार की सिफारिशें",
    postToCommunity: "समुदाय से मदद मांगें",
    commonDiseases: "सामान्य फसल रोग",
    prevention: "बचाव के तरीके",
    organicTreatment: "जैविक उपचार",
    chemicalTreatment: "रासायनिक उपचार",
    immediateActions: "तत्काल आवश्यक कार्य",
  }
};

const mockDiseaseData = {
  name: "Leaf Blight",
  nameHi: "पत्ती झुलसा",
  confidence: 87,
  severity: "Moderate",
  severityHi: "मध्यम",
  immediateActions: [
      { en: "Remove and destroy all affected plant parts immediately", hi: "सभी संक्रमित पौधों के भागों को तुरंत हटाएं और नष्ट करें" },
      { en: "Isolate infected plants to prevent spread", hi: "संक्रमित पौधों को अलग करें ताकि फैलाव रुके" },
      { en: "Stop overhead watering and reduce humidity", hi: "ऊपर से पानी देना बंद करें और नमी कम करें" },
      { en: "Improve air circulation around plants", hi: "पौधों के चारों ओर हवा का संचार बेहतर बनाएं" },
  ],
  organicTreatment: [
      { en: "Apply neem oil spray (2%) every evening for the first 3 days", hi: "पहले 3 दिन हर शाम नीम तेल स्प्रे (2%) करें" },
      { en: "Use copper sulfate solution (0.2%) from day 4 to day 7", hi: "दिन 4-7 तक कॉपर सल्फेट घोल (0.2%) का उपयोग करें" },
      { en: "Continue neem oil treatment twice weekly for the next 2 weeks", hi: "अगले 2 सप्ताह तक सप्ताह में दो बार नीम तेल का उपचार जारी रखें" },
      { en: "Introduce beneficial microorganisms like Trichoderma to the soil", hi: "मिट्टी में ट्राइकोडर्मा जैसे लाभकारी सूक्ष्मजीवों का प्रयोग करें" },
  ],
  chemicalTreatment: [
      { en: "Apply Copper oxychloride (0.3%) with 3 sprays at 10-day intervals", hi: "कॉपर ऑक्सीक्लोराइड (0.3%) का 10 दिन के अंतराल पर 3 स्प्रे करें" },
      { en: "Mancozeb (0.25%) can be used as an alternative option", hi: "मैंकोज़ेब (0.25%) का उपयोग एक वैकल्पिक विकल्प के रूप में किया जा सकता है" },
      { en: "Always follow label instructions and safety measures carefully", hi: "हमेशा लेबल के निर्देशों और सुरक्षा उपायों का ध्यानपूर्वक पालन करें" },
      { en: "Spray during cooler parts of the day to avoid leaf burn", hi: "पत्तियों को जलने से बचाने के लिए दिन के ठंडे समय में स्प्रे करें" },
  ],
  prevention: [
      { en: "Use certified disease-resistant crop varieties for future planting", hi: "भविष्य की रोपाई के लिए प्रमाणित रोग प्रतिरोधी किस्मों का उपयोग करें" },
      { en: "Implement a 2-3 year crop rotation schedule", hi: "2-3 साल की फसल चक्र अनुसूची लागू करें" },
      { en: "Maintain field hygiene by removing plant debris after harvest", hi: "कटाई के बाद पौधों के अवशेषों को हटाकर खेत की स्वच्छता बनाए रखें" },
      { en: "Monitor crops weekly for early signs of infection", hi: "संक्रमण के शुरुआती लक्षणों के लिए साप्ताहिक रूप से फसलों की निगरानी करें" },
  ]
};

const commonDiseases = [
  { name: "Brown Spot", nameHi: "भूरे धब्बे", image: "https://placehold.co/100x100/A8876E/FFFFFF?text=Spot", symptoms: "Brown spots on leaves" },
  { name: "Bacterial Wilt", nameHi: "जीवाणु मुरझाना", image: "https://placehold.co/100x100/90A86E/FFFFFF?text=Wilt", symptoms: "Wilting of plants" },
  { name: "Rust Disease", nameHi: "जंग रोग", image: "https://placehold.co/100x100/A87C6E/FFFFFF?text=Rust", symptoms: "Orange rust spots" }
];

export function DiseaseDetectionNew({ selectedLanguage, onNavigate, onLanguageChange }: DiseaseDetectionNewProps) {
  const [currentStep, setCurrentStep] = useState<'upload' | 'analyzing' | 'results'>('upload');
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  const langCode = selectedLanguage?.code || 'en';
  const content = diseaseContent[langCode as keyof typeof diseaseContent] || diseaseContent.en;

  const handleImageSelect = () => {
    setSelectedImage('https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400');
    setCurrentStep('analyzing');
    
    setTimeout(() => {
      setCurrentStep('results');
    }, 2500);
  };
  
  const handleAccordionClick = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
  };

  if (currentStep === 'analyzing') {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <div className="bg-green-600 text-white p-4">
          <h1 className="text-xl font-bold text-center">{content.title}</h1>
        </div>
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-center space-y-4">
             <div className="relative w-32 h-32 mx-auto">
                <ImageWithFallback src={selectedImage} alt="Analyzing crop" className="w-full h-full object-cover rounded-2xl shadow-lg"/>
                <div className="absolute inset-0 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-800">{content.analyzing}</h2>
              <p className="text-gray-500">AI is checking the crop condition...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (currentStep === 'results') {
     const sections = [
        { id: 'immediate', title: content.immediateActions, icon: <AlertTriangle className="w-6 h-6" />, color: 'red', data: mockDiseaseData.immediateActions },
        { id: 'organic', title: content.organicTreatment, icon: <Sprout className="w-6 h-6" />, color: 'green', data: mockDiseaseData.organicTreatment },
        { id: 'chemical', title: content.chemicalTreatment, icon: <Beaker className="w-6 h-6" />, color: 'blue', data: mockDiseaseData.chemicalTreatment },
        { id: 'prevention', title: content.prevention, icon: <Shield className="w-6 h-6" />, color: 'orange', data: mockDiseaseData.prevention }
    ];

    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <div className="bg-green-600 text-white p-4 sticky top-0 z-10 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <SimpleButton onClick={() => setCurrentStep('upload')} variant="ghost" size="icon" className="text-white hover:bg-green-700">
                <ArrowLeft className="w-5 h-5" />
              </SimpleButton>
              <div>
                <h1 className="text-lg font-bold">{content.seeDiagnosis}</h1>
              </div>
            </div>
            <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={onLanguageChange} variant="header"/>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
            <div className="flex items-start space-x-4">
              <ImageWithFallback src={selectedImage} alt="Analyzed crop" className="w-24 h-24 object-cover rounded-lg border-2 border-orange-300"/>
              <div className="flex-1">
                <p className="text-sm font-medium text-orange-600">{content.diseaseFound}</p>
                <h3 className="text-xl font-bold text-gray-800">
                  {langCode === 'hi' ? mockDiseaseData.nameHi : mockDiseaseData.name}
                </h3>
                <div className="flex items-center space-x-4 mt-2 text-sm">
                    <div>
                        <span className="text-gray-500">{content.confidence}: </span>
                        <span className="font-semibold text-gray-800">{mockDiseaseData.confidence}%</span>
                    </div>
                     <div>
                        <span className="text-gray-500">{content.severity}: </span>
                        <span className="font-semibold text-red-600">{langCode === 'hi' ? mockDiseaseData.severityHi : mockDiseaseData.severity}</span>
                    </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 space-y-3">
             <h3 className="text-md font-semibold text-gray-700 px-1">{content.treatment}</h3>
             {sections.map(section => (
                <CollapsibleSection
                    key={section.id}
                    title={section.title}
                    icon={section.icon}
                    color={section.color}
                    isOpen={activeAccordion === section.id}
                    onClick={() => handleAccordionClick(section.id)}
                >
                    <ul className="space-y-2 text-sm text-gray-700">
                        {section.data.map((item, index) => (
                            <li key={index} className="flex items-start space-x-2">
                                <CheckCircle className="w-4 h-4 mt-0.5 text-current flex-shrink-0" />
                                <span>{langCode === 'hi' ? item.hi : item.en}</span>
                            </li>
                        ))}
                    </ul>
                </CollapsibleSection>
             ))}
          </div>

          <div className="px-2 py-4">
             <SimpleButton onClick={() => onNavigate('community-post-page')} className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-green-700">
                {content.postToCommunity}
              </SimpleButton>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-green-600 text-white p-4 shadow-md">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <SimpleButton onClick={() => onNavigate('new-dashboard')} variant="ghost" size="icon" className="text-white hover:bg-green-700">
                <ArrowLeft className="w-5 h-5" />
              </SimpleButton>
              <div>
                <h1 className="text-lg font-bold">{content.title}</h1>
                <p className="text-sm text-green-100">{content.subtitle}</p>
              </div>
            </div>
            <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={onLanguageChange} variant="header"/>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4 text-center">
            <ImageWithFallback 
                src="https://placehold.co/600x400/D1E7DD/345642?text=Your+Crop+Image" 
                alt="Plant disease detection" 
                className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h2 className="text-md font-semibold mb-4 text-gray-700">Choose Detection Method</h2>
            <div className="space-y-3">
              <SimpleButton onClick={handleImageSelect} className="w-full h-16 bg-green-600 hover:bg-green-700 text-white flex items-center justify-center space-x-3 rounded-lg">
                <Camera className="w-6 h-6" />
                <span className="font-semibold">{content.capturePhoto}</span>
              </SimpleButton>
              <SimpleButton onClick={handleImageSelect} variant="outline" className="w-full h-16 border-gray-300 text-gray-700 hover:bg-gray-100 flex items-center justify-center space-x-3 rounded-lg">
                <Upload className="w-6 h-6" />
                <span className="font-semibold">{content.uploadPhoto}</span>
              </SimpleButton>
            </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-md border border-gray-200 p-4">
            <h3 className="text-md font-semibold mb-3 text-gray-700">{content.commonDiseases}</h3>
            <div className="space-y-2">
              {commonDiseases.map((disease, index) => (
                <div key={index} className="flex items-center space-x-3 p-2 border-b border-gray-100 last:border-b-0">
                  <ImageWithFallback src={disease.image} alt={disease.name} className="w-12 h-12 object-cover rounded-md"/>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-800 text-sm">{langCode === 'hi' ? disease.nameHi : disease.name}</h4>
                    <p className="text-xs text-gray-500">{disease.symptoms}</p>
                  </div>
                  <Bug className="w-5 h-5 text-green-500" />
                </div>
              ))}
            </div>
        </div>
      </div>
    </div>
  );
}

