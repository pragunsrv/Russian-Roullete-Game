document.addEventListener("DOMContentLoaded", function() {
    const spinChamberButton = document.getElementById("spinChamber");
    const pullTriggerButton = document.getElementById("pullTrigger");
    const message = document.getElementById("message");
    const chamberPositionDisplay = document.getElementById("chamberPosition");
    const bulletPositionsDisplay = document.getElementById("bulletPositions");
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
    const soundToggle = document.getElementById("soundToggle");
    const achievementsList = document.getElementById("achievementsList");
    const chatBox = document.getElementById("chatBox");
    const sendMessageButton = document.getElementById("sendMessage");
    const chatMessages = document.getElementById("chatMessages");

    let chamberPosition = 0;
    let bulletPositions = [];
    let gameHistory = [];
    let players = [];
    let currentPlayerIndex = 0;
    let roundsPlayed = 0;
    let playersSafe = 0;
    let playersDead = 0;
    let leaderboard = {};
    let achievements = [];
    let soundEnabled = false;
    let chatLog = [];

    function updateStatus() {
        chamberPositionDisplay.textContent = chamberPosition;
        bulletPositionsDisplay.textContent = bulletPositions.join(', ');
        currentPlayerDisplay.textContent = players.length > 0 ? players[currentPlayerIndex] : "None";
    }

    function updateHistory() {
        historyList.innerHTML = '';
        gameHistory.forEach(entry => {
            const li = document.createElement('li');
            li.textContent = entry;
            historyList.appendChild(li);
        });
    }

    function updateLeaderboard() {
        leaderboardList.innerHTML = '';
        Object.keys(leaderboard).forEach(player => {
            const li = document.createElement('li');
            li.textContent = `${player}: ${leaderboard[player]} safe rounds`;
            leaderboardList.appendChild(li);
        });
    }

    function updateAchievements() {
        achievementsList.innerHTML = '';
        achievements.forEach(achievement => {
            const li = document.createElement('li');
            li.textContent = achievement;
            achievementsList.appendChild(li);
        });
    }

    function updateChat() {
        chatMessages.innerHTML = '';
        chatLog.forEach(message => {
            const li = document.createElement('li');
            li.textContent = message;
            chatMessages.appendChild(li);
        });
    }

    function playSound(type) {
        const audio = new Audio();
        switch (type) {
            case 'spin':
                audio.src = 'sounds/spin.mp3';
                break;
            case 'bang':
                audio.src = 'sounds/bang.mp3';
                break;
            case 'click':
                audio.src = 'sounds/click.mp3';
                break;
        }
        audio.play();
    }

    function spinChamber() {
        chamberPosition = Math.floor(Math.random() * 6);
        bulletPositions.forEach((pos, index) => {
            if (chamberPosition === pos) {
                bulletPositions.splice(index, 1);
            }
        });
        if (soundEnabled) playSound('spin');
        updateStatus();
        gameHistory.push(`Chamber spun to position ${chamberPosition}.`);
        updateHistory();
    }

    function pullTrigger() {
        if (bulletPositions.includes(chamberPosition)) {
            message.textContent = `Bang! ${players[currentPlayerIndex]} is dead!`;
            playersDead++;
            if (soundEnabled) playSound('bang');
        } else {
            message.textContent = `Click. ${players[currentPlayerIndex]} is safe.`;
            playersSafe++;
            if (soundEnabled) playSound('click');
        }
        chamberPosition = (chamberPosition + 1) % 6;
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
        roundsPlayed++;
        updateStatus();
        updateStatistics();
    }

    function updateStatistics() {
        roundsPlayedDisplay.textContent = roundsPlayed;
        playersSafeDisplay.textContent = playersSafe;
        playersDeadDisplay.textContent = playersDead;
    }

    function resetGame() {
        chamberPosition = 0;
        bulletPositions = [];
        gameHistory = [];
        players = [];
        currentPlayerIndex = 0;
        roundsPlayed = 0;
        playersSafe = 0;
        playersDead = 0;
        leaderboard = {};
        achievements = [];
        chatLog = [];
        message.textContent = '';
        updateStatus();
        updateHistory();
        updateLeaderboard();
        updateAchievements();
        updateChat();
        updateStatistics();
    }

    function addPlayer() {
        const playerName = prompt("Enter player name:");
        if (playerName) {
            players.push(playerName);
            const li = document.createElement('li');
            li.textContent = playerName;
            playerList.appendChild(li);
            leaderboard[playerName] = 0;
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
            delete leaderboard[playerName];
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

    function toggleSound() {
        soundEnabled = soundToggle.checked;
        message.textContent = soundEnabled ? "Sound enabled." : "Sound disabled.";
    }

    function sendMessage() {
        const text = chatBox.value.trim();
        if (text) {
            chatLog.push(`${players[currentPlayerIndex]}: ${text}`);
            chatBox.value = '';
            updateChat();
        }
    }

    spinChamberButton.addEventListener("click", spinChamber);
    pullTriggerButton.addEventListener("click", pullTrigger);
    resetGameButton.addEventListener("click", resetGame);
    addPlayerButton.addEventListener("click", addPlayer);
    removePlayerButton.addEventListener("click", removePlayer);
    applySettingsButton.addEventListener("click", applySettings);
    soundToggle.addEventListener("change", toggleSound);
    sendMessageButton.addEventListener("click", sendMessage);

    resetGame();
});
