import React, { useState } from 'react';
import { Config, Agent } from '../types';
import { X, Send, Paperclip, Smile, QrCode, ArrowLeft } from 'lucide-react';

export function Preview({ config }: { config: Config }) {
  const [isOpen, setIsOpen] = useState(true);
  const [message, setMessage] = useState(config.prefilledMessage || '');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [showQr, setShowQr] = useState(false);
  const [prevPrefilledMessage, setPrevPrefilledMessage] = useState(
    config.prefilledMessage,
  );

  if (config.prefilledMessage !== prevPrefilledMessage) {
    setPrevPrefilledMessage(config.prefilledMessage);
    setMessage(config.prefilledMessage || '');
  }

  const isWorkingHoursActive = () => {
    if (!config.workingHours.enabled) return true;
    const now = new Date();
    const currentDay = now.getDay();
    if (!config.workingHours.days.includes(currentDay)) return false;

    const [startH, startM] = config.workingHours.startTime
      .split(':')
      .map(Number);
    const [endH, endM] = config.workingHours.endTime.split(':').map(Number);
    const startMinutes = startH * 60 + startM;
    const endMinutes = endH * 60 + endM;
    const nowMinutes = now.getHours() * 60 + now.getMinutes();

    return nowMinutes >= startMinutes && nowMinutes <= endMinutes;
  };

  const activeNumber = selectedAgent
    ? selectedAgent.phoneNumber
    : config.phoneNumber;

  const handleSend = () => {
    const textToSend = message.trim() || config.prefilledMessage || '';
    const phone = activeNumber.replace(/[^0-9]/g, '');
    const url = `https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(textToSend)}&type=phone_number&app_absent=0`;
    window.open(url, '_blank');
  };

  const handleStartChat = () => {
    const textToSend = config.prefilledMessage || '';
    const phone = activeNumber.replace(/[^0-9]/g, '');
    const url = `https://api.whatsapp.com/send/?phone=${phone}&text=${encodeURIComponent(textToSend)}&type=phone_number&app_absent=0`;
    window.open(url, '_blank');
  };

  const getPositionStyles = () => {
    if (config.position === 'embed_bubble') {
      return {
        position: 'relative' as const,
        margin: '0 auto',
      };
    }

    const styles: React.CSSProperties = {
      position: 'absolute',
      bottom: `${config.verticalOffset}px`,
    };

    if (config.alignment === 'left') {
      styles.left = `${config.horizontalOffset}px`;
    } else if (config.alignment === 'right') {
      styles.right = `${config.horizontalOffset}px`;
    } else {
      styles.left = '50%';
      styles.transform = 'translateX(-50%)';
    }

    return styles;
  };

  const getWindowPositionStyles = () => {
    if (config.position === 'embed_window') {
      return {
        position: 'relative' as const,
        margin: '0 auto',
      };
    }

    const styles: React.CSSProperties = {
      position: 'absolute',
      bottom: `${config.verticalOffset + 70}px`,
    };

    if (config.alignment === 'left') {
      styles.left = `${config.horizontalOffset}px`;
    } else if (config.alignment === 'right') {
      styles.right = `${config.horizontalOffset}px`;
    } else {
      styles.left = '50%';
      styles.transform = 'translateX(-50%)';
    }

    return styles;
  };

  const isWindowVisible =
    config.position === 'embed_window' ||
    (isOpen && config.position !== 'embed_bubble');
  const isBubbleVisible =
    config.position === 'embed_bubble' ||
    (!isOpen && config.position === 'floating');

  const activeName = selectedAgent ? selectedAgent.name : config.name;
  const activeRole = selectedAgent ? selectedAgent.role : config.caption;
  const activeAvatar = selectedAgent
    ? selectedAgent.profilePicture
    : config.profilePicture;

  const isOnline = isWorkingHoursActive();

  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
    `https://api.whatsapp.com/send/?phone=${activeNumber.replace(/[^0-9]/g, '')}`,
  )}`;

  return (
    <div
      className={`w-full h-full relative ${
        config.position !== 'floating'
          ? 'flex items-center justify-center p-4'
          : ''
      }`}
    >
      {/* Chat Window */}
      {isWindowVisible && (
        <div
          style={{
            ...getWindowPositionStyles(),
            width: '360px',
            maxWidth: 'calc(100vw - 40px)',
            backgroundColor: '#fff',
            borderRadius: '12px',
            overflow: 'hidden',
            boxShadow: '0 12px 28px rgba(0,0,0,0.18)',
            display: 'flex',
            flexDirection: 'column',
            fontFamily: config.font,
            zIndex: 50,
          }}
        >
          {/* Header */}
          <div
            style={{
              backgroundColor: config.colors.headerBackground,
              padding: '16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              color: '#fff',
            }}
          >
            <div className="flex items-center gap-3">
              {selectedAgent && (
                <button
                  onClick={() => setSelectedAgent(null)}
                  className="hover:bg-white/10 p-1 rounded-full text-white/90"
                >
                  <ArrowLeft size={18} />
                </button>
              )}
              <div className="relative">
                <img
                  src={
                    activeAvatar ||
                    'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
                  }
                  alt="Profile"
                  className="w-11 h-11 rounded-full object-cover border-2 border-white/20"
                />
                <div
                  className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white"
                  style={{
                    backgroundColor: isOnline
                      ? config.colors.userOnlineStatus
                      : '#9ca3af',
                  }}
                ></div>
              </div>
              <div>
                <div className="font-semibold text-base leading-tight">
                  {activeName}
                </div>
                <div className="text-xs opacity-90">{activeRole}</div>
              </div>
            </div>

            <div className="flex items-center gap-1">
              {config.showQrCode && (
                <button
                  onClick={() => setShowQr(!showQr)}
                  className="text-white/80 hover:text-white p-1.5 rounded transition-colors"
                  title="Toggle QR Code"
                >
                  <QrCode size={18} />
                </button>
              )}
              {config.position !== 'embed_window' && (
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white p-1.5 rounded transition-colors"
                >
                  <X size={18} />
                </button>
              )}
            </div>
          </div>

          {/* QR Code Overlay View */}
          {showQr ? (
            <div className="p-6 bg-white flex flex-col items-center justify-center text-center space-y-3">
              <div className="font-semibold text-gray-800 text-sm">
                Scan to Chat on Mobile
              </div>
              <img
                src={qrUrl}
                alt="WhatsApp QR Code"
                className="w-40 h-40 border rounded p-2 bg-white shadow-inner"
              />
              <p className="text-xs text-gray-500">
                Open WhatsApp camera on your phone to scan and message
                immediately.
              </p>
              <button
                onClick={() => setShowQr(false)}
                className="text-xs font-semibold text-[#25D366] underline hover:text-[#1eaa52]"
              >
                Back to chat
              </button>
            </div>
          ) : (
            <>
              {/* Multi Agent Mode View */}
              {config.enableMultiAgent && !selectedAgent ? (
                <div className="p-4 bg-gray-50 min-h-[220px] flex flex-col gap-3">
                  <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    Select a contact to start messaging
                  </div>
                  <div className="space-y-2 max-h-[260px] overflow-y-auto">
                    {config.agents.map((agent) => (
                      <button
                        key={agent.id}
                        onClick={() => setSelectedAgent(agent)}
                        className="w-full bg-white border border-gray-200 hover:border-[#25D366] p-3 rounded-lg flex items-center justify-between text-left transition-all hover:shadow-sm"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <img
                              src={agent.profilePicture}
                              alt={agent.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div
                              className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border border-white"
                              style={{
                                backgroundColor:
                                  agent.isOnline && isOnline
                                    ? config.colors.userOnlineStatus
                                    : '#9ca3af',
                              }}
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-sm text-gray-900">
                              {agent.name}
                            </div>
                            <div className="text-xs text-gray-500">
                              {agent.role}
                            </div>
                          </div>
                        </div>
                        <span className="text-xs font-medium text-[#25D366] bg-[#25D366]/10 px-2.5 py-1 rounded-full">
                          Chat
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Regular Chat Area */
                <>
                  <div
                    style={{
                      backgroundColor: config.colors.chatWallpaper,
                      padding: '20px',
                      minHeight: '200px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                    }}
                  >
                    {!isOnline ? (
                      <div
                        style={{
                          backgroundColor: '#fee2e2',
                          color: '#991b1b',
                          padding: '12px 16px',
                          borderRadius: '8px',
                          fontSize: '13px',
                          lineHeight: '1.4',
                        }}
                      >
                        {config.workingHours.offlineMessage}
                      </div>
                    ) : (
                      <div
                        style={{
                          backgroundColor: config.colors.messageBackground,
                          padding: '12px 16px',
                          borderRadius: '0 8px 8px 8px',
                          maxWidth: '85%',
                          alignSelf: 'flex-start',
                          boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
                          color: '#111',
                          fontSize: '14px',
                          lineHeight: '1.4',
                          whiteSpace: 'pre-wrap',
                        }}
                      >
                        {config.welcomeMessage}
                      </div>
                    )}
                  </div>

                  {/* Input Area */}
                  <div className="p-3 bg-white border-t border-gray-100">
                    {config.startChatMethod === 'message' ? (
                      <div
                        style={{
                          backgroundColor: config.colors.messageField,
                          borderRadius: '24px',
                          display: 'flex',
                          alignItems: 'center',
                          padding: '8px 16px',
                          gap: '12px',
                        }}
                      >
                        <Smile size={20} className="text-gray-400" />
                        <input
                          type="text"
                          placeholder="Type a message..."
                          value={message}
                          onChange={(e) => setMessage(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                          className="flex-1 bg-transparent border-none focus:outline-none text-sm"
                          style={{ color: '#111' }}
                        />
                        <Paperclip size={20} className="text-gray-400" />
                        <button
                          onClick={handleSend}
                          style={{ color: config.colors.sendMessageButton }}
                          className="hover:opacity-80 transition-opacity"
                        >
                          <Send size={20} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={handleStartChat}
                        style={{
                          backgroundColor: config.colors.sendMessageButton,
                          color: '#fff',
                          width: '100%',
                          padding: '12px',
                          borderRadius: '24px',
                          fontWeight: '600',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                        }}
                        className="hover:opacity-90 transition-opacity text-sm"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width="20"
                          height="20"
                          fill="currentColor"
                        >
                          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                        </svg>
                        Start Chat with {activeName}
                      </button>
                    )}
                  </div>
                </>
              )}
            </>
          )}
        </div>
      )}

      {/* Bubble */}
      {isBubbleVisible && (
        <button
          onClick={() => {
            if (config.position === 'embed_bubble') {
              handleStartChat();
            } else {
              setIsOpen(!isOpen);
            }
          }}
          style={{
            ...getPositionStyles(),
            backgroundColor: config.colors.bubbleBackground,
            color: config.colors.bubbleIcon,
            borderRadius: config.bubbleText ? '30px' : '50%',
            padding: config.bubbleText ? '12px 24px' : '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            border: 'none',
            cursor: 'pointer',
            zIndex: 40,
            animation: config.animationEnabled ? `bounce 2s infinite` : 'none',
          }}
          className="hover:scale-105 transition-transform"
        >
          <div className="relative">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
            </svg>
            {config.badgeText && (
              <div
                className="absolute -top-2 -right-2 text-[10px] font-bold text-white px-1.5 py-0.5 rounded-full border-2 border-white min-w-[18px] text-center leading-none"
                style={{
                  backgroundColor: config.colors.bubbleNotificationBadge,
                }}
              >
                {config.badgeText}
              </div>
            )}
          </div>
          {config.bubbleText && (
            <span className="font-medium text-base">{config.bubbleText}</span>
          )}
        </button>
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
