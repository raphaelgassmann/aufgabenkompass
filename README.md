# AufgabenKompass

Interaktives Webtool zur Auswahl von Aufgabentypen im berufskundlichen Unterricht. Basierend auf 7 didaktischen Dimensionen werden passende Aufgabenformate empfohlen.

**[Live Demo](https://aufgabenkompass.vercel.app)**

## Konzept

Lehrpersonen stellen 7 Schieberegler ein, die jeweils eine Dimension der geplanten Aufgabe beschreiben:

| Dimension | Stufen |
|---|---|
| Wissensart | Fakten/Deklarativ, Prozeduren, Konzepte, Metakognition |
| Kognitiver Prozess | Reproduktion, naher Transfer, weiter Transfer, Problemlösen |
| Wissenseinheiten | eine WE, bis zu vier WE, mehr als vier WE |
| Offenheit | definiert/konvergent, definiert/divergent, ungenau/divergent |
| Lebensweltbezug | kein, konstruiert, authentisch, real |
| Sprachlogische Komplexität | niedrig, mittel, hoch |
| Repräsentationsformen | eine, Integration, Transformation |

Auf Basis der Reglerstellung werden passende Aufgabentypen aus sechs Kategorien empfohlen: Zweck (Lern-/Leistungsaufgabe), EVTA-Modell, LUKAS-Modell, Offenheit, Transfer-Kontext und Repräsentationsform.

Die Zuordnungslogik basiert auf einem regelbasierten Scoring-System mit gewichteten Bedingungen. Die Gewichtungen können in den Einstellungen angepasst werden.

## Theoretische Grundlagen

- **EVTA-Modell**: Einsteigen, Vertiefen, Trainieren, Anwenden
- **LUKAS-Modell**: Nach Luthiger & Wilhelm (PH Luzern)
- **Cognitive Load Theory**: Wissenseinheiten als Komplexitätsmass (Sweller)
- **Vorentlastung**: Kognitiver Prozess und Repräsentationsformen (PHZH)

## Entwicklung

```bash
npm install
npm run dev
```

Build:

```bash
npm run build
```

Das R-Diagramm der Zuordnungslogik kann mit `Rscript scripts/generate_diagram.R` neu generiert werden (benötigt R und ggplot2).

## Tech Stack

React, TypeScript, Vite, Tailwind CSS, Radix UI, Lucide Icons, Vercel Analytics

## Lizenz

MIT
