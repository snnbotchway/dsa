const areRotations = (string1: string, string2: string) => {
  return string1.length == string2.length && (string1 + string2).includes(string2);
};

console.log(areRotations("hello", "ohell"));
