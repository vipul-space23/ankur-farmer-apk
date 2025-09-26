import React, { useState } from 'react';
import { User, CloudRain, TrendingUp, Wheat, Camera, Settings, MapPin, MessageCircle, Sliders, Send, Mic } from 'lucide-react';
import { Language, User as UserType, Screen } from '../App';
import { SimpleButton } from './simple-button';
import { LanguageSelector } from './language-selector';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface SimpleHomeScreenProps {
  selectedLanguage: Language | null;
  user: UserType | null;
  onNavigate: (screen: Screen, chatData?: { message?: string; history?: {role: 'user' | 'assistant', message: string}[] }) => void;
  onLanguageChange: (language: Language) => void;
}

const homeContent = {
  en: {
    greeting: "Good morning",
    dashboard: "Dashboard",
    weather: "Weather",
    marketPrices: "Market Prices", 
    cropRecommendations: "Crop Recommendations",
    diseaseDetection: "Disease Detection",
    askAssistant: "Ask AI Assistant",
    chatPlaceholder: "Ask about crops, weather, or farming tips...",
    send: "Send",
    assistantTitle: "🌾 Farm Assistant",
    myAccount: "My Account",
    manualEntries: "Manual Entries for Crop Recommendation",
    nitrogen: "Nitrogen (N)",
    phosphorus: "Phosphorus (P)",
    potassium: "Potassium (K)",
    ph: "pH Level",
    soilMoisture: "Soil Moisture",
    menu: {
      weather: "Weather",
      marketPrices: "Market",
      crops: "Crops",
      disease: "Disease"
    }
  },
  hi: {
    greeting: "सुप्रभात",
    dashboard: "डैशबोर्ड",
    weather: "मौसम",
    marketPrices: "बाजार की कीमतें",
    cropRecommendations: "फसल सुझाव", 
    diseaseDetection: "रोग जांच",
    askAssistant: "AI सहायक से पूछें",
    chatPlaceholder: "फसल, मौसम या खेती की जानकारी पूछें...",
    send: "भेजें",
    assistantTitle: "🌾 खेती सहायक",
    myAccount: "मेरा खाता",
    manualEntries: "फसल सुझाव के लिए मैनुअल एंट्री",
    nitrogen: "नाइट्रोजन (एन)",
    phosphorus: "फास्फोरस (पी)",
    potassium: "पोटेशियम (के)",
    ph: "पीएच स्तर",
    soilMoisture: "मिट्टी की नमी",
    menu: {
      weather: "मौसम",
      marketPrices: "बाजार",
      crops: "फसल",
      disease: "रोग"
    }
  },
  ta: {
    greeting: "காலை வணக்கம்",
    dashboard: "டாஷ்போர்டு",
    weather: "வானிலை",
    marketPrices: "சந்தை விலைகள்",
    cropRecommendations: "பயிர் பரிந்துரைகள்",
    diseaseDetection: "நோய் கண்டறிதல்",
    askAssistant: "AI உதவியாளரிடம் கேளுங்கள்",
    chatPlaceholder: "பயிர், வானிலை அல்லது விவசாய குறிப்புகளைப் பற்றி கேளுங்கள்...",
    send: "அனுப்பு",
    assistantTitle: "🌾 விவசாய உதவியாளர்",
    myAccount: "என் கணக்கு",
    manualEntries: "பயிர் பரிந்துரைக்கான கைமுறை பதிவுகள்",
    nitrogen: "நைட்ரஜன் (என்)",
    phosphorus: "பாஸ்பரஸ் (பி)",
    potassium: "பொட்டாசியம் (கே)",
    ph: "பிஎச் அளவு",
    soilMoisture: "மண் ஈரப்பதம்",
    menu: {
      weather: "வானிலை",
      marketPrices: "சந்தை",
      crops: "பயிர்",
      disease: "நோய்"
    }
  },
  te: {
    greeting: "శుభోదయం", 
    dashboard: "డాష్‌బోర్డ్",
    weather: "వాతావరణం",
    marketPrices: "మార్కెట్ ధరలు",
    cropRecommendations: "పంట సూచనలు",
    diseaseDetection: "వ్యాధి గుర్తింపు",
    askAssistant: "AI అసిస్టెంట్‌ని అడగండి",
    chatPlaceholder: "పంటలు, వాతావరణం లేదా వ్యవసాయ చిట్కాల గురించి అడగండి...",
    send: "పంపు",
    assistantTitle: "🌾 వ్యవసాయ అసిస్టెంట్",
    myAccount: "నా ఖాతా",
    manualEntries: "పంట సూచనల కోసం మాన్యువల్ ఎంట్రీలు",
    nitrogen: "నైట్రోజన్ (ఎన్)",
    phosphorus: "ఫాస్ఫరస్ (పి)",
    potassium: "పొటాషియమ్ (కె)",
    ph: "పిహెచ్ స్థాయి",
    soilMoisture: "మట్టి తేమ",
    menu: {
      weather: "వాతావరణం",
      marketPrices: "మార్కెట్",
      crops: "పంటలు",
      disease: "వ్యాధి"
    }
  },
  bn: {
    greeting: "সুপ্রভাত",
    dashboard: "ড্যাশবোর্ড",
    weather: "আবহাওয়া",
    marketPrices: "বাজারের দাম",
    cropRecommendations: "ফসলের সুপারিশ",
    diseaseDetection: "রোগ নির্ণয়",
    askAssistant: "AI সহায়কে জিজ্ঞাসা করুন",
    chatPlaceholder: "ফসল, আবহাওয়া বা কৃষি টিপস সম্পর্কে জিজ্ঞাসা করুন...",
    send: "পাঠান",
    assistantTitle: "🌾 কৃষি সহায়ক",
    myAccount: "আমার অ্যাকাউন্ট",
    manualEntries: "ফসলের সুপারিশের জন্য ম্যানুয়াল এন্ট্রি",
    nitrogen: "নাইট্রোজেন (এন)",
    phosphorus: "ফসফরাস (পি)",
    potassium: "পটাসিয়াম (কে)",
    ph: "পিএইচ স্তর", 
    soilMoisture: "মাটির আর্দ্রতা",
    menu: {
      weather: "আবহাওয়া",
      marketPrices: "বাজার",
      crops: "ফসল",
      disease: "রোগ"
    }
  },
  mr: {
    greeting: "सुप्रभात",
    dashboard: "डॅशबोर्ड",
    weather: "हवामान",
    marketPrices: "बाजारभाव",
    cropRecommendations: "पीक शिफारशी",
    diseaseDetection: "रोग निदान", 
    askAssistant: "AI सहाय्यकाला विचारा",
    chatPlaceholder: "पीक, हवामान किंवा शेतीच्या टिप्स विशेष विचारा...",
    send: "पाठवा",
    assistantTitle: "🌾 शेती सहाय्यक",
    myAccount: "माझे खाते",
    manualEntries: "पीक शिफारशीसाठी मॅन्युअल एंट्री",
    nitrogen: "नायट्रोजन (एन)",
    phosphorus: "फॉस्फरस (पी)",
    potassium: "पोटॅशियम (के)",
    ph: "पीएच पातळी",
    soilMoisture: "मातीची ओलावा",
    menu: {
      weather: "हवामान",
      marketPrices: "बाजार",
      crops: "पीक",
      disease: "रोग"
    }
  },
  gu: {
    greeting: "સુપ્રભાત",
    dashboard: "ડેશબોર્ડ",
    weather: "હવામાન",
    marketPrices: "બજાર ભાવ",
    cropRecommendations: "પાકની ભલામણો",
    diseaseDetection: "રોગ નિદાન",
    askAssistant: "AI સહાયકને પૂછો",
    chatPlaceholder: "પાક, હવામાન અથવા ખેતીની ટિપ્સ વિશે પૂછો...",
    send: "મોકલો",
    assistantTitle: "🌾 ખેતી સહાયક",
    myAccount: "મારું ખાતું",
    manualEntries: "પાકની ભલામણો માટે મેન્યુઅલ એન્ટ્રી",
    nitrogen: "નાઇટ્રોજન (એન)",
    phosphorus: "ફોસ્ફરસ (પી)",
    potassium: "પોટેશિયમ (કે)",
    ph: "પીએચ સ્તર",
    soilMoisture: "માટીની ભીનાશ",
    menu: {
      weather: "હવામાન",
      marketPrices: "બજાર", 
      crops: "પાક",
      disease: "રોગ"
    }
  },
  kn: {
    greeting: "ಶುಭೋದಯ",
    dashboard: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್",
    weather: "ಹವಾಮಾನ",
    marketPrices: "ಮಾರುಕಟ್ಟೆ ಬೆಲೆಗಳು",
    cropRecommendations: "ಬೆಳೆ ಶಿಫಾರಸುಗಳು",
    diseaseDetection: "ರೋಗ ಪತ್ತೆ",
    askAssistant: "AI ಸಹಾಯಕನನ್ನು ಕೇಳಿ",
    chatPlaceholder: "ಬೆಳೆಗಳು, ಹವಾಮಾನ ಅಥವಾ ಕೃಷಿ ಸಲಹೆಗಳನ್ನು ಕೇಳಿ...",
    send: "ಕಳುಹಿಸಿ",
    assistantTitle: "🌾 ಕೃಷಿ ಸಹಾಯಕ",
    myAccount: "ನನ್ನ ಖಾತೆ",
    manualEntries: "ಬೆಳೆ ಶಿಫಾರಸುಗಳಿಗಾಗಿ ಮ್ಯಾನುವೇಲ್ ಎಂಟ್ರಿಗಳು",
    nitrogen: "ನೈಟ್ರೋಜನ್ (ಎನ್)",
    phosphorus: "ಫಾಸ್ಫರಸ್ (ಪಿ)",
    potassium: "ಪೊಟ್ಯಾಸಿಯಮ್ (ಕೆ)",
    ph: "ಪಿಹೆಚ್ ಮಟ್ಟ",
    soilMoisture: "ಮಣ್ಣಿನ ತೇವಾಂಶ",
    menu: {
      weather: "ಹವಾಮಾನ",
      marketPrices: "ಮಾರುಕಟ್ಟೆ",
      crops: "ಬೆಳೆ", 
      disease: "ರೋಗ"
    }
  },
  ml: {
    greeting: "സുപ്രഭാതം",
    dashboard: "ഡാഷ്‌ബോർഡ്",
    weather: "കാലാവസ്ഥ",
    marketPrices: "മാർക്കറ്റ് വിലകൾ",
    cropRecommendations: "വിള ശുപാർശകൾ",
    diseaseDetection: "രോഗ കണ്ടെത്തൽ",
    askAssistant: "AI അസിസ്റ്റന്റിനോട് ചോദിക്കുക",
    chatPlaceholder: "വിളകൾ, കാലാവസ്ഥ അല്ലെങ്കിൽ കൃഷി നുറുങ്ങുകൾ ചോദിക്കുക...",
    send: "അയയ്ക്കുക",
    assistantTitle: "🌾 കൃഷി അസിസ്റ്റന്റ്",
    myAccount: "എന്റെ അക്കൗണ്ട്",
    manualEntries: "വിള ശുപാർശകൾക്കുള്ള മാനുവൽ എൻട്രികൾ",
    nitrogen: "നൈട്രജൻ (എൻ)",
    phosphorus: "ഫോസ്ഫറസ് (പി)",
    potassium: "പൊട്ടാസിയം (കെ)",
    ph: "പിഎച്ച് ലെവൽ",
    soilMoisture: "മണ്ണിന്റെ ഈർപ്പം",
    menu: {
      weather: "കാലാവസ്ഥ",
      marketPrices: "മാർക്കറ്റ്",
      crops: "വിളകൾ",
      disease: "രോഗം"
    }
  },
  pa: {
    greeting: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ",
    dashboard: "ਡੈਸ਼ਬੋਰਡ",
    weather: "ਮੌਸਮ",
    marketPrices: "ਮਾਰਕਿਟ ਭਾਅ",
    cropRecommendations: "ਫਸਲ ਸਿਫਾਰਸ਼ਾਂ",
    diseaseDetection: "ਰੋਗ ਪਛਾਣ",
    askAssistant: "AI ਅਸਿਸੈਂਟ ਨੂੰ ਪੁੱਛੋ",
    chatPlaceholder: "ਫਸਲਾਂ, ਮੌਸਮ ਜਾਂ ਖੇਤੀ ਦੇ ਨੁਸਖਿਆਂ ਬਾਰੇ ਪੁੱਛੋ...",
    send: "ਭੇਜੋ",
    assistantTitle: "🌾 ਖੇਤੀ ਸਹਾਇਕ",
    myAccount: "ਮੇਰਾ ਖਾਤਾ",
    manualEntries: "ਫਸਲ ਸਿਫਾਰਸ਼ਾਂ ਲਈ ਮੈਨੂਅਲ ਐਂਟਰੀਆਂ",
    nitrogen: "ਨਾਈਟ੍ਰੋਜਨ (ਐਨ)",
    phosphorus: "ਫਾਸਫੋਰਸ (ਪੀ)",
    potassium: "ਪੋਟਾਸ਼ੀਅਮ (ਕੇ)",
    ph: "ਪੀਐਚ ਪੱਧਰ",
    soilMoisture: "ਮਿੱਟੀ ਦੀ ਨਮੀ",
    menu: {
      weather: "ਮੌਸਮ",
      marketPrices: "ਮਾਰਕਿਟ",
      crops: "ਫਸਲ",
      disease: "ਰੋਗ"
    }
  },
  ur: {
    greeting: "صبح بخیر",
    dashboard: "ڈیش بورڈ",
    weather: "موسم",
    marketPrices: "مارکیٹ کی قیمتیں",
    cropRecommendations: "فصل کی سفارشات",
    diseaseDetection: "بیماری کی تشخیص",
    askAssistant: "AI اسسٹنٹ سے پوچھیں",
    chatPlaceholder: "فصلوں، موسم یا کاشتکاری کے بارے میں پوچھیں...",
    send: "بھیجیں",
    assistantTitle: "🌾 کاشتکاری اسسٹنٹ",
    myAccount: "میرا اکاؤنٹ",
    manualEntries: "فصل کی سفارشات کے لیے دستی اندراجات",
    nitrogen: "نائٹروجن (این)",
    phosphorus: "فاسفورس (پی)",
    potassium: "پوٹاشیم (کے)",
    ph: "پی ایچ لیول",
    soilMoisture: "مٹی کی نمی",
    menu: {
      weather: "موسم",
      marketPrices: "مارکیٹ",
      crops: "فصل",
      disease: "بیماری"
    }
  },
  as: {
    greeting: "শুভ প্ৰভাত",
    dashboard: "ডেচব'ৰ্ড",
    weather: "বতৰ",
    marketPrices: "বজাৰৰ দাম",
    cropRecommendations: "শস্যৰ পৰামৰ্শ",
    diseaseDetection: "ৰোগ চিনাক্তকৰণ",
    askAssistant: "AI সহায়কক সুধিব",
    chatPlaceholder: "শস্য, বতৰ বা কৃষিৰ পৰামৰ্শ সুধিব...",
    send: "পঠিয়াওক",
    assistantTitle: "🌾 কৃষি সহায়ক",
    myAccount: "মোৰ একাউণ্ট",
    manualEntries: "শস্যৰ পৰামৰ্শৰ বাবে মেনুৱেল এণ্ট্ৰি",
    nitrogen: "নাইট্ৰ'জেন (এন)",
    phosphorus: "ফছফৰাছ (পি)",
    potassium: "পটাছিয়াম (কে)",
    ph: "পিএইচ স্তৰ",
    soilMoisture: "মাটিৰ আৰ্দ্ৰতা",
    menu: {
      weather: "বতৰ", 
      marketPrices: "বজাৰ",
      crops: "শস্য",
      disease: "ৰোগ"
    }
  },
  or: {
    greeting: "ଶୁଭ ପ୍ରଭାତ",
    dashboard: "ଡାସବୋର୍ଡ",
    weather: "ପାଣିପାଗ",
    marketPrices: "ବଜାର ମୂଲୟ",
    cropRecommendations: "ଫସଲ ସୁପାରିଶ",
    diseaseDetection: "ରୋଗ ଚିହ୍ନଟ",
    askAssistant: "AI ସହାୟକଙ୍କୁ ପଚାରନ୍ତୁ",
    chatPlaceholder: "ଫସଲ, ପାଣିପାଗ କିମ୍ବା କୃଷି ଟିପ୍ସ ପଚାରନ୍ତୁ...",
    send: "ପଠାନ୍ତୁ",
    assistantTitle: "🌾 କୃଷି ସହାୟକ",
    myAccount: "ମୋ ଆକାଉଣ୍ଟ",
    manualEntries: "ଫସଲ ସୁପାରିଶ ପାଇଁ ମାନୁଆଲ ଏଣ୍ଟ୍ରି",
    nitrogen: "ନାଇଟ୍ରୋଜେନ (ଏନ)",
    phosphorus: "ଫସଫରସ (ପ��)",
    potassium: "ପୋଟାସିୟମ (କେ)",
    ph: "ପିଏଚ ସ୍ତର",
    soilMoisture: "ମାଟିର ଆର୍ଦ୍ରତା",
    menu: {
      weather: "ପାଣିପାଗ",
      marketPrices: "ବଜାର",
      crops: "ଫସଲ",
      disease: "ରୋଗ"
    }
  }
};

