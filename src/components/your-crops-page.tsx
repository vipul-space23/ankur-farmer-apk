import React, { useState, useMemo, forwardRef } from 'react';
import { 
  CloudRain, 
  Droplets, 
  Wind, 
  Sun, 
  Thermometer,
  Beaker,
  Bug,
  Award,
  Sprout,
  MessageCircle,
  ChevronRight,
  Clock,
  ArrowRight,
  MapPin,
  ChevronLeft,
  // Icons for Irrigation Planner
  Leaf, 
  Layers, 
  CalendarClock, 
  CheckCircle2, 
  XCircle,
  Globe
} from 'lucide-react';
import { Language, User, Screen } from '../App';

// --- START: Self-contained component definitions ---
// To resolve import errors, the necessary helper components are defined here.

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
  const sizeClasses = { default: 'h-10 py-2 px-4', icon: 'h-10 w-10' };
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
    const languages: Language[] = [ { code: 'en', name: 'English', nativeName: 'English', flag:'' }, { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', flag:'' } ];
    const toggleLanguage = () => {
        const nextLanguage = (selectedLanguage?.code || 'en') === 'en' ? languages[1] : languages[0];
        onLanguageChange(nextLanguage);
    };
    const otherLanguage = (selectedLanguage?.code || 'en') === 'en' ? languages[1] : languages[0];
    const buttonClasses = variant === 'header' 
        ? "flex items-center space-x-2 text-white bg-white/20 hover:bg-white/30 px-3 py-2 rounded-full"
        : "text-gray-700 bg-gray-100 hover:bg-gray-200";
    return (
        <button onClick={toggleLanguage} className={`transition-colors ${buttonClasses}`}>
             {variant === 'header' ? (<><Globe className="w-4 h-4" /><span className="text-sm font-semibold">{otherLanguage.code.toUpperCase()}</span></>) : (`Switch to ${otherLanguage.name}`)}
        </button>
    );
};

const ImageWithFallback = ({ src, alt, className }: { src: string; alt: string; className: string; }) => {
    const [imgSrc, setImgSrc] = useState(src);
    const handleError = () => setImgSrc(`https://placehold.co/100x100/e2e8f0/4a5568?text=Image`);
    return <img src={imgSrc} alt={alt} className={className} onError={handleError} />;
};
// --- END: Self-contained component definitions ---

interface YourCropsPageProps {
  selectedLanguage: Language | null;
  user: User | null;
  onNavigate: (screen: Screen, ...args: any[]) => void;
  onLanguageChange: (language: Language) => void;
}

const cropsContent = {
  en: {
    greeting: "Good morning",
    weather: "Weather",
    sprayingConditions: "Spraying Conditions",
    optimal: "Optimal",
    ideal: "Ideal", 
    unfavorable: "Unfavorable",
    sprayAt: "Spray at 3 PM today",
    requestSoilData: "Request Soil Data",
    diseaseDetection: "Disease Detection",
    govSchemes: "Government Schemes",
    cropGuidance: "Crop Guidance",
    currentCrops: "Current Crops",
    viewAll: "View All",
    daysToHarvest: "days to harvest",
    nextAction: "Next Action",
    humidity: "Humidity",
    windSpeed: "Wind Speed",
    temperature: "Temperature",
    rainChance: "Rain Chance",
    sprayingAdvice: "Best time to spray based on weather",
    weatherForecast: "Weather Forecast",
    next6Days: "Next 6 Days",
    bestTime: "Best Time to Spray",
    todayWeather: "Today's Weather",
    location: "Location",
    irrigation: {
        title: "Irrigation Planner",
        subtitle: "Avoid overwatering with smart scheduling",
        cropType: "Crop Type",
        soilType: "Soil Type",
        lastWatered: "Last Watered On",
        calculate: "Get Schedule",
        recommendation: "Recommendation",
        waterToday: "Water Today",
        noWaterNeeded: "No Watering Needed",
        reason: "Reason",
        reasonRain: "Rain is expected in the next 2 days.",
        reasonMoisture: "Soil moisture is likely sufficient.",
        reasonDry: "Hot and dry conditions expected.",
        crops: ["Wheat", "Rice", "Cotton", "Sugarcane"],
        soils: ["Sandy", "Loam", "Clay"]
    }
  },
  hi: {
    greeting: "सुप्रभात",
    weather: "मौसम",
    sprayingConditions: "छिड़काव की स्थिति",
    optimal: "उत्तम",
    ideal: "आदर्श",
    unfavorable: "प्रतिकूल", 
    sprayAt: "आज दोपहर 3 बजे छिड़काव करें",
    requestSoilData: "मिट्टी डेटा अनुरोध",
    diseaseDetection: "रोग निदान",
    govSchemes: "सरकारी योजनाएं",
    cropGuidance: "फसल मार्गदर्शन",
    currentCrops: "वर्तमान फसलें",
    viewAll: "सभी देखें",
    daysToHarvest: "कटाई के दिन",
    nextAction: "अगली कार्रवाई",
    humidity: "आर्द्रता",
    windSpeed: "हवा की गति",
    temperature: "तापमान",
    rainChance: "बारिश की संभावना",
    sprayingAdvice: "मौसम के आधार पर छिड़काव का सबसे अच्छा समय",
    weatherForecast: "मौसम पूर्वानुमान",
    next6Days: "अगले 6 दिन",
    bestTime: "छिड़काव का सर्वोत्तम समय",
    todayWeather: "आज का मौसम",
    location: "स्थान",
    irrigation: {
        title: "सिंचाई योजनाकार",
        subtitle: "स्मार्ट शेड्यूलिंग से अतिरिक्त पानी से बचें",
        cropType: "फ़सल का प्रकार",
        soilType: "मिट्टी का प्रकार",
        lastWatered: "आखिरी बार पानी दिया",
        calculate: "शेड्यूल प्राप्त करें",
        recommendation: "सिफारिश",
        waterToday: "आज पानी दें",
        noWaterNeeded: "पानी की आवश्यकता नहीं है",
        reason: "कारण",
        reasonRain: "अगले 2 दिनों में बारिश की उम्मीद है।",
        reasonMoisture: "मिट्टी की नमी पर्याप्त होने की संभावना है।",
        reasonDry: "गर्म और शुष्क परिस्थितियों की उम्मीद है।",
        crops: ["गेहूं", "चावल", "कपास", "गन्ना"],
        soils: ["रेतीली", "दोमट", "चिकनी"]
    }
  }
};

const mockCurrentCrops = [
  { id: '1', name: 'Rice', nativeName: 'चावल', daysToHarvest: 45, progress: 65, nextAction: 'Apply potassium fertilizer', nextActionHi: 'पोटेशियम उर्वरक डालें', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' },
  { id: '2', name: 'Wheat', nativeName: 'गेहूं', daysToHarvest: 32, progress: 80, nextAction: 'Monitor for pests', nextActionHi: 'कीटों के लिए निगरानी करें', image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400' }
];

const mockWeatherData = {
  location: 'Pune, Maharashtra', temperature: 28, humidity: 68, windSpeed: 12,
  rainChance: 15, uvIndex: 6, condition: 'Partly Cloudy', sprayingCondition: 'optimal'
};

// --- IRRIGATION PLANNER COMPONENT ---
const IrrigationPlanner = ({ content, forecast }: { content: typeof cropsContent.en.irrigation, forecast: any[] }) => {
    const [crop, setCrop] = useState('');
    const [soil, setSoil] = useState('');
    const [lastWatered, setLastWatered] = useState('');
    const [recommendation, setRecommendation] = useState<{decision: string, reason: string, color: string} | null>(null);

    const handleCalculate = () => {
        if (!crop || !soil || !lastWatered) return;
        const rainInNext48h = forecast.length > 2 && (forecast[1].rainChance > 40 || forecast[2].rainChance > 40);
        if (rainInNext48h) {
            setRecommendation({ decision: content.noWaterNeeded, reason: content.reasonRain, color: 'blue' });
            return;
        }
        const daysSinceWatered = (new Date().getTime() - new Date(lastWatered).getTime()) / (1000 * 3600 * 24);
        const highTemp = forecast.length > 0 && forecast[0].temp > 32;
        let threshold = soil === content.soils[0] ? 2 : (soil === content.soils[2] ? 4 : 3);
        if (daysSinceWatered > threshold || (highTemp && daysSinceWatered > threshold - 1)) {
             setRecommendation({ decision: content.waterToday, reason: content.reasonDry, color: 'green' });
        } else {
             setRecommendation({ decision: content.noWaterNeeded, reason: content.reasonMoisture, color: 'blue' });
        }
    };

    const recColorClasses = {
        green: { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-800', icon: CheckCircle2 },
        blue: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-800', icon: XCircle }
    };
    const CurrentRec = recommendation ? recColorClasses[recommendation.color as 'green' | 'blue'] : null;

    return (
        <div className="bg-white rounded-xl shadow-sm border p-6 space-y-4">
            <div>
                <h2 className="text-lg font-semibold text-gray-800">{content.title}</h2>
                <p className="text-sm text-gray-500">{content.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1 flex items-center"><Leaf className="w-4 h-4 mr-2" />{content.cropType}</label>
                    <select value={crop} onChange={e => setCrop(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md bg-white">
                        <option value="">--</option>
                        {content.crops.map(c => <option key={c}>{c}</option>)}
                    </select>
                </div>
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1 flex items-center"><Layers className="w-4 h-4 mr-2" />{content.soilType}</label>
                    <select value={soil} onChange={e => setSoil(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md bg-white">
                         <option value="">--</option>
                         {content.soils.map(s => <option key={s}>{s}</option>)}
                    </select>
                </div>
            </div>
            <div>
                <label className="text-sm font-medium text-gray-700 block mb-1 flex items-center"><CalendarClock className="w-4 h-4 mr-2" />{content.lastWatered}</label>
                <input type="date" value={lastWatered} onChange={e => setLastWatered(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md"/>
            </div>
            <SimpleButton onClick={handleCalculate} className="w-full" disabled={!crop || !soil || !lastWatered}>
                {content.calculate}
            </SimpleButton>
            {recommendation && CurrentRec && (
                <div className={`${CurrentRec.bg} border-l-4 ${CurrentRec.border} p-4 rounded-r-lg mt-4`}>
                    <h3 className={`font-bold text-lg ${CurrentRec.text} flex items-center`}>
                        <CurrentRec.icon className="w-6 h-6 mr-2" />
                        {recommendation.decision}
                    </h3>
                    <p className={`text-sm ${CurrentRec.text} pl-8`}>{recommendation.reason}</p>
                </div>
            )}
        </div>
    );
};

export function YourCropsPage({ selectedLanguage, user, onNavigate, onLanguageChange }: YourCropsPageProps) {
  const [showWeatherDetails, setShowWeatherDetails] = useState(false);

  const langCode = selectedLanguage?.code || 'en';
  const content = cropsContent[langCode as keyof typeof cropsContent] || cropsContent.en;

  const forecastData = useMemo(() => Array.from({ length: 7 }).map((_, index) => {
      const date = new Date();
      date.setDate(date.getDate() + index);
      const temp = 25 + Math.floor(Math.random() * 10);
      const rain = Math.floor(Math.random() * 60);
      return { date, temp, rain, rainChance: rain };
  }), []);

  const getSprayingConditionColor = (condition: string) => {
    switch (condition) {
      case 'optimal': return 'bg-green-100 text-green-800 border-green-200';
      case 'ideal': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'unfavorable': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getSprayingConditionText = (condition: string) => {
    switch (condition) {
      case 'optimal': return content.optimal;
      case 'ideal': return content.ideal;
      case 'unfavorable': return content.unfavorable;
      default: return condition;
    }
  };

  if (showWeatherDetails) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-b from-blue-50 to-white">
        <div className="bg-blue-600 text-white p-6 sticky top-0 z-10 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <SimpleButton onClick={() => setShowWeatherDetails(false)} variant="ghost" size="icon" className="text-white hover:bg-blue-700">
                <ChevronLeft className="w-6 h-6" />
              </SimpleButton>
              <div>
                <h1 className="text-xl font-bold">{content.weatherForecast}</h1>
                <p className="text-blue-100">{content.sprayingAdvice}</p>
              </div>
            </div>
            <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={onLanguageChange} variant="header" />
          </div>
        </div>

        <div className="flex-1 p-4 space-y-6 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">{content.todayWeather}</h2>
            <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"><Thermometer className="w-5 h-5 text-orange-500" /><div><div className="text-sm text-gray-600">{content.temperature}</div><div className="font-medium">{mockWeatherData.temperature}°C</div></div></div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"><Droplets className="w-5 h-5 text-blue-500" /><div><div className="text-sm text-gray-600">{content.humidity}</div><div className="font-medium">{mockWeatherData.humidity}%</div></div></div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"><Wind className="w-5 h-5 text-gray-500" /><div><div className="text-sm text-gray-600">{content.windSpeed}</div><div className="font-medium">{mockWeatherData.windSpeed} km/h</div></div></div>
                <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg"><CloudRain className="w-5 h-5 text-blue-500" /><div><div className="text-sm text-gray-600">{content.rainChance}</div><div className="font-medium">{mockWeatherData.rainChance}%</div></div></div>
            </div>
          </div>

          <div className="bg-green-50 rounded-xl border border-green-200 p-6">
            <h2 className="text-lg font-semibold text-green-800 mb-4">{content.bestTime}</h2>
            <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-green-100">
              <div className="flex items-center space-x-3">
                <Clock className="w-6 h-6 text-green-600" />
                <div>
                  <div className="font-semibold text-green-800">3:00 PM - 6:00 PM</div>
                  <div className="text-sm text-green-600">Low wind, optimal conditions</div>
                </div>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getSprayingConditionColor(mockWeatherData.sprayingCondition)}`}>
                {getSprayingConditionText(mockWeatherData.sprayingCondition)}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h2 className="text-lg font-semibold mb-4">{content.next6Days}</h2>
            <div className="space-y-3">
              {forecastData.slice(1).map((day, index) => (
                  <div key={index} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 text-sm font-medium text-gray-600">{day.date.toLocaleDateString('en', { weekday: 'short' })}</div>
                      <Sun className="w-5 h-5 text-yellow-500" />
                      <div>
                        <div className="font-medium">Sunny</div>
                        <div className="text-sm text-gray-600">{day.rain}% rain</div>
                      </div>
                    </div>
                    <div className="font-medium text-right">{day.temp}°C</div>
                  </div>
                )
              )}
            </div>
          </div>
          
          {/* --- IRRIGATION PLANNER ADDED HERE --- */}
          <IrrigationPlanner content={content.irrigation} forecast={forecastData} />

        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-green-50 to-white">
      <div className="bg-green-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center"><Sprout className="w-6 h-6 text-green-600" /></div>
            <div>
              <p className="text-green-100 text-sm">{content.greeting}</p>
              <h1 className="text-xl font-bold">{user?.name || 'Farmer'}</h1>
            </div>
          </div>
          <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={onLanguageChange} variant="header" />
        </div>
        <div className="flex items-center text-green-100 text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{user?.location || mockWeatherData.location}</span>
        </div>
      </div>

      <div className="flex-1 p-4 space-y-6 overflow-y-auto">
        <div className="flex space-x-3 overflow-x-auto pb-2">
          <SimpleButton onClick={() => setShowWeatherDetails(true)} variant="outline" className="min-w-[200px] h-24 flex-shrink-0 bg-blue-50 border-blue-200 hover:bg-blue-100 rounded-2xl p-4">
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center"><CloudRain className="w-5 h-5 text-blue-600" /></div>
                <div className="text-left">
                  <p className="text-sm font-medium text-blue-800">{content.weather}</p>
                  <p className="text-xs text-blue-600">{mockWeatherData.temperature}°C • {mockWeatherData.humidity}%</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-blue-600" />
            </div>
          </SimpleButton>

          <div className="min-w-[220px] h-24 flex-shrink-0 bg-white border border-gray-200 rounded-2xl p-4">
            <div className="flex items-center justify-between h-full">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"><Droplets className="w-5 h-5 text-green-600" /></div>
                <div>
                  <p className="text-sm font-medium text-gray-800">{content.sprayingConditions}</p>
                  <div className={`inline-block px-2 py-1 rounded text-xs font-medium border ${getSprayingConditionColor(mockWeatherData.sprayingCondition)}`}>
                    {getSprayingConditionText(mockWeatherData.sprayingCondition)}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="min-w-[200px] h-24 flex-shrink-0 bg-green-50 border border-green-200 rounded-2xl p-4">
            <div className="flex items-center space-x-3 h-full">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center"><Clock className="w-5 h-5 text-green-600" /></div>
              <div>
                <p className="text-sm font-medium text-green-800">{content.sprayAt}</p>
                <p className="text-xs text-green-600">3 PM - 6 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <SimpleButton onClick={() => onNavigate('soil-test')} variant="outline" className="h-28 flex flex-col items-center justify-center space-y-3 bg-gradient-to-br from-amber-50 to-orange-100 border-orange-200 hover:from-orange-100 hover:to-orange-150">
            <Beaker className="w-8 h-8 text-orange-600" />
            <span className="text-sm font-medium text-orange-800 text-center">{content.requestSoilData}</span>
          </SimpleButton>
          <SimpleButton onClick={() => onNavigate('disease-detection-new')} variant="outline" className="h-28 flex flex-col items-center justify-center space-y-3 bg-gradient-to-br from-red-50 to-red-100 border-red-200 hover:from-red-100 hover:to-red-150">
            <Bug className="w-8 h-8 text-red-600" />
            <span className="text-sm font-medium text-red-800 text-center">{content.diseaseDetection}</span>
          </SimpleButton>
          <SimpleButton onClick={() => onNavigate('government-schemes')} variant="outline" className="h-28 flex flex-col items-center justify-center space-y-3 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:from-blue-100 hover:to-blue-150">
            <Award className="w-8 h-8 text-blue-600" />
            <span className="text-sm font-medium text-blue-800 text-center">{content.govSchemes}</span>
          </SimpleButton>
          <SimpleButton onClick={() => onNavigate('crop-guidance')} variant="outline" className="h-28 flex flex-col items-center justify-center space-y-3 bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:from-green-100 hover:to-green-150">
            <Sprout className="w-8 h-8 text-green-600" />
            <span className="text-sm font-medium text-green-800 text-center">{content.cropGuidance}</span>
          </SimpleButton>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-800">{content.currentCrops}</h3>
            <SimpleButton variant="ghost" className="text-green-600 hover:text-green-700">
              {content.viewAll}
              <ArrowRight className="w-4 h-4 ml-1" />
            </SimpleButton>
          </div>
          <div className="space-y-3">
            {mockCurrentCrops.map((crop) => (
              <div key={crop.id} className="bg-white rounded-xl border border-gray-200 p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden">
                    <ImageWithFallback src={crop.image} alt={crop.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-800">{langCode === 'hi' ? crop.nativeName : crop.name}</h4>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="text-sm text-gray-600"><span className="font-medium text-orange-600">{crop.daysToHarvest}</span> {content.daysToHarvest}</div>
                      <div className="text-sm text-gray-600"><span className="font-medium text-green-600">{crop.progress}%</span></div>
                    </div>
                    <div className="mt-2"><div className="w-full bg-gray-200 rounded-full h-2"><div className="bg-green-500 h-2 rounded-full" style={{ width: `${crop.progress}%` }}></div></div></div>
                    <div className="mt-3 text-sm">
                      <span className="text-gray-600">{content.nextAction}: </span>
                      <span className="font-medium text-green-600">{langCode === 'hi' ? crop.nextActionHi : crop.nextAction}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-20 right-4">
        <SimpleButton onClick={() => onNavigate('ai-chatbot')} className="w-14 h-14 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg">
          <MessageCircle className="w-6 h-6" />
        </SimpleButton>
      </div>
    </div>
  );
}
