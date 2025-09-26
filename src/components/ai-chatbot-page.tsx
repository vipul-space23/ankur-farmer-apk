import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Mic, User, Bot } from 'lucide-react';
import { Language, Screen } from '../App';
import { SimpleButton } from './simple-button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface AIChatbotPageProps {
  selectedLanguage: Language | null;
  onNavigate: (screen: Screen) => void;
  initialMessage?: string;
  initialHistory?: {role: 'user' | 'assistant', message: string}[];
}

const chatContent = {
  en: {
    title: "🌾 Farm AI Assistant",
    placeholder: "Ask about crops or farming tips...",
    send: "Send",
    typingIndicator: "Assistant is typing...",
    voiceInput: "Voice input",
    clearChat: "Clear chat",
    welcome: "Hello! I'm your AI farming assistant. How can I help you today?"
  },
  hi: {
    title: "🌾 खेती AI सहायक",
    placeholder: "फसल, मौसम या खेती की जानकारी पूछें...",
    send: "भेजें",
    typingIndicator: "सहायक टाइप कर रहा है...",
    voiceInput: "आवाज इनपुट",
    clearChat: "चैट साफ़ करें",
    welcome: "नमस्ते! मैं आपका AI कृषि सहायक हूं। आज मैं आपकी कैसे मदद कर सकता हूं?"
  },
  ta: {
    title: "🌾 விவசாய AI உதவியாளர்",
    placeholder: "பயிர், வானிலை அல்லது விவசாய குறிப்புகளைப் பற்றி கேளுங்கள்...",
    send: "அனுப்பு",
    typingIndicator: "உதவியாளர் டைப் செய்கிறார்...",
    voiceInput: "குரல் உள்ளீடு",
    clearChat: "அரட்டையை அழிக்கவும்",
    welcome: "வணக்கம்! நான் உங்கள் AI விவசாய உதவியாளர். இன்று உங்களுக்கு எப்படி உதவ முடியும்?"
  },
  te: {
    title: "🌾 వ్యవసాయ AI అసిస్టెంట్",
    placeholder: "పంటలు, వాతావరణం లేదా వ్యవసాయ చిట్కాల గురించి అడగండి...",
    send: "పంపు",
    typingIndicator: "అసిస్టెంట్ టైప్ చేస్తోంది...",
    voiceInput: "వాయిస్ ఇన్‌పుట్",
    clearChat: "చాట్ క్లియర్ చేయండి",
    welcome: "హలో! నేను మీ AI వ్యవసాయ అసిస్టెంట్. ఈరోజు మీకు ఎలా సహాయం చేయగలను?"
  },
  bn: {
    title: "🌾 কৃষি AI সহায়ক",
    placeholder: "ফসল, আবহাওয়া বা কৃষি টিপস সম্পর্কে জিজ্ঞাসা করুন...",
    send: "পাঠান",
    typingIndicator: "সহায়ক টাইপ করছেন...",
    voiceInput: "ভয়েস ইনপুট",
    clearChat: "চ্যাট সাফ করুন",
    welcome: "হ্যালো! আমি আপনার AI কৃষি সহায়ক। আজ আমি আপনাকে কীভাবে সাহায্য করতে পারি?"
  },
  mr: {
    title: "🌾 शेती AI सहाय्यक",
    placeholder: "पीक, हवामान किंवा शेतीच्या टिप्स विशेष विचारा...",
    send: "पाठवा",
    typingIndicator: "सहाय्यक टाइप करत आहे...",
    voiceInput: "व्हॉइस इनपुट",
    clearChat: "चॅट साफ करा",
    welcome: "नमस्कार! मी तुमचा AI शेती सहाय्यक आहे। आज मी तुम्हाला कशी मदत करू शकतो?"
  },
  gu: {
    title: "🌾 ખેતી AI સહાયક",
    placeholder: "પાક, હવામાન અથવા ખેતીની ટિપ્સ વિશે પૂછો...",
    send: "મોકલો",
    typingIndicator: "સહાયક ટાઇપ કરે છે...",
    voiceInput: "વૉઇસ ઇનપુટ",
    clearChat: "ચેટ સાફ કરો",
    welcome: "હેલો! હું તમારો AI ખેતી સહાયક છું. આજે હું તમારી કેવી રીતે મદદ કરી શકું?"
  },
  kn: {
    title: "🌾 ಕೃಷಿ AI ಸಹಾಯಕ",
    placeholder: "ಬೆಳೆಗಳು, ಹವಾಮಾನ ಅಥವಾ ಕೃಷಿ ಸಲಹೆಗಳನ್ನು ಕೇಳಿ...",
    send: "ಕಳುಹಿಸಿ",
    typingIndicator: "ಸಹಾಯಕ ಟೈಪ್ ಮಾಡುತ್ತಿದ್ದಾರೆ...",
    voiceInput: "ಧ್ವನಿ ಇನ್‌ಪುಟ್",
    clearChat: "ಚಾಟ್ ತೆರವುಗೊಳಿಸಿ",
    welcome: "ಹಲೋ! ನಾನು ನಿಮ್ಮ AI ಕೃಷಿ ಸಹಾಯಕ. ಇಂದು ನಾನು ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಬಹುದು?"
  },
  ml: {
    title: "🌾 കൃഷി AI അസിസ്റ്റന്റ്",
    placeholder: "വിളകൾ, കാലാവസ്ഥ അല്ലെങ്കിൽ കൃഷി നുറുങ്ങുകൾ ചോദിക്കുക...",
    send: "അയയ്ക്കുക",
    typingIndicator: "അസിസ്റ്റന്റ് ടൈപ്പ് ചെയ്യുന്നു...",
    voiceInput: "വോയ്സ് ഇൻപുട്ട്",
    clearChat: "ചാറ്റ് മായ്ക്കുക",
    welcome: "ഹലോ! ഞാൻ നിങ്ങളുടെ AI കൃഷി അസിസ്റ്റന്റാണ്. ഇന്ന് എനിക്ക് നിങ്ങളെ എങ്ങനെ സഹായിക്കാൻ കഴിയും?"
  },
  pa: {
    title: "🌾 ਖੇਤੀ AI ਸਹਾਇਕ",
    placeholder: "ਫਸਲਾਂ, ਮੌਸਮ ਜਾਂ ਖੇਤੀ ਦੇ ਨੁਸਖਿਆਂ ਬਾਰੇ ਪੁੱਛੋ...",
    send: "ਭੇਜੋ",
    typingIndicator: "ਸਹਾਇਕ ਟਾਈਪ ਕਰ ਰਿਹਾ ਹੈ...",
    voiceInput: "ਆਵਾਜ਼ ਇਨਪੁੱਟ",
    clearChat: "ਚੈਟ ਸਾਫ਼ ਕਰੋ",
    welcome: "ਸਤ ਸ੍ਰੀ ਅਕਾਲ! ਮੈਂ ਤੁਹਾਡਾ AI ਖੇਤੀ ਸਹਾਇਕ ਹਾਂ। ਅੱਜ ਮੈਂ ਤੁਹਾਡੀ ਕਿਵੇਂ ਮਦਦ ਕਰ ਸਕਦਾ ਹਾਂ?"
  },
  ur: {
    title: "🌾 کاشتکاری AI اسسٹنٹ",
    placeholder: "فصلوں، موسم یا کاشتکاری کے بارے میں پوچھیں...",
    send: "بھیجیں",
    typingIndicator: "اسسٹنٹ ٹائپ کر رہا ہے...",
    voiceInput: "آواز ان پٹ",
    clearChat: "چیٹ صاف کریں",
    welcome: "السلام علیکم! میں آپ کا AI کاشتکاری اسسٹنٹ ہوں۔ آج میں آپ کی کیسے مدد کر سکتا ہوں؟"
  },
  as: {
    title: "🌾 কৃষি AI সহায়ক",
    placeholder: "শস্য, বতৰ বা কৃষিৰ পৰামৰ্শ সুধিব...",
    send: "পঠিয়াওক",
    typingIndicator: "সহায়ক টাইপ কৰি আছে...",
    voiceInput: "ভয়েচ ইনপুট",
    clearChat: "চেট পৰিষ্কাৰ কৰক",
    welcome: "নমস্কাৰ! মই আপোনাৰ AI কৃষি সহায়ক। আজি মই আপোনাক কেনেকৈ সহায় কৰিব পাৰোঁ?"
  },
  or: {
    title: "🌾 କୃଷି AI ସହାୟକ",
    placeholder: "ଫସଲ, ପାଣିପାଗ କିମ୍ବା କୃଷି ଟିପ୍ସ ପଚାରନ୍ତୁ...",
    send: "ପଠାନ୍ତୁ",
    typingIndicator: "ସହାୟକ ଟାଇପ୍ କରୁଛନ୍ତି...",
    voiceInput: "ଭଏସ୍ ଇନପୁଟ୍",
    clearChat: "ଚାଟ୍ ସାଫ କରନ୍ତୁ",
    welcome: "ନମସ୍କାର! ମୁଁ ଆପଣଙ୍କ AI କୃଷି ସହାୟକ। ଆଜି ମୁଁ ଆପଣଙ୍କୁ କିପରି ସାହାଯ୍ୟ କରିପାରିବି?"
  }
};

