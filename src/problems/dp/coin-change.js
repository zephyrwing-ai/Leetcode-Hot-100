let COINS = [1, 2, 5];
let AMOUNT = 11;

const code = [
  'class Solution:',
  '    def coinChange(self, coins, amount):',
  '        dp = [float("inf")] * (amount + 1)',
  '        dp[0] = 0',
  '        for i in range(1, amount + 1):',
  '            for coin in coins:',
  '                if coin <= i:',
  '                    dp[i] = min(dp[i], dp[i-coin] + 1)',
  '        return dp[amount] if dp[amount] != float("inf") else -1',
];

const lineMap = { 2: 1, 3: 2, 4: 3, 5: 4, 6: 5, 7: 6, 8: 7, 9: 8 };

const INF = Infinity;
const steps1 = [
  {
    lineNum: 3, phase: 'init',
    description: '初始化 dp 数组，dp[0]=0，其余为 Infinity',
    coins: [1, 2, 5], amount: 11, dp: [0, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF], currentI: -1, sources: [], bestCoin: null,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=1: 遍历硬币，coin=1 可用，dp[1]=dp[0]+1=1',
    coins: [1, 2, 5], amount: 11, dp: [0, 1, INF, INF, INF, INF, INF, INF, INF, INF, INF, INF], currentI: 1, sources: [0], bestCoin: 1,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=2: coin=1→dp[1]+1=2, coin=2→dp[0]+1=1, 取最小 dp[2]=1',
    coins: [1, 2, 5], amount: 11, dp: [0, 1, 1, INF, INF, INF, INF, INF, INF, INF, INF, INF], currentI: 2, sources: [0], bestCoin: 2,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=3: coin=1→2, coin=2→dp[1]+1=2, dp[3]=2',
    coins: [1, 2, 5], amount: 11, dp: [0, 1, 1, 2, INF, INF, INF, INF, INF, INF, INF, INF], currentI: 3, sources: [2, 1], bestCoin: 1,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=4: coin=1→3, coin=2→dp[2]+1=2, dp[4]=2',
    coins: [1, 2, 5], amount: 11, dp: [0, 1, 1, 2, 2, INF, INF, INF, INF, INF, INF, INF], currentI: 4, sources: [2], bestCoin: 2,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=5: coin=5→dp[0]+1=1，优于其他选择，dp[5]=1',
    coins: [1, 2, 5], amount: 11, dp: [0, 1, 1, 2, 2, 1, INF, INF, INF, INF, INF, INF], currentI: 5, sources: [0], bestCoin: 5,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=6: coin=1→2, coin=5→dp[1]+1=2, dp[6]=2',
    coins: [1, 2, 5], amount: 11, dp: [0, 1, 1, 2, 2, 1, 2, INF, INF, INF, INF, INF], currentI: 6, sources: [5, 1], bestCoin: 1,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=7: coin=2→dp[5]+1=2, coin=5→dp[2]+1=2, dp[7]=2',
    coins: [1, 2, 5], amount: 11, dp: [0, 1, 1, 2, 2, 1, 2, 2, INF, INF, INF, INF], currentI: 7, sources: [5, 2], bestCoin: 2,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=8: coin=1→3, coin=2→3, coin=5→dp[3]+1=3, dp[8]=3',
    coins: [1, 2, 5], amount: 11, dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, INF, INF, INF], currentI: 8, sources: [7, 6, 3], bestCoin: 1,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=9: coin=2→dp[7]+1=3, coin=5→dp[4]+1=3, dp[9]=3',
    coins: [1, 2, 5], amount: 11, dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, INF, INF], currentI: 9, sources: [7, 4], bestCoin: 2,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=10: coin=5→dp[5]+1=2，远优于其他，dp[10]=2',
    coins: [1, 2, 5], amount: 11, dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, INF], currentI: 10, sources: [5], bestCoin: 5,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=11: coin=1→dp[10]+1=3, coin=5→dp[6]+1=3, dp[11]=3',
    coins: [1, 2, 5], amount: 11, dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3], currentI: 11, sources: [10, 6], bestCoin: 1,
  },
  {
    lineNum: 9, phase: 'done',
    description: '返回 dp[11] = 3，最少需要 3 枚硬币（5+5+1）',
    coins: [1, 2, 5], amount: 11, dp: [0, 1, 1, 2, 2, 1, 2, 2, 3, 3, 2, 3], currentI: -1, sources: [], bestCoin: null,
  },
];

