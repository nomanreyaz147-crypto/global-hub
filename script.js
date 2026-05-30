// ─── STATE ───────────────────────────────────────────────
let currentCat = 'all';
let favs = [];
try { const s = localStorage.getItem('ai_hub_favs'); if (s) favs = JSON.parse(s); } catch(e) {}

// ─── THEME ───────────────────────────────────────────────
if (localStorage.getItem('theme') === 'light') document.body.classList.add('light');
function toggleTheme() {
  document.body.classList.toggle('light');
  localStorage.setItem('theme', document.body.classList.contains('light') ? 'light' : 'dark');
}

// ─── FAVORITES ───────────────────────────────────────────
function updateStars() {
  document.querySelectorAll('.tool-row').forEach(row => {
    const btn = row.querySelector('.fav-btn');
    btn.classList.toggle('active', favs.includes(row.dataset.id));
    btn.innerHTML = favs.includes(row.dataset.id) ? '&#9733;' : '&#9733;';
  });
}
function toggleFavorite(id) {
  favs = favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id];
  localStorage.setItem('ai_hub_favs', JSON.stringify(favs));
  updateStars();
  if (currentCat === 'favs') filterTools();
}

// ─── FILTER & SEARCH ─────────────────────────────────────
function filterTools() {
  const q = document.getElementById('search-input').value.toLowerCase();
  const rows = document.querySelectorAll('.tool-row');
  const dividers = document.querySelectorAll('.cat-divider');
  let count = 0;

  // hide/show rows
  rows.forEach(row => {
    const matchSearch = !q || row.innerText.toLowerCase().includes(q);
    const matchCat =
      currentCat === 'all' ? true :
      currentCat === 'favs' ? favs.includes(row.dataset.id) :
      row.dataset.cat === currentCat;
    const show = matchSearch && matchCat;
    row.style.display = show ? '' : 'none';
    if (show) count++;
  });

  // hide category dividers if all rows in that section are hidden
  dividers.forEach(divider => {
    let next = divider.nextElementSibling;
    let hasVisible = false;
    while (next && !next.classList.contains('cat-divider')) {
      if (next.classList.contains('tool-row') && next.style.display !== 'none') hasVisible = true;
      next = next.nextElementSibling;
    }
    divider.style.display = hasVisible ? '' : 'none';
  });

  // counter
  document.getElementById('tools-counter').textContent =
    currentCat === 'favs' ? count + ' Saved' : count + ' Tools';

  // empty state
  const empty = document.getElementById('empty-state');
  if (empty) empty.style.display = count === 0 ? 'block' : 'none';
}

// ─── FILTER BUTTONS ──────────────────────────────────────
document.querySelectorAll('.filter-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    this.classList.add('active');
    currentCat = this.dataset.category;
    filterTools();
  });
});

// ─── SEARCH INPUT ────────────────────────────────────────
document.getElementById('search-input').addEventListener('input', filterTools);

// ─── SCROLL TO TOP ───────────────────────────────────────
const scrollBtn = document.getElementById('scroll-top-btn');
window.addEventListener('scroll', () => {
  scrollBtn.style.display = window.scrollY > 400 ? 'flex' : 'none';
});
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

// ─── INIT ────────────────────────────────────────────────
updateStars();
