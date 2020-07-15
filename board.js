class Board {
    constructor(numRows, numCols, numShips) {
        this.numRows = numRows;
        this.numCols = numCols;
        this.numShips = numShips;
        // create the grid property
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

            // while there is already a ship in that position
            while (boardArr[randRow][randCol]) {
                // keep generating random positions
                randRow = Math.floor(Math.random() * this.numRows);
                randCol = Math.floor(Math.random() * this.numCols);
            }
            // once you have a unique position, put a ship in it
            boardArr[randRow][randCol] = "s"
        }
        // returns grid
        return boardArr;
    }

    gameOver() {
        // check if there are any ships left
        // if you find a ship that has not been hit, return false
        // if all ships have been hit, return true
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
        // if there is a ship
        if (this.grid[row][col] === "s") {
            //set location to a hit
            this.grid[row][col] = "h";
        } else {
            // set location to a miss
            this.grid[row][col] = "x";
        }
    }

    display() {
        // original spec said to return position as string
        // but as a shortcut, we just create a version of the array
        // where all the ships are hidden
        // and rely on console.table to properly render the array into the console
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

module.exports.Board = Board
