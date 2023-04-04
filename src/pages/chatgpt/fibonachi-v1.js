import React, { useState, useEffect } from "react";
import Style from "../../styles/fibonacci.module.css";
function FibonacciCounter() {
  const [fib, setFib] = useState([0, 1]); // initialize with first two numbers in the sequence

  useEffect(() => {
    const timer = setInterval(() => {
      setFib((prevFib) => {
        const [a, b] = prevFib;
        return [b, a + b];
      });
    }, 1000);

    return () => clearInterval(timer); // cleanup the timer on unmount
  }, []);

  return <div className={Style.flexCenter}>{fib.join(", ")}</div>;
}

export default FibonacciCounter;
