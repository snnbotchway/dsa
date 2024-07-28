const reverseString = (string: string) => {
  let left = 0;
  let right = string.length - 1;
  const stringArray = [...string];

  while (left < right) {
    [stringArray[left], stringArray[right]] = [stringArray[right], stringArray[left]];
    left++;
    right--;
  }

  return stringArray.join("");
};

console.log(reverseString("hello"));
