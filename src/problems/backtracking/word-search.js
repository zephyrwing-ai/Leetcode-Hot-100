let BOARD = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']];
let WORD = 'ABCCED';

const code = [
  'class Solution:',
  '    def exist(self, board, word):',
  '        rows, cols = len(board), len(board[0])',
  '        def backtrack(r, c, idx):',
  '            if idx == len(word): return True',
  '            if r<0 or r>=rows or c<0 or c>=cols:',
  '                return False',
  '            if board[r][c] != word[idx]:',
  '                return False',
  '            board[r][c] = "#"',
  '            found = (backtrack(r+1,c,idx+1) or',
  '                     backtrack(r-1,c,idx+1) or',
  '                     backtrack(r,c+1,idx+1) or',
  '                     backtrack(r,c-1,idx+1))',
  '            board[r][c] = word[idx]',
  '            return found',
  '        for r in range(rows):',
  '            for c in range(cols):',
  '                if backtrack(r, c, 0):',
  '                    return True',
  '        return False',
];

const lineMap = { 2: 2, 3: 3, 4: 4, 5: 5, 7: 7, 9: 9, 10: 10, 14: 14, 15: 15, 16: 16, 17: 17, 18: 18, 19: 19 };

// ── Test Case 1: board, word = "ABCCED" ──

