let S = 'leetcode';
let DICT = ['leet', 'code'];

const code = [
  'class Solution:',
  '    def wordBreak(self, s, wordDict):',
  '        n = len(s)',
  '        dp = [False] * (n + 1)',
  '        dp[0] = True',
  '        for i in range(1, n + 1):',
  '            for word in wordDict:',
  '                wl = len(word)',
  '                if i >= wl and dp[i - wl]:',
  '                    if s[i-wl:i] == word:',
  '                        dp[i] = True',
  '                        break',
  '        return dp[n]',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9, 11: 10, 13: 12 };

const F = false, T = true;
const steps1 = [
  { lineNum: 4, phase: 'init', description: '初始化 dp 数组，长度 9，dp[0]=True', s: 'leetcode', dict: ['leet', 'code'], dp: [T, F, F, F, F, F, F, F, F], currentI: -1, sources: [], matchWord: null, matchRange: null },
  { lineNum: 6, phase: 'fill', description: 'i=1: 检查子串 s[0:1]="l"', s: 'leetcode', dict: ['leet', 'code'], dp: [T, F, F, F, F, F, F, F, F], currentI: 1, sources: [], matchWord: null, matchRange: [0, 1] },
  { lineNum: 9, phase: 'fill', description: 'i=1: "l" 不匹配任何单词，dp[1]=False', s: 'leetcode', dict: ['leet', 'code'], dp: [T, F, F, F, F, F, F, F, F], currentI: 1, sources: [], matchWord: null, matchRange: [0, 1] },
  { lineNum: 6, phase: 'fill', description: 'i=2: 检查子串，"le" 不匹配', s: 'leetcode', dict: ['leet', 'code'], dp: [T, F, F, F, F, F, F, F, F], currentI: 2, sources: [], matchWord: null, matchRange: [0, 2] },
  { lineNum: 6, phase: 'fill', description: 'i=3: 检查子串，"lee" 不匹配', s: 'leetcode', dict: ['leet', 'code'], dp: [T, F, F, F, F, F, F, F, F], currentI: 3, sources: [], matchWord: null, matchRange: [0, 3] },
  { lineNum: 9, phase: 'fill', description: 'i=4: word="leet"，dp[0]=True 且 s[0:4]="leet" 匹配！', s: 'leetcode', dict: ['leet', 'code'], dp: [T, F, F, F, F, F, F, F, F], currentI: 4, sources: [0], matchWord: 'leet', matchRange: [0, 4] },
  { lineNum: 10, phase: 'fill', description: 'i=4: dp[4] = True，break 跳出内层循环', s: 'leetcode', dict: ['leet', 'code'], dp: [T, F, F, F, T, F, F, F, F], currentI: 4, sources: [0], matchWord: 'leet', matchRange: [0, 4] },
  { lineNum: 6, phase: 'fill', description: 'i=5: 检查所有单词，没有匹配，dp[5]=False', s: 'leetcode', dict: ['leet', 'code'], dp: [T, F, F, F, T, F, F, F, F], currentI: 5, sources: [], matchWord: null, matchRange: [1, 5] },
  { lineNum: 6, phase: 'fill', description: 'i=6: 没有匹配，dp[6]=False', s: 'leetcode', dict: ['leet', 'code'], dp: [T, F, F, F, T, F, F, F, F], currentI: 6, sources: [], matchWord: null, matchRange: [2, 6] },
  { lineNum: 6, phase: 'fill', description: 'i=7: 没有匹配，dp[7]=False', s: 'leetcode', dict: ['leet', 'code'], dp: [T, F, F, F, T, F, F, F, F], currentI: 7, sources: [], matchWord: null, matchRange: [3, 7] },
  { lineNum: 9, phase: 'fill', description: 'i=8: word="code"，dp[4]=True 且 s[4:8]="code" 匹配！', s: 'leetcode', dict: ['leet', 'code'], dp: [T, F, F, F, T, F, F, F, F], currentI: 8, sources: [4], matchWord: 'code', matchRange: [4, 8] },
  { lineNum: 10, phase: 'fill', description: 'i=8: dp[8] = True，"leetcode" = "leet" + "code"', s: 'leetcode', dict: ['leet', 'code'], dp: [T, F, F, F, T, F, F, F, T], currentI: 8, sources: [4], matchWord: 'code', matchRange: [4, 8] },
  { lineNum: 13, phase: 'done', description: '返回 dp[8] = True，"leetcode" 可以被拆分', s: 'leetcode', dict: ['leet', 'code'], dp: [T, F, F, F, T, F, F, F, T], currentI: -1, sources: [], matchWord: null, matchRange: null },
];

