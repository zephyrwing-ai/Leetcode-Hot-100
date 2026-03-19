let PRICES = [7, 1, 5, 3, 6, 4];

const code = [
  'class Solution:',
  '    def maxProfit(self, prices):',
  '        min_price = float("inf")',
  '        max_profit = 0',
  '        for price in prices:',
  '            if price < min_price:',
  '                min_price = price',
  '            elif price - min_price > max_profit:',
  '                max_profit = price - min_price',
  '        return max_profit',
];

const lineMap = { 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8, 10: 9 };

// ── Test Case 1: prices = [7,1,5,3,6,4] ──
const steps1 = [
  {
    lineNum: 3, phase: 'init',
    description: '初始化 min_price = Infinity, max_profit = 0',
    currentI: -1, currentPrice: null, minPrice: Infinity, maxProfit: 0, minIdx: -1, updated: null, prices: [7,1,5,3,6,4],
  },
  {
    lineNum: 5, phase: 'scan',
    description: '进入循环，遍历 i=0, price=7',
    currentI: 0, currentPrice: 7, minPrice: Infinity, maxProfit: 0, minIdx: -1, updated: null, prices: [7,1,5,3,6,4],
  },
  {
    lineNum: 7, phase: 'update',
    description: '7 < Infinity，更新 min_price = 7',
    currentI: 0, currentPrice: 7, minPrice: 7, maxProfit: 0, minIdx: 0, updated: 'min', prices: [7,1,5,3,6,4],
  },
  {
    lineNum: 5, phase: 'scan',
    description: '遍历 i=1, price=1',
    currentI: 1, currentPrice: 1, minPrice: 7, maxProfit: 0, minIdx: 0, updated: null, prices: [7,1,5,3,6,4],
  },
  {
    lineNum: 7, phase: 'update',
    description: '1 < 7，更新 min_price = 1',
    currentI: 1, currentPrice: 1, minPrice: 1, maxProfit: 0, minIdx: 1, updated: 'min', prices: [7,1,5,3,6,4],
  },
  {
    lineNum: 5, phase: 'scan',
    description: '遍历 i=2, price=5',
    currentI: 2, currentPrice: 5, minPrice: 1, maxProfit: 0, minIdx: 1, updated: null, prices: [7,1,5,3,6,4],
  },
  {
    lineNum: 8, phase: 'judge',
    description: '5 - 1 = 4 > 0，更新 max_profit = 4',
    currentI: 2, currentPrice: 5, minPrice: 1, maxProfit: 4, minIdx: 1, updated: 'profit', prices: [7,1,5,3,6,4],
  },
  {
    lineNum: 5, phase: 'scan',
    description: '遍历 i=3, price=3',
    currentI: 3, currentPrice: 3, minPrice: 1, maxProfit: 4, minIdx: 1, updated: null, prices: [7,1,5,3,6,4],
  },
  {
    lineNum: 8, phase: 'judge',
    description: '3 - 1 = 2，不大于 max_profit=4，不更新',
    currentI: 3, currentPrice: 3, minPrice: 1, maxProfit: 4, minIdx: 1, updated: null, prices: [7,1,5,3,6,4],
  },
  {
    lineNum: 5, phase: 'scan',
    description: '遍历 i=4, price=6',
    currentI: 4, currentPrice: 6, minPrice: 1, maxProfit: 4, minIdx: 1, updated: null, prices: [7,1,5,3,6,4],
  },
  {
    lineNum: 8, phase: 'update',
    description: '6 - 1 = 5 > 4，更新 max_profit = 5',
    currentI: 4, currentPrice: 6, minPrice: 1, maxProfit: 5, minIdx: 1, updated: 'profit', prices: [7,1,5,3,6,4],
  },
  {
    lineNum: 5, phase: 'scan',
    description: '遍历 i=5, price=4',
    currentI: 5, currentPrice: 4, minPrice: 1, maxProfit: 5, minIdx: 1, updated: null, prices: [7,1,5,3,6,4],
  },
  {
    lineNum: 8, phase: 'judge',
    description: '4 - 1 = 3，不大于 max_profit=5，不更新',
    currentI: 5, currentPrice: 4, minPrice: 1, maxProfit: 5, minIdx: 1, updated: null, prices: [7,1,5,3,6,4],
  },
  {
    lineNum: 10, phase: 'record',
    description: '遍历结束，返回 max_profit = 5',
    currentI: -1, currentPrice: null, minPrice: 1, maxProfit: 5, minIdx: 1, updated: null, prices: [7,1,5,3,6,4],
  },
];

