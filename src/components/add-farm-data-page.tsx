import React, { useState } from 'react';
import { ArrowLeft, Save, Thermometer, Droplets, Activity, TestTube } from 'lucide-react';
import { Language, Screen } from '../App';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Slider } from './ui/slider';
import { Input } from './ui/input';
import { Label } from './ui/label';

interface AddFarmDataPageProps {
  selectedLanguage: Language | null;
  onNavigate: (screen: Screen) => void;
}

const dataContent = {
  en: {
    title: "Add Farm Data",
    subtitle: "Enter your soil and weather parameters",
    soilData: "Soil Parameters",
    weatherData: "Weather Parameters",
    nitrogen: "Nitrogen (N)",
    phosphorus: "Phosphorus (P)",
    potassium: "Potassium (K)",
    phLevel: "pH Level",
    moisture: "Soil Moisture",
    rainfall: "Rainfall (mm)",
    temperature: "Temperature (°C)",
    saveData: "Save & Get Recommendations",
    backToHome: "Back to Home",
    units: {
      nitrogen: "kg/ha",
      phosphorus: "kg/ha",
      potassium: "kg/ha",
      moisture: "%",
      rainfall: "mm",
      temperature: "°C"
    },
    ranges: {
      nitrogen: "0-200 kg/ha",
      phosphorus: "0-100 kg/ha",
      potassium: "0-80 kg/ha",
      ph: "4.0-9.0",
      moisture: "0-100%",
      rainfall: "0-300mm",
      temperature: "0-50°C"
    }
  },
  hi: {
    title: "खेत का डेटा जोड़ें",
    subtitle: "अपनी मिट्टी और मौसम के मापदंड दर्ज करें",
    soilData: "मिट्टी के पैरामीटर",
    weatherData: "मौसम के पैरामीटर",
    nitrogen: "नाइट्रोजन (N)",
    phosphorus: "फॉस्फोरस (P)",
    potassium: "पोटेशियम (K)",
    phLevel: "pH स्तर",
    moisture: "मिट्टी की नमी",
    rainfall: "वर्षा (mm)",
    temperature: "तापमान (°C)",
    saveData: "सेव करें और सुझाव पाएं",
    backToHome: "होम पर वापस",
    units: {
      nitrogen: "kg/ha",
      phosphorus: "kg/ha",
      potassium: "kg/ha",
      moisture: "%",
      rainfall: "mm",
      temperature: "°C"
    },
    ranges: {
      nitrogen: "0-200 kg/ha",
      phosphorus: "0-100 kg/ha",
      potassium: "0-80 kg/ha",
      ph: "4.0-9.0",
      moisture: "0-100%",
      rainfall: "0-300mm",
      temperature: "0-50°C"
    }
  }
};

