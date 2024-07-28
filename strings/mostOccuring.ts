const mostOccuring = (string: string) => {
  if (!string.length) return string;

  let maxChar = string[0];
  let maxCount = -Infinity;
  const counts = new Map<string, number>();

  for (let i = 1; i < string.length; i++) {
    const char = string[i];
    const count = (counts.get(char) || 0) + 1;
    counts.set(char, count);

    if (count > maxCount) {
      maxChar = char;
      maxCount = count;
    }
  }

  return maxChar;
};

console.log(mostOccuring("sentence"));
