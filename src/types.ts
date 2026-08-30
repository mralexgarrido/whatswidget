export type Agent = {
  id: string;
  name: string;
  role: string;
  phoneNumber: string;
  profilePicture: string;
  isOnline: boolean;
};

export type PresetKey = 'support' | 'sales' | 'booking' | 'minimal' | 'dark';

export type Config = {
  preset: PresetKey | 'custom';
  phoneNumber: string;
  prefilledMessage: string;
  bubbleText: string;
  badgeText: string;
  profilePicture: string;
  name: string;
  caption: string;
  welcomeMessage: string;
  startChatMethod: 'button' | 'message';
  position: 'floating' | 'embed_bubble' | 'embed_window';
  alignment: 'left' | 'center' | 'right';
  verticalOffset: number;
  horizontalOffset: number;
  font: string;
  colors: {
    bubbleBackground: string;
    bubbleIcon: string;
    bubbleNotificationBadge: string;
    headerBackground: string;
    userOnlineStatus: string;
    chatWallpaper: string;
    messageBackground: string;
    messageField: string;
    sendMessageButton: string;
  };
  animationEnabled: boolean;
  // Advanced Elfsight-style features
  enableMultiAgent: boolean;
  agents: Agent[];
  autoOpenDelay: number; // 0 = disabled, >0 = seconds before auto opening
  showQrCode: boolean;
  workingHours: {
    enabled: boolean;
    startTime: string; // e.g., "09:00"
    endTime: string; // e.g., "17:00"
    days: number[]; // 0 = Sun, 1 = Mon, ..., 6 = Sat
    offlineMessage: string;
  };
};
