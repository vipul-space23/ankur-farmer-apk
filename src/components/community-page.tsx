import React, { useState } from 'react';
import { Camera, Send, Heart, MessageCircle, Share, Plus, Users, TrendingUp, Search } from 'lucide-react';
import { Language, User, Screen } from '../App';
import { SimpleButton } from './simple-button';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface CommunityPageProps {
  selectedLanguage: Language | null;
  user: User | null;
  onNavigate: (screen: Screen, ...args: any[]) => void;
}

const communityContent = {
  en: {
    title: "Farmer Community",
    subtitle: "Connect with fellow farmers",
    sharePost: "Share Your Experience",
    whatHappening: "What's happening on your farm?",
    addPhoto: "Add Photo",
    post: "Post",
    search: "Search discussions...",
    trending: "Trending Topics",
    groups: "Popular Groups",
    recentPosts: "Recent Posts",
    likes: "likes",
    comments: "comments",
    shares: "shares",
    joinGroup: "Join",
    cropProblems: "Crop Problems & Solutions",
    weatherDiscussion: "Weather Discussion",
    organicFarming: "Organic Farming",
    governmentSchemes: "Government Schemes",
    members: "members",
    posts: "posts"
  },
  hi: {
    title: "किसान समुदाय",
    subtitle: "साथी किसानों से जुड़ें",
    sharePost: "अपना अनुभव साझा करें",
    whatHappening: "आपके खेत में क्या हो रहा है?",
    addPhoto: "फोटो जोड़ें",
    post: "पोस्ट करें",
    search: "चर्चा खोजें...",
    trending: "ट्रेंडिंग विषय",
    groups: "लोकप्रिय समूह",
    recentPosts: "हाल की पोस्ट",
    likes: "लाइक",
    comments: "टिप्पणी",
    shares: "शेयर",
    joinGroup: "जुड़ें",
    cropProblems: "फसल समस्या और समाधान",
    weatherDiscussion: "मौसम चर्चा",
    organicFarming: "जैविक खेती",
    governmentSchemes: "सरकारी योजनाएं",
    members: "सदस्य",
    posts: "पोस्ट"
  }
};

const mockPosts = [
  {
    id: '1',
    author: 'Rajesh Kumar',
    location: 'Pune, Maharashtra',
    time: '2 hours ago',
    content: 'Great harvest this season! Rice yield was 25% higher than last year. Used organic fertilizers.',
    contentHi: 'इस सीजन बेहतरीन फसल! चावल की उपज पिछले साल से 25% अधिक थी। जैविक उर्वरकों का उपयोग किया।',
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=400',
    likes: 24,
    comments: 8,
    shares: 3
  },
  {
    id: '2',
    author: 'Priya Sharma', 
    location: 'Nashik, Maharashtra',
    time: '5 hours ago',
    content: 'Anyone else facing leaf curl in tomatoes? Looking for organic solutions.',
    contentHi: 'क्या किसी और को टमाटर में पत्ती मुड़ने की समस्या है? जैविक समाधान खोज रहा हूं।',
    image: null,
    likes: 12,
    comments: 15,
    shares: 2
  },
  {
    id: '3',
    author: 'Arjun Patel',
    location: 'Ahmednagar, Maharashtra', 
    time: '1 day ago',
    content: 'Government subsidy application for drip irrigation approved! Sharing the process.',
    contentHi: 'ड्रिप सिंचाई के लिए सरकारी सब्सिडी आवेदन स्वीकृत! प्रक्रिया साझा कर रहा हूं।',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400',
    likes: 35,
    comments: 12,
    shares: 8
  }
];

const mockGroups = [
  {
    id: '1',
    name: 'Crop Problems & Solutions',
    nameHi: 'फसल समस्या और समाधान',
    members: 2847,
    posts: 156,
    icon: '🌾'
  },
  {
    id: '2', 
    name: 'Weather Discussion',
    nameHi: 'मौसम चर्चा',
    members: 1523,
    posts: 89,
    icon: '🌤️'
  },
  {
    id: '3',
    name: 'Organic Farming',
    nameHi: 'जैविक खेती',
    members: 1876,
    posts: 234,
    icon: '🌱'
  },
  {
    id: '4',
    name: 'Government Schemes',
    nameHi: 'सरकारी योजनाएं',
    members: 3421,
    posts: 78,
    icon: '🏛️'
  }
];

