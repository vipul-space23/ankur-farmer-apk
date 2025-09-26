import React from "react";
import { Languages } from "lucide-react";
import { Language } from "../App";
import { SimpleButton } from "./simple-button";

const languages: Language[] = [
  {
    code: "en",
    name: "English",
    nativeName: "English",
    flag: "🇮🇳",
  },
  {
    code: "hi",
    name: "Hindi",
    nativeName: "हिंदी",
    flag: "🇮🇳",
  },
  {
    code: "ta",
    name: "Tamil",
    nativeName: "தமிழ்",
    flag: "🇮🇳",
  },
  {
    code: "te",
    name: "Telugu",
    nativeName: "తెలుగు",
    flag: "🇮🇳",
  },
  {
    code: "bn",
    name: "Bengali",
    nativeName: "বাংলা",
    flag: "🇮🇳",
  },
  {
    code: "mr",
    name: "Marathi",
    nativeName: "मराठी",
    flag: "🇮🇳",
  },
  {
    code: "gu",
    name: "Gujarati",
    nativeName: "ગુજરાતી",
    flag: "🇮🇳",
  },
  {
    code: "kn",
    name: "Kannada",
    nativeName: "ಕನ್ನಡ",
    flag: "🇮🇳",
  },
  {
    code: "ml",
    name: "Malayalam",
    nativeName: "മലയാളം",
    flag: "🇮🇳",
  },
  {
    code: "pa",
    name: "Punjabi",
    nativeName: "ਪੰਜਾਬੀ",
    flag: "🇮🇳",
  },
  { code: "ur", name: "Urdu", nativeName: "اردو", flag: "🇮🇳" },
  {
    code: "as",
    name: "Assamese",
    nativeName: "অসমীয়া",
    flag: "🇮🇳",
  },
  { code: "or", name: "Odia", nativeName: "ଓଡ଼ିଆ", flag: "🇮🇳" },
];

interface LanguageSelectionProps {
  onLanguageSelect: (language: Language) => void;
}

export function LanguageSelection({
  onLanguageSelect,
}: LanguageSelectionProps) {
  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-green-600 text-white p-6 text-center">
        <Languages className="w-12 h-12 mx-auto mb-4" />
        <h1 className="text-2xl font-bold mb-2">
          Choose Your Language
        </h1>
        <p className="text-green-100">
          भाषा चुनें | Choose Language
        </p>
      </div>

      {/* Language grid */}
      <div className="flex-1 p-6 overflow-y-auto">
        <div className="grid grid-cols-1 gap-4 max-w-sm mx-auto">
          {languages.map((language) => (
            <SimpleButton
              key={language.code}
              onClick={() => onLanguageSelect(language)}
              variant="outline"
              className="h-16 p-4 group"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">
                    {language.flag}
                  </span>
                  <div className="text-left">
                    <p className="font-medium text-gray-800 group-hover:text-green-700">
                      {language.nativeName}
                    </p>
                    <p className="text-sm text-gray-500 group-hover:text-green-600">
                      {language.name}
                    </p>
                  </div>
                </div>
                <div className="w-3 h-3 rounded-full bg-green-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
            </SimpleButton>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 text-center text-sm text-gray-500 bg-gray-50">
        <p>Select your preferred language to continue</p>
      </div>
    </div>
  );
}