import React, { useState } from 'react';
import { Languages, Bell, User, LogOut, HelpCircle, Shield, ChevronRight } from 'lucide-react';
import { Language, User as UserType, Screen } from '../App';
import { SimpleButton } from './simple-button';
import { AppHeader } from './app-header';

interface SettingsPageProps {
  selectedLanguage: Language | null;
  user: UserType | null;
  onNavigate: (screen: Screen) => void;
  onLogout: () => void;
  onMyAccount: () => void;
  onLanguageChange: (language: Language) => void;
}

const settingsContent = {
  en: {
    title: "Settings",
    subtitle: "Manage your account and preferences",
    account: "Account Settings",
    notifications: "Notifications",
    support: "Support & Help",
    changeLanguage: "Change Language",
    myAccount: "My Account",
    pushNotifications: "Push Notifications",
    weatherAlerts: "Weather Alerts",
    cropReminders: "Crop Care Reminders",
    marketUpdates: "Market Price Updates",
    helpCenter: "Help Center",
    contactSupport: "Contact Support",
    privacyPolicy: "Privacy Policy",
    termsOfService: "Terms of Service",
    appVersion: "App Version",
    logout: "Logout"
  },
  hi: {
    title: "सेटिंग्स",
    subtitle: "अपना खाता और प्राथमिकताएं प्रबंधित करें",
    account: "खाता सेटिंग्स",
    notifications: "सूचनाएं",
    support: "सहायता और मदद",
    changeLanguage: "भाषा बदलें",
    myAccount: "मेरा खाता",
    pushNotifications: "पुश सूचनाएं",
    weatherAlerts: "मौसम अलर्ट",
    cropReminders: "फसल देखभाल रिमाइंडर",
    marketUpdates: "बाजार मूल्य अपडेट",
    helpCenter: "सहायता केंद्र",
    contactSupport: "सहायता से संपर्क करें",
    privacyPolicy: "गोपनीयता नीति",
    termsOfService: "सेवा की शर्तें",
    appVersion: "ऐप संस्करण",
    logout: "लॉगआउट"
  }
};

export function SettingsPage({ selectedLanguage, user, onNavigate, onLogout, onMyAccount, onLanguageChange }: SettingsPageProps) {
  const [notifications, setNotifications] = useState({
    pushNotifications: true,
    weatherAlerts: true,
    cropReminders: false,
    marketUpdates: true
  });

  const langCode = selectedLanguage?.code || 'en';
  const content = settingsContent[langCode as keyof typeof settingsContent] || settingsContent.en;

  const handleNotificationToggle = (key: keyof typeof notifications) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const ToggleSwitch = ({ checked, onChange }: { checked: boolean; onChange: () => void }) => (
    <label className="relative inline-flex items-center cursor-pointer">
      <input 
        type="checkbox" 
        className="sr-only peer" 
        checked={checked}
        onChange={onChange}
      />
      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
    </label>
  );

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <AppHeader
        title={content.title}
        selectedLanguage={selectedLanguage}
        onLanguageChange={onLanguageChange}
        onBack={() => onNavigate('home')}
      />
      <div className="bg-green-600 text-white px-6 pb-2">
        <p className="text-green-100">{content.subtitle}</p>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto space-y-6">
        {/* Account Settings */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 bg-gray-50 border-b rounded-t-lg">
            <h3 className="font-medium text-gray-800">{content.account}</h3>
          </div>
          <div className="divide-y">
            <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-800">{content.myAccount}</p>
                  <p className="text-sm text-gray-500">{user?.name || 'Not set'}</p>
                </div>
              </div>
              <SimpleButton
                variant="ghost"
                size="sm"
                onClick={onMyAccount}
                className="text-green-600 hover:text-green-700"
              >
                <ChevronRight className="w-4 h-4" />
              </SimpleButton>
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Languages className="w-5 h-5 text-gray-600" />
                <div>
                  <p className="font-medium text-gray-800">{content.changeLanguage}</p>
                  <p className="text-sm text-gray-500">{selectedLanguage?.nativeName || 'English'}</p>
                </div>
              </div>
              <SimpleButton
                variant="ghost"
                size="sm"
                onClick={() => onNavigate('language-selection')}
                className="text-green-600 hover:text-green-700"
              >
                <ChevronRight className="w-4 h-4" />
              </SimpleButton>
            </div>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 bg-gray-50 border-b rounded-t-lg">
            <h3 className="font-medium text-gray-800">{content.notifications}</h3>
          </div>
          <div className="divide-y">
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <p className="font-medium text-gray-800">{content.pushNotifications}</p>
              </div>
              <ToggleSwitch 
                checked={notifications.pushNotifications}
                onChange={() => handleNotificationToggle('pushNotifications')}
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <p className="font-medium text-gray-800">{content.weatherAlerts}</p>
              </div>
              <ToggleSwitch 
                checked={notifications.weatherAlerts}
                onChange={() => handleNotificationToggle('weatherAlerts')}
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <p className="font-medium text-gray-800">{content.cropReminders}</p>
              </div>
              <ToggleSwitch 
                checked={notifications.cropReminders}
                onChange={() => handleNotificationToggle('cropReminders')}
              />
            </div>
            <div className="p-4 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <p className="font-medium text-gray-800">{content.marketUpdates}</p>
              </div>
              <ToggleSwitch 
                checked={notifications.marketUpdates}
                onChange={() => handleNotificationToggle('marketUpdates')}
              />
            </div>
          </div>
        </div>

        {/* Support */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 bg-gray-50 border-b rounded-t-lg">
            <h3 className="font-medium text-gray-800">{content.support}</h3>
          </div>
          <div className="divide-y">
            <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <HelpCircle className="w-5 h-5 text-gray-600" />
                <p className="font-medium text-gray-800">{content.helpCenter}</p>
              </div>
              <SimpleButton
                variant="ghost"
                size="sm"
                onClick={() => {}}
                className="text-green-600 hover:text-green-700"
              >
                <ChevronRight className="w-4 h-4" />
              </SimpleButton>
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <HelpCircle className="w-5 h-5 text-gray-600" />
                <p className="font-medium text-gray-800">{content.contactSupport}</p>
              </div>
              <SimpleButton
                variant="ghost"
                size="sm"
                onClick={() => {}}
                className="text-green-600 hover:text-green-700"
              >
                <ChevronRight className="w-4 h-4" />
              </SimpleButton>
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <p className="font-medium text-gray-800">{content.privacyPolicy}</p>
              </div>
              <SimpleButton
                variant="ghost"
                size="sm"
                onClick={() => {}}
                className="text-green-600 hover:text-green-700"
              >
                <ChevronRight className="w-4 h-4" />
              </SimpleButton>
            </div>
            <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <p className="font-medium text-gray-800">{content.termsOfService}</p>
              </div>
              <SimpleButton
                variant="ghost"
                size="sm"
                onClick={() => {}}
                className="text-green-600 hover:text-green-700"
              >
                <ChevronRight className="w-4 h-4" />
              </SimpleButton>
            </div>
          </div>
        </div>

        {/* App Info & Logout */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-gray-600">{content.appVersion}</span>
              <span className="font-medium text-gray-800">1.0.0</span>
            </div>
            <div className="border-b border-gray-200 mb-4"></div>
            <SimpleButton
              onClick={onLogout}
              variant="destructive"
              className="w-full flex items-center justify-center space-x-2 h-12"
            >
              <LogOut className="w-5 h-5" />
              <span>{content.logout}</span>
            </SimpleButton>
          </div>
        </div>
      </div>
    </div>
  );
}