const reverseWords = (sentence: string) => {
  const array = sentence
    .trim()
    .split(" ")
    .filter((word) => word.length > 0);
  console.log(array);
  let left = 0;
  let right = array.length - 1;

  while (left < right) {
    [array[left], array[right]] = [array[right], array[left]];
    left++;
    right--;
  }

  return array.join(" ");
};

console.log(reverseWords("  hello      is the word  "));
