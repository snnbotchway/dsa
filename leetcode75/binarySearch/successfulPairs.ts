function successfulPairs(spells: number[], potions: number[], success: number): number[] {
  const successMap = new Map<number, number>();
  potions.sort((a, b) => a - b);

  return spells.map((spell) => {
    if (successMap.has(spell)) return successMap.get(spell)!;

    let left = 0;
    let right = potions.length - 1;
    let minSuccess = success / spell;
    let index = potions.length;
    // console.log(`\nSpell: ${spell}, minSuccess: ${minSuccess}`);

    while (left <= right) {
      const middleIndex = Math.floor((left + right) / 2);
      const potion = potions[middleIndex];

      if (potion < minSuccess) {
        left = middleIndex + 1;
      } else {
        right = middleIndex - 1;
        index = middleIndex;
      }

      //   console.log("new index: ", index);
    }

    // minSuccess = 43/6 = 7.17
    // 7, 12, 14, 22, 23, 27, 33, 34, 37, 37

    const successful = potions.length - index;
    successMap.set(spell, successful);
    return successful;
  });
}
console.log(successfulPairs([39, 34, 6, 35, 18, 24, 40], [27, 37, 33, 34, 14, 7, 23, 12, 22, 37], 43));

console.log(successfulPairs([5, 1, 3], [1, 2, 3, 4, 5], 7));
console.log(successfulPairs([3, 1, 2], [8, 5, 8], 16));
