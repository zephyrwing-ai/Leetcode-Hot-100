const HEIGHT = [1, 8, 6, 2, 5, 4, 8, 3, 7];
const MAX_H = 8;
const CHART_H = 160;

const code = [
  'class Solution:',
  '    def maxArea(self, height):',
  '        right=len(height)-1',
  '        left=0',
  '        s=0',
  '        for i in height:',
  '            if height[right]<height[left]:',
  '                s=max((right-left)*height[right],s)',
  '                right-=1',
  '            else:',
  '                s=max((right-left)*height[left],s)',
  '                left+=1',
  '        return s',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 11: 10, 12: 11, 13: 12 };

const steps = [{"lineNum":3,"codeLine":"right=len(height)-1","phase":"init","description":"初始化 left=0, right=8, s=0","height":[1,8,6,2,5,4,8,3,7],"left":0,"right":8,"s":0,"area":0,"moveSide":null},{"lineNum":7,"codeLine":"if height[right]<height[left]:","phase":"check","description":"height[right=8]=7 >= height[left=0]=1，以左边为短板","height":[1,8,6,2,5,4,8,3,7],"left":0,"right":8,"s":0,"area":8,"moveSide":"left"},{"lineNum":11,"codeLine":"s=max((right-left)*height[left],s)","phase":"record","description":"面积=(8-0)×1=8，s=max(8,8)=8，left 右移","height":[1,8,6,2,5,4,8,3,7],"left":0,"right":8,"s":8,"area":8,"moveSide":"left"},{"lineNum":7,"codeLine":"if height[right]<height[left]:","phase":"check","description":"height[right=8]=7 < height[left=1]=8，以右边为短板","height":[1,8,6,2,5,4,8,3,7],"left":1,"right":8,"s":8,"area":49,"moveSide":"right"},{"lineNum":8,"codeLine":"s=max((right-left)*height[right],s)","phase":"record","description":"面积=(8-1)×7=49，s=max(49,49)=49，right 左移","height":[1,8,6,2,5,4,8,3,7],"left":1,"right":8,"s":49,"area":49,"moveSide":"right"},{"lineNum":7,"codeLine":"if height[right]<height[left]:","phase":"check","description":"height[right=7]=3 < height[left=1]=8，以右边为短板","height":[1,8,6,2,5,4,8,3,7],"left":1,"right":7,"s":49,"area":18,"moveSide":"right"},{"lineNum":8,"codeLine":"s=max((right-left)*height[right],s)","phase":"check","description":"面积=(7-1)×3=18，s=max(18,80)=49，right 左移","height":[1,8,6,2,5,4,8,3,7],"left":1,"right":7,"s":49,"area":18,"moveSide":"right"},{"lineNum":7,"codeLine":"if height[right]<height[left]:","phase":"check","description":"height[right=6]=8 >= height[left=1]=8，以左边为短板","height":[1,8,6,2,5,4,8,3,7],"left":1,"right":6,"s":49,"area":40,"moveSide":"left"},{"lineNum":11,"codeLine":"s=max((right-left)*height[left],s)","phase":"check","description":"面积=(6-1)×8=40，s=max(40,49)=49，left 右移","height":[1,8,6,2,5,4,8,3,7],"left":1,"right":6,"s":49,"area":40,"moveSide":"left"},{"lineNum":7,"codeLine":"if height[right]<height[left]:","phase":"check","description":"height[right=6]=8 >= height[left=2]=6，以左边为短板","height":[1,8,6,2,5,4,8,3,7],"left":2,"right":6,"s":49,"area":24,"moveSide":"left"},{"lineNum":11,"codeLine":"s=max((right-left)*height[left],s)","phase":"check","description":"面积=(6-2)×6=24，s=max(24,49)=49，left 右移","height":[1,8,6,2,5,4,8,3,7],"left":2,"right":6,"s":49,"area":24,"moveSide":"left"},{"lineNum":7,"codeLine":"if height[right]<height[left]:","phase":"check","description":"height[right=6]=8 >= height[left=3]=2，以左边为短板","height":[1,8,6,2,5,4,8,3,7],"left":3,"right":6,"s":49,"area":6,"moveSide":"left"},{"lineNum":11,"codeLine":"s=max((right-left)*height[left],s)","phase":"check","description":"面积=(6-3)×2=6，s=max(6,49)=49，left 右移","height":[1,8,6,2,5,4,8,3,7],"left":3,"right":6,"s":49,"area":6,"moveSide":"left"},{"lineNum":7,"codeLine":"if height[right]<height[left]:","phase":"check","description":"height[right=6]=8 >= height[left=4]=5，以左边为短板","height":[1,8,6,2,5,4,8,3,7],"left":4,"right":6,"s":49,"area":10,"moveSide":"left"},{"lineNum":11,"codeLine":"s=max((right-left)*height[left],s)","phase":"check","description":"面积=(6-4)×5=10，s=max(10,49)=49，left 右移","height":[1,8,6,2,5,4,8,3,7],"left":4,"right":6,"s":49,"area":10,"moveSide":"left"},{"lineNum":7,"codeLine":"if height[right]<height[left]:","phase":"check","description":"height[right=6]=8 >= height[left=5]=4，以左边为短板","height":[1,8,6,2,5,4,8,3,7],"left":5,"right":6,"s":49,"area":4,"moveSide":"left"},{"lineNum":11,"codeLine":"s=max((right-left)*height[left],s)","phase":"check","description":"面积=(6-5)×4=4，s=max(4,49)=49，left 右移","height":[1,8,6,2,5,4,8,3,7],"left":5,"right":6,"s":49,"area":4,"moveSide":"left"},{"lineNum":13,"codeLine":"return s","phase":"record","description":"left=6 >= right=6，循环结束，最大面积 = 49","height":[1,8,6,2,5,4,8,3,7],"left":6,"right":6,"s":49,"area":49,"moveSide":null}];

