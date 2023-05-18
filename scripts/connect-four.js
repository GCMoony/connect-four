let gameBoard = document.getElementById("gameboard");

// Current player alternates between -1 and 1
// -1 for black pieces, 1 for red pieces
let currentPlayer = -1;
let gameState = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
]

let winState = [
    [1, 0, 0, 0, 0, 0],
    [-1, 1, 0, 0, 0, 0],
    [-1, -1, 1, 0, 0, 0],
    [-1, 1, -1, 1, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
]

class GameSpot {
    
    constructor(currentState = 0) {
        // Creating the html element
        let newSpot = document.createElement("span");
        newSpot.classList.add("gameboard-spot");
        this.element = newSpot;
        // Initializing the state if reading a previous game
        if(currentState != 0) {
            this.element.classList.add("active");
            currentState == -1 ? this.element.classList.add("active-black") : this.element.classList.add("active-red");
        }
        
        this.classList = newSpot.classList;

        // Updating states... probably better for Tic Tac Toe vs Connect Four
        newSpot.addEventListener("click", () => {
            /*if(!this.classList.contains("active")){
                currentPlayer == -1 ? this.element.classList.add("active-black") : this.element.classList.add("active-red");
                this.element.classList.add("active");
                currentPlayer = -currentPlayer;
            }*/
            let parentElements = this.element.parentNode.children;
            // Want to find first element that is not active
            for(let spot of parentElements) {
                if(!spot.classList.contains("active")) {
                    // Update a free spot in the row
                    spot.classList.add("active");
                    currentPlayer == -1 ? spot.classList.add("active-black") : spot.classList.add("active-red");
                    currentPlayer = -currentPlayer;
                    readBoardState();
                    return;
                }
            }

            // The row is full
            alert("No spots left in this column!");
        });
        return this.element;
    }
}




function createBoard(usedBoard = gameState) {
    for(let row of usedBoard) {
        let newRow = document.createElement("div");
        newRow.classList.add("gameboard-row");
        for(let col of row) {
            newRow.appendChild(new GameSpot(col))
        }
        gameBoard.appendChild(newRow);
    }
}
createBoard(winState);


function readBoardState(usedBoard = gameState) {
    let rows = document.querySelectorAll(".gameboard-row");
    let i = 0;
    for(let row of rows) {
        let tempRow = [];
        //sconsole.log(row)
        for(col of row.children) {
            // console.log(col.classList.contains("active"))
            if(col.classList.contains("active")) {
                col.classList.contains("active-red") ? tempRow.push(1) : tempRow.push(-1);
            }
            else {
                tempRow.push(0);
            }
        }
        usedBoard[i] = tempRow;
    }

    for(row of usedBoard) {
        console.log(row);
    }
}

readBoardState(winState);

document.getElementById("resetBoard").addEventListener("click", () => {
    gameState = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0]
    ];
    gameBoard.replaceChildren();
    createBoard();
});