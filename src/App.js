import "./styles.css";
import React from "react";
import { memo, useMemo, useCallback } from "react";

function Swatch({ params, onClick }) {
  console.log(`${params.color} Swatch render`);
  return (
    <>
      <div
        // onClick={onClick}
        style={{ width: 50, height: 50, background: params.color }}
      ></div>
    </>
  );
}

const MemoSwatch = memo(Swatch);

export default function App() {
  const [count, setCount] = React.useState(0);
  const [color, setColor] = React.useState("red");

  const params = useMemo(() => ({ color: color }), [color]);
  const onClick = useCallback(() => {}, []);

  console.log(`app rendered ${count} times`);
  return (
    <div className="App">
      <button onClick={() => setCount((prev) => prev + 1)}>Inc Count</button>
      <button onClick={() => setColor(color === "red" ? "blue" : "red")}>
        Rerender Swatch
      </button>

      {/* for simple direct values, react memo render if props is different from the previous props */}
      {/* <MemoSwatch color={color} /> */}

      {/* without useMemo render every time */}
      {/* problem of referential integrity of objects, every object is different from other object */}
      {/* <MemoSwatch params={{color: color}} /> */}

      {/* use the same cache parmas if color not changes referntial integrity */}
      {/* <MemoSwatch params={params} /> */}

      {/* <MemoSwatch params={params} onClick={() => {}} /> */}

      {/* useCallback works with function while useMemo works with object referential integrity */}
      <MemoSwatch params={params} onClick={onClick} />
      {/* <MemoSwatch color={color === 'red'? 'blue': 'red'} /> */}
    </div>
  );
}
