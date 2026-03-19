let S_STR = 'cbaebabacd';
let P_STR = 'abc';

const code = [
  { text: 'class Solution:' },
  { text: '    def findAnagrams(self, s, p):' },
  { text: '        if len(p) > len(s): return []' },
  { text: '        p_count = {}' },
  { text: '        s_count = {}' },
  { text: '        for c in p:' },
  { text: '            p_count[c] = p_count.get(c, 0) + 1' },
  { text: '' },
  { text: '        for i in range(len(p)):' },
  { text: '            s_count[s[i]] = s_count.get(s[i], 0) + 1' },
  { text: '' },
  { text: '        res = []' },
  { text: '        if s_count == p_count: res.append(0)' },
  { text: '' },
  { text: '        for i in range(len(p), len(s)):' },
  { text: '            s_count[s[i]] = s_count.get(s[i], 0) + 1' },
  { text: '            s_count[s[i-len(p)]] -= 1' },
  { text: '            if s_count[s[i-len(p)]] == 0:' },
  { text: '                del s_count[s[i-len(p)]]' },
  { text: '            if s_count == p_count:' },
  { text: '                res.append(i - len(p) + 1)' },
  { text: '        return res' },
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 9: 8, 10: 9, 12: 11, 13: 12, 15: 14, 16: 15, 17: 16, 19: 18, 20: 19, 21: 20, 22: 21 };

