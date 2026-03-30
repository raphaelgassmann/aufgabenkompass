library(ggplot2)

dimensions <- c(
  "Wissensart", "Kognitiver\nProzess", "Wissens-\neinheiten",
  "Offenheit", "Lebenswelt-\nbezug", "Sprache", "Repräsentations-\nformen"
)

task_types <- c(
  "Lernaufgabe", "Leistungsaufgabe",
  "Einsteigen", "Vertiefen", "Trainieren", "Anwenden",
  "Erarbeitungsaufgabe", "Konfrontationsaufgabe", "Syntheseaufgabe",
  "Übungsaufgabe", "Vertiefungsaufgabe",
  "Geschlossene Aufgabe",
  "  Richtig/Falsch", "  Umordnung", "  Multiple-Choice", "  Vervollständigung",
  "Offene Aufgabe", "Blütenaufgabe",
  "Schulischer Kontext", "Lehrbetrieblicher Kontext",
  "Verbal", "Ikonisch", "Symbolisch", "Diagrammatisch", "Enaktiv"
)

categories <- c(
  rep("Zweck", 2), rep("EVTA", 4), rep("LUKAS", 5),
  rep("Offenheit", 7), rep("Transfer", 2), rep("Repräsentation", 5)
)

weights <- matrix(0, nrow = length(task_types), ncol = length(dimensions),
                  dimnames = list(task_types, dimensions))
accepted <- matrix("", nrow = length(task_types), ncol = length(dimensions),
                   dimnames = list(task_types, dimensions))

# --- Zweck (breiter gefasst, Unterscheidung über Offenheit) ---
weights["Lernaufgabe", c("Kognitiver\nProzess", "Wissensart", "Offenheit")] <- c(0.5, 0.3, 0.7)
accepted["Lernaufgabe", "Kognitiver\nProzess"] <- "alle Stufen"
accepted["Lernaufgabe", "Wissensart"] <- "alle Stufen"
accepted["Lernaufgabe", "Offenheit"] <- "div.–ung./div."

weights["Leistungsaufgabe", c("Kognitiver\nProzess", "Wissensart", "Offenheit")] <- c(0.5, 0.3, 0.7)
accepted["Leistungsaufgabe", "Kognitiver\nProzess"] <- "alle Stufen"
accepted["Leistungsaufgabe", "Wissensart"] <- "alle Stufen"
accepted["Leistungsaufgabe", "Offenheit"] <- "konv.–div."

# --- EVTA ---
weights["Einsteigen", c("Wissensart", "Kognitiver\nProzess", "Wissens-\neinheiten")] <- c(0.8, 1.0, 0.5)
accepted["Einsteigen", "Wissensart"] <- "Fakten–Proz."
accepted["Einsteigen", "Kognitiver\nProzess"] <- "Reproduktion"
accepted["Einsteigen", "Wissens-\neinheiten"] <- "eine WE"

weights["Vertiefen", c("Wissensart", "Kognitiver\nProzess", "Wissens-\neinheiten")] <- c(0.8, 1.0, 0.4)
accepted["Vertiefen", "Wissensart"] <- "Proz.–Konz."
accepted["Vertiefen", "Kognitiver\nProzess"] <- "Reprod.–nah.Tr."
accepted["Vertiefen", "Wissens-\neinheiten"] <- "1–4 WE"

weights["Trainieren", c("Wissensart", "Kognitiver\nProzess", "Wissens-\neinheiten")] <- c(0.5, 1.0, 0.4)
accepted["Trainieren", "Wissensart"] <- "Fakten–Konz."
accepted["Trainieren", "Kognitiver\nProzess"] <- "Reprod.–nah.Tr."
accepted["Trainieren", "Wissens-\neinheiten"] <- "1–4 WE"

weights["Anwenden", c("Wissensart", "Kognitiver\nProzess", "Lebenswelt-\nbezug")] <- c(0.8, 1.0, 0.7)
accepted["Anwenden", "Wissensart"] <- "Konz.–Metakog."
accepted["Anwenden", "Kognitiver\nProzess"] <- "weit.Tr.–Probl."
accepted["Anwenden", "Lebenswelt-\nbezug"] <- "konstr.–real"

# --- LUKAS ---
weights["Erarbeitungsaufgabe", c("Wissensart", "Kognitiver\nProzess", "Offenheit")] <- c(0.6, 1.0, 0.4)
accepted["Erarbeitungsaufgabe", "Wissensart"] <- "Fakten–Konz."
accepted["Erarbeitungsaufgabe", "Kognitiver\nProzess"] <- "Reprod.–nah.Tr."
accepted["Erarbeitungsaufgabe", "Offenheit"] <- "konv.–div."

