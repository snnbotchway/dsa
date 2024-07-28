function removeStars(s: string): string {
  let noOfStars = 0;
  const indexes = new Set<number>();

  for (let i = s.length - 1; i >= 0; i--) {
    const char = s[i];
    if (char === "*") {
      noOfStars++;
      continue;
    } else if (noOfStars > 0) {
      noOfStars--;
      continue;
    }

    indexes.add(i);
  }

  const res = [];
  for (let i = 0; i < s.length; i++) {
    if (indexes.has(i)) {
      res.push(s[i]);
    }
  }

  return res.join("");
}

console.log(removeStars("leet**cod*e"));