// AI responses for different topics
const aiResponses = {
  weather: [
    "Based on the current weather patterns, I recommend checking soil moisture before planting.",
    "The upcoming weather forecast shows good conditions for sowing. Make sure to prepare your fields.",
    "Rain is expected next week. This would be perfect timing for transplanting rice seedlings."
  ],
  crops: [
    "For your soil type and climate, I suggest considering wheat cultivation this season.",
    "Crop rotation with legumes can improve soil nitrogen levels naturally.",
    "Based on market trends, tomatoes and onions are showing good profit potential this season."
  ],
  diseases: [
    "The symptoms you described sound like leaf blight. Apply copper-based fungicide immediately.",
    "Regular inspection of crops can help catch diseases early. I recommend weekly field visits.",
    "Proper drainage and air circulation can prevent many fungal diseases in crops."
  ],
  fertilizer: [
    "Your soil test indicates low nitrogen. Consider applying urea fertilizer before sowing.",
    "Organic compost is excellent for improving soil structure and nutrient content.",
    "The NPK ratio of 10:26:26 would be suitable for your crop requirements."
  ],
  general: [
    "I'm here to help with all your farming questions. Feel free to ask about crops, weather, or soil management.",
    "Sustainable farming practices can improve both yield and soil health over time.",
    "Regular soil testing is crucial for optimal crop growth and fertilizer management."
  ]
};

