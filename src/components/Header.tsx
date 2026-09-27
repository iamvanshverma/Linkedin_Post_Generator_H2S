import React from 'react';
import { PersonaMode, TabType } from '../types';

interface HeaderProps {
  mode: PersonaMode;
  onModeChange: (mode: PersonaMode) => void;
  activeTab: TabType;
  onProfileClick: () => void;
  authorAvatar: string;
}

export const Header: React.FC<HeaderProps> = ({
  mode,
  onModeChange,
  activeTab,
  onProfileClick,
  authorAvatar,
}) => {
  const getSubBadge = () => {
    if (activeTab === 'queue') return 'Content Queue';
    if (activeTab === 'analytics') return 'Live Analytics';
    if (activeTab === 'agenda') return 'Summit Agenda';
    return mode === 'organizer' ? 'Live Studio' : 'Post Creator';
  };

  return (
    <header className="fixed top-0 w-full z-50 bg-[#f9f9ff]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)] pt-[env(safe-area-inset-top,0px)]">
      <div className="h-28 px-4 flex flex-col justify-between py-1 max-w-2xl mx-auto">
        {/* Top Brand Bar */}
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-2">
            <img
              alt="EventPulse Logo"
              className="h-8 w-auto object-contain transition-transform hover:scale-105"
              src="https://lh3.googleusercontent.com/aida/AEtjO1V9UACwo1pw3Ul33EOls0AfXmrlPFd9hEtP_b9OqMuEJ1Hh6uLqv-jjc6vdSJTiOhLFv757a3is4VGgY3-_k67AoKTxZwZ7i-4Fv_BmYPgu_3g4aJ2vpoPIB8_yg9JQL-WMxRe5uE1ZG58j4hhQJwQGfJXjAgrPuHNzQycNX6vOsRGrVuzKPFgd8l2qBkpVfErmxVnT1yN1TMIfUdEy9DTC10Yu6K2Ib5fUP6cI_WYeszoofEs3ZwBYdA"
            />
            <div className="flex items-center gap-1.5">
              <span className="font-['Plus_Jakarta_Sans'] font-semibold text-lg text-[#151c27] tracking-tight">
                EventPulse
              </span>
              <span className="px-2 py-0.5 rounded-full bg-[#8a3b94]/10 text-[#8a3b94] font-['Plus_Jakarta_Sans'] text-[11px] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#8a3b94] animate-pulse"></span>
                Live
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="h-6 flex items-center px-2.5 rounded-full bg-[#e2e8f8]">
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold text-[#4f434e] truncate max-w-[105px]">
                {getSubBadge()}
              </span>
            </div>
            <button
              onClick={onProfileClick}
              title="Profile & Settings"
              className="w-8 h-8 rounded-full bg-[#8a3b94] overflow-hidden flex items-center justify-center text-white shadow-sm ring-2 ring-[#ffd6fd]/50 hover:opacity-90 transition-all active:scale-95"
            >
              {authorAvatar ? (
                <img src={authorAvatar} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                <span className="material-symbols-outlined text-[18px]">person</span>
              )}
            </button>
          </div>
        </div>

        {/* Persona Switcher Tab */}
        <div className="h-11 flex items-center justify-center">
          <div className="flex w-full bg-[#e2e8f8] p-1 rounded-full relative">
            <button
              onClick={() => onModeChange('organizer')}
              type="button"
              className={`flex-1 py-1.5 px-3 rounded-full text-center font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-all duration-200 ${
                mode === 'organizer'
                  ? 'bg-white text-[#8a3b94] shadow-sm'
                  : 'text-[#4f434e] hover:text-[#151c27]'
              }`}
            >
              Organizer
            </button>
            <button
              onClick={() => onModeChange('attendee')}
              type="button"
              className={`flex-1 py-1.5 px-3 rounded-full text-center font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-all duration-200 ${
                mode === 'attendee'
                  ? 'bg-white text-[#8a3b94] shadow-sm'
                  : 'text-[#4f434e] hover:text-[#151c27]'
              }`}
            >
              Attendee View
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
