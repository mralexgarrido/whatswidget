import React, { useState } from 'react';
import { Config, Agent, PresetKey } from '../types';
import { PRESETS } from '../constants';
import {
  Plug,
  MessageSquare,
  Settings,
  Palette,
  Users,
  Clock,
  Sparkles,
  Plus,
  Trash2,
} from 'lucide-react';

type Props = {
  config: Config;
  setConfig: React.Dispatch<React.SetStateAction<Config>>;
};

export function SettingsPanel({ config, setConfig }: Props) {
  const [activeTab, setActiveTab] = useState<
    | 'presets'
    | 'connect'
    | 'content'
    | 'agents'
    | 'triggers'
    | 'settings'
    | 'appearance'
  >('presets');

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateConfig = (key: keyof Config, value: any) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const applyPreset = (presetKey: PresetKey) => {
    const presetData = PRESETS[presetKey];
    if (presetData) {
      setConfig((prev) => ({
        ...prev,
        ...presetData,
        preset: presetKey,
      }));
    }
  };

  const updateColor = (key: keyof Config['colors'], value: string) => {
    setConfig((prev) => ({
      ...prev,
      colors: { ...prev.colors, [key]: value },
    }));
  };

  const addAgent = () => {
    const newAgent: Agent = {
      id: Date.now().toString(),
      name: 'New Support Agent',
      role: 'Customer Support',
      phoneNumber: config.phoneNumber || '+13833739407',
      profilePicture:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
      isOnline: true,
    };
    setConfig((prev) => ({
      ...prev,
      agents: [...prev.agents, newAgent],
    }));
  };

  const updateAgent = (
    id: string,
    field: keyof Agent,
    value: string | boolean,
  ) => {
    setConfig((prev) => ({
      ...prev,
      agents: prev.agents.map((agent) =>
        agent.id === id ? { ...agent, [field]: value } : agent,
      ),
    }));
  };

  const removeAgent = (id: string) => {
    setConfig((prev) => ({
      ...prev,
      agents: prev.agents.filter((a) => a.id !== id),
    }));
  };

  const toggleDay = (dayIndex: number) => {
    const currentDays = config.workingHours.days;
    const updated = currentDays.includes(dayIndex)
      ? currentDays.filter((d) => d !== dayIndex)
      : [...currentDays, dayIndex].sort();
    updateConfig('workingHours', { ...config.workingHours, days: updated });
  };

  return (
    <div className="flex h-full">
      {/* Tabs Sidebar */}
      <div className="w-20 bg-gray-900 text-gray-400 flex flex-col items-center py-4 gap-5 flex-shrink-0 select-none">
        <TabButton
          icon={<Sparkles size={20} />}
          label="Presets"
          isActive={activeTab === 'presets'}
          onClick={() => setActiveTab('presets')}
        />
        <TabButton
          icon={<Plug size={20} />}
          label="Connect"
          isActive={activeTab === 'connect'}
          onClick={() => setActiveTab('connect')}
        />
        <TabButton
          icon={<MessageSquare size={20} />}
          label="Content"
          isActive={activeTab === 'content'}
          onClick={() => setActiveTab('content')}
        />
        <TabButton
          icon={<Users size={20} />}
          label="Agents"
          isActive={activeTab === 'agents'}
          onClick={() => setActiveTab('agents')}
        />
        <TabButton
          icon={<Clock size={20} />}
          label="Triggers"
          isActive={activeTab === 'triggers'}
          onClick={() => setActiveTab('triggers')}
        />
        <TabButton
          icon={<Settings size={20} />}
          label="Settings"
          isActive={activeTab === 'settings'}
          onClick={() => setActiveTab('settings')}
        />
        <TabButton
          icon={<Palette size={20} />}
          label="Style"
          isActive={activeTab === 'appearance'}
          onClick={() => setActiveTab('appearance')}
        />
      </div>

      {/* Tab Content */}
      <div className="flex-1 bg-[#2b2b2b] text-gray-200 overflow-y-auto p-5">
        {activeTab === 'presets' && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-white mb-2 text-center">
              Ready-made Templates
            </h2>
            <p className="text-xs text-gray-400 text-center mb-4">
              Choose a pre-designed layout to instantly apply styles and
              content.
            </p>

            <div className="grid grid-cols-1 gap-3">
              {(
                [
                  'support',
                  'sales',
                  'booking',
                  'minimal',
                  'dark',
                ] as PresetKey[]
              ).map((key) => {
                const preset = PRESETS[key];
                const isSelected = config.preset === key;
                return (
                  <button
                    key={key}
                    onClick={() => applyPreset(key)}
                    className={`text-left p-3.5 rounded-lg border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-[#25D366] bg-[#3a3a3a] ring-1 ring-[#25D366]'
                        : 'border-gray-700 bg-[#333333] hover:border-gray-500'
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-sm text-white flex items-center gap-2">
                        {preset.name}
                        {isSelected && (
                          <span className="text-[10px] bg-[#25D366] text-black font-bold px-1.5 py-0.5 rounded">
                            ACTIVE
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {preset.caption}
                      </div>
                    </div>
                    <div
                      className="w-6 h-6 rounded-full border border-white/20 flex-shrink-0"
                      style={{
                        backgroundColor: preset.colors?.bubbleBackground,
                      }}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'connect' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white mb-4 text-center">
              WhatsApp Connection
            </h2>
            <div className="bg-[#3a3a3a] p-4 rounded-lg space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Primary WhatsApp Number
                </label>
                <input
                  type="text"
                  value={config.phoneNumber}
                  onChange={(e) => updateConfig('phoneNumber', e.target.value)}
                  placeholder="+13833739407"
                  className="w-full bg-[#2b2b2b] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#25D366]"
                />
                <p className="text-xs text-gray-400 mt-2 leading-relaxed">
                  Include country code (e.g. +13833739407). Avoid spaces or
                  special characters other than standard +.
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">
                  Default Pre-filled Message
                </label>
                <input
                  type="text"
                  value={config.prefilledMessage}
                  onChange={(e) =>
                    updateConfig('prefilledMessage', e.target.value)
                  }
                  placeholder="Hi! I have a question about..."
                  className="w-full bg-[#2b2b2b] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#25D366]"
                />
                <p className="text-xs text-gray-400 mt-2">
                  This text will automatically populate in the user&apos;s
                  WhatsApp chat when opened.
                </p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-white mb-4 text-center">
              Content & Messaging
            </h2>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase">
                Chat Bubble
              </h3>
              <div className="bg-[#3a3a3a] p-4 rounded-lg space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Bubble Label Text
                  </label>
                  <input
                    type="text"
                    value={config.bubbleText}
                    onChange={(e) => updateConfig('bubbleText', e.target.value)}
                    placeholder="Chat with us"
                    className="w-full bg-[#2b2b2b] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#25D366]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Badge Count / Text
                  </label>
                  <input
                    type="text"
                    value={config.badgeText}
                    onChange={(e) => updateConfig('badgeText', e.target.value)}
                    placeholder="1"
                    className="w-full bg-[#2b2b2b] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#25D366]"
                  />
                </div>
              </div>

              <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase pt-2">
                Header Info
              </h3>
              <div className="bg-[#3a3a3a] p-4 rounded-lg space-y-3">
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Profile Picture URL
                  </label>
                  <input
                    type="text"
                    value={config.profilePicture}
                    onChange={(e) =>
                      updateConfig('profilePicture', e.target.value)
                    }
                    className="w-full bg-[#2b2b2b] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#25D366]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Header Title / Name
                  </label>
                  <input
                    type="text"
                    value={config.name}
                    onChange={(e) => updateConfig('name', e.target.value)}
                    className="w-full bg-[#2b2b2b] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#25D366]"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1.5">
                    Status Caption
                  </label>
                  <input
                    type="text"
                    value={config.caption}
                    onChange={(e) => updateConfig('caption', e.target.value)}
                    className="w-full bg-[#2b2b2b] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#25D366]"
                  />
                </div>
              </div>

              <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase pt-2">
                Welcome Message
              </h3>
              <div className="bg-[#3a3a3a] p-4 rounded-lg">
                <textarea
                  value={config.welcomeMessage}
                  onChange={(e) =>
                    updateConfig('welcomeMessage', e.target.value)
                  }
                  rows={3}
                  className="w-full bg-[#2b2b2b] border border-gray-600 rounded px-3 py-2 text-white focus:outline-none focus:border-[#25D366] resize-none"
                />
              </div>

              <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase pt-2">
                Start Chat Action Method
              </h3>
              <div className="bg-[#3a3a3a] p-4 rounded-lg space-y-3">
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
                    <div className="font-medium text-sm">
                      Interactive Input Box
                    </div>
                    <div className="text-xs text-gray-400">
                      Allows visitors to type their initial message inside the
                      chat window.
                    </div>
                  </div>
                </label>
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
                    <div className="font-medium text-sm">
                      Direct Start Button
                    </div>
                    <div className="text-xs text-gray-400">
                      Single click opens WhatsApp directly with pre-filled text.
                    </div>
                  </div>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'agents' && (
          <div className="space-y-5">
            <h2 className="text-lg font-semibold text-white mb-4 text-center">
              Team & Multi-Agent Mode
            </h2>

            <div className="bg-[#3a3a3a] p-4 rounded-lg flex items-center justify-between">
              <div>
                <div className="font-medium text-sm text-white">
                  Enable Multi-Agent List
                </div>
                <div className="text-xs text-gray-400">
                  Display multiple team members inside the widget
                </div>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={config.enableMultiAgent}
                  onChange={(e) =>
                    updateConfig('enableMultiAgent', e.target.checked)
                  }
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#25D366]"></div>
              </label>
            </div>

            {config.enableMultiAgent && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-400 tracking-wider uppercase">
                    Team Members ({config.agents.length})
                  </span>
                  <button
                    onClick={addAgent}
                    className="flex items-center gap-1 text-xs bg-[#25D366] text-black font-semibold px-2.5 py-1 rounded hover:bg-[#20bd5a] transition-colors"
                  >
                    <Plus size={14} /> Add Agent
                  </button>
                </div>

                {config.agents.map((agent) => (
                  <div
                    key={agent.id}
                    className="bg-[#3a3a3a] p-4 rounded-lg space-y-3 relative group"
                  >
                    <button
                      onClick={() => removeAgent(agent.id)}
                      className="absolute top-3 right-3 text-gray-400 hover:text-red-400 transition-colors"
                      title="Remove Agent"
                    >
                      <Trash2 size={16} />
                    </button>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium mb-1 text-gray-300">
                          Name
                        </label>
                        <input
                          type="text"
                          value={agent.name}
                          onChange={(e) =>
                            updateAgent(agent.id, 'name', e.target.value)
                          }
                          className="w-full bg-[#2b2b2b] border border-gray-600 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1 text-gray-300">
                          Role / Job Title
                        </label>
                        <input
                          type="text"
                          value={agent.role}
                          onChange={(e) =>
                            updateAgent(agent.id, 'role', e.target.value)
                          }
                          className="w-full bg-[#2b2b2b] border border-gray-600 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-gray-300">
                        WhatsApp Number
                      </label>
                      <input
                        type="text"
                        value={agent.phoneNumber}
                        onChange={(e) =>
                          updateAgent(agent.id, 'phoneNumber', e.target.value)
                        }
                        className="w-full bg-[#2b2b2b] border border-gray-600 rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1 text-gray-300">
                        Avatar Image URL
                      </label>
                      <input
                        type="text"
                        value={agent.profilePicture}
                        onChange={(e) =>
                          updateAgent(
                            agent.id,
                            'profilePicture',
                            e.target.value,
                          )
                        }
                        className="w-full bg-[#2b2b2b] border border-gray-600 rounded px-2.5 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'triggers' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white mb-4 text-center">
              Triggers & Working Hours
            </h2>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase">
                Auto-Open Popup Trigger
              </h3>
              <div className="bg-[#3a3a3a] p-4 rounded-lg space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-medium">Auto-Open Delay</label>
                  <span className="text-[#25D366] text-sm font-semibold">
                    {config.autoOpenDelay === 0
                      ? 'Disabled'
                      : `${config.autoOpenDelay} seconds`}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="30"
                  value={config.autoOpenDelay}
                  onChange={(e) =>
                    updateConfig('autoOpenDelay', parseInt(e.target.value))
                  }
                  className="w-full"
                />
                <p className="text-xs text-gray-400">
                  Automatically expands the chat window after a visitor spends X
                  seconds on the site.
                </p>
              </div>

              <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase pt-2">
                Business Hours Schedule
              </h3>
              <div className="bg-[#3a3a3a] p-4 rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm text-white">
                      Enable Operating Hours
                    </div>
                    <div className="text-xs text-gray-400">
                      Display offline notice outside active hours
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      checked={config.workingHours.enabled}
                      onChange={(e) =>
                        updateConfig('workingHours', {
                          ...config.workingHours,
                          enabled: e.target.checked,
                        })
                      }
                    />
                    <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#25D366]"></div>
                  </label>
                </div>

                {config.workingHours.enabled && (
                  <>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-medium mb-1">
                          Start Time
                        </label>
                        <input
                          type="time"
                          value={config.workingHours.startTime}
                          onChange={(e) =>
                            updateConfig('workingHours', {
                              ...config.workingHours,
                              startTime: e.target.value,
                            })
                          }
                          className="w-full bg-[#2b2b2b] border border-gray-600 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-medium mb-1">
                          End Time
                        </label>
                        <input
                          type="time"
                          value={config.workingHours.endTime}
                          onChange={(e) =>
                            updateConfig('workingHours', {
                              ...config.workingHours,
                              endTime: e.target.value,
                            })
                          }
                          className="w-full bg-[#2b2b2b] border border-gray-600 rounded px-2.5 py-1.5 text-xs text-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium mb-2">
                        Active Work Days
                      </label>
                      <div className="flex justify-between bg-[#2b2b2b] p-1.5 rounded border border-gray-600">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(
                          (day, idx) => {
                            const isActive =
                              config.workingHours.days.includes(idx);
                            return (
                              <button
                                key={day}
                                onClick={() => toggleDay(idx)}
                                className={`text-xs px-2 py-1 rounded font-medium transition-colors ${
                                  isActive
                                    ? 'bg-[#25D366] text-black font-bold'
                                    : 'text-gray-400 hover:text-white'
                                }`}
                              >
                                {day[0]}
                              </button>
                            );
                          },
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium mb-1">
                        Offline Message
                      </label>
                      <textarea
                        value={config.workingHours.offlineMessage}
                        onChange={(e) =>
                          updateConfig('workingHours', {
                            ...config.workingHours,
                            offlineMessage: e.target.value,
                          })
                        }
                        rows={2}
                        className="w-full bg-[#2b2b2b] border border-gray-600 rounded px-2.5 py-1.5 text-xs text-white resize-none"
                      />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white mb-4 text-center">
              Position & Features
            </h2>

            <div className="space-y-4">
              <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase">
                Layout Mode
              </h3>
              <div className="bg-[#3a3a3a] p-4 rounded-lg space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="position"
                    value="floating"
                    checked={config.position === 'floating'}
                    onChange={() => updateConfig('position', 'floating')}
                  />
                  <span className="text-sm">Floating Corner Bubble</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="position"
                    value="embed_bubble"
                    checked={config.position === 'embed_bubble'}
                    onChange={() => updateConfig('position', 'embed_bubble')}
                  />
                  <span className="text-sm">Embedded Inline Bubble</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="position"
                    value="embed_window"
                    checked={config.position === 'embed_window'}
                    onChange={() => updateConfig('position', 'embed_window')}
                  />
                  <span className="text-sm">Embedded Inline Chat Window</span>
                </label>
              </div>

              {config.position === 'floating' && (
                <div className="bg-[#3a3a3a] rounded-lg overflow-hidden">
                  <div className="p-4 border-b border-gray-600">
                    <label className="block text-xs font-medium mb-2.5">
                      Alignment
                    </label>
                    <div className="flex bg-[#2b2b2b] rounded p-1">
                      <button
                        className={`flex-1 py-1 text-xs rounded font-medium ${config.alignment === 'left' ? 'bg-[#25D366] text-black font-bold' : 'text-gray-400'}`}
                        onClick={() => updateConfig('alignment', 'left')}
                      >
                        Left
                      </button>
                      <button
                        className={`flex-1 py-1 text-xs rounded font-medium ${config.alignment === 'center' ? 'bg-[#25D366] text-black font-bold' : 'text-gray-400'}`}
                        onClick={() => updateConfig('alignment', 'center')}
                      >
                        Center
                      </button>
                      <button
                        className={`flex-1 py-1 text-xs rounded font-medium ${config.alignment === 'right' ? 'bg-[#25D366] text-black font-bold' : 'text-gray-400'}`}
                        onClick={() => updateConfig('alignment', 'right')}
                      >
                        Right
                      </button>
                    </div>
                  </div>

                  <div className="p-4 border-b border-gray-600">
                    <div className="flex justify-between mb-2">
                      <label className="text-xs font-medium">
                        Vertical Offset
                      </label>
                      <span className="text-[#25D366] text-xs font-semibold">
                        {config.verticalOffset}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={config.verticalOffset}
                      onChange={(e) =>
                        updateConfig('verticalOffset', parseInt(e.target.value))
                      }
                      className="w-full"
                    />
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between mb-2">
                      <label className="text-xs font-medium">
                        Horizontal Offset
                      </label>
                      <span className="text-[#25D366] text-xs font-semibold">
                        {config.horizontalOffset}px
                      </span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={config.horizontalOffset}
                      onChange={(e) =>
                        updateConfig(
                          'horizontalOffset',
                          parseInt(e.target.value),
                        )
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              )}

              <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase pt-2">
                Desktop Options
              </h3>
              <div className="bg-[#3a3a3a] p-4 rounded-lg flex items-center justify-between">
                <div>
                  <div className="font-medium text-sm text-white">
                    Show QR Code
                  </div>
                  <div className="text-xs text-gray-400">
                    Allows desktop visitors to scan QR to chat
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={config.showQrCode}
                    onChange={(e) =>
                      updateConfig('showQrCode', e.target.checked)
                    }
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#25D366]"></div>
                </label>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appearance' && (
          <div className="space-y-6">
            <h2 className="text-lg font-semibold text-white mb-4 text-center">
              Appearance & Colors
            </h2>

            <div className="bg-[#3a3a3a] rounded-lg overflow-hidden mb-4">
              <div className="p-4 border-b border-gray-600">
                <label className="block text-xs font-medium mb-2">
                  Font Family
                </label>
                <select
                  value={config.font}
                  onChange={(e) => updateConfig('font', e.target.value)}
                  className="w-full bg-[#2b2b2b] border border-gray-600 rounded px-3 py-2 text-xs text-white focus:outline-none focus:border-[#25D366]"
                >
                  <option value="inherit">Default (System Font)</option>
                  <option value="Arial, sans-serif">Arial</option>
                  <option value="'Segoe UI', Tahoma, Geneva, Verdana, sans-serif">
                    Segoe UI
                  </option>
                  <option value="'Helvetica Neue', Helvetica, Arial, sans-serif">
                    Helvetica
                  </option>
                  <option value="'Inter', sans-serif">Inter</option>
                  <option value="'Roboto', sans-serif">Roboto</option>
                </select>
              </div>
            </div>

            <div className="bg-[#3a3a3a] rounded-lg overflow-hidden">
              <ColorPickerRow
                label="Bubble Background"
                value={config.colors.bubbleBackground}
                onChange={(v) => updateColor('bubbleBackground', v)}
              />
              <ColorPickerRow
                label="Bubble Icon Color"
                value={config.colors.bubbleIcon}
                onChange={(v) => updateColor('bubbleIcon', v)}
              />
              <ColorPickerRow
                label="Notification Badge Color"
                value={config.colors.bubbleNotificationBadge}
                onChange={(v) => updateColor('bubbleNotificationBadge', v)}
              />
              <ColorPickerRow
                label="Header Background"
                value={config.colors.headerBackground}
                onChange={(v) => updateColor('headerBackground', v)}
              />
              <ColorPickerRow
                label="Online Status Indicator"
                value={config.colors.userOnlineStatus}
                onChange={(v) => updateColor('userOnlineStatus', v)}
              />
              <ColorPickerRow
                label="Chat Wallpaper Color"
                value={config.colors.chatWallpaper}
                onChange={(v) => updateColor('chatWallpaper', v)}
              />
              <ColorPickerRow
                label="Message Background"
                value={config.colors.messageBackground}
                onChange={(v) => updateColor('messageBackground', v)}
              />
              <ColorPickerRow
                label="Send Button / Accent"
                value={config.colors.sendMessageButton}
                onChange={(v) => updateColor('sendMessageButton', v)}
              />
            </div>

            <h3 className="text-xs font-bold text-gray-400 tracking-wider uppercase pt-2">
              Bubble Animation
            </h3>
            <div className="bg-[#3a3a3a] p-4 rounded-lg flex items-center justify-between">
              <label className="text-xs font-medium">Bounce Animation</label>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={config.animationEnabled}
                  onChange={(e) =>
                    updateConfig('animationEnabled', e.target.checked)
                  }
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#25D366]"></div>
              </label>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({
  icon,
  label,
  isActive,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center gap-1 w-full transition-colors py-1 ${
        isActive ? 'text-[#25D366]' : 'hover:text-gray-200'
      }`}
    >
      <div>{icon}</div>
      <span className="text-[9px] uppercase tracking-wider font-semibold">
        {label}
      </span>
    </button>
  );
}

function ColorPickerRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center justify-between p-3.5 border-b border-gray-600 last:border-0">
      <span className="text-xs">{label}</span>
      <div className="relative w-7 h-7 rounded-full overflow-hidden border border-gray-500 cursor-pointer">
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="absolute -top-2 -left-2 w-11 h-11 cursor-pointer"
        />
      </div>
    </div>
  );
}
