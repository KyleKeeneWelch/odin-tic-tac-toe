"use strict";

// Assign X or O to player.
const Player = (sign) => {
    const _sign = sign;

    const getSign = () => {
        return _sign
    }

    return {getSign};
};

// Keep track of grid array and set and get array fields.
const GameGrid = (() => {
    const grid = ['', '', '', '', '', '', '', '', ''];

    const setField = (index, sign) => {
        if (index > grid.length) return;
        grid[index] = sign;
      };
    
      const getField = (index) => {
        if (index > grid.length) return;
        return grid[index];
      };
    
      const restart = () => {
        for (let i = 0; i < grid.length; i++) {
          grid[i] = '';
        }
      }

      return {setField, getField, restart};
})();

// Modal to display outcome and restart.
const Modal = (() => {
    const modal = document.getElementById('modal');
    const overlay = document.getElementById('overlay');
    const gameOutcome = document.getElementById('game-outcome');

    const openModal = () => {
        modal.classList.add('active');
        overlay.classList.add('active');
    };

    const closeModal = () => {
        modal.classList.remove('active');
        overlay.classList.remove('active');
    };

    const setGameOutcome = (outcome) => {
        openModal();
        gameOutcome.textContent = outcome;
    };

    return {closeModal, setGameOutcome};
})();

// Handles display elements.
const DisplayController = (() => {
    const gameGrid = document.getElementById('game-grid');
    const startBtn = document.getElementById('start-btn');
    const restartBtn = document.getElementById('restart-btn');
    const mainContainer = document.getElementById('main-container');
    const fields = document.querySelectorAll('.field');
    const playerTurn = document.getElementById('player-turn');
    const roundCounter = document.getElementById('round-counter');

    // Hides start elements and displays main elements.
    startBtn.addEventListener("click", (e) => {
        e.target.parentNode.parentNode.style.display = 'none';
        mainContainer.style.display = 'flex';
    });

    // Each field sets the current player's sign if not already assigned and game not over.
    fields.forEach(field => {
        field.addEventListener("click", (e) => {
            if (GameController.getGameOver() || e.target.textContent !== "") return;
            GameController.playRound(parseInt(e.target.dataset.index));
            updateGrid();
        })
    });

    // Resets grid, display and game elements.
    restartBtn.addEventListener("click", (e) => {
        GameController.restart();
        GameGrid.restart();
        DisplayController.setRoundText(1)
        Modal.closeModal();
        updateGrid();
    });

    //  Rebuilds grid with newly assigned grid array values.
    const updateGrid = () => {
        for (let i = 0; i < fields.length; i++) {
            fields[i].textContent = GameGrid.getField(i);
        }
    };

    // Displays outcome.
    const setModalGameOver = (outcome) => {
        if (outcome === "Draw") {
            Modal.setGameOutcome("Game has reached a Draw!");
        } else {
            Modal.setGameOutcome(`Player ${outcome} has won!`);
        }
    };

    // Displays next player's turn.
    const setPlayerTurnText = (text) => {
        playerTurn.textContent = `Player ${text}'s turn`;
    };

    // Displays round.
    const setRoundText = (round) => {
        roundCounter.textContent = `Round: ${round}`
    }

    return {setModalGameOver, setPlayerTurnText, setRoundText}
})()

// Handles core game elements and players.
const GameController = (() => {
    const playerX = Player("X")
    const playerO = Player("O")
    let currentRound = 1
    let gameOver = false

    // Set field sign if not done and game not over. Check for win or draw. Increment round.
    const playRound = (index) => {
        GameGrid.setField(index, getCurrentPlayerSign())

        if (roundWinner(index)) {
            DisplayController.setModalGameOver(getCurrentPlayerSign())
            gameOver = true
            return
        }

        if (currentRound === 9) {
            DisplayController.setModalGameOver("Draw")
            gameOver = true
            return
        }

        currentRound++
        DisplayController.setRoundText(currentRound)
        DisplayController.setPlayerTurnText(getCurrentPlayerSign())
    }

    // Winning combinations.
    const roundWinner = (index) => {
        const winCombinations = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]

        // True if there is a winning combination that the current player's sign has signs in. 
        return winCombinations.filter(
            (combination) => combination.includes(index)
        ).some(
            (possibleCombination) => possibleCombination.every(
                (field) => GameGrid.getField(field) === getCurrentPlayerSign()
            )
        )
    }

    // Returns current player's sign.
    const getCurrentPlayerSign = () => {
        return currentRound % 2 === 1 ? playerX.getSign() : playerO.getSign()
    }

    const getGameOver = () => {
        return gameOver
    }

    const restart = () => {
        currentRound = 1
        gameOver = false
    }

    return {playRound, getGameOver, restart}
})()