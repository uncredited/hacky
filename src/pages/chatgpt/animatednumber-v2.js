import React, { useState, useEffect } from "react";
import style from "../../styles/animatednumber.module.css";
const InterpolateNumber = () => {
  const [number, setNumber] = useState(0);
  const [target, setTarget] = useState(0);
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(1);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTarget(Math.floor(Math.random() * 100));
      setColor(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
      setSize(1.5);
    }, 2000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let animationFrameId;

    const animate = () => {
      const distance = target - number;
      const ease = 0.05; // Higher value for slower animation
      const velocity = distance * ease;

      if (Math.abs(distance) < 1) {
        setNumber(target);
        setSize(1);
      } else {
        setNumber(number + velocity);
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [number, target]);

  const textColor = color < "#aaaaaa" ? color : "#aaaaaa";
  const fontSize = `${size}px`;

  return (
    <div className={style.container}>
      <div
        className={style.number}
        style={{ color: textColor, transform: `scale(${size})` }}
      >
        {Math.round(number)}
      </div>
    </div>
  );
};

export default InterpolateNumber;
