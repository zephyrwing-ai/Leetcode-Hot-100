function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

const PY_KEYWORDS = /\b(def|class|for|while|if|elif|else|return|in|not|and|or|True|False|None|import|from|pass|break|continue|try|except|finally|raise|with|as|lambda|yield|is|del|assert|global|nonlocal)\b/g;
const PY_BUILTINS = /\b(len|range|min|max|sum|abs|print|sorted|enumerate|zip|map|filter|list|dict|set|tuple|str|int|float|bool|type|isinstance|append|pop|extend|remove|insert|index|count|reverse|sort|keys|values|items|get|update|add|discard|union|intersection|join|split|strip|replace|find|startswith|endswith|isdigit|isalpha|lower|upper|ord|chr|hex|bin|all|any|reversed|collections|defaultdict|deque|heapq|heappush|heappop|bisect|bisect_left|bisect_right|inf|math)\b/g;
const PY_NUMBERS = /\b(\d+\.?\d*)\b/g;
const PY_STRINGS = /((?:"(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'))/g;
const PY_COMMENTS = /(#.*$)/gm;
const PY_SELF = /\b(self)\b/g;

function highlightPython(escaped) {
  // Order matters: strings/comments first to avoid highlighting inside them
  const tokens = [];
  let result = escaped;

  // Extract strings and comments first, replace with placeholders
  let idx = 0;
  result = result.replace(PY_STRINGS, (m) => {
    tokens.push(`<span class="hl-str">${m}</span>`);
    return `\x00T${idx++}\x00`;
  });
  result = result.replace(PY_COMMENTS, (m) => {
    tokens.push(`<span class="hl-comment">${m}</span>`);
    return `\x00T${idx++}\x00`;
  });

  // Now highlight keywords, builtins, numbers, self
  result = result.replace(PY_KEYWORDS, '<span class="hl-kw">$1</span>');
  result = result.replace(PY_BUILTINS, '<span class="hl-builtin">$1</span>');
  result = result.replace(PY_SELF, '<span class="hl-self">$1</span>');
  result = result.replace(PY_NUMBERS, (m, num, offset) => {
    // Don't highlight numbers inside already-highlighted spans
    const before = result.substring(Math.max(0, offset - 20), offset);
    if (before.includes('hl-')) return m;
    return `<span class="hl-num">${num}</span>`;
  });

  // Restore tokens
  result = result.replace(/\x00T(\d+)\x00/g, (_, i) => tokens[i]);
  return result;
}

/** Build code panel HTML from CODE array (string[] or {text}[]) */
export function buildCodePanel(pre, codeLines) {
  const lines = codeLines.map(l => typeof l === 'string' ? l : l.text);
  pre.innerHTML = lines.map((line, idx) => {
    const lineNum = idx + 1;
    const escaped = escapeHtml(line);
    const highlighted = highlightPython(escaped);
    return `<div class="code-line" id="cl-${lineNum}"><span class="line-num">${lineNum}</span><span class="line-code">${highlighted}</span></div>`;
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