export function SimpleHomeScreen({ selectedLanguage, user, onNavigate, onLanguageChange }: SimpleHomeScreenProps) {
  const [chatMessage, setChatMessage] = useState('');
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'assistant', message: string}[]>([]);
  
  const langCode = selectedLanguage?.code || 'en';
  const content = homeContent[langCode as keyof typeof homeContent] || homeContent.en;

  const handleSendMessage = () => {
    if (chatMessage.trim()) {
      // Navigate to dedicated AI chatbot page with the message and history
      onNavigate('ai-chatbot', {
        message: chatMessage,
        history: chatHistory
      });
      
      // Clear local state since we're moving to the dedicated chatbot page
      setChatMessage('');
      setChatHistory([]);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header - Fixed */}
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
            <LanguageSelector
              selectedLanguage={selectedLanguage}
              onLanguageChange={onLanguageChange}
              variant="header"
            />
            <SimpleButton
              onClick={() => onNavigate('settings')}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-green-700"
            >
              <Settings className="w-5 h-5" />
            </SimpleButton>
          </div>
        </div>
        
        <div className="flex items-center text-green-100 text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{user?.location || selectedLanguage?.name || 'Location not set'}</span>
        </div>
      </div>

      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto pb-24">
        <div className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-gray-800">{content.dashboard}</h2>
          
          {/* 6-Card Grid */}
          <div className="grid grid-cols-2 gap-4">
            {/* Weather */}
            <SimpleButton
              onClick={() => onNavigate('weather-forecast')}
              variant="outline"
              className="h-32 flex flex-col items-center justify-center space-y-3 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-150"
            >
              <CloudRain className="w-8 h-8 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">{content.weather}</span>
            </SimpleButton>

            {/* Market Prices */}
            <SimpleButton
              onClick={() => onNavigate('market-prices')}
              variant="outline"
              className="h-32 flex flex-col items-center justify-center space-y-3 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:from-orange-100 hover:to-orange-150"
            >
              <TrendingUp className="w-8 h-8 text-orange-600" />
              <span className="text-sm font-medium text-orange-800">{content.marketPrices}</span>
            </SimpleButton>

            {/* Crop Recommendations */}
            <SimpleButton
              onClick={() => onNavigate('crop-details')}
              variant="outline"
              className="h-32 flex flex-col items-center justify-center space-y-3 bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:from-green-100 hover:to-green-150"
            >
              <Wheat className="w-8 h-8 text-green-600" />
              <span className="text-sm font-medium text-green-800">{content.cropRecommendations}</span>
            </SimpleButton>

            {/* Disease Detection */}
            <SimpleButton
              onClick={() => onNavigate('disease-detection')}
              variant="outline"
              className="h-32 flex flex-col items-center justify-center space-y-3 bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:from-red-100 hover:to-red-150"
            >
              <Camera className="w-8 h-8 text-red-600" />
              <span className="text-sm font-medium text-red-800">{content.diseaseDetection}</span>
            </SimpleButton>

            {/* Manual Entries */}
            <SimpleButton
              onClick={() => onNavigate('manual-entries')}
              variant="outline"
              className="h-32 flex flex-col items-center justify-center space-y-3 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:from-purple-100 hover:to-purple-150"
            >
              <Sliders className="w-8 h-8 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">{content.manualEntries}</span>
            </SimpleButton>

            {/* My Account */}
            <SimpleButton
              onClick={() => onNavigate('my-account')}
              variant="outline"
              className="h-32 flex flex-col items-center justify-center space-y-3 bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200 hover:from-teal-100 hover:to-teal-150"
            >
              <User className="w-8 h-8 text-teal-600" />
              <span className="text-sm font-medium text-teal-800">{content.myAccount}</span>
            </SimpleButton>
          </div>

          {/* Chat History */}
          {chatHistory.length > 0 && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">{content.assistantTitle}</h3>
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {chatHistory.map((chat, index) => (
                  <div key={index} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs rounded-lg p-3 ${
                      chat.role === 'user' 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      <p className="text-sm">{chat.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Fixed Chatbot at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg max-w-md mx-auto">
        <div className="flex items-center space-x-3">
          {/* Farm Assistant Avatar */}
          <div className="flex-shrink-0">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-green-200">
              <ImageWithFallback
                src="https://i.pinimg.com/736x/5f/fe/c0/5ffec07ae6b545b6a22ae2a72801756e.jpg"
                alt="Farm Assistant"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          <div className="flex-1 relative">
            <input
              type="text"
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              placeholder={content.chatPlaceholder}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            {/* Microphone Button */}
            <SimpleButton
              onClick={() => {
                // Mic functionality placeholder
                console.log('Voice input activated');
              }}
              variant="ghost"
              size="icon"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 text-gray-500 hover:text-green-600 hover:bg-green-50"
            >
              <Mic className="w-4 h-4" />
            </SimpleButton>
          </div>
          
          <SimpleButton
            onClick={handleSendMessage}
            variant="default"
            size="icon"
            className="bg-green-600 hover:bg-green-700 text-white rounded-full w-12 h-12 flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </SimpleButton>
        </div>
      </div>
    </div>
  );
}