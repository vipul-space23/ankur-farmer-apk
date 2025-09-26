import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  Phone,
  Search,
  X,
  ArrowLeft,
} from "lucide-react";
import { Language, User, Screen } from "../App";
import { SimpleButton } from "./simple-button";
import { Map, Marker } from "pigeon-maps";

// Added a custom style for the pulsing effect
const pulseAnimation = `
@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  70% {
    transform: scale(1.5);
    opacity: 0;
  }
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
`;

interface MarketPageProps {
  selectedLanguage: Language | null;
  user: User | null;
  onNavigate: (screen: Screen, ...args: any[]) => void;
}

const marketContent = {
  en: {
    title: "Agro Market & College Locator",
    subtitle: "Find nearby agricultural stores & colleges",
    searchShops: "Search locations...",
    fertilizers: "Fertilizers",
    pesticides: "Pesticides",
    seeds: "Seeds",
    tools: "Tools",
    agri_colleges: "Agricultural Colleges", // New Translation Key
    km: "km away",
    call: "Call",
    directions: "Directions",
    products: "Products",
    rating: "Rating",
    open: "Open",
    opensAt: "Opens at",
    address: "Address",
    keyPrograms: "Key Programmes",
  },
  hi: {
    title: "कृषि बाजार और कॉलेज लोकेटर",
    subtitle: "आस-पास के कृषि स्टोर और कॉलेज खोजें",
    searchShops: "स्थान खोजें...",
    fertilizers: "उर्वरक",
    pesticides: "कीटनाशक",
    seeds: "बीज",
    tools: "उपकरण",
    agri_colleges: "कृषि कॉलेज", // New Translation Key
    km: "किमी दूर",
    call: "कॉल करें",
    directions: "दिशानिर्देश",
    products: "उत्पाद",
    rating: "रेटिंग",
    open: "खुला",
    opensAt: "खुलता है",
    address: "पता",
    keyPrograms: "मुख्य कार्यक्रम",
  },
};

// Data for Shops
const mockShops = [
    {
      id: "s1",
      name: "Utkal Pesticides Agency", nameHi: "उत्कल कीटनाशक एजेंसी",
      address: "Lewis Road, Bhubaneswar", addressHi: "लेविस रोड, भुवनेश्वर",
      distance: 1.5, phone: "+91 9876543210", rating: 4.6, isOpen: true, openTime: "9:00 AM", closeTime: "7:00 PM",
      products: ["pesticides", "tools"], primaryProduct: "pesticides", latitude: 20.2523, longitude: 85.834, type: 'shop'
    },
    {
      id: "s2",
      name: "Mahabir Fertilizers and Pesticides", nameHi: "महावीर फर्टिलाइजर्स एंड पेस्टिसाइड्स",
      address: "Rasulgarh, Bhubaneswar", addressHi: "रसूलगढ़, भुवनेश्वर",
      distance: 2.8, phone: "+91 9876543211", rating: 4.2, isOpen: true, openTime: "8:00 AM", closeTime: "8:00 PM",
      products: ["fertilizers", "pesticides", "seeds"], primaryProduct: "fertilizers", latitude: 20.282, longitude: 85.8512, type: 'shop'
    },
    {
      id: "s4",
      name: "Mahavir Fertilizers Pesticides Store", nameHi: "महावीर फर्टिलाइजर्स पेस्टिसाइड्स स्टोर",
      address: "Samantarapur, Bhubaneswar", addressHi: "सामंतरापुर, भुवनेश्वर",
      distance: 4.5, phone: "+91 9876543213", rating: 4.8, isOpen: true, openTime: "7:30 AM", closeTime: "9:00 PM",
      products: ["fertilizers", "pesticides", "seeds", "tools"], primaryProduct: "fertilizers", latitude: 20.2328, longitude: 85.8351, type: 'shop'
    },
    {
      id: "s5",
      name: "Utkal Machinery Agencies", nameHi: "उत्कल मशीनरी एजेंसियां",
      address: "Bhubaneswar", addressHi: "भुवनेश्वर",
      distance: 2.2, phone: "+91 9876543214", rating: 4.3, isOpen: true, openTime: "9:30 AM", closeTime: "7:30 PM",
      products: ["tools"], primaryProduct: "tools", latitude: 20.291, longitude: 85.816, type: 'shop'
    },
    {
      id: "s6",
      name: "Utkal Seeds and Nursery", nameHi: "उत्कल बीज और नर्सरी",
      address: "Surya Nagar, Bhubaneswar", addressHi: "सूर्य नगर, भुवनेश्वर",
      distance: 1.8, phone: "+91 9876543215", rating: 4.7, isOpen: true, openTime: "8:00 AM", closeTime: "6:00 PM",
      products: ["seeds", "fertilizers"], primaryProduct: "seeds", latitude: 20.264, longitude: 85.828, type: 'shop'
    },
    {
      id: "s7",
      name: "SR Seeds and Nursery", nameHi: "एसआर बीज और नर्सरी",
      address: "Rasulgarh, Bhubaneswar", addressHi: "रसूलगढ़, भुवनेश्वर",
      distance: 2.9, phone: "+91 9876543216", rating: 4.4, isOpen: true, openTime: "8:30 AM", closeTime: "7:00 PM",
      products: ["seeds"], primaryProduct: "seeds", latitude: 20.284, longitude: 85.853, type: 'shop'
    },
    {
      id: "s9",
      name: "Sahoo Agro Chemicals", nameHi: "साहू एग्रो केमिकल्स",
      address: "Roxy Lane, Cuttack", addressHi: "रॉक्सी लेन, कटक",
      distance: 25.0, phone: "+91 9876543218", rating: 4.5, isOpen: true, openTime: "9:00 AM", closeTime: "7:30 PM",
      products: ["pesticides", "fertilizers"], primaryProduct: "pesticides", latitude: 20.4625, longitude: 85.883, type: 'shop'
    },
];

