  import React from 'react';
  import { ScanLine } from 'lucide-react';

  interface ScanButtonProps {
    onClick: () => void;
  }

  /**
   * A dedicated, centrally-located scan button.
   * It's designed to stand out from the other navigation items.
   */
  export function ScanButton({ onClick }: ScanButtonProps) {
    return (
      <button
        onClick={onClick}
        className="bg-green-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-110"
        aria-label="Scan QR Code"
      >
        <ScanLine className="w-8 h-8" />
      </button>
    );
  }
