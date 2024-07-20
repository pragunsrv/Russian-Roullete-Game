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
    const bulletCountInput = document.getElementById("bulletCount");
    const applySettingsButton = document.getElementById("applySettings");
    const leaderboardList = document.getElementById("leaderboardList");

    let chamberPosition = 0;
    let bulletPositions = [Math.floor(Math.random() * 6)];
    let gameHistory = [];
    let players = [];
    let currentPlayerIndex = 0;
    let roundsPlayed = 0;
    let playersSafe = 0;
    let playersDead = 0;
    let leaderboard = {};

    function updateStatus() {
        chamberPositionDisplay.textContent = chamberPosition;
        bulletPositionDisplay.textContent = bulletPositions.join(', ');
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

    function updateLeaderboard() {
        leaderboardList.innerHTML = '';
        const sortedPlayers = Object.keys(leaderboard).sort((a, b) => leaderboard[b] - leaderboard[a]);
        sortedPlayers.forEach(player => {
            const li = document.createElement('li');
            li.textContent = `${player}: ${leaderboard[player]} safe rounds`;
            leaderboardList.appendChild(li);
        });
    }

    function spinChamber() {
        chamberPosition = Math.floor(Math.random() * 6);
        message.textContent = "Chamber is spun.";
        updateStatus();
    }

    function pullTrigger() {
        if (bulletPositions.includes(chamberPosition)) {
            message.textContent = `Bang! Player ${players[currentPlayerIndex]} is dead!`;
            gameHistory.push(`Bang! Player ${players[currentPlayerIndex]} is dead.`);
            playersDead++;
            if (leaderboard[players[currentPlayerIndex]]) {
                delete leaderboard[players[currentPlayerIndex]];
            }
        } else {
            message.textContent = `Click. Player ${players[currentPlayerIndex]} is safe.`;
            gameHistory.push(`Click. Player ${players[currentPlayerIndex]} is safe.`);
            playersSafe++;
            if (!leaderboard[players[currentPlayerIndex]]) {
                leaderboard[players[currentPlayerIndex]] = 0;
            }
            leaderboard[players[currentPlayerIndex]]++;
        }
        chamberPosition = (chamberPosition + 1) % 6;
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        roundsPlayed++;
        updateStatus();
        updateHistory();
        updateStatistics();
        updateLeaderboard();
    }

    function resetGame() {
        chamberPosition = 0;
        bulletPositions = [Math.floor(Math.random() * 6)];
        gameHistory = [];
        players = [];
        currentPlayerIndex = 0;
        roundsPlayed = 0;
        playersSafe = 0;
        playersDead = 0;
        leaderboard = {};
        message.textContent = '';
        updateStatus();
        updateHistory();
        updateStatistics();
        updateLeaderboard();
    }

    function addPlayer() {
        const playerName = prompt("Enter player name:");
        if (playerName) {
            players.push(playerName);
            const li = document.createElement('li');
            li.textContent = playerName;
            playerList.appendChild(li);
            updateStatus();
        }
    }

    function removePlayer() {
        const playerName = prompt("Enter player name to remove:");
        if (playerName && players.includes(playerName)) {
            players = players.filter(player => player !== playerName);
            playerList.innerHTML = '';
            players.forEach(player => {
                const li = document.createElement('li');
                li.textContent = player;
                playerList.appendChild(li);
            });
            updateStatus();
        }
    }

    function applySettings() {
        const bulletCount = parseInt(bulletCountInput.value);
        if (bulletCount > 0 && bulletCount <= 6) {
            bulletPositions = [];
            while (bulletPositions.length < bulletCount) {
                const position = Math.floor(Math.random() * 6);
                if (!bulletPositions.includes(position)) {
                    bulletPositions.push(position);
                }
            }
            message.textContent = "Settings applied.";
            updateStatus();
        } else {
            message.textContent = "Invalid bullet count.";
        }
    }

    spinChamberButton.addEventListener("click", spinChamber);
    pullTriggerButton.addEventListener("click", pullTrigger);
    resetGameButton.addEventListener("click", resetGame);
    addPlayerButton.addEventListener("click", addPlayer);
    removePlayerButton.addEventListener("click", removePlayer);
    applySettingsButton.addEventListener("click", applySettings);

    resetGame();
});
