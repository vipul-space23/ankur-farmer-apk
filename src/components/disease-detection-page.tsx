import React, { useState, useRef } from 'react';
import { Camera, Upload, AlertCircle, CheckCircle, X, RotateCcw } from 'lucide-react';
import { Language, Screen } from '../App';
import { SimpleButton } from './simple-button';
import { AppHeader } from './app-header';

interface DiseaseDetectionPageProps {
  selectedLanguage: Language | null;
  onNavigate: (screen: Screen) => void;
  onLanguageChange: (language: Language) => void;
}

const diseaseContent = {
  en: {
    title: "Disease Detection",
    subtitle: "AI-powered plant disease identification",
    takePhoto: "Take Photo",
    uploadPhoto: "Upload Photo",
    analyzeImage: "Analyze Image",
    retakePhoto: "Retake Photo",
    analyzing: "Analyzing...",
    results: "Detection Results",
    confidence: "Confidence",
    treatment: "Recommended Treatment",
    prevention: "Prevention Tips",
    noResults: "No disease detected",
    healthy: "Plant appears healthy",
    instructions: "Instructions",
    step1: "1. Hold camera steady and focus on affected area",
    step2: "2. Ensure good lighting for clear image",
    step3: "3. Capture close-up of diseased leaves or parts",
    step4: "4. Wait for AI analysis results"
  },
  hi: {
    title: "रोग जांच",
    subtitle: "AI-आधारित पौधों की बीमारी की पहचान",
    takePhoto: "फोटो लें",
    uploadPhoto: "फोटो अपलोड करें",
    analyzeImage: "छवि का विश्लेषण करें",
    retakePhoto: "फिर से फोटो लें",
    analyzing: "विश्लेषण हो रहा है...",
    results: "जांच परिणाम",
    confidence: "विश्वास स्तर",
    treatment: "अनुशंसित उपचार",
    prevention: "रोकथाम सुझाव",
    noResults: "कोई बीमारी नहीं मिली",
    healthy: "पौधा स्वस्थ दिखाई देता है",
    instructions: "निर्देश",
    step1: "1. कैमरा स्थिर रखें और प्रभावित क्षेत्र पर फोकस करें",
    step2: "2. स्पष्ट छवि के लिए अच्छी रोशनी सुनिश्चित करें",
    step3: "3. रोगग्रस्त पत्तियों या भागों का क्लोज-अप लें",
    step4: "4. AI विश्लेषण परिणामों की प्रतीक्षा करें"
  }
};

// Mock disease data
const mockDiseases = [
  {
    name: "Late Blight",
    hindiName: "अंतिम झुलसा",
    confidence: 89,
    severity: "High",
    treatment: [
      "Apply copper-based fungicide immediately",
      "Remove infected plant parts",
      "Improve air circulation around plants",
      "Avoid overhead watering"
    ],
    prevention: [
      "Use resistant varieties",
      "Ensure proper plant spacing",
      "Water at soil level",
      "Apply preventive fungicide sprays"
    ]
  },
  {
    name: "Powdery Mildew",
    hindiName: "सफेद पाउडर फफूंद",
    confidence: 76,
    severity: "Medium",
    treatment: [
      "Spray with baking soda solution",
      "Apply sulfur-based fungicide",
      "Remove affected leaves",
      "Increase air circulation"
    ],
    prevention: [
      "Avoid overcrowding plants",
      "Water in morning",
      "Prune for better air flow",
      "Choose resistant varieties"
    ]
  },
  {
    name: "Leaf Spot",
    hindiName: "पत्ती धब्बा",
    confidence: 82,
    severity: "Medium",
    treatment: [
      "Remove infected leaves immediately",
      "Apply copper fungicide",
      "Avoid wetting leaves while watering",
      "Ensure good drainage"
    ],
    prevention: [
      "Rotate crops annually",
      "Use drip irrigation",
      "Clean garden tools regularly",
      "Plant disease-resistant varieties"
    ]
  }
];

