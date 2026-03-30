import type { TaskType } from '../types';

export const taskTypes: TaskType[] = [
  // Zweck
  {
    id: 'lernaufgabe',
    category: 'zweck',
    label: 'Lernaufgabe',
    description: 'Aufgabe zum Lernen und Kompetenzaufbau',
  },
  {
    id: 'leistungsaufgabe',
    category: 'zweck',
    label: 'Leistungsaufgabe',
    description: 'Aufgabe zur Überprüfung von Kompetenzen',
  },

  // EVTA-Modell
  {
    id: 'einsteigen',
    category: 'evta',
    label: 'Einsteigen',
    description: 'Vorwissen aktivieren, Neugier wecken',
  },
  {
    id: 'vertiefen',
    category: 'evta',
    label: 'Vertiefen',
    description: 'Verständnis vertiefen und festigen',
  },
  {
    id: 'trainieren',
    category: 'evta',
    label: 'Trainieren',
    description: 'Fertigkeiten üben und automatisieren',
  },
  {
    id: 'anwenden',
    category: 'evta',
    label: 'Anwenden',
    description: 'Wissen auf neue Situationen übertragen',
  },

  // LUKAS-Modell
  {
    id: 'erarbeitungsaufgabe',
    category: 'lukas',
    label: 'Erarbeitungsaufgabe',
    description: 'Neu erschliessen und verstehen',
  },
  {
    id: 'konfrontationsaufgabe',
    category: 'lukas',
    label: 'Konfrontationsaufgabe',
    description: 'Irritieren, Problem aufwerfen',
  },
  {
    id: 'syntheseaufgabe',
    category: 'lukas',
    label: 'Syntheseaufgabe',
    description: 'Zusammenführen und ordnen',
  },
  {
    id: 'uebungsaufgabe',
    category: 'lukas',
    label: 'Übungsaufgabe',
    description: 'Üben und festigen',
  },
  {
    id: 'vertiefungsaufgabe',
    category: 'lukas',
    label: 'Vertiefungsaufgabe',
    description: 'Erweitern und vertiefen',
  },

  // Offenheit
  {
    id: 'geschlossen',
    category: 'offenheit',
    label: 'Geschlossene Aufgabe',
    description: 'Eindeutige, vorgegebene Lösung',
  },
  {
    id: 'geschlossen-richtigfalsch',
    category: 'offenheit',
    label: 'Richtig/Falsch-Aufgabe',
    description: 'Aussagen als richtig oder falsch beurteilen',
    parentId: 'geschlossen',
  },
  {
    id: 'geschlossen-umordnung',
    category: 'offenheit',
    label: 'Umordnungsaufgabe',
    description: 'Elemente in die richtige Reihenfolge bringen',
    parentId: 'geschlossen',
  },
  {
    id: 'geschlossen-mc',
    category: 'offenheit',
    label: 'Multiple-Choice-Aufgabe',
    description: 'Aus vorgegebenen Antworten auswählen',
    parentId: 'geschlossen',
  },
  {
    id: 'geschlossen-vervollstaendigung',
    category: 'offenheit',
    label: 'Vervollständigungsaufgabe',
    description: 'Lücken ergänzen oder vervollständigen',
    parentId: 'geschlossen',
  },
  {
    id: 'offen',
    category: 'offenheit',
    label: 'Offene Aufgabe',
    description: 'Freie Antwortmöglichkeiten, nur Thema oder Ziel vorgegeben',
  },
  {
    id: 'bluetenaufgabe',
    category: 'offenheit',
    label: 'Blütenaufgabe',
    description: 'Kombination aus geschlossenen und offenen Teilaufgaben',
  },

  // Transfer
  {
    id: 'schulischer-kontext',
    category: 'transfer',
    label: 'Schulischer Kontext',
    description: 'Aufgabe im schulischen Umfeld',
  },
  {
    id: 'betrieblicher-kontext',
    category: 'transfer',
    label: 'Lehrbetrieblicher Kontext',
    description: 'Aufgabe mit Bezug zum Lehrbetrieb und zur Arbeitswelt',
  },

  // Repräsentation
  {
    id: 'rep-verbal',
    category: 'repraesentation',
    label: 'Verbal',
    description: 'Sprachliche Darstellung',
  },
  {
    id: 'rep-ikonisch',
    category: 'repraesentation',
    label: 'Ikonisch',
    description: 'Bildhafte Darstellung',
  },
  {
    id: 'rep-symbolisch',
    category: 'repraesentation',
    label: 'Symbolisch',
    description: 'Symbolische/formale Darstellung',
  },
  {
    id: 'rep-diagrammatisch',
    category: 'repraesentation',
    label: 'Diagrammatisch',
    description: 'Darstellung in Diagrammen',
  },
  {
    id: 'rep-enaktiv',
    category: 'repraesentation',
    label: 'Enaktiv',
    description: 'Handelnde, praktische Darstellung',
  },
];

export const categoryLabels: Record<string, string> = {
  zweck: 'Zweck',
  evta: 'EVTA-Modell',
  lukas: 'LUKAS-Modell',
  offenheit: 'Offenheit',
  transfer: 'Transfer-Kontext',
  repraesentation: 'Repräsentation',
};
