import { Compass } from 'lucide-react';
import { Analytics } from '@vercel/analytics/react';
import { useDimensions } from './hooks/useDimensions';
import { SliderPanel } from './components/SliderPanel';
import { ResultPanel } from './components/ResultPanel';

function App() {
  const { sliderState, setDimension, results } = useDimensions();

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center gap-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-900">AufgabenKompass</h1>
            <p className="text-xs text-gray-500">
              Aufgabentypen nach Dimensionen auswählen
            </p>
          </div>
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
      <Analytics />
    </div>
  );
}

export default App;
