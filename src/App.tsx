import { useState } from 'react';
import { Compass, Settings, Mail } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { useDimensions } from './hooks/useDimensions';
import { SliderPanel } from './components/SliderPanel';
import { ResultPanel } from './components/ResultPanel';
import { InfoPage } from './components/InfoPage';

function App() {
  const { sliderState, setDimension, results, rules, setRules } = useDimensions();
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-gray-900">AufgabenKompass</h1>
            <p className="text-xs text-gray-500">
              für den berufskundlichen Unterricht
            </p>
          </div>
          <button
            onClick={() => setShowInfo(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm hover:bg-gray-100 transition-colors text-gray-400 hover:text-emerald-600"
            title="Wie funktioniert der AufgabenKompass?"
          >
            <Settings className="w-4 h-4" />
            <span>Einstellungen</span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-8 items-start">
          <div className="lg:sticky lg:top-20">
            <SliderPanel
              sliderState={sliderState}
              onDimensionChange={setDimension}
            />
          </div>
          <ResultPanel results={results} />
        </div>
      </main>
      <footer className="mt-16 border-t border-gray-100 py-6">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
          <span className="flex items-center gap-1.5">
            Designed by
            <a
              href="mailto:raphael_gassmann@stud.phzh.ch"
              className="inline-flex items-center gap-1 text-gray-500 hover:text-emerald-600 transition-colors"
            >
              Raphael
              <Mail className="w-3 h-3" />
            </a>
          </span>
          <span className="text-gray-200">|</span>
          <a
            href="https://github.com/raphaelgassmann/aufgabenkompass"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-gray-500 hover:text-emerald-600 transition-colors"
          >
            <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
            Fork on GitHub
          </a>
        </div>
      </footer>
      {showInfo && (
        <InfoPage
          rules={rules}
          onRulesChange={setRules}
          onClose={() => setShowInfo(false)}
        />
      )}
      <Analytics />
    </div>
  );
}

export default App;
