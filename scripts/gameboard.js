const Gameboard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];
    
    const getBoard = () => board;
    
    const markCell = (index, marker) => {
        if (board[index] === "") {
            board[index] = marker;
            return true;
        }
        return false;
    };
    
    const resetBoard = () => {
        board = ["", "", "", "", "", "", "", "", ""];
    };
    
    return { getBoard, markCell, resetBoard };
})();