const steps1 = [
  {"lineNum":4,"phase":"init","description":"初始化 p_count = {}, s_count = {}","s":"cbaebabacd","p":"abc","pCount":{},"sCount":{},"left":0,"right":-1,"result":[],"currentIdx":-1,"isMatch":false,"removedChar":null,"addedChar":null},
  {"lineNum":7,"phase":"init","description":"统计 p=\"abc\" 的字符频率: p_count = {a:1, b:1, c:1}","s":"cbaebabacd","p":"abc","pCount":{"a":1,"b":1,"c":1},"sCount":{},"left":0,"right":-1,"result":[],"currentIdx":-1,"isMatch":false,"removedChar":null,"addedChar":null},
  {"lineNum":10,"phase":"init","description":"统计初始窗口 s[0..2]=\"cba\" 的频率: s_count = {c:1, b:1, a:1}","s":"cbaebabacd","p":"abc","pCount":{"a":1,"b":1,"c":1},"sCount":{"c":1,"b":1,"a":1},"left":0,"right":2,"result":[],"currentIdx":-1,"isMatch":false,"removedChar":null,"addedChar":null},
  {"lineNum":13,"phase":"record","description":"s_count == p_count，找到异位词! 记录起始索引 0","s":"cbaebabacd","p":"abc","pCount":{"a":1,"b":1,"c":1},"sCount":{"c":1,"b":1,"a":1},"left":0,"right":2,"result":[0],"currentIdx":0,"isMatch":true,"removedChar":null,"addedChar":null},
  {"lineNum":15,"phase":"expand","description":"i=3，窗口右移: 加入 s[3]='e'","s":"cbaebabacd","p":"abc","pCount":{"a":1,"b":1,"c":1},"sCount":{"c":1,"b":1,"a":1},"left":0,"right":2,"result":[0],"currentIdx":3,"isMatch":false,"removedChar":null,"addedChar":"e"},
  {"lineNum":17,"phase":"shrink","description":"加入 'e'，移除 s[0]='c'","s":"cbaebabacd","p":"abc","pCount":{"a":1,"b":1,"c":1},"sCount":{"b":1,"a":1,"e":1},"left":1,"right":3,"result":[0],"currentIdx":3,"isMatch":false,"removedChar":"c","addedChar":null},
  {"lineNum":20,"phase":"check","description":"s_count != p_count（多了 'e'），不是异位词","s":"cbaebabacd","p":"abc","pCount":{"a":1,"b":1,"c":1},"sCount":{"b":1,"a":1,"e":1},"left":1,"right":3,"result":[0],"currentIdx":3,"isMatch":false,"removedChar":null,"addedChar":null},
  {"lineNum":16,"phase":"expand","description":"i=4，加入 s[4]='b', 移除 s[1]='b'","s":"cbaebabacd","p":"abc","pCount":{"a":1,"b":1,"c":1},"sCount":{"b":1,"a":1,"e":1},"left":2,"right":4,"result":[0],"currentIdx":4,"isMatch":false,"removedChar":"b","addedChar":"b"},
  {"lineNum":20,"phase":"check","description":"s_count != p_count（多了 'e'），不是异位词","s":"cbaebabacd","p":"abc","pCount":{"a":1,"b":1,"c":1},"sCount":{"b":1,"a":1,"e":1},"left":2,"right":4,"result":[0],"currentIdx":4,"isMatch":false,"removedChar":null,"addedChar":null},
  {"lineNum":16,"phase":"expand","description":"i=5，加入 s[5]='a', 移除 s[2]='a'","s":"cbaebabacd","p":"abc","pCount":{"a":1,"b":1,"c":1},"sCount":{"b":1,"a":1,"e":1},"left":3,"right":5,"result":[0],"currentIdx":5,"isMatch":false,"removedChar":"a","addedChar":"a"},
  {"lineNum":20,"phase":"check","description":"s_count != p_count（多了 'e'），不是异位词","s":"cbaebabacd","p":"abc","pCount":{"a":1,"b":1,"c":1},"sCount":{"b":1,"a":1,"e":1},"left":3,"right":5,"result":[0],"currentIdx":5,"isMatch":false,"removedChar":null,"addedChar":null},
  {"lineNum":16,"phase":"expand","description":"i=6，加入 s[6]='b', 移除 s[3]='e'","s":"cbaebabacd","p":"abc","pCount":{"a":1,"b":1,"c":1},"sCount":{"b":2,"a":1},"left":4,"right":6,"result":[0],"currentIdx":6,"isMatch":false,"removedChar":"e","addedChar":"b"},
  {"lineNum":20,"phase":"check","description":"s_count != p_count（b:2 != b:1），不是异位词","s":"cbaebabacd","p":"abc","pCount":{"a":1,"b":1,"c":1},"sCount":{"b":2,"a":1},"left":4,"right":6,"result":[0],"currentIdx":6,"isMatch":false,"removedChar":null,"addedChar":null},
  {"lineNum":16,"phase":"expand","description":"i=7，加入 s[7]='a', 移除 s[4]='b'","s":"cbaebabacd","p":"abc","pCount":{"a":1,"b":1,"c":1},"sCount":{"b":1,"a":2},"left":5,"right":7,"result":[0],"currentIdx":7,"isMatch":false,"removedChar":"b","addedChar":"a"},
  {"lineNum":20,"phase":"check","description":"s_count != p_count（a:2 != a:1），不是异位词","s":"cbaebabacd","p":"abc","pCount":{"a":1,"b":1,"c":1},"sCount":{"b":1,"a":2},"left":5,"right":7,"result":[0],"currentIdx":7,"isMatch":false,"removedChar":null,"addedChar":null},
  {"lineNum":16,"phase":"expand","description":"i=8，加入 s[8]='c', 移除 s[5]='a'","s":"cbaebabacd","p":"abc","pCount":{"a":1,"b":1,"c":1},"sCount":{"b":1,"a":1,"c":1},"left":6,"right":8,"result":[0],"currentIdx":8,"isMatch":false,"removedChar":"a","addedChar":"c"},
  {"lineNum":20,"phase":"record","description":"s_count == p_count，找到异位词! 记录起始索引 6","s":"cbaebabacd","p":"abc","pCount":{"a":1,"b":1,"c":1},"sCount":{"b":1,"a":1,"c":1},"left":6,"right":8,"result":[0,6],"currentIdx":6,"isMatch":true,"removedChar":null,"addedChar":null},
  {"lineNum":16,"phase":"expand","description":"i=9，加入 s[9]='d', 移除 s[6]='b'","s":"cbaebabacd","p":"abc","pCount":{"a":1,"b":1,"c":1},"sCount":{"a":1,"c":1,"d":1},"left":7,"right":9,"result":[0,6],"currentIdx":9,"isMatch":false,"removedChar":"b","addedChar":"d"},
  {"lineNum":20,"phase":"check","description":"s_count != p_count（多了 'd'），不是异位词","s":"cbaebabacd","p":"abc","pCount":{"a":1,"b":1,"c":1},"sCount":{"a":1,"c":1,"d":1},"left":7,"right":9,"result":[0,6],"currentIdx":9,"isMatch":false,"removedChar":null,"addedChar":null},
  {"lineNum":22,"phase":"done","description":"遍历结束，返回 res = [0, 6]","s":"cbaebabacd","p":"abc","pCount":{"a":1,"b":1,"c":1},"sCount":{"a":1,"c":1,"d":1},"left":7,"right":9,"result":[0,6],"currentIdx":-1,"isMatch":false,"removedChar":null,"addedChar":null}
];

