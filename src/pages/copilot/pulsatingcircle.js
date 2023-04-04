import React, { useEffect, useRef } from "react";

export default function PulsatingCircle() {
  const canvasRef = useRef(null);

  const draw = (ctx, frameCount) => {
    // draw a red circle with a radius of 50 in the middle of the canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    // red
    ctx.fillStyle = "#FF0000";
    ctx.beginPath();
    ctx.arc(
      ctx.canvas.width / 2,
      ctx.canvas.height / 2,
      50 * Math.abs(Math.sin(frameCount * 0.05)),
      0,
      2 * Math.PI
    );
    ctx.fill();
    // call draw again in 20 milliseconds
    requestAnimationFrame(() => draw(ctx, frameCount + 1));
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext("2d");
    // set context height and with to canvas height and width
    context.canvas.width = window.innerWidth;
    context.canvas.height = window.innerHeight;

    let frameCount = 0;
    draw(context, frameCount);
  }, []);

  return <canvas ref={canvasRef} />;
}
