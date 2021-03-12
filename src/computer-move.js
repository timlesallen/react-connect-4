function computerMove (board) {
    const columns = board[0].length;

    return Math.floor(Math.random() * columns);
}

export default computerMove;