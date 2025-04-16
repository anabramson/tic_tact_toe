const DisplayController = (() => {
    const boardElement = document.querySelector(".gameboard");
    const statusElement = document.querySelector(".status");
    const restartButton = document.querySelector(".restart-btn");
    
    const renderBoard = () => {
        boardElement.innerHTML = "";
        Gameboard.getBoard().forEach((cell, index) => {
            const cellElement = document.createElement("div");
            cellElement.classList.add("cell");
            cellElement.dataset.index = index;
            cellElement.textContent = cell;
            boardElement.appendChild(cellElement);
        });
    };
    
    const updateStatus = (message) => {
        statusElement.textContent = message;
    };
    
    const handleCellClick = (e) => {
        if (!e.target.classList.contains("cell")) return;
        
        const index = e.target.dataset.index;
        const result = Game.playRound(index);
        
        if (result === "win") {
            updateStatus(`${Game.getCurrentPlayer().name} wins!`);
        } else if (result === "tie") {
            updateStatus("It's a tie!");
        } else if (result === "continue") {
            updateStatus(`${Game.getCurrentPlayer().name}'s turn`);
        }
        
        renderBoard();
    };
    
    const handleRestart = () => {
        Game.start("Player 1", "Player 2");
        updateStatus(`${Game.getCurrentPlayer().name}'s turn`);
        renderBoard();
    };
    
    const init = () => {
        Game.start("Player 1", "Player 2");
        boardElement.addEventListener("click", handleCellClick);
        restartButton.addEventListener("click", handleRestart);
        updateStatus(`${Game.getCurrentPlayer().name}'s turn`);
        renderBoard();
    };
    
    return { init };
})();

DisplayController.init();