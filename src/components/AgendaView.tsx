import React from 'react';
import { AgendaSession } from '../types';

interface AgendaViewProps {
  sessions: AgendaSession[];
  onSelectSession: (session: AgendaSession) => void;
}

export const AgendaView: React.FC<AgendaViewProps> = ({ sessions, onSelectSession }) => {
  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 py-2 space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#8a3b94]/10 text-[#8a3b94]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8a3b94] animate-pulse"></span>
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold tracking-wide uppercase">
              Moscone Center Schedule
            </span>
          </div>
          <span className="text-[#4f434e] font-['Plus_Jakarta_Sans'] text-[11px] font-semibold">
            Oct 24-26, 2025
          </span>
        </div>

        <div className="flex flex-col">
          <h2 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#151c27] tracking-tight">
            Summit Keynotes &amp; Tracks
          </h2>
          <p className="font-['Inter'] text-xs text-[#4f434e]">
            Tap any session to instantly sync speaker quotes and keynote snaps into your Post Creator.
          </p>
        </div>
      </div>

      {/* Sessions List */}
      <div className="space-y-3.5">
        {sessions.map((session) => (
          <div
            key={session.id}
            className={`bg-white rounded-xl p-4 shadow-sm border transition-all space-y-3 ${
              session.isLive
                ? 'border-[#8a3b94] ring-2 ring-[#ffd6fd]/50'
                : 'border-[#e2e8f8]'
            }`}
          >
            {/* Session status & room */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {session.isLive ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-red-100 text-red-700 font-['Plus_Jakarta_Sans'] text-[11px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
                    Live Now
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-[#f0f3ff] text-[#4f434e] font-['Plus_Jakarta_Sans'] text-[11px] font-semibold">
                    Upcoming
                  </span>
                )}
                <span className="font-['Inter'] text-xs text-[#4f434e]">
                  {session.time}
                </span>
              </div>
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold text-[#8a3b94]">
                {session.room}
              </span>
            </div>

            {/* Title & Speaker */}
            <div>
              <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#151c27]">
                {session.title}
              </h3>
              <p className="font-['Inter'] text-xs text-[#4f434e] mt-0.5">
                Keynote Speaker: <span className="font-semibold text-[#151c27]">{session.speaker}</span> ({session.speakerRole})
              </p>
            </div>

            {/* Keynote Preview Image & Highlights */}
            <div className="flex gap-3 items-center bg-[#f0f3ff] p-2.5 rounded-lg border border-[#e2e8f8]/60">
              <img
                src={session.image}
                alt={session.speaker}
                className="w-16 h-16 rounded-lg object-cover shrink-0 ring-1 ring-slate-200"
              />
              <div className="min-w-0">
                <p className="font-['Inter'] text-xs text-[#151c27] line-clamp-2 italic">
                  "{session.keyHighlights}"
                </p>
                <div className="flex gap-1.5 mt-1.5 flex-wrap">
                  {session.tags.map((t) => (
                    <span
                      key={t}
                      className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#8a3b94] font-semibold"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Action CTA to load into studio */}
            <button
              onClick={() => onSelectSession(session)}
              className="w-full py-2.5 px-3 rounded-lg bg-[#8a3b94] text-white font-['Plus_Jakarta_Sans'] text-xs font-semibold flex items-center justify-center gap-1.5 hover:opacity-95 active:scale-95 transition-all shadow-sm"
              type="button"
            >
              <span className="material-symbols-outlined text-[16px]">sync_alt</span>
              <span>Sync into LinkedIn Post Creator</span>
              <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