export function AIChatbotPage({ selectedLanguage, onNavigate, initialMessage = '', initialHistory = [] }: AIChatbotPageProps) {
  const [chatMessage, setChatMessage] = useState(initialMessage);
  const [chatHistory, setChatHistory] = useState<{role: 'user' | 'assistant', message: string, timestamp: Date}[]>(
    initialHistory.map(chat => ({ ...chat, timestamp: new Date() }))
  );
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
const inputRef = useRef<HTMLTextAreaElement>(null);

  const langCode = selectedLanguage?.code || 'en';
  const content = chatContent[langCode as keyof typeof chatContent] || chatContent.en;

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatHistory, isTyping]);

  // Send initial message if provided
  useEffect(() => {
    if (initialMessage && chatHistory.length === 0) {
      handleSendMessage();
    }
  }, []);

  // Focus input on mount
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Show welcome message if no chat history
  useEffect(() => {
    if (chatHistory.length === 0 && !initialMessage) {
      setChatHistory([{
        role: 'assistant',
        message: content.welcome,
        timestamp: new Date()
      }]);
    }
  }, [content.welcome]);

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('weather') || message.includes('rain') || message.includes('climate')) {
      return aiResponses.weather[Math.floor(Math.random() * aiResponses.weather.length)];
    } else if (message.includes('crop') || message.includes('plant') || message.includes('seed') || message.includes('harvest')) {
      return aiResponses.crops[Math.floor(Math.random() * aiResponses.crops.length)];
    } else if (message.includes('disease') || message.includes('pest') || message.includes('problem') || message.includes('sick')) {
      return aiResponses.diseases[Math.floor(Math.random() * aiResponses.diseases.length)];
    } else if (message.includes('fertilizer') || message.includes('nutrient') || message.includes('soil') || message.includes('npk')) {
      return aiResponses.fertilizer[Math.floor(Math.random() * aiResponses.fertilizer.length)];
    } else {
      return aiResponses.general[Math.floor(Math.random() * aiResponses.general.length)];
    }
  };

  const handleSendMessage = async () => {
    if (chatMessage.trim()) {
      const userMessage = chatMessage.trim();
      
      // Add user message
      const newUserMessage = {
        role: 'user' as const,
        message: userMessage,
        timestamp: new Date()
      };
      
      setChatHistory(prev => [...prev, newUserMessage]);
      setChatMessage('');
      setIsTyping(true);

      // Simulate AI thinking time
      setTimeout(() => {
        const aiResponse = getAIResponse(userMessage);
        const newAIMessage = {
          role: 'assistant' as const,
          message: aiResponse,
          timestamp: new Date()
        };
        
        setChatHistory(prev => [...prev, newAIMessage]);
        setIsTyping(false);
      }, 1000 + Math.random() * 2000); // 1-3 seconds delay
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleVoiceInput = () => {
    // Voice input placeholder
    console.log('Voice input activated');
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-screen bg-white">
      {/* Header with Close Button */}
      <div className="bg-green-600 text-white p-4 shadow-md flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-green-200">
            <ImageWithFallback
              src="https://i.pinimg.com/736x/5f/fe/c0/5ffec07ae6b545b6a22ae2a72801756e.jpg"
              alt="Farm Assistant"
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-lg font-semibold">{content.title}</h1>
            <p className="text-green-200 text-sm">Online • Ready to help</p>
          </div>
        </div>
        
        <SimpleButton
          onClick={() => onNavigate('new-dashboard')}
          variant="ghost"
          size="icon"
          className="text-white hover:bg-green-700 rounded-full"
        >
          <X className="w-6 h-6" />
        </SimpleButton>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`flex ${chat.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`flex items-end space-x-2 max-w-xs ${chat.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
              {/* Avatar */}
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                {chat.role === 'user' ? (
                  <div className="w-full h-full bg-green-600 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <ImageWithFallback
                    src="https://i.pinimg.com/736x/5f/fe/c0/5ffec07ae6b545b6a22ae2a72801756e.jpg"
                    alt="AI Assistant"
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              {/* Message Bubble */}
              <div className={`rounded-2xl px-4 py-3 ${
                chat.role === 'user' 
                  ? 'bg-green-600 text-white rounded-br-md' 
                  : 'bg-gray-100 text-gray-800 rounded-bl-md'
              }`}>
                <p className="text-sm whitespace-pre-wrap">{chat.message}</p>
                <p className={`text-xs mt-1 ${
                  chat.role === 'user' ? 'text-green-200' : 'text-gray-500'
                }`}>
                  {formatTime(chat.timestamp)}
                </p>
              </div>
            </div>
          </div>
        ))}
        
        {/* Typing Indicator */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-end space-x-2 max-w-xs">
              <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                <ImageWithFallback
                  src="https://i.pinimg.com/736x/5f/fe/c0/5ffec07ae6b545b6a22ae2a72801756e.jpg"
                  alt="AI Assistant"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-bl-md px-4 py-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">{content.typingIndicator}</p>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-end space-x-3">
          <div className="flex-1 relative">
            <textarea
              ref={inputRef}
              value={chatMessage}
              onChange={(e) => setChatMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={content.placeholder}
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '96px' }}
            />
            
            {/* Voice Input Button */}
            <SimpleButton
              onClick={handleVoiceInput}
              variant="ghost"
              size="icon"
              className="absolute right-2 bottom-2 w-8 h-8 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-full"
              title={content.voiceInput}
            >
              <Mic className="w-4 h-4" />
            </SimpleButton>
          </div>
          
          <SimpleButton
            onClick={handleSendMessage}
            disabled={!chatMessage.trim() || isTyping}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full w-12 h-12 flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-5 h-5" />
          </SimpleButton>
        </div>
      </div>
    </div>
  );
}