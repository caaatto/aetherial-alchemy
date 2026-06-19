# Aetherial Alchemy × Roll20 — Setup für die Gruppe

Diese Anleitung zeigt, wie ihr die Alchemie-Extension **gemeinsam** in Roll20 nutzt,
sodass der **GM live sieht, was jeder Spieler im Inventar hat** (Kräuter + Tränke).

Es gibt zwei Sync-Ebenen, die zusammenspielen:

| Ebene | Wer richtet's ein | Was es macht |
|---|---|---|
| **Roll20 (Chat + Bogen)** | GM (Mod-Script, braucht Pro) | Gebraute Tränke landen im Chat & auf dem Charakterbogen — alle sehen's |
| **Live-Inventar-Dashboard** | GM (Backend, **kein** Pro nötig) | GM sieht alle Spieler-Inventare live an einem Ort |

---

## 1. Einmalig: Backend bereitstellen (nur GM / Host)

Das Live-Dashboard braucht das mitgelieferte Backend unter `api/`. Es muss dort laufen,
wo die Extension es erreicht — standardmäßig **`https://catto.at/api/v1`**.

```bash
cd api
npm install
node server.js      # lauscht auf Port 3004
```

Hinter `catto.at` wird `/api/v1/...` auf diesen Server weitergeleitet. Nach jedem Update
von `api/server.js` einmal neu starten.

> **Lokal testen?** Backend lokal starten (`node api/server.js`) und in
> `roll20-extension/roll20-bridge.js` die Zeile `const API_BASE = 'https://catto.at/api/v1'`
> temporär auf `http://localhost:3004/api/v1` setzen.

Der Inventar-Stand wird in `api/inventory-store.json` gespeichert und übersteht Neustarts.

---

## 2. Einmalig: Mod-Script für Bogen-Sync (nur GM, braucht Roll20 Pro)

*Optional — nur nötig, wenn gebraute Tränke automatisch auf den Charakterbogen sollen.*

1. Roll20-Spiel öffnen → Zahnrad → **Mod (API) Scripts** → **New Script**.
2. Inhalt von `roll20-extension/AetherialSync.js` einfügen → **Save Script**.
3. Bei **D&D-2024-Beacon-Bogen**: zusätzlich **Game Settings → API Server → Experimental** aktivieren.

Ohne Pro überspringt ihr das — Brau-Ergebnisse erscheinen dann trotzdem als Chat-Karten,
nur ohne automatischen Bogen-Eintrag. **Das Live-Dashboard funktioniert auch ohne Pro.**

---

## 3. Pro Person: Extension installieren (jeder Spieler + GM)

Die Extension ist nicht im Web Store, daher manuell laden:

1. In Chrome: `chrome://extensions` öffnen.
2. **Entwicklermodus** (oben rechts) aktivieren.
3. **Entpackt laden** → den Ordner `roll20-extension/` auswählen.

Nach einem Update: auf der Extensions-Seite einfach **⟳ (Neu laden)** klicken.

Damit jeder seinen eigenen Charakter ansteuert: im Roll20-Spiel muss der Charakter unter
**„Controlled by"** dem jeweiligen Spieler zugewiesen sein.

---

## 4. Im Spiel nutzen

1. Roll20-Spiel öffnen (`app.roll20.net/editor/…`).
2. Rechts auf **⚗** klicken → die Alchemie-Sidebar öffnet sich.
3. Oben **eigenen Charakter** wählen.
4. Tab **Brauen** → Rezept → würfeln. Erfolg = Trank landet im Inventar (und via Chat/Bogen
   bei allen, siehe Ebene 1).

Sobald du deinen Charakter auswählst oder dein Inventar änderst, wird es **automatisch**
ans Dashboard gemeldet — du musst nichts extra tun.

---

## 5. GM: Live-Inventar sehen

Der GM hat zwei Wege (beide zeigen dieselben Live-Daten):

- **In Roll20:** In der ⚗-Sidebar erscheint beim GM ein extra Tab **„GM"** mit der
  Live-Übersicht aller Spieler (Kräuter + Tränke), aktualisiert sich automatisch.
- **Vollbild:** `https://catto.at/api/v1/gm` im Browser öffnen. Die Campaign-ID wird
  automatisch erkannt bzw. ist über den „Vollbild-Dashboard ↗"-Link im GM-Tab vorausgefüllt.

Die Spieler werden über die **Roll20-Campaign-ID** gruppiert — kein manueller Raum-Code nötig.

---

## Troubleshooting

| Problem | Lösung |
|---|---|
| ⚗-Button fehlt | Extension installiert & aktiviert? Roll20-Tab neu laden. |
| GM-Tab fehlt beim GM | Du musst in Roll20 als GM eingeloggt sein. Seite neu laden. |
| Dashboard bleibt leer | Spieler müssen die Sidebar geöffnet **und ihren Charakter gewählt** haben. Backend erreichbar? (`catto.at/api/v1` testen) |
| „getrennt" im Dashboard | Backend läuft nicht oder Campaign-ID falsch. |
| Tränke landen nicht auf dem Bogen | Mod-Script installiert? Bei D&D 2024: API Server → Experimental aktiv? Charakter „Controlled by" gesetzt? |
