let BOARD_N = 4;

const code = [
  'class Solution:',
  '    def solveNQueens(self, n):',
  '        result = []',
  '        board = [["."]*n for _ in range(n)]',
  '        def backtrack(row):',
  '            if row == n:',
  '                result.append(["".join(r) for r in board])',
  '                return',
  '            for col in range(n):',
  '                if is_valid(row, col):',
  '                    board[row][col] = "Q"',
  '                    backtrack(row + 1)',
  '                    board[row][col] = "."',
  '        def is_valid(row, col):',
  '            # check column, diagonals',
  '            ...',
  '        backtrack(0)',
  '        return result',
];

const lineMap = { 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 10, 11: 11, 12: 12, 13: 13, 16: 16 };

// n=4: solution 1: [1,3,0,2], solution 2: [2,0,3,1]
const steps1 = [
  { lineNum: 2, phase: 'init', description: '初始化 n=4，空棋盘，result=[]', queens: [], row: 0, col: -1, n: 4, result: [], action: null, conflict: null },
  { lineNum: 16, phase: 'init', description: '调用 backtrack(0)，从第0行开始放置皇后', queens: [], row: 0, col: -1, n: 4, result: [], action: null, conflict: null },
  { lineNum: 8, phase: 'explore', description: 'row=0, col=0: 检查位置 (0,0)，有效，放置皇后', queens: [[0,0]], row: 0, col: 0, n: 4, result: [], action: 'place', conflict: null },
  { lineNum: 9, phase: 'explore', description: 'row=1, col=0: 检查 (1,0)，与 (0,0) 同列，冲突', queens: [[0,0]], row: 1, col: 0, n: 4, result: [], action: 'reject', conflict: [0,0] },
  { lineNum: 9, phase: 'explore', description: 'row=1, col=1: 检查 (1,1)，与 (0,0) 对角线冲突', queens: [[0,0]], row: 1, col: 1, n: 4, result: [], action: 'reject', conflict: [0,0] },
  { lineNum: 8, phase: 'explore', description: 'row=1, col=2: 检查 (1,2)，有效，放置皇后', queens: [[0,0],[1,2]], row: 1, col: 2, n: 4, result: [], action: 'place', conflict: null },
  { lineNum: 9, phase: 'explore', description: 'row=2, col=0: 与 (0,0) 同列冲突', queens: [[0,0],[1,2]], row: 2, col: 0, n: 4, result: [], action: 'reject', conflict: [0,0] },
  { lineNum: 9, phase: 'explore', description: 'row=2, col=1: 与 (1,2) 对角线冲突', queens: [[0,0],[1,2]], row: 2, col: 1, n: 4, result: [], action: 'reject', conflict: [1,2] },
  { lineNum: 9, phase: 'explore', description: 'row=2, col=2: 与 (1,2) 同列冲突', queens: [[0,0],[1,2]], row: 2, col: 2, n: 4, result: [], action: 'reject', conflict: [1,2] },
  { lineNum: 9, phase: 'explore', description: 'row=2, col=3: 与 (1,2) 对角线冲突', queens: [[0,0],[1,2]], row: 2, col: 3, n: 4, result: [], action: 'reject', conflict: [1,2] },
  { lineNum: 12, phase: 'backtrack', description: '回溯：移除 row=1 的皇后，尝试 col=3', queens: [[0,0]], row: 1, col: 2, n: 4, result: [], action: 'undo', conflict: null },
  { lineNum: 8, phase: 'explore', description: 'row=1, col=3: 检查 (1,3)，有效，放置皇后', queens: [[0,0],[1,3]], row: 1, col: 3, n: 4, result: [], action: 'place', conflict: null },
  { lineNum: 9, phase: 'explore', description: 'row=2, col=1: 检查 (2,1)，有效，放置皇后', queens: [[0,0],[1,3],[2,1]], row: 2, col: 1, n: 4, result: [], action: 'place', conflict: null },
  { lineNum: 9, phase: 'explore', description: 'row=3: 所有列都冲突，无法放置', queens: [[0,0],[1,3],[2,1]], row: 3, col: -1, n: 4, result: [], action: 'reject', conflict: null },
  { lineNum: 12, phase: 'backtrack', description: '回溯：移除 row=2 和 row=1 的皇后，回到 row=0', queens: [[0,0]], row: 0, col: 0, n: 4, result: [], action: 'undo', conflict: null },
  { lineNum: 12, phase: 'backtrack', description: '移除 row=0 的皇后，尝试 col=1', queens: [], row: 0, col: 0, n: 4, result: [], action: 'undo', conflict: null },
  { lineNum: 8, phase: 'explore', description: 'row=0, col=1: 放置皇后在 (0,1)', queens: [[0,1]], row: 0, col: 1, n: 4, result: [], action: 'place', conflict: null },
  { lineNum: 8, phase: 'explore', description: 'row=1, col=3: 有效，放置皇后', queens: [[0,1],[1,3]], row: 1, col: 3, n: 4, result: [], action: 'place', conflict: null },
  { lineNum: 8, phase: 'explore', description: 'row=2, col=0: 有效，放置皇后', queens: [[0,1],[1,3],[2,0]], row: 2, col: 0, n: 4, result: [], action: 'place', conflict: null },
  { lineNum: 8, phase: 'explore', description: 'row=3, col=2: 有效，放置皇后', queens: [[0,1],[1,3],[2,0],[3,2]], row: 3, col: 2, n: 4, result: [], action: 'place', conflict: null },
  { lineNum: 6, phase: 'record', description: 'row=4==n，找到第一个解！记录 [".Q..","...Q","Q...","..Q."]', queens: [[0,1],[1,3],[2,0],[3,2]], row: 4, col: -1, n: 4, result: [['.Q..','...Q','Q...','..Q.']], action: 'record', conflict: null },
  { lineNum: 12, phase: 'backtrack', description: '回溯继续搜索...寻找第二个解', queens: [[0,1],[1,3],[2,0]], row: 3, col: 2, n: 4, result: [['.Q..','...Q','Q...','..Q.']], action: 'undo', conflict: null },
  { lineNum: 8, phase: 'explore', description: '经过多次回溯，找到 row=0,col=2 开始的解', queens: [[0,2],[1,0],[2,3],[3,1]], row: 3, col: 1, n: 4, result: [['.Q..','...Q','Q...','..Q.']], action: 'place', conflict: null },
  { lineNum: 6, phase: 'record', description: '找到第二个解！记录 ["..Q.","Q...","...Q",".Q.."]', queens: [[0,2],[1,0],[2,3],[3,1]], row: 4, col: -1, n: 4, result: [['.Q..','...Q','Q...','..Q.'],['..Q.','Q...','...Q','.Q..']], action: 'record', conflict: null },
  { lineNum: 16, phase: 'done', description: '回溯完成，共找到 2 个解', queens: [], row: -1, col: -1, n: 4, result: [['.Q..','...Q','Q...','..Q.'],['..Q.','Q...','...Q','.Q..']], action: null, conflict: null },
];

