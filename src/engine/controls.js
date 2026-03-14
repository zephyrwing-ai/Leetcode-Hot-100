/**
 * Create control bar with prev/next/play buttons, speed selector, and keyboard shortcuts.
 * Returns { el, update(cur, total), destroy() }
 */
export function createControls({ onStep, onTogglePlay, getStepInfo }) {
  let timer = null;
  let speed = 1;

  const el = document.createElement('div');
  el.className = 'ctrl-row';
  el.innerHTML = `
    <button class="ctrl-btn" data-action="prev">\u2190 \u4e0a\u4e00\u6b65</button>
    <span class="step-counter" data-role="counter">1 / 1</span>
    <button class="ctrl-btn" data-action="next">\u4e0b\u4e00\u6b65 \u2192</button>
    <button class="ctrl-btn" data-action="play">\u25b6 \u81ea\u52a8\u64ad\u653e</button>
    <select class="speed-select" data-role="speed">
      <option value="0.5">0.5x</option>
      <option value="1" selected>1x</option>
      <option value="2">2x</option>
    </select>
    <span class="kbd-hints">
      <span class="kbd">\u2190</span>
      <span class="kbd">\u2192</span>
      <span class="kbd">Space</span>
    </span>
  `;

  const btnPrev = el.querySelector('[data-action="prev"]');
  const btnNext = el.querySelector('[data-action="next"]');
  const btnPlay = el.querySelector('[data-action="play"]');
  const counter = el.querySelector('[data-role="counter"]');
  const speedSel = el.querySelector('[data-role="speed"]');

  btnPrev.addEventListener('click', () => onStep(-1));
  btnNext.addEventListener('click', () => onStep(1));
  btnPlay.addEventListener('click', toggle);
  speedSel.addEventListener('change', () => {
    speed = parseFloat(speedSel.value);
    if (timer) { stopTimer(); startTimer(); }
  });

  function toggle() {
    if (timer) { stopTimer(); } else { startTimer(); }
  }

  function startTimer() {
    btnPlay.textContent = '\u23f8 \u6682\u505c';
    btnPlay.classList.add('playing');
    timer = setInterval(() => {
      const info = getStepInfo();
      if (info.cur >= info.total - 1) { stopTimer(); return; }
      onStep(1);
    }, 1200 / speed);
  }

  function stopTimer() {
    clearInterval(timer);
    timer = null;
    btnPlay.textContent = '\u25b6 \u81ea\u52a8\u64ad\u653e';
    btnPlay.classList.remove('playing');
  }

  function onKeydown(e) {
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); onStep(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); onStep(-1); }
  }
  document.addEventListener('keydown', onKeydown);

  function update(cur, total) {
    counter.textContent = `${cur + 1} / ${total}`;
    btnPrev.disabled = cur === 0;
    btnNext.disabled = cur === total - 1;
  }

  function destroy() {
    stopTimer();
    document.removeEventListener('keydown', onKeydown);
  }

  return { el, update, destroy };
}