const phaseLabels = { init: '初始化', check: '检查', record: '记录' };

export default {
  title: '11. Container With Most Water',
  subtitle: 'height = [1, 8, 6, 2, 5, 4, 8, 3, 7]',
  code, lineMap, steps, phaseLabels,

  setup(panel) {
    panel.innerHTML = `
      <div class="card">
        <div class="section-title">柱状图（绿 = left，蓝 = right）</div>
        <div class="bar-chart" id="bar-chart" style="display:flex;align-items:flex-end;gap:6px;height:${CHART_H}px;position:relative"></div>
        <div style="height:32px"></div>
        <div class="legend-row">
          <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>L (left)</div>
          <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>R (right)</div>
          <div class="legend-item"><div class="legend-dot" style="background:rgba(96,165,250,0.25);border:1px solid rgba(96,165,250,0.4)"></div>水面</div>
        </div>
      </div>
      <div class="card">
        <div id="area-info" style="font-size:14px;font-family:monospace;color:var(--text-muted)"></div>
        <div id="move-indicator" style="margin-top:8px;font-size:13px;font-family:monospace"></div>
      </div>
    `;
  },

  render(s) {
    const barChart = document.getElementById('bar-chart');
    const n = HEIGHT.length;
    const barWidth = Math.floor((barChart.clientWidth || 360) / n) - 6;

    // Determine water level between left and right
    const waterH = Math.min(HEIGHT[s.left] || 0, HEIGHT[s.right] || 0);

    let barsHtml = '';
    for (let i = 0; i < n; i++) {
      const h = HEIGHT[i];
      const barH = Math.round((h / MAX_H) * CHART_H);

      let color;
      if (i === s.left) color = '#4ade80';
      else if (i === s.right) color = '#38bdf8';
      else if (i > s.left && i < s.right) color = '#3d5068';
      else color = '#2d3d52';

      const label = i === s.left ? 'L' : i === s.right ? 'R' : '';
      const labelColor = i === s.left ? '#4ade80' : '#38bdf8';

      // Water overlay for bars between left and right (exclusive)
      let waterOverlay = '';
      if (i >= s.left && i <= s.right && s.left < s.right) {
        const wH = Math.round((waterH / MAX_H) * CHART_H);
        const barTopH = barH;
        // Only show water up to the bar height or water level, whichever is smaller
        if (wH > 0) {
          const waterFillH = Math.min(wH, barTopH);
          const waterAboveBar = wH > barTopH ? wH - barTopH : 0;
          waterOverlay = `<div style="position:absolute;bottom:0;left:0;right:0;height:${waterFillH}px;background:rgba(96,165,250,0.15);pointer-events:none"></div>`;
          if (waterAboveBar > 0) {
            waterOverlay += `<div style="position:absolute;bottom:${barTopH}px;left:0;right:0;height:${waterAboveBar}px;background:rgba(96,165,250,0.25);pointer-events:none"></div>`;
          }
        }
      }

      barsHtml += `<div style="display:flex;flex-direction:column;align-items:center;flex:1;min-width:0;position:relative">
        <div style="position:relative;width:100%;max-width:${barWidth}px;height:${barH}px;background:${color};border-radius:3px 3px 0 0;transition:all 0.3s">
          ${waterOverlay}
          <div style="position:absolute;top:-18px;left:50%;transform:translateX(-50%);font-size:12px;color:${color};font-weight:600">${h}</div>
        </div>
        <div style="font-size:11px;color:var(--text-muted);margin-top:4px">[${i}]</div>
        ${label ? `<div style="font-size:11px;font-weight:700;color:${labelColor};margin-top:2px">${label}</div>` : '<div style="height:17px"></div>'}
      </div>`;
    }
    barChart.innerHTML = barsHtml;

    // Area info
    const areaInfo = document.getElementById('area-info');
    if (s.left < s.right) {
      const minH = Math.min(HEIGHT[s.left], HEIGHT[s.right]);
      const width = s.right - s.left;
      areaInfo.innerHTML = `
        <div>当前面积 = <span style="color:#60a5fa">(${s.right} - ${s.left})</span> × <span style="color:#f59e0b">min(${HEIGHT[s.left]}, ${HEIGHT[s.right]})</span> = <span style="color:#60a5fa">${width}</span> × <span style="color:#f59e0b">${minH}</span> = <b style="color:#e2e8f0">${s.area}</b></div>
        <div style="margin-top:4px">最大面积 s = <b style="color:${s.s === s.area && s.area > 0 ? '#4ade80' : '#e2e8f0'}">${s.s}</b></div>
      `;
    } else {
      areaInfo.innerHTML = `<div>循环结束，最大面积 = <b style="color:#4ade80;font-size:16px">${s.s}</b></div>`;
    }

    // Move indicator
    const moveEl = document.getElementById('move-indicator');
    if (s.moveSide === 'left') {
      moveEl.innerHTML = '<span style="color:#4ade80;font-weight:600">left 为短板 → left 右移</span>';
    } else if (s.moveSide === 'right') {
      moveEl.innerHTML = '<span style="color:#38bdf8;font-weight:600">right 为短板 → right 左移</span>';
    } else if (s.left >= s.right) {
      moveEl.innerHTML = '<span style="color:#4ade80;font-weight:600">left >= right，算法结束</span>';
    } else {
      moveEl.innerHTML = '';
    }
  },
};
