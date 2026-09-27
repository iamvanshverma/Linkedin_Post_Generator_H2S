export interface EventConfig {
  title: string;
  hostCompany: string;
  date: string;
  venue: string;
  tags: string[];
  linkedinUrl: string;
  twitterHandle: string;
  websiteUrl: string;
  generatedCount: number;
  totalReach: string;
  topTag: string;
  pulseVelocity: string;
}

export interface AuthorProfile {
  name: string;
  title: string;
  avatar: string;
  connectionDegree: string;
}

export interface AgendaSession {
  id: string;
  title: string;
  speaker: string;
  speakerRole: string;
  time: string;
  room: string;
  isLive: boolean;
  tags: string[];
  keyHighlights: string;
  image: string;
  imageCaption: string;
}

export interface PostItem {
  id: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  timeAgo: string;
  content: string;
  tags: string[];
  image?: string;
  imageCaption?: string;
  reactionsCount: number;
  commentsCount: number;
  repostsCount: number;
  isLiked?: boolean;
  status: 'published' | 'queued' | 'stage_featured';
  platform: 'linkedin' | 'x';
}

export type PersonaMode = 'organizer' | 'attendee';
export type TabType = 'studio' | 'queue' | 'analytics' | 'agenda';
export type ToneType = 'Professional' | 'Grateful Attendee' | 'Key Takeaways' | 'Contrarian';
