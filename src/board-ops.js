const EMPTY = 0;

function nextDown (board, row, column) {
  const rows = board.length;
  return row === rows - 1 ? undefined : board[row + 1][column];
}

function aboveEmpty (board, row, column) {
  return nextDown(board, row, column) === EMPTY;
}

function performMove (prevBoard, column, player) {
  const board = prevBoard.map((row, i) => {
    return row.map((segment, j) => {
      if (segment !== EMPTY) return segment;
      if (j === column && !aboveEmpty(prevBoard, i, j)) return player;
      return segment;
    });
  });
  return board;
}

function hasDiagonal (board, row, col, direction) {
  const rows = board.length;
  const columns = board[0].length;

  const across = direction === 'right' ? 1 : -1;
  let count = 0;
  for (let i = row, j = col; i < rows && j < columns; i++, j += across) {
    if (board[i][j] !== EMPTY && board[i][j] === board[Math.max(0, i - 1)][Math.max(0, j - across)]) count++;
    else count = 0;
    if (count >= 3) return true;
  }
  return false;
}

function isConnect4 (board) {
  const rows = board.length;
  const columns = board[0].length;

  let count = 0;
  // horizontal
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (board[i][j] !== EMPTY && board[i][j] === board[i][Math.max(0, j - 1)]) count++;
      else count = 0;
      if (count >= 3) return true;
    }
  }

  // vertical
  count = 0;
  for (let j = 0; j < columns; j++) {
    for (let i = 0; i < rows; i++) {
      if (board[i][j] !== EMPTY && board[i][j] === board[Math.max(0, i - 1)][j]) count++;
      else count = 0;
      if (count >= 3) return true;
    }
  }

  // diagonal to the right, starting top left, searching to the right
  count = 0;
  for (let j = 0; j < columns - 3; j++) {
    if (hasDiagonal(board, 0, j, 'right')) return true;
  }
  // diagonal to the right, starting top left, searching down LHS column
  count = 0;
  for (let i = 0; i < rows - 3; i++) {
    if (hasDiagonal(board, i, 0, 'right')) return true;
  }
  // diagonal to the left, starting top right, search to the left
  count = 0;
  for (let j = columns; j >= 3; j--) {
    if (hasDiagonal(board, 0, j, 'left')) return true;
  }
  // diagonal to the left, searchng down RHS column
  count = 0;
  for (let i = 0; i < rows - 3; i++) {
    if (hasDiagonal(board, i, columns - 1, 'left')) return true;
  }
  return false;
}

export { performMove, isConnect4 };
