# Aetherial Alchemy: Roll20-Extension

Alchemie-Sidebar direkt in Roll20: Inventar, Brauen mit d20-Wurf, Sync mit dem
D&D-Charakterbogen und Live-Inventar-Dashboard für den GM.

Alle Downloads: [GitHub Releases](https://github.com/caaatto/aetherial-alchemy/releases)
(neuestes `Roll20-Extension vX.Y`-Release nehmen).

## Installation

### Linux (Chrome/Chromium): Auto-Update über Policy-Datei

Chrome blockiert selbst-gehostete `.crx`-Dateien inzwischen komplett, auch per
Drag-and-drop (Fehler: `CRX_REQUIRED_PROOF_MISSING`). Echtes Auto-Update geht
trotzdem, über eine Policy-Datei, die Chrome auf unsere Update-Quelle zeigt:

1. `aetherial-roll20.zip` vom neuesten Release herunterladen und entpacken.
   Darin liegt `chrome-policy.json`.
2. Policy installieren (Terminal, im entpackten Ordner `roll20-extension/`):

   ```
   sudo install -D -m 644 chrome-policy.json /etc/opt/chrome/policies/managed/aetherial-alchemy.json
   ```

   Für Chromium statt Chrome: `/etc/chromium/policies/managed/` als Zielordner.
3. Chrome **komplett beenden** und neu starten. Die Extension installiert sich
   automatisch und aktualisiert sich künftig selbst. Kontrolle: `chrome://policy`
   listet `ExtensionSettings`, `chrome://extensions` zeigt „Aetherial Alchemy".

Wichtig: War vorher schon eine **entpackt geladene** Version installiert, diese
zuerst unter `chrome://extensions` entfernen (gleiche Extension-ID, Chrome
verweigert sonst die Zweitinstallation).

### Windows / Mac / Edge (oder ohne Root-Rechte): Zip entpackt laden

Ohne Policy-Datei läuft die Installation über den entpackten Ordner:

1. `aetherial-roll20.zip` vom neuesten Release herunterladen und entpacken.
2. `chrome://extensions` öffnen (in Edge: `edge://extensions`) und den
   **Entwicklermodus** aktivieren.
3. **„Entpackt laden"** anklicken und den entpackten Ordner `roll20-extension/` auswählen.

**Updates:** Sobald eine neuere Version veröffentlicht ist, erscheint am Extension-Icon
in der Browserleiste ein rotes **„NEU"-Badge**. Icon anklicken, dann öffnet sich das
passende Release: neues Zip herunterladen, über den alten Ordner entpacken und auf der
Extensions-Seite **Neu laden** klicken.

## Erste Schritte im Spiel

1. Roll20-Spiel öffnen (`app.roll20.net/editor/...`).
2. Rechts am Bildschirmrand auf den **Alchemie-Button** (Kolben-Symbol) klicken.
3. Oben in der Sidebar den **eigenen Charakter** auswählen.

Wichtig: Der Charakter muss dir im Roll20-Spiel unter **„Controlled by"** zugewiesen
sein, sonst taucht er nicht in der Liste auf. Der GM sieht alle Charaktere.

## Gruppen-Setup (GM)

Backend für das Live-Dashboard, Items verteilen und das optionale Mod-Script für den
Bogen-Sync: siehe [SETUP.md](https://github.com/caaatto/aetherial-alchemy/blob/master/SETUP.md)
im Repo.
