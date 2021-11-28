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

// event handler for the RESET button, when clicked it will...
// 1) generate new color values for each of the squares and set them.
// 2) get a random rgb color from the ones generated and set it in the header.
document
  .getElementById(identifiers.id.reset)
  .addEventListener("click", function () {
    const rgbValues = [];

    squares.forEach((square) => {
      const values = rgbGenerator();
      setBackGroundColor(square, values);
      rgbValues.push(values);
    });

    // change the text
    this.innerHTML = "New Colors";

    // pick a random RGB color from the values generated for the squares
    const [hr, hg, hb] = rgbValues[randInt(squares.length - 1)];
    setHeaderRgbBackgroundImages(hr, hg, hb);
  });

function rgbGenerator() {
  // TODO generate an array of red, green, blue color values
}

function setBackGroundColor(element, values) {
  // TODO: given an html element and an array [r, g, b],
  // set the element's background color using the rgb values provided.
}

function setHeaderRgbBackgroundImages(r, g, b) {
  // given rgb values, set the header's RGB background colors
}

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
