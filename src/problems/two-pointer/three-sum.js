const code = [
  'class Solution(object):',
  '    def threeSum(self, nums):',
  '        res=[]',
  '        num=sorted(nums)',
  '        n=len(num)',
  '        for first in range(n):',
  '            if first>0 and num[first]==num[first-1]:',
  '                continue',
  '            target=-num[first]',
  '            third=n-1',
  '            for second in range(first+1,n):',
  '                if second>first+1 and num[second]==num[second-1]:',
  '                    continue',
  '                while second<third and num[second]+num[third]>target:',
  '                        third-=1',
  '                if second == third:',
  '                    break',
  '                if num[second]+num[third]==target:',
  '                    res.append([num[first],num[second],num[third]])',
  '        return res',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 9: 8, 12: 11, 14: 13, 16: 15, 18: 17, 19: 18 };

const steps = [{"lineNum":3,"codeLine":"res=[]","phase":"init","description":"初始化，排序后 num = [-4, -1, -1, 0, 1, 2]","num":[-4,-1,-1,0,1,2],"res":[],"first":-1,"second":-1,"third":-1,"target":null,"action":"init"},{"lineNum":9,"codeLine":"target=-num[first]","phase":"check","description":"固定 first=0，num[first]=-4，target = 4，third 初始化为 5","num":[-4,-1,-1,0,1,2],"res":[],"first":0,"second":1,"third":5,"target":4,"action":"set_first"},{"lineNum":18,"codeLine":"if num[second]+num[third]==target:","phase":"check","description":"num[1]=-1 + num[5]=2 = 1 ≠ 4，继续","num":[-4,-1,-1,0,1,2],"res":[],"first":0,"second":1,"third":5,"target":4,"action":"no_match"},{"lineNum":12,"codeLine":"if second>first+1 and num[second]==num[second-1]: continue","phase":"check","description":"second=2, num[2]=-1 == num[1]，跳过重复","num":[-4,-1,-1,0,1,2],"res":[],"first":0,"second":2,"third":5,"target":4,"action":"skip_second"},{"lineNum":18,"codeLine":"if num[second]+num[third]==target:","phase":"check","description":"num[3]=0 + num[5]=2 = 2 ≠ 4，继续","num":[-4,-1,-1,0,1,2],"res":[],"first":0,"second":3,"third":5,"target":4,"action":"no_match"},{"lineNum":18,"codeLine":"if num[second]+num[third]==target:","phase":"check","description":"num[4]=1 + num[5]=2 = 3 ≠ 4，继续","num":[-4,-1,-1,0,1,2],"res":[],"first":0,"second":4,"third":5,"target":4,"action":"no_match"},{"lineNum":16,"codeLine":"if second == third: break","phase":"check","description":"second=5 == third=5，指针相遇，内层循环结束","num":[-4,-1,-1,0,1,2],"res":[],"first":0,"second":5,"third":5,"target":4,"action":"break"},{"lineNum":9,"codeLine":"target=-num[first]","phase":"check","description":"固定 first=1，num[first]=-1，target = 1，third 初始化为 5","num":[-4,-1,-1,0,1,2],"res":[],"first":1,"second":2,"third":5,"target":1,"action":"set_first"},{"lineNum":19,"codeLine":"res.append([num[first],num[second],num[third]])","phase":"record","description":"找到三元组! [-1, -1, 2]，res = [[-1, -1, 2]]","num":[-4,-1,-1,0,1,2],"res":[[-1,-1,2]],"first":1,"second":2,"third":5,"target":1,"action":"found"},{"lineNum":14,"codeLine":"while second<third and num[second]+num[third]>target:","phase":"check","description":"num[3]=0 + num[5]=2 = 2 > target=1，third 左移","num":[-4,-1,-1,0,1,2],"res":[[-1,-1,2]],"first":1,"second":3,"third":5,"target":1,"action":"move_third"},{"lineNum":19,"codeLine":"res.append([num[first],num[second],num[third]])","phase":"record","description":"找到三元组! [-1, 0, 1]，res = [[-1, -1, 2], [-1, 0, 1]]","num":[-4,-1,-1,0,1,2],"res":[[-1,-1,2],[-1,0,1]],"first":1,"second":3,"third":4,"target":1,"action":"found"},{"lineNum":16,"codeLine":"if second == third: break","phase":"check","description":"second=4 == third=4，指针相遇，内层循环结束","num":[-4,-1,-1,0,1,2],"res":[[-1,-1,2],[-1,0,1]],"first":1,"second":4,"third":4,"target":1,"action":"break"},{"lineNum":7,"codeLine":"if first>0 and num[first]==num[first-1]: continue","phase":"check","description":"first=2, num[2]=-1 == num[1]=-1，跳过重复","num":[-4,-1,-1,0,1,2],"res":[[-1,-1,2],[-1,0,1]],"first":2,"second":-1,"third":-1,"target":null,"action":"skip_first"},{"lineNum":9,"codeLine":"target=-num[first]","phase":"check","description":"固定 first=3，num[first]=0，target = 0，third 初始化为 5","num":[-4,-1,-1,0,1,2],"res":[[-1,-1,2],[-1,0,1]],"first":3,"second":4,"third":5,"target":0,"action":"set_first"},{"lineNum":14,"codeLine":"while second<third and num[second]+num[third]>target:","phase":"check","description":"num[4]=1 + num[5]=2 = 3 > target=0，third 左移","num":[-4,-1,-1,0,1,2],"res":[[-1,-1,2],[-1,0,1]],"first":3,"second":4,"third":5,"target":0,"action":"move_third"},{"lineNum":16,"codeLine":"if second == third: break","phase":"check","description":"second=4 == third=4，指针相遇，内层循环结束","num":[-4,-1,-1,0,1,2],"res":[[-1,-1,2],[-1,0,1]],"first":3,"second":4,"third":4,"target":0,"action":"break"},{"lineNum":9,"codeLine":"target=-num[first]","phase":"check","description":"固定 first=4，num[first]=1，target = -1，third 初始化为 5","num":[-4,-1,-1,0,1,2],"res":[[-1,-1,2],[-1,0,1]],"first":4,"second":5,"third":5,"target":-1,"action":"set_first"},{"lineNum":16,"codeLine":"if second == third: break","phase":"check","description":"second=5 == third=5，指针相遇，内层循环结束","num":[-4,-1,-1,0,1,2],"res":[[-1,-1,2],[-1,0,1]],"first":4,"second":5,"third":5,"target":-1,"action":"break"}];

