const CORNERS = 10;
const SIZE_OF_LIST = 15;

// Vestigial
function getCorners() {
  var corners = [...Array(CORNERS)].map((n, i) => Math.pow((i*2)+1, 2));
  corners.unshift(2);
  corners = corners.sort(numSort);
  return corners;
}


// Assumed that start is odd.
// Yields the square of the current odd number.
// Vestigial. Sad, because this illustrated yield.
function* getSquares(start) {
  var n = Math.sqrt(start) + 2;
  var sq;
  while (true) {
    yield(n*n);
    n += 2;
  }
}

/*
 * I believe the GCF technique for a, b is to repeatedly subtract the smaller from the larger
 * until the difference is 0 or 1. If the difference is 1, a and b are relatively prime.
 * At this point, I'm only strongly suspecting that this actually works. I have not proven it.
 * And, of course, googling would be cheating.
 */
function isRelativePrime(a, b) {
  let safety = 500; // Protect against infinite loop;
  while (safety && Math.abs(b - a) > 1) {
    [b, a] = [Math.max(a, b), Math.min(a, b)];
    b -= a;
    safety--;
  }
  return a !== b;
}

/*
 * This replaces the far more abstruse getTripleEven and getTripleOdd, which, sadly, I neglected
 * to comment when I wrote them. I'm sure there was a method to my madness.
 */
function getTriples(corner) {
  var squares = [];
  var i = 1;
  while (squares.length <= 10) {
    var test = corner*(corner + 2*i);
    var sqrt = parseInt(Math.sqrt(test), 10);
    if (sqrt*sqrt === test) {
        let isPrimitive = isRelativePrime(corner, i);
        squares.push({ a: Math.sqrt(test), b: i, c: Math.sqrt(test + i*i), isPrimitive });
    }
    i++;
  }
  return squares;
}

// Vestigial
function getTripleEven(corner) {
  // aValues is a list of n^2 - 1, where for even values n.
  var aValues = [...Array(SIZE_OF_LIST)].map((n, i) => Math.pow((i+1)*2, 2) - 1);
  var triples = [];
  aValues.forEach(b => {
    let a = Math.sqrt(4 + 4*b);
    let c = Math.sqrt(a*a + b*b);
    let t = {a, b, c, aValues};
    triples.push(t);
  });
  return triples;
}


/*
 * Get Pythagorean triples based on a given odd corner square. The corner square is (c - a)^2.
 */
// Vestigial
function getTripleOdd(corner) {
  var squareGen = getSquares(corner);
  var triples = [];
  for (let i = 0; i < SIZE_OF_LIST; i++) {
    let nextSquare = (() => { let gen = squareGen.next(); return gen.value; })();
    let b = (nextSquare - corner) / 2; // n(n + 2b); solving for b in the (n + 2b) part.
    let a = Math.sqrt(corner * corner + 2 * corner * b);
    let c = Math.sqrt(a*a + b*b);
    if (b % (c - b) > 0 || c - b === 1) {
      let t = {a, b, c, corner, nextSquare};
      triples.push(t);
    }
  }
  return triples;
}


function pythag(corner) {
  corner = 1*corner;
  let corner_triples;
	/*
  if (corner % 2 === 0) {
    corner_triples = getTripleEven(corner);
  } else {
    corner_triples = getTripleOdd(corner);
  }
  */
  corner_triples = getTriples(corner);
  return corner_triples;
}

module.exports = pythag;

