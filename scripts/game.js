const Game = (() => {
    let players = [];
    let currentPlayerIndex;
    let gameOver;
    
    const start = (player1Name, player2Name) => {
        players = [
            Player(player1Name, "X"),
            Player(player2Name, "O")
        ];
        currentPlayerIndex = 0;
        gameOver = false;
        Gameboard.resetBoard();
    };
    
    const getCurrentPlayer = () => players[currentPlayerIndex];
    
    const switchPlayer = () => {
        currentPlayerIndex = currentPlayerIndex === 0 ? 1 : 0;
    };
    
    const checkWin = () => {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
            [0, 4, 8], [2, 4, 6]             // diagonals
        ];
        
        const board = Gameboard.getBoard();
        return winPatterns.some(pattern => {
            const [a, b, c] = pattern;
            return board[a] && board[a] === board[b] && board[a] === board[c];
        });
    };
    
    const checkTie = () => {
        return Gameboard.getBoard().every(cell => cell !== "");
    };
    
    const playRound = (index) => {
        if (gameOver) return false;
        
        if (Gameboard.markCell(index, getCurrentPlayer().marker)) {
            if (checkWin()) {
                gameOver = true;
                return "win";
            } else if (checkTie()) {
                gameOver = true;
                return "tie";
            } else {
                switchPlayer();
                return "continue";
            }
        }
        return false;
    };
    
    return { start, getCurrentPlayer, playRound };
})();