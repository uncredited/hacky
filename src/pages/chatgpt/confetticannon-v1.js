import { useEffect, useRef } from "react";

const ConfettiCannon = () => {
  const canvasRef = useRef(null);

  const shootConfetti = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;

    const colors = ["#f44336", "#2196f3", "#ffeb3b", "#4caf50", "#9c27b0"];
    const maxVelocity = 8;
    const minVelocity = 4;
    const gravity = 0.1;
    const maxAngle = 60;
    const minAngle = 30;
    const minSize = 5;
    const maxSize = 10;
    const particlesPerShot = 100;
    const maxDistance = Math.sqrt(width * width + height * height);

    for (let i = 0; i < particlesPerShot; i++) {
      const angle = Math.random() * (maxAngle - minAngle) + minAngle;
      const velocity =
        Math.random() * (maxVelocity - minVelocity) + minVelocity;
      const xVelocity = velocity * Math.cos(angle * (Math.PI / 180));
      const yVelocity = -velocity * Math.sin(angle * (Math.PI / 180));
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * (maxSize - minSize) + minSize;
      const distance = Math.random() * maxDistance;
      const xPos = width / 2 + distance * Math.cos(angle * (Math.PI / 180));
      const yPos = height / 2 + distance * Math.sin(angle * (Math.PI / 180));

      context.beginPath();
      context.arc(xPos, yPos, size, 0, 2 * Math.PI, false);
      context.fillStyle = color;
      context.fill();

      const animateParticle = (x, y, xVel, yVel, size) => {
        requestAnimationFrame(() => {
          context.clearRect(
            x - size - 1,
            y - size - 1,
            size * 2 + 2,
            size * 2 + 2
          );

          x += xVel;
          y += yVel;
          yVel += gravity * size;

          context.beginPath();
          context.arc(x, y, size, 0, 2 * Math.PI, false);
          context.fillStyle = color;
          context.fill();

          if (y < height) {
            animateParticle(x, y, xVel, yVel, size);
          }
        });
      };

      animateParticle(xPos, yPos, xVelocity, yVelocity, size);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      shootConfetti();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <canvas ref={canvasRef} />
    </>
  );
};

export default ConfettiCannon;
