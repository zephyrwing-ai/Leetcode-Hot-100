import { manifest } from '../problems/manifest.js';

export function createSidebar(onNavigate) {
  const sidebar = document.createElement('aside');
  sidebar.className = 'sidebar';

  // Group by category
  const groups = {};
  manifest.forEach(p => {
    if (!groups[p.category]) groups[p.category] = [];
    groups[p.category].push(p);
  });

  sidebar.innerHTML = `
    <div class="sidebar-header">
      <span class="sidebar-brand">Leetcode Hot 100</span>
    </div>
    <input class="sidebar-search" placeholder="Search..." data-role="search" />
    <nav class="sidebar-nav" data-role="nav"></nav>
    <div class="sidebar-progress" data-role="progress">
      <span data-role="progress-text">0 / ${manifest.length}</span>
      <div class="sidebar-progress-bar"><div class="sidebar-progress-fill" data-role="progress-fill" style="width:0%"></div></div>
    </div>
  `;

  const nav = sidebar.querySelector('[data-role="nav"]');
  const searchInput = sidebar.querySelector('[data-role="search"]');

  function renderNav(filter = '') {
    const lf = filter.toLowerCase();
    nav.innerHTML = '';
    const done = getDone();
    for (const [cat, items] of Object.entries(groups)) {
      const filtered = items.filter(p => !lf || p.title.toLowerCase().includes(lf));
      if (filtered.length === 0) continue;
      const section = document.createElement('div');
      section.className = 'nav-section';
      section.innerHTML = `<div class="nav-section-title">${cat}</div>`;
      filtered.forEach(p => {
        const a = document.createElement('a');
        a.className = 'nav-item';
        a.dataset.slug = p.slug;
        const isDone = done[p.slug] || done[p.title];
        a.innerHTML = `${isDone ? '<span class="done-dot"></span>' : ''}${esc(p.title)}`;
        a.addEventListener('click', (e) => {
          e.preventDefault();
          onNavigate(p.slug);
          sidebar.classList.remove('open');
        });
        section.appendChild(a);
      });
      nav.appendChild(section);
    }
  }

  searchInput.addEventListener('input', () => renderNav(searchInput.value));

  function setActive(slug) {
    nav.querySelectorAll('.nav-item').forEach(a => {
      a.classList.toggle('active', a.dataset.slug === slug);
    });
  }

  function updateProgress() {
    const done = getDone();
    const count = manifest.filter(p => done[p.slug] || done[p.title]).length;
    const pct = Math.round((count / manifest.length) * 100);
    const text = sidebar.querySelector('[data-role="progress-text"]');
    const fill = sidebar.querySelector('[data-role="progress-fill"]');
    if (text) text.textContent = `${count} / ${manifest.length}`;
    if (fill) fill.style.width = `${pct}%`;
  }

  window.addEventListener('lc100-progress', () => {
    renderNav(searchInput.value);
    updateProgress();
  });

  renderNav();
  updateProgress();

  return { el: sidebar, setActive, renderNav, updateProgress };
}

function getDone() {
  try { return JSON.parse(localStorage.getItem('lc100-done') || '{}'); }
  catch { return {}; }
}

function esc(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
