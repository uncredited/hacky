import React, { useState, useEffect } from "react";
import Style from "../../styles/fibonacci.module.css";
class BigNumber {
  constructor(value) {
    this.value = value.toString().split("").map(Number); // store value as an array of digits
  }

  plus(other) {
    const a = this.value.slice().reverse();
    const b = other.value.slice().reverse();
    const result = [];

    let carry = 0;
    for (let i = 0; i < Math.max(a.length, b.length); i++) {
      const sum = (a[i] || 0) + (b[i] || 0) + carry;
      result[i] = sum % 10;
      carry = Math.floor(sum / 10);
    }
    if (carry) {
      result.push(carry);
    }

    return new BigNumber(result.reverse().join(""));
  }

  toString() {
    return this.value.join("");
  }
}

function FibonacciCounter() {
  const [fib, setFib] = useState([new BigNumber(0), new BigNumber(1)]); // initialize with first two numbers in the sequence

  useEffect(() => {
    const timer = setInterval(() => {
      setFib((prevFib) => {
        const [a, b] = prevFib;
        const next = a.plus(b);
        return [b, next];
      });
    }, 50);

    return () => clearInterval(timer); // cleanup the timer on unmount
  }, []);

  return (
    <div className={Style.flexCenter}>
      <div className={Style.text}>
        {" "}
        {fib.map((n) => n.toString()).join(", ")}
      </div>
    </div>
  );
}

export default FibonacciCounter;
