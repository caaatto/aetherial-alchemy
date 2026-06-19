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

### Variante A — Auto-Update (.crx), empfohlen für **Linux**

So aktualisiert sich die Extension künftig **von selbst** (sobald ein neuer Build deployt ist):

1. [`https://catto.at/alchemy-ext/aetherial-roll20.crx`](https://catto.at/alchemy-ext/aetherial-roll20.crx) herunterladen.
2. `chrome://extensions` öffnen → **Entwicklermodus** (oben rechts) aktivieren.
3. Die heruntergeladene **`.crx`-Datei** auf die Seite **ziehen** → „Hinzufügen".

Chrome prüft dann regelmäßig `updates.xml` und zieht neue Versionen automatisch.

> **Windows/Mac:** Chrome **blockiert** selbst-gehostete Extensions — dort funktioniert
> Variante A nicht. Diese Spieler nutzen Variante B (manuelles Neuladen bei Updates).

### Variante B — Entpackt laden (Fallback / Windows/Mac)

1. Repo-Ordner holen/aktualisieren (`git clone …` bzw. `git pull`).
2. `chrome://extensions` → **Entwicklermodus** an → **Entpackt laden** → Ordner `roll20-extension/`.
3. Nach einem Update: Ordner aktualisieren + auf der Seite **⟳ (Neu laden)** klicken.

### Microsoft Edge

Edge ist Chromium-basiert — die Extension läuft dort identisch. Installation **wie Variante B**,
nur unter **`edge://extensions`** → **Entwicklermodus** → **Entpackt laden** → Ordner `roll20-extension/`.

- Das self-hosted **`.crx`-Auto-Update (Variante A) greift in Edge nicht** — Edge blockt extern
  gehostete Extensions (wie Chrome unter Windows/Mac). Also: Updates manuell per ⟳.
- Der Schalter *„Erweiterungen aus anderen Stores zulassen"* hilft hier **nicht** (der ist nur für
  den Chrome Web Store, nicht für self-hosted `.crx`).
- Echtes Auto-Update in Edge gäbe es nur über den **Microsoft Edge Add-ons Store**.

---

Damit jeder seinen eigenen Charakter ansteuert: im Roll20-Spiel muss der Charakter unter
**„Controlled by"** dem jeweiligen Spieler zugewiesen sein. (Der **GM** sieht in der
Sidebar alle Charaktere, Spieler nur die, die sie steuern.)

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

---

## Für den Host: Deploy & Wartung (nur Server-Admin)

catto.at läuft auf demselben Server. Deploy-Kette:

```
git push → GitHub-Webhook → webhook-alchemy.service (Port 3003) → deploy-alchemy.sh
           ↳ git pull · npm build · Frontend nach /home/amke/website/alchemy
           ↳ alchemy-api.service neu starten  (Backend, Port 3004)
```

**Was bei `git push` automatisch aktualisiert wird:**
- Web-App (`catto.at/alchemy`) — neu gebaut & deployt
- Backend-API (`catto.at/api`) — **sofern die sudoers-Regel unten installiert ist**

**Was NICHT über git push kommt:** die Roll20-Extension (lokal pro Spieler installiert) —
siehe Schritt 3. Daten (Kräuter/Rezepte) lädt die Extension live von der API, die
aktualisieren sich also automatisch; nur Extension-**Code** braucht ein manuelles Neuladen.

### Einmalig: Backend-Auto-Restart erlauben (sudoers)

Damit `deploy-alchemy.sh` (läuft als `amke`) den API-Dienst ohne Passwort neu starten darf:

```bash
echo 'amke ALL=(root) NOPASSWD: /usr/bin/systemctl restart alchemy-api' \
  | sudo tee /etc/sudoers.d/alchemy-api-restart > /dev/null
sudo chmod 0440 /etc/sudoers.d/alchemy-api-restart
sudo visudo -c    # Syntax prüfen → sollte "parsed OK" melden
```

Ohne diese Regel deployt das Frontend trotzdem; der Restart wird nur mit einer Warnung
übersprungen (das Backend bleibt dann bei der alten Version, bis manuell neu gestartet:
`sudo systemctl restart alchemy-api`).

### Extension-Auto-Update (self-hosted CRX)

`deploy-alchemy.sh` ruft `tools/build-crx.mjs` auf — signiert die Extension neu und legt
`.crx` + `updates.xml` nach `/home/amke/website/alchemy-ext/` (→ `catto.at/alchemy-ext/`).

- **Signatur-Key:** `/home/amke/.secrets/aetherial-ext.pem` — **außerhalb des Repos, niemals
  committen.** Bestimmt die Extension-ID (`ilaeeldbffbibdbpnjaolccjlnkgmhih`). Geht der Key
  verloren, ändert sich die ID und **alle Spieler müssen neu installieren** → unbedingt sichern.
- **Neue Version veröffentlichen:** `version` in `roll20-extension/manifest.json` erhöhen,
  committen, pushen. Der Deploy baut die neue `.crx` + `updates.xml`; installierte Clients
  (Linux) updaten automatisch. Manuell baubar mit `npm run build:crx`.
