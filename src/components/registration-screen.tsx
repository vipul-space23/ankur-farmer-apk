import React, { useState } from 'react';
import { User, Phone, MapPin, Languages, ArrowLeft, ArrowRight } from 'lucide-react';
import { Language, User as UserType } from '../App';
import { SimpleButton } from './simple-button';

interface RegistrationScreenProps {
  language: Language | null;
  onRegistrationComplete: (user: UserType) => void;
  onBack: () => void;
}

const registrationContent = {
  en: {
    title: "Create Account",
    subtitle: "Join KrishiMitra today",
    nameLabel: "Full Name",
    namePlaceholder: "Enter your full name",
    phoneLabel: "Phone Number",
    phonePlaceholder: "Enter your phone number",
    locationLabel: "Location",
    locationPlaceholder: "Select your state/region",
    languageLabel: "Preferred Language",
    languagePlaceholder: "Select your language",
    register: "Create Account",
    back: "Back to Login"
  },
  hi: {
    title: "खाता बनाएं",
    subtitle: "आज ही KrishiMitra में शामिल हों",
    nameLabel: "पूरा नाम",
    namePlaceholder: "अपना पूरा नाम दर्ज करें",
    phoneLabel: "फोन नंबर",
    phonePlaceholder: "अपना फोन नंबर दर्ज करें",
    locationLabel: "स्थान",
    locationPlaceholder: "अपना राज्य/क्षेत्र चुनें",
    languageLabel: "पसंदीदा भाषा",
    languagePlaceholder: "अपनी भाषा चुनें",
    register: "खाता बनाएं",
    back: "लॉगिन पर वापस जाएं"
  },
  ta: {
    title: "கணக்கை உருவாக்கவும்",
    subtitle: "இன்றே KrishiMitra இல் சேரவும்",
    nameLabel: "முழு பெயர்",
    namePlaceholder: "உங்கள் முழு பெயரை உள்ளிடவும்",
    phoneLabel: "தொலைபேசி எண்",
    phonePlaceholder: "உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்",
    locationLabel: "இருப்பிடம்",
    locationPlaceholder: "உங்கள் மாநிலம்/பகுதியை தேர்வு செய்யவும்",
    languageLabel: "விருப்ப மொழி",
    languagePlaceholder: "உங்கள் மொழியைத் தேர்வு செய்யவும்",
    register: "கணக்கை உருவாக்கவும்",
    back: "உள்நுழைவுக்கு திரும்பவும்"
  },
  te: {
    title: "ఖాతా సృష్టించండి",
    subtitle: "ఈరోజే KrishiMitra లో చేరండి",
    nameLabel: "పూర్తి పేరు",
    namePlaceholder: "మీ పూర్తి పేరును నమోదు చేయండి",
    phoneLabel: "ఫోన్ నంబర్",
    phonePlaceholder: "మీ ఫోన్ నంబర్‌ను నమోదు చేయండి",
    locationLabel: "స్థానం",
    locationPlaceholder: "మీ రాష్ట్రం/ప్రాంతాన్ని ఎంచుకోండి",
    languageLabel: "ప్రాధాన్య భాష",
    languagePlaceholder: "మీ భాషను ఎంచుకోండి",
    register: "ఖాతా సృష్టించండి",
    back: "లాగిన్‌కు తిరిగి వెళ్లండి"
  },
  bn: {
    title: "অ্যাকাউন্ট তৈরি করুন",
    subtitle: "আজই KrishiMitra এ যোগ দিন",
    nameLabel: "পূর্ণ নাম",
    namePlaceholder: "আপনার পূর্ণ নাম লিখুন",
    phoneLabel: "ফোন নম্বর",
    phonePlaceholder: "আপনার ফোন নম্বর লিখুন",
    locationLabel: "অবস্থান",
    locationPlaceholder: "আপনার রাজ্য/অঞ্চল নির্বাচন করুন",
    languageLabel: "পছন্দের ভাষা",
    languagePlaceholder: "আপনার ভাষা নির্বাচন করুন",
    register: "অ্যাকাউন্ট তৈরি করুন",
    back: "লগইনে ফিরে যান"
  },
  mr: {
    title: "खाते तयार करा",
    subtitle: "आज KrishiMitra मध्ये सामील व्हा",
    nameLabel: "पूर्ण नाव",
    namePlaceholder: "तुमचे पूर्ण नाव टाका",
    phoneLabel: "फोन नंबर",
    phonePlaceholder: "तुमचा फोन नंबर टाका",
    locationLabel: "स्थान",
    locationPlaceholder: "तुमचे राज्य/प्रदेश निवडा",
    languageLabel: "आवडती भाषा",
    languagePlaceholder: "तुमची भाषा निवडा",
    register: "खाते तयार करा",
    back: "लॉगिनवर परत जा"
  },
  gu: {
    title: "ખાતું બનાવો",
    subtitle: "આજે જ KrishiMitra માં જોડાઓ",
    nameLabel: "પૂરું નામ",
    namePlaceholder: "તમારું પૂરું નામ દાખલ કરો",
    phoneLabel: "ફોન નંબર",
    phonePlaceholder: "તમારો ફોન નંબર દાખલ કરો",
    locationLabel: "સ્થાન",
    locationPlaceholder: "તમારું રાજ્ય/વિસ્તાર પસંદ કરો",
    languageLabel: "પસંદગીની ભાષા",
    languagePlaceholder: "તમારી ભાષા પસંદ કરો",
    register: "ખાતું બનાવો",
    back: "લોગિન પર પાછા જાઓ"
  },
  kn: {
    title: "ಖಾತೆಯನ್ನು ರಚಿಸಿ",
    subtitle: "ಇಂದೇ KrishiMitra ಗೆ ಸೇರಿ",
    nameLabel: "ಪೂರ್ಣ ಹೆಸರು",
    namePlaceholder: "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    phoneLabel: "ಫೋನ್ ಸಂಖ್ಯೆ",
    phonePlaceholder: "ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",
    locationLabel: "ಸ್ಥಳ",
    locationPlaceholder: "ನಿಮ್ಮ ರಾಜ್ಯ/ಪ್ರದೇಶವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    languageLabel: "ಆದ್ಯತೆಯ ಭಾಷೆ",
    languagePlaceholder: "ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    register: "ಖಾತೆಯನ್ನು ರಚಿಸಿ",
    back: "ಲಾಗಿನ್‌ಗೆ ಹಿಂತಿರುಗಿ"
  },
  ml: {
    title: "അക്കൗണ്ട് സൃഷ്ടിക്കുക",
    subtitle: "ഇന്ന് തന്നെ KrishiMitra യിൽ ചേരുക",
    nameLabel: "പൂർണ്ണ പേര്",
    namePlaceholder: "നിങ്ങളുടെ പൂർണ്ണ പേര് നൽകുക",
    phoneLabel: "ഫോൺ നമ്പർ",
    phonePlaceholder: "നിങ്ങളുടെ ഫോൺ നമ്പർ നൽകുക",
    locationLabel: "സ്ഥലം",
    locationPlaceholder: "നിങ്ങളുടെ സംസ്ഥാനം/പ്രദേശം തിരഞ്ഞെടുക്കുക",
    languageLabel: "മുൻഗണനാ ഭാഷ",
    languagePlaceholder: "നിങ്ങളുടെ ഭാഷ തിരഞ്ഞെടുക്കുക",
    register: "അക്കൗണ്ട് സൃഷ്ടിക്കുക",
    back: "ലോഗിൻ ലേക്ക് മടങ്ങുക"
  },
  pa: {
    title: "ਖਾਤਾ ਬਣਾਓ",
    subtitle: "ਅੱਜ ਹੀ KrishiMitra ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੋ",
    nameLabel: "ਪੂਰਾ ਨਾਮ",
    namePlaceholder: "ਆਪਣਾ ਪੂਰਾ ਨਾਮ ਦਾਖਲ ਕਰੋ",
    phoneLabel: "ਫੋਨ ਨੰਬਰ",
    phonePlaceholder: "ਆਪਣਾ ਫੋਨ ਨੰਬਰ ਦਾਖਲ ਕਰੋ",
    locationLabel: "ਸਥਾਨ",
    locationPlaceholder: "ਆਪਣਾ ਰਾਜ/ਖੇਤਰ ਚੁਣੋ",
    languageLabel: "ਤਰਜੀਹੀ ਭਾਸ਼ਾ",
    languagePlaceholder: "ਆਪਣੀ ਭਾਸ਼ਾ ਚੁਣੋ",
    register: "ਖਾਤਾ ਬਣਾਓ",
    back: "ਲਾਗਇਨ ਵਿੱਚ ਵਾਪਸ ਜਾਓ"
  },
  ur: {
    title: "اکاؤنٹ بنائیں",
    subtitle: "آج ہی KrishiMitra میں شامل ہوں",
    nameLabel: "پورا نام",
    namePlaceholder: "اپنا پورا نام درج کریں",
    phoneLabel: "فون نمبر",
    phonePlaceholder: "اپنا فون نمبر درج کریں",
    locationLabel: "مقام",
    locationPlaceholder: "اپنی ریاست/علاقہ منتخب کریں",
    languageLabel: "ترجیحی زبان",
    languagePlaceholder: "اپنی زبان منتخب کریں",
    register: "اکاؤنٹ بنائیں",
    back: "لاگ ان میں واپس جائیں"
  },
  as: {
    title: "একাউণ্ট সৃষ্টি কৰক",
    subtitle: "আজিয়েই KrishiMitra ত যোগদান কৰক",
    nameLabel: "সম্পূৰ্ণ নাম",
    namePlaceholder: "আপোনাৰ সম্পূৰ্ণ নাম দিয়ক",
    phoneLabel: "ফোন নম্বৰ",
    phonePlaceholder: "আপোনাৰ ফোন নম্বৰ দিয়ক",
    locationLabel: "স্থান",
    locationPlaceholder: "আপোনাৰ ৰাজ্য/অঞ্চল বাছনি কৰক",
    languageLabel: "পছন্দৰ ভাষা",
    languagePlaceholder: "আপোনাৰ ভাষা বাছনি কৰক",
    register: "একাউণ্ট সৃষ্টি কৰক",
    back: "লগইনলৈ ঘূৰি যাওক"
  },
  or: {
    title: "ଖାତା ସୃଷ୍ଟି କରନ୍ତୁ",
    subtitle: "ଆଜି ହିଁ KrishiMitra ରେ ଯୋଗ ଦିଅନ୍ତୁ",
    nameLabel: "ପୂର୍ଣ୍ଣ ନାମ",
    namePlaceholder: "ଆପଣଙ୍କ ପୂର୍ଣ୍ଣ ନାମ ଦିଅନ୍ତୁ",
    phoneLabel: "ଫୋନ୍ ନମ୍ବର",
    phonePlaceholder: "ଆପଣଙ୍କ ଫୋନ୍ ନମ୍ବର ଦିଅନ୍ତୁ",
    locationLabel: "ସ୍ଥାନ",
    locationPlaceholder: "ଆପଣଙ୍କ ରାଜ୍ୟ/ଅଞ୍ଚଳ ବାଛନ୍ତୁ",
    languageLabel: "ପସନ୍ଦର ଭାଷା",
    languagePlaceholder: "ଆପଣଙ୍କ ଭାଷା ବାଛନ୍ତୁ",
    register: "ଖାତା ସୃଷ୍ଟି କରନ୍ତୁ",
    back: "ଲଗଇନ୍‌କୁ ଫେରନ୍ତୁ"
  }
};

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

