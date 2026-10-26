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

// The OmiCore role starts on 1 Dec 2026. Before that date, show it as "incoming"
// so the site is always accurate without manual edits.
const START = new Date("2026-12-01T00:00:00+09:00");
if (new Date() < START) {
  document.getElementById("current-role").textContent = "Incoming Research Scientist (from Dec 2026)";
  document.getElementById("omicore-dates").textContent = "From Dec 2026";
}

document.getElementById("year").textContent = new Date().getFullYear();

// Fade sections in as they scroll into view.
const io = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("shown"); io.unobserve(e.target); } });
}, { threshold: 0.12 });
document.querySelectorAll(".reveal").forEach(el => io.observe(el));
