import { useState, useEffect, useRef } from "react";

const GyroBall = () => {
  const canvasRef = useRef(null);
  const [gyroEnabled, setGyroEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (window.DeviceOrientationEvent) {
      window.addEventListener("deviceorientation", handleOrientation, true);
      setGyroEnabled(true);
    } else {
      setErrorMessage("Your device does not support the gyroscope.");
    }
    return () => {
      window.removeEventListener("deviceorientation", handleOrientation, true);
    };
  }, []);

  const handleOrientation = (event) => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const x = event.beta; // In degree in the range [-180,180]
    const y = event.gamma; // In degree in the range [-90,90]
    const radius = Math.min(canvas.width, canvas.height) / 10;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);

    const newVelocity = {
      x: (y / 90) * 10,
      y: -(x / 180) * 10,
    };
    setVelocity(newVelocity);

    const ballX = centerX + velocity.x;
    const ballY = centerY + velocity.y;

    context.beginPath();
    context.arc(ballX, ballY, radius, 0, 2 * Math.PI, false);
    context.fillStyle = "blue";
    context.fill();
    context.lineWidth = 2;
    context.strokeStyle = "black";
    context.stroke();
  };

  const requestPermission = () => {
    if (typeof DeviceOrientationEvent.requestPermission === "function") {
      DeviceOrientationEvent.requestPermission()
        .then((response) => {
          if (response === "granted") {
            setGyroEnabled(true);
          } else {
            setErrorMessage("Permission to use the gyroscope was denied.");
          }
        })
        .catch((error) => {
          setErrorMessage(
            "An error occurred while requesting permission to use the gyroscope."
          );
        });
    } else {
      setErrorMessage(
        "Your browser does not support the requestPermission method."
      );
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "400px" }} />
      {errorMessage && <p>{errorMessage}</p>}
      {!gyroEnabled && (
        <button style={{ margin: "20px" }} onClick={requestPermission}>
          Enable Gyroscope
        </button>
      )}
    </div>
  );
};

export default GyroBall;
