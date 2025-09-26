import React, { useState, useEffect } from 'react';
import { MapPin, Navigation, CheckCircle, Search, Crosshair } from 'lucide-react';
import { Language, User, Screen } from '../App';
import { SimpleButton } from './simple-button';

interface FieldSelectionScreenProps {
  selectedLanguage: Language | null;
  user: User | null;
  onFieldSelected: (fieldData: { latitude: number; longitude: number; address: string }) => void;
  onNavigate: (screen: Screen) => void;
}

const fieldContent = {
  en: {
    title: "Select Your Farm Location",
    subtitle: "Mark your field on the map",
    instructions: "Tap on the map to mark your farm field location. This helps us provide accurate crop recommendations and weather updates.",
    currentLocation: "Use Current Location",
    searchPlaceholder: "Search for your field location...",
    confirmLocation: "Confirm Field Location",
    selectedLocation: "Selected Field Location:",
    accuracy: "Location Accuracy",
    goodAccuracy: "Good GPS Signal",
    poorAccuracy: "Weak GPS Signal",
    continue: "Continue to Dashboard",
    locationPermission: "Location permission required to show map"
  },
  hi: {
    title: "अपना खेत स्थान चुनें",
    subtitle: "मानचित्र पर अपना खेत चिह्नित करें",
    instructions: "अपने खेत की स्थिति को चिह्नित करने के लिए मानचित्र पर टैप करें। यह हमें सटीक फसल सुझाव और मौसम अपडेट प्रदान करने में मदद करता है।",
    currentLocation: "वर्तमान स्थान का उपयोग करें",
    searchPlaceholder: "अपने खेत की स्थिति खोजें...",
    confirmLocation: "खेत स्थान की पुष्टि करें",
    selectedLocation: "चयनित खेत स्थान:",
    accuracy: "स्थान सटीकता",
    goodAccuracy: "अच्छा GPS सिग्नल",
    poorAccuracy: "कमजोर GPS सिग्नल",
    continue: "डैशबोर्ड पर जाएं",
    locationPermission: "मानचित्र दिखाने के लिए स्थान अनुमति आवश्यक"
  },
  ta: {
    title: "உங்கள் பண்ணை இடத்தைத் தேர்ந்தெடுக்கவும்",
    subtitle: "வரைபடத்தில் உங்கள் வயலைக் குறிக்கவும்",
    instructions: "உங்கள் பண்ணை வயலின் இடத்தைக் குறிக்க வரைபடத்தில் தட்டவும். இது எங்களுக்கு துல்லியமான பயிர் பரிந்துரைகள் மற்றும் வானிலை புதுப்பிப்புகளை வழங்க உதவுகிறது।",
    currentLocation: "தற்போதைய இடத்தைப் பயன்படுத்தவும்",
    searchPlaceholder: "உங்கள் வயல் இடத்தைத் தேடுங்கள்...",
    confirmLocation: "வயல் இடத்தை உறுதிப்படுத்தவும்",
    selectedLocation: "தேர்ந்தெடுக்கப்பட்ட வயல் இடம்:",
    accuracy: "இட துல்லியம்",
    goodAccuracy: "நல்ல GPS சிக்னல்",
    poorAccuracy: "பலவீனமான GPS சிக்னல்",
    continue: "டாஷ்போர்டுக்குச் செல்லவும்",
    locationPermission: "வரைபடத்தைக் காட்ட இட அனுமதி தேவை"
  },
  te: {
    title: "మీ వ్యవసాయ స్థలాన్ని ఎంచుకోండి",
    subtitle: "మ్యాప్‌లో మీ పొలాన్ని గుర్తు చేయండి",
    instructions: "మీ వ్యవసాయ పొలం యొక్క స్థానాన్ని గుర్తు చేయడానికి మ్యాప్‌పై ట్యాప్ చేయండి. ఇది మాకు ఖచ్చితమైన పంట సూచనలు మరియు వాతావరణ అప్‌డేట్‌లను అందించడంలో సహాయపడుతుంది.",
    currentLocation: "ప్రస్తుత స్థానాన్ని ఉపయోగించండి",
    searchPlaceholder: "మీ పొలం స్థానాన్ని వెతకండి...",
    confirmLocation: "పొలం స్థానాన్ని నిర్ధారించండి",
    selectedLocation: "ఎంచుకున్న పొలం స్థానం:",
    accuracy: "స్థాన ఖచ్చితత్వం",
    goodAccuracy: "మంచి GPS సిగ్నల్",
    poorAccuracy: "బలహీనమైన GPS సిగ్నల్",
    continue: "డ్యాష్‌బోర్డ్‌కు వెళ్లండి",
    locationPermission: "మ్యాప్ చూపించడానికి స్థాన అనుమతి అవసరం"
  },
  bn: {
    title: "আপনার খামার অবস্থান নির্বাচন করুন",
    subtitle: "মানচিত্রে আপনার ক্ষেত চিহ্নিত করুন",
    instructions: "আপনার খামারের ক্ষেতের অবস্থান চিহ্নিত করতে মানচিত্রে ট্যাপ করুন। এটি আমাদের সঠিক ফসল সুপারিশ এবং আবহাওয়ার আপডেট প্রদান করতে সাহায্য করে।",
    currentLocation: "বর্তমান অবস্থান ব্যবহার করুন",
    searchPlaceholder: "আপনার ক্ষেতের অবস্থান খুঁজুন...",
    confirmLocation: "ক্ষেতের অবস্থান নিশ্চিত করুন",
    selectedLocation: "নির্বাচিত ক্ষেতের অবস্থান:",
    accuracy: "অবস্থানের নির্ভুলতা",
    goodAccuracy: "ভাল GPS সিগন্যাল",
    poorAccuracy: "দুর্বল GPS সিগন্যাল",
    continue: "ড্যাশবোর্ডে যান",
    locationPermission: "মানচিত্র দেখানোর জন্য অবস্থানের অনুমতি প্রয়োজন"
  },
  mr: {
    title: "तुमचे शेत स्थान निवडा",
    subtitle: "नकाशावर तुमचे शेत चिन्हांकित करा",
    instructions: "तुमच्या शेताच्या ठिकाणाला चिन्हांकित करण्यासाठी नकाशावर टॅप करा. हे आम्हाला अचूक पीक शिफारशी आणि हवामान अपडेट्स प्रदान करण्यास मदत करते.",
    currentLocation: "सध्याचे स्थान वापरा",
    searchPlaceholder: "तुमच्या शेताचे स्थान शोधा...",
    confirmLocation: "शेत स्थानाची पुष्टी करा",
    selectedLocation: "निवडलेले शेत स्थान:",
    accuracy: "स्थान अचूकता",
    goodAccuracy: "चांगला GPS सिग्नल",
    poorAccuracy: "कमकुवत GPS सिग्नल",
    continue: "डॅशबोर्डवर जा",
    locationPermission: "नकाशा दाखवण्यासाठी स्थान परवानगी आवश्यक"
  },
  gu: {
    title: "તમારું ખેતરનું સ્થાન પસંદ કરો",
    subtitle: "નકશા પર તમારું ખેતર ચિહ્નિત કરો",
    instructions: "તમારા ખેતરની સ્થાનને ચિહ્નિત કરવા માટે નકશા પર ટૅપ કરો. આ અમને ચોક્કસ પાક ભલામણો અને હવામાન અપડેટ્સ પ્રદાન કરવામાં મદદ કરે છે.",
    currentLocation: "વર્તમાન સ્થાન વાપરો",
    searchPlaceholder: "તમારા ખેતરનું સ્થાન શોધો...",
    confirmLocation: "ખેતરના સ્થાનની પુષ્ટિ કરો",
    selectedLocation: "પસંદ કરેલું ખેતરનું સ્થાન:",
    accuracy: "સ્થાનની ચોકસાઈ",
    goodAccuracy: "સારો GPS સિગ્નલ",
    poorAccuracy: "નબળો GPS સિગ્નલ",
    continue: "ડૅશબોર્ડ પર જાઓ",
    locationPermission: "નકશો બતાવવા માટે સ્થાન અનુમતિ જરૂરી"
  },
  kn: {
    title: "ನಿಮ್ಮ ಕೃಷಿ ಸ್ಥಳವನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    subtitle: "ನಕ್ಷೆಯಲ್ಲಿ ನಿಮ್ಮ ಹೊಲವನ್ನು ಗುರುತಿಸಿ",
    instructions: "ನಿಮ್ಮ ಕೃಷಿ ಹೊಲದ ಸ್ಥಳವನ್ನು ಗುರುತಿಸಲು ನಕ್ಷೆಯ ಮೇಲೆ ಟ್ಯಾಪ್ ಮಾಡಿ. ಇದು ನಮಗೆ ನಿಖರವಾದ ಬೆಳೆ ಶಿಫಾರಸುಗಳು ಮತ್ತು ಹವಾಮಾನ ಅಪ್‌ಡೇಟ್‌ಗಳನ್ನು ಒದಗಿಸಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.",
    currentLocation: "ಪ್ರಸ್ತುತ ಸ್ಥಳವನ್ನು ಬಳಸಿ",
    searchPlaceholder: "ನಿಮ್ಮ ಹೊಲದ ಸ್ಥಳವನ್ನು ಹುಡುಕಿ...",
    confirmLocation: "ಹೊಲದ ಸ್ಥಳವನ್ನು ದೃಢೀಕರಿಸಿ",
    selectedLocation: "ಆಯ್ಕೆಮಾಡಿದ ಹೊಲದ ಸ್ಥಳ:",
    accuracy: "ಸ್ಥಳದ ನಿಖರತೆ",
    goodAccuracy: "ಉತ್ತಮ GPS ಸಿಗ್ನಲ್",
    poorAccuracy: "ದುರ್ಬಲ GPS ಸಿಗ್ನಲ್",
    continue: "ಡ್ಯಾಶ್‌ಬೋರ್ಡ್‌ಗೆ ಹೋಗಿ",
    locationPermission: "ನಕ್ಷೆ ತೋರಿಸಲು ಸ್ಥಳ ಅನುಮತಿ ಅವಶ್ಯಕ"
  },
  ml: {
    title: "നിങ്ങളുടെ കൃഷി സ്ഥലം തിരഞ്ഞെടുക്കുക",
    subtitle: "മാപ്പിൽ നിങ്ങളുടെ വയൽ അടയാളപ്പെടുത്തുക",
    instructions: "നിങ്ങളുടെ കൃഷി വയലിന്റെ സ്ഥാനം അടയാളപ്പെടുത്താൻ മാപ്പിൽ ടാപ്പ് ചെയ്യുക. ഇത് ഞങ്ങൾക്ക് കൃത്യമായ വിള ശുപാർശകളും കാലാവസ്ഥാ അപ്‌ഡേറ്റുകളും നൽകാൻ സഹായിക്കുന്നു.",
    currentLocation: "നിലവിലെ സ്ഥാനം ഉപയോഗിക്കുക",
    searchPlaceholder: "നിങ്ങളുടെ വയലിന്റെ സ്ഥാനം തിരയുക...",
    confirmLocation: "വയൽ സ്ഥാനം സ്ഥിരീകരിക്കുക",
    selectedLocation: "തിരഞ്ഞെടുത്ത വയൽ സ്ഥാനം:",
    accuracy: "സ്ഥാന കൃത്യത",
    goodAccuracy: "നല്ല GPS സിഗ്നൽ",
    poorAccuracy: "ദുർബലമായ GPS സിഗ്നൽ",
    continue: "ഡാഷ്‌ബോർഡിലേക്ക് പോകുക",
    locationPermission: "മാപ്പ് കാണിക്കാൻ സ്ഥാന അനുമതി ആവശ്യം"
  },
  pa: {
    title: "ਆਪਣੀ ਖੇਤੀ ਦੀ ਜਗ੍ਹਾ ਚੁਣੋ",
    subtitle: "ਨਕਸ਼ੇ 'ਤੇ ਆਪਣੇ ਖੇਤ ਨੂੰ ਚਿੰਨ੍ਹਿਤ ਕਰੋ",
    instructions: "ਆਪਣੇ ਖੇਤ ਦੀ ਸਥਿਤੀ ਨੂੰ ਚਿੰਨ੍ਹਿਤ ਕਰਨ ਲਈ ਨਕਸ਼ੇ 'ਤੇ ਟੈਪ ਕਰੋ। ਇਹ ਸਾਨੂੰ ਸਹੀ ਫਸਲ ਸੁਝਾਅ ਅਤੇ ਮੌਸਮ ਅਪਡੇਟ ਪ੍ਰਦਾਨ ਕਰਨ ਵਿੱਚ ਮਦਦ ਕਰਦਾ ਹੈ।",
    currentLocation: "ਮੌਜੂਦਾ ਸਥਿਤੀ ਵਰਤੋ",
    searchPlaceholder: "ਆਪਣੇ ਖੇਤ ਦੀ ਜਗ੍ਹਾ ਖੋਜੋ...",
    confirmLocation: "ਖੇਤ ਦੀ ਜਗ੍ਹਾ ਦੀ ਪੁਸ਼ਟੀ ਕਰੋ",
    selectedLocation: "ਚੁਣਿਆ ਗਿਆ ਖੇਤ ਸਥਾਨ:",
    accuracy: "ਸਥਿਤੀ ਦੀ ਸ਼ੁੱਧਤਾ",
    goodAccuracy: "ਚੰਗਾ GPS ਸਿਗਨਲ",
    poorAccuracy: "ਕਮਜ਼ੋਰ GPS ਸਿਗਨਲ",
    continue: "ਡੈਸ਼ਬੋਰਡ 'ਤੇ ਜਾਓ",
    locationPermission: "ਨਕਸ਼ਾ ਦਿਖਾਉਣ ਲਈ ਸਥਿਤੀ ਦੀ ਇਜਾਜ਼ਤ ਚਾਹੀਦੀ ਹੈ"
  },
  ur: {
    title: "اپنے کھیت کی جگہ منتخب کریں",
    subtitle: "نقشے پر اپنے کھیت کو نشاندہی کریں",
    instructions: "اپنے کھیت کی جگہ کو نشاندہی کرنے کے لیے نقشے پر ٹیپ کریں۔ یہ ہمیں درست فصل کی سفارشات اور موسمی اپ ڈیٹس فراہم کرنے میں مدد کرتا ہے۔",
    currentLocation: "موجودہ جگہ استعمال کریں",
    searchPlaceholder: "اپنے کھیت کی جگہ تلاش کریں...",
    confirmLocation: "کھیت کی جگہ کی تصدیق کریں",
    selectedLocation: "منتخب کردہ کھیت کی جگہ:",
    accuracy: "مقام کی درستگی",
    goodAccuracy: "اچھا GPS سگنل",
    poorAccuracy: "کمزور GPS سگنل",
    continue: "ڈیش بورڈ پر جائیں",
    locationPermission: "نقشہ دکھانے کے لیے مقام کی اجازت درکار"
  },
  as: {
    title: "আপোনাৰ খেতিৰ ঠাই বাছনি কৰক",
    subtitle: "মেপত আপোনাৰ খেতি চিহ্নিত কৰক",
    instructions: "আপোনাৰ খেতিৰ ঠাই চিহ্নিত কৰিবলৈ মেপত টেপ কৰক। এইটোৱে আমাক সঠিক শস্যৰ পৰামৰ্শ আৰু বতৰৰ আপডেট প্ৰদান কৰাত সহায় কৰে।",
    currentLocation: "বৰ্তমানৰ ঠাই ব্যৱহাৰ কৰক",
    searchPlaceholder: "আপোনাৰ খেতিৰ ঠাই বিচাৰক...",
    confirmLocation: "খেতিৰ ঠাই নিশ্চিত কৰক",
    selectedLocation: "বাছনি কৰা খেতিৰ ঠাই:",
    accuracy: "ঠাইৰ সঠিকতা",
    goodAccuracy: "ভাল GPS সংকেত",
    poorAccuracy: "দুৰ্বল GPS সংকেত",
    continue: "ডেছব'ৰ্ডলৈ যাওক",
    locationPermission: "মেপ দেখুৱাবলৈ ঠাইৰ অনুমতি লাগে"
  },
  or: {
    title: "ଆପଣଙ୍କ ଚାଷ ସ୍ଥାନ ବାଛନ୍ତୁ",
    subtitle: "ମାନଚିତ୍ରରେ ଆପଣଙ୍କ ଖେତ ଚିହ୍ନଟ କରନ୍ତୁ",
    instructions: "ଆପଣଙ୍କ ଚାଷ ଖେତର ସ୍ଥାନ ଚିହ୍ନଟ କରିବାକୁ ମାନଚିତ୍ରରେ ଟ୍ୟାପ୍ କରନ୍ତୁ। ଏହା ଆମକୁ ସଠିକ୍ ଫସଲ ସୁପାରିଶ ଏବଂ ପାଣିପାଗ ଅପଡେଟ୍ ପ୍ରଦାନ କରିବାରେ ସାହାଯ୍ୟ କରେ।",
    currentLocation: "ବର୍ତ୍ତମାନର ସ୍ଥାନ ବ୍ୟବହାର କରନ୍ତୁ",
    searchPlaceholder: "ଆପଣଙ୍କ ଖେତର ସ୍ଥାନ ଖୋଜନ୍ତୁ...",
    confirmLocation: "ଖେତ ସ୍ଥାନ ନିଶ୍ଚିତ କରନ୍ତୁ",
    selectedLocation: "ବଛାଯାଇଥିବା ଖେତ ସ୍ଥାନ:",
    accuracy: "ସ୍ଥାନ ସଠିକତା",
    goodAccuracy: "ଭଲ GPS ସଙ୍କେତ",
    poorAccuracy: "ଦୁର୍ବଳ GPS ସଙ୍କେତ",
    continue: "ଡ୍ୟାସବୋର୍ଡକୁ ଯାଆନ୍ତୁ",
    locationPermission: "ମାନଚିତ୍ର ଦେଖାଇବା ପାଇଁ ସ୍ଥାନ ଅନୁମତି ଆବଶ୍ୟକ"
  }
};

