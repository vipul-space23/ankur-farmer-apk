import React, { useState } from 'react';
import { TrendingUp, TrendingDown, IndianRupee, MapPin, Calendar, Search } from 'lucide-react';
import { Language, Screen } from '../App';
import { SimpleButton } from './simple-button';
import { AppHeader } from './app-header';

interface MarketPricesPageProps {
  selectedLanguage: Language | null;
  onNavigate: (screen: Screen) => void;
  onLanguageChange: (language: Language) => void;
}

const marketContent = {
  en: {
    title: "Market Prices",
    subtitle: "Current crop prices in your area",
    searchPlaceholder: "Search crops...",
    currentPrices: "Current Prices",
    priceHistory: "Price Trends",
    todayPrice: "Today's Price",
    yesterdayPrice: "Yesterday",
    weekAgo: "Week Ago",
    monthAgo: "Month Ago",
    perQuintal: "per quintal",
    priceUp: "Price Up",
    priceDown: "Price Down",
    stable: "Stable",
    market: "Market",
    lastUpdated: "Last updated",
    minutesAgo: "minutes ago"
  },
  hi: {
    title: "बाजार की कीमतें",
    subtitle: "आपके क्षेत्र में वर्तमान फसल की कीमतें",
    searchPlaceholder: "फसल खोजें...",
    currentPrices: "वर्तमान कीमतें",
    priceHistory: "मूल्य रुझान",
    todayPrice: "आज की कीमत",
    yesterdayPrice: "कल",
    weekAgo: "सप्ताह पहले",
    monthAgo: "महीने पहले",
    perQuintal: "प्रति क्विंटल",
    priceUp: "कीमत बढ़ी",
    priceDown: "कीमत गिरी",
    stable: "स्थिर",
    market: "बाजार",
    lastUpdated: "अंतिम अपडेट",
    minutesAgo: "मिनट पहले"
  }
};

// Simplified mock market data 
const generateMarketData = () => {
  const crops = [
    { name: "Wheat", nativeName: "गेहूं", basePrice: 2200 },
    { name: "Rice", nativeName: "चावल", basePrice: 1800 },
    { name: "Maize", nativeName: "मक्का", basePrice: 1600 },
    { name: "Cotton", nativeName: "कपास", basePrice: 5800 },
    { name: "Soybean", nativeName: "सोयाबीन", basePrice: 4200 }
  ];

  const markets = ["Pune", "Delhi", "Mumbai"];

  return crops.map(crop => {
    const todayPrice = Math.round(crop.basePrice * (1 + (Math.random() - 0.5) * 0.1));
    const yesterdayPrice = Math.round(todayPrice * (1 + (Math.random() - 0.5) * 0.05));
    
    const trend = todayPrice > yesterdayPrice ? 'up' : todayPrice < yesterdayPrice ? 'down' : 'stable';
    const trendPercentage = Math.abs(((todayPrice - yesterdayPrice) / yesterdayPrice) * 100);

    return {
      ...crop,
      todayPrice,
      yesterdayPrice,
      trend,
      trendPercentage: Number(trendPercentage.toFixed(1)),
      market: markets[Math.floor(Math.random() * markets.length)],
      lastUpdated: Math.floor(Math.random() * 30) + 5
    };
  });
};

