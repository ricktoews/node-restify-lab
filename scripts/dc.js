function analyze(denom, expansion) {
  // data:
  //   period_length
  //   expansion_length
  // So first digit of period: expansion_length - period_length.
  // Period: expansion[expansion_length - period_length]
  var analysis = {
    full_reptend: expansion.period_length === denom - 1
  };
  if (expansion.period_length % 2 === 0) {
    analysis.complement = true;
    analysis.first_half = expansion.period.substring(0, expansion.period.length / 2);
    analysis.second_half = expansion.period.substring(expansion.period.length / 2);
  } else {
    analysis.complement = false;
  }
  return analysis;
}

function longdiv(num, denom) {
  var circuit_breaker = 100000, fuse = 0;
  var original_num = num;
  var expansion = '';
  var remainders = { [num]: expansion.length };
  var finished = false;
  while (!finished && fuse++ < circuit_breaker) {
    num *= 10;
    digit = Math.floor(num / denom);
    expansion += digit;
    num = num - denom * digit;
    if (remainders[num] !== undefined) {
      remainders.begin = remainders[num];
      remainders.period_length = expansion.length - remainders[num];
    }
    finished = remainders[num] !== undefined || num === 0;
    remainders[num] = expansion.length;
  }
  var payload = {
    numerator: original_num,
    expansion: expansion,
    period_length: remainders.period_length,
    expansion_length: expansion.length
  };
  if (remainders.period_length) {
    payload.period = expansion.substring(expansion.length - remainders.period_length);
  }
  return payload;
}

function dc(denom) {
  console.log('calculate for', denom);
  var rows = [];
  max_num = denom <= 109 ? denom - 1 : 1;
  for (let i = 1; i <= max_num; i++) {
    let expansion = longdiv(i, denom);
    let analysis = analyze(denom, expansion);
    let row = { expansion, analysis };
    rows.push(row);
  }
  return { "denominator": denom, "data": rows };
}

module.exports = dc;
