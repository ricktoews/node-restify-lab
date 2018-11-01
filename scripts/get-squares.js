var SIZE_OF_LIST = 5;
function getCorners() {
  var corners = [1, 2, 9, 25, 49, 81];
  return corners;
}

function* getSquares(start) {
  var n = Math.pow(start, .5) + 2;
  var sq;
  while (true) {
    yield(n*n);
    n += 2;
  }
}

function getTripleEven() {
  var aValues = [3, 15, 35, 63, 99, 143, 195];
  var triples = [];
  aValues.forEach(a => {
    let b = Math.pow(4 + 4*a, .5);
    let c = Math.pow(a*a + b*b, .5);
    let t = [a, b, c];
    triples.push(t.sort());
  });
  return triples;
}

function getTripleOdd(corner) {
  var squareGen = getSquares(corner);
  var triples = [];
  for (let i = 0; i < SIZE_OF_LIST; i++) {
    let gen = squareGen.next();
    let nextSquare = gen.value;
    let a = (nextSquare - corner) / 2; // n(n + 2a); solving for a in the (n + 2a) part.
    let b = Math.pow(corner * corner + 2 * corner * a, .5);
    let c = Math.pow(a*a + b*b, .5);
    let t = [a, b, c];
    triples.push(t.sort());
  }
  return triples;
}

function getTriples() {
  var corners = getCorners();
  var triples = [];
  corners.forEach(corner => {
    let corner_triples;
    if (corner % 2 === 0) {
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
