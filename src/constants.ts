import { Config } from './types';

export const DEFAULT_CONFIG: Config = {
  phoneNumber: '',
  bubbleText: '',
  profilePicture: 'https://i.pravatar.cc/150?img=32',
  name: 'Support Team',
  caption: 'Typically replies in minutes',
  welcomeMessage: 'Hi there! 👋\nHow can we help you today?',
  startChatMethod: 'message',
  position: 'floating',
  alignment: 'right',
  verticalOffset: 20,
  horizontalOffset: 20,
  font: 'inherit',
  colors: {
    bubbleBackground: '#25D366',
    bubbleIcon: '#ffffff',
    bubbleNotificationBadge: '#ff0000',
    headerBackground: '#095e54',
    userOnlineStatus: '#4caf50',
    chatWallpaper: '#ece5dd',
    messageBackground: '#ffffff',
    messageField: '#f0f0f0',
    sendMessageButton: '#25D366',
  },
  animationEnabled: true,
};
