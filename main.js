// initiate new BattleshipGame instance
// call BattleshipGame.playTurn()

const {BattleshipGame} = require("./battleshipGame.js");
const [one, two, ...args] = process.argv;

console.log("Welcome to Battleship.");
console.log("Let's play a game!")


const game = new BattleshipGame(...args);
