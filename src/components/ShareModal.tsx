import React from 'react';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
  websiteUrl: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  eventTitle,
  websiteUrl,
}) => {
  if (!isOpen) return null;

  const url = websiteUrl || window.location.href;

  const handleShare = (platform: string) => {
    let shareUrl = '';
    const text = encodeURIComponent(`Generating live insights from ${eventTitle}!`);
    const encodedUrl = encodeURIComponent(url);

    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${text}&url=${encodedUrl}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
    } else if (platform === 'email') {
      shareUrl = `mailto:?subject=${encodeURIComponent(eventTitle)}&body=${text}%20${encodedUrl}`;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(url);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-5 shadow-2xl space-y-4 border border-[#e2e8f8] relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f0f3ff] text-[#4f434e] flex items-center justify-center hover:bg-[#e2e8f8]"
        >
          ✕
        </button>

        <h3 className="font-['Plus_Jakarta_Sans'] text-base font-bold text-[#151c27]">
          Share Event Portal
        </h3>
        <p className="font-['Inter'] text-xs text-[#4f434e]">
          Distribute attendee link to speakers, staff, and summit attendees.
        </p>

        <div className="grid grid-cols-3 gap-2 pt-2">
          <button
            onClick={() => handleShare('linkedin')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#f0f3ff] hover:bg-[#e2e8f8] text-[#0A66C2] active:scale-95 transition-all"
          >
            <span className="font-['Plus_Jakarta_Sans'] text-xl font-bold">in</span>
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold text-[#151c27] mt-1">
              LinkedIn
            </span>
          </button>

          <button
            onClick={() => handleShare('twitter')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#f0f3ff] hover:bg-[#e2e8f8] text-[#151c27] active:scale-95 transition-all"
          >
            <span className="font-['Plus_Jakarta_Sans'] text-lg font-bold">𝕏</span>
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold text-[#151c27] mt-1">
              Twitter / X
            </span>
          </button>

          <button
            onClick={() => handleShare('email')}
            className="flex flex-col items-center justify-center p-3 rounded-xl bg-[#f0f3ff] hover:bg-[#e2e8f8] text-[#8a3b94] active:scale-95 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">mail</span>
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold text-[#151c27] mt-1">
              Email
            </span>
          </button>
        </div>

        <div className="pt-2">
          <div className="flex items-center gap-2 p-2 bg-[#f0f3ff] rounded-lg border border-[#e2e8f8]">
            <input
              type="text"
              readOnly
              value={url}
              className="w-full bg-transparent text-xs text-[#151c27] font-['Inter'] outline-none"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-1 bg-[#8a3b94] text-white rounded text-xs font-['Plus_Jakarta_Sans'] font-semibold shrink-0"
            >
              Copy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
