import { useState } from 'react';
import { DEFAULT_CONFIG } from './constants';
import { Config } from './types';
import { SettingsPanel } from './components/SettingsPanel';
import { Preview } from './components/Preview';
import { CodeModal } from './components/CodeModal';
import { Code2 } from 'lucide-react';

export default function App() {
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden font-sans text-gray-900">
      {/* Sidebar & Settings */}
      <div className="w-[400px] flex-shrink-0 bg-white border-r border-gray-200 flex flex-col shadow-sm z-10">
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
              </svg>
            </div>
            <h1 className="font-semibold text-lg">WhatsApp Widget</h1>
          </div>
          <button
            onClick={() => setIsCodeModalOpen(true)}
            className="flex items-center gap-2 bg-gray-900 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <Code2 size={16} />
            Get Code
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          <SettingsPanel config={config} setConfig={setConfig} />
        </div>
      </div>

      {/* Preview Area */}
      <div className="flex-1 relative bg-gray-100 overflow-hidden flex flex-col">
        <div className="absolute inset-0 pointer-events-none" style={{
          backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
        <div className="flex-1 relative z-0">
          <Preview config={config} />
        </div>
      </div>

      {isCodeModalOpen && (
        <CodeModal config={config} onClose={() => setIsCodeModalOpen(false)} />
      )}
    </div>
  );
}
