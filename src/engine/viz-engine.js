import { buildCodePanel, highlightLine } from './code-panel.js';
import { createControls } from './controls.js';

/**
 * createViz(container, config)
 *
 * config: {
 *   title, subtitle,
 *   code, lineMap, steps, phaseLabels,
 *   setup(statePanel),   // build static HTML inside state panel
 *   render(step, statePanel) // update state panel for given step
 * }
 *
 * Returns { destroy() }
 */
export function createViz(container, config) {
  let cur = 0;
  const steps = config.steps;

  // Build shell
  container.innerHTML = '';
  const viz = document.createElement('div');
  viz.className = 'viz';

  // Top bar
  const topBar = document.createElement('div');
  topBar.className = 'top-bar';
  topBar.innerHTML = `
    <button class="hamburger" id="hamburger-btn">\u2630</button>
    <h1>${esc(config.title)}</h1>
    ${config.subtitle ? `<span class="subtitle" style="margin-left:auto">${esc(config.subtitle)}</span>` : ''}
  `;
  viz.appendChild(topBar);

  // Panels
  const panels = document.createElement('div');
  panels.className = 'panels';

  const codePanel = document.createElement('div');
  codePanel.className = 'code-panel';
  const codePre = document.createElement('pre');
  codePre.id = 'code-pre';
  codePanel.appendChild(codePre);
  panels.appendChild(codePanel);

  const statePanel = document.createElement('div');
  statePanel.className = 'state-panel';
  panels.appendChild(statePanel);

  viz.appendChild(panels);

  // Desc bar
  const descBar = document.createElement('div');
  descBar.className = 'desc-bar';
  const descRow = document.createElement('div');
  descRow.className = 'desc-row';
  const phaseBadge = document.createElement('span');
  phaseBadge.className = 'phase-badge';
  phaseBadge.textContent = '\u2014';
  const descText = document.createElement('span');
  descText.className = 'desc-text';
  descText.textContent = '\u2014';
  descRow.appendChild(phaseBadge);
  descRow.appendChild(descText);
  descBar.appendChild(descRow);

  const controls = createControls({
    onStep(delta) {
      cur = Math.max(0, Math.min(steps.length - 1, cur + delta));
      render();
    },
    onTogglePlay: null,
    getStepInfo: () => ({ cur, total: steps.length }),
  });
  descBar.appendChild(controls.el);
  viz.appendChild(descBar);

  container.appendChild(viz);

  // Build code panel
  const totalLines = buildCodePanel(codePre, config.code);

  // Let problem set up its static HTML
  if (config.setup) config.setup(statePanel);

  // Hamburger wiring
  const hamburgerBtn = topBar.querySelector('#hamburger-btn');
  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', () => {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) sidebar.classList.toggle('open');
    });
  }

  function render() {
    const s = steps[cur];

    // Code highlight
    highlightLine(totalLines, config.lineMap, s.lineNum);

    // Phase badge
    phaseBadge.textContent = (config.phaseLabels && config.phaseLabels[s.phase]) || s.phase;
    phaseBadge.className = 'phase-badge phase-' + s.phase;
    descText.textContent = s.description;

    // Controls
    controls.update(cur, steps.length);

    // Problem-specific render
    if (config.render) config.render(s, statePanel);

    // Track completion
    if (cur === steps.length - 1) {
      try {
        const done = JSON.parse(localStorage.getItem('lc100-done') || '{}');
        done[config.slug || config.title] = true;
        localStorage.setItem('lc100-done', JSON.stringify(done));
        // dispatch event so sidebar can update
        window.dispatchEvent(new CustomEvent('lc100-progress'));
      } catch {}
    }
  }

  render();

  return {
    destroy() {
      controls.destroy();
      container.innerHTML = '';
    }
  };
}

function esc(s) {
  return (s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
