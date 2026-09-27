import React, { useState } from 'react';
import { EventConfig } from '../types';

interface OrganizerViewProps {
  config: EventConfig;
  onUpdateConfig: (updated: EventConfig) => void;
  onSwitchToAttendee: () => void;
  onOpenQRModal: () => void;
  onOpenShareModal: () => void;
}

export const OrganizerView: React.FC<OrganizerViewProps> = ({
  config,
  onUpdateConfig,
  onSwitchToAttendee,
  onOpenQRModal,
  onOpenShareModal,
}) => {
  const [formData, setFormData] = useState<EventConfig>(config);
  const [newTagInput, setNewTagInput] = useState('');
  const [isAddingTag, setIsAddingTag] = useState(false);
  const [copyToastVisible, setCopyToastVisible] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const handleCopyLink = () => {
    const link = `${window.location.origin}/attendee`;
    navigator.clipboard?.writeText(link);
    setCopyToastVisible(true);
    setTimeout(() => {
      setCopyToastVisible(false);
    }, 3500);
  };

  const handleAddTag = () => {
    if (!newTagInput.trim()) return;
    const formatted = newTagInput.trim().startsWith('#')
      ? newTagInput.trim()
      : `#${newTagInput.trim()}`;
    if (!formData.tags.includes(formatted)) {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, formatted],
      }));
    }
    setNewTagInput('');
    setIsAddingTag(false);
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tagToRemove),
    }));
  };

  const handleSavePublish = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      setPublishSuccess(true);
      onUpdateConfig(formData);
      setTimeout(() => {
        setPublishSuccess(false);
      }, 3000);
    }, 700);
  };

  const handleReset = () => {
    setFormData(config);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 py-2 space-y-4">
      {/* 1. Header Greeting & Quick Stats Overview Banner */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#8a3b94]/10 text-[#8a3b94]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8a3b94] animate-pulse"></span>
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold tracking-wide uppercase">
              Organizer Workspace
            </span>
          </div>
          <div className="flex items-center gap-1 text-[#4f434e] font-['Plus_Jakarta_Sans'] text-[11px] font-semibold">
            <span className="material-symbols-outlined text-[16px] text-[#8a3b94]">sensors</span>
            <span>Live Sync Active</span>
          </div>
        </div>

        <div className="flex flex-col">
          <h2 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#151c27] tracking-tight">
            Event Operations
          </h2>
          <p className="font-['Inter'] text-xs text-[#4f434e]">
            Global Tech Summit 2025 • Command Center
          </p>
        </div>

        {/* Quick Stat Pill Banner */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-[#f0f3ff] shadow-sm border border-[#e2e8f8]/60">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-full bg-[#8a3b94]/15 flex items-center justify-center text-[#8a3b94]">
              <span className="material-symbols-outlined text-[16px]">bolt</span>
            </div>
            <div className="flex flex-col">
              <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#151c27]">
                {formData.generatedCount.toLocaleString()} Posts Generated
              </span>
              <span className="font-['Inter'] text-xs text-[#4f434e]">
                89.4k Real-time Impressions
              </span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#dce2f3] text-[#4f434e] font-['Plus_Jakarta_Sans'] text-[11px] font-semibold">
            +34% / hr
          </span>
        </div>
      </div>

      {/* 2. Active Event Overview Card */}
      <div className="flex flex-col bg-white rounded-xl p-4 shadow-sm space-y-4 border border-[#e2e8f8]">
        {/* Header of the Card */}
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#712ae2] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#8a3b94]"></span>
              </span>
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] uppercase tracking-wider text-[#8a3b94] font-semibold">
                Active Event Overview
              </span>
            </div>
            <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#151c27]">
              {formData.title}
            </h3>
            <p className="font-['Inter'] text-xs text-[#4f434e]">
              Host: <span className="font-medium text-[#151c27]">{formData.hostCompany}</span>
            </p>
          </div>
          <div className="p-2 rounded-lg bg-[#f0f3ff] text-[#8a3b94] flex items-center justify-center">
            <span className="material-symbols-outlined text-[20px]">hub</span>
          </div>
        </div>

        {/* Date & Venue Bar */}
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-[#f0f3ff] text-[#4f434e]">
          <span className="material-symbols-outlined text-[18px] text-[#8a3b94]">calendar_month</span>
          <span className="font-['Inter'] text-xs truncate">
            {formData.date} • {formData.venue}
          </span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-3 gap-2">
          <div className="flex flex-col p-2.5 rounded-lg bg-[#e7eefe] text-[#151c27]">
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold text-[#4f434e]">Generated</span>
            <span className="font-['Plus_Jakarta_Sans'] text-base mt-0.5 font-bold">
              {formData.generatedCount.toLocaleString()}
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold text-[#8a3b94] flex items-center gap-0.5 mt-0.5">
              <span className="material-symbols-outlined text-[12px]">trending_up</span>+18% today
            </span>
          </div>
          <div className="flex flex-col p-2.5 rounded-lg bg-[#e7eefe] text-[#151c27]">
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold text-[#4f434e]">Total Reach</span>
            <span className="font-['Plus_Jakarta_Sans'] text-base mt-0.5 font-bold">
              {formData.totalReach}
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold text-[#575e70] flex items-center gap-0.5 mt-0.5">
              <span className="material-symbols-outlined text-[12px]">visibility</span>Across X/LI
            </span>
          </div>
          <div className="flex flex-col p-2.5 rounded-lg bg-[#e7eefe] text-[#151c27]">
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold text-[#4f434e]">Top Tag</span>
            <span className="font-['Plus_Jakarta_Sans'] text-xs mt-0.5 font-bold truncate text-[#8a3b94]">
              {formData.topTag}
            </span>
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold text-[#4f434e] flex items-center gap-0.5 mt-0.5">
              <span className="material-symbols-outlined text-[12px] text-[#8a3b94]">stars</span>Viral
            </span>
          </div>
        </div>

        {/* Visual Engagement Sparkline */}
        <div className="flex flex-col p-3 rounded-lg bg-[#f0f3ff] space-y-1.5 border border-[#e2e8f8]/50">
          <div className="flex items-center justify-between text-[#4f434e] font-['Plus_Jakarta_Sans'] text-[11px]">
            <span>Live Pulse Velocity</span>
            <span className="font-semibold text-[#8a3b94]">{formData.pulseVelocity}</span>
          </div>
          <svg className="w-full h-9 text-[#8a3b94] overflow-visible" fill="none" viewBox="0 0 300 40">
            <defs>
              <linearGradient id="velocityGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ba66c2" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#ba66c2" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M0,32 Q35,30 60,20 T120,24 T180,8 T240,16 T300,4"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2.5"
            />
            <path
              d="M0,32 Q35,30 60,20 T120,24 T180,8 T240,16 T300,4 L300,40 L0,40 Z"
              fill="url(#velocityGrad)"
            />
            <circle
              className="animate-ping"
              cx="300"
              cy="4"
              fill="currentColor"
              r="3.5"
              style={{ transformOrigin: '300px 4px' }}
            />
            <circle cx="300" cy="4" fill="currentColor" r="3" />
          </svg>
        </div>

        {/* Action Row with Copy Link & QR */}
        <div className="flex flex-col space-y-2 pt-1">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#8a3b94] text-white font-['Plus_Jakarta_Sans'] text-xs font-semibold shadow-sm hover:opacity-95 active:scale-95 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">
                {copyToastVisible ? 'check' : 'content_copy'}
              </span>
              <span>{copyToastVisible ? 'Link Copied!' : 'Copy Attendee Link'}</span>
            </button>
            <button
              onClick={onOpenQRModal}
              aria-label="Share QR code"
              title="Show QR Code"
              className="p-2.5 rounded-lg bg-[#e7eefe] text-[#4f434e] hover:text-[#151c27] active:scale-95 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">qr_code_2</span>
            </button>
            <button
              onClick={onOpenShareModal}
              aria-label="Share options"
              title="Share event options"
              className="p-2.5 rounded-lg bg-[#e7eefe] text-[#4f434e] hover:text-[#151c27] active:scale-95 transition-all"
              type="button"
            >
              <span className="material-symbols-outlined text-[20px]">ios_share</span>
            </button>
          </div>

          {/* Toast Banner */}
          {copyToastVisible && (
            <div className="flex items-center justify-center gap-1.5 py-1.5 px-3 rounded-full bg-[#ffd6fd] text-[#36003e] font-['Plus_Jakarta_Sans'] text-[11px] font-semibold transition-all animate-fade-in shadow-sm">
              <span className="material-symbols-outlined text-[16px]">check_circle</span>
              <span>Link copied to clipboard! Attendees can now generate posts instantly.</span>
            </div>
          )}
        </div>
      </div>

      {/* 3. Event Configuration Form Section */}
      <div className="flex flex-col bg-white rounded-xl p-4 shadow-sm space-y-4 border border-[#e2e8f8]">
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5 text-[#8a3b94]">
            <span className="material-symbols-outlined text-[18px]">tune</span>
            <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#151c27]">
              Event Configuration
            </h3>
          </div>
          <p className="font-['Inter'] text-xs text-[#4f434e]">
            Set default hashtags, branding, and social mentions for attendee generation prompts.
          </p>
        </div>

        <form className="flex flex-col space-y-3" onSubmit={handleSavePublish}>
          {/* Event Name Input */}
          <div className="flex flex-col space-y-1">
            <label className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold text-[#4f434e] flex items-center justify-between">
              <span>Event Title</span>
              <span className="text-[#8a3b94] font-medium">Required</span>
            </label>
            <div className="relative flex items-center">
              <input
                className="w-full h-11 px-3 py-2 rounded-lg bg-[#f0f3ff] text-[#151c27] font-['Inter'] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8a3b94]/40 border border-transparent focus:border-[#8a3b94]/20 transition-all"
                placeholder="e.g., Global AI Expo 2025"
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
              <span className="material-symbols-outlined absolute right-3 text-[18px] text-[#4f434e]/60 pointer-events-none">
                edit
              </span>
            </div>
          </div>

          {/* Organizer / Company Name */}
          <div className="flex flex-col space-y-1">
            <label className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold text-[#4f434e]">
              Organizer / Host Company
            </label>
            <div className="relative flex items-center">
              <input
                className="w-full h-11 px-3 py-2 rounded-lg bg-[#f0f3ff] text-[#151c27] font-['Inter'] text-sm focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#8a3b94]/40 border border-transparent focus:border-[#8a3b94]/20 transition-all"
                placeholder="e.g., Anthropic & CloudVentures"
                type="text"
                value={formData.hostCompany}
                onChange={(e) => setFormData({ ...formData, hostCompany: e.target.value })}
                required
              />
              <span className="material-symbols-outlined absolute right-3 text-[18px] text-[#4f434e]/60 pointer-events-none">
                apartment
              </span>
            </div>
          </div>

          {/* Hashtags Multi-tag Builder */}
          <div className="flex flex-col space-y-1.5">
            <div className="flex items-center justify-between">
              <label className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold text-[#4f434e]">
                Default Post Hashtags
              </label>
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold text-[#8a3b94]">
                {formData.tags.length} Active
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5 p-2 rounded-lg bg-[#f0f3ff] min-h-[46px] items-center border border-[#e2e8f8]/40">
              {formData.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#8a3b94]/10 text-[#8a3b94] font-['Plus_Jakarta_Sans'] text-[11px] font-semibold"
                >
                  {tag}
                  <button
                    onClick={() => handleRemoveTag(tag)}
                    aria-label={`Remove ${tag}`}
                    className="hover:text-red-500 transition-colors flex items-center ml-0.5"
                    type="button"
                  >
                    <span className="material-symbols-outlined text-[14px]">close</span>
                  </button>
                </span>
              ))}

              {isAddingTag ? (
                <div className="inline-flex items-center gap-1 bg-white px-2 py-0.5 rounded-full border border-[#8a3b94]">
                  <input
                    type="text"
                    placeholder="#NewTag"
                    value={newTagInput}
                    onChange={(e) => setNewTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    autoFocus
                    className="w-24 text-xs font-['Plus_Jakarta_Sans'] outline-none bg-transparent"
                  />
                  <button
                    type="button"
                    onClick={handleAddTag}
                    className="text-[#8a3b94] font-bold text-xs"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsAddingTag(false)}
                    className="text-gray-400 hover:text-gray-600 text-xs"
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAddingTag(true)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e2e8f8] text-[#151c27] font-['Plus_Jakarta_Sans'] text-[11px] font-semibold active:scale-95 hover:bg-[#dce2f3] transition-all"
                  type="button"
                >
                  <span className="material-symbols-outlined text-[14px]">add</span>
                  <span>Add tag</span>
                </button>
              )}
            </div>
          </div>

          {/* Social Links Section */}
          <div className="flex flex-col space-y-2 pt-1">
            <label className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold text-[#4f434e]">
              Target Social Profiles
            </label>

            {/* LinkedIn Company Page */}
            <div className="flex items-center rounded-lg bg-[#f0f3ff] overflow-hidden focus-within:ring-2 focus-within:ring-[#8a3b94]/40 focus-within:bg-white border border-[#e2e8f8]/60 transition-all">
              <div className="w-10 h-11 flex items-center justify-center bg-[#e7eefe] text-[#0A66C2]">
                <span className="font-['Plus_Jakarta_Sans'] text-base font-bold">in</span>
              </div>
              <input
                className="w-full h-11 px-2.5 py-2 bg-transparent text-[#151c27] font-['Inter'] text-xs focus:outline-none"
                placeholder="LinkedIn Company Page URL"
                type="url"
                value={formData.linkedinUrl}
                onChange={(e) => setFormData({ ...formData, linkedinUrl: e.target.value })}
              />
            </div>

            {/* X / Twitter Handle */}
            <div className="flex items-center rounded-lg bg-[#f0f3ff] overflow-hidden focus-within:ring-2 focus-within:ring-[#8a3b94]/40 focus-within:bg-white border border-[#e2e8f8]/60 transition-all">
              <div className="w-10 h-11 flex items-center justify-center bg-[#e7eefe] text-[#151c27] font-bold text-base">
                𝕏
              </div>
              <input
                className="w-full h-11 px-2.5 py-2 bg-transparent text-[#151c27] font-['Inter'] text-xs focus:outline-none"
                placeholder="@EventPulseHQ"
                type="text"
                value={formData.twitterHandle}
                onChange={(e) => setFormData({ ...formData, twitterHandle: e.target.value })}
              />
            </div>

            {/* Official Website URL */}
            <div className="flex items-center rounded-lg bg-[#f0f3ff] overflow-hidden focus-within:ring-2 focus-within:ring-[#8a3b94]/40 focus-within:bg-white border border-[#e2e8f8]/60 transition-all">
              <div className="w-10 h-11 flex items-center justify-center bg-[#e7eefe] text-[#8a3b94]">
                <span className="material-symbols-outlined text-[18px]">public</span>
              </div>
              <input
                className="w-full h-11 px-2.5 py-2 bg-transparent text-[#151c27] font-['Inter'] text-xs focus:outline-none"
                placeholder="https://eventpulse.live/summit25"
                type="url"
                value={formData.websiteUrl}
                onChange={(e) => setFormData({ ...formData, websiteUrl: e.target.value })}
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-2 pt-2">
            <button
              className="w-full py-3 px-4 rounded-lg bg-[#8a3b94] text-white font-['Plus_Jakarta_Sans'] text-sm font-semibold shadow-sm flex items-center justify-center gap-2 hover:opacity-95 active:scale-[0.99] transition-all disabled:opacity-75"
              type="submit"
              disabled={isPublishing}
            >
              {isPublishing ? (
                <>
                  <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
                  <span>Publishing Changes...</span>
                </>
              ) : publishSuccess ? (
                <>
                  <span className="material-symbols-outlined text-[20px] text-emerald-300">task_alt</span>
                  <span>Event Portal Published!</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">check_circle</span>
                  <span>Save &amp; Publish Event Portal</span>
                </>
              )}
            </button>
            <button
              onClick={handleReset}
              className="w-full py-2.5 px-4 rounded-lg bg-[#e7eefe] text-[#4f434e] font-['Plus_Jakarta_Sans'] text-xs font-semibold hover:text-[#151c27] active:scale-[0.99] transition-all text-center"
              type="button"
            >
              Reset Fields
            </button>
          </div>
        </form>
      </div>

      {/* 4. Attendee Generator Quick Launch Switcher Banner */}
      <div className="flex flex-col p-4 rounded-xl bg-gradient-to-r from-[#f0f3ff] via-[#e7eefe] to-[#e2e8f8] shadow-sm space-y-2 border border-[#dce2f3]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#8a3b94]/20 flex items-center justify-center text-[#8a3b94]">
              <span className="material-symbols-outlined text-[18px]">preview</span>
            </div>
            <div>
              <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#151c27] block">
                Live Attendee Perspective
              </span>
              <span className="font-['Inter'] text-xs text-[#4f434e]">
                See how prompts render on the attendee mobile app
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={onSwitchToAttendee}
          type="button"
          className="inline-flex items-center justify-between w-full p-2.5 rounded-lg bg-white text-[#8a3b94] font-['Plus_Jakarta_Sans'] text-xs font-semibold hover:bg-slate-50 transition-colors shadow-sm active:scale-95"
        >
          <span>Switch to Attendee View to preview attendee generation experience</span>
          <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
        </button>
      </div>
    </div>
  );
};
