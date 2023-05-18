// GameSpot states
const RED = -1;
const BLACK = 1;
const EMPTY = 0;

const DEFAULT_LAYOUT = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0]
];

const DEFAULT_ROW_STATE = [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY];

class GameSpot {
    constructor(currentState = EMPTY) {
        // Creating the element
        let newSpot = document.createElement("span");
        newSpot.classList.add("gameboard-spot");

        // Initializing element classes
        if(currentState == RED)
            newSpot.classList.add("active-red");
        if(currentState == BLACK)
            newSpot.classList.add("active-black");
        
        // Initializing object variables
        this.state = currentState;
        this.element = newSpot;
        // return newSpot;
        return this;
    }

    getState() {
        return this.state;
    }

    // Returns the DOM element
    getElement() {
        return this.element;
    }

    setState(newState) {
        this.state = newState;
    }
}

class GameRow {
    constructor(rowState = DEFAULT_ROW_STATE) {
        let newRow = document.createElement("div");
        newRow.classList.add("gameboard-row");
        for(let i of rowState) {
            newRow.appendChild(new GameSpot(i));
        }
        // return newRow;
        return this;
    }
}

class GameBoard {
    constructor(containerID, boardLayout = DEFAULT_LAYOUT) {
        let newGameboard = document.getElementById(containerID);
        newGameboard.replaceChildren();
        for(let row of boardLayout) {
            newGameboard.appendChild(new GameRow(row))
        }
        this.boardLayout = boardLayout;
        // return newGameboard;    
        return this;
    }

    getState() {
        return this.boardLayout;
    }
}


let myBoard = new GameBoard("gameboard");
console.log(myBoard)