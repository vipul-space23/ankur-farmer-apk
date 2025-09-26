import React from 'react';
import { 
  User, 
  Phone, 
  MapPin, 
  Languages, 
  Settings, 
  HelpCircle, 
  Shield, 
  Bell,
  ChevronRight,
  LogOut,
  Edit,
  Camera,
  Award,
  TrendingUp,
  Wheat
} from 'lucide-react';
import { Language, User as UserType, Screen } from '../App';
import { SimpleButton } from './simple-button';
import { LanguageSelector } from './language-selector';

interface ProfilePageProps {
  selectedLanguage: Language | null;
  user: UserType | null;
  onNavigate: (screen: Screen, ...args: any[]) => void;
  onLanguageChange: (language: Language) => void;
}

const profileContent = {
  en: {
    title: "Your Profile",
    editProfile: "Edit Profile",
    personalInfo: "Personal Information",
    name: "Full Name",
    phone: "Phone Number",
    location: "Location",
    language: "Language",
    farmingStats: "Farming Stats",
    totalCrops: "Total Crops",
    activeSeason: "Active Season",
    harvestsCompleted: "Harvests Completed",
    avgYield: "Avg Yield per Acre",
    preferences: "Preferences & Settings",
    notifications: "Notifications",
    privacy: "Privacy Settings",
    help: "Help & Support",
    about: "About App",
    logout: "Logout",
    manageNotifications: "Manage your notification preferences",
    privacySettings: "Control your privacy and data sharing",
    getHelp: "Get help and contact support",
    aboutApp: "Learn more about the app",
    signOut: "Sign out of your account",
    crops: "crops",
    quintals: "quintals",
    years: "years farming",
    changePhoto: "Change Photo",
    accountSettings: "Account Settings"
  },
  hi: {
    title: "आपकी प्रोफ़ाइल",
    editProfile: "प्रोफ़ाइल संपादित करें",
    personalInfo: "व्यक्तिगत जानकारी",
    name: "पूरा नाम",
    phone: "फ़ोन नंबर",
    location: "स्थान",
    language: "भाषा",
    farmingStats: "कृषि आंकड़े",
    totalCrops: "कुल फसलें",
    activeSeason: "सक्रिय सीजन",
    harvestsCompleted: "पूर्ण फसल",
    avgYield: "प्रति एकड़ औसत उपज",
    preferences: "प्राथमिकताएं और सेटिंग्स",
    notifications: "सूचनाएं",
    privacy: "गोपनीयता सेटिंग्स",
    help: "सहायता और समर्थन",
    about: "ऐप के बारे में",
    logout: "लॉगआउट",
    manageNotifications: "अपनी सूचना प्राथमिकताओं को प्रबंधित करें",
    privacySettings: "अपनी गोपनीयता और डेटा साझाकरण को नियंत्रित करें",
    getHelp: "सहायता प्राप्त करें और समर्थन से संपर्क करें",
    aboutApp: "ऐप के बारे में अधिक जानें",
    signOut: "अपने खाते से साइन आउट करें",
    crops: "फसलें",
    quintals: "क्विंटल",
    years: "साल कृषि",
    changePhoto: "फोटो बदलें",
    accountSettings: "खाता सेटिंग्स"
  }
};

const mockFarmingStats = {
  totalCrops: 12,
  activeSeason: 'Rabi 2024',
  activeSeasonHi: 'रबी 2024',
  harvestsCompleted: 8,
  avgYield: 18.5,
  farmingExperience: 15
};

export function ProfilePage({ selectedLanguage, user, onNavigate, onLanguageChange }: ProfilePageProps) {
  const langCode = selectedLanguage?.code || 'en';
  const content = profileContent[langCode as keyof typeof profileContent] || profileContent.en;

  const handleEditProfile = () => {
    onNavigate('my-account');
  };

  const handleLogout = () => {
    onNavigate('logout-confirmation');
  };

  const menuItems = [
    {
      icon: Bell,
      title: content.notifications,
      subtitle: content.manageNotifications,
      action: () => console.log('Open notifications settings')
    },
    {
      icon: Shield,
      title: content.privacy,
      subtitle: content.privacySettings,
      action: () => console.log('Open privacy settings')
    },
    {
      icon: HelpCircle,
      title: content.help,
      subtitle: content.getHelp,
      action: () => console.log('Open help & support')
    },
    {
      icon: Settings,
      title: content.about,
      subtitle: content.aboutApp,
      action: () => console.log('Open about app')
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-green-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-bold">{content.title}</h1>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
            variant="header"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Profile Header */}
        <div className="bg-white border-b border-gray-200 p-6">
          <div className="flex items-center space-x-4 mb-4">
            <div className="relative">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-green-600" />
              </div>
              <SimpleButton
                onClick={() => console.log('Change photo')}
                size="icon"
                className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-600 hover:bg-green-700 text-white rounded-full"
              >
                <Camera className="w-4 h-4" />
              </SimpleButton>
            </div>
            
            <div className="flex-1">
              <h2 className="text-xl font-bold text-gray-800">{user?.name || 'Farmer'}</h2>
              <div className="flex items-center space-x-2 text-gray-600 text-sm mt-1">
                <MapPin className="w-4 h-4" />
                <span>{user?.location || 'Location not set'}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-600 text-sm mt-1">
                <Award className="w-4 h-4" />
                <span>{mockFarmingStats.farmingExperience} {content.years}</span>
              </div>
            </div>

            <SimpleButton
              onClick={handleEditProfile}
              variant="outline"
              className="flex items-center space-x-2"
            >
              <Edit className="w-4 h-4" />
              <span>{content.editProfile}</span>
            </SimpleButton>
          </div>
        </div>

        {/* Farming Stats */}


        {/* Personal Information */}
        <div className="bg-white border-b border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{content.personalInfo}</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-600">{content.name}</div>
                  <div className="font-medium text-gray-800">{user?.name || 'Not set'}</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-600">{content.phone}</div>
                  <div className="font-medium text-gray-800">{user?.phone || 'Not set'}</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-600">{content.location}</div>
                  <div className="font-medium text-gray-800">{user?.location || 'Not set'}</div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="flex items-center space-x-3">
                <Languages className="w-5 h-5 text-gray-500" />
                <div>
                  <div className="text-sm text-gray-600">{content.language}</div>
                  <div className="font-medium text-gray-800">
                    {selectedLanguage?.nativeName || 'English'}
                  </div>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Settings Menu */}
        <div className="bg-white p-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">{content.preferences}</h3>
          <div className="space-y-2">
            {menuItems.map((item, index) => (
              <SimpleButton
                key={index}
                onClick={item.action}
                variant="ghost"
                className="w-full justify-start h-auto p-4 hover:bg-gray-50"
              >
                <div className="flex items-center space-x-4 w-full">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <item.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 text-left">
                    <div className="font-medium text-gray-800">{item.title}</div>
                    <div className="text-sm text-gray-600">{item.subtitle}</div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400" />
                </div>
              </SimpleButton>
            ))}

            {/* Logout */}
            <SimpleButton
              onClick={handleLogout}
              variant="ghost"
              className="w-full justify-start h-auto p-4 hover:bg-red-50 hover:text-red-600"
            >
              <div className="flex items-center space-x-4 w-full">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                  <LogOut className="w-5 h-5 text-red-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="font-medium text-red-600">{content.logout}</div>
                  <div className="text-sm text-red-500">{content.signOut}</div>
                </div>
                <ChevronRight className="w-4 h-4 text-red-400" />
              </div>
            </SimpleButton>
          </div>
        </div>
      </div>
    </div>
  );
}