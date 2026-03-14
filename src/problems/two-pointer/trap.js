const HEIGHT = [4, 2, 0, 3, 2, 5];
const MAX_H = 5;
const CHART_H = 140;

const code = [
  { text: 'class Solution:' },
  { text: '    def trap(self,height):' },
  { text: '        if not height:' },
  { text: '            return' },
  { text: '        n=len(height)' },
  { text: '' },
  { text: '        leftMax=[height[0]]+(n-1)*[0]' },
  { text: '        for i in range(0,n):' },
  { text: '            leftMax[i]=max(leftMax[i-1],height[i])' },
  { text: '' },
  { text: '        rightMax=(n-1)*[0]+[height[n-1]]' },
  { text: '        for i in range(n-2,-1,-1):' },
  { text: '            rightMax[i]=max(rightMax[i+1],height[i])' },
  { text: '' },
  { text: '        ans=sum(min(leftMax[i],rightMax[i])-height[i] for i in range(n))' },
  { text: '' },
  { text: '        return ans' },
];

const lineMap = { 5: 4, 7: 6, 9: 8, 11: 10, 13: 12, 15: 14, 17: 16 };

const steps = [{"lineNum":5,"codeLine":"n=len(height)","phase":"init","description":"输入 height = [4, 2, 0, 3, 2, 5]，n = 6","height":[4,2,0,3,2,5],"leftMax":[],"rightMax":[],"ans":0,"currentI":-1,"phase2":"init"},{"lineNum":7,"codeLine":"leftMax=[height[0]]+(n-1)*[0]","phase":"init","description":"初始化 leftMax，首元素为 height[0]=4，其余为 0","height":[4,2,0,3,2,5],"leftMax":[4,0,0,0,0,0],"rightMax":[],"ans":0,"currentI":-1,"phase2":"init_leftmax"},{"lineNum":9,"codeLine":"leftMax[i]=max(leftMax[i-1],height[i])","phase":"check","description":"leftMax[0] = max(leftMax[0]=4, height[0]=4) = 4","height":[4,2,0,3,2,5],"leftMax":[4,0,0,0,0,0],"rightMax":[],"ans":0,"currentI":0,"phase2":"build_left"},{"lineNum":9,"codeLine":"leftMax[i]=max(leftMax[i-1],height[i])","phase":"check","description":"leftMax[1] = max(leftMax[0]=4, height[1]=2) = 4","height":[4,2,0,3,2,5],"leftMax":[4,4,0,0,0,0],"rightMax":[],"ans":0,"currentI":1,"phase2":"build_left"},{"lineNum":9,"codeLine":"leftMax[i]=max(leftMax[i-1],height[i])","phase":"check","description":"leftMax[2] = max(leftMax[1]=4, height[2]=0) = 4","height":[4,2,0,3,2,5],"leftMax":[4,4,4,0,0,0],"rightMax":[],"ans":0,"currentI":2,"phase2":"build_left"},{"lineNum":9,"codeLine":"leftMax[i]=max(leftMax[i-1],height[i])","phase":"check","description":"leftMax[3] = max(leftMax[2]=4, height[3]=3) = 4","height":[4,2,0,3,2,5],"leftMax":[4,4,4,4,0,0],"rightMax":[],"ans":0,"currentI":3,"phase2":"build_left"},{"lineNum":9,"codeLine":"leftMax[i]=max(leftMax[i-1],height[i])","phase":"check","description":"leftMax[4] = max(leftMax[3]=4, height[4]=2) = 4","height":[4,2,0,3,2,5],"leftMax":[4,4,4,4,4,0],"rightMax":[],"ans":0,"currentI":4,"phase2":"build_left"},{"lineNum":9,"codeLine":"leftMax[i]=max(leftMax[i-1],height[i])","phase":"check","description":"leftMax[5] = max(leftMax[4]=4, height[5]=5) = 5","height":[4,2,0,3,2,5],"leftMax":[4,4,4,4,4,5],"rightMax":[],"ans":0,"currentI":5,"phase2":"build_left"},{"lineNum":11,"codeLine":"rightMax=(n-1)*[0]+[height[n-1]]","phase":"init","description":"初始化 rightMax，末元素为 height[5]=5，其余为 0","height":[4,2,0,3,2,5],"leftMax":[4,4,4,4,4,5],"rightMax":[0,0,0,0,0,5],"ans":0,"currentI":-1,"phase2":"init_rightmax"},{"lineNum":13,"codeLine":"rightMax[i]=max(rightMax[i+1],height[i])","phase":"check","description":"rightMax[4] = max(rightMax[5]=5, height[4]=2) = 5","height":[4,2,0,3,2,5],"leftMax":[4,4,4,4,4,5],"rightMax":[0,0,0,0,5,5],"ans":0,"currentI":4,"phase2":"build_right"},{"lineNum":13,"codeLine":"rightMax[i]=max(rightMax[i+1],height[i])","phase":"check","description":"rightMax[3] = max(rightMax[4]=5, height[3]=3) = 5","height":[4,2,0,3,2,5],"leftMax":[4,4,4,4,4,5],"rightMax":[0,0,0,5,5,5],"ans":0,"currentI":3,"phase2":"build_right"},{"lineNum":13,"codeLine":"rightMax[i]=max(rightMax[i+1],height[i])","phase":"check","description":"rightMax[2] = max(rightMax[3]=5, height[2]=0) = 5","height":[4,2,0,3,2,5],"leftMax":[4,4,4,4,4,5],"rightMax":[0,0,5,5,5,5],"ans":0,"currentI":2,"phase2":"build_right"},{"lineNum":13,"codeLine":"rightMax[i]=max(rightMax[i+1],height[i])","phase":"check","description":"rightMax[1] = max(rightMax[2]=5, height[1]=2) = 5","height":[4,2,0,3,2,5],"leftMax":[4,4,4,4,4,5],"rightMax":[0,5,5,5,5,5],"ans":0,"currentI":1,"phase2":"build_right"},{"lineNum":13,"codeLine":"rightMax[i]=max(rightMax[i+1],height[i])","phase":"check","description":"rightMax[0] = max(rightMax[1]=5, height[0]=4) = 5","height":[4,2,0,3,2,5],"leftMax":[4,4,4,4,4,5],"rightMax":[5,5,5,5,5,5],"ans":0,"currentI":0,"phase2":"build_right"},{"lineNum":15,"codeLine":"ans=sum(min(leftMax[i],rightMax[i])-height[i] for i in range(n))","phase":"record","description":"每格存水: [0, 2, 4, 1, 2, 0]，总计 ans = 9","height":[4,2,0,3,2,5],"leftMax":[4,4,4,4,4,5],"rightMax":[5,5,5,5,5,5],"ans":9,"waterPer":[0,2,4,1,2,0],"currentI":-1,"phase2":"result"}];

