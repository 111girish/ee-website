import { useState } from "react";
import makeTruthTable from "./engine/table-maker.js";
import "./App.css";

const EXAMPLES = ["A AND B", "NOT (A OR B)", "(A OR B) XOR C", "A OR B AND A"];

function Bit({ on }) {
  return <span className={on ? "bit on" : "bit off"}>{on ? 1 : 0}</span>;
}

function TruthTable({ rows }) {
  const names = Object.keys(rows[0].value);

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            {names.map((name) => (
              <th key={name} scope="col">
                {name}
              </th>
            ))}
            <th scope="col">Result</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {names.map((name) => (
                <td key={name}>
                  <Bit on={row.value[name]} />
                </td>
              ))}
              <td>
                <Bit on={row.result} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [text, setText] = useState("");
  const [table, setTable] = useState(null);
  const [error, setError] = useState("");

  const calculate = (expr) => {
    try {
      setTable(makeTruthTable(expr));
      setError("");
    } catch (err) {
      setTable(null);
      setError(err.message);
    }
  };

  const pickExample = (expr) => {
    setText(expr);
    calculate(expr);
  };

  return (
    <main className="app">
      <h1>Truth table maker</h1>
      <p className="help">
        Write an expression with AND, OR, NOT, XOR and brackets. Variables can
        be any letters, up to 7 different ones.
      </p>

      <label htmlFor="expr">Expression</label>
      <div className="input-row">
        <input
          id="expr"
          type="text"
          value={text}
          placeholder="(A OR B) AND NOT C"
          autoComplete="off"
          spellCheck="false"
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && calculate(text)}
        />
        <button type="button" onClick={() => calculate(text)}>
          Make table
        </button>
      </div>

      <div className="examples">
        <span>Try</span>
        {EXAMPLES.map((ex) => (
          <button
            key={ex}
            type="button"
            className="example"
            onClick={() => pickExample(ex)}
          >
            {ex}
          </button>
        ))}
      </div>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      {table ? (
        <TruthTable rows={table} />
      ) : (
        !error && (
          <p className="empty">
            Type an expression, or pick an example, to see every combination of
            inputs and the result.
          </p>
        )
      )}
    </main>
  );
}

export default App;