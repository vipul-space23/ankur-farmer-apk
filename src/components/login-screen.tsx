import React, { useState } from 'react';
import { Phone, ArrowRight, User } from 'lucide-react'; // Added User icon import
import { Language } from '../App';
import { SimpleButton } from './simple-button';
// Removed the myAppLogo import as it's no longer needed
// import myAppLogo from '../assets/8a1cf999a373017bb787e752c83840b9f2d8c23a.png';

interface LoginScreenProps {
  language: Language | null;
  onLoginSuccess: () => void;
  onRegister: () => void;
}

const loginContent = {
  en: {
    title: "Welcome Back",
    subtitle: "Sign in to your account",
    phoneLabel: "Phone Number",
    phonePlaceholder: "Enter your phone number",
    otpLabel: "OTP Code",
    otpPlaceholder: "Enter 6-digit OTP",
    sendOtp: "Send OTP",
    verifyOtp: "Verify & Login",
    newUser: "New user?",
    register: "Register here",
    resendOtp: "Resend OTP"
  },
  hi: {
    title: "वापस स्वागत है",
    subtitle: "अपने खाते में साइन इन करें",
    phoneLabel: "फोन नंबर",
    phonePlaceholder: "अपना फोन नंबर दर्ज करें",
    otpLabel: "OTP कोड",
    otpPlaceholder: "6-अंकीय OTP दर्ज करें",
    sendOtp: "OTP भेजें",
    verifyOtp: "सत्यापित करें और लॉगिन करें",
    newUser: "नए उपयोगकर्ता?",
    register: "यहां पंजीकरण करें",
    resendOtp: "OTP पुनः भेजें"
  },
  ta: {
    title: "மீண்டும் வரவேற்கிறோம்",
    subtitle: "உங்கள் கணக்கில் உள்நுழையவும்",
    phoneLabel: "தொலைபேசி எண்",
    phonePlaceholder: "உங்கள் தொலைபேசி எண்ணை உள்ளிடவும்",
    otpLabel: "OTP குறியீடு",
    otpPlaceholder: "6-இலக்க OTP உள்ளிடவும்",
    sendOtp: "OTP அனுப்பவும்",
    verifyOtp: "சரிபார்த்து உள்நுழையவும்",
    newUser: "புதிய பயனர்?",
    register: "இங்கே பதிவு செய்யவும்",
    resendOtp: "OTP மீண்டும் அனுப்பவும்"
  },
  te: {
    title: "తిరిగి స్వాగతం",
    subtitle: "మీ ఖాతాలోకి సైన్ ఇన్ చేయండి",
    phoneLabel: "ఫోన్ నంబర్",
    phonePlaceholder: "మీ ఫోన్ నంబర్‌ను నమోదు చేయండి",
    otpLabel: "OTP కోడ్",
    otpPlaceholder: "6-అంకెల OTP నమోదు చేయండి",
    sendOtp: "OTP పంపించు",
    verifyOtp: "ధృవీకరించి లాగిన్ చేయండి",
    newUser: "కొత్త వినియోగదారు?",
    register: "ఇక్కడ నమోదు చేయండి",
    resendOtp: "OTP మళ్లీ పంపించు"
  },
  bn: {
    title: "আবার স্বাগতম",
    subtitle: "আপনার অ্যাকাউন্টে সাইন ইন করুন",
    phoneLabel: "ফোন নম্বর",
    phonePlaceholder: "আপনার ফোন নম্বর লিখুন",
    otpLabel: "OTP কোড",
    otpPlaceholder: "৬-সংখ্যার OTP লিখুন",
    sendOtp: "OTP পাঠান",
    verifyOtp: "যাচাই করুন ও লগইন করুন",
    newUser: "নতুন ব্যবহারকারী?",
    register: "এখানে নিবন্ধন করুন",
    resendOtp: "OTP পুনরায় পাঠান"
  },
  mr: {
    title: "पुन्हा स्वागत आहे",
    subtitle: "तुमच्या खात्यात साइन इन करा",
    phoneLabel: "फोन नंबर",
    phonePlaceholder: "तुमचा फोन नंबर टाका",
    otpLabel: "OTP कोड",
    otpPlaceholder: "6-अंकी OTP टाका",
    sendOtp: "OTP पाठवा",
    verifyOtp: "पडताळा आणि लॉगिन करा",
    newUser: "नवीन वापरकर्ता?",
    register: "इथे नोंदणी करा",
    resendOtp: "OTP पुन्हा पाठवा"
  },
  gu: {
    title: "ફરીથી સ્વાગત છે",
    subtitle: "તમારા એકાઉન્ટમાં સાઇન ઇન કરો",
    phoneLabel: "ફોન નંબર",
    phonePlaceholder: "તમારો ફોન નંબર દાખલ કરો",
    otpLabel: "OTP કોડ",
    otpPlaceholder: "6-અંકનો OTP દાખલ કરો",
    sendOtp: "OTP મોકલો",
    verifyOtp: "ચકાસો અને લોગિન કરો",
    newUser: "નવા વપરાશકર્તા?",
    register: "અહીં નોંધણી કરો",
    resendOtp: "OTP ફરીથી મોકલો"
  },
  kn: {
    title: "ಮತ್ತೆ ಸ್ವಾಗತ",
    subtitle: "ನಿಮ್ಮ ಖಾತೆಗೆ ಸೈನ್ ಇನ್ ಮಾಡಿ",
    phoneLabel: "ಫೋನ್ ಸಂಖ್ಯೆ",
    phonePlaceholder: "ನಿಮ್ಮ ಫೋನ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",
    otpLabel: "OTP ಕೋಡ್",
    otpPlaceholder: "6-ಅಂಕಿಗಳ OTP ನಮೂದಿಸಿ",
    sendOtp: "OTP ಕಳುಹಿಸಿ",
    verifyOtp: "ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಲಾಗಿನ್ ಮಾಡಿ",
    newUser: "ಹೊಸ ಬಳಕೆದಾರ?",
    register: "ಇಲ್ಲಿ ನೋಂದಾಯಿಸಿ",
    resendOtp: "OTP ಮತ್ತೆ ಕಳುಹಿಸಿ"
  },
  ml: {
    title: "വീണ്ടും സ്വാഗതം",
    subtitle: "നിങ്ങളുടെ അക്കൗണ്ടിലേക്ക് സൈൻ ഇൻ ചെയ്യുക",
    phoneLabel: "ഫോൺ നമ്പർ",
    phonePlaceholder: "നിങ്ങളുടെ ഫോൺ നമ്പർ നൽകുക",
    otpLabel: "OTP കോഡ്",
    otpPlaceholder: "6-അക്ക OTP നൽകുക",
    sendOtp: "OTP അയയ്ക്കുക",
    verifyOtp: "പരിശോധിച്ച് ലോഗിൻ ചെയ്യുക",
    newUser: "പുതിയ ഉപയോക്താവ്?",
    register: "ഇവിടെ രജിസ്റ്റർ ചെയ്യുക",
    resendOtp: "OTP വീണ്ടും അയയ്ക്കുക"
  },
  pa: {
    title: "ਮੁੜ ਸੁਆਗਤ ਹੈ",
    subtitle: "ਆਪਣੇ ਖਾਤੇ ਵਿੱਚ ਸਾਈਨ ਇਨ ਕਰੋ",
    phoneLabel: "ਫੋਨ ਨੰਬਰ",
    phonePlaceholder: "ਆਪਣਾ ਫੋਨ ਨੰਬਰ ਦਾਖਲ ਕਰੋ",
    otpLabel: "OTP ਕੋਡ",
    otpPlaceholder: "6-ਅੰਕਾਂ ਦਾ OTP ਦਾਖਲ ਕਰੋ",
    sendOtp: "OTP ਭੇਜੋ",
    verifyOtp: "ਤਸਦੀਕ ਕਰੋ ਅਤੇ ਲਾਗਇਨ ਕਰੋ",
    newUser: "ਨਵਾਂ ਉਪਭੋਗਤਾ?",
    register: "ਇੱਥੇ ਰਜਿਸਟਰ ਕਰੋ",
    resendOtp: "OTP ਦੁਬਾਰਾ ਭੇਜੋ"
  },
  ur: {
    title: "واپس خوش آمدید",
    subtitle: "اپنے اکاؤنٹ میں سائن ان کریں",
    phoneLabel: "فون نمبر",
    phonePlaceholder: "اپنا فون نمبر درج کریں",
    otpLabel: "OTP کوڈ",
    otpPlaceholder: "6-ہندسی OTP درج کریں",
    sendOtp: "OTP بھیجیں",
    verifyOtp: "تصدیق کریں اور لاگ ان کریں",
    newUser: "نیا صارف؟",
    register: "یہاں رجسٹر کریں",
    resendOtp: "OTP دوبارہ بھیجیں"
  },
  as: {
    title: "পুনৰ স্বাগতম",
    subtitle: "আপোনাৰ একাউণ্টত চাইন ইন কৰক",
    phoneLabel: "ফোন নম্বৰ",
    phonePlaceholder: "আপোনাৰ ফোন নম্বৰ দিয়ক",
    otpLabel: "OTP ক'ড",
    otpPlaceholder: "৬-সংখ্যাৰ OTP দিয়ক",
    sendOtp: "OTP পঠিয়াওক",
    verifyOtp: "সত্যাপন কৰক আৰু লগইন কৰক",
    newUser: "নতুন ব্যৱহাৰকাৰী?",
    register: "ইয়াত পঞ্জীয়ন কৰক",
    resendOtp: "OTP পুনৰ পঠিয়াওক"
  },
  or: {
    title: "ପୁନର୍ବାର ସ୍ୱାଗତ",
    subtitle: "ଆପଣଙ୍କ ଖାତାରେ ସାଇନ୍ ଇନ୍ କରନ୍ତୁ",
    phoneLabel: "ଫୋନ୍ ନମ୍ବର",
    phonePlaceholder: "ଆପଣଙ୍କ ଫୋନ୍ ନମ୍ବର ଦିଅନ୍ତୁ",
    otpLabel: "OTP କୋଡ୍",
    otpPlaceholder: "୬-ଅଙ୍କର OTP ଦିଅନ୍ତୁ",
    sendOtp: "OTP ପଠାନ୍ତୁ",
    verifyOtp: "ଯାଞ୍ଚ କରନ୍ତୁ ଏବଂ ଲଗଇନ୍ କରନ୍ତୁ",
    newUser: "ନୂତନ ଉପଭୋଗକାରୀ?",
    register: "ଏଠାରେ ପଞ୍ଜୀକରଣ କରନ୍ତୁ",
    resendOtp: "OTP ପୁଣି ପଠାନ୍ତୁ"
  }
};