const phaseLabels = { init: '初始化', check: '检查', record: '记录' };

export default {
  title: '42. Trapping Rain Water',
  subtitle: 'height = [4, 2, 0, 3, 2, 5]',
  code, lineMap, steps, phaseLabels,

  setup(panel) {
    panel.innerHTML = `
      <div class="card">
        <div class="section-title">柱状图（灰色=柱体，蓝色=积水）</div>
        <div class="bar-chart-wrap" id="bar-chart"></div>
        <div class="legend-row" style="margin-top:8px">
          <div class="legend-item"><div class="legend-dot" style="background:#475569;border:1px solid #64748b"></div>柱体</div>
          <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.35);border:1px solid rgba(56,189,248,0.5)"></div>积水</div>
          <div class="legend-item"><div class="legend-dot" style="background:rgba(250,204,21,0.2);border:1px solid #facc15"></div>当前列</div>
        </div>
      </div>
      <div class="card">
        <div class="section-title">数组</div>
        <div id="array-rows" style="display:flex;flex-direction:column;gap:10px"></div>
      </div>
      <div class="card" id="ans-display" style="min-height:40px"></div>
    `;
  },

  render(s) {
    const n = HEIGHT.length;

    // ── Bar chart ──
    const barChart = document.getElementById('bar-chart');
    // Compute water per cell for display during result phase
    const waterPer = s.waterPer || HEIGHT.map(() => 0);
    // During build phases, compute partial water if leftMax and rightMax are both available
    const showWater = s.phase2 === 'result';

    let barsHtml = '';
    for (let i = 0; i < n; i++) {
      const h = HEIGHT[i];
      const solidH = Math.round((h / MAX_H) * CHART_H);
      const waterH = showWater ? Math.round((waterPer[i] / MAX_H) * CHART_H) : 0;
      const isActive = s.currentI === i;

      barsHtml += `<div class="bar-col${isActive ? ' is-active' : ''}" style="flex:1;min-width:0">
        <div class="bar-col-inner">
          <div class="bar-stack" style="height:${solidH + waterH}px">
            ${waterH > 0 ? `<div class="bar-water-trap" style="height:${waterH}px">${waterPer[i]}</div>` : ''}
            <div class="bar-solid" style="height:${solidH}px">${h}</div>
          </div>
          <div class="bar-col-idx">[${i}]</div>
        </div>
      </div>`;
    }
    barChart.innerHTML = barsHtml;

    // ── Array rows ──
    const arrayRows = document.getElementById('array-rows');
    let rowsHtml = '';

    // height row
    rowsHtml += `<div>
      <div style="font-size:12px;color:var(--text-muted);font-family:var(--font-mono);margin-bottom:4px">height</div>
      <div class="array-row">${HEIGHT.map((v, i) => {
        let cls = 'arr-cell height-cell';
        if (s.currentI === i) cls += ' is-active';
        return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${i}]</div></div>`;
      }).join('')}</div>
    </div>`;

    // leftMax row
    if (s.leftMax && s.leftMax.length > 0) {
      rowsHtml += `<div>
        <div style="font-size:12px;color:#fbbf24;font-family:var(--font-mono);margin-bottom:4px">leftMax</div>
        <div class="array-row">${s.leftMax.map((v, i) => {
          const filled = v !== 0 || (i === 0 && s.leftMax[0] !== undefined);
          // Mark as filled if this index has been computed
          const isFilled = (s.phase2 === 'init_leftmax' && i === 0) ||
            (s.phase2 === 'build_left' && i <= s.currentI) ||
            (s.phase2 !== 'init' && s.phase2 !== 'init_leftmax' && s.phase2 !== 'build_left');
          let cls = 'arr-cell';
          if (isFilled && (v !== 0 || filled)) cls += ' lm-filled';
          if (s.currentI === i && (s.phase2 === 'build_left')) cls += ' is-active';
          return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${i}]</div></div>`;
        }).join('')}</div>
      </div>`;
    }

    // rightMax row
    if (s.rightMax && s.rightMax.length > 0) {
      rowsHtml += `<div>
        <div style="font-size:12px;color:#38bdf8;font-family:var(--font-mono);margin-bottom:4px">rightMax</div>
        <div class="array-row">${s.rightMax.map((v, i) => {
          const isFilled = (s.phase2 === 'init_rightmax' && i === n - 1) ||
            (s.phase2 === 'build_right' && i >= s.currentI) ||
            (s.phase2 === 'result');
          let cls = 'arr-cell';
          if (isFilled && v !== 0) cls += ' rm-filled';
          if (s.currentI === i && (s.phase2 === 'build_right')) cls += ' is-active';
          return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${i}]</div></div>`;
        }).join('')}</div>
      </div>`;
    }

    arrayRows.innerHTML = rowsHtml;

    // ── Ans display ──
    const ansDisplay = document.getElementById('ans-display');
    if (s.phase2 === 'result') {
      const chips = waterPer.map((w, i) =>
        `<span style="display:inline-flex;align-items:center;justify-content:center;min-width:32px;height:26px;padding:0 8px;border-radius:4px;font-family:var(--font-mono);font-size:13px;font-weight:600;${w > 0 ? 'background:rgba(56,189,248,0.18);border:1px solid rgba(56,189,248,0.4);color:#7dd3fc' : 'background:var(--surface2);border:1px solid var(--border);color:var(--text-muted)'}">${w}</span>`
      ).join(' + ');

      ansDisplay.innerHTML = `
        <div class="section-title">计算结果</div>
        <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:6px">
          <span style="font-family:var(--font-mono);font-size:13px;color:var(--text-muted)">每格存水:</span>
          ${chips}
          <span style="font-family:var(--font-mono);font-size:13px;color:var(--text-muted)">=</span>
          <span style="font-family:var(--font-mono);font-size:20px;font-weight:800;color:#4ade80">${s.ans}</span>
        </div>
      `;
    } else {
      ansDisplay.innerHTML = `
        <div class="section-title">ans</div>
        <div style="font-size:36px;font-weight:800;text-align:center;font-family:var(--font-mono);color:var(--text-muted);line-height:48px">${s.ans}</div>
      `;
    }
  },
};