export function MarketPricesPage({ selectedLanguage, onNavigate, onLanguageChange }: MarketPricesPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCrop, setSelectedCrop] = useState<any>(null);
  
  const langCode = selectedLanguage?.code || 'en';
  const content = marketContent[langCode as keyof typeof marketContent] || marketContent.en;
  
  const marketData = generateMarketData();
  const filteredData = marketData.filter(crop => 
    crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    crop.nativeName.includes(searchTerm)
  );

  const getTrendIcon = (trend: string) => {
    switch(trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-600" />;
      default: return <div className="w-4 h-4 bg-gray-400 rounded-full"></div>;
    }
  };

  const getTrendColor = (trend: string) => {
    switch(trend) {
      case 'up': return 'text-green-600 bg-green-50';
      case 'down': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  if (selectedCrop) {
    return (
      <div className="flex flex-col h-screen bg-gradient-to-b from-green-50 to-white">
        {/* Header */}
        <AppHeader
          title={`${selectedCrop.name} (${selectedCrop.nativeName})`}
          selectedLanguage={selectedLanguage}
          onLanguageChange={onLanguageChange}
          onBack={() => setSelectedCrop(null)}
        />

        {/* Price Details */}
        <div className="flex-1 p-4 overflow-y-auto space-y-6">
          {/* Current Price */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{content.todayPrice}</h2>
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold text-gray-800 flex items-center">
                  <IndianRupee className="w-8 h-8 mr-2" />
                  {selectedCrop.todayPrice.toLocaleString('en-IN')}
                </div>
                <div className="text-gray-600">{content.perQuintal}</div>
              </div>
              <div className={`flex items-center space-x-2 px-3 py-2 rounded-lg ${getTrendColor(selectedCrop.trend)}`}>
                {getTrendIcon(selectedCrop.trend)}
                <span className="font-medium">{selectedCrop.trendPercentage}%</span>
              </div>
            </div>
            
            <div className="mt-4 flex items-center text-sm text-gray-600">
              <MapPin className="w-4 h-4 mr-1" />
              <span>{selectedCrop.market} {content.market}</span>
              <span className="mx-2">•</span>
              <Calendar className="w-4 h-4 mr-1" />
              <span>{content.lastUpdated} {selectedCrop.lastUpdated} {content.minutesAgo}</span>
            </div>
          </div>

          {/* Simplified Price History */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{content.priceHistory}</h2>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="font-medium">Today</span>
                <span className="font-bold">₹{selectedCrop.todayPrice.toLocaleString('en-IN')}</span>
              </div>
              
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg">
                <span>Yesterday</span>
                <div className="text-right">
                  <div>₹{selectedCrop.yesterdayPrice.toLocaleString('en-IN')}</div>
                  <div className={`text-sm ${selectedCrop.todayPrice > selectedCrop.yesterdayPrice ? 'text-green-600' : 'text-red-600'}`}>
                    {selectedCrop.todayPrice > selectedCrop.yesterdayPrice ? '+' : ''}
                    ₹{Math.abs(selectedCrop.todayPrice - selectedCrop.yesterdayPrice)}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <AppHeader
        title={content.title}
        selectedLanguage={selectedLanguage}
        onLanguageChange={onLanguageChange}
        onBack={() => onNavigate('home')}
      />
      <div className="bg-green-600 text-white p-4">
        <p className="text-green-100 mb-4">{content.subtitle}</p>
        
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-300" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={content.searchPlaceholder}
            className="w-full pl-12 h-12 bg-green-500 border border-green-400 text-white placeholder-green-200 rounded-md focus:outline-none focus:ring-2 focus:ring-white focus:border-white"
          />
        </div>
      </div>

      {/* Market Prices List */}
      <div className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-800 mb-4">{content.currentPrices}</h2>
        
        <div className="space-y-3">
          {filteredData.map((crop, index) => (
            <div key={index} className="bg-white rounded-lg border border-green-100 p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-medium text-gray-800">{crop.name}</h3>
                      <p className="text-sm text-gray-500">{crop.nativeName}</p>
                    </div>
                    <div className={`flex items-center space-x-1 px-2 py-1 rounded ${getTrendColor(crop.trend)}`}>
                      {getTrendIcon(crop.trend)}
                      <span className="text-sm font-medium">{crop.trendPercentage}%</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <IndianRupee className="w-5 h-5 text-gray-600 mr-1" />
                      <span className="text-xl font-bold text-gray-800">
                        {crop.todayPrice.toLocaleString('en-IN')}
                      </span>
                      <span className="text-sm text-gray-600 ml-1">{content.perQuintal}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{crop.market}</span>
                    </div>
                    <SimpleButton
                      onClick={() => setSelectedCrop(crop)}
                      size="sm"
                      className="text-sm"
                    >
                      View Details
                    </SimpleButton>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredData.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No crops found matching your search</p>
          </div>
        )}
      </div>
    </div>
  );
}