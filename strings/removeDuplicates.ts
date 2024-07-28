const removeDuplicates = (string: string) => {
  return Array.from(new Set(string)).join("");
};

console.log(removeDuplicates("hello"));