// 2nd test case: s="abab", p="ab"
const steps2 = [
  {"lineNum":4,"phase":"init","description":"初始化 p_count = {}, s_count = {}","s":"abab","p":"ab","pCount":{},"sCount":{},"left":0,"right":-1,"result":[],"currentIdx":-1,"isMatch":false,"removedChar":null,"addedChar":null},
  {"lineNum":7,"phase":"init","description":"统计 p=\"ab\" 的字符频率: p_count = {a:1, b:1}","s":"abab","p":"ab","pCount":{"a":1,"b":1},"sCount":{},"left":0,"right":-1,"result":[],"currentIdx":-1,"isMatch":false,"removedChar":null,"addedChar":null},
  {"lineNum":10,"phase":"init","description":"统计初始窗口 s[0..1]=\"ab\" 的频率: s_count = {a:1, b:1}","s":"abab","p":"ab","pCount":{"a":1,"b":1},"sCount":{"a":1,"b":1},"left":0,"right":1,"result":[],"currentIdx":-1,"isMatch":false,"removedChar":null,"addedChar":null},
  {"lineNum":13,"phase":"record","description":"s_count == p_count，找到异位词! 记录起始索引 0","s":"abab","p":"ab","pCount":{"a":1,"b":1},"sCount":{"a":1,"b":1},"left":0,"right":1,"result":[0],"currentIdx":0,"isMatch":true,"removedChar":null,"addedChar":null},
  {"lineNum":16,"phase":"expand","description":"i=2，加入 s[2]='a', 移除 s[0]='a'","s":"abab","p":"ab","pCount":{"a":1,"b":1},"sCount":{"a":1,"b":1},"left":1,"right":2,"result":[0],"currentIdx":2,"isMatch":false,"removedChar":"a","addedChar":"a"},
  {"lineNum":20,"phase":"record","description":"s_count == p_count，找到异位词! 记录起始索引 1","s":"abab","p":"ab","pCount":{"a":1,"b":1},"sCount":{"a":1,"b":1},"left":1,"right":2,"result":[0,1],"currentIdx":1,"isMatch":true,"removedChar":null,"addedChar":null},
  {"lineNum":16,"phase":"expand","description":"i=3，加入 s[3]='b', 移除 s[1]='b'","s":"abab","p":"ab","pCount":{"a":1,"b":1},"sCount":{"a":1,"b":1},"left":2,"right":3,"result":[0,1],"currentIdx":3,"isMatch":false,"removedChar":"b","addedChar":"b"},
  {"lineNum":20,"phase":"record","description":"s_count == p_count，找到异位词! 记录起始索引 2","s":"abab","p":"ab","pCount":{"a":1,"b":1},"sCount":{"a":1,"b":1},"left":2,"right":3,"result":[0,1,2],"currentIdx":2,"isMatch":true,"removedChar":null,"addedChar":null},
  {"lineNum":22,"phase":"done","description":"遍历结束，返回 res = [0, 1, 2]","s":"abab","p":"ab","pCount":{"a":1,"b":1},"sCount":{"a":1,"b":1},"left":2,"right":3,"result":[0,1,2],"currentIdx":-1,"isMatch":false,"removedChar":null,"addedChar":null}
];