// ── Test Case 2: prices = [7,6,4,3,1] → 0 ──
const steps2 = [
  {
    lineNum: 3, phase: 'init',
    description: '初始化 min_price = Infinity, max_profit = 0',
    currentI: -1, currentPrice: null, minPrice: Infinity, maxProfit: 0, minIdx: -1, updated: null, prices: [7,6,4,3,1],
  },
  {
    lineNum: 5, phase: 'scan',
    description: '进入循环，遍历 i=0, price=7',
    currentI: 0, currentPrice: 7, minPrice: Infinity, maxProfit: 0, minIdx: -1, updated: null, prices: [7,6,4,3,1],
  },
  {
    lineNum: 7, phase: 'update',
    description: '7 < Infinity，更新 min_price = 7',
    currentI: 0, currentPrice: 7, minPrice: 7, maxProfit: 0, minIdx: 0, updated: 'min', prices: [7,6,4,3,1],
  },
  {
    lineNum: 5, phase: 'scan',
    description: '遍历 i=1, price=6',
    currentI: 1, currentPrice: 6, minPrice: 7, maxProfit: 0, minIdx: 0, updated: null, prices: [7,6,4,3,1],
  },
  {
    lineNum: 7, phase: 'update',
    description: '6 < 7，更新 min_price = 6',
    currentI: 1, currentPrice: 6, minPrice: 6, maxProfit: 0, minIdx: 1, updated: 'min', prices: [7,6,4,3,1],
  },
  {
    lineNum: 5, phase: 'scan',
    description: '遍历 i=2, price=4',
    currentI: 2, currentPrice: 4, minPrice: 6, maxProfit: 0, minIdx: 1, updated: null, prices: [7,6,4,3,1],
  },
  {
    lineNum: 7, phase: 'update',
    description: '4 < 6，更新 min_price = 4',
    currentI: 2, currentPrice: 4, minPrice: 4, maxProfit: 0, minIdx: 2, updated: 'min', prices: [7,6,4,3,1],
  },
  {
    lineNum: 5, phase: 'scan',
    description: '遍历 i=3, price=3',
    currentI: 3, currentPrice: 3, minPrice: 4, maxProfit: 0, minIdx: 2, updated: null, prices: [7,6,4,3,1],
  },
  {
    lineNum: 7, phase: 'update',
    description: '3 < 4，更新 min_price = 3',
    currentI: 3, currentPrice: 3, minPrice: 3, maxProfit: 0, minIdx: 3, updated: 'min', prices: [7,6,4,3,1],
  },
  {
    lineNum: 5, phase: 'scan',
    description: '遍历 i=4, price=1',
    currentI: 4, currentPrice: 1, minPrice: 3, maxProfit: 0, minIdx: 3, updated: null, prices: [7,6,4,3,1],
  },
  {
    lineNum: 7, phase: 'update',
    description: '1 < 3，更新 min_price = 1，价格一直下跌',
    currentI: 4, currentPrice: 1, minPrice: 1, maxProfit: 0, minIdx: 4, updated: 'min', prices: [7,6,4,3,1],
  },
  {
    lineNum: 10, phase: 'record',
    description: '遍历结束，价格持续下跌，无法获利，返回 max_profit = 0',
    currentI: -1, currentPrice: null, minPrice: 1, maxProfit: 0, minIdx: 4, updated: null, prices: [7,6,4,3,1],
  },
];

const phaseLabels = { init: '初始化', scan: '扫描', update: '更新', judge: '判断', record: '返回' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">价格数组 prices（黄色 = 当前，绿色 = 最低价位置）</div>
      <div class="array-row" id="prices-array"></div>
      <div class="legend-row">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(250,204,21,0.4);border:1px solid #facc15"></div>当前遍历</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>最低价位置</div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">状态追踪</div>
      <div id="status-area" style="font-family:var(--font-mono);font-size:14px;display:flex;flex-direction:column;gap:8px"></div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '121. Best Time to Buy and Sell Stock',
  problemDesc: `
    <p>给定一个数组 <code>prices</code>，其中 <code>prices[i]</code> 是一支股票第 <code>i</code> 天的价格。你只能选择某一天买入，并在未来的某一天卖出。返回你能获得的最大利润。</p>
    <div class="example">输入：prices = [7,1,5,3,6,4]
输出：5
解释：在第 2 天买入（价格=1），第 5 天卖出（价格=6），利润 = 6-1 = 5</div>
    <p>如果无法获利，返回 0。</p>
  `,
  subtitle: `prices = [${PRICES}]`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: 'prices = [7,1,5,3,6,4]', steps: steps1, subtitle: 'prices = [7,1,5,3,6,4]' },
    {
      name: 'prices = [7,6,4,3,1]', steps: steps2, subtitle: 'prices = [7,6,4,3,1]',
      setup(panel) { PRICES = [7,6,4,3,1]; setupPanel(panel); }
    },
  ],

  setup: setupPanel,

  render(s) {
    const prices = s.prices || PRICES;
    // prices array
    document.getElementById('prices-array').innerHTML = prices.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.currentI) cls += ' is-active';
      if (idx === s.minIdx) cls += ' is-left';
      return `<div class="${cls}"><div class="arr-val">${v}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    // status
    const statusEl = document.getElementById('status-area');
    const minDisplay = s.minPrice === Infinity ? 'Infinity' : s.minPrice;
    const minColor = s.updated === 'min' ? '#4ade80' : 'var(--text)';
    const profitColor = s.updated === 'profit' ? '#4ade80' : 'var(--text)';
    statusEl.innerHTML = `
      <div>min_price = <span style="font-weight:700;color:${minColor}">${minDisplay}</span></div>
      <div>max_profit = <span style="font-weight:700;color:${profitColor}">${s.maxProfit}</span></div>
      ${s.currentPrice !== null ? `<div style="color:var(--text-muted)">当前 price = ${s.currentPrice}，差值 = ${s.minPrice === Infinity ? '-' : s.currentPrice - s.minPrice}</div>` : ''}
    `;

    // found
    const foundEl = document.getElementById('found-area');
    if (s.phase === 'record') {
      if (s.maxProfit > 0) {
        foundEl.innerHTML = `<div class="card found-box">
          <div class="found-icon">\u2713</div>
          <div>
            <div class="found-text">max_profit = ${s.maxProfit}</div>
            <div class="found-sub">在 prices[${s.minIdx}]=${prices[s.minIdx]} 买入，利润 = ${s.maxProfit}</div>
          </div>
        </div>`;
      } else {
        foundEl.innerHTML = `<div class="card found-box">
          <div class="found-icon">\u2713</div>
          <div>
            <div class="found-text">max_profit = 0</div>
            <div class="found-sub">价格持续下跌，无法获利</div>
          </div>
        </div>`;
      }
    } else {
      foundEl.innerHTML = '';
    }
  },
};
