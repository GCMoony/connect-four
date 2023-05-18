const RED = "Red";
const BLUE = "Blue";

class GameBoard {

    board = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ];
    currentPlayer = RED;
    gameFinished = false;

    changePlayer() {
        if(this.currentPlayer == RED)
            this.currentPlayer = BLUE;
        else
            this.currentPlayer = RED;
    }

    showCurrentPlayer() {
        document.getElementById("currentPlayer").innerHTML = `${this.currentPlayer}`
    }

    playRow(rowNumber) {
        let foundSpot = false;
        for(let column = 0; column < this.board[rowNumber].length; column++) {
            if(this.board[rowNumber][column] == 0) {
                if(this.currentPlayer == RED)
                    this.board[rowNumber][column] = 1;
                else
                    this.board[rowNumber][column] = -1
                foundSpot = true;
                break;
            }
        }
        if(foundSpot) {
            console.log("Piece added successfully");
            this.changePlayer();
        }
        else {
            console.log("Row is full");
            alert("This row is full!");
        }

        this.displayBoard();
    }

    printBoard() {
        for(let row of this.board) {
            console.log(row);
        }
    }

    displayBoard() {
        let gameboard = document.getElementById("gameboard");
        gameboard.replaceChildren()
        let rowNum = 0;
        for(let row of this.board) {
            let newRow = document.createElement("div");
            newRow.classList.add("gameboard-row");
            newRow.setAttribute("id", rowNum);
            for (let column of row) {
                let newSpot = document.createElement("span");
                newSpot.classList.add("gameboard-spot");
                if(column == 1) 
                    newSpot.classList.add("active-red");
                if(column == -1)
                    newSpot.classList.add("active-blue");
                newRow.appendChild(newSpot);
            }
            gameboard.appendChild(newRow);
            newRow.addEventListener("click", () => this.playRow(newRow.getAttribute("id")))
            rowNum++;
        }
        this.showCurrentPlayer();
    }

    clearBoard() {
        this.board = [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0]
        ];
        this.currentPlayer = RED;
        this.displayBoard();
    }
}

let gameBoardContainer = document.getElementById("gameboard");
let gameBoard = new GameBoard();
let gameBoardReset = document.getElementById("resetBoard");
gameBoardReset.addEventListener("click", () => {
    gameBoard.clearBoard();
});
gameBoard.displayBoard();
