import React, { useState } from 'react';
import { ArrowLeft, Camera, Image, MapPin, Users, Hash, Globe, Lock, X } from 'lucide-react';
import { Language, User, Screen } from '../App';
import { SimpleButton } from './simple-button';
import { LanguageSelector } from './language-selector';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CommunityPostPageProps {
  selectedLanguage: Language | null;
  user: User | null;
  onNavigate: (screen: Screen, ...args: any[]) => void;
  onLanguageChange: (language: Language) => void;
}

const postContent = {
  en: {
    title: "Create Post",
    subtitle: "Share with the farming community",
    placeholder: "What's happening on your farm? Share your experience, ask questions, or help fellow farmers...",
    addPhoto: "Add Photo",
    addLocation: "Add Location",
    selectCategory: "Select Category",
    postVisibility: "Post Visibility",
    public: "Public",
    community: "Community Only",
    post: "Post",
    cancel: "Cancel",
    categories: {
      general: "General Discussion",
      crops: "Crop Management",
      weather: "Weather & Climate",
      pests: "Pest & Disease",
      irrigation: "Irrigation & Water",
      machinery: "Farm Equipment",
      market: "Market Prices",
      schemes: "Government Schemes",
      organic: "Organic Farming",
      livestock: "Livestock"
    },
    visibilityDesc: {
      public: "Visible to everyone",
      community: "Only farming community members"
    },
    characterCount: "characters",
    imageLimit: "You can add up to 4 images",
    posting: "Posting...",
    success: "Posted successfully!",
    error: "Failed to post. Please try again."
  },
  hi: {
    title: "पोस्ट बनाएं",
    subtitle: "कृषि समुदाय के साथ साझा करें",
    placeholder: "आपके खेत में क्या हो रहा है? अपना अनुभव साझा करें, प्रश्न पूछें, या साथी किसानों की मदद करें...",
    addPhoto: "फोटो जोड़ें",
    addLocation: "स्थान जोड़ें",
    selectCategory: "श्रेणी चुनें",
    postVisibility: "पोस्ट दृश्यता",
    public: "सार्वजनिक",
    community: "केवल समुदाय",
    post: "पोस्ट करें",
    cancel: "रद्द करें",
    categories: {
      general: "सामान्य चर्चा",
      crops: "फसल प्रबंधन",
      weather: "मौसम और जलवायु",
      pests: "कीट और रोग",
      irrigation: "सिंचाई और पानी",
      machinery: "कृषि उपकरण",
      market: "बाजार मूल्य",
      schemes: "सरकारी योजनाएं",
      organic: "जैविक खेती",
      livestock: "पशुधन"
    },
    visibilityDesc: {
      public: "सभी को दिखाई देगा",
      community: "केवल कृषि समुदाय के सदस्यों को"
    },
    characterCount: "वर्ण",
    imageLimit: "आप अधिकतम 4 छवियां जोड़ सकते हैं",
    posting: "पोस्ट हो रहा है...",
    success: "सफलतापूर्वक पोस्ट किया गया!",
    error: "पोस्ट करने में विफल। कृपया पुनः प्रयास करें।"
  }
};

const categoryIcons: { [key: string]: React.ReactNode } = {
  general: <Users className="w-5 h-5" />,
  crops: <span className="text-lg">🌾</span>,
  weather: <span className="text-lg">🌤️</span>,
  pests: <span className="text-lg">🐛</span>,
  irrigation: <span className="text-lg">💧</span>,
  machinery: <span className="text-lg">🚜</span>,
  market: <span className="text-lg">💰</span>,
  schemes: <span className="text-lg">🏛️</span>,
  organic: <span className="text-lg">🌱</span>,
  livestock: <span className="text-lg">🐄</span>
};

