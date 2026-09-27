import React, { useState } from 'react';
import { PostItem } from '../types';

interface QueueViewProps {
  posts: PostItem[];
  onToggleFeature: (postId: string) => void;
  onPostSelectForPreview?: (post: PostItem) => void;
}

export const QueueView: React.FC<QueueViewProps> = ({
  posts,
  onToggleFeature,
  onPostSelectForPreview,
}) => {
  const [filter, setFilter] = useState<'all' | 'featured' | 'queued'>('all');
  const [toast, setToast] = useState<string | null>(null);

  const filteredPosts = posts.filter((p) => {
    if (filter === 'featured') return p.status === 'stage_featured';
    if (filter === 'queued') return p.status === 'queued';
    return true;
  });

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2500);
  };

  return (
    <div className="flex flex-col w-full max-w-2xl mx-auto px-4 py-2 space-y-4">
      {/* Top Banner */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#8a3b94]/10 text-[#8a3b94]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#8a3b94] animate-pulse"></span>
            <span className="font-['Plus_Jakarta_Sans'] text-[11px] font-semibold tracking-wide uppercase">
              Live Feed Moderation
            </span>
          </div>
          <span className="text-[#4f434e] font-['Plus_Jakarta_Sans'] text-[11px] font-semibold">
            {posts.length} Posts Synced
          </span>
        </div>

        <div className="flex flex-col">
          <h2 className="font-['Plus_Jakarta_Sans'] text-2xl font-bold text-[#151c27] tracking-tight">
            Attendee Content Queue
          </h2>
          <p className="font-['Inter'] text-xs text-[#4f434e]">
            Review, approve, and spotlight attendee posts on main stage jumbotrons.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 p-1 bg-[#e2e8f8] rounded-xl">
        <button
          onClick={() => setFilter('all')}
          className={`flex-1 py-1.5 px-3 rounded-lg font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-all ${
            filter === 'all' ? 'bg-white text-[#8a3b94] shadow-sm' : 'text-[#4f434e]'
          }`}
        >
          All Feed ({posts.length})
        </button>
        <button
          onClick={() => setFilter('featured')}
          className={`flex-1 py-1.5 px-3 rounded-lg font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-all ${
            filter === 'featured' ? 'bg-white text-[#8a3b94] shadow-sm' : 'text-[#4f434e]'
          }`}
        >
          Stage Screen ({posts.filter((p) => p.status === 'stage_featured').length})
        </button>
        <button
          onClick={() => setFilter('queued')}
          className={`flex-1 py-1.5 px-3 rounded-lg font-['Plus_Jakarta_Sans'] text-xs font-semibold transition-all ${
            filter === 'queued' ? 'bg-white text-[#8a3b94] shadow-sm' : 'text-[#4f434e]'
          }`}
        >
          Pending ({posts.filter((p) => p.status === 'queued').length})
        </button>
      </div>

      {/* Posts List */}
      <div className="space-y-3">
        {filteredPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-xl p-4 shadow-sm border border-[#e2e8f8] space-y-3 hover:border-[#8a3b94]/40 transition-all"
          >
            {/* Header info */}
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img
                  src={post.authorAvatar}
                  alt={post.authorName}
                  className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
                />
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-['Plus_Jakarta_Sans'] text-sm font-bold text-[#151c27]">
                      {post.authorName}
                    </span>
                    <span className="font-['Inter'] text-xs text-[#4f434e]">
                      • {post.timeAgo}
                    </span>
                  </div>
                  <p className="font-['Inter'] text-xs text-[#4f434e] line-clamp-1">
                    {post.authorRole}
                  </p>
                </div>
              </div>

              {post.status === 'stage_featured' ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#ffd6fd] text-[#36003e] font-['Plus_Jakarta_Sans'] text-[11px] font-bold">
                  <span className="material-symbols-outlined text-[14px] text-[#8a3b94]">
                    tv
                  </span>
                  On Stage
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#f0f3ff] text-[#4f434e] font-['Plus_Jakarta_Sans'] text-[11px]">
                  LinkedIn
                </span>
              )}
            </div>

            {/* Post text preview */}
            <p className="font-['Inter'] text-xs text-[#151c27] line-clamp-3 leading-relaxed whitespace-pre-line">
              {post.content}
            </p>

            {/* Attached media if any */}
            {post.image && (
              <div className="relative w-full h-36 rounded-lg overflow-hidden bg-slate-100">
                <img
                  src={post.image}
                  alt={post.imageCaption || 'Attached snap'}
                  className="w-full h-full object-cover"
                />
                {post.imageCaption && (
                  <span className="absolute bottom-1.5 left-1.5 px-2 py-0.5 rounded bg-black/70 text-white font-['Plus_Jakarta_Sans'] text-[10px]">
                    {post.imageCaption}
                  </span>
                )}
              </div>
            )}

            {/* Tags row */}
            <div className="flex flex-wrap gap-1">
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="font-['Plus_Jakarta_Sans'] text-[11px] text-[#0A66C2] font-medium"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Action buttons */}
            <div className="flex items-center justify-between pt-2 border-t border-[#e2e8f8]/60">
              <div className="flex items-center gap-3 text-xs text-[#4f434e] font-['Plus_Jakarta_Sans']">
                <span>👍 {post.reactionsCount}</span>
                <span>💬 {post.commentsCount}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard?.writeText(post.content);
                    showToast('Copied post copy!');
                  }}
                  className="py-1 px-2.5 rounded-lg bg-[#f0f3ff] text-[#151c27] font-['Plus_Jakarta_Sans'] text-xs font-semibold hover:bg-[#e2e8f8] active:scale-95 transition-all"
                >
                  Copy
                </button>
                <button
                  onClick={() => {
                    onToggleFeature(post.id);
                    showToast(
                      post.status === 'stage_featured'
                        ? 'Removed from Main Stage Screen'
                        : 'Spotlighted on Main Stage Jumbotron!'
                    );
                  }}
                  className={`py-1 px-3 rounded-lg font-['Plus_Jakarta_Sans'] text-xs font-bold flex items-center gap-1 active:scale-95 transition-all ${
                    post.status === 'stage_featured'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-[#8a3b94] text-white hover:opacity-90'
                  }`}
                >
                  <span className="material-symbols-outlined text-[14px]">
                    {post.status === 'stage_featured' ? 'check' : 'campaign'}
                  </span>
                  <span>
                    {post.status === 'stage_featured' ? 'Spotlighted' : 'Project on Stage'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {toast && (
        <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 py-2 px-4 rounded-full bg-[#2a313d] text-white font-['Plus_Jakarta_Sans'] text-xs font-semibold shadow-lg animate-fade-in flex items-center gap-1.5">
          <span className="material-symbols-outlined text-[16px] text-[#fbabff]">check_circle</span>
          <span>{toast}</span>
        </div>
      )}
    </div>
  );
};