weights["Konfrontationsaufgabe", c("Wissensart", "Kognitiver\nProzess", "Offenheit")] <- c(0.8, 1.0, 0.6)
accepted["Konfrontationsaufgabe", "Wissensart"] <- "Konz.–Metakog."
accepted["Konfrontationsaufgabe", "Kognitiver\nProzess"] <- "weit.Tr.–Probl."
accepted["Konfrontationsaufgabe", "Offenheit"] <- "div.–ung./div."

weights["Syntheseaufgabe", c("Wissensart", "Kognitiver\nProzess", "Wissens-\neinheiten")] <- c(0.6, 1.0, 0.8)
accepted["Syntheseaufgabe", "Wissensart"] <- "Konz.–Metakog."
accepted["Syntheseaufgabe", "Kognitiver\nProzess"] <- "nah.–weit.Tr."
accepted["Syntheseaufgabe", "Wissens-\neinheiten"] <- "4+ WE"

weights["Übungsaufgabe", c("Wissensart", "Kognitiver\nProzess", "Wissens-\neinheiten", "Offenheit")] <- c(0.8, 1.0, 0.4, 0.6)
accepted["Übungsaufgabe", "Wissensart"] <- "Fakten–Proz."
accepted["Übungsaufgabe", "Kognitiver\nProzess"] <- "Reprod.–nah.Tr."
accepted["Übungsaufgabe", "Wissens-\neinheiten"] <- "1–4 WE"
accepted["Übungsaufgabe", "Offenheit"] <- "konvergent"

weights["Vertiefungsaufgabe", c("Wissensart", "Kognitiver\nProzess", "Wissens-\neinheiten")] <- c(0.6, 1.0, 0.5)
accepted["Vertiefungsaufgabe", "Wissensart"] <- "Proz.–Metakog."
accepted["Vertiefungsaufgabe", "Kognitiver\nProzess"] <- "weit.Tr.–Probl."
accepted["Vertiefungsaufgabe", "Wissens-\neinheiten"] <- "4+ WE"

# --- Offenheit (mit Sprache-Einfluss) ---
weights["Geschlossene Aufgabe", c("Offenheit", "Sprache")] <- c(1.0, 0.3)
accepted["Geschlossene Aufgabe", "Offenheit"] <- "konvergent"
accepted["Geschlossene Aufgabe", "Sprache"] <- "niedrig–mittel"

weights["  Richtig/Falsch", c("Offenheit", "Kognitiver\nProzess", "Wissensart")] <- c(1.0, 0.5, 0.4)
accepted["  Richtig/Falsch", "Offenheit"] <- "konvergent"
accepted["  Richtig/Falsch", "Kognitiver\nProzess"] <- "Reprod.–nah.Tr."
accepted["  Richtig/Falsch", "Wissensart"] <- "Fakten–Konz."

weights["  Umordnung", c("Offenheit", "Kognitiver\nProzess", "Wissensart")] <- c(1.0, 0.5, 0.5)
accepted["  Umordnung", "Offenheit"] <- "konvergent"
accepted["  Umordnung", "Kognitiver\nProzess"] <- "Reprod.–nah.Tr."
accepted["  Umordnung", "Wissensart"] <- "Fakten–Proz."

weights["  Multiple-Choice", c("Offenheit", "Kognitiver\nProzess", "Wissensart")] <- c(1.0, 0.5, 0.3)
accepted["  Multiple-Choice", "Offenheit"] <- "konvergent"
accepted["  Multiple-Choice", "Kognitiver\nProzess"] <- "Reprod.–nah.Tr."
accepted["  Multiple-Choice", "Wissensart"] <- "Fakten–Konz."

weights["  Vervollständigung", c("Offenheit", "Kognitiver\nProzess", "Wissensart")] <- c(1.0, 0.5, 0.4)
accepted["  Vervollständigung", "Offenheit"] <- "konvergent"
accepted["  Vervollständigung", "Kognitiver\nProzess"] <- "Reprod.–nah.Tr."
accepted["  Vervollständigung", "Wissensart"] <- "Fakten–Proz."

weights["Offene Aufgabe", c("Offenheit", "Sprache")] <- c(1.0, 0.3)
accepted["Offene Aufgabe", "Offenheit"] <- "ung./divergent"
accepted["Offene Aufgabe", "Sprache"] <- "mittel–hoch"

weights["Blütenaufgabe", c("Offenheit", "Wissens-\neinheiten")] <- c(1.0, 0.5)
accepted["Blütenaufgabe", "Offenheit"] <- "def./divergent"
accepted["Blütenaufgabe", "Wissens-\neinheiten"] <- "4+ WE"

# --- Transfer (BKU: konstruiert = lehrbetrieblich) ---
weights["Schulischer Kontext", "Lebenswelt-\nbezug"] <- 1.0
accepted["Schulischer Kontext", "Lebenswelt-\nbezug"] <- "kein"

