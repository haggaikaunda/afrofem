const headerIds = ["color-display", "r", "g", "b"];
const [header, r, g, b] = headerIds.map((id) => document.getElementById(id));

let levels = getLevels();
const gameLevel = levels.find((level) => undefined);
levels.forEach((level) => {
  level.addEventListener("click", function () {
    levels.forEach((mode) => mode.classList.remove("selected"));
    this.classList.add("selected");
  });
});

function getLevels() {
  const [x, y] = document.getElementsByClassName("mode");
  return [x, y];
}

// toggleLevel();
