import React, { useState, forwardRef, useMemo } from 'react';
import { Cloud, CloudRain, Sun, Leaf, Layers, CalendarClock, CheckCircle2, XCircle, ArrowLeft, Globe } from 'lucide-react';
import { Language, Screen } from '../App';

// --- START: Self-contained component definitions ---
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
    const languages: Language[] = [
        { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧' },
        { code: 'hi', name: 'हिन्दी', nativeName: 'हिन्दी', flag: '🇮🇳' }
    ];
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

const AppHeader = ({ title, selectedLanguage, onLanguageChange, onBack }: { title: string, selectedLanguage: Language | null, onLanguageChange: (language: Language) => void, onBack: () => void }) => (
    <div className="bg-blue-600 text-white p-4 sticky top-0 z-10 shadow-md">
        <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
                <SimpleButton onClick={onBack} variant="ghost" size="icon" className="text-white hover:bg-blue-700">
                    <ArrowLeft className="w-6 h-6" />
                </SimpleButton>
                <h1 className="text-xl font-bold">{title}</h1>
            </div>
            <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={onLanguageChange} variant="header"/>
        </div>
    </div>
);
// --- END: Self-contained component definitions ---


interface IrrigationSchedulerPageProps {
  selectedLanguage: Language | null;
  onNavigate: (screen: Screen) => void;
  onLanguageChange: (language: Language) => void;
}

const pageContent = {
  en: {
    title: "Irrigation Scheduler",
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
  },
  hi: {
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
};

const generateWeatherData = () => {
    // This generates mock forecast data for demonstration
    const conditions = [{ rain: 5 }, { rain: 20 }, { rain: 85 }];
    const forecast = [];
    for (let i = 0; i < 7; i++) {
        const condition = conditions[Math.floor(Math.random() * conditions.length)];
        forecast.push({
            maxTemp: 28 + Math.floor(Math.random() * 8),
            rainChance: Math.max(0, condition.rain + Math.floor(Math.random() * 15) - 7)
        });
    }
    return forecast;
};

export function IrrigationSchedulerPage({ selectedLanguage, onNavigate, onLanguageChange }: IrrigationSchedulerPageProps) {
  const langCode = selectedLanguage?.code || 'en';
  const content = pageContent[langCode as keyof typeof pageContent] || pageContent.en;
  
  const forecastData = useMemo(() => generateWeatherData(), []);

  const [crop, setCrop] = useState('');
  const [soil, setSoil] = useState('');
  const [lastWatered, setLastWatered] = useState('');
  const [recommendation, setRecommendation] = useState<{decision: string, reason: string, color: string} | null>(null);

  const handleCalculate = () => {
      if (!crop || !soil || !lastWatered) return;

      const rainInNext48h = forecastData.length > 2 && (forecastData[1].rainChance > 40 || forecastData[2].rainChance > 40);
      if (rainInNext48h) {
          setRecommendation({ decision: content.noWaterNeeded, reason: content.reasonRain, color: 'blue' });
          return;
      }

      const daysSinceWatered = (new Date().getTime() - new Date(lastWatered).getTime()) / (1000 * 3600 * 24);
      const highTemp = forecastData.length > 0 && forecastData[0].maxTemp > 32;

      let threshold = 3; // Loam
      if (soil === content.soils[0]) threshold = 2; // Sandy
      if (soil === content.soils[2]) threshold = 4; // Clay

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
    <div className="flex flex-col h-screen bg-gray-50">
      <AppHeader
        title={content.title}
        selectedLanguage={selectedLanguage}
        onLanguageChange={onLanguageChange}
        onBack={() => onNavigate('new-dashboard')}
      />
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
            <p className="text-sm text-gray-500">{content.subtitle}</p>
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
      </div>
    </div>
  );
}
