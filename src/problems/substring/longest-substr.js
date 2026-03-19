let S = 'abcabcbb';

const code = [
  { text: 'class Solution:' },
  { text: '    def lengthOfLongestSubstring(self, s):' },
  { text: '        char_map = {}' },
  { text: '        left = 0' },
  { text: '        max_len = 0' },
  { text: '' },
  { text: '        for right in range(len(s)):' },
  { text: '            if s[right] in char_map:' },
  { text: '                left = max(left, char_map[s[right]] + 1)' },
  { text: '            char_map[s[right]] = right' },
  { text: '            max_len = max(max_len, right - left + 1)' },
  { text: '        return max_len' },
];

const lineMap = { 3: 2, 4: 3, 5: 4, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 12: 11 };

// ── Test Case 1: s = "abcabcbb" ──
const steps1 = [
  {"lineNum":3,"phase":"init","description":"初始化空哈希表 char_map = {}","charMap":{},"left":0,"right":-1,"maxLen":0,"currentChar":null,"duplicate":false,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":4,"phase":"init","description":"初始化 left = 0","charMap":{},"left":0,"right":-1,"maxLen":0,"currentChar":null,"duplicate":false,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":5,"phase":"init","description":"初始化 max_len = 0","charMap":{},"left":0,"right":-1,"maxLen":0,"currentChar":null,"duplicate":false,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":7,"phase":"expand","description":"right = 0，当前字符 s[0] = 'a'","charMap":{},"left":0,"right":0,"maxLen":0,"currentChar":"a","duplicate":false,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":8,"phase":"check","description":"'a' 不在 char_map 中，无需收缩","charMap":{},"left":0,"right":0,"maxLen":0,"currentChar":"a","duplicate":false,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":10,"phase":"expand","description":"char_map['a'] = 0","charMap":{"a":0},"left":0,"right":0,"maxLen":0,"currentChar":"a","duplicate":false,"justUpdated":"a","s":"abcabcbb"},
  {"lineNum":11,"phase":"record","description":"窗口长度 = 0 - 0 + 1 = 1，max_len = max(0, 1) = 1","charMap":{"a":0},"left":0,"right":0,"maxLen":1,"currentChar":"a","duplicate":false,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":7,"phase":"expand","description":"right = 1，当前字符 s[1] = 'b'","charMap":{"a":0},"left":0,"right":1,"maxLen":1,"currentChar":"b","duplicate":false,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":8,"phase":"check","description":"'b' 不在 char_map 中，无需收缩","charMap":{"a":0},"left":0,"right":1,"maxLen":1,"currentChar":"b","duplicate":false,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":10,"phase":"expand","description":"char_map['b'] = 1","charMap":{"a":0,"b":1},"left":0,"right":1,"maxLen":1,"currentChar":"b","duplicate":false,"justUpdated":"b","s":"abcabcbb"},
  {"lineNum":11,"phase":"record","description":"窗口长度 = 1 - 0 + 1 = 2，max_len = max(1, 2) = 2","charMap":{"a":0,"b":1},"left":0,"right":1,"maxLen":2,"currentChar":"b","duplicate":false,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":7,"phase":"expand","description":"right = 2，当前字符 s[2] = 'c'","charMap":{"a":0,"b":1},"left":0,"right":2,"maxLen":2,"currentChar":"c","duplicate":false,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":8,"phase":"check","description":"'c' 不在 char_map 中，无需收缩","charMap":{"a":0,"b":1},"left":0,"right":2,"maxLen":2,"currentChar":"c","duplicate":false,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":10,"phase":"expand","description":"char_map['c'] = 2","charMap":{"a":0,"b":1,"c":2},"left":0,"right":2,"maxLen":2,"currentChar":"c","duplicate":false,"justUpdated":"c","s":"abcabcbb"},
  {"lineNum":11,"phase":"record","description":"窗口长度 = 2 - 0 + 1 = 3，max_len = max(2, 3) = 3","charMap":{"a":0,"b":1,"c":2},"left":0,"right":2,"maxLen":3,"currentChar":"c","duplicate":false,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":7,"phase":"expand","description":"right = 3，当前字符 s[3] = 'a'","charMap":{"a":0,"b":1,"c":2},"left":0,"right":3,"maxLen":3,"currentChar":"a","duplicate":false,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":8,"phase":"check","description":"'a' 在 char_map 中! char_map['a'] = 0","charMap":{"a":0,"b":1,"c":2},"left":0,"right":3,"maxLen":3,"currentChar":"a","duplicate":true,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":9,"phase":"shrink","description":"left = max(0, 0 + 1) = 1，窗口左端收缩到索引 1","charMap":{"a":0,"b":1,"c":2},"left":1,"right":3,"maxLen":3,"currentChar":"a","duplicate":true,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":10,"phase":"expand","description":"更新 char_map['a'] = 3","charMap":{"a":3,"b":1,"c":2},"left":1,"right":3,"maxLen":3,"currentChar":"a","duplicate":false,"justUpdated":"a","s":"abcabcbb"},
  {"lineNum":11,"phase":"record","description":"窗口长度 = 3 - 1 + 1 = 3，max_len = max(3, 3) = 3","charMap":{"a":3,"b":1,"c":2},"left":1,"right":3,"maxLen":3,"currentChar":"a","duplicate":false,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":7,"phase":"expand","description":"right = 4，当前字符 s[4] = 'b'","charMap":{"a":3,"b":1,"c":2},"left":1,"right":4,"maxLen":3,"currentChar":"b","duplicate":false,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":8,"phase":"check","description":"'b' 在 char_map 中! char_map['b'] = 1","charMap":{"a":3,"b":1,"c":2},"left":1,"right":4,"maxLen":3,"currentChar":"b","duplicate":true,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":9,"phase":"shrink","description":"left = max(1, 1 + 1) = 2，窗口左端收缩到索引 2","charMap":{"a":3,"b":1,"c":2},"left":2,"right":4,"maxLen":3,"currentChar":"b","duplicate":true,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":10,"phase":"expand","description":"更新 char_map['b'] = 4","charMap":{"a":3,"b":4,"c":2},"left":2,"right":4,"maxLen":3,"currentChar":"b","duplicate":false,"justUpdated":"b","s":"abcabcbb"},
  {"lineNum":11,"phase":"record","description":"窗口长度 = 4 - 2 + 1 = 3，max_len = max(3, 3) = 3","charMap":{"a":3,"b":4,"c":2},"left":2,"right":4,"maxLen":3,"currentChar":"b","duplicate":false,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":7,"phase":"expand","description":"right = 5，当前字符 s[5] = 'c'","charMap":{"a":3,"b":4,"c":2},"left":2,"right":5,"maxLen":3,"currentChar":"c","duplicate":false,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":8,"phase":"check","description":"'c' 在 char_map 中! char_map['c'] = 2","charMap":{"a":3,"b":4,"c":2},"left":2,"right":5,"maxLen":3,"currentChar":"c","duplicate":true,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":9,"phase":"shrink","description":"left = max(2, 2 + 1) = 3，窗口左端收缩到索引 3","charMap":{"a":3,"b":4,"c":2},"left":3,"right":5,"maxLen":3,"currentChar":"c","duplicate":true,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":10,"phase":"expand","description":"更新 char_map['c'] = 5","charMap":{"a":3,"b":4,"c":5},"left":3,"right":5,"maxLen":3,"currentChar":"c","duplicate":false,"justUpdated":"c","s":"abcabcbb"},
  {"lineNum":11,"phase":"record","description":"窗口长度 = 5 - 3 + 1 = 3，max_len = max(3, 3) = 3","charMap":{"a":3,"b":4,"c":5},"left":3,"right":5,"maxLen":3,"currentChar":"c","duplicate":false,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":7,"phase":"expand","description":"right = 6，当前字符 s[6] = 'b'","charMap":{"a":3,"b":4,"c":5},"left":3,"right":6,"maxLen":3,"currentChar":"b","duplicate":false,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":8,"phase":"check","description":"'b' 在 char_map 中! char_map['b'] = 4","charMap":{"a":3,"b":4,"c":5},"left":3,"right":6,"maxLen":3,"currentChar":"b","duplicate":true,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":9,"phase":"shrink","description":"left = max(3, 4 + 1) = 5，窗口左端收缩到索引 5","charMap":{"a":3,"b":4,"c":5},"left":5,"right":6,"maxLen":3,"currentChar":"b","duplicate":true,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":10,"phase":"expand","description":"更新 char_map['b'] = 6","charMap":{"a":3,"b":6,"c":5},"left":5,"right":6,"maxLen":3,"currentChar":"b","duplicate":false,"justUpdated":"b","s":"abcabcbb"},
  {"lineNum":11,"phase":"record","description":"窗口长度 = 6 - 5 + 1 = 2，max_len = max(3, 2) = 3","charMap":{"a":3,"b":6,"c":5},"left":5,"right":6,"maxLen":3,"currentChar":"b","duplicate":false,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":7,"phase":"expand","description":"right = 7，当前字符 s[7] = 'b'","charMap":{"a":3,"b":6,"c":5},"left":5,"right":7,"maxLen":3,"currentChar":"b","duplicate":false,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":8,"phase":"check","description":"'b' 在 char_map 中! char_map['b'] = 6","charMap":{"a":3,"b":6,"c":5},"left":5,"right":7,"maxLen":3,"currentChar":"b","duplicate":true,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":9,"phase":"shrink","description":"left = max(5, 6 + 1) = 7，窗口左端收缩到索引 7","charMap":{"a":3,"b":6,"c":5},"left":7,"right":7,"maxLen":3,"currentChar":"b","duplicate":true,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":10,"phase":"expand","description":"更新 char_map['b'] = 7","charMap":{"a":3,"b":7,"c":5},"left":7,"right":7,"maxLen":3,"currentChar":"b","duplicate":false,"justUpdated":"b","s":"abcabcbb"},
  {"lineNum":11,"phase":"record","description":"窗口长度 = 7 - 7 + 1 = 1，max_len = max(3, 1) = 3","charMap":{"a":3,"b":7,"c":5},"left":7,"right":7,"maxLen":3,"currentChar":"b","duplicate":false,"justUpdated":null,"s":"abcabcbb"},
  {"lineNum":12,"phase":"done","description":"遍历结束，返回 max_len = 3（最长无重复子串为 \"abc\"）","charMap":{"a":3,"b":7,"c":5},"left":7,"right":7,"maxLen":3,"currentChar":null,"duplicate":false,"justUpdated":null,"s":"abcabcbb"},
];

// ── Test Case 2: s = "pwwkew" ──
const steps2 = [
  {"lineNum":3,"phase":"init","description":"初始化空哈希表 char_map = {}","charMap":{},"left":0,"right":-1,"maxLen":0,"currentChar":null,"duplicate":false,"justUpdated":null,"s":"pwwkew"},
  {"lineNum":5,"phase":"init","description":"初始化 left = 0, max_len = 0","charMap":{},"left":0,"right":-1,"maxLen":0,"currentChar":null,"duplicate":false,"justUpdated":null,"s":"pwwkew"},
  {"lineNum":7,"phase":"expand","description":"right = 0，当前字符 s[0] = 'p'","charMap":{},"left":0,"right":0,"maxLen":0,"currentChar":"p","duplicate":false,"justUpdated":null,"s":"pwwkew"},
  {"lineNum":8,"phase":"check","description":"'p' 不在 char_map 中，无需收缩","charMap":{},"left":0,"right":0,"maxLen":0,"currentChar":"p","duplicate":false,"justUpdated":null,"s":"pwwkew"},
  {"lineNum":10,"phase":"expand","description":"char_map['p'] = 0","charMap":{"p":0},"left":0,"right":0,"maxLen":0,"currentChar":"p","duplicate":false,"justUpdated":"p","s":"pwwkew"},
  {"lineNum":11,"phase":"record","description":"窗口长度 = 0 - 0 + 1 = 1，max_len = max(0, 1) = 1","charMap":{"p":0},"left":0,"right":0,"maxLen":1,"currentChar":"p","duplicate":false,"justUpdated":null,"s":"pwwkew"},
  {"lineNum":7,"phase":"expand","description":"right = 1，当前字符 s[1] = 'w'","charMap":{"p":0},"left":0,"right":1,"maxLen":1,"currentChar":"w","duplicate":false,"justUpdated":null,"s":"pwwkew"},
  {"lineNum":8,"phase":"check","description":"'w' 不在 char_map 中，无需收缩","charMap":{"p":0},"left":0,"right":1,"maxLen":1,"currentChar":"w","duplicate":false,"justUpdated":null,"s":"pwwkew"},
  {"lineNum":10,"phase":"expand","description":"char_map['w'] = 1","charMap":{"p":0,"w":1},"left":0,"right":1,"maxLen":1,"currentChar":"w","duplicate":false,"justUpdated":"w","s":"pwwkew"},
  {"lineNum":11,"phase":"record","description":"窗口长度 = 1 - 0 + 1 = 2，max_len = max(1, 2) = 2","charMap":{"p":0,"w":1},"left":0,"right":1,"maxLen":2,"currentChar":"w","duplicate":false,"justUpdated":null,"s":"pwwkew"},
  {"lineNum":7,"phase":"expand","description":"right = 2，当前字符 s[2] = 'w'","charMap":{"p":0,"w":1},"left":0,"right":2,"maxLen":2,"currentChar":"w","duplicate":false,"justUpdated":null,"s":"pwwkew"},
  {"lineNum":8,"phase":"check","description":"'w' 在 char_map 中! char_map['w'] = 1","charMap":{"p":0,"w":1},"left":0,"right":2,"maxLen":2,"currentChar":"w","duplicate":true,"justUpdated":null,"s":"pwwkew"},
  {"lineNum":9,"phase":"shrink","description":"left = max(0, 1 + 1) = 2，窗口左端收缩到索引 2","charMap":{"p":0,"w":1},"left":2,"right":2,"maxLen":2,"currentChar":"w","duplicate":true,"justUpdated":null,"s":"pwwkew"},
  {"lineNum":10,"phase":"expand","description":"更新 char_map['w'] = 2","charMap":{"p":0,"w":2},"left":2,"right":2,"maxLen":2,"currentChar":"w","duplicate":false,"justUpdated":"w","s":"pwwkew"},
  {"lineNum":11,"phase":"record","description":"窗口长度 = 2 - 2 + 1 = 1，max_len = max(2, 1) = 2","charMap":{"p":0,"w":2},"left":2,"right":2,"maxLen":2,"currentChar":"w","duplicate":false,"justUpdated":null,"s":"pwwkew"},
  {"lineNum":7,"phase":"expand","description":"right = 3，当前字符 s[3] = 'k'","charMap":{"p":0,"w":2},"left":2,"right":3,"maxLen":2,"currentChar":"k","duplicate":false,"justUpdated":null,"s":"pwwkew"},
  {"lineNum":8,"phase":"check","description":"'k' 不在 char_map 中，无需收缩","charMap":{"p":0,"w":2},"left":2,"right":3,"maxLen":2,"currentChar":"k","duplicate":false,"justUpdated":null,"s":"pwwkew"},
  {"lineNum":10,"phase":"expand","description":"char_map['k'] = 3","charMap":{"p":0,"w":2,"k":3},"left":2,"right":3,"maxLen":2,"currentChar":"k","duplicate":false,"justUpdated":"k","s":"pwwkew"},
  {"lineNum":11,"phase":"record","description":"窗口长度 = 3 - 2 + 1 = 2，max_len = max(2, 2) = 2","charMap":{"p":0,"w":2,"k":3},"left":2,"right":3,"maxLen":2,"currentChar":"k","duplicate":false,"justUpdated":null,"s":"pwwkew"},
  {"lineNum":7,"phase":"expand","description":"right = 4，当前字符 s[4] = 'e'","charMap":{"p":0,"w":2,"k":3},"left":2,"right":4,"maxLen":2,"currentChar":"e","duplicate":false,"justUpdated":null,"s":"pwwkew"},
  {"lineNum":8,"phase":"check","description":"'e' 不在 char_map 中，无需收缩","charMap":{"p":0,"w":2,"k":3},"left":2,"right":4,"maxLen":2,"currentChar":"e","duplicate":false,"justUpdated":null,"s":"pwwkew"},
  {"lineNum":10,"phase":"expand","description":"char_map['e'] = 4","charMap":{"p":0,"w":2,"k":3,"e":4},"left":2,"right":4,"maxLen":2,"currentChar":"e","duplicate":false,"justUpdated":"e","s":"pwwkew"},
  {"lineNum":11,"phase":"record","description":"窗口长度 = 4 - 2 + 1 = 3，max_len = max(2, 3) = 3","charMap":{"p":0,"w":2,"k":3,"e":4},"left":2,"right":4,"maxLen":3,"currentChar":"e","duplicate":false,"justUpdated":null,"s":"pwwkew"},
  {"lineNum":7,"phase":"expand","description":"right = 5，当前字符 s[5] = 'w'","charMap":{"p":0,"w":2,"k":3,"e":4},"left":2,"right":5,"maxLen":3,"currentChar":"w","duplicate":false,"justUpdated":null,"s":"pwwkew"},
  {"lineNum":8,"phase":"check","description":"'w' 在 char_map 中! char_map['w'] = 2","charMap":{"p":0,"w":2,"k":3,"e":4},"left":2,"right":5,"maxLen":3,"currentChar":"w","duplicate":true,"justUpdated":null,"s":"pwwkew"},
  {"lineNum":9,"phase":"shrink","description":"left = max(2, 2 + 1) = 3，窗口左端收缩到索引 3","charMap":{"p":0,"w":2,"k":3,"e":4},"left":3,"right":5,"maxLen":3,"currentChar":"w","duplicate":true,"justUpdated":null,"s":"pwwkew"},
  {"lineNum":10,"phase":"expand","description":"更新 char_map['w'] = 5","charMap":{"p":0,"w":5,"k":3,"e":4},"left":3,"right":5,"maxLen":3,"currentChar":"w","duplicate":false,"justUpdated":"w","s":"pwwkew"},
  {"lineNum":11,"phase":"record","description":"窗口长度 = 5 - 3 + 1 = 3，max_len = max(3, 3) = 3","charMap":{"p":0,"w":5,"k":3,"e":4},"left":3,"right":5,"maxLen":3,"currentChar":"w","duplicate":false,"justUpdated":null,"s":"pwwkew"},
  {"lineNum":12,"phase":"done","description":"遍历结束，返回 max_len = 3（最长无重复子串为 \"wke\" 或 \"kew\"）","charMap":{"p":0,"w":5,"k":3,"e":4},"left":3,"right":5,"maxLen":3,"currentChar":null,"duplicate":false,"justUpdated":null,"s":"pwwkew"},
];

const phaseLabels = { init: '初始化', expand: '扩展', check: '检查', shrink: '收缩', record: '记录', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">字符串 s（蓝色 = 当前窗口 [left, right]，绿色 = 当前字符）</div>
      <div class="array-row" id="s-array"></div>
    </div>
    <div class="card">
      <div class="section-title">char_map 哈希表（key: 字符 → value: 最后出现位置）</div>
      <div class="chip-row" id="hm-chips" style="display:flex;gap:8px;flex-wrap:wrap"></div>
      <div class="legend-row" style="margin-top:6px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>刚更新</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(248,113,113,0.4);border:1px solid #f87171"></div>重复字符</div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">当前最大长度 max_len</div>
      <div style="display:flex;align-items:baseline;gap:12px">
        <div id="max-len-num" style="font-size:40px;font-weight:800;font-family:var(--font-mono);line-height:1;color:var(--text-muted)">0</div>
        <div id="window-info" style="font-size:13px;color:var(--text-muted);font-family:var(--font-mono)"></div>
      </div>
    </div>
  `;
}

export default {
  title: '3. Longest Substring Without Repeating Characters',
  problemDesc: `
    <p>给定一个字符串 <code>s</code>，请你找出其中不含有重复字符的最长子串的长度。</p>
    <div class="example">输入：s = "abcabcbb"
输出：3
解释：无重复字符的最长子串是 "abc"，长度为 3。</div>
    <p><strong>提示：</strong><code>s</code> 由英文字母、数字、符号和空格组成。</p>
  `,
  subtitle: `s = "${S}"`,
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 's = "abcabcbb"', steps: steps1, subtitle: 's = "abcabcbb"' },
    {
      name: 's = "pwwkew"', steps: steps2, subtitle: 's = "pwwkew"',
      setup(panel) { S = 'pwwkew'; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    const str = s.s || S;
    // s array
    const chars = str.split('');
    document.getElementById('s-array').innerHTML = chars.map((ch, idx) => {
      let cls = 'arr-cell';
      if (s.right >= 0 && idx >= s.left && idx <= s.right) cls += ' in-window';
      if (idx === s.right && s.currentChar) cls += ' is-active';
      return `<div class="${cls}">
        <div class="arr-val">${ch}</div>
        <div class="arr-idx">[${idx}]</div>
      </div>`;
    }).join('');

    // hashmap chips
    const hmEl = document.getElementById('hm-chips');
    const entries = Object.entries(s.charMap);
    if (entries.length === 0) {
      hmEl.innerHTML = '<div class="hashmap-empty">（哈希表为空）</div>';
    } else {
      hmEl.innerHTML = entries.map(([k, v]) => {
        let cls = 'hm-chip';
        if (s.justUpdated === k) cls += ' just-added';
        if (s.duplicate && s.currentChar === k) cls += ' diff-hit';
        return `<div class="${cls}">
          <span class="hm-chip-key">${k}</span>
          <span class="hm-chip-val">${v}</span>
        </div>`;
      }).join('');
    }

    // max len
    const maxEl = document.getElementById('max-len-num');
    maxEl.textContent = s.maxLen;
    maxEl.style.color = s.maxLen > 0 ? '#4ade80' : 'var(--text-muted)';
    if (s.maxLen > 0) maxEl.style.textShadow = '0 0 12px rgba(74,222,128,0.35)';
    else maxEl.style.textShadow = 'none';

    const infoEl = document.getElementById('window-info');
    if (s.right >= 0) {
      infoEl.textContent = `窗口 [${s.left}, ${s.right}]，长度 = ${s.right - s.left + 1}`;
    } else {
      infoEl.textContent = '\u2014';
    }
  },
};
