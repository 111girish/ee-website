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

  //Unary value it seems
  unaryNot = (val) =>{
    let expr = this.evalIdentifiers(val);
    while (this.token[this.current]?.type == "NOT"){
      this.advance();
      let 
    }
  }
  
  factorAnd = () => {
    const val1 = this.peek();
    let expr = this.unaryNot(val1);
    while (this.token[this.current]?.type == "AND") {
      this.advance();
      const val2 = this.peek();
      let right = this.evalIdentifiers(val2);
      expr = { type: "AND", left: expr, right: right };
    }
    return expr;
  };

  
  factorXor = () => {
    let expr = this.factorAnd();
    while (this.token[this.current]?.type == "XOR") {
      this.advance();
      let right = this.factorAnd();
      expr = { type: "XOR", left: expr, right: right };
    }
    return expr;
  };

  
  termOr = () => {
    let expr = this.factorXor();
    while (this.token[this.current]?.type == "OR") {
      this.advance();
      let right = this.factorXor();
      expr = { type: "OR", left: expr, right: right };
    }
    return expr;
  };



}
export default Parser;


