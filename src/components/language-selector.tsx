import React, { useState } from 'react';
import { Globe, ChevronDown } from 'lucide-react';
import { Language } from '../App';
import { SimpleButton } from './simple-button';

interface LanguageSelectorProps {
  selectedLanguage: Language | null;
  onLanguageChange: (language: Language) => void;
  variant?: 'header' | 'standalone';
}

const availableLanguages: Language[] = [
  { code: 'en', name: 'English', nativeName: 'English', flag: '🇮🇳' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', flag: '🇮🇳' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', flag: '🇮🇳' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', flag: '🇮🇳' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', flag: '🇮🇳' },
  { code: 'pa', name: 'Punjabi', nativeName: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  { code: 'ur', name: 'Urdu', nativeName: 'اردو', flag: 'IN' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', flag: '🇮🇳' },
  { code: 'or', name: 'Odia', nativeName: 'ଓଡ଼ିଆ', flag: '🇮🇳' }
];

export function LanguageSelector({ selectedLanguage, onLanguageChange, variant = 'header' }: LanguageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleLanguageSelect = (language: Language) => {
    onLanguageChange(language);
    setIsOpen(false);
  };

  if (variant === 'header') {
    return (
      <div className="relative">
        <SimpleButton
          onClick={() => setIsOpen(!isOpen)}
          variant="ghost"
          size="sm"
          className="text-white hover:bg-green-700 flex items-center space-x-1"
        >
          <Globe className="w-4 h-4" />
          <span className="text-sm">{selectedLanguage?.flag || '🌐'}</span>
          <ChevronDown className="w-3 h-3" />
        </SimpleButton>

        {isOpen && (
          <>
            {/* Backdrop */}
            <div 
              className="fixed inset-0 z-40" 
              onClick={() => setIsOpen(false)}
            />
            
            {/* Dropdown */}
            <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-lg shadow-lg border z-50 max-h-80 overflow-y-auto">
              <div className="p-2">
                <div className="text-xs font-medium text-gray-500 px-3 py-2 border-b">
                  Choose Language / भाषा चुनें
                </div>
                {availableLanguages.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language)}
                    className={`w-full text-left px-3 py-2 rounded-md text-sm hover:bg-gray-100 flex items-center space-x-3 ${
                      selectedLanguage?.code === language.code ? 'bg-green-50 text-green-700' : 'text-gray-700'
                    }`}
                  >
                    <span className="text-lg">{language.flag}</span>
                    <div className="flex-1">
                      <div className="font-medium">{language.nativeName}</div>
                      <div className="text-xs text-gray-500">{language.name}</div>
                    </div>
                    {selectedLanguage?.code === language.code && (
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-green-50 via-green-100 to-emerald-50 flex flex-col">
      {/* Header Section */}
      <div className="flex-shrink-0 px-6 py-12 text-center">
        <div className="mb-8">
          <div className="w-20 h-20 mx-auto mb-6 bg-green-600 rounded-full flex items-center justify-center shadow-lg">
            <Globe className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-3">Choose Your Language</h1>
          <p className="text-lg text-gray-600 mb-2">भाषा चुनें</p>
          <p className="text-base text-gray-500">Select your preferred language for the app</p>
        </div>
      </div>
      
      {/* Language List Section */}
      <div className="flex-1 px-6 pb-8">
        <div className="max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-4 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 gap-2">
              {availableLanguages.map((language) => (
                <SimpleButton
                  key={language.code}
                  onClick={() => handleLanguageSelect(language)}
                  variant="ghost"
                  className={`p-4 flex items-center space-x-4 text-left justify-start rounded-xl transition-all duration-200 touch-target ${
                    selectedLanguage?.code === language.code 
                      ? 'bg-green-50 border-2 border-green-500 shadow-md' 
                      : 'hover:bg-gray-50 border-2 border-transparent'
                  }`}
                >
                  <span className="text-3xl">{language.flag}</span>
                  <div className="flex-1 min-w-0">
                    <div className={`font-semibold text-lg truncate ${
                      selectedLanguage?.code === language.code 
                        ? 'text-green-700' 
                        : 'text-gray-800'
                    }`}>
                      {language.nativeName}
                    </div>
                    <div className={`text-sm truncate ${
                      selectedLanguage?.code === language.code 
                        ? 'text-green-600' 
                        : 'text-gray-500'
                    }`}>
                      {language.name}
                    </div>
                  </div>
                  {selectedLanguage?.code === language.code && (
                    <div className="flex-shrink-0 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                  )}
                </SimpleButton>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer Section */}
      <div className="flex-shrink-0 px-6 py-6 text-center">
        <p className="text-sm text-gray-500">
          Tap on your preferred language to continue
        </p>
      </div>
    </div>
  );
}