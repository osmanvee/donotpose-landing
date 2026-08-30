/**
 * Google Apps Script — bound to your analytics Google Sheet
 *
 * 1. Set DASHBOARD_KEY to a long random secret (NOT in GitHub)
 * 2. Deploy → New deployment → Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 3. Paste Web App URL into analytics/config.js → endpoint only
 * 4. Bookmark: analytics/dashboard.html?key=YOUR_SECRET
 */

var DASHBOARD_KEY = "donotpose";

var HEADERS = [
  "timestamp",
  "event",
  "page",
  "path",
  "referrer",
  "tag",
  "visitorId",
  "meta",
];

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Events");
  if (!sheet) {
    sheet = ss.insertSheet("Events");
    sheet.appendRow(HEADERS);
  } else if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
  }
  return sheet;
}

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    sheet_().appendRow([
      data.ts || new Date().toISOString(),
      data.event || "pageview",
      data.page || "",
      data.path || "",
      data.referrer || "",
      data.tag || "",
      data.visitorId || "",
      JSON.stringify(data.meta || {}),
    ]);
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function doGet(e) {
  var params = e.parameter || {};
  if (params.key !== DASHBOARD_KEY) {
    return jsonp_(params.callback, { error: "unauthorized" });
  }

  var rows = sheet_().getDataRange().getValues();
  if (rows.length <= 1) {
    return jsonp_(params.callback, { events: [], stats: emptyStats_() });
  }

  var events = [];
  for (var i = 1; i < rows.length; i++) {
    events.push({
      timestamp: rows[i][0],
      event: rows[i][1],
      page: rows[i][2],
      path: rows[i][3],
      referrer: rows[i][4],
      tag: rows[i][5],
      visitorId: rows[i][6],
      meta: parseMeta_(rows[i][7]),
    });
  }

  events.reverse();
  return jsonp_(params.callback, {
    events: events.slice(0, 200),
    stats: buildStats_(events),
  });
}

function parseMeta_(raw) {
  if (!raw) return {};
  if (typeof raw === "object") return raw;
  try {
    return JSON.parse(raw);
  } catch (e) {
    return {};
  }
}

function emptyStats_() {
  return {
    totalViews: 0,
    uniqueVisitors: 0,
    byTag: {},
    byPath: {},
    byReferrer: {},
    byCountry: {},
    byCity: {},
  };
}

function buildStats_(events) {
  var views = events.filter(function (ev) {
    return ev.event === "pageview";
  });
  var visitors = {};
  var byTag = {};
  var byPath = {};
  var byReferrer = {};
  var byCountry = {};
  var byCity = {};

  views.forEach(function (ev) {
    if (ev.visitorId) visitors[ev.visitorId] = true;

    var tag = ev.tag || "(direct / no tag)";
    byTag[tag] = (byTag[tag] || 0) + 1;
    byPath[ev.path || "(unknown)"] = (byPath[ev.path || "(unknown)"] || 0) + 1;

    var ref = ev.referrer ? shortenRef_(ev.referrer) : "(typed / direct)";
    byReferrer[ref] = (byReferrer[ref] || 0) + 1;

    var meta = ev.meta || {};
    var country = meta.country || "(unknown country)";
    var city = meta.city || "";
    byCountry[country] = (byCountry[country] || 0) + 1;
    if (city) {
      var cityLabel = city + ", " + (meta.country || "?");
      byCity[cityLabel] = (byCity[cityLabel] || 0) + 1;
    }
  });

  return {
    totalViews: views.length,
    uniqueVisitors: Object.keys(visitors).length,
    byTag: byTag,
    byPath: byPath,
    byReferrer: byReferrer,
    byCountry: byCountry,
    byCity: byCity,
  };
}

function shortenRef_(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch (e) {
    return url.slice(0, 40);
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function jsonp_(callback, obj) {
  var body = callback
    ? callback + "(" + JSON.stringify(obj) + ")"
    : JSON.stringify(obj);
  return ContentService.createTextOutput(body).setMimeType(
    callback
      ? ContentService.MimeType.JAVASCRIPT
      : ContentService.MimeType.JSON
  );
}
