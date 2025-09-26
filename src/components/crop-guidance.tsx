import React, { useState, forwardRef } from 'react';
import { 
  ArrowLeft, 
  Sprout, 
  Calendar, 
  TrendingUp, 
  DollarSign,
  Beaker,
  Clock,
  Droplets,
  Shield,
  RotateCcw,
  Sun,
  ChevronRight,
  BookOpen,
  Bug,
  Biohazard,
  Tractor,
  CheckCircle2,
  Warehouse, // Added for new component
  Cloudy, // Added for new component
  CloudRain, // Added for new component
  Wind, // Added for new component
  Globe,
} from 'lucide-react';

// --- START: Self-Contained Component Definitions ---
// At the top of crop-guidance.tsx
import { Screen, Language } from '../App'; // <-- ADD Language HERE 


const SimpleButton = forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'outline' | 'ghost' | 'default'; size?: 'icon' | 'default' }
>(({ className, variant = 'default', size = 'default', ...props }, ref) => {
  const baseClasses = `inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none`;
  
  const variantClasses = {
    default: 'bg-green-600 text-white hover:bg-green-700',
    outline: 'border border-gray-200 bg-transparent hover:bg-gray-50 text-gray-800',
    ghost: 'hover:bg-green-100 hover:text-green-800',
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

const LanguageSelector = ({ selectedLanguage, onLanguageChange, variant }: { selectedLanguage: Language | null; onLanguageChange: (language: Language) => void; variant?: string; }) => {
    const languages: Language[] = [
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
        { code: 'hi', name: 'हिन्दी', nativeName: 'हिन्दी', flag: '🇮🇳' },
    ];

    const toggleLanguage = () => {
        const currentLangCode = selectedLanguage?.code || 'en';
        const nextLanguage = currentLangCode === 'en' ? languages[1] : languages[0];
        onLanguageChange(nextLanguage);
    };
    
    const otherLanguage = selectedLanguage?.code === 'en' ? languages[1] : languages[0];

    const buttonClasses = variant === 'header' 
        ? "flex items-center space-x-2 text-white bg-white/20 hover:bg-white/30 px-3 py-2 rounded-full"
        : "text-gray-700 bg-gray-100 hover:bg-gray-200";

    return (
        <button 
            onClick={toggleLanguage}
            className={`transition-colors ${buttonClasses}`}
        >
             {variant === 'header' ? (
                <>
                    <Globe className="w-4 h-4" />
                    <span className="text-sm font-semibold">{otherLanguage.code.toUpperCase()}</span>
                </>
             ) : (
                `Switch to ${otherLanguage.name}`
             )}
        </button>
    );
};

const ImageWithFallback = ({ src, alt, className }: { src: string; alt: string; className: string; }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const handleError = () => setImgSrc(`https://placehold.co/100x100/e2e8f0/4a5568?text=Image`);
    return <img src={imgSrc} alt={alt} className={className} onError={handleError} />;
};
// --- END: Self-Contained Definitions ---


interface CropGuidanceProps {
  selectedLanguage: Language | null;
  onNavigate: (screen: Screen, ...args: any[]) => void;
  onLanguageChange: (language: Language) => void;
}

const guidanceContent = {
  en: {
    title: "Crop Guidance",
    subtitle: "Smart farming recommendations",
    cropSuggestions: "Crop Suggestions",
    yieldEstimate: "Yield Estimate",
    profitability: "Profitability",
    sowingCalendar: "Sowing & Harvest Calendar",
    cropRotation: "Crop Rotation Advice",
    fertilizerGuidance: "Fertilizer Guidance",
    recommendedCrops: "Recommended Crops for Your Soil",
    currentSeason: "Current Season",
    nextSeason: "Next Season",
    highProfit: "High Profit",
    mediumProfit: "Medium Profit",
    lowProfit: "Low Profit",
    sowingTime: "Best Sowing Time",
    harvestTime: "Expected Harvest",
    fertilizerSchedule: "Fertilizer Schedule",
    kharif: "Kharif",
    rabi: "Rabi",
    summer: "Summer",
    cropForSeason: "Crop for season:",
    benefit: "Benefit:",
    rice: "Rice",
    wheat: "Wheat",
    legumes: "Legumes",
    soybean: "Soybean", 
    cotton: "Cotton",
    sugarcane: "Sugarcane",

    cropRotationDetailsTitle: "Why Crop Rotation Matters",
    soilHealthBenefitTitle: "Improves Soil Health",
    soilHealthBenefitDesc: "Alternating deep and shallow-rooted plants improves soil structure and fertility.",
    pestManagementBenefitTitle: "Pest & Disease Control",
    pestManagementBenefitDesc: "Breaks the life cycles of pests and diseases that are specific to one crop family.",
    nutrientBenefitTitle: "Enhanced Nutrient Use",
    nutrientBenefitDesc: "Legumes fix nitrogen, and subsequent crops can utilize residual nutrients, reducing fertilizer needs.",
    
    riceBenefit1: "High water requirement aligns perfectly with the monsoon season.",
    riceBenefit2: "Breaks the cycle for weeds and pests common in dryland crops.",
    wheatBenefit1: "Effectively utilizes residual soil moisture and nutrients from the Kharif season.",
    wheatBenefit2: "Its different root structure helps to improve soil aeration.",
    legumesBenefit1: "Adds atmospheric nitrogen to the soil, naturally enriching it for the next crop.",
    legumesBenefit2: "Acts as a green manure, improving organic matter and overall soil health.",
    
    cropEncyclopedia: "Crop Encyclopedia",
    soilPreparation: "Soil Preparation",
    commonDiseases: "Common Diseases",
    pestControl: "Pest Control",
    harvesting: "Harvesting & Storage",

    riceSoilPrep: "Puddle the field by plowing 2-3 times in standing water to create a fine, soft seedbed. Ensure the field is level for uniform water distribution.",
    riceDiseases: "Blast (Pyricularia oryzae) and Bacterial Blight (Xanthomonas oryzae). Use resistant varieties and apply recommended fungicides.",
    ricePestControl: "Stem borer and leaf folder are common pests. Use pheromone traps and apply insecticides like cartap hydrochloride as needed.",
    riceHarvesting: "Harvest when grains in the panicle are 80-85% ripe. Dry the grains immediately to 12-14% moisture content for safe storage.",
    
    wheatSoilPrep: "A well-pulverized but compact seedbed is required for good germination. Prepare the field by giving 2-3 plowings followed by harrowing.",
    wheatDiseases: "Rust (Puccinia spp.) and Smut. Use certified, disease-resistant seeds and consider seed treatment with fungicides.",
    wheatPestControl: "Aphids can be a major issue. Spraying with a systemic insecticide like imidacloprid can be effective.",
    wheatHarvesting: "Harvest when the straw becomes dry and brittle and the grains are hard. Thresh and store in a cool, dry place.",

    soybeanSoilPrep: "Requires a well-drained loamy soil. One deep ploughing followed by 2-3 harrowings is sufficient to get a fine tilth.",
    soybeanDiseases: "Mosaic virus and rust. Control vector insects and use resistant varieties. Remove and destroy infected plants.",
    soybeanPestControl: "Girdle beetle and leaf miners are major pests. Timely spraying of quinalphos or chlorpyrifos can manage infestations.",
    soybeanHarvesting: "Harvest when the leaves turn yellow and drop, and pods are dry. Over-drying can cause shattering losses.",

    cottonSoilPrep: "Deep plowing is essential for good root development. Prepare raised beds to ensure good drainage and aeration.",
    cottonDiseases: "Boll rot and leaf curl virus are major concerns. Use disease-resistant hybrids and manage whitefly populations.",
    cottonPestControl: "Bollworms (pink, spotted) are the most destructive. Use pheromone traps for monitoring and integrated pest management (IPM) strategies.",
    cottonHarvesting: "Pick cotton from fully burst bolls during dry weather. Avoid picking wet cotton to maintain quality.",

    sugarcaneSoilPrep: "Requires deep tillage and well-prepared trenches or ridges for planting setts. Ensure adequate organic manure application.",
    sugarcaneDiseases: "Red Rot is a major disease. Use certified disease-free setts and practice crop rotation to manage soil-borne pathogens.",
    sugarcanePestControl: "Early shoot borer and termites can cause significant damage. Apply recommended soil insecticides at the time of planting.",
    sugarcaneHarvesting: "Harvest when the cane has reached peak maturity, indicated by sucrose content. Cut the cane close to the ground level.",

    harvestPlanner: {
      title: "Harvest & Storage Planner",
      selectCrop: "Select a Crop",
      selectSowingDate: "Select Sowing Date",
      forecastButton: "Forecast Harvest",
      harvestWindow: "Predicted Harvest Window",
      dailyForecast: "Daily Forecast",
      optimalDay: "Optimal Day",
      postHarvestTips: "Post-Harvest Tips",
      tipRice: "Dry grains immediately to 12-14% moisture to prevent spoilage.",
      tipWheat: "Store in clean, dry jute bags and stack them on wooden planks.",
      tipSoybean: "Avoid storing near inputs like fertilizers to prevent contamination.",
      tipCotton: "Store seed cotton (kapas) in a dry, clean place before ginning. Do not store for long periods.",
      tipSugarcane: "Crush the cane as soon as possible after harvesting (ideally within 24 hours) to prevent sucrose loss.",
    }
  },
  hi: {
    title: "फसल मार्गदर्शन",
    subtitle: "स्मार्ट कृषि सिफारिशें",
    cropSuggestions: "फसल सुझाव",
    yieldEstimate: "उपज अनुमान",
    profitability: "लाभप्रदता",
    sowingCalendar: "बुआई और कटाई कैलेंडर",
    cropRotation: "फसल चक्र सलाह",
    fertilizerGuidance: "उर्वरक मार्गदर्शन",
    recommendedCrops: "आपकी मिट्टी के लिए अनुशंसित फसलें",
    currentSeason: "वर्तमान सीजन",
    nextSeason: "अगला सीजन",
    highProfit: "उच्च लाभ",
    mediumProfit: "मध्यम लाभ",
    lowProfit: "कम लाभ",
    sowingTime: "सर्वोत्तम बुआई समय",
    harvestTime: "अपेक्षित कटाई",
    fertilizerSchedule: "उर्वरक कार्यक्रम",
    kharif: "खरीफ",
    rabi: "रबी",
    summer: "गर्मी",
    cropForSeason: "इस मौसम के लिए फसल:",
    benefit: "लाभ:",
    rice: "चावल",
    wheat: "गेहूं",
    legumes: "फलियां",
    soybean: "सोयाबीन",
    cotton: "कपास",
    sugarcane: "गन्ना",
    
    cropRotationDetailsTitle: "फसल चक्र क्यों महत्वपूर्ण है",
    soilHealthBenefitTitle: "मृदा स्वास्थ्य में सुधार",
    soilHealthBenefitDesc: "गहरी और उथली जड़ों वाले पौधों को बारी-बारी से लगाने से मिट्टी की संरचना और उर्वरता में सुधार होता है।",
    pestManagementBenefitTitle: "कीट और रोग नियंत्रण",
    pestManagementBenefitDesc: "यह एक ही फसल परिवार के लिए विशिष्ट कीटों और बीमारियों के जीवन चक्र को तोड़ता है।",
    nutrientBenefitTitle: "उन्नत पोषक तत्व उपयोग",
    nutrientBenefitDesc: "फलियां नाइट्रोजन का स्थिरीकरण करती हैं, और बाद की फसलें अवशिष्ट पोषक तत्वों का उपयोग कर सकती हैं, जिससे उर्वरक की जरूरत कम हो जाती है।",
    
    riceBenefit1: "अधिक पानी की आवश्यकता मानसून के मौसम के साथ पूरी तरह से मेल खाती है।",
    riceBenefit2: "शुष्क भूमि की फसलों में आम खरपतवारों और कीटों के चक्र को तोड़ता है।",
    wheatBenefit1: "खरीफ के मौसम से बची हुई मिट्टी की नमी और पोषक तत्वों का प्रभावी ढंग से उपयोग करता है।",
    wheatBenefit2: "इसकी अलग जड़ संरचना मिट्टी में हवा के संचार को बेहतर बनाने में मदद करती है।",
    legumesBenefit1: "वायुमंडलीय नाइट्रोजन को मिट्टी में जोड़ता है, जिससे यह अगली फसल के लिए स्वाभाविक रूप से समृद्ध होती है।",
    legumesBenefit2: "हरी खाद के रूप में कार्य करता है, जिससे जैविक पदार्थ और समग्र मिट्टी के स्वास्थ्य में सुधार होता है।",

    cropEncyclopedia: "फसल विश्वकोश",
    soilPreparation: "मिट्टी की तैयारी",
    commonDiseases: "आम रोग",
    pestControl: "कीट नियंत्रण",
    harvesting: "कटाई और भंडारण",

    riceSoilPrep: "खेत में पानी भरकर 2-3 बार जुताई करके कीचड़ तैयार करें ताकि एक महीन, नरम बीज-क्यारी बन सके। समान जल वितरण के लिए खेत को समतल सुनिश्चित करें।",
    riceDiseases: "ब्लास्ट (पाइरिक्यलेरिया ओराइजी) और बैक्टीरियल ब्लाइट (जैन्थोमोनास ओराइजी)। प्रतिरोधी किस्मों का उपयोग करें और अनुशंसित कवकनाशी का प्रयोग करें।",
    ricePestControl: "तना छेदक और पत्ती मोड़क आम कीट हैं। फेरोमोन ट्रैप का उपयोग करें और आवश्यकतानुसार कार्टैप हाइड्रोक्लोराइड जैसे कीटनाशकों का प्रयोग करें।",
    riceHarvesting: "जब बाली में 80-85% दाने पक जाएं तो कटाई करें। सुरक्षित भंडारण के लिए दानों को तुरंत 12-14% नमी तक सुखाएं।",

    wheatSoilPrep: "अच्छे अंकुरण के लिए एक अच्छी तरह से भुरभुरी लेकिन ठोस बीज-क्यारी की आवश्यकता होती है। 2-3 जुताई के बाद हैरो चलाकर खेत तैयार करें।",
    wheatDiseases: "रस्ट (पक्सिनिया एसपीपी) और स्मट। प्रमाणित, रोग प्रतिरोधी बीजों का प्रयोग करें और बीजों को कवकनाशी से उपचारित करने पर विचार करें।",
    wheatPestControl: "एफिड्स एक बड़ी समस्या हो सकती है। इमिडाक्लोप्रिड जैसे प्रणालीगत कीटनाशक का छिड़काव प्रभावी हो सकता है।",
    wheatHarvesting: "जब पुआल सूखकर भंगुर हो जाए और दाने सख्त हो जाएं तो कटाई करें। थ्रेसिंग करें और ठंडी, सूखी जगह पर स्टोर करें।",

    soybeanSoilPrep: "अच्छी जल निकासी वाली दोमट मिट्टी की आवश्यकता होती है। एक गहरी जुताई के बाद 2-3 हैरो चलाना एक महीन जुताई पाने के लिए पर्याप्त है।",
    soybeanDiseases: "मोजेक वायरस और रस्ट। वेक्टर कीड़ों को नियंत्रित करें और प्रतिरोधी किस्मों का उपयोग करें। संक्रमित पौधों को हटाकर नष्ट कर दें।",
    soybeanPestControl: "गर्डल बीटल और लीफ माइनर प्रमुख कीट हैं। क्विनालफॉस या क्लोरपाइरीफोस का समय पर छिड़काव संक्रमण को प्रबंधित कर सकता है।",
    soybeanHarvesting: "जब पत्तियां पीली होकर गिर जाएं और फलियां सूख जाएं तो कटाई करें। अधिक सुखाने से दाने बिखरने का नुकसान हो सकता है।",
    
    cottonSoilPrep: "अच्छी जड़ विकास के लिए गहरी जुताई आवश्यक है। अच्छी जल निकासी और वातन सुनिश्चित करने के लिए उठी हुई क्यारियाँ तैयार करें।",
    cottonDiseases: "बॉल रॉट और लीफ कर्ल वायरस प्रमुख चिंताएँ हैं। रोग प्रतिरोधी संकर किस्मों का उपयोग करें और सफेद मक्खी की आबादी का प्रबंधन करें।",
    cottonPestControl: "बॉलवर्म (गुलाबी, धब्बेदार) सबसे विनाशकारी हैं। निगरानी के लिए फेरोमोन ट्रैप और एकीकृत कीट प्रबंधन (आईपीएम) रणनीतियों का उपयोग करें।",
    cottonHarvesting: "शुष्क मौसम के दौरान पूरी तरह से फटे हुए बॉल से कपास चुनें। गुणवत्ता बनाए रखने के लिए गीली कपास चुनने से बचें।",
    
    sugarcaneSoilPrep: "गन्ने के टुकड़ों को लगाने के लिए गहरी जुताई और अच्छी तरह से तैयार की गई खाइयों या मेड़ों की आवश्यकता होती है। पर्याप्त जैविक खाद का प्रयोग सुनिश्चित करें।",
    sugarcaneDiseases: "लाल सड़न एक प्रमुख रोग है। प्रमाणित रोग मुक्त टुकड़ों का उपयोग करें और मिट्टी जनित रोगजनकों के प्रबंधन के लिए फसल चक्र का अभ्यास करें।",
    sugarcanePestControl: "अग्र प्ररोह बेधक और दीमक महत्वपूर्ण क्षति पहुंचा सकते हैं। रोपण के समय अनुशंसित मिट्टी कीटनाशकों का प्रयोग करें।",
    sugarcaneHarvesting: "जब गन्ना चरम परिपक्वता पर पहुंच जाए तो कटाई करें, जो सुक्रोज सामग्री से इंगित होता है। गन्ने को जमीन के स्तर के करीब से काटें।",

    harvestPlanner: {
      title: "कटाई और भंडारण योजनाकार",
      selectCrop: "एक फसल चुनें",
      selectSowingDate: "बुवाई की तारीख चुनें",
      forecastButton: "कटाई का पूर्वानुमान करें",
      harvestWindow: "अनुमानित कटाई खिड़की",
      dailyForecast: "दैनिक पूर्वानुमान",
      optimalDay: "इष्टतम दिन",
      postHarvestTips: "कटाई के बाद के टिप्स",
      tipRice: "खराब होने से बचाने के लिए दानों को तुरंत 12-14% नमी तक सुखाएं।",
      tipWheat: "साफ, सूखे जूट के बोरों में स्टोर करें और उन्हें लकड़ी के तख्तों पर रखें।",
      tipSoybean: "संदूषण से बचने के लिए उर्वरक जैसे इनपुट के पास भंडारण से बचें।",
      tipCotton: "गिनिंग से पहले बीज कपास (कपास) को एक सूखी, साफ जगह पर स्टोर करें। लंबे समय तक स्टोर न करें।",
      tipSugarcane: "कटाई के बाद जितनी जल्दी हो सके (आदर्श रूप से 24 घंटे के भीतर) गन्ने की पेराई करें ताकि सुक्रोज की हानि को रोका जा सके।",
    }
  }
};

/**
 * To add a new crop, follow these steps:
 * 1. Add a new object to this `cropSuggestions` array.
 * 2. Fill in all the details like `id`, `name`, `yield`, etc.
 * 3. Add the crop name to the `guidanceContent.en` and `guidanceContent.hi` objects (e.g., `cotton: "Cotton"`).
 * 4. Add the detailed encyclopedia content (soil prep, diseases, pests, harvesting) to `guidanceContent` for both languages.
 * 5. Add a new post-harvest tip (e.g., `tipCotton`) to the `harvestPlanner` section in `guidanceContent` for both languages.
 * 6. Make sure the `postHarvestTipKey` in your new crop object matches the key you created in step 5.
 */
const cropSuggestions = [
  {
    id: '1',
    name: 'Rice',
    nameHi: 'चावल',
    yield: '25 quintals/acre',
    yieldHi: '25 क्विंटल/एकड़',
    profit: 'high',
    profitMargin: '₹45,000/acre',
    sowingTime: 'June - July',
    sowingTimeHi: 'जून - जुलाई',
    harvestTime: 'November - December',
    harvestTimeHi: 'नवंबर - दिसंबर',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
    suitability: 95,
    details: {
      soilPrepKey: 'riceSoilPrep',
      diseasesKey: 'riceDiseases',
      pestControlKey: 'ricePestControl',
      harvestingKey: 'riceHarvesting',
    },
    postHarvestTipKey: 'tipRice',
  },
  {
    id: '2',
    name: 'Wheat',
    nameHi: 'गेहूं',
    yield: '18 quintals/acre',
    yieldHi: '18 क्विंटल/एकड़',
    profit: 'medium',
    profitMargin: '₹32,000/acre',
    sowingTime: 'November - December',
    sowingTimeHi: 'नवंबर - दिसंबर',
    harvestTime: 'March - April',
    harvestTimeHi: 'मार्च - अप्रैल',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
    suitability: 88,
    details: {
      soilPrepKey: 'wheatSoilPrep',
      diseasesKey: 'wheatDiseases',
      pestControlKey: 'wheatPestControl',
      harvestingKey: 'wheatHarvesting',
    },
    postHarvestTipKey: 'tipWheat',
  },
  {
    id: '3',
    name: 'Soybean',
    nameHi: 'सोयाबीन',
    yield: '15 quintals/acre',
    yieldHi: '15 क्विंटल/एकड़',
    profit: 'medium',
    profitMargin: '₹28,000/acre',
    sowingTime: 'June - July',
    sowingTimeHi: 'जून - जुलाई',
    harvestTime: 'October - November',
    harvestTimeHi: 'अक्टूबर - नवंबर',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
    suitability: 82,
    details: {
      soilPrepKey: 'soybeanSoilPrep',
      diseasesKey: 'soybeanDiseases',
      pestControlKey: 'soybeanPestControl',
      harvestingKey: 'soybeanHarvesting',
    },
    postHarvestTipKey: 'tipSoybean',
  },
  {
    id: '4',
    name: 'Cotton',
    nameHi: 'कपास',
    yield: '12 quintals/acre',
    yieldHi: '12 क्विंटल/एकड़',
    profit: 'high',
    profitMargin: '₹55,000/acre',
    sowingTime: 'April - May',
    sowingTimeHi: 'अप्रैल - मई',
    harvestTime: 'October - January',
    harvestTimeHi: 'अक्टूबर - जनवरी',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
    suitability: 85,
    details: {
      soilPrepKey: 'cottonSoilPrep',
      diseasesKey: 'cottonDiseases',
      pestControlKey: 'cottonPestControl',
      harvestingKey: 'cottonHarvesting',
    },
    postHarvestTipKey: 'tipCotton',
  },
  {
    id: '5',
    name: 'Sugarcane',
    nameHi: 'गन्ना',
    yield: '40 tonnes/acre',
    yieldHi: '40 टन/एकड़',
    profit: 'high',
    profitMargin: '₹80,000/acre',
    sowingTime: 'October - March',
    sowingTimeHi: 'अक्टूबर - मार्च',
    harvestTime: '12-18 months after sowing',
    harvestTimeHi: 'बुवाई के 12-18 महीने बाद',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
    suitability: 90,
    details: {
      soilPrepKey: 'sugarcaneSoilPrep',
      diseasesKey: 'sugarcaneDiseases',
      pestControlKey: 'sugarcanePestControl',
      harvestingKey: 'sugarcaneHarvesting',
    },
    postHarvestTipKey: 'tipSugarcane',
  }
];

const fertilizerSchedule = [
  { stage: 'Sowing', stageHi: 'बुआई', fertilizer: 'DAP - 50 kg/acre', fertilizerHi: 'डीएपी - 50 किलो/एकड़', timing: 'At sowing time', timingHi: 'बुआई के समय' },
  { stage: 'Tillering', stageHi: 'कल्ले निकलना', fertilizer: 'Urea - 25 kg/acre', fertilizerHi: 'यूरिया - 25 किलो/एकड़', timing: '20-25 days after sowing', timingHi: 'बुआई के 20-25 दिन बाद' },
  { stage: 'Flowering', stageHi: 'फूल आना', fertilizer: 'Potash - 20 kg/acre', fertilizerHi: 'पोटाश - 20 किलो/एकड़', timing: '45-50 days after sowing', timingHi: 'बुआई के 45-50 दिन बाद' }
];

const cropRotationData = [
  { seasonKey: 'kharif', cropKey: 'rice', benefitKeys: ['riceBenefit1', 'riceBenefit2'], colorClasses: { bg: 'bg-green-50', border: 'border-green-200', text: 'text-green-800', accent: 'text-green-600', buttonBg: 'bg-green-600', } },
  { seasonKey: 'rabi', cropKey: 'wheat', benefitKeys: ['wheatBenefit1', 'wheatBenefit2'], colorClasses: { bg: 'bg-orange-50', border: 'border-orange-200', text: 'text-orange-800', accent: 'text-orange-600', buttonBg: 'bg-orange-600', } },
  { seasonKey: 'summer', cropKey: 'legumes', benefitKeys: ['legumesBenefit1', 'legumesBenefit2'], colorClasses: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-800', accent: 'text-blue-600', buttonBg: 'bg-blue-600', } }
];

const HarvestPlanner = ({ content, langCode }: { content: typeof guidanceContent.en.harvestPlanner, langCode: string }) => {
  const [selectedCrop, setSelectedCrop] = useState('');
  const [sowingDate, setSowingDate] = useState('');
  const [forecast, setForecast] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleForecast = () => {
    if (!selectedCrop || !sowingDate) return;
    setIsLoading(true);
    setTimeout(() => {
      const cropData = cropSuggestions.find(c => c.name === selectedCrop);
      const mockForecast = {
        window: langCode === 'hi' ? '28 अक्टूबर - 3 नवंबर, 2025' : 'Oct 28 - Nov 3, 2025',
        tip: guidanceContent[langCode as 'en' | 'hi'].harvestPlanner[cropData?.postHarvestTipKey as 'tipRice'],
        daily: [
          { day: langCode === 'hi' ? 'मंगल' : 'Tue', date: 28, Icon: Sun, temp: 29, rain: 5 },
          { day: langCode === 'hi' ? 'बुध' : 'Wed', date: 29, Icon: Sun, temp: 30, rain: 10 },
          { day: langCode === 'hi' ? 'गुरु' : 'Thu', date: 30, Icon: Cloudy, temp: 28, rain: 20 },
          { day: langCode === 'hi' ? 'शुक्र' : 'Fri', date: 31, Icon: Sun, temp: 31, rain: 0, optimal: true },
          { day: langCode === 'hi' ? 'शनि' : 'Sat', date: 1, Icon: CloudRain, temp: 27, rain: 60 },
          { day: langCode === 'hi' ? 'रवि' : 'Sun', date: 2, Icon: Sun, temp: 29, rain: 15 },
          { day: langCode === 'hi' ? 'सोम' : 'Mon', date: 3, Icon: Cloudy, temp: 29, rain: 25 },
        ]
      };
      setForecast(mockForecast);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="bg-teal-100 p-2 rounded-full"><Warehouse className="w-5 h-5 text-teal-600"/></div>
        <h3 className="font-semibold text-gray-700">{content.title}</h3>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-medium text-gray-600 block mb-1">{content.selectCrop}</label>
          <select value={selectedCrop} onChange={e => setSelectedCrop(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md bg-white focus:ring-2 focus:ring-green-500">
            <option value="">--</option>
            {cropSuggestions.map(c => <option key={c.id} value={c.name}>{langCode === 'hi' ? c.nameHi : c.name}</option>)}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium text-gray-600 block mb-1">{content.selectSowingDate}</label>
          <input type="date" value={sowingDate} onChange={e => setSowingDate(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"/>
        </div>
      </div>
      <SimpleButton onClick={handleForecast} className="w-full" disabled={isLoading || !selectedCrop || !sowingDate}>
        {isLoading ? 'Forecasting...' : content.forecastButton}
      </SimpleButton>

      {forecast && (
        <div className="border-t pt-4 mt-4 space-y-4">
          <div>
            <h4 className="font-semibold text-gray-600 mb-2">{content.harvestWindow}: <span className="text-green-600">{forecast.window}</span></h4>
            <div className="flex items-center justify-around bg-gray-50 p-2 rounded-lg text-center">
              {forecast.daily.map((d: any) => (
                <div key={d.date} className={`p-2 rounded-lg transition-all ${d.optimal ? 'bg-green-100 ring-2 ring-green-500' : ''}`}>
                  <div className="text-xs font-medium text-gray-500">{d.day}</div>
                  <d.Icon className={`w-6 h-6 my-1 mx-auto ${d.optimal ? 'text-green-600' : 'text-gray-400'}`} />
                  <div className="text-sm font-semibold">{d.temp}°</div>
                  {d.optimal && <div className="text-xs text-green-600 font-bold -mb-1 mt-1">{content.optimalDay}</div>}
                </div>
              ))}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-gray-600 mb-2">{content.postHarvestTips}</h4>
            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 rounded-r-lg">
              <p className="text-sm text-blue-800">{forecast.tip}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


export function CropGuidance({ selectedLanguage, onNavigate, onLanguageChange }: CropGuidanceProps) {
  const [selectedCrop, setSelectedCrop] = useState<(typeof cropSuggestions[0] & { details: any }) | null>(null);
  const [activeRotationIndex, setActiveRotationIndex] = useState(0);

  const langCode = selectedLanguage?.code || 'en';
  const content = guidanceContent[langCode as keyof typeof guidanceContent] || guidanceContent.en;

  const getProfitColor = (profit: string) => {
    switch (profit) {
      case 'high': return 'text-green-600 bg-green-100';
      case 'medium': return 'text-orange-600 bg-orange-100';
      case 'low': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getProfitText = (profit: string) => {
    switch (profit) {
      case 'high': return content.highProfit;
      case 'medium': return content.mediumProfit;
      case 'low': return content.lowProfit;
      default: return profit;
    }
  };
  
  const activeSeasonData = cropRotationData[activeRotationIndex];

  if (selectedCrop) {
    return (
      <div className="flex flex-col h-screen bg-gray-50">
        <div className="bg-green-600 text-white p-4 sticky top-0 z-10 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <SimpleButton onClick={() => setSelectedCrop(null)} variant="ghost" size="icon" className="text-white hover:bg-green-700">
                <ArrowLeft className="w-6 h-6" />
              </SimpleButton>
              <div>
                <h1 className="text-xl font-bold">{langCode === 'hi' ? selectedCrop.nameHi : selectedCrop.name}</h1>
                <p className="text-sm text-green-100">Detailed Guidance</p>
              </div>
            </div>
            <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={onLanguageChange} variant="header"/>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="bg-white rounded-xl shadow-sm border p-4">
            <div className="flex items-start space-x-4 mb-4">
              <ImageWithFallback src={selectedCrop.image} alt={selectedCrop.name} className="w-20 h-20 rounded-lg object-cover"/>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-gray-800 mb-2">{langCode === 'hi' ? selectedCrop.nameHi : selectedCrop.name}</h2>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 bg-green-50 rounded-lg text-center">
                    <div className="text-xs text-green-700">{content.yieldEstimate}</div>
                    <div className="font-semibold text-green-800 text-sm">{langCode === 'hi' ? selectedCrop.yieldHi : selectedCrop.yield}</div>
                  </div>
                  <div className="p-2 bg-blue-50 rounded-lg text-center">
                    <div className="text-xs text-blue-700">{content.profitability}</div>
                    <div className="font-semibold text-blue-800 text-sm">{selectedCrop.profitMargin}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className={`px-3 py-1 rounded-full text-xs font-medium ${getProfitColor(selectedCrop.profit)}`}>{getProfitText(selectedCrop.profit)}</div>
              <div className="text-right">
                <div className="text-xs text-gray-500">Suitability</div>
                <div className="font-semibold text-green-600">{selectedCrop.suitability}%</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border p-4">
              <h3 className="font-semibold mb-3 flex items-center text-gray-700"><Calendar className="w-5 h-5 mr-2 text-blue-500" />{content.sowingCalendar}</h3>
              <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1"><Sprout className="w-4 h-4 text-green-600" /><span className="font-medium text-green-800 text-sm">{content.sowingTime}</span></div>
                    <p className="text-green-700 text-sm">{langCode === 'hi' ? selectedCrop.sowingTimeHi : selectedCrop.sowingTime}</p>
                  </div>
                  <div className="p-3 bg-orange-50 rounded-lg">
                    <div className="flex items-center space-x-2 mb-1"><Sun className="w-4 h-4 text-orange-600" /><span className="font-medium text-orange-800 text-sm">{content.harvestTime}</span></div>
                    <p className="text-orange-700 text-sm">{langCode === 'hi' ? selectedCrop.harvestTimeHi : selectedCrop.harvestTime}</p>
                  </div>
              </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-4">
            <h3 className="font-semibold mb-3 flex items-center text-gray-700"><Beaker className="w-5 h-5 mr-2 text-purple-500" />{content.fertilizerSchedule}</h3>
            <div className="space-y-2">
              {fertilizerSchedule.map((s, i) => (
                <div key={i} className="flex items-center space-x-3 p-2 bg-purple-50 rounded-lg">
                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">{i + 1}</div>
                  <div className="flex-1">
                    <div className="font-semibold text-purple-800 text-sm">{langCode === 'hi' ? s.stageHi : s.stage}</div>
                    <div className="text-xs text-purple-600">{langCode === 'hi' ? s.fertilizerHi : s.fertilizer}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-4">
              <h3 className="font-semibold mb-4 flex items-center text-gray-700"><BookOpen className="w-5 h-5 mr-2 text-indigo-500" />{content.cropEncyclopedia}</h3>
              <div className="space-y-4">
                  <div>
                      <h4 className="font-medium text-gray-600 flex items-center mb-1"><Tractor className="w-4 h-4 mr-2 text-yellow-600"/>{content.soilPreparation}</h4>
                      <p className="text-sm text-gray-500 pl-6 border-l-2 border-yellow-200 ml-2 py-1">{String(content[selectedCrop.details.soilPrepKey as keyof typeof content])}</p>
                  </div>
                  <div>
                      <h4 className="font-medium text-gray-600 flex items-center mb-1"><Biohazard className="w-4 h-4 mr-2 text-red-600"/>{content.commonDiseases}</h4>
                      <p className="text-sm text-gray-500 pl-6 border-l-2 border-red-200 ml-2 py-1">{String(content[selectedCrop.details.diseasesKey as keyof typeof content])}</p>
                  </div>
                  <div>
                      <h4 className="font-medium text-gray-600 flex items-center mb-1"><Bug className="w-4 h-4 mr-2 text-green-600"/>{content.pestControl}</h4>
                      <p className="text-sm text-gray-500 pl-6 border-l-2 border-green-200 ml-2 py-1">{String(content[selectedCrop.details.pestControlKey as keyof typeof content])}</p>
                  </div>
                  <div>
                      <h4 className="font-medium text-gray-600 flex items-center mb-1"><Sprout className="w-4 h-4 mr-2 text-cyan-600"/>{content.harvesting}</h4>
                      <p className="text-sm text-gray-500 pl-6 border-l-2 border-cyan-200 ml-2 py-1">{String(content[selectedCrop.details.harvestingKey as keyof typeof content])}</p>
                  </div>
              </div>
          </div>
          
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-green-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <SimpleButton onClick={() => onNavigate('new-dashboard')} variant="ghost" size="icon" className="text-white hover:bg-green-700">
                    <ArrowLeft className="w-6 h-6" />
                </SimpleButton>
                <div>
                    <h1 className="text-xl font-bold">{content.title}</h1>
                    <p className="text-sm text-green-100">{content.subtitle}</p>
                </div>
            </div>
            <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={onLanguageChange} variant="header"/>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <h2 className="font-semibold mb-2 text-gray-700">{content.currentSeason}: Kharif 2024</h2>
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-blue-800 text-sm mb-1">🌧️ Monsoon is ideal for rice & cotton.</p>
            <p className="text-xs text-blue-600">{content.nextSeason}: Wheat performs better in Rabi.</p>
          </div>
        </div>
        
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <h2 className="font-semibold mb-3 text-gray-700">{content.recommendedCrops}</h2>
          <div className="space-y-3">
            {cropSuggestions.map((crop) => (
              <SimpleButton key={crop.id} onClick={() => setSelectedCrop(crop as any)} variant="outline" className="w-full p-3 h-auto justify-between text-left">
                <div className="flex items-center space-x-3">
                  <ImageWithFallback src={crop.image} alt={crop.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-gray-800">{langCode === 'hi' ? crop.nameHi : crop.name}</h3>
                        <div className={`px-2 py-0.5 rounded text-xs font-medium ${getProfitColor(crop.profit)}`}>{getProfitText(crop.profit)}</div>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                        <div><div className="text-gray-500">Yield</div><div className="font-medium text-green-600">{langCode === 'hi' ? crop.yieldHi : crop.yield}</div></div>
                        <div><div className="text-gray-500">Profit</div><div className="font-medium text-blue-600">{crop.profitMargin}</div></div>
                        <div><div className="text-gray-500">Suitability</div><div className="font-medium text-purple-600">{crop.suitability}%</div></div>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-5 h-5 text-gray-400" />
              </SimpleButton>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
          <div>
              <h3 className="font-semibold mb-4 flex items-center text-gray-700"><RotateCcw className="w-5 h-5 mr-2 text-green-500" />{content.cropRotation}</h3>
              <div className="flex items-center justify-between px-1 mb-4">
                {cropRotationData.map((season, index) => (
                  <React.Fragment key={season.seasonKey}>
                    <div className="flex flex-col items-center text-center">
                      <button onClick={() => setActiveRotationIndex(index)} className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-white transition-all duration-300 ${activeRotationIndex === index ? `${season.colorClasses.buttonBg} scale-110` : 'bg-gray-300'}`}>{index + 1}</button>
                      <span className={`mt-2 text-xs font-medium w-16 ${activeRotationIndex === index ? season.colorClasses.accent : 'text-gray-500'}`}>{String(content[season.seasonKey as keyof typeof content])}</span>
                    </div>
                    {index < cropRotationData.length - 1 && (<div className="flex-1 h-0.5 bg-gray-200 -mx-2"></div>)}
                  </React.Fragment>
                ))}
              </div>
              <div className={`p-3 rounded-lg border transition-all duration-300 ${activeSeasonData.colorClasses.bg} ${activeSeasonData.colorClasses.border}`}>
                <h4 className={`font-semibold mb-2 text-sm ${activeSeasonData.colorClasses.text}`}>{content.cropForSeason} <span className={activeSeasonData.colorClasses.accent}>{String(content[activeSeasonData.cropKey as keyof typeof content])}</span></h4>
                <ul className="space-y-1.5">
                  {activeSeasonData.benefitKeys.map(key => (
                      <li key={key} className={`flex items-start space-x-2 text-xs ${activeSeasonData.colorClasses.text}`}>
                          <CheckCircle2 className={`w-3.5 h-3.5 mt-0.5 flex-shrink-0 ${activeSeasonData.colorClasses.accent}`} />
                          <span>{String(content[key as keyof typeof content])}</span>
                      </li>
                  ))}
                </ul>
              </div>
          </div>
          <div className="border-t pt-4">
             <h4 className="font-semibold text-gray-600 text-sm mb-3">{content.cropRotationDetailsTitle}</h4>
             <div className="space-y-3">
               <div className="flex items-start space-x-3">
                    <div className="bg-green-100 p-2 rounded-full"><Sprout className="w-5 h-5 text-green-600"/></div>
                    <div>
                        <h5 className="font-medium text-sm text-green-800">{content.soilHealthBenefitTitle}</h5>
                        <p className="text-xs text-gray-500">{content.soilHealthBenefitDesc}</p>
                    </div>
               </div>
                <div className="flex items-start space-x-3">
                    <div className="bg-red-100 p-2 rounded-full"><Shield className="w-5 h-5 text-red-600"/></div>
                    <div>
                        <h5 className="font-medium text-sm text-red-800">{content.pestManagementBenefitTitle}</h5>
                        <p className="text-xs text-gray-500">{content.pestManagementBenefitDesc}</p>
                    </div>
                </div>
                 <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full"><Droplets className="w-5 h-5 text-blue-600"/></div>
                    <div>
                        <h5 className="font-medium text-sm text-blue-800">{content.nutrientBenefitTitle}</h5>
                        <p className="text-xs text-gray-500">{content.nutrientBenefitDesc}</p>
                    </div>
                </div>
             </div>
          </div>
        </div>
        
        {/* --- HARVEST PLANNER MOVED HERE --- */}
        <HarvestPlanner content={content.harvestPlanner} langCode={langCode} />
        
      </div>
    </div>
  );
}

