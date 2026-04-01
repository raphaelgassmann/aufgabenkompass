import type { DimensionDef } from '../types';

export const dimensions: DimensionDef[] = [
  {
    id: 'wissensart',
    label: 'Wissensart',
    rightLabel: 'Wissen',
    description: 'Welche Art von Wissen wird angesprochen? Von einfachen Fakten über Abläufe (Prozeduren) und vernetzte Begriffe (Konzepte) bis hin zum Nachdenken über das eigene Lernen (Metakognition).',
    stops: [
      { value: 0, label: 'Fakten/Deklarativ' },
      { value: 1, label: 'Prozeduren' },
      { value: 2, label: 'Konzepte' },
      { value: 3, label: 'Metakognition' },
    ],
  },
  {
    id: 'kognitiverProzess',
    label: 'Kognitiver Prozess',
    rightLabel: 'Vorentlastung 1',
    description: 'Vorentlastung: Welcher kognitive Prozess wird verlangt? Reproduktionsaufgabe = Erinnerungsleistung. Naher Transfer = Transfer von der Schule in die Schule. Weiter Transfer = Gleiches Wissen in unbekannten/neuen Situationen. Kreative Problemlöseaufgaben = Es muss neues Wissen geschaffen werden.',
    stops: [
      { value: 0, label: 'Reproduktion' },
      { value: 1, label: 'naher Transfer' },
      { value: 2, label: 'weiter Transfer' },
      { value: 3, label: 'Problemlösen' },
    ],
  },
  {
    id: 'wissenseinheiten',
    label: 'Wissenseinheiten',
    rightLabel: 'Komplexität',
    description: 'Wie viele Wissensbausteine müssen gleichzeitig verarbeitet werden? Basiert auf der Cognitive Load Theory (Sweller). Mehr Einheiten bedeuten höhere kognitive Belastung und Komplexität.',
    stops: [
      { value: 0, label: 'eine WE/Chunk' },
      { value: 1, label: '≤ vier WE/Chunks' },
      { value: 2, label: '≥ vier WE/Chunks' },
    ],
  },
  {
    id: 'offenheit',
    label: 'Offenheit',
    rightLabel: 'Offen/Geschl.',
    description: 'Wie offen ist die Aufgabenstellung? Von klar definierten Aufgaben mit einer Lösung (konvergent) über Aufgaben mit mehreren gültigen Lösungswegen (divergent) bis zu vagen, explorativen Fragestellungen.',
    stops: [
      { value: 0, label: 'definiert/konvergent' },
      { value: 1, label: 'definiert/divergent' },
      { value: 2, label: 'ungenau/divergent' },
    ],
  },
  {
    id: 'lebensweltbezug',
    label: 'Lebensweltbezug',
    rightLabel: 'Angewandt?',
    description: 'Wie stark ist der Lebensweltbezug? Angewandt = Aufgaben, die im Berufsleben vorkommen können, möglichst genau wie im Betrieb. Eingekleidet (Schein-Angewandt) = Konstruierter Kontext, z.B. «Entwerfen Sie eine Garageneinfahrt mit einem Polynom dritten Grades». Wissensfragen/Reproduktionsfragen = Kein Lebensweltbezug, Wissen ist ein Teil von Kompetenz und lässt sich transferieren.',
    stops: [
      { value: 0, label: 'kein' },
      { value: 1, label: 'konstruiert' },
      { value: 2, label: 'authentisch' },
      { value: 3, label: 'real' },
    ],
  },
  {
    id: 'sprachlogischeKomplexitaet',
    label: 'Sprachlogische Komplexität',
    rightLabel: 'Sprache',
    description: 'Wie komplex ist die sprachliche Formulierung der Aufgabe? Von einfachen, kurzen Sätzen über Texte mit Fachbegriffen bis hin zu verschachtelten, abstrakten Formulierungen.',
    stops: [
      { value: 0, label: 'niedrig' },
      { value: 1, label: 'mittel' },
      { value: 2, label: 'hoch' },
    ],
  },
  {
    id: 'repraesentationsformen',
    label: 'Repräsentationsformen',
    rightLabel: 'Vorentlastung 2',
    description: 'Vorentlastung: In welchen Repräsentationsformen liegt die Aufgabe vor? Eine = Die Aufgabe bewegt sich innerhalb einer Form, z.B. Text. Integration = Informationen liegen in verschiedenen Formen vor, z.B. Text und Grafik. Transformation = Die Repräsentationsform muss von den Lernenden gewechselt werden, z.B. Text → Grafik.',
    stops: [
      { value: 0, label: 'eine' },
      { value: 1, label: 'Integration' },
      { value: 2, label: 'Transformation' },
    ],
  },
];

export const defaultSliderState = Object.fromEntries(
  dimensions.map((d) => [d.id, 0])
) as Record<DimensionDef['id'], number>;
