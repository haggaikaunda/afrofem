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

const bkImageRegex = /([0-9]+), ([0-9]+), ([0-9]+)/;

const header = document.getElementById(identifiers.id.colorDisplay);
const rElement = document.getElementById(identifiers.id.r);
const gElement = document.getElementById(identifiers.id.g);
const bElement = document.getElementById(identifiers.id.b);

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

// event handler for the RESET button, when clicked it will...
// 1) generate new color values for each of the squares and set them.
// 2) get a random rgb color from the ones generated and set it in the header.
document
  .getElementById(identifiers.id.reset)
  .addEventListener("click", function () {
    const rgbValues = [];

    squares.forEach((square) => {
      const values = rgbValueGenerator();
      const [r, g, b] = values;
      const backgroundImage = mkBackGroundImage(r, g, b);
      square.style.backgroundColor = backgroundImage;
      rgbValues.push(values);
    });

    // pick a random RGB color from the values generated for the squares
    const [hr, hg, hb] = rgbValues[randInt(squares.length - 1)];
    setHeaderRgbBackgroundImages(hr, hg, hb);
  });

squares.forEach((square) => {
  square.addEventListener("click", function () {
    // get the header read and
    const headerRgb = [rElement, gElement, bElement].map((e) => {
      const [r, g, b] = extractRgb(e);
      return r || g || b;
    });

    const squareRgb = extractRgb(square);
    if (arrayEqual(headerRgb, squareRgb)) {
      const [hr, hg, hb] = headerRgb;
      const bkImage = mkBackGroundImage(hr, hg, hb);
      setBackGroundImagesAfterWin(bkImage);
    } else {
      square.classList.add("hidden");
    }
  });
});

function setBackGroundImagesAfterWin(backGroundImage) {
  squares.forEach((sq) => {
    sq.style.backgroundColor = backGroundImage;
    sq.classList.remove("hidden");
  });
}

function arrayEqual(first, second) {
  if (first.length === second.length) {
    const reducer = (prev, current, index) => {
      return prev && current === second[index];
    };
    return first.reduce(reducer, true);
  }

  return false;
}

function extractRgb(element) {
  const res = element.style.backgroundColor.match(bkImageRegex);
  const values = [res[1], res[2], res[3]];
  return values.map((v) => parseInt(v));
}

// sets numeric color values in the header as well as the background colors (image)
function setHeaderRgbBackgroundImages(r, g, b) {
  const setElementValues = (element, red, green, blue) => {
    element.style.backgroundColor = mkBackGroundImage(red, green, blue);
    element.innerHTML = red || green || blue;
  };
  setElementValues(rElement, r, 0, 0);
  setElementValues(gElement, 0, g, 0);
  setElementValues(bElement, 0, 0, b);
}

function getSquares() {
  const squares = [
    ...document.getElementsByClassName(identifiers.class.square),
  ];

  squares.forEach((sq) => sq.classList.remove("hidden"));
  if (gameLevel === "Easy") {
    const ignoredSq = squares.filter((_, index) => index >= 3);
    ignoredSq.forEach((sq) => sq.classList.add("hidden"));

    return squares.slice(3);
  }

  return squares;
}

// RGB Generator taking into account the level.
// Returns a function which returns a list of three r, g, b values when invoked.
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
  const start = `rgba(${r}, ${g}, ${b})`;
  const end = `rgba(${r}, ${g}, ${b})`;
  // return `linear-gradient(${start}, ${end})`;
  return start;
}
