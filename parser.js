import retTokens from "./scanner.js";

const map = new Map();
map.set("A", true);
map.set("B", false);

const input = "A or B";
const token = retTokens(input);

const funcAnd = (val1, val2) =>{
  return val1 && val2;
}
const funcOr = (val1, val2) =>{
  return val1 || val2;
}
const funcNot = (val1) =>{
  return !val1
}

for(const t of token){
  if(t.type == 'IDENTIFIER')
  {
    t.value= map.get(`${t.name}`);//ask user using radio butons here;
  }
}

for(let i=0; i < token.length ; i++){
  if(token[i].type == 'AND'){
    console.log(funcAnd(token[i-1].value, token[i+1].value));
  } else if(token[i].type == 'OR'){
    console.log(funcOr(token[i-1].value, token[i+1].value));
  } else if(token[i].type == 'NOT'){
    console.log(funcNot(token[i+1].value));
  }
}
console.log(token);