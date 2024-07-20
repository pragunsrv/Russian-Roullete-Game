document.addEventListener("DOMContentLoaded", function() {
    const spinChamberButton = document.getElementById("spinChamber");
    const pullTriggerButton = document.getElementById("pullTrigger");
    const message = document.getElementById("message");

    spinChamberButton.addEventListener("click", function() {
        message.textContent = "Chamber is spun.";
    });

    pullTriggerButton.addEventListener("click", function() {
        message.textContent = "Trigger pulled.";
    });
});
