function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

/** Build code panel HTML from CODE array (string[] or {text}[]) */
export function buildCodePanel(pre, codeLines) {
  const lines = codeLines.map(l => typeof l === 'string' ? l : l.text);
  pre.innerHTML = lines.map((line, idx) => {
    const lineNum = idx + 1;
    const escaped = escapeHtml(line);
    return `<div class="code-line" id="cl-${lineNum}"><span class="line-num">${lineNum}</span><span class="line-code">${escaped}</span></div>`;
  }).join('');
  return lines.length;
}

/** Highlight a single line (clear all first) */
export function highlightLine(totalLines, lineMap, lineNum) {
  for (let i = 1; i <= totalLines; i++) {
    const el = document.getElementById(`cl-${i}`);
    if (el) el.classList.remove('active');
  }
  const activeIdx = lineMap[lineNum];
  if (activeIdx !== undefined) {
    const el = document.getElementById(`cl-${activeIdx + 1}`);
    if (el) {
      el.classList.add('active');
      el.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }
}
