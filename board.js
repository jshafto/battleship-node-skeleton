class Board {
    constructor(numRows, numCols, numShips) {
        this.numRows = numRows;
        this.numCols = numCols;
        this.numShips = numShips;

        this.grid = this.populateGrid();
    }

    populateGrid() {
        // make a grid
        let boardArr = [];
        for (let i = 0; i < this.numRows; i++) {
            // push new row (empty array)
            boardArr.push([]);
            for (let j = 0; j < this.numCols; j++) {
                // push new null value into current row
                boardArr[i].push(null);
            }
        }

        // for each ship, generate random position
        // set the value of the array at each postion to "S"
        for (let i = 0; i < this.numShips; i++) {
            //generate a random position
            let randRow = Math.floor(Math.random() * this.numRows);
            let randCol = Math.floor(Math.random() * this.numCols);

            while (boardArr[randRow][randCol]) {
                randRow = Math.floor(Math.random() * this.numRows);
                randCol = Math.floor(Math.random() * this.numCols);
            }
            // randomly position ships on the grid
            boardArr[randRow][randCol] = "s"
        }
        // console.table(boardArr);
        // set this.grid = grid you just made
        // this.grid = boardArr;
        return boardArr;
    }

    gameOver() {
        // check if game is over (all ships have been hit)
        // return boolean value whether game is over
        for (let i = 0; i < this.numRows; i++) {
            for (let j = 0; j < this.numCols; j++) {
                if (this.grid[i][j] === "s") {
                    return false;
                }
            }

        }
        return true;
    }

    attack(position) {
        // position is an array [row, col]
        let [row, col] = position;
        if (this.grid[row][col] === "s") {
            //set location to "h"
            this.grid[row][col] = "h";
        } else {
            this.grid[row][col] = "x";
        }
        // console.table(this.grid);
        // if there is nothing there
        // change it to x
        // change state of grid based on whther the position is
        // empty or holds a ship
    }

    display() {
        //return string in a visual representation of the grid
        //as a string
        // don't include the ships cause otherwise the player
        // would know where they are
        let dispGrid = this.grid.map(row => {
            return row.map(el => {
                if (el === "s" || el === null) {
                    return "unknown";
                }
                return el;
            })

        });
        return dispGrid;
    }

}


// let myBoard = new Board(4, 4, 4);
// myBoard.populateGrid();
// myBoard.attack([0,2]);
// myBoard.display();
// myBoard.attack([1, 3]);
// myBoard.display();
// console.log(myBoard.gameOver());













module.exports.Board = Board
