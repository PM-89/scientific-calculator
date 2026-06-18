import { useState } from "react";
import { evaluate } from "mathjs";
import Display from "./Display";
import Button from "./Button";
import "./Calculator.css";

function Calculator() {
  const [input, setInput] = useState("");
  const [mode, setMode] = useState("DEG");

  const buttons = [
  "DEG","RAD","C","⌫",
  "sin","cos","tan","%",
  "log","ln","√","!",
  "^","(",")","7",
  "8","9","π","=",
  "4","5","6","/",
  "*","1","2","3",
  "-","+","0","e",
  "."
];
  

  const degToRad = (deg) =>
    (deg * Math.PI) / 180;

  const handleClick = (value) => {

    if (value === "DEG") {
      setMode("DEG");
      return;
    }

    if (value === "!") {
      setInput((prev) => prev + "!");
      return;
    }

    if (value === "RAD") {
      setMode("RAD");
      return;
    }

    if (value === "C") {
      setInput("");
      return;
    }

    if (value === "⌫") {
      setInput((prev) => prev.slice(0, -1));
      return;
    }

    if (
      ["sin","cos","tan","log","ln"].includes(value)
    ) {
      setInput((prev) => prev + value + "(");
      return;
    }

    if (value === "√") {
      setInput((prev) => prev + "sqrt(");
      return;
    }

    if (value === "=") {
      try {
        let expression = input
          .replace(/π/g, Math.PI)
          .replace(/\^/g, "^");

        let result;

        if (
          expression.startsWith("sin(") ||
          expression.startsWith("cos(") ||
          expression.startsWith("tan(")
        ) {
          const fn = expression.slice(
            0,
            expression.indexOf("(")
          );

          const num = Number(
            expression.match(/\((.*?)\)/)[1]
          );

          const angle =
            mode === "DEG"
              ? degToRad(num)
              : num;

          result =
            fn === "sin"
              ? Math.sin(angle)
              : fn === "cos"
              ? Math.cos(angle)
              : Math.tan(angle);
        } else {
          result = evaluate(expression);
        }

        const history =
          JSON.parse(
            localStorage.getItem("history")
          ) || [];

        history.push({
          expression: input,
          result,
          mode,
          time: new Date().toLocaleString()
        });

        localStorage.setItem(
          "history",
          JSON.stringify(history)
        );

        setInput(result.toString());

      } catch {
        setInput("Error");
      }

      return;
    }

    setInput((prev) => prev + value);
  };

  return (
    <div className="calculator-container">
      <div className="mode">
        Mode: {mode}
      </div>

      <Display value={input} />

      <div className="button-grid">
        {buttons.map((btn) => (
          <Button
            key={btn}
            value={btn}
            onClick={handleClick}
          />
        ))}
      </div>
    </div>
  );
}

export default Calculator;