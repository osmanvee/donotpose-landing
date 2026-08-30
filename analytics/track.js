(function () {
  var cfg = window.DONOTPOSE_ANALYTICS || {};
  var STORAGE_KEY = "donotpose_vid";
  var TAG_KEY = "donotpose_tag";

  function basePath() {
    var script = document.currentScript;
    if (!script || !script.src) return "analytics/";
    return script.src.replace(/track\.js(\?.*)?$/, "");
  }

  function visitorId() {
    try {
      var id = localStorage.getItem(STORAGE_KEY);
      if (!id) {
        id =
          "v_" +
          Math.random().toString(36).slice(2) +
          Date.now().toString(36);
        localStorage.setItem(STORAGE_KEY, id);
      }
      return id;
    } catch (e) {
      return "v_anon";
    }
  }

  function readTagFromUrl() {
    var params = new URLSearchParams(window.location.search);
    return (
      params.get("tag") ||
      params.get("from") ||
      params.get("utm_source") ||
      params.get("ref") ||
      ""
    );
  }

  function activeTag() {
    var fromUrl = readTagFromUrl();
    if (fromUrl) {
      try {
        sessionStorage.setItem(TAG_KEY, fromUrl);
      } catch (e) {}
      return fromUrl;
    }
    try {
      return sessionStorage.getItem(TAG_KEY) || "";
    } catch (e) {
      return "";
    }
  }

  function pagePath() {
    return window.location.pathname.replace(/^\//, "") || "index.html";
  }

  function send(eventName, meta) {
    var payload = {
      event: eventName,
      page: document.title,
      path: pagePath(),
      referrer: document.referrer || "",
      tag: activeTag(),
      visitorId: visitorId(),
      ts: new Date().toISOString(),
      meta: meta || {},
    };

    if (!cfg.endpoint) {
      if (window.location.search.indexOf("debug=1") !== -1) {
        console.log("[DoNotPose analytics]", payload);
      }
      return;
    }

    var body = JSON.stringify(payload);
    var blob = new Blob([body], { type: "text/plain;charset=utf-8" });

    try {
      if (navigator.sendBeacon && navigator.sendBeacon(cfg.endpoint, blob)) {
        return;
      }
    } catch (e) {}

    fetch(cfg.endpoint, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: body,
      keepalive: true,
    }).catch(function () {});
  }

  function trackClick(el) {
    var href = el.getAttribute("href") || "";
    var label =
      el.getAttribute("aria-label") ||
      el.textContent.trim().slice(0, 80) ||
      href;
    send("click", { href: href, label: label });
  }

  send("pageview");

  document.addEventListener(
    "click",
    function (e) {
      var link = e.target.closest("a[href]");
      if (!link) return;
      trackClick(link);
    },
    true
  );

  window.donotposeTrack = send;
})();
