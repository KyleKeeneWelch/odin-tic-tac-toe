# odin-tic-tac-toe
This project is a project undertaken as part of `The Odin Project` learning web course teaching `HTML`, `CSS` and `JavaScript` skills. It involved putting into practice the teachings of `Factory Functions` and `IIFEs` taught in the previous lessons to create effective data structures and organized code.

The project aims to emulate the popular Tic-Tac-Toe game for two players. It involves display and game elements which will show current game output and process user input to update the state of the game. Through the use of `factory functions` and `IIFE`s we can create application objects upon the script running in the browser which allows us to prepare the page to receive and handle player input.  

Much of the data is handled through an Object-Oriented approach in JavaScript but applies `factory functions` as the take on creating objects instead of the popular use of `constructors`. `Factory functions` enable the developer to return only the properties and functions that they want to be publicly accessed and to essentially hide the rest. Returned public elements still have access to private, hidden elements in the object and this enforces the concept of `closure`. We prevent errors and allow for easier debugging and modification of code by using `Factory functions` this way. 

## Features

- **Two Player** - Provides support for two players to play the game each with there own sign. Rounds alternate meaning it is the other player's go once a field has been selected and a sign placed.

- **Outcome Modal** - After each round played, the application will check the winning combinations to see if the current player has three consecutive signs in each of the field's indexs. The outcome is displayed within a modal shown to the user at the center of the screen alongside a restart button.  

- **Draws** - If no player is able to receive a winning combination after 9 rounds, then the outcome modal is displayed with text declaring the game a draw.
