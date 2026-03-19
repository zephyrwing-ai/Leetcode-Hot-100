let HEIGHT = [4, 2, 0, 3, 2, 5];
let MAX_H = 5;
const CHART_H = 140;

const code = [
  { text: 'class Solution:' },
  { text: '    def trap(self, height):' },
  { text: '        if not height:' },
  { text: '            return 0' },
  { text: '        n = len(height)' },
  { text: '' },
  { text: '        leftMax = [height[0]] + (n-1)*[0]' },
  { text: '        for i in range(1, n):' },
  { text: '            leftMax[i] = max(leftMax[i-1], height[i])' },
  { text: '' },
  { text: '        rightMax = (n-1)*[0] + [height[n-1]]' },
  { text: '        for i in range(n-2, -1, -1):' },
  { text: '            rightMax[i] = max(rightMax[i+1], height[i])' },
  { text: '' },
  { text: '        ans = sum(min(leftMax[i],rightMax[i])-height[i] for i in range(n))' },
  { text: '' },
  { text: '        return ans' },
];

const lineMap = { 5: 4, 7: 6, 9: 8, 11: 10, 13: 12, 15: 14, 17: 16 };

// ── Test Case 1: height = [4,2,0,3,2,5] ──
const steps1 = [
  { lineNum: 5, codeLine: 'n=len(height)', phase: 'init', description: '输入 height = [4, 2, 0, 3, 2, 5]，n = 6', height: [4,2,0,3,2,5], leftMax: [], rightMax: [], ans: 0, currentI: -1, phase2: 'init' },
  { lineNum: 7, codeLine: 'leftMax=[height[0]]+(n-1)*[0]', phase: 'init', description: '初始化 leftMax，首元素为 height[0]=4，其余为 0', height: [4,2,0,3,2,5], leftMax: [4,0,0,0,0,0], rightMax: [], ans: 0, currentI: -1, phase2: 'init_leftmax' },
  { lineNum: 9, codeLine: 'leftMax[i]=max(leftMax[i-1],height[i])', phase: 'check', description: 'i=1: leftMax[1] = max(leftMax[0]=4, height[1]=2) = 4', height: [4,2,0,3,2,5], leftMax: [4,4,0,0,0,0], rightMax: [], ans: 0, currentI: 1, phase2: 'build_left' },
  { lineNum: 9, codeLine: 'leftMax[i]=max(leftMax[i-1],height[i])', phase: 'check', description: 'i=2: leftMax[2] = max(leftMax[1]=4, height[2]=0) = 4', height: [4,2,0,3,2,5], leftMax: [4,4,4,0,0,0], rightMax: [], ans: 0, currentI: 2, phase2: 'build_left' },
  { lineNum: 9, codeLine: 'leftMax[i]=max(leftMax[i-1],height[i])', phase: 'check', description: 'i=3: leftMax[3] = max(leftMax[2]=4, height[3]=3) = 4', height: [4,2,0,3,2,5], leftMax: [4,4,4,4,0,0], rightMax: [], ans: 0, currentI: 3, phase2: 'build_left' },
  { lineNum: 9, codeLine: 'leftMax[i]=max(leftMax[i-1],height[i])', phase: 'check', description: 'i=4: leftMax[4] = max(leftMax[3]=4, height[4]=2) = 4', height: [4,2,0,3,2,5], leftMax: [4,4,4,4,4,0], rightMax: [], ans: 0, currentI: 4, phase2: 'build_left' },
  { lineNum: 9, codeLine: 'leftMax[i]=max(leftMax[i-1],height[i])', phase: 'check', description: 'i=5: leftMax[5] = max(leftMax[4]=4, height[5]=5) = 5', height: [4,2,0,3,2,5], leftMax: [4,4,4,4,4,5], rightMax: [], ans: 0, currentI: 5, phase2: 'build_left' },
  { lineNum: 11, codeLine: 'rightMax=(n-1)*[0]+[height[n-1]]', phase: 'init', description: '初始化 rightMax，末元素为 height[5]=5，其余为 0', height: [4,2,0,3,2,5], leftMax: [4,4,4,4,4,5], rightMax: [0,0,0,0,0,5], ans: 0, currentI: -1, phase2: 'init_rightmax' },
  { lineNum: 13, codeLine: 'rightMax[i]=max(rightMax[i+1],height[i])', phase: 'check', description: 'i=4: rightMax[4] = max(rightMax[5]=5, height[4]=2) = 5', height: [4,2,0,3,2,5], leftMax: [4,4,4,4,4,5], rightMax: [0,0,0,0,5,5], ans: 0, currentI: 4, phase2: 'build_right' },
  { lineNum: 13, codeLine: 'rightMax[i]=max(rightMax[i+1],height[i])', phase: 'check', description: 'i=3: rightMax[3] = max(rightMax[4]=5, height[3]=3) = 5', height: [4,2,0,3,2,5], leftMax: [4,4,4,4,4,5], rightMax: [0,0,0,5,5,5], ans: 0, currentI: 3, phase2: 'build_right' },
  { lineNum: 13, codeLine: 'rightMax[i]=max(rightMax[i+1],height[i])', phase: 'check', description: 'i=2: rightMax[2] = max(rightMax[3]=5, height[2]=0) = 5', height: [4,2,0,3,2,5], leftMax: [4,4,4,4,4,5], rightMax: [0,0,5,5,5,5], ans: 0, currentI: 2, phase2: 'build_right' },
  { lineNum: 13, codeLine: 'rightMax[i]=max(rightMax[i+1],height[i])', phase: 'check', description: 'i=1: rightMax[1] = max(rightMax[2]=5, height[1]=2) = 5', height: [4,2,0,3,2,5], leftMax: [4,4,4,4,4,5], rightMax: [0,5,5,5,5,5], ans: 0, currentI: 1, phase2: 'build_right' },
  { lineNum: 13, codeLine: 'rightMax[i]=max(rightMax[i+1],height[i])', phase: 'check', description: 'i=0: rightMax[0] = max(rightMax[1]=5, height[0]=4) = 5', height: [4,2,0,3,2,5], leftMax: [4,4,4,4,4,5], rightMax: [5,5,5,5,5,5], ans: 0, currentI: 0, phase2: 'build_right' },
  { lineNum: 15, codeLine: 'ans=sum(...)', phase: 'record', description: '每格存水: [0, 2, 4, 1, 2, 0]，总计 ans = 9', height: [4,2,0,3,2,5], leftMax: [4,4,4,4,4,5], rightMax: [5,5,5,5,5,5], ans: 9, waterPer: [0,2,4,1,2,0], currentI: -1, phase2: 'result' },
];

