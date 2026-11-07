import retTokens from "./scanner.js";

const map = new Map();
map.set("A", true);
map.set("B", true);
map.set("C", false);
map.set("D", true);

let input = "A";
const token = retTokens(input);

const tree = {
  type: "OR",
  left: {
    type: "IDENTIFIER",
    name: "A",
  },
  right: {
    type: "AND",
    left: {
      type: "IDENTIFIER",
      name: "B",
    },
    right: {
      type: "IDENTIFIER",
      name: "C",
    },
  },
};

const tree2 = {
  type: "NOT",
  child: {
    name: "D",
    type: "IDENTIFIER",
  },
};

let current = 0;

const factorAnd = (token) => {
  const val1 = peek(token);
  let expr = evalIdentifiers(val1);
  if (token.type == "AND") {
    advance();
    const val2 = peek(token);
    let right = evalIdentifiers(val2);
    expr = { type: "AND", left: expr, right: right };
  }
  return expr;
};

const evalIdentifiers = (val) => {
  if (val.type == "IDENTIFIER") {
    advance();
    return { type: "IDENTIFIER", name: val.name };
  } else return "error in evalIdentifiers";
};

console.log(evalIdentifiers(token));

const funcAnd = (val1, val2) => {
  return val1 && val2;
};
const funcOr = (val1, val2) => {
  return val1 || val2;
};
const funcNot = (val1) => {
  return !val1;
};
const funcXor = (val1, val2) => {
  return val1 !== val2;
};

const evaluate = (node, myMap) => {
  if (node.type == "IDENTIFIER") {
    return myMap.get(node.name);
  } else if (node.type == "AND") {
    const left = evaluate(node.left, myMap);
    const right = evaluate(node.right, myMap);
    return funcAnd(left, right);
  } else if (node.type == "OR") {
    const left = evaluate(node.left, myMap);
    const right = evaluate(node.right, myMap);
    return funcOr(left, right);
  } else if (node.type == "XOR") {
    const left = evaluate(node.left, myMap);
    const right = evaluate(node.right, myMap);
    return funcXor(left, right);
  } else if (node.type == "NOT") {
    const child = evaluate(node.child, myMap);
    return funcNot(child);
  }
};

class Parser {
  constructor(token) {
    this.token = token;
    this.current = 0;
  }

  peek = () => {
    return this.token[current];
  };

  advance = () => {
    if (current < this.token.length) current++;
    else return "error";
    return this.token[current - 1];
  };

  

}
