import React, { useState, forwardRef, useMemo } from 'react';
import { Cloud, CloudRain, Sun, Wind, Droplets, Thermometer, Eye, Umbrella, Leaf, Layers, CalendarClock, CheckCircle2, XCircle, ArrowLeft, Globe } from 'lucide-react';
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
    const languages: Language[] = [{ code: 'en', name: 'English', nativeName: 'English', flag:'' }, { code: 'hi', name: 'हिन्दी', nativeName: 'हिन्दी', flag:'' }];
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


interface WeatherForecastPageProps {
  selectedLanguage: Language | null;
  onNavigate: (screen: Screen) => void;
  onLanguageChange: (language: Language) => void;
}

const weatherContent = {
  en: {
    title: "Weather Forecast",
    subtitle: "7-day agricultural forecast",
    currentWeather: "Current Weather",
    sevenDayForecast: "7-Day Forecast",
    temperature: "Temperature",
    humidity: "Humidity",
    windSpeed: "Wind Speed",
    visibility: "Visibility",
    rainChance: "Rain Chance",
    uvIndex: "UV Index",
    pressure: "Pressure",
    today: "Today",
    tomorrow: "Tomorrow",
    advice: "Agricultural Advice",
    advisoryTitle: "Farming Advisory",
    days: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    months: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    irrigation: {
        title: "Irrigation Planner",
        subtitle: "Avoid overwatering with smart scheduling",
        cropType: "Crop Type",
        soilType: "Soil Type",
        lastWatered: "Last Watered On",
        calculate: "Get Schedule",
        recommendation: "Recommendation",
        waterToday: "Water Today",
        waterTomorrow: "Water Tomorrow",
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
    title: "मौसम पूर्वानुमान",
    subtitle: "7-दिन का कृषि पूर्वानुमान",
    currentWeather: "वर्तमान मौसम",
    sevenDayForecast: "7-दिन का पूर्वानुमान",
    temperature: "तापमान",
    humidity: "आर्द्रता",
    windSpeed: "हवा की गति",
    visibility: "दृश्यता",
    rainChance: "बारिश की संभावना",
    uvIndex: "यूवी इंडेक्स",
    pressure: "दबाव",
    today: "आज",
    tomorrow: "कल",
    advice: "कृषि सलाह",
    advisoryTitle: "कृषि सलाहकार",
    days: ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"],
    months: ["जन", "फर", "मार", "अप्र", "मई", "जून", "जुल", "अग", "सित", "अक्ट", "नव", "दिस"],
    irrigation: {
        title: "सिंचाई योजनाकार",
        subtitle: "स्मार्ट शेड्यूलिंग से अतिरिक्त पानी से बचें",
        cropType: "फ़सल का प्रकार",
        soilType: "मिट्टी का प्रकार",
        lastWatered: "आखिरी बार पानी दिया",
        calculate: "शेड्यूल प्राप्त करें",
        recommendation: "सिफारिश",
        waterToday: "आज पानी दें",
        waterTomorrow: "कल पानी दें",
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

const generateWeatherData = () => {
  const conditions = [
    { icon: Sun, name: 'Sunny', temp: [28, 35], rain: 5 },
    { icon: Cloud, name: 'Cloudy', temp: [24, 30], rain: 20 },
    { icon: CloudRain, name: 'Rainy', temp: [22, 28], rain: 85 }
  ];
  const sevenDayForecast = [];
  const today = new Date();
  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const condition = conditions[Math.floor(Math.random() * conditions.length)];
    const minTemp = condition.temp[0] + Math.floor(Math.random() * 3);
    const maxTemp = condition.temp[1] + Math.floor(Math.random() * 3);
    sevenDayForecast.push({
      date: date, day: date.getDay(), condition: condition.name, icon: condition.icon,
      minTemp, maxTemp, humidity: 60 + Math.floor(Math.random() * 30),
      windSpeed: 5 + Math.floor(Math.random() * 10),
      rainChance: Math.max(0, condition.rain + Math.floor(Math.random() * 15) - 7)
    });
  }
  return sevenDayForecast;
};

const getCurrentWeather = () => ({
  temperature: 32, humidity: 68, windSpeed: 12, visibility: 8.5,
  rainChance: 25, uvIndex: 7, pressure: 1013, condition: 'Partly Cloudy'
});

const getAgriculturalAdvice = (langCode: string) => {
  const advice = {
    en: [ "Water your crops in the early morning.", "High humidity expected; watch for fungal diseases.", "Light winds are favorable for spraying pesticides."],
    hi: [ "सुबह जल्दी फसलों को पानी दें।", "उच्च आर्द्रता की उम्मीद है; फंगल रोगों से सावधान रहें।", "कीटनाशकों के छिड़काव के लिए हल्की हवाएं अनुकूल हैं।"]
  };
  return advice[langCode as keyof typeof advice] || advice.en;
};

const IrrigationPlanner = ({ content, forecast }: { content: typeof weatherContent.en.irrigation, forecast: any[] }) => {
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
        const highTemp = forecast.length > 0 && forecast[0].maxTemp > 32;
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
        <div className="bg-white rounded-lg shadow-sm border p-6 space-y-4">
            <div>
                <h2 className="text-xl font-bold text-gray-800">{content.title}</h2>
                <p className="text-sm text-gray-500">{content.subtitle}</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1 flex items-center"><CalendarClock className="w-4 h-4 mr-2" />{content.lastWatered}</label>
                    <input type="date" value={lastWatered} onChange={e => setLastWatered(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md"/>
                </div>
            </div>
            <SimpleButton onClick={handleCalculate} className="w-full" disabled={!crop || !soil || !lastWatered}>
                {content.calculate}
            </SimpleButton>
            {recommendation && CurrentRec && (
                <div className={`${CurrentRec.bg} border-l-4 ${CurrentRec.border} p-4 rounded-r-lg`}>
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

export function WeatherForecastPage({ selectedLanguage, onNavigate, onLanguageChange }: WeatherForecastPageProps) {
  const langCode = selectedLanguage?.code || 'en';
  const content = weatherContent[langCode as keyof typeof weatherContent] || weatherContent.en;
  
  const forecastData = useMemo(() => generateWeatherData(), []);
  const currentWeather = getCurrentWeather();
  const agriculturalAdvice = getAgriculturalAdvice(langCode);

  const formatDate = (date: Date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) return content.today;
    if (date.toDateString() === tomorrow.toDateString()) return content.tomorrow;
    return `${content.days[date.getDay()]} ${date.getDate()}`;
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-blue-50 to-white">
      <AppHeader
        title={content.title}
        selectedLanguage={selectedLanguage}
        onLanguageChange={onLanguageChange}
        onBack={() => onNavigate('new-dashboard')}
      />
      <div className="bg-blue-600 text-white px-6 pb-2">
        <p className="text-blue-100">{content.subtitle}</p>
      </div>

      <div className="flex-1 p-4 overflow-y-auto space-y-6">
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{content.currentWeather}</h2>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <Cloud className="w-16 h-16 text-blue-500" />
              <div>
                <div className="text-3xl font-bold text-gray-800">{currentWeather.temperature}°C</div>
                <div className="text-gray-600">{currentWeather.condition}</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-blue-600 font-medium">{content.rainChance}</div>
              <div className="text-2xl font-bold text-blue-600">{currentWeather.rainChance}%</div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Droplets className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-sm text-gray-600">{content.humidity}</div>
                <div className="font-medium">{currentWeather.humidity}%</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Wind className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-sm text-gray-600">{content.windSpeed}</div>
                <div className="font-medium">{currentWeather.windSpeed} km/h</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Eye className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-sm text-gray-600">{content.visibility}</div>
                <div className="font-medium">{currentWeather.visibility} km</div>
              </div>
            </div>
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <Thermometer className="w-5 h-5 text-blue-500" />
              <div>
                <div className="text-sm text-gray-600">{content.pressure}</div>
                <div className="font-medium">{currentWeather.pressure} hPa</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border p-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">{content.sevenDayForecast}</h2>
          <div className="space-y-3">
            {forecastData.map((day, index) => {
              const IconComponent = day.icon;
              return (
                <div key={index} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="w-12 text-sm font-medium text-gray-600">{formatDate(day.date)}</div>
                    <IconComponent className="w-6 h-6 text-blue-500" />
                    <div className="flex-1">
                      <div className="font-medium text-gray-800">{day.condition}</div>
                      <div className="text-sm text-gray-600 flex items-center space-x-4">
                        <span className="flex items-center"><Droplets className="w-3 h-3 mr-1" />{day.humidity}%</span>
                        <span className="flex items-center"><Umbrella className="w-3 h-3 mr-1" />{day.rainChance}%</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-gray-800">{day.maxTemp}°</div>
                    <div className="text-sm text-gray-500">{day.minTemp}°</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="bg-green-50 rounded-lg border border-green-200 p-6">
          <h2 className="text-xl font-bold text-green-800 mb-4 flex items-center">
            <Umbrella className="w-6 h-6 mr-2" />
            {content.advisoryTitle}
          </h2>
          <div className="space-y-3">
            {agriculturalAdvice.map((tip, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-white rounded-lg border border-green-100">
                <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                <p className="text-gray-700">{tip}</p>
              </div>
            ))}
          </div>
        </div>
        
        <IrrigationPlanner content={content.irrigation} forecast={forecastData} />
        
      </div>
    </div>
  );
}