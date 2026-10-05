# Irina & Branko · 9. Oktober 2026

Fotoseite zur Hochzeit, erreichbar unter **https://www.irinaundbranko.de**.

## Wie die Seite funktioniert

Die Fotos liegen in einem Google-Drive-Ordner. Ein kleines Google-Apps-Script liest den Ordner aus
und nimmt Uploads der Gäste entgegen. Die Seite selbst ist eine einzelne HTML-Datei.

| Datei | Inhalt |
|---|---|
| `index.html` | Die Seite |
| `config.js` | Einstellungen: Web-App-URL des Scripts, optional der Drive-Link |
| `Code.gs` | Der Code für Google Apps Script (zum Einfügen, wird nicht von GitHub genutzt) |
| `CNAME` | Eigene Domain für GitHub Pages |

## Einrichten (einmalig)

1. **Drive-Ordner freigeben:** In Google Drive den Ordner „Hochzeit Irina & Branko · 09.10.2026 · Fotos“ mit Rechtsklick → „Freigeben“ öffnen. Unter „Allgemeiner Zugriff“ auf „Jeder, der über den Link verfügt“ stellen, Rolle „Betrachter“. Fertig.
2. **Script anlegen:** Auf https://script.google.com mit demselben Google-Konto anmelden, dem der Ordner gehört. „Neues Projekt“. Den vorhandenen Text im Editor löschen und den kompletten Inhalt von `Code.gs` einfügen. Speichern (Disketten-Symbol). Oben links dem Projekt einen Namen geben, z. B. „Hochzeitsfotos“.
3. **Als Web-App bereitstellen:** Oben rechts „Bereitstellen“ → „Neue Bereitstellung“. Neben „Typ auswählen“ auf das Zahnrad → „Web-App“. Einstellungen: Ausführen als **„Ich“**, Zugriff **„Jeder“**. Auf „Bereitstellen“. Beim ersten Mal „Zugriff autorisieren“ → Konto wählen → bei der Warnung „Diese App wurde nicht überprüft“ auf „Erweitert“ → „Zu Hochzeitsfotos (unsicher) wechseln“ → „Zulassen“. Danach die **Web-App-URL** kopieren (endet auf `/exec`).
4. **URL eintragen:** Bei GitHub die Datei `config.js` öffnen, Stift-Symbol, die URL zwischen die Anführungszeichen bei `API` einfügen, „Commit changes“. Nach ein bis zwei Minuten lädt die Seite die Fotos.

## Fotos verwalten

- **Offizielle Fotos:** Einfach in den Drive-Ordner legen, am Computer per Drag-and-drop oder vom Handy mit der Drive-App. Sie erscheinen innerhalb von zwei Minuten auf der Seite, sortiert nach Dateiname.
- **Fotos der Gäste:** Landen automatisch im Unterordner „Gäste“ und werden auf der Seite unter „Von euch“ gezeigt. Unpassende Bilder einfach in Drive löschen.
- **ZIP-Pakete:** In Drive die gewünschten Fotos markieren → Rechtsklick → „Herunterladen“. Google erstellt eine ZIP-Datei. Diese ZIP wieder in den Hauptordner hochladen, z. B. als `Alle Fotos 1-250.zip`. Sie erscheint auf der Seite unter „Alle Fotos als ZIP“.
- **Drive-Link für Gäste (optional):** Wer den Gästen zusätzlich den Drive-Ordner selbst öffnen möchte, trägt den Freigabe-Link in `config.js` bei `DRIVE_LINK` ein.

## Nach Änderungen am Script

Wenn `Code.gs` geändert wird: „Bereitstellen“ → „Bereitstellungen verwalten“ → Stift → Version „Neue Version“ → „Bereitstellen“. Die URL bleibt dabei gleich.

## DNS beim Domain-Anbieter (bereits erledigt)

| Typ | Name | Wert |
|---|---|---|
| CNAME | `www` | `fairkauf.github.io.` |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
