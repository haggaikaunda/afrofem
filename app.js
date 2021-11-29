const rElement = document.getElementById("r");
const gElement = document.getElementById("g");
const bElement = document.getElementById("b");

const levels = Array.from(document.getElementsByClassName("mode"));

let selectedLevelButton = levels.find((level) => {
  const classList = Array.from(level.classList);
  return classList.includes("selected");
});

let gameLevel = selectedLevelButton.innerHTML;

levels.forEach((level) => {
  level.addEventListener("click", function () {
    levels.forEach((mode) => mode.classList.remove("selected"));
    this.classList.add("selected");

    gameLevel = this.innerHTML;
  });
});
