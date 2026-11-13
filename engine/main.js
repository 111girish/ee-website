import makeTruthTable from "./table-maker.js";

try {
  let input1 = "Not (a or b)";
  let input2 = "not a and not b";
  console.log(makeTruthTable(input1));
  console.log(makeTruthTable(input2));
  console.log(makeTruthTable(input1) == makeTruthTable(input2));
} catch (err) {
  console.log(err);
}