const phaseLabels = { init: '初始化', expand: '扩展', shrink: '收缩', check: '检查', record: '记录', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">字符串 s（蓝色 = 当前窗口，绿色 = 刚加入，红色 = 刚移除）</div>
      <div class="array-row" id="s-array"></div>
    </div>
    <div class="card">
      <div class="section-title">频率对比（左: s_count 窗口频率 · 右: p_count 目标频率）</div>
      <div style="display:flex;gap:24px;flex-wrap:wrap">
        <div>
          <div style="font-size:12px;color:var(--text-muted);margin-bottom:4px;font-family:var(--font-mono)">s_count</div>
          <div class="chip-row" id="s-count-chips" style="display:flex;gap:8px;flex-wrap:wrap"></div>
        </div>
        <div>
          <div style="font-size:12px;color:var(--text-muted);margin-bottom:4px;font-family:var(--font-mono)">p_count</div>
          <div class="chip-row" id="p-count-chips" style="display:flex;gap:8px;flex-wrap:wrap"></div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">结果 res（找到的异位词起始索引）</div>
      <div id="result-area" style="display:flex;gap:8px;flex-wrap:wrap;min-height:32px"></div>
    </div>
  `;
}

export default {
  title: '438. Find All Anagrams in a String',
  problemDesc: `
    <p>给定两个字符串 <code>s</code> 和 <code>p</code>，找到 <code>s</code> 中所有 <code>p</code> 的异位词的子串，返回这些子串的起始索引。</p>
    <div class="example">输入：s = "cbaebabacd", p = "abc"
输出：[0,6]
解释：起始索引 0 的子串是 "cba"，起始索引 6 的子串是 "bac"，都是 "abc" 的异位词。</div>
    <p><strong>提示：</strong>异位词指由相同字母重排列形成的字符串（包括相同的字符串）。</p>
  `,
  subtitle: `s = "${S_STR}", p = "${P_STR}"`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: 's="cbaebabacd" p="abc"', steps: steps1, subtitle: 's = "cbaebabacd", p = "abc" → [0,6]' },
    { name: 's="abab" p="ab"', steps: steps2, subtitle: 's = "abab", p = "ab" → [0,1,2]', setup(panel) { S_STR = 'abab'; P_STR = 'ab'; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const sStr = s.s || S_STR;
    // s array
    const chars = sStr.split('');
    document.getElementById('s-array').innerHTML = chars.map((ch, idx) => {
      let cls = 'arr-cell';
      if (s.right >= 0 && idx >= s.left && idx <= s.right) cls += ' in-window';
      if (s.addedChar && idx === s.currentIdx) cls += ' is-active';
      return `<div class="${cls}">
        <div class="arr-val">${ch}</div>
        <div class="arr-idx">[${idx}]</div>
      </div>`;
    }).join('');

    // s_count chips
    const scEl = document.getElementById('s-count-chips');
    const scEntries = Object.entries(s.sCount);
    if (scEntries.length === 0) {
      scEl.innerHTML = '<div class="hashmap-empty">（空）</div>';
    } else {
      scEl.innerHTML = scEntries.map(([k, v]) => {
        let cls = 'hm-chip';
        if (s.addedChar === k) cls += ' just-added';
        if (s.removedChar === k) cls += ' diff-hit';
        const match = s.pCount[k] !== undefined && v === s.pCount[k];
        if (match) cls += ' is-match';
        return `<div class="${cls}">
          <span class="hm-chip-key">${k}</span>
          <span class="hm-chip-val">${v}</span>
        </div>`;
      }).join('');
    }

    // p_count chips
    const pcEl = document.getElementById('p-count-chips');
    const pcEntries = Object.entries(s.pCount);
    if (pcEntries.length === 0) {
      pcEl.innerHTML = '<div class="hashmap-empty">（空）</div>';
    } else {
      pcEl.innerHTML = pcEntries.map(([k, v]) => {
        return `<div class="hm-chip">
          <span class="hm-chip-key">${k}</span>
          <span class="hm-chip-val">${v}</span>
        </div>`;
      }).join('');
    }

    // result
    const resEl = document.getElementById('result-area');
    if (s.result.length === 0) {
      resEl.innerHTML = '<span style="color:var(--text-muted);font-size:13px">（尚未找到异位词）</span>';
    } else {
      resEl.innerHTML = s.result.map((idx, i) => {
        const isFresh = s.isMatch && i === s.result.length - 1;
        return `<div class="hm-chip${isFresh ? ' just-added' : ''}" style="font-size:16px;font-weight:700">
          <span class="hm-chip-key">索引</span>
          <span class="hm-chip-val">${idx}</span>
        </div>`;
      }).join('');
    }
  },
};
