import React, { useState, useEffect } from 'react';
import { Map, Marker } from 'pigeon-maps';
import { MapPin, Navigation, Check, Loader2 } from 'lucide-react';
import { Language } from '../App';
import { SimpleButton } from './simple-button';
import { LanguageSelector } from './language-selector';

interface LocationMapPageProps {
  selectedLanguage: Language | null;
  onComplete: (location: string, coords: [number, number]) => void;
  onLanguageChange: (language: Language) => void;
}

const locationContent = {
  en: {
    title: "Select Your Farm Location",
    subtitle: "Help us provide accurate weather and soil data",
    detecting: "🗺️ Detecting your location...",
    currentLocation: "📍 Current Location",
    selectArea: "Confirm Your Farm Area",
    useCurrentLocation: "Use Current Location",
    confirm: "Confirm Selection",
    detecting_location: "Detecting location...",
    location_found: "Location found successfully!",
    location_error: "Could not detect location. Please grant permission.",
  },
  hi: {
    title: "अपने खेत का स्थान चुनें",
    subtitle: "सटीक मौसम और मिट्टी की जानकारी के लिए हमारी मदद करें",
    detecting: "🗺️ आपका स्थान खोजा जा रहा है...",
    currentLocation: "📍 वर्तमान स्थान",
    selectArea: "अपने खेत क्षेत्र की पुष्टि करें",
    useCurrentLocation: "वर्तमान स्थान का उपयोग करें",
    confirm: "चयन की पुष्टि करें",
    detecting_location: "स्थान खोजा जा रहा है...",
    location_found: "स्थान सफलतापूर्वक मिल गया!",
    location_error: "स्थान का पता नहीं चल सका। कृपया अनुमति दें।",
  }
};

// You need to install pigeon-maps: npm install pigeon-maps
export function LocationMapPage({ selectedLanguage, onComplete, onLanguageChange }: LocationMapPageProps) {
  const [status, setStatus] = useState<'detecting' | 'found' | 'error'>('detecting');
  const [mapCenter, setMapCenter] = useState<[number, number]>([19.0760, 72.8777]); // Default to Mumbai
  const [markerPosition, setMarkerPosition] = useState<[number, number]>([19.0760, 72.8777]);
  const [zoom, setZoom] = useState(13);
  const [currentAddress, setCurrentAddress] = useState<string>('');
  
  const langCode = selectedLanguage?.code || 'en';
  const content = locationContent[langCode as keyof typeof locationContent] || locationContent.en;

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          const coords: [number, number] = [latitude, longitude];
          setMapCenter(coords);
          setMarkerPosition(coords);

          // Reverse geocode to get address
          try {
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            if (data && data.display_name) {
              setCurrentAddress(data.display_name);
              setStatus('found');
            } else {
               setCurrentAddress("Address not found");
               setStatus('found'); // Still found, but no address
            }
          } catch (error) {
            console.error("Reverse geocoding failed:", error);
            setCurrentAddress("Could not fetch address");
            setStatus('found');
          }
        },
        (error) => {
          console.error("Geolocation error:", error);
          setStatus('error');
          setCurrentAddress(content.location_error);
        },
        { enableHighAccuracy: true }
      );
    } else {
      setStatus('error');
      setCurrentAddress("Geolocation is not supported by this browser.");
    }
  }, [content.location_error]);

  const handleConfirm = () => {
    if (currentAddress && status === 'found') {
      onComplete(currentAddress, markerPosition);
    }
  };

  const handleMapClick = ({ latLng }: { latLng: [number, number] }) => {
    setMarkerPosition(latLng);
    // You could optionally re-run reverse geocoding here if the user can select a different spot
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-green-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold">{content.title}</h1>
            <p className="text-green-100 mt-1">{content.subtitle}</p>
          </div>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
            variant="header"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 space-y-6 flex flex-col">
        {/* Map Container */}
        <div className="bg-white rounded-xl shadow-sm border p-4 flex-1 flex flex-col">
          <div className="flex-1 rounded-lg overflow-hidden relative">
            <Map 
              center={mapCenter} 
              zoom={zoom}
              onClick={handleMapClick}
            >
              <Marker 
                width={50}
                anchor={markerPosition} 
                color="#ef4444" 
              />
            </Map>
            {status === 'detecting' && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
                <div className="bg-white/90 rounded-lg p-4 flex items-center space-x-3 shadow-lg">
                  <Loader2 className="w-6 h-6 text-green-500 animate-spin" />
                  <span className="font-medium text-gray-700">{content.detecting_location}</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Location Status */}
        {status !== 'detecting' && (
            <div className={`flex items-start space-x-3 p-4 rounded-lg border ${
                status === 'found' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'
            }`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                    status === 'found' ? 'bg-green-500' : 'bg-red-500'
                }`}>
                    {status === 'found' ? <Check className="w-6 h-6 text-white" /> : <MapPin className="w-6 h-6 text-white" />}
                </div>
                <div>
                    <p className={`font-medium ${status === 'found' ? 'text-green-800' : 'text-red-800'}`}>
                        {status === 'found' ? content.location_found : 'Location Error'}
                    </p>
                    <p className={`text-sm ${status === 'found' ? 'text-green-700' : 'text-red-700'}`}>
                        {currentAddress}
                    </p>
                </div>
            </div>
        )}

      </div>

      {/* Confirm Button */}
      {status === 'found' && (
        <div className="p-6 bg-white border-t">
          <SimpleButton
            onClick={handleConfirm}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-4"
          >
            {content.confirm}
          </SimpleButton>
        </div>
      )}
    </div>
  );
}