weights["Lehrbetrieblicher Kontext", "Lebenswelt-\nbezug"] <- 1.0
accepted["Lehrbetrieblicher Kontext", "Lebenswelt-\nbezug"] <- "konstr.–real"

# --- Repräsentation (Verbal ohne Sprache-Einschränkung) ---
weights["Verbal", "Repräsentations-\nformen"] <- 1.0
accepted["Verbal", "Repräsentations-\nformen"] <- "eine"

weights["Ikonisch", "Repräsentations-\nformen"] <- 1.0
accepted["Ikonisch", "Repräsentations-\nformen"] <- "eine–Integr."

weights["Symbolisch", c("Repräsentations-\nformen", "Sprache")] <- c(1.0, 0.4)
accepted["Symbolisch", "Repräsentations-\nformen"] <- "eine–Integr."
accepted["Symbolisch", "Sprache"] <- "mittel–hoch"

weights["Diagrammatisch", c("Repräsentations-\nformen", "Wissens-\neinheiten")] <- c(1.0, 0.5)
accepted["Diagrammatisch", "Repräsentations-\nformen"] <- "Integr.–Transf."
accepted["Diagrammatisch", "Wissens-\neinheiten"] <- "4+ WE"

weights["Enaktiv", c("Repräsentations-\nformen", "Lebenswelt-\nbezug")] <- c(1.0, 0.5)
accepted["Enaktiv", "Repräsentations-\nformen"] <- "Integr.–Transf."
accepted["Enaktiv", "Lebenswelt-\nbezug"] <- "auth.–real"

# --- Plot ---
df <- expand.grid(Aufgabentyp = task_types, Dimension = dimensions, stringsAsFactors = FALSE)
df$Gewicht <- mapply(function(a, d) weights[a, d], df$Aufgabentyp, df$Dimension)
df$Stufen <- mapply(function(a, d) accepted[a, d], df$Aufgabentyp, df$Dimension)
df$Kategorie <- categories[match(df$Aufgabentyp, task_types)]

df$Aufgabentyp <- factor(df$Aufgabentyp, levels = rev(task_types))
df$Dimension <- factor(df$Dimension, levels = dimensions)

cat_colors <- c(
  "Zweck" = "#3b82f6", "EVTA" = "#10b981", "LUKAS" = "#14b8a6",
  "Offenheit" = "#f59e0b", "Transfer" = "#a855f7", "Repräsentation" = "#f43f5e"
)
label_colors <- cat_colors[categories[match(rev(task_types), task_types)]]
is_sub <- grepl("^  ", rev(task_types))
label_face <- ifelse(is_sub, "italic", "bold")

p <- ggplot(df, aes(x = Dimension, y = Aufgabentyp)) +
  geom_tile(aes(fill = Gewicht), color = "white", linewidth = 1.2) +
  geom_text(aes(label = ifelse(Gewicht > 0, sprintf("%.1f", Gewicht), "")),
    size = 3.2, fontface = "bold", nudge_y = 0.12,
    color = ifelse(df$Gewicht >= 0.8, "white", "grey30")) +
  geom_text(aes(label = Stufen), size = 2.1, nudge_y = -0.15,
    color = ifelse(df$Gewicht >= 0.8, "white", "grey45")) +
  scale_fill_gradient(low = "#f0fdf4", high = "#059669", limits = c(0, 1),
    breaks = c(0, 0.4, 0.6, 0.8, 1.0), name = "Gewicht") +
  annotate("rect", xmin = 0.3, xmax = 0.5,
    ymin = as.numeric(factor(rev(task_types), levels = rev(task_types))) - 0.45,
    ymax = as.numeric(factor(rev(task_types), levels = rev(task_types))) + 0.45,
    fill = unname(label_colors)) +
  scale_x_discrete(position = "top", expand = expansion(add = c(0.8, 0.5))) +
  labs(title = "AufgabenKompass — Zuordnungslogik",
    subtitle = "Bedingungen sind UND-verknüpft. Match ab \u226560% gewichtetem Score.",
    x = NULL, y = NULL) +
  theme_minimal(base_size = 13) +
  theme(
    plot.title = element_text(face = "bold", size = 18, margin = margin(b = 4)),
    plot.subtitle = element_text(color = "grey50", size = 11, margin = margin(b = 20)),
    axis.text.x.top = element_text(size = 10, lineheight = 1.1, vjust = 0, margin = margin(b = 8)),
    axis.text.y = element_text(size = 10, color = unname(label_colors), face = label_face),
    panel.grid = element_blank(),
    legend.position = "bottom", legend.key.width = unit(2.5, "cm"),
    legend.key.height = unit(0.4, "cm"), legend.margin = margin(t = 16),
    plot.margin = margin(20, 24, 20, 20))

ggsave("public/zuordnungslogik.png", p, width = 12, height = 13, dpi = 150, bg = "white")
cat("Diagram saved to public/zuordnungslogik.png\n")
