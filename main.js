// ============================================================
// Рендер сайта из data.js
// ============================================================

// маленький хелпер: экранирование HTML
const esc = (s) => String(s).replace(/[&<>"']/g, c =>
  ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[c]));

const $ = (id) => document.getElementById(id);

// --- НАВИГАЦИЯ ---
$("nav-links").innerHTML = NAV.map(n =>
  `<a href="${esc(n.href)}">${esc(n.label)}</a>`).join("");

// --- СТАТИСТИКА ---
$("hero-stats").innerHTML = STATS.map(s => `
  <div class="stat">
    <div class="stat-num">${esc(s.num)}</div>
    <div class="stat-lbl">${esc(s.label)}</div>
  </div>`).join("");

// --- УСЛУГИ ---
$("services-grid").innerHTML = SERVICES.map(s => `
  <div class="card">
    <div class="icon">${esc(s.icon)}</div>
    <h3>${esc(s.title)}</h3>
    <p>${esc(s.text)}</p>
  </div>`).join("");

// --- ОБОРУДОВАНИЕ ---
$("equipment-list").innerHTML = EQUIPMENT.map(([name, count, spec]) => `
  <div class="equip-row">
    <div><strong>${esc(name)}</strong></div>
    <div class="equip-count">${esc(count)}</div>
    <div class="equip-spec">${esc(spec)}</div>
  </div>`).join("");

// --- ПРОЕКТЫ ---
$("projects-grid").innerHTML = PROJECTS.map(p => `
  <article class="project">
    <img src="${esc(p.image)}" alt="${esc(p.title)}" loading="lazy">
    <div class="project-body">
      <h3>${esc(p.title)}</h3>
      <p>${esc(p.text)}</p>
      ${p.tags?.length ? `<div class="tags">${
        p.tags.map(t => `<span class="tag">${esc(t)}</span>`).join("")
      }</div>` : ""}
      <div class="meta"><span>Материал: <b>${esc(p.material)}</b></span></div>
    </div>
  </article>`).join("");

// --- ГАЛЕРЕЯ ---
$("gallery-grid").innerHTML = GALLERY.map(g => `
  <a href="${esc(g.src)}" data-cat="${esc(g.cat)}" class="${g.tall ? "tall" : ""}">
    <img
      src="${esc(g.src)}"
      alt="${esc(g.alt || g.cat)}"
      loading="lazy"
      decoding="async"
      fetchpriority="low"
    >
  </a>
`).join("");

// --- КОНТАКТЫ ---
$("contacts-list").innerHTML = CONTACTS.map(c => `
  <div class="contact-item">
    <div class="icon">${esc(c.icon)}</div>
    <div>
      <strong>${esc(c.title)}</strong>
      ${c.lines.map(l =>
        typeof l === "string"
          ? `<span>${esc(l)}</span>`
          : `<span><a href="${esc(l.href)}">${esc(l.text)}</a></span>`
      ).join("<br>")}
    </div>
  </div>`).join("");

// --- ФУТЕР ---
$("footer-cols").innerHTML = FOOTER_COLS.map(col => `
  <div>
    <h4>${esc(col.title)}</h4>
    <ul>${col.items.map(i =>
      `<li>${i.href ? `<a href="${esc(i.href)}">${esc(i.text)}</a>` : esc(i.text)}</li>`
    ).join("")}</ul>
  </div>`).join("");

// --- МОБИЛЬНОЕ МЕНЮ ---
const menuBtn = document.querySelector(".menu-btn");
const navLinks = $("nav-links");
menuBtn?.addEventListener("click", () => navLinks.classList.toggle("open"));
navLinks.addEventListener("click", (e) => {
  if (e.target.tagName === "A") navLinks.classList.remove("open");
});

// --- ГОД В ФУТЕРЕ ---
const y = document.getElementById("year");
if (y) y.textContent = new Date().getFullYear();
