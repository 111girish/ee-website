import Parser from "./parser.js";
import evaluate from "./evaluator.js";
import retTokens from "./scanner.js";

const map = new Map();
map.set("A", true);
map.set("B", false);
map.set("C", true);
map.set("D", false);

let input = "Girish and pokhrel or girish";
const token = retTokens(input);

const varNames = new Set();

for(let i=0; i<token.length; i++){
  if(token[i]. type == "IDENTIFIER"){
    varNames.add(token[i].name);
  };
}

varNames.forEach((name) => {console.log(name)});

let rowNum = 2 ** varNames.size;

while(rowNum){
  console.log(rowNum>>1);
  rowNum >>= 1;
}

const getBinary = (num) => {
  return ((num >> 1) & 1);
}



console.log(rowNum);