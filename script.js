document.addEventListener("DOMContentLoaded", function() {
    const spinChamberButton = document.getElementById("spinChamber");
    const pullTriggerButton = document.getElementById("pullTrigger");
    const message = document.getElementById("message");
    const chamberPositionDisplay = document.getElementById("chamberPosition");
    const bulletPositionDisplay = document.getElementById("bulletPosition");
    const historyList = document.getElementById("historyList");
    const resetGameButton = document.getElementById("resetGame");

    let chamberPosition = 0;
    let bulletPosition = Math.floor(Math.random() * 6);
    let gameHistory = [];

    spinChamberButton.addEventListener("click", function() {
        chamberPosition = Math.floor(Math.random() * 6);
        message.textContent = "Chamber is spun.";
        updateStatus();
    });

    pullTriggerButton.addEventListener("click", function() {
        if (chamberPosition === bulletPosition) {
            message.textContent = "Bang! You're dead!";
            gameHistory.push("Bang! Player dead.");
        } else {
            message.textContent = "Click. You're safe.";
            gameHistory.push("Click. Player safe.");
        }
        chamberPosition = (chamberPosition + 1) % 6;
        updateStatus();
        updateHistory();
    });

    resetGameButton.addEventListener("click", function() {
        chamberPosition = 0;
        bulletPosition = Math.floor(Math.random() * 6);
        gameHistory = [];
        message.textContent = "Game reset. Spin the chamber to start.";
        updateStatus();
        updateHistory();
    });

    function updateStatus() {
        chamberPositionDisplay.textContent = chamberPosition;
        bulletPositionDisplay.textContent = bulletPosition;
    }

    function updateHistory() {
        historyList.innerHTML = '';
        gameHistory.forEach((event, index) => {
            const li = document.createElement('li');
            li.textContent = `Round ${index + 1}: ${event}`;
            historyList.appendChild(li);
        });
    }

    updateStatus();
    updateHistory();
});
