export type Config = {
  phoneNumber: string;
  bubbleText: string;
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
};
