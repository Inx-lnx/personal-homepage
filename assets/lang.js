// ============================================================
// 语言引擎（中 / 英 一键切换）
//
// 职责：
//   1. 决定当前语言：URL ?lang= > localStorage > 浏览器语言 > 默认中文
//   2. 把 assets/i18n.js 里的文案刷到页面上（见 HTML 的属性约定）
//   3. 记住访客的选择（localStorage），并把 ?lang=en 同步进地址栏，方便分享
//   4. 通知 app.js 重建依赖语言的内容（数字分身欢迎语、知识库、打字机…）
//
// HTML 侧约定：
//   data-i18n="key"             → 替换 textContent
//   data-i18n-html="key"        → 替换 innerHTML（值里含 <br> / <em> 时用）
//   data-i18n-attr="p:key;q:key2" → 替换属性（分号分隔，冒号前是属性名）
//   data-i18n-q="key"           → 替换 data-q（数字分身的快捷提问）
//
// 对外接口（供 app.js 使用）：
//   I18N.lang                    当前语言 "zh" | "en"
//   I18N.t(key)                  取文案（缺失时回退中文，再缺失返回空串）
//   I18N.setLang("en")           切换语言
//   I18N.toggle()                在中英之间来回切
//   I18N.onChange(fn)            语言变化后回调（立即用当前语言触发一次）
// ============================================================
(function () {
  var STORE_KEY = "csh-lang";
  var SUPPORTED = ["zh", "en"];
  var listeners = [];
  var current = "zh";

  // 把 "zh-CN" / "en-US" / "EN" 这类值收敛成 "zh" / "en"，认不出返回 null
  function normalize(value) {
    if (!value) return null;
    var s = String(value).toLowerCase();
    if (s.indexOf("zh") === 0) return "zh";
    if (s.indexOf("en") === 0) return "en";
    return null;
  }
  function fromQuery() {
    try { return normalize(new URLSearchParams(location.search).get("lang")); } catch (e) { return null; }
  }
  function fromStore() {
    try { return normalize(localStorage.getItem(STORE_KEY)); } catch (e) { return null; }
  }
  function detect() {
    return fromQuery() || fromStore() || normalize(navigator.language) || "zh";
  }
  function dict(lang) {
    return (window.SITE_I18N && (window.SITE_I18N[lang] || window.SITE_I18N.zh)) || {};
  }
  function t(key) {
    var v = dict(current)[key];
    if (v === undefined) v = dict("zh")[key];
    return v === undefined ? "" : v;
  }

  // 把当前语言的文案刷到所有标了 data-i18n* 的节点上
  function apply(lang) {
    var d = dict(lang);

    document.querySelectorAll("[data-i18n]").forEach(function (el) {
      var v = d[el.getAttribute("data-i18n")];
      if (typeof v === "string") el.textContent = v;
    });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) {
      var v = d[el.getAttribute("data-i18n-html")];
      if (typeof v === "string") el.innerHTML = v;
    });
    document.querySelectorAll("[data-i18n-attr]").forEach(function (el) {
      el.getAttribute("data-i18n-attr").split(";").forEach(function (pair) {
        var i = pair.indexOf(":");
        if (i < 0) return;
        var attr = pair.slice(0, i).trim();
        var v = d[pair.slice(i + 1).trim()];
        if (attr && typeof v === "string") el.setAttribute(attr, v);
      });
    });
    document.querySelectorAll("[data-i18n-q]").forEach(function (el) {
      var v = d[el.getAttribute("data-i18n-q")];
      if (typeof v === "string") el.setAttribute("data-q", v);
    });

    document.documentElement.lang = lang === "en" ? "en" : "zh-CN";
    document.documentElement.setAttribute("data-lang", lang);
  }

  // 中文是站点默认：切回中文时把 ?lang 参数去掉，链接保持干净；
  // 英文时写上 ?lang=en，这样复制地址发给别人，对方打开就是英文版。
  function syncUrl(lang) {
    try {
      var url = new URL(location.href);
      if (lang === "en") url.searchParams.set("lang", "en");
      else url.searchParams.delete("lang");
      history.replaceState(null, "", url.pathname + url.search + url.hash);
    } catch (e) { /* file:// 或老浏览器下忽略即可 */ }
  }

  function updateToggle() {
    var btn = document.getElementById("lang-toggle");
    if (!btn) return;
    var label = t("lang.toggleLabel");
    btn.textContent = t("lang.toggle");
    if (label) {
      btn.setAttribute("aria-label", label);
      btn.setAttribute("title", label);
    }
    // 按钮显示的是「另一种语言」，让它按那种语言选字体
    btn.setAttribute("lang", current === "zh" ? "en" : "zh-CN");
  }

  function emit(lang) {
    listeners.forEach(function (fn) {
      try { fn(lang); } catch (e) { console.error(e); }
    });
    document.dispatchEvent(new CustomEvent("site:langchange", { detail: { lang: lang } }));
  }

  function setLang(next) {
    var lang = SUPPORTED.indexOf(next) >= 0 ? next : "zh";
    current = lang;
    try { localStorage.setItem(STORE_KEY, lang); } catch (e) { /* 隐私模式下忽略 */ }
    syncUrl(lang);
    apply(lang);
    updateToggle();
    emit(lang);
    return lang;
  }

  window.I18N = {
    get lang() { return current; },
    t: t,
    setLang: setLang,
    toggle: function () { return setLang(current === "zh" ? "en" : "zh"); },
    onChange: function (fn) {
      if (typeof fn !== "function") return;
      listeners.push(fn);
      fn(current); // 立即用当前语言跑一次，避免调用方还得自己初始化
    }
  };

  // ---- 启动 ----
  current = detect();
  apply(current);
  updateToggle();

  var toggleBtn = document.getElementById("lang-toggle");
  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () { window.I18N.toggle(); });
  }
})();