const phaseLabels = { init: '初始化', check: '检查', record: '记录' };

export default {
  title: '15. 3Sum',
  subtitle: 'nums=[-1,0,1,2,-1,-4] → sorted: [-4,-1,-1,0,1,2]',
  code, lineMap, steps, phaseLabels,

  setup(panel) {
    panel.innerHTML = `
      <div class="card">
        <div class="section-title">数组 num（F = first，S = second，T = third）</div>
        <div class="array-row" id="num-array"></div>
        <div class="legend-row" style="margin-top:8px">
          <div class="legend-item"><div class="legend-dot" style="background:rgba(248,113,113,0.4);border:1px solid #f87171"></div>F (first)</div>
          <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>S (second)</div>
          <div class="legend-item"><div class="legend-dot" style="background:rgba(192,132,252,0.4);border:1px solid #c084fc"></div>T (third)</div>
        </div>
      </div>
      <div class="card" id="target-card">
        <div class="section-title">Target</div>
        <div id="target-display" style="font-size:20px;font-weight:700;font-family:monospace;color:#f59e0b;min-height:28px">—</div>
      </div>
      <div class="card">
        <div class="section-title">结果 res</div>
        <div id="result-list" style="display:flex;flex-wrap:wrap;gap:8px;min-height:28px"></div>
      </div>
    `;
  },

  render(s) {
    const num = s.num;
    const n = num.length;

    // --- num array ---
    document.getElementById('num-array').innerHTML = num.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.first) cls += ' is-first';
      if (idx === s.second) cls += ' is-second';
      if (idx === s.third) cls += ' is-third';
      if (s.action === 'skip_first' && idx === s.first) cls += ' is-skip';
      if (s.action === 'skip_second' && idx === s.second) cls += ' is-skip';

      const labels = [];
      if (idx === s.first) labels.push('F');
      if (idx === s.second) labels.push('S');
      if (idx === s.third) labels.push('T');
      const label = labels.join(' ');

      let labelColor = '';
      if (labels.length > 1) labelColor = '#a78bfa';
      else if (label === 'F') labelColor = '#f87171';
      else if (label === 'S') labelColor = '#38bdf8';
      else if (label === 'T') labelColor = '#c084fc';

      return `<div class="${cls}">
        <div class="arr-val">${v}</div>
        <div class="arr-idx">[${idx}]</div>
        ${label ? `<div class="ptr-label" style="color:${labelColor};font-weight:700;font-size:11px;margin-top:2px">${label}</div>` : ''}
      </div>`;
    }).join('');

    // --- target display ---
    const targetEl = document.getElementById('target-display');
    if (s.target !== null) {
      targetEl.textContent = `target = ${s.target}`;
      targetEl.style.color = '#f59e0b';
    } else {
      targetEl.textContent = '—';
      targetEl.style.color = 'var(--text-muted)';
    }

    // --- result list ---
    const resultEl = document.getElementById('result-list');
    if (s.res.length === 0) {
      resultEl.innerHTML = '<span style="color:var(--text-muted);font-size:13px">暂无结果</span>';
    } else {
      const lastFoundIdx = s.action === 'found' ? s.res.length - 1 : -1;
      resultEl.innerHTML = s.res.map((triplet, i) => {
        const freshCls = i === lastFoundIdx ? ' fresh' : '';
        return `<span class="triplet-chip${freshCls}">[${triplet.join(', ')}]</span>`;
      }).join('');
    }
  },
};
