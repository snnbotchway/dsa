function countBitsBrute(n: number): number[] {
  const ans = [];
  for (let i = 0; i <= n; i++) {
    ans.push(
      i
        .toString(2)
        .split("")
        .reduce((acc, curr) => (+curr ? ++acc : acc), 0),
    );
  }

  return ans;
}

function countBits(n: number): number[] {
  const ans = new Array(n + 1);
  ans[0] = 0;
  for (let i = 1; i <= n; i++) ans[i] = (i % 2) + ans[Math.floor(i / 2)];
  return ans;
}

console.log(countBits(12));
