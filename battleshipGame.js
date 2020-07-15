const { HumanPlayer} = require("./humanPlayer.js");
const { Board } = require("./board.js");

class BattleshipGame {
    constructor(numRows, numCols, numShips) {
        this.player = new HumanPlayer(); // create a player object
        this.board = new Board(numRows, numCols, numShips); // create a board
        this.playTurn(); // start the game
    }

    playTurn() {
        //show you current state of game
        this.displayStatus();

        // if the game is not over
        if (!this.board.gameOver()) {
            // get user input
            // bind the function to the game context
            this.player.getMove(this.cb.bind(this));
        } else {
            // if the game is over, let the user know
            console.log("Game Over! You sunk all the ships.");
            // and close the interface
            this.player.interface.close();
        }

    }
    cb(answer) {
        // this function serves as the
        // take the user's move and parse the string to get an array
        answer = JSON.parse(answer);
        // attack the indicated position
        this.board.attack(answer);
        // then play the next turn
        this.playTurn();
    }

    displayStatus() {
        // use console.table so that the array can be printed nicely
        // without the added step of transforming to a string first
        console.table(this.board.display());
    }

}


module.exports.BattleshipGame = BattleshipGame;
