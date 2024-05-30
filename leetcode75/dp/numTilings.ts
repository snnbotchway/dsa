function numTilings(n: number): number {
  let topMissing = 1n;
  let bottomMissing = 1n;

  let fulln2 = 1n;
  let fulln1 = 2n;

  for (let i = 3; i <= n; i++) {
    const full = fulln1 + fulln2 + topMissing + bottomMissing;
    const newTopMissing = fulln2 + bottomMissing;

    bottomMissing = fulln2 + topMissing;

    fulln2 = fulln1;
    fulln1 = full;

    topMissing = newTopMissing;
  }
  return Number(BigInt(fulln1) % (10n ** 9n + 7n));
}

console.log(numTilings(50));