// Test case 2: n=5, first solution only [0,2,4,1,3]
const steps2 = [
  { lineNum: 2, phase: 'init', description: '初始化 n=5，空棋盘，result=[]', queens: [], row: 0, col: -1, n: 5, result: [], action: null, conflict: null },
  { lineNum: 16, phase: 'init', description: '调用 backtrack(0)，从第0行开始', queens: [], row: 0, col: -1, n: 5, result: [], action: null, conflict: null },
  { lineNum: 8, phase: 'explore', description: 'row=0, col=0: 放置皇后在 (0,0)', queens: [[0,0]], row: 0, col: 0, n: 5, result: [], action: 'place', conflict: null },
  { lineNum: 8, phase: 'explore', description: 'row=1, col=2: 有效，放置皇后', queens: [[0,0],[1,2]], row: 1, col: 2, n: 5, result: [], action: 'place', conflict: null },
  { lineNum: 8, phase: 'explore', description: 'row=2, col=4: 有效，放置皇后', queens: [[0,0],[1,2],[2,4]], row: 2, col: 4, n: 5, result: [], action: 'place', conflict: null },
  { lineNum: 8, phase: 'explore', description: 'row=3, col=1: 有效，放置皇后', queens: [[0,0],[1,2],[2,4],[3,1]], row: 3, col: 1, n: 5, result: [], action: 'place', conflict: null },
  { lineNum: 8, phase: 'explore', description: 'row=4, col=3: 有效，放置皇后', queens: [[0,0],[1,2],[2,4],[3,1],[4,3]], row: 4, col: 3, n: 5, result: [], action: 'place', conflict: null },
  { lineNum: 6, phase: 'record', description: 'row=5==n，找到第一个解！', queens: [[0,0],[1,2],[2,4],[3,1],[4,3]], row: 5, col: -1, n: 5, result: [['Q....','..Q..','....Q','.Q...','...Q.']], action: 'record', conflict: null },
  { lineNum: 12, phase: 'backtrack', description: '回溯继续搜索更多解...', queens: [[0,0],[1,2],[2,4],[3,1]], row: 4, col: 3, n: 5, result: [['Q....','..Q..','....Q','.Q...','...Q.']], action: 'undo', conflict: null },
  { lineNum: 8, phase: 'explore', description: '尝试不同放置：(0,0),(1,3),(2,1),(3,4),(4,2)', queens: [[0,0],[1,3],[2,1],[3,4],[4,2]], row: 4, col: 2, n: 5, result: [['Q....','..Q..','....Q','.Q...','...Q.']], action: 'place', conflict: null },
  { lineNum: 6, phase: 'record', description: '找到第二个解！', queens: [[0,0],[1,3],[2,1],[3,4],[4,2]], row: 5, col: -1, n: 5, result: [['Q....','..Q..','....Q','.Q...','...Q.'],['Q....','...Q.','.Q...','....Q','..Q..']], action: 'record', conflict: null },
  { lineNum: 16, phase: 'done', description: '展示前两个解，n=5 共有 10 个解', queens: [], row: -1, col: -1, n: 5, result: [['Q....','..Q..','....Q','.Q...','...Q.'],['Q....','...Q.','.Q...','....Q','..Q..']], action: null, conflict: null },
];

