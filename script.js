// GET HTML ELEMENTS
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");
const character = document.getElementById("character");
const question = document.getElementById("question");

const yesOverlay = document.getElementById("yesOverlay");
const letterOverlay = document.getElementById("letterOverlay");

const letterBtn = document.getElementById("letterBtn");
const yesClose = document.getElementById("yesClose");
const letterClose = document.getElementById("letterClose");

const hearts = document.getElementById("hearts");

// VARIABLES
let dodgeCount = 0;
let noStopped = false;
let noClickCount = 0;

// NO BUTTON MESSAGES
const noMessages = [
    "Are you sure? 🥺",
    "Please think again... 💗",
    "Don't break my heart! 😭",
    "Give me one chance? 🧸",
    "Pretty please? 🥹",
    "I will be waiting for your answer 💕"
];

// YES BUTTON
yesBtn.addEventListener("click", () => {

    yesOverlay.classList.add("show");

    character.innerHTML = '<div class="teddy">🥰</div>';

    // HEART CELEBRATION
    for (let i = 0; i < 60; i++) {
        createHeart();
    }
});

// CLOSE YES POPUP
yesClose.addEventListener("click", () => {

    yesOverlay.classList.remove("show");

});

// NO BUTTON RUN AWAY
function moveNoButton() {

    if (noStopped) return;

    dodgeCount++;

    if (dodgeCount >= 5) {

        noStopped = true;

        noBtn.style.position = "static";
        noBtn.style.left = "";
        noBtn.style.top = "";

        return;
    }

    const maxX = Math.max(10, window.innerWidth - noBtn.offsetWidth - 20);
    const maxY = Math.max(10, window.innerHeight - noBtn.offsetHeight - 20);

    const randomX = Math.max(10, Math.random() * maxX);
    const randomY = Math.max(10, Math.random() * maxY);

    noBtn.style.position = "fixed";
    noBtn.style.left = randomX + "px";
    noBtn.style.top = randomY + "px";
}

// DESKTOP MOUSE
noBtn.addEventListener("pointerenter", (event) => {

    if (event.pointerType === "mouse") {
        moveNoButton();
    }

});

// MOBILE TOUCH
noBtn.addEventListener("pointerdown", (event) => {

    if (event.pointerType !== "mouse" && !noStopped) {
        event.preventDefault();
        moveNoButton();
    }

});

// NO BUTTON CLICK WITH FADE-IN ANIMATION
noBtn.addEventListener("click", () => {

    if (!noStopped) return;

    if (noClickCount < noMessages.length) {

        // REMOVE OLD ANIMATION
        question.classList.remove("fade-message");

        // CHANGE MESSAGE
        question.textContent = noMessages[noClickCount];

        // RESTART ANIMATION
        void question.offsetWidth;

        // ADD FADE ANIMATION
        question.classList.add("fade-message");

        noClickCount++;

        // CHANGE TEDDY EXPRESSION
        character.innerHTML = '<div class="teddy">🥺</div>';

    } else {

        question.classList.remove("fade-message");

        question.textContent =
            "That's okay! Thank you for being honest. 💗";

        void question.offsetWidth;

        question.classList.add("fade-message");

        character.innerHTML = '<div class="teddy">🐻</div>';

        noBtn.textContent = "Thank you ♡";

        noBtn.disabled = true;

    }

});

// LOVE LETTER
letterBtn.addEventListener("click", () => {

    letterOverlay.classList.add("show");

});

// CLOSE LOVE LETTER
letterClose.addEventListener("click", () => {

    letterOverlay.classList.remove("show");

});

// FLOATING HEARTS
function createHeart() {

    const heart = document.createElement("span");

    heart.className = "heart";

    heart.textContent =
        Math.random() > 0.5 ? "♥️" : "♡";

    heart.style.left = Math.random() * 100 + "vw";

    heart.style.fontSize =
        (15 + Math.random() * 25) + "px";

    heart.style.animationDuration =
        (3 + Math.random() * 4) + "s";

    hearts.appendChild(heart);

    setTimeout(() => {

        heart.remove();

    }, 7000);

}

// CREATE FLOATING HEARTS
setInterval(createHeart, 500);