function findDifference(nums1: number[], nums2: number[]): number[][] {
  const nums1Set = new Set(nums1);
  const nums2Set = new Set(nums2);

  for (let i = 0; i < Math.max(nums1.length, nums2.length); i++) {
    nums2Set.delete(nums1[i]);
    nums1Set.delete(nums2[i]);
  }

  return [Array.from(nums1Set), Array.from(nums2Set)];
}

const nums1 = [1, 2, 3],
  nums2 = [2, 4, 6, 8];
console.log(findDifference(nums1, nums2));
