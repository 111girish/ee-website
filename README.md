# Truth Table Maker

Type a boolean expression, get its full truth table. Variables can have any letter-only name, so `Girish AND Pokhrel` works as well as `A AND B`.

**[Live demo](https://ee-website-khaki.vercel.app/)**

<img width="923" height="646" alt="image" src="https://github.com/user-attachments/assets/3e3604bd-20d8-4e3c-8e7a-f56da1c2a8f1" />


Built as a personal project to connect digital logic with programming. Nothing in the engine is a library: the tokenizer, parser and evaluator are written from scratch.

## What it supports

| Operator | Meaning | Priority |
|---|---|---|
| `NOT` | negation | highest |
| `AND` | both true | |
| `XOR` | exactly one true | |
| `OR` | at least one true | lowest |
| `( )` | brackets override priority | |

- Variables are letters only (`A`, `x`, `Girish`) and are case-insensitive. Operators are too, so `a and b` is the same as `A AND B`.
- Up to 7 different variables (128 rows).
- Invalid input shows an error that says what was expected and what was found.

Try these:

- `(A OR B) XOR C`
- `NOT (A AND B)` and `NOT A OR NOT B`. The two tables are identical (De Morgan's law).
- `A OR B AND A`. The result column matches `A` exactly, so `B` has no effect (absorption law).

### Example output

`A AND B XOR C` is read as `(A AND B) XOR C`:

| A | B | C | Result |
|---|---|---|---|
| 0 | 0 | 0 | 0 |
| 0 | 0 | 1 | 1 |
| 0 | 1 | 0 | 0 |
| 0 | 1 | 1 | 1 |
| 1 | 0 | 0 | 0 |
| 1 | 0 | 1 | 1 |
| 1 | 1 | 0 | 1 |
| 1 | 1 | 1 | 0 |

## How it works

The engine is three small stages plus a table generator. It is plain JavaScript with no dependencies, and the React page only calls one function: `makeTruthTable(text)`.

```
"A or B and C"
      │  scanner.js    tokenizer
      ▼
[A] [OR] [B] [AND] [C]
      │  parser.js     recursive descent parser, runs once
      ▼
expression tree
      │  evaluator.js  runs once per row of the table
      ▼
true / false  →  table
```

### 1. Tokenizer (`scanner.js`)

Turns the raw string into a list of tokens, so the rest of the code never deals with spaces or multi-letter words. Each token is an object:

```js
{ type: "IDENTIFIER", name: "A" }
{ type: "AND", name: "AND" }
{ type: "OPEN_PAREN", name: "(" }
```

It reads the input one character at a time, groups runs of letters into words, checks each word against a `Set` of keywords (`AND`, `OR`, `NOT`, `XOR`), and treats any other word as a variable. An unknown character throws an error with the character, its position and its line.

### 2. Parser (`parser.js`)

Builds an expression tree from the tokens. It is a recursive descent parser: a chain of functions where each one handles one level of priority and calls the one below it.

| Function | Handles |
|---|---|
| `termOr` | `OR` (lowest priority, entered first) |
| `factorXor` | `XOR` |
| `factorAnd` | `AND` |
| `unaryNot` | `NOT` (one operand, can repeat: `NOT NOT A`) |
| `evalIdentifiers` | a variable, or a bracketed expression |

As a grammar:

```
expression → or
or         → xor  ( "OR"  xor )*
xor        → and  ( "XOR" and )*
and        → unary ( "AND" unary )*
unary      → "NOT" unary | primary
primary    → VARIABLE | "(" or ")"
```

Priority is never coded directly. Higher-priority operators sit deeper in the chain, so they finish first. That is why `A OR B AND C` becomes:

```
OR
├── A
└── AND
    ├── B
    └── C
```

Brackets are handled at the bottom of the chain: on `(`, the parser calls the top of the chain again for the inside, so the whole grammar is reused recursively.

Nodes are plain objects:

```js
{ type: "IDENTIFIER", name: "A" }
{ type: "NOT", child: node }
{ type: "AND" | "OR" | "XOR", left: node, right: node }
```

After parsing, `expression()` checks that every token was used. Without that check, input like `A NOT B` would quietly parse as just `A`.

### 3. Evaluator (`evaluator.js`)

A recursive function over the tree. A variable is the base case: it looks its value up in a `Map` that is passed in. An operator evaluates its children first, then combines the results. The `Map` is a parameter, not a global, which is what lets the same tree be evaluated for many different rows.

### 4. Truth table (`table-maker.js`)

1. Tokenize, then collect the distinct variable names in a `Set`. `A OR B AND A` has two variables, not three.
2. Parse once.
3. For `n` variables there are `2^n` rows. Count from 0 to `2^n - 1` and read the binary digits of each number: each digit is one variable's value. The first variable takes the leftmost digit, so the table runs in the usual order, from all false to all true.
4. For each row, build a fresh `Map`, evaluate the tree, and store `{ value, result }`.

## Error messages

Parser errors follow one pattern: what was expected, and what was found.

| Input | Message |
|---|---|
| `A AND` | Expected a variable, NOT or '(' but found the end of the expression. |
| `AND B` | Expected a variable or '(' but found 'AND'. |
| `(A OR B` | Expected ')' to close the bracket, but found the end of the expression. |
| `A NOT B` | Unexpected 'NOT'. Expected AND, OR, XOR or the end of the expression. |
| `A & B` | Error using: & in index: 3 at line: 1. |

The engine only throws. The React page catches the error and shows the message, so the engine never decides how errors are displayed.

## Run it locally

```bash
npm install
npm run dev      # development server
npm run build    # production build into dist/
npm run preview  # serve the production build locally
```

## Project structure

```
src/
├── engine/
│   ├── scanner.js      string → tokens
│   ├── parser.js       tokens → tree
│   ├── evaluator.js    tree + values → true/false
│   └── table-maker.js  string → table (the one function the UI calls)
├── App.jsx             the page
└── App.css
```

Stack: React, Vite, plain JavaScript.

## What I learned building it

- **Recursion and the call stack.** The parser and the evaluator are both recursive. Each waiting function call sits on the call stack until the deeper call returns, which is the same idea as a stack of plates.
- **Trees.** An expression is naturally a tree: operators are nodes, variables are leaves. Evaluating a tree means evaluating the children first and then the node (postorder traversal).
- **Separating parsing from evaluating.** The parser returns a tree and never touches true/false values. Parsing once and evaluating many times is what makes a truth table cheap.
- **Choosing a data structure by the question it answers.** `Set` for "is this a keyword?" and "which variables exist?", `Map` for "what is the value of this variable?", objects for fixed-shape records like tokens and nodes, arrays for ordered lists.
- **Binary counting.** Generating every combination of true/false values is counting in binary and reading bits with `>>` and `&`.
- **Error design.** Throw where the problem is noticed, catch where it can be shown. Fixing the "stopped early" case (leftover tokens) taught me that each parser level only knows about its own operator, so the check has to live in one place at the top.
- **Working with modules and React.** ES module imports and exports across files, and React state and props for the page.

## Inspiration

The recursive descent structure follows the approach in [Crafting Interpreters](https://craftinginterpreters.com) by Robert Nystrom, especially the chapters on scanning and parsing expressions: a chain of functions where each level handles one precedence level and returns a tree node. The book builds a much larger language; this project applies the same idea to a small one.

## Limitations

- Variable names are letters only (no digits or underscores).
- Maximum of 7 different variables.
- No `NAND`, `NOR` or `XNOR`, and no expression simplification.
- Parser errors do not report a position yet, because tokens do not store one.

## Planned

- Port the engine to C++ and compile it to WebAssembly, keeping the same `makeTruthTable(text)` boundary so the page does not change.
- Animate a signal passing through the expression tree for a chosen row of the table.
- More modules: RC charging curve, a signal builder, and a pathfinding/sorting visualizer.
