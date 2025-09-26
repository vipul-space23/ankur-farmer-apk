// src/components/HarvestPrediction.tsx

import React, { useState } from 'react';
import { SimpleButton } from './simple-button'; // Assuming path is correct

export function HarvestPrediction() {
  const [cropName, setCropName] = useState('');
  const [harvestDate, setHarvestDate] = useState('');
  const [predictedDay, setPredictedDay] = useState<string | null>(null);

  // This function will eventually call your backend API
  const handlePredict = () => {
    // Basic validation
    if (!cropName || !harvestDate) {
      alert('Please enter both crop name and harvest date.');
      return;
    }
    
    console.log('Predicting for:', { cropName, harvestDate });
    // --- API Call Goes Here ---
    // For now, we'll just set a mock result
    setPredictedDay('October 28, 2025 (Clear skies, optimal moisture)');
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white mt-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        🗓️ Predict Best Harvest Day
      </h3>
      <div className="space-y-4">
        <div>
          <label htmlFor="crop-name" className="block text-sm font-medium text-gray-700">
            Crop Name
          </label>
          <input
            type="text"
            id="crop-name"
            value={cropName}
            onChange={(e) => setCropName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
            placeholder="e.g., Wheat, Tomato"
          />
        </div>
        <div>
          <label htmlFor="harvest-date" className="block text-sm font-medium text-gray-700">
            Estimated Harvest Date
          </label>
          <input
            type="date"
            id="harvest-date"
            value={harvestDate}
            onChange={(e) => setHarvestDate(e.target.value)}
            className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
          />
        </div>
        <SimpleButton onClick={handlePredict} className="w-full bg-green-600 text-white hover:bg-green-700">
          Predict
        </SimpleButton>

        {predictedDay && (
          <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-500 rounded-r-lg">
            <p className="font-semibold text-green-800">Optimal Harvest Day:</p>
            <p className="text-green-700">{predictedDay}</p>
          </div>
        )}
      </div>
    </div>
  );
}