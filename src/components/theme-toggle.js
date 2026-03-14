export function initTheme() {
  const stored = localStorage.getItem('lc100-theme');
  if (stored) document.documentElement.setAttribute('data-theme', stored);
}

export function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('lc100-theme', next);
}
