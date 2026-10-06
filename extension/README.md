# Vidhauler - Google Chrome Extensie (Manifest V3)

Dit is de officiële broncode van de **Vidhauler** Chrome Extensie, ontworpen om videostreams en online colleges (van o.a. Canvas, Blackboard, Panopto en Kaltura) direct in je browser te detecteren en downloaden.

## Hoe installeer je deze extensie in Google Chrome / Edge / Brave:

1. **Open je browser** (Google Chrome, Brave of Microsoft Edge).
2. Typ in de adresbalk:
   ```text
   chrome://extensions/
   ```
   *(Voor Brave: `brave://extensions/` | Voor Edge: `edge://extensions/`)*
3. Zet rechtsboven de schakelaar **Ontwikkelaarsmodus** (*Developer mode*) op **AAN**.
4. Klik linksboven op de knop **"Uitgepakte extensie laden"** (*Load unpacked*).
5. Selecteer deze map (`/extension`) die het bestand `manifest.json` bevat.
6. **Klaar!** Klik op het puzzel-icoon in je Chrome werkbalk en zet het pinnetje aan naast **Vidhauler**.

## Structuur:
- `manifest.json`: Manifest V3 configuratie en vereiste browserrechten (`activeTab`, `storage`, `downloads`).
- `popup/`: De pop-up interface met de 3 gekleurde balletjes, filters en downloadknoppen.
- `scripts/content.js`: Scant bezochte pagina's (zoals Canvas en Blackboard) op videospelers en audiotracks.
- `scripts/background.js`: Service worker die de badge in je werkbalk bijwerkt wanneer er video's worden gevonden.
- `icons/`: De officiële Vidhauler pictogrammen.

Ontwikkeld voor studenten, docenten en content creators.
