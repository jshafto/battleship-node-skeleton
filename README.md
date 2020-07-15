# Battleship Project
## About this Implementation
Project from App Academy, implementation by Juliet Shafto and Andrea Jackson.

### How to use this game:
- Game will play using arguments passed in when calling `main.js`
  - arguments should be the board height, the board width, and number of targets.
  - ships take up a single square
  - computer sets up a board, and player guesses until they hit every ship

### Features left to implement:
  - different sized ships
  - limit on number of turns
    - set a lose condition—right now game doesn't end until player has won
  - two boards so you can play against computer or against other player

## Approach to the problem

How do we go about designing the classes and methods needed for this game?

### What is the problem?

We want to be able to implement a game called Battleship.

We want our user, a human player, to be able to use the terminal to play the game. That means they need to know what the state of the game is, and how to tell the game what they want to do.

The state of the game can be represented by a board that conventionally has 10x10 squares, but let's say that we want to make the number of rows and columns variable to whatever the we want (this will be helpful for testing as well).

To change the state of the game, a user must attack a square. If that square has a ship on it, then that square has been successfully hit. If there is no ship, then that's considered a miss. Hits, misses, and squares that haven't been attacked yet should be displayed to the player, but not the ships if they haven't been hit.

### Formulating the Classes and Methods

Now that we know the problem, we can start with brainstorming how we want the classes and methods to look like. I always suggest separating the game logic from the UI (user interface) as it makes reading the code much easier and separates the roles of the classes better.

Our user will be interacting with the terminal by seeing the state of the game being printed, and writing to the terminal what they want their next move to be. So let's think about creating a user class, and call it `HumanPlayer`.

**Try to come up with methods that we can define on the `HumanPlayer` based on what the `HumanPlayer` role is.**

Now that you have an initial design of how the `HumanPlayer` can be implemented, let's try solving another part of the problem, which is representing the state of the game and changing it.

Let's give the responsibility of knowing and maintaining the state of the game to a single class called `Board`. Based on what we know about the state and how it changes, try coming up with methods that might be on the `Board` class.

Now you should have the basic roles of the game covered! But how are they going to interact with each other? Let's create a class, `BattleshipGame` that will handle the integration between both the game and UI layers (`Board` and `HumanPlayer` class). For example, a single turn in Battleship displays the current state of the game to the player, asks for the player's attack coordinates input, then updates the state of the game. The `Battleship` class will store a reference to the `HumanPlayer` and the `Board` so it will be able to ask for the player's attack input as well as tell the board what the input was.

**Try coming up with different methods that the `BattleshipGame` class might need.**

Awesome! Now we should have a basic outline of all the classes and methods we need to create a simple implementation of Battleship! Let's move on to the code!

## `Board` class

The `Board` class's responsibility is to remember the current state of the game and to change the state of the game based on an attack coordinate.

First, things first, we need to initialize the state of the game. When a new instance of `Board` is created, we need to create this state. In this problem, we can represent the state of the board, which is supposed to be a `n x m` grid, in a 2-D array. We also need to populate the grid, or the 2-D array, with ships. For now, let's represent one ship being one square.

So there are now three questions that come to mind with this. How many rows are there? How many columns are there? And, how many ships are there? These should be determined by the user or the set up of the game, not determined by the `Board` class. So when the `Board` is initialized, we should expect `numRows` and `numCols` and `numShips` parameters to be passed in.

Now that we know how big our grid should be, we need to randomly populate the grid with the number of ships specified. Let's create a `Board#populateGrid` method that will create a grid using those parameters and set it to `this.grid`. Make sure to call this method upon initialization. **For now, let's represent an empty space with `null` and a space with a ship with the string, `"s"`. We can represent a ship that is hit with the string, `"h"`, and an empty space that is hit with the string, `"x"`.**

How will the game know when the game is over? In Battleship, the game is over when all the ships are hit. The `Board` class hold this information. It knows which ships haven't been hit yet, which ships have been hit, and all the empty spaces. We can create an interface on the `Board` class that the `BattleshipGame` class can use to determine if the game is over. Let's do this by implementing a method, `Board#gameOver` that will return `true` when the game is over, and false when it is not.

A change in the state of the game should be triggered when the player determines a valid position to hit on the grid. Since the `Board` class holds the state of the game, we should get the `Board` class to change it. Let's make a method, `Board#attack` that will take in a position that the user wants to attack in the form of an array, `[row, col]`, and change the depending on if the square at that position in the grid is empty or has a ship.