export function CommunityPostPage({ selectedLanguage, user, onNavigate, onLanguageChange }: CommunityPostPageProps) {
  const [postText, setPostText] = useState('');
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('general');
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [isPublic, setIsPublic] = useState(true);
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [isPosting, setIsPosting] = useState(false);

  const langCode = selectedLanguage?.code || 'en';
  const content = postContent[langCode as keyof typeof postContent] || postContent.en;

  const maxCharacters = 500;
  const maxImages = 4;

  const handleAddPhoto = () => {
    if (selectedImages.length < maxImages) {
      // Simulate adding a photo
      const newImage = `https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400&h=300&fit=crop&${Date.now()}`;
      setSelectedImages([...selectedImages, newImage]);
    }
  };

  const handleRemoveImage = (index: number) => {
    setSelectedImages(selectedImages.filter((_, i) => i !== index));
  };

  const handlePost = async () => {
    if (!postText.trim()) return;

    setIsPosting(true);
    
    // Simulate posting
    setTimeout(() => {
      setIsPosting(false);
      onNavigate('new-dashboard'); // Navigate back to dashboard with community tab
    }, 2000);
  };

  const handleLocationToggle = () => {
    if (showLocationInput) {
      setSelectedLocation('');
      setShowLocationInput(false);
    } else {
      setSelectedLocation(user?.location || '');
      setShowLocationInput(true);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-green-600 text-white p-4 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <SimpleButton
              onClick={() => onNavigate('new-dashboard')}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-green-700 rounded-full"
            >
              <ArrowLeft className="w-6 h-6" />
            </SimpleButton>
            <div>
              <h1 className="text-lg font-semibold">{content.title}</h1>
              <p className="text-green-200 text-sm">{content.subtitle}</p>
            </div>
          </div>
          <LanguageSelector
            selectedLanguage={selectedLanguage}
            onLanguageChange={onLanguageChange}
            variant="header"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* User Info */}
        <div className="flex items-center space-x-3 bg-white rounded-lg p-4 shadow-sm">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
            <Users className="w-6 h-6 text-green-600" />
          </div>
          <div className="flex-1">
            <h3 className="font-medium text-gray-800">{user?.name}</h3>
            <p className="text-sm text-gray-600">{user?.location}</p>
          </div>
        </div>

        {/* Post Input */}
        <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
          <textarea
            value={postText}
            onChange={(e) => setPostText(e.target.value)}
            placeholder={content.placeholder}
            className="w-full min-h-[120px] p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
            maxLength={maxCharacters}
          />
          
          {/* Character Count */}
          <div className="flex justify-between items-center text-sm">
            <span className={`${postText.length > maxCharacters * 0.8 ? 'text-orange-600' : 'text-gray-500'}`}>
              {postText.length}/{maxCharacters} {content.characterCount}
            </span>
          </div>

          {/* Images Preview */}
          {selectedImages.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative rounded-lg overflow-hidden">
                  <ImageWithFallback
                    src={image}
                    alt={`Selected image ${index + 1}`}
                    className="w-full h-24 object-cover"
                  />
                  <SimpleButton
                    onClick={() => handleRemoveImage(index)}
                    variant="ghost"
                    size="icon"
                    className="absolute top-1 right-1 w-6 h-6 bg-black/50 text-white hover:bg-black/70 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </SimpleButton>
                </div>
              ))}
            </div>
          )}

          {/* Location Input */}
          {showLocationInput && (
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                placeholder="Enter location..."
                className="w-full p-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
          )}
        </div>

        {/* Category Selection */}
        <div className="bg-white rounded-xl shadow-sm border p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-gray-800">{content.selectCategory}</h3>
            <SimpleButton
              onClick={() => setShowCategoryModal(true)}
              variant="outline"
              size="sm"
              className="border-green-200 text-green-600 hover:bg-green-50"
            >
              <Hash className="w-4 h-4 mr-1" />
              Change
            </SimpleButton>
          </div>
          <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg border border-green-200">
            {categoryIcons[selectedCategory]}
            <span className="font-medium text-green-800">
              {content.categories[selectedCategory as keyof typeof content.categories]}
            </span>
          </div>
        </div>

        {/* Post Options */}
        <div className="bg-white rounded-xl shadow-sm border p-4 space-y-4">
          <h3 className="font-medium text-gray-800">Post Options</h3>
          
          {/* Visibility Toggle */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">{content.postVisibility}</h4>
            <div className="grid grid-cols-2 gap-3">
              <SimpleButton
                onClick={() => setIsPublic(true)}
                variant={isPublic ? "default" : "outline"}
                className={`p-3 h-auto ${isPublic ? "bg-green-600 text-white" : "border-gray-200 hover:bg-gray-50"}`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <Globe className="w-5 h-5" />
                  <span className="text-sm font-medium">{content.public}</span>
                  <span className="text-xs opacity-75">{content.visibilityDesc.public}</span>
                </div>
              </SimpleButton>
              <SimpleButton
                onClick={() => setIsPublic(false)}
                variant={!isPublic ? "default" : "outline"}
                className={`p-3 h-auto ${!isPublic ? "bg-green-600 text-white" : "border-gray-200 hover:bg-gray-50"}`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <Lock className="w-5 h-5" />
                  <span className="text-sm font-medium">{content.community}</span>
                  <span className="text-xs opacity-75">{content.visibilityDesc.community}</span>
                </div>
              </SimpleButton>
            </div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="bg-white border-t border-gray-200 p-4 space-y-3">
        {/* Media and Location Buttons */}
        <div className="flex items-center justify-around">
          <SimpleButton
            onClick={handleAddPhoto}
            variant="ghost"
            disabled={selectedImages.length >= maxImages}
            className="flex flex-col items-center space-y-1 text-green-600 hover:bg-green-50 py-3 px-4 rounded-lg disabled:opacity-50"
          >
            <Camera className="w-6 h-6" />
            <span className="text-xs">{content.addPhoto}</span>
            {selectedImages.length > 0 && (
              <span className="text-xs text-gray-500">({selectedImages.length}/{maxImages})</span>
            )}
          </SimpleButton>

          <SimpleButton
            onClick={handleLocationToggle}
            variant="ghost"
            className={`flex flex-col items-center space-y-1 py-3 px-4 rounded-lg ${
              showLocationInput ? 'text-green-600 bg-green-50' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <MapPin className="w-6 h-6" />
            <span className="text-xs">{content.addLocation}</span>
          </SimpleButton>
        </div>

        {/* Post Button */}
        <div className="flex space-x-3">
          <SimpleButton
            onClick={() => onNavigate('new-dashboard')}
            variant="outline"
            className="flex-1 border-gray-200 text-gray-600 hover:bg-gray-50 py-3"
          >
            {content.cancel}
          </SimpleButton>
          <SimpleButton
            onClick={handlePost}
            disabled={!postText.trim() || isPosting}
            className="flex-2 bg-green-600 hover:bg-green-700 text-white py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPosting ? content.posting : content.post}
          </SimpleButton>
        </div>
      </div>

      {/* Category Selection Modal */}
      {showCategoryModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-xl p-6 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{content.selectCategory}</h3>
              <SimpleButton
                onClick={() => setShowCategoryModal(false)}
                variant="ghost"
                size="icon"
                className="text-gray-500"
              >
                <X className="w-6 h-6" />
              </SimpleButton>
            </div>
            
            <div className="grid grid-cols-1 gap-3">
              {Object.entries(content.categories).map(([key, label]) => (
                <SimpleButton
                  key={key}
                  onClick={() => {
                    setSelectedCategory(key);
                    setShowCategoryModal(false);
                  }}
                  variant={selectedCategory === key ? "default" : "outline"}
                  className={`p-4 h-auto justify-start ${
                    selectedCategory === key 
                      ? "bg-green-600 text-white" 
                      : "border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {categoryIcons[key]}
                    <span className="font-medium">{label}</span>
                  </div>
                </SimpleButton>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}