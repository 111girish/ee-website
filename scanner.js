const keyWords = new Set(["AND", "NOT", "OR", "XOR"]);

const retTokens = (input) => {
  input = input.toUpperCase();
  let tokens = [];
  let j = 0,
    line = 1,
    lineStart = 0;
  while (j < input.length) {
    if (input[j] == "(") {
      tokens.push({ value: "(", type: "OPEN_PAREN" });
      j++;
    } else if (input[j] == ")") {
      tokens.push({ value: ")", type: "CLOSE_PAREN" });
      j++;
    } else if (input[j] == " " || input[j] == "\r" || input[j] == "\t") {
      j++;
    } else if (input[j] == "\n") {
      line++;      
      j++;
      lineStart = j;
    } else if (input.charCodeAt(j) >= 65 && input.charCodeAt(j) <= 90) {
      const start = j;
      while (
        j < input.length &&
        input.charCodeAt(j) >= 65 &&
        input.charCodeAt(j) <= 90
      ) {
        j++;
      }

      const slice = input.slice(start, j);
      if (keyWords.has(slice)) {
        tokens.push({ value: slice, type: slice });
      } else tokens.push({ value: slice, type: "IDENTIFIER" });
    } else {
      throw new Error(
        ` Error using: ${input[j]} in index: ${j-lineStart+1} at line: ${line}. Please use words and parenthesis only!!!`,
      );
    }
  }
  return tokens;
};

let input = "A & C";
try {
  const re = retTokens(input);
  console.log(re);
} catch (err) {
  console.log(err.message);
}
