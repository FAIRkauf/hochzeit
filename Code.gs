// Hochzeitsfotos Irina & Branko – kleines Backend für die Seite www.irinaundbranko.de
// Läuft als Google-Apps-Script-Web-App im Google-Konto, dem der Drive-Ordner gehört.
//
// Was es tut:
//   GET  → liefert die Liste aller Fotos im Ordner (und im Unterordner "Gäste") als JSON
//   POST → nimmt ein Foto entgegen und legt es im Unterordner "Gäste" ab
//
// Nach Änderungen an diesem Code: "Bereitstellen" → "Bereitstellungen verwalten" → Stift → Version "Neu" → "Bereitstellen".

var ORDNER_ID = '1Rhlq94Pz8xK9ohbL4Trc7qhKTEmqblgX'; // Drive-Ordner "Hochzeit Irina & Branko · 09.10.2026 · Fotos"
var GAESTE_ORDNER = 'Gäste';                           // Unterordner für Uploads der Gäste (wird automatisch angelegt)
var CACHE_SEKUNDEN = 120;                              // Liste wird 2 Minuten zwischengespeichert

function doGet(e) {
  try {
    var cache = CacheService.getScriptCache();
    var json = cache.get('liste');
    if (!json) {
      json = JSON.stringify(liste());
      if (json.length < 95000) cache.put('liste', json, CACHE_SEKUNDEN);
    }
    return antwort_(json);
  } catch (err) {
    return antwort_(JSON.stringify({ fehler: String(err && err.message || err) }));
  }
}

function doPost(e) {
  try {
    var body = JSON.parse(e.postData.contents || '{}');
    if (!body.data) throw new Error('Keine Bilddaten erhalten.');
    var typ = String(body.typ || 'image/jpeg');
    if (typ.indexOf('image/') !== 0) throw new Error('Es können nur Bilder hochgeladen werden.');

    var bytes = Utilities.base64Decode(body.data);
    if (bytes.length > 40 * 1024 * 1024) throw new Error('Das Bild ist zu groß (max. 40 MB).');

    var von = sauber_(body.von || '').slice(0, 40);
    var original = sauber_(body.name || 'foto.jpg').slice(0, 80) || 'foto.jpg';
    var stempel = Utilities.formatDate(new Date(), 'Europe/Berlin', 'yyyy-MM-dd_HH-mm-ss');
    var name = (von ? von + '_' : '') + stempel + '_' + original;

    var root = DriveApp.getFolderById(ORDNER_ID);
    var ordner = gaesteOrdner_(root, true);
    var datei = ordner.createFile(Utilities.newBlob(bytes, typ, name));
    if (von) datei.setDescription('Hochgeladen von ' + von);

    CacheService.getScriptCache().remove('liste');
    return antwort_(JSON.stringify({ ok: true, id: datei.getId() }));
  } catch (err) {
    return antwort_(JSON.stringify({ ok: false, fehler: String(err && err.message || err) }));
  }
}

// ---------- Hilfsfunktionen ----------

function liste() {
  var root = DriveApp.getFolderById(ORDNER_ID);
  var fotos = [], pakete = [];
  var it = root.getFiles();
  while (it.hasNext()) {
    var f = it.next();
    var mt = f.getMimeType() || '';
    var n = f.getName();
    if (mt.indexOf('image/') === 0) {
      fotos.push({ id: f.getId(), n: n, t: f.getDateCreated().getTime() });
    } else if (/\.zip$/i.test(n)) {
      pakete.push({ id: f.getId(), n: n.replace(/\.zip$/i, ''), mb: Math.round(f.getSize() / 1048576) });
    }
  }
  fotos.sort(function (a, b) { return a.n.localeCompare(b.n, 'de', { numeric: true }); });
  pakete.sort(function (a, b) { return a.n.localeCompare(b.n, 'de', { numeric: true }); });

  var gaeste = [];
  var g = gaesteOrdner_(root, false);
  if (g) {
    var it2 = g.getFiles();
    while (it2.hasNext()) {
      var f2 = it2.next();
      if ((f2.getMimeType() || '').indexOf('image/') !== 0) continue;
      var d = f2.getDescription() || '';
      gaeste.push({ id: f2.getId(), n: f2.getName(), t: f2.getDateCreated().getTime(), von: d.replace(/^Hochgeladen von /, '') });
    }
    gaeste.sort(function (a, b) { return b.t - a.t; }); // neueste zuerst
  }
  return { fotos: fotos, gaeste: gaeste, pakete: pakete, stand: new Date().toISOString() };
}

function gaesteOrdner_(root, anlegen) {
  var it = root.getFoldersByName(GAESTE_ORDNER);
  if (it.hasNext()) return it.next();
  return anlegen ? root.createFolder(GAESTE_ORDNER) : null;
}

function sauber_(s) {
  return String(s).replace(/[\\\/:*?"<>|\u0000-\u001f]/g, '').replace(/\s+/g, ' ').trim();
}

function antwort_(json) {
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}