// Test case 2: s = "catsandog", dict = ["cats","dog","sand","and","cat"]
// dp[0]=T
// i=3: "cat"→dp[0]=T, match! dp[3]=T
// i=4: "cats"→dp[0]=T, match! dp[4]=T
// i=7: "sand"→dp[3]=T, s[3:7]="sand"? s="catsandog", s[3:7]="sand"? NO, s[3]='s',s[4]='a',s[5]='n',s[6]='d' → "sand", dp[7]=T
// Actually let me trace carefully: s = "catsandog" (indices 0-8)
// s[0:3]="cat", s[0:4]="cats", s[3:7]="sand"? s[3]='s', no wait:
// c-a-t-s-a-n-d-o-g (0-8)
// i=3: s[0:3]="cat" → dp[0]=T, match → dp[3]=T
// i=4: s[0:4]="cats" → dp[0]=T, match → dp[4]=T
// i=6: s[3:6]="san" no match; s[2:6]="tsan" no
// i=7: s[3:7]="sand" → dp[3]=T, match → dp[7]=T; also s[4:7]="and" → dp[4]=T → dp[7]=T
// i=8: s[5:8]="dog"? s[5]='n' → "ndo" no. s[4:8]="ando" no. need "dog" at end but s[6:9]="dog"
// i=9: s[6:9]="dog" → dp[6]? dp[6]=F. s[5:9]="ndog" no. s[4:9]="andog" no. → dp[9]=F
// Answer: False
const steps2 = [
  { lineNum: 4, phase: 'init', description: '初始化 dp，s = "catsandog"，长度 9+1=10', s: 'catsandog', dict: ['cats','dog','sand','and','cat'], dp: [T, F, F, F, F, F, F, F, F, F], currentI: -1, sources: [], matchWord: null, matchRange: null },
  { lineNum: 6, phase: 'fill', description: 'i=1: "c" 不匹配任何单词', s: 'catsandog', dict: ['cats','dog','sand','and','cat'], dp: [T, F, F, F, F, F, F, F, F, F], currentI: 1, sources: [], matchWord: null, matchRange: [0, 1] },
  { lineNum: 6, phase: 'fill', description: 'i=2: "ca" 不匹配', s: 'catsandog', dict: ['cats','dog','sand','and','cat'], dp: [T, F, F, F, F, F, F, F, F, F], currentI: 2, sources: [], matchWord: null, matchRange: [0, 2] },
  { lineNum: 9, phase: 'fill', description: 'i=3: "cat" 匹配！dp[0]=True, dp[3]=True', s: 'catsandog', dict: ['cats','dog','sand','and','cat'], dp: [T, F, F, T, F, F, F, F, F, F], currentI: 3, sources: [0], matchWord: 'cat', matchRange: [0, 3] },
  { lineNum: 9, phase: 'fill', description: 'i=4: "cats" 匹配！dp[0]=True, dp[4]=True', s: 'catsandog', dict: ['cats','dog','sand','and','cat'], dp: [T, F, F, T, T, F, F, F, F, F], currentI: 4, sources: [0], matchWord: 'cats', matchRange: [0, 4] },
  { lineNum: 6, phase: 'fill', description: 'i=5: 检查所有可能，没有匹配 dp[5]=False', s: 'catsandog', dict: ['cats','dog','sand','and','cat'], dp: [T, F, F, T, T, F, F, F, F, F], currentI: 5, sources: [], matchWord: null, matchRange: [1, 5] },
  { lineNum: 6, phase: 'fill', description: 'i=6: 没有匹配，dp[6]=False', s: 'catsandog', dict: ['cats','dog','sand','and','cat'], dp: [T, F, F, T, T, F, F, F, F, F], currentI: 6, sources: [], matchWord: null, matchRange: [2, 6] },
  { lineNum: 9, phase: 'fill', description: 'i=7: "sand"→dp[3]=T, s[3:7]="sand" 匹配！dp[7]=True', s: 'catsandog', dict: ['cats','dog','sand','and','cat'], dp: [T, F, F, T, T, F, F, T, F, F], currentI: 7, sources: [3], matchWord: 'sand', matchRange: [3, 7] },
  { lineNum: 6, phase: 'fill', description: 'i=8: 检查 "dog"→dp[5]=F; "and"→dp[5]=F; 其他不匹配', s: 'catsandog', dict: ['cats','dog','sand','and','cat'], dp: [T, F, F, T, T, F, F, T, F, F], currentI: 8, sources: [], matchWord: null, matchRange: [5, 8] },
  { lineNum: 6, phase: 'fill', description: 'i=9: "dog"→dp[6]=F; "sand"→dp[5]=F; "and"→dp[6]=F; 无法拆分', s: 'catsandog', dict: ['cats','dog','sand','and','cat'], dp: [T, F, F, T, T, F, F, T, F, F], currentI: 9, sources: [], matchWord: null, matchRange: [6, 9] },
  { lineNum: 13, phase: 'done', description: '返回 dp[9] = False，"catsandog" 无法被完全拆分（"og" 无法匹配）', s: 'catsandog', dict: ['cats','dog','sand','and','cat'], dp: [T, F, F, T, T, F, F, T, F, F], currentI: -1, sources: [], matchWord: null, matchRange: null },
];

