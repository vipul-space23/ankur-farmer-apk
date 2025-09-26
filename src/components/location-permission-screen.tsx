import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  Compass,
  CloudRain,
  TrendingUp,
  Wheat,
  Globe,
  ChevronDown,
} from "lucide-react";
import { Language } from "../App";
import { SimpleButton } from "./simple-button";

interface LocationPermissionScreenProps {
  language: Language | null;
  onLocationAllow: () => void;
  onLocationSkip: () => void;
  onLanguageChange: (language: Language) => void;
}

const locationContent = {
  en: {
    title: "Enable Location Access",
    allowButton: "Allow Location Access",
    skipButton: "Maybe Later",
    privacy: "Your location data is kept private and secure",
  },
  hi: {
    title: "स्थान की पहुंच सक्षम करें",
    allowButton: "स्थान की पहुंच की अनुमति दें",
    skipButton: "बाद में",
    privacy: "आपका स्थान डेटा निजी और सुरक्षित रखा जाता है",
  },
  ta: {
    title: "இடம் அணுகலை இயக்கவும்",
    allowButton: "இடம் அணுகலை அனுமதிக்கவும்",
    skipButton: "பின்னர்",
    privacy:
      "உங்கள் இட தரவு தனிமையாகவும் பாதுகாப்பாகவும் வைக்கப்படுகிறது",
  },
  te: {
    title: "స్థాన ప్రవేశాన్ని ప్రారంభించండి",
    allowButton: "స్థాన ప్రవేశాన్ని అనుమతించండి",
    skipButton: "తరువాత",
    privacy:
      "మీ స్థాన డేటా వ్యక్తిగతంగా మరియు సురక్షితంగా ఉంచబడుతుంది",
  },
  bn: {
    title: "অবস্থান অ্যাক্সেস সক্রিয় করুন",
    allowButton: "অবস্থান অ্যাক্সেসের অনুমতি দিন",
    skipButton: "পরে",
    privacy:
      "আপনার অবস্থানের ডেটা ব্যক্তিগত এবং নিরাপদ রাখা হয়",
  },
  mr: {
    title: "स्थान प्रवेश सक्षम करा",
    allowButton: "स्थान प्रवेशास परवानगी द्या",
    skipButton: "नंतर",
    privacy: "तुमचा स्थान डेटा खाजगी आणि सुरक्षित ठेवला जातो",
  },
  gu: {
    title: "સ્થાન ઍક્સેસ સક્ષમ કરો",
    allowButton: "સ્થાન ઍક્સેસની મંજૂરી આપો",
    skipButton: "પછીથી",
    privacy:
      "તમારો સ્થાન ડેટા ખાનગી અને સુરક્ષિત રાખવામાં આવે છે",
  },
  kn: {
    title: "ಸ್ಥಾನ ಪ್ರವೇಶವನ್ನು ಸಕ್ರಿಯಗೊಳಿಸಿ",
    allowButton: "ಸ್ಥಾನ ಪ್ರವೇಶಕ್ಕೆ ಅನುಮತಿ ನೀಡಿ",
    skipButton: "ನಂತರ",
    privacy:
      "ನಿಮ್ಮ ಸ್ಥಾನ ಡೇಟಾವನ್ನು ಖಾಸಗಿ ಮತ್ತು ಸುರಕ್ಷಿತವಾಗಿ ಇರಿಸಲಾಗುತ್ತದೆ",
  },
  ml: {
    title: "സ്ഥാന ആക്‌സസ് പ്രവർത്തനക്ഷമമാക്കുക",
    allowButton: "സ്ഥാന ആക്‌സസിന് അനുമതി നൽകുക",
    skipButton: "പിന്നീട്",
    privacy:
      "നിങ്ങളുടെ സ്ഥാന ഡാറ്റ സ്വകാര്യവും സുരക്ഷിതവുമായി സൂക്ഷിക്കുന്നു",
  },
  pa: {
    title: "ਸਥਾਨ ਪਹੁੰਚ ਯੋਗ ਬਣਾਓ",
    allowButton: "ਸਥਾਨ ਪਹੁੰਚ ਦੀ ਇਜਾਜ਼ਤ ਦਿਓ",
    skipButton: "ਬਾਅਦ ਵਿੱਚ",
    privacy:
      "ਤੁਹਾਡਾ ਸਥਾਨ ਡਾਟਾ ਨਿੱਜੀ ਅਤੇ ਸੁਰੱਖਿਅਤ ਰੱਖਿਆ ਜਾਂਦਾ ਹੈ",
  },
  ur: {
    title: "مقام کی رسائی فعال کریں",
    allowButton: "مقام کی رسائی کی اجازت دیں",
    skipButton: "بعد میں",
    privacy: "آپ کا مقام ڈیٹا نجی اور محفوظ رکھا جاتا ہے",
  },
  as: {
    title: "অৱস্থান প্ৰৱেশাধিকাৰ সক্ৰিয় কৰক",
    allowButton: "অৱস্থান প্ৰৱেশাধিকাৰৰ অনুমতি দিয়ক",
    skipButton: "পিছত",
    privacy:
      "আপোনাৰ অৱস্থানৰ তথ্য ব্যক্তিগত আৰু সুৰক্ষিত ৰখা হয়",
  },
  or: {
    title: "ସ୍ଥାନ ପ୍ରବେଶାଧିକାର ସକ୍ରିୟ କରନ୍ତୁ",
    allowButton: "ସ୍ଥାନ ପ୍ରବେଶାଧିକାରର ଅନୁମତି ଦିଅନ୍ତୁ",
    skipButton: "ପରେ",
    privacy: "ଆପଣଙ୍କ ସ୍ଥାନ ତଥ୍ୟ ବ୍ୟକ୍ତିଗତ ଏବଂ ସୁରକ୍ଷିତ ରଖାଯାଏ",
  },
};

