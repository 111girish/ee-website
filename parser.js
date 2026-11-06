import retTokens from "./scanner.js";

const map = new Map();
map.set("A", true);
map.set("B", true);
map.set("C", false);

const input = "A or B and C";
const token = retTokens(input);

const tree = {
  value: "OR",
  type:"OR",
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
  value: "NOT",
  type: "NOT",
  child: {
    value: "D",
    type: "IDENTIFIER",
  }
}



const funcAnd = (val1, val2) => {
  return val1 && val2;
};
const funcOr = (val1, val2) => {
  return val1 || val2;
};
const funcNot = (val1) => {
  return !val1;
};

const evaluate = (node, tree) =>{
  if(node.type == "IDENTIFIER"){
    return map.get(node.name);
  } else if(node.type == "AND"){
    const left = evaluate(node.left);
    const right = evaluate(node.right);
    return funcAnd(left, right);
  }else if(node.type == "OR"){
    const left = evaluate(node.left);
    const right = evaluate(node.right);
    return funcOr(left, right);
  }
}

console.log(evaluate(tree));

for (const t of token) {
  if (t.type == "IDENTIFIER") {
    t.value = map.get(`${t.name}`);
  }
}

for (let i = 0; i < token.length; i++) {
  if (token[i].type == "AND") {
    console.log(funcAnd(token[i - 1].value, token[i + 1].value));
  } else if (token[i].type == "OR") {
    console.log(funcOr(token[i - 1].value, token[i + 1].value));
  } else if (token[i].type == "NOT") {
    console.log(funcNot(token[i + 1].value));
  }
}
console.log(token);
