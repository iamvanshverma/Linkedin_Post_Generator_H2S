import React from 'react';
import { EventConfig } from '../types';

interface AnalyticsViewProps {
  config: EventConfig;
}

export const AnalyticsView: React.FC<AnalyticsViewProps> = ({ config }) => {
  const hourlyData = [
    { hour: '9 AM', count: 24 },
    { hour: '10 AM', count: 68 },
    { hour: '11 AM', count: 92 },
    { hour: '12 PM', count: 45 },
    { hour: '1 PM', count: 53 },
    { hour: '2 PM', count: 86 },
    { hour: '3 PM', count: 74 },
  ];

  const topTags = [
    { tag: '#SaaS25', count: '1,120 posts', reach: '240.2K', viralRate: '98%' },
    { tag: '#AIWorkflows', count: '840 posts', reach: '185.0K', viralRate: '92%' },
    { tag: '#ProductLed', count: '610 posts', reach: '124.5K', viralRate: '84%' },
    { tag: '#B2BGrowth', count: '490 posts', reach: '96.2K', viralRate: '79%' },
  ];

  const leaders = [
    {
      name: 'Alex Rivera',
      role: 'Senior Product Lead at ApexTech',
      posts: 4,
      impressions: '18.4K',
      avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCysuiTGUsh62gpQgsvEZQRofC7XtpahdIVZCmR0YhQrAg9VGmvXPMW9q6gP_9RjHUZ1T29DCCR3so5hlaaDD4NCAsNsgSuGvB9knVlnqc_HYe1LbaQQHxGwXVZqaQQO0yXcgdTzc_fFuNdJxTClPSBIFsub48gzvBsKufd6GngeNltxt_0HnDE29nTTcrWvyX0PdEVjvcLZ3B4j-nKV1HcUxtLO3Teh-Lgcx0TiFN82NZQ-K3GgCWZ',
    },
    {
      name: 'Danielle Brooks',
      role: 'Head of Growth at HyperWave',
      posts: 3,
      impressions: '14.2K',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    },
    {
      name: 'Kenji Sato',
      role: 'Founding Partner at Zenith Ventures',
      posts: 2,
      impressions: '12.8K',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    },
  ];

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 py-2 space-y-4">
      {/* Header */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#8a3b94]/10 text-[#8a3b94]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8a3b94] animate-pulse"></span>
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold tracking-wide uppercase">
              Social Amplification
            </span>
          </div>
          <span className="text-[#4f434e] font-['Plus_Jakarta_Sans'] text-[11px] font-semibold">
            Live Stream Connected
          </span>
        </div>

        <div className="flex flex-col">
          <h2 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#151c27] tracking-tight">
            Summit Engagement Pulse
          </h2>
          <p className="font-['Inter'] text-xs text-[#4f434e]">
            Real-time social footprint, attendee post velocity, and network amplification.
          </p>
        </div>
      </div>

      {/* 4-Stat Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <div className="p-3 bg-white rounded-xl shadow-sm border border-[#e2e8f8]">
          <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold text-[#4f434e]">
            Total Reach
          </span>
          <div className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#151c27] mt-0.5">
            {config.totalReach}
          </div>
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-emerald-600 font-bold flex items-center gap-0.5 mt-0.5">
            ↑ 24% vs day 1
          </span>
        </div>
        <div className="p-3 bg-white rounded-xl shadow-sm border border-[#e2e8f8]">
          <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold text-[#4f434e]">
            Posts Generated
          </span>
          <div className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#151c27] mt-0.5">
            {config.generatedCount.toLocaleString()}
          </div>
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#8a3b94] font-bold flex items-center gap-0.5 mt-0.5">
            +34% / hr
          </span>
        </div>
        <div className="p-3 bg-white rounded-xl shadow-sm border border-[#e2e8f8]">
          <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold text-[#4f434e]">
            Velocity Peak
          </span>
          <div className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#151c27] mt-0.5">
            92 / hr
          </div>
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#575e70] font-semibold flex items-center gap-0.5 mt-0.5">
            During Keynote
          </span>
        </div>
        <div className="p-3 bg-white rounded-xl shadow-sm border border-[#e2e8f8]">
          <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold text-[#4f434e]">
            Sentiment
          </span>
          <div className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-emerald-600 mt-0.5">
            96% Pos
          </div>
          <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-emerald-600 font-semibold flex items-center gap-0.5 mt-0.5">
            High advocacy
          </span>
        </div>
      </div>

      {/* Hourly Generation Activity */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e2e8f8] space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#151c27]">
              Post Generation Velocity (Hourly)
            </h3>
            <p className="font-['Inter'] text-xs text-[#4f434e]">
              Surges directly correspond to keynote stages and breakout sessions
            </p>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#ffd6fd] text-[#36003e] font-['Plus_Jakarta_Sans'] text-[11px] font-bold">
            Live
          </span>
        </div>

        <div className="pt-2 flex items-end justify-between h-36 gap-2">
          {hourlyData.map((item) => {
            const heightPercent = (item.count / 92) * 100;
            return (
              <div key={item.hour} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end">
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold text-[#4f434e]">
                  {item.count}
                </span>
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-[#8a3b94] to-[#fbabff] transition-all hover:brightness-110"
                  style={{ height: `${heightPercent}%` }}
                />
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] text-[#4f434e] truncate">
                  {item.hour}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Top Hashtags & Channels */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e2e8f8] space-y-3">
        <h3 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#151c27]">
          Trending Summit Hashtags
        </h3>
        <div className="space-y-2">
          {topTags.map((t) => (
            <div
              key={t.tag}
              className="flex items-center justify-between p-2.5 rounded-lg bg-[#f0f3ff] border border-[#e2e8f8]/60"
            >
              <div className="flex items-center gap-2">
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#8a3b94]">
                  {t.tag}
                </span>
                <span className="font-['Inter'] text-[11px] text-[#4f434e]">
                  {t.count}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#151c27]">
                  {t.reach} reach
                </span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-['Plus_Jakarta_Sans'] text-[10px] font-bold">
                  {t.viralRate}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Attendee Thought Leader Spotlight */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-[#e2e8f8] space-y-3">
        <h3 className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#151c27]">
          Top Amplifying Attendees
        </h3>
        <div className="space-y-2.5">
          {leaders.map((leader, idx) => (
            <div
              key={leader.name}
              className="flex items-center justify-between p-2.5 rounded-lg bg-[#f0f3ff] border border-[#e2e8f8]/60"
            >
              <div className="flex items-center gap-2.5">
                <span className="w-5 h-5 rounded-full bg-[#8a3b94]/20 text-[#8a3b94] font-['Plus_Jakarta_Sans'] text-xs font-bold flex items-center justify-center">
                  #{idx + 1}
                </span>
                <img
                  src={leader.avatar}
                  alt={leader.name}
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-200"
                />
                <div>
                  <h4 className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#151c27]">
                    {leader.name}
                  </h4>
                  <p className="font-['Inter'] text-[10px] text-[#4f434e]">
                    {leader.role}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <div className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#8a3b94]">
                  {leader.impressions}
                </div>
                <div className="font-['Inter'] text-[10px] text-[#4f434e]">
                  {leader.posts} posts
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
