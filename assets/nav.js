// assets/nav.js
// 🔗 Navigation partagée (top + bottom) pour toutes les pages de l'app

function createNavBar(active) {
  const pages = [
    { id: "home", key: "nav.home", icon: "home", href: "home.html" },
    { id: "dreams", key: "nav.dreams", icon: "target", href: "dreams.html" },
    { id: "team", key: "nav.team", icon: "users", href: "team.html" },
    { id: "profile", key: "nav.profile", icon: "user", href: "profile.html" },
  ];

  const t = (k) =>
    window.DaylifeI18n ? DaylifeI18n.t(k) : k;

  const headerEl = document.getElementById("appHeader");
  if (headerEl) {
    headerEl.innerHTML = `
      <div class="app-header">
        <div class="app-header-inner">
          <div class="brand">
            <div class="brand-orbit">🌕</div>
            <div>
              <div class="brand-text-main">DAYLIFE</div>
              <div class="brand-text-sub">Every Day Counts</div>
            </div>
          </div>
          <nav class="top-nav">
            ${pages
              .map(
                (p) => `
              <button
                class="top-nav-item ${p.id === active ? "active" : ""}"
                onclick="location.href='${p.href}'"
              >
                <i data-lucide="${p.icon}" class="top-nav-icon"></i>
                <span class="top-nav-label" data-i18n="${p.key}">
                  ${t(p.key)}
                </span>
              </button>
            `
              )
              .join("")}
            <select id="langSelect" class="lang-select"></select>
          </nav>
        </div>
      </div>
    `;
  }

  const bottomEl = document.getElementById("bottomNav");
  if (bottomEl) {
    bottomEl.innerHTML = `
      <nav class="bottom-nav">
        <div class="bottom-nav-inner">
          ${pages
            .map(
              (p) => `
            <a
              href="${p.href}"
              class="bottom-nav-item ${p.id === active ? "active" : ""}"
            >
              <i data-lucide="${p.icon}" class="bottom-nav-icon"></i>
              <span data-i18n="${p.key}">${t(p.key)}</span>
            </a>
          `
            )
            .join("")}
        </div>
      </nav>
    `;
  }

  // Applique traductions (remplit aussi le select de langue)
  if (window.DaylifeI18n) {
    DaylifeI18n.applyTranslations();
  }

  // Icônes Lucide
  if (window.lucide) {
    lucide.createIcons();
  }
}
