import { useState, useEffect } from "react";
import styles from "../../styles/animatednumber.module.css";

const AnimatedNumber = () => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const targetNumber = Math.floor(Math.random() * 100);
      const diff = targetNumber - number;
      const increment = diff / 10; // animate through 10 steps
      let currentNumber = number;

      const animate = () => {
        if (Math.abs(currentNumber - targetNumber) > Math.abs(increment)) {
          currentNumber += increment;
          setNumber(Math.floor(currentNumber));
          requestAnimationFrame(animate);
        } else {
          setNumber(targetNumber);
        }
      };

      animate();

      const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        while (color === "#" || color === "#000000" || color < "#AAAAAA") {
          color = "#";
          for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
          }
        }
        return color;
      };

      const color = getRandomColor();
      const numberElement = document.querySelector(`.${styles.number}`);
      numberElement.style.color = color;
    }, 3000);
    return () => clearInterval(intervalId);
  }, [number]);

  return (
    <div className={styles.container}>
      <h1 className={styles.number}>{number}</h1>
    </div>
  );
};

export default AnimatedNumber;
