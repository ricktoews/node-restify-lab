/* Initialize horses by number. Will be random. */
function createPool(items = 25) {
  var pool = [];
  for (let i = 0; i < items; i++) {
    pool.push(i);
  }

  return pool;
}


function horsesSetup(items = 25) {
  var pool = createPool(items);
  var horses = [];
  for (let i = 0; i < items; i++) {
    let p = Math.floor(Math.random() * pool.length);
    
    let h = pool.splice(p, 1)[0];
    horses.push(h);
  }
  return horses;
}

export { horsesSetup };

