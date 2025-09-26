import React from 'react';
import { User, Settings, CloudRain, Plus, TrendingUp, MapPin, Bell } from 'lucide-react';
import { Language, User as UserType, CropRecommendation, Screen } from '../App';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface HomeScreenProps {
  selectedLanguage: Language | null;
  user: UserType | null;
  onNavigate: (screen: Screen, crop?: CropRecommendation) => void;
  onLogout: () => void;
}

const homeContent = {
  en: {
    greeting: "Good morning",
    recommendations: "Crop Recommendations",
    noRecommendations: "Add farm data to get recommendations",
    addData: "Add Farm Data",
    weather: "Weather Forecast",
    confidence: "Confidence",
    sowingTime: "Sowing Time",
    viewDetails: "View Details",
    menu: {
      weather: "Weather",
      addData: "Add Data",
      profile: "Profile",
      settings: "Settings"
    }
  },
  hi: {
    greeting: "सुप्रभात",
    recommendations: "फसल सुझाव",
    noRecommendations: "सुझाव पाने के लिए खेत का डेटा जोड़ें",
    addData: "खेत का डेटा जोड़ें",
    weather: "मौसम पूर्वानुमान",
    confidence: "विश्वास",
    sowingTime: "बुआई का समय",
    viewDetails: "विवरण देखें",
    menu: {
      weather: "मौसम",
      addData: "डेटा जोड़ें",
      profile: "प्रोफ़ाइल",
      settings: "सेटिंग्स"
    }
  }
};

// Mock crop recommendations data
const mockRecommendations: CropRecommendation[] = [
  {
    id: '1',
    name: 'Wheat',
    nativeName: 'गेहूं',
    image: 'https://images.unsplash.com/photo-1715289718087-66a61b7b4c0d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3aGVhdCUyMGNyb3AlMjBmaWVsZCUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc1NzkyMDMxOXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    confidence: 92,
    sowingTime: 'November - December',
    harvestTime: 'April - May',
    estimatedYield: '3-4 tons/hectare',
    estimatedProfit: '₹25,000 - ₹35,000/hectare',
    soilRequirements: {
      nitrogen: 120,
      phosphorus: 60,
      potassium: 40,
      ph: 6.5
    }
  },
  {
    id: '2',
    name: 'Rice',
    nativeName: 'चावल',
    image: 'https://images.unsplash.com/photo-1670922757779-9472463fe234?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyaWNlJTIwcGFkZHklMjBmaWVsZCUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc1NzkyMDMyMnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    confidence: 87,
    sowingTime: 'June - July',
    harvestTime: 'October - November',
    estimatedYield: '4-5 tons/hectare',
    estimatedProfit: '₹30,000 - ₹40,000/hectare',
    soilRequirements: {
      nitrogen: 100,
      phosphorus: 50,
      potassium: 50,
      ph: 6.0
    }
  },
  {
    id: '3',
    name: 'Maize',
    nativeName: 'मक्का',
    image: 'https://images.unsplash.com/photo-1649251037566-6881b4956615?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3JuJTIwbWFpemUlMjBmaWVsZCUyMGFncmljdWx0dXJlfGVufDF8fHx8MTc1NzkyMDMyNXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
    confidence: 84,
    sowingTime: 'June - July',
    harvestTime: 'September - October',
    estimatedYield: '5-6 tons/hectare',
    estimatedProfit: '₹20,000 - ₹30,000/hectare',
    soilRequirements: {
      nitrogen: 150,
      phosphorus: 75,
      potassium: 60,
      ph: 6.8
    }
  }
];

export function HomeScreen({ selectedLanguage, user, onNavigate, onLogout }: HomeScreenProps) {
  const langCode = selectedLanguage?.code || 'en' || 'hi' ;
  const content = homeContent[langCode as keyof typeof homeContent] || homeContent.en;

  const getTimeBasedGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return content.greeting;
    if (hour < 17) return langCode === 'hi' ? 'नमस्कार' : 'Good afternoon';
    return langCode === 'hi' ? 'शुभ संध्या' : 'Good evening';
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-green-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
              <User className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-green-100 text-sm">{getTimeBasedGreeting()}</p>
              <h1 className="text-xl font-bold">{user?.name || 'Farmer'}</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button
              onClick={() => onNavigate('profile')}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-green-700 p-2"
            >
              <Bell className="w-5 h-5" />
            </Button>
            <Button
              onClick={() => onNavigate('settings')}
              variant="ghost"
              size="sm"
              className="text-white hover:bg-green-700 p-2"
            >
              <Settings className="w-5 h-5" />
            </Button>
          </div>
        </div>
        
        <div className="flex items-center text-green-100 text-sm">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{user?.location || 'Location not set'}</span>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-3">
          <Button
            onClick={() => onNavigate('weather-forecast')}
            variant="outline"
            className="h-16 flex flex-col items-center space-y-2 border-green-200 hover:bg-green-50"
          >
            <CloudRain className="w-6 h-6 text-green-600" />
            <span className="text-sm">{content.menu.weather}</span>
          </Button>
          <Button
            onClick={() => onNavigate('add-farm-data')}
            variant="outline"
            className="h-16 flex flex-col items-center space-y-2 border-green-200 hover:bg-green-50"
          >
            <Plus className="w-6 h-6 text-green-600" />
            <span className="text-sm">{content.menu.addData}</span>
          </Button>
        </div>
      </div>

      {/* Crop Recommendations */}
      <div className="flex-1 px-4 pb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">{content.recommendations}</h2>
          <TrendingUp className="w-5 h-5 text-green-600" />
        </div>

        <div className="space-y-4 overflow-y-auto">
          {mockRecommendations.map((crop) => (
            <Card key={crop.id} className="border-green-100 hover:border-green-300 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                    <ImageWithFallback
                      src={crop.image}
                      alt={crop.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-medium text-gray-800">{crop.name}</h3>
                        <p className="text-sm text-gray-500">{crop.nativeName}</p>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-700">
                        {content.confidence}: {crop.confidence}%
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-3">
                      {content.sowingTime}: {crop.sowingTime}
                    </p>
                    <Button
                      onClick={() => onNavigate('crop-details', crop)}
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {content.viewDetails}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {mockRecommendations.length === 0 && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gray -100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus className="w-8 h-8 text-gray-400" />
            </div>
            <p className="text-gray-500 mb-4">{content.noRecommendations}</p>
            <Button
              onClick={() => onNavigate('add-farm-data')}
              className="bg-green-600 hover:bg-green-700"
            >
              {content.addData}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}