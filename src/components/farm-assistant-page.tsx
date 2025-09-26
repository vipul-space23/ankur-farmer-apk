import React, { useState } from "react";
import {
  ArrowLeft,
  MessageCircle,
  Send,
  Bot,
  User,
  HelpCircle,
  Lightbulb,
  Leaf,
  Mic,
} from "lucide-react";
import { Language, Screen } from "../App";
import { SimpleButton } from "./simple-button";
import { LanguageSelector } from "./language-selector";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface FarmAssistantPageProps {
  selectedLanguage: Language | null;
  onNavigate: (screen: Screen) => void;
  onLanguageChange: (language: Language) => void;
}

const farmAssistantContent = {
  en: {
    title: "🌾 Farm Assistant",
    subtitle: "Your AI-powered farming companion",
    chatPlaceholder:
      "Ask about crops, weather, pests, fertilizers, or any farming question...",
    send: "Send",
    suggestions: "Quick Questions:",
    suggestionsList: [
      "What's the best time to plant rice?",
      "How to identify pest attacks?",
      "Which fertilizer is best for wheat?",
      "What are signs of nutrient deficiency?",
      "How to improve soil quality?",
      "Best practices for organic farming?",
    ],
    welcomeMessage:
      "Hello! I'm your AI farming assistant. I can help you with crop recommendations, pest management, fertilizer advice, weather-related farming tips, and much more. What would you like to know?",
    sampleResponses: {
      rice: "Rice is best planted during the monsoon season (June-July) when there's adequate water supply. Ensure the soil pH is between 5.5-6.5 and temperature is 20-35°C for optimal growth.",
      pest: "Common signs of pest attacks include yellowing leaves, holes in leaves, stunted growth, and visible insects. Regular inspection and organic pest control methods like neem oil can help prevent infestations.",
      fertilizer:
        "For wheat, use NPK fertilizer with ratio 120:60:40 kg/ha. Apply nitrogen in 3 splits - at sowing, tillering, and grain filling stages for best results.",
      deficiency:
        "Nutrient deficiency signs: Yellow leaves (Nitrogen), Purple leaves (Phosphorus), Brown leaf edges (Potassium), Pale leaves (Iron). Soil testing can confirm deficiencies.",
      soil: "Improve soil quality by adding organic matter, crop rotation, maintaining proper pH (6.0-7.5), ensuring good drainage, and avoiding overuse of chemical fertilizers.",
      organic:
        "Organic farming practices: Use compost and green manure, practice crop rotation, biological pest control, avoid synthetic pesticides and fertilizers, maintain biodiversity.",
    },
  },
  hi: {
    title: "🌾 खेती सहायक",
    subtitle: "आपका AI-संचालित खेती साथी",
    chatPlaceholder:
      "फसल, मौसम, कीट, उर्वरक, या किसी भी खेती के बारे में पूछें...",
    send: "भेजें",
    suggestions: "त्वरित सवाल:",
    suggestionsList: [
      "धान बोने का सबसे अच्छा समय क्या है?",
      "कीट आक्रमण की पहचान कैसे करें?",
      "गेहूं के लिए कौन सी खाद सबसे अच्छी है?",
      "पोषक तत्वों की कमी के संकेत क्या हैं?",
      "मिट्टी की गुणवत्ता कैसे सुधारें?",
      "जैविक खेती की सर्वोत्तम प्रथाएं?",
    ],
    welcomeMessage:
      "नमस्ते! मैं आपका AI खेती सहायक हूं। मैं फसल सुझाव, कीट प्रबंधन, उर्वरक सलाह, मौसम संबंधी खेती युक्तियां और बहुत कुछ में आपकी मदद कर सकता हूं। आप क्या जानना चाहते हैं?",
    sampleResponses: {
      rice: "धान बोना मानसून के दौरान (जून-जुलाई) सबसे अच्छा होता है जब पर्याप्त पानी की आपूर्ति हो। मिट्टी का pH 5.5-6.5 और तापमान 20-35°C हो तो अच्छी बढ़वार होती है।",
      pest: "कीट आक्रमण के सामान्य लक्षण: पत्तियों का पीला होना, पत्तियों में छेद, बढ़वार रुकना, और दिखाई देने वाले कीड़े। नियमित निरीक्षण और नीम तेल जैसे जैविक नियंत्रण उपाय मदद करते हैं।",
      fertilizer:
        "गेहूं के लिए NPK खाद 120:60:40 किग्रा/हेक्टेयर अनुपात में उपयोग करें। नाइट्रोजन को 3 बार में दें - बुआई, कल्ले निकलने और दाना भरने के समय।",
      deficiency:
        "पोषक तत्वों की कमी के संकेत: पीली पत्तियां (नाइट्रोजन), बैंगनी पत्तियां (फास्फोरस), भूरे किनारे (पोटाश), फीकी पत्तियां (आयरन)। मिट्टी परीक्षण से पुष्टि हो सकती है।",
      soil: "मिट्टी की गुणवत्ता सुधारने के लिए: जैविक पदार्थ मिलाएं, फसल चक्र अपनाएं, उचित pH (6.0-7.5) बनाए रखें, अच्छी जल निकासी सुनिश्चित करें।",
      organic:
        "जैविक खेती की प्रथाएं: कंपोस्ट और हरी खाद का उपयोग, फसल चक्र, जैविक कीट नियंत्रण, कृत्रिम कीटनाशकों से बचाव, जैव विविधता बनाए रखें।",
    },
  },
  ta: {
    title: "🌾 விவசாய உதவியாளர்",
    subtitle: "உங்கள் AI-இயங்கும் விவசாய துணைவன்",
    chatPlaceholder:
      "பயிர்கள், வானிலை, பூச்சிகள், உரங்கள் அல்லது எந்த விவசாய கேள்வியையும் கேளுங்கள்...",
    send: "அனுப்பு",
    suggestions: "விரைவு கேள்விகள்:",
    suggestionsList: [
      "நெல் விதைக்க சிறந்த நேரம் எது?",
      "பூச்சித் தாக்குதலை எவ்வாறு கண்டறியலாம்?",
      "கோதுமைக்கு எந்த உரம் சிறந்தது?",
      "ஊட்டச்சத்து குறைபாட்டின் அறிகுறிகள் என்ன?",
      "மண்ணின் தரத்தை எவ்வாறு மேம்படுத்துவது?",
      "இயற்கை விவசாயத்தின் சிறந்த நடைமுறைகள்?",
    ],
    welcomeMessage:
      "வணக்கம்! நான் உங்கள் AI விவசாய உதவியாளர். பயிர் பரிந்துரைகள், பூச்சி மேலாண்மை, உர ஆலோசனை, வானிலை தொடர்பான விவசாய குறிப்புகள் மற்றும் பலவற்றில் உங்களுக்கு உதவ முடியும். நீங்கள் என்ன தெரிந்து கொள்ள விரும்புகிறீர்கள்?",
    sampleResponses: {
      rice: "நெல் விதைப்பு மழைக்காலத்தில் (ஜூன்-ஜூலை) போதுமான நீர் வழங்கல் இருக்கும் போது சிறந்தது. மண்ணின் pH 5.5-6.5 மற்றும் வெப்பநிலை 20-35°C இருந்தால் சிறந்த வளர்ச்சி கிடைக்கும்.",
      pest: "பூச்சித் தாக்குதலின் பொதுவான அறிகுறிகள்: இலைகள் மஞ்சளாவது, இலைகளில் துளைகள், வளர்ச்சி தடைபடுவது, பூச்சிகள் தெரிவது. வேப்பெண்ணெய் போன்ற இயற்கை கட்டுப்பாடு முறைகள் உதவும்.",
      fertilizer:
        "கோதுமைக்கு NPK உரம் 120:60:40 கிலோ/ஹெக்டர் விகிதத்தில் பயன்படுத்தவும். நைட்ரஜனை 3 முறையாக - விதைப்பு, கிளை விடும் மற்றும் தானியம் ந��ரம்பும் நேரத்தில் கொடுக்கவும்.",
      deficiency:
        "ஊட்டச்சத்து குறைபாட்டின் அறிகுறிகள்: மஞ்சள் இலைகள் (நைட்ரஜன்), ஊதா இலைகள் (பாஸ்பரஸ்), பழுப்பு விளிம்புகள் (பொட்டாசியம்), வெளிறிய இலைகள் (இரும்பு).",
      soil: "மண்ணின் தரத்தை மேம்படுத்த: இயற்கை பொருட்கள் சேர்ப்பது, பயிர் சுழற்சி, சரியான pH (6.0-7.5) பராமரிப்பு, நல்ல வடிகால் உறுதி செய்வது.",
      organic:
        "இயற்கை விவசாய நடைமுறைகள்: கம்போஸ்ட் மற்றும் பசுந்தாள் உரம், பயிர் சுழற்சி, உயிரியல் பூச்சி கட்டுப்பாடு, செயற்கை பூச்சிக்கொல்லிகளை தவிர்ப்பது.",
    },
  },
};

