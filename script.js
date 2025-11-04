const startScreen = document.getElementById("startScreen");
const startBtn = document.getElementById("startBtn");
const gameScreen = document.getElementById("gameScreen");
const bgMusic = document.getElementById("bgMusic");
const muteBtn = document.getElementById("muteBtn");

const levelTitle = document.getElementById("levelTitle");
const levelText = document.getElementById("levelText");
const choicesDiv = document.getElementById("choices");

const levels = [
  {
    title: "Stage 1: knock?",
    text: "You’re tasked with delivering a cake to a party for people you don’t like. Do you deliver it anyway or keep it for yourself?",
    options: [
      { text: "Deliver the cake", outcome: "You deliver the cake. They cheer, but you feel empty." },
      { text: "Keep and eat it", outcome: "You eat the cake yourself. It’s delicious, but guilt follows." }
    ]
  }
];

let currentLevel = 0;
let isMuted = false;

function loadLevel(index) {
  const level = levels[index];
  levelTitle.textContent = level.title;
  levelText.textContent = level.text;
  choicesDiv.innerHTML = "";

  document.getElementById("levelContainer").style.transform = "translateY(40px)";
  setTimeout(() => {
    document.getElementById("levelContainer").style.transform = "translateY(0)";
  }, 10);

  level.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;
    btn.onclick = () => nextLevel(opt.outcome);
    choicesDiv.appendChild(btn);
  });
}

function nextLevel(outcomeText) {
  levelTitle.textContent = "Result";
  levelText.textContent = outcomeText;
  choicesDiv.innerHTML = "<p>End of Demo</p>";
}

startBtn.addEventListener("click", () => {
  startScreen.style.opacity = "0";
  setTimeout(() => {
    startScreen.classList.add("hidden");
    gameScreen.classList.remove("hidden");
    bgMusic.play().catch(() => console.log("Autoplay blocked until user interacts again"));
    loadLevel(currentLevel);
  }, 1000);
});


muteBtn.addEventListener("click", () => {
  isMuted = !isMuted;
  bgMusic.muted = isMuted;
  muteBtn.src = isMuted ? "muted.png" : "mute.png";
});
