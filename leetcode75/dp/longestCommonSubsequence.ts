function longestCommonSubsequence(text1: string, text2: string): number {
  let row = new Array(text2.length);

  for (let i = text1.length - 1; i >= 0; i--) {
    const newRow = new Array(text2.length);

    for (let j = text2.length - 1; j >= 0; j--) {
      //   console.log(`i=${i}, j=${j}`);
      if (text1[i] === text2[j]) {
        newRow[j] = 1 + (row[j + 1] || 0);
      } else {
        newRow[j] = Math.max(newRow[j + 1] || 0, row[j] || 0);
      }
    }

    row = newRow;
  }

  return row[0];
}

console.log(longestCommonSubsequence("abcde", "ace"));
console.log(longestCommonSubsequence("bsbininm", "jmjkbkjkv"));
//   0  1  2
//   a  c  e
// 0 a
// 1 b
// 2 c
// 3 d
// 4 e