// ── Test Case 2: height = [0,1,0,2,1,0,1,3,2,1,2,1] ──
const steps2 = [
  { lineNum: 5, codeLine: 'n=len(height)', phase: 'init', description: '输入 height = [0,1,0,2,1,0,1,3,2,1,2,1]，n = 12', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [], rightMax: [], ans: 0, currentI: -1, phase2: 'init' },
  { lineNum: 7, codeLine: 'leftMax=[height[0]]+(n-1)*[0]', phase: 'init', description: '初始化 leftMax，首元素为 height[0]=0，其余为 0', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [0,0,0,0,0,0,0,0,0,0,0,0], rightMax: [], ans: 0, currentI: -1, phase2: 'init_leftmax' },
  { lineNum: 9, codeLine: 'leftMax[i]=max(leftMax[i-1],height[i])', phase: 'check', description: 'i=1: leftMax[1] = max(0, 1) = 1', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [0,1,0,0,0,0,0,0,0,0,0,0], rightMax: [], ans: 0, currentI: 1, phase2: 'build_left' },
  { lineNum: 9, codeLine: 'leftMax[i]=max(leftMax[i-1],height[i])', phase: 'check', description: 'i=2: leftMax[2] = max(1, 0) = 1', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [0,1,1,0,0,0,0,0,0,0,0,0], rightMax: [], ans: 0, currentI: 2, phase2: 'build_left' },
  { lineNum: 9, codeLine: 'leftMax[i]=max(leftMax[i-1],height[i])', phase: 'check', description: 'i=3: leftMax[3] = max(1, 2) = 2', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [0,1,1,2,0,0,0,0,0,0,0,0], rightMax: [], ans: 0, currentI: 3, phase2: 'build_left' },
  { lineNum: 9, codeLine: 'leftMax[i]=max(leftMax[i-1],height[i])', phase: 'check', description: 'i=4: leftMax[4] = max(2, 1) = 2', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [0,1,1,2,2,0,0,0,0,0,0,0], rightMax: [], ans: 0, currentI: 4, phase2: 'build_left' },
  { lineNum: 9, codeLine: 'leftMax[i]=max(leftMax[i-1],height[i])', phase: 'check', description: 'i=5: leftMax[5] = max(2, 0) = 2', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [0,1,1,2,2,2,0,0,0,0,0,0], rightMax: [], ans: 0, currentI: 5, phase2: 'build_left' },
  { lineNum: 9, codeLine: 'leftMax[i]=max(leftMax[i-1],height[i])', phase: 'check', description: 'i=6: leftMax[6] = max(2, 1) = 2', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [0,1,1,2,2,2,2,0,0,0,0,0], rightMax: [], ans: 0, currentI: 6, phase2: 'build_left' },
  { lineNum: 9, codeLine: 'leftMax[i]=max(leftMax[i-1],height[i])', phase: 'check', description: 'i=7: leftMax[7] = max(2, 3) = 3', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [0,1,1,2,2,2,2,3,0,0,0,0], rightMax: [], ans: 0, currentI: 7, phase2: 'build_left' },
  { lineNum: 9, codeLine: 'leftMax[i]=max(leftMax[i-1],height[i])', phase: 'check', description: 'i=8: leftMax[8] = max(3, 2) = 3', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [0,1,1,2,2,2,2,3,3,0,0,0], rightMax: [], ans: 0, currentI: 8, phase2: 'build_left' },
  { lineNum: 9, codeLine: 'leftMax[i]=max(leftMax[i-1],height[i])', phase: 'check', description: 'i=9: leftMax[9] = max(3, 1) = 3', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [0,1,1,2,2,2,2,3,3,3,0,0], rightMax: [], ans: 0, currentI: 9, phase2: 'build_left' },
  { lineNum: 9, codeLine: 'leftMax[i]=max(leftMax[i-1],height[i])', phase: 'check', description: 'i=10: leftMax[10] = max(3, 2) = 3', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [0,1,1,2,2,2,2,3,3,3,3,0], rightMax: [], ans: 0, currentI: 10, phase2: 'build_left' },
  { lineNum: 9, codeLine: 'leftMax[i]=max(leftMax[i-1],height[i])', phase: 'check', description: 'i=11: leftMax[11] = max(3, 1) = 3', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [0,1,1,2,2,2,2,3,3,3,3,3], rightMax: [], ans: 0, currentI: 11, phase2: 'build_left' },
  { lineNum: 11, codeLine: 'rightMax=(n-1)*[0]+[height[n-1]]', phase: 'init', description: '初始化 rightMax，末元素为 height[11]=1，其余为 0', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [0,1,1,2,2,2,2,3,3,3,3,3], rightMax: [0,0,0,0,0,0,0,0,0,0,0,1], ans: 0, currentI: -1, phase2: 'init_rightmax' },
  { lineNum: 13, codeLine: 'rightMax[i]=max(rightMax[i+1],height[i])', phase: 'check', description: 'i=10: rightMax[10] = max(1, 2) = 2', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [0,1,1,2,2,2,2,3,3,3,3,3], rightMax: [0,0,0,0,0,0,0,0,0,0,2,1], ans: 0, currentI: 10, phase2: 'build_right' },
  { lineNum: 13, codeLine: 'rightMax[i]=max(rightMax[i+1],height[i])', phase: 'check', description: 'i=9: rightMax[9] = max(2, 1) = 2', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [0,1,1,2,2,2,2,3,3,3,3,3], rightMax: [0,0,0,0,0,0,0,0,0,2,2,1], ans: 0, currentI: 9, phase2: 'build_right' },
  { lineNum: 13, codeLine: 'rightMax[i]=max(rightMax[i+1],height[i])', phase: 'check', description: 'i=8: rightMax[8] = max(2, 2) = 2', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [0,1,1,2,2,2,2,3,3,3,3,3], rightMax: [0,0,0,0,0,0,0,0,2,2,2,1], ans: 0, currentI: 8, phase2: 'build_right' },
  { lineNum: 13, codeLine: 'rightMax[i]=max(rightMax[i+1],height[i])', phase: 'check', description: 'i=7: rightMax[7] = max(2, 3) = 3', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [0,1,1,2,2,2,2,3,3,3,3,3], rightMax: [0,0,0,0,0,0,0,3,2,2,2,1], ans: 0, currentI: 7, phase2: 'build_right' },
  { lineNum: 13, codeLine: 'rightMax[i]=max(rightMax[i+1],height[i])', phase: 'check', description: 'i=6: rightMax[6] = max(3, 1) = 3', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [0,1,1,2,2,2,2,3,3,3,3,3], rightMax: [0,0,0,0,0,0,3,3,2,2,2,1], ans: 0, currentI: 6, phase2: 'build_right' },
  { lineNum: 13, codeLine: 'rightMax[i]=max(rightMax[i+1],height[i])', phase: 'check', description: 'i=5: rightMax[5] = max(3, 0) = 3', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [0,1,1,2,2,2,2,3,3,3,3,3], rightMax: [0,0,0,0,0,3,3,3,2,2,2,1], ans: 0, currentI: 5, phase2: 'build_right' },
  { lineNum: 13, codeLine: 'rightMax[i]=max(rightMax[i+1],height[i])', phase: 'check', description: 'i=4: rightMax[4] = max(3, 1) = 3', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [0,1,1,2,2,2,2,3,3,3,3,3], rightMax: [0,0,0,0,3,3,3,3,2,2,2,1], ans: 0, currentI: 4, phase2: 'build_right' },
  { lineNum: 13, codeLine: 'rightMax[i]=max(rightMax[i+1],height[i])', phase: 'check', description: 'i=3: rightMax[3] = max(3, 2) = 3', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [0,1,1,2,2,2,2,3,3,3,3,3], rightMax: [0,0,0,3,3,3,3,3,2,2,2,1], ans: 0, currentI: 3, phase2: 'build_right' },
  { lineNum: 13, codeLine: 'rightMax[i]=max(rightMax[i+1],height[i])', phase: 'check', description: 'i=2: rightMax[2] = max(3, 0) = 3', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [0,1,1,2,2,2,2,3,3,3,3,3], rightMax: [0,0,3,3,3,3,3,3,2,2,2,1], ans: 0, currentI: 2, phase2: 'build_right' },
  { lineNum: 13, codeLine: 'rightMax[i]=max(rightMax[i+1],height[i])', phase: 'check', description: 'i=1: rightMax[1] = max(3, 1) = 3', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [0,1,1,2,2,2,2,3,3,3,3,3], rightMax: [0,3,3,3,3,3,3,3,2,2,2,1], ans: 0, currentI: 1, phase2: 'build_right' },
  { lineNum: 13, codeLine: 'rightMax[i]=max(rightMax[i+1],height[i])', phase: 'check', description: 'i=0: rightMax[0] = max(3, 0) = 3', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [0,1,1,2,2,2,2,3,3,3,3,3], rightMax: [3,3,3,3,3,3,3,3,2,2,2,1], ans: 0, currentI: 0, phase2: 'build_right' },
  { lineNum: 15, codeLine: 'ans=sum(...)', phase: 'record', description: '每格存水: [0,0,1,0,1,2,1,0,0,1,0,0]，总计 ans = 6', height: [0,1,0,2,1,0,1,3,2,1,2,1], leftMax: [0,1,1,2,2,2,2,3,3,3,3,3], rightMax: [3,3,3,3,3,3,3,3,2,2,2,1], ans: 6, waterPer: [0,0,1,0,1,2,1,0,0,1,0,0], currentI: -1, phase2: 'result' },
];

