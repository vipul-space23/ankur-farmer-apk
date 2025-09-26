import React, { useState } from 'react';
import { 
  Cloud, CloudRain, Sun, Droplets, Wind, Thermometer,
  Wheat, Users, ShoppingCart, User, Bell, BellDot,
  TestTube, Camera, MapPin, FileText, Sprout, TrendingUp
} from 'lucide-react';
import { Language, User as UserType, Screen } from '../App';
import { SimpleButton } from './simple-button';
import { LanguageSelector } from './language-selector';

interface FarmerDashboardProps {
  selectedLanguage: Language | null;
  user: UserType | null;
  onNavigate: (screen: Screen) => void;
  onLanguageChange: (language: Language) => void;
}
export type User = {
  name: string;
  location: string;
  fieldLocation?: {
    address: string;
  };
};
const dashboardContent = {
  en: {
    greeting: "Good morning",
    weatherTitle: "Today's Weather",
    irrigationNeeded: "Irrigation Recommended",
    irrigationNotNeeded: "No Irrigation Needed",
    viewDetails: "View 7-Day Plan",
    requestSoilTest: "Request Soil Test",
    soilTestDesc: "Get detailed soil analysis",
    diseaseDetection: "Disease Detection",
    diseaseDesc: "Scan crop diseases",
    agroShops: "Agricultural Shops",
    agroShopsDesc: "Find nearby suppliers",
    govSchemes: "Government Schemes",
    govSchemesDesc: "Available benefits",
    yourCrops: "Your Crops",
    community: "Community",
    market: "Market",
    profile: "Profile",
    notifications: "Notifications",
    newNotifications: "New alerts available"
  },
  hi: {
    greeting: "सुप्रभात",
    weatherTitle: "आज का मौसम",
    irrigationNeeded: "सिंचाई की सिफारिश",
    irrigationNotNeeded: "सिंचाई की जरूरत नहीं",
    viewDetails: "7-दिन की योजना देखें",
    requestSoilTest: "मिट्टी परीक्षण का अनुरोध",
    soilTestDesc: "विस्तृत मिट्टी विश्लेषण प्राप्त करें",
    diseaseDetection: "रोग जांच",
    diseaseDesc: "फसल रोगों को स्कैन करें",
    agroShops: "कृषि दुकानें",
    agroShopsDesc: "नजदीकी आपूर्तिकर्ता खोजें",
    govSchemes: "सरकारी योजनाएं",
    govSchemesDesc: "उपलब्ध लाभ",
    yourCrops: "आपकी फसलें",
    community: "समुदाय",
    market: "बाजार",
    profile: "प्रोफाइल",
    notifications: "सूचनाएं",
    newNotifications: "नई अलर्ट उपलब्ध"
  },
  ta: {
    greeting: "காலை வணக்கம்",
    weatherTitle: "இன்றைய வானிலை",
    irrigationNeeded: "நீர்ப்பாசனம் பரிந்துரைக்கப்படுகிறது",
    irrigationNotNeeded: "நீர்ப்பாசனம் தேவையில்லை",
    viewDetails: "7-நாள் திட்டத்தைக் காண்க",
    requestSoilTest: "மண் பரிசோதனை கோரிக்கை",
    soilTestDesc: "விரிவான மண் பகுப்பாய்வு பெறுங்கள்",
    diseaseDetection: "நோய் கண்டறிதல்",
    diseaseDesc: "பயிர் நோய்களை ஸ்கேன் செய்யுங்கள்",
    agroShops: "விவசாய கடைகள்",
    agroShopsDesc: "அருகிலுள்ள சப்ளையர்களைக் கண்டறியவும்",
    govSchemes: "அரசு திட்டங்கள்",
    govSchemesDesc: "கிடைக்கும் பலன்கள்",
    yourCrops: "உங்கள் பயிர்கள்",
    community: "சமுதாயம்",
    market: "சந்தை",
    profile: "சுயவிவரம்",
    notifications: "அறிவிப்புகள்",
    newNotifications: "புதிய எச்சரிக்கைகள் உள்ளன"
  },
  te: {
    greeting: "శుభోదయం",
    weatherTitle: "నేటి వాతావరణం",
    irrigationNeeded: "నీటిపారుదల సిఫార్సు చేయబడింది",
    irrigationNotNeeded: "నీటిపారుదల అవసరం లేదు",
    viewDetails: "7-రోజుల ప్లాన్ చూడండి",
    requestSoilTest: "మట్టి పరీక్ష అభ్యర్థన",
    soilTestDesc: "వివరణాత్మక మట్టి విశ్లేషణ పొందండి",
    diseaseDetection: "వ్యాధి గుర్తింపు",
    diseaseDesc: "పంట వ్యాధులను స్కాన్ చేయండి",
    agroShops: "వ్యవసాయ దుకాణాలు",
    agroShopsDesc: "సమీపంలోని సరఫరాదారులను కనుగొనండి",
    govSchemes: "ప్రభుత్వ పథకాలు",
    govSchemesDesc: "అందుబాటులో ఉన్న ప్రయోజనాలు",
    yourCrops: "మీ పంటలు",
    community: "సంఘం",
    market: "మార్కెట్",
    profile: "ప్రొఫైల్",
    notifications: "నోటిఫికేషన్లు",
    newNotifications: "కొత్త హెచ్చరికలు అందుబాటులో ఉన్నాయి"
  },
  bn: {
    greeting: "সুপ্রভাত",
    weatherTitle: "আজকের আবহাওয়া",
    irrigationNeeded: "সেচের সুপারিশ",
    irrigationNotNeeded: "সেচের প্রয়োজন নেই",
    viewDetails: "৭-দিনের পরিকল্পনা দেখুন",
    requestSoilTest: "মাটি পরীক্ষার অনুরোধ",
    soilTestDesc: "বিস্তারিত মাটি বিশ্লেষণ পান",
    diseaseDetection: "রোগ সনাক্তকরণ",
    diseaseDesc: "ফসলের রোগ স্ক্যান করুন",
    agroShops: "কৃষি দোকান",
    agroShopsDesc: "কাছের সরবরাহকারী খুঁজুন",
    govSchemes: "সরকারি স্কিম",
    govSchemesDesc: "উপলব্ধ সুবিধা",
    yourCrops: "আপনার ফসল",
    community: "সম্প্রদায়",
    market: "বাজার",
    profile: "প্রোফাইল",
    notifications: "বিজ্ঞপ্তি",
    newNotifications: "নতুন সতর্কতা উপলব্ধ"
  },
  mr: {
    greeting: "सुप्रभात",
    weatherTitle: "आजचे हवामान",
    irrigationNeeded: "पाणी पुरवठा शिफारसीय",
    irrigationNotNeeded: "पाणी पुरवठा आवश्यक नाही",
    viewDetails: "७-दिवसांची योजना पहा",
    requestSoilTest: "मातीची चाचणी विनंती",
    soilTestDesc: "तपशीलवार माती विश्लेषण मिळवा",
    diseaseDetection: "रोग ओळख",
    diseaseDesc: "पीक रोग स्कॅन करा",
    agroShops: "कृषी दुकाने",
    agroShopsDesc: "जवळचे पुरवठादार शोधा",
    govSchemes: "सरकारी योजना",
    govSchemesDesc: "उपलब्ध फायदे",
    yourCrops: "तुमचे पीक",
    community: "समुदाय",
    market: "बाजार",
    profile: "प्रोफाइल",
    notifications: "सूचना",
    newNotifications: "नवीन अलर्ट उपलब्ध"
  },
  gu: {
    greeting: "સુપ્રભાત",
    weatherTitle: "આજનું હવામાન",
    irrigationNeeded: "સિંચાઈ ભલામણ",
    irrigationNotNeeded: "સિંચાઈની જરૂર નથી",
    viewDetails: "૧-દિવસની યોજના જુઓ",
    requestSoilTest: "માટી પરીક્ષણ વિનંતી",
    soilTestDesc: "વિગતવાર માટી વિશ્લેષણ મેળવો",
    diseaseDetection: "રોગ શોધ",
    diseaseDesc: "પાક રોગો સ્કેન કરો",
    agroShops: "કૃષિ દુકાનો",
    agroShopsDesc: "નજીકના સપ્લાયર્સ શોધો",
    govSchemes: "સરકારી યોજનાઓ",
    govSchemesDesc: "ઉપલબ્ધ લાભો",
    yourCrops: "તમારા પાક",
    community: "સમુદાય",
    market: "માર્કેટ",
    profile: "પ્રોફાઇલ",
    notifications: "સૂચનાઓ",
    newNotifications: "નવા અલર્ટ ઉપલબ્ધ"
  },
  kn: {
    greeting: "ಶುಭೋದಯ",
    weatherTitle: "ಇಂದಿನ ಹವಾಮಾನ",
    irrigationNeeded: "ನೀರಾವರಿ ಶಿಫಾರಸು",
    irrigationNotNeeded: "ನೀರಾವರಿ ಅಗತ್ಯವಿಲ್ಲ",
    viewDetails: "೭-ದಿನಗಳ ಯೋಜನೆ ನೋಡಿ",
    requestSoilTest: "ಮಣ್ಣಿನ ಪರೀಕ್ಷೆಯ ಮನವಿ",
    soilTestDesc: "ವಿವರವಾದ ಮಣ್ಣಿನ ವಿಶ್ಲೇಷಣೆ ಪಡೆಯಿರಿ",
    diseaseDetection: "ರೋಗ ಪತ್ತೆ",
    diseaseDesc: "ಬೆಳೆ ರೋಗಗಳನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ",
    agroShops: "ಕೃಷಿ ಅಂಗಡಿಗಳು",
    agroShopsDesc: "ಹತ್ತಿರದ ಪೂರೈಕೆದಾರರನ್ನು ಹುಡುಕಿ",
    govSchemes: "ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
    govSchemesDesc: "ಲಭ್ಯವಿರುವ ಪ್ರಯೋಜನಗಳು",
    yourCrops: "ನಿಮ್ಮ ಬೆಳೆಗಳು",
    community: "ಸಮುದಾಯ",
    market: "ಮಾರುಕಟ್ಟೆ",
    profile: "ಪ್ರೊಫೈಲ್",
    notifications: "ಅಧಿಸೂಚನೆಗಳು",
    newNotifications: "ಹೊಸ ಎಚ್ಚರಿಕೆಗಳು ಲಭ್ಯವಿದೆ"
  },
  ml: {
    greeting: "സുപ്രഭാതം",
    weatherTitle: "ഇന്നത്തെ കാലാവസ്ഥ",
    irrigationNeeded: "ജലസേചനം ശുപാർശ ചെയ്യുന്നു",
    irrigationNotNeeded: "ജലസേചനം ആവശ്യമില്ല",
    viewDetails: "7-ദിവസത്തെ പ്ലാൻ കാണുക",
    requestSoilTest: "മണ്ണ് പരിശോധന അഭ്യർത്ഥന",
    soilTestDesc: "വിശദമായ മണ്ണ് വിശകലനം നേടുക",
    diseaseDetection: "രോഗ കണ്ടെത്തൽ",
    diseaseDesc: "വിള രോഗങ്ങൾ സ്കാൻ ചെയ്യുക",
    agroShops: "കാർഷിക കടകൾ",
    agroShopsDesc: "അടുത്തുള്ള വിതരണക്കാരെ കണ്ടെത്തുക",
    govSchemes: "സർക്കാർ പദ്ധതികൾ",
    govSchemesDesc: "ലഭ്യമായ ആനുകൂല്യങ്ങൾ",
    yourCrops: "നിങ്ങളുടെ വിളകൾ",
    community: "സമൂഹം",
    market: "മാർക്കറ്റ്",
    profile: "പ്രൊഫൈൽ",
    notifications: "അറിയിപ്പുകൾ",
    newNotifications: "പുതിയ മുന്നറിയിപ്പുകൾ ലഭ്യമാണ്"
  },
  pa: {
    greeting: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
    weatherTitle: "ਅੱਜ ਦਾ ਮੌਸਮ",
    irrigationNeeded: "ਸਿੰਚਾਈ ਦੀ ਸਿਫਾਰਸ਼",
    irrigationNotNeeded: "ਸਿੰਚਾਈ ਦੀ ਲੋੜ ਨਹੀਂ",
    viewDetails: "7-ਦਿਨਾਂ ਦੀ ਯੋਜਨਾ ਵੇਖੋ",
    requestSoilTest: "ਮਿੱਟੀ ਟੈਸਟ ਬੇਨਤੀ",
    soilTestDesc: "ਵਿਸਤ੍ਰਿਤ ਮਿੱਟੀ ਵਿਸ਼ਲੇਸ਼ਣ ਪ੍ਰਾਪਤ ਕਰੋ",
    diseaseDetection: "ਬਿਮਾਰੀ ਦੀ ਪਛਾਣ",
    diseaseDesc: "ਫਸਲਾਂ ਦੀਆਂ ਬਿਮਾਰੀਆਂ ਸਕੈਨ ਕਰੋ",
    agroShops: "ਖੇਤੀਬਾੜੀ ਦੁਕਾਨਾਂ",
    agroShopsDesc: "ਨੇੜਲੇ ਸਪਲਾਈਅਰ ਲੱਭੋ",
    govSchemes: "ਸਰਕਾਰੀ ਯੋਜਨਾਵਾਂ",
    govSchemesDesc: "ਉਪਲਬਧ ਲਾਭ",
    yourCrops: "ਤੁਹਾਡੀਆਂ ਫਸਲਾਂ",
    community: "ਕਮਿਊਨਿਟੀ",
    market: "ਮਾਰਕੀਟ",
    profile: "ਪ੍ਰੋਫਾਈਲ",
    notifications: "ਨੋਟੀਫਿਕੇਸ਼ਨਾਂ",
    newNotifications: "ਨਵੇਂ ਅਲਰਟ ਉਪਲਬਧ"
  },
  ur: {
    greeting: "صبح بخیر",
    weatherTitle: "آج کا موسم",
    irrigationNeeded: "آبپاشی کی سفارش",
    irrigationNotNeeded: "آبپاشی کی ضرورت نہیں",
    viewDetails: "7-دن کا منصوبہ دیکھیں",
    requestSoilTest: "مٹی کے ٹیسٹ کی درخواست",
    soilTestDesc: "تفصیلی مٹی کا تجزیہ حاصل کریں",
    diseaseDetection: "بیماری کی تشخیص",
    diseaseDesc: "فصل کی بیماریاں سکین کریں",
    agroShops: "زرعی دکانیں",
    agroShopsDesc: "قریبی سپلائرز تلاش کریں",
    govSchemes: "سرکاری اسکیمیں",
    govSchemesDesc: "دستیاب فوائد",
    yourCrops: "آپ کی فصلیں",
    community: "کمیونٹی",
    market: "مارکیٹ",
    profile: "پروفائل",
    notifications: "اطلاعات",
    newNotifications: "نئے الرٹ دستیاب"
  },
  as: {
    greeting: "শুভ প্ৰভাত",
    weatherTitle: "আজিৰ বতৰ",
    irrigationNeeded: "জলসিঞ্চনৰ পৰামৰ্শ",
    irrigationNotNeeded: "জলসিঞ্চনৰ প্ৰয়োজন নাই",
    viewDetails: "৭-দিনৰ পৰিকল্পনা চাওক",
    requestSoilTest: "মাটি পৰীক্ষাৰ অনুৰোধ",
    soilTestDesc: "বিশদ মাটি বিশ্লেষণ লাভ কৰক",
    diseaseDetection: "ৰোগ চিনাক্তকৰণ",
    diseaseDesc: "শস্যৰ ৰোগ স্কেন কৰক",
    agroShops: "কৃষি দোকান",
    agroShopsDesc: "ওচৰৰ যোগানকাৰী বিচাৰক",
    govSchemes: "চৰকাৰী আঁচনি",
    govSchemesDesc: "উপলব্ধ সুবিধা",
    yourCrops: "আপোনাৰ শস্য",
    community: "সম্প্ৰদায়",
    market: "বজাৰ",
    profile: "প্ৰ'ফাইল",
    notifications: "জাননী",
    newNotifications: "নতুন সতৰ্কবাণী উপলব্ধ"
  },
  or: {
    greeting: "ଶୁଭ ପ୍ରଭାତ",
    weatherTitle: "ଆଜିର ପାଣିପାଗ",
    irrigationNeeded: "ଜଳସେଚନ ସୁପାରିଶ",
    irrigationNotNeeded: "ଜଳସେଚନ ଆବଶ୍ୟକ ନାହିଁ",
    viewDetails: "୭-ଦିନର ଯୋଜନା ଦେଖନ୍ତୁ",
    requestSoilTest: "ମାଟି ପରୀକ୍ଷା ଅନୁରୋଧ",
    soilTestDesc: "ବିସ୍ତୃତ ମାଟି ବିଶ୍ଳେଷଣ ପାଆନ୍ତୁ",
    diseaseDetection: "ରୋଗ ଚିହ୍ନଟ",
    diseaseDesc: "ଫସଲ ରୋଗ ସ୍କାନ କରନ୍ତୁ",
    agroShops: "କୃଷି ଦୋକାନ",
    agroShopsDesc: "ନିକଟସ୍ଥ ଯୋଗାଣକାରୀ ଖୋଜନ୍ତୁ",
    govSchemes: "ସରକାରୀ ଯୋଜନା",
    govSchemesDesc: "ଉପଲବ୍ଧ ସୁବିଧା",
    yourCrops: "ଆପଣଙ୍କ ଫସଲ",
    community: "ସମ୍ପ୍ରଦାୟ",
    market: "ବଜାର",
    profile: "ପ୍ରୋଫାଇଲ",
    notifications: "ବିଜ୍ଞପ୍ତି",
    newNotifications: "ନୂଆ ସତର୍କତା ଉପଲବ୍ଧ"
  }
};

