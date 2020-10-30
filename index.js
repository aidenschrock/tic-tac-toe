let gameboardObj = {
    gameBoard: ['', '', '', '', '', '', '', '', '']};
let winner = "";
let winnerStatement = "";
let playerOne = '';
let playerTwo = '';
let currentPlayer = playerOne;
let toggle = 0;
let allSquares = document.querySelectorAll(".square");

renderBoard()

function renderBoard() {
    for (let i = 0; i < 9; i++) {
        let square = document.getElementById(i)
        square.setAttribute("value", gameboardObj.gameBoard[i]);
        square.textContent += gameboardObj.gameBoard[i];
    }
}

const player = (name, symbol) => {

    return { name, symbol }
}

function makePlayers() {
    if (document.getElementById("ai").checked === false) {
        let nameOne = prompt("Please enter player X's name")
        let nameTwo = prompt("Please enter player O's name")
        playerOne = player(nameOne, 'X')
        playerTwo = player(nameTwo, 'O')
        currentPlayer = playerOne
    } else if (document.getElementById("ai").checked === true) {
        let nameOne = prompt("Please enter player X's name")
        playerOne = player(nameOne, 'X')
        playerTwo = player("Computer", 'O')
        currentPlayer = playerOne
    }
}

function playerTurn() {
    if (currentPlayer === playerOne && playerTwo.name !== "Computer") {
        currentPlayer = playerTwo;
    } else if (currentPlayer === playerTwo && playerTwo.name !== "Computer") {
        currentPlayer = playerOne
    } else if (playerTwo.name === "Computer") {
        currentPlayer = playerOne
    }
}

function displayContoller() {
    let displayContainer = document.querySelector(".displayContainer");
    display = document.querySelector("#display")
    if (display !== null && winnerStatement === "") {
        display.remove()
        display = document.createElement('h2')
        display.setAttribute("id", "display")
        display.textContent = "It's " + currentPlayer.name + "'s turn!";
        displayContainer.appendChild(display)
    } else if (winnerStatement !== "") {
        display.remove()
        display = document.createElement('h2')
        display.setAttribute("id", "display")
        display.textContent = winnerStatement;
        displayContainer.appendChild(display)
    } else {
        display = document.createElement('h2')
        display.setAttribute("id", "display")
        display.textContent = "It's " + currentPlayer.name + "'s turn!";
        displayContainer.appendChild(display)

    }
}


function move(e) {
    console.log(e)
    square = e.target
    symbol = currentPlayer.symbol
    if (square.textContent === "" && winnerStatement === "" && playerOne !== "" && playerTwo.name==="Computer") {
        square.textContent = symbol
        gameboardObj.gameBoard[square.id] = symbol;
        playerTurn()
        computerChoice()
        allSquares.forEach(square =>  square.textContent="");
        renderBoard()
        calculateWinner()
        displayContoller()
    }else if (square.textContent === "" && winnerStatement === "" && playerOne !== "" && playerTwo.name!=="Computer") {
        square.textContent = symbol
        gameboardObj.gameBoard[square.id] = symbol;
        playerTurn()
        allSquares.forEach(square =>  square.textContent="");
        renderBoard()
        calculateWinner()
        displayContoller()
    }

}

function computerChoice() {
    let indexArray = []
    for (let i = 0; i < gameboardObj.gameBoard.length; i++) {
        if (gameboardObj.gameBoard[i] === '') {
            indexArray.push(i)
        }
    }

    if (indexArray.length > 0) {
        console.log(indexArray)
        computerSelect = indexArray[Math.floor(Math.random() * indexArray.length)];
        square = document.getElementById(`${computerSelect}`);
        symbol = playerTwo.symbol;
        allSquares.forEach(square =>  square.textContent="");
        gameboardObj.gameBoard[computerSelect] = 'O';
        square.textContent = symbol;
        gameboardObj.gameBoard[square.id] = symbol;

        calculateWinner()
        displayContoller()
        return indexArray
    }
}

function calculateWinner() {
    squares = gameboardObj.gameBoard;
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            winner = (squares[a] === playerOne.symbol) ? playerOne.name : playerTwo.name;
            winnerStatement = winner + " won! Congrats!"
            return winnerStatement
        } else if (winner === "" && checkCat() === 9) {
            winner = 'tie';
            winnerStatement = "It's a tie!"
            return winnerStatement
        }
    }
}

function checkCat() {
    let fullCount = 0;
    for (i = 0; i < gameboardObj.gameBoard.length; i++) {
        if (gameboardObj.gameBoard[i] === "") {
        } else if (gameboardObj.gameBoard[i] !== "") {

            fullCount += 1;
        }
    }
    return fullCount
}

function buttonAction() {
    button = document.querySelector("#start")
    if (toggle === 0) {
        makePlayers()
        displayContoller()
        button.textContent = "RESTART"
        toggle += 1
    } else {
        for (let i = 0; i < gameboardObj.gameBoard.length; i++) {
            gameboardObj.gameBoard[i] = ''
        }
        allSquares.forEach(square =>  square.textContent="");
        renderBoard()

        display = document.querySelector("#display")
        display.remove()
        winner = ""
        winnerStatement = ""
        playerOne = ""
        playerTwo = ""
        button.textContent = "START"
        toggle -= 1
    }
}





