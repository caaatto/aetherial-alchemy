# Aetherial Alchemy x Roll20: Setup für die Gruppe

Diese Anleitung zeigt, wie ihr die Alchemie-Extension **gemeinsam** in Roll20 nutzt,
sodass der **GM live sieht, was jeder Spieler im Inventar hat** (Kräuter + Tränke).

Es gibt zwei Sync-Ebenen, die zusammenspielen:

| Ebene | Wer richtet's ein | Was es macht |
|---|---|---|
| **Roll20 (Chat + Bogen)** | GM (Mod-Script, braucht Pro) | Gebraute Tränke landen im Chat & auf dem Charakterbogen, alle sehen's |
| **Live-Inventar-Dashboard** | GM (Backend, **kein** Pro nötig) | GM sieht alle Spieler-Inventare live an einem Ort |

---

## 1. Einmalig: Backend bereitstellen (nur GM / Host)

Das Live-Dashboard braucht das mitgelieferte Backend unter `api/`. Es muss dort laufen,
wo die Extension es erreicht, standardmäßig **`https://catto.at/api/v1`**.

```bash
cd api
npm install
node server.js      # lauscht auf Port 3004
```

Hinter `catto.at` wird `/api/v1/...` auf diesen Server weitergeleitet. Nach jedem Update
von `api/server.js` einmal neu starten.

> **Lokal testen?** Backend lokal starten (`node api/server.js`) und in
> `roll20-extension/roll20-bridge.js` die Zeile `const API_BASE = 'https://catto.at/api/v1'`
> temporär auf `http://localhost:3004/api/v1` setzen. Port und Store-Pfade lassen sich
> per Env übersteuern (`PORT`, `ALCHEMY_STORE`, `ALCHEMY_GRANTS_STORE`).

Der Inventar-Stand wird in `api/inventory-store.json` gespeichert, ausstehende GM-Gaben
in `api/grants-store.json`. Beides übersteht Neustarts.

---

## 2. Einmalig: Mod-Script für Bogen-Sync (nur GM, braucht Roll20 Pro)

*Optional. Nötig, wenn gebraute Tränke automatisch auf den Charakterbogen sollen und
die Sidebar den Custom Skill „Alchemy" für den Brau-Wurf vom Bogen lesen soll.*

1. Roll20-Spiel öffnen → Zahnrad → **Mod (API) Scripts** → **New Script**.
2. Inhalt von `roll20-extension/AetherialSync.js` einfügen → **Save Script**.
3. Bei **D&D-2024-Beacon-Bogen**: zusätzlich **Game Settings → API Server → Experimental** aktivieren.

**Alchemy-Skill:** Legt beim Charakter einen Custom Skill (oder ein Custom-Attribut)
mit dem Namen **„Alchemy"** an. Sobald ein Spieler seinen Charakter in der Sidebar
wählt, liest die Extension den Bonus vom Bogen und trägt ihn im Brau-Panel ein
(Feld „Alchemy Skill Bonus", Button „Vom Bogen" lädt neu). Manuell überschreiben
geht weiterhin. Wer das Mod-Script schon installiert hat, ersetzt es einmal durch
die aktuelle Version aus `roll20-extension/AetherialSync.js`.

Ohne Pro überspringt ihr das. Brau-Ergebnisse erscheinen dann trotzdem als Chat-Karten,
nur ohne automatischen Bogen-Eintrag. **Das Live-Dashboard funktioniert auch ohne Pro.**

---

## 3. Pro Person: Extension installieren (jeder Spieler + GM)