// Mock weather data
const getCurrentWeather = () => ({
  temperature: 28,
  condition: 'Partly Cloudy',
  humidity: 65,
  windSpeed: 8,
  rainProbability: 30,
  icon: Cloud,
  irrigationRecommended: Math.random() > 0.5
});

export function FarmerDashboard({ selectedLanguage, user, onNavigate, onLanguageChange }: FarmerDashboardProps) {
  const [hasNewNotifications, setHasNewNotifications] = useState(true);
  
  const langCode = selectedLanguage?.code || 'en';
  const content = dashboardContent[langCode as keyof typeof dashboardContent] || dashboardContent.en;
  const weather = getCurrentWeather();
  const WeatherIcon = weather.icon;

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-green-600 text-white p-6 sticky top-0 z-10 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-green-100 text-sm">{content.greeting}</p>
              <h1 className="text-xl font-bold">{user?.name || 'Farmer'}</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {/* Notification Bell */}
            <SimpleButton
              onClick={() => {
                setHasNewNotifications(false);
                // Handle notifications
              }}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-green-700 relative"
              title={content.notifications}
            >
              {hasNewNotifications ? (
                <BellDot className="w-5 h-5" />
              ) : (
                <Bell className="w-5 h-5" />
              )}
              {hasNewNotifications && (
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
              )}
            </SimpleButton>
            
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={onLanguageChange}
              variant="header"
            />
          </div>
        </div>
        
        <div className="flex items-center text-green-100 text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{user?.fieldLocation?.address || user?.location || 'Location not set'}</span>
        </div>
      </div>

      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto pb-20">
        <div className="p-6 space-y-6">
          {/* Weather Card */}
          <SimpleButton
            onClick={() => onNavigate('irrigation-suggestions')}
            variant="ghost"
            className="w-full p-0"
          >
            <div className="w-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">{content.weatherTitle}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <WeatherIcon className="w-6 h-6" />
                    <span className="text-2xl font-bold">{weather.temperature}°C</span>

                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-2">
                    <Droplets className="w-4 h-4" />
                    <span className="text-sm">{weather.humidity}%</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Wind className="w-4 h-4" />
                    <span className="text-sm">{weather.windSpeed} km/h</span>
                  </div>
                </div>
              </div>
              
              <div className={`flex items-center justify-between p-3 rounded-lg ${
                weather.irrigationRecommended 
                  ? 'bg-orange-500/20 border border-orange-300' 
                  : 'bg-green-500/20 border border-green-300'
              }`}>
                <div className="flex items-center space-x-2">
                  <Droplets className={`w-5 h-5 ${
                    weather.irrigationRecommended ? 'text-orange-200' : 'text-green-200'
                  }`} />
                  <span className="font-medium">
                    {weather.irrigationRecommended ? content.irrigationNeeded : content.irrigationNotNeeded}
                  </span>
                </div>
                <span className="text-sm bg-white/20 px-2 py-1 rounded-full">
                  {content.viewDetails}
                </span>
              </div>
            </div>
          </SimpleButton>

          {/* Main Action Cards */}
          <div className="grid grid-cols-2 gap-4">
            {/* Request Soil Test */}
            <SimpleButton
              onClick={() => onNavigate('soil-test')}
              variant="outline"
              className="h-32 flex flex-col items-center justify-center space-y-3 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 hover:from-amber-100 hover:to-amber-150"
            >
              <TestTube className="w-8 h-8 text-amber-600" />
              <div className="text-center">
                <div className="font-medium text-amber-800 text-sm">{content.requestSoilTest}</div>
                <div className="text-xs text-amber-600 mt-1">{content.soilTestDesc}</div>
              </div>
            </SimpleButton>

            {/* Disease Detection */}
            <SimpleButton
              onClick={() => onNavigate('disease-detection')}
              variant="outline"
              className="h-32 flex flex-col items-center justify-center space-y-3 bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:from-red-100 hover:to-red-150"
            >
              <Camera className="w-8 h-8 text-red-600" />
              <div className="text-center">
                <div className="font-medium text-red-800 text-sm">{content.diseaseDetection}</div>
                <div className="text-xs text-red-600 mt-1">{content.diseaseDesc}</div>
              </div>
            </SimpleButton>

            {/* Agricultural Shops */}
            <SimpleButton
              onClick={() => onNavigate('agro-shops-map')}
              variant="outline"
              className="h-32 flex flex-col items-center justify-center space-y-3 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:from-purple-100 hover:to-purple-150"
            >
              <MapPin className="w-8 h-8 text-purple-600" />
              <div className="text-center">
                <div className="font-medium text-purple-800 text-sm">{content.agroShops}</div>
                <div className="text-xs text-purple-600 mt-1">{content.agroShopsDesc}</div>
              </div>
            </SimpleButton>

            {/* Government Schemes */}
            <SimpleButton
              onClick={() => onNavigate('government-schemes')}
              variant="outline"
              className="h-32 flex flex-col items-center justify-center space-y-3 bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200 hover:from-indigo-100 hover:to-indigo-150"
            >
              <FileText className="w-8 h-8 text-indigo-600" />
              <div className="text-center">
                <div className="font-medium text-indigo-800 text-sm">{content.govSchemes}</div>
                <div className="text-xs text-indigo-600 mt-1">{content.govSchemesDesc}</div>
              </div>
            </SimpleButton>
          </div>

          {/* New Notifications Alert */}
          {hasNewNotifications && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-center space-x-3">
                <BellDot className="w-5 h-5 text-yellow-600" />
                <div>
                  <p className="text-yellow-800 font-medium">{content.notifications}</p>
                  <p className="text-yellow-700 text-sm">{content.newNotifications}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Bottom Navigation */}
      <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 shadow-lg">
        <div className="grid grid-cols-4 gap-1 p-2">
          <SimpleButton
            onClick={() => onNavigate('your-crops')}
            variant="ghost"
            className="flex flex-col items-center justify-center py-3 s pace-y-1 hover:bg-green-50"
          >
            <Sprout className="w-6 h-6 text-green-600" />
            <span className="text-xs text-green-700 font-medium">{content.yourCrops}</span>
          </SimpleButton>

          <SimpleButton
            onClick={() => onNavigate('community')}
            variant="ghost"
            className="flex flex-col items-center justify-center py-3 space-y-1 hover:bg-blue-50"
          >
            <Users className="w-6 h-6 text-blue-600" />
            <span className="text-xs text-blue-700 font-medium">{content.community}</span>
          </SimpleButton>

          <SimpleButton
            onClick={() => onNavigate('market')}
            variant="ghost"
            className="flex flex-col items-center justify-center py-3 space-y-1 hover:bg-orange-50"
          >
            <TrendingUp className="w-6 h-6 text-orange-600" />
            <span className="text-xs text-orange-700 font-medium">{content.market}</span>
          </SimpleButton>

          <SimpleButton
            onClick={() => onNavigate('profile')}
            variant="ghost"
            className="flex flex-col items-center justify-center py-3 space-y-1 hover:bg-gray-50"
          >
            <User className="w-6 h-6 text-gray-600" />
            <span className="text-xs text-gray-700 font-medium">{content.profile}</span>
          </SimpleButton>
        </div>
      </div>
    </div>
  );
}

