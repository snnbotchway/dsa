/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 */

var guess = function (num: number): number {
  const g = 1;
  if (num === g) return 0;
  if (num > g) return -1;
  return 1;
};

function guessNumber(n: number): number {
  let left = 1;
  let right = n;

  while (true) {
    const middle = Math.floor((left + right) / 2);
    const res = guess(middle);
    if (res === 0) return middle;

    if (res === 1) {
      left = middle + 1;
    } else {
      right = middle - 1;
    }
  }
}

console.log(guessNumber(100000000000000000000000000000000000000000));
console.log(Infinity === Infinity - 1);