Alle Downloads kommen von den **[GitHub Releases](https://github.com/caaatto/aetherial-alchemy/releases)**
(neuestes `Roll20-Extension vX.Y`-Release nehmen). Ein Repo-Checkout ist **nicht** nötig.

### Variante A: Auto-Update (.crx), empfohlen für **Linux**

So aktualisiert sich die Extension künftig **von selbst**:

1. `aetherial-roll20.crx` vom neuesten Release herunterladen.
2. `chrome://extensions` öffnen → **Entwicklermodus** (oben rechts) aktivieren.
3. Die heruntergeladene **`.crx`-Datei** auf die Seite **ziehen** → „Hinzufügen".

Chrome prüft dann regelmäßig die `updates.xml` im Repo und zieht neue Versionen
automatisch von GitHub.

> **Windows/Mac:** Chrome **blockiert** selbst-gehostete Extensions, dort funktioniert
> Variante A nicht. Diese Spieler nutzen Variante B.

### Variante B: Entpackt laden (Windows/Mac/Edge)

1. `aetherial-roll20.zip` vom neuesten Release herunterladen und entpacken.
2. `chrome://extensions` → **Entwicklermodus** an → **Entpackt laden** → den entpackten
   Ordner `roll20-extension/` auswählen.
3. **Bei Updates:** Die Extension meldet sich selbst. Am Extension-Icon erscheint ein
   rotes **„NEU"-Badge**, sobald eine neuere Version veröffentlicht ist. Icon anklicken,
   dann öffnet sich das passende Release: neues Zip herunterladen, über den alten Ordner
   entpacken, auf der Extensions-Seite **Neu laden** klicken.

### Microsoft Edge

Edge ist Chromium-basiert, die Extension läuft dort identisch. Installation **wie Variante B**,
nur unter **`edge://extensions`** → **Entwicklermodus** → **Entpackt laden**.

- Das self-hosted **`.crx`-Auto-Update (Variante A) greift in Edge nicht**: Edge blockt extern
  gehostete Extensions (wie Chrome unter Windows/Mac). Das **„NEU"-Badge** (Variante B)
  funktioniert aber auch in Edge.
- Der Schalter *„Erweiterungen aus anderen Stores zulassen"* hilft hier **nicht** (der ist nur für
  den Chrome Web Store, nicht für self-hosted `.crx`).
- Echtes Auto-Update in Edge gäbe es nur über den **Microsoft Edge Add-ons Store**.

---

Damit jeder seinen eigenen Charakter ansteuert: im Roll20-Spiel muss der Charakter unter
**„Controlled by"** dem jeweiligen Spieler zugewiesen sein. (Der **GM** sieht in der
Sidebar alle Charaktere, Spieler nur die, die sie steuern.)

---

## 4. Im Spiel nutzen

1. Roll20-Spiel öffnen (`app.roll20.net/editor/...`).
2. Rechts auf den **Alchemie-Button** (Kolben-Symbol) klicken, die Sidebar öffnet sich.
3. Oben **eigenen Charakter** wählen.
4. Tab **Brauen** → Rezept → würfeln. Erfolg = Trank landet im Inventar (und via Chat/Bogen
   bei allen, siehe Ebene 1).

Sobald du deinen Charakter auswählst oder dein Inventar änderst, wird es **automatisch**
ans Dashboard gemeldet. Du musst nichts extra tun.

Beim Auswählen des Charakters gleicht die Extension außerdem mit dem Server ab: die
**neuere** Seite gewinnt (Zeitstempel). Wechselst du also PC oder Browser, ist dein
Inventar wieder da; hast du offline gebraut, wird dein lokaler Stand hochgeladen.
**Items vom GM** (siehe unten) landen automatisch in deinem Inventar, live während
des Spiels (kleine Meldung unten rechts) oder beim nächsten Betreten.

---

## 5. GM: Live-Inventar sehen & Items verteilen

Der GM hat zwei Wege (beide zeigen dieselben Live-Daten):

- **In Roll20:** In der Alchemie-Sidebar erscheint beim GM ein extra Tab **„GM"** mit der
  Live-Übersicht aller Spieler (Kräuter + Tränke), aktualisiert sich automatisch.
- **Vollbild:** `https://catto.at/api/v1/gm` im Browser öffnen. Die Campaign-ID ist über
  den Link „Vollbild-Dashboard" im GM-Tab vorausgefüllt.

