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
    const chamberCountInput = document.getElementById("chamberCount");
    const applyChamberSettingsButton = document.getElementById("applyChamberSettings");
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
    let chamberCount = 6;

    function updateStatus() {
        chamberPositionDisplay.textContent = chamberPosition;
        bulletPositionsDisplay.textContent = bulletPositions.join(', ');
        currentPlayerDisplay.textContent = players.length > 0 ? players[currentPlayerIndex] : "None";
        roundsPlayedDisplay.textContent = roundsPlayed;
        playersSafeDisplay.textContent = playersSafe;
        playersDeadDisplay.textContent = playersDead;
    }

    function updateHistory() {
        historyList.innerHTML = '';
        gameHistory.forEach(entry => {
            const li = document.createElement("li");
            li.textContent = entry;
            historyList.appendChild(li);
        });
    }

    function updateLeaderboard() {
        leaderboardList.innerHTML = '';
        for (const [player, score] of Object.entries(leaderboard)) {
            const li = document.createElement("li");
            li.textContent = `${player}: ${score}`;
            leaderboardList.appendChild(li);
        }
    }

    function updateAchievements() {
        achievementsList.innerHTML = '';
        achievements.forEach(achievement => {
            const li = document.createElement("li");
            li.textContent = achievement;
            achievementsList.appendChild(li);
        });
    }

    function playSound(effect) {
        if (soundEnabled) {
            const audio = new Audio(`sounds/${effect}.mp3`);
            audio.play();
        }
    }

    function spinChamber() {
        chamberPosition = Math.floor(Math.random() * chamberCount);
        bulletPositions = [];
        for (let i = 0; i < bulletCountInput.value; i++) {
            let pos;
            do {
                pos = Math.floor(Math.random() * chamberCount);
            } while (bulletPositions.includes(pos));
            bulletPositions.push(pos);
        }
        updateStatus();
        gameHistory.push(`Chamber spun to position ${chamberPosition}. Bullets at ${bulletPositions.join(', ')}.`);
        updateHistory();
        playSound('spin');
    }

    function pullTrigger() {
        const isBullet = bulletPositions.includes(chamberPosition);
        if (isBullet) {
            gameHistory.push(`${players[currentPlayerIndex]} lost!`);
            playersDead++;
            playSound('click');
        } else {
            gameHistory.push(`${players[currentPlayerIndex]} survived!`);
            playersSafe++;
            playSound('safe');
        }

        roundsPlayed++;
        updateStatus();
        updateHistory();
        if (players.length > 0) {
            currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
            if (playersDead === players.length) {
                gameHistory.push('Game over! All players are dead.');
                updateHistory();
            }
        }
    }

    spinChamberButton.addEventListener("click", spinChamber);
    pullTriggerButton.addEventListener("click", pullTrigger);

    applySettingsButton.addEventListener("click", () => {
        bulletCount = parseInt(bulletCountInput.value);
        spinChamber();
    });

    applyChamberSettingsButton.addEventListener("click", () => {
        chamberCount = parseInt(chamberCountInput.value);
        spinChamber();
    });

    resetGameButton.addEventListener("click", () => {
        chamberPosition = 0;
        bulletPositions = [];
        players = [];
        currentPlayerIndex = 0;
        roundsPlayed = 0;
        playersSafe = 0;
        playersDead = 0;
        gameHistory = [];
        leaderboard = {};
        achievements = [];
        chatLog = [];
        updateStatus();
        updateHistory();
        updateLeaderboard();
        updateAchievements();
        chatMessages.innerHTML = '';
        playSound('reset');
    });

    addPlayerButton.addEventListener("click", () => {
        const playerName = prompt("Enter player name:");
        if (playerName) {
            players.push(playerName);
            leaderboard[playerName] = 0;
            updateStatus();
            updateLeaderboard();
        }
    });

    removePlayerButton.addEventListener("click", () => {
        const playerName = prompt("Enter player name to remove:");
        const index = players.indexOf(playerName);
        if (index > -1) {
            players.splice(index, 1);
            delete leaderboard[playerName];
            updateStatus();
            updateLeaderboard();
        }
    });

    sendMessageButton.addEventListener("click", () => {
        const messageText = chatBox.value.trim();
        if (messageText) {
            chatLog.push(messageText);
            const li = document.createElement("li");
            li.textContent = messageText;
            chatMessages.appendChild(li);
            chatBox.value = '';
            playSound('message');
        }
    });

    soundToggle.addEventListener("change", () => {
        soundEnabled = soundToggle.checked;
    });

    function addAchievement(achievement) {
        achievements.push(achievement);
        updateAchievements();
    }
});