export function DiseaseDetectionPage({ selectedLanguage, onNavigate, onLanguageChange }: DiseaseDetectionPageProps) {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResults, setAnalysisResults] = useState<any>(null);
  const [showCamera, setShowCamera] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const langCode = selectedLanguage?.code || 'en';
  const content = diseaseContent[langCode as keyof typeof diseaseContent] || diseaseContent.en;

  const startCamera = async () => {
    try {
      setCameraError(null);
      setShowCamera(true);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Camera access denied:', error);
      setCameraError(langCode === 'hi' 
        ? 'कैमरा की अनुमति आवश्यक है। कृपया अपनी ब्राउज़र सेटिंग्स में कैमरा की अनुमति दें।'
        : 'Camera permission is required. Please allow camera access in your browser settings.'
      );
      setShowCamera(false);
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      const context = canvas.getContext('2d');
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      if (context) {
        context.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        
        // Stop camera
        const stream = video.srcObject as MediaStream;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        setShowCamera(false);
      }
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = () => {
    if (!capturedImage) return;
    
    setIsAnalyzing(true);
    setAnalysisResults(null);
    
    // Simulate AI analysis
    setTimeout(() => {
      const randomDisease = mockDiseases[Math.floor(Math.random() * mockDiseases.length)];
      const isHealthy = Math.random() > 0.7;
      
      if (isHealthy) {
        setAnalysisResults({ healthy: true });
      } else {
        setAnalysisResults(randomDisease);
      }
      setIsAnalyzing(false);
    }, 3000);
  };

  const resetDetection = () => {
    setCapturedImage(null);
    setAnalysisResults(null);
    setIsAnalyzing(false);
    setShowCamera(false);
    setCameraError(null);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity?.toLowerCase()) {
      case 'high': return 'text-red-600 bg-red-50';
      case 'medium': return 'text-yellow-600 bg-yellow-50';
      case 'low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <AppHeader
        title={content.title}
        selectedLanguage={selectedLanguage}
        onLanguageChange={onLanguageChange}
        onBack={() => onNavigate('home')}
      />
      <div className="bg-green-600 text-white px-6 pb-2">
        <p className="text-green-100">{content.subtitle}</p>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto">
        {/* Camera Error */}
        {cameraError && (
          <div className="bg-red-50 rounded-lg border border-red-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-red-800 mb-4 flex items-center">
              <AlertCircle className="w-6 h-6 mr-2" />
              Camera Access Required
            </h2>
            <p className="text-red-700 mb-4">{cameraError}</p>
            <SimpleButton
              onClick={() => setCameraError(null)}
              variant="outline"
              className="border-red-300 text-red-700 hover:bg-red-50"
            >
              Try Again
            </SimpleButton>
          </div>
        )}

        {/* Instructions */}
        {!capturedImage && !showCamera && !cameraError && (
          <div className="bg-blue-50 rounded-lg border border-blue-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-blue-800 mb-4 flex items-center">
              <AlertCircle className="w-6 h-6 mr-2" />
              {content.instructions}
            </h2>
            <div className="space-y-3">
              <p className="text-blue-700">{content.step1}</p>
              <p className="text-blue-700">{content.step2}</p>
              <p className="text-blue-700">{content.step3}</p>
              <p className="text-blue-700">{content.step4}</p>
            </div>
          </div>
        )}

        {/* Camera View */}
        {showCamera && (
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
            <div className="relative">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="w-full rounded-lg"
              />
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-4">
                <SimpleButton
                  onClick={capturePhoto}
                  className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4"
                >
                  <Camera className="w-6 h-6" />
                </SimpleButton>
                <SimpleButton
                  onClick={() => setShowCamera(false)}
                  variant="outline"
                  className="rounded-full p-4"
                >
                  <X className="w-6 h-6" />
                </SimpleButton>
              </div>
            </div>
          </div>
        )}

        {/* Captured Image */}
        {capturedImage && (
          <div className="bg-white rounded-lg shadow-sm border p-4 mb-6">
            <img
              src={capturedImage}
              alt="Captured plant"
              className="w-full rounded-lg mb-4"
            />
            <div className="flex space-x-3">
              <SimpleButton
                onClick={analyzeImage}
                disabled={isAnalyzing}
                className="flex-1"
              >
                {isAnalyzing ? (
                  <div className="flex items-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{content.analyzing}</span>
                  </div>
                ) : (
                  content.analyzeImage
                )}
              </SimpleButton>
              <SimpleButton
                onClick={resetDetection}
                variant="outline"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                {content.retakePhoto}
              </SimpleButton>
            </div>
          </div>
        )}

        {/* Analysis Results */}
        {analysisResults && (
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{content.results}</h2>
            
            {analysisResults.healthy ? (
              <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-8 h-8 text-green-600" />
                <div>
                  <h3 className="font-medium text-green-800">{content.healthy}</h3>
                  <p className="text-sm text-green-600">{content.noResults}</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Disease Info */}
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-red-800">
                      {analysisResults.name}
                      {langCode === 'hi' && ` (${analysisResults.hindiName})`}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded text-sm ${getSeverityColor(analysisResults.severity)}`}>
                        {analysisResults.severity}
                      </span>
                      <span className="text-sm text-gray-600">
                        {content.confidence}: {analysisResults.confidence}%
                      </span>
                    </div>
                  </div>
                </div>

                {/* Treatment */}
                <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                  <h3 className="font-medium text-orange-800 mb-3">{content.treatment}</h3>
                  <div className="space-y-2">
                    {analysisResults.treatment.map((treatment: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700">{treatment}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Prevention */}
                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-medium text-blue-800 mb-3">{content.prevention}</h3>
                  <div className="space-y-2">
                    {analysisResults.prevention.map((tip: string, index: number) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                        <p className="text-gray-700">{tip}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {!capturedImage && !showCamera && !cameraError && (
          <div className="space-y-4">
            <SimpleButton
              onClick={startCamera}
              className="w-full h-16 flex items-center justify-center space-x-3"
            >
              <Camera className="w-6 h-6" />
              <span>{content.takePhoto}</span>
            </SimpleButton>
            
            <SimpleButton
              onClick={() => fileInputRef.current?.click()}
              variant="outline"
              className="w-full h-16 flex items-center justify-center space-x-3"
            >
              <Upload className="w-6 h-6" />
              <span>{content.uploadPhoto}</span>
            </SimpleButton>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}

        {/* Upload-only buttons when camera error */}
        {cameraError && !capturedImage && (
          <div className="space-y-4">
            <SimpleButton
              onClick={() => fileInputRef.current?.click()}
              className="w-full h-16 flex items-center justify-center space-x-3"
            >
              <Upload className="w-6 h-6" />
              <span>{content.uploadPhoto}</span>
            </SimpleButton>
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        )}

        {/* Hidden canvas for photo capture */}
        <canvas ref={canvasRef} className="hidden" />
      </div>
    </div>
  );
}