// Data for Colleges
const mockColleges = [
    {
      id: "c1",
      name: "Odisha University of Agriculture & Technology (OUAT)", nameHi: "उड़ीसा कृषि और प्रौद्योगिकी विश्वविद्यालय (ओयूएटी)",
      address: "Bhubaneswar", addressHi: "भुवनेश्वर",
      keyPrograms: "Agriculture, Veterinary Science, Fisheries, Forestry, Horticulture",
      latitude: 20.2707, longitude: 85.8166, primaryProduct: "agri_colleges", type: 'college'
    },
    {
      id: "c2",
      name: "College of Agriculture, Chipilima", nameHi: "कृषि महाविद्यालय, चिपिलिमा",
      address: "Chipilima, Sambalpur", addressHi: "चिपिलिमा, संबलपुर",
      keyPrograms: "B.Sc (Hons) Agriculture",
      latitude: 21.3663, longitude: 83.9169, primaryProduct: "agri_colleges", type: 'college'
    },
    {
      id: "c3",
      name: "College of Agriculture, Bhawanipatna", nameHi: "कृषि महाविद्यालय, भवानीपटना",
      address: "Bhawanipatna, Kalahandi", addressHi: "भवानीपटना, कालाहांडी",
      keyPrograms: "B.Sc (Hons) Agriculture",
      latitude: 19.9079, longitude: 83.1614, primaryProduct: "agri_colleges", type: 'college'
    },
    {
      id: "c4",
      name: "College of Fisheries, Rangeilunda", nameHi: "मत्स्य विज्ञान महाविद्यालय, रंगीलुंडा",
      address: "Rangeilunda, near Brahmapur", addressHi: "रंगीगुंडा, ब्रह्मपुर के पास",
      keyPrograms: "Fisheries Sciences, Aquaculture",
      latitude: 19.2555, longitude: 84.8519, primaryProduct: "agri_colleges", type: 'college'
    },
];

// Combined data for all map points
const allMapPoints = [...mockShops, ...mockColleges];

// UPDATED: Added 'agri_colleges' type
const pointTypes = [
  { key: "fertilizers", icon: "🧪", color: "bg-green-500", name: "Fertilizers" },
  { key: "pesticides", icon: "🦠", color: "bg-red-500", name: "Pesticides" },
  { key: "seeds", icon: "🌱", color: "bg-yellow-500", name: "Seeds" },
  { key: "tools", icon: "🔧", color: "bg-blue-500", name: "Tools" },
];

