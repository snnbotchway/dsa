// word1 = "horse", word2 = "ros"

function minDistanceRecMemo(word1: string, word2: string): number {
  const memo = new Map<string, number>();
  function dp(i: number, j: number): number {
    const key = `${i},${j}`;
    if (memo.has(key)) return memo.get(key)!;

    let ans: number;
    if (word1.length === i) {
      ans = word2.length - j;
    } else if (word2.length === j) {
      ans = word1.length - i;
    } else {
      ans = word1[i] === word2[j] ? dp(i + 1, j + 1) : 1 + Math.min(dp(i, j + 1), dp(i + 1, j), dp(i + 1, j + 1));
    }
    memo.set(key, ans);
    return ans;
  }

  return dp(0, 0);
}

function minDistance(word1: string, word2: string): number {
  const length = word2.length + 1;
  let row = Array.from({ length }, (_, index) => length - 1 - index);

  for (let i = word1.length - 1; i >= 0; i--) {
    const newRow = new Array(length);
    newRow[length - 1] = Math.abs(i - word1.length);

    for (let j = length - 2; j >= 0; j--) {
      if (word1[i] === word2[j]) {
        newRow[j] = row[j + 1];
      } else {
        newRow[j] = 1 + Math.min(newRow[j + 1], row[j], row[j + 1]);
      }
    }

    row = newRow;
  }
  return row[0];
}

console.log(minDistance("horse", "ros"));
// horse   length=5
// i

// ros     length=3
//   j

// dp(0,0) = 1 + min(dp(0,1), dp(1,0), dp(1,1))
// dp(0,1) = 1 + min(dp(0,2), dp(1,1), dp(1,2))
// dp(0,2) = 1 + min(5, dp(1,2), dp(1,3))
// dp(0,3) = 5
// dp(1,2) = 1 + min(dp(1,3),dp(2,2),dp(2,3))
// dp(1,3) =