const phaseLabels = { init: '初始化', check: '检查', record: '记录' };

function setupPanel(panel) {
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
}

export default {
  title: '42. Trapping Rain Water',
  problemDesc: `
    <p>给定 <code>n</code> 个非负整数表示每个宽度为 1 的柱子的高度图，计算按此排列的柱子，下雨之后能接多少雨水。</p>
    <div class="example">输入：height = [0,1,0,2,1,0,1,3,2,1,2,1]
输出：6
解释：上面的高度图中，可以接 6 个单位的雨水。</div>
    <p><strong>提示：</strong><code>n >= 1</code>，<code>0 <= height[i] <= 10^5</code>。</p>
  `,
  subtitle: `height = [${HEIGHT}]`,
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'height = [4,2,0,3,2,5]', steps: steps1, subtitle: 'height = [4,2,0,3,2,5]' },
    {
      name: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]', steps: steps2, subtitle: 'height = [0,1,0,2,1,0,1,3,2,1,2,1]',
      setup(panel) { HEIGHT = [0,1,0,2,1,0,1,3,2,1,2,1]; MAX_H = 3; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    const height = s.height || HEIGHT;
    const maxH = Math.max(...height);
    const n = height.length;

    // ── Bar chart ──
    const barChart = document.getElementById('bar-chart');
    const waterPer = s.waterPer || height.map(() => 0);
    const showWater = s.phase2 === 'result';

    let barsHtml = '';
    for (let i = 0; i < n; i++) {
      const h = height[i];
      const solidH = Math.round((h / (maxH || 1)) * CHART_H);
      const waterH = showWater ? Math.round((waterPer[i] / (maxH || 1)) * CHART_H) : 0;
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
      <div class="array-row">${height.map((v, i) => {
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