const availableLanguages: Language[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇮🇳",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिंदी",
    flag: "🇮🇳",
  },
  {
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
    flag: "🇮🇳",
  },
  {
    code: "te",
    name: "Telugu",
    nativeName: "తెలుగు",
    flag: "🇮🇳",
  },
  {
    code: "bn",
    name: "Bengali",
    nativeName: "বাংলা",
    flag: "🇮🇳",
  },
  {
    code: "mr",
    name: "Marathi",
    nativeName: "मराठी",
    flag: "🇮🇳",
  },
  {
    code: "gu",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    flag: "🇮🇳",
  },
  {
    code: "kn",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    flag: "🇮🇳",
  },
  {
    code: "ml",
    name: "Malayalam",
    nativeName: "മലയാളം",
    flag: "🇮🇳",
  },
  {
    code: "pa",
    name: "Punjabi",
    nativeName: "ਪੰਜਾਬੀ",
    flag: "🇮🇳",
  },
  { code: "ur", name: "Urdu", nativeName: "اردو", flag: "🇮🇳" },
  {
    code: "as",
    name: "Assamese",
    nativeName: "অসমীয়া",
    flag: "🇮🇳",
  },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ", flag: "🇮🇳" },
];

export function LocationPermissionScreen({
  language,
  onLocationAllow,
  onLocationSkip,
  onLanguageChange,
}: LocationPermissionScreenProps) {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const langCode = language?.code || "en";
  const content =
    locationContent[langCode as keyof typeof locationContent] ||
    locationContent.en;

  const handleLocationRequest = () => {
    // In a real app, you would request location permission here
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log("Location granted:", position.coords);
          onLocationAllow();
        },
        (error) => {
          console.log("Location denied:", error);
          onLocationAllow(); // Still proceed even if denied
        },
      );
    } else {
      console.log("Geolocation not supported");
      onLocationAllow(); // Still proceed
    }
  };

  const handleLanguageSelect = (selectedLang: Language) => {
    onLanguageChange(selectedLang);
    setIsLanguageOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      {/* Simple Language Selector - Positioned at top right */}
      <div className="absolute top-6 right-6 z-20">
        <div className="relative">
          <SimpleButton
            onClick={() => setIsLanguageOpen(!isLanguageOpen)}
            variant="ghost"
            className="text-green-600 hover:bg-green-100 flex items-center space-x-1 px-3 py-2 rounded-lg bg-white shadow-sm"
          >
            <Globe className="w-4 h-4" />
            <span className="text-sm">
              {language?.flag || "🌐"}
            </span>
            <ChevronDown className="w-3 h-3" />
          </SimpleButton>

          {isLanguageOpen && (
            <>
              {/* Backdrop */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setIsLanguageOpen(false)}
              />

              {/* Dropdown */}
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-lg shadow-lg border z-50 max-h-60 overflow-y-auto">
                <div className="p-2">
                  {availableLanguages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => handleLanguageSelect(lang)}
                      className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 flex items-center space-x-2 ${
                        language?.code === lang.code
                          ? "bg-green-50 text-green-700"
                          : "text-gray-700"
                      }`}
                    >
                      <span className="text-base">
                        {lang.flag}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium truncate text-xs">
                          {lang.nativeName}
                        </div>
                      </div>
                      {language?.code === lang.code && (
                        <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-green-100 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-1/4 -left-8 w-16 h-16 bg-green-200 rounded-full opacity-40 animate-pulse delay-300"></div>
        <div className="absolute bottom-1/4 right-8 w-20 h-20 bg-green-150 rounded-full opacity-50 animate-pulse delay-700"></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative z-10">
        {/* Location Icon with Animation */}
        <div className="mb-12 relative">
          <div className="w-32 h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg agricultural-shadow">
            <MapPin className="w-16 h-16 text-white" />
          </div>

          {/* Animated Pulse Rings */}
          <div className="absolute inset-0 w-32 h-32 rounded-full border-4 border-green-300 opacity-20 animate-ping"></div>
          <div className="absolute inset-2 w-28 h-28 rounded-full border-2 border-green-400 opacity-30 animate-ping delay-150"></div>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-800">
            {content.title}
          </h1>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 w-full max-w-xs">
          <SimpleButton
            onClick={handleLocationRequest}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4 rounded-xl font-medium text-lg agricultural-shadow transform hover:scale-105 transition-all duration-200"
          >
            <MapPin className="w-5 h-5 mr-2" />
            {content.allowButton}
          </SimpleButton>

          <SimpleButton
            onClick={onLocationSkip}
            variant="ghost"
            className="w-full text-gray-600 hover:text-gray-800 py-3 font-medium"
          >
            {content.skipButton}
          </SimpleButton>
        </div>

        {/* Privacy Notice */}
        <div className="mt-8 text-center">
          <p className="text-xs text-gray-500 flex items-center justify-center">
            <Compass className="w-4 h-4 mr-1" />
            {content.privacy}
          </p>
        </div>
      </div>

      {/* Bottom Decorative Element */}
      <div className="h-20 bg-gradient-to-t from-green-100 to-transparent relative">
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-green-300 rounded-full"></div>
      </div>
    </div>
  );
}