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

const headerIds = ["color-display", "r", "g", "b"];
const [header, rElement, gElement, bElement] = headerIds.map((id) =>
  document.getElementById(id)
);

const levels = [...document.getElementsByClassName(identifiers.class.mode)];
const squares = [...document.getElementsByClassName(identifiers.class.square)];

// game mode.
let gameLevel = levels.find((level) => {
  const classList = [...level.classList];
  return classList.includes(identifiers.class.selected);
}).innerHTML;

let rgbValueGenerator = rgbGenerator(gameLevel);

// set up event listeners to toggle between game modes.
levels.forEach((level) => {
  level.addEventListener("click", function () {
    levels.forEach((mode) => mode.classList.remove(identifiers.class.selected));
    this.classList.add(identifiers.class.selected);

    gameLevel = this.innerHTML;
    rgbValueGenerator = rgbGenerator(gameLevel);
  });
});

document
  .getElementById(identifiers.id.reset)
  .addEventListener("click", function () {
    const rgbValues = [];

    console.log(gameLevel);

    squares.forEach((square) => {
      const values = rgbValueGenerator();
      const [r, g, b] = values;
      const backgroundImage = mkBackGroundImage(r, g, b);
      square.style.backgroundImage = backgroundImage;
      rgbValues.push(values);
    });

    // pick a random RGB color from the values generated for the squares
    const [hr, hg, hb] = rgbValues[randInt(squares.length - 1)];
    setHeaderRgbBackgroundImages(hr, hg, hb);
  });

function setHeaderRgbBackgroundImages(r, g, b) {
  rElement.style.backgroundImage = mkBackGroundImage(r, 0, 0);
  gElement.style.backgroundImage = mkBackGroundImage(0, g, 0);
  bElement.style.backgroundImage = mkBackGroundImage(0, 0, b);
}

function rgbGenerator(level) {
  const generateRgbValues = () => {
    const rgb = () => genRgbInt();
    return [rgb(), rgb(), rgb()];
  };

  // r = 0, g = 1, b = 2
  if (level === "Easy") {
    // in easy mode, fix one color.
    const index = randInt(2);
    const fixedValue = genRgbInt();
    return () => {
      const values = generateRgbValues();
      values[index] = fixedValue;
      return values;
    };
  }

  // In hard mode, we generate radom values every time.
  return () => generateRgbValues();
}

function randInt(max) {
  return Math.round(Math.random() * max);
}

function genRgbInt() {
  return randInt(255);
}

function mkBackGroundImage(r, g, b) {
  const rgb = `rgb(${r}, ${g}, ${b})`;
  return `linear-gradient(${rgb}, ${rgb})`;
}
