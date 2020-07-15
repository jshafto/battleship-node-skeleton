const readline = require("readline");

class HumanPlayer {
    constructor() {
        this.interface = readline.createInterface(process.stdin, process.stdout);
      // this.interface =
  }

  getMove (cb) {
    // getMove has a callback parameter
    // this function is called and passed in the answer
    ///console.log("humanplayer, getMove", this);
    this.interface.question("What's your next move?", cb)
    // answer is gonna be [row, column]
    // that position is what the user wants to attack

  }

}

// export humanPlayer class
module.exports.HumanPlayer = HumanPlayer;
