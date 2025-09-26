import React, { useState } from 'react';
import { ArrowLeft, User, Phone, MapPin, Mail, Calendar, Save, Edit, Camera } from 'lucide-react';
import { Language, User as UserType } from '../App';
import { SimpleButton } from './simple-button';

interface MyAccountScreenProps {
  selectedLanguage: Language | null;
  user: UserType | null;
  onBack: () => void;
  onUpdateUser: (user: UserType) => void;
}

const accountContent = {
  en: {
    title: "My Account",
    subtitle: "Manage your profile information",
    personalInfo: "Personal Information",
    fullName: "Full Name",
    phoneNumber: "Phone Number",
    email: "Email Address",
    dateOfBirth: "Date of Birth",
    address: "Address",
    city: "City",
    state: "State",
    pincode: "Pincode",

    saveChanges: "Save Changes",
    editProfile: "Edit Profile",
    cancelEditing: "Cancel",
    namePlaceholder: "Enter your full name",
    phonePlaceholder: "Enter your phone number",
    emailPlaceholder: "Enter your email address",
    addressPlaceholder: "Enter your address",
    cityPlaceholder: "Enter your city",
    statePlaceholder: "Select your state",
    pincodePlaceholder: "Enter pincode",
    updatePhoto: "Update Photo",

  },
  hi: {
    title: "मेरा खाता",
    subtitle: "अपनी प्रोफ़ाइल जानकारी प्रबंधित करें",
    personalInfo: "व्यक्तिगत जानकारी",
    fullName: "पूरा नाम",
    phoneNumber: "फोन नंबर",
    email: "ईमेल पता",
    dateOfBirth: "जन्म तिथि",
    address: "पता",
    city: "शहर",
    state: "राज्य",
    pincode: "पिनकोड",

    saveChanges: "परिवर्तन सहेजें",
    editProfile: "प्रोफ़ाइल संपादित करें",
    cancelEditing: "रद्द करें",
    namePlaceholder: "अपना पूरा नाम दर्ज करें",
    phonePlaceholder: "अपना फोन नंबर दर्ज करें",
    emailPlaceholder: "अपना ईमेल पता दर्ज करें",
    addressPlaceholder: "अपना पता दर्ज करें",
    cityPlaceholder: "अपना शहर दर्ज करें",
    statePlaceholder: "अपना राज्य चुनें",
    pincodePlaceholder: "पिनकोड दर्ज करें",
    updatePhoto: "फोटो अपडेट करें",

  }
};

const indianStates = [
  "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chhattisgarh",
  "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka",
  "Kerala", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram",
  "Nagaland", "Odisha", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu",
  "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"
];

export function MyAccountScreen({ selectedLanguage, user, onBack, onUpdateUser }: MyAccountScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    email: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: user?.location || '',
    pincode: ''
  });



  const langCode = selectedLanguage?.code || 'en';
  const content = accountContent[langCode as keyof typeof accountContent] || accountContent.en;

  const handleSaveProfile = async () => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (user) {
        const updatedUser: UserType = {
          ...user,
          name: formData.name,
          phone: formData.phone,
          location: formData.state
        };
        onUpdateUser(updatedUser);
      }
      setIsEditing(false);
      setIsLoading(false);
    }, 1000);
  };



  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-green-600 text-white p-6">
        <div className="flex items-center mb-4">
          <SimpleButton
            onClick={onBack}
            variant="ghost"
            size="sm"
            className="text-white hover:bg-green-700 p-2 mr-4"
          >
            <ArrowLeft className="w-5 h-5" />
          </SimpleButton>
          <div>
            <h1 className="text-2xl font-bold">{content.title}</h1>
            <p className="text-green-100">{content.subtitle}</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto space-y-6">
        {/* Personal Information */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-4 bg-gray-50 border-b flex justify-between items-center">
            <h3 className="font-medium text-gray-800">{content.personalInfo}</h3>
            {!isEditing && (
              <SimpleButton
                onClick={() => setIsEditing(true)}
                variant="ghost"
                size="sm"
                className="text-green-600 hover:text-green-700"
              >
                <Edit className="w-4 h-4 mr-1" />
                {content.editProfile}
              </SimpleButton>
            )}
          </div>
          
          <div className="p-4 space-y-4">
            {/* Profile Photo */}
            <div className="flex flex-col items-center space-y-3 pb-4 border-b border-gray-100">
              <div className="relative">
                <div className="w-24 h-24 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                  <User className="w-12 h-12 text-green-600" />
                </div>
                {isEditing && (
                  <button
                    onClick={() => console.log('Update photo')}
                    className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white hover:bg-green-700 transition-colors"
                  >
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              {isEditing && (
                <SimpleButton
                  onClick={() => console.log('Change photo')}
                  variant="outline"
                  size="sm"
                  className="text-green-600 border-green-200 hover:bg-green-50"
                >
                  <Camera className="w-4 h-4 mr-2" />
                  {content.updatePhoto || 'Update Photo'}
                </SimpleButton>
              )}
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {content.fullName}
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  disabled={!isEditing}
                  placeholder={content.namePlaceholder}
                  className="w-full pl-12 h-12 border-2 border-gray-200 focus:border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {content.phoneNumber}
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={!isEditing}
                  placeholder={content.phonePlaceholder}
                  className="w-full pl-12 h-12 border-2 border-gray-200 focus:border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {content.email}
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={!isEditing}
                  placeholder={content.emailPlaceholder}
                  className="w-full pl-12 h-12 border-2 border-gray-200 focus:border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {content.dateOfBirth}
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                  disabled={!isEditing}
                  className="w-full pl-12 h-12 border-2 border-gray-200 focus:border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {content.address}
              </label>
              <textarea
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                disabled={!isEditing}
                placeholder={content.addressPlaceholder}
                rows={3}
                className="w-full p-3 border-2 border-gray-200 focus:border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-50 disabled:text-gray-600 resize-none"
              />
            </div>

            {/* City and State Row */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {content.city}
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  disabled={!isEditing}
                  placeholder={content.cityPlaceholder}
                  className="w-full h-12 px-3 border-2 border-gray-200 focus:border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-50 disabled:text-gray-600"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  {content.state}
                </label>
                <select
                  value={formData.state}
                  onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  disabled={!isEditing}
                  className="w-full h-12 px-3 border-2 border-gray-200 focus:border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-50 disabled:text-gray-600 bg-white"
                >
                  <option value="">{content.statePlaceholder}</option>
                  {indianStates.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Pincode */}
            <div>
              <label className="block text-gray-700 font-medium mb-2">
                {content.pincode}
              </label>
              <input
                type="text"
                value={formData.pincode}
                onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                disabled={!isEditing}
                placeholder={content.pincodePlaceholder}
                maxLength={6}
                className="w-full h-12 px-3 border-2 border-gray-200 focus:border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:bg-gray-50 disabled:text-gray-600"
              />
            </div>

            {/* Save/Cancel Buttons */}
            {isEditing && (
              <div className="flex space-x-3 pt-4">
                <SimpleButton
                  onClick={handleSaveProfile}
                  disabled={isLoading}
                  className="flex-1 h-12"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Saving...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <Save className="w-4 h-4" />
                      <span>{content.saveChanges}</span>
                    </div>
                  )}
                </SimpleButton>
                <SimpleButton
                  onClick={() => setIsEditing(false)}
                  variant="outline"
                  className="flex-1 h-12"
                >
                  {content.cancelEditing}
                </SimpleButton>
              </div>
            )}
          </div>
        </div>


      </div>
    </div>
  );
}