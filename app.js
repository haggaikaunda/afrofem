const identifiers = {
  class: {
    mode: "mode",
    selected: "selected",
    square: "square",
  },
  id: {
    colorDisplay: "color-display",
    r: "r",
    g: "g",
    b: "b",
    reset: "reset",
  },
};

const rElement = document.getElementById(identifiers.id.r);
const gElement = document.getElementById(identifiers.id.g);
const bElement = document.getElementById(identifiers.id.b);

const levels = Array.from(
  document.getElementsByClassName(identifiers.class.mode)
);
// game mode.
let gameLevel = levels.find((level) => {
  const classList = [...level.classList];
  return classList.includes(identifiers.class.selected);
}).innerHTML;

let squares = getSquares(gameLevel);

// set up event listeners to toggle between game modes.
// reset game level and squares
levels.forEach((level) => {
  level.addEventListener("click", function () {
    levels.forEach((mode) => mode.classList.remove(identifiers.class.selected));
    this.classList.add(identifiers.class.selected);

    gameLevel = this.innerHTML;
    squares = getSquares(gameLevel);
  });
});

function getSquares(level) {
  const tiles = Array.from(
    document.getElementsByClassName(identifiers.class.square)
  );

  tiles.forEach((sq) => sq.classList.remove("hidden"));

  if (level === "Easy") {
    const hiddenSquares = tiles.slice(3, tiles.length);
    const squares = tiles.slice(0, 3);

    hiddenSquares.forEach((sq) => sq.classList.add("hidden"));

    return squares;
  }

  return tiles;
}