const phaseLabels = { init: '初始化', fill: '填表', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">字符串 s（高亮 = 当前检查的子串）</div>
      <div class="array-row" id="str-array"></div>
    </div>
    <div class="card">
      <div class="section-title">DP 数组（dp[i] = s[0:i] 是否可拆分）</div>
      <div class="array-row" id="dp-array"></div>
      <div class="legend-row">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(34,211,238,0.4);border:1px solid #22d3ee"></div>当前检查</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>来源 dp 位置</div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">匹配信息</div>
      <div id="match-info" style="font-family:var(--font-mono);font-size:14px"></div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '139. Word Break — 执行可视化',
  problemDesc: `
    <p>给你一个字符串 <code>s</code> 和一个字符串列表 <code>wordDict</code> 作为字典。判断是否可以利用字典中出现的单词拼接出 <code>s</code>。字典中的单词可以重复使用。</p>
    <div class="example">输入：s = "leetcode", wordDict = ["leet","code"]
输出：true
解释："leetcode" 可以拆分为 "leet" + "code"</div>
  `,
  subtitle: `s = "${S}", wordDict = [${DICT.map(w => `"${w}"`)}]`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: '可拆分 (true)', steps: steps1, subtitle: 's = "leetcode"' },
    { name: '不可拆分 (false)', steps: steps2, subtitle: 's = "catsandog"', setup(panel) { S = 'catsandog'; DICT = ['cats','dog','sand','and','cat']; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const str = s.s || S;
    const dict = s.dict || DICT;
    document.getElementById('str-array').innerHTML = str.split('').map((ch, idx) => {
      let cls = 'arr-cell';
      if (s.matchRange && idx >= s.matchRange[0] && idx < s.matchRange[1]) {
        cls += s.matchWord ? ' in-window' : ' is-active';
      }
      return `<div class="${cls}"><div class="arr-val">${ch}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    document.getElementById('dp-array').innerHTML = s.dp.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.currentI) cls += ' current';
      if (s.sources.includes(idx)) cls += ' in-window';
      return `<div class="${cls}"><div class="arr-val">${v ? 'T' : 'F'}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    const matchEl = document.getElementById('match-info');
    if (s.matchWord) {
      matchEl.innerHTML = `<div style="color:#4ade80;font-weight:700">匹配单词 "${s.matchWord}"：s[${s.matchRange[0]}:${s.matchRange[1]}] = "${str.slice(s.matchRange[0], s.matchRange[1])}"</div>`;
    } else if (s.matchRange) {
      matchEl.innerHTML = `<div style="color:var(--text-muted)">检查 s[${s.matchRange[0]}:${s.matchRange[1]}] = "${str.slice(s.matchRange[0], s.matchRange[1])}"，无匹配</div>`;
    } else {
      matchEl.innerHTML = `<div style="color:var(--text-muted)">wordDict = [${dict.map(w => `"${w}"`)}]</div>`;
    }

    const foundEl = document.getElementById('found-area');
    if (s.phase === 'done') {
      const result = s.dp[s.dp.length - 1];
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">${result ? '\u2713' : '\u2717'}</div>
        <div>
          <div class="found-text">dp[${str.length}] = ${result ? 'True' : 'False'}</div>
          <div class="found-sub">"${str}" ${result ? '可以' : '不可以'}被拆分</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