export function FieldSelectionScreen({ selectedLanguage, user, onFieldSelected, onNavigate }: FieldSelectionScreenProps) {
  const [selectedLocation, setSelectedLocation] = useState<{ latitude: number; longitude: number; address: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [locationAccuracy, setLocationAccuracy] = useState<'good' | 'poor' | null>(null);
  const [hasLocationPermission, setHasLocationPermission] = useState(false);

  const langCode = selectedLanguage?.code || 'en';
  const content = fieldContent[langCode as keyof typeof fieldContent] || fieldContent.en;

  useEffect(() => {
    // Check location permission on mount
    if (navigator.geolocation) {
      setHasLocationPermission(true);
    }
  }, []);

  const handleMapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    // Simulate map click with coordinates
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    // Convert pixel coordinates to lat/lng (mock calculation)
    const lat = 20.5937 + (y / rect.height) * 0.01;
    const lng = 78.9629 + (x / rect.width) * 0.01;
    
    setSelectedLocation({
      latitude: lat,
      longitude: lng,
      address: `Farm Field, ${user?.location || 'India'}`
    });
    
    // Simulate accuracy check
    setLocationAccuracy(Math.random() > 0.3 ? 'good' : 'poor');
  };

  const handleUseCurrentLocation = () => {
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setSelectedLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            address: `Current Location, ${user?.location || 'India'}`
          });
          setLocationAccuracy(position.coords.accuracy < 50 ? 'good' : 'poor');
          setIsLoading(false);
        },
        (error) => {
          console.error('Location error:', error);
          // Fallback to mock location
          setSelectedLocation({
            latitude: 20.5937,
            longitude: 78.9629,
            address: `${user?.location || 'Maharashtra'}, India`
          });
          setLocationAccuracy('poor');
          setIsLoading(false);
        }
      );
    } else {
      setIsLoading(false);
    }
  };

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      onFieldSelected(selectedLocation);
    }
  };

  if (!hasLocationPermission) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2">{content.title}</h2>
          <p className="text-gray-600 mb-6">{content.locationPermission}</p>
          <SimpleButton
            onClick={() => setHasLocationPermission(true)}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
          >
            Enable Location
          </SimpleButton>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex flex-col">
      {/* Header */}
      <div className="bg-green-600 text-white p-6">
        <div className="flex items-center space-x-3 mb-2">
          <MapPin className="w-6 h-6" />
          <h1 className="text-xl font-semibold">{content.title}</h1>
        </div>
        <p className="text-green-100 text-sm">{content.subtitle}</p>
      </div>

      {/* Instructions */}
      <div className="p-4 bg-blue-50 border-l-4 border-blue-400">
        <p className="text-blue-800 text-sm">{content.instructions}</p>
      </div>

      {/* Search Bar */}
      <div className="p-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={content.searchPlaceholder}
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 p-4">
        <div className="relative h-full bg-gray-200 rounded-lg overflow-hidden border-2 border-gray-300">
          {/* Mock Map */}
          <div 
            className="w-full h-full bg-gradient-to-br from-green-100 to-green-200 cursor-crosshair relative"
            onClick={handleMapClick}
          >
            {/* Grid pattern for map effect */}
            <div className="absolute inset-0 opacity-20">
              {[...Array(10)].map((_, i) => (
                <div key={i} className="border-b border-green-300 h-1/10"></div>
              ))}
            </div>
            
            {/* Current location marker */}
            {selectedLocation && (
              <div 
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${((selectedLocation.longitude - 78.9629) / 0.01) * 100}%`,
                  top: `${((selectedLocation.latitude - 20.5937) / 0.01) * 100}%`
                }}
              >
                <div className="relative">
                  <MapPin className="w-8 h-8 text-red-600 drop-shadow-lg" />
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-red-600 rounded-full opacity-50"></div>
                </div>
              </div>
            )}

            {/* Map center crosshair */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <Crosshair className="w-6 h-6 text-gray-500 opacity-30" />
            </div>
          </div>

          {/* Current Location Button */}
          <SimpleButton
            onClick={handleUseCurrentLocation}
            disabled={isLoading}
            className="absolute bottom-4 right-4 bg-white hover:bg-gray-50 text-green-600 border border-gray-300 rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-green-600 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <Navigation className="w-5 h-5" />
            )}
          </SimpleButton>
        </div>
      </div>

      {/* Selected Location Info */}
      {selectedLocation && (
        <div className="p-4 bg-white border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-gray-800">{content.selectedLocation}</span>
            </div>
            <div className={`flex items-center space-x-1 text-xs px-2 py-1 rounded-full ${
              locationAccuracy === 'good' 
                ? 'bg-green-100 text-green-800' 
                : 'bg-orange-100 text-orange-800'
            }`}>
              <div className={`w-2 h-2 rounded-full ${
                locationAccuracy === 'good' ? 'bg-green-500' : 'bg-orange-500'
              }`}></div>
              <span>{locationAccuracy === 'good' ? content.goodAccuracy : content.poorAccuracy}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm mb-4">{selectedLocation.address}</p>
          
          <SimpleButton
            onClick={handleConfirmLocation}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-medium"
          >
            {content.continue}
          </SimpleButton>
        </div>
      )}
    </div>
  );
}