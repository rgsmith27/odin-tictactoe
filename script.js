const gameboard = (function () {
    let board = [
        ['_','_','_'],
        ['_','_','_'],
        ['_','_','_']
    ];


    const add = (char, row, col) => board[row][col] = char;
    const rows = () => [board[0], board[1], board[2]];
    const cols = () => [[board[0][0], board[1][0], board[2][0]], [board[0][1], board[1][1], board[2][1]], [board[0][2], board[1][2], board[2][2]]];
    const diags = () => [[board[0][0], board[1][1], board[2][2]], [board[0][2], board[1][1], board[2][0]]];

    return { board, add, rows, cols, diags }; 
})();

const gamestate = (function () {
    const isWin = (char) => {
        return (checkRows(char) || checkCols(char) || checkDiags(char));
    }

    const isTie = () => {
        return gameboard.board.every((row) => row.every((char) => char != '_'))
    }

    const checkRows = (char) => {
        return gameboard.rows().some((row) => row.every((item) => item == char));
    }

    const checkCols = (char) => {
        return gameboard.cols().some((col) => col.every((item) => item == char));
    }

    const checkDiags = (char) => {
        return gameboard.diags().some((diag) => diag.every((item) => item == char));
    }

    return{ isWin, isTie };
})();
