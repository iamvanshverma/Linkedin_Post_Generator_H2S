import React from 'react';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventTitle: string;
}

export const QRModal: React.FC<QRModalProps> = ({ isOpen, onClose, eventTitle }) => {
  if (!isOpen) return null;

  const attendeeUrl = `${window.location.origin}/?view=attendee`;

  const handleCopy = () => {
    navigator.clipboard?.writeText(attendeeUrl);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm p-6 shadow-2xl space-y-4 border border-[#e2e8f8] text-center relative animate-fade-in">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f0f3ff] text-[#4f434e] flex items-center justify-center hover:bg-[#e2e8f8]"
        >
          ✕
        </button>

        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#8a3b94]/10 text-[#8a3b94] font-['Plus_Jakarta_Sans'] text-xs font-semibold">
          <span className="material-symbols-outlined text-[16px]">qr_code_scanner</span>
          <span>Attendee Instant Launch</span>
        </div>

        <h3 className="font-['Plus_Jakarta_Sans'] text-lg font-bold text-[#151c27]">
          Scan to Generate Posts
        </h3>
        <p className="font-['Inter'] text-xs text-[#4f434e]">
          Display this QR on venue screens, badges, or lanyards. Attendees scan and generate LinkedIn posts in under 10 seconds.
        </p>

        {/* Dynamic SVG QR Code representation */}
        <div className="p-4 bg-white rounded-2xl border-2 border-dashed border-[#8a3b94]/30 inline-block shadow-inner mx-auto">
          <div className="w-48 h-48 bg-slate-900 rounded-xl p-3 flex flex-col justify-between relative overflow-hidden">
            {/* Corner Markers */}
            <div className="flex justify-between">
              <div className="w-12 h-12 border-4 border-[#ba66c2] rounded-lg p-1">
                <div className="w-full h-full bg-white rounded"></div>
              </div>
              <div className="w-12 h-12 border-4 border-[#ba66c2] rounded-lg p-1">
                <div className="w-full h-full bg-white rounded"></div>
              </div>
            </div>

            {/* Center Logo Badge */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-12 h-12 rounded-xl bg-white p-1.5 shadow-md flex items-center justify-center">
                <img
                  src="https://lh3.googleusercontent.com/aida/AEtjO1V9UACwo1pw3Ul33EOls0AfXmrlPFd9hEtP_b9OqMuEJ1Hh6uLqv-jjc6vdSJTiOhLFv757a3is4VGgY3-_k67AoKTxZwZ7i-4Fv_BmYPgu_3g4aJ2vpoPIB8_yg9JQL-WMxRe5uE1ZG58j4hhQJwQGfJXjAgrPuHNzQycNX6vOsRGrVuzKPFgd8l2qBkpVfErmxVnT1yN1TMIfUdEy9DTC10Yu6K2Ib5fUP6cI_WYeszoofEs3ZwBYdA"
                  alt="EventPulse"
                  className="w-full h-full object-contain"
                />
              </div>
            </div>

            <div className="flex justify-between items-end">
              <div className="w-12 h-12 border-4 border-[#ba66c2] rounded-lg p-1">
                <div className="w-full h-full bg-white rounded"></div>
              </div>
              <div className="w-10 h-10 grid grid-cols-3 gap-1">
                <div className="bg-white rounded"></div>
                <div className="bg-[#ba66c2] rounded"></div>
                <div className="bg-white rounded"></div>
                <div className="bg-[#ba66c2] rounded"></div>
                <div className="bg-white rounded"></div>
                <div className="bg-white rounded"></div>
              </div>
            </div>
          </div>
        </div>

        <p className="font-['Plus_Jakarta_Sans'] text-xs font-bold text-[#8a3b94] truncate">
          {eventTitle}
        </p>

        <div className="flex gap-2 pt-2">
          <button
            onClick={handleCopy}
            className="flex-1 py-2.5 px-3 rounded-lg bg-[#f0f3ff] text-[#151c27] font-['Plus_Jakarta_Sans'] text-xs font-bold hover:bg-[#e7eefe] active:scale-95 transition-all"
          >
            Copy Direct Link
          </button>
          <button
            onClick={onClose}
            className="flex-1 py-2.5 px-3 rounded-lg bg-[#8a3b94] text-white font-['Plus_Jakarta_Sans'] text-xs font-bold hover:opacity-90 active:scale-95 transition-all"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
