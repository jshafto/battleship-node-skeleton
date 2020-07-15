const humanPlayer = require("./humanPlayer.js");
const HumanPlayer = humanPlayer.HumanPlayer;
const board = require("./board.js");
const Board = board.Board;


// const { HumanPlayer } = require("./humanPlayer");

class BattleshipGame {
  constructor(numRows, numCols, numShips) {
      this.player = new HumanPlayer();
      this.board = new Board(numRows, numCols, numShips);
      //console.log("hi")
  }

  playTurn() {
    //show you current state of game
          this.displayStatus();
          console.log(this.board.gameOver());

          if (!this.board.gameOver()) {
              // and ask for user input.
              //let position =
              this.player.getMove(this.cb.bind(this));
              //console.log(typeof position)
              // Remember that callback function that we passed into
              //HumanPlayer#getMove? This function that gets passed in
              //will initiate the next turn.
              //this.playTurn();
            } else {
                console.log("Game Over!");
                this.player.interface.close();
            }

        }
cb(answer) {
    // console.log(this);
    answer = JSON.parse(answer);
    this.board.attack(answer);
    this.playTurn()
    //return answer;
  }

  displayStatus() {
    //show the state of the game.
    // print out this.board.display()
    console.table(this.board.display());
  }

}

let myGame = new BattleshipGame(2,2,1);
myGame.playTurn();





module.exports.BattleshipGame = BattleshipGame;