export function CommunityPage({ selectedLanguage, user, onNavigate }: CommunityPageProps) {
  const [postText, setPostText] = useState('');
  const [showPostDialog, setShowPostDialog] = useState(false);

  const langCode = selectedLanguage?.code || 'en';
  const content = communityContent[langCode as keyof typeof communityContent] || communityContent.en;

  const handleLike = (postId: string) => {
    // Handle like functionality
    console.log('Liked post:', postId);
  };

  const handleComment = (postId: string) => {
    // Handle comment functionality
    console.log('Comment on post:', postId);
  };

  const handleShare = (postId: string) => {
    // Handle share functionality
    console.log('Share post:', postId);
  };

  const handleJoinGroup = (groupId: string) => {
    // Handle join group functionality
    console.log('Join group:', groupId);
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="bg-green-600 text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-xl font-bold">{content.title}</h1>
            <p className="text-green-100">{content.subtitle}</p>
          </div>
          <SimpleButton
            onClick={() => onNavigate('community-post')}
            className="bg-green-600 text-white hover:bg-green-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            {content.post}
          </SimpleButton>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder={content.search}
            className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none border-2 border-white focus:border-green-100"
          />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Popular Groups */}
        <div className="p-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-3">{content.groups}</h2>
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {mockGroups.map((group) => (
              <div key={group.id} className="min-w-[180px] bg-white rounded-xl border border-gray-200 p-4">
                <div className="text-center">
                  <div className="text-2xl mb-2">{group.icon}</div>
                  <h3 className="font-medium text-gray-800 text-sm mb-2">
                    {langCode === 'hi' ? group.nameHi : group.name}
                  </h3>
                  <div className="text-xs text-gray-600 mb-3">
                    <div>{group.members.toLocaleString()} {content.members}</div>
                    <div>{group.posts} {content.posts}</div>
                  </div>
                  <SimpleButton
                    onClick={() => handleJoinGroup(group.id)}
                    size="sm"
                    className="w-full bg-green-600 hover:bg-green-700 text-white"
                  >
                    {content.joinGroup}
                  </SimpleButton>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Posts */}
        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">{content.recentPosts}</h2>
          <div className="space-y-4">
            {mockPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-xl border border-gray-200 p-4">
                {/* Post Header */}
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Users className="w-6 h-6 text-green-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">{post.author}</h3>
                    <div className="flex items-center space-x-2 text-sm text-gray-600">
                      <span>{post.location}</span>
                      <span>•</span>
                      <span>{post.time}</span>
                    </div>
                  </div>
                </div>

                {/* Post Content */}
                <p className="text-gray-800 mb-3">
                  {langCode === 'hi' ? post.contentHi : post.content}
                </p>

                {/* Post Image */}
                {post.image && (
                  <div className="mb-3 rounded-lg overflow-hidden">
                    <ImageWithFallback
                      src={post.image}
                      alt="Post image"
                      className="w-full h-48 object-cover"
                    />
                  </div>
                )}

                {/* Post Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <SimpleButton
                    onClick={() => handleLike(post.id)}
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 text-gray-600 hover:text-red-500"
                  >
                    <Heart className="w-4 h-4" />
                    <span>{post.likes} {content.likes}</span>
                  </SimpleButton>

                  <SimpleButton
                    onClick={() => handleComment(post.id)}
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 text-gray-600 hover:text-blue-500"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments} {content.comments}</span>
                  </SimpleButton>

                  <SimpleButton
                    onClick={() => handleShare(post.id)}
                    variant="ghost"
                    size="sm"
                    className="flex items-center space-x-2 text-gray-600 hover:text-green-500"
                  >
                    <Share className="w-4 h-4" />
                    <span>{post.shares} {content.shares}</span>
                  </SimpleButton>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Create Post Dialog */}
      {showPostDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-end z-50">
          <div className="bg-white w-full rounded-t-xl p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-800">{content.sharePost}</h3>
              <SimpleButton
                onClick={() => setShowPostDialog(false)}
                variant="ghost"
                size="icon"
                className="text-gray-500"
              >
                ×
              </SimpleButton>
            </div>

            <textarea
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              placeholder={content.whatHappening}
              className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
            />

            <div className="flex items-center justify-between">
              <SimpleButton
                variant="outline"
                className="flex items-center space-x-2"
              >
                <Camera className="w-4 h-4" />
                <span>{content.addPhoto}</span>
              </SimpleButton>

              <SimpleButton
                onClick={() => {
                  if (postText.trim()) {
                    console.log('Post created:', postText);
                    setPostText('');
                    setShowPostDialog(false);
                  }
                }}
                disabled={!postText.trim()}
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                <Send className="w-4 h-4 mr-2" />
                {content.post}
              </SimpleButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}