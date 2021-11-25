const identifiers = {
  class: {
    mode: "mode",
    selected: "selected",
  },
  id: {
    colorDisplay: "color-display",
    r: "r",
    g: "g",
    b: "b",
  },
};

const headerIds = ["color-display", "r", "g", "b"];
const [header, r, g, b] = headerIds.map((id) => document.getElementById(id));

let levels = [...document.getElementsByClassName("mode")];

// game mode.
const gameLevel = levels.find((level) => {
  const classList = [...level.classList];
  return classList.includes(identifiers.class.selected);
}).innerHTML;

// set up event listeners to toggle between game modes.
levels.forEach((level) => {
  level.addEventListener("click", function () {
    levels.forEach((mode) => mode.classList.remove("selected"));
    this.classList.add("selected");
  });
});