export function MarketPage({
  selectedLanguage,
  user,
  onNavigate,
}: MarketPageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPoint, setSelectedPoint] = useState<any>(null);

  const langCode = selectedLanguage?.code || "en";
  const content = marketContent[langCode as keyof typeof marketContent] || marketContent.en;

  const handleCall = (phone: string) => window.open(`tel:${phone}`, "_self");
  const handleDirections = (pointName: string) => console.log("Get directions to:", pointName);

  const getPinColor = (primaryProduct: string) => {
    const pointType = pointTypes.find((p) => p.key === primaryProduct);
    switch (pointType?.color) {
      case "bg-green-500": return "#22C55E";
      case "bg-red-500": return "#EF4444";
      case "bg-yellow-500": return "#EAB308";
      case "bg-blue-500": return "#3B82F6";
      case "bg-purple-500": return "#A855F7";
      default: return "#A855F7";
    }
  };

  const getProductIcon = (product: string) => {
    const productType = pointTypes.find((p) => p.key === product);
    return productType?.icon || "📦";
  };

  const getShopStatus = (shop: any) => {
    if (shop.isOpen) {
      return { text: content.open, badge: "bg-green-100 text-green-800" };
    } else {
      return { text: `${content.opensAt} ${shop.openTime}`, badge: "bg-red-100 text-red-800" };
    }
  };

  const filteredPoints = allMapPoints.filter((point) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      point.name.toLowerCase().includes(query) ||
      (point.nameHi && point.nameHi.includes(searchQuery)) ||
      point.address.toLowerCase().includes(query)
    );
  });

  return (
    <div className="flex flex-col h-full bg-white relative">
      <style>{pulseAnimation}</style>

      {/* Header */}
      <div className="bg-green-600 text-white p-4 relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <SimpleButton onClick={() => onNavigate("new-dashboard")} variant="ghost" size="sm" className="text-white hover:bg-white/20 p-2">
              <ArrowLeft className="w-5 h-5" />
            </SimpleButton>
            <div>
              <h1 className="text-lg font-bold indian-text">{content.title}</h1>
              <p className="text-green-100 text-sm indian-text">{content.subtitle}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-green-100 text-sm">
            <MapPin className="w-4 h-4" />
            <span>{filteredPoints.length}</span>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} placeholder={content.searchShops} className="w-full pl-10 pr-4 py-2.5 rounded-lg text-gray-800 placeholder-gray-500 focus:outline-none text-sm border-2 border-white focus:border-green-100 indian-text" />
        </div>
      </div>

      {/* Map Area */}
      <div className="flex-1 relative">
        <Map
          // UPDATED: Centered on Bhubaneswar with a closer zoom
          defaultCenter={[20.2961, 85.8245]}
          defaultZoom={12}
          onClick={() => setSelectedPoint(null)}
        >
          {filteredPoints.map((point) => (
            <Marker key={point.id} anchor={[point.latitude, point.longitude]} color={getPinColor(point.primaryProduct)}
              onClick={({ event }) => {
                event.stopPropagation();
                setSelectedPoint(point);
              }}
            >
              {selectedPoint?.id === point.id && ( <div style={{ position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)", width: "30px", height: "30px", borderRadius: "50%", backgroundColor: getPinColor(point.primaryProduct), opacity: 0.6, animation: "pulse 1.5s infinite", zIndex: -1, }} /> )}
            </Marker>
          ))}
        </Map>
        <div className="absolute top-4 left-4 bg-white rounded-lg shadow-lg p-3 z-20">
          <div className="space-y-2">
            {pointTypes.map((type) => (
              <div key={type.key} className="flex items-center space-x-2 text-xs">
                <div className={`w-3 h-3 rounded-full ${type.color}`}></div>
                <span className="text-gray-700 indian-text">{content[type.key as keyof typeof content]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Details Panel */}
      {selectedPoint && (
        <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-xl shadow-2xl z-30 max-h-96 overflow-y-auto">
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-bold text-gray-800 indian-text">{langCode === "hi" ? selectedPoint.nameHi : selectedPoint.name}</h3>
              <SimpleButton onClick={() => setSelectedPoint(null)} variant="ghost" size="sm" className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </SimpleButton>
            </div>

            {/* Conditional Rendering based on type */}
            {selectedPoint.type === 'shop' ? (
              // Shop Details
              <div className="space-y-3">
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1"><MapPin className="w-4 h-4" /> <span className="indian-text">{selectedPoint.distance} {content.km}</span></div>
                  <div className="flex items-center space-x-1"><span>⭐ {selectedPoint.rating}</span></div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${getShopStatus(selectedPoint).badge} indian-text`}>{getShopStatus(selectedPoint).text}</div>
                </div>
                <p className="text-sm text-gray-600 indian-text">{langCode === "hi" ? selectedPoint.addressHi : selectedPoint.address}</p>
                <div>
                  <h4 className="text-sm font-medium text-gray-800 mb-2 indian-text">{content.products}:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedPoint.products.map((product: string) => (
                      <div key={product} className="flex items-center space-x-1 bg-gray-100 rounded-full px-3 py-1">
                        <span className="text-sm">{getProductIcon(product)}</span>
                        <span className="text-sm text-gray-700 indian-text">{content[product as keyof typeof content]}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex space-x-3 pt-3">
                  <SimpleButton onClick={() => handleCall(selectedPoint.phone)} className="flex-1 bg-green-600 hover:bg-green-700 text-white indian-text"> <Phone className="w-4 h-4 mr-2" />{content.call}</SimpleButton>
                  <SimpleButton onClick={() => handleDirections(selectedPoint.name)} variant="outline" className="flex-1 border-green-200 text-green-600 hover:bg-green-50 indian-text"><Navigation className="w-4 h-4 mr-2" />{content.directions}</SimpleButton>
                </div>
              </div>
            ) : (
              // College Details
              <div className="space-y-3">
                 <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="indian-text">{langCode === "hi" ? selectedPoint.addressHi : selectedPoint.address}</span>
                </div>
                <div>
                    <h4 className="text-sm font-medium text-gray-800 mb-2 indian-text">{content.keyPrograms}:</h4>
                    <p className="text-sm text-gray-600 indian-text">{selectedPoint.keyPrograms}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}