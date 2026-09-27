import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
  queueCount?: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({
  activeTab,
  onTabChange,
  queueCount = 3,
}) => {
  return (
    <nav className="fixed bottom-0 w-full z-50 pb-[env(safe-area-inset-bottom,0px)] bg-[#f9f9ff]/90 backdrop-blur-xl shadow-[0_-2px_10px_rgba(0,0,0,0.03)] border-t border-[#e2e8f8]">
      <div className="flex justify-around items-center h-16 px-2 max-w-2xl mx-auto">
        {/* Studio Tab */}
        <button
          onClick={() => onTabChange('studio')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors relative ${
            activeTab === 'studio' ? 'text-[#8a3b94] font-semibold' : 'text-[#4f434e] hover:text-[#151c27]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">auto_awesome</span>
          <span className="font-['Plus_Jakarta_Sans'] text-[11px] mt-0.5">Studio</span>
        </button>

        {/* Queue Tab with Badge */}
        <button
          onClick={() => onTabChange('queue')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors relative ${
            activeTab === 'queue' ? 'text-[#8a3b94] font-semibold' : 'text-[#4f434e] hover:text-[#151c27]'
          }`}
        >
          <div className="relative">
            <span className="material-symbols-outlined text-[24px]">dynamic_feed</span>
            {queueCount > 0 && (
              <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-[#8a3b94] text-white text-[10px] font-bold flex items-center justify-center">
                {queueCount}
              </span>
            )}
          </div>
          <span className="font-['Plus_Jakarta_Sans'] text-[11px] mt-0.5">Queue</span>
        </button>

        {/* Analytics Tab */}
        <button
          onClick={() => onTabChange('analytics')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors ${
            activeTab === 'analytics' ? 'text-[#8a3b94] font-semibold' : 'text-[#4f434e] hover:text-[#151c27]'
          }`}
        >
          <span className="material-symbols-outlined text-[24px]">insights</span>
          <span className="font-['Plus_Jakarta_Sans'] text-[11px] mt-0.5">Analytics</span>
        </button>

        {/* Agenda Tab */}
        <button
          onClick={() => onTabChange('agenda')}
          className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] transition-colors relative ${
            activeTab === 'agenda' ? 'text-[#8a3b94] font-semibold' : 'text-[#4f434e] hover:text-[#151c27]'
          }`}
        >
          <div className="relative">
            <span className="material-symbols-outlined text-[24px]">calendar_today</span>
            <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-emerald-500 ring-2 ring-white"></span>
          </div>
          <span className="font-['Plus_Jakarta_Sans'] text-[11px] mt-0.5">Agenda</span>
        </button>
      </div>
    </nav>
  );
};
