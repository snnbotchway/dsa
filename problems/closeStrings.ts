function closeStrings(word1: string, word2: string): boolean {
  if (word1.length !== word2.length) return false;
  if (word1 === word2) return true;

  const l = Math.max(word1.length, word2.length);
  const frequency1 = new Map<string, number>();
  const frequency2 = new Map<string, number>();

  for (let i = 0; i < word1.length; i++) {
    const char1 = word1[i];

    frequency1.set(char1, (frequency1.get(char1) || 0) + 1);
  }

  for (let i = 0; i < word1.length; i++) {
    const char2 = word2[i];
    if (!frequency1.has(char2)) return false;

    frequency2.set(char2, (frequency2.get(char2) || 0) + 1);
  }

  return Array.from(frequency1.values()).sort().toString() === Array.from(frequency2.values()).sort().toString();
}

console.log(closeStrings("uau", "ssx"));
