import Parser from "./parser.js";
import evaluate from "./evaluator.js";
import retTokens from "./scanner.js";


const map = new Map();
map.set("A", true);
map.set("B", true);
map.set("C", true);
map.set("D", true);


let input = "A xor B and C";
const token = retTokens(input);

const parser = new Parser(token);
const tree = parser.termOr();

console.log(evaluate(tree, map));