export function FarmAssistantPage({
  selectedLanguage,
  onNavigate,
  onLanguageChange,
}: FarmAssistantPageProps) {
  const [chatMessage, setChatMessage] = useState("");
  const [chatHistory, setChatHistory] = useState<
    { message: string; isUser: boolean; timestamp: Date }[]
  >([]);

  const langCode = selectedLanguage?.code || "en";
  const content =
    farmAssistantContent[
      langCode as keyof typeof farmAssistantContent
    ] || farmAssistantContent.en;

  // Initialize with welcome message
  React.useEffect(() => {
    if (chatHistory.length === 0) {
      setChatHistory([
        {
          message: content.welcomeMessage,
          isUser: false,
          timestamp: new Date(),
        },
      ]);
    }
  }, [content.welcomeMessage, chatHistory.length]);

  const handleSendMessage = (message?: string) => {
    const messageToSend = message || chatMessage;
    if (!messageToSend.trim()) return;

    // Add user message
    const userMessage = {
      message: messageToSend,
      isUser: true,
      timestamp: new Date(),
    };

    // Generate AI response based on message content
    let aiResponse = "";
    const lowerMessage = messageToSend.toLowerCase();

    if (
      lowerMessage.includes("rice") ||
      lowerMessage.includes("धान") ||
      lowerMessage.includes("நெல்")
    ) {
      aiResponse = content.sampleResponses.rice;
    } else if (
      lowerMessage.includes("pest") ||
      lowerMessage.includes("कीट") ||
      lowerMessage.includes("பூச்சி")
    ) {
      aiResponse = content.sampleResponses.pest;
    } else if (
      lowerMessage.includes("fertilizer") ||
      lowerMessage.includes("wheat") ||
      lowerMessage.includes("खाद") ||
      lowerMessage.includes("उर्वरक") ||
      lowerMessage.includes("கோதுமை")
    ) {
      aiResponse = content.sampleResponses.fertilizer;
    } else if (
      lowerMessage.includes("deficiency") ||
      lowerMessage.includes("nutrient") ||
      lowerMessage.includes("कमी") ||
      lowerMessage.includes("குறைபாடு")
    ) {
      aiResponse = content.sampleResponses.deficiency;
    } else if (
      lowerMessage.includes("soil") ||
      lowerMessage.includes("मिट्टी") ||
      lowerMessage.includes("மண்")
    ) {
      aiResponse = content.sampleResponses.soil;
    } else if (
      lowerMessage.includes("organic") ||
      lowerMessage.includes("जैविक") ||
      lowerMessage.includes("இயற்கை")
    ) {
      aiResponse = content.sampleResponses.organic;
    } else {
      // Default response
      aiResponse =
        langCode === "hi"
          ? "मैं आपकी खेती संबंधी सहायता करने के लिए यहाँ हूँ। कृपया अपना प्रश्न विस्तार से बताएं या ऊपर दिए गए सुझावों में से कोई चुनें।"
          : langCode === "ta"
            ? "உங்கள் விவசாய கேள்விகளுக்கு உதவ நான் இங்கே இருக்கிறேன். தயவுசெய்து உங்கள் கேள்வியை விரிவாக கூறுங்கள் அல்லது மேலே உள்ள பரிந்துரைகளில் ஏதேனும் ஒன்றைத் தேர்வு செய்யுங்கள்."
            : "I'm here to help with your farming questions. Please tell me more about what you'd like to know, or choose from the suggestions above.";
    }

    const aiResponseMessage = {
      message: aiResponse,
      isUser: false,
      timestamp: new Date(),
    };

    setChatHistory((prev) => [
      ...prev,
      userMessage,
      aiResponseMessage,
    ]);
    setChatMessage("");
  };

  const handleSuggestionClick = (suggestion: string) => {
    handleSendMessage(suggestion);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-green-600 text-white p-6 sticky top-0 z-10 shadow-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <SimpleButton
              onClick={() => onNavigate("home")}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-green-700"
            >
              <ArrowLeft className="w-5 h-5" />
            </SimpleButton>
            <div>
              <h1 className="text-xl font-bold">
                {content.title}
              </h1>
              <p className="text-green-100 text-sm">
                {content.subtitle}
              </p>
            </div>
          </div>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
            variant="header"
          />
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 flex flex-col">
        {/* Suggestions */}
        <div className="p-4 bg-white border-b">
          <div className="flex items-center space-x-2 mb-3">
            <HelpCircle className="w-4 h-4 text-green-600" />
            <h3 className="text-sm font-semibold text-gray-800">
              {content.suggestions}
            </h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {content.suggestionsList.map(
              (suggestion, index) => (
                <SimpleButton
                  key={index}
                  onClick={() =>
                    handleSuggestionClick(suggestion)
                  }
                  variant="outline"
                  size="sm"
                  className="text-xs bg-green-50 border-green-200 text-green-700 hover:bg-green-100"
                >
                  {suggestion}
                </SimpleButton>
              ),
            )}
          </div>
        </div>

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`flex ${chat.isUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-xs lg:max-w-md flex items-start space-x-2 ${
                  chat.isUser
                    ? "flex-row-reverse space-x-reverse"
                    : ""
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    chat.isUser ? "bg-green-500" : "bg-gray-200"
                  }`}
                >
                  {chat.isUser ? (
                    <User className="w-4 h-4 text-white" />
                  ) : (
                    <ImageWithFallback
                      src="https://i.pinimg.com/736x/5f/fe/c0/5ffec07ae6b545b6a22ae2a72801756e.jpg"
                      alt="Chatbot"
                      className="w-8 h-8 rounded-full object-cover"
                    />
                  )}
                </div>
                <div
                  className={`p-3 rounded-lg ${
                    chat.isUser
                      ? "bg-green-500 text-white"
                      : "bg-white text-gray-800 border border-gray-200 shadow-sm"
                  }`}
                >
                  <p className="text-sm">{chat.message}</p>
                  <p
                    className={`text-xs mt-1 ${
                      chat.isUser
                        ? "text-green-100"
                        : "text-gray-500"
                    }`}
                  >
                    {chat.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Chat Input */}
        <div className="p-4 border-t bg-white">
          <div className="flex items-center space-x-2">
            {/* Farmer Image */}
            <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
              <ImageWithFallback
                src="https://i.pinimg.com/736x/5f/fe/c0/5ffec07ae6b545b6a22ae2a72801756e.jpg"
                alt="Farm Assistant"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Chat Input with Microphone */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder={content.chatPlaceholder}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
                onKeyPress={(e) =>
                  e.key === "Enter" && handleSendMessage()
                }
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 text-gray-400 hover:text-green-500 transition-colors">
                <Mic className="w-4 h-4" />
              </button>
            </div>

            <SimpleButton
              onClick={() => handleSendMessage()}
              className="px-4 py-3 bg-green-500 hover:bg-green-600 text-white"
            >
              <Send className="w-4 h-4" />
            </SimpleButton>
          </div>
        </div>
      </div>
    </div>
  );
}