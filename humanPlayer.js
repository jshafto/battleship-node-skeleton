const readline = require("readline");

class HumanPlayer {
    constructor() {
        // create the interface that will interact with the user
        this.interface = readline.createInterface(process.stdin, process.stdout);
  }

  getMove (cb) {
    // pass the answer back to the callback that lets you
    // process that answer within the main BattleshipGame object
    this.interface.question("What's your next move? ", cb)
  }

}

// export humanPlayer class
module.exports.HumanPlayer = HumanPlayer;
