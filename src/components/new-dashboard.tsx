import React, { useState } from 'react';
import { Wheat, Users, Store, User as UserIcon } from 'lucide-react';
// Assuming these imports are correct from your project structure
import { Language, User, Screen } from '../App';
import { SimpleButton } from './simple-button';
import { YourCropsPage } from './your-crops-page';
import { CommunityPage } from './community-page';
import { MarketPage } from './market-page';
import { ProfilePage } from './profile-page';
// Import the new ScanButton
import { ScanButton } from './ui/scan-button';


interface NewDashboardProps {
  selectedLanguage: Language | null;
  user: User | null;
  onNavigate: (screen: Screen, ...args: any[]) => void;
  onLanguageChange: (language: Language) => void;
}

// Corrected TabType to not have a leading space
type TabType = 'crops' | 'community' | 'market' | 'profile';

const dashboardContent = {
  en: {
    tabs: {
      crops: "Your crops",
      community: "Community",
      market: "Market",
      profile: "You"
    }
  },
  hi: {
    tabs: {
      crops: "आपकी फसलें",
      community: "समुदाय",
      market: "बाजार",
      profile: "आप"
    }
  }
};

export function NewDashboard({ selectedLanguage, user, onNavigate, onLanguageChange }: NewDashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>('crops');

  const langCode = selectedLanguage?.code || 'en';
  const content = dashboardContent[langCode as keyof typeof dashboardContent] || dashboardContent.en;

  // This function would be called when the scan button is clicked
  const handleScanClick = () => {
    // You can navigate to a new screen for scanning, e.g., onNavigate('scan')
    console.log("Scan button clicked!");
    // Example of navigation:
    // onNavigate('scan'); 
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'crops':
        return (
          <YourCropsPage
            selectedLanguage={selectedLanguage}
            user={user}
            onNavigate={onNavigate}
            onLanguageChange={onLanguageChange}
          />
        );
      case 'community':
        return (
          <CommunityPage
            selectedLanguage={selectedLanguage}
            user={user}
            onNavigate={onNavigate}
          />
        );
      case 'market':
        return (
          <MarketPage
            selectedLanguage={selectedLanguage}
            user={user}
            onNavigate={onNavigate}
          />
        );
      case 'profile':
        return (
          <ProfilePage
            selectedLanguage={selectedLanguage}
            user={user}
            onNavigate={onNavigate}
            onLanguageChange={onLanguageChange}
          />
        );
      default:
        // A fallback to ensure the app doesn't crash if activeTab is invalid
        return (
            <YourCropsPage
              selectedLanguage={selectedLanguage}
              user={user}
              onNavigate={onNavigate}
              onLanguageChange={onLanguageChange}
            />
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        {renderActiveTab()}
      </div>

      {/* Bottom Navigation Wrapper */}
      <div className="relative bg-white border-t border-gray-200 px-2 py-2 shadow-lg">
        {/* Central Scan Button */}
        <div className="absolute top-[-2rem] left-1/2 transform -translate-x-1/2 z-10">
            <ScanButton onClick={handleScanClick} />
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-around">
          {/* Your Crops */}
          <SimpleButton
            onClick={() => setActiveTab('crops')}
            variant="ghost"
            className={`flex-1 flex flex-col items-center space-y-1 py-3 px-2 rounded-lg ${
              activeTab === 'crops'
                ? 'bg-green-50 text-green-600'
                : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
            }`}
          >
            <Wheat className="w-6 h-6" />
            <span className="text-xs font-medium">{content.tabs.crops}</span>
          </SimpleButton>

          {/* Community */}
          <SimpleButton
            onClick={() => setActiveTab('community')}
            variant="ghost"
            className={`flex-1 flex flex-col items-center space-y-1 py-3 px-2 rounded-lg ${
              activeTab === 'community'
                ? 'bg-green-50 text-green-600'
                : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
            }`}
          >
            <Users className="w-6 h-6" />
            <span className="text-xs font-medium">{content.tabs.community}</span>
          </SimpleButton>

          {/* Placeholder for Scan Button to maintain spacing */}
          <div className="w-20" />

          {/* Market */}
          <SimpleButton
            onClick={() => setActiveTab('market')}
            variant="ghost"
            className={`flex-1 flex flex-col items-center space-y-1 py-3 px-2 rounded-lg ${
              activeTab === 'market'
                ? 'bg-green-50 text-green-600'
                : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
            }`}
          >
            <Store className="w-6 h-6" />
            <span className="text-xs font-medium">{content.tabs.market}</span>
          </SimpleButton>

          {/* Profile */}
          <SimpleButton
            onClick={() => setActiveTab('profile')}
            variant="ghost"
            className={`flex-1 flex flex-col items-center space-y-1 py-3 px-2 rounded-lg ${
              activeTab === 'profile'
                ? 'bg-green-50 text-green-600'
                : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
            }`}
          >
            <UserIcon className="w-6 h-6" />
            <span className="text-xs font-medium">{content.tabs.profile}</span>
          </SimpleButton>
        </div>
      </div>
    </div>
  );
}
