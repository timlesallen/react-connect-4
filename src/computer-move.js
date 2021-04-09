import { isConnect4, performMove } from './board-ops';
import maxBy from 'lodash.maxby';
import minBy from 'lodash.minby';

const reallyGood = 1;
const reallyBad = -1;
const MAX_DEPTH = 5;

function computerMove (board) {
  const result = minimax(board, MAX_DEPTH, true);
  console.log(result);
  const { column } = result;
  return column;
}

/**
 * Gives the best move out of all possible moves.
 * @param {Array<Array<integer>>} board
 * @param {integer} depth
 * @param {Boolean} maximizingPlayer
 * @returns float
 */
function minimax (board, depth, maximizingPlayer) {
  const columns = board[0].length;
  const terminal = isTerminal(board);
  const minMax = maximizingPlayer ? maxBy : minBy;

  if (terminal || depth === 0) {
    const _badness = badness(board, depth, !maximizingPlayer, terminal);
    return { board, badness: _badness };
  }
  const moves = Array(columns)
    .fill()
    .map((_, idx) => ({ board: performMove(board, idx, maximizingPlayer ? 2 : 1), column: idx }))
    .filter(({ board }) => board !== false)
    .map(({ column, board }) => ({ ...minimax(board, depth - 1, !maximizingPlayer), column }))
    // discount future moves so we prefer connect 4 sooner
    .map(({ board, column, badness }) => ({ board, column, badness: badness * 0.9999 })); 

  const result = minMax(moves, ({ badness }) => badness);
  return result;
}

function isTerminal (board) {
  return isConnect4(board);
}

// for now, connect 4 is the only thing we care about
function badness (board, depth, maximizingPlayer, terminal) {
  return terminal
    ? (maximizingPlayer ? reallyGood : reallyBad)
    : 0;
}

export default computerMove;