const languages = [
  { code: 'en', name: 'English' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ta', name: 'Tamil' },
  { code: 'te', name: 'Telugu' },
  { code: 'bn', name: 'Bengali' },
  { code: 'mr', name: 'Marathi' },
  { code: 'gu', name: 'Gujarati' },
  { code: 'kn', name: 'Kannada' },
  { code: 'ml', name: 'Malayalam' },
  { code: 'pa', name: 'Punjabi' }
];

export function RegistrationScreen({ language, onRegistrationComplete, onBack }: RegistrationScreenProps) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    preferredLanguage: language?.code || 'en'
  });
  const [isLoading, setIsLoading] = useState(false);

  const langCode = language?.code || 'en';
  const content = registrationContent[langCode as keyof typeof registrationContent] || registrationContent.en;

  const handleSubmit = async () => {
    if (formData.name && formData.phone && formData.location) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        onRegistrationComplete(formData);
      }, 2000);
    }
  };

  const isFormValid = formData.name.length >= 2 && 
                     formData.phone.length === 10 && 
                     formData.location;

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-green-600 text-white p-6">
        <div className="flex items-center mb-4">
          <SimpleButton
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-green-700 p-2 mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </SimpleButton>
          <div>
            <h1 className="text-2xl font-bold">{content.title}</h1>
            <p className="text-green-100">{content.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-sm mx-auto space-y-6">
          {/* Name Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              {content.nameLabel}
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={content.namePlaceholder}
                className="w-full pl-12 h-14 border-2 border-gray-200 focus:border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              />
            </div>
          </div>

          {/* Phone Input */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              {content.phoneLabel}
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                  if (value.length <= 10) {
                    setFormData({ ...formData, phone: value });
                  }
                }}
                placeholder={content.phonePlaceholder}
                className="w-full pl-12 h-14 border-2 border-gray-200 focus:border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                maxLength={10}
              />
            </div>
          </div>

          {/* Location Select */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              {content.locationLabel}
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <select
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full pl-12 h-14 border-2 border-gray-200 focus:border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 bg-white"
              >
                <option value="">{content.locationPlaceholder}</option>
                {indianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Language Select */}
          <div>
            <label className="block text-gray-700 font-medium mb-3">
              {content.languageLabel}
            </label>
            <div className="relative">
              <Languages className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
              <select
                value={formData.preferredLanguage}
                onChange={(e) => setFormData({ ...formData, preferredLanguage: e.target.value })}
                className="w-full pl-12 h-14 border-2 border-gray-200 focus:border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 bg-white"
              >
                <option value="">{content.languagePlaceholder}</option>
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit Button */}
          <SimpleButton
            onClick={handleSubmit}
            disabled={!isFormValid || isLoading}
            className="w-full h-14 text-lg mt-8"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Creating...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>{content.register}</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </SimpleButton>
        </div>
      </div>
    </div>
  );
}