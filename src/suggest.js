'use strict';

function distance(a, b) {
  const rows = a.length + 1;
  const cols = b.length + 1;
  const d = [];
  for (let i = 0; i < rows; i++) {
    d.push(new Array(cols).fill(0));
    d[i][0] = i;
  }
  for (let j = 0; j < cols; j++) d[0][j] = j;

  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
        d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
      }
    }
  }
  return d[a.length][b.length];
}

function suggest(input, candidates) {
  const query = String(input).toLowerCase();
  const limit = Math.max(1, Math.floor(query.length / 3));
  let best = null;
  let bestDistance = Infinity;
  for (const candidate of candidates) {
    const dist = distance(query, candidate);
    if (dist <= limit && dist < bestDistance) {
      best = candidate;
      bestDistance = dist;
    }
  }
  return best;
}

module.exports = { suggest, distance };