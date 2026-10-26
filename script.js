// Light/dark theme toggle (remembered per browser).
const root = document.documentElement;
document.getElementById("theme-toggle").addEventListener("click", () => {
  const dark = root.dataset.theme
    ? root.dataset.theme === "dark"
    : window.matchMedia("(prefers-color-scheme: dark)").matches;
  root.dataset.theme = dark ? "light" : "dark";
  try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
});

// Mobile menu.
const menu = document.getElementById("menu");
const menuBtn = document.getElementById("menu-toggle");
menuBtn.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", String(open));
});
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => {
  menu.classList.remove("open");
  menuBtn.setAttribute("aria-expanded", "false");
}));

// Language buttons. English is written in index.html; Bangla and Japanese
// come from TRANSLATIONS in i18n.js, looked up by each element's English HTML.
// The page always opens in English unless the visitor picked another language before.
const I18N_SELECTOR = [
  "#menu a", ".eyebrow", "h1", ".role", ".lead", ".hero .cta a", ".trust strong", ".trust span",
  ".float", ".kicker", "main h2", "main h3", "p.muted", ".pipeline b", ".pipeline span", ".badge",
  ".card > p", ".featured-body p", ".tags li", ".when", ".timeline p", ".ticks li",
  ".contact-box > p", ".contact-box .btn", ".footer p",
].join(", ");
const norm = html => html.replace(/\s+/g, " ").trim();
// Skip hidden sections.
const i18nEls = [...document.querySelectorAll(I18N_SELECTOR)].filter(el => !el.closest("[hidden]"));
const english = new Map(i18nEls.map(el => [el, norm(el.innerHTML)]));
const englishTitle = document.title;
const langButtons = document.querySelectorAll(".lang-switch button");

function setLanguage(lang) {
  const dict = (typeof TRANSLATIONS !== "undefined" && TRANSLATIONS[lang]) || null;
  const t = key => (dict && dict[key]) || null;
  i18nEls.forEach(el => { el.innerHTML = t(english.get(el)) || english.get(el); });
  document.title = t("@title") || englishTitle;
  root.lang = dict ? lang : "en";
  langButtons.forEach(b => b.setAttribute("aria-pressed", String(b.dataset.lang === root.lang)));
  updateDynamicText(t);
  try { localStorage.setItem("lang", root.lang); } catch (e) {}
}

// Text that depends on today's date. Runs after every language change,
// because changing language rewrites these elements.
function updateDynamicText(t) {
  // The OmiCore role starts on 1 Dec 2026. Before that date, show it as "incoming"
  // so the site is always accurate without manual edits.
  const START = new Date("2026-12-01T00:00:00+09:00");
  if (new Date() < START) {
    document.getElementById("current-role").textContent = t("@incomingRole") || "Incoming Research Scientist (from Dec 2026)";
    document.getElementById("omicore-dates").textContent = t("@incomingDates") || "From Dec 2026";
    // Self-introduction: "currently at the Institute, joining OmiCore in December".
    document.getElementById("intro-career").innerHTML = t("@introIncoming") ||
      'I am currently a researcher at the <a href="https://www.reoken.com/" rel="noopener">Institute of Rheological Functions of Foods</a>, ' +
      "and from December 2026 I will join OmiCore Inc. in Fukuoka as a Research Scientist. " +
      "Before that, I worked in quality control at Incepta Pharmaceuticals in Bangladesh.";
  }
  document.getElementById("year").textContent = new Date().getFullYear();
}

langButtons.forEach(b => b.addEventListener("click", () => setLanguage(b.dataset.lang)));
let savedLang = "en";
try { savedLang = localStorage.getItem("lang") || "en"; } catch (e) {}
setLanguage(savedLang);

// Fade sections in as they scroll into view.
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("shown"); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
