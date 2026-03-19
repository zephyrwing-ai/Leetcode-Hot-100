let STRS = ["eat","tea","tan","ate","nat","bat"];

const code = [
  'class Solution:',
  '    def sort_string(self,str):',
  '        a=sorted([x for x in str])',
  '        return "".join(a)',
  '    def groupAnagrams(self, strs):',
  '        grouped_string={}',
  '        for i in strs:',
  '            a=self.sort_string(i)',
  '            if a in grouped_string:',
  '                grouped_string[a].append(i)',
  '            else:',
  '                grouped_string[a]=[i]',
  '        return list(grouped_string.values())',
];

const lineMap = { 9: 5, 10: 6, 11: 7, 13: 9, 15: 11, 16: 12 };

// ── Test Case 1: strs = ["eat","tea","tan","ate","nat","bat"] ──
const steps1 = [
  {lineNum:9, phase:'init', description:'初始化空哈希表 grouped_string = {}，用于按排序后的 key 分组',
   grouped:{}, currentStr:null, currentKey:null, action:null, justAdded:null, strs:["eat","tea","tan","ate","nat","bat"]},
  {lineNum:10, phase:'check', description:'取出第 1 个字符串 "eat"，准备排序',
   grouped:{}, currentStr:"eat", currentKey:null, action:"loop", justAdded:null, strs:["eat","tea","tan","ate","nat","bat"]},
  {lineNum:11, phase:'check', description:'排序 "eat" → key = "aet"，字母排序后相同即为同组异位词',
   grouped:{}, currentStr:"eat", currentKey:"aet", action:"sort", justAdded:null, strs:["eat","tea","tan","ate","nat","bat"]},
  {lineNum:15, phase:'push', description:'key "aet" 不存在，新建分组 grouped_string["aet"] = ["eat"]',
   grouped:{"aet":["eat"]}, currentStr:"eat", currentKey:"aet", action:"newkey", justAdded:"eat", strs:["eat","tea","tan","ate","nat","bat"]},
  {lineNum:10, phase:'check', description:'取出第 2 个字符串 "tea"',
   grouped:{"aet":["eat"]}, currentStr:"tea", currentKey:null, action:"loop", justAdded:null, strs:["eat","tea","tan","ate","nat","bat"]},
  {lineNum:11, phase:'check', description:'排序 "tea" → key = "aet"，与 "eat" 同 key',
   grouped:{"aet":["eat"]}, currentStr:"tea", currentKey:"aet", action:"sort", justAdded:null, strs:["eat","tea","tan","ate","nat","bat"]},
  {lineNum:13, phase:'push', description:'key "aet" 已存在，追加 "tea" → ["eat", "tea"]',
   grouped:{"aet":["eat","tea"]}, currentStr:"tea", currentKey:"aet", action:"append", justAdded:"tea", strs:["eat","tea","tan","ate","nat","bat"]},
  {lineNum:10, phase:'check', description:'取出第 3 个字符串 "tan"',
   grouped:{"aet":["eat","tea"]}, currentStr:"tan", currentKey:null, action:"loop", justAdded:null, strs:["eat","tea","tan","ate","nat","bat"]},
  {lineNum:11, phase:'check', description:'排序 "tan" → key = "ant"，新的 key',
   grouped:{"aet":["eat","tea"]}, currentStr:"tan", currentKey:"ant", action:"sort", justAdded:null, strs:["eat","tea","tan","ate","nat","bat"]},
  {lineNum:15, phase:'push', description:'key "ant" 不存在，新建分组 ["tan"]',
   grouped:{"aet":["eat","tea"],"ant":["tan"]}, currentStr:"tan", currentKey:"ant", action:"newkey", justAdded:"tan", strs:["eat","tea","tan","ate","nat","bat"]},
  {lineNum:10, phase:'check', description:'取出第 4 个字符串 "ate"',
   grouped:{"aet":["eat","tea"],"ant":["tan"]}, currentStr:"ate", currentKey:null, action:"loop", justAdded:null, strs:["eat","tea","tan","ate","nat","bat"]},
  {lineNum:11, phase:'check', description:'排序 "ate" → key = "aet"，与第一组相同',
   grouped:{"aet":["eat","tea"],"ant":["tan"]}, currentStr:"ate", currentKey:"aet", action:"sort", justAdded:null, strs:["eat","tea","tan","ate","nat","bat"]},
  {lineNum:13, phase:'push', description:'key "aet" 已存在，追加 "ate" → ["eat", "tea", "ate"]',
   grouped:{"aet":["eat","tea","ate"],"ant":["tan"]}, currentStr:"ate", currentKey:"aet", action:"append", justAdded:"ate", strs:["eat","tea","tan","ate","nat","bat"]},
  {lineNum:10, phase:'check', description:'取出第 5 个字符串 "nat"',
   grouped:{"aet":["eat","tea","ate"],"ant":["tan"]}, currentStr:"nat", currentKey:null, action:"loop", justAdded:null, strs:["eat","tea","tan","ate","nat","bat"]},
  {lineNum:11, phase:'check', description:'排序 "nat" → key = "ant"，与 "tan" 同 key',
   grouped:{"aet":["eat","tea","ate"],"ant":["tan"]}, currentStr:"nat", currentKey:"ant", action:"sort", justAdded:null, strs:["eat","tea","tan","ate","nat","bat"]},
  {lineNum:13, phase:'push', description:'key "ant" 已存在，追加 "nat" → ["tan", "nat"]',
   grouped:{"aet":["eat","tea","ate"],"ant":["tan","nat"]}, currentStr:"nat", currentKey:"ant", action:"append", justAdded:"nat", strs:["eat","tea","tan","ate","nat","bat"]},
  {lineNum:10, phase:'check', description:'取出第 6 个字符串 "bat"（最后一个）',
   grouped:{"aet":["eat","tea","ate"],"ant":["tan","nat"]}, currentStr:"bat", currentKey:null, action:"loop", justAdded:null, strs:["eat","tea","tan","ate","nat","bat"]},
  {lineNum:11, phase:'check', description:'排序 "bat" → key = "abt"，又一个新 key',
   grouped:{"aet":["eat","tea","ate"],"ant":["tan","nat"]}, currentStr:"bat", currentKey:"abt", action:"sort", justAdded:null, strs:["eat","tea","tan","ate","nat","bat"]},
  {lineNum:15, phase:'push', description:'key "abt" 不存在，新建分组 ["bat"]',
   grouped:{"aet":["eat","tea","ate"],"ant":["tan","nat"],"abt":["bat"]}, currentStr:"bat", currentKey:"abt", action:"newkey", justAdded:"bat", strs:["eat","tea","tan","ate","nat","bat"]},
  {lineNum:16, phase:'record', description:'遍历结束，返回所有分组: [["eat","tea","ate"], ["tan","nat"], ["bat"]]',
   grouped:{"aet":["eat","tea","ate"],"ant":["tan","nat"],"abt":["bat"]}, currentStr:null, currentKey:null, action:"return", justAdded:null, strs:["eat","tea","tan","ate","nat","bat"]},
];

