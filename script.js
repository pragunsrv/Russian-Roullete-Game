document.addEventListener("DOMContentLoaded", function() {
    const spinChamberButton = document.getElementById("spinChamber");
    const pullTriggerButton = document.getElementById("pullTrigger");
    const message = document.getElementById("message");
    const chamberPositionDisplay = document.getElementById("chamberPosition");
    const bulletPositionDisplay = document.getElementById("bulletPosition");
    const historyList = document.getElementById("historyList");
    const resetGameButton = document.getElementById("resetGame");
    const addPlayerButton = document.getElementById("addPlayer");
    const removePlayerButton = document.getElementById("removePlayer");
    const playerList = document.getElementById("playerList");
    const currentPlayerDisplay = document.getElementById("currentPlayer");
    const roundsPlayedDisplay = document.getElementById("roundsPlayed");
    const playersSafeDisplay = document.getElementById("playersSafe");
    const playersDeadDisplay = document.getElementById("playersDead");

    let chamberPosition = 0;
    let bulletPosition = Math.floor(Math.random() * 6);
    let gameHistory = [];
    let players = [];
    let currentPlayerIndex = 0;
    let roundsPlayed = 0;
    let playersSafe = 0;
    let playersDead = 0;

    function updateStatus() {
        chamberPositionDisplay.textContent = chamberPosition;
        bulletPositionDisplay.textContent = bulletPosition;
        currentPlayerDisplay.textContent = players.length > 0 ? players[currentPlayerIndex] : "None";
    }

    function updateHistory() {
        historyList.innerHTML = '';
        gameHistory.forEach((event, index) => {
            const li = document.createElement('li');
            li.textContent = `Round ${index + 1}: ${event}`;
            historyList.appendChild(li);
        });
    }

    function updateStatistics() {
        roundsPlayedDisplay.textContent = roundsPlayed;
        playersSafeDisplay.textContent = playersSafe;
        playersDeadDisplay.textContent = playersDead;
    }

    spinChamberButton.addEventListener("click", function() {
        chamberPosition = Math.floor(Math.random() * 6);
        message.textContent = "Chamber is spun.";
        updateStatus();
    });

    pullTriggerButton.addEventListener("click", function() {
        if (chamberPosition === bulletPosition) {
            message.textContent = `Bang! Player ${players[currentPlayerIndex]} is dead!`;
            gameHistory.push(`Bang! Player ${players[currentPlayerIndex]} is dead.`);
            playersDead++;
        } else {
            message.textContent = `Click. Player ${players[currentPlayerIndex]} is safe.`;
            gameHistory.push(`Click. Player ${players[currentPlayerIndex]} is safe.`);
            playersSafe++;
        }
        chamberPosition = (chamberPosition + 1) % 6;
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        roundsPlayed++;
        updateStatus();
        updateHistory();
        updateStatistics();
    });

    resetGameButton.addEventListener("click", function() {
        chamberPosition = 0;
        bulletPosition = Math.floor(Math.random() * 6);
        gameHistory = [];
        players = [];
        currentPlayerIndex = 0;
        roundsPlayed = 0;
        playersSafe = 0;
        playersDead = 0;
        message.textContent = "Game reset. Spin the chamber to start.";
        updateStatus();
        updateHistory();
        updateStatistics();
    });

    addPlayerButton.addEventListener("click", function() {
        const playerName = `Player ${players.length + 1}`;
        players.push(playerName);
        const li = document.createElement('li');
        li.textContent = playerName;
        playerList.appendChild(li);
        updateStatus();
    });

    removePlayerButton.addEventListener("click", function() {
        if (players.length > 0) {
            players.pop();
            playerList.removeChild(playerList.lastChild);
            updateStatus();
        }
    });

    updateStatus();
    updateHistory();
    updateStatistics();
});
