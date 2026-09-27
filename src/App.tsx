import React, { useState } from 'react';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { OrganizerView } from './components/OrganizerView';
import { AttendeeView } from './components/AttendeeView';
import { QueueView } from './components/QueueView';
import { AnalyticsView } from './components/AnalyticsView';
import { AgendaView } from './components/AgendaView';
import { QRModal } from './components/QRModal';
import { ShareModal } from './components/ShareModal';
import { ProfileModal } from './components/ProfileModal';
import {
  INITIAL_EVENT_CONFIG,
  INITIAL_AUTHOR_PROFILE,
  AGENDA_SESSIONS,
  INITIAL_POSTS,
} from './mockData';
import { PersonaMode, TabType, AgendaSession, EventConfig, AuthorProfile, PostItem } from './types';

export default function App() {
  const [mode, setMode] = useState<PersonaMode>('organizer');
  const [activeTab, setActiveTab] = useState<TabType>('studio');
  const [eventConfig, setEventConfig] = useState<EventConfig>(INITIAL_EVENT_CONFIG);
  const [authorProfile, setAuthorProfile] = useState<AuthorProfile>(INITIAL_AUTHOR_PROFILE);
  const [sessions] = useState<AgendaSession[]>(AGENDA_SESSIONS);
  const [posts, setPosts] = useState<PostItem[]>(INITIAL_POSTS);

  // Synchronized agenda context into attendee studio
  const [activeTakeaways, setActiveTakeaways] = useState<string | undefined>(undefined);
  const [activeSpeaker, setActiveSpeaker] = useState<string>('Sarah Chen');

  // Modals state
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const handleSelectAgendaSession = (session: AgendaSession) => {
    setActiveTakeaways(
      `Keynote takeaways from ${session.speaker} on "${session.title}":\n• 3 breakthrough ideas redefining our 2026 roadmap.\n• Real practitioner architecture beats theory every time.\n• Honored to catch this session live in ${session.room}!`
    );
    setActiveSpeaker(session.speaker);
    setMode('attendee');
    setActiveTab('studio');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNewPostCreated = (postContent: string, attachedImage?: string) => {
    const newPost: PostItem = {
      id: `post-${Date.now()}`,
      authorName: authorProfile.name,
      authorRole: authorProfile.title,
      authorAvatar: authorProfile.avatar,
      timeAgo: 'Just now',
      content: postContent,
      tags: eventConfig.tags,
      image: attachedImage,
      reactionsCount: 1,
      commentsCount: 0,
      repostsCount: 0,
      isLiked: true,
      status: 'queued',
      platform: 'linkedin',
    };
    setPosts((prev) => [newPost, ...prev]);
    setEventConfig((prev) => ({
      ...prev,
      generatedCount: prev.generatedCount + 1,
    }));
  };

  const handleToggleFeaturePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const nextStatus = p.status === 'stage_featured' ? 'published' : 'stage_featured';
          return { ...p, status: nextStatus };
        }
        return p;
      })
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#f9f9ff] text-[#151c27] flex flex-col font-['Inter'] selection:bg-[#ffd6fd] selection:text-[#36003e]">
      {/* Top Fixed Header */}
      <Header
        mode={mode}
        onModeChange={(newMode) => {
          setMode(newMode);
          if (activeTab !== 'studio') {
            setActiveTab('studio');
          }
        }}
        activeTab={activeTab}
        onProfileClick={() => setIsProfileModalOpen(true)}
        authorAvatar={authorProfile.avatar}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full pt-30 pb-24">
        {activeTab === 'studio' && (
          <>
            {mode === 'organizer' ? (
              <OrganizerView
                config={eventConfig}
                onUpdateConfig={(updated) => setEventConfig(updated)}
                onSwitchToAttendee={() => setMode('attendee')}
                onOpenQRModal={() => setIsQRModalOpen(true)}
                onOpenShareModal={() => setIsShareModalOpen(true)}
              />
            ) : (
              <AttendeeView
                config={eventConfig}
                author={authorProfile}
                onPostCreated={handleNewPostCreated}
                initialTakeaways={activeTakeaways}
                speakerName={activeSpeaker}
              />
            )}
          </>
        )}

        {activeTab === 'queue' && (
          <QueueView
            posts={posts}
            onToggleFeature={handleToggleFeaturePost}
          />
        )}

        {activeTab === 'analytics' && (
          <AnalyticsView config={eventConfig} />
        )}

        {activeTab === 'agenda' && (
          <AgendaView
            sessions={sessions}
            onSelectSession={handleSelectAgendaSession}
          />
        )}
      </main>

      {/* Bottom Sticky Nav */}
      <BottomNav
        activeTab={activeTab}
        onTabChange={(tab) => {
          setActiveTab(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        queueCount={posts.filter((p) => p.status === 'queued').length}
      />

      {/* Modals */}
      <QRModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        eventTitle={eventConfig.title}
      />

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        eventTitle={eventConfig.title}
        websiteUrl={eventConfig.websiteUrl}
      />

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        author={authorProfile}
        onSaveAuthor={(updated) => setAuthorProfile(updated)}
      />
    </div>
  );
}
