import React from 'react';
import { ArrowLeft, User } from 'lucide-react';
import { Language, User as UserType } from '../App';
import { LanguageSelector } from './language-selector';
import { SimpleButton } from './simple-button';

interface AppHeaderProps {
  title: string;
  selectedLanguage: Language | null;
  user?: UserType | null;
  onLanguageChange: (language: Language) => void;
  onBack?: () => void;
  showLanguageSelector?: boolean;
  showUserInfo?: boolean;
}

export function AppHeader({ 
  title, 
  selectedLanguage, 
  user, 
  onLanguageChange, 
  onBack, 
  showLanguageSelector = true,
  showUserInfo = false 
}: AppHeaderProps) {
  return (
    <div className="bg-green-600 text-white p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          {onBack && (
            <SimpleButton
              onClick={onBack}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-green-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </SimpleButton>
          )}
          
          {showUserInfo && user && (
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h1 className="text-lg font-bold">{user.name}</h1>
                <p className="text-green-100 text-sm">{user.location}</p>
              </div>
            </div>
          )}
          
          {!showUserInfo && (
            <h1 className="text-xl font-bold">{title}</h1>
          )}
        </div>

        {showLanguageSelector && (
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
            variant="header"
          />
        )}
      </div>
    </div>
  );
}