// ── Test Case 2: strs = ["a"] ──
const steps2 = [
  {lineNum:9, phase:'init', description:'初始化空哈希表 grouped_string = {}',
   grouped:{}, currentStr:null, currentKey:null, action:null, justAdded:null, strs:["a"]},
  {lineNum:10, phase:'check', description:'取出第 1 个（也是唯一一个）字符串 "a"',
   grouped:{}, currentStr:"a", currentKey:null, action:"loop", justAdded:null, strs:["a"]},
  {lineNum:11, phase:'check', description:'排序 "a" → key = "a"，单字符排序后不变',
   grouped:{}, currentStr:"a", currentKey:"a", action:"sort", justAdded:null, strs:["a"]},
  {lineNum:15, phase:'push', description:'key "a" 不存在，新建分组 ["a"]',
   grouped:{"a":["a"]}, currentStr:"a", currentKey:"a", action:"newkey", justAdded:"a", strs:["a"]},
  {lineNum:16, phase:'record', description:'遍历结束，只有一个分组，返回 [["a"]]',
   grouped:{"a":["a"]}, currentStr:null, currentKey:null, action:"return", justAdded:null, strs:["a"]},
];

const phaseLabels = { init: '初始化', check: '检查', push: '插入', record: '返回' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">当前字符串</div>
      <div id="current-str-row" class="current-str-row" style="display:flex;align-items:center;gap:10px;min-height:36px"></div>
    </div>
    <div class="card">
      <div class="section-title">grouped_string 哈希表</div>
      <div id="hashmap-rows" class="hashmap-rows"></div>
    </div>
  `;
}

export default {
  title: '49. Group Anagrams — 执行可视化',
  problemDesc: `
    <p>给你一个字符串数组 <code>strs</code>，请你将字母异位词组合在一起。字母异位词是由重新排列源单词的所有字母得到的一个新单词。</p>
    <div class="example">输入：strs = ["eat","tea","tan","ate","nat","bat"]
输出：[["bat"],["nat","tan"],["ate","eat","tea"]]</div>
    <p><strong>提示：</strong>可以按任意顺序返回结果列表，<code>strs[i]</code> 仅包含小写字母。</p>
  `,
  subtitle: 'strs = ["eat","tea","tan","ate","nat","bat"]',
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: 'strs = ["eat","tea","tan","ate","nat","bat"]', steps: steps1, subtitle: 'strs = ["eat","tea","tan","ate","nat","bat"]' },
    {
      name: 'strs = ["a"]', steps: steps2, subtitle: 'strs = ["a"]',
      setup(panel) { STRS = ["a"]; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    // current string & sorted key
    const strRow = document.getElementById('current-str-row');
    if (s.currentStr) {
      let html = `<span class="hm-chip" style="border:1.5px solid #38bdf8;background:rgba(56,189,248,0.12);color:#38bdf8;font-weight:600">${s.currentStr}</span>`;
      if (s.currentKey) {
        html += `<span style="color:var(--text-muted);font-size:16px">\u2192</span>`;
        html += `<span class="hm-chip" style="border:1.5px solid #f59e0b;background:rgba(245,158,11,0.12);color:#f59e0b;font-weight:600">${s.currentKey}</span>`;
      }
      strRow.innerHTML = html;
    } else {
      strRow.innerHTML = '<span style="color:var(--text-muted);font-size:13px">—</span>';
    }

    // hashmap rows
    const hmEl = document.getElementById('hashmap-rows');
    const entries = Object.entries(s.grouped);
    if (entries.length === 0) {
      hmEl.innerHTML = '<div class="hashmap-empty">（哈希表为空）</div>';
    } else {
      hmEl.innerHTML = entries.map(([key, values]) => {
        const isHighlighted = s.currentKey === key;
        return `<div class="hashmap-row-chips${isHighlighted ? ' highlighted' : ''}">
          <span class="hm-key">${key}</span>
          <span class="hm-colon">\u2192</span>
          <span class="hm-values">${values.map(v => {
            const isJustAdded = s.justAdded === v && s.currentKey === key;
            return `<span class="hm-chip${isJustAdded ? ' just-added' : ''}">${v}</span>`;
          }).join('')}</span>
        </div>`;
      }).join('');
    }
  },
};
