function letterCombinations(digits: string): string[] {
  const res: string[] = [];
  if (!digits.length) return res;

  const digitToLetter: Record<string, string | undefined> = {
    "2": "abc", // 1 1 1
    "3": "def", //
    "4": "ghi",
    "5": "jkl",
    "6": "mno",
    "7": "pqrs",
    "8": "tuv",
    "9": "wxyz",
  };

  function backtrack(i: number, currStr: string) {
    if (currStr.length === digits.length) return res.push(currStr);
    for (const char of digitToLetter[digits[i]]!) backtrack(i + 1, currStr + char);
  }

  backtrack(0, "");
  return res;
}