const phaseLabels = { init: '初始化', explore: '探索', backtrack: '回溯', record: '找到解', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">棋盘（放置皇后）</div>
      <div id="board-grid"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>皇后</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(56,189,248,0.4);border:1px solid #38bdf8"></div>当前尝试</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(248,113,113,0.4);border:1px solid #f87171"></div>冲突</div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">已找到的解 result</div>
      <div id="result-area" style="font-family:var(--font-mono);font-size:13px"></div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '51. N-Queens — 执行可视化',
  problemDesc: `
    <p>按照国际象棋的规则，皇后可以攻击同一行、同一列或同一斜线上的棋子。<code>n</code> 皇后问题研究的是如何将 <code>n</code> 个皇后放置在 <code>n x n</code> 的棋盘上，使得皇后彼此之间不能相互攻击。给你一个整数 <code>n</code>，返回所有不同的解决方案。</p>
    <div class="example">输入：n = 4
输出：[[".Q..","...Q","Q...","..Q."],["..Q.","Q...","...Q",".Q.."]]</div>
  `,
  subtitle: 'n = 4',
  code, lineMap, steps: steps1, phaseLabels,

  testCases: [
    { name: 'n=4（2个解）', steps: steps1, subtitle: 'n = 4' },
    { name: 'n=5（前两个解）', steps: steps2, subtitle: 'n = 5', setup(panel) { BOARD_N = 5; setupPanel(panel); } },
  ],

  setup: setupPanel,

  render(s) {
    const n = s.n || BOARD_N;
    const gridEl = document.getElementById('board-grid');
    const queenSet = new Set((s.queens || []).map(q => q[0] + ',' + q[1]));
    let cells = '';
    for (let r = 0; r < n; r++) {
      for (let c = 0; c < n; c++) {
        const isQueen = queenSet.has(r + ',' + c);
        const isCurrent = r === s.row && c === s.col;
        const isConflict = s.conflict && s.conflict[0] === r && s.conflict[1] === c;
        const isDark = (r + c) % 2 === 1;

        let bg = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,0.03)';
        let border = '1px solid rgba(255,255,255,0.06)';
        let content = '';

        if (isQueen) {
          bg = 'rgba(74,222,128,0.25)';
          border = '2px solid #4ade80';
          content = '<span style="font-size:20px">♛</span>';
        } else if (isCurrent && s.action === 'reject') {
          bg = 'rgba(248,113,113,0.2)';
          border = '2px solid #f87171';
          content = '<span style="font-size:14px;color:#f87171">✗</span>';
        } else if (isCurrent && s.action === 'place') {
          bg = 'rgba(56,189,248,0.25)';
          border = '2px solid #38bdf8';
          content = '<span style="font-size:20px">♛</span>';
        } else if (isConflict) {
          bg = 'rgba(248,113,113,0.15)';
          border = '1px solid #f87171';
          content = '<span style="font-size:14px;color:#f87171">♛</span>';
        }

        cells += `<div style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;border-radius:4px;background:${bg};border:${border};transition:all 0.3s ease">${content}</div>`;
      }
    }
    gridEl.innerHTML = `<div style="display:inline-grid;grid-template-columns:repeat(${n},40px);gap:3px">${cells}</div>`;

    const resultEl = document.getElementById('result-area');
    if (s.result.length === 0) {
      resultEl.innerHTML = '<div style="color:var(--text-muted)">（暂无解）</div>';
    } else {
      resultEl.innerHTML = s.result.map((sol, i) => {
        const isNew = i === s.result.length - 1 && s.action === 'record';
        return `<div style="padding:4px 0;${isNew ? 'color:#4ade80;font-weight:700' : ''}">解 ${i+1}: [${sol.map(r => '"' + r + '"').join(', ')}]</div>`;
      }).join('');
    }

    const foundEl = document.getElementById('found-area');
    if (s.phase === 'done') {
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">\u2713</div>
        <div>
          <div class="found-text">共找到 ${s.result.length} 个解</div>
          <div class="found-sub">${n}-皇后问题回溯搜索完成</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
