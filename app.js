/* ═══════════════════════════════════════════════════════
   URBANVOICE — app.js
   Funciones:
   1. Navbar scroll
   2. Intersection Observer (animaciones de entrada)
   3. Simulación heatmap en el Hero
   4. Contador de incidentes en vivo
   5. Chips de radio de alerta (toggle)
   6. Botones de tipo de media (toggle)
═══════════════════════════════════════════════════════ */


/* ── 1. NAVBAR — cambio de color al hacer scroll ────── */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 28);
});


/* ── 2. INTERSECTION OBSERVER — aparición suave ─────── */
/* Mapa real de Lima con OpenStreetMap */
function createCityMap(elementId, center, zoom) {
  const element = document.getElementById(elementId);

  if (!element || typeof L === 'undefined') return;

  const map = L.map(element, {
    center,
    zoom,
    zoomControl: false,
    attributionControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false,
    touchZoom: false,
  });

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(map);
}

createCityMap('hero-live-map', [-12.097, -77.035], 14);
createCityMap('feature-live-map', [-12.097, -77.035], 13);


const revealEls  = document.querySelectorAll('.reveal');
const bentoCards = document.querySelectorAll('.bento-card');

const scrollObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el  => scrollObserver.observe(el));
bentoCards.forEach(el => scrollObserver.observe(el));


/* ── 3. HEATMAP — animación de zonas de calor ───────── */
const heatzones = [
  document.getElementById('hz-red'),
  document.getElementById('hz-orange'),
  document.getElementById('hz-yellow'),
];

function animateHeatzones() {
  heatzones.forEach(hz => {
    if (!hz) return;
    const scale   = 0.82 + Math.random() * 0.38;
    const opacity = 0.65 + Math.random() * 0.35;
    hz.style.transform = `scale(${scale})`;
    hz.style.opacity   = opacity;
  });
}

setInterval(animateHeatzones, 2400);


/* ── 4. CONTADOR DE INCIDENTES EN VIVO ──────────────── */
const incidentCountEl = document.getElementById('incident-count');
const floatReportsEl  = document.getElementById('float-reports');

let incidentBase = 7;
let reportBase   = 12;

setInterval(() => {
  // El número de incidentes fluctúa entre 3 y 15
  const delta = Math.random() > 0.5 ? 1 : -1;
  incidentBase = Math.max(3, Math.min(15, incidentBase + delta));

  if (incidentCountEl) {
    incidentCountEl.textContent = `⚠ ${incidentBase} incidentes activos`;
  }

  // Los reportes solo suben
  if (Math.random() > 0.55 && floatReportsEl) {
    reportBase += 1;
    floatReportsEl.textContent = `+${reportBase}`;
  }
}, 3600);


/* ── 5. CHIPS DE RADIO — toggle activo ──────────────── */
document.querySelectorAll('.chip').forEach(chip => {
  chip.addEventListener('click', () => {
    const siblings = chip.closest('.chip-group').querySelectorAll('.chip');
    siblings.forEach(s => {
      s.classList.remove('chip-active');
      s.classList.add('chip-blue');
    });
    chip.classList.add('chip-active');
    chip.classList.remove('chip-blue');
  });
});


/* ── 6. BOTONES DE MEDIA — toggle activo ────────────── */
document.querySelectorAll('.media-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    // Quitar activo a todos los hermanos dentro del mismo contenedor
    const siblings = btn.closest('.report-media-btns').querySelectorAll('.media-btn');
    siblings.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  });
});
