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
  const steps = [...config.steps];

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

  // Problem description (collapsible)
  if (config.problemDesc) {
    const descSection = document.createElement('div');
    descSection.className = 'problem-desc-section';
    descSection.innerHTML = `
      <button class="problem-desc-toggle" data-role="desc-toggle">
        <span class="problem-desc-arrow">\u25B8</span> 题目描述
      </button>
      <div class="problem-desc-body" style="display:none">${config.problemDesc}</div>
    `;
    viz.appendChild(descSection);
    const descToggle = descSection.querySelector('[data-role="desc-toggle"]');
    const descBody = descSection.querySelector('.problem-desc-body');
    const descArrow = descSection.querySelector('.problem-desc-arrow');
    descToggle.addEventListener('click', () => {
      const open = descBody.style.display !== 'none';
      descBody.style.display = open ? 'none' : '';
      descArrow.textContent = open ? '\u25B8' : '\u25BE';
    });
  }

  // Test case selector
  const testCases = config.testCases || null;
  let activeCase = 0;
  if (testCases && testCases.length > 1) {
    const caseBar = document.createElement('div');
    caseBar.className = 'testcase-bar';
    caseBar.innerHTML = `<span class="testcase-label">测试用例：</span>`;
    const sel = document.createElement('select');
    sel.className = 'testcase-select';
    testCases.forEach((tc, i) => {
      const opt = document.createElement('option');
      opt.value = i;
      opt.textContent = tc.name || `用例 ${i + 1}`;
      sel.appendChild(opt);
    });
    caseBar.appendChild(sel);
    viz.appendChild(caseBar);
    sel.addEventListener('change', () => {
      activeCase = parseInt(sel.value);
      loadTestCase(activeCase);
    });
  }

  // Panels
  const panels = document.createElement('div');
  panels.className = 'panels';

  const codePanel = document.createElement('div');
  codePanel.className = 'code-panel';
  const codePre = document.createElement('pre');
  codePre.id = 'code-pre';
  codePanel.appendChild(codePre);
  panels.appendChild(codePanel);

  // Resizable divider
  const divider = document.createElement('div');
  divider.className = 'panel-divider';
  panels.appendChild(divider);

  let dragging = false;
  divider.addEventListener('mousedown', (e) => {
    e.preventDefault();
    dragging = true;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  });
  document.addEventListener('mousemove', (e) => {
    if (!dragging) return;
    const rect = panels.getBoundingClientRect();
    const newWidth = Math.max(200, Math.min(rect.width - 200, e.clientX - rect.left));
    codePanel.style.width = newWidth + 'px';
  });
  document.addEventListener('mouseup', () => {
    if (!dragging) return;
    dragging = false;
    document.body.style.cursor = '';
    document.body.style.userSelect = '';
  });

  const statePanel = document.createElement('div');
  statePanel.className = 'state-panel';
  panels.appendChild(statePanel);

  viz.appendChild(panels);

  // Desc bar
  const descBar = document.createElement('div');
  descBar.className = 'desc-bar';
  const descRow = document.createElement('div');
  descRow.className = 'desc-row';
  const jumpEl = document.createElement('div');
  jumpEl.className = 'desc-jump';
  jumpEl.style.display = 'none';
  const descMain = document.createElement('div');
  descMain.style.display = 'flex';
  descMain.style.alignItems = 'flex-start';
  descMain.style.gap = '10px';
  const phaseBadge = document.createElement('span');
  phaseBadge.className = 'phase-badge';
  phaseBadge.textContent = '\u2014';
  const descText = document.createElement('span');
  descText.className = 'desc-text';
  descText.textContent = '\u2014';
  descMain.appendChild(phaseBadge);
  descMain.appendChild(descText);
  descRow.appendChild(jumpEl);
  descRow.appendChild(descMain);
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
  let totalLines = buildCodePanel(codePre, config.code);

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

  function loadTestCase(idx) {
    if (!testCases || !testCases[idx]) return;
    const tc = testCases[idx];
    // Swap steps (and optionally code/lineMap if test case overrides them)
    steps.length = 0;
    steps.push(...tc.steps);
    if (tc.code) {
      config.code = tc.code;
      totalLines = buildCodePanel(codePre, tc.code);
    }
    if (tc.lineMap) config.lineMap = tc.lineMap;
    // Update subtitle if test case provides one
    if (tc.subtitle) {
      const subtitleEl = topBar.querySelector('.subtitle');
      if (subtitleEl) subtitleEl.textContent = tc.subtitle;
    }
    cur = 0;
    // Re-setup if test case changes input data
    if (tc.setup) tc.setup(statePanel);
    else if (config.setup) config.setup(statePanel);
    render();
  }

  function render() {
    const s = steps[cur];

    // Code highlight
    highlightLine(totalLines, config.lineMap, s.lineNum);

    // Phase badge
    phaseBadge.textContent = (config.phaseLabels && config.phaseLabels[s.phase]) || s.phase;
    phaseBadge.className = 'phase-badge phase-' + s.phase;

    // Jump explanation (WHY, not just HOW) — shown in separate highlighted block
    let jumpReason = '';
    if (cur > 0) {
      const prev = steps[cur - 1];
      const prevCodeIdx = config.lineMap[prev.lineNum];
      const curCodeIdx = config.lineMap[s.lineNum];
      if (prevCodeIdx !== undefined && curCodeIdx !== undefined && curCodeIdx !== prevCodeIdx + 1) {
        jumpReason = explainJump(config.code, prevCodeIdx, curCodeIdx);
      }
    }
    if (jumpReason) {
      jumpEl.textContent = jumpReason;
      jumpEl.style.display = '';
    } else {
      jumpEl.style.display = 'none';
    }
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

/**
 * Analyze code text to explain WHY execution jumped between lines.
 * Returns a human-readable reason string, or '' if no special explanation needed.
 */
function explainJump(code, fromIdx, toIdx) {
  const getLineText = (idx) => {
    if (idx < 0 || idx >= code.length) return '';
    const line = code[idx];
    return (typeof line === 'string' ? line : line.text || '').trim();
  };

  const fromLine = getLineText(fromIdx);
  const toLine = getLineText(toIdx);
  const diff = toIdx - fromIdx;

  // Backward jump: returning to loop head
  if (diff < 0) {
    if (/^for\b/.test(toLine)) {
      return `\u21A9 for 循环体执行完毕，回到循环头检查是否还有下一轮迭代`;
    }
    if (/^while\b/.test(toLine)) {
      return `\u21A9 while 循环体执行完毕，回到循环条件重新判断`;
    }
    return `\u21A9 跳回第 ${toIdx + 1} 行（当前代码块结束，返回上层控制流）`;
  }

  // Forward jump: skipping lines
  if (diff > 1) {
    // Check what was skipped — look for if/while bodies that were not entered
    for (let i = fromIdx + 1; i < toIdx; i++) {
      const skipped = getLineText(i);
      if (skipped === '') continue; // blank line
      // Previous line was an if-condition and body was skipped
      if (/^if\b/.test(fromLine)) {
        return `\u23ED if 条件不满足，跳过了条件分支内的代码`;
      }
      if (/^while\b/.test(fromLine)) {
        return `\u23ED while 条件不满足，跳过循环体直接往下执行`;
      }
      if (/^elif\b/.test(fromLine)) {
        return `\u23ED elif 条件不满足，继续检查下一个分支`;
      }
      break;
    }
    // if/while inside the skipped range
    for (let i = fromIdx; i < toIdx; i++) {
      const line = getLineText(i);
      if (/^if\b/.test(line) || /\bif\b/.test(line)) {
        return `\u23ED 条件判断后，不满足进入分支的条件，跳到第 ${toIdx + 1} 行继续`;
      }
    }
    return `\u23ED 跳过第 ${fromIdx + 2}\u2013${toIdx} 行（这些代码在当前条件下不需要执行）`;
  }

  return '';
}
