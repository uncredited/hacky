import React, { useState } from "react";

import Style from "../styles/style.module.css";

import ConfettiCannonGPTv1 from "./chatgpt/confetticannon-v1";
import ConfettiCannonGPTv2 from "./chatgpt/confetticannon-v2";
import PulsatingCircleGPT from "./chatgpt/pulsatingcircle";
import GyroBallv1 from "./chatgpt/gyroball-v1";
import GyroBallv2 from "./chatgpt/gyroball-v2";

import PulsatingCircleCopilot from "./copilot/pulsatingcircle";

export default function Home() {
  // This page has a button, "Next", that renders the next component in a predefined array-list.

  const componentArray = [
    { title: "GyroBallGPTv1", component: GyroBallv1 },
    { title: "GyroBallGPTv2", component: GyroBallv2 },
    { title: "ConfettiCannonGPTv1", component: ConfettiCannonGPTv1 },
    { title: "ConfettiCannonGPTv2", component: ConfettiCannonGPTv2 },
    { title: "PulsatingCircleCopilot", component: PulsatingCircleCopilot },
    { title: "PulsatingCircleGPT", component: PulsatingCircleGPT },
  ];
  const [componentIndex, setComponentIndex] = useState(0);
  const { title, component: CurrentComponent } =
    componentArray[componentIndex % componentArray.length];

  const renderNextComponent = () => {
    setComponentIndex(componentIndex + 1);
  };
  return (
    <>
      <div className={Style.topContainer}>
        <button className={Style.next} onClick={renderNextComponent}>
          Next
        </button>
        <h1 className={Style.title}>{title}</h1>
      </div>
      <CurrentComponent />
    </>
  );
}