**Items verteilen:** Oben im GM-Tab („Items verteilen") Charakter, Kraut oder Trank und
Menge wählen. Ist der Spieler gerade im Spiel, bekommt er das Item **sofort** (mit
Meldung); sonst wartet es auf dem Server und wird beim nächsten Betreten abgeholt.
Bis dahin steht beim Charakter „n ausstehend".

Die Spieler werden über die **Roll20-Campaign-ID** gruppiert, kein manueller Raum-Code nötig.

---

## Troubleshooting

| Problem | Lösung |
|---|---|
| Alchemie-Button fehlt | Extension installiert & aktiviert? Roll20-Tab neu laden. |
| GM-Tab fehlt beim GM | Du musst in Roll20 als GM eingeloggt sein. Seite neu laden. |
| Dashboard bleibt leer | Spieler müssen die Sidebar geöffnet **und ihren Charakter gewählt** haben. Backend erreichbar? (`catto.at/api/v1` testen) |
| „getrennt" im Dashboard | Backend läuft nicht oder Campaign-ID falsch. |
| Tränke landen nicht auf dem Bogen | Mod-Script installiert? Bei D&D 2024: API Server → Experimental aktiv? Charakter „Controlled by" gesetzt? |
| Alchemy-Bonus wird nicht vom Bogen gelesen | Skill/Attribut muss „Alchemy" heißen (Groß-/Kleinschreibung egal). Mod-Script auf der aktuellen Version? Sonst Bonus manuell eintragen. |
| GM-Gabe kommt nicht an | Spieler muss seinen Charakter in der Sidebar gewählt haben; sonst wartet die Gabe als „ausstehend" auf dem Server. |

---

## Für den Host: Deploy & Wartung (nur Server-Admin)

catto.at läuft auf demselben Server. Deploy-Kette:

```
git push → GitHub-Webhook → webhook-alchemy.service (Port 3003) → deploy-alchemy.sh
           ↳ git pull · npm build · Frontend nach /home/amke/website/alchemy
           ↳ alchemy-api.service neu starten  (Backend, Port 3004)
```

**Was bei `git push` automatisch aktualisiert wird:**
- Web-App (`catto.at/alchemy`): neu gebaut & deployt
- Backend-API (`catto.at/api`): **sofern die sudoers-Regel unten installiert ist**

**Was NICHT über git push kommt:** die Roll20-Extension (lokal pro Spieler installiert),
siehe Schritt 3. Daten (Kräuter/Rezepte) lädt die Extension live von der API, die
aktualisieren sich also automatisch; nur Extension-**Code** braucht ein neues Release.

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

### Extension-Auto-Update (GitHub Releases)

Update-Kette: installierte Extension → pollt `update_url`
(`raw.githubusercontent.com/.../roll20-extension/updates.xml`, git-getrackt) → lädt die
`.crx` vom GitHub-Release `ext-v<version>`. Signiert wird **nur auf diesem Server**,
der Key verlässt die Maschine nie (kein CI-Secret nötig).

**Neue Version veröffentlichen:**

```bash
npm run bump:ext 2.9    # setzt manifest.json-Version + regeneriert updates.xml
git commit -am "Extension v2.9: ..." && git push
```

Der Deploy erledigt den Rest automatisch:
- `tools/build-crx.mjs` signiert die `.crx` und legt sie zusätzlich als Mirror nach
  `/home/amke/website/alchemy-ext/` (Alt-Installationen von dort migrieren so auf GitHub).
- `tools/release-ext.mjs` erstellt (idempotent, via `gh` CLI) das GitHub-Release
  `ext-v<version>` mit `aetherial-roll20.crx`, `aetherial-roll20.zip` (für „Entpackt laden")
  und `updates.xml`. Manuell nachholbar mit `npm run release:ext`.

Installierte Clients: Linux-`.crx` updatet automatisch (Chrome pollt alle paar Stunden);
entpackte Installationen (Win/Mac/Edge) bekommen das **„NEU"-Badge** am Icon
(Versionscheck in `background.js` alle 6 h gegen das Manifest im Repo).

- **Signatur-Key:** `/home/amke/.secrets/aetherial-ext.pem`. Liegt **außerhalb des Repos,
  niemals committen.** Bestimmt die Extension-ID (`ilaeeldbffbibdbpnjaolccjlnkgmhih`). Geht
  der Key verloren, ändert sich die ID und **alle Spieler müssen neu installieren**, also
  unbedingt sichern.
- **Wichtig:** `version` nie von Hand in `manifest.json` ändern, immer `npm run bump:ext`.
  Sonst zeigt `updates.xml` auf die falsche Release-URL (das Release-Script bricht dann
  mit einer entsprechenden Fehlermeldung ab).
