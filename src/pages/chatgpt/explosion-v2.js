import { useRef, useEffect } from "react";

const Explosion = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const ctx = canvas.getContext("2d");
    ctx.width = window.innerWidth;
    ctx.height = window.innerHeight;
    const particles = [];

    const handleExplosion = (x, y) => {
      const size = Math.floor(Math.random() * 50) + 50;
      const numParticles = Math.floor(Math.random() * 30) + 70;
      const gravity = 0.1; // Adjust as needed

      const colors = [
        "#FF4136",
        "#FF851B",
        "#FFDC00",
        "#2ECC40",
        "#0074D9",
        "#B10DC9",
      ];

      for (let i = 0; i < numParticles; i++) {
        const particle = {
          x: x,
          y: y,
          size: Math.random() * size,
          speedX: Math.random() * 10 - 5,
          speedY: Math.random() * -10 - 5, // Add randomness to initial velocity
          accelY: gravity + Math.random() * 0.3, // Add randomness to acceleration
          color: colors[Math.floor(Math.random() * colors.length)],
          decay: Math.random() * 0.05 + 0.03, // Add randomness to size decay
        };
        particles.push(particle);
      }
    };

    const animate = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        if (particle.size <= 0) {
          particles.splice(index, 1);
        } else {
          particle.speedY += particle.accelY; // Apply acceleration
          particle.x += particle.speedX;
          particle.y += particle.speedY;
          particle.size -= particle.decay; // Apply size decay

          if (particle.size > 0) {
            ctx.beginPath();
            ctx.fillStyle = particle.color;
            ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
            ctx.fill();
          }
        }
      });

      requestAnimationFrame(animate);
    };

    canvas.addEventListener("click", (event) => {
      const rect = canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      handleExplosion(x, y);
    });

    animate();

    return () => {
      canvas.removeEventListener("click", () => {});
    };
  }, []);

  return <canvas ref={canvasRef} />;
};

export default Explosion;
