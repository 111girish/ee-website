import Parser from "./parser.js";
import evaluate from "./evaluator.js";
import retTokens from "./scanner.js";

const makeTruthTable = (input) => {
  const map = new Map();

  const token = retTokens(input);

  const varNames = new Set();

  for (let i = 0; i < token.length; i++) {
    if (token[i].type == "IDENTIFIER") {
      varNames.add(token[i].name);
    }
  }

  if (varNames.size > 5) {
    throw new Error("Please use 5 or less unique variables!!!");
  }

  const parser = new Parser(token);

  const tree = parser.expression();

  let rowNum = 2 ** varNames.size;
  const getBinary = (num, i) => {
    return (num >> i) & 1;
  };

  let truth_table = [];
  const arr = [...varNames];
  const numVars = arr.length;

  for (let j = 0; j < rowNum; j++) {
    //gets the identifiers and stores the name in a hashmap
    arr.forEach((name, i) => {
      map.set(name, getBinary(j, numVars - i - 1) == 1);
    });
    const res = evaluate(tree, map);

    let val = {};
    for (let i = 0; i < arr.length; i++) {
      const n = arr[i];
      val = { ...val, [n]: map.get(n) };
    }

    //stores the value of the map as:  {true, false} and the result as: {res};
    truth_table = [...truth_table, { value: val, result: res }];
  }

  return truth_table;
};

export default makeTruthTable;


