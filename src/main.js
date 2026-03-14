import './styles/base.css';
import './styles/layout.css';
import './styles/controls.css';
import './styles/renderers.css';

import { manifest } from './problems/manifest.js';
import { createRouter } from './router.js';
import { createSidebar } from './components/sidebar.js';
import { initTheme } from './components/theme-toggle.js';
import { createViz } from './engine/viz-engine.js';

initTheme();

const app = document.getElementById('app');

// Sidebar
const sidebar = createSidebar((slug) => {
  router.navigate(slug);
});
app.appendChild(sidebar.el);

// Overlay for mobile
const overlay = document.createElement('div');
overlay.className = 'sidebar-overlay';
overlay.addEventListener('click', () => {
  sidebar.el.classList.remove('open');
});
app.appendChild(overlay);

// Main content
const mainContent = document.createElement('div');
mainContent.className = 'main-content';
mainContent.innerHTML = '<div class="welcome">请从左侧选择题目</div>';
app.appendChild(mainContent);

let currentViz = null;

async function loadProblem(slug) {
  const problem = manifest.find(p => p.slug === slug);
  if (!problem) {
    mainContent.innerHTML = '<div class="welcome">题目未找到</div>';
    return;
  }

  sidebar.setActive(slug);

  // Destroy previous viz
  if (currentViz) {
    currentViz.destroy();
    currentViz = null;
  }

  mainContent.innerHTML = '<div class="welcome">加载中...</div>';

  try {
    const mod = await problem.load();
    const config = mod.default || mod;
    mainContent.innerHTML = '';
    currentViz = createViz(mainContent, { ...config, slug });
  } catch (err) {
    console.error('Failed to load problem:', err);
    mainContent.innerHTML = '<div class="welcome">加载失败</div>';
  }
}

// Router
const router = createRouter((hash) => {
  // hash could be "hash/two-sum" or "/hash/two-sum"
  const slug = hash.replace(/^\//, '');
  loadProblem(slug);
});

// Load first problem if no hash
if (!location.hash) {
  router.navigate(manifest[0].slug);
}