const steps1 = [
  { lineNum: 2, phase: 'init', description: '初始化 3x4 棋盘，目标单词 "ABCCED"', r: -1, c: -1, wordIdx: 0, path: [], visited: [], matched: '', result: null, action: null, board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'ABCCED' },
  { lineNum: 16, phase: 'init', description: '外层循环 r=0, c=0, 调用 backtrack(0,0,0)', r: 0, c: 0, wordIdx: 0, path: [], visited: [], matched: '', result: null, action: null, board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'ABCCED' },
  { lineNum: 7, phase: 'explore', description: 'board[0][0]="A" == word[0]="A", 匹配! 标记已访问', r: 0, c: 0, wordIdx: 0, path: [[0,0]], visited: [[0,0]], matched: 'A', result: null, action: 'match', board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'ABCCED' },
  { lineNum: 10, phase: 'explore', description: '尝试向下 (1,0), board[1][0]="S" != word[1]="B", 不匹配', r: 1, c: 0, wordIdx: 1, path: [[0,0]], visited: [[0,0]], matched: 'A', result: null, action: 'reject', board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'ABCCED' },
  { lineNum: 10, phase: 'explore', description: '尝试向右 (0,1), board[0][1]="B" == word[1]="B", 匹配!', r: 0, c: 1, wordIdx: 1, path: [[0,0],[0,1]], visited: [[0,0],[0,1]], matched: 'AB', result: null, action: 'match', board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'ABCCED' },
  { lineNum: 10, phase: 'explore', description: '尝试向下 (1,1), board[1][1]="F" != word[2]="C", 不匹配', r: 1, c: 1, wordIdx: 2, path: [[0,0],[0,1]], visited: [[0,0],[0,1]], matched: 'AB', result: null, action: 'reject', board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'ABCCED' },
  { lineNum: 10, phase: 'explore', description: '尝试向右 (0,2), board[0][2]="C" == word[2]="C", 匹配!', r: 0, c: 2, wordIdx: 2, path: [[0,0],[0,1],[0,2]], visited: [[0,0],[0,1],[0,2]], matched: 'ABC', result: null, action: 'match', board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'ABCCED' },
  { lineNum: 7, phase: 'explore', description: '尝试向右 (0,3), board[0][3]="E" != word[3]="C", 不匹配', r: 0, c: 3, wordIdx: 3, path: [[0,0],[0,1],[0,2]], visited: [[0,0],[0,1],[0,2]], matched: 'ABC', result: null, action: 'reject', board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'ABCCED' },
  { lineNum: 10, phase: 'explore', description: '尝试向下 (1,2), board[1][2]="C" == word[3]="C", 匹配!', r: 1, c: 2, wordIdx: 3, path: [[0,0],[0,1],[0,2],[1,2]], visited: [[0,0],[0,1],[0,2],[1,2]], matched: 'ABCC', result: null, action: 'match', board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'ABCCED' },
  { lineNum: 10, phase: 'explore', description: '尝试向下 (2,2), board[2][2]="E" == word[4]="E", 匹配!', r: 2, c: 2, wordIdx: 4, path: [[0,0],[0,1],[0,2],[1,2],[2,2]], visited: [[0,0],[0,1],[0,2],[1,2],[2,2]], matched: 'ABCCE', result: null, action: 'match', board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'ABCCED' },
  { lineNum: 7, phase: 'explore', description: '尝试向右 (2,3), board[2][3]="E" != word[5]="D", 不匹配', r: 2, c: 3, wordIdx: 5, path: [[0,0],[0,1],[0,2],[1,2],[2,2]], visited: [[0,0],[0,1],[0,2],[1,2],[2,2]], matched: 'ABCCE', result: null, action: 'reject', board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'ABCCED' },
  { lineNum: 7, phase: 'explore', description: '尝试向下 (3,2), r=3 >= rows=3, 越界', r: 3, c: 2, wordIdx: 5, path: [[0,0],[0,1],[0,2],[1,2],[2,2]], visited: [[0,0],[0,1],[0,2],[1,2],[2,2]], matched: 'ABCCE', result: null, action: 'reject', board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'ABCCED' },
  { lineNum: 10, phase: 'explore', description: '尝试向左 (2,1), board[2][1]="D" == word[5]="D", 匹配!', r: 2, c: 1, wordIdx: 5, path: [[0,0],[0,1],[0,2],[1,2],[2,2],[2,1]], visited: [[0,0],[0,1],[0,2],[1,2],[2,2],[2,1]], matched: 'ABCCED', result: null, action: 'match', board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'ABCCED' },
  { lineNum: 4, phase: 'record', description: 'idx=6 == len(word)=6, 完整匹配! 找到路径!', r: 2, c: 1, wordIdx: 6, path: [[0,0],[0,1],[0,2],[1,2],[2,2],[2,1]], visited: [[0,0],[0,1],[0,2],[1,2],[2,2],[2,1]], matched: 'ABCCED', result: true, action: 'found', board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'ABCCED' },
  { lineNum: 19, phase: 'done', description: '返回 True, 单词 "ABCCED" 在棋盘中存在', r: -1, c: -1, wordIdx: 6, path: [[0,0],[0,1],[0,2],[1,2],[2,2],[2,1]], visited: [[0,0],[0,1],[0,2],[1,2],[2,2],[2,1]], matched: 'ABCCED', result: true, action: null, board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'ABCCED' },
];

// ── Test Case 2: word = "SEE" ──
// Path: (1,3)S → (2,3)E → (2,2)E

