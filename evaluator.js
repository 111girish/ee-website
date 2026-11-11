import Parser from "./parser.js";

const map = new Map();
map.set("A", true);
map.set("B", true);
map.set("C", false);
map.set("D", true);


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
  } else {
    throw new Error("Error in evaluate!!! It seems your logic has a mistake!!!");
  }
};

export default evaluate;



