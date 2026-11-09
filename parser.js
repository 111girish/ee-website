import retTokens from "./scanner.js";

const map = new Map();
map.set("A", true);
map.set("B", true);
map.set("C", false);
map.set("D", true);

let input = "A or B and C";
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


class Parser {
  constructor(token) {
    this.token = token;
    this.current = 0;
  }

  peek = () => {
    return this.token[this.current];
  };

  advance = () => {
    if (this.current < this.token.length) this.current++;
    else throw new Error("error in advance of parser");
    return this.token[this.current - 1];
  };

  evalIdentifiers = (val) => {
    if (val == undefined) throw new Error("error!! value is undefined. ")
    if (val.type == "IDENTIFIER") {
      this.advance();
      return { type: "IDENTIFIER", name: val.name };
    } else 
      {
        throw new Error("error in evalIdentifiers");
      }
  };

  
  factorAnd = () => {
    const val1 = this.peek();
    let expr = this.evalIdentifiers(val1);
    while (this.token[this.current]?.type == "AND") {
      this.advance();
      const val2 = this.peek();
      let right = this.evalIdentifiers(val2);
      expr = { type: "AND", left: expr, right: right };
    }
    return expr;
  };

  
  termOr = () => {
    let expr = this.factorAnd();
    while (this.token[this.current]?.type == "OR") {
      this.advance();
      let right = this.factorAnd();
      expr = { type: "OR", left: expr, right: right };
    }
    return expr;
  };



}
export default Parser;


