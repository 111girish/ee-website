const keyWords = new Map();
keyWords.set("AND", "AND");
keyWords.set("OR", "OR");
keyWords.set("NOT", "NOT");
keyWords.set("XOR", "XOR");
keyWords.set("(", "OPEN_PAREN");
keyWords.set(")", "CLOSE_PAREN");

// const tokenType = {
//   'IDENTIFIERS': IDENTIFIERS
// };

let input = "(not A & B) OR (C AND D)";
input = input.toUpperCase();
console.log(input);
let tokens = [];
let j = 0;
while (j < input.length) {
  if (input[j] == "(") {
    tokens.push(keyWords.get("("));
    j++;
  } else if (input[j] == ")") {
    tokens.push(keyWords.get(")"));
    j++;
  } else if (input[j] == " ") {
    j++;
    continue;
  } else if (input.charCodeAt(j) >= 65 && input.charCodeAt(j) <= 90) {
    const start = j;
    while (
      j < input.length &&
      input.charCodeAt(j) >= 65 &&
      input.charCodeAt(j) <= 90
    )
      j++;

    const slice = input.slice(start, j);
    if (keyWords.has(`${slice}`)) {
      tokens.push(keyWords.get(`${slice}`));
    } else tokens.push("IDENTIFIERS " + slice);
  } else{
    console.log("Please enter words and parenthesis only!!!");
    break;
  }
}

console.log(tokens);
