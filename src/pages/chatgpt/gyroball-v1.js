import { useState, useEffect, useRef } from "react";

const GyroBall = () => {
  const canvasRef = useRef(null);
  const [gyroEnabled, setGyroEnabled] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

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
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext("2d");
    context.width = canvas.width;
    context.height = canvas.height;
    const x = event.beta; // In degree in the range [-180,180]
    const y = event.gamma; // In degree in the range [-90,90]
    const radius = Math.min(canvas.width, canvas.height) / 10;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.arc(
      centerX + (y / 90) * centerX,
      centerY - (x / 180) * centerY,
      radius,
      0,
      2 * Math.PI,
      false
    );
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
      {errorMessage && <p>{errorMessage}</p>}
      {!gyroEnabled && (
        <button style={{ margin: "20px" }} onClick={requestPermission}>
          Enable Gyroscope
        </button>
      )}
      <canvas ref={canvasRef} onClick={requestPermission} />
    </div>
  );
};

export default GyroBall;
