## React Component Switcher

This is a simple React component that allows you to switch between several different components with the click of a button. Each component has its own unique visual effect, and the order in which they are displayed is pre-defined.

## Installation

To use this code, you need to have React installed. You can then copy the code and use it in your project.

## Usage

To use this component, you need to import it into your project:

```javascript
Copy code
import Home from "./path/to/Home";
```

You can then use the component in your JSX code:

```jsx
Copy code
<Home />
```

This will render the component, which will display a button labeled "Next" and a visual effect. Clicking the "Next" button will switch to the next component in the pre-defined order.

## Customization

If you want to add your own components to the list, you can do so by modifying the componentArray array:

```javascript
Copy code
const componentArray = [
  { title: "GyroBallGPTv1", component: GyroBallv1 },
  { title: "GyroBallGPTv2", component: GyroBallv2 },
  { title: "ConfettiCannonGPTv1", component: ConfettiCannonGPTv1 },
  { title: "ConfettiCannonGPTv2", component: ConfettiCannonGPTv2 },
  { title: "PulsatingCircleCopilot", component: PulsatingCircleCopilot },
  { title: "PulsatingCircleGPT", component: PulsatingCircleGPT },
];
```

Each object in the array represents a component, and consists of a title and a component. The title is a string that will be displayed above the component, and the component is the React component that will be rendered when this item is selected.

You can also customize the CSS styles for the component by modifying the Style object, which is imported from ../styles/style.module.css.
