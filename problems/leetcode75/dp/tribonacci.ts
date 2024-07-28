function tribonacciIter(n: number): number {
  if (n == 0) return 0;
  if (n == 1 || n == 2) return 1;

  let first = 0;
  let second = 1;
  let third = 1;
  let i = 3;

  while (true) {
    const next = first + second + third;
    if (i++ === n) return next;

    first = second;
    second = third;
    third = next;
  }
}

function tribonacci(n: number): number {
  const bottomUp: number[] = new Array(n + 1);
  bottomUp[0] = 0;
  bottomUp[1] = 1;
  bottomUp[2] = 1;

  for (let i = 3; i <= n; i++) {
    bottomUp[i] = tribonacci(i - 1) + tribonacci(i - 2) + tribonacci(i - 3);
  }

  return bottomUp[n];
}

console.log(tribonacci(0));
