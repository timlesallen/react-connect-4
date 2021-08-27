import './Board.css';
import { useEffect, useReducer } from 'react';
import computerMove from './computer-move';
import { isConnect4, performMove } from './board-ops';

// Board dimensions
const COLS = 7;
const ROWS = 6;

// State of a board position (aka segment)
const EMPTY = 0;
const PLAYER1 = 1;
const PLAYER2 = 2;

/**
 * Given state of a segment, returns CSS class for segment.
 * @param {integer} segment
 * @returns {string} CSS class name
 */
const segmentClass = (segment) => {
  switch (segment) {
    case PLAYER1: return 'Player1';
    case PLAYER2: return 'Player2';
    default: return '';
  }
};

const initialBoardState = () => ({
  board: new Array(ROWS)
  .fill(EMPTY)
  .map(() => new Array(COLS).fill(EMPTY)),
  winner: false
});

function reducer (state, action) {
  const { board } = state;
  const { type, column, player } = action;
  switch (type) {
    case 'move':
      const newBoard = performMove(board, column, player)
      return { board: newBoard, winner: isConnect4(newBoard) && player, lastPlayer: player };
    default: throw new Error(`unknown action ${type}`)
  }
}

/**
 * A react component to represent the board
 */
function Board () {
  const [ boardState, dispatch ] = useReducer(reducer, null, initialBoardState);
  useEffect(() => {
    if (!boardState.winner && boardState.lastPlayer === PLAYER1) {
      dispatch({ type: 'move', column: computerMove(boardState.board), player: PLAYER2 });
    }
  });

  /**
   * Event handler for a click on the board.
   * Performs the move requested, then checks for connect 4, and if not
   * performs the next computer move.
   * @param {integer} column clicked
   */
  function handleClick (column) {
    dispatch({ type: 'move', column, player: PLAYER1 });
  }

  const drawSegment = (segment, column) => {
    return (
      <div key={column.toString()} className={`Segment ${segmentClass(segment)}`} onClick={() => handleClick(column)} />
    );
  };
  const drawRow = (row, index) => {
    return (
      <div key={index.toString()} className='Row'>
        {row.map((segment, column) => drawSegment(segment, column))}
      </div>
    );
  };
  const winnerClass = boardState.winner > 0 ? `Winner-Player${boardState.winner}` : '';
  return (
    <div className={`Board ${winnerClass}`}>
      {boardState.board.map((row, index) => drawRow(row, index))}
    </div>
  );
}

export default Board;
