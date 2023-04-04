import { useEffect, useRef } from "react";

const ConfettiCannon = () => {
  const canvasRef = useRef(null);

  const shootConfetti = () => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height - 200;

    const colors = ["#f44336", "#2196f3", "#ffeb3b", "#4caf50", "#9c27b0"];
    const maxVelocity = 40;
    const minVelocity = 20;
    const gravity = 0.07;
    const maxAngle = 90;
    const minAngle = 75;
    const minSize = 5;
    const maxSize = 10;
    const particlesPerShot = 30;
    const maxDistance = Math.sqrt(width * width + height * height);

    for (let i = 0; i < particlesPerShot; i++) {
      const angle = Math.random() * (maxAngle - minAngle) + minAngle;
      const velocity =
        Math.random() * (maxVelocity - minVelocity) + minVelocity;
      const xVelocity =
        (i % 2 === 0 ? 1 : -1) * velocity * Math.cos(angle * (Math.PI / 180));
      const yVelocity = -velocity * Math.sin(angle * (Math.PI / 180));
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * (maxSize - minSize) + minSize;
      const distance = Math.random() * maxDistance;
      const xPos =
        (i % 2 === 0 ? 0 : width) +
        distance * Math.cos(angle * (Math.PI / 180));
      const yPos = height - size;

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
    <div style={{ textAlign: "center" }}>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default ConfettiCannon;
