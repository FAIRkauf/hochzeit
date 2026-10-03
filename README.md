# Irina & Branko · 09.10.2026

Fotoseite zur Hochzeit, erreichbar unter **https://www.irinaundbranko.de**.

## Aufbau

| Datei / Ordner | Inhalt |
|---|---|
| `index.html` | Die Seite |
| `fotos.js` | Liste der Fotos und ZIP-Pakete |
| `fotos/` | Vorschaubilder und Download-Versionen |
| `downloads/` | ZIP-Pakete mit allen Fotos |
| `CNAME` | Eigene Domain für GitHub Pages |
| `.nojekyll` | Seite unverändert ausliefern |

## Veröffentlichen mit GitHub Pages

1. Repository anlegen und alle Dateien hochladen.
2. **Settings → Pages**: Source „Deploy from a branch“, Branch `main`, Ordner `/ (root)`.
3. Unter **Custom domain** steht `www.irinaundbranko.de`. Sobald der Haken erscheint, **Enforce HTTPS** aktivieren.

## DNS beim Domain-Anbieter

| Typ | Name | Wert |
|---|---|---|
| CNAME | `www` | `<github-benutzername>.github.io` |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

Mit den A-Einträgen leitet auch `irinaundbranko.de` ohne www auf die Seite weiter.

## Fotos ergänzen

Die Dateien in `fotos/`, `downloads/` und `fotos.js` werden fertig erzeugt und dann ersetzt.
Grenzen von GitHub: höchstens 25 MB pro Datei beim Hochladen im Browser, 100 MB per Git, die ganze Seite sollte unter 1 GB bleiben.