export function LoginScreen({ language, onLoginSuccess, onRegister }: LoginScreenProps) {
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const langCode = language?.code || 'en';
  const content = loginContent[langCode as keyof typeof loginContent] || loginContent.en;

  const handleSendOtp = async () => {
    if (phone.length === 10) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setOtpSent(true);
        setIsLoading(false);
      }, 1500);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length === 6) {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setIsLoading(false);
        onLoginSuccess();
      }, 1500);
    }
  };

  const handleResendOtp = () => {
    setOtp('');
    handleSendOtp();
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-green-600 text-white p-6 text-center">
        {/* === MODIFIED SECTION START === */}
        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-8 h-8 text-green-600" />
        </div>
        {/* === MODIFIED SECTION END === */}
        <h1 className="text-2xl font-bold mb-2">{content.title}</h1>
        <p className="text-green-100">{content.subtitle}</p>
      </div>

      {/* Form */}
      <div className="flex-1 p-6">
        <div className="max-w-sm mx-auto mt-8">
          {/* Phone Input */}
          <div className="mb-6">
            <label className="block text-gray-700 font-medium mb-3">
              {content.phoneLabel}
            </label>
            <div className="relative">
              <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                  if (value.length <= 10) {
                    setPhone(value);
                  }
                }}
                placeholder={content.phonePlaceholder}
                className="w-full pl-12 h-14 border-2 border-gray-200 focus:border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                maxLength={10}
                disabled={otpSent}
              />
            </div>
          </div>

          {/* OTP Input */}
          {otpSent && (
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-3">
                {content.otpLabel}
              </label>
              <input
                type="tel"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ''); // Only allow digits
                  if (value.length <= 6) {
                    setOtp(value);
                  }
                }}
                placeholder={content.otpPlaceholder}
                className="w-full h-14 border-2 border-gray-200 focus:border-green-500 text-center text-lg tracking-widest rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                maxLength={6}
                inputMode="numeric"
                pattern="[0-9]*"
              />
              <button
                onClick={handleResendOtp}
                className="text-green-600 text-sm mt-2 hover:underline"
              >
                {content.resendOtp}
              </button>
            </div>
          )}

          {/* Action Button */}
          <SimpleButton
            onClick={otpSent ? handleVerifyOtp : handleSendOtp}
            disabled={isLoading || (!otpSent && phone.length !== 10) || (otpSent && otp.length !== 6)}
            className="w-full h-14 text-lg"
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Loading...</span>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <span>{otpSent ? content.verifyOtp : content.sendOtp}</span>
                <ArrowRight className="w-5 h-5" />
              </div>
            )}
          </SimpleButton>

          {/* Register Link */}
          <div className="text-center mt-8">
            <p className="text-gray-600">
              {content.newUser}{' '}
              <button
                onClick={onRegister}
                className="text-green-600 font-medium hover:underline"
              >
                {content.register}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