**Make sure you are testing and debugging each of the methods after you create them.**

Great! Now we can move onto making methods for the `HumanPlayer` class. We can implement more methods if we need to when we see the need for it.

## `HumanPlayer` class

The `HumanPlayer` class's responsibility is to ask the input from the user through the terminal. The way our `HumanPlayer` can interact with the terminal is by using the built-in node module called `readline`. Whenever a `HumanPlayer` is created, it should instantiate a new `readline` interface and store it on the created instance of `HumanPlayer`.

Reminder of how `readline` works:

```javascript
const readline = require('readline');

const rl = readline.createInterface(process.stdin, process.stdout);

// rl.question is an asynchronous function!!
rl.question("Whatever prompt you want to ask the user", answer => {
  // do stuff with that answer

  // rl.close() // if want to close the game
});
```

To get the input of a `HumanPlayer` is asked for their input, we should use `readline` to ask a question and get an answer using the terminal. Let's create a method called `getMove` that will ask the question and process the answer. Remember, `rl.question` is an asynchronous function, so we can only execute the next step in the game once the answer comes back. How do we solve this issue? We can trigger the next step in the game once the answer comes back by invoking a function. Let's pass in a parameter to the `getMove` method that will be a **callback function** that gets called and **passed in the answer**. This function will be responsible for triggering the next step to the game after the user input comes back.

**Make sure to test the `HumanPlayer` methods.**

For now, that's all we really need from the `HumanPlayer` class. We can always get back to it if we need to.

## `BattleshipGame` class

**Make sure to test the `BattleshipGame` methods as you make them.**

The `BattleshipGame` class is responsible for handling the flow of the game and integrating the user input and the logic of the game. When a game is first created, we need to know a few things, 1) who is playing the game, 2) how big the grid should be, 3) how many ships the game should have. Let's create a new `HumanPlayer` and a new `Board` when a new `Battleship` game is created and keep track of it so any method in the `BattleshipGame` class can easily access this information.

When the game first start, what do you envision happening first? The game should show you the current state of the game and ask for the user's input. How many times does that happen? This should happen as many times as it takes until the game is over. Let's make a method `BattleshipGame#playTurn` that will do those same repetitive action in one function. How do we initiate the next `playTurn` though? Getting the user input is an asynchronous action and we don't know when we should initiate the next turn. Remember that callback function that we passed into `HumanPlayer#getMove`? This function that gets passed in will initiate the next turn.

Let's create a method that we can pass into `HumanPlayer#getMove`. In this method, we should be initializing the next turn if it's necessary. Ask yourself, is there ever a time where we don't want to play another turn?

Great! Now we handled the user input part of `BattleshipGame#playTurn`, but what about showing the state of the game? Let's create a method called `BattleshipGame#displayStatus` that will show the state of the game. The `BattleshipGame` instance, though, doesn't know what the state of the game is. The `Board` instance that it has a reference to does!

To show the state of the game in a readable way to the user, we need `Board` to create a string which will represent the `grid` in a printable way. Create a method called `Board#display` that will return a string which can be printed to the terminal to look something like this for a 4 x 4 grid:

```
   0 1 2 3
  ---------
A |x| | |x|
  ---------
B | |h| | |
  ---------
C | |x| | |
  ---------
D |x| |h| |
  ---------
```

Let's print out the result of the `Board#display` method in `BattleshipGame#displayStatus`.

At this point, are there any places that you are violating the **Law of Demeter**? If yes, then refactor your code!

Awesome! Now you should have a working game if we initiate a new `BattleshipGame` instance and call `BattleshipGame#playTurn`. Let's create a `main.js` file that will do that when we run the file in node and play the game!

## Bonus

- Add a `ComputerPlayer` class that will fire at random positions on the
  board. Make it as smart as you can; ensure that it doesn't fire at the
  same position twice. You should not need to modify any logic internal
  to your `BattleshipGame` class in order to support computer players.
- Refactor your game so that there are two players, each with his or her
  own board. Players should take turns firing at each other's fleet.
- Introduce a "setup" phase, where each player can place ships on their
  board.
- Update your game to use different types of ships, each of a different
  size. Here are the canonical ship sizes (though of course you could
  choose your own):

| Ship type | Dimensions |
| ----------|----------- |
| Aircraft carrier | 5x1 |
| Battleship | 4x1 |
| Submarine | 3x1 |
| Destroyer (or Cruiser) | 3x1 |
| Patrol boat (or destroyer) | 2x1 |
