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

  consume (val) {
    if(val?.type == "CLOSE_PAREN") return this.advance();
    
    throw new Error("There is no closing bracket after open bracket");
  }

  evalIdentifiers = (val) => {
    if (val == undefined) throw new Error("error!! value is undefined. ")
    if (val.type == "IDENTIFIER") {
      this.advance();
      return { type: "IDENTIFIER", name: val.name };
    } else if(val.type == "OPEN_PAREN"){
      this.advance();
      const expr =  this.termOr();
      const value = this.peek();
      this.consume(value);
      return expr;
    }else{
      throw new Error("error in evalIdentifiers");
    }
      
  };

  //Unary value it seems
  unaryNot = (val) =>{
    if(val == undefined)throw new Error("error!! value is undefined. ");
    if(val.type == "NOT"){
      this.advance();
      const right = this.peek();
      const val2 = this.unaryNot(right);
      let expr = {type: "NOT", child: val2};
      return expr;
    }
    return this.evalIdentifiers(val);
  }
  
  factorAnd = () => {
    const val1 = this.peek();
    let expr = this.unaryNot(val1);
    while (this.token[this.current]?.type == "AND") {
      this.advance();
      const val2 = this.peek();
      let right = this.unaryNot(val2);
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

  expression () {
    let tree =  this.termOr();
    if(this.current == this.token.length){
      return tree;
    }
    throw new Error("There seems to be a problem with your logic!!!");
  }
}

export default Parser;


