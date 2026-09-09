import React, { useEffect, useState } from 'react';
import { Config } from '../types';
import { X, Copy, Check } from 'lucide-react';

export function CodeModal({
  config,
  onClose,
}: {
  config: Config;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  const generateCode = () => {
    const configJson = JSON.stringify(config).replace(/</g, '\\u003c');

    return `<script>
(function() {
  function init() {
  if (document.getElementById('whatsapp-widget-container')) return;
  const config = ${configJson};

  // Create container
  const container = document.createElement('div');
  container.id = 'whatsapp-widget-container';
  document.body.appendChild(container);

  // Inject styles
  const style = document.createElement('style');
  style.textContent = \`
    #whatsapp-widget-container {
      font-family: \${config.font}, sans-serif;
      z-index: 2147483647;
    }
    .wa-widget-bubble {
      background-color: \${config.colors.bubbleBackground};
      color: \${config.colors.bubbleIcon};
      border-radius: \${config.bubbleText ? '30px' : '50%'};
      padding: \${config.bubbleText ? '12px 24px' : '16px'};
      display: flex;
      align-items: center;
      gap: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      border: none;
      cursor: pointer;
      transition: transform 0.2s;
      position: \${config.position === 'embed_bubble' ? 'relative' : 'fixed'};
      \${config.position === 'embed_bubble' ? 'margin: 20px auto;' : ''}
      \${config.position === 'floating' ? \`bottom: \${config.verticalOffset}px;\` : ''}
      \${config.position === 'floating' && config.alignment === 'left' ? \`left: \${config.horizontalOffset}px;\` : ''}
      \${config.position === 'floating' && config.alignment === 'right' ? \`right: \${config.horizontalOffset}px;\` : ''}
      \${config.position === 'floating' && config.alignment === 'center' ? \`left: 50%; transform: translateX(-50%);\` : ''}
      \${config.animationEnabled ? 'animation: wa-bounce 2s infinite;' : ''}
      \${config.position === 'embed_window' ? 'display: none;' : ''}
    }
    .wa-widget-bubble:hover {
      transform: \${config.position === 'floating' && config.alignment === 'center' ? 'translateX(-50%) scale(1.05)' : 'scale(1.05)'};
    }
    @keyframes wa-bounce {
      0%, 100% { transform: \${config.position === 'floating' && config.alignment === 'center' ? 'translateX(-50%) translateY(0)' : 'translateY(0)'}; }
      50% { transform: \${config.position === 'floating' && config.alignment === 'center' ? 'translateX(-50%) translateY(-10px)' : 'translateY(-10px)'}; }
    }
    .wa-widget-window {
      width: 350px;
      max-width: calc(100vw - 40px);
      background-color: #fff;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0,0,0,0.15);
      display: \${config.position === 'embed_window' ? 'flex' : 'none'};
      flex-direction: column;
      position: \${config.position === 'embed_window' ? 'relative' : 'fixed'};
      \${config.position === 'embed_window' ? 'margin: 20px auto;' : ''}
      \${config.position === 'floating' ? \`bottom: \${config.verticalOffset + 70}px;\` : ''}
      \${config.position === 'floating' && config.alignment === 'left' ? \`left: \${config.horizontalOffset}px;\` : ''}
      \${config.position === 'floating' && config.alignment === 'right' ? \`right: \${config.horizontalOffset}px;\` : ''}
      \${config.position === 'floating' && config.alignment === 'center' ? \`left: 50%; transform: translateX(-50%);\` : ''}
    }
    .wa-widget-window.wa-open {
      display: flex;
    }
    .wa-header {
      background-color: \${config.colors.headerBackground};
      padding: 16px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #fff;
    }
    .wa-chat-area {
      background-color: \${config.colors.chatWallpaper};
      padding: 20px;
      min-height: 200px;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .wa-welcome-msg {
      background-color: \${config.colors.messageBackground};
      padding: 12px 16px;
      border-radius: 0 8px 8px 8px;
      max-width: 85%;
      align-self: flex-start;
      box-shadow: 0 1px 2px rgba(0,0,0,0.1);
      color: #111;
      font-size: 14px;
      line-height: 1.4;
      white-space: pre-wrap;
    }
    .wa-offline-msg {
      background-color: #fee2e2;
      color: #991b1b;
      padding: 12px 16px;
      border-radius: 8px;
      font-size: 13px;
      line-height: 1.4;
    }
    .wa-agent-item {
      background: #fff;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      margin-bottom: 8px;
      transition: background 0.2s;
    }
    .wa-agent-item:hover {
      background: #f9fafb;
    }
    .wa-input-area {
      padding: 12px;
      background-color: #fff;
      border-top: 1px solid #f0f0f0;
    }
    .wa-input-container {
      background-color: \${config.colors.messageField};
      border-radius: 24px;
      display: flex;
      align-items: center;
      padding: 8px 16px;
      gap: 12px;
    }
    .wa-input {
      flex: 1;
      border: none;
      background: transparent;
      outline: none;
      font-size: 14px;
      color: #111;
    }
    .wa-send-btn {
      color: \${config.colors.sendMessageButton};
      background: none;
      border: none;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }
    .wa-start-btn {
      background-color: \${config.colors.sendMessageButton};
      color: #fff;
      width: 100%;
      padding: 12px;
      border-radius: 24px;
      font-weight: 600;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      border: none;
      cursor: pointer;
    }
  \`;
  document.head.appendChild(style);

  // SVG Icons
  const waIcon = '<svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>';
  const closeIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
  const sendIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';

  // Check working hours
  let isOnline = true;
  if (config.workingHours && config.workingHours.enabled) {
    const now = new Date();
    const day = now.getDay();
    if (config.workingHours.days.indexOf(day) === -1) {
      isOnline = false;
    } else {
      const partsStart = config.workingHours.startTime.split(':').map(Number);
      const partsEnd = config.workingHours.endTime.split(':').map(Number);
      const nowMin = now.getHours() * 60 + now.getMinutes();
      const startMin = partsStart[0] * 60 + partsStart[1];
      const endMin = partsEnd[0] * 60 + partsEnd[1];
      if (nowMin < startMin || nowMin > endMin) isOnline = false;
    }
  }

  // Build agents list HTML if multi-agent enabled
  let agentsHtml = '';
  if (config.enableMultiAgent && config.agents && config.agents.length > 0) {
    agentsHtml = config.agents.map(a => \`
      <div class="wa-agent-item" data-phone="\${a.phoneNumber}">
        <div style="display: flex; align-items: center; gap: 10px;">
          <div style="position: relative;">
            <img src="\${a.profilePicture}" style="width: 36px; height: 36px; border-radius: 50%; object-fit: cover;">
            <div style="position: absolute; bottom: 0; right: 0; width: 8px; height: 8px; border-radius: 50%; border: 1.5px solid #fff; background-color: \${a.isOnline && isOnline ? config.colors.userOnlineStatus : '#9ca3af'};"></div>
          </div>
          <div>
            <div style="font-weight: 600; font-size: 13px;">\${a.name}</div>
            <div style="font-size: 11px; color: #6b7280;">\${a.role}</div>
          </div>
        </div>
        <span style="font-size: 11px; font-weight: 600; color: #25D366; background: rgba(37,211,102,0.1); padding: 4px 8px; border-radius: 12px;">Chat</span>
      </div>
    \`).join('');
  }

  // Build DOM
  container.innerHTML = \`
    <div class="wa-widget-window" id="wa-window">
      <div class="wa-header">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="position: relative;">
            <img id="wa-header-avatar" src="\${config.profilePicture}" alt="Profile" style="width: 44px; height: 44px; border-radius: 50%; object-fit: cover; border: 2px solid rgba(255,255,255,0.2);">
            <div style="position: absolute; bottom: 0; right: 0; width: 10px; height: 10px; border-radius: 50%; border: 2px solid #fff; background-color: \${isOnline ? config.colors.userOnlineStatus : '#9ca3af'};"></div>
          </div>
          <div>
            <div id="wa-header-name" style="font-weight: 600; font-size: 15px;">\${config.name}</div>
            <div id="wa-header-caption" style="font-size: 12px; opacity: 0.9;">\${config.caption}</div>
          </div>
        </div>
        \${config.position !== 'embed_window' ? \`<button id="wa-close-btn" style="background: none; border: none; color: rgba(255,255,255,0.8); cursor: pointer; padding: 4px;">\${closeIcon}</button>\` : ''}
      </div>

      \${config.enableMultiAgent ? \`
        <div style="padding: 12px; background: #f9fafb; min-height: 180px;">
          <div style="font-size: 11px; font-weight: 700; text-transform: uppercase; color: #6b7280; margin-bottom: 8px;">Select a contact</div>
          \${agentsHtml}
        </div>
      \` : \`
        <div class="wa-chat-area">
          \${!isOnline ? \`
            <div class="wa-offline-msg">\${config.workingHours ? config.workingHours.offlineMessage : 'Offline'}</div>
          \` : \`
            <div class="wa-welcome-msg">\${config.welcomeMessage}</div>
          \`}
        </div>
        <div class="wa-input-area">
          \${config.startChatMethod === 'message' ? \`
            <div class="wa-input-container">
              <input type="text" id="wa-input" class="wa-input" placeholder="Type a message..." value="\${config.prefilledMessage || ''}">
              <button id="wa-send-btn" class="wa-send-btn">\${sendIcon}</button>
            </div>
          \` : \`
            <button id="wa-start-btn" class="wa-start-btn">\${waIcon} Start Chat</button>
          \`}
        </div>
      \`}
    </div>

    \${config.position !== 'embed_window' ? \`
    <button class="wa-widget-bubble" id="wa-bubble">
      <div style="position: relative;">
        \${waIcon}
        \${config.badgeText ? \`<div style="position: absolute; top: -6px; right: -6px; min-width: 18px; text-align: center; font-size: 10px; font-weight: 700; color: #fff; background-color: \${config.colors.bubbleNotificationBadge}; border: 2px solid #fff; border-radius: 10px; padding: 1px 4px;">\${config.badgeText}</div>\` : ''}
      </div>
      \${config.bubbleText ? \`<span style="font-weight: 500; font-size: 15px;">\${config.bubbleText}</span>\` : ''}
    </button>
    \` : ''}
  \`;

  // Logic
  const bubble = document.getElementById('wa-bubble');
  const win = document.getElementById('wa-window');
  const closeBtn = document.getElementById('wa-close-btn');
  const sendBtn = document.getElementById('wa-send-btn');
  const startBtn = document.getElementById('wa-start-btn');
  const input = document.getElementById('wa-input');

  const openWhatsApp = (phoneNum, text) => {
    const phone = (phoneNum || config.phoneNumber).replace(/[^0-9]/g, '');
    const msgText = text !== undefined ? text : (config.prefilledMessage || '');
    const url = \`https://api.whatsapp.com/send/?phone=\${phone}&text=\${encodeURIComponent(msgText)}&type=phone_number&app_absent=0\`;
    window.open(url, '_blank');
  };

  const toggleWindow = () => {
    if (config.position === 'embed_bubble') {
      openWhatsApp(config.phoneNumber, config.prefilledMessage);
      return;
    }
    win.classList.toggle('wa-open');
  };

  if (bubble) bubble.addEventListener('click', toggleWindow);
  if (closeBtn) closeBtn.addEventListener('click', toggleWindow);

  // Auto open delay
  if (config.autoOpenDelay > 0 && config.position === 'floating') {
    setTimeout(() => {
      if (win && !win.classList.contains('wa-open')) {
        win.classList.add('wa-open');
      }
    }, config.autoOpenDelay * 1000);
  }

  // Single agent event listeners
  if (sendBtn && input) {
    const handleSend = () => {
      openWhatsApp(config.phoneNumber, input.value);
    };
    sendBtn.addEventListener('click', handleSend);
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSend();
    });
  }

  if (startBtn) {
    startBtn.addEventListener('click', () => openWhatsApp(config.phoneNumber, config.prefilledMessage));
  }

  // Multi agent event listeners
  const agentItems = container.querySelectorAll('.wa-agent-item');
  agentItems.forEach(item => {
    item.addEventListener('click', () => {
      const phone = item.getAttribute('data-phone');
      openWhatsApp(phone, config.prefilledMessage);
    });
  });
  }
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>`;
  };

  const code = generateCode();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopyError(false);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-4">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="widget-code-title"
        className="bg-white rounded-xl shadow-2xl w-full max-w-3xl overflow-hidden flex flex-col max-h-[calc(100dvh-1.5rem)] sm:max-h-[90vh]"
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2
            id="widget-code-title"
            className="text-lg font-semibold text-gray-900 sm:text-xl"
          >
            Your Custom Widget Code
          </h2>
          <button
            type="button"
            aria-label="Close code dialog"
            onClick={onClose}
            className="rounded-md p-2 text-gray-500 transition-colors hover:text-gray-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
          >
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          <p className="text-gray-600 mb-4 text-sm leading-relaxed">
            Copy the standalone JavaScript snippet below and paste it before the
            closing <code>&lt;/body&gt;</code> tag on your HTML website.
            For Google Tag Manager, use a Custom HTML tag, paste the entire
            snippet including the script tags, and select a DOM Ready trigger.
            Test in Preview before publishing. Use floating placement for GTM.
            Previously copied snippets must be replaced with newly generated code.
          </p>

          <div className="relative group">
            <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-xs font-mono leading-relaxed max-h-[450px]">
              <code>{code}</code>
            </pre>
            <button
              type="button"
              onClick={handleCopy}
              className="sticky left-full top-2 mb-2 flex min-h-11 items-center gap-2 rounded-md bg-gray-700 px-3 py-2 text-white shadow-lg transition-colors hover:bg-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              {copied ? (
                <Check size={16} className="text-green-400" />
              ) : (
                <Copy size={16} />
              )}
              <span className="text-xs font-medium">
                {copied ? 'Copied!' : 'Copy Code'}
              </span>
            </button>
          </div>
          <p className="mt-3 min-h-5 text-sm" aria-live="polite">
            {copied && (
              <span className="text-emerald-700">
                Code copied to your clipboard.
              </span>
            )}
            {copyError && (
              <span className="text-red-700">
                Copy was blocked by your browser. Select the code and copy it
                manually.
              </span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
}
