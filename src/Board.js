import React from 'react';
import computerMove from './computer-move';
import { isConnect4, performMove } from './board-ops';
import './Board.css'

const COLS = 7;
const ROWS = 6;

const EMPTY = 0;
const PLAYER1 = 1;
const PLAYER2 = 2;

const segmentClass = (segment) => {
  switch (segment) {
    case PLAYER1: return 'Player1';
    case PLAYER2: return 'Player2';
    default: return '';
  }
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: new Array(ROWS).fill(EMPTY).map(() => new Array(COLS).fill(EMPTY))
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(column) {
    this.setState(({ board }) => {
      const board1 = performMove(board, column, PLAYER1);
      if (isConnect4(board1)) return { board: board1, winner: PLAYER1 };
      const board2 = performMove(board1, computerMove(board1), PLAYER2);
      if (isConnect4(board2)) return { board: board2, winner: PLAYER2 };
      console.log({ board2 });
      return { board: board2}
    });
  }

  render() {
    const drawSegment = (segment, column) => {
      return (
        <div key={column.toString()} className={`Segment ${segmentClass(segment)}`} onClick={this.handleClick.bind(this, column)} >
        </div>
      )
    }
    const drawRow = (row, index) => {
      return (
        <div key={index.toString()} className="Row">
          {row.map((segment, column) => drawSegment(segment, column)) }
        </div>
      )
    }
    const winnerClass = this.state.winner > 0 ? `Winner-Player${this.state.winner}` : '';
    return (
      <div className={`Board ${winnerClass}`}>
        {this.state.board.map((row, index) => drawRow(row, index))}
      </div>
    );
  }
}

export default Board;