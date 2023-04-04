import { useRef, useEffect } from "react";

export default function PulsatingCircle() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Set the canvas width and height to the browser window
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Set the circle's initial position and size
    let x = canvas.width / 2;
    let y = canvas.height / 2;
    let radius = 50;

    // Set the circle's pulsing animation
    let increasing = true;
    let pulseRate = 0.5;

    function animate() {
      // Clear the canvas for the next frame
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw the circle
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, 2 * Math.PI);
      ctx.fillStyle = "purple";
      ctx.fill();

      // Update the circle's size
      if (increasing) {
        radius += pulseRate;
        if (radius >= 100) increasing = false;
      } else {
        radius -= pulseRate;
        if (radius <= 50) increasing = true;
      }

      // Call the animation function again for the next frame
      requestAnimationFrame(animate);
    }

    // Start the animation
    animate();

    // Add event listener to update the canvas size when the window is resized
    window.addEventListener("resize", () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", () => {});
    };
  }, []);

  return <canvas ref={canvasRef} />;
}
