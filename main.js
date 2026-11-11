import Parser from "./parser.js";
import evaluate from "./evaluator.js";
import retTokens from "./scanner.js";


const map = new Map();
map.set("A", true);
map.set("B", false);
map.set("C", true);
map.set("D", false);
try{

let input = "A and b or a";
const token = retTokens(input);

console.log(token);

const parser = new Parser(token);
const tree = parser.expression();
console.log(tree);

console.log(evaluate(tree, map));
} catch(err){
  console.log(err);
}