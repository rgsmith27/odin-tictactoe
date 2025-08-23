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

    const clearBoard = () => {
        for(row = 0; row < 3; row++){
            for(col = 0; col < 3; col++){
                gameboard.board[row][col] = '_';
            }
        }
    }

    return { board, add, rows, cols, diags, clearBoard}; 
})();

const gamestate = (function () {
    let turn = 'X';

    const startGame = () => {
        turn = 'X';
        
        gameboard.clearBoard();
        nextTurn();
    }

    const nextTurn = () => {
        turn = (turn == 'X') ? 'O' : 'X';
        boardInterface.getInput(turn);
        boardInterface.updateDisplay(turn);
    }

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

    return{ turn, isWin, isTie, nextTurn, startGame };
})();

const boardInterface = (function (){
    const getInput = (char) => {
        const validSquares = 
            Array.from(document.querySelectorAll('.grid-square'))
            .filter((square) => gameboard.board[Number(square.dataset.row)][Number(square.dataset.col)] == '_');
        const controller = new AbortController();
        const signal = controller.signal;
        validSquares.forEach((square) => 
            square.addEventListener('click', function() {
                gameboard.add(char, Number(square.dataset.row), Number(square.dataset.col));
                gamestate.nextTurn();
                controller.abort();
        }, { signal }));
    }

    const updateDisplay = (turn) => {
        updateBoard();
        updateStatus(turn);
    }

    const updateBoard = () => {
        for(row = 0; row < 3; row++){
            for(col = 0; col < 3; col++){
                square = document.querySelector(`.grid-square[data-row="${row}"][data-col="${col}"]`);
                square.textContent = gameboard.board[row][col];
            }
        }
    }

    const updateStatus = (turn) => {
        const statusDisplay = document.querySelector('.status-display');
        let lastTurn = (turn == 'X') ? 'O' : 'X';
        if(gamestate.isWin(lastTurn)){
            statusDisplay.textContent = `${lastTurn} wins!`; 
        }
        else if(gamestate.isTie()){
            statusDisplay.textContent = "Tie game!";
        }
        else{
            statusDisplay.textContent = `${turn}'s turn`;
        }
    }

    return { getInput, updateDisplay };
})();

const reset = document.querySelector('.reset');
reset.addEventListener('click', gamestate.startGame);

gamestate.startGame();


