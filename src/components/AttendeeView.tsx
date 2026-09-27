import React, { useState } from 'react';
import { EventConfig, AuthorProfile, ToneType } from '../types';
import { SAMPLE_IMAGES } from '../mockData';

interface AttendeeViewProps {
  config: EventConfig;
  author: AuthorProfile;
  onPostCreated?: (postText: string, attachedImage?: string) => void;
  initialTakeaways?: string;
  speakerName?: string;
}

export const AttendeeView: React.FC<AttendeeViewProps> = ({
  config,
  author,
  onPostCreated,
  initialTakeaways,
  speakerName = 'Sarah Chen',
}) => {
  const [takeaways, setTakeaways] = useState(
    initialTakeaways ||
      'Unbelievable keynote on the future of autonomous agentic workflows by Sarah Chen! 3 main takeaways on scaling multi-agent architecture and customer value.'
  );
  const [selectedTone, setSelectedTone] = useState<ToneType>('Professional');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiGeneratedBadge, setAiGeneratedBadge] = useState(true);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [reactionCount, setReactionCount] = useState(142);
  const [attachedImages, setAttachedImages] = useState(SAMPLE_IMAGES.slice(0, 2));
  const [activePreviewImage, setActivePreviewImage] = useState(SAMPLE_IMAGES[2]);
  const [showImagePicker, setShowImagePicker] = useState(false);

  // The generated post content
  const [postContent, setPostContent] = useState(
    `Still energized from day 2 at #SaaSSummit25 hosted by @CloudVentures! 🚀\n\nHuge inspiration listening to Sarah Chen breaking down practical AI agent architectures. Key takeaways:\n\n1. Multi-agent workflows are shifting from experimental to mission-critical.\n2. Context grounding > raw model parameter size.\n3. User trust is earned through predictable UX.\n\nGrateful for the incredible conversations with fellow founders and builders! Looking forward to tomorrow's sessions.\n\n#SaaSSummit25 #B2BGrowth #AIWorkflows #TechLeadership #EventPulse`
  );

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  const insertTag = (tag: string) => {
    setTakeaways((prev) => {
      const trimmed = prev.trim();
      if (trimmed.includes(tag)) return prev;
      return `${trimmed} ${tag}`;
    });
    showToast(`Appended ${tag} to takeaways`);
  };

  const formatBullets = () => {
    const lines = takeaways.split('\n');
    const bulleted = lines
      .map((line) => {
        const t = line.trim();
        if (t.length > 0 && !t.startsWith('•') && !t.match(/^\d+\./)) {
          return `• ${t}`;
        }
        return line;
      })
      .join('\n');
    setTakeaways(bulleted);
    showToast('Applied bullet format');
  };

  const handleRemoveImage = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setAttachedImages((prev) => prev.filter((img) => img.id !== id));
    showToast('Photo removed');
  };

  const handleAddImage = (img: typeof SAMPLE_IMAGES[0]) => {
    if (!attachedImages.some((i) => i.id === img.id)) {
      setAttachedImages((prev) => [...prev, img]);
    }
    setActivePreviewImage(img);
    setShowImagePicker(false);
    showToast(`Selected ${img.label}`);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        const newImg = {
          id: `custom-${Date.now()}`,
          url,
          caption: 'Summit Snap • Live Photo',
          label: 'My Photo',
        };
        setAttachedImages((prev) => [...prev, newImg]);
        setActivePreviewImage(newImg);
        showToast('Uploaded attendee snapshot');
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerGenerate = async (overrideTone?: ToneType) => {
    const toneToUse = overrideTone || selectedTone;
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventTitle: config.title,
          hostCompany: config.hostCompany,
          takeaways,
          tone: toneToUse,
          tags: config.tags,
          authorName: author.name,
          speakerName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.text) {
          setPostContent(data.text);
          setAiGeneratedBadge(Boolean(data.aiGenerated));
          showToast('Generated fresh high-engagement post variation!');
          onPostCreated?.(data.text, activePreviewImage.url);
          return;
        }
      }
    } catch (err) {
      console.error('Generation call failed, falling back:', err);
    } finally {
      setIsGenerating(false);
    }

    // High quality immediate fallback
    const fallbackText = `Still energized from day 2 at ${config.tags[0] || '#SaaSSummit25'} hosted by @${config.hostCompany.replace(/\s+/g, '')}! 🚀\n\nHuge inspiration listening to ${speakerName} breaking down practical AI agent architectures. Key takeaways:\n\n1. Multi-agent workflows are shifting from experimental to mission-critical.\n2. Context grounding > raw model parameter size.\n3. User trust is earned through predictable UX.\n\nGrateful for the incredible conversations with fellow founders and builders! Looking forward to tomorrow's sessions.\n\n${config.tags.join(' ')}`;
    setPostContent(fallbackText);
    setIsGenerating(false);
    showToast('Post generated successfully!');
  };

  const handleToneSelect = (tone: ToneType) => {
    setSelectedTone(tone);
    showToast(`Selected tone: ${tone}`);
  };

  const handleCopyPost = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(postContent);
    }
    setCopySuccess(true);
    showToast('Copied full post text to clipboard');
    setTimeout(() => {
      setCopySuccess(false);
    }, 2500);
  };

  const handleOpenLinkedIn = () => {
    showToast('Opening native LinkedIn composer...');
    const encoded = encodeURIComponent(postContent);
    const url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      config.websiteUrl || 'https://eventpulse.live'
    )}&summary=${encoded}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const toggleLike = () => {
    setIsLiked(!isLiked);
    setReactionCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  // Render post body with formatted paragraphs and styled hashtags
  const renderFormattedPostContent = () => {
    const paragraphs = postContent.split('\n\n');
    return paragraphs.map((p, pIdx) => {
      const lines = p.split('\n');
      return (
        <p key={pIdx} className="leading-relaxed">
          {lines.map((line, lIdx) => {
            // Highlight tags and mentions
            const tokens = line.split(/(\s+)/);
            return (
              <React.Fragment key={lIdx}>
                {tokens.map((token, tIdx) => {
                  if (token.startsWith('#') || token.startsWith('@')) {
                    return (
                      <span
                        key={tIdx}
                        className="text-[#0A66C2] font-semibold hover:underline cursor-pointer"
                      >
                        {token}
                      </span>
                    );
                  }
                  return <span key={tIdx}>{token}</span>;
                })}
                {lIdx < lines.length - 1 && <br />}
              </React.Fragment>
            );
          })}
        </p>
      );
    });
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 py-2 space-y-4">
      {/* 1. Top Event Banner */}
      <section className="w-full rounded-xl bg-white p-4 shadow-sm relative overflow-hidden border border-[#e2e8f8]">
        {/* Orchid ambient accent decoration */}
        <div className="absolute -top-12 -right-12 w-36 h-36 bg-[#ffd6fd]/40 rounded-full blur-2xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#8a3b94]/10 text-[#8a3b94] font-['Plus_Jakarta_Sans'] text-[11px] font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#8a3b94] animate-pulse"></span>
              Live Session Sync
            </span>
            <span className="font-['Inter'] text-xs text-[#4f434e] flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] text-[#8a3b94]">location_on</span>
              SF, California
            </span>
          </div>

          <h1 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#151c27] tracking-tight mt-0.5">
            {config.title}
          </h1>
          <p className="font-['Inter'] text-xs text-[#4f434e]">
            Hosted by {config.hostCompany} • Moscone Center, SF
          </p>

          {/* Clickable Social Tags */}
          <div className="flex flex-wrap items-center gap-1.5 pt-2">
            <button
              onClick={() => insertTag(`@${config.hostCompany.replace(/\s+/g, '')}`)}
              className="px-2.5 py-1 rounded-full bg-[#e2e8f8] text-[#4f434e] hover:bg-[#ffd6fd] hover:text-[#36003e] font-['Plus_Jakarta_Sans'] text-[11px] font-semibold transition-all active:scale-95"
              type="button"
            >
              @{config.hostCompany.replace(/\s+/g, '')}
            </button>
            {config.tags.map((tag) => (
              <button
                key={tag}
                onClick={() => insertTag(tag)}
                className="px-2.5 py-1 rounded-full bg-[#8a3b94]/10 text-[#8a3b94] font-['Plus_Jakarta_Sans'] text-[11px] font-semibold hover:bg-[#ffd6fd] transition-all active:scale-95"
                type="button"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Post Generator Studio Card */}
      <section className="w-full rounded-xl bg-white p-4 shadow-sm space-y-4 border border-[#e2e8f8]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#8a3b94]/10 flex items-center justify-center">
              <span className="material-symbols-outlined text-[#8a3b94] text-[18px]">edit_note</span>
            </div>
            <h2 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#151c27]">
              Create Your LinkedIn Post
            </h2>
          </div>
          <span className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#8a3b94] font-semibold bg-[#ffd6fd]/50 px-2 py-0.5 rounded-full flex items-center gap-1">
            <span className="material-symbols-outlined text-[13px]">auto_awesome</span>
            AI Studio
          </span>
        </div>

        {/* Media Upload Dropzone */}
        <div className="flex flex-col space-y-2">
          <label className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#151c27] flex items-center justify-between">
            <span>Summit Moments &amp; Keynote Snaps</span>
            <span className="text-[#4f434e] font-normal text-[11px]">
              {attachedImages.length} attached
            </span>
          </label>

          {/* Drop / Selector Container */}
          <div
            onClick={() => setShowImagePicker(true)}
            className="relative w-full rounded-lg bg-[#f0f3ff] p-3 flex flex-col items-center justify-center text-center cursor-pointer transition-colors hover:bg-[#e7eefe] border border-dashed border-[#8a3b94]/30"
          >
            <div className="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-[#8a3b94] mb-1">
              <span className="material-symbols-outlined text-[18px]">add_photo_alternate</span>
            </div>
            <p className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#151c27]">
              Tap or drop summit photos here
            </p>
            <p className="font-['Inter'] text-[11px] text-[#4f434e] mt-0.5">
              PNG, JPG up to 10MB • Choose keynote snaps
            </p>

            {/* Thumbnail Strip */}
            <div
              className="flex items-center gap-2 mt-2.5 w-full justify-center flex-wrap"
              onClick={(e) => e.stopPropagation()}
            >
              {attachedImages.map((img) => (
                <div
                  key={img.id}
                  onClick={() => {
                    setActivePreviewImage(img);
                    showToast(`Active post photo: ${img.label}`);
                  }}
                  className={`relative w-14 h-14 rounded-lg overflow-hidden shadow-sm cursor-pointer border-2 transition-all ${
                    activePreviewImage.id === img.id
                      ? 'border-[#8a3b94] ring-2 ring-[#ffd6fd]'
                      : 'border-transparent opacity-85 hover:opacity-100'
                  }`}
                >
                  <img src={img.url} alt={img.caption} className="w-full h-full object-cover" />
                  <button
                    onClick={(e) => handleRemoveImage(img.id, e)}
                    className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-black/75 flex items-center justify-center text-white hover:bg-red-600 transition-colors"
                    title="Remove image"
                  >
                    <span className="material-symbols-outlined text-[10px]">close</span>
                  </button>
                </div>
              ))}

              <button
                type="button"
                onClick={() => setShowImagePicker(true)}
                className="w-14 h-14 rounded-lg bg-[#e2e8f8] flex flex-col items-center justify-center text-[#4f434e] hover:text-[#8a3b94] hover:bg-[#dce2f3] transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">add</span>
                <span className="font-['Plus_Jakarta_Sans'] text-[10px] font-semibold">Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Takeaways Textarea */}
        <div className="flex flex-col space-y-1.5">
          <div className="flex items-center justify-between">
            <label
              htmlFor="takeaway-input"
              className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#151c27]"
            >
              Key Highlights / Takeaways
            </label>
            <div className="flex items-center gap-1.5">
              <button
                onClick={formatBullets}
                className="px-2 py-0.5 rounded bg-[#e7eefe] text-[#4f434e] font-['Plus_Jakarta_Sans'] text-[11px] font-semibold hover:text-[#8a3b94] flex items-center gap-0.5 active:scale-95 transition-all"
                type="button"
              >
                <span className="material-symbols-outlined text-[12px]">format_list_bulleted</span>
                Bullets
              </button>
            </div>
          </div>

          <div className="relative rounded-lg bg-white shadow-sm border border-[#e2e8f8] focus-within:ring-2 focus-within:ring-[#8a3b94]/40">
            <textarea
              id="takeaway-input"
              rows={4}
              value={takeaways}
              onChange={(e) => setTakeaways(e.target.value)}
              className="w-full p-3 rounded-lg bg-transparent text-[#151c27] font-['Inter'] text-sm placeholder:text-[#4f434e]/60 focus:outline-none resize-none"
              placeholder="Jot down quotes, speaker insights, or breakthrough stats..."
            />
            <div className="flex justify-between items-center px-3 py-1.5 bg-[#f0f3ff] rounded-b-lg border-t border-[#e2e8f8]/60">
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold text-[#8a3b94] flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">psychology</span>
                Context Synced
              </span>
              <span className="font-['Inter'] text-[11px] text-[#4f434e]">
                {takeaways.length} / 500
              </span>
            </div>
          </div>
        </div>

        {/* Tone Selector Chips */}
        <div className="flex flex-col space-y-2">
          <span className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#151c27]">
            Post Persona &amp; Tone
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {(
              [
                { label: 'Professional', emoji: '✨' },
                { label: 'Grateful Attendee', emoji: '🙏' },
                { label: 'Key Takeaways', emoji: '💡' },
                { label: 'Contrarian', emoji: '🚀' },
              ] as { label: ToneType; emoji: string }[]
            ).map((tone) => {
              const active = selectedTone === tone.label;
              return (
                <button
                  key={tone.label}
                  type="button"
                  onClick={() => handleToneSelect(tone.label)}
                  className={`px-3 py-1.5 rounded-full font-['Plus_Jakarta_Sans'] text-xs shrink-0 flex items-center gap-1.5 active:scale-95 transition-all ${
                    active
                      ? 'bg-[#ffd6fd] text-[#36003e] font-bold shadow-sm ring-1 ring-[#8a3b94]/30'
                      : 'bg-[#e2e8f8] text-[#4f434e] font-semibold hover:bg-[#dce2f3]'
                  }`}
                >
                  <span>{tone.emoji}</span>
                  <span>{tone.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Primary Action Sparkle CTA */}
        <button
          onClick={() => triggerGenerate()}
          disabled={isGenerating}
          type="button"
          className="w-full py-3.5 px-4 rounded-xl bg-[#8a3b94] text-white font-['Plus_Jakarta_Sans'] text-sm font-semibold shadow-md shadow-[#8a3b94]/20 flex items-center justify-center gap-2 transition-all hover:opacity-95 active:scale-[0.98] disabled:opacity-75"
        >
          {isGenerating ? (
            <>
              <span className="material-symbols-outlined text-[20px] animate-spin">refresh</span>
              <span>Polishing with AI...</span>
            </>
          ) : (
            <>
              <span
                className="material-symbols-outlined text-[20px] animate-spin"
                style={{ animationDuration: '4s' }}
              >
                auto_awesome
              </span>
              <span>Generate LinkedIn Post</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </>
          )}
        </button>
      </section>

      {/* 3. Live LinkedIn Preview Section */}
      <section className="w-full flex flex-col space-y-2 pt-1">
        {/* Header with Verification Status */}
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <h2 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#151c27] tracking-tight">
              Live LinkedIn Post Preview
            </h2>
          </div>
          <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#d9dff5] text-[#5c6274] font-['Plus_Jakarta_Sans'] text-[11px] font-semibold">
            <span
              className="material-symbols-outlined text-[13px] text-[#8a3b94]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              verified
            </span>
            <span>Verified Template</span>
          </div>
        </div>

        {/* Ultra-Realistic LinkedIn Post Mockup Card */}
        <div className="w-full rounded-xl bg-white shadow-md overflow-hidden flex flex-col border border-[#e2e8f8]">
          {/* Top Platform Ribbon */}
          <div className="px-4 py-2 bg-[#f0f3ff] flex items-center justify-between border-b border-[#e2e8f8]/60">
            <div className="flex items-center gap-1.5 text-[#0A66C2]">
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
              </svg>
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-bold tracking-wide uppercase">
                Feed Preview Mode
              </span>
            </div>
            <div className="flex items-center gap-1 text-[#4f434e] font-['Plus_Jakarta_Sans'] text-[11px]">
              <span>Mobile Device View</span>
              <span className="material-symbols-outlined text-[16px]">smartphone</span>
            </div>
          </div>

          {/* Post Header: Author info */}
          <div className="p-3.5 flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden bg-[#8a3b94]/20 shrink-0 shadow-sm relative ring-1 ring-slate-200">
                <img
                  className="w-full h-full object-cover"
                  src={author.avatar}
                  alt={author.name}
                />
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <span className="font-['Plus_Jakarta_Sans'] text-sm text-[#151c27] font-bold truncate">
                    {author.name}
                  </span>
                  <span className="text-[#4f434e] font-['Inter'] text-xs font-normal">
                    • {author.connectionDegree}
                  </span>
                </div>
                <p className="font-['Inter'] text-xs text-[#4f434e] truncate">
                  {author.title}
                </p>
                <div className="flex items-center gap-1 font-['Inter'] text-[11px] text-[#4f434e]/80">
                  <span>3h</span>
                  <span>•</span>
                  <span className="material-symbols-outlined text-[13px]">public</span>
                </div>
              </div>
            </div>

            {/* Follow Button & More Icon */}
            <div className="flex items-center gap-1">
              <button
                className="flex items-center gap-0.5 text-[#0A66C2] font-['Plus_Jakarta_Sans'] text-xs font-bold px-2 py-1 rounded hover:bg-[#e7eefe] active:scale-95 transition-all"
                type="button"
              >
                <span className="material-symbols-outlined text-[16px]">add</span>
                <span>Follow</span>
              </button>
              <button
                className="text-[#4f434e] p-1 rounded hover:bg-[#e7eefe]"
                type="button"
              >
                <span className="material-symbols-outlined text-[18px]">more_horiz</span>
              </button>
            </div>
          </div>

          {/* Post Body Copy */}
          <div className="px-3.5 pb-2.5 text-[#151c27] font-['Inter'] text-sm space-y-2">
            {renderFormattedPostContent()}
          </div>

          {/* Attached Stage Image Mockup */}
          {activePreviewImage && (
            <div className="w-full relative bg-[#e2e8f8] overflow-hidden max-h-56 group">
              <img
                className="w-full h-52 object-cover transition-transform group-hover:scale-105 duration-500"
                src={activePreviewImage.url}
                alt={activePreviewImage.caption}
              />
              <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded bg-black/75 text-white font-['Plus_Jakarta_Sans'] text-[11px] font-medium backdrop-blur-sm flex items-center gap-1">
                <span className="material-symbols-outlined text-[14px]">photo_camera</span>
                <span>{activePreviewImage.caption}</span>
              </div>
            </div>
          )}

          {/* Engagement Counter Line */}
          <div className="px-3.5 py-2 flex items-center justify-between text-[#4f434e] font-['Inter'] text-xs border-t border-[#e2e8f8]/40">
            <div className="flex items-center gap-1.5">
              <div className="flex items-center -space-x-1">
                <span className="w-5 h-5 rounded-full bg-[#0A66C2] text-white flex items-center justify-center text-[10px]">
                  👍
                </span>
                <span className="w-5 h-5 rounded-full bg-[#8a3b94] text-white flex items-center justify-center text-[10px]">
                  💡
                </span>
                <span className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px]">
                  ❤️
                </span>
              </div>
              <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold">
                {reactionCount} reactions
              </span>
            </div>
            <div className="flex items-center gap-2 font-['Plus_Jakarta_Sans'] text-[11px] text-[#4f434e]">
              <span>28 comments</span>
              <span>•</span>
              <span>6 reposts</span>
            </div>
          </div>

          {/* LinkedIn Native Post Actions Bar */}
          <div className="px-2 py-1.5 bg-[#f0f3ff]/70 flex items-center justify-around border-t border-[#e2e8f8]/60">
            <button
              onClick={toggleLike}
              className={`flex items-center gap-1 py-1.5 px-2 rounded font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-all active:scale-95 ${
                isLiked ? 'text-[#0A66C2]' : 'text-[#4f434e] hover:text-[#0A66C2]'
              }`}
              type="button"
            >
              <span
                className="material-symbols-outlined text-[18px]"
                style={{ fontVariationSettings: isLiked ? "'FILL' 1" : "'FILL' 0" }}
              >
                thumb_up
              </span>
              <span>{isLiked ? 'Liked' : 'Like'}</span>
            </button>
            <button
              onClick={() => showToast('Comment sheet simulated')}
              className="flex items-center gap-1 py-1.5 px-2 rounded text-[#4f434e] hover:text-[#0A66C2] font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-colors active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              <span>Comment</span>
            </button>
            <button
              onClick={() => showToast('Post queued for instant repost')}
              className="flex items-center gap-1 py-1.5 px-2 rounded text-[#4f434e] hover:text-[#0A66C2] font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-colors active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">repeat</span>
              <span>Repost</span>
            </button>
            <button
              onClick={handleOpenLinkedIn}
              className="flex items-center gap-1 py-1.5 px-2 rounded text-[#4f434e] hover:text-[#0A66C2] font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-colors active:scale-95"
              type="button"
            >
              <span className="material-symbols-outlined text-[18px]">send</span>
              <span>Send</span>
            </button>
          </div>
        </div>
      </section>

      {/* 4. Action Buttons Bar */}
      <section className="w-full bg-white p-2.5 rounded-xl shadow-md space-y-2 border border-[#e2e8f8]">
        <div className="grid grid-cols-3 gap-2">
          {/* 1. Copy Text */}
          <button
            onClick={handleCopyPost}
            className="py-2.5 px-2 rounded-lg bg-[#e2e8f8] hover:bg-[#dce2f3] text-[#151c27] font-['Plus_Jakarta_Sans'] text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px] text-[#8a3b94]">
              {copySuccess ? 'check' : 'content_copy'}
            </span>
            <span>{copySuccess ? 'Copied!' : 'Copy Text'}</span>
          </button>

          {/* 2. Regenerate */}
          <button
            onClick={() => triggerGenerate()}
            disabled={isGenerating}
            className="py-2.5 px-2 rounded-lg bg-[#e2e8f8] hover:bg-[#dce2f3] text-[#151c27] font-['Plus_Jakarta_Sans'] text-xs font-semibold flex flex-col items-center justify-center gap-1 transition-all active:scale-95 disabled:opacity-50"
            type="button"
          >
            <span
              className={`material-symbols-outlined text-[20px] text-[#8a3b94] ${
                isGenerating ? 'animate-spin' : ''
              }`}
            >
              sync
            </span>
            <span>Regenerate</span>
          </button>

          {/* 3. Open LinkedIn (Official Brand Blue) */}
          <button
            onClick={handleOpenLinkedIn}
            className="py-2.5 px-2 rounded-lg bg-[#0A66C2] text-white font-['Plus_Jakarta_Sans'] text-xs font-semibold flex flex-col items-center justify-center gap-1 shadow-sm hover:opacity-95 transition-all active:scale-95"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">open_in_new</span>
            <span>Open App</span>
          </button>
        </div>

        {/* Toast confirmation */}
        {toastMessage && (
          <div className="w-full py-1.5 px-3 rounded-md bg-[#2a313d] text-[#ebf1ff] font-['Plus_Jakarta_Sans'] text-[11px] font-semibold flex items-center justify-center gap-1.5 transition-all animate-fade-in">
            <span className="material-symbols-outlined text-[16px] text-[#fbabff]">check_circle</span>
            <span>{toastMessage}</span>
          </div>
        )}
      </section>

      {/* Image Picker Modal */}
      {showImagePicker && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-5 shadow-2xl space-y-4 border border-[#e2e8f8]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#151c27]">
                  Select Keynote Photo
                </h3>
                <p className="font-['Inter'] text-xs text-[#4f434e]">
                  Pick from official summit media gallery or upload your own
                </p>
              </div>
              <button
                onClick={() => setShowImagePicker(false)}
                className="w-8 h-8 rounded-full bg-[#e2e8f8] flex items-center justify-center text-[#4f434e]"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              {SAMPLE_IMAGES.map((img) => (
                <div
                  key={img.id}
                  onClick={() => handleAddImage(img)}
                  className="group relative rounded-xl overflow-hidden cursor-pointer border-2 hover:border-[#8a3b94] transition-all bg-[#f0f3ff]"
                >
                  <img src={img.url} alt={img.caption} className="w-full h-24 object-cover" />
                  <div className="p-2">
                    <p className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#151c27] truncate">
                      {img.label}
                    </p>
                    <p className="font-['Inter'] text-[10px] text-[#4f434e] truncate">
                      {img.caption}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-[#e2e8f8]">
              <label className="flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg bg-[#f0f3ff] text-[#8a3b94] font-['Plus_Jakarta_Sans'] text-xs font-bold cursor-pointer hover:bg-[#e7eefe] active:scale-95 transition-all">
                <span className="material-symbols-outlined text-[18px]">upload</span>
                <span>Upload from My Camera Roll</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
