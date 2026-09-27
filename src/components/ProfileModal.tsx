import React, { useState } from 'react';
import { AuthorProfile } from '../types';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  author: AuthorProfile;
  onSaveAuthor: (updated: AuthorProfile) => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  author,
  onSaveAuthor,
}) => {
  const [name, setName] = useState(author.name);
  const [title, setTitle] = useState(author.title);
  const [avatar, setAvatar] = useState(author.avatar);

  if (!isOpen) return null;

  const sampleAvatars = [
    {
      label: 'Alex Rivera',
      url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCysuiTGUsh62gpQgsvEZQRofC7XtpahdIVZCmR0YhQrAg9VGmvXPMW9q6gP_9RjHUZ1T29DCCR3so5hlaaDD4NCAsNsgSuGvB9knVlnqc_HYe1LbaQQHxGwXVZqaQQO0yXcgdTzc_fFuNdJxTClPSBIFsub48gzvBsKufd6GngeNltxt_0HnDE29nTTcrWvyX0PdEVjvcLZ3B4j-nKV1HcUxtLO3Teh-Lgcx0TiFN82NZQ-K3GgCWZ',
    },
    {
      label: 'Executive Leader',
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&q=80',
    },
    {
      label: 'Sarah Tech',
      url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&q=80',
    },
  ];

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveAuthor({
      ...author,
      name,
      title,
      avatar,
    });
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
          Author Profile
        </h3>
        <p className="font-['Inter'] text-xs text-[#4f434e]">
          Customize how your persona renders in the Live LinkedIn Post preview.
        </p>

        <form onSubmit={handleSave} className="space-y-3 pt-1">
          {/* Avatar selector */}
          <div className="flex flex-col space-y-1.5">
            <label className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#151c27]">
              Profile Photo
            </label>
            <div className="flex items-center gap-3">
              <img
                src={avatar}
                alt={name}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-[#8a3b94]"
              />
              <div className="flex gap-1.5">
                {sampleAvatars.map((s, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setAvatar(s.url)}
                    className="w-8 h-8 rounded-full overflow-hidden border-2 hover:border-[#8a3b94] transition-all"
                  >
                    <img src={s.url} alt={s.label} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-1">
            <label className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#151c27]">
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-[#f0f3ff] text-[#151c27] text-xs font-['Inter'] outline-none border border-[#e2e8f8] focus:border-[#8a3b94]"
              required
            />
          </div>

          <div className="flex flex-col space-y-1">
            <label className="font-['Plus_Jakarta_Sans'] text-xs font-semibold text-[#151c27]">
              Headline / Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full h-10 px-3 rounded-lg bg-[#f0f3ff] text-[#151c27] text-xs font-['Inter'] outline-none border border-[#e2e8f8] focus:border-[#8a3b94]"
              required
            />
          </div>

          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2 px-3 rounded-lg bg-[#f0f3ff] text-[#4f434e] text-xs font-['Plus_Jakarta_Sans'] font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2 px-3 rounded-lg bg-[#8a3b94] text-white text-xs font-['Plus_Jakarta_Sans'] font-semibold hover:opacity-90"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