export function AddFarmDataPage({ selectedLanguage, onNavigate }: AddFarmDataPageProps) {
  const [farmData, setFarmData] = useState({
    nitrogen: [40],
    phosphorus: [20],
    potassium: [15],
    ph: [6.5],
    moisture: [60],
    rainfall: [150],
    temperature: [25]
  });
  const [isLoading, setIsLoading] = useState(false);

  const langCode = selectedLanguage?.code || 'en';
  const content = dataContent[langCode as keyof typeof dataContent] || dataContent.en;

  const handleSave = async () => {
    setIsLoading(true);
    // Simulate API call to save data and get recommendations
    setTimeout(() => {
      setIsLoading(false);
      onNavigate('home');
    }, 2000);
  };

  const updateValue = (key: string, value: number[]) => {
    setFarmData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-green-600 text-white p-6">
        <div className="flex items-center mb-4">
          <Button
            onClick={() => onNavigate('home')}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-green-700 p-2 mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">{content.title}</h1>
            <p className="text-green-100">{content.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto space-y-6">
        {/* Soil Parameters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TestTube className="w-5 h-5 text-green-600" />
              <span>{content.soilData}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Nitrogen */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <Label className="font-medium">{content.nitrogen}</Label>
                <div className="text-right">
                  <span className="font-bold text-green-600">{farmData.nitrogen[0]}</span>
                  <span className="text-sm text-gray-500 ml-1">{content.units.nitrogen}</span>
                </div>
              </div>
              <Slider
                value={farmData.nitrogen}
                onValueChange={(value: number[]) => updateValue('nitrogen', value)}
                max={200}
                min={0}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">{content.ranges.nitrogen}</p>
            </div>

            {/* Phosphorus */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <Label className="font-medium">{content.phosphorus}</Label>
                <div className="text-right">
                  <span className="font-bold text-green-600">{farmData.phosphorus[0]}</span>
                  <span className="text-sm text-gray-500 ml-1">{content.units.phosphorus}</span>
                </div>
              </div>
              <Slider
                value={farmData.phosphorus}
                onValueChange={(value: number[]) => updateValue('phosphorus', value)}
                max={100}
                min={0}
                step={2}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">{content.ranges.phosphorus}</p>
            </div>

            {/* Potassium */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <Label className="font-medium">{content.potassium}</Label>
                <div className="text-right">
                  <span className="font-bold text-green-600">{farmData.potassium[0]}</span>
                  <span className="text-sm text-gray-500 ml-1">{content.units.potassium}</span>
                </div>
              </div>
              <Slider
                value={farmData.potassium}
                onValueChange={(value: number[]) => updateValue('potassium', value)}
                max={80}
                min={0}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">{content.ranges.potassium}</p>
            </div>

            {/* pH Level */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <Label className="font-medium">{content.phLevel}</Label>
                <div className="text-right">
                  <span className="font-bold text-green-600">{farmData.ph[0]}</span>
                </div>
              </div>
              <Slider
                value={farmData.ph}
                onValueChange={(value: number[]) => updateValue('ph', value)}
                max={9}
                min={4}
                step={0.1}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">{content.ranges.ph}</p>
            </div>

            {/* Soil Moisture */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <Label className="font-medium">{content.moisture}</Label>
                <div className="text-right">
                  <span className="font-bold text-green-600">{farmData.moisture[0]}</span>
                  <span className="text-sm text-gray-500 ml-1">{content.units.moisture}</span>
                </div>
              </div>
              <Slider
                value={farmData.moisture}
                onValueChange={(value: number[]) => updateValue('moisture', value)}
                max={100}
                min={0}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">{content.ranges.moisture}</p>
            </div>
          </CardContent>
        </Card>

        {/* Weather Parameters */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5 text-green-600" />
              <span>{content.weatherData}</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Rainfall */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <Label className="font-medium flex items-center space-x-2">
                  <Droplets className="w-4 h-4 text-blue-500" />
                  <span>{content.rainfall}</span>
                </Label>
                <div className="text-right">
                  <span className="font-bold text-green-600">{farmData.rainfall[0]}</span>
                  <span className="text-sm text-gray-500 ml-1">{content.units.rainfall}</span>
                </div>
              </div>
              <Slider
                value={farmData.rainfall}
                onValueChange={(value: number[]) => updateValue('rainfall', value)}
                max={300}
                min={0}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">{content.ranges.rainfall}</p>
            </div>

            {/* Temperature */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <Label className="font-medium flex items-center space-x-2">
                  <Thermometer className="w-4 h-4 text-red-500" />
                  <span>{content.temperature}</span>
                </Label>
                <div className="text-right">
                  <span className="font-bold text-green-600">{farmData.temperature[0]}</span>
                  <span className="text-sm text-gray-500 ml-1">{content.units.temperature}</span>
                </div>
              </div>
              <Slider
                value={farmData.temperature}
                onValueChange={(value: number[]) => updateValue('temperature', value)}
                max={50}
                min={0}
                step={1}
                className="w-full"
              />
              <p className="text-xs text-gray-500 mt-1">{content.ranges.temperature}</p>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <Button
          onClick={handleSave}
          disabled={isLoading}
          className="w-full h-14 bg-green-600 hover:bg-green-700 text-lg font-medium"
        >
          {isLoading ? (
            <div className="flex items-center space-x-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Saving...</span>
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Save className="w-5 h-5" />
              <span>{content.saveData}</span>
            </div>
          )}
        </Button>
      </div>
    </div>
  );
}