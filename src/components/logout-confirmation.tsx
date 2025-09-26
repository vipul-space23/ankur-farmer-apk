import React from 'react';
import { LogOut, ArrowLeft } from 'lucide-react';
import { Language } from '../App';
import { SimpleButton } from './simple-button';

interface LogoutConfirmationProps {
  language: Language | null;
  onConfirm: () => void;
  onCancel: () => void;
}

const logoutContent = {
  en: {
    title: "Logout Confirmation",
    message: "Are you sure you want to logout?",
    subtitle: "You will need to login again to access your account and crop recommendations.",
    confirmButton: "Yes, Logout",
    cancelButton: "Cancel"
  },
  hi: {
    title: "लॉगआउट पुष्टि",
    message: "क्या आप वाकई लॉगआउट करना चाहते हैं?",
    subtitle: "आपको अपने खाते और फसल सुझावों तक पहुंचने के लिए फिर से लॉगिन करना होगा।",
    confirmButton: "हां, लॉगआउट करें",
    cancelButton: "रद्द करें"
  }
};

export function LogoutConfirmation({ language, onConfirm, onCancel }: LogoutConfirmationProps) {
  const langCode = language?.code || 'en';
  const content = logoutContent[langCode as keyof typeof logoutContent] || logoutContent.en;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-red-50 to-white p-6">
      <div className="w-full max-w-sm bg-white rounded-lg shadow-lg border">
        <div className="text-center  pb-4 p-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <LogOut className="w-8 h-8 text-red-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">{content.title}</h1>
        </div>
        
        <div className="text-center space-y-6 p-6 pt-0">
          <div>
            <p className="text-lg font-medium text-gray-800 mb-3">
              {content.message}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              {content.subtitle}
            </p>
          </div>

          <div className="space-y-3">
            <SimpleButton
              onClick={onConfirm}
              variant="destructive"
              className="w-full h-12 text-lg"
            >
              <LogOut className="w-5 h-5 mr-2" />
              {content.confirmButton}
            </SimpleButton>
            
            <SimpleButton
              onClick={onCancel}
              variant="outline"
              className="w-full h-12 text-lg border-2 border-gray-300 hover:bg-gray-50"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              {content.cancelButton}
            </SimpleButton>
          </div>
        </div>
      </div>
    </div>
  );
}