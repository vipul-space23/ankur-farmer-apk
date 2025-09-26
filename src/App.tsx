import React, { useState, useEffect } from 'react';
// Remove the problematic figma import
// import farmerBackground from 'figma:asset/8a1cf999a373017bb787e752c83840b9f2d8c23a.png';
import { SplashScreen } from './components/splash-screen';
import { LanguageSelection } from './components/language-selection';
import { LanguageSelector } from './components/language-selector';
import { LocationPermissionScreen } from './components/location-permission-screen';
import { SimpleHomeScreen } from './components/simple-home-screen';
import { OnboardingScreens } from './components/onboarding-screens';
import { LoginScreen } from './components/login-screen';
import { RegistrationScreen } from './components/registration-screen';
import { LogoutConfirmation } from './components/logout-confirmation';
import { SettingsPage } from './components/settings-page';
import { MyAccountScreen } from './components/my-account-screen';
import { WeatherForecastPage } from './components/weather-forecast-page';
import { CropDetailsPage } from './components/crop-details-page';
import { MarketPricesPage } from './components/market-prices-page';
import { DiseaseDetectionPage } from './components/disease-detection-page';
import { ManualEntriesPage } from './components/manual-entries-page';
import { FarmAssistantPage } from './components/farm-assistant-page';
import { AIChatbotPage } from './components/ai-chatbot-page';
import { LocationMapPage } from './components/location-map-page';
import { NewDashboard } from './components/new-dashboard';
import { SoilTestPage } from './components/soil-test-page';
import { DiseaseDetectionNew } from './components/disease-detection-new';
import { GovernmentSchemes } from './components/government-schemes';
import { CropGuidance } from './components/crop-guidance';
import { CommunityPostPage } from './components/community-post-page';
import { SoilTestRequestPage } from './components/soil-test-request-page';
import { SoilAnalysisPage } from './components/soil-analysis-page';
import { MarketPage } from './components/market-page';

export type Screen = 
  | 'splash'
  | 'language-selection'
  | 'location-permission'
  | 'onboarding'
  | 'login'
  | 'registration'
  | 'location-map'
  | 'new-dashboard'
  | 'home'
  | 'crop-details'
  | 'market-prices'
  | 'weather-forecast'
  | 'disease-detection'
  | 'disease-detection-new'
  | 'soil-test'
  | 'soil-test-request'
  | 'soil-analysis'
  | 'government-schemes'
  | 'crop-guidance'
  | 'community'
  | 'community-post'
  | 'market'
  | 'profile'
  | 'manual-entries'
  | 'farm-assistant'
  | 'ai-chatbot'
  | 'settings'
  | 'my-account'
  | 'logout-confirmation'
  | 'irrigation-suggestions'
  | 'agro-shops-map'
  | 'your-crops'
  | 'add-farm-data';

// Updated Language type to match the expected interface
export interface Language {
  code: string;
  name: string;
  nativeName: string; // The missing property
  flag: string;      // The other missing property
}

export type User = {
  name: string;
  phone: string;
  location: string;
  fieldLocation?: {
    address: string;
    coordinates?: {
      lat: number;
      lng: number;
    } }
  preferredLanguage: string;
};

export type CropRecommendation = {
  id: string;
  name: string;
  nativeName: string;
  image: string;
  confidence: number;
  sowingTime: string;
  harvestTime: string;
  estimatedYield: string;
  estimatedProfit: string;
  soilRequirements: {
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    ph: number;
  };
};


