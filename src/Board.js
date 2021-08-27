import './Board.css';
import React, { useState } from 'react';
import computerMove from './computer-move';
import pipe from 'ramda.pipe';
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

/**
 * A react component to represent the board
 */
function Board () {
  const [ boardState, setBoardState ] = useState(initialBoardState);

  /**
   * Event handler for a click on the board.
   * Performs the move requested, then checks for connect 4, and if not
   * performs the next computer move.
   * @param {integer} column clicked
   */
  function handleClick (column) {
    setBoardState(pipe(
       ({ board }) => ({ board: performMove(board, column, PLAYER1) }),
       ({ board }) => ({ board, winner: isConnect4(board) && PLAYER1 }),
       ({ board, winner }) => {
         if (winner) return { board, winner }; // PLAYER 1 just won
         const board2 = performMove(board, computerMove(board), PLAYER2);
         return { board: board2, winner: isConnect4(board2) && PLAYER2 };
       }));
  }

  const drawSegment = (segment, column) => {
    return (
      <div key={column.toString()} className={`Segment ${segmentClass(segment)}`} onClick={handleClick.bind(null, column)} />
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
