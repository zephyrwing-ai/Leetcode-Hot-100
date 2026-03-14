const code = [
  'class Solution(object):',
  '    def sort_string(self,str):',
  '        a=sorted([x for x in str])',
  '        return "".join(a)',
  '    def groupAnagrams(self, strs):',
  '        """',
  '        :type strs: List[str]',
  '        :rtype: List[List[str]]',
  '        """',
  '        grouped_string={}',
  '        for i in strs:',
  '            a=self.sort_string(i)',
  '            if a in grouped_string:',
  '                grouped_string[a].append(i)',
  '            else:',
  '                grouped_string[a]=[i]',
  '        return list(grouped_string.values())',
];

const lineMap = { 9: 9, 10: 10, 11: 11, 13: 13, 15: 15, 16: 16 };

const steps = [{"lineNum":9,"codeLine":"grouped_string={}","phase":"init","description":"初始化空哈希表 grouped_string = {}","grouped":{},"currentStr":null,"currentKey":null,"action":null,"justAdded":null},{"lineNum":10,"codeLine":"for i in strs:","phase":"check","description":"处理字符串 \"eat\"","grouped":{},"currentStr":"eat","currentKey":null,"action":"loop","justAdded":null},{"lineNum":11,"codeLine":"a=self.sort_string(i)","phase":"check","description":"排序 \"eat\" → key = \"aet\"（字母同序即为同字谜）","grouped":{},"currentStr":"eat","currentKey":"aet","action":"sort","justAdded":null},{"lineNum":15,"codeLine":"grouped_string[a]=[i]","phase":"push","description":"key \"aet\" 不存在，新建组 [\"eat\"]","grouped":{"aet":["eat"]},"currentStr":"eat","currentKey":"aet","action":"newkey","justAdded":"eat"},{"lineNum":10,"codeLine":"for i in strs:","phase":"check","description":"处理字符串 \"tea\"","grouped":{"aet":["eat"]},"currentStr":"tea","currentKey":null,"action":"loop","justAdded":null},{"lineNum":11,"codeLine":"a=self.sort_string(i)","phase":"check","description":"排序 \"tea\" → key = \"aet\"（字母同序即为同字谜）","grouped":{"aet":["eat"]},"currentStr":"tea","currentKey":"aet","action":"sort","justAdded":null},{"lineNum":13,"codeLine":"grouped_string[a].append(i)","phase":"push","description":"key \"aet\" 已存在，将 \"tea\" 追加到组 ['eat', 'tea']","grouped":{"aet":["eat","tea"]},"currentStr":"tea","currentKey":"aet","action":"append","justAdded":"tea"},{"lineNum":10,"codeLine":"for i in strs:","phase":"check","description":"处理字符串 \"tan\"","grouped":{"aet":["eat","tea"]},"currentStr":"tan","currentKey":null,"action":"loop","justAdded":null},{"lineNum":11,"codeLine":"a=self.sort_string(i)","phase":"check","description":"排序 \"tan\" → key = \"ant\"（字母同序即为同字谜）","grouped":{"aet":["eat","tea"]},"currentStr":"tan","currentKey":"ant","action":"sort","justAdded":null},{"lineNum":15,"codeLine":"grouped_string[a]=[i]","phase":"push","description":"key \"ant\" 不存在，新建组 [\"tan\"]","grouped":{"aet":["eat","tea"],"ant":["tan"]},"currentStr":"tan","currentKey":"ant","action":"newkey","justAdded":"tan"},{"lineNum":10,"codeLine":"for i in strs:","phase":"check","description":"处理字符串 \"ate\"","grouped":{"aet":["eat","tea"],"ant":["tan"]},"currentStr":"ate","currentKey":null,"action":"loop","justAdded":null},{"lineNum":11,"codeLine":"a=self.sort_string(i)","phase":"check","description":"排序 \"ate\" → key = \"aet\"（字母同序即为同字谜）","grouped":{"aet":["eat","tea"],"ant":["tan"]},"currentStr":"ate","currentKey":"aet","action":"sort","justAdded":null},{"lineNum":13,"codeLine":"grouped_string[a].append(i)","phase":"push","description":"key \"aet\" 已存在，将 \"ate\" 追加到组 ['eat', 'tea', 'ate']","grouped":{"aet":["eat","tea","ate"],"ant":["tan"]},"currentStr":"ate","currentKey":"aet","action":"append","justAdded":"ate"},{"lineNum":10,"codeLine":"for i in strs:","phase":"check","description":"处理字符串 \"nat\"","grouped":{"aet":["eat","tea","ate"],"ant":["tan"]},"currentStr":"nat","currentKey":null,"action":"loop","justAdded":null},{"lineNum":11,"codeLine":"a=self.sort_string(i)","phase":"check","description":"排序 \"nat\" → key = \"ant\"（字母同序即为同字谜）","grouped":{"aet":["eat","tea","ate"],"ant":["tan"]},"currentStr":"nat","currentKey":"ant","action":"sort","justAdded":null},{"lineNum":13,"codeLine":"grouped_string[a].append(i)","phase":"push","description":"key \"ant\" 已存在，将 \"nat\" 追加到组 ['tan', 'nat']","grouped":{"aet":["eat","tea","ate"],"ant":["tan","nat"]},"currentStr":"nat","currentKey":"ant","action":"append","justAdded":"nat"},{"lineNum":10,"codeLine":"for i in strs:","phase":"check","description":"处理字符串 \"bat\"","grouped":{"aet":["eat","tea","ate"],"ant":["tan","nat"]},"currentStr":"bat","currentKey":null,"action":"loop","justAdded":null},{"lineNum":11,"codeLine":"a=self.sort_string(i)","phase":"check","description":"排序 \"bat\" → key = \"abt\"（字母同序即为同字谜）","grouped":{"aet":["eat","tea","ate"],"ant":["tan","nat"]},"currentStr":"bat","currentKey":"abt","action":"sort","justAdded":null},{"lineNum":15,"codeLine":"grouped_string[a]=[i]","phase":"push","description":"key \"abt\" 不存在，新建组 [\"bat\"]","grouped":{"aet":["eat","tea","ate"],"ant":["tan","nat"],"abt":["bat"]},"currentStr":"bat","currentKey":"abt","action":"newkey","justAdded":"bat"},{"lineNum":16,"codeLine":"return list(grouped_string.values())","phase":"record","description":"返回所有分组: [['eat', 'tea', 'ate'], ['tan', 'nat'], ['bat']]","grouped":{"aet":["eat","tea","ate"],"ant":["tan","nat"],"abt":["bat"]},"currentStr":null,"currentKey":null,"action":"return","justAdded":null}];

const phaseLabels = { init: '初始化', check: '检查', push: '插入', record: '返回' };

export default {
  title: '49. Group Anagrams — 执行可视化',
  subtitle: 'strs = ["eat","tea","tan","ate","nat","bat"]',
  code, lineMap, steps, phaseLabels,

  setup(panel) {
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
  },

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
