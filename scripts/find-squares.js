const CORNERS = 5;
const SIZE_OF_LIST = 5;

const numSort = (a, b) => a-b;

function getCorners() {
  var corners = [...Array(CORNERS)].map((n, i) => Math.pow((i*2)+1, 2));
  corners.unshift(2);
  corners = corners.sort(numSort);
  return corners;
}


function* getSquares(start) {
  var n = Math.sqrt(start);
  while (true) {
    n += 2;
    yield(n*n);
  }
}


function getTripleEven() {
  var aValues = [...Array(SIZE_OF_LIST)].map((n, i) => Math.pow((i+1)*2, 2) - 1);
  var triples = [];
  aValues.forEach(a => {
    let b = Math.sqrt(4 + 4*a);
    let c = Math.sqrt(a*a + b*b);
    let t = [a, b, c];
    triples.push(t.sort(numSort));
  });
  return triples;
}


function getTripleOdd(corner) {
  var squareGen = getSquares(corner);
  var triples = [];
  for (let i = 0; i < SIZE_OF_LIST; i++) {
    let nextSquare = (() => squareGen.next().value)();
    let a = (nextSquare - corner) / 2; // n(n + 2a); solving for a in the (n + 2a) part.
    let b = Math.sqrt(corner * corner + 2 * corner * a);
    let c = Math.sqrt(a*a + b*b);
    let t = [a, b, c];
    triples.push(t.sort(numSort));
  }
  return triples;
}


function getTriples() {
  var corners = getCorners();
  var triples = [];
  corners.forEach(corner => {
    let corner_triples;
    if (corner === 2) {
      corner_triples = getTripleEven();
    } else {
      corner_triples = getTripleOdd(corner);
    }

    triples.push(corner_triples);
  });

  return triples;
}

var result = getTriples();
console.log(result);
