import React, { useState } from 'react';
import { Config } from '../types';
import { Plug, MessageSquare, Settings, Palette } from 'lucide-react';

type Props = {
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
};

export function SettingsPanel({ config, setConfig }: Props) {
  const [activeTab, setActiveTab] = useState<'connect' | 'content' | 'settings' | 'appearance'>('connect');

  const updateConfig = (key: keyof Config, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const updateColor = (key: keyof Config['colors'], value: string) => {
    setConfig((prev) => ({ ...prev, colors: { ...prev.colors, [key]: value } }));
  };

  return (
    <div className="flex h-full">
      {/* Tabs Sidebar */}
      <div className="w-20 bg-gray-900 text-gray-400 flex flex-col items-center py-4 gap-6 flex-shrink-0">
        <TabButton
          icon={<Plug size={24} />}
          label="Connect"
          isActive={activeTab === 'connect'}
          onClick={() => setActiveTab('connect')}
        />
        <TabButton
          icon={<MessageSquare size={24} />}
          label="Content"
          isActive={activeTab === 'content'}
          onClick={() => setActiveTab('content')}
        />
        <TabButton
          icon={<Settings size={24} />}
          label="Settings"
          isActive={activeTab === 'settings'}
          onClick={() => setActiveTab('settings')}
        />
        <TabButton
          icon={<Palette size={24} />}
          label="Appearance"
          isActive={activeTab === 'appearance'}
          onClick={() => setActiveTab('appearance')}
        />
      </div>

      {/* Tab Content */}
      <div className="flex-1 bg-[#2b2b2b] text-gray-200 overflow-y-auto p-6">
        {activeTab === 'connect' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">Connect</h2>
            <div className="bg-[#3a3a3a] p-4 rounded-lg">
              <label className="block text-sm font-medium mb-2 text-gray-300">WhatsApp Number or Link</label>
              <input
                type="text"
                value={config.phoneNumber}
                onChange={(e) => updateConfig('phoneNumber', e.target.value)}
                placeholder="+1234567890"
                className="w-full bg-[#2b2b2b] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#25D366]"
              />
              <p className="text-xs text-gray-400 mt-2">
                Example: +13833739407<br />
                Please include country code and do not start with 0 or 00.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">Content</h2>
            
            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase">Chat Bubble</h3>
              <div className="bg-[#3a3a3a] p-4 rounded-lg space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Bubble Text</label>
                  <input
                    type="text"
                    value={config.bubbleText}
                    onChange={(e) => updateConfig('bubbleText', e.target.value)}
                    placeholder="Chat with us"
                    className="w-full bg-[#2b2b2b] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#25D366]"
                  />
                </div>
              </div>

              <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase pt-4">Chat Window</h3>
              <div className="bg-[#3a3a3a] p-4 rounded-lg space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Picture URL</label>
                  <input
                    type="text"
                    value={config.profilePicture}
                    onChange={(e) => updateConfig('profilePicture', e.target.value)}
                    className="w-full bg-[#2b2b2b] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#25D366]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Name</label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => updateConfig('name', e.target.value)}
                    className="w-full bg-[#2b2b2b] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#25D366]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Caption</label>
                  <input
                    type="text"
                    value={config.caption}
                    onChange={(e) => updateConfig('caption', e.target.value)}
                    className="w-full bg-[#2b2b2b] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#25D366]"
                  />
                </div>
              </div>

              <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase pt-4">Welcome Message</h3>
              <div className="bg-[#3a3a3a] p-4 rounded-lg">
                <textarea
                  value={config.welcomeMessage}
                  onChange={(e) => updateConfig('welcomeMessage', e.target.value)}
                  rows={4}
                  className="w-full bg-[#2b2b2b] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#25D366] resize-none"
                />
              </div>

              <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase pt-4">Start Chat Method</h3>
              <div className="bg-[#3a3a3a] p-4 rounded-lg space-y-3">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="startChatMethod"
                    value="button"
                    checked={config.startChatMethod === 'button'}
                    onChange={() => updateConfig('startChatMethod', 'button')}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium">Start Chat Button</div>
                    <div className="text-xs text-gray-400">Visitor clicks the button to open WhatsApp.</div>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="startChatMethod"
                    value="message"
                    checked={config.startChatMethod === 'message'}
                    onChange={() => updateConfig('startChatMethod', 'message')}
                    className="mt-1"
                  />
                  <div>
                    <div className="font-medium">Send Message</div>
                    <div className="text-xs text-gray-400">Visitor writes a message to you in WhatsApp to start a conversation.</div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">Position</h2>
            
            <div className="bg-[#3a3a3a] p-4 rounded-lg space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="position"
                  value="floating"
                  checked={config.position === 'floating'}
                  onChange={() => updateConfig('position', 'floating')}
                />
                <span>Floating Bubble</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="position"
                  value="embed_bubble"
                  checked={config.position === 'embed_bubble'}
                  onChange={() => updateConfig('position', 'embed_bubble')}
                />
                <span>Embed Bubble</span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="position"
                  value="embed_window"
                  checked={config.position === 'embed_window'}
                  onChange={() => updateConfig('position', 'embed_window')}
                />
                <span>Embed Chat Window</span>
              </label>
            </div>

            {config.position === 'floating' && (
              <div className="bg-[#3a3a3a] rounded-lg overflow-hidden">
                <div className="p-4 border-b border-gray-600">
                  <label className="block text-sm font-medium mb-3">Alignment</label>
                  <div className="flex bg-[#2b2b2b] rounded p-1">
                    <button
                      className={`flex-1 py-1 text-sm rounded ${config.alignment === 'left' ? 'bg-[#1a73e8] text-white' : 'text-gray-400'}`}
                      onClick={() => updateConfig('alignment', 'left')}
                    >
                      Left
                    </button>
                    <button
                      className={`flex-1 py-1 text-sm rounded ${config.alignment === 'center' ? 'bg-[#1a73e8] text-white' : 'text-gray-400'}`}
                      onClick={() => updateConfig('alignment', 'center')}
                    >
                      Center
                    </button>
                    <button
                      className={`flex-1 py-1 text-sm rounded ${config.alignment === 'right' ? 'bg-[#1a73e8] text-white' : 'text-gray-400'}`}
                      onClick={() => updateConfig('alignment', 'right')}
                    >
                      Right
                    </button>
                  </div>
                </div>
                
                <div className="p-4 border-b border-gray-600">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Vertical Offset</label>
                    <span className="text-[#1a73e8] text-sm">{config.verticalOffset}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={config.verticalOffset}
                    onChange={(e) => updateConfig('verticalOffset', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>

                <div className="p-4">
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Horizontal Offset</label>
                    <span className="text-[#1a73e8] text-sm">{config.horizontalOffset}px</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={config.horizontalOffset}
                    onChange={(e) => updateConfig('horizontalOffset', parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </div>
            )}
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-white mb-4 text-center">Appearance</h2>
            
            <div className="bg-[#3a3a3a] rounded-lg overflow-hidden mb-4">
              <div className="p-4 border-b border-gray-600">
                <label className="block text-sm font-medium mb-3">Font</label>
                <select
                  value={config.font}
                  onChange={(e) => updateConfig('font', e.target.value)}
                  className="w-full bg-[#2b2b2b] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#25D366]"
                >
                  <option value="inherit">Default</option>
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">Segoe UI</option>
                  <option value="'Helvetica Neue', Helvetica, Arial, sans-serif">Helvetica</option>
                  <option value="'Times New Roman', Times, serif">Times New Roman</option>
                </select>
              </div>
            </div>

            <div className="bg-[#3a3a3a] rounded-lg overflow-hidden">
              <ColorPickerRow label="Bubble Background Color" value={config.colors.bubbleBackground} onChange={(v) => updateColor('bubbleBackground', v)} />
              <ColorPickerRow label="Bubble Icon Color" value={config.colors.bubbleIcon} onChange={(v) => updateColor('bubbleIcon', v)} />
              <ColorPickerRow label="Bubble Notification Badge" value={config.colors.bubbleNotificationBadge} onChange={(v) => updateColor('bubbleNotificationBadge', v)} />
              <ColorPickerRow label="Header Background Color" value={config.colors.headerBackground} onChange={(v) => updateColor('headerBackground', v)} />
              <ColorPickerRow label="User Online Status Color" value={config.colors.userOnlineStatus} onChange={(v) => updateColor('userOnlineStatus', v)} />
              <ColorPickerRow label="Chat Wallpaper" value={config.colors.chatWallpaper} onChange={(v) => updateColor('chatWallpaper', v)} />
              <ColorPickerRow label="Message Background Color" value={config.colors.messageBackground} onChange={(v) => updateColor('messageBackground', v)} />
              <ColorPickerRow label="Message Field Color" value={config.colors.messageField} onChange={(v) => updateColor('messageField', v)} />
              <ColorPickerRow label="Send Message Button Color" value={config.colors.sendMessageButton} onChange={(v) => updateColor('sendMessageButton', v)} />
            </div>

            <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase pt-4">Bubble Animation</h3>
            <div className="bg-[#3a3a3a] p-4 rounded-lg flex items-center justify-between">
              <label className="text-sm font-medium">Enable Animation</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  className="sr-only peer" 
                  checked={config.animationEnabled}
                  onChange={(e) => updateConfig('animationEnabled', e.target.checked)}
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#1a73e8]"></div>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ icon, label, isActive, onClick }: { icon: React.ReactNode; label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 w-full transition-colors ${isActive ? 'text-white' : 'hover:text-gray-200'}`}
    >
      <div className={isActive ? 'text-[#25D366]' : ''}>{icon}</div>
      <span className="text-[10px] uppercase tracking-wider">{label}</span>
    </button>
  );
}

function ColorPickerRow({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div className="flex items-center justify-between p-4 border-b border-gray-600 last:border-0">
      <span className="text-sm">{label}</span>
      <div className="relative w-8 h-8 rounded-full overflow-hidden border border-gray-500 cursor-pointer">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute -top-2 -left-2 w-12 h-12 cursor-pointer"
        />
      </div>
    </div>
  );
}