const steps2 = [
  { lineNum: 2, phase: 'init', description: '初始化 3x4 棋盘, 目标单词 "SEE"', r: -1, c: -1, wordIdx: 0, path: [], visited: [], matched: '', result: null, action: null, board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'SEE' },
  { lineNum: 16, phase: 'init', description: '外层循环搜索起点, (0,0)="A" != "S", 跳过', r: 0, c: 0, wordIdx: 0, path: [], visited: [], matched: '', result: null, action: 'reject', board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'SEE' },
  { lineNum: 16, phase: 'init', description: '继续搜索, 到 (1,0)="S" == word[0]="S", 开始回溯', r: 1, c: 0, wordIdx: 0, path: [], visited: [], matched: '', result: null, action: null, board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'SEE' },
  { lineNum: 7, phase: 'explore', description: 'board[1][0]="S" == word[0]="S", 匹配!', r: 1, c: 0, wordIdx: 0, path: [[1,0]], visited: [[1,0]], matched: 'S', result: null, action: 'match', board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'SEE' },
  { lineNum: 10, phase: 'explore', description: '尝试向下 (2,0), board[2][0]="A" != word[1]="E", 不匹配', r: 2, c: 0, wordIdx: 1, path: [[1,0]], visited: [[1,0]], matched: 'S', result: null, action: 'reject', board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'SEE' },
  { lineNum: 10, phase: 'explore', description: '尝试向上 (0,0), board[0][0]="A" != word[1]="E", 不匹配', r: 0, c: 0, wordIdx: 1, path: [[1,0]], visited: [[1,0]], matched: 'S', result: null, action: 'reject', board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'SEE' },
  { lineNum: 10, phase: 'explore', description: '尝试向右 (1,1), board[1][1]="F" != word[1]="E", 不匹配', r: 1, c: 1, wordIdx: 1, path: [[1,0]], visited: [[1,0]], matched: 'S', result: null, action: 'reject', board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'SEE' },
  { lineNum: 14, phase: 'backtrack', description: '(1,0) 四个方向都失败, 回溯, 恢复 board[1][0]="S"', r: 1, c: 0, wordIdx: 0, path: [], visited: [], matched: '', result: null, action: 'backtrack', board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'SEE' },
  { lineNum: 16, phase: 'init', description: '继续搜索起点, 到 (1,3)="S" == word[0]="S"', r: 1, c: 3, wordIdx: 0, path: [], visited: [], matched: '', result: null, action: null, board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'SEE' },
  { lineNum: 7, phase: 'explore', description: 'board[1][3]="S" == word[0]="S", 匹配!', r: 1, c: 3, wordIdx: 0, path: [[1,3]], visited: [[1,3]], matched: 'S', result: null, action: 'match', board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'SEE' },
  { lineNum: 10, phase: 'explore', description: '尝试向下 (2,3), board[2][3]="E" == word[1]="E", 匹配!', r: 2, c: 3, wordIdx: 1, path: [[1,3],[2,3]], visited: [[1,3],[2,3]], matched: 'SE', result: null, action: 'match', board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'SEE' },
  { lineNum: 10, phase: 'explore', description: '尝试向左 (2,2), board[2][2]="E" == word[2]="E", 匹配!', r: 2, c: 2, wordIdx: 2, path: [[1,3],[2,3],[2,2]], visited: [[1,3],[2,3],[2,2]], matched: 'SEE', result: null, action: 'match', board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'SEE' },
  { lineNum: 4, phase: 'record', description: 'idx=3 == len(word)=3, 完整匹配! 找到路径!', r: 2, c: 2, wordIdx: 3, path: [[1,3],[2,3],[2,2]], visited: [[1,3],[2,3],[2,2]], matched: 'SEE', result: true, action: 'found', board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'SEE' },
  { lineNum: 19, phase: 'done', description: '返回 True, 单词 "SEE" 在棋盘中存在', r: -1, c: -1, wordIdx: 3, path: [[1,3],[2,3],[2,2]], visited: [[1,3],[2,3],[2,2]], matched: 'SEE', result: true, action: null, board: [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']], word: 'SEE' },
];

const phaseLabels = { init: '初始化', explore: '探索', backtrack: '回溯', record: '找到', done: '完成' };

function setupPanel(panel) {
  panel.innerHTML = `
    <div class="card">
      <div class="section-title">棋盘 Board（高亮 = DFS 路径）</div>
      <div id="board-grid" style="display:inline-grid;grid-template-columns:repeat(4,1fr);gap:4px"></div>
      <div class="legend-row" style="margin-top:8px">
        <div class="legend-item"><div class="legend-dot" style="background:rgba(34,211,238,0.4);border:1px solid #22d3ee"></div>当前位置</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(74,222,128,0.4);border:1px solid #4ade80"></div>已匹配路径</div>
        <div class="legend-item"><div class="legend-dot" style="background:rgba(248,113,113,0.4);border:1px solid #f87171"></div>不匹配</div>
      </div>
    </div>
    <div class="card">
      <div class="section-title">目标单词匹配进度</div>
      <div class="array-row" id="word-progress"></div>
    </div>
    <div class="card">
      <div class="section-title">DFS 路径</div>
      <div class="stack-container" id="path-display"></div>
    </div>
    <div id="found-area"></div>
  `;
}

export default {
  title: '79. Word Search — 执行可视化',
  problemDesc: `
    <p>给定一个 <code>m x n</code> 二维字符网格 <code>board</code> 和一个字符串单词 <code>word</code>。如果 <code>word</code> 存在于网格中返回 <code>true</code>，否则返回 <code>false</code>。单词必须按照字母顺序通过相邻单元格（水平或垂直）构成。</p>
    <div class="example">输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
输出：true</div>
  `,
  subtitle: `word = "${WORD}"`,
  code, lineMap,
  steps: steps1,
  phaseLabels,

  testCases: [
    { name: 'word = "ABCCED"', steps: steps1, subtitle: 'word = "ABCCED"' },
    {
      name: 'word = "SEE"', steps: steps2, subtitle: 'word = "SEE"',
      setup(panel) {
        WORD = 'SEE';
        BOARD = [['A','B','C','E'],['S','F','C','S'],['A','D','E','E']];
        setupPanel(panel);
      }
    },
  ],

  setup: setupPanel,

  render(s) {
    const board = s.board || BOARD;
    const word = s.word || WORD;
    const inPath = (r, c) => s.path.some(p => p[0] === r && p[1] === c);
    const isCurrent = (r, c) => s.r === r && s.c === c;

    document.getElementById('board-grid').innerHTML = board.map((row, r) =>
      row.map((cell, c) => {
        let bg = 'rgba(255,255,255,0.05)';
        let border = 'rgba(255,255,255,0.1)';
        let color = 'inherit';
        if (isCurrent(r, c) && s.action === 'reject') {
          bg = 'rgba(248,113,113,0.2)'; border = '#f87171'; color = '#f87171';
        } else if (isCurrent(r, c)) {
          bg = 'rgba(34,211,238,0.3)'; border = '#22d3ee'; color = '#22d3ee';
        } else if (inPath(r, c)) {
          bg = 'rgba(74,222,128,0.2)'; border = '#4ade80'; color = '#4ade80';
        }
        return `<div style="width:48px;height:48px;display:flex;align-items:center;justify-content:center;border-radius:8px;background:${bg};border:1px solid ${border};color:${color};font-weight:700;font-size:18px;font-family:var(--font-mono)">${cell}</div>`;
      }).join('')
    ).join('');

    // word progress
    document.getElementById('word-progress').innerHTML = word.split('').map((ch, idx) => {
      let cls = 'arr-cell';
      if (idx < s.matched.length) cls += ' in-window';
      if (idx === s.wordIdx) cls += ' current';
      return `<div class="${cls}"><div class="arr-val">${ch}</div><div class="arr-idx">[${idx}]</div></div>`;
    }).join('');

    // path display
    const pathEl = document.getElementById('path-display');
    if (s.path.length === 0) {
      pathEl.innerHTML = '<div class="stack-empty">（未开始搜索）</div>';
    } else {
      pathEl.innerHTML = s.path.map((p, i) => {
        let cls = 'stack-item';
        if (i === s.path.length - 1 && s.action === 'match') cls += ' just-pushed';
        return `<div class="${cls}">(${p[0]},${p[1]})=${board[p[0]][p[1]]}</div>`;
      }).join('');
    }

    const foundEl = document.getElementById('found-area');
    if (s.result !== null) {
      foundEl.innerHTML = `<div class="card found-box">
        <div class="found-icon">${s.result ? '\u2713' : '\u2717'}</div>
        <div>
          <div class="found-text">返回 ${s.result ? 'True' : 'False'}</div>
          <div class="found-sub">${s.result ? '单词 "' + word + '" 在棋盘中找到' : '单词未找到'}</div>
        </div>
      </div>`;
    } else {
      foundEl.innerHTML = '';
    }
  },
};
