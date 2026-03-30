import { useEffect } from 'react';
import { X, RotateCcw } from 'lucide-react';
import type { Rule } from '../types';
import { InteractiveHeatmap } from './InteractiveHeatmap';

interface Props {
  rules: Rule[];
  onRulesChange: (rules: Rule[]) => void;
  onResetRules: () => void;
  onClose: () => void;
}

export function InfoPage({ rules, onRulesChange, onResetRules, onClose }: Props) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/40 flex items-start justify-center overflow-y-auto p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Einstellungen"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl shadow-xl max-w-6xl w-full my-8 relative">
        <div className="flex items-center justify-between p-8 pb-0">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Einstellungen
            </h2>
            <p className="text-gray-500 mt-1">
              Zuordnungslogik und Gewichtungen anpassen
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Einstellungen schliessen"
            className="p-1.5 rounded-lg hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-8">
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Prinzip
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Jede Dimension (Schieberegler) beeinflusst bestimmte
                Aufgabentypen mit einem definierten Gewicht von 0 bis 1. Ein
                Gewicht von 1.0 bedeutet, dass diese Dimension der Haupttreiber
                für den jeweiligen Aufgabentyp ist. Niedrigere Gewichte sind
                Modifikatoren, die die Empfehlung verfeinern. Ein Aufgabentyp
                wird als passend angezeigt, wenn der gewichtete
                Übereinstimmungs-Score mindestens 60% erreicht.
              </p>
            </section>

            <section>
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-gray-800">
                  Zuordnungslogik
                </h3>
                <button
                  onClick={onResetRules}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-gray-500 hover:text-emerald-600 bg-gray-100 hover:bg-emerald-50 rounded-lg transition-colors"
                  aria-label="Gewichtungen auf Standardwerte zurücksetzen"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Zurücksetzen
                </button>
              </div>
              <InteractiveHeatmap
                rules={rules}
                onRulesChange={onRulesChange}
              />
            </section>

            <section>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">
                Kategorien
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { color: 'bg-blue-500', label: 'Zweck', desc: 'Lern- vs. Leistungsaufgabe' },
                  { color: 'bg-emerald-500', label: 'EVTA-Modell', desc: 'Einsteigen, Vertiefen, Trainieren, Anwenden' },
                  { color: 'bg-teal-500', label: 'LUKAS-Modell', desc: 'Nach Luthiger & Wilhelm (PH Luzern)' },
                  { color: 'bg-amber-500', label: 'Offenheit', desc: 'Geschlossen, Offen, Blütenaufgabe' },
                  { color: 'bg-purple-500', label: 'Transfer', desc: 'Schulisch vs. lehrbetrieblich' },
                  { color: 'bg-rose-500', label: 'Repräsentation', desc: 'Verbal, ikonisch, symbolisch, ...' },
                ].map((cat) => (
                  <div key={cat.label} className="flex items-start gap-2 p-3 rounded-lg bg-gray-50">
                    <div className={`w-2.5 h-2.5 rounded-full ${cat.color} mt-1 shrink-0`} />
                    <div>
                      <div className="text-sm font-semibold text-gray-700">{cat.label}</div>
                      <div className="text-xs text-gray-400">{cat.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
