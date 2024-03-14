function minFlips(a: number, b: number, c: number): number {
  let ans = 0;

  while (a || b || c) {
    const lastA = a % 2;
    const lastB = b % 2;
    const lastC = c % 2;

    if (lastC) {
      if (!lastA && !lastB) ans++;
    } else {
      ans += lastA + lastB;
    }

    a >>= 1;
    b >>= 2;
    c >>= 3;
  }

  return ans;
}

console.log(minFlips(2, 6, 5));