const steps2 = [
  {
    lineNum: 3, phase: 'init',
    description: '初始化 dp 数组，dp[0]=0，其余为 Infinity',
    coins: [2], amount: 3, dp: [0, INF, INF, INF], currentI: -1, sources: [], bestCoin: null,
  },
  {
    lineNum: 5, phase: 'fill',
    description: 'i=1: 遍历硬币，coin=2 > 1，无硬币可用',
    coins: [2], amount: 3, dp: [0, INF, INF, INF], currentI: 1, sources: [], bestCoin: null,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=1: 没有硬币满足 coin <= 1，dp[1] 保持 Infinity',
    coins: [2], amount: 3, dp: [0, INF, INF, INF], currentI: 1, sources: [], bestCoin: null,
  },
  {
    lineNum: 5, phase: 'fill',
    description: 'i=2: 遍历硬币，coin=2 <= 2，可以使用',
    coins: [2], amount: 3, dp: [0, INF, INF, INF], currentI: 2, sources: [0], bestCoin: null,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=2: coin=2→dp[0]+1=1, dp[2]=1',
    coins: [2], amount: 3, dp: [0, INF, 1, INF], currentI: 2, sources: [0], bestCoin: 2,
  },
  {
    lineNum: 5, phase: 'fill',
    description: 'i=3: 遍历硬币，coin=2 <= 3，可以使用',
    coins: [2], amount: 3, dp: [0, INF, 1, INF], currentI: 3, sources: [1], bestCoin: null,
  },
  {
    lineNum: 8, phase: 'fill',
    description: 'i=3: coin=2→dp[1]+1=Infinity+1=Infinity，dp[3] 保持 Infinity',
    coins: [2], amount: 3, dp: [0, INF, 1, INF], currentI: 3, sources: [1], bestCoin: null,
  },
  {
    lineNum: 9, phase: 'fill',
    description: '循环结束，检查 dp[3] 是否为 Infinity',
    coins: [2], amount: 3, dp: [0, INF, 1, INF], currentI: 3, sources: [], bestCoin: null,
  },
  {
    lineNum: 9, phase: 'done',
    description: 'dp[3] = Infinity，无法凑成金额 3，返回 -1',
    coins: [2], amount: 3, dp: [0, INF, 1, INF], currentI: -1, sources: [], bestCoin: null,
  },
];

const phaseLabels = { init: '初始化', fill: '填表', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">DP 数组（dp[i] = 凑成金额 i 的最少硬币数）</div>
      <div class="array-row" id="dp-array" style="flex-wrap:wrap"></div>
      <div class="legend-row">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(34,211,238,0.4);border:1px solid #22d3ee"></div>当前填充</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>来源参考</div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">硬币选择</div>
      <div id="coin-info" style="font-family:var(--font-mono);font-size:14px"></div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '322. Coin Change — 执行可视化',
  problemDesc: `
    <p>给你一个整数数组 <code>coins</code> 表示不同面额的硬币，以及一个整数 <code>amount</code> 表示总金额。计算凑成总金额所需的最少硬币个数。每种硬币可以使用无限次。如果无法凑成，返回 <code>-1</code>。</p>
    <div class="example">输入：coins = [1,2,5], amount = 11
输出：3
解释：11 = 5 + 5 + 1，最少需要 3 枚硬币</div>
  `,
  subtitle: `coins = [${COINS}], amount = ${AMOUNT}`,
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: 'coins=[1,2,5], amount=11', steps: steps1, subtitle: 'coins = [1, 2, 5], amount = 11' },
    { name: 'coins=[2], amount=3 → -1', steps: steps2, subtitle: 'coins = [2], amount = 3', setup(panel) { COINS = [2]; AMOUNT = 3; setupPanel(panel); } },
  ],
  setup: setupPanel,

  render(s) {
    const coins = s.coins || COINS;
    const amount = s.amount || AMOUNT;
    const dp = s.dp || [];
    document.getElementById('dp-array').innerHTML = dp.map((v, idx) => {
      let cls = 'arr-cell';
      if (idx === s.currentI) cls += ' current';
      if (s.sources.includes(idx)) cls += ' in-window';
      const display = v === Infinity ? '\u221e' : v;
      return `<div class="${cls}"><div class="arr-val">${display}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    const coinEl = document.getElementById('coin-info');
    if (s.bestCoin !== null && s.phase === 'fill') {
      coinEl.innerHTML = `<div>最优: 使用面值 <span style="color:#22d3ee;font-weight:700">${s.bestCoin}</span> 的硬币，dp[${s.currentI}] = dp[${s.currentI - s.bestCoin}] + 1 = ${dp[s.currentI]}</div>`;
    } else {
      coinEl.innerHTML = `<div style="color:var(--text-muted)">coins = [${coins}]，dp[i] = min(dp[i - coin] + 1)</div>`;
    }

    const foundEl = document.getElementById('found-area');
    if (s.phase === 'done') {
      const val = dp[amount];
      const isInf = val === Infinity;
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">${isInf ? '\u2717' : '\u2713'}</div>
        <div>
          <div class="found-text">${isInf ? '无法凑成，返回 -1' : `dp[${amount}] = ${val}`}</div>
          <div class="found-sub">${isInf ? `coins=[${coins}] 无法凑成金额 ${amount}` : `最少需要 ${val} 枚硬币`}</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