export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('splash');
  const [selectedLanguage, setSelectedLanguage] = useState<Language | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [chatbotState, setChatbotState] = useState<{
    initialMessage: string;
    chatHistory: {role: 'user' | 'assistant', message: string}[];
  }>({ initialMessage: '', chatHistory: [] });

  // Auto-navigate from splash screen after 3 seconds
  useEffect(() => {
    if (currentScreen === 'splash') {
      const timer = setTimeout(() => {
        setCurrentScreen('language-selection');
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [currentScreen]);

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    // If we're on the initial language selection, go to location permission
    // Otherwise, just update the language and stay on current screen
    if (currentScreen === 'language-selection') {
      setCurrentScreen('location-permission');
    }
  };

  const handleLanguageChange = (language: Language) => {
    setSelectedLanguage(language);
    // Update user's preferred language if user is logged in
    if (user) {
      setUser({
        ...user,
        preferredLanguage: language.code
      });
    }
  };

  const handleLocationAllow = () => {
    setCurrentScreen('onboarding');
  };

  const handleLocationSkip = () => {
    setCurrentScreen('onboarding');
  };

  const handleOnboardingComplete = () => {
    setCurrentScreen('login');
  };

  const handleLoginSuccess = () => {
    // Create a mock user for demo
    const mockUser = {
      name: selectedLanguage?.code === 'hi' ? 'राम शर्मा' : 'Ram Sharma',
      phone: '+91 9876543210',
      location: 'Pune, Maharashtra',
      preferredLanguage: selectedLanguage?.code || 'en'
    };
    setUser(mockUser);
    setCurrentScreen('new-dashboard');
  };

  const handleRegistrationComplete = (userData: User) => {
    // Ensure the user data includes the selected language
    const updatedUserData = {
      ...userData,
      preferredLanguage: selectedLanguage?.code || userData.preferredLanguage || 'en'
    };
    setUser(updatedUserData);
    setCurrentScreen('location-map');
  };

  const handleLocationMapComplete = (location: string) => {
    if (user) {
      setUser({ ...user, location });
    }
    setCurrentScreen('new-dashboard');
  };

  const handleLogout = () => {
    setCurrentScreen('logout-confirmation');
  };

  const handleLogoutConfirm = () => {
    setUser(null);
    setSelectedLanguage(null);
    setCurrentScreen('splash'); // Changed from 'language-selection' to 'splash'
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  const handleNavigate = (screen: Screen, ...args: any[]) => {
    if (screen === 'ai-chatbot' && args[0]) {
      const chatData = args[0] as { message?: string; history?: {role: 'user' | 'assistant', message: string}[] };
      setChatbotState({
        initialMessage: chatData.message || '',
        chatHistory: chatData.history || []
      });
    }
    setCurrentScreen(screen);
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-b from-green-50 to-green-100 relative"
      style={{
        // Use a CSS gradient or solid color instead of the problematic image
        background: 'linear-gradient(to bottom, #f0fdf4, #dcfce7)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Background overlay for opacity control */}
      <div 
        className="absolute inset-0 bg-gradient-to-b from-green-50 to-green-100"
        style={{ opacity: 0.85 }}
      />
      <div className="max-w-md mx-auto bg-white min-h-screen shadow-lg relative overflow-hidden z-10">
        {currentScreen === 'splash' && (
          <div>
            <SplashScreen />
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-20">
              <button 
                onClick={() => setCurrentScreen('language-selection')}
                className="bg-white text-green-600 px-6 py-3 rounded-full shadow-lg hover:bg-green-50 transition-colors font-medium"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
        
        {currentScreen === 'language-selection' && (
          <LanguageSelector 
            selectedLanguage={selectedLanguage}
            onLanguageChange={handleLanguageSelect}
            variant="standalone"
          />
        )}

        {currentScreen === 'location-permission' && (
          <LocationPermissionScreen 
            language={selectedLanguage}
            onLocationAllow={handleLocationAllow}
            onLocationSkip={handleLocationSkip}
            onLanguageChange={handleLanguageChange}
          />
        )}

        {currentScreen === 'onboarding' && (
          <OnboardingScreens 
            language={selectedLanguage}
            onComplete={handleOnboardingComplete}
          />
        )}

        {currentScreen === 'login' && (
          <LoginScreen 
            language={selectedLanguage}
            onLoginSuccess={handleLoginSuccess}
            onRegister={() => setCurrentScreen('registration')}
          />
        )}

        {currentScreen === 'registration' && (
          <RegistrationScreen 
            language={selectedLanguage}
            onRegistrationComplete={handleRegistrationComplete}
            onBack={() => setCurrentScreen('login')}
          />
        )}

        {currentScreen === 'location-map' && (
          <LocationMapPage 
            selectedLanguage={selectedLanguage}
            onComplete={handleLocationMapComplete}
            onLanguageChange={handleLanguageChange}
          />
        )}

        {currentScreen === 'new-dashboard' && (
          <NewDashboard 
            selectedLanguage={selectedLanguage}
            user={user}
            onNavigate={handleNavigate}
            onLanguageChange={handleLanguageChange}
          />
        )}
        
        {currentScreen === 'home' && (
          <SimpleHomeScreen 
            selectedLanguage={selectedLanguage}
            user={user}
            onNavigate={handleNavigate}
            onLanguageChange={handleLanguageChange}
          />
        )}

        {currentScreen === 'logout-confirmation' && (
          <LogoutConfirmation 
            language={selectedLanguage}
            onConfirm={handleLogoutConfirm}
            onCancel={() => setCurrentScreen('my-account')} // This now correctly navigates back
          />
        )}
        
        {currentScreen === 'weather-forecast' && (
          <WeatherForecastPage 
            selectedLanguage={selectedLanguage}
            onNavigate={handleNavigate}
            onLanguageChange={handleLanguageChange}
          />
        )}
        
        {currentScreen === 'market-prices' && (
          <MarketPricesPage 
            selectedLanguage={selectedLanguage}
            onNavigate={handleNavigate}
            onLanguageChange={handleLanguageChange}
          />
        )}
        
        {currentScreen === 'crop-details' && (
          <CropDetailsPage 
            selectedLanguage={selectedLanguage}
            onNavigate={handleNavigate}
            onLanguageChange={handleLanguageChange}
          />
        )}
        
        {currentScreen === 'disease-detection' && (
          <DiseaseDetectionPage 
            selectedLanguage={selectedLanguage}
            onNavigate={handleNavigate}
            onLanguageChange={handleLanguageChange}
          />
        )}
        
        {currentScreen === 'manual-entries' && (
          <ManualEntriesPage 
            selectedLanguage={selectedLanguage}
            onNavigate={handleNavigate}
            onLanguageChange={handleLanguageChange}
          />
        )}
        
        {currentScreen === 'farm-assistant' && (
          <FarmAssistantPage 
            selectedLanguage={selectedLanguage}
            onNavigate={handleNavigate}
            onLanguageChange={handleLanguageChange}
          />
        )}

        {currentScreen === 'ai-chatbot' && (
          <AIChatbotPage 
            selectedLanguage={selectedLanguage}
            onNavigate={handleNavigate}
            initialMessage={chatbotState.initialMessage}
            initialHistory={chatbotState.chatHistory}
          />
        )}

        {currentScreen === 'soil-test' && (
          <SoilTestPage 
            selectedLanguage={selectedLanguage}
            onNavigate={handleNavigate}
            onLanguageChange={handleLanguageChange}
          />
        )}

        {currentScreen === 'government-schemes' && (
          <GovernmentSchemes 
            selectedLanguage={selectedLanguage}
            onNavigate={handleNavigate}
            onLanguageChange={handleLanguageChange}
          />
        )}

        {currentScreen === 'crop-guidance' && (
          <CropGuidance 
            selectedLanguage={selectedLanguage}
            onNavigate={handleNavigate}
            onLanguageChange={handleLanguageChange}
          />
        )}

        {currentScreen === 'community-post' && (
          <CommunityPostPage 
            selectedLanguage={selectedLanguage}
            user={user}
            onNavigate={handleNavigate}
            onLanguageChange={handleLanguageChange}
          />
        )}

        {currentScreen === 'soil-test-request' && (
          <SoilTestRequestPage 
            selectedLanguage={selectedLanguage}
            onNavigate={handleNavigate}
            onLanguageChange={handleLanguageChange}
          />
        )}

        {currentScreen === 'soil-analysis' && (
          <SoilAnalysisPage 
            selectedLanguage={selectedLanguage}
            onNavigate={handleNavigate}
            onLanguageChange={handleLanguageChange}
          />
        )}
        
        {currentScreen === 'settings' && (
          <SettingsPage 
            selectedLanguage={selectedLanguage}
            user={user}
            onNavigate={handleNavigate}
            onLogout={handleLogout}
            onMyAccount={() => setCurrentScreen('my-account')}
            onLanguageChange={handleLanguageChange}
          />
        )}

        {currentScreen === 'my-account' && (
          <MyAccountScreen 
            selectedLanguage={selectedLanguage}
            user={user}
            onBack={() => setCurrentScreen('new-dashboard')}
            onUpdateUser={handleUpdateUser}
          />
        )}

        {currentScreen === 'market' && (
          <MarketPage 
            selectedLanguage={selectedLanguage}
            user={user}
            onNavigate={handleNavigate}
          />
        )}
      </div>
    </div>
  );
}