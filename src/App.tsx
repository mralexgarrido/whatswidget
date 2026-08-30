import { useState } from 'react';
import { Code2, Github, ShieldCheck } from 'lucide-react';
import { CodeModal } from './components/CodeModal';
import { Preview } from './components/Preview';
import { SettingsPanel } from './components/SettingsPanel';
import { DEFAULT_CONFIG } from './constants';
import { Config } from './types';

export default function App() {
  const [config, setConfig] = useState<Config>(DEFAULT_CONFIG);
  const [isCodeModalOpen, setIsCodeModalOpen] = useState(false);

  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden bg-gray-50 font-sans text-gray-900 lg:h-screen lg:flex-row">
      <aside className="z-10 flex h-[58vh] w-full flex-shrink-0 flex-col border-b border-gray-200 bg-white shadow-sm lg:h-screen lg:w-[400px] lg:border-b-0 lg:border-r">
        <header className="flex items-center justify-between border-b border-gray-200 bg-white p-4">
          <div className="flex min-w-0 items-center gap-2">
            <div
              className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-[#25D366]"
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" width="20" height="20" fill="white">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
            </div>
            <div className="min-w-0">
              <h1 className="truncate text-lg font-semibold">WhatsWidget</h1>
              <p className="truncate text-xs text-gray-500">
                Open-source widget generator
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsCodeModalOpen(true)}
            className="flex flex-shrink-0 items-center gap-2 rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-gray-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
          >
            <Code2 size={16} aria-hidden="true" />
            Get Code
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          <SettingsPanel config={config} setConfig={setConfig} />
        </div>

        <footer className="border-t border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-600">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <a
              href="https://github.com/mralexgarrido/whatswidget"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-gray-700 underline-offset-4 hover:text-gray-950 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              <Github size={14} aria-hidden="true" />
              View on GitHub
            </a>
            <a
              href="https://github.com/mralexgarrido/whatswidget/blob/main/PRIVACY.md"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-medium text-gray-700 underline-offset-4 hover:text-gray-950 hover:underline focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600"
            >
              <ShieldCheck size={14} aria-hidden="true" />
              Privacy
            </a>
          </div>
          <p className="mt-2 leading-relaxed text-gray-500">
            Independent project. Not affiliated with WhatsApp or Meta.
          </p>
        </footer>
      </aside>

      <main className="relative min-h-[42vh] flex-1 overflow-hidden bg-gray-100 lg:min-h-0">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)',
            backgroundSize: '20px 20px',
          }}
        />
        <div className="relative z-0 h-full">
          <Preview config={config} />
        </div>
      </main>

      {isCodeModalOpen && (
        <CodeModal config={config} onClose={() => setIsCodeModalOpen(false)} />
      )}
    </div>
  );
}
