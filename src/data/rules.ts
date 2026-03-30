import type { Rule } from '../types';

export const rules: Rule[] = [
  // === ZWECK ===
  // Lernaufgabe: höhere kognitive Prozesse, komplexere Wissensarten
  {
    taskTypeId: 'lernaufgabe',
    conditions: [
      { dimensionId: 'kognitiverProzess', acceptedValues: [1, 2, 3], weight: 1 },
      { dimensionId: 'wissensart', acceptedValues: [1, 2, 3], weight: 0.5 },
    ],
  },
  // Leistungsaufgabe: Reproduktion, Fakten-orientiert
  {
    taskTypeId: 'leistungsaufgabe',
    conditions: [
      { dimensionId: 'kognitiverProzess', acceptedValues: [0, 1], weight: 1 },
      { dimensionId: 'wissensart', acceptedValues: [0, 1], weight: 0.5 },
    ],
  },

  // === EVTA-MODELL ===
  // Einsteigen: Reproduktion + einfache Wissensarten
  {
    taskTypeId: 'einsteigen',
    conditions: [
      { dimensionId: 'kognitiverProzess', acceptedValues: [0], weight: 1 },
      { dimensionId: 'wissensart', acceptedValues: [0, 1], weight: 0.8 },
      { dimensionId: 'wissenseinheiten', acceptedValues: [0], weight: 0.5 },
    ],
  },
  // Vertiefen: Reproduktion/naher Transfer + Prozeduren/Konzepte
  {
    taskTypeId: 'vertiefen',
    conditions: [
      { dimensionId: 'kognitiverProzess', acceptedValues: [0, 1], weight: 1 },
      { dimensionId: 'wissensart', acceptedValues: [1, 2], weight: 0.8 },
      { dimensionId: 'wissenseinheiten', acceptedValues: [0, 1], weight: 0.4 },
    ],
  },
  // Trainieren: naher Transfer
  {
    taskTypeId: 'trainieren',
    conditions: [
      { dimensionId: 'kognitiverProzess', acceptedValues: [1], weight: 1 },
      { dimensionId: 'wissensart', acceptedValues: [0, 1, 2], weight: 0.5 },
      { dimensionId: 'wissenseinheiten', acceptedValues: [0, 1], weight: 0.4 },
    ],
  },
  // Anwenden: weiter Transfer / Problemlösen
  {
    taskTypeId: 'anwenden',
    conditions: [
      { dimensionId: 'kognitiverProzess', acceptedValues: [2, 3], weight: 1 },
      { dimensionId: 'wissensart', acceptedValues: [2, 3], weight: 0.8 },
      { dimensionId: 'lebensweltbezug', acceptedValues: [1, 2, 3], weight: 0.5 },
    ],
  },

  // === LUKAS-MODELL ===
  // Erarbeitungsaufgabe: neu erschliessen, verstehen
  {
    taskTypeId: 'erarbeitungsaufgabe',
    conditions: [
      { dimensionId: 'kognitiverProzess', acceptedValues: [0, 1], weight: 1 },
      { dimensionId: 'wissensart', acceptedValues: [0, 1, 2], weight: 0.6 },
      { dimensionId: 'offenheit', acceptedValues: [0, 1], weight: 0.4 },
    ],
  },
  // Konfrontationsaufgabe: Irritieren, Problem
  {
    taskTypeId: 'konfrontationsaufgabe',
    conditions: [
      { dimensionId: 'kognitiverProzess', acceptedValues: [2, 3], weight: 1 },
      { dimensionId: 'wissensart', acceptedValues: [2, 3], weight: 0.8 },
      { dimensionId: 'offenheit', acceptedValues: [1, 2], weight: 0.6 },
    ],
  },
  // Syntheseaufgabe: zusammenführen, ordnen
  {
    taskTypeId: 'syntheseaufgabe',
    conditions: [
      { dimensionId: 'kognitiverProzess', acceptedValues: [1, 2], weight: 1 },
      { dimensionId: 'wissenseinheiten', acceptedValues: [1, 2], weight: 0.8 },
      { dimensionId: 'wissensart', acceptedValues: [2, 3], weight: 0.6 },
    ],
  },
  // Übungsaufgabe: üben
  {
    taskTypeId: 'uebungsaufgabe',
    conditions: [
      { dimensionId: 'kognitiverProzess', acceptedValues: [0, 1], weight: 1 },
      { dimensionId: 'wissensart', acceptedValues: [0, 1], weight: 0.8 },
      { dimensionId: 'offenheit', acceptedValues: [0], weight: 0.6 },
      { dimensionId: 'wissenseinheiten', acceptedValues: [0, 1], weight: 0.4 },
    ],
  },
  // Vertiefungsaufgabe: erweitern
  {
    taskTypeId: 'vertiefungsaufgabe',
    conditions: [
      { dimensionId: 'kognitiverProzess', acceptedValues: [2, 3], weight: 1 },
      { dimensionId: 'wissensart', acceptedValues: [1, 2, 3], weight: 0.6 },
      { dimensionId: 'wissenseinheiten', acceptedValues: [1, 2], weight: 0.5 },
    ],
  },

  // === OFFENHEIT (direkte Zuordnung) ===
  {
    taskTypeId: 'geschlossen',
    conditions: [
      { dimensionId: 'offenheit', acceptedValues: [0], weight: 1 },
    ],
  },
  {
    taskTypeId: 'geschlossen-richtigfalsch',
    conditions: [
      { dimensionId: 'offenheit', acceptedValues: [0], weight: 1 },
      { dimensionId: 'kognitiverProzess', acceptedValues: [0], weight: 0.6 },
      { dimensionId: 'wissensart', acceptedValues: [0], weight: 0.4 },
    ],
  },
  {
    taskTypeId: 'geschlossen-umordnung',
    conditions: [
      { dimensionId: 'offenheit', acceptedValues: [0], weight: 1 },
      { dimensionId: 'kognitiverProzess', acceptedValues: [0, 1], weight: 0.5 },
      { dimensionId: 'wissensart', acceptedValues: [1], weight: 0.5 },
    ],
  },
  {
    taskTypeId: 'geschlossen-mc',
    conditions: [
      { dimensionId: 'offenheit', acceptedValues: [0], weight: 1 },
      { dimensionId: 'kognitiverProzess', acceptedValues: [0, 1], weight: 0.5 },
      { dimensionId: 'wissensart', acceptedValues: [0, 1, 2], weight: 0.3 },
    ],
  },
  {
    taskTypeId: 'geschlossen-vervollstaendigung',
    conditions: [
      { dimensionId: 'offenheit', acceptedValues: [0], weight: 1 },
      { dimensionId: 'kognitiverProzess', acceptedValues: [0, 1], weight: 0.5 },
      { dimensionId: 'wissensart', acceptedValues: [0, 1], weight: 0.4 },
    ],
  },
  {
    taskTypeId: 'offen',
    conditions: [
      { dimensionId: 'offenheit', acceptedValues: [2], weight: 1 },
    ],
  },
  {
    taskTypeId: 'bluetenaufgabe',
    conditions: [
      { dimensionId: 'offenheit', acceptedValues: [1], weight: 1 },
      { dimensionId: 'wissenseinheiten', acceptedValues: [1, 2], weight: 0.5 },
    ],
  },

  // === TRANSFER ===
  {
    taskTypeId: 'schulischer-kontext',
    conditions: [
      { dimensionId: 'lebensweltbezug', acceptedValues: [0, 1], weight: 1 },
    ],
  },
  {
    taskTypeId: 'betrieblicher-kontext',
    conditions: [
      { dimensionId: 'lebensweltbezug', acceptedValues: [2, 3], weight: 1 },
    ],
  },

  // === REPRÄSENTATION ===
  {
    taskTypeId: 'rep-verbal',
    conditions: [
      { dimensionId: 'repraesentationsformen', acceptedValues: [0], weight: 1 },
      { dimensionId: 'sprachlogischeKomplexitaet', acceptedValues: [0, 1], weight: 0.4 },
    ],
  },
  {
    taskTypeId: 'rep-ikonisch',
    conditions: [
      { dimensionId: 'repraesentationsformen', acceptedValues: [0, 1], weight: 1 },
    ],
  },
  {
    taskTypeId: 'rep-symbolisch',
    conditions: [
      { dimensionId: 'repraesentationsformen', acceptedValues: [0, 1], weight: 1 },
      { dimensionId: 'sprachlogischeKomplexitaet', acceptedValues: [1, 2], weight: 0.4 },
    ],
  },
  {
    taskTypeId: 'rep-diagrammatisch',
    conditions: [
      { dimensionId: 'repraesentationsformen', acceptedValues: [1, 2], weight: 1 },
      { dimensionId: 'wissenseinheiten', acceptedValues: [1, 2], weight: 0.5 },
    ],
  },
  {
    taskTypeId: 'rep-enaktiv',
    conditions: [
      { dimensionId: 'repraesentationsformen', acceptedValues: [1, 2], weight: 1 },
      { dimensionId: 'lebensweltbezug', acceptedValues: [2, 3], weight: 0.5 },
    ],
  },
];
